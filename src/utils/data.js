// Luxury Salon Data for V.K SALON

export const DEFAULT_CONTACT_INFO = {
  phone: "+91 98722 65250",
  whatsapp: "919872265250",
  email: "info@vksalon.com",
  address: "#2139, St. No. 10, Prem Vihar, Tibba Road, Ludhiana, Punjab - 141007",
  mapsEmbedUrl: "https://maps.google.com/maps?q=%232139;%20St.%20No.%2010,%20Prem%20Vihar,%20Tibba%20Road,%20Ludhiana,%20Punjab%20141007&t=&z=15&ie=UTF8&iwloc=&output=embed",
  streetViewEmbedUrl: "https://www.google.com/maps/embed?pb=!4v1689104052342!6m8!1m2!1sAF1QipN3X6z2yC_zL_qY2P_E7L9qZ!2d19.047022!3d72.827726!2f90!3f0!3m2!1i1024!2i768!4f35",
  rating: "4.9",
  reviewsCount: "1,248",
  businessHours: {
    weekdays: "09:00 AM - 09:00 PM",
    saturday: "09:00 AM - 09:00 PM",
    sunday: "09:00 AM - 09:00 PM",
  },
  googleBusinessUrl: "https://share.google/xY9zmaFH6chUUsSOO",
  mapsLink: "https://maps.app.goo.gl/YES3akEfjKqaqig29"
};

