import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hoverGlow = true, onClick }) {
  const baseStyle = "glass-panel rounded-2xl overflow-hidden p-6 transition-all duration-300 relative group";
  const hoverStyle = hoverGlow ? "gold-border-hover" : "";
  
  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`${baseStyle} ${hoverStyle} ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Subtle interior gold line top overlay on hover */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent group-hover:via-gold/40 transition-all duration-500" />
      {children}
    </motion.div>
  );
}
