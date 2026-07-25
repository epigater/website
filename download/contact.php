<?php
/**
 * Epigater Solutions - Contact Form Handler
 * 
 * This script handles form submissions from the contact page,
 * sends emails via SMTP, and returns JSON responses.
 * 
 * @version 1.0.0
 * @author Epigater Solutions
 */

// Set headers for JSON response
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Please use POST.'
    ]);
    exit;
}

// Include Composer's autoloader (for PHPMailer)
// If you don't have Composer, download PHPMailer manually:
// https://github.com/PHPMailer/PHPMailer/archive/refs/tags/v6.9.1.zip
$autoloadPaths = [
    __DIR__ . '/vendor/autoload.php',
    dirname(__DIR__) . '/vendor/autoload.php',
];

$autoloaderFound = false;
foreach ($autoloadPaths as $path) {
    if (file_exists($path)) {
        require_once $path;
        $autoloaderFound = true;
        break;
    }
}

if (!$autoloaderFound) {
    // Fallback: Try to include PHPMailer directly
    $phpmailerPath = __DIR__ . '/PHPMailer/src';
    if (is_dir($phpmailerPath)) {
        require_once $phpmailerPath . '/Exception.php';
        require_once $phpmailerPath . '/PHPMailer.php';
        require_once $phpmailerPath . '/SMTP.php';
        $autoloaderFound = true;
    }
}

if (!$autoloaderFound) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server configuration error. Please contact administrator.'
    ]);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

/**
 * Sanitize input data
 */
function sanitize($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validate email address
 */
function isValidEmail($email) {
    return filter_var(trim($email), FILTER_VALIDATE_EMAIL) !== false;
}

try {
    // Get and sanitize form data
    $firstName = sanitize($_POST['firstName'] ?? '');
    $lastName = sanitize($_POST['lastName'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $company = sanitize($_POST['company'] ?? '');
    $service = sanitize($_POST['service'] ?? '');
    $message = sanitize($_POST['message'] ?? '');

    // Validation
    $errors = [];

    if (empty($firstName)) {
        $errors[] = 'First name is required.';
    } elseif (strlen($firstName) < 2 || strlen($firstName) > 100) {
        $errors[] = 'First name must be between 2 and 100 characters.';
    }

    if (empty($email)) {
        $errors[] = 'Email address is required.';
    } elseif (!isValidEmail($email)) {
        $errors[] = 'Please enter a valid email address.';
    }

    if (empty($message)) {
        $errors[] = 'Message is required.';
    } elseif (strlen($message) < 10 || strlen($message) > 5000) {
        $errors[] = 'Message must be between 10 and 5000 characters.';
    }

    // Additional validation for optional fields
    if (!empty($lastName) && strlen($lastName) > 100) {
        $errors[] = 'Last name must be less than 100 characters.';
    }

    if (!empty($company) && strlen($company) > 200) {
        $errors[] = 'Company name must be less than 200 characters.';
    }

    // Return validation errors if any
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => implode(' ', $errors)
        ]);
        exit;
    }

    // Prepare email content
    $fullName = trim($firstName . ' ' . $lastName);
    $subject = "New Contact Form Submission from {$fullName}";
    
    $emailBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px #ddd solid; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; display: inline-block; min-width: 120px; }
            .value { color: #333; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #667eea; margin-top: 20px; }
            .footer { text-align: center; padding: 15px; color: #777; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🚀 New Contact Message</h2>
                <p>Someone has reached out through your website</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>👤 Name:</span>
                    <span class='value'>" . htmlspecialchars($fullName) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>📧 Email:</span>
                    <span class='value'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></span>
                </div>";
    
    if (!empty($company)) {
        $emailBody .= "
                <div class='field'>
                    <span class='label'>🏢 Company:</span>
                    <span class='value'>" . htmlspecialchars($company) . "</span>
                </div>";
    }
    
    if (!empty($service)) {
        $emailBody .= "
                <div class='field'>
                    <span class='label'>⚙️ Service Interest:</span>
                    <span class='value'>" . htmlspecialchars($service) . "</span>
                </div>";
    }
    
    $emailBody .= "
                <div class='message-box'>
                    <strong>💬 Message:</strong><br><br>
                    " . nl2br(htmlspecialchars($message)) . "
                </div>
            </div>
            <div class='footer'>
                <p>This message was sent from the Epigater Solutions contact form.</p>
                <p>Sent at: " . date('Y-m-d H:i:s') . "</p>
            </div>
        </div>
    </body>
    </html>";

    // Plain text version for non-HTML clients
    $plainTextBody = "
NEW CONTACT FORM SUBMISSION
============================

Name: {$fullName}
Email: {$email}" . 
(!empty($company) ? "\nCompany: {$company}" : '') .
(!empty($service) ? "\nService Interest: {$service}" : '') . "

Message:
----------------------------
{$message}
----------------------------

Sent at: " . date('Y-m-d H:i:s') . "

This message was sent from the Epigater Solutions contact form.";

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host       = 'mail.epigater.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'contact@epigater.com';
    $mail->Password   = '%TGBnhy6';  // Your email password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  // SSL/TLS for port 465
    $mail->Port       = 465;
    
    // Optional: Enable debugging (disable in production!)
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    
    // Sender settings
    $mail->setFrom('contact@epigater.com', 'Epigater Solutions Website');
    $mail->addReplyTo($email, $fullName);
    
    // Recipient
    $mail->addAddress('contact@epigater.com', 'Epigater Solutions');
    
    // Content settings
    $mail->Subject = $subject;
    $mail->Body    = $emailBody;
    $mail->AltBody = $plainTextBody;
    $mail->isHTML(true);
    
    // Character encoding
    $mail->CharSet = 'UTF-8';
    
    // Send email
    $mail->send();

    // Success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.'
    ]);

} catch (Exception $e) {
    // Email sending failed
    error_log('Contact form error: ' . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to send message. Please try again later or contact us directly at contact@epigater.com'
    ]);
}
?>
