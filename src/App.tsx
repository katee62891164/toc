import React, { useState, useMemo } from 'react';
import { QUESTION_TYPES } from './data/questionTypes';
import { COS3701_QUESTIONS } from './data/cos3701Questions';
import { QuestionTypeId } from './types/exam';
import { QuestionCard } from './components/QuestionCard';
import { TypeHeader } from './components/TypeHeader';
import { TypeOverviewTable } from './components/TypeOverviewTable';
import { FormulaSheet } from './components/FormulaSheet';
import { 
  BookOpen, 
  Search, 
  Printer, 
  Eye, 
  EyeOff, 
  Sparkles, 
  RotateCcw,
  HelpCircle,
  FileText,
  Bookmark
} from 'lucide-react';

export default function App() {
  const [selectedType, setSelectedType] = useState<QuestionTypeId | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [globalHideAnswers, setGlobalHideAnswers] = useState(false);
  const [viewMode, setViewMode] = useState<'study-guide' | 'matrix' | 'cheatsheet'>('study-guide');

  // Filter questions based on selected type, year, and search
  const filteredQuestions = useMemo(() => {
    return COS3701_QUESTIONS.filter(q => {
      if (selectedType !== 'all' && q.typeId !== selectedType) {
        return false;
      }
      if (selectedYear !== 'all' && q.year !== selectedYear) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesVerbatim = q.verbatimQuestion.toLowerCase().includes(query);
        const matchesExplanation = q.simpleExplanation.toLowerCase().includes(query);
        const matchesAnswer = q.answer.toLowerCase().includes(query);
        const matchesYear = q.year.toString().includes(query);
        const matchesNumber = q.questionNumber.toLowerCase().includes(query);
        const matchesCode = (q.codeId || '').toLowerCase().includes(query);
        return matchesVerbatim || matchesExplanation || matchesAnswer || matchesYear || matchesNumber || matchesCode;
      }
      return true;
    });
  }, [selectedType, selectedYear, searchQuery]);

  // Group filtered questions by type
  const questionsByType = useMemo(() => {
    const map = new Map<QuestionTypeId, typeof filteredQuestions>();
    QUESTION_TYPES.forEach(t => map.set(t.id, []));
    filteredQuestions.forEach(q => {
      const list = map.get(q.typeId) || [];
      list.push(q);
      map.set(q.typeId, list);
    });
    return map;
  }, [filteredQuestions]);

  const handlePrint = () => {
    window.print();
  };

  const handleResetFilters = () => {
    setSelectedType('all');
    setSelectedYear('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between gap-8 print:hidden shadow-xs">
        {/* Zone 1: Brand title, one line */}
        <div className="flex items-center gap-2.5 shrink-0">
          <BookOpen className="h-5 w-5 text-[#1d3d63]" />
          <span className="text-base font-serif font-bold text-[#1d3d63] whitespace-nowrap block">
            COS3701 Written Questions Guide
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <button
            onClick={() => { setViewMode('study-guide'); setSelectedType('all'); }}
            className={`whitespace-nowrap transition-colors hover:text-[#1d3d63] ${
              viewMode === 'study-guide' && selectedType === 'all' ? 'text-[#1d3d63] font-bold border-b-2 border-[#1d3d63] pb-0.5' : ''
            }`}
          >
            Study Guide (2018–2026)
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            className={`whitespace-nowrap transition-colors hover:text-[#1d3d63] ${
              viewMode === 'matrix' ? 'text-[#1d3d63] font-bold border-b-2 border-[#1d3d63] pb-0.5' : ''
            }`}
          >
            Question Frequency Table
          </button>
          <button
            onClick={() => setViewMode('cheatsheet')}
            className={`whitespace-nowrap transition-colors hover:text-[#1d3d63] ${
              viewMode === 'cheatsheet' ? 'text-[#1d3d63] font-bold border-b-2 border-[#1d3d63] pb-0.5' : ''
            }`}
          >
            Theorems & Formulas
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-[#1d3d63] hover:bg-[#152e4d] px-3.5 py-1.5 text-xs font-semibold text-white rounded transition shadow-xs whitespace-nowrap"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </header>

      {/* Main Document Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* PDF Cover Header Section matching Page 1 */}
        <div className="mb-8 border-b border-slate-200 pb-6 print:border-none">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1d3d63] mb-2 leading-tight">
            COS3701 Written Questions: How to Tackle Each Type
          </h1>
          <p className="font-serif italic text-sm sm:text-base text-slate-700 mb-3 leading-relaxed">
            All written questions across past papers from 2018 to 2026 in 11 question types. For each type: how to spot it, a recipe, the traps, then every real question worked step by step.
          </p>
          <p className="text-xs sm:text-sm font-sans text-slate-800 mb-2 leading-relaxed">
            <strong>How to use this:</strong> read the recipe for a type, cover the answers, and try the real questions in your notebook. Then read my steps. Do the 'change one thing' variants from a blank page.
          </p>
          <p className="text-xs sm:text-sm font-sans text-slate-800 leading-relaxed">
            Every answer uses Cohen's Theoretical Computer Science formalisms and standard notation. Where diagrams are provided on the exam paper, they are clearly marked as <strong>[Diagram Given in Question Paper]</strong>. Where diagrams are the student's solution, they are placed in the answer as <strong>[Diagram of the Answer]</strong>.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="bg-white border border-slate-300 p-3 sm:p-4 mb-8 rounded shadow-xs print:hidden space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. 'bab', 'CNF', 'DPDA', '2PDA', 'W1')..."
                className="w-full rounded border border-slate-300 bg-slate-50 pl-8 pr-4 py-1.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#1d70b8] focus:outline-none"
              />
            </div>

            {/* Quick Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Year Filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded text-xs">
                <span className="text-slate-500 px-1 font-semibold">Year:</span>
                {(['all', 2026, 2025, 2024, 2021, 2019, 2018] as const).map(yr => (
                  <button
                    key={yr}
                    onClick={() => { setSelectedYear(yr); setViewMode('study-guide'); }}
                    className={`px-2 py-0.5 rounded transition ${
                      selectedYear === yr
                        ? 'bg-white text-[#1d3d63] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {yr === 'all' ? 'All' : yr}
                  </button>
                ))}
              </div>

              {/* Cover Answer Toggle */}
              <button
                onClick={() => setGlobalHideAnswers(prev => !prev)}
                className={`flex items-center gap-1.5 border px-2.5 py-1 text-xs rounded transition ${
                  globalHideAnswers
                    ? 'border-[#1d70b8] bg-blue-50 text-[#1d70b8] font-bold'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {globalHideAnswers ? (
                  <>
                    <EyeOff className="h-3 w-3 text-[#1d70b8]" />
                    <span>Answers Covered</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-3 w-3 text-slate-500" />
                    <span>Cover Answers</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Type Filter Buttons */}
          <div className="overflow-x-auto pb-1 flex items-center gap-1 pt-1 border-t border-slate-100">
            <button
              onClick={() => { setSelectedType('all'); setViewMode('study-guide'); }}
              className={`whitespace-nowrap px-2.5 py-1 text-xs rounded transition ${
                selectedType === 'all'
                  ? 'bg-[#1d3d63] text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Types
            </button>
            {QUESTION_TYPES.map(t => (
              <button
                key={t.id}
                onClick={() => { setSelectedType(t.id); setViewMode('study-guide'); }}
                className={`whitespace-nowrap px-2.5 py-1 text-xs rounded transition ${
                  selectedType === t.id
                    ? 'bg-[#1d70b8] text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Type {t.number}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode 1: Frequency Matrix */}
        {viewMode === 'matrix' && (
          <div>
            <TypeOverviewTable
              onSelectType={(typeId) => {
                setSelectedType(typeId);
                setViewMode('study-guide');
              }}
              activeTypeId={selectedType === 'all' ? undefined : selectedType}
            />
          </div>
        )}

        {/* View Mode 2: Cheatsheet */}
        {viewMode === 'cheatsheet' && (
          <div>
            <FormulaSheet />
          </div>
        )}

        {/* View Mode 3: Study Guide matching PDF layout */}
        {viewMode === 'study-guide' && (
          <div>
            {/* Show Table of Types on first view if no specific filter */}
            {selectedType === 'all' && searchQuery === '' && selectedYear === 'all' && (
              <TypeOverviewTable
                onSelectType={(typeId) => {
                  setSelectedType(typeId);
                }}
              />
            )}

            {filteredQuestions.length === 0 ? (
              <div className="border border-slate-300 bg-white p-8 text-center my-6">
                <HelpCircle className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <h3 className="font-bold text-slate-800 text-sm">No questions found matching your filter</h3>
                <p className="text-xs text-slate-500 mt-1">Try resetting search or filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-3 inline-flex items-center gap-1 bg-[#1d3d63] text-white px-3 py-1 text-xs rounded"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset Filters</span>
                </button>
              </div>
            ) : (
              <div>
                {QUESTION_TYPES.map(typeInfo => {
                  const questionsInType = questionsByType.get(typeInfo.id) || [];
                  if (questionsInType.length === 0) return null;

                  return (
                    <div key={typeInfo.id} id={typeInfo.id} className="mb-12">
                      {/* Colored Type Banner & Traps Header */}
                      <TypeHeader typeInfo={typeInfo} />

                      {/* Question Cards */}
                      <div>
                        {questionsInType.map((q, idx) => (
                          <QuestionCard
                            key={q.id}
                            question={q}
                            typeNumber={typeInfo.number}
                            questionIndex={idx}
                            typeBorderColor={typeInfo.borderColor}
                            globalHideAnswers={globalHideAnswers}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-300 bg-white py-6 px-4 text-center text-xs text-slate-600 print:hidden">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>UNISA COS3701 Theoretical Computer Science III — Exam Compilation</span>
          <span>Matched exact PDF study guide layout</span>
        </div>
      </footer>
    </div>
  );
}
