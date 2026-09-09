import React from 'react';
import { Destination } from '../types';
import { CrowdIndicator } from './CrowdIndicator';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Star, 
  ArrowRight, 
  Sparkles, 
  CloudSun,
  ShieldCheck 
} from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onViewDetails: (destination: Destination) => void;
  onBookNow: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onViewDetails,
  onBookNow,
}) => {
  const { savedDestinations, toggleWishlist } = useAuth();
  const { t } = useLanguage();

  const isSaved = savedDestinations.includes(destination.id);

  return (
    <div className="group flex flex-col rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-emerald-700/30 transition-all duration-300 overflow-hidden">
      {/* Photo Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-stone-800 backdrop-blur-xs shadow-2xs border border-stone-200/50">
              {destination.district}
            </span>
            {((Array.isArray(destination.category) && (destination.category.includes('Historical Places') || destination.category.includes('Heritage'))) || (destination.category as any) === 'Historical Places') && (
              <span className="rounded-full bg-amber-950/90 text-amber-200 px-2 py-0.5 text-[10px] font-bold backdrop-blur-xs border border-amber-500/40 shadow-2xs">
                🏛️ Heritage
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(destination.id);
            }}
            className="rounded-full bg-white/90 p-2 text-stone-700 hover:bg-white hover:text-rose-600 backdrop-blur-xs shadow-2xs transition"
            aria-label="Save to Wishlist"
          >
            <Heart
              className={`h-4 w-4 ${
                isSaved ? 'fill-rose-500 text-rose-500' : 'text-stone-700'
              }`}
            />
          </button>
        </div>

        {/* Bottom Badges within Photo */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <CrowdIndicator
            level={destination.currentCrowdLevel}
            compact
          />

          <div className="flex items-center gap-1 rounded-full bg-stone-900/80 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs">
            <CloudSun className="h-3.5 w-3.5 text-amber-300" />
            <span>{destination.weather.temp}°C</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title and Rating */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
              {destination.name}
            </h3>
            <p className="text-xs font-serif text-stone-500 italic">
              {destination.bengaliName}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-bold text-amber-900 border border-amber-200/60 shrink-0">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span>{destination.rating}</span>
            <span className="text-[10px] font-normal text-amber-700">({destination.reviewCount})</span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
          {destination.shortDescription}
        </p>

        {/* Meta Info Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-stone-100 pt-3 text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">{destination.distance || destination.distanceFromKolkata || ''}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">{destination.bestTimeToVisit.split(',')[0]}</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-stone-100">
          <div>
            <span className="text-[10px] uppercase font-semibold text-stone-400">Estimated Budget</span>
            <p className="text-sm font-bold text-stone-900">
              ₹{destination.estimatedBudget}
              <span className="text-[11px] font-normal text-stone-500"> /day</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(destination)}
              className="rounded-xl border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition"
            >
              {t('viewDetails')}
            </button>
            <button
              onClick={() => onBookNow(destination)}
              className="rounded-xl bg-emerald-800 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-900 transition flex items-center gap-1"
            >
              <span>{t('bookNow')}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
