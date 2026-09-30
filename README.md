# VideoPremium Intro

Bộ **skill + engine + template + renderer** để các AI agent (Claude, Codex, Antigravity, Cursor…) dựng video intro / promotion / motion **chất lượng thương mại**. Video được viết bằng HTML/CSS/JS và render ra MP4 chính xác đến từng khung hình.

> Nguyên tắc: **đẹp nhờ biết tiết chế, nhanh nhờ có template**. Agent chỉ sửa JSON/CONFIG và chọn nhạc, không viết phim lại từ đầu.

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| `skills/premium-motion-video/` | `SKILL.md` là quy trình cho agent. `references/` chứa: quy tắc thẩm mỹ, cookbook hiệu ứng, pipeline kèm số đo, lỗi hay gặp, và phân tích bài của Leo |
| `engine/motion.js` | Thư viện chuyển động: spring dạng closed-form, track (ghép nhiều spring chồng lên nhau), masked roll, camera zoom, liquid glass, contract `seek(t)` |
| `templates/kinetic-promo/` | Promo kiểu Apple, điều khiển bằng 1 file JSON. Có 9 loại shot: words, glow, device, image, ui, counter, grid, split, logo. Hỗ trợ khung 16:9, 1:1, 9:16 |
| `templates/keynote-oneshot/` | Một cú máy liền mạch (bản Converse): wordmark → pill → iris → bento → drop zoom → liquid glass → khoá màn hình → Dynamic Island → Safari → thẻ sản phẩm → trạng thái đơn hàng → bức tường. Sửa trong khối `CONFIG` |
| `templates/ui-loops/` | 8 hiệu ứng UI vòng lặp 8 giây (nút → player, cột → đường, zoom KPI, dock nam châm, chữ co giãn, kính lúp, luồng xung, logo hạt). Bảng 4:5 hoặc `?fx=N` cho 1 hiệu ứng khổ 1:1, `?poster` cho ảnh bìa. Cảm hứng từ bộ kit của Charlie Hills, viết lại từ đầu trên engine VP |
| `tools/` | Các lệnh: `sheet.mjs` (contact sheet), `render.mjs` (preview/final, song song, chạy tiếp được khi đứt), `beatgrid.py` (BPM, lưới beat, drop, cắt ghép nhạc), `cues.mjs` + `mix.py` (sound design, chuẩn −14 LUFS), `popcheck.py` (bắt khung giật), `install-skill.sh` |

## Cài đặt (1 lần)

```bash
npm i
python3 -m pip install librosa soundfile numpy
bash tools/install-skill.sh
```

- **ffmpeg:** cần có sẵn trong PATH.
- **`install-skill.sh`:** gắn skill vào `~/.claude/skills`, `~/.agents/skills` và `~/.codex/skills`.

**Superpowers (khuyên dùng):**

- Claude Code: `/plugin install superpowers@claude-plugins-official`
- Antigravity: `agy plugin install https://github.com/obra/superpowers`
- Codex: vào mục Plugins → Superpowers

## Làm một video trong 10 phút

```bash
# 1. Nhạc trước
python3 tools/beatgrid.py nhac.mp3                                # BPM, năng lượng từng beat, gợi ý drop
python3 tools/beatgrid.py nhac.mp3 --plan "[[0,0,40]]" --out out/nhac.wav

# 2. Sửa templates/kinetic-promo/index.html: khối <script id="spec">
#    (đặt "bpm" đúng bằng BPM của bài nhạc)
node tools/sheet.mjs templates/kinetic-promo/index.html --every 0.5    # soát lỗi trên contact sheet (~20 s)
node tools/render.mjs templates/kinetic-promo/index.html --mode preview # xem nhịp (~45 s)

# 3. Âm thanh + bản cuối
node tools/cues.mjs templates/kinetic-promo/index.html > out/cues.json
python3 tools/mix.py out/cues.json --music out/nhac.wav --sfx sfx.example.json --out out/mix.wav
node tools/render.mjs templates/kinetic-promo/index.html --mode final --audio out/mix.wav --out out/phim.mp4
python3 tools/popcheck.py out/phim.mp4
```

Muốn xem phim chạy trực tiếp thì mở file `index.html` bằng Chrome:

- `Space`: tạm dừng.
- `← →`: tua 1 beat.

## Tốc độ (đo thật)

| | Trước | Sau |
|---|---|---|
| Converse 28 s, 1440², 60 fps | ~23 phút render | ước tính ~4 phút |
| Kinetic promo 21 s, 1080p60, có motion blur và nhạc | – | 2 phút 40 giây trên 2 nhân |
| Bản preview | – | 44 giây |

Chi tiết xem `skills/premium-motion-video/references/pipeline.md`.

## Bản quyền tài sản

Repo này không chứa ảnh, nhạc hay SFX của bên thứ ba. `sfx.example.json` trỏ tới thư viện âm thanh trên máy anh. Ảnh thương hiệu chỉ dùng cho demo nội bộ.
