#!/bin/bash
# Epigater Solutions - PHPMailer Setup Script
# Run this in cPanel Terminal to install PHPMailer

echo "========================================="
echo "  Epigater - Contact Form Setup"
echo "========================================="
echo ""

# Check if we're in the right directory
if [ ! -d "public_html" ]; then
    echo "⚠️  Not in home directory. Navigating..."
    cd ~ || exit 1
fi

cd public_html || { echo "❌ Error: public_html directory not found"; exit 1; }

echo "📁 Current directory: $(pwd)"
echo ""

# Check if Composer is installed
if ! command -v composer &> /dev/null; then
    echo "📦 Installing Composer..."
    curl -sS https://getcomposer.org/installer | php -- --install-dir=$HOME --filename=composer
    export PATH="$HOME:$PATH"
    
    if command -v composer &> /dev/null; then
        echo "✅ Composer installed successfully!"
    else
        echo "❌ Failed to install Composer. Please install manually."
        exit 1
    fi
else
    echo "✅ Composer already installed: $(composer --version)"
fi

echo ""
echo "📥 Installing PHPMailer..."

# Install PHPMailer
composer require phpmailer/phpmailer

# Check if installation was successful
if [ -d "vendor/phpmailer" ]; then
    echo ""
    echo "✅ PHPMailer installed successfully!"
else
    echo ""
    echo "❌ PHPMailer installation failed. Trying alternative method..."
    
    # Alternative: Download directly
    mkdir -p PHPMailer/src
    cd PHPMailer/src || exit
    
    # Download PHPMailer files
    echo "⬇️  Downloading PHPMailer files..."
    
    curl -sL "https://raw.githubusercontent.com/PHPMailer/PHPMailer/master/src/Exception.php" -o Exception.php
    curl -sL "https://raw.githubusercontent.com/PHPMailer/PHPMailer/master/src/PHPMailer.php" -o PHPMailer.php
    curl -sL "https://raw.githubusercontent.com/PHPMailer/PHPMailer/master/src/SMTP.php" -o SMTP.php
    
    cd ../..
    
    if [ -f "PHPMailer/src/PHPMailer.php" ]; then
        echo "✅ PHPMailer downloaded successfully (manual mode)!"
    else
        echo "❌ Failed to download PHPMailer. Please upload manually."
        exit 1
    fi
fi

echo ""
echo "🔒 Setting permissions..."
chmod -R 755 vendor PHPmailer 2>/dev/null
chmod 644 contact.php 2>/dev/null

echo ""
echo "========================================="
echo "  ✅ Setup Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Upload contact.php to public_html/"
echo "2. Test the contact form on your website"
echo "3. Check email at contact@epigater.com"
echo ""
echo "Files location:"
echo "- PHPMailer: $(pwd)/vendor/phpmailer or $(pwd)/PHPMailer"
echo "- Contact form: $(pwd)/contact.php"
echo ""
echo "Need help? Check INSTALL-PHPMAILER.md for troubleshooting."