export const SERVICES = [
  // Hair Cut / Hair Services
  {
    id: "hc-01",
    category: "Hair Cut",
    name: "Hair Cut & Sculpting",
    price: 70,
    duration: "25 mins",
    image: "/images/2.webp",
    description: "Sharp, clean haircut tailored to your preferences by our master stylists.",
    featured: true
  },
  {
    id: "hc-02",
    category: "Hair Cut",
    name: "Hair Dryer Styling",
    price: 50,
    duration: "10 mins",
    image: "/images/1.webp",
    description: "Professional blow-dry and quick styling to lock in your look.",
    featured: false
  },
  {
    id: "hc-03",
    category: "Hair Cut",
    name: "Premium Hair Wash",
    price: 50,
    duration: "15 mins",
    image: "/images/6.webp",
    description: "Refreshing hair wash with premium clarifying and nourishing shampoos.",
    featured: false
  },
  {
    id: "hc-04",
    category: "Hair Cut",
    name: "Therapeutic Head Massage",
    price: 100,
    duration: "20 mins",
    image: "/images/5.webp",
    description: "Relaxing head massage with essential oils to relieve stress and improve scalp health.",
    featured: true
  },
  // Beard Styling
  {
    id: "bs-01",
    category: "Beard Styling",
    name: "Beard Shaving",
    price: 50,
    duration: "15 mins",
    image: "/images/4.webp",
    description: "Classic smooth razor shave using fresh single-use blades and warm lather.",
    featured: true
  },
  {
    id: "bs-02",
    category: "Beard Styling",
    name: "Beard Cut & Detailing",
    price: 50,
    duration: "20 mins",
    image: "/images/6.webp",
    description: "Precision beard cut and shape detailing tailored to your face structure.",
    featured: false
  },
  {
    id: "bs-03",
    category: "Beard Styling",
    name: "Beard Perming (Puming)",
    price: 1000,
    duration: "30 mins",
    image: "/images/2.webp",
    description: "Specialized texturizing treatment to shape and tame curly or wild beards.",
    featured: false
  },
  // Hair Spa / Treatments
  {
    id: "hs-01",
    category: "Hair Spa",
    name: "Nourishing Hair Spa",
    price: 500,
    duration: "45 mins",
    image: "/images/1.webp",
    description: "Deep nourishing cream treatment and steam to revitalize damaged hair.",
    featured: true
  },
  {
    id: "hs-02",
    category: "Hair Spa",
    name: "Hair Perming (Puming)",
    price: 1200,
    duration: "60 mins",
    image: "/images/4.webp",
    description: "Volume-boosting chemical texturizing treatment for styling and waves.",
    featured: false
  },
  {
    id: "hs-03",
    category: "Hair Spa",
    name: "Hair Smoothing",
    price: 1200,
    duration: "90 mins",
    image: "/images/6.webp",
    description: "High-shine, long-lasting smoothing therapy to eliminate frizz.",
    featured: true
  },
  {
    id: "hs-04",
    category: "Hair Spa",
    name: "Hair Keratin Treatment",
    price: 1200,
    duration: "90 mins",
    image: "/images/5.webp",
    description: "Formaldehyde-free protein reconstruction to restore structural hair damage.",
    featured: true
  },
  {
    id: "hs-05",
    category: "Hair Spa",
    name: "Hair B-Tox Treatment",
    price: 2000,
    duration: "75 mins",
    image: "/images/1.webp",
    description: "Deep conditioning anti-aging treatment that reconstructs thin hair fibers.",
    featured: false
  },
  {
    id: "hs-06",
    category: "Hair Spa",
    name: "Nano Plastia Straightening",
    price: 2500,
    duration: "100 mins",
    image: "/images/2.webp",
    description: "Next-gen safe straightening and restructuring based on nanotechnology.",
    featured: false
  },
  // Colour Services
  {
    id: "co-01",
    category: "Hair Coloring",
    name: "Beard Polish Color",
    price: 50,
    duration: "15 mins",
    image: "/images/4.webp",
    description: "Quick tint to add a natural, consistent color to your beard.",
    featured: false
  },
  {
    id: "co-02",
    category: "Hair Coloring",
    name: "Hair Gel Polish",
    price: 100,
    duration: "20 mins",
    image: "/images/6.webp",
    description: "Temporary glaze coating to enhance color vibrancy and shine.",
    featured: false
  },
  {
    id: "co-03",
    category: "Hair Coloring",
    name: "Matrix Professional Colours",
    price: 200,
    duration: "45 mins",
    image: "/images/2.webp",
    description: "Premium global hair coloring using rich Matrix professional tones.",
    featured: true
  },
  {
    id: "co-04",
    category: "Hair Coloring",
    name: "Hair Blonde Shade",
    price: 350,
    duration: "60 mins",
    image: "/images/1.webp",
    description: "High-lift lightener shade to get standard blonde shades.",
    featured: false
  },
  {
    id: "co-05",
    category: "Hair Coloring",
    name: "Hair Blonde Cap Highlights",
    price: 500,
    duration: "75 mins",
    image: "/images/5.webp",
    description: "Cap highlighting technique to isolate strands and apply blonde tones.",
    featured: false
  },
  // Face Services / Beauty Services
  {
    id: "fs-01",
    category: "Beauty Services",
    name: "Face Cleaning",
    price: 100,
    duration: "20 mins",
    image: "/images/5.webp",
    description: "Cleansing session that removes surface dust, oils, and makeup impurities.",
    featured: false
  },
  {
    id: "fs-02",
    category: "Beauty Services",
    name: "Face Scrub Exfoliation",
    price: 200,
    duration: "20 mins",
    image: "/images/1.webp",
    description: "Gentle exfoliating scrub to buff away dead skin cells and clear pores.",
    featured: false
  },
  {
    id: "fs-03",
    category: "Beauty Services",
    name: "Face D-Tan Treatment",
    price: 200,
    duration: "30 mins",
    image: "/images/2.webp",
    description: "Brightening formulation that minimizes sun tan and evens skin tone.",
    featured: true
  },
  {
    id: "fs-04",
    category: "Beauty Services",
    name: "Face Waxing",
    price: 150,
    duration: "15 mins",
    image: "/images/4.webp",
    description: "Smooth hair removal for facial skin using premium gentle wax.",
    featured: false
  },
  {
    id: "fs-05",
    category: "Beauty Services",
    name: "Bleach (Face & Neck)",
    price: 200,
    duration: "25 mins",
    image: "/images/6.webp",
    description: "Skin lightening bleach for a uniform skin appearance on face and neck.",
    featured: false
  },
  {
    id: "fs-06",
    category: "Beauty Services",
    name: "Full Body Bleach",
    price: 1000,
    duration: "60 mins",
    image: "/images/1.webp",
    description: "Detoxifying and tone-lightening bleach wrap for the entire body.",
    featured: false
  },
  {
    id: "fs-07",
    category: "Beauty Services",
    name: "Full Body Massage",
    price: 1200,
    duration: "60 mins",
    image: "/images/5.webp",
    description: "Therapeutic massage session to soothe muscle tension and eliminate stress.",
    featured: true
  },
  // Facial Services
  {
    id: "fa-01",
    category: "Facial",
    name: "Diamond Facial",
    price: 750,
    duration: "45 mins",
    image: "/images/2.webp",
    description: "Exquisite diamond-dust infused facial for age control and polishing glow.",
    featured: true
  },
  {
    id: "fa-02",
    category: "Facial",
    name: "Vitamin-C Facial",
    price: 800,
    duration: "45 mins",
    image: "/images/4.webp",
    description: "Brightening therapy rich in antioxidants to fade dark spots and hyperpigmentation.",
    featured: false
  },
  {
    id: "fa-03",
    category: "Facial",
    name: "Wello Cere Facial",
    price: 1000,
    duration: "50 mins",
    image: "/images/6.webp",
    description: "Hydrating protective therapy using advanced Wello Cere formulas.",
    featured: false
  },
  {
    id: "fa-04",
    category: "Facial",
    name: "Lotus Facial",
    price: 1200,
    duration: "60 mins",
    image: "/images/1.webp",
    description: "Soothing natural herbal facial using organic Lotus extracts.",
    featured: false
  },
  {
    id: "fa-05",
    category: "Facial",
    name: "O3+ Facial",
    price: 1500,
    duration: "60 mins",
    image: "/images/5.webp",
    description: "Dermatologically approved oxygen-infused facial for maximum brightness.",
    featured: true
  },
  // Bridal Makeup (Keep as requested in first prompt and for the route)
  {
    id: "bm-01",
    category: "Bridal Makeup",
    name: "Royal HD Bridal Artistry",
    price: 5000,
    duration: "180 mins",
    image: "/images/5.webp",
    description: "Gorgeous high-definition makeup application, hairstyling, and drape setting.",
    featured: true
  }
];

