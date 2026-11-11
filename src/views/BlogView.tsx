import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Search, 
  Sparkles
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/maatiData';

interface BlogViewProps {
  onSelectArticle: (article: BlogPost) => void;
  onOpenQuoteModal: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  onSelectArticle,
  onOpenQuoteModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Web Engineering', label: 'Web Engineering' },
    { id: 'Cloud & SaaS', label: 'Cloud & SaaS' },
    { id: 'Digital Marketing', label: 'Digital Marketing & SEO' }
  ];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section matching Courses Style */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9]"></span>
          <span>TECH INSIGHTS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#18113C] tracking-tight">
          Articles &amp; <span className="text-[#6D28D9]">Playbooks</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Deep dives into software architecture, Laravel best practices, and high-speed engineering written by KMAWD engineers.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-purple-100 shadow-sm">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === c.id
                  ? 'bg-[#6D28D9] text-white shadow-md shadow-purple-600/20'
                  : 'bg-purple-50/50 text-gray-600 hover:text-gray-900 hover:bg-purple-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
          />
        </div>
      </div>

      {/* Articles Grid matching Courses 4-column style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredPosts.map((post, idx) => (
          <div
            key={post.id}
            onClick={() => onSelectArticle(post)}
            className={`group p-6 rounded-3xl bg-white transition-all duration-300 flex flex-col justify-between relative overflow-hidden border ${
              idx % 4 === 0 
                ? 'border-purple-300 shadow-md shadow-purple-900/5' 
                : 'border-purple-100/90'
            } hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/12 hover:border-purple-400 cursor-pointer`}
          >
            <div className="space-y-4">
              {/* Category Icon Style */}
              <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-[#6D28D9] group-hover:text-white group-hover:border-[#6D28D9] text-[#6D28D9]">
                <BookOpen className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#6D28D9]">
                    {post.category}
                  </span>
                  <span className="text-[9px] text-gray-400 font-bold">{post.date}</span>
                </div>
                <h3 className="font-display font-bold text-base text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300 line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 group-hover:text-gray-600 mt-2 line-clamp-3 leading-relaxed transition-colors duration-300">
                  {post.excerpt}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(post.tags || []).slice(0, 2).map((t, i) => (
                  <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 border border-purple-100">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={post.author.avatar} alt="Author" className="w-6 h-6 rounded-full border border-purple-200" />
                <span className="text-[10px] font-bold text-gray-500">{post.author.name}</span>
              </div>

              <button
                className="w-9 h-9 rounded-full bg-[#6D28D9] text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#5B21B6] group-hover:scale-110 shadow-sm"
                aria-label="Read more"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Consultation Callout */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-150 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-display font-bold text-gray-950">
            Have a custom software problem to solve?
          </h3>
          <p className="text-gray-600 text-sm max-w-lg">
            Our senior software leads offer practical, no-fluff technical advisory sessions.
          </p>
        </div>
        <button
          onClick={onOpenQuoteModal}
          className="px-6 py-3.5 rounded-xl font-bold text-xs tracking-wide text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-all flex items-center gap-2 shadow-md shadow-purple-600/25"
        >
          <Sparkles className="w-4 h-4 text-purple-200" />
          <span>Consult With Our Authors</span>
        </button>
      </div>

    </div>
  );
};
