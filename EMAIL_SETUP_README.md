# 📧 Mr.Sea Farm Contact Form Email Templates

## Overview

This documentation covers the complete setup and implementation of HTML email templates for the Mr.Sea Farm contact form using EmailJS.

### ✨ Features

- **Professional HTML emails** with responsive design
- **Admin notification emails** with all form details
- **Customer confirmation emails** to thank customers
- **Beautiful formatting** with company branding
- **Mobile-optimized** designs
- **Easy to customize** color schemes and content
- **Error handling** and validation
- **Multiple recipient support**

---

## 📁 Files Structure

```
src/utils/
├── htmlEmailTemplate.js          # HTML email template generators
├── emailTemplate.js              # Email configuration and validation
├── emailJSTemplateGuide.js      # Setup and configuration guide
└── emailExamples.js             # Practical code examples

src/pages/
└── Contact.jsx                  # Contact form component
```

---

## 🚀 Quick Start

### 1. **Verify EmailJS Configuration**

Check that these IDs are set in your EmailJS account:

```javascript
SERVICE_ID:  "service_gu8tx8r"
TEMPLATE_ID: "template_1yntw72"
PUBLIC_KEY:  "Y60ey9DCKVY4gkZdy"
```

### 2. **The HTML Templates Include:**

#### **Admin Notification Email** 📬
Shows:
- Sender's name, email, and phone
- Full message content
- Timestamp and submission source
- Quick action buttons (Reply)
- Company contact information

#### **Customer Confirmation Email** 💌
Shows:
- Thank you message personalized with name
- Submission confirmation
- Message preview
- Expected response time (24-48 hours)
- Contact information
- Social media links

### 3. **Form Fields**

The contact form accepts:

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | Text | ✅ Yes | 2-100 characters |
| Email | Email | ✅ Yes | Valid email format |
| Phone | Tel | ❌ No | 10+ characters |
| Message | Textarea | ✅ Yes | 10-500 characters |

---

## 📧 Email Template Structure

### Admin Notification Email

```
┌─────────────────────────────────────┐
│   HEADER (Green Gradient)           │
│   Mr.Sea Farm - New Message         │
└─────────────────────────────────────┘
│                                      │
│  Hello Mr.Sea Farm Team,             │
│                                      │
│  ┌──────────────────────────────┐  │
│  │ FORM DETAILS (Light Green)   │  │
│  │ • Name: John Doe             │  │
│  │ • Email: john@example.com    │  │
│  │ • Phone: +91 9876543210      │  │
│  └──────────────────────────────┘  │
│                                      │
│  ┌──────────────────────────────┐  │
│  │ MESSAGE (Highlighted Box)    │  │
│  │                              │  │
│  │ "Full message text here..."  │  │
│  │                              │  │
│  └──────────────────────────────┘  │
│                                      │
│  ⏱️ Received: 18/11/2025 02:30 PM   │
│                                      │
├─────────────────────────────────────┤
│   FOOTER (Dark Green)               │
│   Company info & Contact details    │
│   Social media links                │
└─────────────────────────────────────┘
```

### Customer Confirmation Email

```
┌─────────────────────────────────────┐
│   HEADER (Green Gradient)           │
│   ✅ Message Received!              │
│   Thank you for contacting us       │
└─────────────────────────────────────┘
│                                      │
│  Hello John,                         │
│                                      │
│  Thank you for reaching out!        │
│                                      │
│  ┌──────────────────────────────┐  │
│  │ YOUR SUBMISSION              │  │
│  │ Email: john@example.com      │  │
│  │ Phone: +91 9876543210        │  │
│  │                              │  │
│  │ "Message preview text..."    │  │
│  └──────────────────────────────┘  │
│                                      │
│  📞 Contact Information:             │
│  Quick action links to reach us     │
│                                      │
├─────────────────────────────────────┤
│   FOOTER (Dark Green)               │
│   Company branding                  │
└─────────────────────────────────────┘
```

---

## 🛠️ Installation Steps

### Step 1: Create EmailJS Template

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click "Email Templates" → "Create New Template"
3. Name: "Contact Form HTML Template"
4. Set parameters in the template editor

### Step 2: Configure Service

1. Go to "Email Services"
2. Connect your Gmail or email provider
3. Note the Service ID and Template ID

### Step 3: Update Code

Make sure these are set in `emailTemplate.js`:

```javascript
export const emailTemplate = {
  serviceId: "service_gu8tx8r",      // Your service ID
  templateId: "template_1yntw72",    // Your template ID
  publicKey: "Y60ey9DCKVY4gkZdy",    // Your public key
  recipientEmail: "mrseafarm@gmail.com",
};
```

### Step 4: Test the Form

1. Fill out the contact form with test data
2. Submit and verify email is received
3. Check both sender and recipient emails

---

## 📝 Usage Examples

### Basic Form Submission

