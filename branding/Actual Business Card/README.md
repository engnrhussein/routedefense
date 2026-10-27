# RouteDefense Group — Executive Business Card & Brand Assets

State-of-the-art, minimalist vector business card and corporate identity package for **RouteDefense Group** (`routedefensegroup.com`), crafted in pure SVG vector format.

Inspired by the precision architectural aesthetic of `Business_Card_Premium_v16` and tailored to the high-authority legal tech positioning of RouteDefense Group.

---

## 📁 Directory Structure

```text
Actual Business Card/
├── Business_Card_Premium_v16.svg   # Master double-sided side-by-side card (2100 x 600 px)
├── Business_Card_Premium_v16.jpg   # High-resolution raster export of the master card
├── Front.svg                       # Standalone Front card vector (1050 x 600 px)
├── Front.jpg                       # High-resolution print raster of Front card
├── Back.svg                        # Standalone Back card vector (1050 x 600 px)
├── Back.jpg                        # High-resolution print raster of Back card
├── routedefense_profile.svg        # Corporate Profile / Avatar vector (1024 x 1024 px)
├── routedefense_profile.jpg        # High-resolution corporate profile picture
├── routedefense_QR.svg             # Scannable vector QR code with embedded shield (1024 x 1024 px)
├── routedefense_QR.jpg             # High-resolution QR code image
├── README.md                       # Design specifications and print guidelines
├── exports/                        # High-DPI raster image backups
└── task codes/                     # Automated Python generation scripts
    ├── generate_qr.py              # QR code matrix & vector path synthesizer
    ├── create_profile.py           # Corporate avatar builder
    ├── build_business_card.py      # Master SVG and standalone card generator
    └── export_images.py            # High-resolution rendering script
```

---

## 🎨 Design System & Palette

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Obsidian Slate** | `#111111` / `#0E1014` | Primary brand background, authoritative dark tone |
| **Safety Crimson** | `#E63946` / `#FF4D5E` | Resolution accent, highlight bars, shield cube, QR locator accent |
| **Gallery White** | `#FFFFFF` / `#F9FAFB` | Card back background, clean institutional readability |
| **Platinum Slate** | `#E5E7EB` / `#64748B` | Subtle architectural borders, divider hairlines, secondary text |
| **Executive Gold** | `#DFB143` / `#F7E07C` | Office of General Counsel / Directorate title foil accent |

---

## 📐 Print & Technical Specifications

- **Aspect Ratio**: Standard US Business Card ($3.5'' \times 2.0''$)
- **Resolution**: Resolution-independent vector (`.svg`), calibrated at $300\text{ DPI}$ ($1050 \times 600\text{ px}$ per face)
- **Bleed & Margins**: Minimalist $0.08$ opacity hairlines with $20\text{ px}$ precision corner registration marks
- **Safe Area**: All critical typography and contact badges are inset at least $35\text{ px}$ from card boundaries
- **QR Code Target**: `https://routedefensegroup.com` (Client Portal & Case Intake)
- **QR Error Correction**: Level H ($30\%$ error recovery) with centered RouteDefense geometric shield badge
