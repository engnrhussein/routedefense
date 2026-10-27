import os
import qrcode

base_dir = r"c:\Users\HP 1030 G2\Downloads\Website For Lawyers\RouteDefense\branding\Actual Business Card"
task_dir = os.path.join(base_dir, "task codes")
os.makedirs(task_dir, exist_ok=True)

# Generate QR modules matrix for https://routedefensegroup.com
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
N = len(modules) # 33

cutout_start = 11
cutout_end = 21

def generate_qr_elements(prefix_indent="        "):
    elements = []
    # Circles for modules
    for r in range(N):
        for c in range(N):
            if not modules[r][c]:
                continue
            if r < 7 and c < 7: continue
            if r < 7 and c > 25: continue
            if r > 25 and c < 7: continue
            if cutout_start <= r <= cutout_end and cutout_start <= c <= cutout_end: continue
            cx = c + 0.5
            cy = r + 0.5
            elements.append(f'{prefix_indent}<circle cx="{cx:.2f}" cy="{cy:.2f}" r="0.44" fill="#111111" />')
    
    # Finder patterns
    elements.append(f'{prefix_indent}<!-- Top-Left Finder -->')
    elements.append(f'{prefix_indent}<rect x="0.5" y="0.5" width="6" height="6" rx="1.6" fill="none" stroke="#111111" stroke-width="1" />')
    elements.append(f'{prefix_indent}<rect x="2" y="2" width="3" height="3" rx="0.8" fill="#111111" />')
    
    elements.append(f'{prefix_indent}<!-- Top-Right Finder -->')
    elements.append(f'{prefix_indent}<rect x="26.5" y="0.5" width="6" height="6" rx="1.6" fill="none" stroke="#111111" stroke-width="1" />')
    elements.append(f'{prefix_indent}<rect x="28" y="2" width="3" height="3" rx="0.8" fill="#111111" />')
    
    elements.append(f'{prefix_indent}<!-- Bottom-Left Finder -->')
    elements.append(f'{prefix_indent}<rect x="0.5" y="26.5" width="6" height="6" rx="1.6" fill="none" stroke="#111111" stroke-width="1" />')
    elements.append(f'{prefix_indent}<rect x="2" y="28" width="3" height="3" rx="0.8" fill="#111111" />')
    
    # Center Emblem Badge
    elements.append(f'{prefix_indent}<!-- Center Emblem Badge -->')
    elements.append(f'{prefix_indent}<rect x="11" y="11" width="11" height="11" rx="2.5" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.4" />')
    elements.append(f'{prefix_indent}<g transform="translate(13.0, 13.0) scale(0.035)">')
    elements.append(f'{prefix_indent}  <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#111111" stroke-width="26" stroke-linejoin="miter" />')
    elements.append(f'{prefix_indent}  <path d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200" fill="none" stroke="#111111" stroke-width="26" stroke-linejoin="miter" />')
    elements.append(f'{prefix_indent}  <rect x="116" y="148" width="26" height="26" fill="#E63946" />')
    elements.append(f'{prefix_indent}</g>')
    
    return "\n".join(elements)

qr_elements_svg = generate_qr_elements()

