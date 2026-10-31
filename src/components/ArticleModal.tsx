import React from 'react';
import { X, Clock, Calendar, Tag, Sparkles } from 'lucide-react';
import { BlogPost } from '../data/maatiData';

interface ArticleModalProps {
  article: BlogPost | null;
  onClose: () => void;
  onOpenQuoteModal: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenQuoteModal
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-gray-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white border border-purple-150 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-purple-50 via-white to-purple-50 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#6D28D9] text-white">
              {article.category}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#6D28D9]" />
              {article.readTime}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#6D28D9]" />
              {article.date}
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-display font-bold text-gray-950 leading-snug pr-8">
            {article.title}
          </h2>

          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
            <img 
              src={article.author.avatar} 
              alt={article.author.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
            />
            <div>
              <div className="text-xs font-bold text-gray-900">{article.author.name}</div>
              <div className="text-[11px] text-[#6D28D9] font-medium">{article.author.role} • WeVersity</div>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-5 max-h-[60vh] overflow-y-auto text-gray-700 leading-relaxed text-sm sm:text-base">
          {article.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Tags */}
          <div className="pt-6 border-t border-gray-100 flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-[#6D28D9]" />
            {article.tags.map((t, idx) => (
              <span key={idx} className="text-xs bg-purple-50 px-2.5 py-1 rounded-xl text-[#6D28D9] border border-purple-100 font-bold">
                #{t}
              </span>
            ))}
          </div>

          {/* Bottom callout */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-150 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-[#6D28D9]">Engineering Consultation</div>
              <div className="text-sm font-bold text-gray-900">Need expert guidance applying these principles to your product?</div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal();
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#6D28D9] hover:bg-[#5B21B6] whitespace-nowrap shadow-md shadow-purple-600/20"
            >
              Consult With Our Tech Leads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
