import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface InteractiveTracerProps {
  initialString?: string;
  type: 'dfa' | 'dpda' | 'tm';
  targetLanguageDesc: string;
}

export const InteractiveTracer: React.FC<InteractiveTracerProps> = ({
  initialString = 'aba',
  type,
  targetLanguageDesc
}) => {
  const [inputStr, setInputStr] = useState(initialString);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Stack simulation for PDA
  const [stack, setStack] = useState<string[]>([]);
  // Tape simulation for TM
  const [tape, setTape] = useState<string[]>(initialString.split(''));

  const reset = (newStr = inputStr) => {
    setStepIndex(0);
    setIsPlaying(false);
    setStack([]);
    setTape(newStr.split(''));
  };

  const handleStep = () => {
    if (stepIndex < inputStr.length) {
      const currentChar = inputStr[stepIndex];
      if (type === 'dpda') {
        if (currentChar === 'a') {
          setStack(prev => ['X', ...prev]);
        } else if (currentChar === 'b' && stack.length > 0) {
          setStack(prev => prev.slice(1));
        }
      }
      setStepIndex(prev => prev + 1);
    }
  };

  const isCompleted = stepIndex >= inputStr.length;
  // Simple heuristic validation for demo words
  const isAccepted = isCompleted && (
    (type === 'dfa' && (inputStr.startsWith('ab') && inputStr.endsWith('a') || inputStr.includes('bab'))) ||
    (type === 'dpda' && stack.length === 0) ||
    (type === 'tm' && inputStr.length > 0)
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-900 text-white p-4 shadow-sm my-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
            Interactive Step-by-Step Simulator
          </div>
          <div className="text-sm font-semibold text-slate-100">{targetLanguageDesc}</div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputStr}
            onChange={e => {
              const val = e.target.value.toLowerCase().replace(/[^ab]/g, '');
              setInputStr(val);
              reset(val);
            }}
            placeholder="Type 'a' and 'b'"
            className="w-32 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-mono text-indigo-300 focus:border-indigo-500 focus:outline-none"
          />
          <button
            onClick={() => handleStep()}
            disabled={isCompleted}
            className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
          >
            <span>Step</span>
            <ArrowRight className="h-3 w-3" />
          </button>
          <button
            onClick={() => reset()}
            className="rounded-md border border-slate-700 p-1 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            title="Reset"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Tape Display */}
      <div className="mt-4">
        <div className="text-xs font-mono text-slate-400 mb-1.5 flex items-center justify-between">
          <span>Input Tape / Head Position:</span>
          <span>Index: {stepIndex} / {inputStr.length}</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {inputStr.split('').map((char, i) => {
            const isHead = i === stepIndex;
            const isProcessed = i < stepIndex;
            return (
              <div
                key={i}
                className={`flex h-10 w-9 shrink-0 flex-col items-center justify-center rounded-md font-mono text-sm font-bold transition-all ${
                  isHead
                    ? 'border-2 border-indigo-400 bg-indigo-950 text-indigo-200 scale-105 shadow-md shadow-indigo-900/50'
                    : isProcessed
                    ? 'border border-slate-700 bg-slate-800/80 text-slate-400'
                    : 'border border-slate-700/50 bg-slate-800/40 text-slate-200'
                }`}
              >
                <span>{char}</span>
                <span className="text-[9px] font-normal text-slate-500">{i}</span>
              </div>
            );
          })}
          <div className="flex h-10 w-9 shrink-0 flex-col items-center justify-center rounded-md border border-dashed border-slate-700 font-mono text-sm text-slate-500">
            <span>Δ</span>
            <span className="text-[9px]">end</span>
          </div>
        </div>
      </div>

      {/* Stack Display (for DPDA) */}
      {type === 'dpda' && (
        <div className="mt-3.5 border-t border-slate-800 pt-3">
          <div className="text-xs font-mono text-slate-400 mb-1.5">Stack Contents (Pushdown):</div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-amber-400">TOP ➔</span>
            {stack.length === 0 ? (
              <span className="text-xs font-mono text-slate-500">[ Empty Stack / Δ ]</span>
            ) : (
              stack.map((item, idx) => (
                <span
                  key={idx}
                  className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-xs font-mono font-bold text-amber-300"
                >
                  {item}
                </span>
              ))
            )}
          </div>
        </div>
      )}

      {/* Status Verdict */}
      {isCompleted && (
        <div className="mt-3.5 flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-2 text-xs">
          {isAccepted ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span className="font-semibold text-emerald-300">Accepted:</span>
              <span className="text-slate-300">The machine reached the ACCEPT / HALT state cleanly!</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-rose-400" />
              <span className="font-semibold text-rose-300">Rejected / Crashed:</span>
              <span className="text-slate-300">The word did not satisfy all constraints or stack was not empty.</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
