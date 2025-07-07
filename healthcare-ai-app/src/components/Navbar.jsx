import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings as SettingsIcon,
  Heart,
  Scan,
  Activity,
  Apple,
  Calendar,
  Pill,
  Shield,
  Home,
  Globe
} from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', icon: Home, label: t('nav.dashboard') },
    { path: '/scan', icon: Scan, label: t('nav.scan') },
    { path: '/health', icon: Activity, label: t('nav.health') },
    { path: '/nutrition', icon: Apple, label: t('nav.nutrition') },
    { path: '/appointments', icon: Calendar, label: t('nav.appointments') },
    { path: '/pharmacy', icon: Pill, label: t('nav.pharmacy') },
    { path: '/insurance', icon: Shield, label: t('nav.insurance') },
  ];

  const languages = [
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageMenu(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-medical-200 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="bg-primary-600 rounded-lg p-2">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-medical-800">{t('app.name')}</h1>
                <p className="text-xs text-medical-500">{t('app.tagline')}</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-medical-600 hover:bg-medical-100 hover:text-medical-800'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side - Language and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-medical-600 hover:bg-medical-100"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:block">
                  {languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}
                </span>
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-medical-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-medical-50 flex items-center space-x-2 ${
                        i18n.language === lang.code ? 'bg-primary-50 text-primary-700' : 'text-medical-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-medical-600 hover:bg-medical-100"
              >
                <div className="bg-primary-100 rounded-full p-1">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <span className="hidden sm:block">{user?.name || 'User'}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-medical-200">
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-medical-700 hover:bg-medical-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <SettingsIcon className="h-4 w-4" />
                    <span>{t('nav.settings')}</span>
                  </Link>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('auth.logout') || 'Logout'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-medical-600 hover:bg-medical-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-medical-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.path)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-medical-600 hover:bg-medical-100 hover:text-medical-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;