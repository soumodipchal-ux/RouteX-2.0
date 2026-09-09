import React from 'react';
import { Compass, ShieldCheck, Heart, PhoneCall, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (view: string, filter?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-stone-200 bg-stone-50 text-stone-600 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-xs">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-tight text-stone-900">
                  Route<span className="text-emerald-800">X</span>
                </span>
                <p className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider">
                  Explore Beyond the Usual
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed max-w-sm">
              RouteX is an all-in-one sustainable tourism platform promoting the untouched,
              lesser-known gems of West Bengal. We relieve tourist bottlenecks and empower local homestays
              with authenticated digital QR travel passes.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-500">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              <span>West Bengal Sustainable Tourism Ecosystem</span>
            </div>
          </div>

          {/* Col 2: Bengal Circuits */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
              Bengal Circuits
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('explore', 'North Bengal')}
                  className="hover:text-emerald-800 transition"
                >
                  North Bengal Himalayan Trails
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore', 'Rarh Bengal')}
                  className="hover:text-emerald-800 transition"
                >
                  Rarh & Chota Nagpur Hills
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore', 'Coastal Bengal')}
                  className="hover:text-emerald-800 transition"
                >
                  Coastal Bengal & Sundarbans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore', 'South Bengal')}
                  className="hover:text-emerald-800 transition"
                >
                  South Bengal Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-emerald-800 transition font-semibold text-emerald-800"
                >
                  Interactive Bengal Map →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tour Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
              Curated Experiences
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('packages', 'Family')}
                  className="hover:text-emerald-800 transition"
                >
                  Family Tour Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages', 'Friends')}
                  className="hover:text-emerald-800 transition"
                >
                  Friends & Adventure Trails
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages', 'Couple')}
                  className="hover:text-emerald-800 transition"
                >
                  Couple & Honeymoon Retreats
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages', 'Solo')}
                  className="hover:text-emerald-800 transition"
                >
                  Solo Verified Explorer Pass
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai-planner')}
                  className="hover:text-emerald-800 transition font-semibold text-emerald-800"
                >
                  AI Itinerary Generator →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
              Safety & Helplines
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 font-mono text-stone-800 font-bold">
                <PhoneCall className="h-3.5 w-3.5 text-emerald-700" />
                <span>1800-212-1655</span>
              </li>
              <li className="text-[11px] text-stone-400">WB Tourist Police 24/7</li>

              <li className="pt-2">
                <button
                  onClick={() => onNavigate('safety')}
                  className="text-rose-700 font-bold hover:underline"
                >
                  Emergency SOS Center →
                </button>
              </li>

              <li className="pt-2">
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-stone-500 hover:text-stone-900"
                >
                  QR Pass Verifier Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <p>© {new Date().getFullYear()} RouteX. All rights reserved. Made with pride for West Bengal Tourism.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-600 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-600 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-stone-600 cursor-pointer">Eco-Homestay Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
