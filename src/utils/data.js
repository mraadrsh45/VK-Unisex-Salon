// Luxury Salon Data for V.K SALON

export const DEFAULT_CONTACT_INFO = {
  phone: "+91 98722 65250",
  whatsapp: "919872265250",
  email: "info@vksalon.com",
  address: "St. No. 10, Tibba Rd, Prem Vihar, Ludhiana, Punjab - 141007",
  mapsEmbedUrl: "https://maps.google.com/maps?q=st.%20No.%2010,%20Tibba%20Rd,%20Prem%20Vihar,%20Ludhiana,%20Punjab%20141007&t=&z=15&ie=UTF8&iwloc=&output=embed",
  streetViewEmbedUrl: "https://www.google.com/maps/embed?pb=!4v1689104052342!6m8!1m2!1sAF1QipN3X6z2yC_zL_qY2P_E7L9qZ!2d19.047022!3d72.827726!2f90!3f0!3m2!1i1024!2i768!4f35",
  rating: "4.9",
  reviewsCount: "1,248",
  businessHours: {
    weekdays: "09:00 AM - 09:00 PM",
    saturday: "09:00 AM - 10:00 PM",
    sunday: "10:00 AM - 08:00 PM",
  },
  googleBusinessUrl: "https://share.google/xY9zmaFH6chUUsSOO",
  mapsLink: "https://maps.app.goo.gl/YES3akEfjKqaqig29"
};

export const SERVICES = [
  // Hair Cut
  {
    id: "hc-01",
    category: "Hair Cut",
    name: "Royal Haircut & Sculpting",
    price: 1200,
    duration: "45 mins",
    image: "/images/1.webp",
    description: "Personalized premium haircut, complete hair wash with luxury conditioning, and a signature styling blow-dry.",
    featured: true
  },
  {
    id: "hc-02",
    category: "Hair Cut",
    name: "Classic Italian Cut",
    price: 800,
    duration: "30 mins",
    image: "/images/2.webp",
    description: "Sharp, timeless haircut tailored to your face structure by our master stylists.",
    featured: false
  },
  // Beard Styling
  {
    id: "bs-01",
    category: "Beard Styling",
    name: "Imperial Hot Towel Shave & Styling",
    price: 700,
    duration: "40 mins",
    image: "/images/4.webp",
    description: "Classic straight-razor shave, hot steam towels, cooling essential oil massage, and precision beard grooming.",
    featured: true
  },
  {
    id: "bs-02",
    category: "Beard Styling",
    name: "Beard Detailing & Line-up",
    price: 450,
    duration: "20 mins",
    image: "/images/6.webp",
    description: "Precision razor outlines and beard trimming with premium nourishing beard oils.",
    featured: false
  },
  // Hair Spa
  {
    id: "hs-01",
    category: "Hair Spa",
    name: "Keratin Fusion Reconstructive Spa",
    price: 3500,
    duration: "75 mins",
    image: "/images/5.webp",
    description: "Intense protein replenishment therapy that eliminates frizz, adds glass-like shine, and repairs structural hair damage.",
    featured: true
  },
  {
    id: "hs-02",
    category: "Hair Spa",
    name: "Moroccan Oil Hydrating Therapy",
    price: 2500,
    duration: "60 mins",
    image: "/images/1.webp",
    description: "Deep moisture treatment using authentic Argan oil to soften coarse hair and nourish the scalp.",
    featured: false
  },
  // Hair Coloring
  {
    id: "co-01",
    category: "Hair Coloring",
    name: "Signature Balayage & Tonal Glaze",
    price: 5500,
    duration: "120 mins",
    image: "/images/2.webp",
    description: "Hand-painted, natural-looking highlights customized to your hair flow, finished with a high-shine glossing glaze.",
    featured: true
  },
  {
    id: "co-02",
    category: "Hair Coloring",
    name: "Root Touch-up & Color Lock",
    price: 1800,
    duration: "60 mins",
    image: "/images/4.webp",
    description: "Flawless grey coverage using premium ammonia-free organic colors that respect your hair health.",
    featured: false
  },
  // Facial
  {
    id: "fa-01",
    category: "Facial",
    name: "24K Gold Luxury Illuminating Facial",
    price: 4500,
    duration: "90 mins",
    image: "/images/5.webp",
    description: "Anti-aging facial infused with real 24-karat gold dust, deep pore cleansing, vacuum exfoliation, and high-frequency lifting.",
    featured: true
  },
  {
    id: "fa-02",
    category: "Facial",
    name: "Charcoal Detoxifying Deep Cleanse",
    price: 2200,
    duration: "50 mins",
    image: "/images/6.webp",
    description: "Ultrasonic blackhead extraction followed by an organic activated charcoal mask to pull out toxins and skin impurities.",
    featured: false
  },
  // Groom Packages
  {
    id: "gp-01",
    category: "Groom Packages",
    name: "The Monarch Groom Experience",
    price: 8500,
    duration: "180 mins",
    image: "/images/1.webp",
    description: "Ultimate groom package including Royal Cut & Style, Imperial Beard Shave, Luxury Hair Spa, Gold Facial, and Hand/Foot Detailings.",
    featured: true
  },
  // Bridal Makeup
  {
    id: "bm-01",
    category: "Bridal Makeup",
    name: "Royal HD Bridal Artistry & Styling",
    price: 15000,
    duration: "240 mins",
    image: "/images/5.webp",
    description: "Flawless high-definition makeup application, luxury hairstyling, saree draping, and jewelry setting by our senior artist.",
    featured: true
  }
];

