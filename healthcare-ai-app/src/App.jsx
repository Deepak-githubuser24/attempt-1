import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';

// Import i18n configuration
import './i18n';

// Components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Scanner from './components/Scanner';
import HealthTracking from './components/HealthTracking';
import Nutrition from './components/Nutrition';
import Appointments from './components/Appointments';
import Pharmacy from './components/Pharmacy';
import Insurance from './components/Insurance';
import Settings from './components/Settings';
import NotificationSystem from './components/NotificationSystem';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user is logged in (simulate with localStorage)
    const savedUser = localStorage.getItem('healthcare_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('healthcare_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('healthcare_user');
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-medical-100">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-medical-50">
        <Toaster position="top-right" />
        <Navbar user={user} onLogout={handleLogout} />
        <NotificationSystem />
        
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/scan" element={<Scanner />} />
            <Route path="/health" element={<HealthTracking />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>

        {/* Support Badge */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-primary-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium">
            {t('app.support')}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
