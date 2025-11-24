import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { validateFormData, emailTemplate } from "../utils/emailTemplate";

function Contact() {
  const [formData, setFormData] = useState(emailTemplate.defaultFormValues);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("Y60ey9DCKVY4gkZdy");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      alert(emailTemplate.messages.validationError);
      return;
    }

    setLoading(true);
    setStatus("");
    setErrors({});

    try {
      const emailParams = emailTemplate.getEmailParams(formData);

      const response = await emailjs.send(
        emailTemplate.serviceId,
        emailTemplate.templateId,
        emailParams
      );

      if (response.status === 200) {
        setStatus("success");
        alert(emailTemplate.messages.success);
        setFormData(emailTemplate.defaultFormValues);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("error");
      alert(emailTemplate.messages.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-800 mb-4">Get in Touch</h1>
          <p className="text-green-600 text-lg">
            We'd love to hear from you. Reach out anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-orange-200 focus:border-orange-500"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-orange-200 focus:border-orange-500"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500"
                      : "border-orange-200 focus:border-orange-500"
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Tell us more about your inquiry..."
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-orange-200 focus:border-orange-500"
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Information Column */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-8 border border-green-100">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                Address
              </h3>
              <p className="text-gray-700 leading-relaxed">
                MrSea Farm<br />
                East Street, Mooppakovil,<br />
                Pambapadaiyur (Post),<br />
                Kumbakonam, Tamil Nadu 612703<br />
                India
              </p>
            </div>

            {/* Phone */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-8 border border-green-100">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                Phone
              </h3>
              <p className="text-gray-700">
                <a href="tel:+919363249700" className="hover:text-green-600 transition-colors font-semibold">
                  +91 93632 49700
                </a>
                <br />
                <a href="tel:+919361108566" className="hover:text-green-600 transition-colors font-semibold">
                  +91 93611 08566
                </a>
              </p>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-8 border border-green-100">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                Email
              </h3>
              <p className="text-gray-700">
                <a href="mailto:mrseafarm@gmail.com" className="hover:text-green-600 transition-colors font-semibold">
                  mrseafarm@gmail.com
                </a>
              </p>
            </div>

            {/* Working Hours */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-8 border border-green-100">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                Working Hours
              </h3>
              <p className="text-gray-700">
                <span className="font-semibold">Mon - Sat:</span> 6:00 AM - 8:00 PM<br />
                <span className="font-semibold">Sunday:</span> 7:00 AM - 6:00 PM
              </p>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-green-700 to-green-800 text-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href="https://www.instagram.com/mr.sea_farm?igsh=M3ExZzB4cHdidDRx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-white/20 hover:bg-white/30 py-3 px-4 rounded-lg transition-colors font-semibold"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@Santhosh_633"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-white/20 hover:bg-white/30 py-3 px-4 rounded-lg transition-colors font-semibold"
                >
                  YouTube
                </a>
                <a
                  href="https://www.facebook.com/share/1Do22iDage/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-white/20 hover:bg-white/30 py-3 px-4 rounded-lg transition-colors font-semibold"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;