export const OFFERS = [
  {
    id: "of-01",
    title: "Golden Hour Luxury Ritual",
    description: "Enjoy a flat 20% discount on all premium Facials and Hair Spas. Valid between 11:00 AM and 04:00 PM (Monday to Thursday).",
    code: "GOLDENHOUR",
    discount: "20% OFF",
    expiryDate: "2026-12-31",
    featured: true,
    image: "/images/4.webp" // Added custom image
  },
  {
    id: "of-02",
    title: "The Ultimate Groom Package Deal",
    description: "Book the Monarch Groom package and get a free Premium Hair Coloring or a Moroccan Oil Spa treatment absolute free.",
    code: "ROYALGROOM",
    discount: "FREE SERVICE",
    expiryDate: "2026-09-30",
    featured: true,
    image: "/images/1.webp" // Added custom image
  },
  {
    id: "of-03",
    title: "Bridal Party Indulgence",
    description: "Book bridal makeup for the bride and get 15% off on styling services for up to 4 family members.",
    code: "BRIDEPARTY",
    discount: "15% OFF",
    expiryDate: "2026-11-15",
    featured: false,
    image: "/images/6.webp" // Added custom image
  }
];

export const REVIEWS = [
  {
    id: "rv-01",
    name: "Ranveer Singh",
    rating: 5,
    comment: "The Imperial Hot Towel Shave is pure bliss! The attention to detail, premium products, and luxurious ambiance are unmatched. V.K Salon is officially my go-to grooming place.",
    date: "2026-05-10",
    source: "Google Reviews",
    featured: true,
    approved: true
  },
  {
    id: "rv-02",
    name: "Ananya Panday",
    rating: 5,
    comment: "Had my Balayage done here by the master stylist. The color is absolutely gorgeous, and my hair feels healthier than ever after their Keratin Spa. Beautiful interior too!",
    date: "2026-06-02",
    source: "Google Reviews",
    featured: true,
    approved: true
  },
  {
    id: "rv-03",
    name: "Aditya Roy Kapur",
    rating: 5,
    comment: "Highly professional staff. The 24K Gold Facial left my skin feeling extremely refreshed before a shoot. Love the black and gold aesthetic, very premium vibe.",
    date: "2026-06-12",
    source: "Google Reviews",
    featured: true,
    approved: true
  },
  {
    id: "rv-04",
    name: "Vikram Malhotra",
    rating: 4,
    comment: "Excellent haircut and beard lining. Booking was smooth via WhatsApp. Will visit again.",
    date: "2026-06-14",
    source: "Website Feedback",
    featured: false,
    approved: true
  }
];

