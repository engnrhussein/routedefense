import os
import re

base_dir = r"c:\Users\HP 1030 G2\Downloads\Website For Lawyers\Actual Business Card"
branding_dir = r"c:\Users\HP 1030 G2\Downloads\Website For Lawyers\RouteDefense\branding\Actual Business Card"
qr_path = os.path.join(base_dir, "routedefense_QR.svg")

# Read the user-edited QR code directly so we embed their exact manual edits
with open(qr_path, "r", encoding="utf-8") as f:
    qr_raw = f.read()

# Extract inner QR content from <g transform="translate(2,2)" id="qr_modules"...>
# to </g> before </svg>
match = re.search(r'(<g\s+transform="translate\(2,\s*2\)"[\s\S]*?)</svg>', qr_raw)
if match:
    qr_inner = match.group(1).strip()
    # Ensure any display:none remains or is respected
else:
    # Fallback to entire svg inner
    qr_inner = qr_raw

svg_v3_content = f"""<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="2100"
   height="600"
   viewBox="0 0 2100 600"
   version="1.1"
   id="business_card_v3"
   xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep Obsidian Dark Base Gradient -->
    <linearGradient id="bgDarkV3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141923" />
      <stop offset="100%" stop-color="#090B0F" />
    </linearGradient>

    <!-- Gallery Clean White Base Gradient -->
    <linearGradient id="bgLightV3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F8FAFC" />
    </linearGradient>

    <!-- Safety Crimson Brand Gradient -->
    <linearGradient id="crimsonGradV3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4D5E" />
      <stop offset="100%" stop-color="#E63946" />
    </linearGradient>

    <!-- Executive Gold Foil Gradient -->
    <linearGradient id="goldGradV3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F6E05E" />
      <stop offset="100%" stop-color="#D69E2E" />
    </linearGradient>

    <!-- Linear gradient for hexagonal contact icons -->
    <linearGradient id="iconCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4D5E" />
      <stop offset="100%" stop-color="#D90429" />
    </linearGradient>

    <!-- Card Clip Path -->
    <clipPath id="cardClipV3">
      <rect width="1050" height="600" />
    </clipPath>
  </defs>

  <style>
    .font-tagline-v3 {{ font-family: 'Outfit', 'Geist', 'Segoe UI', sans-serif; font-size: 20px; font-weight: 300; letter-spacing: 5px; fill: #A0AEC0; }}
    .font-name-v3 {{ font-family: 'Outfit', 'Geist', 'Segoe UI', sans-serif; font-size: 32px; font-weight: 700; letter-spacing: 1px; fill: #1A202C; }}
    .font-title-v3 {{ font-family: 'Outfit', 'Geist', 'Segoe UI', sans-serif; font-size: 17px; font-weight: 600; letter-spacing: 2.5px; fill: #E63946; }}
    .font-contact-v3 {{ font-family: 'Outfit', 'Geist', 'Segoe UI', sans-serif; font-size: 19px; font-weight: 400; fill: #4A5568; }}
    .font-contact-bold-v3 {{ font-family: 'Outfit', 'Geist', 'Segoe UI', sans-serif; font-size: 19px; font-weight: 600; fill: #1A202C; }}
  </style>

  <!-- ==================== FRONT SIDE (Dark & Elegant) ==================== -->
  <g transform="translate(0, 0)" id="card_front_v3">
    <!-- Card Base -->
    <rect width="1050" height="600" fill="url(#bgDarkV3)" />

    <!-- Clipped Decorative Elements -->
    <g clip-path="url(#cardClipV3)">
      <!-- Edge Accent Border -->
      <rect x="0" y="0" width="1050" height="600" fill="none" stroke="url(#crimsonGradV3)" stroke-width="6" opacity="0.1" />
      
      <!-- Subtle Architectural Wave -->
      <path d="M 0 300 C 300 100 750 500 1050 300 L 1050 600 L 0 600 Z" fill="url(#crimsonGradV3)" opacity="0.04" />
      
      <!-- Bottom Crimson Accent Strip -->
      <rect x="0" y="585" width="1050" height="15" fill="url(#crimsonGradV3)" />
      
      <!-- Connecting Circle (Left Half) -->
      <circle cx="850" cy="-50" r="300" fill="url(#crimsonGradV3)" opacity="0.14" />

      <!-- Center Logo & Brand Identity Presentation -->
      <g transform="translate(525, 255)">
        <!-- Scaled Logo Group (Scale 3.8) -->
        <g transform="translate(-230, -85) scale(3.8)" id="front_brand_lockup">
          <!-- RouteDefense Shield Emblem -->
          <g transform="translate(0, 4) scale(0.20)">
            <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#FFFFFF" stroke-width="24" stroke-linejoin="miter" />
            <path d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200" fill="none" stroke="#FFFFFF" stroke-width="24" stroke-linejoin="miter" />
            <rect x="116" y="148" width="24" height="24" fill="#E63946" />
          </g>

          <text x="48" y="24" font-family="'Outfit', 'Geist', sans-serif" font-size="20px" font-weight="700" fill="#FFFFFF" letter-spacing="-0.3">RouteDefense</text>
          <text x="48" y="39" font-family="'Outfit', 'Geist', sans-serif" font-size="11px" font-weight="700" fill="#E63946" letter-spacing="4">GROUP</text>
          <line x1="48" y1="26" x2="95" y2="26" stroke="#E63946" stroke-width="1" opacity="0.5" />
        </g>

        <!-- Tagline -->
        <text x="0" y="130" text-anchor="middle" class="font-tagline-v3">INSTITUTIONAL TRAFFIC DEFENSE NETWORK</text>

        <!-- Executive / Leadership Title in Gold Foil -->
        <text x="0" y="200" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="28px" font-weight="700" fill="url(#goldGradV3)" letter-spacing="1">Office of the Directorate | General Counsel</text>
      </g>
    </g>
  </g>

  <!-- ==================== BACK SIDE (Light, Clean, Editorial & Balanced) ==================== -->
  <g transform="translate(1050, 0)" id="card_back_v3">
    <!-- Card Base -->
    <rect width="1050" height="600" fill="url(#bgLightV3)" />

    <g clip-path="url(#cardClipV3)">
      <!-- Top Colored Accent Strip -->
      <rect x="0" y="0" width="1050" height="15" fill="url(#crimsonGradV3)" />

      <!-- Abstract Corner Shape -->
      <path d="M 750 0 C 850 300 1050 400 1050 600 L 1050 0 Z" fill="#F8FAFC" style="opacity:0.6;fill:#E63946;fill-opacity:0.04;" />

      <!-- Connecting Circle (Right Half) -->
      <circle cx="-200" cy="-50" r="300" fill="url(#crimsonGradV3)" opacity="0.14" />

      <!-- ==================== LEFT COLUMN: Branding & Editorial Overview ==================== -->
      <g transform="translate(95, 95)" id="back_left_column_v3">
        <!-- Embedded Back Logo (Scale 2.4) -->
        <g transform="translate(0, 0) scale(2.4)" id="back_logo_v3">
          <g transform="translate(0, 4) scale(0.20)">
            <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#0F131A" stroke-width="24" stroke-linejoin="miter" />
            <path d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200" fill="none" stroke="#0F131A" stroke-width="24" stroke-linejoin="miter" />
            <rect x="116" y="148" width="24" height="24" fill="#E63946" />
          </g>
          <text x="48" y="24" font-family="'Outfit', 'Geist', sans-serif" font-size="20px" font-weight="700" fill="#0F131A" letter-spacing="-0.3">RouteDefense</text>
          <text x="48" y="39" font-family="'Outfit', 'Geist', sans-serif" font-size="11px" font-weight="700" fill="#E63946" letter-spacing="4">GROUP</text>
          <line x1="48" y1="26" x2="95" y2="26" stroke="#E63946" stroke-width="1" opacity="0.6" />
        </g>

        <!-- Subtitle -->
        <text x="5" y="145" class="font-title-v3">NATIONWIDE TRAFFIC DEFENSE NETWORK</text>

        <!-- Gold Accent Line -->
        <rect x="5" y="170" width="80" height="4" fill="url(#goldGradV3)" />

        <!-- Editorial Description Paragraph -->
        <text x="5" y="215" class="font-contact-v3" style="font-size: 17.5px; line-height: 1.55;">
          <tspan x="5" dy="0">Institutional defense routing for citations,</tspan>
          <tspan x="5" dy="28">radar calibration audits, and CDL violations.</tspan>
          <tspan x="5" dy="28">Verified local trial counsel appearing in court</tspan>
          <tspan x="5" dy="28">on your behalf across all 50 US states.</tspan>
        </text>

        <!-- Operating Protocol Box -->
        <g transform="translate(5, 360)" id="intake_protocol_box_v3">
          <rect width="310" height="85" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2" rx="4" />
          <!-- Shield / Gavel Icon -->
          <g transform="translate(16, 20)">
            <path d="M 20 4 L 36 10 V 22 C 36 32 28 38 20 42 C 12 38 4 32 4 22 V 10 Z" fill="none" stroke="url(#crimsonGradV3)" stroke-width="2.5" stroke-linejoin="round" />
            <path d="M 14 22 L 18 26 L 26 18" fill="none" stroke="url(#crimsonGradV3)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <text x="68" y="38" class="font-contact-bold-v3" style="font-size: 18px;">Bar-Compliant Intake</text>
          <text x="68" y="62" class="font-contact-v3" style="font-size: 15px; fill: #64748B;">24/7 Priority Docket Dispatch</text>
        </g>
      </g>

      <!-- ==================== RIGHT COLUMN: 4 Hexagonal Contact Details ==================== -->
      <g transform="translate(505, 95)" id="back_right_contacts_v3">
        <!-- 1. Phone Item -->
        <g id="contact_phone_v3">
          <path d="M 15,0 H 45 L 60,25 45,50 H 15 L 0,25 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
          <!-- Phone Icon -->
          <path d="m 23,15 a 4,4 0 0 0 -4,4 c 0,12 9,21 21,21 a 4,4 0 0 0 4,-4 l -3,-7 a 2,2 0 0 0 -3,0 l -5,2 a 8,8 0 0 1 -6,-6 l 2,-5 a 2,2 0 0 0 0,-3 z" fill="url(#iconCrimsonGrad)" />
          <text x="80" y="24" class="font-contact-bold-v3">Direct Intake Hotline</text>
          <text x="80" y="48" class="font-contact-v3">+1 (800) 555-0199</text>
        </g>

        <!-- 2. Email Item -->
        <g transform="translate(0, 95)" id="contact_email_v3">
          <path d="M 15,0 H 45 L 60,25 45,50 H 15 L 0,25 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
          <!-- Email Icon -->
          <path d="m 16,16 h 28 c 2,0 4,2 4,4 v 12 c 0,2 -2,4 -4,4 H 16 c -2,0 -4,-2 -4,-4 V 20 c 0,-2 2,-4 4,-4 z m -1,4 15,10 15,-10" fill="none" stroke="url(#iconCrimsonGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <text x="80" y="24" class="font-contact-bold-v3">Case Docket &amp; Evidence</text>
          <text x="80" y="48" class="font-contact-v3">cases@routedefensegroup.com</text>
        </g>

        <!-- 3. Address Item -->
        <g transform="translate(0, 190)" id="contact_address_v3">
          <path d="M 15,0 H 45 L 60,25 45,50 H 15 L 0,25 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
          <!-- Location Icon -->
          <path d="M 30,37 C 30,37 18,25 18,19 a 12,12 0 0 1 24,0 c 0,6 -12,18 -12,18 z" fill="none" stroke="url(#iconCrimsonGrad)" stroke-width="2" />
          <circle cx="30" cy="19" r="4" fill="url(#iconCrimsonGrad)" />
          <text x="80" y="24" class="font-contact-bold-v3">National Routing Center</text>
          <text x="80" y="48" class="font-contact-v3">100 Wall St. 20th Fl, New York, NY</text>
        </g>

        <!-- 4. Website Item -->
        <g transform="translate(0, 290)" id="contact_website_v3">
          <path d="M 15,0 H 45 L 60,25 45,50 H 15 L 0,25 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
          <!-- Globe Icon -->
          <circle cx="30" cy="25" r="12" fill="none" stroke="url(#iconCrimsonGrad)" stroke-width="2" />
          <ellipse cx="30" cy="25" rx="5" ry="12" fill="none" stroke="url(#iconCrimsonGrad)" stroke-width="2" />
          <path d="M 18,25 H 42" fill="none" stroke="url(#iconCrimsonGrad)" stroke-width="2" />
          <text x="80" y="24" class="font-contact-bold-v3">Official Portal</text>
          <text x="80" y="48" class="font-contact-v3" style="font-weight: 600; fill: #E63946;">routedefensegroup.com</text>
        </g>
      </g>

      <!-- ==================== SCANNABLE QR CODE HUB (Bottom Right) ==================== -->
      <!-- Positioned elegantly at x: 840, y: 310, matrix scaled by 4.2 -->
      <g transform="translate(835, 305)" id="back_qr_v3">
        <!-- Background Card Frame -->
        <rect x="0" y="0" width="165" height="185" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2" />
        
        <!-- User-Edited Scannable QR Matrix (Scaled from 37x37) -->
        <!-- Placed at x=12, y=10 with scale 3.8 = 140.6 x 140.6 px -->
        <g transform="translate(12, 10) scale(3.8)" id="embedded_user_qr">
          {qr_inner}
        </g>

        <!-- Label below QR -->
        <text x="82.5" y="165" text-anchor="middle" font-family="'Outfit', 'Geist', sans-serif" font-size="11px" font-weight="700" letter-spacing="1px" fill="#0F131A">SCAN TO EVALUATE</text>
        <text x="82.5" y="177" text-anchor="middle" font-family="'Outfit', 'Geist', sans-serif" font-size="9.5px" font-weight="600" fill="#E63946">Instant Case Intake</text>
      </g>
    </g>
  </g>
</svg>
"""

