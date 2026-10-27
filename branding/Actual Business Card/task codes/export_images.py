import os
import subprocess

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
export_dir = os.path.join(base_dir, "exports")
os.makedirs(export_dir, exist_ok=True)

files_to_export = [
    ("Business_Card_Premium_v16.svg", "Business_Card_Premium_v16.jpg"),
    ("Front.svg", "Front.jpg"),
    ("Back.svg", "Back.jpg"),
    ("routedefense_profile.svg", "routedefense_profile.jpg"),
    ("routedefense_QR.svg", "routedefense_QR.jpg")
]

magick_path = r"C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe"

print(f"Exporting assets in: {base_dir}")
for svg_file, jpg_file in files_to_export:
    svg_path = os.path.join(base_dir, svg_file)
    jpg_path = os.path.join(base_dir, jpg_file)
    jpg_backup = os.path.join(export_dir, jpg_file)
    
    if os.path.exists(svg_path):
        if os.path.exists(magick_path):
            cmd = [magick_path, svg_path, "-density", "300", "-quality", "95", jpg_path]
            subprocess.run(cmd, check=True)
            # Copy to exports
            subprocess.run([magick_path, svg_path, "-density", "300", "-quality", "95", jpg_backup], check=True)
            print(f"✓ Exported {jpg_file}")
        else:
            print(f"Magick not found at {magick_path}")

print("All exports generated successfully.")
