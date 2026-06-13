from PIL import Image
import numpy as np
from scipy.ndimage import binary_fill_holes, gaussian_filter

COLORS = {
    "black": (30, 30, 30),
    "navy-blue": (20, 30, 70),
    "red": (180, 30, 30),
    "forest-green": (34, 100, 34),
    "heather-gray": (160, 160, 165),
    "royal-blue": (40, 70, 180),
    "maroon": (110, 25, 25),
    "olive-green": (100, 110, 40),
    "orange": (210, 120, 20),
    "purple": (90, 40, 130),
    "teal": (20, 110, 110),
    "charcoal": (70, 70, 70),
}

img = Image.open("tshirt-white.png").convert("RGBA")
arr = np.array(img, dtype=np.float64)
r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]

white_dist = np.sqrt((r - 255)**2 + (g - 255)**2 + (b - 255)**2)
shirt_mask = (white_dist > 3) & (a > 50)
shirt_mask_clean = binary_fill_holes(shirt_mask)
shirt_mask_float = gaussian_filter(shirt_mask_clean.astype(np.float64), sigma=3.0)
shirt_mask_float = np.clip(shirt_mask_float, 0, 1)

lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255.0

for name, (tr, tg, tb) in COLORS.items():
    out = arr.copy()
    out[:,:,0] = np.clip(tr * lum, 0, 255)
    out[:,:,1] = np.clip(tg * lum, 0, 255)
    out[:,:,2] = np.clip(tb * lum, 0, 255)

    result = arr.copy()
    for c in range(3):
        result[:,:,c] = arr[:,:,c] * (1 - shirt_mask_float) + out[:,:,c] * shirt_mask_float

    # Set alpha: background = 0, shirt = original alpha blended by mask
    result[:,:,3] = shirt_mask_float * 255

    result_img = Image.fromarray(result.astype(np.uint8), "RGBA")
    result_img.save(f"tshirt-{name}.png")
    print(f"Created tshirt-{name}.png (transparent background)")

print("Done!")
