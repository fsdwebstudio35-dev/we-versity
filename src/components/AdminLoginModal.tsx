import React, { useState } from 'react';
import { 
  Mail,
  Phone,
  KeyRound, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  X, 
  ArrowRight, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/maatiData';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (rememberDevice: boolean) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState(() => localStorage.getItem('weversity_admin_email') || COMPANY_INFO.email || 'admin@weversity.com');
  const [phone, setPhone] = useState(() => localStorage.getItem('weversity_admin_phone') || COMPANY_INFO.phone || '+92 301 9249721');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter the admin password');
      return;
    }

    setIsLoading(true);
    setError('');

    // Persist email & phone preference
    if (email.trim()) localStorage.setItem('weversity_admin_email', email.trim());
    if (phone.trim()) localStorage.setItem('weversity_admin_phone', phone.trim());

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (rememberDevice) {
          localStorage.setItem('weversity_admin_device_authorized', 'true');
        }
        localStorage.setItem('weversity_admin_auth', data.token || 'true');
        onLoginSuccess(rememberDevice);
        setPassword('');
        onClose();
      } else {
        // Fallback check if server offline or default master password matches
        if (password === 'king295') {
          if (rememberDevice) {
            localStorage.setItem('weversity_admin_device_authorized', 'true');
          }
          localStorage.setItem('weversity_admin_auth', 'wv-token-offline');
          onLoginSuccess(rememberDevice);
          setPassword('');
          onClose();
        } else {
          setError(data.message || 'Incorrect password.');
        }
      }
    } catch {
      // Offline fallback
      if (password === 'king295') {
        if (rememberDevice) {
          localStorage.setItem('weversity_admin_device_authorized', 'true');
        }
        localStorage.setItem('weversity_admin_auth', 'wv-token-offline');
        onLoginSuccess(rememberDevice);
        setPassword('');
        onClose();
      } else {
        setError('Incorrect password.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="w-full max-w-md bg-gradient-to-b from-[#181236] to-[#120B2A] border border-purple-700/50 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden text-white my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-44 h-44 bg-[#6D28D9]/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-44 h-44 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors"
          aria-label="Close admin login"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon with WeVersity Logo */}
        <div className="flex flex-col items-center text-center space-y-3 mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-white p-1 border-2 border-purple-400 shadow-xl shadow-purple-600/30 overflow-hidden flex items-center justify-center">
              <img 
                src="/assets/aistudio/image_b4867fb4.png" 
                alt="WeVersity Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#6D28D9] border-2 border-[#181236] flex items-center justify-center shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/60 text-[11px] font-semibold text-purple-300 mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>WeVersity Secure Backend</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white tracking-tight">
              Admin Access Portal
            </h3>
            <p className="text-xs text-purple-200/80 mt-1">
              Enter your admin credentials to access the management dashboard.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Admin Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-purple-200 flex items-center justify-between">
              <span>Admin Email</span>
              <span className="text-[10px] text-purple-400">Verified Contact</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@weversity.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#1F1744] border border-purple-700/60 rounded-xl text-white placeholder-purple-400/50 text-xs sm:text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              />
            </div>
          </div>

          {/* Admin Phone Number Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-purple-200 flex items-center justify-between">
              <span>Phone Number</span>
              <span className="text-[10px] text-purple-400">Direct Contact</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +92 301 9249721"
                className="w-full pl-10 pr-4 py-2.5 bg-[#1F1744] border border-purple-700/60 rounded-xl text-white placeholder-purple-400/50 text-xs sm:text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              />
            </div>
          </div>

          {/* Admin Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-purple-200 flex items-center justify-between">
              <span>Admin Password</span>
              <span className="text-[10px] text-purple-400">Master Password Protected</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                autoFocus
                className="w-full pl-10 pr-10 py-2.5 bg-[#1F1744] border border-purple-700/60 rounded-xl text-white placeholder-purple-400/50 text-xs sm:text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-purple-400 hover:text-purple-200 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* PC Authorization Checkbox */}
          <div className="p-3 rounded-2xl bg-[#140D30]/90 border border-purple-800/50 space-y-1.5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-purple-600 text-[#6D28D9] focus:ring-[#6D28D9] bg-purple-950"
              />
              <div className="text-xs">
                <span className="font-semibold text-white block">
                  Authorize this PC / Browser
                </span>
                <span className="text-[11px] text-purple-300/80 leading-relaxed block mt-0.5">
                  Keep admin access enabled for this device.
                </span>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] shadow-lg shadow-purple-900/50 transition-all flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying...</span>
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>Open Admin Backend</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer Hint for Quick Trigger */}
        <div className="mt-5 pt-3.5 border-t border-purple-800/40 text-center">
          <p className="text-[11px] text-purple-400">
            Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-purple-900/60 border border-purple-700/60 text-purple-200 font-mono text-[10px]">Ctrl + Shift + A</kbd> or double-click the logo on any authorized device.
          </p>
        </div>
      </div>
    </div>
  );
};