# Standalone Front v3 SVG
front_v3_content = f"""<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="1050"
   height="600"
   viewBox="0 0 1050 600"
   version="1.1"
   id="business_card_front_v3"
   xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgDarkV3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141923" />
      <stop offset="100%" stop-color="#090B0F" />
    </linearGradient>
    <linearGradient id="crimsonGradV3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4D5E" />
      <stop offset="100%" stop-color="#E63946" />
    </linearGradient>
    <linearGradient id="goldGradV3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F6E05E" />
      <stop offset="100%" stop-color="#D69E2E" />
    </linearGradient>
    <clipPath id="cardClipV3">
      <rect width="1050" height="600" />
    </clipPath>
  </defs>

  <style>
    .font-tagline-v3 {{ font-family: 'Outfit', 'Geist', 'Segoe UI', sans-serif; font-size: 20px; font-weight: 300; letter-spacing: 5px; fill: #A0AEC0; }}
  </style>

  <!-- Card Base -->
  <rect width="1050" height="600" fill="url(#bgDarkV3)" />

  <g clip-path="url(#cardClipV3)">
    <!-- Edge Accent Border -->
    <rect x="0" y="0" width="1050" height="600" fill="none" stroke="url(#crimsonGradV3)" stroke-width="6" opacity="0.1" />
    
    <!-- Subtle Architectural Wave -->
    <path d="M 0 300 C 300 100 750 500 1050 300 L 1050 600 L 0 600 Z" fill="url(#crimsonGradV3)" opacity="0.04" />
    
    <!-- Bottom Crimson Accent Strip -->
    <rect x="0" y="585" width="1050" height="15" fill="url(#crimsonGradV3)" />
    
    <!-- Connecting Circle (Left Half) -->
    <circle cx="850" cy="-50" r="300" fill="url(#crimsonGradV3)" opacity="0.14" />

    <!-- Center Logo & Brand Identity Presentation -->
    <g transform="translate(525, 255)">
      <!-- Scaled Logo Group (Scale 3.8) -->
      <g transform="translate(-230, -85) scale(3.8)" id="front_brand_lockup">
        <!-- RouteDefense Shield Emblem -->
        <g transform="translate(0, 4) scale(0.20)">
          <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#FFFFFF" stroke-width="24" stroke-linejoin="miter" />
          <path d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200" fill="none" stroke="#FFFFFF" stroke-width="24" stroke-linejoin="miter" />
          <rect x="116" y="148" width="24" height="24" fill="#E63946" />
        </g>

        <text x="48" y="24" font-family="'Outfit', 'Geist', sans-serif" font-size="20px" font-weight="700" fill="#FFFFFF" letter-spacing="-0.3">RouteDefense</text>
        <text x="48" y="39" font-family="'Outfit', 'Geist', sans-serif" font-size="11px" font-weight="700" fill="#E63946" letter-spacing="4">GROUP</text>
        <line x1="48" y1="26" x2="95" y2="26" stroke="#E63946" stroke-width="1" opacity="0.5" />
      </g>

      <!-- Tagline -->
      <text x="0" y="130" text-anchor="middle" class="font-tagline-v3">INSTITUTIONAL TRAFFIC DEFENSE NETWORK</text>

      <!-- Executive / Leadership Title in Gold Foil -->
      <text x="0" y="200" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="28px" font-weight="700" fill="url(#goldGradV3)" letter-spacing="1">Office of the Directorate | General Counsel</text>
    </g>
  </g>
</svg>
"""

