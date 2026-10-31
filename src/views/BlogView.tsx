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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Engineering Knowledge & Insights</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-950 tracking-tight">
          Articles, Playbooks & Tech Trends
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Deep dives into software architecture, Laravel best practices, high-speed frontend engineering, and search engine optimization written by WeVersity engineers.
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

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => onSelectArticle(post)}
            className="group cursor-pointer rounded-3xl bg-white border border-purple-100 hover:border-purple-300 p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 font-bold">
                  {post.category}
                </span>
                <span className="text-gray-500 flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-[#6D28D9]" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-[#6D28D9] transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-purple-200"
                />
                <div>
                  <div className="text-xs font-bold text-gray-900">{post.author.name}</div>
                  <div className="text-[10px] text-gray-500">{post.date}</div>
                </div>
              </div>

              <span className="text-xs font-bold text-[#6D28D9] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
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
