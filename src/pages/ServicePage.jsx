import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheck, FiChevronDown, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import SEO from '../utils/seo';
import { SEO_SERVICES } from '../utils/seoServiceData';

export default function ServicePage({ onOpenBooking }) {
  const { slug } = useParams();
  const { services, contactInfo } = useApp();
  const [openFaq, setOpenFaq] = useState(null);

  // Retrieve the SEO content for the category
  const data = SEO_SERVICES[slug];

  if (!data) {
    return <Navigate to="/services" replace />;
  }

  // Filter services dynamically from global state
  // Match by category or, in the case of keratin-treatment, search for relevant terms in name/description
  let categoryServices = [];
  if (slug === 'keratin-treatment') {
    categoryServices = services.filter(s => 
      s.name.toLowerCase().includes('keratin') || 
      s.description.toLowerCase().includes('keratin')
    );
    // Fallback if none found
    if (categoryServices.length === 0) {
      categoryServices = services.filter(s => s.category === 'Hair Spa');
    }
  } else {
    categoryServices = services.filter(s => s.category.toLowerCase() === data.categoryName.toLowerCase());
  }

  // Build specialized JSON-LD schema linking BeautySalon, Service, and FAQPage
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BeautySalon",
        "@id": "https://vksalon.vercel.app/#salon",
        "name": "V.K Salon",
        "url": "https://vksalon.vercel.app",
        "telephone": contactInfo.phone.replace(/\s+/g, ''),
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
        "@type": "Service",
        "name": data.categoryName,
        "provider": {
          "@type": "BeautySalon",
          "@id": "https://vksalon.vercel.app/#salon"
        },
        "areaServed": [
          {
            "@type": "AdministrativeArea",
            "name": "Ludhiana"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Punjab"
          }
        ],
        "description": data.description,
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": categoryServices.length > 0 ? Math.min(...categoryServices.map(s => s.price)) : 500,
          "highPrice": categoryServices.length > 0 ? Math.max(...categoryServices.map(s => s.price)) : 15000,
          "offerCount": categoryServices.length
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": data.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-charcoal-dark min-h-screen pt-28 pb-20 overflow-hidden">
      <SEO 
        title={data.title} 
        description={data.description} 
        schema={schemaData}
      />

      {/* 1. Breadcrumbs for hierarchical internal links */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-xs tracking-wider uppercase text-gray-500 flex gap-2">
        <Link to="/" className="hover:text-gold transition-colors">Home</Link>
        <span>/</span>
        <Link to="/services" className="hover:text-gold transition-colors">Services</Link>
        <span>/</span>
        <span className="text-gold">{data.categoryName}</span>
      </div>

      {/* 2. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold block">
            Exclusive {data.categoryName} Rituals
          </span>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white leading-tight">
            {data.h1}
          </h1>
          <p className="text-gold font-playfair italic text-lg md:text-xl font-light">
            {data.subtitle}
          </p>
          <div className="w-16 h-[1.5px] bg-gold"></div>
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            {data.intro}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => onOpenBooking(categoryServices[0]?.name || '')}
              className="gold-btn-gradient px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest shadow-gold-sm flex items-center gap-2"
            >
              <FiCalendar size={14} /> Reserve Seat
            </button>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}?text=Hi,%20I'd%20like%20to%20book%20a%20slot%20for%20${encodeURIComponent(data.categoryName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/10 hover:border-gold/30 bg-black/40 hover:text-gold text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all"
            >
              <FaWhatsapp size={16} /> WhatsApp Concierge
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-gold-sm">
          <img 
            src={categoryServices[0]?.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop"} 
            alt={`${data.categoryName} luxury care lounge`}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-center lg:text-left">
            <span className="text-gold uppercase text-[10px] tracking-widest font-semibold block">VK Premium Quality</span>
            <span className="text-white text-lg font-playfair mt-1 block">Tibba Road, Ludhiana, Punjab</span>
          </div>
        </div>
      </section>

      {/* 3. Core Features / Why Choose Us */}
      <section className="bg-charcoal/30 py-16 border-y border-white/5 mb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.features.map((feature, idx) => (
            <div key={idx} className="flex gap-4 p-4 border border-white/5 rounded-xl bg-black/10">
              <div className="text-gold shrink-0 mt-1">
                <FiCheck size={18} className="border border-gold/30 rounded-full p-0.5 bg-gold/10" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">{feature.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Menu & Pricing Options */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold">Treatments Menu</span>
          <h2 className="text-3xl md:text-4xl font-playfair text-white mt-1">Available Offerings & Pricing</h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryServices.map((svc) => (
            <GlassCard key={svc.id} className="flex flex-col justify-between h-full border border-white/5">
              <div>
                <div className="h-48 rounded-xl overflow-hidden mb-6 relative group border border-white/5">
                  <img 
                    src={svc.image} 
                    alt={svc.name} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-black/85 text-gold text-xs px-3.5 py-1.5 rounded-full font-bold border border-gold/25">
                    ₹{svc.price}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-gold uppercase text-[10px] tracking-widest font-semibold">{svc.category}</span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                    <FiClock size={12} className="text-gold" /> {svc.duration}
                  </span>
                </div>

                <h3 className="text-lg font-playfair text-white mb-2 font-semibold hover:text-gold transition-colors duration-300">
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
          ))}
        </div>
      </section>

      {/* 5. Rich Local SEO Context & Target Keywords */}
      <section className="bg-charcoal/50 py-20 border-y border-white/5 mb-20 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-gold uppercase text-[10px] tracking-widest font-semibold">Local Styling Specialists</span>
          <h2 className="text-3xl font-playfair text-white">Experience Elite Salon Service in Prem Vihar, Ludhiana</h2>
          <p className="text-gray-400 text-xs leading-relaxed max-w-2xl mx-auto">
            Conveniently located at Street Number 10, Tibba Road, Prem Vihar in Ludhiana (PIN: 141007), V.K Salon is easily accessible from all major areas of Ludhiana, Punjab. We take pride in delivering premium styling, global products, and personalized care. Schedule your ritual today and see why we are highly recommended for hair, skin, and bridal makeup services.
          </p>
          <div className="flex justify-center flex-wrap gap-2 pt-4">
            {data.keywords.map((kw, idx) => (
              <span key={idx} className="bg-white/5 border border-white/10 text-gray-500 text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion section */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold">FAQ Helpdesk</span>
          <h2 className="text-3xl font-playfair text-white mt-1">Frequently Asked Questions</h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-3"></div>
        </div>

        <div className="space-y-4">
          {data.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="border border-white/5 bg-black/10 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
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

      {/* 7. Bottom CTA Banner */}
      <section className="max-w-4xl mx-auto px-6">
        <GlassCard hoverGlow={false} className="border border-gold/25 p-12 text-center bg-gold-glow">
          <span className="text-gold tracking-[0.2em] text-[10px] uppercase font-semibold">Treat Yourself</span>
          <h2 className="text-3xl font-playfair text-white mt-1 mb-4">Book Your Signature Session</h2>
          <p className="text-gray-400 text-xs max-w-lg mx-auto leading-relaxed mb-8">
            Experience absolute luxury, custom styles, and a refreshing escape. Connect with us to reserve your chair.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onOpenBooking(categoryServices[0]?.name || '')}
              className="gold-btn-gradient px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <FiCalendar size={14} /> Book Appointment
            </button>
            <Link
              to="/services"
              className="border border-white/10 hover:border-gold/30 hover:text-gold px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-2"
            >
              All Services Menu <FiArrowRight size={14} />
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
