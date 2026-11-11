import React from 'react';
import { Trophy, Calendar, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { Contest } from '../data/maatiData';

interface ContestsViewProps {
  contests: Contest[];
}

export const ContestsView: React.FC<ContestsViewProps> = ({ contests }) => {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section matching Courses Style */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9]"></span>
          <span>CODING CHALLENGES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#18113C] tracking-tight">
          Win Prizes &amp; <span className="text-[#6D28D9]">Recognition</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Showcase your skills, compete with fellow students, and win exciting prizes. From 24-hour hackathons to monthly design challenges.
        </p>
      </div>

      {/* 2. Contests Grid matching Courses 4-column style */}
      {contests.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-purple-200">
          <Trophy className="w-12 h-12 text-purple-200 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#18113C]">No active contests</h3>
          <p className="text-sm text-gray-500 mt-1">Check back soon for upcoming challenges and hackathons.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {contests.map((contest, idx) => (
            <div 
              key={contest.id}
              className={`group p-6 rounded-3xl bg-white transition-all duration-300 flex flex-col justify-between relative overflow-hidden border ${
                idx % 4 === 0 
                  ? 'border-purple-300 shadow-md shadow-purple-900/5' 
                  : 'border-purple-100/90'
              } hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/12 hover:border-purple-400`}
            >
              <div className="space-y-4">
                {/* Contest Icon in square badge style */}
                <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 text-amber-600">
                  <Trophy className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest ${
                      contest.status === 'Live' ? 'bg-rose-600 text-white animate-pulse' : 
                      contest.status === 'Upcoming' ? 'bg-amber-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                      {contest.status}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold">{contest.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300">
                    {contest.title}
                  </h3>
                  <p className="text-xs text-gray-500 group-hover:text-gray-600 mt-2 line-clamp-3 leading-relaxed transition-colors duration-300">
                    {contest.description}
                  </p>
                </div>

                {/* Info Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 border border-purple-100">
                    {contest.prize}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Open Entry
                  </span>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 block font-medium">Grand Prize</span>
                  <span className="text-xs font-bold text-amber-600 group-hover:text-amber-700 transition-colors duration-300">
                    {contest.prize}
                  </span>
                </div>

                <a 
                  href={contest.link || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#6D28D9] text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#5B21B6] group-hover:scale-110 shadow-sm"
                  aria-label="View details"
                >
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <div className="p-6 rounded-3xl bg-white border border-purple-150 shadow-xs space-y-3 hover:border-purple-300 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#18113C]">Win Recognition</h3>
          <p className="text-xs text-gray-600 leading-relaxed">Top performers get featured on our website and social media platforms.</p>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-purple-150 shadow-xs space-y-3 hover:border-purple-300 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#18113C]">Cash & Rewards</h3>
          <p className="text-xs text-gray-600 leading-relaxed">From cash prizes to premium course vouchers and merchandise.</p>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-purple-150 shadow-xs space-y-3 hover:border-purple-300 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ExternalLink className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#18113C]">Internship Roles</h3>
          <p className="text-xs text-gray-600 leading-relaxed">Exceptional participants qualify for direct interview calls at KMAWD.</p>
        </div>
      </div>
    </div>
  );
};
