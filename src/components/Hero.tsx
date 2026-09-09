import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  CloudSun,
  Leaf
} from 'lucide-react';
import { TravelType } from '../types';

interface HeroProps {
  onSearch: (params: { query: string; travelDate: string; travellers: number; travelType: TravelType }) => void;
  onExploreGems: () => void;
  onPlanTrip: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onExploreGems, onPlanTrip }) => {
  const { t } = useLanguage();

  const [query, setQuery] = useState('');
  const [travelDate, setTravelDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [travellers, setTravellers] = useState(2);
  const [travelType, setTravelType] = useState<TravelType>('Family');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, travelDate, travellers, travelType });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-stone-900 mx-4 sm:mx-6 lg:mx-8 mt-4 mb-10 shadow-md">
      {/* Background High-Quality Photograph with light subtle gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85"
          alt="West Bengal Landscape"
          className="h-full w-full object-cover opacity-35 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/70 to-stone-900/40" />
      </div>

      <div className="relative z-10 px-6 py-14 sm:py-20 lg:py-24 max-w-5xl mx-auto text-center">
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-400/20 backdrop-blur-md mb-6 shadow-xs">
          <Leaf className="h-3.5 w-3.5 text-emerald-400" />
          <span>{t('tagline')}</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-tight max-w-4xl mx-auto">
          {t('heroHeadline')}
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
          {t('heroSubheadline')}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onExploreGems}
            className="rounded-2xl bg-emerald-700 hover:bg-emerald-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-950/50 transition flex items-center gap-2"
          >
            <span>{t('exploreHiddenGems')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onPlanTrip}
            className="rounded-2xl bg-white/15 hover:bg-white/25 px-6 py-3.5 text-xs font-bold text-white border border-white/20 backdrop-blur-md transition flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>{t('planMyTrip')}</span>
          </button>
        </div>

        {/* Search Engine Bar */}
        <div className="mt-12 w-full max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-3 sm:p-4 shadow-2xl border border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left"
          >
            {/* Destination query */}
            <div className="lg:col-span-2 p-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                Destination in Bengal
              </label>
              <div className="relative flex items-center">
                <MapPin className="h-4 w-4 text-emerald-700 absolute left-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Lepchajagat, Mousuni, Takdah..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs font-semibold text-stone-900 placeholder:text-stone-400 outline-none"
                />
              </div>
            </div>

            {/* Travel Date */}
            <div className="p-2 border-t sm:border-t-0 sm:border-l border-stone-100">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                {t('travelDate')}
              </label>
              <div className="relative flex items-center">
                <Calendar className="h-4 w-4 text-emerald-700 absolute left-2" />
                <input
                  type="date"
                  value={travelDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full pl-7 pr-1 py-1.5 text-xs font-semibold text-stone-900 outline-none"
                />
              </div>
            </div>

            {/* Travellers & Travel Style */}
            <div className="p-2 border-t lg:border-t-0 lg:border-l border-stone-100">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                Travel Style
              </label>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-emerald-700 shrink-0" />
                <select
                  value={travelType}
                  onChange={(e) => setTravelType(e.target.value as TravelType)}
                  className="w-full py-1 text-xs font-semibold text-stone-900 outline-none bg-transparent cursor-pointer"
                >
                  <option value="Family">Family Tour</option>
                  <option value="Friends">Friends Tour</option>
                  <option value="Couple">Couple Tour</option>
                  <option value="Solo">Solo Tour</option>
                </select>
              </div>
            </div>

            {/* Search Route Action */}
            <div className="flex items-center p-1">
              <button
                type="submit"
                className="w-full h-full rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-3 px-4 shadow-sm transition flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                <span>{t('searchBtn')}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footfall Decongestion Badge */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Live Crowd Decongestion
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <CloudSun className="h-4 w-4 text-amber-300" />
            Verified Microclimate Telemetry
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-emerald-400" />
            Digital QR Travel Passes
          </span>
        </div>
      </div>
    </div>
  );
};
