import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useBooking } from './context/BookingContext';
import { useLanguage } from './context/LanguageContext';
import { Destination, TourPackage, Booking, TravelType } from './types';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { DestinationCard } from './components/DestinationCard';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { BookingModal } from './components/BookingModal';
import { QRPassModal } from './components/QRPassModal';
import { AuthModal } from './components/AuthModal';
import { AITripPlanner } from './components/AITripPlanner';
import { InteractiveMap } from './components/InteractiveMap';
import { TravelIntelligence } from './components/TravelIntelligence';
import { SafetyCenter } from './components/SafetyCenter';
import { UserProfile } from './components/UserProfile';
import { AdminDashboard } from './components/AdminDashboard';
import { CrowdIndicator } from './components/CrowdIndicator';

// Icons
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Compass, 
  ShieldCheck, 
  QrCode, 
  ArrowRight, 
  Star, 
  CloudSun, 
  Filter, 
  CheckCircle2, 
  Search,
  Radio,
  Check,
  Building2,
  TreePine,
  Waves,
  Mountain,
  Phone,
  ShieldAlert,
  AlertTriangle,
  ArrowUpRight,
  ChevronRight,
  Luggage,
  Clock,
  Car,
  Heart,
  Sparkle,
  SlidersHorizontal,
  Landmark
} from 'lucide-react';

