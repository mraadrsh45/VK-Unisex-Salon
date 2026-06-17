import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { contactInfo } = useApp();

  return (
    <footer className="bg-charcoal-dark border-t border-white/5 pt-20 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-3xl font-playfair font-bold text-gold tracking-widest">
            V.K<span className="text-white font-light text-2xl ml-1">SALON</span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-500 mt-2">
            Sculpting Confidence, Redefining Luxury. Experience premium grooming and beauty services delivered by international certified stylists.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/5 hover:border-gold/30 hover:text-gold transition-all duration-300">
              <FaFacebookF size={14} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/5 hover:border-gold/30 hover:text-gold transition-all duration-300">
              <FaInstagram size={14} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/5 hover:border-gold/30 hover:text-gold transition-all duration-300">
              <FaTwitter size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-[1px] after:bg-gold">
            Navigation
          </h3>
          <ul className="flex flex-col gap-3.5 text-sm">
            <li><Link to="/" className="hover:text-gold transition-colors duration-200">Home</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors duration-200">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-gold transition-colors duration-200">Media Gallery</Link></li>
            <li><Link to="/tour" className="hover:text-gold transition-colors duration-200">360° Virtual Tour</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors duration-200">About the Salon</Link></li>
          </ul>
        </div>

        {/* Business Hours */}
        <div>
          <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-[1px] after:bg-gold">
            Working Hours
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-500">
            <li className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400 font-medium">Mon - Fri:</span>
              <span className="text-gold">{contactInfo.businessHours.weekdays}</span>
            </li>
            <li className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400 font-medium">Saturday:</span>
              <span className="text-gold">{contactInfo.businessHours.saturday}</span>
            </li>
            <li className="flex justify-between py-1">
              <span className="text-gray-400 font-medium">Sunday:</span>
              <span className="text-gold">{contactInfo.businessHours.sunday}</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-[1px] after:bg-gold">
            Connect
          </h3>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <FiMapPin className="text-gold mt-1 shrink-0" size={16} />
              <span>{contactInfo.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone className="text-gold shrink-0" size={16} />
              <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="hover:text-gold transition-colors duration-200">
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FiMail className="text-gold shrink-0" size={16} />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-gold transition-colors duration-200">
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>© {new Date().getFullYear()} V.K Salon. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/tour" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link to="/services" className="hover:text-gold transition-colors">Terms of Service</Link>
          <span>•</span>
          {/* Hidden Admin Login Link styled subtly */}
          <Link 
            to="/vk-admin-panel" 
            className="text-gray-800 hover:text-gold transition-colors duration-300 font-medium cursor-pointer"
            title="Management Portal"
          >
            Staff Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
