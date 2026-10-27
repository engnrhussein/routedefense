import os
import qrcode
import subprocess

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

def generate_qr_svg_elements(indent="        "):
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
            elements.append(f'{indent}<circle cx="{cx:.2f}" cy="{cy:.2f}" r="0.44" fill="#111111" />')
    
    # Finder patterns
    elements.append(f'{indent}<!-- Top-Left Finder -->')
    elements.append(f'{indent}<rect x="0.5" y="0.5" width="6" height="6" rx="1.6" fill="none" stroke="#111111" stroke-width="1" />')
    elements.append(f'{indent}<rect x="2" y="2" width="3" height="3" rx="0.8" fill="#111111" />')
    
    elements.append(f'{indent}<!-- Top-Right Finder -->')
    elements.append(f'{indent}<rect x="26.5" y="0.5" width="6" height="6" rx="1.6" fill="none" stroke="#111111" stroke-width="1" />')
    elements.append(f'{indent}<rect x="28" y="2" width="3" height="3" rx="0.8" fill="#111111" />')
    
    elements.append(f'{indent}<!-- Bottom-Left Finder -->')
    elements.append(f'{indent}<rect x="0.5" y="26.5" width="6" height="6" rx="1.6" fill="none" stroke="#111111" stroke-width="1" />')
    elements.append(f'{indent}<rect x="2" y="28" width="3" height="3" rx="0.8" fill="#111111" />')
    
    # Center RouteDefense Shield Emblem Badge
    elements.append(f'{indent}<!-- Center Emblem Badge -->')
    elements.append(f'{indent}<rect x="11" y="11" width="11" height="11" rx="2.5" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.4" />')
    elements.append(f'{indent}<g transform="translate(13.0, 13.0) scale(0.035)">')
    elements.append(f'{indent}  <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#111111" stroke-width="26" stroke-linejoin="miter" />')
    elements.append(f'{indent}  <path d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200" fill="none" stroke="#111111" stroke-width="26" stroke-linejoin="miter" />')
    elements.append(f'{indent}  <rect x="116" y="148" width="26" height="26" fill="#E63946" />')
    elements.append(f'{indent}</g>')
    
    return "\n".join(elements)

qr_elements_code = generate_qr_svg_elements()

# Shared Definitions for v2
shared_defs_v2 = """  <defs>
    <!-- Background Gradients -->
    <linearGradient id="v2BgDarkFront" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141822" />
      <stop offset="50%" stop-color="#0E1117" />
      <stop offset="100%" stop-color="#07090C" />
    </linearGradient>

    <linearGradient id="v2BgLightBack" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F8FAFC" />
    </linearGradient>

    <!-- Deep Obsidian Footer Gradient -->
    <linearGradient id="v2BgDarkFooter" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0A0C0F" />
      <stop offset="50%" stop-color="#11141A" />
      <stop offset="100%" stop-color="#0A0C0F" />
    </linearGradient>

    <!-- Crimson Brand Accent Gradient -->
    <linearGradient id="v2Crimson" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4D5E" />
      <stop offset="100%" stop-color="#E63946" />
    </linearGradient>

    <!-- Luxury Gold Accent Gradient (Directorate Title) -->
    <linearGradient id="v2GoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F9E282" />
      <stop offset="45%" stop-color="#DFB143" />
      <stop offset="100%" stop-color="#B88A28" />
    </linearGradient>

    <!-- Card Edge Clip Path -->
    <clipPath id="v2CardClip">
      <rect width="1050" height="600" />
    </clipPath>

    <!-- Drop Shadows -->
    <filter id="v2CardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000000" flood-opacity="0.06" />
    </filter>
    
    <filter id="v2EmblemGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#000000" flood-opacity="0.6" />
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#FFFFFF" flood-opacity="0.1" />
    </filter>
  </defs>

  <style>
    .v2-font-brand { font-family: 'Geist', 'Inter', -apple-system, sans-serif; font-weight: 900; letter-spacing: 9px; fill: #FFFFFF; }
    .v2-font-subbrand { font-family: 'Geist', 'Inter', -apple-system, sans-serif; font-weight: 800; letter-spacing: 5px; fill: #E63946; }
    .v2-font-tagline { font-family: 'Geist', 'Inter', -apple-system, sans-serif; font-size: 14.5px; font-weight: 500; letter-spacing: 5.5px; fill: #94A3B8; }
    .v2-font-exec { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 23px; font-weight: 700; letter-spacing: 1.5px; fill: url(#v2GoldGrad); }
    .v2-font-sec-header { font-family: 'Geist', 'Inter', -apple-system, sans-serif; font-size: 9.5px; font-weight: 800; letter-spacing: 2px; fill: #E63946; }
    .v2-font-label { font-family: 'Geist', 'Inter', -apple-system, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 1.2px; fill: #64748B; }
    .v2-font-val-bold { font-family: 'Geist', 'Inter', -apple-system, sans-serif; font-size: 14px; font-weight: 700; fill: #111111; }
  </style>"""