# Master Shared SVG Definitions (Gradients, Filters, Clips)
shared_defs = """  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgDarkFront" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14171D" />
      <stop offset="50%" stop-color="#0E1014" />
      <stop offset="100%" stop-color="#07080A" />
    </linearGradient>
    <linearGradient id="bgLightBack" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F9FAFB" />
    </linearGradient>

    <!-- Crimson Brand Accent Gradient -->
    <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4D5E" />
      <stop offset="100%" stop-color="#E63946" />
    </linearGradient>

    <!-- Luxury Gold Accent Gradient (CEO/Directorate Title) -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7E07C" />
      <stop offset="40%" stop-color="#DFB143" />
      <stop offset="100%" stop-color="#B88A28" />
    </linearGradient>

    <!-- Card Edge Clip Path -->
    <clipPath id="cardClip">
      <rect width="1050" height="600" />
    </clipPath>

    <!-- Shadow Filters -->
    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.08" />
    </filter>
    <filter id="markGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.4" />
    </filter>
  </defs>

  <style>
    .font-brand-title { font-family: 'Geist', 'Inter', -apple-system, sans-serif; font-weight: 900; letter-spacing: 8px; fill: #FFFFFF; }
    .font-brand-sub { font-family: 'Geist', 'Inter', -apple-system, sans-serif; font-weight: 700; letter-spacing: 5px; fill: #E63946; }
    .font-tagline { font-family: 'Geist', 'Inter', -apple-system, sans-serif; font-size: 15px; font-weight: 500; letter-spacing: 5px; fill: #94A3B8; }
    .font-exec-title { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 24px; font-weight: 700; letter-spacing: 1.5px; fill: url(#goldGrad); }
    .font-contact-label { font-family: 'Geist', 'Inter', -apple-system, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 1.2px; fill: #94A3B8; }
    .font-contact-val { font-family: 'Geist', 'Inter', -apple-system, sans-serif; font-size: 15px; font-weight: 700; fill: #111111; }
    .font-body-desc { font-family: 'Geist', 'Inter', -apple-system, sans-serif; font-size: 14px; font-weight: 400; fill: #4B5563; line-height: 1.5; }
  </style>"""

# Front Side Group Content
def get_front_content(translate_x=0):
    return f"""  <!-- ==================== FRONT SIDE (Obsidian & Platinum Luxury) ==================== -->
  <g transform="translate({translate_x}, 0)" id="card_front">
    <!-- Card Base -->
    <rect width="1050" height="600" fill="url(#bgDarkFront)" />

    <!-- Content Clipped to Exact Card Boundaries -->
    <g clip-path="url(#cardClip)">
      <!-- Subtle Architectural Watermark Lines -->
      <path d="M 0 320 C 350 180 700 460 1050 320 L 1050 600 L 0 600 Z" fill="url(#crimsonGrad)" opacity="0.025" />
      <circle cx="880" cy="-60" r="320" fill="url(#crimsonGrad)" opacity="0.035" />
      <circle cx="120" cy="650" r="280" fill="#FFFFFF" opacity="0.015" />

      <!-- Minimalist Framing Hairlines -->
      <rect x="0" y="0" width="1050" height="600" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.08" />
      <rect x="0" y="0" width="1050" height="6" fill="url(#crimsonGrad)" />
      <rect x="0" y="595" width="1050" height="5" fill="#111111" />

      <!-- Four Corner Precision Crosshairs -->
      <g stroke="#FFFFFF" stroke-width="1" opacity="0.25">
        <path d="M 30 20 L 30 40 M 20 30 L 40 30" />
        <path d="M 1020 20 L 1020 40 M 1010 30 L 1030 30" />
        <path d="M 30 560 L 30 580 M 20 570 L 40 570" />
        <path d="M 1020 560 L 1020 580 M 1010 570 L 1030 570" />
      </g>

      <!-- Center Brand Presentation (The Power Mark) -->
      <g transform="translate(525, 230)" id="front_center_brand" filter="url(#markGlow)">
        
        <!-- Scaled RouteDefense Geometric Shield Emblem -->
        <g transform="translate(-100, -115) scale(1.0)" id="front_emblem">
          <!-- Outer Shield / Pathway -->
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
          <!-- Safety Crimson Resolution Square -->
          <rect
             x="116"
             y="148"
             width="24"
             height="24"
             fill="#E63946" />
        </g>

        <!-- Authoritative Brand Headline -->
        <text
           x="0"
           y="145"
           font-size="34px"
           class="font-brand-title"
           text-anchor="middle">ROUTEDEFENSE <tspan class="font-brand-sub">GROUP</tspan></text>

        <!-- Institutional Tagline -->
        <text
           x="0"
           y="185"
           class="font-tagline"
           text-anchor="middle">INSTITUTIONAL TRAFFIC DEFENSE NETWORK</text>

        <!-- Thin Crimson Separation Accent -->
        <line x1="-50" y1="205" x2="50" y2="205" stroke="#E63946" stroke-width="2" opacity="0.6" />

        <!-- Executive Directorate Authority Line (Matching Business_Card_Premium_v16 CEO Styling) -->
        <text
           x="0"
           y="245"
           text-anchor="middle"
           class="font-exec-title">Executive Directorate · Office of General Counsel</text>

        <!-- 50 States Nationwide Jurisdictional Footprint Badge -->
        <g transform="translate(0, 285)">
          <rect x="-170" y="-14" width="340" height="26" rx="4" fill="#FFFFFF" fill-opacity="0.05" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />
          <text
             x="0"
             y="4"
             font-family="'Geist', 'Inter', monospace, sans-serif"
             font-size="10px"
             font-weight="700"
             fill="#E2E8F0"
             letter-spacing="3"
             text-anchor="middle">NATIONWIDE DOCKETS · ALL 50 US STATES</text>
        </g>
      </g>
    </g>
  </g>"""

