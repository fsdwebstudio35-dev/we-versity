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
  MessageCircle,
  LogOut,
  Database
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
  onOpenSupabaseModal?: () => void;
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
  onOpenSupabaseModal,
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
    { id: 'students', label: 'Students' },
    { id: 'contests', label: 'Contests' },
    { id: 'contact', label: 'Contact' },
  ];

  const brandName = companyInfo?.name || 'WEVERSITY';
  const brandLogo = companyInfo?.logo || '/assets/aistudio/image_b3d7cc94.png';

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 border-b border-gray-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo matching uploaded screenshot */}
          <button 
            onClick={() => setActiveTab('home')}
            onDoubleClick={onOpenAdminLogin}
            title="Double-click to open Admin Portal"
            className="flex items-center gap-1.5 xl:gap-2.5 group text-left focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 xl:w-11 xl:h-11 rounded-full border-2 border-purple-200 bg-white flex items-center justify-center shadow-xs group-hover:border-[#6D28D9] transition-colors overflow-hidden animate-float">
              <img 
                src={brandLogo} 
                alt={`${brandName} Logo`} 
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-sm xl:text-lg tracking-tight text-[#18113C] group-hover:text-[#6D28D9] transition-colors">
                  {brandName.toUpperCase()}
                </span>
              </div>
              <p className="text-[9px] xl:text-[10px] text-gray-500 font-medium tracking-wide">
                Learn To Earn • Digital Agency
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-[10px] xl:text-[14px] font-bold transition-all py-1 whitespace-nowrap px-2 xl:px-3 ${
                    isActive
                      ? 'text-[#6D28D9] border-b-2 border-[#6D28D9]'
                      : 'text-gray-700 hover:text-[#6D28D9]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            
          </nav>

          {/* Right Action buttons matching screenshot */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
            {/* Currency badge - PKR only */}
            <div className="flex items-center bg-purple-50/80 rounded-full p-0.5 border border-purple-150 text-[9px] xl:text-[11px] shrink-0">
              <span className="px-1 xl:px-2 py-0.5 rounded-full font-bold bg-[#6D28D9] text-white shadow-xs">
                PKR
              </span>
            </div>
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

            <div className="pt-4 mt-2 border-t border-purple-100 flex flex-col gap-2.5 text-center">
              <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase py-2">
                Digital Excellence
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
