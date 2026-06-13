#!/usr/bin/env python3
"""Replace the two images that turned out wrong:
- contact-us-01: was a 'YAHWEH YIREH' tee (religious text), replace with boutique interior
- offers-image-03: was just shopping bags, replace with a womens clothing rack
"""

import io
import sys
import urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

# (photo_id, relative path, target_w, target_h)
REPLACEMENTS = [
    ("1567401893414-76b7b1e5a7a5", "public/images/contact-us-01.webp",  924, 828),
    ("1485230895905-ec40ba36b9bc", "public/images/offers/offers-image-03.webp", 942, 375),
]

def fetch(photo_id: str) -> bytes | None:
    url = f"https://images.unsplash.com/photo-{photo_id}?w=2000&q=85&auto=format&fit=max"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            if resp.status != 200:
                return None
            data = resp.read()
            if len(data) < 5_000:
                return None
            return data
    except Exception as e:
        print(f"  fetch failed for {photo_id}: {e}", file=sys.stderr)
        return None

def crop_to_aspect(img, target_w, target_h):
    src_w, src_h = img.size
    target_ratio = target_w / target_h
    src_ratio = src_w / src_h
    if src_ratio > target_ratio:
        new_w = int(src_h * target_ratio)
        left = (src_w - new_w) // 2
        img = img.crop((left, 0, left + new_w, src_h))
    else:
        new_h = int(src_w / target_ratio)
        top = (src_h - new_h) // 2
        img = img.crop((0, top, src_w, top + new_h))
    return img.resize((target_w, target_h), Image.LANCZOS)

for photo_id, rel, w, h in REPLACEMENTS:
    print(f"\n[{rel}]  target {w}x{h}  src {photo_id}")
    data = fetch(photo_id)
    if data is None:
        print("  FAIL")
        sys.exit(1)
    img = Image.open(io.BytesIO(data)).convert("RGB")
    out = crop_to_aspect(img, w, h)
    target = ROOT / rel
    out.save(target, "WEBP", quality=85, method=6)
    print(f"  OK  {img.size} -> {out.size}  {target.stat().st_size // 1024} KB")