# Back Side Group Content
def get_back_content(translate_x=1050):
    return f"""  <!-- ==================== BACK SIDE (Minimalist Gallery Slate & Tech Hub) ==================== -->
  <g transform="translate({translate_x}, 0)" id="card_back">
    <!-- Card Base -->
    <rect width="1050" height="600" fill="url(#bgLightBack)" />

    <!-- Content Clipped to Exact Card Boundaries -->
    <g clip-path="url(#cardClip)">
      <!-- Top Colored Accent Strip -->
      <rect x="0" y="0" width="1050" height="6" fill="url(#crimsonGrad)" />

      <!-- Subtle Geometric Flow (Connecting with Front Card) -->
      <circle cx="-170" cy="-60" r="320" fill="url(#crimsonGrad)" opacity="0.025" />
      <path d="M 700 0 C 820 280 1050 380 1050 600 L 1050 0 Z" fill="#F1F5F9" opacity="0.6" />

      <!-- Left Column: Branding, Scope & Operational Credentials -->
      <g transform="translate(70, 65)" id="back_left_column">
        <!-- RouteDefense Compact Mark & Brand Identity -->
        <g transform="translate(0, 0)">
          <!-- Scaled 0.42 Emblem -->
          <g transform="translate(0, 0) scale(0.42)">
            <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#111111" stroke-width="24" stroke-linejoin="miter" />
            <path d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200" fill="none" stroke="#111111" stroke-width="24" stroke-linejoin="miter" />
            <rect x="116" y="148" width="24" height="24" fill="#E63946" />
          </g>
          
          <text x="100" y="38" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="25px" font-weight="900" fill="#111111" letter-spacing="4">ROUTEDEFENSE</text>
          <text x="100" y="62" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="11.5px" font-weight="800" fill="#E63946" letter-spacing="4">GROUP · LEGAL NETWORK</text>
        </g>

        <!-- Division Headline -->
        <text x="5" y="132" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="13px" font-weight="800" letter-spacing="2" fill="#111111">INSTITUTIONAL TRAFFIC DEFENSE NETWORK</text>
        
        <!-- Crimson Hairline Accent -->
        <rect x="5" y="146" width="60" height="3" fill="#E63946" />

        <!-- Scope / Capabilities Overview -->
        <text x="5" y="184" class="font-body-desc">
          <tspan x="5" dy="0">Nationwide traffic citation defense and docket routing.</tspan>
          <tspan x="5" dy="24">Affiliated licensed defense counsel representing drivers</tspan>
          <tspan x="5" dy="24">across all 50 states and 3,143 municipal courts.</tspan>
          <tspan x="5" dy="24">Direct court appearances without client attendance.</tspan>
        </text>

        <!-- Operational Badge Box: Bar-Compliant Protocol -->
        <g transform="translate(5, 305)" id="operational_protocol_box">
          <rect width="365" height="92" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#subtleShadow)" />
          
          <!-- Shield Icon -->
          <g transform="translate(18, 20)">
            <rect width="36" height="36" rx="6" fill="#FEF2F2" stroke="#FEE2E2" stroke-width="1" />
            <!-- Shield Symbol -->
            <path d="M 18 8 L 28 12 V 19 C 28 25 23 29 18 31 C 13 29 8 25 8 19 V 12 Z" fill="none" stroke="#E63946" stroke-width="2" stroke-linejoin="round" />
            <path d="M 15 19 L 17 21 L 22 16" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>

          <text x="68" y="36" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="11.5px" font-weight="800" letter-spacing="1.5" fill="#111111">BAR-COMPLIANT INTAKE PROTOCOL</text>
          <text x="68" y="55" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="11px" font-weight="500" fill="#64748B">Direct Court Docket Filing &amp; Attorney Match</text>
          <text x="68" y="73" font-family="'Geist', 'Inter', monospace, sans-serif" font-size="10.5px" font-weight="700" fill="#E63946">24/7 Priority Emergency Dispatch</text>
        </g>

        <!-- Mandatory Bar Association Disclaimer -->
        <text x="5" y="445" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="8.5px" font-weight="600" letter-spacing="1.2" fill="#94A3B8">ATTORNEY ADVERTISING · PRIOR RESULTS DO NOT GUARANTEE SIMILAR OUTCOME</text>
      </g>

      <!-- Center-Right Column: Direct Contact Channels -->
      <g transform="translate(485, 75)" id="back_contact_column">
        
        <!-- Phone Item -->
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="48" height="48" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#subtleShadow)" />
          <!-- Phone Icon -->
          <path d="M 22 17 C 21.5 17 20.5 17.5 19 19 C 17.5 20.5 17 22.5 19 25.5 C 21 28.5 23.5 31 26.5 33 C 29.5 35 31.5 34.5 33 33 C 34.5 31.5 35 30.5 35 30 L 31.5 26.5 C 31 26 30 26 29.5 26.5 L 28 28 C 27.5 28 26.5 27.5 25 26 C 23.5 24.5 23 23.5 23 23 L 24.5 21.5 C 25 21 25 20 24.5 19.5 Z" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <text x="62" y="19" class="font-contact-label">DIRECT INTAKE HOTLINE</text>
          <text x="62" y="40" class="font-contact-val">(800) 555-0199</text>
        </g>

        <!-- Email Item -->
        <g transform="translate(0, 75)">
          <rect x="0" y="0" width="48" height="48" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#subtleShadow)" />
          <!-- Mail Icon -->
          <rect x="14" y="17" width="20" height="15" rx="2" fill="none" stroke="#E63946" stroke-width="2" />
          <path d="M 14 18 L 24 25 L 34 18" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <text x="62" y="19" class="font-contact-label">ENCRYPTED CASE DOCKET</text>
          <text x="62" y="40" class="font-contact-val">cases@routedefensegroup.com</text>
        </g>

        <!-- National Headquarters Item -->
        <g transform="translate(0, 150)">
          <rect x="0" y="0" width="48" height="48" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#subtleShadow)" />
          <!-- Location / Building Icon -->
          <path d="M 24 35 C 24 35 15 25 15 19 A 9 9 0 0 1 33 19 C 33 25 24 35 24 35 Z" fill="none" stroke="#E63946" stroke-width="2" />
          <circle cx="24" cy="19" r="3" fill="#E63946" />
          <text x="62" y="18" class="font-contact-label">NATIONAL ROUTING CENTER</text>
          <text x="62" y="38" class="font-contact-val">100 Wall Street, 20th Floor</text>
          <text x="62" y="55" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="12.5px" font-weight="500" fill="#64748B">New York, NY 10005</text>
        </g>

        <!-- Official Web Portal Item -->
        <g transform="translate(0, 235)">
          <rect x="0" y="0" width="48" height="48" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#subtleShadow)" />
          <!-- Globe Icon -->
          <circle cx="24" cy="24" r="10" fill="none" stroke="#E63946" stroke-width="2" />
          <ellipse cx="24" cy="24" rx="4.5" ry="10" fill="none" stroke="#E63946" stroke-width="2" />
          <path d="M 14 24 H 34" fill="none" stroke="#E63946" stroke-width="2" />
          <text x="62" y="18" class="font-contact-label">CLIENT PORTAL &amp; EVALUATION</text>
          <text x="62" y="40" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="15.5px" font-weight="800" fill="#E63946">routedefensegroup.com</text>
        </g>
      </g>

      <!-- Far-Right: Scannable Vector QR Code Hub Station -->
      <g transform="translate(805, 120)" id="back_qr_station">
        <!-- Station Container -->
        <rect width="180" height="270" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#subtleShadow)" />
        
        <!-- Header -->
        <text x="90" y="28" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="10.5px" font-weight="800" letter-spacing="1.5" fill="#111111" text-anchor="middle">CLIENT PORTAL</text>
        <line x1="25" y1="36" x2="155" y2="36" stroke="#E5E7EB" stroke-width="1" />

        <!-- High-Resolution Scannable Vector QR Code -->
        <!-- Scaled from 37x37 viewBox by factor 3.8 = 140.6 x 140.6 px -->
        <g transform="translate(20, 48) scale(3.78)" id="scannable_qr_matrix">
          <g transform="translate(2, 2)">
{qr_elements_svg}
          </g>
        </g>

        <!-- Station Footer Instruction -->
        <line x1="25" y1="210" x2="155" y2="210" stroke="#E5E7EB" stroke-width="1" />
        <text x="90" y="228" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="10px" font-weight="700" letter-spacing="1" fill="#111111" text-anchor="middle">SCAN TO EVALUATE</text>
        <text x="90" y="246" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9px" font-weight="700" fill="#E63946" letter-spacing="0.5" text-anchor="middle">Instant Case Intake</text>
      </g>
    </g>
  </g>"""

