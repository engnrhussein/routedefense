import os
import qrcode
import cv2
import numpy as np

base_dir = r"c:\Users\HP 1030 G2\Downloads\Website For Lawyers\RouteDefense\branding\Actual Business Card"
out_svg = os.path.join(base_dir, "routedefense_QR.svg")

# Target URL for RouteDefense Client Portal
target_url = "https://routedefensegroup.com"

qr = qrcode.QRCode(
    version=4, # 33x33 grid
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=1,
    border=0,
)
qr.add_data(target_url)
qr.make(fit=False)
modules = qr.modules

# Grid dimensions
N = len(modules) # 33

# Cutout range for center logo (11x11 from index 11 to 21)
cutout_start = 11
cutout_end = 21

svg_lines = []
svg_lines.append('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n')
svg_lines.append('<svg\n')
svg_lines.append('   viewBox="0 0 37 37"\n')
svg_lines.append('   width="1024"\n')
svg_lines.append('   height="1024"\n')
svg_lines.append('   version="1.1"\n')
svg_lines.append('   id="routedefense_qr_svg"\n')
svg_lines.append('   xmlns="http://www.w3.org/2000/svg">\n')
svg_lines.append('  <defs>\n')
svg_lines.append('    <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">\n')
svg_lines.append('      <feDropShadow dx="0" dy="0.3" stdDeviation="0.4" flood-color="#000000" flood-opacity="0.15"/>\n')
svg_lines.append('    </filter>\n')
svg_lines.append('  </defs>\n')
svg_lines.append('  <!-- Solid white background with subtle border radius -->\n')
svg_lines.append('  <rect x="0" y="0" width="37" height="37" fill="#FFFFFF" rx="3.5" />\n')
svg_lines.append('  <rect x="0.25" y="0.25" width="36.5" height="36.5" fill="none" stroke="#E5E7EB" stroke-width="0.5" rx="3.5" />\n')
svg_lines.append('  <g transform="translate(2, 2)" id="qr_modules">\n')

# Add circles for modules
for r in range(N):
    for c in range(N):
        if not modules[r][c]:
            continue
        
        # Skip position detection squares (top-left, top-right, bottom-left)
        if r < 7 and c < 7:
            continue
        if r < 7 and c > 25:
            continue
        if r > 25 and c < 7:
            continue
        
        # Skip center logo cutout area
        if cutout_start <= r <= cutout_end and cutout_start <= c <= cutout_end:
            continue
        
        cx = c + 0.5
        cy = r + 0.5
        svg_lines.append(f'    <circle cx="{cx:.2f}" cy="{cy:.2f}" r="0.44" fill="#111111" />\n')

# Finder patterns: Top-Left
svg_lines.append('    <!-- Finder Pattern: Top-Left -->\n')
svg_lines.append('    <rect x="0.5" y="0.5" width="6" height="6" rx="1.6" fill="none" stroke="#111111" stroke-width="1" />\n')
svg_lines.append('    <rect x="2" y="2" width="3" height="3" rx="0.8" fill="#E63946" />\n')

# Finder patterns: Top-Right
svg_lines.append('    <!-- Finder Pattern: Top-Right -->\n')
svg_lines.append('    <rect x="26.5" y="0.5" width="6" height="6" rx="1.6" fill="none" stroke="#111111" stroke-width="1" />\n')
svg_lines.append('    <rect x="28" y="2" width="3" height="3" rx="0.8" fill="#E63946" />\n')

# Finder patterns: Bottom-Left
svg_lines.append('    <!-- Finder Pattern: Bottom-Left -->\n')
svg_lines.append('    <rect x="0.5" y="26.5" width="6" height="6" rx="1.6" fill="none" stroke="#111111" stroke-width="1" />\n')
svg_lines.append('    <rect x="2" y="28" width="3" height="3" rx="0.8" fill="#E63946" />\n')

# Center Emblem Badge
# Center coordinate is (16.5, 16.5). Size is 10.6 x 10.6. Top-left is (11.2, 11.2)
svg_lines.append('    <!-- Center RouteDefense Emblem Badge -->\n')
svg_lines.append('    <g id="center_emblem">\n')
svg_lines.append('      <rect x="11" y="11" width="11" height="11" rx="2.5" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.4" filter="url(#badgeShadow)" />\n')
# Logo geometry: 200x200 box -> fit in 7.6 x 7.6 at (12.7, 12.7)
# Scale = 7.6 / 200 = 0.038
# Translate to 12.7, 12.7
svg_lines.append('      <g transform="translate(12.7, 12.7) scale(0.038)">\n')
svg_lines.append('        <!-- Outer Shield / Pathway -->\n')
svg_lines.append('        <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#111111" stroke-width="26" stroke-linejoin="miter" />\n')
svg_lines.append('        <!-- Inner Forward Motion Line -->\n')
svg_lines.append('        <path d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200" fill="none" stroke="#111111" stroke-width="26" stroke-linejoin="miter" />\n')
svg_lines.append('        <!-- Safety Crimson Accent Square -->\n')
svg_lines.append('        <rect x="116" y="148" width="26" height="26" fill="#E63946" />\n')
svg_lines.append('      </g>\n')
svg_lines.append('    </g>\n')

svg_lines.append('  </g>\n')
svg_lines.append('</svg>\n')

with open(out_svg, "w", encoding="utf-8") as f:
    f.writelines(svg_lines)

print(f"Generated RouteDefense vector QR SVG at: {out_svg}")
