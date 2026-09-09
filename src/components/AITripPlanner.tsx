import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { generateAITripItinerary } from '../services/apiService';
import { AIItinerary, TravelType } from '../types';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  Compass, 
  MapPin, 
  IndianRupee, 
  CheckCircle2, 
  Sun, 
  ShieldCheck, 
  Luggage, 
  Printer, 
  Bookmark, 
  ArrowRight,
  Clock,
  Car,
  Utensils,
  Building2,
  Share2
} from 'lucide-react';

interface AITripPlannerProps {
  initialDestinationName?: string;
  onBookItinerary: (destinationName: string) => void;
}

export const AITripPlanner: React.FC<AITripPlannerProps> = ({
  initialDestinationName,
  onBookItinerary,
}) => {
  const { user } = useAuth();
  const { saveAIItinerary } = useBooking();

  // Inputs
  const [budget, setBudget] = useState<number>(18000);
  const [days, setDays] = useState<number>(3);
  const [travelDate, setTravelDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [travellers, setTravellers] = useState<number>(2);
  const [travelType, setTravelType] = useState<TravelType>('Family');
  const [startingLocation, setStartingLocation] = useState<string>('Kolkata');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Mountains',
    'Tea Tourism',
    'Slow Travel',
    'Authentic Food',
  ]);

  // Loading & Result states
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<AIItinerary | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const interestOptions = [
    'Mountains',
    'Forests',
    'Beaches & Coast',
    'Heritage & Temples',
    'Wildlife & Birding',
    'Tribal Culture',
    'Tea Tourism',
    'Authentic Food',
    'Photography',
    'Slow Travel',
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setIsSaved(false);

    try {
      const result = await generateAITripItinerary({
        budget,
        days,
        travelDate,
        travellers,
        travelType,
        startingLocation,
        interests: selectedInterests,
      });
      setItinerary(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!itinerary) return;
    saveAIItinerary(itinerary);
    setIsSaved(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-3xl bg-white border border-stone-200 shadow-sm p-6 sm:p-8">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200/80 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
          <span>Powered by RouteX Smart Engine & Google Gemini</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 tracking-tight">
          AI Offbeat Trip Planner
        </h2>
        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
          Customized West Bengal itineraries created instantly to avoid crowded tourist bottlenecks,
          respect local carrying capacity, and maximize homestay authenticity.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleGenerate} className="space-y-6 rounded-2xl bg-stone-50/70 p-6 border border-stone-200/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Starting Location */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Starting City / Station
            </label>
            <select
              value={startingLocation}
              onChange={(e) => setStartingLocation(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-white p-2.5 text-xs font-medium text-stone-800 outline-none focus:border-emerald-600"
            >
              <option value="Kolkata (Howrah / Sealdah / Airport)">Kolkata (Howrah / Sealdah / Airport)</option>
              <option value="Siliguri / New Jalpaiguri (NJP)">Siliguri / New Jalpaiguri (NJP)</option>
              <option value="Asansol / Durgapur">Asansol / Durgapur</option>
              <option value="Malda Town">Malda Town</option>
              <option value="Kharagpur">Kharagpur</option>
            </select>
          </div>

          {/* Travel Date */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Trip Start Date
            </label>
            <div className="relative flex items-center">
              <Calendar className="absolute left-3 h-4 w-4 text-emerald-700" />
              <input
                type="date"
                value={travelDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 bg-white text-xs font-medium outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Travellers & Type */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Travellers
              </label>
              <select
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value))}
                className="w-full rounded-xl border border-stone-300 bg-white p-2.5 text-xs font-medium text-stone-800 outline-none focus:border-emerald-600"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Person' : 'People'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Travel Style
              </label>
              <select
                value={travelType}
                onChange={(e) => setTravelType(e.target.value as TravelType)}
                className="w-full rounded-xl border border-stone-300 bg-white p-2.5 text-xs font-medium text-stone-800 outline-none focus:border-emerald-600"
              >
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Couple">Couple</option>
                <option value="Solo">Solo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sliders: Duration & Total Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div>
            <div className="flex justify-between text-xs font-semibold text-stone-700 mb-2">
              <span>Trip Duration</span>
              <span className="text-emerald-800 font-bold">{days} Days / {days - 1} Nights</span>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>1 Day Quick Weekend</span>
              <span>4 Days Deep Route</span>
              <span>8 Days Grand Bengal</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-stone-700 mb-2">
              <span>Approximate Total Budget</span>
              <span className="text-emerald-800 font-bold">₹{budget.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={60000}
              step={2000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>₹5,000 (Backpacker)</span>
              <span>₹25,000 (Comfortable)</span>
              <span>₹60,000+ (Heritage Luxury)</span>
            </div>
          </div>
        </div>

        {/* Travel Interests Pills */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-2">
            Select Your Interests (RouteX AI prioritizes matching hidden places):
          </label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((interest) => {
              const active = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition ${
                    active
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-2xs'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-8 py-3.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-900 disabled:opacity-50 transition"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isGenerating ? 'Synthesizing Decongested Itinerary...' : 'Generate RouteX Itinerary with AI'}</span>
          </button>
        </div>
      </form>

      {/* Generated Itinerary Output */}
      {itinerary && (
        <div className="mt-8 space-y-6 border-t border-stone-200 pt-8">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50/50 p-6 rounded-3xl border border-emerald-200">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                {itinerary.region} • {days} Days Itinerary
              </span>
              <h3 className="text-2xl font-bold font-display text-stone-900 mt-1">
                {itinerary.title}
              </h3>
              <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                {itinerary.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 shadow-2xs transition"
              >
                <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-emerald-700 text-emerald-700' : ''}`} />
                <span>{isSaved ? 'Saved to Profile' : 'Save Itinerary'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 shadow-2xs transition"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Quick Intelligence Row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-stone-200 p-4 bg-white">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Estimated Budget</span>
              <p className="text-sm font-bold text-stone-900 mt-1">{itinerary.estimatedTotalCost}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 p-4 bg-white">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Recommended Transport</span>
              <p className="text-sm font-bold text-stone-900 mt-1">{itinerary.recommendedTransport}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 p-4 bg-white">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Crowd Strategy</span>
              <p className="text-xs font-medium text-emerald-800 mt-1">{itinerary.crowdTip}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 p-4 bg-white">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Safety Protocol</span>
              <p className="text-xs font-medium text-stone-700 mt-1">{itinerary.safetyAdvice}</p>
            </div>
          </div>

            {/* Day-by-Day Timeline */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-stone-900 font-display">
                Day-by-Day Route Timeline
              </h4>

              {(itinerary.days || []).map((day) => (
                <div
                  key={day.dayNumber}
                  className="rounded-2xl border border-stone-200 p-5 bg-white shadow-2xs hover:border-emerald-700/30 transition"
                >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-800 text-white font-bold text-xs">
                      D{day.dayNumber}
                    </span>
                    <div>
                      <h5 className="font-bold text-stone-900 text-sm">{day.title}</h5>
                      <span className="text-xs text-emerald-800 font-medium">📍 {day.destination}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBookItinerary(day.destination)}
                    className="self-start sm:self-auto text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                  >
                    <span>Book homestay here</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 text-xs">
                  <div>
                    <span className="font-bold text-stone-800 flex items-center gap-1 mb-1">
                      <Sun className="h-3.5 w-3.5 text-amber-500" /> Morning
                    </span>
                    <p className="text-stone-600 leading-relaxed">{day.morning}</p>
                  </div>

                  <div>
                    <span className="font-bold text-stone-800 flex items-center gap-1 mb-1">
                      <Clock className="h-3.5 w-3.5 text-blue-500" /> Afternoon
                    </span>
                    <p className="text-stone-600 leading-relaxed">{day.afternoon}</p>
                  </div>

                  <div>
                    <span className="font-bold text-stone-800 flex items-center gap-1 mb-1">
                      <Compass className="h-3.5 w-3.5 text-purple-500" /> Evening & Sunset
                    </span>
                    <p className="text-stone-600 leading-relaxed">{day.evening}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-xl bg-stone-50 p-3 text-xs border border-stone-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-emerald-700" />
                    <span className="text-stone-500">Stay:</span>
                    <span className="font-medium text-stone-800">{day.stay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Utensils className="h-3.5 w-3.5 text-emerald-700" />
                    <span className="text-stone-500">Cuisine:</span>
                    <span className="font-medium text-stone-800">{day.dining}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Packing Essentials */}
          {itinerary.packingEssentials && itinerary.packingEssentials.length > 0 && (
            <div className="rounded-2xl border border-stone-200 p-5 bg-stone-50/50">
              <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <Luggage className="h-4 w-4 text-emerald-700" />
                RouteX Recommended Packing Checklist
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {(itinerary.packingEssentials || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
