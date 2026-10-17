"""Frames raw 1080x1920 app screenshots into captioned Play Store images.

Usage: python scripts/frame-screenshots.py <folder with raw shots>
Writes store/screenshots/01-....png (1080x1920).
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = sys.argv[1]
OUT = os.path.join(ROOT, 'store', 'screenshots')
W, H = 1080, 1920

# Raw shot name, headline, second line. Claims stay true to what the app does (no learner counts or job promises).
SHOTS = [
    ('1-home', 'Learn to code,', 'one short lesson a day'),
    ('2-journey', 'Follow your journey,', 'one step at a time'),
    ('3-roadmap', 'See every step', 'to your dream tech job'),
    ('4-paths', '13 career paths,', 'from Frontend to AI'),
    ('5-correct', 'Yatri cheers you on', 'when you get it right'),
    ('6-practice', 'Practise real Python', 'and crack output questions'),
    ('7-plan', 'A plan made for you', 'in under a minute'),
    ('8-certificate', 'Earn certificates.', 'Add them to LinkedIn'),
]

LEXEND = os.path.join(ROOT, 'node_modules', '@expo-google-fonts', 'lexend')


def font(size, bold=True):
    """Lexend, the app's display font (falls back to Segoe UI or Arial)."""
    p = os.path.join(LEXEND, '700Bold/Lexend_700Bold.ttf' if bold else '500Medium/Lexend_500Medium.ttf')
    if os.path.exists(p):
        return ImageFont.truetype(p, size)
    for n in (['segoeuib.ttf', 'arialbd.ttf'] if bold else ['segoeui.ttf', 'arial.ttf']):
        q = os.path.join('C:/Windows/Fonts', n)
        if os.path.exists(q):
            return ImageFont.truetype(q, size)
    return ImageFont.load_default()


def background():
    """The light brand background: white to lavender, with a soft saffron glow (like the footprints)."""
    top, bottom = (255, 255, 255), (226, 220, 255)
    bg = Image.new('RGB', (W, H))
    d = ImageDraw.Draw(bg)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    glow = Image.new('L', (W, H), 0)
    ImageDraw.Draw(glow).ellipse((W - 520, -260, W + 260, 520), fill=70)
    bg.paste((255, 159, 28), mask=glow.filter(ImageFilter.GaussianBlur(140)))
    glow2 = Image.new('L', (W, H), 0)
    ImageDraw.Draw(glow2).ellipse((-300, H - 700, 500, H + 200), fill=60)
    bg.paste((124, 92, 255), mask=glow2.filter(ImageFilter.GaussianBlur(160)))
    return bg


def rounded(img, radius):
    mask = Image.new('L', img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, img.size[0], img.size[1]), radius, fill=255)
    out = Image.new('RGBA', img.size)
    out.paste(img, mask=mask)
    return out


os.makedirs(OUT, exist_ok=True)
for n, (name, line1, line2) in enumerate(SHOTS, start=1):
    canvas = background().convert('RGBA')
    d = ImageDraw.Draw(canvas)
    f1, f2 = font(72), font(52, bold=False)
    for text, f, y, colour in ((line1, f1, 112, (23, 14, 92)), (line2, f2, 212, (75, 63, 216))):
        w = d.textlength(text, font=f)
        d.text(((W - w) / 2, y), text, font=f, fill=colour)

    shot = Image.open(os.path.join(RAW, name + '.png')).convert('RGB')
    scale = 0.8
    sw, sh = int(W * scale), int(H * scale)
    shot = rounded(shot.resize((sw, sh), Image.LANCZOS), 44)
    x, y = (W - sw) // 2, 340
    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((x + 6, y + 18, x + sw + 6, y + sh + 18), 48, fill=(45, 35, 120, 90))
    canvas = Image.alpha_composite(canvas, shadow.filter(ImageFilter.GaussianBlur(24)))
    frame = Image.new('RGBA', (sw + 20, sh + 20), (0, 0, 0, 0))
    ImageDraw.Draw(frame).rounded_rectangle((0, 0, sw + 19, sh + 19), 54, fill=(23, 14, 92, 255))
    canvas.alpha_composite(frame, (x - 10, y - 10))
    canvas.alpha_composite(shot, (x, y))
    path = os.path.join(OUT, f'{n:02d}-{name.split("-", 1)[1]}.png')
    canvas.convert('RGB').save(path, optimize=True)
    print('wrote', os.path.relpath(path, ROOT))
