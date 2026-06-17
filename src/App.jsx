import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import { AdminProvider } from './context/AdminContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServicePage from './pages/ServicePage';
import Gallery from './pages/Gallery';
import SalonTour from './pages/SalonTour';
import AdminPanel from './pages/AdminPanel';

function AppContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const location = useLocation();
  
  const handleOpenBooking = (serviceName = '') => {
    setPreselectedService(serviceName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedService('');
  };

  // Check if we are on the admin panel page to selectively hide footer
  const isAdminPage = location.pathname === '/vk-admin-panel';

  return (
    <div className="flex flex-col min-h-screen bg-charcoal-dark selection:bg-gold selection:text-black">
      {/* Toast notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#151515',
            color: '#fff',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            fontFamily: 'Montserrat, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#D4AF37',
              secondary: '#000',
            },
          },
        }}
      />

      {/* Global Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking('')} />

      {/* Main Content Areas */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onOpenBooking={handleOpenBooking} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services onOpenBooking={handleOpenBooking} />} />
          <Route path="/services/:slug" element={<ServicePage onOpenBooking={handleOpenBooking} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/tour" element={<SalonTour />} />
          <Route path="/vk-admin-panel" element={<AdminPanel />} />
        </Routes>
      </main>

      {/* Global Footer (hidden on Admin Dashboard page for clean dashboard layout) */}
      {!isAdminPage && <Footer />}

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
        preselectedService={preselectedService} 
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AdminProvider>
        <Router>
          <AppContent />
        </Router>
      </AdminProvider>
    </AppProvider>
  );
}