export const OFFERS = [
  {
    id: "of-01",
    title: "Tuesday Massages Special Offer",
    description: "Every 2nd Tuesday of the month, enjoy any body or head massage for only ₹399!",
    code: "TUESMASSAGE",
    discount: "₹399 ONLY",
    expiryDate: "2026-12-31",
    featured: true,
    image: "/images/4.webp"
  },
  {
    id: "of-02",
    title: "Tuesday Facials Special Offer",
    description: "Every last Tuesday of the month, enjoy any facial treatment for only ₹699!",
    code: "TUESFACIAL",
    discount: "₹699 ONLY",
    expiryDate: "2026-12-31",
    featured: true,
    image: "/images/1.webp"
  }
];

export const REVIEWS = [
  {
    id: "rv-01",
    name: "Rohan Sharma",
    rating: 5,
    comment: "Absolutely the best haircut I've had in Ludhiana! Vishal Kashyap is a true master designer. He understood my hair texture and structured the fade perfectly. Highly recommended!",
    date: "2026-05-10",
    source: "Google Reviews",
    featured: true,
    approved: true
  },
  {
    id: "rv-02",
    name: "Gurpreet Singh",
    rating: 5,
    comment: "The Imperial Hot Towel Shave is pure bliss. The steam towel treatment, cooling beard oil massage, and precision outlines are top-notch. Very premium and relaxing vibe.",
    date: "2026-06-02",
    source: "Google Reviews",
    featured: true,
    approved: true
  },
  {
    id: "rv-03",
    name: "Priya Gupta",
    rating: 5,
    comment: "Had my Balayage and Keratin hair spa done here. The color came out gorgeous, and my hair feels healthier than ever. Beautiful interior design and very hygienic.",
    date: "2026-06-12",
    source: "Google Reviews",
    featured: true,
    approved: true
  },
  {
    id: "rv-04",
    name: "Amit Verma",
    rating: 5,
    comment: "Excellent service and polite staff. I tried their deep cleansing charcoal facial, and it made my skin feel completely refreshed. Booking on WhatsApp is very convenient.",
    date: "2026-06-14",
    source: "Website Feedback",
    featured: true,
    approved: true
  },
  {
    id: "rv-05",
    name: "Simran Kaur",
    rating: 5,
    comment: "VK Unisex Salon is my absolute go-to place in Ludhiana for hair coloring. They use organic, ammonia-free colors which are safe and smell amazing. 5 stars!",
    date: "2026-06-15",
    source: "Google Reviews",
    featured: true,
    approved: true
  },
  {
    id: "rv-06",
    name: "Rajesh Patel",
    rating: 4,
    comment: "Clean styling stations, skilled hair designers, and high-end products. Vishal and his team deliver outstanding results. Definitely recommend visiting them on Tibba Road.",
    date: "2026-06-16",
    source: "Google Reviews",
    featured: true,
    approved: true
  }
];

export const TEAM = [
  {
    id: "tm-01",
    name: "Vishal Kashyap",
    role: "Owner & Lead Hair Designer",
    bio: "With over 8 years of master styling experience, Vishal founded VK Unisex Salon to bring premium creative haircutting and modern styling to Ludhiana. He is passionate about customizing every cut to the guest's unique structure.",
    image: "/images/vishal.jpg",
    certifications: ["Schwarzkopf Professional Academy Certified", "L'Oréal Professionnel Color Master"]
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
  { id: "stat-01", number: "Est. 2019", label: "Grooming Excellence" },
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
