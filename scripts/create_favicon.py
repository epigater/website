#!/usr/bin/env python3
"""
Create favicon from Epigater Solutions logo
Crops the icon portion and generates multiple sizes
"""

from PIL import Image
import os

# Paths
input_path = '/home/z/my-project/upload/logo.png'
output_dir = '/home/z/my-project/public'

# Load image
img = Image.open(input_path)
print(f"Original size: {img.size}")

# The logo has the icon in the upper portion - crop it
# Based on the image, the icon is roughly in the top 70% of the image, centered
width, height = img.size

# Crop the icon part (upper ~72% of image, removing text at bottom)
crop_top = 0
crop_bottom = int(height * 0.72)  # Keep top 72% where the icon is
crop_left = int(width * 0.05)     # Slight left margin
crop_right = int(width * 0.95)    # Slight right margin

icon_img = img.crop((crop_left, crop_top, crop_right, crop_bottom))
print(f"Cropped icon size: {icon_img.size}")

# Create square canvas with transparent background
max_dim = max(icon_img.size)
square_size = max_dim
square = Image.new('RGBA', (square_size, square_size), (0, 0, 0, 0))

# Center the icon on the square canvas
offset_x = (square_size - icon_img.size[0]) // 2
offset_y = (square_size - icon_img.size[1]) // 2
square.paste(icon_img, (offset_x, offset_y), icon_img if icon_img.mode == 'RGBA' else None)

print(f"Square icon size: {square.size}")

# Generate different favicon sizes
sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'favicon-48x48.png': 48,
    'favicon-96x96.png': 96,
    'favicon-192x192.png': 192,
    'apple-touch-icon.png': 180,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512,
}

for filename, size in sizes.items():
    resized = square.resize((size, size), Image.Resampling.LANCZOS)
    
    # Convert to appropriate mode
    if filename == 'favicon-16x16.png' or filename == 'favicon-32x32.png':
        resized = resized.convert('RGBA')
    
    output_path = os.path.join(output_dir, filename)
    resized.save(output_path, 'PNG')
    print(f"✅ Created {filename} ({size}x{size})")

# Also create ICO file (traditional favicon)
ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico_path = os.path.join(output_dir, 'favicon.ico')
square.save(ico_path, format='ICO', sizes=ico_sizes)
print(f"✅ Created favicon.ico (multi-size)")

# Copy main favicon as favicon.png too
main_favicon = os.path.join(output_dir, 'favicon.png')
square.resize((32, 32), Image.Resampling.LANCZOS).save(main_favicon, 'PNG')
print(f"✅ Created favicon.png (32x32)")

print("\n🎉 All favicons created successfully!")
print(f"Output directory: {output_dir}")