# Front Side v2 Content
def get_front_v2_content(translate_x=0):
    return f"""  <!-- ==================== FRONT SIDE v2 (Executive Obsidian & Architectural Tech) ==================== -->
  <g transform="translate({translate_x}, 0)" id="card_front_v2">
    <!-- Card Base -->
    <rect width="1050" height="600" fill="url(#v2BgDarkFront)" />

    <!-- Clipped Decorative Elements -->
    <g clip-path="url(#v2CardClip)">
      <!-- Left Edge Technical Border Strip (Monolithic Accent) -->
      <rect x="0" y="0" width="32" height="600" fill="#090B0E" />
      <line x1="32" y1="0" x2="32" y2="600" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />
      <rect x="0" y="0" width="3" height="600" fill="url(#v2Crimson)" />

      <!-- Left Vertical Technical Micro-Typography -->
      <g transform="translate(18, 300) rotate(-90)">
        <text text-anchor="middle" font-family="'Geist', 'Inter', monospace, sans-serif" font-size="8px" font-weight="700" letter-spacing="4" fill="#E63946">LEGAL ROUTING NETWORK</text>
        <text text-anchor="middle" font-family="'Geist', 'Inter', monospace, sans-serif" font-size="7.5px" font-weight="500" letter-spacing="3" fill="#FFFFFF" fill-opacity="0.3" dy="12">50 STATES // 3,143 MUNICIPAL DOCKETS</text>
      </g>

      <!-- Background Subtle Route Contours (Highway Topology) -->
      <path d="M 32 180 C 300 120 650 340 1050 220" fill="none" stroke="#FFFFFF" stroke-opacity="0.025" stroke-width="2" />
      <path d="M 32 380 C 350 480 750 260 1050 420" fill="none" stroke="url(#v2Crimson)" stroke-opacity="0.04" stroke-width="2.5" />
      <circle cx="920" cy="-40" r="340" fill="none" stroke="#FFFFFF" stroke-opacity="0.02" stroke-width="1.5" />
      <circle cx="920" cy="-40" r="240" fill="none" stroke="url(#v2Crimson)" stroke-opacity="0.03" stroke-width="1.5" stroke-dasharray="6 8" />

      <!-- Top and Bottom Perimeter Hairlines -->
      <rect x="32" y="0" width="1018" height="4" fill="url(#v2Crimson)" />
      <rect x="32" y="596" width="1018" height="4" fill="#111111" />

      <!-- Precision Registration Marks (Corners) -->
      <g stroke="#FFFFFF" stroke-width="1" opacity="0.2">
        <path d="M 60 30 L 60 50 M 50 40 L 70 40" />
        <path d="M 1010 30 L 1010 50 M 1000 40 L 1020 40" />
        <path d="M 60 550 L 60 570 M 50 560 L 70 560" />
        <path d="M 1010 550 L 1010 570 M 1000 560 L 1020 560" />
      </g>

      <!-- Center Brand Presentation (The Power Mark) -->
      <!-- Centered horizontally in the remaining area (32 to 1050): Center = 541 -->
      <g transform="translate(541, 230)" id="front_brand_core" filter="url(#v2EmblemGlow)">
        
        <!-- Scaled RouteDefense Geometric Shield Emblem -->
        <g transform="translate(-110, -125) scale(1.1)" id="front_v2_emblem">
          <!-- Ambient Outline Glow -->
          <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#FFFFFF" stroke-width="32" stroke-linejoin="miter" stroke-opacity="0.06" />
          
          <!-- Outer Shield / Pathway (Solid Crisp Metallic White) -->
          <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#FFFFFF" stroke-width="24" stroke-linejoin="miter" />
          
          <!-- Inner Forward Motion Line -->
          <path d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200" fill="none" stroke="#FFFFFF" stroke-width="24" stroke-linejoin="miter" />
          
          <!-- Safety Crimson Resolution Square (With Active Glow) -->
          <rect x="116" y="148" width="24" height="24" fill="url(#v2Crimson)" />
        </g>

        <!-- Brand Name Headline -->
        <text
           x="0"
           y="145"
           font-size="38px"
           class="v2-font-brand"
           text-anchor="middle">ROUTEDEFENSE <tspan class="v2-font-subbrand">GROUP</tspan></text>

        <!-- Tagline -->
        <text
           x="0"
           y="186"
           class="v2-font-tagline"
           text-anchor="middle">INSTITUTIONAL TRAFFIC DEFENSE NETWORK</text>

        <!-- Crimson Hairline Rule -->
        <line x1="-60" y1="208" x2="60" y2="208" stroke="#E63946" stroke-width="2" opacity="0.8" />

        <!-- Executive Title Line in Gold Gradient -->
        <text
           x="0"
           y="248"
           text-anchor="middle"
           class="v2-font-exec">Executive Directorate · Office of General Counsel</text>

        <!-- 50 States Jurisdictional Seal -->
        <g transform="translate(0, 288)">
          <rect x="-185" y="-14" width="370" height="28" rx="14" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1" />
          <text
             x="0"
             y="4.5"
             font-family="'Geist', 'Inter', monospace, sans-serif"
             font-size="10px"
             font-weight="700"
             fill="#E2E8F0"
             letter-spacing="3.5"
             text-anchor="middle">50 US STATES · 3,143 MUNICIPAL DOCKETS</text>
        </g>
      </g>
    </g>
  </g>"""

