import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMaximize2, FiX, FiPlay, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import { BEFORE_AFTER } from '../utils/data';
import SEO from '../utils/seo';

export default function Gallery() {
  const { gallery } = useApp();
  const [activeTab, setActiveTab] = useState('images'); // 'images', 'videos', 'transformations'
  const [activeSubFilter, setActiveSubFilter] = useState('All');
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxMedia, setLightboxMedia] = useState([]);

  // Separate images and videos
  const imageItems = gallery.filter(item => item.type === 'image');
  const videoItems = gallery.filter(item => item.type === 'video');

  // Sub-categories for images
  const subCategories = ['All', ...new Set(imageItems.map(item => item.category))];

  // Filtered images
  const filteredImages = activeSubFilter === 'All' 
    ? imageItems 
    : imageItems.filter(item => item.category === activeSubFilter);

  // Set up lightbox playlist
  const handleOpenLightbox = (index, playlist) => {
    setLightboxMedia(playlist);
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    setLightboxMedia([]);
  };

  const handleNextLightbox = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % lightboxMedia.length);
    }
  };

  const handlePrevLightbox = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + lightboxMedia.length) % lightboxMedia.length);
    }
  };

  return (
    <div className="bg-charcoal-dark min-h-screen pt-28 pb-20">
      <SEO 
        title="Luxury Media Gallery" 
        description="Explore V.K Salon's visual workspace. View high-quality photos of haircuts, styling, bridal artistry, and virtual interiors." 
      />

      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold block">Visual Luxury</span>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mt-3 mb-6">Our Lookbook & Media</h1>
          <div className="w-16 h-[1.5px] bg-gold mx-auto mb-8"></div>
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            Browse through our portfolio of transformations, detailed hair styling, bridal HD makeups, and high-fashion salon shots.
          </p>
        </div>
      </section>

      {/* 2. Main Gallery Tabs */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex justify-center border-b border-white/5 pb-2">
          {[
            { id: 'images', label: 'Photo Lookbook' },
            { id: 'videos', label: 'Video Catalog' },
            { id: 'transformations', label: 'Before & Afters' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setActiveSubFilter('All');
                }}
                className={`relative px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-colors duration-300 ${
                  isActive ? 'text-gold' : 'text-gray-500 hover:text-white'
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeGalleryTabLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Sub-Category Selector (Visible only on Image tab) */}
      {activeTab === 'images' && (
        <section className="max-w-7xl mx-auto px-6 mb-12 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2.5 md:justify-center min-w-max md:min-w-0">
            {subCategories.map((subCat) => {
              const isActive = activeSubFilter === subCat;
              return (
                <button
                  key={subCat}
                  onClick={() => setActiveSubFilter(subCat)}
                  className={`px-5 py-2 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? 'bg-gold/15 text-gold border border-gold/30' : 'text-gray-400 hover:text-white border border-white/5 bg-black/10'
                  }`}
                >
                  {subCat}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Media Grid Display */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            
            {/* PHOTO GALLERY */}
            {activeTab === 'images' && filteredImages.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => handleOpenLightbox(idx, filteredImages)}
                className="relative group rounded-xl overflow-hidden h-72 cursor-pointer border border-white/5"
              >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                />
                
                {/* Hover overlay with detail icon */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-gold/15 border border-gold/30 text-gold">
                      <FiMaximize2 size={16} />
                    </span>
                  </div>
                  <div>
                    <span className="text-gold uppercase text-[9px] tracking-widest font-semibold block">
                      {item.category}
                    </span>
                    <h4 className="text-white text-base font-playfair mt-0.5">{item.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* VIDEO GALLERY */}
            {activeTab === 'videos' && videoItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => handleOpenLightbox(idx, videoItems)}
                className="relative group rounded-xl overflow-hidden h-72 cursor-pointer border border-white/5"
              >
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                />
                
                {/* Video Play Trigger overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                  <span className="p-4 rounded-full bg-gold text-black shadow-gold-sm hover:scale-105 transition-transform duration-300">
                    <FiPlay size={20} className="fill-black ml-0.5" />
                  </span>
                </div>
                
                {/* Title Card Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 z-10">
                  <span className="text-gold uppercase text-[9px] tracking-widest font-semibold block">
                    {item.category}
                  </span>
                  <h4 className="text-white text-base font-playfair mt-0.5">{item.title}</h4>
                </div>
              </motion.div>
            ))}

            {/* TRANSFORMATIONS (BEFORE / AFTER COMPARE) */}
            {activeTab === 'transformations' && BEFORE_AFTER.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
              >
                <GlassCard className="p-4 border border-white/5 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative rounded-lg overflow-hidden h-52">
                      <img src={item.before} alt="Transform before" className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-black/80 text-gray-400 text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">Before</div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden h-52">
                      <img src={item.after} alt="Transform after" className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-black/80 text-gold text-[9px] px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">After</div>
                    </div>
                  </div>
                  <h4 className="text-white text-center font-playfair font-medium text-sm pt-2">{item.title}</h4>
                </GlassCard>
              </motion.div>
            ))}

          </AnimatePresence>
        </motion.div>
      </section>

      {/* 5. LIGHTBOX PORTAL OVERLAY */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={handleCloseLightbox}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-55 p-1 bg-black/40 rounded-full"
            >
              <FiX size={26} />
            </button>

            {/* Left Prev Navigation */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-6 text-gray-400 hover:text-gold transition-colors z-55 p-2 bg-black/40 rounded-full"
            >
              <FiChevronLeft size={30} />
            </button>

            {/* Media Canvas Area */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing lightbox when clicking image
            >
              {lightboxMedia[lightboxIndex].type === 'video' ? (
                <video
                  src={lightboxMedia[lightboxIndex].url}
                  autoPlay
                  controls
                  loop
                  className="max-w-full max-h-[70vh] rounded-lg"
                />
              ) : (
                <img
                  src={lightboxMedia[lightboxIndex].url}
                  alt={lightboxMedia[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-gold-lg"
                />
              )}

              {/* Title label at bottom */}
              <div className="text-center mt-4 text-white">
                <span className="text-gold uppercase text-[10px] tracking-widest block">{lightboxMedia[lightboxIndex].category}</span>
                <h3 className="font-playfair text-xl mt-1">{lightboxMedia[lightboxIndex].title}</h3>
              </div>
            </motion.div>

            {/* Right Next Navigation */}
            <button
              onClick={handleNextLightbox}
              className="absolute right-6 text-gray-400 hover:text-gold transition-colors z-55 p-2 bg-black/40 rounded-full"
            >
              <FiChevronRight size={30} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
