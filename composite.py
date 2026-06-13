from PIL import Image
import random
import os

random.seed(42)

tshirt_colors = [
    "black",
    "navy-blue",
    "red",
    "forest-green",
    "royal-blue",
]

logo_names = ["apex", "vorn", "drift", "koda", "flux", "zenith"]

# Load logos
logos = {}
for name in logo_names:
    logo = Image.open(f"logo-{name}.png").convert("RGBA")
    logos[name] = logo

# Load t-shirts and composite logos
os.makedirs("public/images/hero-section", exist_ok=True)

for i, color in enumerate(tshirt_colors):
    tshirt = Image.open(f"tshirt-{color}.png").convert("RGBA")
    tw, th = tshirt.size

    # Pick 1-2 random logos for this t-shirt
    chosen = random.sample(logo_names, random.randint(1, 2))

    for logo_name in chosen:
        logo = logos[logo_name].copy()

        # Resize logo to ~20-30% of t-shirt width
        logo_size = int(tw * random.uniform(0.18, 0.28))
        aspect = logo.height / logo.width
        logo = logo.resize((logo_size, int(logo_size * aspect)), Image.LANCZOS)

        # Random position within the chest/torso area of the t-shirt
        # T-shirt body is roughly centered, between 25%-75% horizontally and 30%-75% vertically
        max_x = tw - logo.width
        max_y = th - logo.height
        x = random.randint(int(tw * 0.25), int(tw * 0.75) - logo.width)
        y = random.randint(int(th * 0.28), int(th * 0.65) - logo.height)

        # Ensure x, y are within bounds
        x = max(0, min(x, tw - logo.width))
        y = max(0, min(y, th - logo.height))

        # Paste logo with alpha compositing
        tshirt.paste(logo, (x, y), logo)

    # Save as webp for performance
    output_path = f"public/images/hero-section/tshirt-{i+1:02d}.png"
    tshirt.save(output_path, optimize=True)
    print(f"Created {output_path} (color: {color}, logos: {', '.join(chosen)})")

# Also copy SVG logos to public
os.makedirs("public/images/logos", exist_ok=True)
for name in logo_names:
    import shutil
    shutil.copy(f"logo-{name}.svg", f"public/images/logos/logo-{name}.svg")
    print(f"Copied logo-{name}.svg to public/images/logos/")

print("Done!")
