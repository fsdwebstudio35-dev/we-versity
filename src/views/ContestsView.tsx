import React from 'react';
import { Trophy, Calendar, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { Contest } from '../data/maatiData';

interface ContestsViewProps {
  contests: Contest[];
}

export const ContestsView: React.FC<ContestsViewProps> = ({ contests }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider shadow-xs">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>WeVersity Challenges</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#18113C] tracking-tight">
          Coding &amp; <span className="text-[#6D28D9]">Design Contests</span>
        </h1>
        
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Showcase your skills, compete with fellow students, and win exciting prizes. From 24-hour hackathons to monthly design challenges.
        </p>
      </div>

      {contests.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-purple-200">
          <Trophy className="w-12 h-12 text-purple-200 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#18113C]">No active contests</h3>
          <p className="text-sm text-gray-500 mt-1">Check back soon for upcoming challenges and hackathons.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.map((contest) => (
            <div key={contest.id} className="group bg-white rounded-3xl border border-purple-150 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 relative overflow-hidden">
                <img src={contest.image} alt={contest.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    contest.status === 'Live' ? 'bg-rose-600 text-white animate-pulse' : 
                    contest.status === 'Upcoming' ? 'bg-amber-500 text-white' : 'bg-gray-500 text-white'
                  }`}>
                    {contest.status}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-display font-bold text-[#18113C] group-hover:text-[#6D28D9] transition-colors">{contest.title}</h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{contest.description}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5 text-purple-700">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{contest.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-600">
                    <Award className="w-3.5 h-3.5" />
                    <span>{contest.prize}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <a 
                    href={contest.link || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-purple-50 text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#18113C]">Win Recognition</h3>
          <p className="text-xs text-gray-600 leading-relaxed">Top performers get featured on our website and social media platforms.</p>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#18113C]">Cash & Rewards</h3>
          <p className="text-xs text-gray-600 leading-relaxed">From cash prizes to premium course vouchers and merchandise.</p>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ExternalLink className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#18113C]">Internship Roles</h3>
          <p className="text-xs text-gray-600 leading-relaxed">Exceptional participants qualify for direct interview calls at WeVersity.</p>
        </div>
      </div>
    </div>
  );
};
