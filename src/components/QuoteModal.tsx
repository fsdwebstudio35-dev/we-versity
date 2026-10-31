import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES, COMPANY_INFO } from '../data/maatiData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  currency: 'USD' | 'PKR' | 'GBP';
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  currency
}) => {
  const [selectedService, setSelectedService] = useState<string>(initialServiceId || SERVICES[0]?.id || '');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [budgetRange, setBudgetRange] = useState('standard');
  const [projectDescription, setProjectDescription] = useState('');
  const [timeline, setTimeline] = useState('normal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }, 900);
  };

  const getBudgetText = () => {
    if (currency === 'USD') {
      return [
        { id: 'starter', label: '$500 - $1,000' },
        { id: 'standard', label: '$1,000 - $2,500' },
        { id: 'growth', label: '$2,500 - $5,000' },
        { id: 'enterprise', label: '$5,000+' }
      ];
    } else if (currency === 'PKR') {
      return [
        { id: 'starter', label: '₨ 1.5L - 3 Lakh' },
        { id: 'standard', label: '₨ 3L - 7 Lakh' },
        { id: 'growth', label: '₨ 7L - 15 Lakh' },
        { id: 'enterprise', label: '₨ 15 Lakh+' }
      ];
    } else {
      return [
        { id: 'starter', label: '£400 - £800' },
        { id: 'standard', label: '£800 - £2,000' },
        { id: 'growth', label: '£2,000 - £4,000' },
        { id: 'enterprise', label: '£4,000+' }
      ];
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-gray-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white border border-purple-150 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration with WeVersity purple gradient */}
        <div className="bg-gradient-to-r from-purple-50 via-purple-100/50 to-white border-b border-purple-150 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#6D28D9] text-white shadow-sm shadow-purple-600/30">
              <Sparkles className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-gray-900">
                Request a Custom Proposal
              </h3>
              <p className="text-xs text-gray-500">
                Guaranteed response within 4 business hours • 100% Free Consultation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-gray-950">Proposal Request Received!</h4>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Thank you, <span className="text-gray-900 font-bold">{clientName}</span>. Our lead architect will review your project requirements and email a detailed scope and cost estimate to <span className="text-[#6D28D9] font-bold">{clientEmail}</span> shortly.
              </p>
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-gray-700 max-w-sm mx-auto text-left space-y-1.5">
                <div className="font-bold text-gray-900">Direct Project Contact:</div>
                <div>📞 Phone: {COMPANY_INFO.phone}</div>
                <div>✉️ Email: {COMPANY_INFO.email}</div>
                <div>📍 Office: {COMPANY_INFO.headquarters.address}</div>
              </div>
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-colors shadow-sm"
                >
                  Close Window
                </button>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Maati%20Tech,%20I%20just%20submitted%20a%20quote%20request%20for%20${encodeURIComponent(clientName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  Follow up on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#6D28D9]" />
                  Select Project Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedService(srv.id)}
                      className={`p-3 rounded-2xl text-left border text-xs font-bold transition-all flex items-center justify-between ${
                        selectedService === srv.id
                          ? 'bg-purple-50 border-[#6D28D9] text-[#6D28D9] shadow-xs ring-1 ring-purple-200'
                          : 'bg-[#FAF9FD] border-purple-100 text-gray-700 hover:border-purple-300'
                      }`}
                    >
                      <span>{srv.title}</span>
                      <span className="text-[11px] text-[#6D28D9] font-extrabold">{srv.startingPrice}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. John Smith or Hamza Ali"
                    className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+92 300 1234567 or +44 7123 456789"
                    className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#6D28D9]" />
                    Target Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                  >
                    <option value="urgent">Urgent (Within 1-2 weeks)</option>
                    <option value="normal">Standard (3-5 weeks)</option>
                    <option value="flexible">Flexible (1-2 months)</option>
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#6D28D9]" />
                  Estimated Project Budget ({currency})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {getBudgetText().map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudgetRange(b.id)}
                      className={`p-2.5 rounded-2xl text-center border text-xs font-bold transition-all ${
                        budgetRange === b.id
                          ? 'bg-[#6D28D9] text-white border-[#6D28D9] shadow-xs'
                          : 'bg-[#FAF9FD] border-purple-150 text-gray-700 hover:border-purple-300'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Brief */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Project Scope & Key Features</label>
                <textarea
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Tell us about your requirements, reference websites, target audience, or specific integrations..."
                  className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl p-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                ></textarea>
              </div>

              {/* Guarantee bullets */}
              <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Confidential Non-Disclosure
                </span>
                <span>No commitment required</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-[#6D28D9] hover:bg-[#5B21B6] shadow-xl shadow-purple-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing & Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-purple-200" />
                    <span>Submit & Request Detailed Proposal</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
