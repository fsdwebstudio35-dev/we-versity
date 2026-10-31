import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/maatiData';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hello%20Maati%20Tech,%20I%20would%20like%20to%20discuss%20a%20new%20website%20/%20software%20project.`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 bg-[#00D084] hover:bg-[#00B875] text-white font-bold px-4 sm:px-5 py-3 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
        aria-label="Chat on WhatsApp with WeVersity"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs sm:text-sm font-bold tracking-tight">Chat on WhatsApp</span>
      </a>
    </div>
  );
};
