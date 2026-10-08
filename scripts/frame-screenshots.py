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

SHOTS = [
    ('1-learn', 'Learn to code,', 'one short lesson a day'),
    ('3-order', 'Practise 8 ways:', 'order, debug, predict'),
    ('4-editor', 'Write real code.', 'Tests check it instantly'),
    ('5-web', 'Build real web pages', 'with a live preview'),
    ('6-predict', 'Crack the output questions', 'placement tests love'),
    ('7-practice', 'Guided projects', 'you can show your friends'),
    ('8-certificate', 'Earn certificates.', 'Add them to LinkedIn'),
    ('10-share', 'Keep your streak.', 'Share your progress'),
]


def font(size, bold=True):
    names = ['segoeuib.ttf', 'arialbd.ttf'] if bold else ['segoeui.ttf', 'arial.ttf']
    for n in names:
        p = os.path.join('C:/Windows/Fonts', n)
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def background():
    top, bottom = (6, 16, 74), (59, 47, 192)
    bg = Image.new('RGB', (W, H))
    d = ImageDraw.Draw(bg)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    glow = Image.new('L', (W, H), 0)
    ImageDraw.Draw(glow).ellipse((W - 520, -260, W + 260, 520), fill=60)
    bg.paste((255, 159, 28), mask=glow.filter(ImageFilter.GaussianBlur(120)))
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
    f1, f2 = font(76), font(56, bold=False)
    for text, f, y, colour in ((line1, f1, 120, (255, 255, 255)), (line2, f2, 214, (255, 197, 107))):
        w = d.textlength(text, font=f)
        d.text(((W - w) / 2, y), text, font=f, fill=colour)

    shot = Image.open(os.path.join(RAW, name + '.png')).convert('RGB')
    scale = 0.8
    sw, sh = int(W * scale), int(H * scale)
    shot = rounded(shot.resize((sw, sh), Image.LANCZOS), 44)
    x, y = (W - sw) // 2, 340
    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((x + 6, y + 18, x + sw + 6, y + sh + 18), 48, fill=(0, 0, 0, 110))
    canvas = Image.alpha_composite(canvas, shadow.filter(ImageFilter.GaussianBlur(24)))
    frame = Image.new('RGBA', (sw + 20, sh + 20), (0, 0, 0, 0))
    ImageDraw.Draw(frame).rounded_rectangle((0, 0, sw + 19, sh + 19), 54, fill=(22, 20, 43, 255))
    canvas.alpha_composite(frame, (x - 10, y - 10))
    canvas.alpha_composite(shot, (x, y))
    path = os.path.join(OUT, f'{n:02d}-{name.split("-", 1)[1]}.png')
    canvas.convert('RGB').save(path, optimize=True)
    print('wrote', os.path.relpath(path, ROOT))
