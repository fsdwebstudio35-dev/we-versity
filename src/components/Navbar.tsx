import React, { useState } from 'react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  Globe,
  ShoppingBag,
  Code2,
  Layers,
  Smartphone,
  TrendingUp,
  Cpu,
  Puzzle,
  MessageCircle
} from 'lucide-react';
import { COMPANY_INFO, SERVICES, ServiceItem } from '../data/maatiData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuoteModal: (serviceId?: string) => void;
  onSelectService: (service: ServiceItem) => void;
  currency: 'USD' | 'PKR' | 'GBP';
  setCurrency: (currency: 'USD' | 'PKR' | 'GBP') => void;
  isDeviceAuthorized: boolean;
  onOpenAdminLogin: () => void;
  onOpenAdminPanel: () => void;
  companyInfo?: any;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuoteModal,
  onSelectService,
  currency,
  setCurrency,
  isDeviceAuthorized,
  onOpenAdminLogin,
  onOpenAdminPanel,
  companyInfo
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-4 h-4 text-[#6D28D9]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case 'Code2': return <Code2 className="w-4 h-4 text-purple-600" />;
      case 'Layers': return <Layers className="w-4 h-4 text-indigo-600" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4 text-violet-600" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-amber-600" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-rose-600" />;
      case 'Puzzle': return <Puzzle className="w-4 h-4 text-teal-600" />;
      default: return <Globe className="w-4 h-4 text-[#6D28D9]" />;
    }
  };

  interface NavItem {
    id: string;
    label: string;
    hasDropdown?: boolean;
  }

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'team', label: 'Team' },
    { id: 'estimator', label: 'Cost Estimator' },
    { id: 'about', label: 'About' },
    { id: 'teachers', label: 'Teachers' },
    { id: 'contact', label: 'Contact' },
  ];

  const brandName = companyInfo?.name || 'WEVERSITY';
  const brandLogo = companyInfo?.logo || '/assets/aistudio/image_b3d7cc94.png';

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 border-b border-gray-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo matching uploaded screenshot */}
          <button 
            onClick={() => setActiveTab('home')}
            onDoubleClick={onOpenAdminLogin}
            title="Double-click to open Admin Portal"
            className="flex items-center gap-3 group text-left focus:outline-none shrink-0"
          >
            <div className="w-12 h-12 rounded-full border-2 border-purple-200 bg-white flex items-center justify-center shadow-xs group-hover:border-[#6D28D9] transition-colors overflow-hidden animate-float">
              <img 
                src={brandLogo} 
                alt={`${brandName} Logo`} 
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-tight text-[#18113C] group-hover:text-[#6D28D9] transition-colors">
                  {brandName.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium tracking-wide">
                Learn To Earn • Digital Agency
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              


              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-sm font-semibold transition-all py-1.5 ${
                    isActive
                      ? 'text-[#6D28D9] border-b-2 border-[#6D28D9]'
                      : `text-gray-700 hover:text-[#6D28D9] ${item.id === 'about' ? 'hover:bg-purple-50/50 rounded-lg px-2' : ''}`
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons matching screenshot */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Currency badge - PKR only */}
            <div className="flex items-center bg-purple-50/80 rounded-full p-0.5 border border-purple-150 text-[11px]">
              <span className="px-2.5 py-0.5 rounded-full font-bold bg-[#6D28D9] text-white shadow-xs">
                PKR
              </span>
            </div>

            {/* WhatsApp Chat Button - pill with light green bg */}
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Maati%20Tech%20team,%20I'd%20like%20to%20discuss%20a%20new%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full font-bold text-xs text-emerald-800 bg-[#E8FAF0] hover:bg-[#D7F5E3] border border-emerald-200/90 transition-all flex items-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Get Free Quote Button - solid purple pill */}
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-5 py-2.5 rounded-full font-bold text-xs tracking-wide text-white bg-[#6D28D9] hover:bg-[#5B21B6] shadow-md shadow-purple-600/25 transition-all flex items-center gap-1.5 group"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-gray-700 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-purple-100 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-purple-50 text-[#6D28D9] border border-purple-200'
                    : 'text-gray-700 hover:bg-purple-50/50'
                }`}
              >
                <span>{item.label}</span>
                {item.hasDropdown && <span className="text-xs text-[#6D28D9] font-medium">8 Services</span>}
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-purple-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 rounded-full font-bold text-xs tracking-wide text-white bg-[#6D28D9] hover:bg-[#5B21B6] shadow-md shadow-purple-600/25 flex items-center justify-center gap-2"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Maati%20Tech%20team,%20I'd%20like%20to%20discuss%20a%20new%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full text-center text-xs font-bold text-emerald-800 bg-[#E8FAF0] border border-emerald-200"
              >
                WhatsApp Chat: {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
