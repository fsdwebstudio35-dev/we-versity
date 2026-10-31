import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`fixed bottom-22 right-6 sm:right-7 z-40 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 border border-purple-400/30 focus:outline-none"
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300 stroke-[2.2]" />

        {/* Floating Tooltip */}
        <span className="absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-[#18113C] text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md">
          Scroll to Top
        </span>
      </button>
    </div>
  );
};
