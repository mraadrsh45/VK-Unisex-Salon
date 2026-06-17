import { FiAward, FiCheckCircle } from 'react-icons/fi';
import GlassCard from '../components/GlassCard';
import { TEAM, AWARDS } from '../utils/data';
import SEO from '../utils/seo';

export default function About() {
  return (
    <div className="bg-charcoal-dark min-h-screen pt-28 pb-20">
      <SEO 
        title="About Us | Our Story & Expert Team" 
        description="Learn about the vision behind VK Unisex Salon. Meet our founder Vikram K. and our certified skin and hair stylists." 
      />

      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold block">Behind the Brand</span>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mt-3 mb-6">Our Sanctuary & Story</h1>
          <div className="w-16 h-[1.5px] bg-gold mx-auto mb-8"></div>
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            Founded with a vision to blend European creative haircut styling with warm, tailored guest hospitality, VK Unisex Salon represents the height of luxury hair care and aesthetics.
          </p>
        </div>
      </section>

      {/* 2. Brand Story / Founder Intro */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-28">
        <div className="lg:col-span-5 relative h-[520px] rounded-2xl overflow-hidden border border-white/10 shadow-gold-sm">
          <img 
            src="/images/vishal.jpg" 
            alt="Vishal Kashyap - Owner & Lead Hair Designer" 
            className="w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-gold uppercase text-[10px] tracking-widest font-semibold block">Owner & Lead Hair Designer</span>
            <h3 className="text-2xl font-playfair text-white mt-1">Vishal Kashyap</h3>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <span className="text-gold uppercase text-xs tracking-widest font-semibold block">Creative Vision</span>
          <h2 className="text-3xl md:text-4xl font-playfair text-white font-medium">"Hair styling is sculpture, and every face structure has a natural contour."</h2>
          <div className="w-12 h-[1px] bg-gold"></div>
          
          <p className="text-gray-400 text-sm leading-relaxed">
            Vishal Kashyap possesses over 8 years of master hair design experience in creative haircutting, coloring, and styling. He founded VK Unisex Salon in Ludhiana to offer guests a premium, highly tailored personal grooming sanctuary with an emphasis on structure and detail.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            VK Unisex Salon was built under Vishal's direct oversight to provide a relaxing, high-end environment. Featuring custom ergonomic styling chairs, color-balanced lighting, and premium styling equipment, every detail is engineered to deliver a perfect grooming ritual.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {[
              "Schwarzkopf Professional Academy Certified",
              "L'Oréal Professional Hair Color Master",
              "8+ Years of Master Hair Design Experience",
              "Exclusive Premium Hair & Styling Care Brands"
            ].map((credential, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <FiCheckCircle className="text-gold shrink-0" size={16} />
                <span className="text-xs text-gray-300 font-medium">{credential}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Team Showcase Section */}
      <section className="bg-charcoal/30 py-24 border-y border-white/5 mb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold">Master Artisans</span>
            <h2 className="text-3xl md:text-4xl font-playfair text-white mt-2">Certified Design Specialists</h2>
            <div className="w-16 h-[1.5px] bg-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <GlassCard key={member.id} className="flex flex-col h-full">
                <div className="h-72 rounded-xl overflow-hidden mb-6 border border-white/5 relative group">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-playfair text-white font-medium">{member.name}</h3>
                    <span className="text-gold text-[10px] uppercase tracking-widest font-semibold block mt-1 mb-4">
                      {member.role}
                    </span>
                    <p className="text-gray-400 text-xs leading-relaxed mb-6">{member.bio}</p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">Credentials:</span>
                    {member.certifications.map((cert, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <FiAward className="text-gold" size={14} />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Awards & Accreditations Timeline */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.2em] text-xs uppercase font-semibold">Milestones</span>
          <h2 className="text-3xl md:text-4xl font-playfair text-white mt-2">Awards & Honors</h2>
          <div className="w-16 h-[1.5px] bg-gold mx-auto mt-4"></div>
        </div>

        <div className="relative border-l border-gold/25 pl-8 ml-4 space-y-12 py-4">
          {AWARDS.map((award, idx) => (
            <div key={idx} className="relative group">
              {/* Gold dot bullet indicator */}
              <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-charcoal-dark border border-gold group-hover:bg-gold transition-colors duration-300" />
              
              <div className="glass-panel p-6 rounded-xl border border-white/5 transition-all duration-300 hover:border-gold/20 hover:shadow-gold-sm">
                <span className="font-mono text-gold font-bold text-sm tracking-widest block mb-1">{award.year}</span>
                <h4 className="text-white font-playfair text-lg font-medium">{award.title}</h4>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{award.organization}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
