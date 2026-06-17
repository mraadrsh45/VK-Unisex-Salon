import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiChevronRight, FiCheckCircle, FiCopy, FiMapPin, FiClock, FiChevronDown } from 'react-icons/fi';
import { FaWhatsapp, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import SEO from '../utils/seo';

export default function Home({ onOpenBooking }) {
  const { services, offers, reviews, contactInfo } = useApp();
  const [activeBeforeAfter, setActiveBeforeAfter] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  // Filter out featured services and reviews
  const featuredServices = services.filter(s => s.featured).slice(0, 3);
  const featuredReviews = reviews.filter(r => r.featured && r.approved).slice(0, 3);
  const activeOffers = offers.slice(0, 2);

  const beforeAfterData = [
    {
      title: "Signature Hair Balayage Makeover",
      before: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1605497746444-ac9dbd50d997?q=80&w=600&auto=format&fit=crop",
      desc: "Dry, faded roots transformed into a premium hand-painted champagne blonde glaze."
    },
    {
      title: "Royal Keratin Fusion Reconstruct",
      before: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop",
      desc: "Frizzy, color-damaged strands restored into glass-like silk straight locks."
    }
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon Code "${code}" copied to clipboard!`);
  };

  return (
    <div className="overflow-hidden bg-charcoal-dark">
      <SEO 
        title="Best Unisex Salon & Hair Salon Near Me in Ludhiana" 
        description="Experience luxury grooming at VK Unisex Salon, the best unisex salon in Ludhiana. Offering professional men's and women's haircuts, hair spas, facials, and bridal makeup on Tibba Road." 
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BeautySalon",
              "@id": "https://vksalon.vercel.app/#salon",
              "name": "VK Unisex Salon",
              "url": "https://vksalon.vercel.app",
              "telephone": "+919872265250",
              "priceRange": "$$",
              "image": "https://vksalon.vercel.app/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "St. No. 10, Tibba Rd, Prem Vihar",
                "addressLocality": "Ludhiana",
                "addressRegion": "PB",
                "postalCode": "141007",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 30.9256,
                "longitude": 75.8945
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the best unisex salon near me in Ludhiana?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "VK Unisex Salon is Ludhiana's premier luxury unisex salon located at Tibba Road, Prem Vihar. We offer celebrity-grade haircuts, organic hair spas, beard line-ups, advanced facials, and bridal makeup."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer keratin treatments and hair smoothing in Prem Vihar?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! VK Unisex Salon specializes in formaldehyde-free Keratin Treatments and deep-nourishing Moroccan Oil hair spa therapies to restore damaged, frizzy hair."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I book an appointment for bridal makeup?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can book directly on our website, call our reception at +91 98722 65250, or message us on WhatsApp for pre-bridal consultation packages."
                  }
                }
              ]
            }
          ]
        }}
      />

      {/* 1. Full Screen Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background Visual (Video with Fallback Image) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/65 z-10" /> {/* Dimming Overlay */}
          
          {/* Looping Ambient Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920&auto=format&fit=crop"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-barber-shaving-a-mans-beard-with-a-razor-42358-large.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Hero Copy Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gold tracking-[0.3em] text-xs md:text-sm uppercase font-semibold mb-4 bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20 backdrop-blur-xs"
          >
            Ludhiana's Best Unisex Salon • Redefining Luxury
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-8xl font-playfair font-bold text-white mb-6 tracking-wide leading-tight"
          >
            The Ultimate <br />
            <span className="gradient-text font-semibold italic">Grooming Ritual</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 md:text-lg tracking-wide max-w-2xl font-light mb-10 leading-relaxed"
          >
            Step into the best unisex hair salon near you in Ludhiana. Elevate your style with precision men's and women's haircuts, keratin hair spas, beard architecting, and rejuvenating skin remedies.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => onOpenBooking('')}
              className="gold-btn-gradient px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest shadow-gold-md"
            >
              Book Ritual
            </button>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/10 hover:border-gold/30 bg-black/40 backdrop-blur-md hover:text-gold text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300"
            >
              <FaWhatsapp size={16} /> WhatsApp Concierge
            </a>
            <a
              href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 border border-white/10 hover:border-gold/30 bg-black/40 backdrop-blur-md hover:text-gold text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300"
            >
              <FiPhone size={14} /> Call Reception
            </a>
          </motion.div>
        </div>

        {/* Floating Bottom Section Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* 2. Business Statistics Section */}
      <section className="relative z-20 bg-charcoal py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "Est. 2019", label: "Grooming Excellence" },
              { number: "12,000+", label: "Happy Clients Served" },
              { number: "4.9 ★", label: "Google Business Rating" },
              { number: "100%", label: "Satisfaction Guaranteed" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-playfair font-bold text-gold gold-text-glow">{stat.number}</span>
                <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Services Section */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold">Exquisite Offerings</span>
          <h2 className="text-4xl md:text-5xl font-playfair text-white mt-2">Signature Treatments</h2>
          <div className="w-16 h-[1.5px] bg-gold mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((svc) => (
            <GlassCard key={svc.id} className="flex flex-col h-full">
              <div className="h-64 rounded-xl overflow-hidden mb-6 relative group">
                <img 
                  src={svc.image} 
                  alt={`${svc.name} - Premium ${svc.category} at V.K Salon Ludhiana`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-black/80 text-gold text-xs px-3.5 py-1.5 rounded-full font-semibold border border-gold/20">
                  ₹{svc.price}
                </div>
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-gold uppercase text-[10px] tracking-widest font-semibold">{svc.category}</span>
                  <h3 className="text-xl font-playfair text-white mt-1 mb-2 font-medium">{svc.name}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">{svc.description}</p>
                </div>
                <button
                  onClick={() => onOpenBooking(svc.name)}
                  className="w-full border border-white/10 hover:border-gold text-white hover:text-black hover:bg-gold py-3 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  Book Treatment <FiChevronRight size={14} />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="bg-charcoal/40 py-28 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold">Luxury Standards</span>
            <h2 className="text-4xl md:text-5xl font-playfair text-white mt-2 mb-6">Why Sophisticated Guests Choose Us</h2>
            <div className="w-16 h-[1.5px] bg-gold mb-10"></div>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              VK Unisex Salon is more than a styling lounge—it is an escape from the ordinary. We believe grooming is a custom art form. Every razor stroke, blending cut, and facial mask is adjusted to match your individual preferences.
            </p>

            <div className="space-y-6">
              {[
                { title: "International Certified Specialists", desc: "Our stylists undergo regular masterclass training in Paris and Milan." },
                { title: "Ultra-Premium Global Brands", desc: "We utilize Kérastase, Olaplex, Moroccanoil, and MAC Cosmetics." },
                { title: "Premium Private Ambiance", desc: "Plush leather chairs, ambient acoustic soundscapes, and espresso bars." }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <FiCheckCircle className="text-gold shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[480px] rounded-2xl overflow-hidden border border-white/10 shadow-gold-sm">
            <img 
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop" 
              alt="Luxury unisex salon interior lounge and styling stations at VK Unisex Salon Ludhiana" 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-gold text-xs uppercase tracking-widest font-semibold block">Experience Luxury</span>
                <span className="text-white text-lg font-playfair mt-1 block">Walkthrough our 360° virtual tour</span>
              </div>
              <a href="/tour" className="gold-btn-gradient p-3.5 rounded-full shrink-0 text-black">
                <FiChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Before & After Showcase Gallery */}
      <section className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold">Visual Proof</span>
          <h2 className="text-4xl md:text-5xl font-playfair text-white mt-2">Stunning Transformations</h2>
          <div className="w-16 h-[1.5px] bg-gold mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Selector Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {beforeAfterData.map((item, index) => (
              <div 
                key={index}
                onClick={() => setActiveBeforeAfter(index)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border ${
                  activeBeforeAfter === index 
                    ? 'bg-gold/5 border-gold/40 shadow-gold-sm' 
                    : 'bg-black/20 border-white/5 hover:border-white/10'
                }`}
              >
                <h4 className={`font-playfair text-lg font-medium transition-colors ${activeBeforeAfter === index ? 'text-gold' : 'text-gray-300'}`}>
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Comparison Side-by-Side Images */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/5 group">
              <img 
                src={beforeAfterData[activeBeforeAfter].before} 
                alt={`Before makeover - ${beforeAfterData[activeBeforeAfter].title} treatment at V.K Salon`} 
                className="w-full h-[400px] object-cover group-hover:scale-102 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-black/85 border border-white/10 text-gray-400 text-xs px-3.5 py-1.5 rounded-full font-medium tracking-wider uppercase">
                Before
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-gold/20 group">
              <img 
                src={beforeAfterData[activeBeforeAfter].after} 
                alt={`After makeover transformation - ${beforeAfterData[activeBeforeAfter].title} at V.K Salon Ludhiana`} 
                className="w-full h-[400px] object-cover group-hover:scale-102 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-black/80 border border-gold/40 text-gold text-xs px-3.5 py-1.5 rounded-full font-semibold tracking-wider uppercase">
                After
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Latest Offers Section */}
      {activeOffers.length > 0 && (
        <section className="bg-charcoal/40 py-28 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold">Exclusive Privileges</span>
              <h2 className="text-4xl md:text-5xl font-playfair text-white mt-2">Seasonal Ritual Offers</h2>
              <div className="w-16 h-[1.5px] bg-gold mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeOffers.map((offer) => (
                <div 
                  key={offer.id} 
                  className="glass-panel-gold rounded-2xl p-8 border border-gold/25 relative overflow-hidden flex flex-col justify-between group"
                >
                  <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-6 py-2 uppercase tracking-widest transform rotate-45 translate-x-7 translate-y-3">
                    {offer.discount}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-playfair text-white mb-3 font-semibold group-hover:text-gold transition-colors duration-300">
                      {offer.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-8">{offer.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Promo Code:</span>
                      <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded border border-gold/30">
                        <span className="font-mono text-gold font-bold text-xs uppercase">{offer.code}</span>
                        <button 
                          onClick={() => handleCopyCode(offer.code)}
                          className="text-gray-400 hover:text-white transition-colors p-0.5"
                          title="Copy Promo Code"
                        >
                          <FiCopy size={13} />
                        </button>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 font-semibold italic">Expires: {offer.expiryDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Reviews and Google Business Rating Section */}
      <section className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold">Guest Stories</span>
          <h2 className="text-4xl md:text-5xl font-playfair text-white mt-2">Google & Guest Reviews</h2>
          <div className="w-16 h-[1.5px] bg-gold mx-auto mt-4"></div>
        </div>

        {/* Google business summary widget */}
        <div className="glass-panel max-w-2xl mx-auto p-8 rounded-2xl border border-white/10 text-center mb-12 flex flex-col sm:flex-row items-center justify-around gap-6">
          <div>
            <span className="text-5xl font-bold font-playfair text-gold gold-text-glow">{contactInfo.rating}</span>
            <div className="flex items-center justify-center gap-1 text-gold my-2">
              {[...Array(5)].map((_, i) => <FaStar key={i} size={16} />)}
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">Google Profile Rating</p>
          </div>
          <div className="h-[1px] sm:h-16 w-16 sm:w-[1px] bg-white/10" />
          <div className="text-center">
            <span className="text-2xl font-semibold text-white font-playfair">{contactInfo.reviewsCount}+</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mt-2">Verified Reviews</p>
            <a 
              href={contactInfo.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs font-semibold text-gold border-b border-gold/30 hover:border-gold hover:text-gold-glow transition-all py-0.5"
            >
              Write a Review
            </a>
          </div>
        </div>

        {/* Carousel grid of reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredReviews.map((review) => (
            <GlassCard key={review.id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-gold mb-4">
                  {[...Array(review.rating)].map((_, i) => <FaStar key={i} size={12} />)}
                </div>
                <p className="text-gray-400 text-xs leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
                <div>
                  <span className="text-white block font-medium font-playfair">{review.name}</span>
                  <span className="text-gray-600 block text-[10px]">{review.date}</span>
                </div>
                <span className="bg-white/5 border border-white/10 text-gray-400 px-3 py-1 rounded text-[10px] font-semibold uppercase tracking-wider">
                  {review.source}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-28 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold">FAQ Helpdesk</span>
          <h2 className="text-4xl md:text-5xl font-playfair text-white mt-2">Frequently Asked Questions</h2>
          <div className="w-16 h-[1.5px] bg-gold mx-auto mt-4"></div>
        </div>

        <div className="space-y-4">
          {[
            {
              question: "What makes VK Unisex Salon the best unisex salon in Ludhiana?",
              answer: "VK Unisex Salon is Ludhiana's premier styling sanctuary located in Prem Vihar. We offer Vidal Sassoon trained stylists, ultra-premium global brands (Kérastase, Olaplex, Moroccanoil, MAC), and custom-tailored haircuts, hair spas, and beauty treatments in a luxurious private lounge."
            },
            {
              question: "Do I need to book my appointment in advance?",
              answer: "We highly recommend booking in advance, especially for weekends, to ensure you get your preferred stylist and time. You can easily book online or via our WhatsApp Concierge. Walk-ins are accepted based on availability."
            },
            {
              question: "Which hair and skin brands do you use?",
              answer: "We use only ultra-premium international brands including L'Oréal Professionnel, Kérastase, Olaplex, Moroccanoil, MAC, and organic gold-infused skin serums."
            },
            {
              question: "Do you offer Keratin treatments and hair smoothing?",
              answer: "Yes! VK Unisex Salon specializes in formaldehyde-free Keratin Treatments and deep-nourishing Moroccan Oil hair spa therapies to restore damaged, frizzy hair."
            },
            {
              question: "Where is VK Unisex Salon located and is parking available?",
              answer: "We are located at Street Number 10, Tibba Road, Prem Vihar, Ludhiana, Punjab - 141007. Yes, dedicated private parking is available for all salon guests."
            }
          ].map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="border border-white/5 bg-black/10 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-gold transition-colors"
                >
                  <span>{faq.question}</span>
                  <FiChevronDown 
                    size={18} 
                    className={`text-gold shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 pt-0 border-t border-white/5 text-xs text-gray-400 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Directions and Map Section */}
      <section className="relative h-[550px] border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <iframe 
            src={contactInfo.mapsEmbedUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(100%) contrast(90%)" }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location Embed"
          ></iframe>
        </div>

        {/* Overlay Direction Card */}
        <div className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 z-10 w-full max-w-sm px-4">
          <GlassCard hoverGlow={false} className="p-8 border border-gold/20 shadow-gold-lg">
            <span className="text-gold uppercase text-[10px] tracking-widest font-semibold block">VK Unisex Salon Lounge</span>
            <h3 className="text-2xl font-playfair text-white mt-1 mb-4">Find Our Sanctuary</h3>
            
            <div className="space-y-4 text-xs text-gray-400 mb-8">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-gold shrink-0 mt-0.5" size={16} />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiClock className="text-gold shrink-0" size={16} />
                <span>Mon-Sun: 09:00 AM - 09:00 PM</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href={contactInfo.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center gold-btn-gradient py-3.5 rounded-lg text-[10px] font-semibold uppercase tracking-widest shadow-gold-sm"
              >
                Get Directions
              </a>
              <button
                onClick={() => onOpenBooking('')}
                className="flex-1 text-center border border-white/10 hover:border-gold/30 hover:text-gold text-white py-3.5 rounded-lg text-[10px] font-semibold uppercase tracking-widest transition-all"
              >
                Reserve Seat
              </button>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