# 1. Build Master Business_Card_Premium_v16.svg (2100 x 600)
master_svg = f"""<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="2100"
   height="600"
   viewBox="0 0 2100 600"
   version="1.1"
   id="business_card_master_v16"
   xmlns="http://www.w3.org/2000/svg">
{shared_defs}
{get_front_content(0)}
{get_back_content(1050)}
</svg>
"""

out_master = os.path.join(base_dir, "Business_Card_Premium_v16.svg")
with open(out_master, "w", encoding="utf-8") as f:
    f.write(master_svg)
print(f"Created master side-by-side business card at: {out_master}")

# 2. Build Standalone Front.svg (1050 x 600)
front_svg = f"""<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="1050"
   height="600"
   viewBox="0 0 1050 600"
   version="1.1"
   id="business_card_front_svg"
   xmlns="http://www.w3.org/2000/svg">
{shared_defs}
{get_front_content(0)}
</svg>
"""

out_front = os.path.join(base_dir, "Front.svg")
with open(out_front, "w", encoding="utf-8") as f:
    f.write(front_svg)
print(f"Created standalone Front.svg at: {out_front}")

# 3. Build Standalone Back.svg (1050 x 600)
back_svg = f"""<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="1050"
   height="600"
   viewBox="0 0 1050 600"
   version="1.1"
   id="business_card_back_svg"
   xmlns="http://www.w3.org/2000/svg">
{shared_defs}
{get_back_content(0)}
</svg>
"""

out_back = os.path.join(base_dir, "Back.svg")
with open(out_back, "w", encoding="utf-8") as f:
    f.write(back_svg)
print(f"Created standalone Back.svg at: {out_back}")