export const TEAM = [
  {
    id: "tm-01",
    name: "Vikram K.",
    role: "Founder & Master Creative Stylist",
    bio: "With over 15 years of training in Paris and Milan, Vikram founded V.K Salon to bring premium international hair styling techniques to Mumbai. He has styled top models and celebrities across the globe.",
    image: "/images/vikram.jpg",
    certifications: ["Vidal Sassoon London Certified", "L'Oréal Professionnel Color Master"]
  },
  {
    id: "tm-02",
    name: "Sarah Fernandes",
    role: "Senior Bridal Makeup & Skin Expert",
    bio: "Sarah has 10+ years of expertise in HD makeup, airbrush makeup, and advanced skin aesthetics. She leads our bridal and skin glow therapy divisions.",
    image: "/images/sarah.jpg",
    certifications: ["MAC Pro Artistry Masterclass", "Cidesco Diploma in Skin Aesthetics"]
  },
  {
    id: "tm-03",
    name: "Rajesh Sharma",
    role: "Master Barber & Beard Architect",
    bio: "Rajesh is a straight-razor specialist who views beard styling as a form of sculpture. His hot towel shave ritual is highly acclaimed by our VIP clients.",
    image: "/images/rajesh.jpg",
    certifications: ["Schwarzkopf Barbering Master", "Classic Shaving Academy Certified"]
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g-01",
    type: "image",
    category: "Interior",
    title: "V.K Salon Styling Lounge",
    url: "/images/1.webp",
  },
  {
    id: "g-02",
    type: "image",
    category: "Grooming",
    title: "Master Grooming Station",
    url: "/images/2.webp",
  },
  {
    id: "g-03",
    type: "image",
    category: "Hair Styles",
    title: "Luxury Hair Design",
    url: "/images/4.webp",
  },
  {
    id: "g-04",
    type: "image",
    category: "Spa & Facial",
    title: "Anti-Aging Glow Treatment",
    url: "/images/5.webp",
  },
  {
    id: "g-05",
    type: "image",
    category: "Hair Styles",
    title: "Signature Balayage & Highlight",
    url: "/images/6.webp",
  },
  {
    id: "g-06",
    type: "image",
    category: "Interior",
    title: "Executive Waiting Room",
    url: "/images/interior.jpg",
  },
  // Videos
  {
    id: "gv-01",
    type: "video",
    category: "Salon Action",
    title: "Art of Barbering - Premium Shave",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "/images/2.webp"
  },
  {
    id: "gv-02",
    type: "video",
    category: "Salon Action",
    title: "Signature Hair Spa Ritual",
    url: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "/images/4.webp"
  }
];

export const BEFORE_AFTER = [
  {
    id: "ba-01",
    title: "Frizzy to Silk - Keratin Therapy",
    before: "/images/moroccanoil.jpg",
    after: "/images/4.webp",
  },
  {
    id: "ba-02",
    title: "Total Beard Makeover",
    before: "/images/beard_lineup.jpg",
    after: "/images/2.webp",
  }
];

export const STATISTICS = [
  { id: "stat-01", number: "15+", label: "Years of Master Styling" },
  { id: "stat-02", number: "12,000+", label: "Groomed Gentlemen & Brides" },
  { id: "stat-03", number: "4.9★", label: "Google Rated Business" },
  { id: "stat-04", number: "100%", label: "Certified Organic Products" }
];

export const AWARDS = [
  { year: "2024", title: "Best Luxury Salon Mumbai", organization: "National Glamour Awards" },
  { year: "2025", title: "Excellence in Bridal Artistry", organization: "Vogue India Beautypedia" },
  { year: "2026", title: "Top 5 Creative Styling Lounge", organization: "Salon International Expo" }
];

export const FAQS = [
  {
    question: "Do I need to book an appointment in advance?",
    answer: "We highly recommend booking in advance, especially for weekends, to ensure you get your preferred stylist and time. However, we do accept walk-ins depending on availability."
  },
  {
    question: "Which hair and skin brands do you use?",
    answer: "We use only ultra-premium international brands including L'Oréal Professionnel, Kérastase, Olaplex, Moroccanoil, MAC, and organic gold-infused skin serums."
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can cancel or reschedule up to 2 hours before your appointment. Simply message us on WhatsApp or call our reception."
  }
];
