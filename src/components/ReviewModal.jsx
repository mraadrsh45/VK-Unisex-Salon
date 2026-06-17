import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiStar, FiCopy } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function ReviewModal({ isOpen, onClose }) {
  const { addReview, contactInfo } = useApp();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }

    addReview({
      name,
      rating,
      comment
    });

    setSubmitted(true);
    toast.success('Review submitted successfully for moderation!');
  };

  const handleCopyToGoogle = () => {
    navigator.clipboard.writeText(comment);
    toast.success('Review text copied to clipboard! Redirecting...');
    setTimeout(() => {
      window.open(contactInfo.googleBusinessUrl, '_blank');
      handleClose();
    }, 1200);
  };

  const handleClose = () => {
    setName('');
    setRating(5);
    setComment('');
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        />

        {/* Modal Content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#151515] p-8 text-white shadow-2xl z-10"
        >
          {/* Close button */}
          <button 
            onClick={handleClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
          >
            <FiX size={20} />
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center lg:text-left">
                <span className="text-gold text-[10px] uppercase tracking-widest font-semibold block">Write a Review</span>
                <h3 className="text-2xl font-playfair text-white mt-1">Share Your Experience</h3>
                <div className="w-12 h-[1px] bg-gold mt-2"></div>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider block">Your Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Abhishek Sharma" 
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Star Rating Select */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider block">Grooming Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = hoverRating ? star <= hoverRating : star <= rating;
                    return (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110 active:scale-90"
                      >
                        <FiStar 
                          size={24} 
                          className={`transition-colors duration-200 ${
                            isFilled 
                              ? 'text-gold fill-gold drop-shadow-[0_0_4px_rgba(212,175,55,0.4)]' 
                              : 'text-gray-600'
                          }`} 
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs text-gray-500 font-medium ml-2 uppercase tracking-wider">
                    {rating === 5 && 'Excellent 🌟'}
                    {rating === 4 && 'Very Good Match 👍'}
                    {rating === 3 && 'Good Experience 🙂'}
                    {rating === 2 && 'Need Improvement 😐'}
                    {rating === 1 && 'Poor Experience 🙁'}
                  </span>
                </div>
              </div>

              {/* Comment Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider block">Your Review</label>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  placeholder="Describe your haircut, styling, or service ritual..." 
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full gold-btn-gradient py-3.5 rounded-lg text-xs font-semibold uppercase tracking-widest transition-transform hover:scale-101 shadow-gold-sm"
              >
                Submit Website Review
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-6 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
              >
                <FiCheckCircle className="text-gold" size={60} />
              </motion.div>

              <div className="space-y-2">
                <h3 className="text-2xl font-playfair text-white">Thank You, {name}!</h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                  Your review has been saved and will appear on the website once approved by the salon manager.
                </p>
              </div>

              <div className="w-full bg-black/30 border border-white/5 rounded-xl p-5 space-y-4 text-left">
                <span className="text-gold text-[9px] uppercase tracking-widest font-bold block">Support VK Unisex Salon</span>
                <h4 className="text-sm font-semibold text-white leading-tight">Post this review to Google Maps too?</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Help us reach more people in Ludhiana! Click below to copy your review and paste it directly on our Google Maps profile.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleCopyToGoogle}
                    className="flex-1 bg-gold hover:bg-gold-glow text-black font-semibold text-xs py-3 px-4 rounded-lg uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiCopy size={13} /> Copy & Post to Google
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white text-xs py-3 px-4 rounded-lg uppercase tracking-wider transition-all duration-300"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