```javascript
import { emailTemplate } from '../utils/emailTemplate';
import emailjs from "@emailjs/browser";

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    message: "I'm interested in your products..."
  };

  try {
    const emailParams = emailTemplate.getEmailParams(formData);
    
    const response = await emailjs.send(
      emailTemplate.serviceId,
      emailTemplate.templateId,
      emailParams
    );

    if (response.status === 200) {
      alert("✅ Message sent successfully!");
    }
  } catch (error) {
    alert("❌ Failed to send message");
  }
};
```

### Send with HTML Template

```javascript
import { generateContactEmailHTML } from '../utils/htmlEmailTemplate';

const emailParams = {
  to_email: "admin@example.com",
  from_name: "John Doe",
  from_email: "john@example.com",
  phone: "+91 9876543210",
  message: "Message text...",
  html_message: generateContactEmailHTML({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    message: "Message text..."
  })
};

await emailjs.send(serviceId, templateId, emailParams);
```

---

## 🎨 Customization

### Change Colors

In `htmlEmailTemplate.js`, update the green color:

```css
/* Original Green Theme */
#10b981 → Your primary color
#059669 → Your darker shade
#f0fdf4 → Your light background

/* Example: Blue Theme */
#3b82f6 → Primary blue
#1e40af → Dark blue
#eff6ff → Light blue background
```

### Update Company Information

```javascript
// In htmlEmailTemplate.js, update:
- Company name
- Address
- Phone numbers
- Email address
- Social media links
```

### Modify Template Text

```javascript
// Change greeting messages
// Update response time expectations
// Customize call-to-action text
// Modify footer content
```

---

## ✅ Email Template in EmailJS Dashboard

### Template Setup

```
Template Name: Contact Form HTML Template
Template ID: template_1yntw72

Parameters needed:
- {{from_name}}
- {{from_email}}
- {{phone}}
- {{message}}
- {{{html_message}}}
- {{date_time}}
- {{subject}}
- {{to_email}}
```

### Template Content Example

```
Subject: {{subject}}

From: {{from_name}} <{{from_email}}>
Phone: {{phone}}
Received: {{date_time}}

{{{html_message}}}

---
This is an automated message from Mr.Sea Farm Contact Form
```

**Important:** Use triple curly braces `{{{ }}}` for HTML content to prevent escaping.

---

## 🔍 Troubleshooting

### Issue: HTML appears as plain text

**Solution:**
- Use triple curly braces `{{{ }}}` in EmailJS template
- Check parameter name matches: `html_message`

### Issue: Emails not sent

**Solution:**
- Verify Service ID and Template ID are correct
- Check Gmail app password (if using Gmail)
- Verify email service is enabled in EmailJS
- Check email logs in EmailJS dashboard

### Issue: Form validation fails

**Solution:**
- Ensure all required fields are filled
- Check character limits (Name: 2-100, Message: 10-500)
- Validate email format
- Verify phone has at least 10 characters

### Issue: Styling not working

**Solution:**
- Use inline CSS (style attribute) for best compatibility
- Avoid external stylesheets
- Test in different email clients
- Use web-safe fonts (Arial, Helvetica, etc.)

---

## 📊 Form Validation Rules

```javascript
{
  name: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    required: false,
    minLength: 10
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 500
  }
}
```

---

## 🔗 Email Parameters Flow

```
User Form Input
    ↓
Form Validation
    ↓
Create FormData Object
    ↓
Generate HTML Content
    ↓
Create EmailJS Parameters
    ↓
Send Email
    ↓
Success/Error Response
    ↓
Reset Form / Show Message
```

---

## 📞 Contact Information

**Mr.Sea Farm**
- 📍 East Street, Mooppakovil, Kumbakonam, Tamil Nadu 612703
- 📞 +91 9363249700 | +91 9361108566
- 📧 mrseafarm@gmail.com
- 🌐 Instagram | YouTube | Facebook

---

## 📚 Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React EmailJS Guide](https://www.emailjs.com/docs/sdk/react/)
- [Email HTML Best Practices](https://www.campaignmonitor.com/guides/html-email/)
- [Email Client Compatibility](https://www.litmus.com/)

---

## 📋 Checklist

- [ ] EmailJS account created
- [ ] Service configured (Gmail or email provider)
- [ ] Template created in EmailJS dashboard
- [ ] Service ID, Template ID, and Public Key verified
- [ ] HTML templates generated correctly
- [ ] Contact form validation working
- [ ] Test email sent successfully
- [ ] Verified recipient received HTML formatted email
- [ ] Customer sees formatted email in inbox
- [ ] Mobile responsiveness tested
- [ ] All links (email, phone, social) working
- [ ] Error handling tested

---

## 🎯 Key Features Summary

✅ Professional HTML email design
✅ Responsive mobile design
✅ Admin notification emails
✅ Customer confirmation emails
✅ Form validation with error messages
✅ Easy to customize
✅ Color-coded sections
✅ Emoji icons for visual appeal
✅ Company branding
✅ Social media links
✅ Timestamp tracking
✅ Multiple recipient support

---

**Last Updated:** November 18, 2025
**Version:** 1.0
**Status:** Production Ready ✅
