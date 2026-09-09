import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../data/translations';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Radio, 
  ShieldAlert, 
  QrCode, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  Shield, 
  Heart,
  Globe,
  Landmark
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, filter?: string) => void;
  onOpenAuth: () => void;
  onTriggerSOS: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAuth,
  onTriggerSOS,
}) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [packagesDropdown, setPackagesDropdown] = useState(false);

  const navItems = [
    { id: 'explore', label: t('navExplore') },
    { id: 'hidden-gems', label: t('navHiddenGems') },
    { id: 'map', label: 'Map' },
    { id: 'ai-planner', label: t('navAiPlanner'), highlight: true },
    { id: 'live-intel', label: t('navLiveIntel') },
    { id: 'safety', label: t('navSafety') },
  ];

  const handleNavClick = (id: string, filter?: string) => {
    onNavigate(id, filter);
    setMobileMenuOpen(false);
    setPackagesDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/90 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex cursor-pointer items-center gap-3 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-xs group-hover:bg-emerald-900 transition">
            <Compass className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl font-bold tracking-tight text-stone-900">
                Route<span className="text-emerald-800">X</span>
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200 hidden sm:inline-block">
                Hidden Bengal
              </span>
            </div>
            <p className="text-[10px] font-medium text-stone-500 tracking-wide hidden sm:block">
              Explore Beyond the Usual
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-stone-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-2.5 py-2 rounded-xl transition ${
              currentView === 'home' ? 'text-emerald-950 bg-emerald-100/70 font-bold' : 'hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            {t('navHome')}
          </button>

          {/* All Tourist Places */}
          <button
            onClick={() => handleNavClick('explore')}
            className={`px-2.5 py-2 rounded-xl transition flex items-center gap-1 ${
              currentView === 'explore' ? 'text-emerald-950 bg-emerald-100/70 font-bold' : 'hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Compass className="h-3.5 w-3.5 text-stone-500" />
            <span>Tourist Places</span>
          </button>

          {/* Historical Places dedicated shortcut */}
          <button
            onClick={() => handleNavClick('explore', 'Historical Places')}
            className="px-2.5 py-2 rounded-xl transition flex items-center gap-1 text-amber-900 hover:text-amber-950 hover:bg-amber-50"
            title="Explore Historical & Heritage Places"
          >
            <Landmark className="h-3.5 w-3.5 text-amber-700" />
            <span>Historical Sites</span>
          </button>

          {/* Hidden Gems (Separated & Highlighted) */}
          <button
            onClick={() => handleNavClick('hidden-gems')}
            className={`px-2.5 py-2 rounded-xl transition flex items-center gap-1 border ${
              currentView === 'hidden-gems' 
                ? 'text-emerald-900 bg-emerald-100/90 font-bold border-emerald-300 shadow-2xs' 
                : 'text-emerald-800 bg-emerald-50/70 border-emerald-200/80 hover:bg-emerald-100'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-700 animate-pulse" />
            <span>Hidden Gems</span>
          </button>

          {/* Tour Packages with Sub-menus */}
          <div className="relative">
            <button
              onClick={() => setPackagesDropdown(!packagesDropdown)}
              className={`px-2.5 py-2 rounded-xl transition flex items-center gap-1 ${
                currentView === 'packages' ? 'text-emerald-950 bg-emerald-100/70 font-bold' : 'hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <span>Tour Packages</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>

            {packagesDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 rounded-2xl bg-white p-2 shadow-xl border border-stone-200 z-50 animate-in fade-in slide-in-from-top-1">
                <button
                  onClick={() => handleNavClick('packages', 'All')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-stone-50"
                >
                  All Packages
                </button>
                <button
                  onClick={() => handleNavClick('packages', 'Family')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-stone-50"
                >
                  Family Tours
                </button>
                <button
                  onClick={() => handleNavClick('packages', 'Friends')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-stone-50"
                >
                  Friends Tours
                </button>
                <button
                  onClick={() => handleNavClick('packages', 'Couple')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-stone-50"
                >
                  Couple Tours
                </button>
                <button
                  onClick={() => handleNavClick('packages', 'Solo')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-stone-50"
                >
                  Solo Tours
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('map')}
            className={`px-2.5 py-2 rounded-xl transition ${
              currentView === 'map' ? 'text-emerald-950 bg-emerald-100/70 font-bold' : 'hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            Bengal Map
          </button>

          <button
            onClick={() => handleNavClick('ai-planner')}
            className={`px-2.5 py-2 rounded-xl transition flex items-center gap-1 ${
              currentView === 'ai-planner'
                ? 'text-emerald-900 bg-emerald-100 font-bold shadow-2xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
            <span>AI Planner</span>
          </button>

          <button
            onClick={() => handleNavClick('live-intel')}
            className={`px-2.5 py-2 rounded-xl transition flex items-center gap-1 ${
              currentView === 'live-intel' ? 'text-emerald-950 bg-emerald-100/70 font-bold' : 'hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Radio className="h-3.5 w-3.5 text-emerald-700" />
            <span>Live Intel</span>
          </button>

          <button
            onClick={() => handleNavClick('safety')}
            className={`px-2.5 py-2 rounded-xl transition flex items-center gap-1 ${
              currentView === 'safety' ? 'text-emerald-950 bg-emerald-100/70 font-bold' : 'hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <span>Safety & SOS</span>
          </button>

          <button
            onClick={() => handleNavClick('profile')}
            className={`px-2.5 py-2 rounded-xl transition flex items-center gap-1 ${
              currentView === 'profile' ? 'text-emerald-950 bg-emerald-100/70 font-bold' : 'hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <QrCode className="h-3.5 w-3.5 text-stone-500" />
            <span>My Bookings</span>
          </button>
        </nav>

        {/* Right Nav Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Emergency SOS Pill */}
          <button
            onClick={onTriggerSOS}
            className="flex items-center gap-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-1.5 text-xs font-bold transition shadow-2xs"
            title="Emergency SOS"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-rose-600 animate-bounce" />
            <span className="hidden sm:inline">SOS</span>
          </button>

          {/* Multilingual Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="rounded-xl border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-white outline-none cursor-pointer"
            >
              <option value="en">English (EN)</option>
              <option value="bn">বাংলা (BN)</option>
              <option value="hi">हिंदी (HI)</option>
            </select>
          </div>

          {/* Admin Switcher Shortcut */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`rounded-xl px-2.5 py-1.5 text-xs font-semibold transition flex items-center gap-1 ${
              currentView === 'admin'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
            title="Admin Authority Panel"
          >
            <Shield className="h-3.5 w-3.5 text-emerald-700" />
            <span className="hidden xl:inline">Admin</span>
          </button>

          {/* User Profile / Login */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-xl p-1 pr-2 hover:bg-stone-100 transition border border-stone-200"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={user.name}
                  className="h-7 w-7 rounded-lg object-cover"
                />
                <span className="text-xs font-semibold text-stone-800 hidden md:inline truncate max-w-[100px]">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="h-3 w-3 text-stone-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white p-2 shadow-2xl border border-stone-200 z-50">
                  <div className="px-3 py-2 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-900">{user.name}</p>
                    <p className="text-[10px] text-stone-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleNavClick('profile');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 rounded-xl flex items-center gap-2"
                  >
                    <QrCode className="h-4 w-4 text-emerald-700" />
                    <span>My Bookings & QR Pass</span>
                  </button>
                  <button
                    onClick={() => {
                      handleNavClick('profile');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 rounded-xl flex items-center gap-2"
                  >
                    <Heart className="h-4 w-4 text-rose-500" />
                    <span>Saved Wishlist</span>
                  </button>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => {
                        handleNavClick('admin');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 rounded-xl flex items-center gap-2"
                    >
                      <Shield className="h-4 w-4 text-emerald-700" />
                      <span>Admin Control</span>
                    </button>
                  )}
                  <div className="border-t border-stone-100 my-1" />
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-2 text-xs font-bold shadow-xs transition"
            >
              {t('login')}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-stone-800 hover:bg-stone-50"
          >
            {t('navHome')}
          </button>
          <button
            onClick={() => handleNavClick('explore')}
            className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-between ${
              currentView === 'explore' ? 'bg-emerald-100 text-emerald-950 font-extrabold' : 'text-stone-800 hover:bg-stone-50'
            }`}
          >
            <span>All Tourist Places</span>
            <span className="text-[10px] text-stone-500 font-normal">All Circuits</span>
          </button>
          <button
            onClick={() => handleNavClick('explore', 'Historical Places')}
            className="w-full text-left py-2 px-3 pl-5 rounded-xl text-xs font-semibold text-amber-950 bg-amber-50/70 hover:bg-amber-100 flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <Landmark className="h-3.5 w-3.5 text-amber-700" />
              <span>Historical & Heritage Places</span>
            </span>
            <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded-full">14 Sites</span>
          </button>
          <button
            onClick={() => handleNavClick('hidden-gems')}
            className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-between border ${
              currentView === 'hidden-gems' 
                ? 'bg-emerald-100 text-emerald-950 border-emerald-300 font-extrabold' 
                : 'text-emerald-800 bg-emerald-50/60 border-emerald-200/80 hover:bg-emerald-100'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span>💎 Hidden Gems</span>
            </span>
            <span className="text-[10px] bg-emerald-200 text-emerald-900 font-semibold px-2 py-0.5 rounded-full">Untouched</span>
          </button>
          <button
            onClick={() => handleNavClick('packages')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-stone-800 hover:bg-stone-50"
          >
            {t('navTourPackages')}
          </button>
          <button
            onClick={() => handleNavClick('map')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-stone-800 hover:bg-stone-50"
          >
            West Bengal Map
          </button>
          <button
            onClick={() => handleNavClick('ai-planner')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50"
          >
            {t('navAiPlanner')}
          </button>
          <button
            onClick={() => handleNavClick('live-intel')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-stone-800 hover:bg-stone-50"
          >
            {t('navLiveIntel')}
          </button>
          <button
            onClick={() => handleNavClick('safety')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-stone-800 hover:bg-stone-50"
          >
            {t('navSafety')}
          </button>
          <button
            onClick={() => handleNavClick('profile')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-stone-800 hover:bg-stone-50"
          >
            {t('navBookings')}
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-stone-800 hover:bg-stone-50"
          >
            {t('navAdmin')}
          </button>
        </div>
      )}
    </header>
  );
};
