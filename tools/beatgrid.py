#!/usr/bin/env python3
"""Beat grid + energy map for a music track, and optional bar-accurate splice.

  python3 tools/beatgrid.py song.mp3                       # BPM, grid offset, energy per beat, drop/breakdown guesses
  python3 tools/beatgrid.py song.mp3 --plan "[[0,81,14],[14,95,28],[42,67,8],[50,95,6]]" --out edit.wav
        plan = [[film_beat, track_beat, n_beats], ...]  → places track beats at film beats with 12 ms crossfades.
        Keep track_beat % 4 == film_beat % 4 (same bar phase) or the downbeat drifts.

Lessons baked in: fit ONE linear grid (period + offset) instead of trusting per-beat tracker output;
librosa's BPM can be doubled/halved (80 vs 160) — sanity-check against the feel; pick the film BPM
from the song, not the other way round.
"""
import sys, json, argparse
import numpy as np, librosa, soundfile as sf

ap = argparse.ArgumentParser(); ap.add_argument('song'); ap.add_argument('--plan'); ap.add_argument('--out', default='edit.wav')
ap.add_argument('--sr', type=int, default=48000); ap.add_argument('--tail', type=float, default=2, help='beats of fade-out tail after the last segment')
a = ap.parse_args()

y, sr = librosa.load(a.song, sr=22050, mono=True)
tempo, beats = librosa.beat.beat_track(y=y, sr=sr, units='time')
k = np.arange(len(beats)); P, O = np.polyfit(k, beats, 1)          # linear grid: t = O + k*P
while O - P > 0: O -= P                                               # earliest grid beat >= 0
bpm = 60 / P
n = int((len(y) / sr - O) / P)
rms = []
for i in range(n):
    s0, s1 = int((O + i * P) * sr), int((O + (i + 1) * P) * sr)
    rms.append(20 * np.log10(np.sqrt(np.mean(y[s0:s1] ** 2)) + 1e-9))
rms = np.array(rms); sm = np.array([rms[i:i + 4].mean() for i in range(n)])            # forward-looking bar energy
jump = sm[4:] - sm[:-4]; drop = int(np.argmax(jump[8:n - 12]) + 12) if n > 24 else 0   # biggest rise bar-over-bar
low = sm < (np.median(sm) - 3)
brk, i = [], 0
while i < n:
    if low[i]:
        j = i
        while j < n and low[j]: j += 1
        if j - i >= 8: brk.append([i, j])
        i = j
    else: i += 1
print(json.dumps({'bpm': round(float(bpm), 3), 'period_s': round(float(P), 6), 'offset_s': round(float(O), 4), 'beats': n,
                  'drop_beat_guess': drop, 'drops_after_breakdowns': [int(j) for i, j in brk if j < n - 4], 'drop_time_s': round(float(O + drop * P), 3), 'breakdowns_beats': [[int(i), int(j)] for i, j in brk],
                  'energy_db_per_beat': [round(float(x), 1) for x in rms]}, indent=1))

if a.plan:
    plan = json.loads(a.plan)
    Y, _ = librosa.load(a.song, sr=a.sr, mono=False); Y = np.atleast_2d(Y)
    if Y.shape[0] == 1: Y = np.vstack([Y, Y])
    fade = int(.012 * a.sr); end_beat = max(fb + nb for fb, _, nb in plan)
    L = int((end_beat + a.tail) * P * a.sr) + fade; out = np.zeros((2, L)); r = np.linspace(0, 1, fade)
    for fb, tb, nb in plan:
        if fb % 4 != tb % 4: print(f'warning: segment {fb}<-{tb} changes bar phase', file=sys.stderr)
        s0 = int(round((O + tb * P) * a.sr)); s1 = int(round((O + (tb + nb + (a.tail if fb + nb == end_beat else 0)) * P) * a.sr)) + fade
        seg = Y[:, s0:s1].copy()
        if fb > 0: seg[:, :fade] *= r
        seg[:, -fade:] *= r[::-1]
        d = int(round(fb * P * a.sr)); e = min(L, d + seg.shape[1]); out[:, d:e] += seg[:, :e - d]
    t0 = int(end_beat * P * a.sr); out[:, t0:] *= np.linspace(1, 0, L - t0) ** 2
    sf.write(a.out, out.T, a.sr); print(f'wrote {a.out}: {end_beat} beats = {end_beat * P:.3f} s (+{a.tail} beat tail)', file=sys.stderr)
