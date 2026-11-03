import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Code2, 
  Sparkles, 
  Clock, 
  Cpu,
  ArrowRight,
  Phone,
  Calendar
} from 'lucide-react';
import { AboutData, DEFAULT_ABOUT_DATA } from '../data/aboutData';

interface AboutViewProps {
  onOpenQuoteModal: () => void;
  setActiveTab: (tab: string) => void;
  aboutData?: AboutData;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenQuoteModal,
  setActiveTab,
  aboutData: propAboutData
}) => {
  const [data, setData] = useState<AboutData>(() => {
    if (propAboutData) return propAboutData;
    try {
      const saved = localStorage.getItem('weversity_about_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.hero && parsed.milestones && parsed.leadership) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_ABOUT_DATA;
  });

  useEffect(() => {
    if (propAboutData) {
      setData(propAboutData);
    }
  }, [propAboutData]);

  // Listen to custom event or storage event for instant live update
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'weversity_about_data' && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };
    const handleCustomSync = (e: Event) => {
      const customEvent = e as CustomEvent<AboutData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      } else {
        const saved = localStorage.getItem('weversity_about_data');
        if (saved) {
          try {
            setData(JSON.parse(saved));
          } catch {}
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('weversity_about_updated', handleCustomSync);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('weversity_about_updated', handleCustomSync);
    };
  }, []);

  const getPrincipleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Clock':
        return <Clock className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const lahoreOffice = data.offices?.lahore || DEFAULT_ABOUT_DATA.offices.lahore;
  const londonOffice = data.offices?.london || DEFAULT_ABOUT_DATA.offices.london;
  const hero = data.hero || DEFAULT_ABOUT_DATA.hero;
  const principles = data.principles || DEFAULT_ABOUT_DATA.principles;
  const milestones = data.milestones || DEFAULT_ABOUT_DATA.milestones;
  const leadership = data.leadership || DEFAULT_ABOUT_DATA.leadership;
  const cta = data.cta || DEFAULT_ABOUT_DATA.cta;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 text-xs font-bold shadow-xs">
          <Building2 className="w-3.5 h-3.5 text-[#6D28D9]" />
          <span>{hero.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-950 tracking-tight leading-tight">
          {hero.title}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {hero.subtitle}
        </p>
      </div>

      {/* Dual Office Presence Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Lahore HQ */}
        <div className="p-8 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-6 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-purple-400 transition-all">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9] flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {lahoreOffice.label || 'Principal Engineering Hub'}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 font-bold">
              {lahoreOffice.city || 'Lahore, Pakistan'}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-display font-bold text-gray-900">{lahoreOffice.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {lahoreOffice.address}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2 text-xs">
            <div className="text-gray-600 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#6D28D9]" />
              <span>Direct Contact: <strong className="text-gray-900 font-semibold">{lahoreOffice.phone}</strong></span>
            </div>
            <div className="text-gray-600 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#6D28D9]" />
              <span>Working Hours: <strong className="text-gray-900 font-semibold">{lahoreOffice.hours}</strong></span>
            </div>
            <div className="text-gray-600">
              {lahoreOffice.specialtyLabel || 'Core Disciplines'}: <strong className="text-[#6D28D9] font-semibold">{lahoreOffice.specialtyValue}</strong>
            </div>
          </div>
        </div>

        {/* London Office */}
        <div className="p-8 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-6 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-purple-300 transition-all">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-700 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {londonOffice.label || 'European Client Liaison'}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
              {londonOffice.city || 'London, United Kingdom'}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-display font-bold text-gray-900">{londonOffice.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {londonOffice.address}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2 text-xs">
            <div className="text-gray-600 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-indigo-600" />
              <span>UK Direct Line: <strong className="text-gray-900 font-semibold">{londonOffice.phone}</strong></span>
            </div>
            <div className="text-gray-600 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Working Hours: <strong className="text-gray-900 font-semibold">{londonOffice.hours}</strong></span>
            </div>
            <div className="text-gray-600">
              {londonOffice.specialtyLabel || 'Core Focus'}: <strong className="text-indigo-700 font-semibold">{londonOffice.specialtyValue}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Core Engineering Manifesto / Values */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9]">What Drives Us</span>
          <h2 className="text-3xl font-display font-bold text-gray-950">Our Engineering Principles</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((v) => (
            <div key={v.id} className="group p-6 rounded-3xl bg-white border border-purple-100 space-y-3 shadow-xs hover:-translate-y-1 hover:shadow-lg hover:border-purple-400 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6D28D9] group-hover:bg-[#6D28D9] group-hover:text-white transition-all duration-300">
                {getPrincipleIcon(v.icon)}
              </div>
              <h4 className="font-bold text-gray-900 text-base">{v.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline of Milestones */}
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9]">A Decade of Growth</span>
          <h2 className="text-3xl font-display font-bold text-gray-950">Our Journey (2016 - 2026)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m) => (
            <div 
              key={m.id}
              className="p-6 rounded-3xl bg-white border border-purple-100 space-y-3 relative hover:-translate-y-1 hover:shadow-lg hover:border-purple-400 shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-display font-extrabold text-[#6D28D9] block">
                  {m.year}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-100 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Milestone
                </span>
              </div>
              <h4 className="text-base font-bold text-gray-900">{m.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9]">The Architects</span>
          <h2 className="text-3xl font-display font-bold text-gray-950">Leadership &amp; Engineering Leads</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((lead) => (
            <div key={lead.id} className="p-6 rounded-3xl bg-white border border-purple-100 space-y-4 text-center shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-purple-400 transition-all">
              <img
                src={lead.avatar}
                alt={lead.name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-purple-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/aistudio/image_f804651e.png';
                }}
              />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-gray-900">{lead.name}</h4>
                <div className="text-xs font-bold text-[#6D28D9]">{lead.role}</div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {lead.bio}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setActiveTab('team')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs tracking-wide bg-purple-50 text-[#6D28D9] border border-purple-200 hover:bg-[#6D28D9] hover:text-white transition-all shadow-xs group"
          >
            <span>Explore Full Team &amp; Open Positions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-150 text-center space-y-6 shadow-sm">
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-950">
          {cta.title}
        </h3>
        <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
          {cta.desc}
        </p>
        <button
          onClick={onOpenQuoteModal}
          className="px-8 py-3.5 rounded-xl font-bold text-xs tracking-wide text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-all inline-flex items-center gap-2 shadow-md shadow-purple-600/25"
        >
          <Sparkles className="w-4 h-4 text-purple-200" />
          <span>{cta.buttonText}</span>
        </button>
      </div>

    </div>
  );
};
