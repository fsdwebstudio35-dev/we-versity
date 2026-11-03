import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ChevronRight, 
  Sparkles, 
  Search,
  ExternalLink,
  Globe 
} from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/maatiData';

interface PortfolioViewProps {
  onSelectProject: (project: PortfolioProject) => void;
  onOpenQuoteModal: () => void;
  projects?: PortfolioProject[];
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  onSelectProject,
  onOpenQuoteModal,
  projects
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const projectList = projects && projects.length > 0 ? projects : PORTFOLIO_PROJECTS;

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'saas', label: 'SaaS Platforms' },
    { id: 'web', label: 'High-Speed Web' },
    { id: 'ecommerce', label: 'E-Commerce Stores' },
    { id: 'enterprise', label: 'Enterprise & ERP' },
    { id: 'mobile', label: 'Mobile Apps' }
  ];

  const filtered = projectList.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Case Studies & Track Record</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-950 tracking-tight">
          Proven Platforms. Measurable Outcomes.
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Over 250+ delivered projects since 2016. Here is a curated selection of SaaS applications, high-performance web systems, and custom mobile software.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-purple-100 shadow-sm">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#6D28D9] text-white shadow-md shadow-purple-600/20'
                  : 'bg-purple-50/50 text-gray-600 hover:text-gray-900 hover:bg-purple-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tech, client, or keyword..."
            className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
          />
        </div>

      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-white border border-purple-100 space-y-3">
          <p className="text-gray-500 text-sm">No projects found matching your filter criteria.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-[#6D28D9] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer rounded-3xl bg-white border border-purple-100 hover:border-purple-300 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#6D28D9] text-white shadow-xs">
                    {project.categoryLabel}
                  </span>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5 transition-colors z-10"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white">
                    <span className="flex items-center gap-1 drop-shadow-sm">
                      <Building2 className="w-3.5 h-3.5 text-purple-300" />
                      {project.client}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-purple-200">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-[#6D28D9] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Highlights Metric Box */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {project.results.slice(0, 2).map((r, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-center">
                        <div className="text-sm font-bold text-[#6D28D9]">{r.metric}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-2">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
                    >
                      <span>Visit Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <span className="text-xs font-bold text-[#6D28D9] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Case Study <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-150 text-center space-y-6 shadow-sm">
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-950">
          Have an architecture challenge in mind?
        </h3>
        <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
          From database query optimizations to full-stack multi-tenant development, let’s schedule a technical walkthrough.
        </p>
        <button
          onClick={() => onOpenQuoteModal()}
          className="px-8 py-3.5 rounded-xl font-bold text-xs tracking-wide text-white bg-[#6D28D9] hover:bg-[#5B21B6] shadow-xl shadow-purple-600/20 transition-all inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-purple-200" />
          <span>Discuss Your Project With Us</span>
        </button>
      </div>

    </div>
  );
};
