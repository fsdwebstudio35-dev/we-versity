import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Check, 
  Clock, 
  ShieldCheck, 
  Zap,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EstimatorConfig, DEFAULT_ESTIMATOR_CONFIG } from '../data/maatiData';

interface EstimatorViewProps {
  onOpenQuoteModal: (serviceId?: string) => void;
  currency: 'USD' | 'PKR' | 'GBP';
  setCurrency: (currency: 'USD' | 'PKR' | 'GBP') => void;
  config?: EstimatorConfig;
  isDeviceAuthorized?: boolean;
}

export const EstimatorView: React.FC<EstimatorViewProps> = ({
  onOpenQuoteModal,
  currency,
  setCurrency,
  config,
  isDeviceAuthorized
}) => {
  const activeConfig = config || DEFAULT_ESTIMATOR_CONFIG;
  const projectTypes = activeConfig.projectTypes && activeConfig.projectTypes.length > 0
    ? activeConfig.projectTypes
    : DEFAULT_ESTIMATOR_CONFIG.projectTypes;
  const scaleOptions = activeConfig.scaleOptions && activeConfig.scaleOptions.length > 0
    ? activeConfig.scaleOptions
    : DEFAULT_ESTIMATOR_CONFIG.scaleOptions;
  const designTiers = activeConfig.designTiers && activeConfig.designTiers.length > 0
    ? activeConfig.designTiers
    : DEFAULT_ESTIMATOR_CONFIG.designTiers;
  const backendOptions = activeConfig.backendOptions && activeConfig.backendOptions.length > 0
    ? activeConfig.backendOptions
    : DEFAULT_ESTIMATOR_CONFIG.backendOptions;
  const addonOptions = activeConfig.addonOptions && activeConfig.addonOptions.length > 0
    ? activeConfig.addonOptions
    : DEFAULT_ESTIMATOR_CONFIG.addonOptions;

  // Config state
  const [projectType, setProjectType] = useState<string>(() => projectTypes[0]?.id || 'custom-web');
  const [scale, setScale] = useState<string>(() => scaleOptions[1]?.id || scaleOptions[0]?.id || 'standard');
  const [designTier, setDesignTier] = useState<string>(() => designTiers[1]?.id || designTiers[0]?.id || 'bespoke');
  const [backendComplexity, setBackendComplexity] = useState<string>(() => backendOptions[1]?.id || backendOptions[0]?.id || 'moderate');
  const [addons, setAddons] = useState<string[]>(['seo', 'payment']);

  const toggleAddon = (id: string) => {
    setAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Safe Selection Calculation
  const selectedTypeObj = projectTypes.find(p => p.id === projectType) || projectTypes[0] || { id: 'custom-web', name: 'Custom Web Application', baseUSD: 850, weeks: 3 };
  const selectedScaleObj = scaleOptions.find(s => s.id === scale) || scaleOptions[0] || { id: 'standard', label: 'Standard Business', multiplier: 1.0, weeksDelta: 0 };
  const selectedDesignObj = designTiers.find(d => d.id === designTier) || designTiers[0] || { id: 'clean', label: 'Modern & Clean', costUSD: 0, desc: '' };
  const selectedBackendObj = backendOptions.find(b => b.id === backendComplexity) || backendOptions[0] || { id: 'light', label: 'Lightweight', costUSD: 0 };
  
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

  const pkrRate = activeConfig.currencyRates?.PKR ?? 280;
  const gbpRate = activeConfig.currencyRates?.GBP ?? 0.79;

  const formatCurrency = (amountUSD: number) => {
    if (currency === 'PKR') {
      const pkr = Math.round(amountUSD * pkrRate);
      return `₨ ${pkr.toLocaleString()}`;
    } else if (currency === 'GBP') {
      const gbp = Math.round(amountUSD * gbpRate);
      return `£ ${gbp.toLocaleString()}`;
    }
    return `$ ${Math.round(amountUSD).toLocaleString()}`;
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
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section matching Courses Style */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9]"></span>
          <span>QUICK BALLPARK</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#18113C] tracking-tight">
          Instant Cost <span className="text-[#6D28D9]">Estimator</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Select your project parameters below to receive an instant, accurate ballpark estimate for your next digital venture.
        </p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setProjectType(type.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    projectType === type.id
                      ? 'bg-purple-50 border-purple-400 shadow-sm ring-1 ring-purple-400'
                      : 'bg-[#FAF9FD] border-purple-100 hover:border-purple-200'
                  }`}
                >
                  <div className="text-sm font-bold text-[#18113C]">{type.name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Base timeline: {type.weeks} weeks</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Project Scale */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] block">
              2. Scale & Complexity
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {scaleOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScale(opt.id)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    scale === opt.id
                      ? 'bg-purple-50 border-purple-400 shadow-sm ring-1 ring-purple-400'
                      : 'bg-[#FAF9FD] border-purple-100 hover:border-purple-200'
                  }`}
                >
                  <div className="text-sm font-bold text-[#18113C]">{opt.label}</div>
                  <div className="text-[10px] text-[#6D28D9] font-bold mt-0.5">x{opt.multiplier.toFixed(1)} Scope</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: UI/UX Design Tier */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] block">
              3. UI/UX Design Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {designTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setDesignTier(tier.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    designTier === tier.id
                      ? 'bg-purple-50 border-purple-400 shadow-sm ring-1 ring-purple-400'
                      : 'bg-[#FAF9FD] border-purple-100 hover:border-purple-200'
                  }`}
                >
                  <div className="text-sm font-bold text-[#18113C]">{tier.label}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{tier.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Add-ons */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] block">
              4. Features & Add-ons
            </label>
            <div className="flex flex-wrap gap-2.5">
              {addonOptions.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    addons.includes(addon.id)
                      ? 'bg-[#6D28D9] text-white border-[#6D28D9] shadow-md shadow-purple-600/20'
                      : 'bg-[#FAF9FD] border-purple-100 text-gray-700 hover:border-purple-200'
                  }`}
                >
                  {addons.includes(addon.id) ? <Check className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5 opacity-40" />}
                  <span>{addon.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#18113C] to-[#0C081F] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-[#6D28D9]/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-purple-300/80">Estimate Summary</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase border border-emerald-500/20">Accurate</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-end justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="text-[10px] text-purple-300 font-bold uppercase tracking-tight">Total Investment</div>
                    <div className="text-4xl font-display font-black tracking-tight">{formatCurrency(baseCalculatedUSD)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-purple-300 font-bold uppercase tracking-tight">Timeline</div>
                    <div className="text-lg font-bold flex items-center justify-end gap-1.5">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      {totalEstimatedWeeks} Weeks
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Selected Stack & Parameters</div>
                  <ul className="space-y-2.5">
                    <li className="flex items-center gap-2 text-xs font-medium text-white/90">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      {selectedTypeObj.name}
                    </li>
                    <li className="flex items-center gap-2 text-xs font-medium text-white/90">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      {selectedScaleObj.label} Multiplier
                    </li>
                    <li className="flex items-center gap-2 text-xs font-medium text-white/90">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      {selectedDesignObj.label} Design
                    </li>
                    <li className="flex items-center gap-2 text-xs font-medium text-white/90">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Backend: {selectedBackendObj.label}
                    </li>
                    {addons.length > 0 && (
                      <li className="flex items-center gap-2 text-xs font-medium text-white/90">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        {addons.length} Custom Feature Add-ons
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <button
                  onClick={handleCelebrateEstimate}
                  className="w-full py-4 rounded-2xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-purple-950/40 transition-all flex items-center justify-center gap-2.5 group"
                >
                  <Sparkles className="w-4 h-4 text-purple-200 fill-purple-200" />
                  <span>Lock In This Pricing</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-[10px] text-center text-white/40 leading-relaxed italic">
                  * This estimate covers development, architecture, and basic QA. Excludes hosting fees & 3rd party API costs.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-purple-50 border border-purple-100 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#6D28D9]" />
              <div className="text-xs font-bold text-[#18113C]">Production Guarantee</div>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Every estimate includes a <strong>fixed-price guarantee</strong> once the scope is finalized. No hourly billing surprises or scope creep charges.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
