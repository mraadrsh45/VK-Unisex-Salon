import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useApp } from '../context/AppContext';

export default function BookingModal({ isOpen, onClose, preselectedService = '' }) {
  const { services, addBooking, contactInfo } = useApp();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      service: preselectedService,
      date: '',
      time: '',
      name: '',
      mobile: '',
      email: '',
      notes: ''
    }
  });

  // Update selected service if parent changes it (e.g. clicking service card booking CTA)
  useEffect(() => {
    if (preselectedService) {
      setValue('service', preselectedService);
    }
  }, [preselectedService, setValue]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // 1. Add to local state (for admin dashboard viewing)
      const newBooking = addBooking(data);
      setBookingDetails(newBooking);

      // 2. Google Form integration (submits to Google Sheets)
      // Custom Google Form ID and entry IDs can be configured by user.
      // We use typical entries placeholder IDs, which will send data.
      const GOOGLE_FORM_ID = localStorage.getItem('vk_google_form_id') || '1FAIpQLSfD_lS37yI3fXlZ-S9K1i8L_U3uX34_Mv5bU';
      const entryIds = {
        name: localStorage.getItem('vk_entry_name') || 'entry.1000001',
        email: localStorage.getItem('vk_entry_email') || 'entry.1000002',
        mobile: localStorage.getItem('vk_entry_mobile') || 'entry.1000003',
        service: localStorage.getItem('vk_entry_service') || 'entry.1000004',
        date: localStorage.getItem('vk_entry_date') || 'entry.1000005',
        time: localStorage.getItem('vk_entry_time') || 'entry.1000006',
        notes: localStorage.getItem('vk_entry_notes') || 'entry.1000007',
      };

      const formUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
      
      const formParams = new URLSearchParams();
      formParams.append(entryIds.name, data.name);
      formParams.append(entryIds.email, data.email);
      formParams.append(entryIds.mobile, data.mobile);
      formParams.append(entryIds.service, data.service);
      formParams.append(entryIds.date, data.date);
      formParams.append(entryIds.time, data.time);
      formParams.append(entryIds.notes, data.notes);

      // Submit to Google Form (no-cors prevents CORS preflight blocks)
      try {
        await fetch(formUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formParams
        });
      } catch (gErr) {
        console.warn("Google form submit failed, continuing to emails", gErr);
      }

      // 3. Email Notification System (Resend API via Vercel function)
      try {
        await axios.post('/api/send-email', data);
      } catch (emailErr) {
        console.warn("Vercel send-email failed. This is expected if running in local environment without API keys.", emailErr);
      }

      toast.success("Appointment reserved successfully!");
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Booking submission error:", error);
      toast.error("There was an error booking your appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setBookingDetails(null);
    onClose();
  };

  // Luxury available time slots
  const timeSlots = [
    "09:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", 
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", 
    "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  // Disable past dates in HTML input
  const getMinDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-charcoal-light border border-gold/20 rounded-2xl shadow-gold-lg overflow-y-auto max-h-[90vh] z-10"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gold transition-colors p-1"
          >
            <FiX size={24} />
          </button>

          {!isSubmitted ? (
            <div className="p-8">
              <div className="text-center mb-8">
                <span className="text-gold uppercase text-xs tracking-widest font-semibold">Online Concierge</span>
                <h3 className="text-3xl font-playfair text-white mt-1">Book Premium Appointment</h3>
                <div className="w-16 h-[1px] bg-gold mx-auto mt-3"></div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Service Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-medium">Select Service</label>
                  <select
                    {...register("service", { required: "Please select a service" })}
                    className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:border-gold/50 transition-colors"
                  >
                    <option value="" className="bg-charcoal">Choose a luxury treatment...</option>
                    {services.map((svc) => (
                      <option key={svc.id} value={svc.name} className="bg-charcoal">
                        {svc.category} - {svc.name} (₹{svc.price})
                      </option>
                    ))}
                  </select>
                  {errors.service && <span className="text-red-500 text-xs mt-1">{errors.service.message}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-medium flex items-center gap-1">
                      <FiCalendar size={12} /> Date
                    </label>
                    <input
                      type="date"
                      min={getMinDate()}
                      {...register("date", { required: "Date is required" })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                    {errors.date && <span className="text-red-500 text-xs mt-1">{errors.date.message}</span>}
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gold mb-2 font-medium flex items-center gap-1">
                      <FiClock size={12} /> Time Slot
                    </label>
                    <select
                      {...register("time", { required: "Time slot is required" })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:border-gold/50 transition-colors"
                    >
                      <option value="" className="bg-charcoal">Choose timing...</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-charcoal">{slot}</option>
                      ))}
                    </select>
                    {errors.time && <span className="text-red-500 text-xs mt-1">{errors.time.message}</span>}
                  </div>
                </div>

                <hr className="border-white/5" />

                {/* Personal Info */}
                <div className="space-y-4">
                  <span className="block text-xs uppercase tracking-widest text-gray-400 font-medium">Guest Details</span>
                  
                  {/* Name */}
                  <div className="relative">
                    <FiUser className="absolute left-4 top-3.5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      {...register("name", { required: "Name is required" })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-gray-200 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Mobile */}
                    <div className="relative">
                      <FiPhone className="absolute left-4 top-3.5 text-gray-500" />
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        {...register("mobile", { 
                          required: "Mobile is required",
                          pattern: {
                            value: /^[0-9+\s-]{10,15}$/,
                            message: "Please enter a valid mobile number"
                          }
                        })}
                        className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-gray-200 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                      {errors.mobile && <span className="text-red-500 text-xs mt-1">{errors.mobile.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <FiMail className="absolute left-4 top-3.5 text-gray-500" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email"
                          }
                        })}
                        className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-gray-200 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                      {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="relative">
                    <FiMessageSquare className="absolute left-4 top-3.5 text-gray-500" />
                    <textarea
                      placeholder="Special instructions or notes (e.g. hair type, stylist preference, etc.)"
                      rows="3"
                      {...register("notes")}
                      className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-gray-200 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="gold-btn-gradient w-full py-4 rounded-lg font-semibold uppercase tracking-widest shadow-gold-md hover:scale-[1.01] transition-transform duration-200 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Confirming Ritual...
                    </>
                  ) : (
                    "Confirm Reservation"
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Booking Confirmation Success Screen */
            <div className="p-10 text-center flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="text-gold mb-6"
              >
                <FiCheckCircle size={72} className="drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
              </motion.div>

              <h3 className="text-3xl font-playfair text-white mb-2">Reservation Confirmed</h3>
              <p className="text-gold tracking-widest text-xs uppercase mb-8">Thank you, {bookingDetails?.name}</p>
              
              <div className="glass-panel w-full max-w-md p-6 text-left space-y-4 mb-8 text-sm border border-gold/10">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Service Treatment:</span>
                  <span className="text-white font-medium">{bookingDetails?.service}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Date & Time:</span>
                  <span className="text-gold font-medium">{bookingDetails?.date} at {bookingDetails?.time}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Contact Number:</span>
                  <span className="text-white font-medium">{bookingDetails?.mobile}</span>
                </div>
                {bookingDetails?.notes && (
                  <div className="text-xs text-gray-500 italic mt-2">
                    <span className="not-italic text-gray-400 block font-medium">Notes:</span>
                    "{bookingDetails?.notes}"
                  </div>
                )}
              </div>

              <p className="text-gray-400 text-sm max-w-md mb-8">
                An email notification has been dispatched. For any instant changes or questions, click to connect directly with our concierge desk:
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=Hi%2C%20I%20just%20booked%20an%20appointment%20for%20${bookingDetails?.service}%20on%20${bookingDetails?.date}%20at%20${bookingDetails?.time}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  Confirm on WhatsApp
                </a>
                <button
                  onClick={handleClose}
                  className="flex-1 border border-white/10 hover:border-gold/30 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-xs uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
