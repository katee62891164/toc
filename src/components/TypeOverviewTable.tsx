import React from 'react';
import { QUESTION_TYPES } from '../data/questionTypes';
import { COS3701_QUESTIONS } from '../data/cos3701Questions';
import { QuestionTypeId } from '../types/exam';

interface TypeOverviewTableProps {
  onSelectType: (typeId: QuestionTypeId) => void;
  activeTypeId?: QuestionTypeId | null;
}

export const TypeOverviewTable: React.FC<TypeOverviewTableProps> = ({
  onSelectType,
  activeTypeId
}) => {
  return (
    <div className="overflow-hidden border border-slate-300 bg-white mb-8">
      <div className="bg-[#1d3d63] px-5 py-3 text-white">
        <h3 className="font-serif font-bold text-base sm:text-lg">
          The question types, and how often they came up
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-800 border-collapse">
          <thead className="bg-[#1d3d63] text-white font-sans text-xs uppercase font-semibold">
            <tr>
              <th className="px-4 py-2.5 border-r border-[#2b517e]">Type</th>
              <th className="px-4 py-2.5 border-r border-[#2b517e]">Seen in</th>
              <th className="px-4 py-2.5">Questions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-sans">
            {QUESTION_TYPES.map(t => {
              const isSelected = activeTypeId === t.id;
              // Find matching questions for this type
              const typeQuestions = COS3701_QUESTIONS.filter(q => q.typeId === t.id);
              const questionCodes = typeQuestions.map((q, idx) => q.codeId || `W${idx + 1}`).join(', ');

              return (
                <tr
                  key={t.id}
                  onClick={() => onSelectType(t.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50 font-medium' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="px-4 py-3 border-r border-slate-200 font-semibold text-slate-900">
                    Type {t.number}: {t.title.split('&')[0].trim()}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-slate-700 text-xs">
                    {t.seenIn} ({t.markRange})
                  </td>
                  <td className="px-4 py-3 text-[#1d70b8] font-mono text-xs font-bold">
                    {questionCodes || `W${t.number}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
