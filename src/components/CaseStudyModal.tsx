import React from 'react';
import { X, MapPin, Calendar, Layers, Sparkles, ExternalLink, Globe } from 'lucide-react';
import { PortfolioProject } from '../data/maatiData';

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onOpenQuoteModal: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenQuoteModal
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-gray-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white border border-purple-150 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner image with overlay */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white backdrop-blur text-xs font-bold shadow-lg flex items-center gap-1.5 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Website</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#6D28D9] text-white mb-2 shadow-xs">
              {project.categoryLabel}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white drop-shadow-sm">
              {project.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-purple-200 mt-2">
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-purple-300" />
                Client: {project.client}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-purple-300" />
                {project.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-purple-300" />
                Delivered: {project.year}
              </span>
            </div>
          </div>
        </div>

        {/* Modal body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {project.results.map((res, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
                <div className="text-lg sm:text-2xl font-display font-extrabold text-[#6D28D9]">
                  {res.metric}
                </div>
                <div className="text-[11px] sm:text-xs text-gray-600 font-semibold mt-0.5">
                  {res.label}
                </div>
              </div>
            ))}
          </div>

          {/* Project Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] mb-1.5">Executive Overview</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* The Challenge */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-1.5">The Core Challenge</h4>
            <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* The Solution */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6D28D9] mb-1.5">Our Engineering Solution</h4>
            <p className="text-xs sm:text-sm text-purple-950 leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Technologies & Architecture</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500 text-center sm:text-left">
              Want a similar high-performance architecture for your business?
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => {
                  onClose();
                  onOpenQuoteModal();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-all flex items-center justify-center gap-2 shadow-md shadow-purple-600/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                <span>Discuss Similar Project</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
