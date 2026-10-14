import { QuestionTypeInfo } from '../types/exam';

export const QUESTION_TYPES: QuestionTypeInfo[] = [
  {
    id: 'type-1-re-dfa',
    number: 1,
    title: 'Regular Expressions, DFAs & Theorem 21 (FA to CFG)',
    shortDesc: 'Write regular expressions, draw state machines, and convert transitions into grammar rules.',
    seenIn: '2018, 2019, 2021, 2024, 2025, 2026 (10 to 18 marks each)',
    markRange: '10 to 18 marks each',
    questionIds: ['Q-2026-JAN-1', 'Q-2025-OCT-1', 'Q-2025-JAN-1', 'Q-2024-1', 'Q-2021-1', 'Q-2019-MJ-1', 'Q-2018-ON-1'],
    howToSpotIt: "The question gives a language description and says 'Determine a regular expression', 'Design a deterministic finite automaton (DFA)', or 'Use Theorem 21 to develop a context-free grammar (CFG)'.",
    recipe: [
      "1. Understand the language with 3 friendly examples: write 2 words that ARE allowed and 2 words that ARE NOT allowed.",
      "2. For Regular Expressions: break into blocks. If it says 'starts with ab and ends with a', write ab(a+b)*a. If it says 'at least one bb and bb cannot be followed by an a', anchor the bb at the end of groups.",
      "3. For the DFA: Draw one bubble (circle) for each state. Start at the start bubble. For EVERY state, you MUST draw exactly one arrow leaving for 'a' and one arrow leaving for 'b'. Double circle the winner (accepting) state.",
      "4. For Theorem 21 (FA to CFG): Give every state a capital letter (Start = S, State 1 = A, State 2 = B, etc.). If reading 'a' goes from S to A, write: S -> aA. If reading 'b' goes from S to B, write: S -> bB. If state B is an accept state (+), add | Λ (null) to B."
    ],
    traps: [
      "Forgetting a letter arrow: Every state in a DFA MUST have an arrow for BOTH 'a' and 'b'. Missing one makes it non-deterministic (NFA)!",
      "Forgetting Λ on accept states in Theorem 21: If you do not give the accept states a '| Λ' rule, the grammar can never stop and can never finish building any word!",
      "Writing capitals in the regular expression: Terminals are lowercase a and b. Plus sign '+' means OR; star '*' means zero or more."
    ],
    bannerColor: '#1d70b8',
    borderColor: '#1d70b8'
  },
  {
    id: 'type-2-cnf',
    number: 2,
    title: 'Convert CFG to Chomsky Normal Form (CNF)',
    shortDesc: 'Convert context-free grammars into clean CNF (A -> BC or A -> a) using 3 strict steps.',
    seenIn: '2018, 2019, 2021, 2024, 2025, 2026 (6 to 14 marks each)',
    markRange: '6 to 14 marks each',
    questionIds: ['Q-2026-JAN-2', 'Q-2025-OCT-2', 'Q-2024-2'],
    howToSpotIt: "The question says 'Convert the following Context Free Grammar (CFG) to Chomsky Normal Form (CNF)' and often adds 'Show all the three steps'.",
    recipe: [
      "Remember what CNF looks like: Every rule on the right side must be EITHER exactly 2 Capital Letters (like S -> AB) OR exactly 1 small letter (like A -> a). No empty ghosts (Λ), no singles (unit productions), no long trains!",
      "Step 1 - Kill Null Productions (Λ): Find every nonterminal that can turn into Λ (like Y -> Λ, Z -> Λ). Wherever that letter appears on the right side of any rule, write the rule again WITH that letter deleted, and also keep the original! Once you write all combinations, erase the '-> Λ' rules. Never keep S -> S or X -> X (these are useless loops).",
      "Step 2 - Kill Unit Productions (One capital to one capital like S -> Y or Z -> X): Look for rules where one big letter makes another big letter alone. Replace it with everything the second letter can make! For example, if S -> Y and Y -> bXY | a, then S gets S -> bXY | a directly. Delete the single S -> Y.",
      "Step 3 - Make Solid Terminals & Shorten to Pairs: Replace every small letter in a mixed rule with a big helper letter (A -> a, B -> b). For rules longer than 2 big letters (like S -> aXYZb -> ABY B), chop them up with helper variables (R1 -> YZ, R2 -> R1 B, etc.) so every rule is strictly two big letters!"
    ],
    traps: [
      "Leaving out a combination in Step 1: If you have X -> ZXYZ and both Z and Y are nullable, you must check: delete first Z, delete Y, delete second Z, delete both Z's, delete all three!",
      "Forgetting to carry old rules along: When doing Step 2, don't throw away the non-unit productions that S already had.",
      "Leaving a single terminal mixed in with big letters: S -> aB is NOT in CNF! It must be S -> AB with A -> a."
    ],
    bannerColor: '#457b3b',
    borderColor: '#457b3b'
  },
  {
    id: 'type-3-dpda',
    number: 3,
    title: 'Deterministic Pushdown Automata (DPDA)',
    shortDesc: 'Design flowcharts with START, READ, PUSH, POP, and ACCEPT to count matching letters.',
    seenIn: '2018, 2019, 2021, 2024, 2025, 2026 (10 to 14 marks each)',
    markRange: '10 to 14 marks each',
    questionIds: ['Q-2026-JAN-3', 'Q-2024-3', 'Q-2018-ON-2'],
    howToSpotIt: "The question says 'Build a deterministic pushdown automata (DPDA) that accepts the language L = {...}' with matching powers like a^n b^n.",
    recipe: [
      "Think of the stack as a stack of plates in a cafeteria: you put plates on top (PUSH X), and you take plates off the top (POP X).",
      "1. Start with START box -> goes to the first READ diamond.",
      "2. When reading the first group of letters, every time you see one, enter a PUSH X box, then loop back to READ.",
      "3. When the second group arrives, switch to a matching loop: read a letter, go to a POP diamond! If it pops 'X', you matched one plate. Loop back to READ.",
      "4. When the input tape is finished (it reads Δ or blank), you must POP the stack one last time to make sure NO plates are left (it must pop Δ). Then proceed to the rounded ACCEPT box!",
      "5. Deterministic check: Make sure from each READ or POP diamond, there is only one arrow for any given letter or stack symbol."
    ],
    traps: [
      "Forgetting to check if the stack is truly empty: Reading the end of the word (Δ) is NOT enough! You must pop Δ from the stack to prove all X's were matched. If you accept with X still on the stack, words with too many first letters would wrongly pass!",
      "Off-by-one errors: Notice if the question says a^{n+1} or b^{n+2} or ba^{n-1}. That means you must push an extra X, or pop an extra X before the main loop!"
    ],
    bannerColor: '#a07800',
    borderColor: '#a07800'
  },
  {
    id: 'type-4-pumping-lemma',
    number: 4,
    title: 'Pumping Lemma for Context-Free Languages (5 Cases)',
    shortDesc: 'Prove languages are non-context-free by breaking words into uvxyz and testing the 5 cases.',
    seenIn: '2018, 2019, 2021, 2024, 2025 (10 to 14 marks each)',
    markRange: '10 to 14 marks each',
    questionIds: ['Q-2025-JAN-4', 'Q-2024-4'],
    howToSpotIt: "The question quotes the Pumping Lemma formula: 'w = uvxyz such that length(vxy) <= 2^p, length(x) > 0, length(v)+length(y) > 0... Prove that L is non-context-free.'",
    recipe: [
      "1. Assume the opposite: 'Assume L is a CFL generated by a CFG in CNF with p live productions.'",
      "2. Pick one clever test word w that belongs to L with length > 2^p. For example, let n = 2^p, so w = a^{2^p} b^{2(2^p)+2} a^{2^p - 1}.",
      "3. State the rule: Because length(vxy) <= 2^p, the pumpable piece 'vxy' is short! It CANNOT stretch across the whole word. It can only touch at most 2 neighboring clumps of letters.",
      "4. List the 5 standard cases: Case 1: vxy in 1st clump only. Case 2: vxy spans 1st and 2nd clumps. Case 3: vxy in 2nd clump only. Case 4: vxy spans 2nd and 3rd clumps. Case 5: vxy in 3rd clump only.",
      "5. Pump it: In EVERY case, double the pumpable letters (look at w' = u v^2 x y^2 z). Because only some clumps grow while the other clumps stay frozen, the count balance or ratio is broken!",
      "6. Conclude: 'Every case leads to a contradiction. Therefore our initial assumption was false, and L is non-context-free.'"
    ],
    traps: [
      "Choosing a word that is too short: The word must have length > 2^p. Always use p or 2^p as your exponent!",
      "Forgetting Case 2 or Case 4: A student often forgets that vxy can straddle the border between a's and b's. You must write out all 5 cases cleanly.",
      "Missing the magic words: Always state 'length(vxy) <= 2^p so vxy cannot touch three separate groups of letters at once'."
    ],
    bannerColor: '#c85a17',
    borderColor: '#c85a17'
  },
  {
    id: 'type-5-closure',
    number: 5,
    title: 'Closure Properties of Context-Free Languages',
    shortDesc: 'Understand union, product, and Kleene star of CFGs with bidirectional proofs.',
    seenIn: '2018, 2019, 2021, 2025, 2026 (6 to 13 marks each)',
    markRange: '6 to 13 marks each',
    questionIds: ['Q-2026-JAN-4', 'Q-2025-OCT-4', 'Q-2021-4'],
    howToSpotIt: "The question says 'Context-free languages are closed under union / product / Kleene star', gives CFG1 and CFG2, and asks for a grammar for L1+L2 or L1.L2 with a two-direction proof.",
    recipe: [
      "Union (L1 + L2): Give all nonterminals in CFG1 subscript 1 (S1, X1, etc.) and in CFG2 subscript 2 (S2, X2, etc.) so they never clash. Add a new start rule: S -> S1 | S2.",
      "Product (L1 . L2): Use the same renaming subscripts, then add the product start rule: S -> S1 S2.",
      "Kleene Star (L*): Replace old start S with Z. Add new start rules: S -> ZS | Λ.",
      "Two-Direction Proof Recipe: Direction 1: Show that any word in L1 + L2 can be built by the new CFG (if w in L1, pick S -> S1 and derive w). Direction 2: Show that any word built by the new CFG belongs to L1 + L2 (the first step is forced to be S -> S1 or S -> S2; since subscripts are isolated, the string only uses rules from one CFG).",
      "Important Fact to Memorize: CFLs are closed under Union, Product, and Star, but NOT closed under Intersection or Complement!"
    ],
    traps: [
      "Not renaming the nonterminals: If both grammars use the letter X, and you don't use subscripts X1 and X2, rules might mix together and build alien words that belong to neither language!",
      "Only doing one direction of the proof: You get only half marks if you don't show both: (1) All words in L can be generated, AND (2) Only words in L can be generated."
    ],
    bannerColor: '#5c4d9a',
    borderColor: '#5c4d9a'
  },
  {
    id: 'type-6-theorem-42',
    number: 6,
    title: 'Theorem 42 Decidability Algorithm (Does CFG generate words?)',
    shortDesc: 'Test whether a context-free grammar can actually produce words or is completely stuck in a loop.',
    seenIn: '2018, 2019, 2024, 2025, 2026 (6 to 12 marks each)',
    markRange: '6 to 12 marks each',
    questionIds: ['Q-2026-JAN-5', 'Q-2024-6', 'Q-2018-MJ-5'],
    howToSpotIt: "The question says 'Use the reformulated version of Theorem 42 to decide whether the grammar given below generates any words'.",
    recipe: [
      "Think of this like a coloring game: we start by coloring all the tiny letters (terminals), and then any big letter that can turn purely into colored letters gets colored too!",
      "Step -1: Is S nullable? Check if S -> Λ directly or through chain. (Usually NO).",
      "Step 0: Check if grammar is in CNF. (Usually already in CNF or note it).",
      "Is there a rule S -> t where t is a terminal? If yes, STOP! S already makes a word directly.",
      "Step 1: Mark all nonterminals that produce a terminal alone! Look for rules like D -> a or A -> b. Mark D and A.",
      "Step 2: Replace the marked letters with their terminal in all rules. Can any new nonterminals now make a string of pure terminals? For example, if C -> DA and D and A are marked, then C makes 'ab', so mark C! Repeat until no new letters can be marked.",
      "Verdict: If Start symbol S gets marked, conclude: YES, the grammar generates words! Write down the shortest word found. If S is never marked, conclude: NO, the grammar generates the empty language."
    ],
    traps: [
      "Skipping Step -1 or Step 0: The question asks for the 'reformulated version' which explicitly starts with Step -1 and Step 0. Write them down to get the free marks!",
      "Giving up before testing all chains: Make sure you substitute marked letters step by step through every rule."
    ],
    bannerColor: '#008080',
    borderColor: '#008080'
  },
  {
    id: 'type-7-tm-trace',
    number: 7,
    title: 'Tracing a Turing Machine (TM)',
    shortDesc: 'Analyze a given state diagram to find shortest word, Accept(T), Reject(T), Loop(T), and tape content.',
    seenIn: '2018, 2019, 2021, 2024, 2025 (6 to 11 marks each)',
    markRange: '6 to 11 marks each',
    questionIds: ['Q-2025-JAN-7', 'Q-2024-7'],
    howToSpotIt: "The question shows a Turing Machine diagram with transitions like (a, A, R) or (b, X, R) and asks: (a) Shortest word accepted? (b) What is accept(T)? (c) What is reject(T)? (d) What is loop(T)?",
    recipe: [
      "1. Understand the notation: (read, write, move). '(a, X, R)' means: if head reads 'a', replace it with 'X' and move head Right.",
      "2. Shortest accepted word: Find the shortest path from START to HALT. Trace the tape symbols required to walk that direct path.",
      "3. Accept(T): Look at the loops and branches. What family of words makes it all the way to HALT? (e.g. all words of form a b^n a with n >= 1).",
      "4. Loop(T): Look for states that have arrows pointing back to themselves or circular cycles with no exit for certain characters (e.g., words starting with b loop on state 4).",
      "5. Reject(T) (or Crash): Words that arrive at a state where NO arrow exists for the current tape symbol.",
      "6. Tape contents at HALT: Track every change made to the tape during the run of an accepted word."
    ],
    traps: [
      "Confusing Reject with Loop: In a Turing machine, REJECT means the machine CRASHES (no arrow exists for that symbol). LOOP means it spins forever in a circle without stopping!",
      "Forgetting the blank symbol Δ (or _): When the input string ends, the head encounters Δ. Pay close attention to how Δ moves the head left or right."
    ],
    bannerColor: '#b82e6d',
    borderColor: '#b82e6d'
  },
  {
    id: 'type-8-tm-build',
    number: 8,
    title: 'Building a Turing Machine (TM)',
    shortDesc: 'Design custom Turing Machines that accept specific languages, loop on bad inputs, and reject others.',
    seenIn: '2018, 2019, 2021, 2024, 2025, 2026 (10 to 16 marks each)',
    markRange: '10 to 16 marks each',
    questionIds: ['Q-2026-JAN-8', 'Q-2024-8', 'Q-2018-MJ-7'],
    howToSpotIt: "The question says 'Build / Draw a Turing Machine (TM) that accepts all words in {...}, loops forever on all words starting with a (or b), and rejects all other words.'",
    recipe: [
      "1. Always write high-level pseudocode first! (The exam explicitly gives marks for this hint).",
      "2. State 1 (Start): Handle the looping requirement immediately! If the exam says 'loops forever on words starting with a', draw an arrow from Start reading 'a' going to a trap state that has a self-loop (a,a,R), (b,b,R), (Δ,Δ,R)!",
      "3. Matching Algorithm (e.g., b^{n+2} a^n): Cross off the first 'b' by changing it to 'B' (or Δ). Scan right past all letters until you reach the 'a' section. Cross off one 'a' by changing it to 'A'. Rewind all the way left to the next 'b'. Repeat!",
      "4. Extra letters check: If it needs 2 extra b's (b^{n+2}), after all a's are crossed out, make sure exactly 2 b's remain before accepting.",
      "5. Reaching HALT: When everything is verified clean, transition to the HALT state."
    ],
    traps: [
      "Forgetting to rewind: After crossing off a letter on the right, you must move LEFT (L) back to the left marker so you can find the next letter!",
      "Forgetting the loop requirement: Examiners love adding 'loops forever on all words starting with b'. If you forget this trap state, you lose 3 to 4 easy marks."
    ],
    bannerColor: '#555555',
    borderColor: '#555555'
  },
  {
    id: 'type-9-2pda',
    number: 9,
    title: 'Two-Stack Pushdown Automata (2PDA) & Completing Boxes',
    shortDesc: 'Explain Box A, Box B, and draw Box C to match 3 or 4 letter groups, plus 2PDA/3PDA/TM equivalence.',
    seenIn: '2018, 2019, 2021, 2024, 2025 (8 to 14 marks each)',
    markRange: '8 to 14 marks each',
    questionIds: ['Q-2025-JAN-9', 'Q-2018-MJ-9'],
    howToSpotIt: "The question shows a large flowchart with Box A, Box B, Box C and asks: '(a) What is the purpose of Box A? (b) What is the purpose of Box B? (c) Complete Box C by showing what should be inside.'",
    recipe: [
      "Why do we need 2 stacks? A normal 1-stack PDA can only compare TWO things (like a^n b^n). A 2PDA has TWO stacks, so it can compare THREE or FOUR things (like a^n b^n a^n or a^n b^{2n} a^{2n} b^n)! It has the same power as a full Turing Machine!",
      "Box A is always the BASE CASE (when n = 0 or smallest valid word). It checks the bare minimum word and goes straight to ACCEPT.",
      "Box B is the PUSH / TRANSFER LOOP: It reads the first clump of letters and pushes X onto Stack 1. Then it reads the second clump and pops Stack 1 while pushing Y onto Stack 2.",
      "Box C is the MATCHING & EMPTY CHECK LOOP: It reads the remaining clump, pops from Stack 2 to ensure equal count, checks that BOTH stacks are completely empty (pop Δ), and connects to ACCEPT.",
      "Theory Questions on 2PDA: Can a 3PDA accept it? YES, because 2PDA is already equivalent to a TM, so adding a 3rd stack adds no extra power. Can a 1-stack PDA accept it? NO, because the language is non-context-free!"
    ],
    traps: [
      "Leaving the question 'Can a 1-stack PDA accept L?' unanswered: Always write: 'No, because a 1-stack PDA can only accept context-free languages, and this language is non-context-free.'",
      "Misidentifying Box A: It is almost always the n=0 or n=1 edge-case path without using the main stack loop."
    ],
    bannerColor: '#2471a3',
    borderColor: '#2471a3'
  },
  {
    id: 'type-10-tm-encoding-cwl',
    number: 10,
    title: 'Turing Machine Encodings, Code Word Language (CWL) & ALAN',
    shortDesc: 'Convert TMs into 5-column summary tables, binary/letter CWL code words, and prove ALAN membership.',
    seenIn: '2018, 2019, 2021, 2024 (9 to 11 marks each)',
    markRange: '9 to 11 marks each',
    questionIds: ['Q-2024-10', 'Q-2019-MJ-10'],
    howToSpotIt: "The question shows a small TM and asks: '(a) Convert T into a summary table. (b) Convert T into CWL (code word language). (c) Which language is accepted? (d) Does the code word belong to ALAN?'",
    recipe: [
      "Part (a) Summary Table: Make a table with 5 columns: FROM | TO | READ | WRITE | MOVE. One row for every arrow in the diagram.",
      "Part (b) CWL (Code Word Language): In Cohen's textbook, every row is converted to a code of a's and b's: State numbers become unary 'a's (State 1 = a, State 2 = aa, State 3 = aaa), letters have codes (a -> aa, b -> ab, Δ -> ba), Moves have codes (L -> a, R -> b). The 5 pieces of each row are separated by 'b's, and rows are joined together with double 'b's ('bb').",
      "Part (c) Accepted Language: What words reach HALT? (e.g. all words ending with ab).",
      "Part (d) Does code word belong to ALAN? ALAN is defined as all code words of TMs that do not accept their own code word! (ALAN = {code words of T that T does NOT accept}).",
      "Answer to ALAN: Look at the code word string. Does machine T accept this CWL string? No, because CWL is full of long blocks of 'a's and 'b's that fail the machine's strict format. Because the machine does NOT accept its own code word, YES, the code word belongs to ALAN!"
    ],
    traps: [
      "Confusing State 1 with 'a': State 1 is 1 'a', State 2 is 2 'a's (aa), State 3 is 3 'a's (aaa).",
      "Saying NO for ALAN when it belongs: Remember the double negative! ALAN contains machines that REJECT or LOOP on their own code word. If machine T rejects its own code word, then its code word IS in ALAN!"
    ],
    bannerColor: '#2e7d32',
    borderColor: '#2e7d32'
  },
  {
    id: 'type-11-computability',
    number: 11,
    title: 'Computability, Chomsky Hierarchy & Church\'s Thesis',
    shortDesc: 'Turing computability of unary arithmetic functions, Type 0 to Type 3 hierarchy, and Church-Turing thesis.',
    seenIn: '2018, 2019, 2021, 2024 (4 to 12 marks each)',
    markRange: '4 to 12 marks each',
    questionIds: ['Q-2024-11', 'Q-2018-MJ-11', 'Q-2019-MJ-11'],
    howToSpotIt: "The question asks: 'What does it mean for a function to be computable?', 'Prove f(n) = n - 1 or f(n) = 2n + 1 is computable using unary encoding', 'What is Church\'s Thesis?', or 'Draw the Chomsky Hierarchy Venn diagram'.",
    recipe: [
      "1. Definition of Computable Function: 'A function f(x) is Turing-computable if there exists a Turing Machine T that, when started with input x on its tape, halts with f(x) printed on the tape and nothing else.'",
      "2. Unary Encoding: The number n is represented as a string of n identical marks (e.g. n = 3 is represented as 'aaa').",
      "3. Proving f(n) = n - 1 is computable: Draw a simple TM: Start reads the first 'a' and changes it to Δ (or reads until the end and deletes the last 'a'), then halts! Since it erased 1 'a', exactly n - 1 'a's remain.",
      "4. Proving f(n) = n + 4 is computable: Go to the end of the input string of 'a's (find Δ), write 4 extra 'a's, then halt!",
      "5. Chomsky Hierarchy (Venn Diagram): 4 concentric circles from smallest to largest:",
      "   - Innermost (Type 3): Regular Languages (accepted by Finite Automata / FA)",
      "   - Second (Type 2): Context-Free Languages (accepted by Pushdown Automata / PDA)",
      "   - Third: Recursive / Decidable Languages (accepted by TMs that ALWAYS halt)",
      "   - Outermost (Type 0): Recursively Enumerable Languages (accepted by general TMs that may loop).",
      "6. Church's Thesis (Church-Turing Thesis): 'Any calculation or algorithm that can be performed by an intuitive human procedure or real computer can also be computed by a Turing Machine.'"
    ],
    traps: [
      "Forgetting unary representation: In unary, 4 is 'aaaa', NOT the number digit 4!",
      "Confusing Recursive and Recursively Enumerable: Recursive languages ALWAYS halt (saying YES or NO). Recursively enumerable languages halt on YES, but may loop forever on NO."
    ],
    bannerColor: '#c27d00',
    borderColor: '#c27d00'
  }
];
