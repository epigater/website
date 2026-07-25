<?php
/**
 * Epigater Solutions - Contact Form Handler
 * Uses native PHP mail() function - no external libraries needed!
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
        'error' => 'Method not allowed.'
    ]);
    exit;
}

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
    
    // HTML Email Template
    $htmlContent = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5;'>
    <div style='max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'>
        
        <!-- Header -->
        <div style='background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); color: white; padding: 30px; text-align: center;'>
            <h1 style='margin: 0; font-size: 24px;'>🚀 New Contact Message</h1>
            <p style='margin: 10px 0 0 0; opacity: 0.9;'>Someone has reached out through your website</p>
        </div>
        
        <!-- Content -->
        <div style='padding: 30px;'>
            <table style='width: 100%; border-collapse: collapse;'>
                <tr>
                    <td style='padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 120px;'>👤 Name:</td>
                    <td style='padding: 12px 0; border-bottom: 1px solid #eee;'>" . htmlspecialchars($fullName) . "</td>
                </tr>
                <tr>
                    <td style='padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;'>📧 Email:</td>
                    <td style='padding: 12px 0; border-bottom: 1px solid #eee;'><a href='mailto:" . htmlspecialchars($email) . "' style='color: #0891b2;'>" . htmlspecialchars($email) . "</a></td>
                </tr>";

    if (!empty($company)) {
        $htmlContent .= "
                <tr>
                    <td style='padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;'>🏢 Company:</td>
                    <td style='padding: 12px 0; border-bottom: 1px solid #eee;'>" . htmlspecialchars($company) . "</td>
                </tr>";
    }

    if (!empty($service)) {
        $htmlContent .= "
                <tr>
                    <td style='padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;'>⚙️ Service:</td>
                    <td style='padding: 12px 0; border-bottom: 1px solid #eee;'>" . htmlspecialchars($service) . "</td>
                </tr>";
    }

    $htmlContent .= "
            </table>
            
            <!-- Message Box -->
            <div style='margin-top: 25px; padding: 20px; background: #f8fafc; border-left: 4px solid #0891b2; border-radius: 5px;'>
                <strong style='color: #0891b2; display: block; margin-bottom: 10px;'>💬 Message:</strong>
                <p style='margin: 0; white-space: pre-wrap;'>" . nl2br(htmlspecialchars($message)) . "</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div style='background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee;'>
            <p style='margin: 0;'>This message was sent from the <strong>Epigater Solutions</strong> contact form.</p>
            <p style='margin: 5px 0 0 0;'>Sent at: " . date('F j, Y, g:i a') . "</p>
            <p style='margin: 10px 0 0 0;'>
                <a href='https://epigater.com' style='color: #0891b2; text-decoration: none;'>epigater.com</a>
            </p>
        </div>
    </div>
</body>
</html>";

    // Plain text version
    $plainText = "NEW CONTACT FORM SUBMISSION
================================

Name: {$fullName}
Email: {$email}" . 
(!empty($company) ? "\nCompany: {$company}" : '') .
(!empty($service) ? "\nService Interest: {$service}" : '') . "

Message:
----------------------------
{$message}
----------------------------

Sent at: " . date('Y-m-d H:i:s') . "

This message was sent from the Epigater Solutions contact form.
Website: https://epigater.com";

    // Email headers
    $to = 'contact@epigater.com';
    $subject = "New Contact from {$fullName} - Epigater Website";
    
    $headers = array();
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/html; charset=UTF-8';
    $headers[] = 'From: Epigater Website <contact@epigater.com>';
    $headers[] = 'Reply-To: ' . $email;
    $headers[] = 'X-Mailer: PHP/' . phpversion();
    $headers[] = 'X-Priority: 3'; // Normal priority
    
    $headersString = implode("\r\n", $headers);

    // Send email using native mail()
    $mailSent = mail($to, $subject, $htmlContent, $headersString);

    if ($mailSent) {
        // Success response
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.'
        ]);
    } else {
        // Mail function failed
        error_log('Contact form mail() failed for: ' . $email);
        
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to send message. Please try again later or email us directly at contact@epigater.com'
        ]);
    }

} catch (Exception $e) {
    // General error
    error_log('Contact form error: ' . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'An unexpected error occurred. Please try again later.'
    ]);
}
?>
