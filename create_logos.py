from PIL import Image, ImageDraw, ImageFont
import math

SIZE = 1024
PAD = 100

def save(name, img):
    img.save(f"logo-{name}.png")
    print(f"Created logo-{name}.png")

def get_font(size):
    try:
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
    except:
        return ImageFont.load_default()

def get_font_light(size):
    try:
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", size)
    except:
        return ImageFont.load_default()

# --- Logo 1: "APEX" with mountain/triangle mark ---
def logo_apex():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # Triangle / mountain mark
    tri_top = (cx, cy - 260)
    tri_bl = (cx - 200, cy + 40)
    tri_br = (cx + 200, cy + 40)
    draw.polygon([tri_top, tri_bl, tri_br], fill=(30, 30, 30, 255))

    # Inner triangle cutout (transparent)
    inner_top = (cx, cy - 160)
    inner_bl = (cx - 110, cy + 10)
    inner_br = (cx + 110, cy + 10)
    draw.polygon([inner_top, inner_bl, inner_br], fill=(0, 0, 0, 0))

    # Text "APEX"
    font = get_font(120)
    bbox = draw.textbbox((0, 0), "APEX", font=font)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw // 2, cy + 80), "APEX", fill=(30, 30, 30, 255), font=font)

    # Subtitle
    font_sm = get_font_light(36)
    sub = "ATHLETICS"
    bbox2 = draw.textbbox((0, 0), sub, font=font_sm)
    sw = bbox2[2] - bbox2[0]
    draw.text((cx - sw // 2, cy + 210), sub, fill=(100, 100, 100, 255), font=font_sm)

    save("apex", img)

# --- Logo 2: "VORN" with circle + slash ---
def logo_vorn():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # Circle ring
    r = 180
    draw.ellipse([cx-r, cy-240-r, cx+r, cy-240+r], outline=(20, 20, 20, 255), width=28)

    # Diagonal slash through circle
    offset = r - 20
    x1 = cx - offset
    y1 = cy - 240 - offset
    x2 = cx + offset
    y2 = cy - 240 + offset
    draw.line([(x1, y1), (x2, y2)], fill=(20, 20, 20, 255), width=28)

    # Text "VORN"
    font = get_font(130)
    bbox = draw.textbbox((0, 0), "VORN", font=font)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw // 2, cy + 20), "VORN", fill=(20, 20, 20, 255), font=font)

    # Underline
    draw.line([(cx - tw // 2, cy + 165), (cx + tw // 2, cy + 165)], fill=(20, 20, 20, 255), width=6)

    save("vorn", img)

# --- Logo 3: "DRIFT" with wave lines ---
def logo_drift():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # Three wave-like horizontal lines
    for i, y_off in enumerate([-220, -170, -120]):
        points = []
        for x in range(cx - 250, cx + 251, 5):
            y = cy + y_off + int(30 * math.sin((x - cx) * 0.03 + i * 1.2))
            points.append((x, y))
        if len(points) > 1:
            draw.line(points, fill=(40, 40, 40, 255), width=16)

    # Text "DRIFT"
    font = get_font(140)
    bbox = draw.textbbox((0, 0), "DRIFT", font=font)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw // 2, cy - 40), "DRIFT", fill=(40, 40, 40, 255), font=font)

    # Subtitle
    font_sm = get_font_light(34)
    sub = "STREETWEAR"
    bbox2 = draw.textbbox((0, 0), sub, font=font_sm)
    sw = bbox2[2] - bbox2[0]
    draw.text((cx - sw // 2, cy + 120), sub, fill=(120, 120, 120, 255), font=font_sm)

    save("drift", img)

# --- Logo 4: "KODA" with diamond shape ---
def logo_koda():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # Diamond (rotated square)
    d = 160
    diamond = [(cx, cy - 280 - d), (cx + d, cy - 280), (cx, cy - 280 + d), (cx - d, cy - 280)]
    draw.polygon(diamond, fill=(25, 25, 25, 255))

    # Inner diamond cutout
    di = 90
    inner = [(cx, cy - 280 - di), (cx + di, cy - 280), (cx, cy - 280 + di), (cx - di, cy - 280)]
    draw.polygon(inner, fill=(0, 0, 0, 0))

    # Small dot in center
    draw.ellipse([cx-15, cy-295, cx+15, cy-265], fill=(25, 25, 25, 255))

    # Text "KODA"
    font = get_font(130)
    bbox = draw.textbbox((0, 0), "KODA", font=font)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw // 2, cy - 50), "KODA", fill=(25, 25, 25, 255), font=font)

    # Subtitle
    font_sm = get_font_light(32)
    sub = "OUTERWEAR CO."
    bbox2 = draw.textbbox((0, 0), sub, font=font_sm)
    sw = bbox2[2] - bbox2[0]
    draw.text((cx - sw // 2, cy + 100), sub, fill=(110, 110, 110, 255), font=font_sm)

    save("koda", img)

# --- Logo 5: "FLUX" with stacked bars ---
def logo_flux():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # Three horizontal bars of decreasing width (like a signal icon)
    bars = [
        (cx - 220, cy - 320, cx + 220, cy - 280),
        (cx - 160, cy - 260, cx + 160, cy - 220),
        (cx - 100, cy - 200, cx + 100, cy - 160),
    ]
    for b in bars:
        draw.rectangle(b, fill=(35, 35, 35, 255))

    # Text "FLUX"
    font = get_font(150)
    bbox = draw.textbbox((0, 0), "FLUX", font=font)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw // 2, cy - 40), "FLUX", fill=(35, 35, 35, 255), font=font)

    # Thin horizontal rule
    draw.line([(cx - tw // 2, cy + 130), (cx + tw // 2, cy + 130)], fill=(35, 35, 35, 255), width=4)

    # Subtitle
    font_sm = get_font_light(32)
    sub = "APPAREL"
    bbox2 = draw.textbbox((0, 0), sub, font=font_sm)
    sw = bbox2[2] - bbox2[0]
    draw.text((cx - sw // 2, cy + 150), sub, fill=(110, 110, 110, 255), font=font_sm)

    save("flux", img)

# --- Logo 6 (bonus): "ZENITH" with arc ---
def logo_zenith():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # Arc above text
    arc_r = 220
    draw.arc([cx - arc_r, cy - 380, cx + arc_r, cy - 380 + arc_r * 2],
             start=200, end=340, fill=(30, 30, 30, 255), width=20)

    # Small star/dot at top of arc
    star_y = cy - 380 - 10
    draw.ellipse([cx - 12, star_y - 12, cx + 12, star_y + 12], fill=(30, 30, 30, 255))

    # Text "ZENITH"
    font = get_font(110)
    bbox = draw.textbbox((0, 0), "ZENITH", font=font)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw // 2, cy - 60), "ZENITH", fill=(30, 30, 30, 255), font=font)

    # Subtitle
    font_sm = get_font_light(30)
    sub = "EST. 2024"
    bbox2 = draw.textbbox((0, 0), sub, font=font_sm)
    sw = bbox2[2] - bbox2[0]
    draw.text((cx - sw // 2, cy + 70), sub, fill=(120, 120, 120, 255), font=font_sm)

    save("zenith", img)

logo_apex()
logo_vorn()
logo_drift()
logo_koda()
logo_flux()
logo_zenith()
print("Done!")
