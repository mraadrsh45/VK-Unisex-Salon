import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not authenticated, we don't block them entirely, we let the AdminPanel handle showing the Login Screen
  // so we return the children but pass details, or Navigate. Actually, AdminPanel handles login state by itself.
  // Wait, if ProtectedRoute returns Navigate to '/vk-admin-panel', but AdminPanel is AT '/vk-admin-panel',
  // we would get a redirect loop if we guard `/vk-admin-panel` directly.
  // Instead, we can guard sub-pages, or inside the AdminPanel component we can conditionally render the login form if not isAdmin.
  // Yes! The most elegant layout for a single "hidden admin panel" at `/vk-admin-panel` is to render the Login Card if not isAdmin, 
  // and the actual Dashboard if isAdmin. This avoids multiple paths and keeps the secret panel completely consolidated under a single clean URL!
  // So, let's keep ProtectedRoute as a simple wrapper or if they are not logged in, show the login, but let's implement it inside the AdminPanel.jsx directly!
  // Let's create this file just in case they need to wrap any other dashboard child routes in the future.
  
  return children;
}
