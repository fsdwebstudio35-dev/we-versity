import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Linkedin, 
  Facebook, 
  Github, 
  ShieldCheck, 
  Award,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO, SERVICES, ServiceItem } from '../data/maatiData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onSelectService: (service: ServiceItem) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onSelectService,
  onOpenQuoteModal
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#120B2E] border-t border-purple-900/40 text-purple-200/80 text-sm">
      {/* Pre-Footer Action Banner with WeVersity Purple Gradient */}
      <div className="border-b border-purple-900/40 bg-gradient-to-b from-[#18103A] to-[#120B2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="bg-gradient-to-r from-[#1E1447] via-[#241756] to-[#1E1447] border border-purple-800/40 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#6D28D9]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-700/60 text-xs font-semibold">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  <span>Start Your Digital Transformation Today</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                  Ready to build a website or software that drives real revenue?
                </h3>
                <p className="text-purple-200 max-w-2xl text-sm sm:text-base leading-relaxed">
                  Book a free technical consultation with our senior architects in Lahore or London. Get architectural roadmaps, milestone breakdowns, and honest project timelines.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#6D28D9] hover:bg-[#5B21B6] shadow-xl shadow-purple-900/40 transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>Request a Custom Proposal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Maati%20Tech,%20I'd%20like%20to%20discuss%20my%20project%20requirements.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-emerald-300 bg-emerald-950/50 border border-emerald-800/60 hover:bg-emerald-900/50 transition-all flex items-center justify-center gap-2"
                >
                  <span>Quick WhatsApp: {COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Company Brief & Presence */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D28D9] to-purple-600 p-0.5 overflow-hidden">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/aistudio/image_03e15199.png" 
                    alt="WeVersity Logo" 
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                WE<span className="text-purple-400">VERSITY</span>
              </span>
            </div>
            
            <p className="text-purple-300/80 text-xs sm:text-sm leading-relaxed">
              Premier software house and full-stack digital agency established in 2016. We engineer clean, unbloated, fast-loading web applications, custom Laravel systems, SaaS products, and mobile solutions for global businesses.
            </p>

            {/* Accreditations / Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/70 border border-purple-800/60 text-xs text-purple-200">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>100% IP Ownership</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/70 border border-purple-800/60 text-xs text-purple-200">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Clutch 5.0 Rating</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/70 border border-purple-800/60 text-xs text-purple-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>90-Day Warranty</span>
              </span>
            </div>

            {/* Socials matching WeVersity style */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-300 hover:bg-[#6D28D9] hover:text-white transition-all transform hover:scale-110 shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-300 hover:bg-[#6D28D9] hover:text-white transition-all transform hover:scale-110 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-300 hover:bg-[#6D28D9] hover:text-white transition-all transform hover:scale-110 shadow-sm"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.clutch}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 h-10 rounded-full bg-purple-950 border border-purple-800/60 flex items-center justify-center gap-1.5 text-xs font-semibold text-purple-200 hover:bg-[#6D28D9] hover:text-white transition-all shadow-sm"
                aria-label="Clutch Profile"
              >
                <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                <span>Clutch</span>
              </a>
            </div>
          </div>



          {/* Quick Navigation & Company */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-purple-300/80">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">
                  About Us & Story
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('portfolio')} className="hover:text-white transition-colors">
                  Case Studies & Work
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('estimator')} className="hover:text-white transition-colors text-purple-400 font-medium">
                  Project Cost Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('teachers')} className="hover:text-white transition-colors">
                  Our Expert Teachers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Office Locations */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Global Offices
            </h4>

            {/* Lahore Hub */}
            <div className="p-3.5 rounded-2xl bg-[#1A123E] border border-purple-800/50 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-white">
                <span className="flex items-center gap-1.5 text-purple-300">
                  <MapPin className="w-3.5 h-3.5" />
                  Lahore Head Office
                </span>
                <span className="text-[10px] text-purple-400 bg-purple-950 px-1.5 py-0.5 rounded border border-purple-800/50">PK HQ</span>
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                {COMPANY_INFO.headquarters.address}
              </p>
              <div className="text-xs text-purple-300 flex items-center gap-1.5 pt-1">
                <Phone className="w-3 h-3 text-purple-400" />
                <a href={`tel:${COMPANY_INFO.headquarters.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {COMPANY_INFO.headquarters.phone}
                </a>
              </div>
              <div className="text-[11px] text-purple-400/90 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>{COMPANY_INFO.headquarters.hours}</span>
              </div>
            </div>

            {/* London UK Liaison */}
            <div className="p-3.5 rounded-2xl bg-[#1A123E] border border-purple-800/50 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-white">
                <span className="flex items-center gap-1.5 text-purple-300">
                  <MapPin className="w-3.5 h-3.5" />
                  London Liaison
                </span>
                <span className="text-[10px] text-purple-400 bg-purple-950 px-1.5 py-0.5 rounded border border-purple-800/50">UK Office</span>
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                {COMPANY_INFO.ukOffice.address}
              </p>
              <div className="text-xs text-purple-300 flex items-center gap-1.5 pt-1">
                <Phone className="w-3 h-3 text-purple-400" />
                <span>{COMPANY_INFO.ukOffice.phone}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Newsletter bar matching WeVersity */}
        <div className="mt-12 pt-8 border-t border-purple-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h5 className="text-white text-sm font-semibold">Stay in the loop with engineering insights</h5>
            <p className="text-xs text-purple-300/70">Bi-weekly software development, Laravel tips, and SEO trends.</p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md items-center gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your work email"
              required
              className="bg-[#1A123E] border border-purple-800/60 rounded-xl px-3.5 py-2 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] w-full"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-colors whitespace-nowrap shadow-md shadow-purple-950/40"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-8 border-t border-purple-900/40 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-400/80 gap-4">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('about')} className="hover:text-white">Privacy Policy</button>
            <button onClick={() => setActiveTab('about')} className="hover:text-white">Terms of Service</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-white">Sitemap</button>
            <span>v2.6 Enterprise</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
