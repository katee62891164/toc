import React from 'react';
import { QuestionTypeInfo } from '../types/exam';

interface TypeHeaderProps {
  typeInfo: QuestionTypeInfo;
}

export const TypeHeader: React.FC<TypeHeaderProps> = ({ typeInfo }) => {
  return (
    <section className="mb-8">
      {/* Category Banner Bar matching PDF */}
      <div 
        style={{ backgroundColor: typeInfo.bannerColor }}
        className="px-5 py-2.5 text-white font-sans font-bold text-lg sm:text-xl rounded-t-xs shadow-xs"
      >
        Type {typeInfo.number}: {typeInfo.title}
      </div>

      <div className="bg-white border-x border-b border-slate-200 p-5 sm:p-6 space-y-4">
        {/* Seen In */}
        <div className="text-sm font-sans">
          <span className="font-bold text-[#1d70b8]">Seen in: </span>
          <span className="text-slate-800">{typeInfo.seenIn}</span>
        </div>

        {/* How to Spot It */}
        <div className="text-sm font-sans leading-relaxed">
          <span className="font-bold text-slate-800">How to spot it: </span>
          <span className="text-slate-700">{typeInfo.howToSpotIt}</span>
        </div>

        {/* The Recipe */}
        <div className="pt-1">
          <h3 className="font-bold text-[#1d70b8] text-base mb-2 font-sans">The recipe</h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm font-sans text-slate-800 leading-relaxed">
            {typeInfo.recipe.map((step, idx) => (
              <li key={idx}>
                {step.replace(/^\d+\.\s*/, '')}
              </li>
            ))}
          </ol>
        </div>

        {/* 🚩 TRAPS TO AVOID Box matching PDF */}
        <div className="mt-4 border-[1.5px] border-[#d32f2f] bg-white p-4 text-slate-900 rounded-xs">
          <div className="flex items-center gap-2 font-bold text-[#d32f2f] text-sm mb-2.5">
            <span>►</span>
            <span>TRAPS TO AVOID</span>
          </div>
          <ul className="space-y-1.5 text-sm pl-2">
            {typeInfo.traps.map((trap, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-800">
                <span className="text-[#d32f2f] font-bold text-base leading-none">•</span>
                <span>{trap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
