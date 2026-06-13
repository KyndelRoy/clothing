#!/usr/bin/env python3
"""Download clothing/apparel images from Unsplash, crop to match existing
aspect ratios, and save as webp over the existing files."""

import io
import sys
import urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent

# Target files: (relative path, width, height)
TARGETS = [
    ("public/images/about-us.webp",          1920, 1014),
    ("public/images/contact-us-01.webp",      924,  828),
    ("public/images/new-items/new-items-01.webp", 616, 357),
    ("public/images/new-items/new-items-02.webp", 616, 357),
    ("public/images/new-items/new-items-03.webp", 800, 541),
    ("public/images/offers/offers-image-01.webp", 942, 786),
    ("public/images/offers/offers-image-02.webp", 942, 375),
    ("public/images/offers/offers-image-03.webp", 942, 375),
]

# Slot -> list of Unsplash photo IDs, all clothing/apparel themed.
# The first ID in each list is the preferred one (must be visually verified).
SLOTS = {
    # wide hero "story" image — woman with shopping bags
    "about-us": [
        "1483985988355-763728e1935b",   # woman with shopping bags
        "1582142306909-195724d33ffc",   # street style + shopping bags
        "1551803091-e20673f15770",      # storefront with mannequins
    ],
    # nearly square "contact us" — boutique/store interior
    "contact-us": [
        "1583743814966-8936f5b7be1a",   # boutique interior military style
        "1567401893414-76b7b1e5a7a5",   # boutique with clothing racks
        "1441986300917-64674bd600d8",   # women's boutique
    ],
    # widescreen clothing item
    "new-items-01": [
        "1551488831-00ddcb6c6bd3",      # clothing rack w/ olive, leather, denim
        "1607082348824-0a96f2a4b9da",   # clothing rack w/ neutral garments
        "1542060748-10c28b62716f",      # t-shirts hanging
    ],
    # widescreen clothing item
    "new-items-02": [
        "1542060748-10c28b62716f",      # t-shirts hanging colorful
        "1551488831-00ddcb6c6bd3",      # clothing rack
        "1607082348824-0a96f2a4b9da",   # clothing rack
    ],
    # slightly wider — apparel flat lay
    "new-items-03": [
        "1556905055-8f358a7a47b2",      # flat lay with beanie, sweater, jeans
        "1620799140408-edc6dcb6d633",   # sweatshirt flat lay
        "1604176354204-9268737828e4",   # stack of folded jeans
    ],
    # medium rectangle — store/retail display
    "offers-01": [
        "1592878904946-b3cd8ae243d0",   # Levi's jeans in store
        "1551488831-00ddcb6c6bd3",      # clothing rack
        "1607082348824-0a96f2a4b9da",   # clothing rack
    ],
    # ultra-wide banner — clothing rack
    "offers-02": [
        "1558769132-cb1aea458c5e",      # clothing rack w/ pampas
        "1551488831-00ddcb6c6bd3",      # clothing rack
        "1607082348824-0a96f2a4b9da",   # clothing rack
    ],
    # ultra-wide banner — different clothing rack
    "offers-03": [
        "1607082348824-0a96f2a4b9da",   # clothing rack neutral
        "1558769132-cb1aea458c5e",      # clothing rack w/ pampas
        "1551488831-00ddcb6c6bd3",      # clothing rack
    ],
}

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

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

def crop_to_aspect(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
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

def download_slot(slot: str, candidates: list[str], rel_path: str, w: int, h: int) -> bool:
    print(f"\n[{slot}] -> {rel_path}  ({w}x{h})")
    for photo_id in candidates:
        print(f"  trying {photo_id}...")
        data = fetch(photo_id)
        if data is None:
            continue
        try:
            img = Image.open(io.BytesIO(data)).convert("RGB")
        except Exception as e:
            print(f"  decode failed: {e}")
            continue
        out = crop_to_aspect(img, w, h)
        target = ROOT / rel_path
        target.parent.mkdir(parents=True, exist_ok=True)
        out.save(target, "WEBP", quality=85, method=6)
        size_kb = target.stat().st_size // 1024
        print(f"  OK  {img.size} -> {out.size}  {size_kb} KB  [used {photo_id}]")
        return True
    print(f"  ALL CANDIDATES FAILED for {slot}")
    return False

def main() -> int:
    mapping = [
        ("about-us",      "public/images/about-us.webp"),
        ("contact-us",    "public/images/contact-us-01.webp"),
        ("new-items-01",  "public/images/new-items/new-items-01.webp"),
        ("new-items-02",  "public/images/new-items/new-items-02.webp"),
        ("new-items-03",  "public/images/new-items/new-items-03.webp"),
        ("offers-01",     "public/images/offers/offers-image-01.webp"),
        ("offers-02",     "public/images/offers/offers-image-02.webp"),
        ("offers-03",     "public/images/offers/offers-image-03.webp"),
    ]
    failures = 0
    used_ids = []
    for slot, rel in mapping:
        w, h = next(t[1:] for t in TARGETS if t[0] == rel)
        # find the first candidate that isn't already used
        for cand in SLOTS[slot]:
            if cand not in used_ids:
                selected = [cand] + [c for c in SLOTS[slot] if c != cand]
                break
        else:
            selected = SLOTS[slot]
        if not download_slot(slot, selected, rel, w, h):
            failures += 1
        else:
            used_ids.append(selected[0])
    print(f"\n=== done. failures: {failures} ===")
    print(f"=== unique images used: {len(used_ids)} / 8 ===")
    return 1 if failures else 0

if __name__ == "__main__":
    sys.exit(main())
