#!/usr/bin/env python3
"""Generate Tauri icon set from logo_with_bg.png.
Auto-crops uniform dark-bg padding, keeping the Figma design tight."""

from PIL import Image
import os
import numpy as np

ICONS_DIR = "src-tauri/icons"
LOGO_PATH = "logo_with_bg.png"

os.makedirs(ICONS_DIR, exist_ok=True)

logo_img = Image.open(LOGO_PATH).convert("RGBA")
data = np.array(logo_img)

# The Figma background is a uniform dark color ~(23,23,20)
# Find pixels that differ from this background
# Sample corners to determine the exact bg color
bg_r, bg_g, bg_b = int(data[0,0,0]), int(data[0,0,1]), int(data[0,0,2])
print(f"Detected background color: ({bg_r}, {bg_g}, {bg_b})")

# Create mask of pixels significantly different from bg (tolerance of 10)
tolerance = 10
r_diff = np.abs(data[:,:,0].astype(int) - bg_r)
g_diff = np.abs(data[:,:,1].astype(int) - bg_g)
b_diff = np.abs(data[:,:,2].astype(int) - bg_b)
mask = (r_diff > tolerance) | (g_diff > tolerance) | (b_diff > tolerance)

rows = np.any(mask, axis=1)
cols = np.any(mask, axis=0)
ymin, ymax = np.where(rows)[0][[0, -1]]
xmin, xmax = np.where(cols)[0][[0, -1]]

# Add 5% breathing room so icon doesn't touch edges
cw, ch = xmax - xmin + 1, ymax - ymin + 1
pad_x, pad_y = int(cw * 0.05), int(ch * 0.05)
xmin = max(0, xmin - pad_x)
xmax = min(logo_img.width - 1, xmax + pad_x)
ymin = max(0, ymin - pad_y)
ymax = min(logo_img.height - 1, ymax + pad_y)

cropped = logo_img.crop((xmin, ymin, xmax + 1, ymax + 1))
print(f"Source: {logo_img.size} -> Cropped: {cropped.size} (removed {xmin}px L/R, {ymin}px T/B padding)")

# Resize to each target size
png_sizes = {"32x32.png": 32, "128x128.png": 128, "128x128@2x.png": 256, "icon.png": 1024}
for filename, size in png_sizes.items():
    resized = cropped.resize((size, size), Image.LANCZOS)
    resized.save(os.path.join(ICONS_DIR, filename))
    print(f"  {filename} ({size}x{size})")

# .ico with multiple sizes
ico_sizes = [16, 24, 32, 48, 64, 96, 128, 256]
frames = [cropped.resize((s, s), Image.LANCZOS) for s in ico_sizes]
frames[0].save(
    os.path.join(ICONS_DIR, "icon.ico"),
    format="ICO", sizes=[(s, s) for s in ico_sizes],
    append_images=frames[1:],
)
print(f"  icon.ico (multi-res: {ico_sizes})")

# Favicon
cropped.resize((128, 128), Image.LANCZOS).save("public/logo-icon.png")
print("  public/logo-icon.png")

print("\nDone!")
