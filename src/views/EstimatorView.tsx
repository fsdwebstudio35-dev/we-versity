import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Check, 
  Clock, 
  ShieldCheck, 
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EstimatorViewProps {
  onOpenQuoteModal: (serviceId?: string) => void;
  currency: 'USD' | 'PKR' | 'GBP';
  setCurrency: (currency: 'USD' | 'PKR' | 'GBP') => void;
}

export const EstimatorView: React.FC<EstimatorViewProps> = ({
  onOpenQuoteModal,
  currency,
  setCurrency
}) => {
  // Config state
  const [projectType, setProjectType] = useState<string>('custom-web');
  const [scale, setScale] = useState<string>('standard');
  const [designTier, setDesignTier] = useState<string>('bespoke');
  const [backendComplexity, setBackendComplexity] = useState<string>('moderate');
  const [addons, setAddons] = useState<string[]>(['seo', 'payment']);

  const projectTypes = [
    { id: 'custom-web', name: 'Custom Web Application', baseUSD: 850, weeks: 3 },
    { id: 'wordpress-woo', name: 'WordPress & WooCommerce Store', baseUSD: 700, weeks: 2 },
    { id: 'laravel-app', name: 'Custom Laravel Software / Portal', baseUSD: 1400, weeks: 4 },
    { id: 'saas-platform', name: 'Multi-Tenant SaaS Platform', baseUSD: 2200, weeks: 6 },
    { id: 'mobile-app', name: 'Flutter Mobile App (iOS & Android)', baseUSD: 1800, weeks: 5 },
    { id: 'erp-pos', name: 'Custom ERP, CRM & POS System', baseUSD: 1600, weeks: 4 },
  ];

  const scaleOptions = [
    { id: 'starter', label: 'Compact / MVP (1 - 5 Views)', multiplier: 0.85, weeksDelta: -0.5 },
    { id: 'standard', label: 'Standard Business (6 - 12 Views)', multiplier: 1.0, weeksDelta: 0 },
    { id: 'large', label: 'Comprehensive (13 - 25 Views)', multiplier: 1.35, weeksDelta: 1.5 },
    { id: 'enterprise', label: 'Enterprise (25+ Modules)', multiplier: 1.8, weeksDelta: 3 },
  ];

  const designTiers = [
    { id: 'clean', label: 'Modern & Clean', costUSD: 0, desc: 'Responsive, crisp typography, clean layout' },
    { id: 'bespoke', label: 'Bespoke Custom UI/UX', costUSD: 250, desc: 'Hand-tailored branding, micro-interactions' },
    { id: 'interactive', label: 'High-Impact Interactive / 3D', costUSD: 500, desc: 'Advanced animations, custom graphics' }
  ];

  const backendOptions = [
    { id: 'light', label: 'Lightweight / Headless', costUSD: 0 },
    { id: 'moderate', label: 'Standard REST API & Auth', costUSD: 200 },
    { id: 'complex', label: 'Advanced RBAC, Queues & Cloud DB', costUSD: 550 },
  ];

  const addonOptions = [
    { id: 'payment', name: 'Payment Gateway (Stripe/PayPal/Local)', costUSD: 150 },
    { id: 'seo', name: 'Advanced Technical SEO & Schema Audit', costUSD: 180 },
    { id: 'multilingual', name: 'Multilingual / Multi-Currency Logic', costUSD: 140 },
    { id: 'notifications', name: 'SMS & WhatsApp Notification Hooks', costUSD: 120 },
    { id: 'hypercare', name: 'Extended 90-Day SLA & Priority Maintenance', costUSD: 220 },
  ];

  const toggleAddon = (id: string) => {
    setAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Calculation
  const selectedTypeObj = projectTypes.find(p => p.id === projectType) || projectTypes[0];
  const selectedScaleObj = scaleOptions.find(s => s.id === scale) || scaleOptions[1];
  const selectedDesignObj = designTiers.find(d => d.id === designTier) || designTiers[1];
  const selectedBackendObj = backendOptions.find(b => b.id === backendComplexity) || backendOptions[1];
  
  const addonsTotalUSD = addons.reduce((sum, currentAddonId) => {
    const item = addonOptions.find(a => a.id === currentAddonId);
    return sum + (item ? item.costUSD : 0);
  }, 0);

  const baseCalculatedUSD = Math.round(
    (selectedTypeObj.baseUSD * selectedScaleObj.multiplier) +
    selectedDesignObj.costUSD +
    selectedBackendObj.costUSD +
    addonsTotalUSD
  );

  const totalEstimatedWeeks = Math.max(2, Math.round(selectedTypeObj.weeks + selectedScaleObj.weeksDelta));

  const formatCurrency = (amountUSD: number) => {
    if (currency === 'PKR') {
      const pkr = amountUSD * 280;
      return `₨ ${pkr.toLocaleString()}`;
    } else if (currency === 'GBP') {
      const gbp = Math.round(amountUSD * 0.79);
      return `£ ${gbp.toLocaleString()}`;
    }
    return `$ ${amountUSD.toLocaleString()}`;
  };

  const handleCelebrateEstimate = () => {
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch (e) {
      // ignore
    }
    onOpenQuoteModal(selectedTypeObj.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 text-xs font-bold">
          <Calculator className="w-3.5 h-3.5" />
          <span>Transparent Pricing Estimator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-950 tracking-tight">
          Calculate Your Project Scope & Cost
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          No hidden fees or unexpected extras. Configure your requirements below for an instant ballpark estimate and delivery timeline.
        </p>

        {/* Currency Badge - PKR Only */}
        <div className="inline-flex items-center gap-1.5 bg-white rounded-2xl px-4 py-1.5 border border-purple-200 shadow-sm mt-2 text-xs font-bold text-[#6D28D9]">
          <span className="w-2 h-2 rounded-full bg-[#6D28D9]"></span>
          <span>Currency: Pakistani Rupee (PKR - ₨)</span>
        </div>
      </div>

      {/* Main Estimator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Options Form */}
        <div className="lg:col-span-7 space-y-8 p-6 sm:p-8 rounded-3xl bg-white border border-purple-100 shadow-md">
          
          {/* Step 1: Project Type */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] block">
              1. Select Project Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {projectTypes.map((pt) => {
                const isSelected = projectType === pt.id;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setProjectType(pt.id)}
                    className={`p-3.5 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-50 border-[#6D28D9] text-[#6D28D9] shadow-xs ring-1 ring-purple-200'
                        : 'bg-white border-purple-100 text-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <span>{pt.name}</span>
                    <span className="text-[11px] text-[#6D28D9] font-extrabold">{formatCurrency(pt.baseUSD)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Project Scope / Scale */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] block">
              2. Scope Size & Module Volume
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {scaleOptions.map((s) => {
                const isSelected = scale === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setScale(s.id)}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-purple-50 border-[#6D28D9] text-[#6D28D9] font-bold ring-1 ring-purple-200'
                        : 'bg-white border-purple-100 text-gray-700 hover:border-purple-300'
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Design Tier */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] block">
              3. UI/UX Design Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {designTiers.map((d) => {
                const isSelected = designTier === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDesignTier(d.id)}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all flex flex-col justify-between space-y-1 ${
                      isSelected
                        ? 'bg-purple-50 border-[#6D28D9] text-[#6D28D9] font-bold ring-1 ring-purple-200'
                        : 'bg-white border-purple-100 text-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <span>{d.label}</span>
                    <span className="text-[10px] text-gray-500">{d.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Backend & Database Architecture */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] block">
              4. Backend Complexity & API
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {backendOptions.map((b) => {
                const isSelected = backendComplexity === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setBackendComplexity(b.id)}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-purple-50 border-[#6D28D9] text-[#6D28D9] font-bold ring-1 ring-purple-200'
                        : 'bg-white border-purple-100 text-gray-700 hover:border-purple-300'
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 5: Optional Engineering Addons */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] block">
              5. Integrations & Special Features
            </label>
            <div className="space-y-2">
              {addonOptions.map((addon) => {
                const isChecked = addons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                      isChecked
                        ? 'bg-purple-50/70 border-[#6D28D9] text-[#6D28D9] font-bold'
                        : 'bg-white border-purple-100 text-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        isChecked ? 'bg-[#6D28D9] border-[#6D28D9] text-white' : 'border-gray-300'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{addon.name}</span>
                    </div>
                    <span className="text-[11px] font-extrabold text-[#6D28D9]">+{formatCurrency(addon.costUSD)}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Sticky Calculation Summary Card */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-purple-200 shadow-xl shadow-purple-900/10 space-y-6 relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Scope Summary
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" /> ~{totalEstimatedWeeks} Weeks Delivery
              </span>
            </div>

            {/* Price Large Number */}
            <div className="space-y-1">
              <span className="text-xs text-gray-500 font-medium">Estimated Project Investment</span>
              <div className="text-4xl sm:text-5xl font-display font-extrabold text-gray-950 tracking-tight">
                <span className="text-[#6D28D9]">
                  {formatCurrency(baseCalculatedUSD)}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Includes 100% full source code ownership, database schemas, and 90-day warranty.
              </p>
            </div>

            {/* Line-item list */}
            <div className="space-y-2.5 text-xs border-t border-gray-100 pt-4 text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Selected Type:</span>
                <span className="font-bold text-gray-900">{selectedTypeObj.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Scope Level:</span>
                <span className="font-bold text-gray-900">{selectedScaleObj.label.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Design Tier:</span>
                <span className="font-bold text-gray-900">{selectedDesignObj.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Backend:</span>
                <span className="font-bold text-gray-900">{selectedBackendObj.label.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Active Addons:</span>
                <span className="font-bold text-[#6D28D9]">{addons.length} selected</span>
              </div>
            </div>

            {/* Confidence Bullets */}
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Fixed-scope written contract</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#6D28D9] shrink-0" />
                <span>Weekly sprint demos & staging link</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Zero vendor lock-in or recurring site fees</span>
              </div>
            </div>

            {/* CTA button */}
            <button
              onClick={handleCelebrateEstimate}
              className="w-full py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-[#6D28D9] hover:bg-[#5B21B6] shadow-xl shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-purple-200 fill-purple-200" />
              <span>Lock In This Scope & Get Proposal</span>
            </button>

            <div className="text-center">
              <span className="text-[11px] text-gray-500">
                Or discuss with our lead engineer on WhatsApp: 
                <a 
                  href="https://wa.me/923046446541" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-700 hover:underline ml-1 font-bold"
                >
                  +92 304 6446 541
                </a>
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
