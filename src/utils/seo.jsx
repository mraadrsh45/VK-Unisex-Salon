import { useEffect } from 'react';

export default function SEO({ title, description, schema }) {
  useEffect(() => {
    // 1. Update Document Title
    const baseTitle = 'VK Unisex Salon | Best Unisex Salon & Hair Salon in Ludhiana';
    document.title = title ? `${title} | VK Unisex Salon` : baseTitle;
    
    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || "Experience the best unisex salon in Ludhiana. VK Unisex Salon offers luxury haircuts, hair spas, beard styling, facials, keratin treatments, and HD bridal makeup.";
    
    // 3. Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    // 4. Update Open Graph Tags
    const updateOgTag = (property, value) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = value;
    };

    updateOgTag('og:title', title ? `${title} | VK Unisex Salon` : baseTitle);
    updateOgTag('og:description', description || "Experience the best unisex salon in Ludhiana. VK Unisex Salon offers luxury haircuts, hair spas, beard styling, facials, keratin treatments, and HD bridal makeup.");
    updateOgTag('og:url', window.location.href);

    // 5. Update Twitter Tags
    const updateTwitterTag = (name, value) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = value;
    };

    updateTwitterTag('twitter:title', title ? `${title} | VK Unisex Salon` : baseTitle);
    updateTwitterTag('twitter:description', description || "Experience the best unisex salon in Ludhiana. VK Unisex Salon offers luxury haircuts, hair spas, beard styling, facials, keratin treatments, and HD bridal makeup.");
    updateTwitterTag('twitter:url', window.location.href);

    // 6. Dynamic JSON-LD Schema Injection
    let schemaScript = document.getElementById('dynamic-json-ld');
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schema) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'dynamic-json-ld';
      schemaScript.type = 'application/ld+json';
      schemaScript.text = typeof schema === 'string' ? schema : JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    // Cleanup function to remove dynamic schema when page changes
    return () => {
      const scriptToRemove = document.getElementById('dynamic-json-ld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, schema]);

  return null;
}

