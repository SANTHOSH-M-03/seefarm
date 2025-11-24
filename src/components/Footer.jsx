import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-900 to-green-800 text-white py-16 mt-20">
      {/* Map Section */}
      <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4759.226707355658!2d79.37512971135294!3d10.920783256467974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baacd000b5f61f9%3A0x6374e75dbd8c2a05!2sMrsea%20farm!5e1!3m2!1sen!2sin!4v1763367940370!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              Mr.Sea Farm
            </h3>
            <p className="text-green-100 leading-relaxed">
              Pure, organic products delivered straight from our farm to your home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-green-100 hover:text-yellow-300 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-green-100 hover:text-yellow-300 transition-colors">About</Link></li>
              <li><Link to="/products" className="text-green-100 hover:text-yellow-300 transition-colors">Products</Link></li>
              <li><Link to="/contact" className="text-green-100 hover:text-yellow-300 transition-colors">Contact</Link></li>
              <li><Link to="/admin/auth" className="text-yellow-300 hover:text-yellow-200 transition-colors font-semibold">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-300">Our Products</h4>
            <ul className="space-y-2">
              <li className="text-green-100 hover:text-yellow-300 transition-colors">Organic Milk</li>
              <li className="text-green-100 hover:text-yellow-300 transition-colors">Country Chicken</li>
              <li className="text-green-100 hover:text-yellow-300 transition-colors">Cow Dung</li>
              <li className="text-green-100 hover:text-yellow-300 transition-colors">Panjakaviyam</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-300">Get In Touch</h4>
            <ul className="space-y-2 text-green-100">
              <li>📧 mrseafarm@gmail.com</li>
              <li>📱 +91 93632 49700</li>
              <li>📱 +91 93611 08566</li>

              <li>📍 East Street, Mooppakovil, Pambapadiyur(Post), Kumbakonam, 612703 , Tamilnadu, India</li>
              <li className="mt-4">
                <div className="flex space-x-3">
                  <a href="#" className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 hover:bg-yellow-300 transition-colors">f</a>
                  <a href="#" className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 hover:bg-yellow-300 transition-colors">in</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-100 text-sm">
              &copy; {currentYear} Mr.Sea Farm. All rights reserved.
            </p>
            <p className="text-green-100 text-sm mt-4 md:mt-0">
              🌱 Delivering pure, organic products from farm to home 🌾
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;