# Back Side v2 Content - Comprehensive, Balanced, Zero-Empty-Space
def get_back_v2_content(translate_x=1050):
    return f"""  <!-- ==================== BACK SIDE v2 (High-Density Executive Architecture) ==================== -->
  <g transform="translate({translate_x}, 0)" id="card_back_v2">
    <!-- Card Base -->
    <rect width="1050" height="600" fill="url(#v2BgLightBack)" />

    <!-- Clipped Content -->
    <g clip-path="url(#v2CardClip)">
      <!-- Top Colored Accent Hairline -->
      <rect x="0" y="0" width="1050" height="4" fill="url(#v2Crimson)" />

      <!-- Top Header Identity Bar (y: 12 to 85) -->
      <g transform="translate(45, 18)" id="v2_back_header">
        <!-- Compact Brand Logo -->
        <g transform="translate(0, 4) scale(0.32)">
          <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#111111" stroke-width="24" stroke-linejoin="miter" />
          <path d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200" fill="none" stroke="#111111" stroke-width="24" stroke-linejoin="miter" />
          <rect x="116" y="148" width="24" height="24" fill="#E63946" />
        </g>
        
        <text x="78" y="32" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="20px" font-weight="900" fill="#111111" letter-spacing="3">ROUTEDEFENSE</text>
        <text x="78" y="50" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="10.5px" font-weight="800" fill="#E63946" letter-spacing="3">GROUP · LEGAL NETWORK</text>

        <!-- Right Status Badge: 50-State Bar Compliant Pill -->
        <g transform="translate(620, 14)">
          <rect width="340" height="34" rx="17" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1.2" />
          <circle cx="20" cy="17" r="4" fill="#10B981" />
          <text x="34" y="21" font-family="'Geist', 'Inter', monospace, sans-serif" font-size="9.5px" font-weight="700" fill="#1E293B" letter-spacing="1.2">50-STATE NETWORK · BAR COMPLIANT</text>
        </g>
      </g>

      <!-- Dividing Hairline -->
      <line x1="45" y1="88" x2="1005" y2="88" stroke="#E2E8F0" stroke-width="1" />

      <!-- ==================== 3-COLUMN STRUCTURED MAIN BODY (y: 102 to 465) ==================== -->
      
      <!-- COLUMN 1: Capabilities & Scope (x: 45, width: 335) -->
      <g transform="translate(45, 105)" id="v2_col_capabilities">
        <text x="0" y="12" class="v2-font-sec-header">// 01 DEFENSE CAPABILITIES</text>
        <text x="0" y="36" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="15px" font-weight="800" fill="#111111">Nationwide Citation Defense</text>
        
        <!-- Descriptive Paragraph -->
        <text x="0" y="60" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="12px" font-weight="400" fill="#475569" line-height="1.5">
          <tspan x="0" dy="0">Institutional defense routing for CDL carriers and</tspan>
          <tspan x="0" dy="18">motorists across all 50 states. Verified jurisdictional</tspan>
          <tspan x="0" dy="18">counsel represents drivers in municipal dockets</tspan>
          <tspan x="0" dy="18">without requiring personal court attendance.</tspan>
        </text>

        <!-- 4 Key Practice Specialty Badges (Stacked Clean Grid) -->
        <g transform="translate(0, 145)">
          <!-- Row 1 -->
          <g transform="translate(0, 0)">
            <rect width="162" height="26" rx="4" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
            <text x="8" y="16.5" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9.5px" font-weight="700" fill="#334155">⚡ Radar &amp; Laser Calibration</text>
          </g>
          <g transform="translate(170, 0)">
            <rect width="162" height="26" rx="4" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
            <text x="8" y="16.5" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9.5px" font-weight="700" fill="#334155">🚛 Commercial CDL Defense</text>
          </g>
          
          <!-- Row 2 -->
          <g transform="translate(0, 34)">
            <rect width="162" height="26" rx="4" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
            <text x="8" y="16.5" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9.5px" font-weight="700" fill="#334155">⚖️ High-Speed &amp; Point Audit</text>
          </g>
          <g transform="translate(170, 34)">
            <rect width="162" height="26" rx="4" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
            <text x="8" y="16.5" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9.5px" font-weight="700" fill="#334155">📷 Red Light &amp; Speed Camera</text>
          </g>
        </g>

        <!-- Court Representation Guarantee Box -->
        <g transform="translate(0, 230)">
          <rect width="332" height="48" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" />
          <path d="M 16 24 L 22 30 L 32 18" fill="none" stroke="#E63946" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          <text x="42" y="21" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="10.5px" font-weight="800" fill="#111111">Formal Entry of Appearance Filed</text>
          <text x="42" y="36" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9.5px" font-weight="500" fill="#64748B">Attorneys appear in court on your behalf</text>
        </g>
      </g>

      <!-- COLUMN 2: Direct Contact Channels (x: 415, width: 330) -->
      <g transform="translate(415, 105)" id="v2_col_contacts">
        <text x="0" y="12" class="v2-font-sec-header">// 02 INTAKE &amp; COMMUNICATIONS</text>
        
        <!-- Contact Block 1: Phone Hotline -->
        <g transform="translate(0, 30)">
          <rect width="330" height="54" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#v2CardShadow)" />
          <!-- Phone Icon Container -->
          <rect x="10" y="9" width="36" height="36" rx="6" fill="#FEF2F2" stroke="#FEE2E2" stroke-width="1" />
          <path d="M 23 20 C 22.5 20 21.5 20.5 20.5 21.5 C 19.5 22.5 19 24 20.5 26.5 C 22 29 24 31 26.5 32.5 C 29 34 30.5 33.5 31.5 32.5 L 30 27 L 27.5 28 C 26 26.5 25 25.5 23.5 24 L 24.5 21.5 Z" fill="none" stroke="#E63946" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          
          <text x="56" y="24" class="v2-font-label">PRIORITY INTAKE HOTLINE (24/7)</text>
          <text x="56" y="43" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="16px" font-weight="800" fill="#111111">(800) 555-0199</text>
          <!-- Badge -->
          <text x="315" y="34" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9px" font-weight="700" fill="#10B981" text-anchor="end">● 24/7 LIVE</text>
        </g>

        <!-- Contact Block 2: Docket Email -->
        <g transform="translate(0, 94)">
          <rect width="330" height="54" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#v2CardShadow)" />
          <!-- Mail Icon Container -->
          <rect x="10" y="9" width="36" height="36" rx="6" fill="#F0FDF4" stroke="#DCFCE7" stroke-width="1" />
          <rect x="19" y="21" width="18" height="13" rx="2" fill="none" stroke="#16A34A" stroke-width="1.6" />
          <path d="M 19 22 L 28 28 L 37 22" fill="none" stroke="#16A34A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          
          <text x="56" y="24" class="v2-font-label">ENCRYPTED CASE DOCKET &amp; EVIDENCE</text>
          <text x="56" y="43" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="13.5px" font-weight="700" fill="#111111">cases@routedefensegroup.com</text>
        </g>

        <!-- Contact Block 3: National Center -->
        <g transform="translate(0, 158)">
          <rect width="330" height="54" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#v2CardShadow)" />
          <!-- Location Icon Container -->
          <rect x="10" y="9" width="36" height="36" rx="6" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
          <path d="M 28 36 C 28 36 21 28 21 23 A 7 7 0 0 1 35 23 C 35 28 28 36 28 36 Z" fill="none" stroke="#64748B" stroke-width="1.6" />
          <circle cx="28" cy="23" r="2.5" fill="#64748B" />
          
          <text x="56" y="24" class="v2-font-label">NATIONAL ROUTING HEADQUARTERS</text>
          <text x="56" y="42" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="12px" font-weight="700" fill="#111111">100 Wall Street, 20th Floor, New York, NY</text>
        </g>

        <!-- Contact Block 4: Official Portal -->
        <g transform="translate(0, 222)">
          <rect width="330" height="54" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#v2CardShadow)" />
          <!-- Globe Icon Container -->
          <rect x="10" y="9" width="36" height="36" rx="6" fill="#FEF2F2" stroke="#FEE2E2" stroke-width="1" />
          <circle cx="28" cy="27" r="8" fill="none" stroke="#E63946" stroke-width="1.6" />
          <ellipse cx="28" cy="27" rx="3.5" ry="8" fill="none" stroke="#E63946" stroke-width="1.6" />
          <line x1="20" y1="27" x2="36" y2="27" stroke="#E63946" stroke-width="1.6" />
          
          <text x="56" y="24" class="v2-font-label">LEGAL INTAKE &amp; COMPLIANCE PORTAL</text>
          <text x="56" y="43" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="14.5px" font-weight="900" fill="#E63946">routedefensegroup.com</text>
        </g>
      </g>

      <!-- COLUMN 3: Scannable Tech QR Kiosk Station (x: 775, width: 230) -->
      <g transform="translate(775, 105)" id="v2_col_qr_kiosk">
        <!-- Frame Container -->
        <rect width="230" height="350" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#v2CardShadow)" />
        
        <!-- Kiosk Header -->
        <g transform="translate(15, 14)">
          <circle cx="8" cy="8" r="4" fill="#E63946" />
          <text x="18" y="11.5" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="10.5px" font-weight="800" fill="#111111" letter-spacing="1">CLIENT PORTAL</text>
          <text x="18" y="24" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9px" font-weight="500" fill="#64748B">Instant Case Evaluation</text>
        </g>

        <line x1="15" y1="45" x2="215" y2="45" stroke="#F1F5F9" stroke-width="1" />

        <!-- Scannable Vector QR Code Matrix (37x37 scaled to ~160x160 px) -->
        <!-- Center x = 115, offset x = 115 - (37 * 4.1 / 2) = 115 - 75.8 = 39.2 -->
        <g transform="translate(39, 56) scale(4.1)" id="v2_qr_matrix_group">
          <g transform="translate(2, 2)">
{qr_elements_code}
          </g>
        </g>

        <!-- Kiosk Action Button Bar -->
        <g transform="translate(15, 230)">
          <rect width="200" height="34" rx="6" fill="#111111" />
          <text x="100" y="21" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="10.5px" font-weight="800" fill="#FFFFFF" letter-spacing="1.5" text-anchor="middle">SCAN WITH PHONE</text>
        </g>

        <text x="115" y="280" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="8.5px" font-weight="600" fill="#64748B" text-anchor="middle">Point camera to upload ticket</text>
        <text x="115" y="294" font-family="'Geist', 'Inter', monospace, sans-serif" font-size="8px" font-weight="700" fill="#E63946" text-anchor="middle">256-BIT ENCRYPTED INTAKE</text>
      </g>

      <!-- ==================== EXECUTIVE INSTITUTIONAL FOOTER BAND (y: 475 to 600) ==================== -->
      <!-- Solves the empty bottom completely with luxury dark contrast and milestones -->
      <g transform="translate(0, 475)" id="v2_back_institutional_footer">
        <!-- Dark Footer Base -->
        <rect width="1050" height="125" fill="url(#v2BgDarkFooter)" />
        <rect width="1050" height="2" fill="url(#v2Crimson)" />

        <!-- Left: 3-Metric Statistical Milestones -->
        <g transform="translate(45, 25)">
          <!-- Metric 1: States -->
          <g transform="translate(0, 0)">
            <text x="0" y="28" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="28px" font-weight="900" fill="#FFFFFF">50</text>
            <text x="44" y="16" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9px" font-weight="800" fill="#E63946" letter-spacing="1">US STATES</text>
            <text x="44" y="28" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9px" font-weight="400" fill="#94A3B8">Counsel Network</text>
          </g>

          <!-- Divider -->
          <line x1="150" y1="6" x2="150" y2="34" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />

          <!-- Metric 2: Counties -->
          <g transform="translate(170, 0)">
            <text x="0" y="28" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="28px" font-weight="900" fill="#FFFFFF">3,143</text>
            <text x="74" y="16" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9px" font-weight="800" fill="#E63946" letter-spacing="1">COURTS</text>
            <text x="74" y="28" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9px" font-weight="400" fill="#94A3B8">Municipal Dockets</text>
          </g>

          <!-- Divider -->
          <line x1="330" y1="6" x2="330" y2="34" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />

          <!-- Metric 3: Protocol -->
          <g transform="translate(350, 0)">
            <text x="0" y="28" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="28px" font-weight="900" fill="#10B981">24/7</text>
            <text x="64" y="16" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9px" font-weight="800" fill="#E63946" letter-spacing="1">DISPATCH</text>
            <text x="64" y="28" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="9px" font-weight="400" fill="#94A3B8">Emergency Docket</text>
          </g>
        </g>

        <!-- Right: Legal Compliance & Disclaimer Block -->
        <g transform="translate(560, 22)">
          <text x="0" y="14" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="8.5px" font-weight="700" letter-spacing="1.2" fill="#E2E8F0">
            ATTORNEY ADVERTISING · PRIOR RESULTS DO NOT GUARANTEE SIMILAR OUTCOME
          </text>
          <text x="0" y="29" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="8px" font-weight="400" fill="#94A3B8" line-height="1.4">
            RouteDefense Group is a legal technology and routing network. Representation provided by affiliated licensed attorneys.
          </text>
          <text x="0" y="43" font-family="'Geist', 'Inter', -apple-system, sans-serif" font-size="8px" font-weight="600" fill="#64748B">
            Official Compliance Hub: <tspan fill="#E63946">docs.routedefensegroup.com</tspan> · © 2026 RouteDefense Group
          </text>
        </g>
      </g>
    </g>
  </g>"""

