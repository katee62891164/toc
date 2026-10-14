import React, { useState } from 'react';
import { ExamQuestion } from '../types/exam';
import { DiagramViewer } from './DiagramViewer';
import { InteractiveTracer } from './InteractiveTracer';
import { Eye, EyeOff, Copy, Check, Lightbulb, Play, BookOpen } from 'lucide-react';

interface QuestionCardProps {
  question: ExamQuestion;
  typeNumber: number;
  questionIndex: number;
  typeBorderColor: string;
  globalHideAnswers?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  typeNumber,
  questionIndex,
  typeBorderColor,
  globalHideAnswers = false
}) => {
  const [showAnswerOverride, setShowAnswerOverride] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);

  const isAnswerVisible = showAnswerOverride !== null ? showAnswerOverride : !globalHideAnswers;

  const handleCopy = () => {
    navigator.clipboard.writeText(question.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeId = question.codeId || `W${questionIndex + 1}`;
  const questionDiag = question.questionDiagram || (question.diagram?.isQuestionDiagram ? question.diagram : undefined);
  const answerDiag = question.answerDiagram || (question.diagram && !question.diagram.isQuestionDiagram ? question.diagram : undefined);

  return (
    <article 
      style={{ borderColor: typeBorderColor }}
      className="mb-8 border-[1.5px] bg-white p-5 sm:p-6 rounded-xs shadow-xs"
    >
      {/* Question Header Bar matching PDF */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
        <div>
          <h3 className="font-sans font-bold text-[#1d70b8] text-base sm:text-lg">
            {codeId}. {question.year} {question.session} {question.questionNumber} ({question.marks} marks)
          </h3>
          {question.isOracleOnly && (
            <div className="text-xs font-bold text-red-600 mt-0.5">
              Sequence part / syntax is ORACLE ONLY (MySQL equivalent shown below)
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 print:hidden">
          {(questionDiag || answerDiag) && (
            <button
              onClick={() => setShowSimulator(prev => !prev)}
              className="inline-flex items-center gap-1 text-xs font-sans text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded hover:bg-indigo-100 transition"
              title="Test with custom words"
            >
              <Play className="h-3 w-3" />
              <span>{showSimulator ? 'Close Step Simulator' : 'Test in Simulator'}</span>
            </button>
          )}

          <button
            onClick={() => setShowAnswerOverride(prev => (prev === null ? !isAnswerVisible : !prev))}
            className="inline-flex items-center gap-1.5 border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-sans text-slate-700 hover:bg-slate-100 rounded transition"
          >
            {isAnswerVisible ? (
              <>
                <EyeOff className="h-3 w-3 text-slate-500" />
                <span>Cover answer</span>
              </>
            ) : (
              <>
                <Eye className="h-3 w-3 text-[#1d70b8]" />
                <span className="font-semibold text-[#1d70b8]">Reveal answer</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Word-for-Word Official Question Text */}
      <div className="mb-4">
        <p className="font-serif text-[15px] sm:text-base text-slate-900 leading-relaxed italic">
          <strong className="font-sans not-italic font-bold text-slate-900">Question: </strong>
          {question.verbatimQuestion}
        </p>
      </div>

      {/* If Diagram was PROVIDED IN QUESTION PAPER */}
      {questionDiag && (
        <div className="my-4 rounded border-2 border-indigo-300 bg-indigo-50/40 p-3">
          <div className="flex items-center gap-2 mb-2 text-xs font-sans font-bold uppercase tracking-wider text-indigo-950">
            <BookOpen className="h-4 w-4 text-indigo-700" />
            <span className="bg-indigo-800 text-white px-2 py-0.5 rounded text-[10px]">DIAGRAM PROVIDED IN QUESTION PAPER</span>
            <span className="text-slate-600 font-normal normal-case">Study this machine to answer the question</span>
          </div>
          <DiagramViewer diagram={questionDiag} />
        </div>
      )}

      {/* Primary-Level Simple English Logic Explanation */}
      <div className="my-4 border-l-4 border-amber-400 bg-amber-50/70 p-3.5 text-slate-900 rounded-r">
        <div className="flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-amber-900 mb-1">
          <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
          <span>Primary-Level English Logic (Easy way to understand the question):</span>
        </div>
        <p className="font-sans text-xs sm:text-sm text-amber-950 leading-relaxed">
          {question.simpleExplanation}
        </p>
      </div>

      {/* Interactive Simulator (when toggled) */}
      {showSimulator && (
        <InteractiveTracer
          type={
            question.questionDiagram?.type === 'dpda' || question.answerDiagram?.type === 'dpda'
              ? 'dpda'
              : question.questionDiagram?.type === 'tm' || question.answerDiagram?.type === 'tm'
              ? 'tm'
              : 'dfa'
          }
          initialString={question.sampleTraceString || 'aba'}
          targetLanguageDesc={`Simulating ${codeId} (${question.year} ${question.questionNumber})`}
        />
      )}

      {/* Step by Step Breakdown matching PDF */}
      <div className="mb-4">
        <h4 className="font-sans font-bold text-[#1d70b8] text-sm sm:text-base mb-2">Step by step</h4>
        <ol className="list-decimal pl-5 space-y-1 text-sm font-serif text-slate-800 leading-relaxed">
          {question.stepByStep.map((step, idx) => (
            <li key={idx}>
              {step.replace(/^\d+\.\s*/, '')}
            </li>
          ))}
        </ol>
      </div>

      {/* Answer Section */}
      {isAnswerVisible ? (
        <div className="mt-4 pt-2">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-sans font-bold text-[#1d70b8] text-sm sm:text-base">Answer</h4>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] font-sans text-slate-500 hover:text-slate-800 transition print:hidden"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? 'Copied' : 'Copy answer'}</span>
            </button>
          </div>

          {/* If Diagram is PART OF THE ANSWER */}
          {answerDiag && (
            <div className="my-3 rounded border-2 border-emerald-300 bg-emerald-50/40 p-3">
              <div className="flex items-center gap-2 mb-2 text-xs font-sans font-bold uppercase tracking-wider text-emerald-900">
                <Check className="h-4 w-4 text-emerald-700" />
                <span className="bg-emerald-800 text-white px-2 py-0.5 rounded text-[10px]">DIAGRAM OF THE ANSWER</span>
                <span className="text-slate-600 font-normal normal-case">Solution machine diagram drawn for this question</span>
              </div>
              <DiagramViewer diagram={answerDiag} />
            </div>
          )}

          {/* Black Code / Monospace Box matching PDF */}
          <div className="rounded-xs bg-[#1e1e1e] p-4 text-[#ffffff] font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto shadow-inner">
            <pre><code>{question.answer}</code></pre>
          </div>

          {/* Notes matching PDF */}
          {question.notes && question.notes.length > 0 && (
            <div className="mt-3 space-y-1">
              {question.notes.map((note, nIdx) => (
                <p key={nIdx} className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900">Note: </span>
                  {note}
                </p>
              ))}
            </div>
          )}

          {/* Change One Thing Variant matching PDF */}
          {question.changeOneThing && (
            <div className="mt-3 text-xs sm:text-sm font-sans text-slate-700 italic border-t border-slate-100 pt-2.5">
              <span className="not-italic font-bold text-slate-800">Change one thing: </span>
              {question.changeOneThing}
            </div>
          )}
        </div>
      ) : (
        <div className="my-5 rounded border border-dashed border-slate-300 bg-slate-50/70 p-4 text-center print:hidden">
          <p className="text-xs font-sans font-medium text-slate-600 mb-2">
            Answer covered! Try solving this real question in your notebook first.
          </p>
          <button
            onClick={() => setShowAnswerOverride(true)}
            className="inline-flex items-center gap-1.5 rounded bg-[#1d70b8] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition"
          >
            <Eye className="h-3 w-3" />
            <span>Reveal Answer</span>
          </button>
        </div>
      )}
    </article>
  );
};
