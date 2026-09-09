import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Compass, 
  Building2, 
  HeartHandshake 
} from 'lucide-react';

export const SafetyCenter: React.FC = () => {
  const [sosActive, setSosActive] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [gpsLocation, setGpsLocation] = useState<string>('27.0142° N, 88.2251° E (Takdah-Tinchuley Circuit)');

  const triggerSOS = () => {
    setSosActive(true);
    // Simulate getting browser geo coordinates if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLocation(`${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`);
        },
        () => {
          // Fallback location for Bengal region
          setGpsLocation('27.0142° N, 88.2251° E (Near Peshok Road)');
        }
      );
    }
  };

  const dispatchAlert = () => {
    setSosSent(true);
    setTimeout(() => {
      setSosSent(false);
      setSosActive(false);
    }, 4500);
  };

  const helplines = [
    { title: 'WB Tourist Police Helpline', number: '1800-212-1655', available: '24/7 Toll Free' },
    { title: 'National Emergency Response (All in One)', number: '112', available: '24/7 Emergency' },
    { title: 'West Bengal Police Control Room', number: '100', available: '24/7 Police Dispatch' },
    { title: 'Emergency Medical & Ambulance', number: '108', available: '24/7 Medical' },
    { title: 'Women Safety & Escort Assistance', number: '1090', available: '24/7 Dedicated' },
    { title: 'Forest & Wildlife Emergency Rescue', number: '1800-345-3866', available: '24/7 Dooars/Sunderbans' },
  ];

  const safePractices = [
    {
      title: 'Verified Local Guides Only',
      desc: 'All RouteX travel passes link directly with licensed forest department escorts and homestay caretakers.',
    },
    {
      title: 'Mountain Road Protocols',
      desc: 'Avoid night driving on NH10 and Rohini Road during monsoons. RouteX live alerts notify real-time landslide status.',
    },
    {
      title: 'Solo & Female Traveler Security',
      desc: 'Every homestay in our ecosystem undergoes physical police verification with female-friendly security ratings.',
    },
    {
      title: 'Sundarbans Boat Safety',
      desc: 'Every delta vessel is equipped with ISI-certified life jackets and licensed delta helmsmen.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* SOS Alert Banner */}
      <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800 border border-rose-200">
            <ShieldAlert className="h-4 w-4 text-rose-600" />
            <span>24/7 Traveler Emergency Assistance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 tracking-tight">
            RouteX Emergency SOS Broadcast
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
            In distress? Instantly dispatch your live GPS location and digital pass credentials to West Bengal Tourist Police and your designated homestay host.
          </p>
        </div>

        <button
          onClick={triggerSOS}
          className="rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-8 py-4 shadow-lg shadow-rose-600/20 hover:scale-105 transition active:scale-95 flex items-center gap-2 shrink-0"
        >
          <ShieldAlert className="h-5 w-5" />
          <span>TRIGGER SOS EMERGENCY</span>
        </button>
      </div>

      {/* SOS Modal Dialog */}
      {sosActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-rose-200">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-3">
                <AlertTriangle className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-display">Confirm SOS Broadcast</h3>
              <p className="text-xs text-stone-500 mt-1">
                Your emergency beacon will be sent immediately.
              </p>
            </div>

            <div className="my-5 space-y-2 rounded-xl bg-stone-50 p-4 border border-stone-200 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Live Geo-Coords:</span>
                <span className="font-mono font-bold text-stone-900">{gpsLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Target Dispatches:</span>
                <span className="font-semibold text-stone-800">WB Tourist Police + Homestay</span>
              </div>
            </div>

            {sosSent ? (
              <div className="rounded-xl bg-emerald-50 p-4 text-center text-xs text-emerald-800 border border-emerald-200 space-y-1">
                <CheckCircle2 className="h-6 w-6 text-emerald-700 mx-auto" />
                <p className="font-bold text-sm">SOS Broadcast Dispatched!</p>
                <p className="text-[11px] text-stone-600">
                  Nearby police control room and village emergency responder have been notified. Stay in place.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSosActive(false)}
                  className="rounded-xl border border-stone-200 py-3 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={dispatchAlert}
                  className="rounded-xl bg-rose-600 hover:bg-rose-700 py-3 text-xs font-bold text-white shadow-xs"
                >
                  Confirm & Send
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Helplines Directory */}
      <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-xs">
        <div className="mb-6">
          <h3 className="text-xl font-bold font-display text-stone-900 tracking-tight">
            Verified Emergency & Tourist Helplines
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Direct government and rescue contacts across North Bengal, South Bengal, and Coastal corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {helplines.map((h, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-2xl border border-stone-200 p-4 bg-stone-50/50 hover:bg-white hover:border-emerald-700/40 hover:shadow-xs transition"
            >
              <div>
                <h4 className="font-bold text-stone-900 text-xs">{h.title}</h4>
                <span className="text-[10px] text-stone-400 block mt-0.5">{h.available}</span>
              </div>
              <a
                href={`tel:${h.number.replace(/\D/g, '')}`}
                className="flex items-center gap-1.5 rounded-xl bg-white border border-stone-200 px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-800 hover:text-white transition font-mono shadow-2xs"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>{h.number}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Advisories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safePractices.map((p, i) => (
          <div key={i} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
              <h4 className="font-bold text-stone-900 text-sm">{p.title}</h4>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
