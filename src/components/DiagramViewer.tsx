import React from 'react';
import { AutomatonDiagram } from '../types/exam';

interface DiagramViewerProps {
  diagram: AutomatonDiagram;
  highlightedState?: string;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ diagram, highlightedState }) => {
  const isQuestion = diagram.isQuestionDiagram;
  const isAnswer = diagram.isAnswerDiagram;

  return (
    <div className={`my-4 overflow-hidden rounded-lg border bg-white ${
      isQuestion 
        ? 'border-indigo-300 ring-1 ring-indigo-200/50' 
        : isAnswer 
        ? 'border-emerald-300 ring-1 ring-emerald-200/50' 
        : 'border-slate-300'
    }`}>
      <div className={`flex flex-wrap items-center justify-between px-3.5 py-2 text-xs border-b ${
        isQuestion 
          ? 'bg-indigo-50/90 border-indigo-200 text-indigo-950' 
          : isAnswer 
          ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950' 
          : 'bg-slate-100 border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-center gap-2">
          {isQuestion && (
            <span className="rounded bg-indigo-700 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              Diagram Given in Question Paper
            </span>
          )}
          {isAnswer && (
            <span className="rounded bg-emerald-700 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              Diagram of the Answer (Solution)
            </span>
          )}
          <span className="font-semibold text-slate-900 font-sans">{diagram.title}</span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 uppercase">
          {diagram.type.toUpperCase()} Visual
        </div>
      </div>

      <div className="overflow-x-auto p-4 flex justify-center bg-radial from-slate-50 to-white">
        {renderDiagramContent(diagram, highlightedState)}
      </div>

      {diagram.description && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-700">Guide: </span>
          {diagram.description}
        </div>
      )}
    </div>
  );
};

function renderDiagramContent(diagram: AutomatonDiagram, highlightedState?: string) {
  switch (diagram.type) {
    case 'dfa':
      return renderDfaSvg(diagram, highlightedState);
    case 'dpda':
    case '2pda':
      return renderPdaSvg(diagram, highlightedState);
    case 'tm':
      return renderTmSvg(diagram, highlightedState);
    case 'venn':
      return renderVennSvg(diagram);
    case 'table':
      return null;
    default:
      return null;
  }
}

// 1. DFA SVG Renderer
function renderDfaSvg(diagram: AutomatonDiagram, highlightedState?: string) {
  const states = diagram.states || [];
  const transitions = diagram.transitions || [];

  return (
    <svg viewBox="0 0 680 240" className="w-full max-w-2xl h-auto select-none" style={{ minWidth: '460px' }}>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#475569" />
        </marker>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#2563eb" />
        </marker>
      </defs>

      {/* Grid pattern background */}
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#f1f5f9" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Render transitions */}
      {transitions.map((t, idx) => {
        const fromState = states.find(s => s.id === t.from);
        const toState = states.find(s => s.id === t.to);
        if (!fromState || !toState) return null;

        // Self loop
        if (t.from === t.to) {
          const isTop = t.loopDirection !== 'bottom';
          const dy = isTop ? -28 : 28;
          const curveY = isTop ? fromState.y - 55 : fromState.y + 55;
          const path = `M ${fromState.x - 12} ${fromState.y + dy * 0.7} C ${fromState.x - 28} ${curveY}, ${fromState.x + 28} ${curveY}, ${fromState.x + 12} ${fromState.y + dy * 0.7}`;
          return (
            <g key={idx}>
              <path d={path} fill="none" stroke="#64748b" strokeWidth="1.8" markerEnd="url(#arrow)" />
              <rect x={fromState.x - 12} y={isTop ? curveY - 14 : curveY + 2} width="24" height="15" rx="3" fill="#ffffff" fillOpacity="0.9" />
              <text x={fromState.x} y={isTop ? curveY - 3 : curveY + 13} fontSize="12" fontWeight="600" textAnchor="middle" fill="#0f172a">
                {t.label}
              </text>
            </g>
          );
        }

        // Between two states
        const dx = toState.x - fromState.x;
        const dy = toState.y - fromState.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 24;

        const startX = fromState.x + (dx / dist) * radius;
        const startY = fromState.y + (dy / dist) * radius;
        const endX = toState.x - (dx / dist) * (radius + 4);
        const endY = toState.y - (dy / dist) * (radius + 4);

        const curve = t.curve || 0;
        const midX = (startX + endX) / 2 + (-dy / dist) * curve;
        const midY = (startY + endY) / 2 + (dx / dist) * curve;

        const path = curve === 0 
          ? `M ${startX} ${startY} L ${endX} ${endY}`
          : `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;

        return (
          <g key={idx}>
            <path d={path} fill="none" stroke="#64748b" strokeWidth="1.8" markerEnd="url(#arrow)" />
            <rect x={midX - 14} y={midY - 9} width="28" height="16" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <text x={midX} y={midY + 3.5} fontSize="11" fontWeight="700" textAnchor="middle" fill="#1e293b">
              {t.label}
            </text>
          </g>
        );
      })}

      {/* Render states */}
      {states.map(s => {
        const isCurrent = highlightedState === s.id;
        return (
          <g key={s.id} transform={`translate(${s.x}, ${s.y})`} className="cursor-pointer">
            {s.isStart && (
              <g transform="translate(-48, 0)">
                <line x1="0" y1="0" x2="20" y2="0" stroke="#3b82f6" strokeWidth="2.2" markerEnd="url(#arrow-blue)" />
                <text x="-4" y="3.5" fontSize="10" fontWeight="700" textAnchor="end" fill="#2563eb">START</text>
              </g>
            )}

            {/* Outer circle for accept state */}
            {s.isFinal && (
              <circle r="27" fill="none" stroke={isCurrent ? '#2563eb' : '#059669'} strokeWidth="2" strokeDasharray="none" />
            )}

            {/* Main state circle */}
            <circle
              r="22"
              fill={isCurrent ? '#eff6ff' : '#ffffff'}
              stroke={isCurrent ? '#2563eb' : s.isFinal ? '#059669' : '#334155'}
              strokeWidth={isCurrent ? 2.5 : 2}
              className="drop-shadow-xs"
            />

            <text
              y="4.5"
              fontSize="13"
              fontWeight="700"
              textAnchor="middle"
              fill={isCurrent ? '#1d4ed8' : s.isFinal ? '#065f46' : '#0f172a'}
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// 2. Turing Machine SVG Renderer
function renderTmSvg(diagram: AutomatonDiagram, highlightedState?: string) {
  const states = diagram.states || [];
  const transitions = diagram.transitions || [];

  return (
    <svg viewBox="0 0 740 280" className="w-full max-w-3xl h-auto select-none" style={{ minWidth: '500px' }}>
      <defs>
        <marker id="tm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#475569" />
        </marker>
        <marker id="tm-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#dc2626" />
        </marker>
      </defs>

      {/* Pattern */}
      <rect width="100%" height="100%" fill="#fafafa" />

      {/* Render transitions */}
      {transitions.map((t, idx) => {
        const fromState = states.find(s => s.id === t.from);
        const toState = states.find(s => s.id === t.to);
        if (!fromState || !toState) return null;

        // Self loop
        if (t.from === t.to) {
          const isTop = t.loopDirection !== 'bottom';
          const dy = isTop ? -32 : 32;
          const curveY = isTop ? fromState.y - 62 : fromState.y + 62;
          const path = `M ${fromState.x - 14} ${fromState.y + dy * 0.7} C ${fromState.x - 32} ${curveY}, ${fromState.x + 32} ${curveY}, ${fromState.x + 14} ${fromState.y + dy * 0.7}`;
          return (
            <g key={idx}>
              <path d={path} fill="none" stroke="#475569" strokeWidth="1.8" markerEnd="url(#tm-arrow)" />
              <rect x={fromState.x - 30} y={isTop ? curveY - 16 : curveY + 2} width="60" height="16" rx="3" fill="#ffffff" stroke="#e2e8f0" />
              <text x={fromState.x} y={isTop ? curveY - 4 : curveY + 14} fontSize="11" fontWeight="700" textAnchor="middle" fill="#0f172a" fontFamily="monospace">
                {t.label}
              </text>
            </g>
          );
        }

        const dx = toState.x - fromState.x;
        const dy = toState.y - fromState.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 24;

        const startX = fromState.x + (dx / dist) * radius;
        const startY = fromState.y + (dy / dist) * radius;
        const endX = toState.x - (dx / dist) * (radius + 4);
        const endY = toState.y - (dy / dist) * (radius + 4);

        const curve = t.curve || 0;
        const midX = (startX + endX) / 2 + (-dy / dist) * curve;
        const midY = (startY + endY) / 2 + (dx / dist) * curve;

        const path = curve === 0 
          ? `M ${startX} ${startY} L ${endX} ${endY}`
          : `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;

        return (
          <g key={idx}>
            <path d={path} fill="none" stroke="#475569" strokeWidth="1.8" markerEnd="url(#tm-arrow)" />
            <rect x={midX - 32} y={midY - 9} width="64" height="17" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <text x={midX} y={midY + 3.5} fontSize="11" fontWeight="700" textAnchor="middle" fill="#1e293b" fontFamily="monospace">
              {t.label}
            </text>
          </g>
        );
      })}

      {/* Render states */}
      {states.map(s => {
        const isHalt = s.id.toLowerCase().includes('halt');
        const isStart = s.isStart || s.id.toLowerCase().includes('start');
        const isCurrent = highlightedState === s.id;

        if (isHalt || isStart) {
          return (
            <g key={s.id} transform={`translate(${s.x}, ${s.y})`}>
              <rect
                x="-36"
                y="-18"
                width="72"
                height="36"
                rx="18"
                fill={isHalt ? '#ecfdf5' : '#eff6ff'}
                stroke={isHalt ? '#059669' : '#2563eb'}
                strokeWidth="2"
              />
              <text y="4" fontSize="12" fontWeight="700" textAnchor="middle" fill={isHalt ? '#065f46' : '#1e40af'}>
                {s.label}
              </text>
            </g>
          );
        }

        return (
          <g key={s.id} transform={`translate(${s.x}, ${s.y})`}>
            <circle
              r="22"
              fill={isCurrent ? '#eff6ff' : '#ffffff'}
              stroke={isCurrent ? '#2563eb' : '#334155'}
              strokeWidth="2"
            />
            <text y="4.5" fontSize="13" fontWeight="700" textAnchor="middle" fill="#0f172a">
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// 3. PDA & 2PDA Flowchart SVG Renderer
function renderPdaSvg(diagram: AutomatonDiagram, highlightedState?: string) {
  const nodes = diagram.flowchartNodes || [];
  const edges = diagram.flowchartEdges || [];

  return (
    <svg viewBox="0 0 760 420" className="w-full max-w-3xl h-auto select-none" style={{ minWidth: '560px' }}>
      <defs>
        <marker id="pda-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#334155" />
        </marker>
      </defs>

      {/* Grid */}
      <rect width="100%" height="100%" fill="#ffffff" />

      {/* Render flowchart edges */}
      {edges.map((e, idx) => {
        const fromNode = nodes.find(n => n.id === e.from);
        const toNode = nodes.find(n => n.id === e.to);
        if (!fromNode || !toNode) return null;

        let pathD = '';
        if (e.path) {
          pathD = e.path;
        } else {
          // Default straight or orthogonal connection
          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          if (Math.abs(dx) < 10) {
            // vertical
            pathD = `M ${fromNode.x} ${fromNode.y + (dy > 0 ? 22 : -22)} L ${toNode.x} ${toNode.y - (dy > 0 ? 22 : -22)}`;
          } else if (Math.abs(dy) < 10) {
            // horizontal
            pathD = `M ${fromNode.x + (dx > 0 ? 26 : -26)} ${fromNode.y} L ${toNode.x - (dx > 0 ? 26 : -26)} ${toNode.y}`;
          } else {
            // step L
            pathD = `M ${fromNode.x} ${fromNode.y + 22} L ${fromNode.x} ${toNode.y} L ${toNode.x - 26} ${toNode.y}`;
          }
        }

        return (
          <g key={idx}>
            <path d={pathD} fill="none" stroke="#475569" strokeWidth="1.8" markerEnd="url(#pda-arrow)" />
            {e.label && (
              <text
                x={(fromNode.x + toNode.x) / 2}
                y={(fromNode.y + toNode.y) / 2 - 4}
                fontSize="12"
                fontWeight="700"
                fill="#2563eb"
                textAnchor="middle"
              >
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Render flowchart nodes */}
      {nodes.map(n => {
        return (
          <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
            {n.shape === 'start' && (
              <rect x="-34" y="-16" width="68" height="32" rx="16" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
            )}
            {n.shape === 'accept' && (
              <rect x="-38" y="-16" width="76" height="32" rx="16" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
            )}
            {n.shape === 'read' && (
              <polygon points="0,-22 26,0 0,22 -26,0" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
            )}
            {n.shape === 'pop' && (
              <polygon points="0,-22 28,0 0,22 -28,0" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
            )}
            {n.shape === 'push' && (
              <rect x="-36" y="-18" width="72" height="36" rx="4" fill="#fefce8" stroke="#ca8a04" strokeWidth="2" />
            )}

            <text
              y="4.5"
              fontSize={n.shape === 'push' || n.shape === 'pop' ? 10 : 11}
              fontWeight="700"
              textAnchor="middle"
              fill="#0f172a"
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// 4. Chomsky Hierarchy Venn Diagram
function renderVennSvg(diagram: AutomatonDiagram) {
  return (
    <svg viewBox="0 0 540 320" className="w-full max-w-lg h-auto select-none">
      <defs>
        <radialGradient id="grad-re" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </radialGradient>
      </defs>

      {/* D: Recursively Enumerable */}
      <ellipse cx="270" cy="160" rx="250" ry="140" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
      <text x="470" y="70" fontSize="13" fontWeight="700" fill="#334155">D (Type 0)</text>
      <text x="470" y="88" fontSize="10" fill="#64748b">Recursively Enumerable (TM)</text>

      {/* C: Recursive */}
      <ellipse cx="240" cy="170" rx="190" ry="110" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
      <text x="375" y="105" fontSize="13" fontWeight="700" fill="#334155">C</text>
      <text x="375" y="122" fontSize="10" fill="#64748b">Recursive / Decidable</text>

      {/* B: Context-Free */}
      <ellipse cx="200" cy="180" rx="130" ry="80" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="275" y="145" fontSize="13" fontWeight="700" fill="#0369a1">B (Type 2)</text>
      <text x="275" y="162" fontSize="10" fill="#0284c7">Context-Free (PDA)</text>

      {/* A: Regular */}
      <ellipse cx="150" cy="190" rx="65" ry="48" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="150" y="185" fontSize="14" fontWeight="800" fill="#15803d" textAnchor="middle">A (Type 3)</text>
      <text x="150" y="202" fontSize="10" fontWeight="600" fill="#166534" textAnchor="middle">Regular (FA)</text>
    </svg>
  );
}
