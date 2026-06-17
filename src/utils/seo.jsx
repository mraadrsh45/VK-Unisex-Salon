import { useEffect } from 'react';

export default function SEO({ title, description }) {
  useEffect(() => {
    // Update Document Title
    document.title = title ? `${title} | V.K Salon` : 'V.K Salon - Luxury Hair, Grooming & Styling';
    
    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || "Experience premium beauty and grooming at V.K Salon. Premium haircuts, hair spas, facials, groom packages, and bridal makeup in an ultra-luxurious environment.";
    
    // Update Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.content = title ? `${title} | V.K Salon` : 'V.K Salon - Luxury Hair, Grooming & Styling';
    }
    
    // Update Open Graph Description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.content = description || "Indulge in premium styling, beard grooming, and rejuvenating spas. Experience pure luxury with our certified professionals.";
    }
  }, [title, description]);

  return null;
}