# Standalone Back v3 SVG
back_v3_content = f"""<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="1050"
   height="600"
   viewBox="0 0 1050 600"
   version="1.1"
   id="business_card_back_v3"
   xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgLightV3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F8FAFC" />
    </linearGradient>
    <linearGradient id="crimsonGradV3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4D5E" />
      <stop offset="100%" stop-color="#E63946" />
    </linearGradient>
    <linearGradient id="goldGradV3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F6E05E" />
      <stop offset="100%" stop-color="#D69E2E" />
    </linearGradient>
    <linearGradient id="iconCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4D5E" />
      <stop offset="100%" stop-color="#D90429" />
    </linearGradient>
    <clipPath id="cardClipV3">
      <rect width="1050" height="600" />
    </clipPath>
  </defs>

  <style>
    .font-name-v3 {{ font-family: 'Outfit', 'Geist', 'Segoe UI', sans-serif; font-size: 32px; font-weight: 700; letter-spacing: 1px; fill: #1A202C; }}
    .font-title-v3 {{ font-family: 'Outfit', 'Geist', 'Segoe UI', sans-serif; font-size: 17px; font-weight: 600; letter-spacing: 2.5px; fill: #E63946; }}
    .font-contact-v3 {{ font-family: 'Outfit', 'Geist', 'Segoe UI', sans-serif; font-size: 19px; font-weight: 400; fill: #4A5568; }}
    .font-contact-bold-v3 {{ font-family: 'Outfit', 'Geist', 'Segoe UI', sans-serif; font-size: 19px; font-weight: 600; fill: #1A202C; }}
  </style>

  <!-- Card Base -->
  <rect width="1050" height="600" fill="url(#bgLightV3)" />

  <g clip-path="url(#cardClipV3)">
    <!-- Top Colored Accent Strip -->
    <rect x="0" y="0" width="1050" height="15" fill="url(#crimsonGradV3)" />

    <!-- Abstract Corner Shape -->
    <path d="M 750 0 C 850 300 1050 400 1050 600 L 1050 0 Z" fill="#F8FAFC" style="opacity:0.6;fill:#E63946;fill-opacity:0.04;" />

    <!-- Connecting Circle (Right Half) -->
    <circle cx="-200" cy="-50" r="300" fill="url(#crimsonGradV3)" opacity="0.14" />

    <!-- Left Column: Branding & Editorial Overview -->
    <g transform="translate(95, 95)" id="back_left_column_v3">
      <!-- Embedded Back Logo (Scale 2.4) -->
      <g transform="translate(0, 0) scale(2.4)" id="back_logo_v3">
        <g transform="translate(0, 4) scale(0.20)">
          <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#0F131A" stroke-width="24" stroke-linejoin="miter" />
          <path d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200" fill="none" stroke="#0F131A" stroke-width="24" stroke-linejoin="miter" />
          <rect x="116" y="148" width="24" height="24" fill="#E63946" />
        </g>
        <text x="48" y="24" font-family="'Outfit', 'Geist', sans-serif" font-size="20px" font-weight="700" fill="#0F131A" letter-spacing="-0.3">RouteDefense</text>
        <text x="48" y="39" font-family="'Outfit', 'Geist', sans-serif" font-size="11px" font-weight="700" fill="#E63946" letter-spacing="4">GROUP</text>
        <line x1="48" y1="26" x2="95" y2="26" stroke="#E63946" stroke-width="1" opacity="0.6" />
      </g>

      <!-- Subtitle -->
      <text x="5" y="145" class="font-title-v3">NATIONWIDE TRAFFIC DEFENSE NETWORK</text>

      <!-- Gold Accent Line -->
      <rect x="5" y="170" width="80" height="4" fill="url(#goldGradV3)" />

      <!-- Editorial Description Paragraph -->
      <text x="5" y="215" class="font-contact-v3" style="font-size: 17.5px; line-height: 1.55;">
        <tspan x="5" dy="0">Institutional defense routing for citations,</tspan>
        <tspan x="5" dy="28">radar calibration audits, and CDL violations.</tspan>
        <tspan x="5" dy="28">Verified local trial counsel appearing in court</tspan>
        <tspan x="5" dy="28">on your behalf across all 50 US states.</tspan>
      </text>

      <!-- Operating Protocol Box -->
      <g transform="translate(5, 360)" id="intake_protocol_box_v3">
        <rect width="310" height="85" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2" rx="4" />
        <g transform="translate(16, 20)">
          <path d="M 20 4 L 36 10 V 22 C 36 32 28 38 20 42 C 12 38 4 32 4 22 V 10 Z" fill="none" stroke="url(#crimsonGradV3)" stroke-width="2.5" stroke-linejoin="round" />
          <path d="M 14 22 L 18 26 L 26 18" fill="none" stroke="url(#crimsonGradV3)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <text x="68" y="38" class="font-contact-bold-v3" style="font-size: 18px;">Bar-Compliant Intake</text>
        <text x="68" y="62" class="font-contact-v3" style="font-size: 15px; fill: #64748B;">24/7 Priority Docket Dispatch</text>
      </g>
    </g>

    <!-- Right Column: 4 Hexagonal Contact Details -->
    <g transform="translate(505, 95)" id="back_right_contacts_v3">
      <!-- 1. Phone Item -->
      <g id="contact_phone_v3">
        <path d="M 15,0 H 45 L 60,25 45,50 H 15 L 0,25 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
        <path d="m 23,15 a 4,4 0 0 0 -4,4 c 0,12 9,21 21,21 a 4,4 0 0 0 4,-4 l -3,-7 a 2,2 0 0 0 -3,0 l -5,2 a 8,8 0 0 1 -6,-6 l 2,-5 a 2,2 0 0 0 0,-3 z" fill="url(#iconCrimsonGrad)" />
        <text x="80" y="24" class="font-contact-bold-v3">Direct Intake Hotline</text>
        <text x="80" y="48" class="font-contact-v3">+1 (800) 555-0199</text>
      </g>

      <!-- 2. Email Item -->
      <g transform="translate(0, 95)" id="contact_email_v3">
        <path d="M 15,0 H 45 L 60,25 45,50 H 15 L 0,25 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
        <path d="m 16,16 h 28 c 2,0 4,2 4,4 v 12 c 0,2 -2,4 -4,4 H 16 c -2,0 -4,-2 -4,-4 V 20 c 0,-2 2,-4 4,-4 z m -1,4 15,10 15,-10" fill="none" stroke="url(#iconCrimsonGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <text x="80" y="24" class="font-contact-bold-v3">Case Docket &amp; Evidence</text>
        <text x="80" y="48" class="font-contact-v3">cases@routedefensegroup.com</text>
      </g>

      <!-- 3. Address Item -->
      <g transform="translate(0, 190)" id="contact_address_v3">
        <path d="M 15,0 H 45 L 60,25 45,50 H 15 L 0,25 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
        <path d="M 30,37 C 30,37 18,25 18,19 a 12,12 0 0 1 24,0 c 0,6 -12,18 -12,18 z" fill="none" stroke="url(#iconCrimsonGrad)" stroke-width="2" />
        <circle cx="30" cy="19" r="4" fill="url(#iconCrimsonGrad)" />
        <text x="80" y="24" class="font-contact-bold-v3">National Routing Center</text>
        <text x="80" y="48" class="font-contact-v3">100 Wall St. 20th Fl, New York, NY</text>
      </g>

      <!-- 4. Website Item -->
      <g transform="translate(0, 290)" id="contact_website_v3">
        <path d="M 15,0 H 45 L 60,25 45,50 H 15 L 0,25 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
        <circle cx="30" cy="25" r="12" fill="none" stroke="url(#iconCrimsonGrad)" stroke-width="2" />
        <ellipse cx="30" cy="25" rx="5" ry="12" fill="none" stroke="url(#iconCrimsonGrad)" stroke-width="2" />
        <path d="M 18,25 H 42" fill="none" stroke="url(#iconCrimsonGrad)" stroke-width="2" />
        <text x="80" y="24" class="font-contact-bold-v3">Official Portal</text>
        <text x="80" y="48" class="font-contact-v3" style="font-weight: 600; fill: #E63946;">routedefensegroup.com</text>
      </g>
    </g>

    <!-- Scannable QR Code Hub (Bottom Right) -->
    <g transform="translate(835, 305)" id="back_qr_v3">
      <rect x="0" y="0" width="165" height="185" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2" />
      <g transform="translate(12, 10) scale(3.8)" id="embedded_user_qr">
        {qr_inner}
      </g>
      <text x="82.5" y="165" text-anchor="middle" font-family="'Outfit', 'Geist', sans-serif" font-size="11px" font-weight="700" letter-spacing="1px" fill="#0F131A">SCAN TO EVALUATE</text>
      <text x="82.5" y="177" text-anchor="middle" font-family="'Outfit', 'Geist', sans-serif" font-size="9.5px" font-weight="600" fill="#E63946">Instant Case Intake</text>
    </g>
  </g>
</svg>
"""

# Write all SVGs to both directories
for target_dir in [base_dir, branding_dir]:
    os.makedirs(target_dir, exist_ok=True)
    with open(os.path.join(target_dir, "Business_Card_Premium_v3.svg"), "w", encoding="utf-8") as f:
        f.write(svg_v3_content)
    with open(os.path.join(target_dir, "Front_v3.svg"), "w", encoding="utf-8") as f:
        f.write(front_v3_content)
    with open(os.path.join(target_dir, "Back_v3.svg"), "w", encoding="utf-8") as f:
        f.write(back_v3_content)

print("[OK] Generated Business_Card_Premium_v3.svg, Front_v3.svg, Back_v3.svg in both directories.")
