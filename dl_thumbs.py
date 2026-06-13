#!/usr/bin/env python3
"""Download small thumbnails of candidates for visual inspection."""

import io
import sys
import urllib.request
from pathlib import Path
from PIL import Image

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

# Group of new candidates to check
CANDIDATES = [
    "1567401893414-76b7b1e5a7a5",
    "1556905055-8f358a7a47b2",
    "1582738411706-bfc8e691d1c2",
    "1521577352947-9bb58764b69a",
    "1583743814966-8936f5b7be1a",
    "1576566588028-4147f3842f27",
    "1485230895905-ec40ba36b9bc",
    "1503342217505-b0a15ec3261c",
    "1576185850227-1f72b7f8d483",
    "1554568218-0f1715e72254",
    "1490481651871-ab68de25d43d",
    "1441986300917-64674bd600d8",
    "1581655353564-df123a1eb820",
    "1542838132-92c53300491e",
    "1542295669297-4d352b042bca",
    "1571513722275-4b41940f54b8",
    "1581044777550-4cfa60707c03",
    "1551488831-00ddcb6c6bd3",
    "1591047139829-d91aecb6caea",
    "1564859228273-274232fdb516",
    "1582142306909-195724d33ffc",
    "1592878904946-b3cd8ae243d0",
    "1620799139507-2a76f79a2f4d",
    "1611591437281-460bfbe1220a",
    "1605518216938-7c31b7b14ad0",
    "1551232864-3f0890e580d9",
    "1607082348824-0a96f2a4b9da",
    "1551803091-e20673f15770",
    "1485518882345-15568b007407",
    "1572804013427-4d7ca7268217",
    "1604176354204-9268737828e4",
]

out_dir = Path("/tmp/unsplash-thumbs")
out_dir.mkdir(exist_ok=True)

for pid in CANDIDATES:
    out = out_dir / f"{pid}.jpg"
    if out.exists():
        continue
    url = f"https://images.unsplash.com/photo-{pid}?w=400&q=70&auto=format&fit=max"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = resp.read()
            if len(data) < 5000:
                continue
            img = Image.open(io.BytesIO(data)).convert("RGB")
            img.thumbnail((400, 400))
            img.save(out, "JPEG", quality=80)
            print(f"  saved {pid}")
    except Exception as e:
        print(f"  FAIL {pid}: {e}")
