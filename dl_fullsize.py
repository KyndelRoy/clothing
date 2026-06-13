#!/usr/bin/env python3
"""Download full-size versions of questionable photos to verify content."""

import io
import sys
import urllib.request
from pathlib import Path
from PIL import Image

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

IDS = [
    "1583743814966-8936f5b7be1a",  # contact-us
    "1607082348824-0a96f2a4b9da",  # offers-03
    "1551488831-00ddcb6c6bd3",     # backup clothing rack
    "1567401893414-76b7b1e5a7a5",  # backup boutique
    "1441986300917-64674bd600d8",  # backup women's boutique
    "1604176354204-9268737828e4",  # stack of jeans
]

out_dir = Path("/tmp/unsplash-fullsize")
out_dir.mkdir(exist_ok=True)

for pid in IDS:
    out = out_dir / f"{pid}.jpg"
    if out.exists():
        print(f"  cached {pid}")
        continue
    url = f"https://images.unsplash.com/photo-{pid}?w=1200&q=80&auto=format&fit=max"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
            img = Image.open(io.BytesIO(data)).convert("RGB")
            img.save(out, "JPEG", quality=80)
            print(f"  saved {pid}  {img.size}")
    except Exception as e:
        print(f"  FAIL {pid}: {e}")
