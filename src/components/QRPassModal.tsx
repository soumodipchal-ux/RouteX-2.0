import React, { useEffect, useState, useRef } from 'react';
import { Booking } from '../types';
import { generateQRCodeDataURL } from '../utils/qrGenerator';
import { 
  X, 
  Download, 
  Printer, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Users, 
  Compass, 
  Building2, 
  Car, 
  Copy, 
  Check 
} from 'lucide-react';

interface QRPassModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QRPassModal: React.FC<QRPassModalProps> = ({ booking, isOpen, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const passRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (booking) {
      generateQRCodeDataURL({
        bookingId: booking.id,
        token: booking.bookingToken,
        customerName: booking.customerName,
        destination: booking.destinationName,
        travelDate: booking.travelDate,
        travellersCount: booking.travellersCount,
        status: booking.status,
      }).then(setQrDataUrl);
    }
  }, [booking]);

  if (!isOpen || !booking) return null;

  const handleCopyToken = () => {
    navigator.clipboard.writeText(booking.bookingToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `RouteX_Travel_Pass_${booking.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `RouteX Travel Pass - ${booking.destinationName}`,
          text: `Here is my verified RouteX travel pass for ${booking.destinationName} on ${booking.travelDate}. Booking ID: ${booking.id}`,
          url: window.location.href,
        });
      } catch {
        handleCopyToken();
      }
    } else {
      handleCopyToken();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Printable Pass Container */}
        <div ref={passRef} className="rounded-2xl border-2 border-emerald-800/20 bg-[#FCFBF9] p-6 shadow-sm">
          {/* Header Banner */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800 text-white font-bold text-lg shadow-xs">
                RX
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 tracking-tight">RouteX</h3>
                <p className="text-[11px] font-medium text-emerald-800 tracking-wide">
                  OFFICIAL DIGITAL TRAVEL PASS
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {booking.status}
              </span>
              <p className="text-[11px] text-stone-400 mt-0.5 font-mono">{booking.id}</p>
            </div>
          </div>

          {/* QR Code Presentation */}
          <div className="my-5 flex flex-col items-center justify-center rounded-xl bg-white p-5 border border-stone-200 shadow-xs">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="RouteX Digital Pass QR"
                className="h-52 w-52 rounded-lg border border-stone-100 p-1 shadow-xs"
              />
            ) : (
              <div className="h-52 w-52 flex items-center justify-center bg-stone-50 rounded-lg text-stone-400 text-xs">
                Generating Secure QR...
              </div>
            )}
            
            <div className="mt-3 text-center">
              <p className="text-xs font-semibold text-stone-800 flex items-center justify-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                Verified Decongested Route
              </p>
              <p className="text-[11px] text-stone-500 max-w-xs mt-0.5">
                Scan at participating West Bengal eco-homestays, forest checkpoints, and local guide desks.
              </p>
            </div>
          </div>

          {/* Traveler Details Grid */}
          <div className="space-y-3 rounded-xl bg-white p-4 border border-stone-200 text-xs">
            <div className="flex justify-between items-center border-b border-stone-100 pb-2">
              <span className="text-stone-500">Lead Traveler</span>
              <span className="font-semibold text-stone-900">{booking.customerName}</span>
            </div>

            <div className="flex justify-between items-center border-b border-stone-100 pb-2">
              <span className="text-stone-500 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-700" /> Destination
              </span>
              <span className="font-semibold text-stone-900 text-right">{booking.destinationName}</span>
            </div>

            <div className="flex justify-between items-center border-b border-stone-100 pb-2">
              <span className="text-stone-500 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-emerald-700" /> Travel Date
              </span>
              <span className="font-semibold text-stone-900">{booking.travelDate}</span>
            </div>

            <div className="flex justify-between items-center border-b border-stone-100 pb-2">
              <span className="text-stone-500 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-emerald-700" /> Party Size
              </span>
              <span className="font-semibold text-stone-900">
                {booking.travellersCount} Traveler(s) • {booking.travelType}
              </span>
            </div>

            {booking.hotelSelected && (
              <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-emerald-700" /> Lodging
                </span>
                <span className="font-medium text-stone-800 text-right max-w-[200px] truncate">
                  {booking.hotelSelected}
                </span>
              </div>
            )}

            {booking.transportSelected && (
              <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <Car className="h-3.5 w-3.5 text-emerald-700" /> Transport
                </span>
                <span className="font-medium text-stone-800">{booking.transportSelected}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-1">
              <span className="text-stone-500">Security Token</span>
              <div className="flex items-center gap-1">
                <span className="font-mono text-[10px] text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                  {booking.bookingToken}
                </span>
                <button
                  onClick={handleCopyToken}
                  className="text-stone-400 hover:text-stone-700 transition p-1"
                  title="Copy Token"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                </button>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-4 flex items-center justify-between text-[11px] text-stone-400">
            <span>RouteX Verified • WB Tourism Partner</span>
            <span>24/7 Helpline: 1800-212-1655</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white py-2.5 px-3 text-xs font-semibold text-stone-700 hover:bg-stone-50 shadow-xs transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white py-2.5 px-3 text-xs font-semibold text-stone-700 hover:bg-stone-50 shadow-xs transition"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Pass</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-800 py-2.5 px-3 text-xs font-semibold text-white hover:bg-emerald-900 shadow-sm transition"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
