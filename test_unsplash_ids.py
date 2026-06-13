#!/usr/bin/env python3
"""Test candidate Unsplash photo IDs and report which are valid images."""

import io
import sys
import urllib.request
from PIL import Image
from pathlib import Path

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

# Diverse candidates for clothing/apparel photos on Unsplash
CANDIDATES = [
    "1483985988355-763728e1935b",   # woman with shopping bags
    "1521572163474-6864f9cf17ab",   # man in white tee
    "1602810318383-e386cc2a3ccf",   # clothing rack colorful
    "1542060748-10c28b62716f",      # t-shirts hanging
    "1620799140408-edc6dcb6d633",   # sweatshirt flat lay
    "1558769132-cb1aea458c5e",      # clothing rack w/ pampas
    "1567401893414-76b7b1e5a7a5",   # clothing store
    "1556905055-8f358a7a47b2",      # clothing display
    "1582738411706-bfc8e691d1c2",   # white t-shirt folded
    "1521577352947-9bb58764b69a",   # t-shirts laid
    "1583743814966-8936f5b7be1a",   # clothing rack store
    "1576566588028-4147f3842f27",   # shirt on hanger
    "1485230895905-ec40ba36b9bc",   # clothing rack
    "1503342217505-b0a15ec3261c",   # apparel shop
    "1576185850227-1f72b7f8d483",   # man shopping
    "1554568218-0f1715e72254",      # apparel shop
    "1490481651871-ab68de25d43d",   # clothing rack
    "1441986300917-64674bd600d8",   # clothing store interior
    "1581655353564-df123a1eb820",   # clothing store
    "1542838132-92c53300491e",      # t-shirts hanging
    "1542295669297-4d352b042bca",   # fashion store
    "1571513722275-4b41940f54b8",   # t-shirts hanging
    "1581044777550-4cfa60707c03",   # t-shirts
    "1551488831-00ddcb6c6bd3",      # clothing
    "1591047139829-d91aecb6caea",   # folded clothes
    "1564859228273-274232fdb516",   # t-shirts
    "1562157873-818bc0786ddd",      # clothing store
    "1582142306909-195724d33ffc",   # folded t-shirts
    "1542060748-10c28b62716f",      # t-shirts hanging
    "1592878904946-b3cd8ae243d0",   # shirts on rack
    "1620799139507-2a76f79a2f4d",   # t-shirts folded
    "1611591437281-460bfbe1220a",   # white t-shirt
    "1605518216938-7c31b7b14ad0",   # t-shirts
    "1554568218-0f1715e72254",      # shop
    "1551232864-3f0890e580d9",      # t-shirt
    "1581655353564-df123a1eb820",   # shop
    "1572584642822-6f8de0243c04",   # clothing
    "1607082348824-0a96f2a4b9da",   # clothing
    "1605518216938-7c31b7b14ad0",   # shirts
    "1612215327100-2bf03f1bba4c",   # shirts
    "1551803091-e20673f15770",      # shirts
    "1485518882345-15568b007407",   # apparel
    "1572804013427-4d7ca7268217",   # t-shirts
    "1604176354204-9268737828e4",   # clothing
    "1523381294911-8d3ce91b6d68",   # folded t-shirts
    "1581655353564-df123a1eb820",   # clothing
]

out_dir = Path("/tmp/unsplash-test")
out_dir.mkdir(exist_ok=True)
seen = set()
for pid in CANDIDATES:
    if pid in seen:
        continue
    seen.add(pid)
    url = f"https://images.unsplash.com/photo-{pid}?w=800&q=80&auto=format&fit=max"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = resp.read()
            if len(data) < 5000:
                print(f"  TOO SMALL: {pid} ({len(data)} bytes)")
                continue
            try:
                img = Image.open(io.BytesIO(data))
                img.verify()
                # re-open to get size
                img = Image.open(io.BytesIO(data))
                print(f"  OK  {pid}  {img.size}")
            except Exception as e:
                print(f"  DECODE FAIL: {pid}  {e}")
    except Exception as e:
        print(f"  FETCH FAIL: {pid}  {e}")
