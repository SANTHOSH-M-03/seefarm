/**
 * Email Template Configuration and Utilities
 */

import { generateContactEmailHTML, generateCustomerConfirmationHTML } from './htmlEmailTemplate';

// Form validation
export const validateFormData = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData.message || formData.message.trim() === '') {
    errors.message = 'Message is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Email template configuration
export const emailTemplate = {
  // EmailJS configuration
  serviceId: 'service_gu8tx8r',
  templateId: 'template_1yntw72',
  
  // Default form values
  defaultFormValues: {
    name: '',
    email: '',
    phone: '',
    message: '',
  },

  // Email messages
  messages: {
    validationError: 'Please fill in all required fields correctly.',
    success: 'Thank you! Your message has been sent successfully. We will get back to you soon.',
    error: 'Failed to send message. Please try again later.',
  },

  // Get email parameters for EmailJS
  getEmailParams: (formData) => {
    return {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      message: formData.message,
      to_email: 'mrseafarm@gmail.com',
      submission_date: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }),
    };
  },

  // Generate HTML email for admin
  generateAdminEmail: (formData) => {
    return generateContactEmailHTML(formData);
  },

  // Generate HTML email for customer confirmation
  generateCustomerEmail: (formData) => {
    return generateCustomerConfirmationHTML(formData);
  },
};

export default {
  validateFormData,
  emailTemplate,
};
