import React, { useState } from 'react';
import { Destination, TourPackage, TravelType, Booking } from '../types';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Calendar, 
  Users, 
  Compass, 
  Building2, 
  Car, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  ArrowRight,
  Phone,
  Mail,
  User as UserIcon,
  Clock,
  AlertCircle
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: Destination | null;
  initialPackage?: TourPackage | null;
  onViewQRPass: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialDestination,
  initialPackage,
  onViewQRPass,
}) => {
  const { user, isAuthenticated, loginWithGoogle, sendMobileOtp, verifyMobileOtp } = useAuth();
  const { destinations, tourPackages, createBooking } = useBooking();

  // 12-Step sequence
  const [step, setStep] = useState<number>(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Step 1: Destination & Package Selection
  const [selectedDestId, setSelectedDestId] = useState<string>(
    initialDestination?.id || initialPackage?.destinationId || destinations[0]?.id || 'lepchajagat'
  );
  const [selectedPkgId, setSelectedPkgId] = useState<string>(
    initialPackage?.id || ''
  );

  // Step 2: Travel Date
  const [travelDate, setTravelDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d.toISOString().split('T')[0];
  });

  // Step 3: Travellers Count
  const [travellersCount, setTravellersCount] = useState<number>(2);

  // Step 4: Travel Type
  const [travelType, setTravelType] = useState<TravelType>(
    initialPackage?.category || 'Family'
  );

  // Step 5: Hotel Selection
  const [selectedHotelTier, setSelectedHotelTier] = useState<string>(
    'Eco Village Homestay (Recommended)'
  );

  // Step 6: Transport Selection
  const [selectedTransport, setSelectedTransport] = useState<string>(
    'Private AC Sedan / Hatchback with Verified Hill Driver'
  );

  // Step 7: Optional Activities
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    'Guided Sunrise Trail & Birdwatching Walk',
  ]);

  // Step 9: Guest / Traveler Info
  const [guestName, setGuestName] = useState<string>(user?.name || 'Soumodip Chal');
  const [guestEmail, setGuestEmail] = useState<string>(user?.email || 'soumodipchal@gmail.com');
  const [guestPhone, setGuestPhone] = useState<string>(user?.phone || '+91 98301 22345');

  // Step 10: Payment details
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'pay_at_homestay'>('upi');
  const [upiId, setUpiId] = useState('soumodip@okaxis');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Step 11 & 12: Created Booking result
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Sync state whenever modal opens or props change
  React.useEffect(() => {
    if (isOpen) {
      if (initialDestination) {
        setSelectedDestId(initialDestination.id);
      }
      if (initialPackage) {
        setSelectedPkgId(initialPackage.id);
        setSelectedDestId(initialPackage.destinationId);
        setTravelType(initialPackage.category);
      }
      setStep(1);
      setValidationError(null);
      setConfirmedBooking(null);
    }
  }, [isOpen, initialDestination, initialPackage]);

  // Sync user info if auth changes
  React.useEffect(() => {
    if (user) {
      if (user.name) setGuestName(user.name);
      if (user.email) setGuestEmail(user.email);
      if (user.phone) setGuestPhone(user.phone);
    }
  }, [user]);

  if (!isOpen) return null;

  const currentDestination = destinations.find(d => d.id === selectedDestId) || destinations[0];
  const currentPackage = tourPackages.find(p => p.id === selectedPkgId);

  // Price Calculation Logic
  const baseDayRate = currentPackage 
    ? Math.round(currentPackage.startingPrice / 3) 
    : (currentDestination?.estimatedBudget || 2000);
  
  const hotelSurcharge = selectedHotelTier.includes('Heritage') ? 1200 : selectedHotelTier.includes('Resort') ? 800 : 0;
  const transportRate = selectedTransport.includes('Innova') ? 3200 : 2200;
  const activitiesTotal = selectedActivities.length * 450;
  const subTotal = (baseDayRate * travellersCount * 3) + (hotelSurcharge * 2) + transportRate + activitiesTotal;
  const gst = Math.round(subTotal * 0.05);
  const grandTotal = subTotal + gst;

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity) ? prev.filter(a => a !== activity) : [...prev, activity]
    );
  };

  // Step Validation Logic
  const validateStep = (currentStep: number): { valid: boolean; error?: string } => {
    switch (currentStep) {
      case 1:
        if (!selectedDestId) {
          return { valid: false, error: 'Please select a destination to proceed.' };
        }
        return { valid: true };
      case 2:
        if (!travelDate) {
          return { valid: false, error: 'Please choose your journey departure date.' };
        }
        const chosen = new Date(travelDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(chosen.getTime()) || chosen.getTime() < today.getTime()) {
          return { valid: false, error: 'Travel date must be today or a future date.' };
        }
        return { valid: true };
      case 3:
        if (!travellersCount || travellersCount < 1) {
          return { valid: false, error: 'Please select at least 1 traveler.' };
        }
        return { valid: true };
      case 4:
        if (!travelType) {
          return { valid: false, error: 'Please choose your preferred travel style.' };
        }
        return { valid: true };
      case 5:
        if (!selectedHotelTier || !selectedHotelTier.trim()) {
          return { valid: false, error: 'Please select your preferred lodging tier.' };
        }
        return { valid: true };
      case 6:
        if (!selectedTransport || !selectedTransport.trim()) {
          return { valid: false, error: 'Please select a ground transportation option.' };
        }
        return { valid: true };
      case 7:
        // Experiences are optional
        return { valid: true };
      case 8:
        // Review summary
        return { valid: true };
      case 9:
        if (!guestName || guestName.trim().length < 2) {
          return { valid: false, error: 'Please enter the lead traveler full name (at least 2 characters).' };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!guestEmail || !emailRegex.test(guestEmail.trim())) {
          return { valid: false, error: 'Please enter a valid email address for pass and receipt delivery.' };
        }
        const cleanPhone = guestPhone.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
          return { valid: false, error: 'Please enter a valid 10-digit mobile number for host SMS notifications.' };
        }
        return { valid: true };
      case 10:
        if (paymentMethod === 'upi') {
          if (!upiId.trim() || !upiId.includes('@')) {
            return { valid: false, error: 'Please enter a valid UPI ID (e.g. yourname@bank or 9830122345@upi).' };
          }
        }
        return { valid: true };
      default:
        return { valid: true };
    }
  };

  const handleNext = () => {
    const check = validateStep(step);
    if (!check.valid) {
      setValidationError(check.error || 'Please fill in the required field.');
      return;
    }
    setValidationError(null);
    if (step < 12) setStep(step + 1);
  };

  const handleBack = () => {
    setValidationError(null);
    if (step > 1) setStep(step - 1);
  };

  // Payment Execution & QR pass creation
  const handleExecutePayment = () => {
    const check = validateStep(10);
    if (!check.valid) {
      setValidationError(check.error || 'Please verify payment details.');
      return;
    }
    setValidationError(null);
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const newBooking = createBooking({
        userId: user?.id || `usr-guest-${Date.now()}`,
        customerName: guestName.trim(),
        customerEmail: guestEmail.trim(),
        customerPhone: guestPhone.trim(),
        destinationId: currentDestination.id,
        destinationName: currentDestination.name,
        packageId: currentPackage?.id,
        packageName: currentPackage?.title || `${currentDestination.name} Bespoke Hidden Route`,
        travelDate,
        travellersCount,
        travelType,
        hotelSelected: selectedHotelTier,
        transportSelected: selectedTransport,
        optionalActivities: selectedActivities,
        totalAmount: grandTotal,
        paymentMethod: paymentMethod === 'upi' ? `UPI (${upiId.trim()})` : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Pay at Homestay (20% Advance Token)',
      });
      setConfirmedBooking(newBooking);
      setStep(11); // Move to Step 11: Confirmation
    }, 1000);
  };

  const hotelOptions = [
    {
      title: 'Eco Village Homestay (Recommended)',
      desc: 'Authentic local family host, organic meals, solar heating, clean private room.',
      priceAdd: 'Included',
    },
    {
      title: 'Colonial Heritage Bungalow / Stone Cottage',
      desc: '19th-century British stone bungalow with private fireplace and pine lawn.',
      priceAdd: '+₹1,200/night',
    },
    {
      title: 'Lakeside Nature Camp / Beach Canvas Tent',
      desc: 'Weather-proof insulated tents with comfortable cots and outdoor starry skies.',
      priceAdd: 'Included',
    },
  ];

  const transportOptions = [
    {
      title: 'Private AC Sedan / Hatchback with Verified Hill Driver',
      desc: 'Dedicated vehicle for station/airport pickup and sightseeing.',
      badge: 'Most Popular',
    },
    {
      title: 'Spacious AC Innova / Scorpio (Ideal for Families & Hills)',
      desc: 'High ground clearance, expert hill driver, extra luggage space.',
      badge: 'Comfort',
    },
    {
      title: 'Self-Arranged / Train + Local Shared Escort',
      desc: 'RouteX local station coordinator assists your shared connections.',
      badge: 'Budget Eco',
    },
  ];

  const availableActivities = currentDestination?.activities || [
    'Guided Sunrise Trail & Birdwatching Walk',
    'Local Handicrafts & Artisan Studio Workshop',
    'Traditional Feast & Campfire Evening',
    'Tea Garden Plucking & Tasting Masterclass',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 my-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase">
              Step {step} of 12
            </span>
            <h3 className="text-xl font-bold text-stone-900 font-display">
              {step === 1 && 'Select Destination & Package'}
              {step === 2 && 'Select Travel Date'}
              {step === 3 && 'Number of Travellers'}
              {step === 4 && 'Select Travel Type'}
              {step === 5 && 'Select Accommodation'}
              {step === 6 && 'Select Transportation'}
              {step === 7 && 'Add Curated Local Experiences'}
              {step === 8 && 'Review Complete Booking Summary'}
              {step === 9 && 'Traveler Authentication & Contact'}
              {step === 10 && 'Secure Payment (Razorpay Simulated)'}
              {step === 11 && 'Booking Confirmation'}
              {step === 12 && 'Generate Digital QR Travel Pass'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-stone-100 h-1.5 my-3 rounded-full overflow-hidden">
          <div
            className="bg-emerald-700 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 12) * 100}%` }}
          />
        </div>

        {/* Validation Error Alert */}
        {validationError && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 flex items-center gap-2.5 text-xs text-rose-800 animate-fadeIn mb-2 shrink-0">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span className="font-medium">{validationError}</span>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto py-2 pr-1 space-y-4">
          {/* STEP 1: DESTINATION & PACKAGE */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-stone-600">
                Choose the hidden gem or tailored tour package you wish to explore in West Bengal:
              </p>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Select Destination
                </label>
                <select
                  value={selectedDestId}
                  onChange={(e) => {
                    setSelectedDestId(e.target.value);
                    setSelectedPkgId('');
                  }}
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 bg-white shadow-xs focus:border-emerald-600 outline-none"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.district}, {d.region}) — {d.currentCrowdLevel} Crowd
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Or Choose a Pre-Curated Tour Package (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tourPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        setSelectedPkgId(pkg.id);
                        setSelectedDestId(pkg.destinationId);
                        setTravelType(pkg.category);
                      }}
                      className={`cursor-pointer rounded-2xl p-4 border transition ${
                        selectedPkgId === pkg.id
                          ? 'border-emerald-700 bg-emerald-50/60 ring-2 ring-emerald-700/20'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                          {pkg.category} Tour
                        </span>
                        <span className="text-xs font-bold text-stone-900">
                          ₹{pkg.startingPrice}
                        </span>
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm mt-2">{pkg.title}</h4>
                      <p className="text-xs text-stone-500 mt-1">{pkg.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TRAVEL DATE */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-stone-600">
                Pick your arrival date. RouteX live monitoring confirms favorable crowd and weather conditions for this window.
              </p>
              <div className="rounded-2xl border border-stone-200 p-6 bg-stone-50/50">
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Departure Date from Home / Kolkata / NJP
                </label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3.5 h-5 w-5 text-emerald-700" />
                  <input
                    type="date"
                    value={travelDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-300 bg-white text-sm font-medium outline-none focus:border-emerald-600"
                  />
                </div>
                <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                  <span>
                    Forecast for {travelDate}: {currentDestination?.weather.condition}, {currentDestination?.weather.temp}°C. Recommended Visiting Time: {currentDestination?.bestTimeToVisit}.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: NUMBER OF TRAVELLERS */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-stone-600">
                How many travelers will be embarking on this journey?
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setTravellersCount(num)}
                    className={`p-4 rounded-2xl border text-center font-bold text-sm transition ${
                      travellersCount === num
                        ? 'border-emerald-700 bg-emerald-800 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <Users className="h-5 w-5 mx-auto mb-1.5 opacity-80" />
                    <span>{num} {num === 1 ? 'Traveler' : 'Travelers'}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-stone-400 text-center">
                Kids under 5 years travel free with family passes.
              </p>
            </div>
          )}

          {/* STEP 4: TRAVEL TYPE */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-stone-600">
                Select your travel style so we can tailor local hosts, pacing, and amenities:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(['Family', 'Friends', 'Couple', 'Solo'] as TravelType[]).map((type) => (
                  <div
                    key={type}
                    onClick={() => setTravelType(type)}
                    className={`cursor-pointer rounded-2xl p-4 border transition ${
                      travelType === type
                        ? 'border-emerald-700 bg-emerald-50/60 ring-2 ring-emerald-700/20'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                      <Compass className="h-4 w-4 text-emerald-700" />
                      <span>{type} Travel</span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">
                      {type === 'Family' && 'Child-friendly pacing, safe homestays, home-cooked food.'}
                      {type === 'Friends' && 'Adventure activities, campfires, trekking & group photography.'}
                      {type === 'Couple' && 'Private panoramic cottages, candlelit tea tastings, calm intimacy.'}
                      {type === 'Solo' && 'Verified safe solo protocols, budget stays, independent slow travel.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: HOTEL SELECTION */}
          {step === 5 && (
            <div className="space-y-3">
              <p className="text-sm text-stone-600">
                Choose your verified West Bengal stay tier:
              </p>
              {hotelOptions.map((opt) => (
                <div
                  key={opt.title}
                  onClick={() => setSelectedHotelTier(opt.title)}
                  className={`cursor-pointer rounded-2xl p-4 border transition ${
                    selectedHotelTier === opt.title
                      ? 'border-emerald-700 bg-emerald-50/60 ring-2 ring-emerald-700/20'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-stone-900 text-sm">{opt.title}</span>
                    <span className="text-xs font-semibold text-emerald-800">{opt.priceAdd}</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">{opt.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* STEP 6: TRANSPORTATION */}
          {step === 6 && (
            <div className="space-y-3">
              <p className="text-sm text-stone-600">
                Select your ground transportation option:
              </p>
              {transportOptions.map((opt) => (
                <div
                  key={opt.title}
                  onClick={() => setSelectedTransport(opt.title)}
                  className={`cursor-pointer rounded-2xl p-4 border transition ${
                    selectedTransport === opt.title
                      ? 'border-emerald-700 bg-emerald-50/60 ring-2 ring-emerald-700/20'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-stone-900 text-sm">{opt.title}</span>
                    <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">{opt.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* STEP 7: OPTIONAL ACTIVITIES */}
          {step === 7 && (
            <div className="space-y-3">
              <p className="text-sm text-stone-600">
                Add immersive local experiences conducted by verified village guides (₹450/experience):
              </p>
              {availableActivities.map((act) => {
                const isSelected = selectedActivities.includes(act);
                return (
                  <div
                    key={act}
                    onClick={() => toggleActivity(act)}
                    className={`cursor-pointer flex items-center justify-between rounded-2xl p-4 border transition ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50/60'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-5 w-5 rounded-md flex items-center justify-center border ${
                          isSelected ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5" />}
                      </div>
                      <span className="text-sm font-medium text-stone-800">{act}</span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-800">+₹450</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 8: REVIEW COMPLETE BOOKING */}
          {step === 8 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-stone-200 p-5 bg-stone-50/50 space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Selected Destination</span>
                  <span className="font-bold text-stone-900 text-sm">{currentDestination?.name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Travel Window</span>
                  <span className="font-semibold text-stone-800">{travelDate} (3 Days / 2 Nights)</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Group Details</span>
                  <span className="font-semibold text-stone-800">{travellersCount} Traveler(s) • {travelType}</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Accommodation</span>
                  <span className="font-medium text-stone-800 text-right max-w-[280px]">{selectedHotelTier}</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Transportation</span>
                  <span className="font-medium text-stone-800 text-right max-w-[280px]">{selectedTransport}</span>
                </div>
                {selectedActivities.length > 0 && (
                  <div className="border-b border-stone-200 pb-2">
                    <span className="text-stone-500 block mb-1">Optional Experiences ({selectedActivities.length})</span>
                    <ul className="list-disc list-inside text-stone-700 space-y-0.5 pl-1">
                      {selectedActivities.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Fare Summary */}
                <div className="pt-2 space-y-1.5 font-mono">
                  <div className="flex justify-between text-stone-600">
                    <span>Base Itinerary ({travellersCount} pax × 3 days)</span>
                    <span>₹{baseDayRate * travellersCount * 3}</span>
                  </div>
                  {hotelSurcharge > 0 && (
                    <div className="flex justify-between text-stone-600">
                      <span>Lodging Premium</span>
                      <span>₹{hotelSurcharge * 2}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Ground Transport</span>
                    <span>₹{transportRate}</span>
                  </div>
                  {activitiesTotal > 0 && (
                    <div className="flex justify-between text-stone-600">
                      <span>Curated Experiences</span>
                      <span>₹{activitiesTotal}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>GST (5%)</span>
                    <span>₹{gst}</span>
                  </div>
                  <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-stone-200">
                    <span>Grand Total (All-Inclusive)</span>
                    <span className="text-emerald-800">₹{grandTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: AUTHENTICATION / TRAVELER INFO */}
          {step === 9 && (
            <div className="space-y-4">
              <p className="text-sm text-stone-600">
                Enter primary traveler contact for issuing the official RouteX Digital Travel Pass:
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <UserIcon className="absolute left-3.5 h-4 w-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Soumodip Chal"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email (for Pass PDF delivery)
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 h-4 w-4 text-stone-400" />
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="e.g. traveler@example.com"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Number (+91)
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-3.5 h-4 w-4 text-stone-400" />
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200">
                  <p className="font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-700" />
                    Authenticated Traveler Guarantee
                  </p>
                  <p className="mt-0.5 text-stone-600">
                    Your contact is encrypted and only shared with your designated RouteX verified homestay host.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: PAYMENT */}
          {step === 10 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 flex justify-between items-center">
                <div>
                  <span className="text-xs text-stone-500">Amount Due</span>
                  <p className="text-2xl font-bold text-stone-900 font-display">₹{grandTotal}</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-semibold">
                  Razorpay Secure Gateway
                </span>
              </div>

              <div className="space-y-2.5">
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`cursor-pointer flex items-center justify-between rounded-xl p-3 border text-sm transition ${
                    paymentMethod === 'upi'
                      ? 'border-emerald-700 bg-emerald-50/50'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-4 w-4 rounded-full border flex items-center justify-center border-stone-400">
                      {paymentMethod === 'upi' && <div className="h-2 w-2 rounded-full bg-emerald-700" />}
                    </div>
                    <span className="font-semibold text-stone-800">Instant UPI (GPay / PhonePe / Paytm)</span>
                  </div>
                  <span className="text-xs text-stone-400">Instant QR</span>
                </label>

                {paymentMethod === 'upi' && (
                  <div className="pl-7 pr-2 py-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                      className="w-full py-2 px-3 text-xs rounded-lg border border-stone-300 outline-none"
                    />
                  </div>
                )}

                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`cursor-pointer flex items-center justify-between rounded-xl p-3 border text-sm transition ${
                    paymentMethod === 'card'
                      ? 'border-emerald-700 bg-emerald-50/50'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-4 w-4 rounded-full border flex items-center justify-center border-stone-400">
                      {paymentMethod === 'card' && <div className="h-2 w-2 rounded-full bg-emerald-700" />}
                    </div>
                    <span className="font-semibold text-stone-800">Credit / Debit Card (Visa, RuPay, MC)</span>
                  </div>
                  <CreditCard className="h-4 w-4 text-stone-400" />
                </label>

                <label
                  onClick={() => setPaymentMethod('pay_at_homestay')}
                  className={`cursor-pointer flex items-center justify-between rounded-xl p-3 border text-sm transition ${
                    paymentMethod === 'pay_at_homestay'
                      ? 'border-emerald-700 bg-emerald-50/50'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-4 w-4 rounded-full border flex items-center justify-center border-stone-400">
                      {paymentMethod === 'pay_at_homestay' && <div className="h-2 w-2 rounded-full bg-emerald-700" />}
                    </div>
                    <span className="font-semibold text-stone-800">Pay at Homestay (20% Advance Token)</span>
                  </div>
                  <span className="text-xs text-emerald-800 font-medium">Verified Homestay Only</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 11: BOOKING CONFIRMATION */}
          {step === 11 && confirmedBooking && (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 shadow-xs">
                <CheckCircle2 className="h-10 w-10 text-emerald-700" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-stone-900 font-display">Booking Confirmed!</h4>
                <p className="text-xs text-stone-500 mt-1">
                  Your journey to {confirmedBooking.destinationName} has been booked.
                </p>
              </div>

              <div className="inline-block rounded-xl border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-mono text-stone-700">
                Booking ID: <span className="font-bold text-stone-900">{confirmedBooking.id}</span>
              </div>

              <p className="text-xs text-stone-500 max-w-md mx-auto">
                A confirmation SMS and receipt has been dispatched. Step 12 will generate your official dynamic RouteX QR Travel Pass for scanning at check-in.
              </p>
            </div>
          )}

          {/* STEP 12: GENERATE QR PASS AUTOMATICALLY */}
          {step === 12 && confirmedBooking && (
            <div className="py-4 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-sm">
                <QrCode className="h-8 w-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-stone-900 font-display">Your Digital QR Travel Pass is Ready!</h4>
                <p className="text-xs text-stone-500 mt-1">
                  Ready to present to local hosts and forest range checkpoints.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-600">Pass Holder:</span>
                  <span className="font-bold text-stone-900">{confirmedBooking.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Destination:</span>
                  <span className="font-bold text-stone-900">{confirmedBooking.destinationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Travel Date:</span>
                  <span className="font-semibold text-stone-900">{confirmedBooking.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Token ID:</span>
                  <span className="font-mono text-stone-800">{confirmedBooking.bookingToken}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewQRPass(confirmedBooking);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3.5 px-4 text-sm font-bold text-white shadow-sm hover:bg-emerald-900 transition"
              >
                <QrCode className="h-4 w-4" />
                <span>Open & Download RouteX Travel Pass</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="border-t border-stone-200 pt-4 flex items-center justify-between mt-auto">
          {step > 1 && step < 11 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900 py-2 px-3 rounded-lg hover:bg-stone-100 transition"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          )}

          {step === 1 && <div />}

          {step < 10 && (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-800 py-2.5 px-5 text-xs font-bold text-white shadow-sm hover:bg-emerald-900 transition ml-auto"
            >
              <span>Continue</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {step === 10 && (
            <button
              onClick={handleExecutePayment}
              disabled={isProcessingPayment}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-800 py-2.5 px-6 text-xs font-bold text-white shadow-sm hover:bg-emerald-900 disabled:opacity-50 transition ml-auto"
            >
              {isProcessingPayment ? 'Processing with Razorpay...' : `Pay ₹${grandTotal} & Confirm`}
            </button>
          )}

          {step === 11 && (
            <button
              onClick={() => setStep(12)}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-800 py-2.5 px-6 text-xs font-bold text-white shadow-sm hover:bg-emerald-900 transition ml-auto"
            >
              <span>Generate QR Pass</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
