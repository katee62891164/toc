export type QuestionTypeId = 
  | 'type-1-re-dfa'
  | 'type-2-cnf'
  | 'type-3-dpda'
  | 'type-4-pumping-lemma'
  | 'type-5-closure'
  | 'type-6-theorem-42'
  | 'type-7-tm-trace'
  | 'type-8-tm-build'
  | 'type-9-2pda'
  | 'type-10-tm-encoding-cwl'
  | 'type-11-computability';

export interface QuestionTypeInfo {
  id: QuestionTypeId;
  number: number;
  title: string;
  shortDesc: string;
  seenIn: string;
  markRange: string;
  questionIds: string[];
  howToSpotIt: string;
  recipe: string[];
  traps: string[];
  bannerColor: string; // Exact PDF banner hex color
  borderColor: string; // Exact PDF card border hex color
}

export type AutomatonType = 'dfa' | 'dpda' | 'tm' | '2pda' | 'venn' | 'table';

export interface AutomatonDiagram {
  type: AutomatonType;
  title: string;
  description?: string;
  isQuestionDiagram?: boolean; // True if this was in the exam paper
  isAnswerDiagram?: boolean;   // True if this is the student's solution
  states?: Array<{ id: string; label: string; x: number; y: number; isStart?: boolean; isFinal?: boolean }>;
  transitions?: Array<{ from: string; to: string; label: string; curve?: number; loopDirection?: 'top' | 'bottom' | 'left' | 'right' }>;
  flowchartNodes?: Array<{ id: string; label: string; shape: 'start' | 'read' | 'push' | 'pop' | 'accept' | 'halt'; x: number; y: number }>;
  flowchartEdges?: Array<{ from: string; to: string; label?: string; path?: string }>;
}

export interface ExamQuestion {
  id: string;
  codeId?: string; // e.g. "W1", "W2", "W3" matching the PDF numbering
  typeId: QuestionTypeId;
  year: number;
  session: 'May/June' | 'Oct/Nov' | 'Jan/Feb' | 'Sep/Oct/Nov';
  questionNumber: string; // e.g. "2026 Jan/Feb Q1.1", "2024 Oct/Nov Q1"
  marks: number;
  isOracleOnly?: boolean; // In case of older/alternate exam references
  verbatimQuestion: string;
  questionDiagram?: AutomatonDiagram; // If drawing was printed on the exam paper
  answerDiagram?: AutomatonDiagram;   // If drawing is the solution/answer
  diagram?: AutomatonDiagram;         // Fallback/general diagram
  simpleExplanation: string; // Primary-school level explanation
  stepByStep: string[];
  answer: string;
  notes?: string[];
  changeOneThing?: string;
  sampleTraceString?: string;
}
