import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DEFAULT_CONTACT_INFO, 
  SERVICES, 
  OFFERS, 
  REVIEWS,
  GALLERY_ITEMS
} from '../utils/data';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Load initial states from localStorage or defaults
  const [contactInfo, setContactInfo] = useState(() => {
    const saved = localStorage.getItem('vk_contact_info_v7');
    return saved ? JSON.parse(saved) : DEFAULT_CONTACT_INFO;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('vk_services_v7');
    return saved ? JSON.parse(saved) : SERVICES;
  });

  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('vk_offers_v7');
    return saved ? JSON.parse(saved) : OFFERS;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('vk_reviews_v7');
    return saved ? JSON.parse(saved) : REVIEWS;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('vk_gallery_v7');
    return saved ? JSON.parse(saved) : GALLERY_ITEMS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('vk_bookings_v7');
    // Set some initial dummy bookings if empty to make the dashboard look populated
    if (saved) return JSON.parse(saved);
    
    const initialBookings = [
      {
        id: "b-01",
        name: "Abhishek Bachchan",
        email: "abhishek@gmail.com",
        mobile: "+91 99999 88888",
        service: "Hair Cut & Sculpting",
        date: "2026-06-18",
        time: "11:30 AM",
        notes: "Requesting Vishal as stylist.",
        timestamp: "2026-06-16T10:00:00.000Z",
        status: "Confirmed"
      },
      {
        id: "b-02",
        name: "Kiara Advani",
        email: "kiara@gmail.com",
        mobile: "+91 99999 77777",
        service: "Signature Balayage & Tonal Glaze",
        date: "2026-06-19",
        time: "03:00 PM",
        notes: "Need wedding consult as well.",
        timestamp: "2026-06-16T11:30:00.000Z",
        status: "Pending"
      }
    ];
    localStorage.setItem('vk_bookings_v7', JSON.stringify(initialBookings));
    return initialBookings;
  });

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('vk_contact_info_v7', JSON.stringify(contactInfo));
  }, [contactInfo]);

  useEffect(() => {
    localStorage.setItem('vk_services_v7', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('vk_offers_v7', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('vk_reviews_v7', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('vk_gallery_v7', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('vk_bookings_v7', JSON.stringify(bookings));
  }, [bookings]);

  // Methods to manipulate state (Admin operations)
  
  // Website Settings
  const updateContactInfo = (newInfo) => {
    setContactInfo(prev => ({ ...prev, ...newInfo }));
  };

  // Services Management
  const addService = (service) => {
    setServices(prev => [
      ...prev, 
      { ...service, id: `hc-added-${Date.now()}` }
    ]);
  };

  const editService = (id, updatedService) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedService } : s));
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Offer Management
  const addOffer = (offer) => {
    setOffers(prev => [
      ...prev,
      { ...offer, id: `of-added-${Date.now()}` }
    ]);
  };

  const editOffer = (id, updatedOffer) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, ...updatedOffer } : o));
  };

  const deleteOffer = (id) => {
    setOffers(prev => prev.filter(o => o.id !== id));
  };

  // Gallery Management
  const addGalleryItem = (item) => {
    setGallery(prev => [
      ...prev,
      { ...item, id: `g-added-${Date.now()}` }
    ]);
  };

  const deleteGalleryItem = (id) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Reviews Management
  const addReview = (review) => {
    setReviews(prev => [
      { 
        ...review, 
        id: `rv-${Date.now()}`, 
        approved: false, 
        featured: false,
        date: new Date().toISOString().split('T')[0],
        source: 'Website Feedback'
      },
      ...prev
    ]);
  };

  const approveReview = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
  };

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const toggleFeatureReview = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, featured: !r.featured } : r));
  };

  // Booking Management
  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: `b-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "Confirmed" // Default to Confirmed
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  return (
    <AppContext.Provider value={{
      contactInfo,
      updateContactInfo,
      services,
      addService,
      editService,
      deleteService,
      offers,
      addOffer,
      editOffer,
      deleteOffer,
      reviews,
      addReview,
      approveReview,
      deleteReview,
      toggleFeatureReview,
      gallery,
      addGalleryItem,
      deleteGalleryItem,
      bookings,
      addBooking,
      updateBookingStatus,
      deleteBooking
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
