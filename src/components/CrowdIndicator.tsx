import React from 'react';
import { CrowdLevel, Destination } from '../types';
import { Users, AlertTriangle, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CrowdIndicatorProps {
  level: CrowdLevel;
  footfallPercentage?: number;
  compact?: boolean;
  alternatives?: string[];
  allDestinations?: Destination[];
  onSelectAlternative?: (destination: Destination) => void;
}

export const CrowdIndicator: React.FC<CrowdIndicatorProps> = ({
  level,
  footfallPercentage,
  compact = false,
  alternatives = [],
  allDestinations = [],
  onSelectAlternative,
}) => {
  const { t } = useLanguage();

  const getColorClasses = () => {
    switch (level) {
      case 'Low':
        return {
          badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          bar: 'bg-emerald-500',
          text: 'text-emerald-700',
          label: t('lowCrowd'),
        };
      case 'Moderate':
        return {
          badge: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          bar: 'bg-amber-500',
          text: 'text-amber-700',
          label: t('moderateCrowd'),
        };
      case 'High':
        return {
          badge: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-500',
          bar: 'bg-rose-500',
          text: 'text-rose-700',
          label: t('highCrowd'),
        };
      default:
        return {
          badge: 'bg-stone-50 text-stone-700 border-stone-200',
          dot: 'bg-stone-400',
          bar: 'bg-stone-400',
          text: 'text-stone-600',
          label: 'Normal',
        };
    }
  };

  const style = getColorClasses();

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${style.badge}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
        <span>{style.label}</span>
      </span>
    );
  }

  // Expanded crowd meter & decongestion recommendation
  const matchedAltDests = allDestinations.filter(d => alternatives.includes(d.id));

  return (
    <div className="space-y-3">
      <div className={`rounded-2xl border p-4 ${style.badge} bg-opacity-40`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`flex h-2.5 w-2.5 rounded-full ${style.dot}`} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Live Footfall: {style.label}
            </span>
          </div>
          {footfallPercentage !== undefined && (
            <span className="text-xs font-mono font-bold">{footfallPercentage}% Capacity</span>
          )}
        </div>

        {footfallPercentage !== undefined && (
          <div className="w-full bg-stone-200/60 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${style.bar}`}
              style={{ width: `${Math.min(footfallPercentage, 100)}%` }}
            />
          </div>
        )}

        <p className="text-xs text-stone-600 mt-2">
          {level === 'Low' && 'Serene & peaceful. Perfect time to visit with minimal wait times.'}
          {level === 'Moderate' && 'Manageable visitor influx. Early morning or weekday visits are advised.'}
          {level === 'High' && 'Substantial visitor volume detected at main viewpoints.'}
        </p>
      </div>

      {/* Decongestion Alternatives Callout */}
      {(level === 'High' || level === 'Moderate') && matchedAltDests.length > 0 && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-3">
          <div className="flex items-start gap-2.5">
            <Compass className="h-5 w-5 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                RouteX Crowd-Decongestion Alternatives
              </h5>
              <p className="text-xs text-emerald-800/80 mt-0.5">
                {t('crowdAlternativesTitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {matchedAltDests.map((alt) => (
              <div
                key={alt.id}
                onClick={() => onSelectAlternative && onSelectAlternative(alt)}
                className="cursor-pointer group flex items-center justify-between rounded-xl bg-white p-2.5 border border-stone-200 shadow-2xs hover:border-emerald-700 hover:shadow-xs transition"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={alt.image}
                    alt={alt.name}
                    className="h-9 w-9 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 truncate group-hover:text-emerald-800">
                      {alt.name}
                    </p>
                    <p className="text-[10px] text-stone-500">{alt.district}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px] shrink-0">
                  <span>Switch</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
