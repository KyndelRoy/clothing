logos = {}

logos["apex"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <!-- Triangle mark -->
  <polygon points="200,60 120,200 280,200" fill="currentColor"/>
  <polygon points="200,110 150,190 250,190" fill="var(--bg, white)"/>
  <!-- Brand name -->
  <text x="200" y="280" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="72" fill="currentColor">APEX</text>
  <!-- Subtitle -->
  <text x="200" y="320" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="300" font-size="24" fill="currentColor" opacity="0.5">ATHLETICS</text>
</svg>'''

logos["vorn"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <!-- Circle with slash -->
  <circle cx="200" cy="120" r="70" fill="none" stroke="currentColor" stroke-width="14"/>
  <line x1="150" y1="70" x2="250" y2="170" stroke="currentColor" stroke-width="14"/>
  <!-- Brand name -->
  <text x="200" y="280" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="78" fill="currentColor">VORN</text>
  <!-- Underline -->
  <line x1="110" y1="300" x2="290" y2="300" stroke="currentColor" stroke-width="4"/>
</svg>'''

logos["drift"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <!-- Wave lines -->
  <path d="M80,80 Q140,50 200,80 T320,80" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
  <path d="M80,120 Q140,90 200,120 T320,120" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
  <path d="M80,160 Q140,130 200,160 T320,160" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
  <!-- Brand name -->
  <text x="200" y="270" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="84" fill="currentColor">DRIFT</text>
  <!-- Subtitle -->
  <text x="200" y="310" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="300" font-size="20" fill="currentColor" opacity="0.5">STREETWEAR</text>
</svg>'''

logos["koda"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <!-- Diamond -->
  <polygon points="200,40 280,120 200,200 120,120" fill="currentColor"/>
  <polygon points="200,75 250,120 200,165 150,120" fill="var(--bg, white)"/>
  <!-- Center dot -->
  <circle cx="200" cy="120" r="10" fill="currentColor"/>
  <!-- Brand name -->
  <text x="200" y="290" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="78" fill="currentColor">KODA</text>
  <!-- Subtitle -->
  <text x="200" y="325" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="300" font-size="18" fill="currentColor" opacity="0.5">OUTERWEAR CO.</text>
</svg>'''

logos["flux"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <!-- Stacked bars -->
  <rect x="80" y="60" width="240" height="22" fill="currentColor"/>
  <rect x="120" y="100" width="160" height="22" fill="currentColor"/>
  <rect x="160" y="140" width="80" height="22" fill="currentColor"/>
  <!-- Brand name -->
  <text x="200" y="260" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="90" fill="currentColor">FLUX</text>
  <!-- Divider -->
  <line x1="120" y1="280" x2="280" y2="280" stroke="currentColor" stroke-width="3"/>
  <!-- Subtitle -->
  <text x="200" y="315" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="300" font-size="22" fill="currentColor" opacity="0.5">APPAREL</text>
</svg>'''

logos["zenith"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <!-- Arc -->
  <path d="M100,180 A140,140 0 0,1 300,180" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
  <!-- Star dot -->
  <circle cx="200" cy="52" r="12" fill="currentColor"/>
  <!-- Brand name -->
  <text x="200" y="280" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="66" fill="currentColor">ZENITH</text>
  <!-- Subtitle -->
  <text x="200" y="320" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="300" font-size="20" fill="currentColor" opacity="0.5">EST. 2024</text>
</svg>'''

for name, svg in logos.items():
    with open(f"logo-{name}.svg", "w") as f:
        f.write(svg)
    print(f"Created logo-{name}.svg")

print("Done!")
