/**
 * HTML Email Template for Mr.Sea Farm Contact Form
 * This template generates a professional HTML email for contact form submissions
 */

/**
 * Generate a complete HTML email template
 * @param {Object} formData - Form data with name, email, phone, message
 * @returns {string} - Complete HTML template
 */
export const generateContactEmailHTML = (formData) => {
  const now = new Date();
  const dateTimeString = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message - Mr.Sea Farm</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        /* Header Section */
        .email-header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        
        .email-header h1 {
            font-size: 28px;
            margin-bottom: 8px;
            font-weight: 700;
        }
        
        .email-header p {
            font-size: 14px;
            opacity: 0.9;
        }
        
        /* Logo Section (if needed) */
        .logo-section {
            text-align: center;
            padding: 10px 0;
        }
        
        .logo-section img {
            max-width: 80px;
            height: auto;
        }
        
        /* Content Section */
        .email-content {
            padding: 40px;
        }
        
        .greeting {
            font-size: 16px;
            color: #059669;
            font-weight: 600;
            margin-bottom: 20px;
        }
        
        /* Form Details */
        .form-section {
            background-color: #f9fafb;
            border-left: 4px solid #10b981;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        
        .form-row {
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .form-row:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .form-label {
            display: block;
            font-weight: 700;
            color: #059669;
            margin-bottom: 6px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .form-value {
            font-size: 14px;
            color: #374151;
            word-break: break-word;
            line-height: 1.5;
        }
        
        .form-value a {
            color: #10b981;
            text-decoration: none;
        }
        
        .form-value a:hover {
            text-decoration: underline;
        }
        
        /* Message Section */
        .message-section {
            background-color: #ecfdf5;
            border: 1px solid #a7f3d0;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .message-section .form-label {
            color: #047857;
            margin-bottom: 10px;
        }
        
        .message-content {
            background-color: #f0fdf4;
            padding: 15px;
            border-radius: 4px;
            font-size: 14px;
            color: #1f2937;
            line-height: 1.8;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        
        /* Meta Information */
        .meta-info {
            background-color: #f3f4f6;
            padding: 12px;
            border-radius: 4px;
            font-size: 12px;
            color: #6b7280;
            margin-top: 20px;
            text-align: right;
        }
        
        /* CTA Section */
        .cta-section {
            background-color: #f0fdf4;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            border-radius: 6px;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 12px 28px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            transition: opacity 0.3s;
        }
        
        .cta-button:hover {
            opacity: 0.9;
        }
        
        /* Footer Section */
        .email-footer {
            background-color: #1f2937;
            color: #9ca3af;
            padding: 30px 20px;
            text-align: center;
            font-size: 12px;
            border-top: 3px solid #10b981;
        }
        
        .footer-content {
            margin-bottom: 15px;
        }
        
        .footer-contact {
            margin: 10px 0;
            font-size: 13px;
        }
        
        .footer-contact a {
            color: #10b981;
            text-decoration: none;
        }
        
        .footer-contact a:hover {
            text-decoration: underline;
        }
        
        .footer-social {
            margin-top: 15px;
        }
        
        .social-link {
            display: inline-block;
            margin: 0 8px;
            color: #10b981;
            text-decoration: none;
            font-size: 12px;
        }
        
        .divider {
            height: 1px;
            background-color: #374151;
            margin: 15px 0;
        }
        
        /* Responsive */
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
            }
            
            .email-header {
                padding: 30px 15px;
            }
            
            .email-header h1 {
                font-size: 24px;
            }
            
            .email-content {
                padding: 20px;
            }
            
            .email-footer {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>🌾 Mr.Sea Farm</h1>
            <p>New Contact Form Submission</p>
        </div>
        
        <!-- Content -->
        <div class="email-content">
            <!-- Greeting -->
            <div class="greeting">
                Hello Mr.Sea Farm Team,
            </div>
            
            <p style="margin-bottom: 20px; font-size: 14px; color: #4b5563;">
                You have received a new message from your website contact form. Please review the details below:
            </p>
            
            <!-- Form Details Section -->
            <div class="form-section">
                <!-- Name -->
                <div class="form-row">
                    <span class="form-label">👤 Sender Name</span>
                    <div class="form-value">${formData.name}</div>
                </div>
                
                <!-- Email -->
                <div class="form-row">
                    <span class="form-label">📧 Email Address</span>
                    <div class="form-value">
                        <a href="mailto:${formData.email}">${formData.email}</a>
                    </div>
                </div>
                
                <!-- Phone -->
                <div class="form-row">
                    <span class="form-label">📱 Phone Number</span>
                    <div class="form-value">
                        ${formData.phone ? `<a href="tel:${formData.phone.replace(/\s/g, '')}">${formData.phone}</a>` : '<em style="color: #9ca3af;">Not provided</em>'}
                    </div>
                </div>
            </div>
            
            <!-- Message Section -->
            <div class="message-section">
                <span class="form-label">💬 Message</span>
                <div class="message-content">${formData.message}</div>
            </div>
            
            <!-- CTA Section -->
            <div class="cta-section">
                <p style="font-size: 13px; color: #047857; margin-bottom: 12px;">
                    <strong>Quick Actions:</strong>
                </p>
                <a href="mailto:${formData.email}" class="cta-button">Reply to ${formData.name.split(' ')[0]}</a>
            </div>
            
            <!-- Meta Information -->
            <div class="meta-info">
                <div>📅 <strong>Received:</strong> ${dateTimeString}</div>
                <div style="margin-top: 4px;">🌐 <strong>Source:</strong> Website Contact Form</div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="email-footer">
            <div class="footer-content">
                <strong style="color: #10b981;">Mr.Sea Farm</strong><br>
                Pure, Organic, and Natural Products
            </div>
            
            <div class="divider"></div>
            
            <div class="footer-contact">
                <div>📍 East Street, Mooppakovil, Kumbakonam, Tamil Nadu 612703</div>
                <div style="margin-top: 5px;">
                    📞 <a href="tel:+919363249700">+91 9363249700</a> | 
                    <a href="tel:+919361108566">+91 9361108566</a>
                </div>
                <div style="margin-top: 5px;">
                    📧 <a href="mailto:mrseafarm@gmail.com">mrseafarm@gmail.com</a>
                </div>
            </div>
            
            <div class="footer-social">
                <a href="https://www.instagram.com/mr.sea_farm" class="social-link">Instagram</a> • 
                <a href="https://www.youtube.com/@Santhosh_633" class="social-link">YouTube</a> • 
                <a href="https://www.facebook.com/share/1Do22iDage/" class="social-link">Facebook</a>
            </div>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #374151; font-size: 11px; color: #6b7280;">
                <p>© ${new Date().getFullYear()} Mr.Sea Farm. All rights reserved.<br>
                This is an automated message. Please do not reply directly to this email.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;

  return htmlTemplate;
};

/**
 * Generate HTML email template for customer confirmation
 * @param {Object} formData - Form data
 * @returns {string} - HTML template
 */
export const generateCustomerConfirmationHTML = (formData) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message Received - Mr.Sea Farm</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .email-header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        
        .email-header h1 {
            font-size: 28px;
            margin-bottom: 8px;
            font-weight: 700;
        }
        
        .email-content {
            padding: 40px;
        }
        
        .greeting {
            font-size: 18px;
            color: #059669;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .message-box {
            background-color: #f0fdf4;
            border-left: 4px solid #10b981;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        
        .message-box p {
            color: #374151;
            font-size: 14px;
            line-height: 1.8;
            margin-bottom: 10px;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 12px 28px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            margin-top: 10px;
        }
        
        .email-footer {
            background-color: #1f2937;
            color: #9ca3af;
            padding: 30px 20px;
            text-align: center;
            font-size: 12px;
            border-top: 3px solid #10b981;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
            }
            .email-content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>✅ Message Received!</h1>
            <p>Thank you for contacting us</p>
        </div>
        
        <div class="email-content">
            <div class="greeting">
                Hello ${formData.name.split(' ')[0]},
            </div>
            
            <p style="margin-bottom: 15px; font-size: 14px; color: #4b5563;">
                Thank you for reaching out to us! We have successfully received your message and appreciate you taking the time to contact Mr.Sea Farm.
            </p>
            
            <div class="message-box">
                <p><strong>📋 Your Message Summary:</strong></p>
                <p><strong>Email:</strong> ${formData.email}</p>
                ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
                <p style="margin-top: 10px; color: #059669;"><strong>Message Preview:</strong></p>
                <p style="font-style: italic; color: #6b7280; margin-left: 10px;">"${formData.message.substring(0, 100)}${formData.message.length > 100 ? '...' : ''}"</p>
            </div>
            
            <p style="margin-bottom: 15px; font-size: 14px; color: #4b5563;">
                Our team will review your message and get back to you as soon as possible. We typically respond within 24-48 hours.
            </p>
            
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 4px; margin: 20px 0; font-size: 13px; color: #6b7280;">
                <strong style="color: #059669;">📞 In the meantime, feel free to reach us:</strong><br>
                Phone: <a href="tel:+919363249700" style="color: #10b981; text-decoration: none;">+91 9363249700</a><br>
                Email: <a href="mailto:mrseafarm@gmail.com" style="color: #10b981; text-decoration: none;">mrseafarm@gmail.com</a>
            </div>
        </div>
        
        <div class="email-footer">
            <p style="margin-bottom: 10px;"><strong style="color: #10b981;">Mr.Sea Farm</strong></p>
            <p>Pure, Organic, and Natural Products</p>
            <p style="margin-top: 10px; font-size: 11px;">© ${new Date().getFullYear()} Mr.Sea Farm. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
};

export default {
  generateContactEmailHTML,
  generateCustomerConfirmationHTML,
};
