#!/usr/bin/env python3
"""Pop check: flags single-frame jumps (a frame that differs from its neighbours far more than the local
motion does) and reports the loop seam. Run on every final render.
  python3 tools/popcheck.py out/film.mp4 [--bpm 120]
"""
import subprocess, sys, argparse, numpy as np
ap = argparse.ArgumentParser(); ap.add_argument('video'); ap.add_argument('--bpm', type=float, default=0); a = ap.parse_args()
fps = eval(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=r_frame_rate', '-of', 'csv=p=0', a.video], capture_output=True, text=True).stdout.strip())
w = 160
raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', a.video, '-vf', f'scale={w}:{w}', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], capture_output=True).stdout
f = np.frombuffer(raw, np.uint8).reshape(-1, w, w).astype(np.float32)
d = np.abs(np.diff(f, axis=0)).mean((1, 2))
med = np.array([np.median(d[max(0, i - 6):i + 7]) for i in range(len(d))])
bad = [i + 1 for i in range(len(d)) if d[i] > 10 and d[i] > 4 * med[i] + 2]
for i in bad:
    t = i / fps; print(f'POP frame {i}  t={t:.3f}s' + (f'  beat={t * a.bpm / 60:.2f}' if a.bpm else '') + f'  diff={d[i - 1]:.1f} (local {med[i - 1]:.1f})')
print(f'{len(f)} frames, {len(bad)} pops, loop seam diff {np.abs(f[-1] - f[0]).mean():.2f} (<1 = seamless)')
sys.exit(1 if bad else 0)