# 1. Build Master Business_Card_Premium_v2.svg (2100 x 600)
master_svg_v2 = f"""<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="2100"
   height="600"
   viewBox="0 0 2100 600"
   version="1.1"
   id="business_card_master_v2"
   xmlns="http://www.w3.org/2000/svg">
{shared_defs_v2}
{get_front_v2_content(0)}
{get_back_v2_content(1050)}
</svg>
"""

out_master_v2 = os.path.join(base_dir, "Business_Card_Premium_v2.svg")
with open(out_master_v2, "w", encoding="utf-8") as f:
    f.write(master_svg_v2)
print(f"Created master side-by-side v2 card at: {out_master_v2}")

# 2. Build Standalone Front_v2.svg (1050 x 600)
front_svg_v2 = f"""<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="1050"
   height="600"
   viewBox="0 0 1050 600"
   version="1.1"
   id="business_card_front_v2"
   xmlns="http://www.w3.org/2000/svg">
{shared_defs_v2}
{get_front_v2_content(0)}
</svg>
"""

out_front_v2 = os.path.join(base_dir, "Front_v2.svg")
with open(out_front_v2, "w", encoding="utf-8") as f:
    f.write(front_svg_v2)
print(f"Created standalone Front_v2.svg at: {out_front_v2}")

# 3. Build Standalone Back_v2.svg (1050 x 600)
back_svg_v2 = f"""<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="1050"
   height="600"
   viewBox="0 0 1050 600"
   version="1.1"
   id="business_card_back_v2"
   xmlns="http://www.w3.org/2000/svg">
{shared_defs_v2}
{get_back_v2_content(0)}
</svg>
"""

out_back_v2 = os.path.join(base_dir, "Back_v2.svg")
with open(out_back_v2, "w", encoding="utf-8") as f:
    f.write(back_svg_v2)
print(f"Created standalone Back_v2.svg at: {out_back_v2}")

# Export High-DPI JPGs
magick_path = r"C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe"
if os.path.exists(magick_path):
    for svg_file, jpg_file in [
        ("Business_Card_Premium_v2.svg", "Business_Card_Premium_v2.jpg"),
        ("Front_v2.svg", "Front_v2.jpg"),
        ("Back_v2.svg", "Back_v2.jpg")
    ]:
        in_p = os.path.join(base_dir, svg_file)
        out_p = os.path.join(base_dir, jpg_file)
        subprocess.run([magick_path, in_p, "-density", "300", "-quality", "96", out_p], check=True)
        print(f"[OK] Exported {jpg_file}")
