import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageCircle, 
  ShieldCheck, 
  Building2, 
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO, SERVICES } from '../data/maatiData';

interface ContactViewProps {
  currency: 'USD' | 'PKR' | 'GBP';
}

export const ContactView: React.FC<ContactViewProps> = ({ currency }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(SERVICES[0]?.id || 'other');
  const [budget, setBudget] = useState('standard');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 110,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }
    }, 900);
  };

  const getBudgets = () => {
    if (currency === 'USD') {
      return ['$500 - $1,000', '$1,000 - $2,500', '$2,500 - $5,000', '$5,000+'];
    } else if (currency === 'PKR') {
      return ['₨ 1.5L - 3 Lakh', '₨ 3L - 7 Lakh', '₨ 7L - 15 Lakh', '₨ 15 Lakh+'];
    }
    return ['£400 - £800', '£800 - £2,000', '£2,000 - £4,000', '£4,000+'];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 text-xs font-bold">
          <Phone className="w-3.5 h-3.5" />
          <span>Get in Touch with WeVersity</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-950 tracking-tight">
          Let’s Build Something Exceptional Together
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Reach out for project inquiries, technical discovery, or on-site meetings at our Lahore office. Guaranteed response within 4 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Office Details & Instant Channels */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick WhatsApp Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border border-emerald-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" /> Fast Response Channel
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h3 className="text-xl font-display font-bold text-gray-900">Need an immediate answer?</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Chat directly with our solutions architect on WhatsApp. Ideal for rapid scopes, rough ballparks, and quick questions.
            </p>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hello%20Maati%20Tech,%20I'd%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Open WhatsApp: {COMPANY_INFO.phone}</span>
            </a>
          </div>

          {/* Lahore HQ Office Card */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> Lahore Head Office (Pakistan)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 font-bold">
                Main Hub
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900">{COMPANY_INFO.headquarters.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {COMPANY_INFO.headquarters.address}
              </p>
            </div>

            <div className="space-y-2 text-xs pt-1">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-gray-700 hover:text-[#6D28D9] transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 text-gray-700 hover:text-[#6D28D9] transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{COMPANY_INFO.headquarters.hours}</span>
              </div>
            </div>

            {/* Simulated Map View for Turner Road, Lahore */}
            <div className="pt-2">
              <div className="h-32 w-full rounded-2xl bg-purple-50/70 border border-purple-150 relative overflow-hidden flex flex-col items-center justify-center p-4 text-center group">
                <div className="absolute inset-0 bg-grid-pattern opacity-50" />
                <MapPin className="w-6 h-6 text-[#6D28D9] mb-1 z-10 animate-bounce" />
                <span className="text-xs font-bold text-gray-900 z-10">Turner Road, Garhi Shahu, Lahore</span>
                <span className="text-[10px] text-gray-500 z-10">Near Allama Iqbal Road & Mall Road</span>
                <a
                  href="https://www.google.com/maps/place/Web+Developer+as/@31.4228025,72.4984779,10z/data=!3m1!4b1!4m6!3m5!1s0x6d14276cc5e1dce9:0x69a577065b9c08a5!8m2!3d31.4235715!4d73.089301!16s%2Fg%2F11zzv2sdb3?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-[10px] text-[#6D28D9] hover:underline flex items-center gap-1 z-10 font-bold"
                >
                  View on Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* London UK Liaison */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> London Liaison (United Kingdom)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                UK Branch
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900">{COMPANY_INFO.ukOffice.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {COMPANY_INFO.ukOffice.address}
              </p>
            </div>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Phone className="w-3.5 h-3.5 text-indigo-600" />
                <span>{COMPANY_INFO.ukOffice.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>{COMPANY_INFO.ukOffice.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Comprehensive Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white border border-purple-100 shadow-xl shadow-purple-900/5">
          
          {submitted ? (
            <div className="text-center py-12 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-950">Inquiry Successfully Received!</h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for reaching out, <span className="text-gray-900 font-bold">{name}</span>. One of our senior software engineers in Lahore will review your specifications and email you back at <span className="text-[#6D28D9] font-bold">{email}</span> within 4 hours.
              </p>
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-gray-700 max-w-sm mx-auto text-left space-y-1">
                <div>✓ Ticket created in WeVersity CRM</div>
                <div>✓ Confidentiality guaranteed under standard NDA</div>
                <div>✓ Direct phone contact: {COMPANY_INFO.phone}</div>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setCompany('');
                  setMessage('');
                }}
                className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-colors shadow-md shadow-purple-600/20"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-xl font-display font-bold text-gray-900">Start Your Project Consultation</h3>
                <p className="text-xs text-gray-500 mt-1">Fill out the brief form below and our engineering team will get back to you promptly.</p>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asad Khan or Sarah Jenkins"
                    className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                  />
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567 or +44 7..."
                    className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Company / Organization</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your brand or venture name"
                    className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                  />
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Service You Are Interested In *</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} (From {s.startingPrice})
                    </option>
                  ))}
                  <option value="other">Other / Custom Architecture Consultation</option>
                </select>
              </div>

              {/* Approximate Budget */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Estimated Budget ({currency})</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {getBudgets().map((b, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                        budget === b
                          ? 'bg-[#6D28D9] text-white border-[#6D28D9] shadow-xs'
                          : 'bg-[#FAF9FD] border-purple-150 text-gray-700 hover:border-purple-300'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Details */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Project Scope & Details *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide an overview of your project, target launch dates, reference websites or custom software requirements..."
                  className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl p-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                ></textarea>
              </div>

              {/* Bottom Guarantee */}
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your information is protected. We will never spam or share your details.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-[#6D28D9] hover:bg-[#5B21B6] shadow-xl shadow-purple-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-purple-200" />
                    <span>Send Inquiry to WeVersity Engineers</span>
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
