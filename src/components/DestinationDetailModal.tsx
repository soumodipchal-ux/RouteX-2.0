import React, { useState, useEffect } from 'react';
import { Destination, Review } from '../types';
import { CrowdIndicator } from './CrowdIndicator';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchLiveWeather } from '../services/apiService';
import {
  X,
  MapPin,
  Calendar,
  CloudSun,
  Wind,
  Droplets,
  Navigation,
  Building2,
  Utensils,
  Sparkles,
  ShieldCheck,
  Star,
  Heart,
  ArrowRight,
  Plane,
  Train,
  Car,
  Compass,
  CheckCircle2,
  PhoneCall,
  MessageSquare
} from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (dest: Destination) => void;
  onPlanAITrip: (dest: Destination) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  isOpen,
  onClose,
  onBookNow,
  onPlanAITrip,
}) => {
  const { savedDestinations, toggleWishlist, user } = useAuth();
  const { destinations, addDestinationReview } = useBooking();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'overview' | 'weather' | 'stays' | 'reach' | 'food' | 'reviews'>('overview');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [liveWeather, setLiveWeather] = useState(destination?.weather);

  // Review Form
  const [reviewAuthor, setReviewAuthor] = useState(user?.name || '');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    if (destination) {
      setSelectedPhotoIndex(0);
      fetchLiveWeather(destination.name).then(w => setLiveWeather(w));
    }
  }, [destination]);

  if (!isOpen || !destination) return null;

  const isSaved = savedDestinations.includes(destination.id);
  const photos = destination.gallery && destination.gallery.length > 0 ? destination.gallery : [destination.image];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    addDestinationReview(destination.id, {
      author: reviewAuthor || 'Verified Traveler',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      rating: reviewRating,
      comment: reviewComment,
    });

    setReviewComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border border-stone-200 my-6 max-h-[94vh] flex flex-col overflow-hidden">
        {/* Modal Top Header with Close and Actions */}
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4 bg-stone-50/80 shrink-0">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 text-xs">
              {destination.region}
            </span>
            <span className="text-xs text-stone-500">• {destination.district} District</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(destination.id)}
              className="rounded-full p-2 text-stone-600 hover:bg-stone-200/60 hover:text-rose-600 transition"
              title="Save to Wishlist"
            >
              <Heart
                className={`h-5 w-5 ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-stone-600'
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-stone-400 hover:bg-stone-200/60 hover:text-stone-700 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Photo Gallery Hero */}
          <div className="relative h-72 sm:h-96 w-full bg-stone-900 overflow-hidden">
            <img
              src={photos[selectedPhotoIndex] || destination.image}
              alt={destination.name}
              className="h-full w-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
                  {destination.name}
                </h1>
                <p className="text-emerald-300 font-serif text-sm italic mt-0.5">
                  {destination.bengaliName} • {destination.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 backdrop-blur-md px-3.5 py-1.5 border border-white/20 text-right">
                  <span className="text-[10px] uppercase text-white/80 block">Estimated Budget</span>
                  <span className="text-base font-bold text-white">₹{destination.estimatedBudget}/day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {photos.length > 1 && (
            <div className="flex gap-2 p-3 bg-stone-100 overflow-x-auto">
              {photos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`relative h-14 w-20 shrink-0 rounded-lg overflow-hidden border-2 transition ${
                    selectedPhotoIndex === idx ? 'border-emerald-700 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Nav Tabs */}
          <div className="flex border-b border-stone-200 px-6 bg-white sticky top-0 z-10 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'weather', label: 'Live Weather' },
              { id: 'stays', label: 'Homestays & Stays' },
              { id: 'reach', label: 'How to Reach' },
              { id: 'food', label: 'Local Food' },
              { id: 'reviews', label: `Reviews (${destination.reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-emerald-800 text-emerald-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="p-6 space-y-6">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-2">
                    About This Hidden Bengal Gem
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {destination.description}
                  </p>
                </div>

                {/* Live Crowd & Decongestion Section */}
                <div>
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-2">
                    Live Crowd & Tourism Volume
                  </h4>
                  <CrowdIndicator
                    level={destination.currentCrowdLevel}
                    footfallPercentage={destination.footfallPercentage}
                    alternatives={destination.crowdAlternatives}
                    allDestinations={destinations}
                    onSelectAlternative={(alt) => {
                      onClose();
                      // Re-open with the chosen quieter alternative
                      setTimeout(() => onBookNow(alt), 100);
                    }}
                  />
                </div>

                {/* Key Quick Facts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-stone-200 p-4 bg-stone-50/50">
                    <span className="text-[11px] uppercase font-semibold text-stone-400 block">Best Visiting Season</span>
                    <p className="text-sm font-bold text-stone-900 mt-1">{destination.bestTimeToVisit}</p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 p-4 bg-stone-50/50">
                    <span className="text-[11px] uppercase font-semibold text-stone-400 block">Ideal Duration</span>
                    <p className="text-sm font-bold text-stone-900 mt-1">{destination.duration}</p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 p-4 bg-stone-50/50">
                    <span className="text-[11px] uppercase font-semibold text-stone-400 block">From Kolkata</span>
                    <p className="text-sm font-bold text-stone-900 mt-1">{destination.distanceFromKolkata}</p>
                  </div>
                </div>

                {/* Activities & Experiences */}
                <div>
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-3">
                    Top Experiences & Trails
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(destination.activities || []).map((act, i) => (
                      <div key={i} className="flex items-center gap-2.5 rounded-xl border border-stone-200 p-3 bg-white">
                        <Sparkles className="h-4 w-4 text-emerald-700 shrink-0" />
                        <span className="text-xs font-medium text-stone-800">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Attractions */}
                <div>
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-3">
                    Nearby Attractions in Circuit
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(destination.nearbyAttractions || []).map((attr, i) => (
                      <span key={i} className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-700 font-medium">
                        📍 {attr}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verified Guides and Safety */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wide mb-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-700" />
                    Verified Tourist Safety & Escorts
                  </div>
                  <p className="text-xs text-stone-600 mb-3">
                    {destination.safetyStatus}. RouteX has verified licensed hill drivers, homestay caretakers, and forest guards.
                  </p>
                  <div className="space-y-1.5">
                    {(destination.localGuides || destination.verifiedGuides || []).map((guide: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-stone-200">
                        <div>
                          <span className="font-semibold text-stone-800">{guide.name}</span>
                          <span className="text-stone-500 ml-2">
                            ({Array.isArray(guide.languages) ? guide.languages.join(', ') : (guide.language || guide.languages || 'Bengali, English')})
                          </span>
                        </div>
                        <span className="text-emerald-800 font-mono text-[11px] font-semibold">{guide.phone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* LIVE WEATHER TAB */}
            {activeTab === 'weather' && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-stone-200 bg-gradient-to-br from-emerald-50/40 to-stone-50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Live Sensor Data</span>
                      <h4 className="text-3xl font-bold font-display text-stone-900 mt-1">
                        {liveWeather?.temp ?? destination.weather?.temp ?? 22}°C
                      </h4>
                      <p className="text-sm font-medium text-stone-700 mt-0.5">
                        {liveWeather?.condition ?? destination.weather?.condition ?? 'Pleasant Weather'}
                      </p>
                    </div>
                    <CloudSun className="h-16 w-16 text-amber-500" />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-stone-200/80 text-xs">
                    <div>
                      <span className="text-stone-400 block">Humidity</span>
                      <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5">
                        <Droplets className="h-3.5 w-3.5 text-blue-500" />
                        {liveWeather?.humidity ?? destination.weather?.humidity ?? 65}%
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Wind Velocity</span>
                      <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5">
                        <Wind className="h-3.5 w-3.5 text-stone-500" />
                        {liveWeather?.wind ?? destination.weather?.wind ?? '10 km/h'}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Rain Probability</span>
                      <span className="font-bold text-stone-800 mt-0.5 block">
                        {liveWeather?.rainProb ?? destination.weather?.rainProb ?? '15%'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3-Day Forecast */}
                <div>
                  <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wide mb-3">
                    Upcoming Microclimate Forecast
                  </h5>
                  <div className="grid grid-cols-3 gap-3">
                    {((liveWeather?.forecast && liveWeather.forecast.length > 0)
                      ? liveWeather.forecast
                      : (destination.weather?.forecast && destination.weather.forecast.length > 0)
                      ? destination.weather.forecast
                      : [
                          { day: 'Today', temp: `${destination.weather?.temp || 22}°C`, condition: destination.weather?.condition || 'Pleasant', rain: destination.weather?.rainProb || '10%' },
                          { day: 'Tomorrow', temp: `${(destination.weather?.temp || 22) + 1}°C`, condition: 'Clear Sky', rain: '10%' },
                          { day: 'Day 3', temp: `${(destination.weather?.temp || 22) - 1}°C`, condition: 'Mild Mist', rain: '15%' }
                        ]
                    ).map((f, i) => (
                      <div key={i} className="rounded-2xl border border-stone-200 p-4 bg-white text-center">
                        <span className="text-xs font-bold text-stone-500">{f.day}</span>
                        <p className="text-lg font-bold text-stone-900 my-1">{f.temp}</p>
                        <span className="text-xs text-stone-600 block">{f.condition}</span>
                        <span className="text-[10px] text-blue-600 font-medium block mt-1">Rain: {f.rain}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STAYS & HOMESTAYS TAB */}
            {activeTab === 'stays' && (
              <div className="space-y-4">
                <p className="text-xs text-stone-600">
                  RouteX directly partners with verified local homestay owners to ensure 100% of room tariffs benefit the village economy:
                </p>

                <div className="space-y-3">
                  {(destination.recommendedHotels || []).map((hotel, i) => (
                    <div key={i} className="rounded-2xl border border-stone-200 p-5 bg-white shadow-2xs hover:border-emerald-700/50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-stone-900 text-sm">{hotel.name}</h5>
                            <span className="rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 text-[10px] font-semibold">
                              {hotel.type}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
                            {hotel.rating} Rating
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-emerald-800 font-mono">{hotel.priceRange}</span>
                          <span className="text-[10px] text-stone-400 block">per night</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3 text-xs">
                        <span className="text-stone-500 font-mono">Contact: {hotel.contact}</span>
                        <button
                          onClick={() => onBookNow(destination)}
                          className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
                        >
                          Book via RouteX Pass
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HOW TO REACH TAB */}
            {activeTab === 'reach' && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-stone-200 p-4 bg-white space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-blue-50 p-2 text-blue-700 shrink-0">
                      <Train className="h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-stone-900 uppercase">By Train</h5>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{destination.howToReach?.train || 'Nearest railway station connect via local express trains.'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                    <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700 shrink-0">
                      <Car className="h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-stone-900 uppercase">By Road</h5>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{destination.howToReach?.road || 'Accessible via State & National Highway network.'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                    <div className="rounded-xl bg-purple-50 p-2 text-purple-700 shrink-0">
                      <Plane className="h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-stone-900 uppercase">By Air</h5>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{destination.howToReach?.flight || 'Fly to nearest airport (Netaji Subhash Chandra Bose Intl / Bagdogra).'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LOCAL FOOD TAB */}
            {activeTab === 'food' && (
              <div className="space-y-4">
                <p className="text-xs text-stone-600">
                  Must-try regional Bengali, tribal, and hill delicacies prepared with fresh forest and farm produce:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(destination.localFood || []).map((dish, i) => {
                    const dishName = typeof dish === 'string' ? dish : (dish as any).name;
                    const dishDesc = typeof dish === 'string' ? 'Authentic regional delicacy prepared with fresh local ingredients' : (dish as any).description;
                    return (
                      <div key={i} className="rounded-2xl border border-stone-200 p-4 bg-white shadow-2xs">
                        <div className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-emerald-700 shrink-0" />
                          <h5 className="text-xs font-bold text-stone-900">{dishName}</h5>
                        </div>
                        <p className="text-xs text-stone-500 mt-1">{dishDesc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="space-y-5">
                {/* Submit Review */}
                <form onSubmit={handleReviewSubmit} className="rounded-2xl border border-stone-200 p-5 bg-stone-50/70 space-y-3">
                  <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                    Share Your RouteX Verified Experience
                  </h5>

                  {reviewSuccess && (
                    <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-medium">
                      Thank you! Your verified review has been published.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-stone-300 bg-white outline-none"
                    />

                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-stone-300">
                      <span className="text-xs text-stone-500">Rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setReviewRating(s)}
                            className="text-amber-400 hover:scale-110 transition"
                          >
                            <Star className={`h-4 w-4 ${s <= reviewRating ? 'fill-amber-400' : 'text-stone-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Tell other travelers about road conditions, homestay hospitality, or scenic secret viewpoints..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-300 bg-white outline-none"
                  />

                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-800 text-white px-4 py-2 text-xs font-semibold hover:bg-emerald-900 transition"
                  >
                    Post Review
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-3">
                  {(destination.reviews || []).map((rev) => (
                    <div key={rev.id} className="rounded-2xl border border-stone-200 p-4 bg-white">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-xs">{rev.author}</span>
                          {rev.verifiedBooking && (
                            <span className="rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 border border-emerald-200">
                              Verified Traveler
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                          <span className="text-xs font-bold text-stone-800">{rev.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">{rev.text || (rev as any).comment}</p>
                      <span className="text-[10px] text-stone-400 mt-2 block">{rev.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Footer with Booking CTA */}
        <div className="border-t border-stone-200 p-4 px-6 bg-white shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-semibold text-stone-400">All-Inclusive Starting Budget</span>
            <p className="text-lg font-bold text-stone-900">
              ₹{destination.estimatedBudget * 3}
              <span className="text-xs font-normal text-stone-500"> (3D/2N Estimated)</span>
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onPlanAITrip(destination)}
              className="flex-1 sm:flex-initial rounded-xl border border-emerald-800 text-emerald-800 px-4 py-2.5 text-xs font-bold hover:bg-emerald-50 transition"
            >
              Plan with RouteX AI
            </button>
            <button
              onClick={() => onBookNow(destination)}
              className="flex-1 sm:flex-initial rounded-xl bg-emerald-800 text-white px-5 py-2.5 text-xs font-bold shadow-xs hover:bg-emerald-900 transition flex items-center justify-center gap-1.5"
            >
              <span>{t('bookThisDestination')}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
