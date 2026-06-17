import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone, FiLock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export default function Navbar({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { contactInfo } = useApp();

  // Scroll handler to add darker background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location, isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Salon Tour', path: '/tour' },
    { name: 'About Us', path: '/about' },
    { name: 'Staff Portal', path: '/vk-admin-panel' },
  ];

  const serviceSubLinks = [
    { name: 'Hair Cut', path: '/services/hair-cut' },
    { name: 'Hair Spa', path: '/services/hair-spa' },
    { name: 'Beard Styling', path: '/services/beard-styling' },
    { name: 'Facial Services', path: '/services/facials' },
    { name: 'Keratin Treatment', path: '/services/keratin-treatment' },
    { name: 'Bridal Makeup', path: '/services/bridal-makeup' },
    { name: 'Beauty Services', path: '/services/beauty-services' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/85 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl font-playfair font-bold tracking-widest text-gold group-hover:text-gold-glow transition-all duration-300">
              VK<span className="text-white font-light text-lg md:text-xl ml-1">UNISEX SALON</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              if (link.name === 'Services') {
                return (
                  <div key={link.name} className="relative group py-2">
                    <Link
                      to={link.path}
                      className={`font-montserrat text-sm tracking-wider uppercase transition-colors duration-300 flex items-center gap-1 ${
                        location.pathname.startsWith('/services') ? 'text-gold font-medium' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      Services <span className="text-[10px] transform group-hover:rotate-180 transition-transform duration-200">▼</span>
                    </Link>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-1 w-56 bg-black/95 border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="py-2">
                        {serviceSubLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            to={subLink.path}
                            className="block px-4 py-2 text-xs font-montserrat tracking-wider uppercase text-gray-300 hover:text-gold hover:bg-white/5 transition-colors"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-montserrat text-sm tracking-wider uppercase transition-colors duration-300 ${
                    isActive ? 'text-gold font-medium' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
              className="p-2.5 rounded-full border border-white/10 hover:border-gold/50 text-gray-300 hover:text-gold transition-all duration-300"
              title="Call Us Now"
            >
              <FiPhone size={18} />
            </a>
            <a 
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/10 hover:border-gold/50 text-gray-300 hover:text-gold transition-all duration-300"
              title="WhatsApp Us"
            >
              <FaWhatsapp size={18} />
            </a>
            <Link 
              to="/vk-admin-panel"
              className="p-2.5 rounded-full border border-white/10 hover:border-gold/50 text-gray-300 hover:text-gold transition-all duration-300"
              title="Staff Portal Login"
            >
              <FiLock size={18} />
            </Link>
            
            <button
              onClick={onOpenBooking}
              className="gold-btn-gradient px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:scale-105 active:scale-95 duration-200 shadow-gold-sm"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-3">
            <a 
              href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
              className="p-2 rounded-full border border-white/10 text-gold"
            >
              <FiPhone size={16} />
            </a>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gold focus:outline-none p-1 border border-gold/20 rounded"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg lg:hidden flex flex-col pt-24 px-8 pb-10 justify-between overflow-y-auto"
          >
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                if (link.name === 'Services') {
                  return (
                    <div key={link.name} className="flex flex-col gap-2">
                      <Link
                        to={link.path}
                        className={`text-2xl font-playfair tracking-widest transition-colors ${isActive ? 'text-gold' : 'text-gray-400'}`}
                      >
                        {link.name}
                      </Link>
                      <div className="flex flex-col gap-2 pl-4 border-l border-gold/25 mt-1">
                        {serviceSubLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            to={subLink.path}
                            className={`text-sm font-montserrat tracking-wider uppercase ${
                              location.pathname === subLink.path ? 'text-gold' : 'text-gray-500 hover:text-white'
                            }`}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-2xl font-playfair tracking-widest transition-colors ${isActive ? 'text-gold' : 'text-gray-400'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4 justify-center">
                <a 
                  href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-gray-300 hover:text-gold w-1/2 justify-center"
                >
                  <FiPhone size={16} />
                  <span className="text-xs uppercase tracking-widest font-medium">Call</span>
                </a>
                <a 
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-gray-300 hover:text-gold w-1/2 justify-center"
                >
                  <FaWhatsapp size={16} />
                  <span className="text-xs uppercase tracking-widest font-medium">WhatsApp</span>
                </a>
              </div>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="gold-btn-gradient w-full py-4 rounded-full text-sm font-semibold uppercase tracking-widest shadow-gold-md"
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