export function App() {
  const { user, isAuthenticated } = useAuth();
  const { destinations, tourPackages, bookings } = useBooking();
  const { t } = useLanguage();

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [packageCategoryFilter, setPackageCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Home AI Trip Planner state
  const [homeAiDays, setHomeAiDays] = useState<number>(3);
  const [homeAiBudget, setHomeAiBudget] = useState<number>(16000);
  const [homeAiStyle, setHomeAiStyle] = useState<TravelType>('Family');

  // Modals
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<TourPackage | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isQRPassModalOpen, setIsQRPassModalOpen] = useState(false);
  const [selectedBookingForPass, setSelectedBookingForPass] = useState<Booking | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRoleTarget, setAuthRoleTarget] = useState<'user' | 'admin'>('user');

  // Navigation Handler
  const handleNavigate = (view: string, filter?: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'packages' && filter) {
      setPackageCategoryFilter(filter);
    } else if (view === 'explore' && filter) {
      if (filter === 'Historical Places' || filter === 'Heritage') {
        setCategoryFilter('Historical Places');
        setRegionFilter('All');
      } else {
        setRegionFilter(filter);
        if (categoryFilter === 'Historical Places') {
          setCategoryFilter('All');
        }
      }
    } else if (view === 'hidden-gems' && filter) {
      setRegionFilter(filter);
    }
  };

  // Quick Action Handlers
  const handleViewDetails = (dest: Destination) => {
    setSelectedDestination(dest);
    setIsDetailModalOpen(true);
  };

  const handleBookNow = (dest: Destination) => {
    setSelectedDestination(dest);
    setSelectedPackageForBooking(null);
    setIsBookingModalOpen(true);
  };

  const handleBookPackage = (pkg: TourPackage) => {
    const dest = destinations.find(d => d.id === pkg.destinationId) || destinations[0];
    setSelectedDestination(dest);
    setSelectedPackageForBooking(pkg);
    setIsBookingModalOpen(true);
  };

  const handleOpenQRPass = (booking: Booking) => {
    setSelectedBookingForPass(booking);
    setIsQRPassModalOpen(true);
  };

  const handlePlanAITripFromDest = (dest: Destination) => {
    setIsDetailModalOpen(false);
    setCurrentView('ai-planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search Engine from Hero
  const handleHeroSearch = (params: { query: string; travelDate: string; travellers: number; travelType: TravelType }) => {
    setSearchQuery(params.query);
    setCurrentView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. All West Bengal Tourist Places (Complete Catalog)
  const filteredTouristPlaces = destinations.filter(d => {
    const matchRegion = regionFilter === 'All' || d.region === regionFilter;
    const matchCategory = categoryFilter === 'All' || (
      categoryFilter === 'Historical Places'
        ? (Array.isArray(d.category) ? (d.category.includes('Historical Places') || d.category.includes('Heritage')) : (d.category === 'Historical Places' || d.category === 'Heritage'))
        : (Array.isArray(d.category) ? d.category.includes(categoryFilter as any) : d.category === categoryFilter)
    );
    const matchSearch = 
      !searchQuery ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchCategory && matchSearch;
  });

  // Historical Places specifically
  const historicalPlaces = destinations.filter(d => 
    Array.isArray(d.category)
      ? (d.category.includes('Historical Places') || d.category.includes('Heritage'))
      : (d.category === 'Historical Places' || d.category === 'Heritage')
  );

  // 2. Untouched Hidden Gems (Strictly Uncrowded & Offbeat)
  const allHiddenGems = destinations.filter(d => !d.isPopularHotspot && d.currentCrowdLevel === 'Low');
  const filteredHiddenGems = allHiddenGems.filter(d => {
    const matchRegion = regionFilter === 'All' || d.region === regionFilter;
    const matchCategory = categoryFilter === 'All' || (Array.isArray(d.category) ? d.category.includes(categoryFilter as any) : d.category === categoryFilter);
    const matchSearch = 
      !searchQuery ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchCategory && matchSearch;
  });

  const filteredPackages = tourPackages.filter(p => {
    return packageCategoryFilter === 'All' || p.category === packageCategoryFilter;
  });

  // 4 Iconic Bengal Tourist Circuits Overview
  const BENGAL_CIRCUITS = [
    {
      id: 'North Bengal',
      name: 'North Bengal Circuit',
      subtitle: 'Himalayas, Tea Gardens & Foothill Forests',
      tagline: 'Snow peaks, colonial tea estates, and wild elephant corridors',
      placesCount: destinations.filter(d => d.region === 'North Bengal').length,
      icon: Mountain,
      color: 'from-sky-900 to-emerald-950',
      accentColor: 'text-sky-400',
      keyDistricts: 'Darjeeling, Kalimpong, Jalpaiguri, Alipurduar',
      popularSpots: ['Darjeeling', 'Kalimpong', 'Takdah', 'Lepchajagat', 'Chilapata', 'Samsing'],
      distanceFromKolkata: '600–680 km (Overnight Train / 1h Flight)',
      idealSeason: 'October to May',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'Rarh Bengal',
      name: 'Rarh Bengal Circuit',
      subtitle: 'Red Soil, Terracotta & Granite Peaks',
      tagline: 'Ancient Malla kings, Chhau dance, and blazing Palash blooms',
      placesCount: destinations.filter(d => d.region === 'Rarh Bengal').length,
      icon: Building2,
      color: 'from-amber-900 to-stone-900',
      accentColor: 'text-amber-400',
      keyDistricts: 'Bankura, Purulia, Jhargram, Paschim Medinipur',
      popularSpots: ['Bishnupur', 'Ayodhya Hills', 'Bamni Falls', 'Garhpanchkot', 'Baranti'],
      distanceFromKolkata: '140–290 km (3–5h Express Train / NH19)',
      idealSeason: 'October to March (Palash in Feb-Mar)',
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'Coastal & Sundarbans',
      name: 'Coastal & Sundarbans Circuit',
      subtitle: 'Tidal Mangrove Delta & Bay of Bengal Shores',
      tagline: 'Royal Bengal tigers, red crab dunes, and mudflat sunsets',
      placesCount: destinations.filter(d => d.region === 'Coastal & Sundarbans').length,
      icon: Waves,
      color: 'from-emerald-950 to-teal-900',
      accentColor: 'text-teal-300',
      keyDistricts: 'South 24 Parganas, Purba Medinipur',
      popularSpots: ['Sundarbans Delta', 'Jharkhali', 'Mousuni Island', 'Digha Beach', 'Tajpur'],
      distanceFromKolkata: '105–185 km (3–4h Drive or Local EMU)',
      idealSeason: 'November to February (Winter wildlife & calm sea)',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'South Bengal',
      name: 'South Bengal Heritage Circuit',
      subtitle: 'Nawabi Splendor, Baul Music & Gangetic Plains',
      tagline: 'Tagore’s university town, 1000-door Nawabi palaces, and silk looms',
      placesCount: destinations.filter(d => d.region === 'South Bengal').length,
      icon: TreePine,
      color: 'from-stone-900 to-amber-950',
      accentColor: 'text-yellow-400',
      keyDistricts: 'Birbhum, Murshidabad, Kolkata, Hooghly, Nadia',
      popularSpots: ['Shantiniketan & Sonajhuri', 'Murshidabad Hazarduari', 'Kolkata Heritage'],
      distanceFromKolkata: '0–210 km (Vande Bharat / Direct Trains)',
      idealSeason: 'October to March (Poush Mela & Basanta Utsav)',
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-800 font-sans antialiased">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={() => {
          setAuthRoleTarget('user');
          setIsAuthModalOpen(true);
        }}
        onTriggerSOS={() => {
          setCurrentView('safety');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ========================================================================= */}
        {/* ============================ VIEW: HOME ================================= */}
        {/* ========================================================================= */}
        {currentView === 'home' && (
          <div className="space-y-16 pb-16">
            {/* 1. Hero Section */}
            <Hero
              onSearch={handleHeroSearch}
              onExploreGems={() => {
                setCurrentView('hidden-gems');
                setRegionFilter('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPlanTrip={() => {
                setCurrentView('ai-planner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* ========================================================================= */}
            {/* 2. CORE PLATFORM QUICK-ACCESS RIBBON (Direct Home Access to All 9 Modules) */}
            {/* ========================================================================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
              <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-stone-200/90 p-5 sm:p-7 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-ping" />
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700">
                      Explore RouteX Travel Platform
                    </h3>
                  </div>
                  <span className="text-[11px] text-stone-400 hidden sm:inline">
                    Tap any option to jump directly or explore sections below
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
                  {/* Option 1: All Tourist Places */}
                  <button
                    onClick={() => handleNavigate('explore')}
                    className="group rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-emerald-50 hover:border-emerald-300 p-3 text-left transition flex flex-col justify-between"
                  >
                    <div className="p-2 rounded-xl bg-white border border-stone-200 w-fit group-hover:bg-emerald-800 group-hover:text-white transition">
                      <Compass className="h-4 w-4 text-emerald-800 group-hover:text-white" />
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-950">
                        All Tourist Places
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">Bengal circuits</p>
                    </div>
                  </button>

                  {/* Option 2: Hidden Gems */}
                  <button
                    onClick={() => handleNavigate('hidden-gems')}
                    className="group rounded-2xl border border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 p-3 text-left transition flex flex-col justify-between shadow-2xs"
                  >
                    <div className="p-2 rounded-xl bg-emerald-800 text-white w-fit shadow-2xs">
                      <Sparkles className="h-4 w-4 text-emerald-300" />
                    </div>
                    <div className="mt-3">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 block">
                        Pristine
                      </span>
                      <h4 className="text-xs font-bold text-emerald-950">Hidden Gems</h4>
                      <p className="text-[10px] text-emerald-700 mt-0.5">Untouched escapes</p>
                    </div>
                  </button>

                  {/* Option 3: Tour Packages */}
                  <button
                    onClick={() => handleNavigate('packages')}
                    className="group rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-emerald-50 hover:border-emerald-300 p-3 text-left transition flex flex-col justify-between"
                  >
                    <div className="p-2 rounded-xl bg-white border border-stone-200 w-fit group-hover:bg-emerald-800 group-hover:text-white transition">
                      <Luggage className="h-4 w-4 text-emerald-800 group-hover:text-white" />
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-950">
                        Tour Packages
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">Family & Friends</p>
                    </div>
                  </button>

                  {/* Option 4: West Bengal Map */}
                  <button
                    onClick={() => handleNavigate('map')}
                    className="group rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-emerald-50 hover:border-emerald-300 p-3 text-left transition flex flex-col justify-between"
                  >
                    <div className="p-2 rounded-xl bg-white border border-stone-200 w-fit group-hover:bg-emerald-800 group-hover:text-white transition">
                      <MapPin className="h-4 w-4 text-emerald-800 group-hover:text-white" />
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-950">
                        Bengal Map
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">Interactive pins</p>
                    </div>
                  </button>

                  {/* Option 5: AI Trip Planner */}
                  <button
                    onClick={() => handleNavigate('ai-planner')}
                    className="group rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-emerald-50 hover:border-emerald-300 p-3 text-left transition flex flex-col justify-between"
                  >
                    <div className="p-2 rounded-xl bg-white border border-stone-200 w-fit group-hover:bg-emerald-800 group-hover:text-white transition">
                      <Sparkle className="h-4 w-4 text-emerald-800 group-hover:text-white" />
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-950">
                        AI Trip Planner
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">Smart itinerary</p>
                    </div>
                  </button>

                  {/* Option 6: Travel Intelligence */}
                  <button
                    onClick={() => handleNavigate('live-intel')}
                    className="group rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-emerald-50 hover:border-emerald-300 p-3 text-left transition flex flex-col justify-between"
                  >
                    <div className="p-2 rounded-xl bg-white border border-stone-200 w-fit group-hover:bg-emerald-800 group-hover:text-white transition">
                      <Radio className="h-4 w-4 text-emerald-800 group-hover:text-white" />
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-950">
                        Travel Intel
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">Crowd & highway</p>
                    </div>
                  </button>

                  {/* Option 7: Safety & SOS */}
                  <button
                    onClick={() => handleNavigate('safety')}
                    className="group rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 p-3 text-left transition flex flex-col justify-between"
                  >
                    <div className="p-2 rounded-xl bg-rose-600 text-white w-fit shadow-2xs">
                      <ShieldAlert className="h-4 w-4 text-white" />
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs font-bold text-rose-950">Safety & SOS</h4>
                      <p className="text-[10px] text-rose-700 mt-0.5">24/7 Police 112</p>
                    </div>
                  </button>

                  {/* Option 8: My Bookings & QR Pass */}
                  <button
                    onClick={() => handleNavigate('profile')}
                    className="group rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-emerald-50 hover:border-emerald-300 p-3 text-left transition flex flex-col justify-between"
                  >
                    <div className="p-2 rounded-xl bg-white border border-stone-200 w-fit group-hover:bg-emerald-800 group-hover:text-white transition">
                      <QrCode className="h-4 w-4 text-emerald-800 group-hover:text-white" />
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-950">
                        My Bookings
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">Digital QR Pass</p>
                    </div>
                  </button>

                  {/* Option 9: Admin Panel */}
                  <button
                    onClick={() => handleNavigate('admin')}
                    className="group rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-emerald-50 hover:border-emerald-300 p-3 text-left transition flex flex-col justify-between"
                  >
                    <div className="p-2 rounded-xl bg-white border border-stone-200 w-fit group-hover:bg-emerald-800 group-hover:text-white transition">
                      <SlidersHorizontal className="h-4 w-4 text-emerald-800 group-hover:text-white" />
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-950">
                        Admin Panel
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">Capacity & scan</p>
                    </div>
                  </button>
                </div>
              </div>
            </section>

            {/* 3. How RouteX Works (6-Step Visual Journey) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {t('howRouteXWorks')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-2">
                  A Smarter Way to Experience West Bengal
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  From avoiding tourist bottlenecks to walking in with an authenticated digital travel pass.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { step: '01', title: t('stepDiscover'), desc: 'Lesser-known offbeat gems across Bengal' },
                  { step: '02', title: t('stepPlan'), desc: 'AI-tailored routes matching your budget' },
                  { step: '03', title: t('stepCheck'), desc: 'Live crowd footfall & microclimate telemetry' },
                  { step: '04', title: t('stepBook'), desc: 'Multi-step transparent verified booking' },
                  { step: '05', title: t('stepTravel'), desc: 'Stay in vetted eco-homestays with local hosts' },
                  { step: '06', title: t('stepVerify'), desc: 'Scan digital QR pass for instant check-in' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-stone-200 bg-white p-4 shadow-2xs hover:shadow-xs transition flex flex-col justify-between"
                  >
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 w-7 h-7 rounded-lg flex items-center justify-center">
                      {item.step}
                    </span>
                    <div className="mt-3">
                      <h4 className="font-bold text-stone-900 text-sm font-display">{item.title}</h4>
                      <p className="text-[11px] text-stone-500 mt-1 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 1: UNTOUCHED HIDDEN GEMS OF WEST BENGAL (Distinct & Separated)   */}
            {/* ========================================================================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30 p-6 sm:p-10 shadow-xs space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800 text-white px-3 py-1 text-xs font-bold shadow-2xs mb-2">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-300 animate-pulse" />
                      <span>Untouched & Uncrowded • 100% Verified Serene Escapes</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
                      Hidden Gems of West Bengal
                    </h2>
                    <p className="text-xs text-stone-600 mt-1 max-w-2xl">
                      Escape commercial tourist jams. These pristine destinations maintain under 30% crowd capacity,
                      warm village hospitality, and pristine Himalayan or delta wilderness.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('hidden-gems')}
                    className="rounded-xl bg-emerald-800 text-white px-4 py-2.5 text-xs font-bold hover:bg-emerald-900 transition flex items-center gap-1.5 self-start md:self-auto shrink-0 shadow-2xs"
                  >
                    <span>View All ({allHiddenGems.length}) Hidden Gems</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Decongestion Spotlight Comparison Card */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white p-4 border border-emerald-100 shadow-2xs flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 font-bold shrink-0 text-sm">
                      -85%
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">North Bengal Choice</span>
                      <p className="text-xs font-bold text-stone-900">Takdah & Lepchajagat</p>
                      <p className="text-[11px] text-emerald-700">Instead of packed Darjeeling Mall</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4 border border-emerald-100 shadow-2xs flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 font-bold shrink-0 text-sm">
                      -78%
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Coastal Bengal Choice</span>
                      <p className="text-xs font-bold text-stone-900">Mousuni Island Camping</p>
                      <p className="text-[11px] text-emerald-700">Instead of crowded Digha concrete</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4 border border-emerald-100 shadow-2xs flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 font-bold shrink-0 text-sm">
                      -90%
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Forest Corridor Choice</span>
                      <p className="text-xs font-bold text-stone-900">Chilapata & Jayanti</p>
                      <p className="text-[11px] text-emerald-700">Instead of long Jaldapara safari queues</p>
                    </div>
                  </div>
                </div>

                {/* Hidden Gems Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allHiddenGems.slice(0, 6).map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      onViewDetails={handleViewDetails}
                      onBookNow={handleBookNow}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 2: WEST BENGAL TOURIST CIRCUITS & ALL PLACES OVERVIEW             */}
            {/* ========================================================================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    West Bengal Tourism Circuits
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
                    Explore All Bengal Tourist Places
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Explore all iconic circuits: North Bengal mountains, Rarh terracotta, coastal mangroves, and South Bengal heritage.
                  </p>
                </div>

                <button
                  onClick={() => handleNavigate('explore')}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 self-start md:self-auto shrink-0"
                >
                  <span>Explore All ({destinations.length}) Tourist Places</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* 4 Regional Circuit Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {BENGAL_CIRCUITS.map((circuit) => {
                  const CircuitIcon = circuit.icon;
                  return (
                    <div
                      key={circuit.id}
                      className="group rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div className="relative aspect-16/10 overflow-hidden">
                        <img
                          src={circuit.image}
                          alt={circuit.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-stone-800 shadow-2xs">
                          {circuit.placesCount} Places
                        </div>
                        <div className="absolute bottom-3 left-3 text-white">
                          <span className="text-[10px] font-semibold text-emerald-300 uppercase block tracking-wider">
                            Circuit
                          </span>
                          <h3 className="font-bold font-display text-base leading-tight">{circuit.name}</h3>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <p className="text-[11px] text-stone-500 leading-snug">{circuit.tagline}</p>
                          <div className="text-[11px] text-stone-600 pt-2 border-t border-stone-100 space-y-1">
                            <p><strong className="text-stone-800">Districts:</strong> {circuit.keyDistricts}</p>
                            <p><strong className="text-stone-800">Distance:</strong> {circuit.distanceFromKolkata}</p>
                            <p><strong className="text-stone-800">Season:</strong> {circuit.idealSeason}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleNavigate('explore', circuit.id)}
                          className="w-full rounded-xl bg-stone-50 hover:bg-emerald-50 text-emerald-900 border border-stone-200 hover:border-emerald-300 py-2 text-xs font-bold transition flex items-center justify-center gap-1.5"
                        >
                          <span>Explore {circuit.name}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION: HISTORICAL & ROYAL HERITAGE OF WEST BENGAL (New Dedicated Section)*/}
            {/* ========================================================================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-amber-200/90 bg-gradient-to-br from-amber-50/50 via-white to-stone-50 p-6 sm:p-10 shadow-xs space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-900 text-amber-100 px-3 py-1 text-xs font-bold shadow-2xs mb-2">
                      <Landmark className="h-3.5 w-3.5 text-amber-300" />
                      <span>Archaeological & Dynastic Heritage • 3rd Cent. BCE to 1947</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
                      Historical Places of West Bengal
                    </h2>
                    <p className="text-xs text-stone-600 mt-1 max-w-2xl">
                      Journey through Bengal’s monumental eras: medieval Sultanate capitals in Gour, 108 terracotta Shiva temples in Kalna, 1000-door Nawabi Hazarduari, French riverside quarters in Chandannagar, and Koch royal palaces.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('explore', 'Historical Places')}
                    className="rounded-xl bg-amber-900 text-white px-4 py-2.5 text-xs font-bold hover:bg-amber-950 transition flex items-center gap-1.5 self-start md:self-auto shrink-0 shadow-2xs"
                  >
                    <span>Explore All ({historicalPlaces.length}) Historical Places</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Historical Dynasties & Eras Quick Navigator */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div 
                    onClick={() => {
                      setSearchQuery('Gour');
                      handleNavigate('explore', 'Historical Places');
                    }}
                    className="cursor-pointer rounded-2xl bg-white p-3.5 border border-amber-100 shadow-2xs hover:border-amber-400 hover:shadow-xs transition"
                  >
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">14th–16th Century</span>
                    <h4 className="text-xs font-bold text-stone-900 mt-0.5">Bengal Sultanate</h4>
                    <p className="text-[11px] text-stone-500 mt-1">Gour, Pandua & Adina Mosque</p>
                  </div>

                  <div 
                    onClick={() => {
                      setSearchQuery('Bishnupur');
                      handleNavigate('explore', 'Historical Places');
                    }}
                    className="cursor-pointer rounded-2xl bg-white p-3.5 border border-amber-100 shadow-2xs hover:border-amber-400 hover:shadow-xs transition"
                  >
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">17th–18th Century</span>
                    <h4 className="text-xs font-bold text-stone-900 mt-0.5">Malla Terracotta Kings</h4>
                    <p className="text-[11px] text-stone-500 mt-1">Bishnupur, Kalna & Bansberia</p>
                  </div>

                  <div 
                    onClick={() => {
                      setSearchQuery('Murshidabad');
                      handleNavigate('explore', 'Historical Places');
                    }}
                    className="cursor-pointer rounded-2xl bg-white p-3.5 border border-amber-100 shadow-2xs hover:border-amber-400 hover:shadow-xs transition"
                  >
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">1704–1880</span>
                    <h4 className="text-xs font-bold text-stone-900 mt-0.5">Nawabs of Murshidabad</h4>
                    <p className="text-[11px] text-stone-500 mt-1">Hazarduari, Katra & Plassey</p>
                  </div>

                  <div 
                    onClick={() => {
                      setSearchQuery('Chandannagar');
                      handleNavigate('explore', 'Historical Places');
                    }}
                    className="cursor-pointer rounded-2xl bg-white p-3.5 border border-amber-100 shadow-2xs hover:border-amber-400 hover:shadow-xs transition"
                  >
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">16th–19th Century</span>
                    <h4 className="text-xs font-bold text-stone-900 mt-0.5">European & Colonial</h4>
                    <p className="text-[11px] text-stone-500 mt-1">Chandannagar, Bandel & Kolkata</p>
                  </div>
                </div>

                {/* Featured Historical Places Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {historicalPlaces.slice(0, 6).map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      onViewDetails={handleViewDetails}
                      onBookNow={handleBookNow}
                    />
                  ))}
                </div>

                {/* Historical Tour Packages Banner */}
                <div className="rounded-2xl bg-stone-900 text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-100">Looking for Guided Historical Heritage Expeditions?</h4>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Book curated multi-day packages covering Nawabi Murshidabad, medieval Gour, 108 Kalna temples & French colonies with ASI licensed historians.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigate('packages')}
                    className="rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2 text-xs transition shrink-0 whitespace-nowrap shadow-xs"
                  >
                    View Heritage Tour Packages
                  </button>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 3: CURATED TOUR PACKAGES SHOWCASE                                */}
            {/* ========================================================================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-10 shadow-xs space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Turnkey Curated Journeys
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
                      Explore Tour Packages
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Tailored specifically for families, friends, couples, and solo explorers.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-stone-100 p-1 text-xs font-semibold">
                    {['All', 'Family', 'Friends', 'Couple', 'Solo'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setPackageCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-xl transition ${
                          packageCategoryFilter === cat
                            ? 'bg-white text-stone-900 shadow-2xs font-bold'
                            : 'text-stone-500 hover:text-stone-900'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {filteredPackages.slice(0, 4).map((pkg) => (
                    <div
                      key={pkg.id}
                      className="group rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs hover:shadow-md hover:border-emerald-700/40 transition flex flex-col justify-between"
                    >
                      <div className="relative aspect-16/10 overflow-hidden">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2.5 left-2.5 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-emerald-800 shadow-2xs">
                          {pkg.category} Tour
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-semibold text-stone-400 block">{pkg.duration}</span>
                          <h4 className="font-bold text-stone-900 text-sm font-display mt-0.5 group-hover:text-emerald-800 transition">
                            {pkg.title}
                          </h4>
                          <p className="text-xs text-stone-500 mt-1 line-clamp-2">{pkg.description}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-stone-400 block">Starting From</span>
                            <span className="font-mono font-bold text-stone-900 text-sm">₹{pkg.startingPrice}</span>
                          </div>
                          <button
                            onClick={() => handleBookPackage(pkg)}
                            className="rounded-xl bg-emerald-800 text-white px-3 py-1.5 text-xs font-bold hover:bg-emerald-900 shadow-2xs"
                          >
                            Book Package
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => handleNavigate('packages')}
                    className="inline-flex items-center gap-2 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 px-5 py-2.5 text-xs font-bold transition"
                  >
                    <span>View All ({tourPackages.length}) Tour Packages</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 4: INTERACTIVE WEST BENGAL MAP ON HOME                            */}
            {/* ========================================================================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-10 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Interactive Geographic Explorer
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
                      Explore the West Bengal Map
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Interact directly with all 23 districts of West Bengal. Tap pins to see microclimate & crowd levels.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('map')}
                    className="rounded-xl bg-stone-900 text-white px-4 py-2.5 text-xs font-bold hover:bg-black transition flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                  >
                    <span>Open Fullscreen Map</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Embedded Live Map Component */}
                <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                  <InteractiveMap
                    key="home-embedded-map"
                    destinations={destinations}
                    onSelectDestination={handleViewDetails}
                    onBookNow={handleBookNow}
                  />
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 5: AI TRIP PLANNER INTERACTIVE LAUNCHER ON HOME                   */}
            {/* ========================================================================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-stone-900 text-white p-8 sm:p-12 shadow-md relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="space-y-4 max-w-xl z-10">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/80 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-700/50">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    <span>AI Trip Planner Engine</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-bold font-display text-white">
                    Need a custom trip plan in seconds?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    Adjust your preferences below or launch our intelligent engine. It builds balanced, day-by-day itineraries
                    guided by real-time carrying capacity and authentic village homestays.
                  </p>

                  {/* Interactive Inputs on Home */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="rounded-xl bg-white/10 p-3 border border-white/10">
                      <span className="text-[10px] text-stone-400 block font-semibold">Duration</span>
                      <select
                        value={homeAiDays}
                        onChange={(e) => setHomeAiDays(Number(e.target.value))}
                        className="bg-transparent text-white text-xs font-bold outline-none cursor-pointer w-full mt-1"
                      >
                        <option value={2} className="text-stone-900">2 Days / 1 Night</option>
                        <option value={3} className="text-stone-900">3 Days / 2 Nights</option>
                        <option value={4} className="text-stone-900">4 Days / 3 Nights</option>
                        <option value={5} className="text-stone-900">5 Days / 4 Nights</option>
                      </select>
                    </div>

                    <div className="rounded-xl bg-white/10 p-3 border border-white/10">
                      <span className="text-[10px] text-stone-400 block font-semibold">Budget</span>
                      <select
                        value={homeAiBudget}
                        onChange={(e) => setHomeAiBudget(Number(e.target.value))}
                        className="bg-transparent text-white text-xs font-bold outline-none cursor-pointer w-full mt-1"
                      >
                        <option value={10000} className="text-stone-900">₹10,000</option>
                        <option value={16000} className="text-stone-900">₹16,000</option>
                        <option value={25000} className="text-stone-900">₹25,000</option>
                        <option value={35000} className="text-stone-900">₹35,000</option>
                      </select>
                    </div>

                    <div className="rounded-xl bg-white/10 p-3 border border-white/10">
                      <span className="text-[10px] text-stone-400 block font-semibold">Vibe</span>
                      <select
                        value={homeAiStyle}
                        onChange={(e) => setHomeAiStyle(e.target.value as TravelType)}
                        className="bg-transparent text-white text-xs font-bold outline-none cursor-pointer w-full mt-1"
                      >
                        <option value="Family" className="text-stone-900">Family</option>
                        <option value="Couple" className="text-stone-900">Couple</option>
                        <option value="Friends" className="text-stone-900">Friends</option>
                        <option value="Solo" className="text-stone-900">Solo</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('ai-planner');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="rounded-2xl bg-emerald-700 hover:bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-md transition flex items-center gap-2"
                  >
                    <span>Launch AI Trip Planner</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="rounded-2xl bg-white/10 backdrop-blur-md p-6 border border-white/20 text-xs space-y-3 w-full lg:w-80 shrink-0 z-10">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">Sample AI Recommendation</span>
                  <p className="font-bold text-white text-sm">
                    {homeAiDays} Days {homeAiStyle} Pine & Tea Circuit
                  </p>
                  <div className="space-y-1.5 text-stone-300 text-[11px]">
                    <p>• Day 1: Colonial British Stone Bungalow in Takdah</p>
                    <p>• Day 2: Organic Tea Garden Trail & Sunrise at Tinchuley</p>
                    {homeAiDays >= 3 && <p>• Day 3: Chota Mangwa orange orchard walk & honey tasting</p>}
                    {homeAiDays >= 4 && <p>• Day 4: Heritage Toy Train ride to Batasia loop</p>}
                  </div>
                  <div className="pt-2 border-t border-white/20 flex justify-between text-[11px]">
                    <span className="text-stone-400">Total Est.: ₹{homeAiBudget.toLocaleString()}</span>
                    <span className="text-emerald-300 font-bold">Crowd: 18%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 6: TRAVELING INTELLIGENCE & LIVE TELEMETRY ON HOME                */}
            {/* ========================================================================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-10 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Real-Time Sensor Telemetry
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
                      Traveling Intelligence & Live Radar
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Monitor live tourist density, highway bottlenecks, and microclimate sensors before you travel.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('live-intel')}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5"
                  >
                    <span>Full Intelligence Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Gauge 1: Takdah */}
                  <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">Takdah Pine Valley</span>
                      <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                        18% Footfall
                      </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '18%' }} />
                    </div>
                    <p className="text-[11px] text-stone-500">Optimal tranquility • 20°C Misty Breeze</p>
                  </div>

                  {/* Gauge 2: Lepchajagat */}
                  <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">Lepchajagat Oaks</span>
                      <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                        22% Footfall
                      </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '22%' }} />
                    </div>
                    <p className="text-[11px] text-stone-500">Crystal Kanchenjunga vista • 16°C</p>
                  </div>

                  {/* Gauge 3: Mousuni Island */}
                  <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">Mousuni Island</span>
                      <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                        28% Footfall
                      </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '28%' }} />
                    </div>
                    <p className="text-[11px] text-stone-500">Beach camping open • 27°C Sea Breeze</p>
                  </div>

                  {/* Gauge 4: Darjeeling Town Center */}
                  <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">Darjeeling Mall Center</span>
                      <span className="rounded-full bg-rose-100 text-rose-800 px-2 py-0.5 text-[10px] font-bold">
                        92% Footfall
                      </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div className="bg-rose-600 h-2 rounded-full" style={{ width: '92%' }} />
                    </div>
                    <p className="text-[11px] text-rose-700 font-semibold">High congestion • Diversion advised</p>
                  </div>
                </div>

                {/* Highway Corridor Live Status Bar */}
                <div className="rounded-2xl bg-stone-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
                    <span className="font-bold">Live Road Corridors:</span>
                    <span className="text-stone-300">NH10 Teesta bypass is CLEAR • Rohini Road OPEN • Digha NH116B NORMAL</span>
                  </div>
                  <button
                    onClick={() => handleNavigate('live-intel')}
                    className="text-emerald-300 hover:text-emerald-200 font-bold whitespace-nowrap"
                  >
                    View All Corridors →
                  </button>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 7: 24/7 SAFETY & SOS EMERGENCY CENTER ON HOME                     */}
            {/* ========================================================================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50/60 via-white to-white p-6 sm:p-10 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 text-rose-800 px-3 py-1 text-xs font-bold mb-2">
                      <ShieldAlert className="h-3.5 w-3.5 text-rose-700 animate-bounce" />
                      <span>24/7 Official Emergency Protection</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
                      Safety & SOS Emergency Center
                    </h2>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Direct one-touch verified hotlines to West Bengal Tourist Police, Forest Rangers, and Women’s Helplines.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('safety')}
                    className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-2xs"
                  >
                    <span>Full Safety & Emergency Center</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* 4 Instant Helpline Dialer Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <a
                    href="tel:18002121655"
                    className="group rounded-2xl border border-rose-200 bg-white p-4 shadow-2xs hover:shadow-xs transition block"
                  >
                    <span className="text-[10px] uppercase font-bold text-rose-700 block">Dedicated Tourism</span>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-rose-700 transition">WB Tourist Police</h4>
                    <p className="font-mono text-base font-bold text-rose-600 mt-1">1800-212-1655</p>
                    <span className="text-[10px] text-stone-400 mt-1 block">Toll-Free 24x7 Assistance</span>
                  </a>

                  <a
                    href="tel:112"
                    className="group rounded-2xl border border-stone-200 bg-white p-4 shadow-2xs hover:shadow-xs transition block"
                  >
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Emergency Response</span>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-stone-700 transition">National Helpline</h4>
                    <p className="font-mono text-base font-bold text-stone-900 mt-1">112</p>
                    <span className="text-[10px] text-stone-400 mt-1 block">Police, Ambulance & Fire</span>
                  </a>

                  <a
                    href="tel:1090"
                    className="group rounded-2xl border border-stone-200 bg-white p-4 shadow-2xs hover:shadow-xs transition block"
                  >
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Dedicated Helpline</span>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-stone-700 transition">Women's Safety</h4>
                    <p className="font-mono text-base font-bold text-stone-900 mt-1">1090</p>
                    <span className="text-[10px] text-stone-400 mt-1 block">Statewide Rapid Protection</span>
                  </a>

                  <a
                    href="tel:18003453866"
                    className="group rounded-2xl border border-stone-200 bg-white p-4 shadow-2xs hover:shadow-xs transition block"
                  >
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Wildlife & Forests</span>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-stone-700 transition">Forest Rescue</h4>
                    <p className="font-mono text-base font-bold text-stone-900 mt-1">1800-345-3866</p>
                    <span className="text-[10px] text-stone-400 mt-1 block">Dooars & Sundarbans Rangers</span>
                  </a>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 8: MY BOOKINGS & DIGITAL QR TRAVEL PASS ON HOME                   */}
            {/* ========================================================================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-10 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Digital Travel Documentation
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
                      My Bookings & Digital QR Travel Pass
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Your government-vetted RouteX QR Travel Pass guarantees priority eco-homestay check-in and forest corridor clearance.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('profile')}
                    className="rounded-xl bg-emerald-800 text-white px-4 py-2 text-xs font-bold hover:bg-emerald-900 transition flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-2xs"
                  >
                    <span>View All ({bookings.length}) Bookings</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {bookings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookings.slice(0, 2).map((b) => (
                      <div
                        key={b.id}
                        className="rounded-2xl border border-stone-200 bg-stone-50/60 p-5 flex items-center justify-between gap-4 shadow-2xs"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                            PASS ID: {b.bookingToken || b.id}
                          </span>
                          <h4 className="font-bold text-stone-900 text-sm mt-1">{b.destinationName}</h4>
                          <p className="text-xs text-stone-500">
                            {b.travelDate || 'Upcoming'} • {b.travellersCount || 1} {(b.travellersCount || 1) === 1 ? 'Traveler' : 'Travelers'} • ₹{(b.totalAmount || 0).toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={() => handleOpenQRPass(b)}
                          className="rounded-xl bg-stone-900 text-white px-4 py-2 text-xs font-bold hover:bg-black transition flex items-center gap-1.5 shrink-0 shadow-2xs"
                        >
                          <QrCode className="h-4 w-4" />
                          <span>View QR Pass</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center bg-stone-50/50 max-w-xl mx-auto space-y-3">
                    <QrCode className="h-10 w-10 text-stone-400 mx-auto" />
                    <h4 className="font-bold text-stone-800 text-sm">No Active Travel Pass Yet</h4>
                    <p className="text-xs text-stone-500">
                      Book any destination or tour package to instantly generate your cryptographically verifiable digital QR travel pass.
                    </p>
                    <button
                      onClick={() => handleNavigate('hidden-gems')}
                      className="rounded-xl bg-emerald-800 text-white px-4 py-2 text-xs font-bold hover:bg-emerald-900"
                    >
                      Book a Hidden Gem to Get Pass
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 9: ADMIN CAPACITY & QR VERIFIER PORTAL ON HOME                    */}
            {/* ========================================================================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-stone-200 bg-stone-900 text-white p-6 sm:p-10 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/80 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-700/50">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Tourism Authority Administration</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">
                    Tourism Control & Carrying Capacity Management
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Official tourism authority tools for monitoring carrying capacity, managing homestay quotas, and scanning digital travel QR passes at entry checkposts.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                  <div className="text-center sm:text-right">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Decongestion Metric</span>
                    <span className="text-xl font-bold text-emerald-400 font-mono">94.2% Success</span>
                  </div>

                  <button
                    onClick={() => handleNavigate('admin')}
                    className="rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-2.5 text-xs font-bold transition flex items-center gap-2 shadow-sm"
                  >
                    <span>Launch Admin Dashboard & Scanner</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ================== VIEW: ALL WEST BENGAL TOURIST PLACES ================= */}
        {/* ========================================================================= */}
        {currentView === 'explore' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* View Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 text-stone-700 px-3 py-1 text-xs font-bold border border-stone-200 mb-2">
                <Compass className="h-3.5 w-3.5 text-emerald-800" />
                <span>Statewide Tourist Directory</span>
              </div>
              <h1 className="text-3xl font-bold font-display text-stone-900">
                All Tourist Places of West Bengal
              </h1>
              <p className="text-xs text-stone-500 mt-1 max-w-2xl">
                Explore iconic tourist hubs and cultural landmarks across all 4 Bengal regions: North Bengal mountains, Rarh plateau, coastal deltas, and South Bengal heritage cities.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="rounded-3xl bg-white border border-stone-200 p-4 shadow-xs space-y-4">
              {/* Regional Circuits Tabs + Historical Places Dedicated Tab */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'All', label: `All Circuits (${destinations.length})`, type: 'region' },
                  { id: 'Historical Places', label: `🏛️ Historical Places (${historicalPlaces.length})`, type: 'historical' },
                  { id: 'North Bengal', label: `North Bengal (${destinations.filter(d => d.region === 'North Bengal').length})`, type: 'region' },
                  { id: 'Rarh Bengal', label: `Rarh Bengal (${destinations.filter(d => d.region === 'Rarh Bengal').length})`, type: 'region' },
                  { id: 'Coastal & Sundarbans', label: `Coastal & Sundarbans (${destinations.filter(d => d.region === 'Coastal & Sundarbans').length})`, type: 'region' },
                  { id: 'South Bengal', label: `South Bengal (${destinations.filter(d => d.region === 'South Bengal').length})`, type: 'region' },
                ].map((tab) => {
                  const isActive = tab.type === 'historical'
                    ? (categoryFilter === 'Historical Places' && regionFilter === 'All')
                    : (regionFilter === tab.id && categoryFilter !== 'Historical Places');

                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        if (tab.type === 'historical') {
                          setCategoryFilter('Historical Places');
                          setRegionFilter('All');
                        } else {
                          setRegionFilter(tab.id);
                          if (categoryFilter === 'Historical Places') {
                            setCategoryFilter('All');
                          }
                        }
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                        isActive
                          ? tab.type === 'historical'
                            ? 'bg-amber-900 text-amber-50 shadow-2xs font-bold'
                            : 'bg-emerald-800 text-white shadow-2xs font-bold'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Theme and Search Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-stone-100">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by name, district, or attraction..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 text-xs outline-none bg-stone-50/50 focus:bg-white focus:border-emerald-700"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
                  <span className="text-stone-500 whitespace-nowrap">Theme:</span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="rounded-xl border border-stone-300 p-1.5 text-xs bg-white outline-none font-medium"
                  >
                    <option value="All">All Themes</option>
                    <option value="Historical Places">🏛️ Historical & Heritage Places</option>
                    <option value="Heritage">Heritage & Architecture</option>
                    <option value="Hills">Hills & Mountains</option>
                    <option value="Tea gardens">Tea Gardens</option>
                    <option value="Forest">Forests & Wildlife</option>
                    <option value="Beaches">Beaches & Estuaries</option>
                    <option value="Cultural">Cultural & Art</option>
                    <option value="Rural tourism">Rural & Villages</option>
                    <option value="Peaceful Getaways">Peaceful Getaways</option>
                  </select>
                </div>
              </div>

              {/* Interactive Historical Era Bar when Historical category active */}
              {categoryFilter === 'Historical Places' && (
                <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-3.5 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Landmark className="h-4 w-4 text-amber-900" />
                      <span className="text-xs font-bold text-amber-950 font-display">
                        Historical & Dynastic Circuits of Bengal
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                      Archaeological Survey of India (ASI) & State Monuments
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    Filter historical monuments by dynastic era: medieval Bengal Sultanate (Gour/Pandua), Malla terracotta marvels (Bishnupur/Kalna), Nawabi palaces (Hazarduari/Plassey), European colonies (Chandannagar/Bandel), and freedom struggle forts.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      { label: 'All Historical Sites', query: '' },
                      { label: 'Medieval Sultanate (Gour & Pandua)', query: 'Gour' },
                      { label: '108 Terracotta Temples (Kalna & Bishnupur)', query: 'Terracotta' },
                      { label: 'Nawabi Splendor (Murshidabad & Plassey)', query: 'Murshidabad' },
                      { label: 'French & Portuguese (Chandannagar & Bandel)', query: 'French' },
                      { label: 'Royal Rajbari (Cooch Behar)', query: 'Cooch Behar' },
                      { label: 'Ancient Seaport & Shakti Peetha (Tamralipta)', query: 'Tamralipta' },
                      { label: 'Freedom Struggle (Buxa Fort)', query: 'Buxa' },
                    ].map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSearchQuery(chip.query)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition border ${
                          searchQuery === chip.query
                            ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-2xs font-bold'
                            : 'bg-white text-stone-700 hover:bg-amber-100/70 border-amber-200'
                        }`}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTouristPlaces.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  onViewDetails={handleViewDetails}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>

            {filteredTouristPlaces.length === 0 && (
              <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center max-w-md mx-auto">
                <Compass className="h-10 w-10 text-stone-300 mx-auto mb-2" />
                <h3 className="font-bold text-stone-800 text-sm">No matching tourist places found</h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">
                  Try clearing your search query or picking "All Circuits".
                </p>
                <button
                  onClick={() => {
                    setRegionFilter('All');
                    setCategoryFilter('All');
                    setSearchQuery('');
                  }}
                  className="rounded-xl bg-emerald-800 text-white px-4 py-2 text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ================= VIEW: UNTOUCHED HIDDEN GEMS OF BENGAL ================= */}
        {/* ========================================================================= */}
        {currentView === 'hidden-gems' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* View Header with Decongestion Badge */}
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-900 px-3 py-1 text-xs font-bold border border-emerald-300 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-700 animate-pulse" />
                <span>RouteX Decongestion Initiative • 100% Serene Sanctuaries</span>
              </div>
              <h1 className="text-3xl font-bold font-display text-stone-900">
                Untouched Hidden Gems of West Bengal
              </h1>
              <p className="text-xs text-stone-500 mt-1 max-w-2xl">
                Dedicated strictly to peaceful, low-crowd destinations across Bengal. Experience tranquil pine valleys, untouched coastal islands, and red-soil forests with authenticated eco-homestays.
              </p>
            </div>

            {/* Decongestion Advantage Banner */}
            <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-900 to-stone-900 text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider">
                  Sustainable Carrying Capacity
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-display">
                  Why Travel Offbeat with RouteX?
                </h3>
                <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
                  Hotspots like Darjeeling Mall and Digha face high crowd congestion and hotel price gouging.
                  Every hidden gem on this page guarantees verified quietude, local host warmth, and a direct digital QR check-in pass.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="rounded-2xl bg-white/10 p-3 text-center border border-white/10">
                  <span className="text-xl font-mono font-bold text-emerald-400">100%</span>
                  <span className="text-[10px] text-stone-300 block">Verified Homestays</span>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 text-center border border-white/10">
                  <span className="text-xl font-mono font-bold text-emerald-400">&lt;30%</span>
                  <span className="text-[10px] text-stone-300 block">Crowd Footfall</span>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="rounded-3xl bg-white border border-stone-200 p-4 shadow-xs space-y-4">
              {/* Region Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'All', label: `All Hidden Gems (${allHiddenGems.length})` },
                  { id: 'North Bengal', label: `Himalayan Pine & Tea (${allHiddenGems.filter(d => d.region === 'North Bengal').length})` },
                  { id: 'Rarh Bengal', label: `Red Soil & Lakes (${allHiddenGems.filter(d => d.region === 'Rarh Bengal').length})` },
                  { id: 'Coastal & Sundarbans', label: `Coastal & Estuary (${allHiddenGems.filter(d => d.region === 'Coastal & Sundarbans').length})` },
                  { id: 'South Bengal', label: `Rural Forests (${allHiddenGems.filter(d => d.region === 'South Bengal').length})` },
                ].map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setRegionFilter(reg.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                      regionFilter === reg.id
                        ? 'bg-emerald-800 text-white shadow-2xs font-bold'
                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {reg.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-stone-100">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search uncrowded gems by village, hill, or river..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 text-xs outline-none bg-stone-50/50 focus:bg-white focus:border-emerald-700"
                  />
                </div>

                <span className="text-xs text-emerald-800 font-semibold">
                  Showing {filteredHiddenGems.length} uncrowded retreats
                </span>
              </div>
            </div>

            {/* Hidden Gems Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHiddenGems.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  onViewDetails={handleViewDetails}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>

            {filteredHiddenGems.length === 0 && (
              <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center max-w-md mx-auto">
                <Sparkles className="h-10 w-10 text-emerald-700 mx-auto mb-2" />
                <h3 className="font-bold text-stone-800 text-sm">No hidden gems match your filter</h3>
                <p className="text-xs text-stone-500 mt-1 mb-4">
                  Try clearing your search query or switching to "All Hidden Gems".
                </p>
                <button
                  onClick={() => {
                    setRegionFilter('All');
                    setCategoryFilter('All');
                    setSearchQuery('');
                  }}
                  className="rounded-xl bg-emerald-800 text-white px-4 py-2 text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}


        {/* ===================== VIEW: TOUR PACKAGES ===================== */}
        {currentView === 'packages' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                All-Inclusive West Bengal Circuits
              </span>
              <h1 className="text-3xl font-bold font-display text-stone-900 mt-1">
                Curated Tour Packages
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Handpicked homestays, verified ground transportation, and licensed local escorts included.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {['All', 'Family', 'Friends', 'Couple', 'Solo'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPackageCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    packageCategoryFilter === cat
                      ? 'bg-emerald-800 text-white shadow-2xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {cat} Tours
                </button>
              ))}
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="relative aspect-16/10">
                    <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" />
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-emerald-800 shadow-2xs">
                      {pkg.category} Tour
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-800">{pkg.duration}</span>
                      <h3 className="font-display text-lg font-bold text-stone-900 mt-1">{pkg.title}</h3>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">{pkg.description}</p>

                      <div className="mt-4 space-y-1 text-xs text-stone-500">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-emerald-700" />
                          <span>{pkg.hotelTier}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Compass className="h-3.5 w-3.5 text-emerald-700" />
                          <span>{pkg.transportType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-semibold block">Starting Fare</span>
                        <span className="text-lg font-bold text-stone-900 font-mono">₹{pkg.startingPrice}</span>
                      </div>

                      <button
                        onClick={() => handleBookPackage(pkg)}
                        className="rounded-xl bg-emerald-800 text-white px-4 py-2 text-xs font-bold hover:bg-emerald-900 transition flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>Book Package</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== VIEW: AI TRIP PLANNER ===================== */}
        {currentView === 'ai-planner' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AITripPlanner
              onBookItinerary={(destName) => {
                const match = destinations.find(
                  d => d.name.toLowerCase().includes(destName.toLowerCase())
                ) || destinations[0];
                handleBookNow(match);
              }}
            />
          </div>
        )}

        {/* ===================== VIEW: MAP ===================== */}
        {currentView === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <InteractiveMap
              key="dedicated-map-view"
              destinations={destinations}
              onSelectDestination={handleViewDetails}
              onBookNow={handleBookNow}
            />
          </div>
        )}

        {/* ===================== VIEW: LIVE TRAVEL INTEL ===================== */}
        {currentView === 'live-intel' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TravelIntelligence />
          </div>
        )}

        {/* ===================== VIEW: SAFETY & SOS ===================== */}
        {currentView === 'safety' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SafetyCenter />
          </div>
        )}

        {/* ===================== VIEW: USER PROFILE / BOOKINGS ===================== */}
        {currentView === 'profile' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <UserProfile
              onOpenQRPass={handleOpenQRPass}
              onExploreDestination={handleViewDetails}
              onBookDestination={handleBookNow}
            />
          </div>
        )}

        {/* ===================== VIEW: ADMIN PANEL ===================== */}
        {currentView === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminDashboard />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* ===================== MODALS ===================== */}
      {/* Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onBookNow={(d) => {
          setIsDetailModalOpen(false);
          handleBookNow(d);
        }}
        onPlanAITrip={handlePlanAITripFromDest}
      />

      {/* 12-Step Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialDestination={selectedDestination}
        initialPackage={selectedPackageForBooking}
        onViewQRPass={(booking) => {
          setIsBookingModalOpen(false);
          handleOpenQRPass(booking);
        }}
      />

      {/* QR Travel Pass Modal */}
      <QRPassModal
        booking={selectedBookingForPass}
        isOpen={isQRPassModalOpen}
        onClose={() => setIsQRPassModalOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialRole={authRoleTarget}
        onSuccess={() => {
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
}
export default App;
