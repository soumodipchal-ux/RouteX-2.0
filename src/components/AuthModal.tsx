import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Phone, Mail, Shield, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialRole?: 'user' | 'admin';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialRole = 'user',
}) => {
  const { loginWithGoogle, sendMobileOtp, verifyMobileOtp, loginAsAdmin } = useAuth();
  const { t } = useLanguage();

  const [authMode, setAuthMode] = useState<'options' | 'mobile' | 'otp' | 'admin'>(
    initialRole === 'admin' ? 'admin' : 'options'
  );
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [demoOtpNotice, setDemoOtpNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle('soumodipchal@gmail.com', 'Soumodip Chal');
      if (onSuccess) onSuccess();
      onClose();
    } catch {
      setError('Google Sign-In could not be completed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await sendMobileOtp(mobile);
    setLoading(false);
    if (result.success) {
      setDemoOtpNotice(result.message);
      setAuthMode('otp');
    } else {
      setError(result.message);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const success = await verifyMobileOtp(mobile, otp);
    setLoading(false);
    if (success) {
      if (onSuccess) onSuccess();
      onClose();
    } else {
      setError('Invalid OTP. Please check the 6-digit code or enter 123456.');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin();
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-stone-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 mb-3 border border-emerald-200">
            <Shield className="h-6 w-6 text-emerald-700" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 font-display">
            {authMode === 'admin' ? 'RouteX Admin Access' : 'Welcome to RouteX'}
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            {authMode === 'admin'
              ? 'Authorized dashboard for tourism management'
              : 'Discover Hidden Bengal. Plan Smarter. Travel Better.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-rose-50 p-3 text-xs text-rose-700 border border-rose-200">
            {error}
          </div>
        )}

        {/* Options View */}
        {authMode === 'options' && (
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-stone-300 bg-white py-3 px-4 text-sm font-medium text-stone-700 shadow-xs hover:bg-stone-50 hover:border-stone-400 transition"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => setAuthMode('mobile')}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-emerald-700 py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 transition"
            >
              <Phone className="h-4 w-4" />
              <span>Continue with Indian Mobile OTP (+91)</span>
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-stone-400">Portal Access</span>
              </div>
            </div>

            <button
              onClick={() => setAuthMode('admin')}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 py-2.5 px-4 text-xs font-medium text-stone-600 hover:bg-stone-50 transition"
            >
              <Shield className="h-4 w-4 text-stone-500" />
              <span>Admin Dashboard Login</span>
            </button>
          </div>
        )}

        {/* Mobile View */}
        {authMode === 'mobile' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Enter Mobile Number
              </label>
              <div className="relative flex items-center rounded-xl border border-stone-300 shadow-xs focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600">
                <span className="px-3 text-sm font-medium text-stone-500 border-r border-stone-200">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full py-2.5 px-3 text-sm outline-none"
                  maxLength={10}
                />
              </div>
              <p className="text-xs text-stone-400 mt-1">
                A 6-digit verification code will be dispatched.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || mobile.length < 10}
              className="w-full rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 disabled:opacity-50 transition"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('options')}
              className="w-full text-center text-xs text-stone-500 hover:text-stone-800"
            >
              ← Back to login options
            </button>
          </form>
        )}

        {/* OTP Verification View */}
        {authMode === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {demoOtpNotice && (
              <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200">
                <p className="font-semibold">{demoOtpNotice}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Enter 6-Digit OTP
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-mono py-2.5 rounded-xl border border-stone-300 shadow-xs focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 disabled:opacity-50 transition"
            >
              {loading ? 'Verifying...' : 'Verify OTP & Login'}
            </button>

            <div className="flex justify-between items-center text-xs text-stone-500">
              <button
                type="button"
                onClick={() => setAuthMode('mobile')}
                className="hover:text-stone-800"
              >
                Change Number
              </button>
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-emerald-700 font-medium hover:underline"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

        {/* Admin Login View */}
        {authMode === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                defaultValue="admin@routex.in"
                readOnly
                className="w-full py-2.5 px-3 text-sm rounded-xl border border-stone-200 bg-stone-50 text-stone-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Master Security Key
              </label>
              <input
                type="password"
                defaultValue="Admin123"
                readOnly
                className="w-full py-2.5 px-3 text-sm rounded-xl border border-stone-200 bg-stone-50 text-stone-600 outline-none"
              />
              <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Pre-authenticated for testing preview
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-stone-900 py-3 text-sm font-semibold text-white shadow-sm hover:bg-stone-800 transition"
            >
              Access Admin Panel
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('options')}
              className="w-full text-center text-xs text-stone-500 hover:text-stone-800"
            >
              ← Back to standard traveler login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
