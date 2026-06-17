import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheck } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import SEO from '../utils/seo';

export default function Services({ onOpenBooking }) {
  const { services, contactInfo } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories dynamically, prefixing with 'All'
  const categories = ['All', ...new Set(services.map(s => s.category))];

  // Filter service items based on active category
  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="bg-charcoal-dark min-h-screen pt-28 pb-20">
      <SEO 
        title="Services Pricing & Booking Menu" 
        description="Browse our premium grooming pricing menu. From precision haircuts to 24K gold facials and wedding makeup." 
      />

      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold block">Treatments Menu</span>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mt-3 mb-6">Styling & Grooming Services</h1>
          <div className="w-16 h-[1.5px] bg-gold mx-auto mb-8"></div>
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            Indulge in our collection of haircuts, advanced skin treatments, restorative spas, and special grooming packages.
          </p>
        </div>
      </section>

      {/* 2. Interactive Horizontal Category Filter Tab-Bar */}
      <section className="max-w-7xl mx-auto px-6 mb-16 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 md:justify-center border-b border-white/5 pb-4 min-w-max md:min-w-0">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive ? 'text-black font-bold' : 'text-gray-400 hover:text-white border border-white/5 bg-black/20'
                }`}
              >
                {/* Gold capsule background on active */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryCapsule"
                    className="absolute inset-0 bg-gold rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Grid Display of Categorized Services */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((svc) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={svc.id}
              >
                <GlassCard className="flex flex-col justify-between h-full border border-white/5">
                  <div>
                    {/* Image Card header */}
                    <div className="h-56 rounded-xl overflow-hidden mb-6 relative group border border-white/5">
                      <img 
                        src={svc.image} 
                        alt={svc.name} 
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                      />
                      <div className="absolute top-4 right-4 bg-black/85 text-gold text-xs px-3.5 py-1.5 rounded-full font-bold border border-gold/25">
                        ₹{svc.price}
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gold uppercase text-[10px] tracking-widest font-semibold">
                        {svc.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                        <FiClock size={12} className="text-gold" /> {svc.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-playfair text-white mb-3 font-semibold hover:text-gold transition-colors duration-300">
                      {svc.name}
                    </h3>
                    
                    <p className="text-gray-400 text-xs leading-relaxed mb-6 font-light">
                      {svc.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenBooking(svc.name)}
                    className="w-full border border-white/10 hover:border-gold text-white hover:text-black hover:bg-gold py-3 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                  >
                    Book Appointment
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. Consultation CTA Banner */}
      <section className="max-w-4xl mx-auto px-6 mt-28">
        <GlassCard hoverGlow={false} className="border border-gold/25 p-12 text-center bg-gold-glow">
          <span className="text-gold tracking-[0.2em] text-[10px] uppercase font-semibold">Special Request consultations</span>
          <h2 className="text-3xl font-playfair text-white mt-1 mb-4">Grooms & Bridal Artistry Packages</h2>
          <p className="text-gray-400 text-xs max-w-lg mx-auto leading-relaxed mb-8">
            Looking for bespoke styling, private parlor reservations, or styling for wedding parties? Connect directly with our lead specialist Vishal for custom quotes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onOpenBooking('Full Body Massage')}
              className="gold-btn-gradient px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              Book Consultation
            </button>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20custom%20wedding%20packages.`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 hover:border-gold/30 hover:text-gold px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
            >
              Chat on WhatsApp
            </a>
          </div>
        </GlassCard>
      </section>

    </div>
  );
}
