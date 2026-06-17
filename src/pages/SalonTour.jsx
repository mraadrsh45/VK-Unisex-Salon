import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCompass, FiMapPin, FiChevronsUp } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import SEO from '../utils/seo';

export default function SalonTour() {
  const { contactInfo } = useApp();
  const [viewMode, setViewMode] = useState('photo'); // 'photo' or 'map'
  
  // Viewpoints mapping direct user uploaded images and map coordinates
  const tourViews = [
    {
      id: "front",
      name: "Front Shop Entrance",
      desc: "Welcome to V.K Salon. Step through our custom gold entryway into a premium grooming sanctuary.",
      imageUrl: "/images/1.webp",
      embedUrl: "https://maps.google.com/maps?q=st.%20No.%2010,%20Tibba%20Rd,%20Prem%20Vihar,%20Ludhiana,%20Punjab%20141007&t=&z=15&ie=UTF8&iwloc=&output=embed"
    },
    {
      id: "lounge",
      name: "Main Styling Lounge",
      desc: "Equipped with our signature styling mirrors, custom lighting arrays, and master creative stations.",
      imageUrl: "/images/2.webp",
      embedUrl: "https://maps.google.com/maps?q=st.%20No.%2010,%20Tibba%20Rd,%20Prem%20Vihar,%20Ludhiana,%20Punjab%20141007&t=&z=17&ie=UTF8&iwloc=&output=embed"
    },
    {
      id: "vip",
      name: "VIP Premium Lounge",
      desc: "Reserved VIP styling chambers featuring full leather recliner washing beds and complimentary refreshments.",
      imageUrl: "/images/4.webp",
      embedUrl: "https://maps.google.com/maps?q=st.%20No.%2010,%20Tibba%20Rd,%20Prem%20Vihar,%20Ludhiana,%20Punjab%20141007&t=&z=18&ie=UTF8&iwloc=&output=embed"
    }
  ];

  const [activeView, setActiveView] = useState(tourViews[0]);

  return (
    <div className="bg-charcoal-dark min-h-screen pt-28 pb-20">
      <SEO 
        title="360° Virtual Salon Tour" 
        description="Experience the V.K Salon sanctuary online. Take an interactive 360-degree tour of our VIP lounge, main room, and entrance." 
      />

      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold block flex items-center justify-center gap-1.5">
            <FiCompass className="animate-spin-slow text-gold" /> Virtual Experience
          </span>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mt-3 mb-6">360° Virtual Tour</h1>
          <div className="w-16 h-[1.5px] bg-gold mx-auto mb-8"></div>
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            Take a virtual step inside our luxury salon premises. Toggle between different sections using our interactive panel.
          </p>
        </div>
      </section>

      {/* 2. Main Tour Frame & Navigation Panel */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Visual Viewport Canvas */}
        <div className="lg:col-span-8 relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden border border-gold/20 shadow-gold-sm bg-black">
          <AnimatePresence mode="wait">
            {viewMode === 'photo' ? (
              <motion.div
                key={`photo-${activeView.id}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative"
              >
                <img 
                  src={activeView.imageUrl} 
                  alt={activeView.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>
            ) : (
              <motion.iframe
                key={`map-${activeView.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={activeView.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Google Map Location - ${activeView.name}`}
              ></motion.iframe>
            )}
          </AnimatePresence>

          {/* Floating View Mode Selector Toggle */}
          <div className="absolute top-4 right-4 z-10 bg-black/80 rounded-lg p-1 border border-white/10 flex backdrop-blur-xs">
            <button
              onClick={() => setViewMode('photo')}
              className={`px-3.5 py-1.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                viewMode === 'photo' ? 'bg-gold text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Shop View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3.5 py-1.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                viewMode === 'map' ? 'bg-gold text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Live Map
            </button>
          </div>

          {/* Floating Status Indicator */}
          <div className="absolute top-4 left-4 bg-black/80 text-gold text-xs px-3.5 py-2 rounded-full font-semibold border border-gold/30 backdrop-blur-xs flex items-center gap-2">
            <FiCompass className="animate-spin-slow" />
            <span>{viewMode === 'photo' ? 'Interactive Salon Showcase' : 'Live Map Pin'}</span>
          </div>
        </div>

        {/* Navigation Control Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <span className="text-gold uppercase text-[10px] tracking-widest font-semibold block">Select Viewpoint</span>
            
            {tourViews.map((view) => {
              const isActive = activeView.id === view.id;
              return (
                <div
                  key={view.id}
                  onClick={() => setActiveView(view)}
                  className={`p-5 rounded-xl cursor-pointer transition-all duration-300 border ${
                    isActive 
                      ? 'bg-gold/5 border-gold/40 shadow-gold-sm' 
                      : 'bg-black/20 border-white/5 hover:border-white/10'
                  }`}
                >
                  <h4 className={`font-playfair text-lg font-medium transition-colors ${isActive ? 'text-gold' : 'text-gray-300'}`}>
                    {view.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{view.desc}</p>
                </div>
              );
            })}
          </div>

          <GlassCard hoverGlow={false} className="p-6 border border-white/5 bg-charcoal/20">
            <h4 className="text-white font-playfair font-medium text-base mb-2">Visit Us in Person</h4>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              Our sanctuary is located in the Prem Vihar district of Ludhiana. Parking validation is available.
            </p>
            <a
              href={contactInfo.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 gold-btn-gradient py-3 rounded-lg text-xs uppercase tracking-widest font-semibold shadow-gold-sm"
            >
              <FiMapPin size={14} /> Open in Google Maps
            </a>
          </GlassCard>
        </div>

      </section>

      {/* 3. Guide Note */}
      <section className="max-w-4xl mx-auto px-6 mt-20 text-center">
        <p className="text-gray-500 text-xs italic">
          Use the control tabs inside the window viewport above to toggle between visual images of our salon space and live Google Maps directions coordinates.
        </p>
      </section>

    </div>
  );
}
