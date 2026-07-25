# PHPMailer Installation Guide for cPanel

## Quick Setup (5 minutes)

### Option 1: Using cPanel Terminal (Recommended)

1. **Open cPanel Terminal**
   - Go to your cPanel
   - Click on "Terminal" in the "Advanced" section

2. **Navigate to public_html**
   ```bash
   cd ~/public_html
   ```

3. **Download Composer** (if not installed)
   ```bash
   curl -sS https://getcomposer.org/installer | php -- --install-dir=$HOME --filename=composer
   ```

4. **Install PHPMailer**
   ```bash
   composer require phpmailer/phpmailer
   ```

5. **Upload contact.php**
   - Upload the `contact.php` file to `public_html/contact.php`
   
6. **Set permissions**
   ```bash
   chmod 644 contact.php
   ```

### Option 2: Manual Upload

1. **Download PHPMailer**
   - Go to: https://github.com/PHPMailer/PHPMailer/releases
   - Download: `PHPMailer-6.9.1.zip`
   - Extract it

2. **Upload via File Manager**
   - Open cPanel → File Manager
   - Navigate to `public_html`
   - Create folder: `PHPMailer`
   - Upload contents of extracted `src` folder into `public_html/PHPMailer/`
   - You should have:
     ```
     public_html/
     ├── PHPMailer/
     │   ├── Exception.php
     │   ├── PHPMailer.php
     │   └── SMTP.php
     └── contact.php
     ```

3. **Upload contact.php**
   - Upload `contact.php` to `public_html/`

---

## Configuration

The `contact.php` file is pre-configured with your email settings:

| Setting | Value |
|---------|-------|
| SMTP Host | mail.epigater.com |
| SMTP Port | 465 (SSL) |
| Username | contact@epigater.com |
| Password | %TGBnhy6 |
| Recipient | contact@epigater.com |

---

## Testing

1. Visit your website
2. Fill out the contact form
3. Submit the form
4. Check for success message
5. Check email inbox at contact@epigater.com

---

## Troubleshooting

### Issue: "Server configuration error"
- PHPMailer is not found
- Run installation steps above

### Issue: Email not sending
- Check SMTP credentials are correct
- Verify port 465 is open
- Check spam/junk folder

### Issue: Permission denied
- Run: `chmod 644 contact.php`
- Ensure folder permissions are 755

---

## Security Notes

✅ **Already Implemented:**
- Input sanitization (XSS prevention)
- Email validation
- Field length limits
- Error handling without exposing sensitive info

⚠️ **Recommendations:**
- Add rate limiting (prevent spam)
- Add CAPTCHA if receiving spam
- Update password regularly
- Monitor error logs

---

## Support

If you encounter issues, check:
1. PHP error logs in cPanel
2. Email delivery logs
3. Contact your hosting provider about SMTP access

---

**Last Updated:** July 2026  
**Version:** 1.0.0
