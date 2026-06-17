import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useApp } from '../context/AppContext';
import { 
  FiLock, FiLogOut, FiCalendar, FiSettings, FiScissors, 
  FiGift, FiImage, FiStar, FiSearch, FiDownload, FiPlus, 
  FiTrash2, FiEdit2, FiCheck, FiX, FiCheckCircle 
} from 'react-icons/fi';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
import GlassCard from '../components/GlassCard';
import SEO from '../utils/seo';

export default function AdminPanel() {
  const { isAdmin, login, logout } = useAdmin();
  const { 
    contactInfo, updateContactInfo,
    services, addService, editService, deleteService,
    offers, addOffer, editOffer, deleteOffer,
    reviews, approveReview, deleteReview, toggleFeatureReview,
    gallery, addGalleryItem, deleteGalleryItem,
    bookings, updateBookingStatus, deleteBooking
  } = useApp();

  // Login Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard Navigation State
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'services', 'offers', 'gallery', 'reviews', 'settings'

  // Search/Filter Bookings
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals / Item Editing State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({ name: '', price: '', duration: '', category: 'Hair Cut', description: '', image: '', featured: false });

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [offerForm, setOfferForm] = useState({ title: '', description: '', code: '', discount: '', expiryDate: '', featured: false });

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ title: '', type: 'image', category: 'Hair Styles', url: '', thumbnail: '' });

  const [settingsForm, setSettingsForm] = useState({ ...contactInfo });

  // 1. Auth Submission Handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const res = await login(username, password);
    setLoggingIn(false);
    if (res?.success) {
      toast.success("Welcome back, Administrator.");
    } else {
      toast.error(res?.message || "Login failed.");
    }
  };

  // 2. Export Bookings
  const handleExportExcel = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(bookings);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "VK Salon Bookings");
      XLSX.writeFile(wb, "vk_salon_bookings_export.xlsx");
      toast.success("Excel sheet exported successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Export to Excel failed.");
    }
  };

  const handleExportCSV = () => {
    try {
      const headers = ["ID", "Name", "Email", "Mobile", "Service", "Date", "Time", "Notes", "Status", "Timestamp"];
      const rows = bookings.map(b => [
        b.id, b.name, b.email, b.mobile, b.service, b.date, b.time, b.notes || "", b.status, b.timestamp
      ]);
      const csvContent = "data:text/csv;charset=utf-8," 
        + [headers.join(","), ...rows.map(e => e.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "vk_salon_bookings_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("CSV file exported successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Export to CSV failed.");
    }
  };

  // 3. Service Management Handlers
  const openAddServiceModal = () => {
    setEditingService(null);
    setServiceForm({ name: '', price: '', duration: '', category: 'Hair Cut', description: '', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop', featured: false });
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (svc) => {
    setEditingService(svc.id);
    setServiceForm({ ...svc });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (editingService) {
      editService(editingService, { ...serviceForm, price: parseFloat(serviceForm.price) });
      toast.success("Service updated successfully.");
    } else {
      addService({ ...serviceForm, price: parseFloat(serviceForm.price) });
      toast.success("New service added successfully.");
    }
    setIsServiceModalOpen(false);
  };

  // 4. Offer Management Handlers
  const openAddOfferModal = () => {
    setEditingOffer(null);
    setOfferForm({ title: '', description: '', code: '', discount: '', expiryDate: '', featured: false });
    setIsOfferModalOpen(true);
  };

  const openEditOfferModal = (off) => {
    setEditingOffer(off.id);
    setOfferForm({ ...off });
    setIsOfferModalOpen(true);
  };

  const handleSaveOffer = (e) => {
    e.preventDefault();
    if (editingOffer) {
      editOffer(editingOffer, { ...offerForm });
      toast.success("Offer updated successfully.");
    } else {
      addOffer({ ...offerForm });
      toast.success("New offer added successfully.");
    }
    setIsOfferModalOpen(false);
  };

  // 5. Gallery Management Handler
  const handleSaveGallery = (e) => {
    e.preventDefault();
    addGalleryItem({ ...galleryForm });
    toast.success("Media item added successfully.");
    setIsGalleryModalOpen(false);
  };

  // 6. Settings Handler
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateContactInfo(settingsForm);
    toast.success("Business settings saved successfully.");
  };

  // Bookings filter calculation
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.mobile.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' ? true : b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Render Login Screen if not authenticated
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-charcoal-dark flex items-center justify-center px-6 pt-16">
        <SEO title="Admin Login" description="Secured Staff login portal." />
        <GlassCard hoverGlow={false} className="w-full max-w-md p-10 border border-gold/20 relative shadow-gold-lg">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-4 text-gold shadow-gold-sm">
              <FiLock size={20} />
            </div>
            <span className="text-gold uppercase text-[10px] tracking-widest font-semibold">Staff Vault</span>
            <h1 className="text-3xl font-playfair text-white mt-1">Admin Portal Access</h1>
            <div className="w-12 h-[1px] bg-gold mx-auto mt-3"></div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="Enter admin identifier"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="Enter passcode token"
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="gold-btn-gradient w-full py-4 rounded-lg font-semibold uppercase tracking-widest text-xs shadow-gold-md hover:scale-[1.01] transition-transform duration-200 flex items-center justify-center gap-2"
            >
              {loggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Validating...
                </>
              ) : (
                "Request Access"
              )}
            </button>
          </form>
        </GlassCard>
      </div>
    );
  }

  // Render Dashboard if authenticated
  return (
    <div className="min-h-screen bg-charcoal-dark pt-24 text-gray-300">
      <SEO title="Admin Control Dashboard" />
      
      {/* 1. Header Bar */}
      <header className="bg-black/40 border-b border-white/5 py-5 px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-white tracking-widest flex items-center gap-2">
            V.K SALON <span className="text-gold text-xs font-semibold uppercase font-sans border border-gold/30 px-2 py-0.5 rounded">Console</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Authorized Management Hub</p>
        </div>

        <button 
          onClick={logout}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
        >
          <FiLogOut size={14} /> Exit Portal
        </button>
      </header>

      {/* 2. Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 max-w-[1600px] mx-auto">
        
        {/* Navigation Sidebar Panel */}
        <aside className="lg:col-span-3 space-y-2">
          {[
            { id: 'bookings', label: 'Bookings Sheets', icon: <FiCalendar /> },
            { id: 'services', label: 'Services Catalogue', icon: <FiScissors /> },
            { id: 'offers', label: 'Special Offer Cards', icon: <FiGift /> },
            { id: 'gallery', label: 'Media Portfolio', icon: <FiImage /> },
            { id: 'reviews', label: 'Customer Reviews', icon: <FiStar /> },
            { id: 'settings', label: 'Website Settings', icon: <FiSettings /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3.5 px-6 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors ${
                  isActive 
                    ? 'bg-gold/10 text-gold border-l-4 border-gold shadow-gold-sm font-bold' 
                    : 'hover:bg-white/5 hover:text-white border-l-4 border-transparent text-gray-500'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Dynamic Panel Canvas */}
        <main className="lg:col-span-9 bg-black/25 border border-white/5 rounded-2xl p-8 min-h-[600px] overflow-x-auto">
          
          {/* TAB 1: BOOKINGS LIST */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-white">Guest Reservations</h2>
                  <p className="text-xs text-gray-500 mt-1">Manage, search, and export appointment schedules.</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleExportExcel}
                    className="flex items-center gap-1.5 text-xs font-semibold bg-green-700 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    <FiDownload size={14} /> Export Excel
                  </button>
                  <button 
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 text-xs font-semibold bg-blue-700 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    <FiDownload size={14} /> Export CSV
                  </button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 bg-charcoal/30 p-4 rounded-xl border border-white/5">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3.5 top-3 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or mobile..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-gold/30"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-black/40 border border-white/5 rounded-lg py-2 px-4 text-xs focus:outline-none text-gray-300"
                >
                  <option value="All">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Data Table */}
              <div className="border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-white/5 text-gold uppercase tracking-wider font-semibold border-b border-white/10">
                      <th className="py-4 px-6">Guest</th>
                      <th className="py-4 px-6">Service</th>
                      <th className="py-4 px-6">Schedule</th>
                      <th className="py-4 px-6">Notes</th>
                      <th className="py-4 px-6 text-center">Status</th>
                      <th className="py-4 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6">
                            <span className="block text-white font-medium">{b.name}</span>
                            <span className="block text-gray-500 text-[10px]">{b.mobile}</span>
                            <span className="block text-gray-500 text-[10px]">{b.email}</span>
                          </td>
                          <td className="py-4 px-6 font-medium text-white">{b.service}</td>
                          <td className="py-4 px-6">
                            <span className="block text-gold font-medium">{b.date}</span>
                            <span className="block text-gray-500 text-[10px]">{b.time}</span>
                          </td>
                          <td className="py-4 px-6 text-gray-400 font-light max-w-xs truncate" title={b.notes}>{b.notes || "-"}</td>
                          <td className="py-4 px-6 text-center">
                            <select
                              value={b.status}
                              onChange={(e) => {
                                updateBookingStatus(b.id, e.target.value);
                                toast.success(`Booking status updated to ${e.target.value}`);
                              }}
                              className={`px-3 py-1 rounded text-[10px] font-bold uppercase text-center border bg-black/60 focus:outline-none ${
                                b.status === 'Confirmed' ? 'text-green-400 border-green-800' :
                                b.status === 'Cancelled' ? 'text-red-400 border-red-800' : 'text-yellow-400 border-yellow-800'
                              }`}
                            >
                              <option value="Pending" className="text-yellow-400 bg-charcoal">Pending</option>
                              <option value="Confirmed" className="text-green-400 bg-charcoal">Confirmed</option>
                              <option value="Cancelled" className="text-red-400 bg-charcoal">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this booking?")) {
                                  deleteBooking(b.id);
                                  toast.success("Booking record removed.");
                                }
                              }}
                              className="text-red-400 hover:text-red-300 p-1.5 hover:bg-white/5 rounded transition-colors"
                              title="Delete booking"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-12 text-center text-gray-500">No matching reservations found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-white">Services Catalogue</h2>
                  <p className="text-xs text-gray-500 mt-1">Configure pricing, category types, and images.</p>
                </div>
                <button 
                  onClick={openAddServiceModal}
                  className="flex items-center gap-1 text-xs font-semibold bg-gold hover:bg-gold-glow text-black px-4 py-2.5 rounded-lg transition-all shadow-gold-sm"
                >
                  <FiPlus size={16} /> Add Service
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((svc) => (
                  <div key={svc.id} className="flex gap-4 p-4 rounded-xl bg-charcoal/40 border border-white/5 items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 shrink-0">
                        <img src={svc.image} alt={svc.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-gold text-[9px] uppercase tracking-widest font-semibold block">{svc.category}</span>
                        <h4 className="text-white font-medium text-sm mt-0.5">{svc.name}</h4>
                        <span className="text-xs text-gray-400 font-mono">₹{svc.price} • {svc.duration}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button 
                        onClick={() => openEditServiceModal(svc)}
                        className="p-2 border border-white/5 hover:border-gold/30 hover:text-gold text-gray-400 bg-black/25 rounded-lg transition-colors"
                        title="Edit service details"
                      >
                        <FiEdit2 size={13} />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this service?")) {
                            deleteService(svc.id);
                            toast.success("Service deleted.");
                          }
                        }}
                        className="p-2 border border-white/5 hover:border-red-800 hover:text-red-400 text-gray-400 bg-black/25 rounded-lg transition-colors"
                        title="Delete service"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Add/Edit Modal */}
              {isServiceModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
                  <div className="bg-charcoal-light border border-gold/20 rounded-xl p-8 max-w-lg w-full">
                    <h3 className="text-xl font-playfair text-white mb-6">{editingService ? "Edit Service" : "Add Service"}</h3>
                    <form onSubmit={handleSaveService} className="space-y-4 text-xs">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Category</label>
                          <select
                            value={serviceForm.category}
                            onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                          >
                            {["Hair Cut", "Beard Styling", "Hair Spa", "Hair Coloring", "Facial", "Groom Packages", "Bridal Makeup"].map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Service Name</label>
                          <input
                            type="text"
                            required
                            value={serviceForm.name}
                            onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Price (₹)</label>
                          <input
                            type="number"
                            required
                            value={serviceForm.price}
                            onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Duration (e.g. 45 mins)</label>
                          <input
                            type="text"
                            required
                            value={serviceForm.duration}
                            onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Description</label>
                        <textarea
                          rows="3"
                          value={serviceForm.description}
                          onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none resize-none"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Image URL</label>
                        <input
                          type="text"
                          value={serviceForm.image}
                          onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="featured-check"
                          checked={serviceForm.featured}
                          onChange={(e) => setServiceForm({ ...serviceForm, featured: e.target.checked })}
                          className="rounded border-white/10 bg-black/50 text-gold focus:ring-0"
                        />
                        <label htmlFor="featured-check" className="text-[10px] uppercase tracking-widest text-gray-400">Feature on homepage</label>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button type="submit" className="flex-1 bg-gold hover:bg-gold-glow text-black font-semibold py-3 rounded-lg uppercase tracking-wider">Save</button>
                        <button type="button" onClick={() => setIsServiceModalOpen(false)} className="flex-1 border border-white/10 hover:bg-white/5 py-3 rounded-lg uppercase tracking-wider text-gray-400">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: OFFERS MANAGEMENT */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-white">Seasonal Offer Cards</h2>
                  <p className="text-xs text-gray-500 mt-1">Add discount packages featured on the front screen.</p>
                </div>
                <button 
                  onClick={openAddOfferModal}
                  className="flex items-center gap-1 text-xs font-semibold bg-gold hover:bg-gold-glow text-black px-4 py-2.5 rounded-lg transition-all shadow-gold-sm"
                >
                  <FiPlus size={16} /> Add Offer
                </button>
              </div>

              <div className="space-y-4">
                {offers.map((off) => (
                  <div key={off.id} className="p-5 rounded-xl bg-charcoal/40 border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-medium text-base">{off.title}</h4>
                        <span className="bg-gold/10 text-gold border border-gold/30 text-[10px] px-2 py-0.5 rounded font-bold">{off.discount}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{off.description}</p>
                      <div className="flex gap-3 text-[10px] font-mono text-gray-500 mt-2">
                        <span>Code: <strong className="text-gold">{off.code}</strong></span>
                        <span>•</span>
                        <span>Expires: {off.expiryDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button 
                        onClick={() => openEditOfferModal(off)}
                        className="p-2 border border-white/5 hover:border-gold/30 hover:text-gold text-gray-400 bg-black/25 rounded-lg transition-colors"
                      >
                        <FiEdit2 size={13} />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this offer?")) {
                            deleteOffer(off.id);
                            toast.success("Offer deleted.");
                          }
                        }}
                        className="p-2 border border-white/5 hover:border-red-800 hover:text-red-400 text-gray-400 bg-black/25 rounded-lg transition-colors"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Offer Modal */}
              {isOfferModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
                  <div className="bg-charcoal-light border border-gold/20 rounded-xl p-8 max-w-lg w-full">
                    <h3 className="text-xl font-playfair text-white mb-6">{editingOffer ? "Edit Offer" : "Add Offer"}</h3>
                    <form onSubmit={handleSaveOffer} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Offer Title</label>
                        <input
                          type="text"
                          required
                          value={offerForm.title}
                          onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Offer Description</label>
                        <textarea
                          rows="2"
                          value={offerForm.description}
                          onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none resize-none"
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Promo Code</label>
                          <input
                            type="text"
                            required
                            value={offerForm.code}
                            onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Discount Tag (e.g. 20% OFF)</label>
                          <input
                            type="text"
                            required
                            value={offerForm.discount}
                            onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Expiry Date</label>
                          <input
                            type="date"
                            required
                            value={offerForm.expiryDate}
                            onChange={(e) => setOfferForm({ ...offerForm, expiryDate: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="featured-offer-check"
                          checked={offerForm.featured}
                          onChange={(e) => setOfferForm({ ...offerForm, featured: e.target.checked })}
                          className="rounded border-white/10 bg-black/50 text-gold focus:ring-0"
                        />
                        <label htmlFor="featured-offer-check" className="text-[10px] uppercase tracking-widest text-gray-400">Feature on Home</label>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button type="submit" className="flex-1 bg-gold hover:bg-gold-glow text-black font-semibold py-3 rounded-lg uppercase tracking-wider">Save</button>
                        <button type="button" onClick={() => setIsOfferModalOpen(false)} className="flex-1 border border-white/10 hover:bg-white/5 py-3 rounded-lg uppercase tracking-wider text-gray-400">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GALLERY MANAGEMENT */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-white">Media Portfolio</h2>
                  <p className="text-xs text-gray-500 mt-1">Add styling portfolio photos or action loops.</p>
                </div>
                <button 
                  onClick={() => {
                    setGalleryForm({ title: '', type: 'image', category: 'Hair Styles', url: '', thumbnail: '' });
                    setIsGalleryModalOpen(true);
                  }}
                  className="flex items-center gap-1 text-xs font-semibold bg-gold hover:bg-gold-glow text-black px-4 py-2.5 rounded-lg transition-all shadow-gold-sm"
                >
                  <FiPlus size={16} /> Add Media
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="group relative rounded-lg overflow-hidden border border-white/10 h-36 bg-black">
                    <img src={item.type === 'video' ? item.thumbnail : item.url} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button 
                        onClick={() => {
                          if (window.confirm("Delete this portfolio item?")) {
                            deleteGalleryItem(item.id);
                            toast.success("Media deleted.");
                          }
                        }}
                        className="p-2 bg-red-600 rounded text-white hover:bg-red-500"
                        title="Delete Media"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gallery Modal */}
              {isGalleryModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
                  <div className="bg-charcoal-light border border-gold/20 rounded-xl p-8 max-w-lg w-full">
                    <h3 className="text-xl font-playfair text-white mb-6">Add Portfolio Item</h3>
                    <form onSubmit={handleSaveGallery} className="space-y-4 text-xs">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Media Type</label>
                          <select
                            value={galleryForm.type}
                            onChange={(e) => setGalleryForm({ ...galleryForm, type: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                          >
                            <option value="image">Image File</option>
                            <option value="video">Video Loop Link</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Category Tag</label>
                          <select
                            value={galleryForm.category}
                            onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                          >
                            {["Hair Styles", "Grooming", "Bridal", "Spa & Facial", "Interior", "Salon Action"].map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Title Label</label>
                        <input
                          type="text"
                          required
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Source URL (MP4 / JPG / PNG)</label>
                        <input
                          type="text"
                          required
                          value={galleryForm.url}
                          onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                        />
                      </div>
                      {galleryForm.type === 'video' && (
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400">Thumbnail Preview URL</label>
                          <input
                            type="text"
                            required
                            value={galleryForm.thumbnail}
                            onChange={(e) => setGalleryForm({ ...galleryForm, thumbnail: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded py-2.5 px-3 text-gray-200 focus:outline-none"
                          />
                        </div>
                      )}

                      <div className="flex gap-4 pt-4">
                        <button type="submit" className="flex-1 bg-gold hover:bg-gold-glow text-black font-semibold py-3 rounded-lg uppercase tracking-wider">Save</button>
                        <button type="button" onClick={() => setIsGalleryModalOpen(false)} className="flex-1 border border-white/10 hover:bg-white/5 py-3 rounded-lg uppercase tracking-wider text-gray-400">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: REVIEWS MODERATION */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-playfair font-bold text-white">Customer Reviews Moderation</h2>
                <p className="text-xs text-gray-500 mt-1">Approve, moderate, or feature customer testimonials on the home carousel.</p>
              </div>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-xl bg-charcoal/40 border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-medium text-sm">{rev.name}</h4>
                        <span className="text-[10px] text-gray-600">{rev.date} • {rev.source}</span>
                      </div>
                      <div className="flex items-center text-gold gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => <FiStar className="fill-gold" key={i} size={10} />)}
                      </div>
                      <p className="text-xs text-gray-400 italic">"{rev.comment}"</p>
                    </div>

                    <div className="flex gap-2 shrink-0 items-center">
                      {/* Approve button */}
                      {!rev.approved ? (
                        <button
                          onClick={() => {
                            approveReview(rev.id);
                            toast.success("Review approved and active!");
                          }}
                          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-950 border border-green-800 px-3 py-1.5 rounded"
                        >
                          <FiCheck size={12} /> Approve
                        </button>
                      ) : (
                        <span className="text-[9px] uppercase font-bold text-green-500 bg-green-500/10 px-2 py-1 border border-green-500/30 rounded flex items-center gap-1"><FiCheckCircle /> Approved</span>
                      )}

                      {/* Feature toggle */}
                      <button
                        onClick={() => {
                          toggleFeatureReview(rev.id);
                          toast.success(rev.featured ? "Review un-featured." : "Review featured on Home!");
                        }}
                        className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border rounded flex items-center gap-1 ${
                          rev.featured 
                            ? 'text-gold bg-gold/10 border-gold/30' 
                            : 'text-gray-400 bg-black/30 border-white/10 hover:border-gold/30'
                        }`}
                      >
                        <FiStar size={12} className={rev.featured ? "fill-gold text-gold" : ""} /> {rev.featured ? "Featured" : "Feature"}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this review?")) {
                            deleteReview(rev.id);
                            toast.success("Review deleted.");
                          }
                        }}
                        className="p-2 border border-white/5 hover:border-red-800 hover:text-red-400 text-gray-400 bg-black/25 rounded-lg transition-colors"
                        title="Delete Review"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: WEBSITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-playfair font-bold text-white">Business settings & Google URLs</h2>
                <p className="text-xs text-gray-500 mt-1">Configure active telephone numbers, WhatsApp, coordinates, and hours.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
                
                {/* Contact numbers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest mb-1.5 text-gray-400">Reception Phone</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded py-3 px-4 text-gray-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest mb-1.5 text-gray-400">Concierge WhatsApp Number (format: +91XXXXXX)</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded py-3 px-4 text-gray-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest mb-1.5 text-gray-400">Reception Email</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded py-3 px-4 text-gray-200 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Google URLs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest mb-1.5 text-gray-400">Google Business Profile Review Link</label>
                    <input
                      type="text"
                      value={settingsForm.googleBusinessUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, googleBusinessUrl: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded py-3 px-4 text-gray-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest mb-1.5 text-gray-400">Google Maps Iframe Embed Source URL</label>
                    <textarea
                      rows="3"
                      value={settingsForm.mapsEmbedUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, mapsEmbedUrl: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded py-3 px-4 text-gray-200 focus:outline-none resize-none font-mono text-[10px]"
                    ></textarea>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="space-y-4">
                  <span className="block text-[10px] uppercase tracking-widest text-gold font-bold">Business Hours Setup</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest mb-1.5 text-gray-400">Weekdays (Mon-Fri)</label>
                      <input
                        type="text"
                        value={settingsForm.businessHours.weekdays}
                        onChange={(e) => setSettingsForm({ 
                          ...settingsForm, 
                          businessHours: { ...settingsForm.businessHours, weekdays: e.target.value } 
                        })}
                        className="w-full bg-black/50 border border-white/10 rounded py-3 px-4 text-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest mb-1.5 text-gray-400">Saturday</label>
                      <input
                        type="text"
                        value={settingsForm.businessHours.saturday}
                        onChange={(e) => setSettingsForm({ 
                          ...settingsForm, 
                          businessHours: { ...settingsForm.businessHours, saturday: e.target.value } 
                        })}
                        className="w-full bg-black/50 border border-white/10 rounded py-3 px-4 text-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest mb-1.5 text-gray-400">Sunday</label>
                      <input
                        type="text"
                        value={settingsForm.businessHours.sunday}
                        onChange={(e) => setSettingsForm({ 
                          ...settingsForm, 
                          businessHours: { ...settingsForm.businessHours, sunday: e.target.value } 
                        })}
                        className="w-full bg-black/50 border border-white/10 rounded py-3 px-4 text-gray-200"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button type="submit" className="gold-btn-gradient px-8 py-4 rounded-lg font-semibold uppercase tracking-widest text-xs shadow-gold-sm">Save Configuration</button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
