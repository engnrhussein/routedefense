import os
import math
import subprocess

base_dir = r"c:\Users\HP 1030 G2\Downloads\Website For Lawyers\RouteDefense\branding\Actual Business Card"
task_dir = os.path.join(base_dir, "task codes")
out_svg = os.path.join(base_dir, "routedefense_profile_v2.svg")
out_jpg = os.path.join(base_dir, "routedefense_profile_v2.jpg")

# Generate 50 radial tick marks for the 50 US States along radius 460
ticks_svg = []
for i in range(50):
    angle_deg = i * (360.0 / 50.0)
    angle_rad = math.radians(angle_deg)
    
    # Major ticks every 5 states (10 ticks)
    is_major = (i % 5 == 0)
    r_outer = 470
    r_inner = 452 if is_major else 458
    stroke_width = "2.5" if is_major else "1.2"
    stroke_color = "#E63946" if is_major else "#FFFFFF"
    opacity = "0.7" if is_major else "0.2"
    
    x1 = 512 + r_inner * math.cos(angle_rad)
    y1 = 512 + r_inner * math.sin(angle_rad)
    x2 = 512 + r_outer * math.cos(angle_rad)
    y2 = 512 + r_outer * math.sin(angle_rad)
    
    ticks_svg.append(f'    <line x1="{x1:.2f}" y1="{y1:.2f}" x2="{x2:.2f}" y2="{y2:.2f}" stroke="{stroke_color}" stroke-width="{stroke_width}" stroke-opacity="{opacity}" />')

ticks_content = "\n".join(ticks_svg)

svg_content = f"""<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   viewBox="0 0 1024 1024"
   width="1024"
   height="1024"
   version="1.1"
   id="routedefense_profile_v2"
   xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep Executive Obsidian Radial Field -->
    <radialGradient id="pfpV2Glow" cx="50%" cy="46%" r="65%">
      <stop offset="0%" stop-color="#181D26" />
      <stop offset="45%" stop-color="#0F1218" />
      <stop offset="85%" stop-color="#08090C" />
      <stop offset="100%" stop-color="#040507" />
    </radialGradient>

    <!-- Glowing Safety Crimson -->
    <linearGradient id="pfpV2Crimson" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4D5E" />
      <stop offset="100%" stop-color="#D90429" />
    </linearGradient>

    <!-- Metallic Shield Glow -->
    <filter id="pfpV2MarkGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000000" flood-opacity="0.7"/>
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#FFFFFF" flood-opacity="0.08"/>
    </filter>

    <!-- Crimson Pulse Glow -->
    <filter id="crimsonPulse" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="#E63946" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Deep Obsidian Canvas -->
  <rect width="1024" height="1024" fill="url(#pfpV2Glow)" id="bg_canvas" />

  <!-- Background Technical Grid & Routing Rings -->
  <g id="technical_radar_rings">
    <!-- Concentric Jurisdictional Coordinate Rings -->
    <circle cx="512" cy="512" r="486" fill="none" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="1.5" />
    <circle cx="512" cy="512" r="472" fill="none" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1" />
    <circle cx="512" cy="512" r="435" fill="none" stroke="url(#pfpV2Crimson)" stroke-opacity="0.25" stroke-width="1.5" stroke-dasharray="4 8" />
    <circle cx="512" cy="512" r="365" fill="none" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1" stroke-dasharray="16 12" />
    <circle cx="512" cy="512" r="280" fill="none" stroke="#FFFFFF" stroke-opacity="0.03" stroke-width="1" />

    <!-- 50 Radial State Jurisdiction Ticks along circumference -->
    <g id="state_jurisdiction_ticks">
{ticks_content}
    </g>

    <!-- Cardinal Coordinates / Network Badges -->
    <text x="512" y="58" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="10.5px" font-weight="800" letter-spacing="4" fill="#E63946" text-anchor="middle">50-STATE JURISDICTION</text>
    <text x="512" y="980" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="10.5px" font-weight="700" letter-spacing="4" fill="#94A3B8" text-anchor="middle">3,143 MUNICIPAL DOCKETS</text>
    
    <!-- Crosshair hairlines -->
    <line x1="512" y1="70" x2="512" y2="130" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1" />
    <line x1="512" y1="894" x2="512" y2="954" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1" />
    <line x1="70" y1="512" x2="130" y2="512" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1" />
    <line x1="894" y1="512" x2="954" y2="512" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1" />
  </g>

  <!-- Center Presentation: High-Impact RouteDefense Emblem -->
  <!-- Center is (512, 470) -->
  <g transform="translate(512, 450)" id="center_emblem_unit" filter="url(#pfpV2MarkGlow)">
    
    <!-- Emblem Scaling & Placement -->
    <!-- Original emblem is 200x200; scale=1.45 => 290x290; offset=(-145, -200) -->
    <g transform="translate(-145, -205) scale(1.45)" id="emblem_geometry">
      <!-- Ambient Backglow for Emblem -->
      <path
         d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z"
         fill="none"
         stroke="#FFFFFF"
         stroke-width="32"
         stroke-linejoin="miter"
         stroke-opacity="0.05" />

      <!-- Outer Shield / Pathway (Solid Crisp White) -->
      <path
         d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z"
         fill="none"
         stroke="#FFFFFF"
         stroke-width="24"
         stroke-linejoin="miter" />

      <!-- Inner Forward Motion Line -->
      <path
         d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200"
         fill="none"
         stroke="#FFFFFF"
         stroke-width="24"
         stroke-linejoin="miter" />

      <!-- Safety Crimson Resolution Square (With Active Glow) -->
      <rect
         x="116"
         y="148"
         width="24"
         height="24"
         fill="url(#pfpV2Crimson)"
         filter="url(#crimsonPulse)" />
    </g>

    <!-- Brand Typography Unit -->
    <text
       x="0"
       y="170"
       font-family="'Geist', 'Inter', -apple-system, sans-serif"
       font-size="44px"
       font-weight="900"
       fill="#FFFFFF"
       letter-spacing="10"
       text-anchor="middle"
       id="brand_headline">ROUTEDEFENSE</text>

    <!-- Sub-Brand Pill Badge -->
    <g transform="translate(0, 206)">
      <rect x="-140" y="-14" width="280" height="28" rx="14" fill="#E63946" fill-opacity="0.12" stroke="#E63946" stroke-opacity="0.4" stroke-width="1.2" />
      <text
         x="0"
         y="4.5"
         font-family="'Geist', 'Inter', -apple-system, sans-serif"
         font-size="12px"
         font-weight="800"
         fill="#E63946"
         letter-spacing="5"
         text-anchor="middle">LEGAL TECHNOLOGY NETWORK</text>
    </g>
  </g>

  <!-- Circular Outer Crop Guide (Safety View for Circular Cropping) -->
  <circle cx="512" cy="512" r="502" fill="none" stroke="#FFFFFF" stroke-opacity="0.03" stroke-width="2" />
</svg>
"""

with open(out_svg, "w", encoding="utf-8") as f:
    f.write(svg_content)

print(f"Generated Profile Picture v2 SVG at: {out_svg}")

# Export high-res JPG
magick_path = r"C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe"
if os.path.exists(magick_path):
    subprocess.run([magick_path, out_svg, "-density", "300", "-quality", "96", out_jpg], check=True)
    print(f"Exported Profile Picture v2 JPG at: {out_jpg}")
