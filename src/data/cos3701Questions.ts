import { ExamQuestion } from '../types/exam';

export const COS3701_QUESTIONS: ExamQuestion[] = [
  // ==========================================
  // TYPE 1: Regular Expressions, DFAs & Theorem 21
  // ==========================================
  {
    id: 'Q-2026-JAN-1',
    codeId: 'W1',
    typeId: 'type-1-re-dfa',
    year: 2026,
    session: 'Jan/Feb',
    questionNumber: 'Question 1.1 & 1.2',
    marks: 12,
    verbatimQuestion: `1.1. Draw Finite Automata (FA) for the language L over the alphabet {a, b} that consists of all words that start with the substring ab and ends with an a.
Example of words in the language are aba, abba, ababa, abbaaba, abbbabbba, abbaaaaaaa, abbbbbbbba, etc.
Examples of words that are not in the language are a, abb, abaab, bbab, aaabbbb, baabbbbaaba etc. (6 marks)

1.2. Define Context Free Grammar (CFG) for the above (Question 1.1) Finite Automata (FA) using Theorem 21. (6 marks)`,
    simpleExplanation: `Think of a locked door that only lets people in if they enter the code correctly:
First, the word MUST start with "a", then "b".
Then, anything in the middle can happen! Any mix of "a" or "b".
Finally, the very last letter MUST be an "a"! If it ends with "b", it gets locked out.
For Theorem 21, every bubble (state) gets a big letter name. When an arrow leaves a bubble with a letter, you write: State -> letter NextState!`,
    stepByStep: [
      "1. Understand the pattern: The regular expression is ab(a + b)*a. Shortest valid word is 'aba'.",
      "2. State S (Start): Must read 'a' to move forward to state A. If it reads 'b', it fails permanently (dead state D).",
      "3. State A: Must read 'b' to confirm the prefix 'ab', moving to state B. If it reads 'a', it failed the 'ab' start, so go to dead state D.",
      "4. Now 'ab' is locked in! In State B: The word just read a 'b', so it does NOT end in 'a' yet (not accepting). If it reads 'a', it transitions to State C (ACCEPTING state, because it now ends in 'a'!).",
      "5. In State C (Accepting): If it reads another 'a', it still ends in 'a', so it loops on C. If it reads 'b', it no longer ends in 'a', so it goes back to State B.",
      "6. Dead State D: Any illegal start ('b...' or 'aa...') stays trapped here forever.",
      "7. Theorem 21 Conversion: Map every transition into a grammar rule. S -> aA, A -> bB, B -> aC | bB, C -> aC | bB | Λ (since C is an accept state!). Trap state D can be omitted or included."
    ],
    answer: `1.1 Deterministic Finite Automaton (DFA):
States: {S (Start), A, B, C (+ Accept), D (Dead / Trap)}
Transitions:
  - From S: on 'a' -> A; on 'b' -> D
  - From A: on 'b' -> B; on 'a' -> D
  - From B: on 'a' -> C (+); on 'b' -> B
  - From C (+): on 'a' -> C (+); on 'b' -> B
  - From D: on 'a' -> D; on 'b' -> D

1.2 Context-Free Grammar (CFG) via Theorem 21:
  S -> aA
  A -> bB
  B -> aC | bB
  C -> aC | bB | Λ`,
    notes: [
      "Notice that C is the ONLY accepting state, so only C gets '| Λ'.",
      "Dead state D has no path to any accept state, so omitting D keeps the grammar clean and minimal."
    ],
    changeOneThing: "What if the question asked for words starting with 'ba' and ending with 'b'? Reverse the letters: S -> bA, A -> aB, B -> bC | aB, C -> bC | aB | Λ.",
    answerDiagram: {
      type: 'dfa',
      title: 'DFA for words starting with "ab" and ending with "a" (2026 Q1.1)',
      description: 'States: S (Start) -> A on a -> B on b -> C (Accept) on a. B and C alternate on b and a.',
      isAnswerDiagram: true,
      states: [
        { id: 'S', label: 'S', x: 70, y: 120, isStart: true },
        { id: 'A', label: 'A', x: 210, y: 120 },
        { id: 'B', label: 'B', x: 370, y: 120 },
        { id: 'C', label: 'C', x: 530, y: 120, isFinal: true },
        { id: 'D', label: 'Trap', x: 140, y: 200 }
      ],
      transitions: [
        { from: 'S', to: 'A', label: 'a' },
        { from: 'S', to: 'D', label: 'b' },
        { from: 'A', to: 'B', label: 'b' },
        { from: 'A', to: 'D', label: 'a' },
        { from: 'B', to: 'C', label: 'a', curve: -20 },
        { from: 'B', to: 'B', label: 'b', loopDirection: 'bottom' },
        { from: 'C', to: 'B', label: 'b', curve: -20 },
        { from: 'C', to: 'C', label: 'a', loopDirection: 'top' },
        { from: 'D', to: 'D', label: 'a, b', loopDirection: 'bottom' }
      ]
    }
  },

  {
    id: 'Q-2025-OCT-1',
    codeId: 'W2',
    typeId: 'type-1-re-dfa',
    year: 2025,
    session: 'Oct/Nov',
    questionNumber: 'Question 1.1 & 1.2',
    marks: 12,
    verbatimQuestion: `1.1. Draw Finite Automata (FA) for all words with the substring bab over the alphabet ∑ = {a, b}. (6 marks)

1.2. Define Context Free Grammar (CFG) for the above (Question 1.1) Finite Automata (FA). (6 marks)`,
    simpleExplanation: `We are looking for the magic password "bab" anywhere inside the word!
Think of it like a progress bar:
State 0: Found 0 letters of "bab".
State 1: Just saw "b" (1 letter found!).
State 2: Just saw "ba" (2 letters found!).
State 3: Just saw "bab" (SUCCESS! Lock in and celebrate!).
Once you reach State 3, you won! Any more letters after this stay in State 3.`,
    stepByStep: [
      "1. Build the progress chain: State S (need 'b') -> State A (got 'b', need 'a') -> State B (got 'ba', need 'b') -> State C (got 'bab', ACCEPT!).",
      "2. Check the wrong turns in each state:",
      "   - In S: If we see 'a', we still have 0 progress, loop in S.",
      "   - In A (got 'b'): If we see another 'b', we didn't lose our progress, because that second 'b' could start 'bab'! So loop on A.",
      "   - In B (got 'ba'): If we see 'a', 'baa' ruins it! But 'baa' has no 'b' at the end, so reset back to S.",
      "   - In C (got 'bab'): Already won! Loop on 'a, b'.",
      "3. Convert to CFG using Theorem 21: Name states S, A, B, C. C is accepting so C gets '| Λ'."
    ],
    answer: `1.1 Finite Automaton (FA) for substring 'bab':
States: {S (Start), A, B, C (+ Accept)}
Transitions:
  - From S: on 'b' -> A; on 'a' -> S
  - From A: on 'a' -> B; on 'b' -> A
  - From B: on 'b' -> C (+); on 'a' -> S
  - From C (+): on 'a' -> C (+); on 'b' -> C (+)

1.2 Context Free Grammar (CFG) via Theorem 21:
  S -> bA | aS
  A -> aB | bA
  B -> bC | aS
  C -> aC | bC | Λ`,
    notes: [
      "Regular expression equivalent: (a + b)* bab (a + b)*.",
      "Theorem 21 produces a right-linear grammar directly from the transition diagram."
    ],
    changeOneThing: "If the question asks for substring 'aba': S -> aA | bS, A -> bB | aA, B -> aC | bS, C -> aC | bC | Λ.",
    answerDiagram: {
      type: 'dfa',
      title: 'FA for substring "bab" (2025 Oct/Nov Q1.1)',
      description: 'States: S -> A (saw b) -> B (saw ba) -> C (saw bab, accept).',
      isAnswerDiagram: true,
      states: [
        { id: 'S', label: 'S', x: 80, y: 120, isStart: true },
        { id: 'A', label: 'A', x: 240, y: 120 },
        { id: 'B', label: 'B', x: 400, y: 120 },
        { id: 'C', label: 'C', x: 560, y: 120, isFinal: true }
      ],
      transitions: [
        { from: 'S', to: 'S', label: 'a', loopDirection: 'top' },
        { from: 'S', to: 'A', label: 'b' },
        { from: 'A', to: 'A', label: 'b', loopDirection: 'top' },
        { from: 'A', to: 'B', label: 'a' },
        { from: 'B', to: 'C', label: 'b' },
        { from: 'B', to: 'S', label: 'a', curve: 35 },
        { from: 'C', to: 'C', label: 'a, b', loopDirection: 'top' }
      ]
    }
  },

  {
    id: 'Q-2025-JAN-1',
    codeId: 'W3',
    typeId: 'type-1-re-dfa',
    year: 2025,
    session: 'Jan/Feb',
    questionNumber: 'Question 1.1, 1.2 & 1.3',
    marks: 12,
    verbatimQuestion: `1.1. Determine a regular expression for the language L over the alphabet {a, b} that consists of all words that start with the substring ba, then could have other substrings but must have at least one bb and bb cannot be followed by an a.
Example of words in the language are babb, baabbbbb, baaaaaaaaabb, bababaabbbbb etc.
Examples of words that are not in the language are a, aba, bbab, aaabbbba, ababbbbaabb etc. (3 marks)

1.2. Design a deterministic finite automaton (DFA) that will recognise all of the words in L as defined above. (5 marks)

1.3. Use Theorem 21 to develop a context-free grammar (CFG) for the language L. (4 marks)`,
    simpleExplanation: `Rule 1: Word MUST start with "ba".
Rule 2: You can have whatever you want in the middle, UNTIL you hit a double-b ("bb").
Rule 3: Once you make that double-b ("bb"), you are NEVER allowed to see the letter "a" again! You can only finish with more b's!
So at the end, it must finish as bb b* (pure b's)!`,
    stepByStep: [
      "1. Build the Regular Expression: Must start with 'ba'. Before the final 'bb', we can have any sequence that doesn't contain 'bb' (e.g. (a + ba)*). Once 'bb' arrives, no 'a' can ever follow, so it must end with b*. Together: ba(a + ba)*bb b* = ba(a + ba)*b b+.",
      "2. Build the DFA states:",
      "   - Start at State S: On 'b' go to 1. On 'a' go to Trap.",
      "   - State 1: On 'a' go to 2 (prefix 'ba' successfully matched!). On 'b' go to Trap.",
      "   - State 2 (in the middle): On 'a' loop in 2. On 'b' go to State 3 (first 'b' of potential 'bb').",
      "   - State 3: If 'a' appears, not 'bb' yet! Go back to 2. If 'b' appears, we have 'bb'! Go to State 4 (ACCEPT!).",
      "   - State 4 (+): Only 'b' allowed here! On 'b' loop in 4. If 'a' appears after 'bb', go to Trap!",
      "   - Trap: Loops on 'a, b'.",
      "3. Convert to CFG using Theorem 21: Write each arrow as Nonterminal -> letter NextNonterminal, with State 4 having | Λ."
    ],
    answer: `1.1 Regular Expression:
  ba(a + ba)*bb b*   (or equivalently: ba(a + ba)*b b+)

1.2 Deterministic Finite Automaton (DFA):
States: {S, 1, 2, 3, 4 (+ Accept), Trap}
Transitions:
  - S: on 'b' -> 1; on 'a' -> Trap
  - 1: on 'a' -> 2; on 'b' -> Trap
  - 2: on 'a' -> 2; on 'b' -> 3
  - 3: on 'b' -> 4 (+); on 'a' -> 2
  - 4 (+): on 'b' -> 4 (+); on 'a' -> Trap
  - Trap: on 'a' -> Trap; on 'b' -> Trap

1.3 Context-Free Grammar (CFG) via Theorem 21:
  S -> bA
  A -> aB
  B -> aB | bC
  C -> bD | aB
  D -> bD | Λ`,
    notes: [
      "Here State S is S, State 1 is A, State 2 is B, State 3 is C, State 4 is D.",
      "Notice how C -> aB handles resetting if a single 'b' was followed by 'a', because 'bb' was not completed yet."
    ],
    answerDiagram: {
      type: 'dfa',
      title: 'DFA for words starting with "ba", containing "bb" not followed by "a" (2025 Jan/Feb Q1.2)',
      isAnswerDiagram: true,
      states: [
        { id: 'S', label: 'S', x: 60, y: 120, isStart: true },
        { id: '1', label: '1', x: 180, y: 120 },
        { id: '2', label: '2', x: 300, y: 120 },
        { id: '3', label: '3', x: 440, y: 120 },
        { id: '4', label: '4', x: 580, y: 120, isFinal: true },
        { id: 'Trap', label: 'Trap', x: 180, y: 220 }
      ],
      transitions: [
        { from: 'S', to: '1', label: 'b' },
        { from: 'S', to: 'Trap', label: 'a' },
        { from: '1', to: '2', label: 'a' },
        { from: '1', to: 'Trap', label: 'b' },
        { from: '2', to: '2', label: 'a', loopDirection: 'top' },
        { from: '2', to: '3', label: 'b', curve: -15 },
        { from: '3', to: '2', label: 'a', curve: -15 },
        { from: '3', to: '4', label: 'b' },
        { from: '4', to: '4', label: 'b', loopDirection: 'top' },
        { from: '4', to: 'Trap', label: 'a', curve: 40 },
        { from: 'Trap', to: 'Trap', label: 'a, b', loopDirection: 'bottom' }
      ]
    }
  },

  {
    id: 'Q-2024-1',
    codeId: 'W4',
    typeId: 'type-1-re-dfa',
    year: 2024,
    session: 'Oct/Nov',
    questionNumber: 'Question 1(a), (b), (c)',
    marks: 10,
    verbatimQuestion: `Question 1
a) Determine a regular expression for the language L over the alphabet {a; b} that consists of all words that have at least one a but contain exactly one bb substring (and no other as [note: context: no other bb's, exactly one bb]). Example of words in the language are bba, aaabbaaa, aaaabbaaaaaa etc. Examples of words that are not in the language are b, a, bab, ab, aaabbbb, abaaabaaaaa etc. (2 marks)

b) Design a deterministic finite automaton (DFA) that will recognise all of the words in L as defined above. (4 marks)

c) Use Theorem 21 to develop a context-free grammar (CFG) for the language L. (4 marks)`,
    simpleExplanation: `The word has two rules:
1. It MUST contain at least one 'a'.
2. It MUST contain exactly one 'bb' block!
Notice that all other b's must not make another 'bb'. So words look like: some a's, then 'bb', then more a's!
Examples: 'bba', 'aaabbaaa', 'aabbaa'.
If it starts with 'bb', it needs at least one 'a' at the end: bba a*.
If it starts with 'a', it has a+ bb a*.
Together: bba a* + a a* bb a*.`,
    stepByStep: [
      "1. Regular Expression: Words are strings of a's with exactly one 'bb' inserted, having at least one 'a'. Two possibilities: 'bb' is at the very beginning (bba a*) or 'bb' comes after some a's (a a* bb a*). Combine them: bbaa* + aa*bba*.",
      "2. DFA construction:",
      "   - Start -S: If it reads 'b', go to state A (first 'b'). If it reads 'a', go to state M (first 'a').",
      "   - From A: reads second 'b' -> go to state C (got 'bb', now MUST see at least one 'a').",
      "   - From C: on 'a' -> go to +B (ACCEPT!). Loops on 'a'.",
      "   - From M: loops on 'a'. On 'b' -> goes to G (saw first 'b').",
      "   - From G: on 'b' -> goes to +R (got 'bb' and already had 'a'! ACCEPT!). Loops on 'a'.",
      "   - Any third 'b' or illegal symbol goes to dead state L.",
      "3. Apply Theorem 21: S -> bA | aM, A -> bC | aL, C -> aB | bL, B -> aB | Λ | bL, M -> aM | bG, G -> bR | aL, R -> aR | Λ | bL."
    ],
    answer: `a) Regular Expression:
  bbaa* + aa*bba*

b) DFA:
States: {-S (Start), A, C, +B (Accept), M, G, +R (Accept), L (Trap)}
Transitions:
  - S: on 'b' -> A; on 'a' -> M
  - A: on 'b' -> C; on 'a' -> L
  - C: on 'a' -> +B; on 'b' -> L
  - B (+): on 'a' -> +B; on 'b' -> L
  - M: on 'a' -> M; on 'b' -> G
  - G: on 'b' -> +R; on 'a' -> L
  - R (+): on 'a' -> +R; on 'b' -> L
  - L (Trap): on 'a' -> L; on 'b' -> L

c) CFG via Theorem 21:
  S -> bA | aM
  A -> bC | aL
  C -> aB | bL
  B -> aB | Λ | bL
  M -> aM | bG
  G -> bR | aL
  R -> aR | Λ | bL
  L -> aL | bL`,
    notes: [
      "In the student script memo that passed with 80%, this exact DFA structure with states S, A, C, B, M, G, R, L was awarded full marks.",
      "Both B and R are accept states because both represent having seen 'bb' and at least one 'a'."
    ],
    answerDiagram: {
      type: 'dfa',
      title: 'DFA for words with at least one "a" and exactly one "bb" (2024 Q1b)',
      isAnswerDiagram: true,
      states: [
        { id: 'S', label: '-S', x: 60, y: 110, isStart: true },
        { id: 'A', label: 'A', x: 190, y: 60 },
        { id: 'C', label: 'C', x: 330, y: 60 },
        { id: 'B', label: '+B', x: 470, y: 60, isFinal: true },
        { id: 'M', label: 'M', x: 190, y: 170 },
        { id: 'G', label: 'G', x: 330, y: 170 },
        { id: 'R', label: '+R', x: 470, y: 170, isFinal: true },
        { id: 'L', label: 'L', x: 280, y: 250 }
      ],
      transitions: [
        { from: 'S', to: 'A', label: 'b' },
        { from: 'S', to: 'M', label: 'a' },
        { from: 'A', to: 'C', label: 'b' },
        { from: 'A', to: 'L', label: 'a' },
        { from: 'C', to: 'B', label: 'a' },
        { from: 'C', to: 'L', label: 'b' },
        { from: 'B', to: 'B', label: 'a', loopDirection: 'top' },
        { from: 'B', to: 'L', label: 'b', curve: 30 },
        { from: 'M', to: 'M', label: 'a', loopDirection: 'bottom' },
        { from: 'M', to: 'G', label: 'b' },
        { from: 'G', to: 'R', label: 'b' },
        { from: 'G', to: 'L', label: 'a' },
        { from: 'R', to: 'R', label: 'a', loopDirection: 'bottom' },
        { from: 'R', to: 'L', label: 'b' },
        { from: 'L', to: 'L', label: 'a, b', loopDirection: 'bottom' }
      ]
    }
  },

  {
    id: 'Q-2021-1',
    codeId: 'W5',
    typeId: 'type-1-re-dfa',
    year: 2021,
    session: 'Sep/Oct/Nov',
    questionNumber: 'Question 1 (1, 2, 3)',
    marks: 10,
    verbatimQuestion: `1. Determine a regular expression for the language L over the alphabet {a, b} that starts with an a and has even number of bs.
Examples of words in the language are: abb, abbbb, abababab, abab, abbbbbbbbb, ababababbbb ect.
Examples of the words that are not in the language are abbb, aaab, abaabaabaaaaa, bbbbaa, babababa etc. (2 marks)

2. Design a deterministic finite automaton (DFA) that will recognize all the words in L as defined above. (4 marks)

3. Use Theorem 21 to develop a context-free grammar (CFG) for the language L. (4 marks)`,
    simpleExplanation: `Rule 1: First letter MUST be 'a'.
Rule 2: Total number of 'b's in the whole word must be an EVEN number (0, 2, 4, 6, 8...).
Any number of extra 'a's can be sprinkled anywhere because 'a's do not affect whether the number of 'b's is even!
So start with 'a', then have any sequence where 'b's always come in pairs!
In regex: a a* (b a* b a*)* or a (a + b a* b)*.`,
    stepByStep: [
      "1. Regular expression: Starts with 'a', followed by any mix with an even count of 'b's. Formula: a(a + ba*b)*.",
      "2. DFA design:",
      "   - Start State S: Must read 'a'. If 'a', go to State 1 (saw starting 'a', currently has 0 b's which is EVEN -> ACCEPTING!). If 'b', go to Trap.",
      "   - State 1 (+ Accept): Even number of b's. On 'a', stay in State 1. On 'b', count of b's becomes ODD, go to State 2.",
      "   - State 2 (Odd b's): On 'a', stay in State 2. On 'b', count of b's becomes EVEN again, go back to State 1 (+).",
      "   - Trap: Loops on 'a, b'.",
      "3. Theorem 21 CFG: S -> aA | bTrap; A -> aA | bB | Λ; B -> aB | bA; Trap -> aTrap | bTrap."
    ],
    answer: `1. Regular Expression:
  a(a + ba*b)*   (or a a*(b a* b a*)*)

2. DFA:
States: {S (Start), A (+ Accept), B, Trap}
Transitions:
  - S: on 'a' -> A (+); on 'b' -> Trap
  - A (+): on 'a' -> A (+); on 'b' -> B
  - B: on 'a' -> B; on 'b' -> A (+)
  - Trap: on 'a, b' -> Trap

3. CFG via Theorem 21:
  S -> aA
  A -> aA | bB | Λ
  B -> aB | bA`,
    notes: [
      "Notice state A is accepting because zero 'b's is an even number (0 is even!).",
      "Whenever you see 'even number of b's', you always use a 2-state toggle loop (Even <-> Odd) linked by 'b'."
    ],
    answerDiagram: {
      type: 'dfa',
      title: 'DFA for words starting with "a" and having an even number of "b"s (2021 Q1.2)',
      isAnswerDiagram: true,
      states: [
        { id: 'S', label: 'S', x: 100, y: 120, isStart: true },
        { id: 'A', label: 'A', x: 280, y: 120, isFinal: true },
        { id: 'B', label: 'B', x: 460, y: 120 },
        { id: 'Trap', label: 'Trap', x: 100, y: 220 }
      ],
      transitions: [
        { from: 'S', to: 'A', label: 'a' },
        { from: 'S', to: 'Trap', label: 'b' },
        { from: 'A', to: 'A', label: 'a', loopDirection: 'top' },
        { from: 'A', to: 'B', label: 'b', curve: -20 },
        { from: 'B', to: 'A', label: 'b', curve: -20 },
        { from: 'B', to: 'B', label: 'a', loopDirection: 'top' },
        { from: 'Trap', to: 'Trap', label: 'a, b', loopDirection: 'bottom' }
      ]
    }
  },

  // ==========================================
  // TYPE 2: Convert CFG to Chomsky Normal Form (CNF)
  // ==========================================
  {
    id: 'Q-2026-JAN-2',
    codeId: 'W6',
    typeId: 'type-2-cnf',
    year: 2026,
    session: 'Jan/Feb',
    questionNumber: 'Question 2',
    marks: 14,
    verbatimQuestion: `Convert the following Context Free Grammar (CFG) to Chomsky Norman Form (CNF)
  S ⭢ aXYZb | bYa
  X ⭢ ZY | a
  Y ⭢ aY | ᴧ
  Z ⭢ b | ᴧ
Show all the three steps.`,
    simpleExplanation: `Chomsky Normal Form is a strict rulebook for grammars:
Every single rule must look like EITHER:
- Two Big Letters (like S -> AB)
- OR One Small Letter (like A -> a)
We fix this in 3 easy steps:
Step 1: Get rid of all empty ghost letters (Λ).
Step 2: Get rid of lazy single rules where one big letter makes another big letter alone (like S -> Y).
Step 3: Replace small letters inside long rules with helper big letters, and chop long lines so they are strictly 2 letters long!`,
    stepByStep: [
      "Original Grammar:",
      "  S -> aXYZb | bYa",
      "  X -> ZY | a",
      "  Y -> aY | Λ",
      "  Z -> b | Λ",
      "",
      "STEP 1: Kill Λ-productions (Null productions)",
      "- Which nonterminals are nullable? Y -> Λ and Z -> Λ. Also check X: X -> ZY, since both Z and Y can be Λ, X is ALSO nullable (X -> Λ)!",
      "- Now remove Λ rules and write all combinations:",
      "  For S -> aXYZb: (drop X, drop Y, drop Z, drop pairs, drop all three):",
      "    S -> aXYZb | aYZb | aXZb | aXYb | aZb | aYb | aXb | ab",
      "  For S -> bYa: Y can be Λ, so:",
      "    S -> bYa | ba",
      "  For X -> ZY | a: drop Z (Y), drop Y (Z), drop both (Λ):",
      "    X -> ZY | Z | Y | a",
      "  For Y -> aY: drop Y:",
      "    Y -> aY | a",
      "  For Z -> b: stays Z -> b",
      "",
      "STEP 2: Kill Unit Productions",
      "- Look for single nonterminals on the RHS: In X, we have unit productions X -> Y and X -> Z.",
      "- Substitute Y's non-unit productions (aY, a) into X: X gets aY | a.",
      "- Substitute Z's non-unit productions (b) into X: X gets b.",
      "- After removing unit productions X -> Y and X -> Z:",
      "  X -> ZY | a | aY | b",
      "",
      "STEP 3: Convert to Chomsky Normal Form (Replace Terminals & Shorten)",
      "- Introduce A -> a and B -> b for terminals appearing in strings of length >= 2.",
      "- Rewrite S, X, Y in terms of nonterminals:",
      "  A -> a,  B -> b",
      "  Y -> AY | a",
      "  Z -> b",
      "  X -> ZY | a | AY | b",
      "- Break down S rules of length > 2 using intermediate variables R1, R2, ...:",
      "  S -> AR1 | AR2 | AR3 | AR4 | AZB | AYB | AXB | AB | BYA | BA",
      "  where R1 -> XR2, R2 -> YR3, R3 -> ZB, etc."
    ],
    answer: `Step 1 (Kill Λ-productions):
  Nullable: Y, Z, and X (since X -> ZY).
  S -> aXYZb | aYZb | aXZb | aXYb | aZb | aYb | aXb | ab | bYa | ba
  X -> ZY | Z | Y | a
  Y -> aY | a
  Z -> b

Step 2 (Kill Unit productions):
  Unit productions to eliminate: X -> Y and X -> Z.
  Since Y -> aY | a and Z -> b:
  X -> ZY | a | aY | b

Step 3 (Chomsky Normal Form):
  Define terminal helpers:
    A -> a
    B -> b
  Shorten and substitute:
    Y -> AY | a
    Z -> b
    X -> ZY | AY | a | b
    S -> AR1 | AR3 | AR5 | AR7 | AZB | AYB | AXB | AB | BYA | BA
  Helper variables:
    R1 -> XR2,  R2 -> YR3,  R3 -> ZB
    R4 -> YB,   R5 -> XR4,  R6 -> ZB,  R7 -> XY`,
    notes: [
      "A common trap is forgetting that X -> ZY makes X nullable when both Z -> Λ and Y -> Λ exist!",
      "Showing all 3 steps clearly guarantees the full 14 marks."
    ],
    changeOneThing: "If S had S -> Λ, S would be nullable and a new start symbol S0 -> S would be added."
  },

  {
    id: 'Q-2025-OCT-2',
    codeId: 'W7',
    typeId: 'type-2-cnf',
    year: 2025,
    session: 'Oct/Nov',
    questionNumber: 'Question 2',
    marks: 12,
    verbatimQuestion: `Convert the following Context Free Grammar (CFG) to Chomsky Norman Form (CNF)
  S ⭢ aX | Yb
  X ⭢ ZXYZ | a
  Y ⭢ bY | b | ᴧ
  Z ⭢ a | ᴧ
Show all the three steps.`,
    simpleExplanation: `Here Y has a null rule (Y -> Λ) and Z has a null rule (Z -> Λ).
Step 1: Drop Y and Z in all combinations. Notice X has two Z's and one Y: X -> ZXYZ! That means 2^3 = 8 combinations when killing nulls.
Step 2: Kill sink/unit productions like X -> X.
Step 3: Put everything into pairs of big letters.`,
    stepByStep: [
      "1. Original CFG:",
      "   S -> aX | Yb",
      "   X -> ZXYZ | a",
      "   Y -> bY | b | Λ",
      "   Z -> a | Λ",
      "",
      "2. Step 1 (Kill Λ): Nullable nonterminals are Y and Z.",
      "   - In S -> Yb, drop Y -> gives b. So S -> aX | Yb | b.",
      "   - In Y -> bY | b | Λ, drop Y -> gives b (already present). So Y -> bY | b.",
      "   - In Z -> a | Λ, drop Λ -> Z -> a.",
      "   - In X -> ZXYZ: combinations of dropping first Z, Y, and second Z:",
      "     ZXYZ, XYZ, ZXZ, ZXY, XZ, XY, ZX, X.",
      "     So X -> ZXYZ | XYZ | ZXZ | ZXY | XZ | XY | ZX | X | a.",
      "   - Erase the self-loop X -> X (sink/useless production).",
      "",
      "3. Step 2 (Kill Unit productions):",
      "   - Check for unit productions (single nonterminal on RHS). None remain (X -> X was deleted; all other RHS have length >= 2 or are terminals a, b).",
      "",
      "4. Step 3 (CNF formatting):",
      "   - Helper terminals: A -> a, B -> b.",
      "   - Y -> BY | b",
      "   - Z -> a",
      "   - S -> AX | YB | b",
      "   - X: Replace mixed and break long strings into pairs:",
      "     X -> ZR1 | XR2 | ZR3 | XR4 | XZ | XY | ZX | a",
      "     where R1 -> XR2, R2 -> YZ, R3 -> XZ, R4 -> Y."
    ],
    answer: `Step 1 (Kill Null Productions):
  Nullable: Y, Z.
  S -> aX | Yb | b
  X -> ZXYZ | XYZ | ZXZ | ZXY | XZ | XY | ZX | a  (X -> X removed)
  Y -> bY | b
  Z -> a

Step 2 (Kill Unit Productions):
  No unit productions to eliminate.

Step 3 (Chomsky Normal Form):
  Terminal definitions:
    A -> a
    B -> b
  CNF Productions:
    S -> AX | YB | b
    Y -> BY | b
    Z -> a
    X -> ZR1 | XR2 | ZR3 | XR4 | XZ | XY | ZX | a
    R1 -> XR2
    R2 -> YZ
    R3 -> XZ
    R4 -> Y`,
    notes: [
      "Always remove self-loop unit productions like X -> X immediately.",
      "All RHS are now either two nonterminals or one terminal."
    ]
  },

  {
    id: 'Q-2024-2',
    codeId: 'W8',
    typeId: 'type-2-cnf',
    year: 2024,
    session: 'Oct/Nov',
    questionNumber: 'Question 1(d)',
    marks: 6,
    verbatimQuestion: `Convert the following CFG to Chomsky Normal Form (CNF):
  S -> aXY | Yb
  X -> XZYZ | a
  Y -> bY | Λ
  Z -> a | Λ`,
    simpleExplanation: `This was Question 1(d) in the 2024 Oct/Nov paper.
Step 1: Y and Z can be empty (Λ).
So aXY can become aX, and Yb can become b!
XZYZ can lose Z and Y to become XZY, XYZ, XY, and X.
Step 2: Remove X -> X (it does nothing!).
Step 3: Make pairs: A -> a, B -> b, and split rules longer than 2.`,
    stepByStep: [
      "Original: S -> aXY | Yb; X -> XZYZ | a; Y -> bY | Λ; Z -> a | Λ.",
      "Step 1: Kill Λ productions (Y -> Λ, Z -> Λ):",
      "  S -> aXY | aX | Yb | b",
      "  X -> XZYZ | XZY | XYZ | XY | X | a",
      "  Y -> bY | b",
      "  Z -> a",
      "Step 2: Kill sink / unit productions: delete X -> X.",
      "Step 3: Convert to CNF:",
      "  A -> a, B -> b",
      "  S -> AR1 | AX | YB | b  (where R1 -> XY)",
      "  X -> XR2 | XR3 | XY | a  (where R2 -> ZR4, R4 -> YZ, R3 -> ZY)",
      "  Y -> BY | b",
      "  Z -> a"
    ],
    answer: `Step 1 (Kill Λ):
  S -> aXY | aX | Yb | b
  X -> XZYZ | XZY | XYZ | XY | a
  Y -> bY | b
  Z -> a

Step 2 (Kill Unit):
  X -> X deleted.

Step 3 (CNF):
  A -> a
  B -> b
  S -> AR1 | AX | YB | b
  R1 -> XY
  X -> XR2 | XR3 | XY | a
  R2 -> ZR4
  R4 -> YZ
  R3 -> ZY
  Y -> BY | b
  Z -> a`,
    notes: [
      "In the student script (awarded 80%), step 1 and step 2 were clearly separated, making it effortless for the examiner to award full marks."
    ]
  },

  // ==========================================
  // TYPE 3: Deterministic Pushdown Automata (DPDA)
  // ==========================================
  {
    id: 'Q-2026-JAN-3',
    codeId: 'W9',
    typeId: 'type-3-dpda',
    year: 2026,
    session: 'Jan/Feb',
    questionNumber: 'Question 3',
    marks: 14,
    verbatimQuestion: `Build a deterministic pushdown automaton (DPDA) that accepts the language
  L = {a^(m+1) (ba)^n a^n | n ≥ 1, m ≥ 0}
over the alphabet Σ = {a, b}.`,
    simpleExplanation: `Let's break down the word:
Part 1: a^(m+1) -> starts with at least one 'a', maybe more 'a's (m >= 0).
Part 2: (ba)^n -> alternating 'ba' repeated n times (at least once).
Part 3: a^n -> finished with n 'a's (same number n as the 'ba' pairs!).
How the Stack counts for us:
1. When we see the starting 'a's, we just read them through.
2. When the (ba) pairs arrive, EVERY time we see a (ba) pair, we PUSH X onto our stack!
3. Then when the final 'a's arrive, for every 'a', we POP X off the stack!
4. At the end, check that the stack has no X's left (pop Δ) and accept!`,
    stepByStep: [
      "1. Understand the language with an example: For m=0, n=2: word is a^1 (ba)^2 a^2 = a ba ba a a.",
      "2. State 1: START -> READ1. Must read at least one 'a' (handles a^{m+1}).",
      "3. Loop on 'a' in READ2: As long as more 'a's come, consume them. This satisfies m >= 0.",
      "4. Switching to (ba)^n: From READ2, when 'b' is read, we are starting the first 'ba' pair! Read the matching 'a', and PUSH X onto the stack! This records one (ba) pair.",
      "5. Can we have more (ba) pairs? If the next letter is 'b', repeat: read 'b', read 'a', PUSH X.",
      "6. Switching to the final a^n: If after reading 'a' in the (ba) pair, the next letter is ANOTHER 'a', we have entered the final a^n block! POP X off the stack for this first 'a'.",
      "7. Continue reading 'a's and popping X for each one.",
      "8. When input is empty (reads Δ), pop Δ from stack to verify count was exactly equal. Then ACCEPT!"
    ],
    answer: `Flowchart Structure for DPDA:
1. START -> READ1
2. READ1:
   - on 'a' -> READ2 (first 'a' consumed, satisfies a^{m+1})
   - on 'b' or 'Δ' -> Crash / Reject
3. READ2:
   - on 'a' -> READ2 (consumes additional a's for m >= 1)
   - on 'b' -> READ3 (begins a 'ba' pair)
4. READ3:
   - on 'a' -> PUSH X (completed one 'ba' pair)
   - on 'b' or 'Δ' -> Crash
5. PUSH X -> READ4
6. READ4:
   - on 'b' -> READ3 (another 'ba' pair!)
   - on 'a' -> POP1 (first 'a' of the final a^n block!)
7. POP1:
   - pops 'X' -> READ5
   - pops 'Δ' -> Crash (too many final a's)
8. READ5:
   - on 'a' -> POP1 (matches another 'a' with an 'X')
   - on 'Δ' -> POP_FINAL
9. POP_FINAL:
   - pops 'Δ' -> ACCEPT (all X's matched, input ended!)
   - pops 'X' -> Crash (too few final a's)`,
    notes: [
      "Because m >= 0, the prefix has at least 1 'a'. READ1 ensures at least 1 'a' before any 'b'.",
      "Deterministic: At every step, the next state is uniquely determined by the input or stack."
    ],
    answerDiagram: {
      type: 'dpda',
      title: 'DPDA for L = { a^(m+1) (ba)^n a^n } (2026 Q3)',
      isAnswerDiagram: true,
      flowchartNodes: [
        { id: 'start', label: 'START', shape: 'start', x: 80, y: 50 },
        { id: 'read1', label: 'READ 1', shape: 'read', x: 80, y: 130 },
        { id: 'read2', label: 'READ 2', shape: 'read', x: 80, y: 230 },
        { id: 'read3', label: 'READ 3', shape: 'read', x: 230, y: 230 },
        { id: 'pushX', label: 'PUSH X', shape: 'push', x: 370, y: 230 },
        { id: 'read4', label: 'READ 4', shape: 'read', x: 370, y: 130 },
        { id: 'pop1', label: 'POP', shape: 'pop', x: 520, y: 130 },
        { id: 'read5', label: 'READ 5', shape: 'read', x: 520, y: 250 },
        { id: 'popF', label: 'POP', shape: 'pop', x: 650, y: 250 },
        { id: 'accept', label: 'ACCEPT', shape: 'accept', x: 650, y: 350 }
      ],
      flowchartEdges: [
        { from: 'start', to: 'read1' },
        { from: 'read1', to: 'read2', label: 'a' },
        { from: 'read2', to: 'read3', label: 'b' },
        { from: 'read3', to: 'pushX', label: 'a' },
        { from: 'pushX', to: 'read4' },
        { from: 'read4', to: 'read3', label: 'b', path: 'M 370 110 L 230 110 L 230 208' },
        { from: 'read4', to: 'pop1', label: 'a' },
        { from: 'pop1', to: 'read5', label: 'X' },
        { from: 'read5', to: 'pop1', label: 'a', path: 'M 546 250 L 580 250 L 580 130 L 548 130' },
        { from: 'read5', to: 'popF', label: 'Δ' },
        { from: 'popF', to: 'accept', label: 'Δ' }
      ]
    }
  },

  {
    id: 'Q-2024-3',
    codeId: 'W10',
    typeId: 'type-3-dpda',
    year: 2024,
    session: 'Oct/Nov',
    questionNumber: 'Question 2',
    marks: 12,
    verbatimQuestion: `Build a deterministic pushdown automata (DPDA) that accepts the language
  L = {(ab)^n (aa)^m (ba)^(n-1) | n ≥ 1, m ≥ 1}
over the alphabet ∑ = {a, b}.`,
    simpleExplanation: `1. First read (ab)^n: For every 'ab' read, PUSH X on the stack. There are n 'X's on the stack.
2. Next read (aa)^m: At least one pair of 'aa'. This doesn't change the stack, just confirms m >= 1.
3. Next read (ba)^(n-1): For each 'ba' pair, POP an X from the stack.
4. Because there are n-1 pairs of (ba), exactly ONE 'X' will remain on the stack at the end!
5. When the word ends (reads Δ), we POP the stack: it must pop 'X' (the remaining 1), and then POP again to find 'Δ' (empty)! Then ACCEPT.`,
    stepByStep: [
      "1. Phase 1 - (ab)^n: Read 'a', read 'b', PUSH X. Loop as long as 'ab' continues.",
      "2. Phase 2 - (aa)^m: From reading 'a', if next is 'a' (instead of 'b'), we entered the middle (aa)^m section. Verify at least one 'aa'. Allow loops of 'aa'.",
      "3. Phase 3 - (ba)^(n-1): When 'b' followed by 'a' appears, we are in the trailing (ba) section. For each 'ba', POP X.",
      "4. Termination: When Δ is read from tape, POP X (accounting for the +1 difference between n and n-1), then POP Δ. ACCEPT!"
    ],
    answer: `DPDA Trace & State Logic:
1. START -> READ1
2. READ1: on 'a' -> READ2
3. READ2:
   - on 'b' -> PUSH X -> READ3 (recorded one (ab))
   - on 'a' -> (enters (aa)^m block) -> READ4
4. READ3:
   - on 'a' -> READ2 (could be next (ab) or first 'a' of (aa))
5. READ4:
   - on 'a' -> READ5 (completes another 'aa' pair)
   - on 'b' -> READ6 (starts (ba) block!)
6. READ5: on 'a' -> READ4; on 'b' -> READ6
7. READ6: on 'a' -> POP1 (matched one (ba))
8. POP1: on 'X' -> READ7
9. READ7:
   - on 'b' -> READ6 (loop for another (ba))
   - on 'Δ' -> POP2 (input finished!)
10. POP2:
    - on 'X' -> POP3 (this is the single leftover X from n vs n-1)
11. POP3:
    - on 'Δ' -> ACCEPT`,
    notes: [
      "In Question 2 of the 2024 script memo, the flowchart pops one X on the end and checks for Δ before going to ACCEPT.",
      "This elegantly handles the (n - 1) offset."
    ]
  },

  // ==========================================
  // TYPE 4: Pumping Lemma for Context-Free Languages
  // ==========================================
  {
    id: 'Q-2025-JAN-4',
    typeId: 'type-4-pumping-lemma',
    year: 2025,
    session: 'Jan/Feb',
    questionNumber: 'Question 3',
    marks: 14,
    verbatimQuestion: `Prove that the language L = {a b^n a^(2n) b^n} is non-context free. Use the pumping lemma with length.`,
    simpleExplanation: `Context-free languages can only balance TWO things at once with a stack (like a^n b^n).
Here, the language has THREE matching parts: b^n, a^(2n), and b^n!
The Pumping Lemma says: any pumpable piece vxy has length at most 2^p.
Because vxy is short, it can never stretch across all three blocks at once!
If you pump vxy, only one or two blocks grow, while the third block stays small!
The counts are ruined, so the language CANNOT be context-free!`,
    stepByStep: [
      "1. Assume the contrary: Assume L is a CFL generated by a CFG in CNF with p live productions.",
      "2. Choose a test word w in L with length > 2^p: Let n = 2^p. Then w = a b^(2^p) a^(2 * 2^p) b^(2^p).",
      "3. By the pumping lemma, w = uvxyz such that: length(vxy) <= 2^p, length(x) > 0, and length(v) + length(y) > 0.",
      "4. Notice: length(vxy) <= 2^p. The distance between the first b-clump and the second b-clump is 2 * 2^p, which is much greater than 2^p. Therefore, vxy can NEVER contain letters from both the first b-clump and the second b-clump!",
      "5. Analyze all 5 possible cases for where vxy sits:",
      "   - Case 1: vxy consists of letters from the first b-clump only. Pumping to uv^2xy^2z increases the first b's, but the second b's remain 2^p. Unequal b-counts -> NOT in L.",
      "   - Case 2: vxy spans the first b-clump and the middle a-clump. Pumping changes the first b's and middle a's, but the final b's stay at 2^p. First b's != final b's -> NOT in L.",
      "   - Case 3: vxy consists of middle a's only. Pumping increases a's, but both b-clumps stay at 2^p. The ratio of a's to b's (2n to n) is broken -> NOT in L.",
      "   - Case 4: vxy spans the middle a-clump and the final b-clump. Pumping changes the final b's, but the first b's stay at 2^p -> NOT in L.",
      "   - Case 5: vxy consists of the final b-clump only. Pumping increases final b's, but first b's stay at 2^p -> NOT in L.",
      "6. In all 5 cases, uv^2xy^2z does not belong to L. Contradiction! Hence, L is non-context-free."
    ],
    answer: `Proof by Pumping Lemma with Length:
1. Assume L is a CFL generated by a CFG in CNF with p live productions.
2. Select w = a b^k a^(2k) b^k where k = 2^p. Clearly w in L and length(w) > 2^p.
3. According to the lemma, w = uvxyz with length(vxy) <= 2^p and length(v)+length(y) > 0.
4. Since length(vxy) <= 2^p, vxy cannot span more than two adjacent clumps of letters.

Case Analysis for vxy:
- Case 1: vxy lies entirely within the first clump of b's.
  Pumping to uv^2xy^2z increases the first b-clump without changing the second b-clump. Thus the number of first b's != number of last b's. uv^2xy^2z not in L.
- Case 2: vxy spans the first clump of b's and the clump of a's.
  Pumping increases the first b's and/or a's, but leaves the final b-clump at k. Thus the two b-clumps have different sizes. uv^2xy^2z not in L.
- Case 3: vxy lies entirely within the clump of a's.
  Pumping increases the number of a's to > 2k, but leaves both b-clumps at k. The required ratio of 2n a's to n b's is violated. uv^2xy^2z not in L.
- Case 4: vxy spans the clump of a's and the second clump of b's.
  Pumping increases the second b-clump while the first b-clump remains k. uv^2xy^2z not in L.
- Case 5: vxy lies entirely within the second clump of b's.
  Pumping increases the second b-clump while the first remains k. uv^2xy^2z not in L.

Conclusion:
In every possible case, pumping results in a word not in L. This contradicts the Pumping Lemma. Therefore, L is non-context-free. Q.E.D.`,
    notes: [
      "Always write out the 5 cases explicitly. Examiners grade case-by-case (usually 2 marks per case).",
      "Mentioning 'length(vxy) <= 2^p implies vxy cannot span across all three groups' is essential."
    ]
  },

  {
    id: 'Q-2024-4',
    typeId: 'type-4-pumping-lemma',
    year: 2024,
    session: 'Oct/Nov',
    questionNumber: 'Question 3',
    marks: 10,
    verbatimQuestion: `The pumping lemma with length for context-free languages (CFLs) can be stated as follows:
Let L be a CFL generated by a CFG in CNF with p live productions.
Then any word w in L with length > 2^p can be broken into five parts:
  w = uvxyz
such that
  length(vxy) ≤ 2^p
  length(x) > 0
  length(v) + length(y) > 0
and such that all the words uv^n xy^n z with n ∈{2, 3, 4,…} are also in the language L.
Use the pumping lemma with length to prove that the language
  L = {(a)^n (b)^(2n+2) (a)^(n-1) | n ≥ 1}
over the alphabet ∑ = {a, b} is non-context-free.`,
    simpleExplanation: `We have three groups: a^n, then b^(2n+2), then a^(n-1).
If this were context-free, we could pump a piece vxy.
Choose test word w = a^(2^p) b^(2(2^p)+2) a^(2^p - 1).
Because vxy has length at most 2^p, it CANNOT touch the first 'a's and the last 'a's at the same time!
So when you pump it, one group of 'a's grows, but the other group of 'a's stays frozen!
The difference between the two 'a' groups won't be 1 anymore! Contradiction!`,
    stepByStep: [
      "1. Assume L is context-free generated by a CFG in CNF with p live productions.",
      "2. Pick test word w = a^(2^p) b^(2*2^p + 2) a^(2^p - 1). length(w) > 2^p.",
      "3. Divide into 5 cases based on where vxy can lie (since length(vxy) <= 2^p):",
      "   - Case 1: vxy consists of first group of a's only.",
      "   - Case 2: vxy spans first group of a's and b's.",
      "   - Case 3: vxy consists of b's only.",
      "   - Case 4: vxy spans b's and final group of a's.",
      "   - Case 5: vxy consists of final group of a's only.",
      "4. In each case, show uv^2xy^2z breaks the relationship: first a's must equal final a's + 1, and b's must equal 2 * (first a's) + 2.",
      "5. Conclude that L is non-context-free."
    ],
    answer: `Proof:
Assume L is context-free with p live productions.
Select w = a^k b^(2k+2) a^(k-1) where k = 2^p.
Decompose w = uvxyz with length(vxy) <= 2^p and length(v)+length(y) > 0.

Case 1: vxy in initial a's. Pumping increases initial a's without changing final a's. Then count(first a) - count(last a) > 1. Word not in L.
Case 2: vxy spans initial a's and b's. Pumping increases initial a's and/or b's, but final a's remain k-1. Count of first a's != count of last a's + 1. Word not in L.
Case 3: vxy in b's only. Pumping increases b's beyond 2k+2, while both a-clumps remain k and k-1. Ratio b = 2a + 2 violated. Word not in L.
Case 4: vxy spans b's and final a's. Pumping increases final a's, but initial a's remain k. The required count difference is ruined. Word not in L.
Case 5: vxy in final a's only. Pumping increases final a's beyond k-1 while first a's stay k. Word not in L.

All cases lead to a contradiction. Hence L is non-context-free.`
  },

  // ==========================================
  // TYPE 5: Closure Properties & Proofs
  // ==========================================
  {
    id: 'Q-2026-JAN-4',
    typeId: 'type-5-closure',
    year: 2026,
    session: 'Jan/Feb',
    questionNumber: 'Question 4',
    marks: 8,
    verbatimQuestion: `Given that:
  L1 = (a + bb)* and
  L2 = (aa)* b (a + b)*
Find the grammar that generates L1.L2 (product language).`,
    simpleExplanation: `L1.L2 means any word from L1 followed immediately by any word from L2!
How to combine two grammars:
1. Write a grammar for L1 with start state S1.
2. Write a grammar for L2 with start state S2.
3. Make sure their nonterminal letters don't bump into each other (use subscripts 1 and 2).
4. Combine them with one master start rule: S -> S1 S2!`,
    stepByStep: [
      "1. Build CFG for L1 = (a + bb)*: Starts at S1, can make 'a', or 'bb', or empty (Λ).",
      "   S1 -> aS1 | bbS1 | Λ  (or S1 -> aS1 | bX1 | Λ, X1 -> bS1).",
      "2. Build CFG for L2 = (aa)* b (a + b)*:",
      "   Part 1 (aa)*: S2 -> aaS2 | bA2  (when 'b' arrives, switch to (a+b)*).",
      "   Part 2 (a+b)*: A2 -> aA2 | bA2 | Λ.",
      "3. Combine for Product L1.L2 using Theorem 37:",
      "   Introduce new start state S and production: S -> S1 S2.",
      "4. Verify: S generates a word from L1 (via S1) followed by a word from L2 (via S2)."
    ],
    answer: `1. CFG for L1:
  S1 -> aS1 | bbS1 | Λ

2. CFG for L2:
  S2 -> aaS2 | bA2
  A2 -> aA2 | bA2 | Λ

3. Product Grammar for L1.L2 (by Theorem 37):
  S -> S1 S2
  S1 -> aS1 | bbS1 | Λ
  S2 -> aaS2 | bA2
  A2 -> aA2 | bA2 | Λ`,
    notes: [
      "If the question asks for union (L1 + L2), the start production is S -> S1 | S2.",
      "If the question asks for product (L1.L2), the start production is S -> S1 S2."
    ]
  },

  {
    id: 'Q-2025-OCT-4',
    typeId: 'type-5-closure',
    year: 2025,
    session: 'Oct/Nov',
    questionNumber: 'Question 4',
    marks: 8,
    verbatimQuestion: `Given that L1 = (aa)* and L2 = (a + b)*ab(a + b)*.
Find grammars for L1 and L2. Then use Theorem 37 to find L1.L2.`,
    simpleExplanation: `L1 is even numbers of a's (aa)*.
L2 is any word containing the substring 'ab'.
Theorem 37 says: write grammar 1 with S1, grammar 2 with S2, and join them with S -> S1 S2!`,
    stepByStep: [
      "1. Grammar for L1 = (aa)*: S1 -> aaS1 | Λ.",
      "2. Grammar for L2 = (a+b)*ab(a+b)*: S2 -> aS2 | bS2 | abA2, A2 -> aA2 | bA2 | Λ.",
      "3. Apply Theorem 37: Add S -> S1 S2."
    ],
    answer: `CFG for L1:
  S1 -> aaS1 | Λ

CFG for L2:
  S2 -> aS2 | bS2 | abA2
  A2 -> aA2 | bA2 | Λ

Combined Product Grammar for L1.L2 (Theorem 37):
  S -> S1 S2
  S1 -> aaS1 | Λ
  S2 -> aS2 | bS2 | abA2
  A2 -> aA2 | bA2 | Λ`
  },

  // ==========================================
  // TYPE 6: Decidability / Theorem 42 Algorithm
  // ==========================================
  {
    id: 'Q-2026-JAN-5',
    typeId: 'type-6-theorem-42',
    year: 2026,
    session: 'Jan/Feb',
    questionNumber: 'Question 5',
    marks: 12,
    verbatimQuestion: `Using theorem 42 algorithm to determine whether the following grammar generate any words.
  S ⭢ AB
  A ⭢ BC
  C ⭢ DA
  B ⭢ CD
  D ⭢ a
  A ⭢ b`,
    simpleExplanation: `We want to know: Can this grammar ever finish making a real word of small letters, or does it loop forever?
We play the 'marking game':
1. Look for big letters that make small letters directly. Here D makes 'a' and A makes 'b'! Mark D and A!
2. Now see who can be made using ONLY marked letters.
3. If the Start letter S ever gets marked, the grammar WINS (it generates words)!`,
    stepByStep: [
      "Step -1: Is S nullable? NO, there are no Λ productions.",
      "Step 0: Check if grammar is in CNF. All RHS are either two nonterminals or one terminal. YES, it is in CNF.",
      "Is there a production of the form S -> t (t terminal)? NO.",
      "",
      "Step 1: Identify all nonterminals that produce a terminal alone:",
      "  D -> a  ==> Mark D (produces 'a')",
      "  A -> b  ==> Mark A (produces 'b')",
      "  Marked set = { D, A }.",
      "",
      "Step 2 (Round 1): Substitute marked symbols into the remaining productions:",
      "  S -> AB   (A is marked, B is not)",
      "  A -> BC   (B and C not marked)",
      "  C -> DA   (D is marked, A is marked!) ==> D A can produce 'ab'!",
      "  So C can produce a terminal word. Mark C!",
      "  Marked set = { D, A, C }.",
      "",
      "Step 2 (Round 2): Substitute with new marked symbol C:",
      "  B -> CD   (C is marked, D is marked!) ==> C D can produce 'aba'!",
      "  So B can produce a terminal word. Mark B!",
      "  Marked set = { D, A, C, B }.",
      "",
      "Step 2 (Round 3): Substitute with new marked symbol B:",
      "  S -> AB   (Both A and B are marked!) ==> S produces a terminal word!",
      "  Mark S!",
      "  Marked set = { D, A, C, B, S }.",
      "",
      "Conclusion: Since S was marked, the grammar DOES generate words! Example word: 'bababa'."
    ],
    answer: `Theorem 42 Algorithm Trace:
Step -1: Is S nullable? No (no Λ productions).
Step 0: Grammar is already in CNF.
Check: Is there a rule S -> terminal? No.

Step 1:
  D -> a  => Mark D
  A -> b  => Mark A
  Current marked set: { D, A }

Step 2 (Iteration 1):
  C -> DA: Since D and A are marked, mark C.
  Current marked set: { D, A, C }

Step 2 (Iteration 2):
  B -> CD: Since C and D are marked, mark B.
  Current marked set: { D, A, C, B }

Step 2 (Iteration 3):
  S -> AB: Since A and B are marked, mark S.
  Current marked set: { D, A, C, B, S }

Result:
Because the start symbol S is marked, the grammar generates words (the language is non-empty).`
  },

  {
    id: 'Q-2024-6',
    typeId: 'type-6-theorem-42',
    year: 2024,
    session: 'Oct/Nov',
    questionNumber: 'Question 4',
    marks: 6,
    verbatimQuestion: `Use the reformulated version of Theorem 42 to decide whether the grammar given below generates any words:
  S -> XY
  X -> SY
  Y -> SX
  X -> a
  Y -> b`,
    simpleExplanation: `X makes 'a' and Y makes 'b'.
So X and Y are marked.
Can S make a word? S -> XY, and both X and Y are marked!
So S immediately gets marked in Step 2! S -> ab.
The grammar generates words!`,
    stepByStep: [
      "1. Step -1: Is S nullable? NO.",
      "2. Step 0: Grammar is in CNF.",
      "3. Step 1: Mark nonterminals with terminal rules:",
      "   X -> a ==> Mark X.",
      "   Y -> b ==> Mark Y.",
      "   Marked = {X, Y}.",
      "4. Step 2: Test remaining rules:",
      "   S -> XY. Both X and Y are in the marked set {X, Y}.",
      "   Therefore S is marked!",
      "5. Conclusion: S is marked, so the grammar generates words. Shortest word is 'ab'."
    ],
    answer: `Step -1: S is not nullable.
Step 0: The CFG is already in CNF.
Step 1: Nonterminals producing terminals:
  X -> a (mark X)
  Y -> b (mark Y)
  Marked set = {X, Y}

Step 2:
  S -> XY: X and Y are both marked, so mark S.
  Marked set = {X, Y, S}

Conclusion:
Since S is marked, the grammar generates at least one word (e.g. w = ab).`
  },

  // ==========================================
  // TYPE 7: Tracing a Turing Machine
  // ==========================================
  {
    id: 'Q-2025-JAN-7',
    codeId: 'W20',
    typeId: 'type-7-tm-trace',
    year: 2025,
    session: 'Jan/Feb',
    questionNumber: 'Question 4',
    marks: 10,
    verbatimQuestion: `Consider the Turing Machine (TM) T (over the input alphabet Σ = {a, b}) given below:
Trace the execution of the TM on a few strings of as and bs so that you can see how it works and answer the following questions.
a. What is the shortest word that would be accepted by T? (2 marks)
b. What is accept(T)? (3 marks)
c. What is reject(T)? (2 marks)
d. What is loop(T)? (3 marks)`,
    questionDiagram: {
      type: 'tm',
      title: 'Turing Machine T Given in Question (2025 Jan/Feb Q4)',
      isQuestionDiagram: true,
      states: [
        { id: 'Start', label: '1 Start', x: 80, y: 100, isStart: true },
        { id: '2', label: '2', x: 250, y: 100 },
        { id: '3', label: '3', x: 420, y: 100 },
        { id: 'Halt', label: '5 Halt', x: 590, y: 100, isFinal: true },
        { id: '4', label: '4 (Loop)', x: 80, y: 220 }
      ],
      transitions: [
        { from: 'Start', to: '2', label: '(a, A, R)' },
        { from: 'Start', to: '4', label: '(b, b, R)' },
        { from: '2', to: '2', label: '(b, B, R), (Δ, Δ, R)', loopDirection: 'top' },
        { from: '2', to: '3', label: '(a, X, R)' },
        { from: '3', to: '3', label: '(a, A, R), (b, B, R)', loopDirection: 'top' },
        { from: '3', to: 'Halt', label: '(Δ, A, R)' },
        { from: '4', to: '4', label: '(a,a,R),(b,b,R),(Δ,Δ,R)', loopDirection: 'bottom' }
      ]
    },
    simpleExplanation: `Look at the paths through the machine:
1. If the word starts with 'b', it goes to State 4 and loops on EVERYTHING forever! So any word starting with 'b' loops!
2. To reach HALT: Must start with 'a' (goes to State 2), then eventually read another 'a' (goes to State 3), then hit Δ (the end of the word) and HALT!
Shortest word: 'a' followed immediately by 'a' -> 'aa'!`,
    stepByStep: [
      "1. Path from Start: Start -> 2 on (a, A, R). So word MUST begin with 'a'.",
      "2. In State 2: It can read 'b' (rewrites to B, moves R) or Δ (rewrites to Δ, moves R). To advance to State 3, it must read 'a' on (a, X, R).",
      "3. In State 3: Can read 'a' or 'b'. To reach HALT (State 5), it reads (Δ, A, R) at the end of the word.",
      "4. (a) Shortest word: Path Start -> 2 -> 3 -> Halt requires reading 'a', then 'a', then Δ. Shortest word is 'aa'.",
      "5. (b) accept(T): Words starting with 'a', containing at least two 'a's, with any number of 'b's in between or after.",
      "6. (c) reject(T): Words that crash (no transition). Empty word crashes at Start. Words with only one 'a' that encounter something unexpected.",
      "7. (d) loop(T): Words starting with 'b' go to State 4, which has self-loops for 'a', 'b', and 'Δ'. It never halts, looping forever."
    ],
    answer: `a. Shortest word accepted:
  aa

b. accept(T):
  All words that start with 'a' and contain at least two 'a's (i.e. of the form a (b)* a (a + b)*).

c. reject(T):
  The empty word Λ (crashes in Start state), and any word that crashes with no defined transition.

d. loop(T):
  All words starting with the letter 'b' (enters state 4 which loops infinitely on a, b, and Δ).`
  },

  {
    id: 'Q-2024-7',
    codeId: 'W21',
    typeId: 'type-7-tm-trace',
    year: 2024,
    session: 'Oct/Nov',
    questionNumber: 'Question 5',
    marks: 6,
    verbatimQuestion: `Consider the Turing Machine (TM) T (over the input alphabet ∑ = {a; b}) given below.
a) What is the shortest word that would be accepted by T? (1 mark)
b) What is accept(T)? (2 marks)
c) What is reject(T)? (2 marks)
d) What is loop(T)? (1 mark)`,
    questionDiagram: {
      type: 'tm',
      title: 'Turing Machine T Given in Question (2024 Oct/Nov Q5)',
      isQuestionDiagram: true,
      states: [
        { id: 'Start', label: 'Start', x: 80, y: 100, isStart: true },
        { id: '2', label: '2', x: 230, y: 100 },
        { id: '3', label: '3', x: 380, y: 100 },
        { id: 'Halt', label: '4 Halt', x: 530, y: 100, isFinal: true },
        { id: '1', label: '1 (Loop)', x: 80, y: 220 }
      ],
      transitions: [
        { from: 'Start', to: '2', label: '(b, B, R)' },
        { from: 'Start', to: '1', label: '(a, a, R)' },
        { from: '2', to: '2', label: '(b, B, R)', loopDirection: 'top' },
        { from: '2', to: '3', label: '(a, X, R)' },
        { from: '3', to: '3', label: '(b, Y, R)', loopDirection: 'top' },
        { from: '3', to: 'Halt', label: '(Δ, Δ, L)' },
        { from: '1', to: '1', label: '(a,a,R),(b,b,R),(Δ,Δ,R)', loopDirection: 'bottom' }
      ]
    },
    simpleExplanation: `Trace path to HALT:
Must read 'b', then 'a', then 'b' -> 'bab'!
If word starts with 'a', it immediately enters a loop state and never stops!`,
    stepByStep: [
      "1. Path to Halt requires reading 'b' in state 1, 'a' in state 2, 'b' in state 3, then Δ in state 4.",
      "2. Shortest word is 'bab'.",
      "3. accept(T): Words starting with 'b', having 'a', then one or more 'b's: b b* a b+.",
      "4. loop(T): All words starting with 'a' (enters state with self-loops).",
      "5. reject(T): Words starting with 'b' that don't match the accept path (e.g., words with even number of a's or crashing on unexpected symbols)."
    ],
    answer: `a) Shortest word accepted:
  bab

b) accept(T):
  bb* a b+

c) reject(T):
  All words starting with 'b' that do not match the accept pattern (e.g. 'b', 'ba', 'bba').

d) loop(T):
  All words starting with 'a'.`
  },

  // ==========================================
  // TYPE 8: Building a Turing Machine
  // ==========================================
  {
    id: 'Q-2026-JAN-8',
    codeId: 'W22',
    typeId: 'type-8-tm-build',
    year: 2026,
    session: 'Jan/Feb',
    questionNumber: 'Question 6',
    marks: 10,
    verbatimQuestion: `Build a Turing Machine (TM) that
• accepts all words in {b^n aa (ba)^(n-1) | n > 1},
• loops forever on all words starting with a, and
• rejects all other words.
Assume that the alphabet is Σ = {a, b}.`,
    simpleExplanation: `What the machine must do:
1. Rule 1: If input starts with 'a', spin forever! (Loop state).
2. Rule 2: If input starts with 'b', count the initial b's and match them against the trailing (ba) pairs!
How to match on a tape:
- Cross off one 'b' on the left (turn it into B).
- Walk all the way right past 'aa' to the (ba) section.
- Cross off one (ba) pair (turn into BA).
- Rewind all the way left.
- Repeat until all n b's match all n-1 (ba) pairs (plus the base 'aa' marker).
- Halt!`,
    stepByStep: [
      "1. State 1 (Start):",
      "   - On 'a' -> go to State 9 (Loop trap): self-loops on (a, a, R), (b, b, R), (Δ, Δ, R).",
      "   - On 'b' -> replace with B, move R: (b, B, R) -> State 2.",
      "2. State 2: Scan past remaining b's (b, b, R) until seeing 'a' (the 'aa' separator).",
      "3. State 3 & 4: Verify the 'aa' bridge. Cross into the (ba) section.",
      "4. State 5: Find the last (ba) pair, mark it (change 'b' to B, 'a' to A), and head Left.",
      "5. State 6: Rewind left past everything on (a, a, L), (b, b, L) until hitting the left marker B.",
      "6. Step right to the next unmarked 'b'. Repeat the cycle.",
      "7. When all b's are matched with (ba) pairs and only blanks remain at the end, transition to HALT!"
    ],
    answer: `Turing Machine Design:
1. High-Level Pseudocode:
   - Check first character: if 'a', enter infinite loop state.
   - If 'b', mark first 'b' as 'B'.
   - Scan right across 'b's to find the 'aa' marker.
   - Cross 'aa' into the (ba) block. Find the first unmarked 'ba' pair, mark it as 'BA'.
   - Rewind tape head left until 'B' is found, move right one cell.
   - If another 'b' is found, repeat the matching cycle.
   - When no more 'b's remain on the left, verify all (ba) pairs on the right were marked.
   - If clean, transition to HALT.

2. State Transitions:
   - (Start, a) -> (Loop, a, R)
   - (Start, b) -> (State 2, B, R)
   - (State 2, b) -> (State 2, b, R)
   - (State 2, a) -> (State 3, a, R)
   - (State 3, a) -> (State 4, a, R)
   - (State 4, b) -> (State 5, B, R)
   - (State 5, a) -> (State 6, A, L)
   - (State 6, any) -> rewind left to B, then loop to State 2
   - (State 2, Δ) -> HALT`,
    notes: [
      "The loop requirement on words starting with 'a' is satisfied by a dedicated self-looping state at the start.",
      "Any invalid sequence crashes (rejects) because no transition is defined."
    ]
  },

  {
    id: 'Q-2024-8',
    codeId: 'W23',
    typeId: 'type-8-tm-build',
    year: 2024,
    session: 'Oct/Nov',
    questionNumber: 'Question 6',
    marks: 14,
    verbatimQuestion: `Build a Turing Machine (TM) that
• accepts all words in {(b)^(n+2) a^n | n ≥ 1},
• loops forever on all words starting with a, and
• rejects all other words.
Assume that the alphabet is ∑ = {a; b}.`,
    simpleExplanation: `Notice:
- There are n+2 'b's at the start.
- Then n 'a's at the end.
- That means there are exactly TWO MORE 'b's than 'a's!
Strategy:
1. If it starts with 'a', loop forever!
2. Read the first 'b', cross it out. Read the second 'b', cross it out. (These are the 2 extra b's!).
3. Now for every remaining 'b', cross out one 'b' and cross out one 'a'!
4. When all 'a's are gone and no extra letters remain, HALT!`,
    stepByStep: [
      "1. Start state: On 'a' -> go to State 8 (infinite loop on a, b, Δ).",
      "2. On 'b' -> change to B, move R. Go to State 1.",
      "3. State 1: Read second 'b' -> change to B, move R. Go to State 2. (The two extra b's are now marked!).",
      "4. State 2: For each subsequent 'b', change to B, move R to the end to find a matching 'a'.",
      "5. Change the matching 'a' to A, move Left all the way back to the marked B's.",
      "6. Repeat until no unmarked 'b's and no unmarked 'a's remain.",
      "7. Verify end of tape is blank (Δ), move to HALT."
    ],
    answer: `Turing Machine Specification:
- Start:
  (a, a, R) -> State 8 (Loop state: (a,a,R), (b,b,R), (Δ,Δ,R))
  (b, B, R) -> State 1
- State 1 (Consume second extra b):
  (b, B, R) -> State 2
- State 2 (Main loop - mark b):
  (b, B, R) -> State 3 (scan right to match a)
  (A, A, R) -> State 6 (no more b's, verify only A's remain)
- State 3 (Scan right to find 'a'):
  (b, b, R) -> State 3
  (A, A, R) -> State 3
  (a, A, L) -> State 4 (found 'a', mark as A, rewind left)
- State 4 (Rewind left):
  (A, A, L) -> State 4
  (b, b, L) -> State 4
  (B, B, R) -> State 2 (return to next b)
- State 6 (Verify):
  (A, A, R) -> State 6
  (Δ, Δ, R) -> HALT`,
    answerDiagram: {
      type: 'tm',
      title: 'Turing Machine for { b^(n+2) a^n } (2024 Q6)',
      isAnswerDiagram: true,
      states: [
        { id: 'Start', label: 'Start', x: 70, y: 100, isStart: true },
        { id: '1', label: '1', x: 200, y: 100 },
        { id: '2', label: '2', x: 340, y: 100 },
        { id: '3', label: '3', x: 480, y: 100 },
        { id: '4', label: '4', x: 410, y: 220 },
        { id: 'Halt', label: 'Halt', x: 620, y: 100, isFinal: true },
        { id: '8', label: 'Loop (8)', x: 70, y: 220 }
      ],
      transitions: [
        { from: 'Start', to: '8', label: '(a, a, R)' },
        { from: 'Start', to: '1', label: '(b, B, R)' },
        { from: '1', to: '1', label: '(b, B, R)', loopDirection: 'top' },
        { from: '1', to: '2', label: '(b, B, R)' },
        { from: '2', to: '3', label: '(b, B, R)' },
        { from: '3', to: '3', label: '(b,b,R),(a,a,R)', loopDirection: 'top' },
        { from: '3', to: '4', label: '(a, A, L)' },
        { from: '4', to: '4', label: '(a,a,L),(b,b,L)', loopDirection: 'bottom' },
        { from: '4', to: '2', label: '(B, B, R)' },
        { from: '3', to: 'Halt', label: '(Δ, Δ, R)' },
        { from: '8', to: '8', label: '(a,a,R),(b,b,R)', loopDirection: 'bottom' }
      ]
    }
  },

  // ==========================================
  // TYPE 9: 2-Stack Pushdown Automata (2PDA)
  // ==========================================
  {
    id: 'Q-2025-JAN-9',
    typeId: 'type-9-2pda',
    year: 2025,
    session: 'Jan/Feb',
    questionNumber: 'Question 6',
    marks: 12,
    verbatimQuestion: `Consider the 2PDA given below.
[Diagram showing Start -> Read -> on b to Read (loops with Push 1 X on a) -> on c to Pop 2 Y -> Read -> Pop 2 Y -> Pop 1 X -> Accept]
a) Which language is accepted by the 2PDA above? (2 marks)
b) Justify your answer by giving step by step trace of how the 2PDA can accept the language. (10 marks)`,
    simpleExplanation: `A 2PDA has TWO separate stacks: Stack 1 and Stack 2!
In this machine:
1. It reads 'a's and pushes X onto Stack 1.
2. When 'b' arrives, it reads 'b's and pushes Y onto Stack 2.
3. When 'c' arrives, it pops Stack 2 for each 'c', then pops Stack 1!
Because it matches the count of 'a's, 'b's, and 'c's:
The language is L = {a^n b^m c^m a^n} or {a^n b^n c^n}!`,
    stepByStep: [
      "1. Trace the input path from START:",
      "   - Reads initial 'a's -> PUSH 1 X (each 'a' puts an X on Stack 1).",
      "   - On 'b', switches to reading 'b's -> PUSH 2 Y (each 'b' puts a Y on Stack 2).",
      "   - On 'c', enters loop: reads 'c', POP 2 Y (each 'c' consumes a Y from Stack 2).",
      "   - When 'c's finish, Stack 2 must pop Δ (verifying equal number of b's and c's).",
      "   - Next, it reads the trailing 'a's, popping X from Stack 1.",
      "   - When tape is empty (Δ), POP 1 Δ -> ACCEPT.",
      "2. This proves the count of 'b's equals count of 'c's, and count of leading 'a's equals count of trailing 'a's.",
      "3. Accepted Language: L = {a^n b^m c^m a^n | n >= 1, m >= 1}."
    ],
    answer: `a) Accepted Language:
  L = {a^n b^m c^m a^n | n ≥ 1, m ≥ 1}  (or {a^n b^n c^n} depending on diagram loop constraints)

b) Step-by-Step Justification & Trace:
1. Pushing Phase 1: The machine reads 'n' leading 'a' symbols. For each 'a', it executes PUSH 1 X. Stack 1 now holds n 'X' symbols.
2. Pushing Phase 2: Upon reading the first 'b', it enters the second loop. For each of the 'm' 'b' symbols read, it executes PUSH 2 Y. Stack 2 now holds m 'Y' symbols.
3. Popping Phase 1: Upon reading 'c', the machine enters a matching loop. For each 'c', it executes POP 2. It successfully pops 'Y' exactly 'm' times. If there are more or fewer 'c's than 'Y's, the machine crashes. A final POP 2 yields Δ, confirming all 'b's match 'c's.
4. Popping Phase 2: The machine reads the final 'a's, executing POP 1. It successfully pops 'X' exactly 'n' times.
5. Final Verification: When tape reads Δ, it executes POP 1 Δ, confirming Stack 1 is empty, and proceeds to ACCEPT.
6. Therefore, a string is accepted if and only if it has the exact structure a^n b^m c^m a^n with equal counts.`,
    notes: [
      "Remember: A 1-stack PDA cannot accept a^n b^n c^n, but a 2PDA can because two stacks can compare 3 independent groups!"
    ]
  },

  {
    id: 'Q-2018-MJ-9',
    typeId: 'type-9-2pda',
    year: 2018,
    session: 'May/June',
    questionNumber: 'Question 8',
    marks: 11,
    verbatimQuestion: `Consider the partially complete 2PDA given below. This 2PDA, when complete, should recognise the language L as defined below:
  L = {(a)^(n+1) bb (a)^n bb (a)^n | n ≥ 0} (Assume that the alphabet is ∑ = {a, b})
(a) What is the purpose of the section of the 2PDA illustrated in box A? Explain in detail how this purpose is achieved. (3 marks)
(b) What is the purpose of the section of the 2PDA illustrated in box B? Explain clearly what is being done here and how it affects or is affected by the overall design of the 2PDA. (4 marks)
(c) Complete the 2PDA by showing what should be included in Box C of the diagram shown above. (4 marks)`,
    simpleExplanation: `Box A is the shortcut for n = 0!
When n = 0, the word is: a^(0+1) bb a^0 bb a^0 = a bb bb = "abbbb".
Box A just reads "a", then "b", "b", "b", "b", makes sure both stacks are empty, and ACCEPTS!
Box B is for n >= 1: It counts the first group of 'a's onto Stack 1, and transfers them to Stack 2 during the second group!
Box C finishes the job: It matches the third group of 'a's by popping Stack 2, and then accepts!`,
    stepByStep: [
      "1. Part (a) Box A: Purpose is to recognize and accept the base case word when n = 0. For n=0, the word is 'abbbb'. Box A reads 'a', then four 'b's, pops Δ from Stack 1, pops Δ from Stack 2, and goes to ACCEPT.",
      "2. Part (b) Box B: Purpose is the stack counting and transfer loop for n >= 1. It pushes X onto Stack 1 for the first group of a's (n+1 a's). Then on the second group of a's, it pops X from Stack 1 and pushes Y onto Stack 2. This transfers the count n to Stack 2.",
      "3. Part (c) Box C: What should be in Box C? It must read the final n 'a's and match them against Stack 2! So Box C contains a READ diamond that reads 'a', goes to POP 2 (pops 'Y'), loops back to READ. When Δ is read, it verifies Stack 2 is empty (POP 2 Δ), verifies Stack 1 is empty (POP 1 Δ), and connects to ACCEPT!"
    ],
    answer: `(a) Purpose of Box A:
Box A handles the base-case word when n = 0, which is w = a^(0+1) bb a^0 bb a^0 = abbbb.
It reads the single initial 'a', then four consecutive 'b' symbols without pushing anything onto the stacks. It then verifies that both Stack 1 and Stack 2 are empty by popping Δ from each, before transitioning directly to ACCEPT.

(b) Purpose of Box B:
Box B handles the counting and transfer loop for n ≥ 1.
1. It reads the initial (n+1) 'a's and executes PUSH 1 X for each, placing (n+1) X's on Stack 1.
2. After the first 'bb' delimiter is read, it reads the second clump of 'a's. For each 'a' in this clump, it executes POP 1 X and PUSH 2 Y. This verifies that the second clump has length n (leaving exactly one X on Stack 1 from the n+1 offset) and loads n Y's onto Stack 2.

(c) Completion of Box C:
Box C contains:
1. READ diamond:
   - on 'a' -> POP 2 Y -> loops back to READ.
   - on 'Δ' -> POP 1 X (pops the leftover X from the initial n+1 a's).
2. From POP 1 X:
   - on 'X' -> POP 2 Δ (checks Stack 2 is completely empty).
3. From POP 2 Δ:
   - on 'Δ' -> Connect to the existing ACCEPT state.`
  },

  // ==========================================
  // TYPE 10: Turing Machine Encodings & CWL
  // ==========================================
  {
    id: 'Q-2024-10',
    typeId: 'type-10-tm-encoding-cwl',
    year: 2024,
    session: 'Oct/Nov',
    questionNumber: 'Question 8',
    marks: 4,
    verbatimQuestion: `Draw a summary table for the TM below:
[Diagram:
 State 1 (Start): on (a, a, R) -> State 2; on (b, b, R) -> State 3
 State 2: on (b, b, R) -> State 2; on (Δ, Δ, L) -> State 4 (Halt)
 State 3: on (a, a, R) -> State 3; on (Δ, Δ, L) -> State 4 (Halt)]`,
    simpleExplanation: `A summary table is simply a neat 5-column chart that lists every arrow in the picture:
Columns: FROM | TO | READ | WRITE | MOVE
Count the arrows: There are exactly 6 arrows!
So write 6 neat rows.`,
    stepByStep: [
      "1. Find every transition arrow in the diagram:",
      "   - From State 1 to State 2 on (a, a, R)",
      "   - From State 1 to State 3 on (b, b, R)",
      "   - From State 2 to State 2 on (b, b, R) [self-loop]",
      "   - From State 2 to State 4 on (Δ, Δ, L) [goes to Halt]",
      "   - From State 3 to State 3 on (a, a, R) [self-loop]",
      "   - From State 3 to State 4 on (Δ, Δ, L) [goes to Halt]",
      "2. Write them in the standard 5-column table."
    ],
    answer: `Summary Table:
+------+----+------+-------+------+
| FROM | TO | READ | WRITE | MOVE |
+------+----+------+-------+------+
|  1   | 2  |  a   |   a   |  R   |
|  1   | 3  |  b   |   b   |  R   |
|  2   | 2  |  b   |   b   |  R   |
|  2   | 4  |  Δ   |   Δ   |  L   |
|  3   | 3  |  a   |   a   |  R   |
|  3   | 4  |  Δ   |   Δ   |  L   |
+------+----+------+-------+------+`,
    notes: [
      "State 4 is the HALT state.",
      "In CWL, each row would be encoded using 'a' counts separated by 'b's."
    ]
  },

  {
    id: 'Q-2019-MJ-10',
    typeId: 'type-10-tm-encoding-cwl',
    year: 2019,
    session: 'May/June',
    questionNumber: 'Question 9',
    marks: 9,
    verbatimQuestion: `Consider the Turing Machine T given below:
[Diagram:
 State 1 (Start): on (b, b, R) -> State 2; on (a, a, R) -> State 3
 State 2: on (a, a, R) -> State 2; on (Δ, T, L) -> State 5 (Halt)
 State 3: on (a, a, R) -> State 2
 State 4: loops on (a,a,R), (b,b,R), (Δ,Δ,R)]

(a) Convert T into a summary table. (3 marks)
(b) Convert T into CWL (code word language). (3 marks)
(c) Which language is accepted by T? (1 mark)
(d) Does the code word of T belong to ALAN? (Justify your answer) (2 marks)`,
    simpleExplanation: `Summary table = list of arrows.
CWL = Turn the table into a long string of 'a's and 'b's using Cohen's code.
ALAN = The club of all machines that DO NOT accept their own code word!
Does machine T accept this long code word?
No! Machine T only accepts short simple words ending in certain letters.
Because machine T DOES NOT accept its own code word, its code word BELONGS to ALAN!`,
    stepByStep: [
      "1. Part (a): List every transition into 5 columns: FROM, TO, READ, WRITE, MOVE.",
      "2. Part (b): Convert each row to Cohen's CWL code:",
      "   - State numbers become unary 'a's: 1 -> a, 2 -> aa, 3 -> aaa, 4 -> aaaa, 5 -> aaaaa.",
      "   - Letters: a -> aa, b -> ab, Δ -> ba, T -> bb.",
      "   - Moves: L -> a, R -> b.",
      "   - Each row is: (From) b (To) b (Read) b (Write) b (Move) b.",
      "   - Rows are separated by 'b' or 'bb'.",
      "3. Part (c): What words reach Halt? Words starting with 'b' or 'aa' followed by a's: (b + aa)a*.",
      "4. Part (d): ALAN is defined as {CWL of T | T rejects or loops on CWL(T)}.",
      "   Machine T only accepts words starting with 'b' or 'aa' and containing no 'b's afterwards.",
      "   CWL is full of multiple 'b' separators, so T definitely rejects it.",
      "   Since T does NOT accept its code word, the code word DOES belong to ALAN!"
    ],
    answer: `(a) Summary Table:
+------+----+------+-------+------+
| FROM | TO | READ | WRITE | MOVE |
+------+----+------+-------+------+
|  1   | 2  |  b   |   b   |  R   |
|  1   | 3  |  a   |   a   |  R   |
|  2   | 2  |  a   |   a   |  R   |
|  2   | 5  |  Δ   |   T   |  L   |
|  3   | 2  |  a   |   a   |  R   |
+------+----+------+-------+------+

(b) CWL (Code Word Language):
Using Cohen's standard encoding:
- States: 1=a, 2=aa, 3=aaa, 5=aaaaa
- Alphabet: a=aa, b=ab, Δ=ba, T=bb
- Directions: L=a, R=b
Row 1: a b aa b ab b ab b b
Row 2: a b aaa b aa b aa b b
Row 3: aa b aa b aa b aa b b
Row 4: aa b aaaaa b ba b bb b a
Row 5: aaa b aa b aa b aa b b
Concatenated CWL:
abaa bab bab bb bb a baaa baa baa bb bb aabaa baa baa bb bb aabaaaaa bba bbb ba bb aaabaa baa baa bb

(c) Accepted Language:
  All words in (b + aa)a*

(d) Does CWL(T) belong to ALAN?
  YES.
  ALAN is defined as the set of all code words of Turing Machines that are NOT accepted by the machines they describe (i.e., ALAN = {code_word(T) | code_word(T) ∉ accept(T)}).
  The machine T accepts only words in (b + aa)a*.
  The code word CWL(T) contains multiple interleaved 'b's and does not belong to (b + aa)a*.
  Therefore, T rejects CWL(T).
  Since T does not accept its own code word, CWL(T) belongs to ALAN.`
  },

  // ==========================================
  // TYPE 11: Computability & Chomsky Hierarchy
  // ==========================================
  {
    id: 'Q-2024-11',
    typeId: 'type-11-computability',
    year: 2024,
    session: 'Oct/Nov',
    questionNumber: 'Question 9',
    marks: 6,
    verbatimQuestion: `Question 9
(a) What does it mean for a language to be recursively enumerable? (2 marks)
(b) What does it mean for a language to be recursive? (2 marks)
(c) What is the Church-Turing thesis? (2 marks)`,
    simpleExplanation: `1. Recursively Enumerable: A Turing Machine can say "YES!" (halts) when a word is in the language. But if the word is NOT in the language, the machine might crash OR it might just run around in circles forever (loop).
2. Recursive (Decidable): A Turing Machine ALWAYS gives an answer and never gets stuck in a loop! It halts saying YES if in the language, and halts saying NO if not in the language.
3. Church-Turing Thesis: Any algorithm that a human mathematician or a supercomputer could ever follow can be done by a simple Turing Machine.`,
    stepByStep: [
      "1. Recursively Enumerable: Define in terms of TM acceptance. Language L is recursively enumerable if there exists a TM T such that accept(T) = L. For words not in L, T either crashes (rejects) or loops forever.",
      "2. Recursive (Decidable): Language L is recursive if there exists a TM T that halts on ALL inputs: accepts every word in L and rejects every word not in L (no infinite loops).",
      "3. Church-Turing Thesis: State the equivalence: 'Every effectively calculable function or intuitive algorithmic process can be computed by a Turing Machine.'"
    ],
    answer: `(a) Recursively Enumerable Language:
A language L is recursively enumerable if there is a Turing Machine T that halts and accepts every word in L, and either rejects or loops forever on every word not in L (i.e. accept(T) = L).

(b) Recursive Language:
A language L is recursive (or decidable) if there is a Turing Machine T that halts on every input word: it accepts every word in L and explicitly rejects every word not in L (it never loops forever).

(c) Church-Turing Thesis:
The Church-Turing Thesis asserts that any algorithmic process or effectively calculable procedure that can be carried out by a human mathematician or physical computing device can be simulated and computed by a Turing Machine.`
  },

  {
    id: 'Q-2018-MJ-11',
    typeId: 'type-11-computability',
    year: 2018,
    session: 'May/June',
    questionNumber: 'Question 10',
    marks: 5,
    verbatimQuestion: `Question 10: Chomsky Hierarchy and Computability
(a) The grammars in the Chomsky Hierarchy all have restrictions on their productions X -> Y. What are the production restrictions on Type 3 grammars? (3 marks)
  X =
  Y =
  or
  Y =
(b) What is difference between a TM as a transducer and a TM as an acceptor? (2 marks)`,
    simpleExplanation: `Chomsky Type 3 grammars are Regular Grammars:
- The left side X must be a SINGLE nonterminal (one capital letter).
- The right side Y must be EITHER a single terminal followed by a nonterminal (like 'aB') OR just a terminal ('a') or null (Λ).
Transducer vs Acceptor:
- An Acceptor only says "YES" (Accept) or "NO" (Reject).
- A Transducer actually CALCULATES and leaves a printed answer on the tape (like 3 + 2 = 5)!`,
    stepByStep: [
      "1. Type 3 grammar restrictions:",
      "   X = A single nonterminal variable (e.g. A ∈ V_N).",
      "   Y = A single terminal followed by a single nonterminal (w B where w ∈ Σ, B ∈ V_N), or a single terminal (w), or Λ.",
      "2. TM Acceptor vs Transducer:",
      "   - Acceptor: Answers a decision problem (membership in language) by halting in HALT (accept) or crashing/looping (reject). The tape contents upon halting do not matter.",
      "   - Transducer: Computes a function f(x). It takes an input on the tape, performs calculations, and upon halting leaves the output value f(x) written on the tape."
    ],
    answer: `(a) Production restrictions on Type 3 (Regular) Grammars:
  X = A single nonterminal (e.g., A)
  Y = A single terminal followed by a single nonterminal (e.g., aB)
  or
  Y = A single terminal or Λ (e.g., a or Λ)
  (Right-linear form: A -> wB or A -> w)

(b) Difference between TM Transducer and TM Acceptor:
  - An Acceptor determines language membership: it halts to accept a word, or crashes/loops to reject. Its output is merely a binary decision (Yes/No).
  - A Transducer acts as a computer of functions: it transforms an input string x into an output string y = f(x) printed on the tape when the machine halts.`
  },

  {
    id: 'Q-2019-MJ-11',
    typeId: 'type-11-computability',
    year: 2019,
    session: 'May/June',
    questionNumber: 'Question 10',
    marks: 5,
    verbatimQuestion: `Question 10: Computability
Prove that the SUCCESSOR function given below is computable:
  SUCCESSOR(n) = n + 1, ∀n ≥ 0
Use unary encoding. For example, input aaa should yield output aaaa.`,
    simpleExplanation: `Unary encoding means numbers are counted in stick marks 'a':
0 = empty tape (Δ)
1 = 'a'
2 = 'aa'
3 = 'aaa'
The Successor function adds 1.
So if input is 'aaa' (3), we just walk to the end of the tape, write ONE more 'a', and HALT! Output is 'aaaa' (4)!`,
    stepByStep: [
      "1. Unary representation: A number n is represented by n consecutive 'a's on the tape followed by blanks (Δ).",
      "2. Objective: When machine starts at cell 1 reading the first 'a' (or Δ if n=0), it must halt with n + 1 'a's on the tape.",
      "3. State 1 (Start):",
      "   - On 'a', scan right on (a, a, R) until the end of the input is reached.",
      "   - When Δ is reached, replace Δ with 'a', move R: (Δ, a, R) -> HALT!",
      "   - If input is empty (n=0, starts on Δ): on (Δ, a, R) -> HALT!",
      "4. Since the machine halts with exactly n + 1 'a's on the tape, SUCCESSOR(n) is Turing-computable."
    ],
    answer: `Proof that SUCCESSOR(n) = n + 1 is computable:
Unary convention: The nonnegative integer n is represented by the string a^n.
Turing Machine Design:
- Start State 1:
  - on (a, a, R) -> loop in State 1 (scans across all n 'a's)
  - on (Δ, a, R) -> State 2 (Halt)

Trace on example input n = 3 ('aaa'):
1. Tape: [a] a  a  Δ ...  Head in State 1 reads 'a', writes 'a', moves R.
2. Tape:  a [a] a  Δ ...  Head in State 1 reads 'a', writes 'a', moves R.
3. Tape:  a  a [a] Δ ...  Head in State 1 reads 'a', writes 'a', moves R.
4. Tape:  a  a  a [Δ] ... Head in State 1 reads 'Δ', writes 'a', moves R -> HALT!
5. Final tape: a a a a (unary 4).
The machine halts with n + 1 'a's for all n ≥ 0. Hence SUCCESSOR is Turing-computable.`,
    diagram: {
      type: 'tm',
      title: 'Turing Machine for SUCCESSOR(n) = n + 1',
      states: [
        { id: '1', label: '1 Start', x: 120, y: 100, isStart: true },
        { id: 'Halt', label: '2 Halt', x: 380, y: 100, isFinal: true }
      ],
      transitions: [
        { from: '1', to: '1', label: '(a, a, R)', loopDirection: 'top' },
        { from: '1', to: 'Halt', label: '(Δ, a, R)' }
      ]
    }
  },

  // ==========================================
  // ADDITIONAL 2018, 2019 & 2021 PAST PAPER QUESTIONS
  // ==========================================
  {
    id: 'Q-2018-ON-1',
    typeId: 'type-1-re-dfa',
    year: 2018,
    session: 'Oct/Nov',
    questionNumber: 'Question 1(a), (b), (c)',
    marks: 10,
    verbatimQuestion: `Question 1
(a) Determine a regular expression for the language L over the alphabet {a, b} that ends with a letter that is different from the letter that it starts with.
For example, ab, ababab and aaaaabaaabbbbb are words in L but aaa, baabbaab, aaaaabaaaaa and abaa are not. (2 marks)

(b) Design a deterministic finite automaton (DFA) that will recognise all of the words in L as defined above. (4 marks)

(c) Use Theorem 21 to develop a context-free grammar (CFG) for the language L. (4 marks)`,
    simpleExplanation: `Two simple ways to make a valid word:
Way 1: If it starts with 'a', it MUST end with 'b'! Like a(a+b)*b.
Way 2: If it starts with 'b', it MUST end with 'a'! Like b(a+b)*a.
Combine them with a plus sign (OR):
a(a+b)*b + b(a+b)*a.
For the DFA, split into two branches right from the start: one branch tracks words starting with 'a', the other branch tracks words starting with 'b'.`,
    stepByStep: [
      "1. Regular Expression: Words starting with 'a' and ending with 'b' is a(a+b)*b. Words starting with 'b' and ending with 'a' is b(a+b)*a. Together: a(a+b)*b + b(a+b)*a.",
      "2. DFA Design:",
      "   - Start State S: Reads first letter. If 'a', go to Top Branch (State A). If 'b', go to Bottom Branch (State C).",
      "   - Top Branch (Starts with 'a'):",
      "     - State A: Currently ends in 'a' (NOT accepting). On 'a', loop in A. On 'b', go to +B (Accepting, because it ends in 'b'!).",
      "     - State +B: Currently ends in 'b' (Accepting!). On 'b', loop in +B. On 'a', go back to A.",
      "   - Bottom Branch (Starts with 'b'):",
      "     - State C: Currently ends in 'b' (NOT accepting). On 'b', loop in C. On 'a', go to +D (Accepting, because it ends in 'a'!).",
      "     - State +D: Currently ends in 'a' (Accepting!). On 'a', loop in +D. On 'b', go back to C.",
      "3. Theorem 21 CFG: S -> aA | bC; A -> aA | bB; B -> bB | aA | Λ; C -> bC | aD; D -> aD | bC | Λ."
    ],
    answer: `(a) Regular Expression:
  a(a + b)*b + b(a + b)*a

(b) DFA Specification:
States: {S (Start), A, +B (Accept), C, +D (Accept)}
Transitions:
  - S: on 'a' -> A; on 'b' -> C
  - A: on 'a' -> A; on 'b' -> +B
  - +B: on 'b' -> +B; on 'a' -> A
  - C: on 'b' -> C; on 'a' -> +D
  - +D: on 'a' -> +D; on 'b' -> C

(c) Context-Free Grammar (CFG) via Theorem 21:
  S -> aA | bC
  A -> aA | bB
  B -> bB | aA | Λ
  C -> bC | aD
  D -> aD | bC | Λ`,
    diagram: {
      type: 'dfa',
      title: 'DFA for words ending with a letter different from the start letter (2018 Oct/Nov Q1b)',
      states: [
        { id: 'S', label: 'S', x: 70, y: 120, isStart: true },
        { id: 'A', label: 'A', x: 230, y: 60 },
        { id: 'B', label: '+B', x: 420, y: 60, isFinal: true },
        { id: 'C', label: 'C', x: 230, y: 180 },
        { id: 'D', label: '+D', x: 420, y: 180, isFinal: true }
      ],
      transitions: [
        { from: 'S', to: 'A', label: 'a' },
        { from: 'S', to: 'C', label: 'b' },
        { from: 'A', to: 'A', label: 'a', loopDirection: 'top' },
        { from: 'A', to: 'B', label: 'b', curve: -15 },
        { from: 'B', to: 'A', label: 'a', curve: -15 },
        { from: 'B', to: 'B', label: 'b', loopDirection: 'top' },
        { from: 'C', to: 'C', label: 'b', loopDirection: 'bottom' },
        { from: 'C', to: 'D', label: 'a', curve: 15 },
        { from: 'D', to: 'C', label: 'b', curve: 15 },
        { from: 'D', to: 'D', label: 'a', loopDirection: 'bottom' }
      ]
    }
  },

  {
    id: 'Q-2018-ON-2',
    typeId: 'type-3-dpda',
    year: 2018,
    session: 'Oct/Nov',
    questionNumber: 'Question 2',
    marks: 10,
    verbatimQuestion: `Build a deterministic pushdown automata (DPDA) that accepts the language
  L = {(a)^n (b)^(n+1) (bb) | n ≥ 0}
over the alphabet Σ = {a, b}.`,
    simpleExplanation: `Look closely at the recipe for this word:
- You have n 'a's at the start.
- Then you have n+1 'b's in the middle.
- Then you have 2 more 'b's ('bb') at the very end!
Total number of 'b's is (n+1) + 2 = n + 3 'b's!
So there are always exactly THREE more 'b's than 'a's!
Example for n=0: word is a^0 b^1 bb = "bbb".
Example for n=1: word is a^1 b^2 bb = "abbbb".
Our stack will store an X for every 'a'. Then we pop an X for each matching 'b', and make sure three extra 'b's are read before accepting!`,
    stepByStep: [
      "1. START -> READ1.",
      "2. Loop in READ1 on 'a': for each 'a', execute PUSH X. Now stack has n 'X's.",
      "3. When first 'b' arrives: switch to reading b's.",
      "4. In the matching phase, for each 'b', POP X off the stack.",
      "5. When the stack pops Δ (all n 'a's have been matched with n 'b's), we still have 3 extra 'b's to consume: 1 from (n+1) and 2 from (bb)!",
      "6. Read 'b' (1st extra), read 'b' (2nd extra), read 'b' (3rd extra).",
      "7. Now read Δ from input tape, POP Δ from stack to verify it is clean, and go to ACCEPT!"
    ],
    answer: `DPDA Trace & Flow:
1. START -> READ1
2. READ1:
   - on 'a' -> PUSH X -> READ1 (pushes n 'X's)
   - on 'b' -> READ2 (first 'b' read)
3. READ2:
   - if n > 0, match remaining 'a's: POP1
4. POP1:
   - on 'X' -> READ3
   - on 'Δ' -> READ_EXTRA_1 (handled n=0 case)
5. READ3:
   - on 'b' -> POP1 (matches another 'b' with an 'X')
   - on 'Δ' -> Crash
6. When POP1 pops 'Δ' (all n X's consumed):
   - proceed to verify the three extra 'b's:
   - READ_EXTRA_1: on 'b' -> READ_EXTRA_2
   - READ_EXTRA_2: on 'b' -> READ_EXTRA_3
   - READ_EXTRA_3: on 'b' -> READ_END
7. READ_END:
   - on 'Δ' -> POP_EMPTY
8. POP_EMPTY:
   - pops 'Δ' -> ACCEPT`
  },

  {
    id: 'Q-2018-MJ-5',
    typeId: 'type-6-theorem-42',
    year: 2018,
    session: 'May/June',
    questionNumber: 'Question 5',
    marks: 6,
    verbatimQuestion: `Use the reformulated version of Theorem 42 to decide whether the grammar given below generates any words:
  S ⭢ AC
  A ⭢ CC
  B ⭢ CD | b
  C ⭢ DB
  D ⭢ a
Step -1: Is S nullable?
Step 0: Convert CFG to CNF
Is there a production of the form S -> t where t is a terminal?
Step 1:
Step 2:`,
    simpleExplanation: `Let's work through the 42 algorithm step by step:
Step -1: S is not nullable (no Λ).
Step 0: Already in CNF.
Direct terminal check: None for S.
Step 1: Who makes terminals directly? D makes 'a', and B makes 'b'! Mark D and B!
Step 2: C makes DB, and both D and B are marked! So mark C!
Then A makes CC, and C is marked! So mark A!
Then S makes AC, and both A and C are marked! Mark S!
S is marked, so YES it generates words!`,
    stepByStep: [
      "Step -1: Is S nullable? NO (there are no empty string productions).",
      "Step 0: Convert to CNF: The grammar is already in CNF (each rule is 2 nonterminals or 1 terminal).",
      "Check: Is there a production of the form S -> t? NO.",
      "Step 1: Mark all nonterminals that produce a terminal alone:",
      "  D -> a  ==> Mark D",
      "  B -> b  ==> Mark B",
      "  Marked set = { D, B }.",
      "Step 2: Substitute marked nonterminals into the remaining productions:",
      "  Iteration 1: C -> DB. Since both D and B are marked, mark C! Marked set = { D, B, C }.",
      "  Iteration 2: A -> CC. Since C is marked, mark A! Marked set = { D, B, C, A }.",
      "  Iteration 3: S -> AC. Since both A and C are marked, mark S! Marked set = { D, B, C, A, S }.",
      "Conclusion: Since S is marked, the grammar generates words (L != ∅)."
    ],
    answer: `Step -1: Is S nullable? NO
Step 0: The grammar is already in CNF.
Is there a production S -> t? NO.

Step 1:
  D -> a  (mark D)
  B -> b  (mark B)
  Marked set: { D, B }

Step 2:
  Round 1: C -> DB. Both D and B are marked, so mark C.
           Marked set: { D, B, C }
  Round 2: A -> CC. C is marked, so mark A.
           Marked set: { D, B, C, A }
  Round 3: S -> AC. Both A and C are marked, so mark S.
           Marked set: { D, B, C, A, S }

Conclusion:
Because the start symbol S is marked, the grammar generates words.
Sample derivation: S => AC => CC C => DB DB DB => ab ab ab = ababab.`
  },

  {
    id: 'Q-2018-MJ-7',
    typeId: 'type-8-tm-build',
    year: 2018,
    session: 'May/June',
    questionNumber: 'Question 7',
    marks: 12,
    verbatimQuestion: `Build a Turing Machine (TM) that
• accepts all words of the form b^n a^m | n > m, m ≥ 0,
• loops forever on all words starting with a, and
• rejects all other words.
Assume that the alphabet is Σ = {a, b}.`,
    simpleExplanation: `Rule 1: If input starts with 'a', loop forever!
Rule 2: Initial group is 'b's, second group is 'a's.
Rule 3: Count of 'b's must be STRICTLY GREATER than 'a's (n > m).
Even if m = 0, n must be at least 1 (e.g. 'b', 'bb', 'bbb' are all valid!).
Matching Strategy:
- Match each 'a' on the right with a 'b' on the left.
- When all 'a's are crossed off, there MUST still be at least ONE 'b' left over! If at least one 'b' remains, HALT!`,
    stepByStep: [
      "1. Start State: On 'a' -> go to State 9 (Infinite loop on a, b, Δ).",
      "2. On 'b': We have at least one 'b'! Move right across all b's until reaching 'a' (or Δ if m=0).",
      "3. If Δ is reached with no 'a's: Since n >= 1 and m = 0, n > m holds! HALT immediately.",
      "4. If 'a' is reached: Mark the 'a' as A, rewind left, and mark off one 'b' as B.",
      "5. Repeat matching 1 'a' to 1 'b'.",
      "6. When all 'a's have been marked: Check if at least one unmarked 'b' still remains on the tape. If yes, transition to HALT. If counts are equal (n = m), crash/reject!"
    ],
    answer: `Turing Machine Specification:
- Start (State 1):
  (a, a, R) -> State 9 (Loop state: (a,a,R), (b,b,R), (Δ,Δ,R))
  (b, b, R) -> State 2
- State 2 (Scan right to check if any 'a' exists):
  (b, b, R) -> State 2
  (Δ, Δ, L) -> State 8 (Halt! m=0 and n>=1)
  (a, A, L) -> State 3 (Found first 'a', mark as A and rewind to match a 'b')
- State 3 (Rewind left to find rightmost unmarked 'b'):
  (b, B, R) -> State 4 (Marked matching 'b', return right)
  (B, B, L) -> State 3
- State 4 (Scan right past remaining b's and marked A's):
  (b, b, R) -> State 4
  (A, A, R) -> State 4
  (a, A, L) -> State 3 (Found another 'a', repeat matching)
  (Δ, Δ, L) -> State 5 (All 'a's marked! Check if extra 'b' remains)
- State 5 (Verify at least one unmarked 'b' exists):
  (A, A, L) -> State 5
  (b, b, R) -> State 8 (Halt! Unmarked 'b' confirmed, so n > m)
  (B, B, R) -> Crash (n = m, reject!)`
  },

  {
    id: 'Q-2019-MJ-1',
    typeId: 'type-1-re-dfa',
    year: 2019,
    session: 'May/June',
    questionNumber: 'Question 1(a), (b), (c)',
    marks: 10,
    verbatimQuestion: `Question 1
(a) Determine a regular expression for the language L over the alphabet {a, b} that starts with an a and is a multiple of 3 in length.
For example, aba, ababab, aaaaaa and ababababaa are words in L but ab, aaab, aaaaabaaaaa, baa, and baabbaaba are not. (2 marks)

(b) Design a deterministic finite automaton (DFA) that will recognise all and only the words in L as defined above. (4 marks)

(c) Use Theorem 21 to develop a context-free grammar (CFG) for the language L. (4 marks)`,
    simpleExplanation: `Rule 1: First letter MUST be 'a'.
Rule 2: Total length must be a multiple of 3 (3, 6, 9, 12, 15...).
Because the first letter is already fixed to 'a', the next two letters can be ANYTHING: a(a+b)(a+b). This makes length 3!
Any further triplets can also be anything: [(a+b)(a+b)(a+b)]*.
Combined regex: a(a+b)(a+b) [ (a+b)(a+b)(a+b) ]*.
DFA is a 3-step modulo clock:
State 1 (start) -> State 2 (length 1) -> State 3 (length 2) -> State 4 (length 3, ACCEPT!).`,
    stepByStep: [
      "1. Regular Expression: First letter is 'a', followed by 2 arbitrary characters, followed by zero or more triplets. Formula: a(a+b)(a+b)((a+b)(a+b)(a+b))*.",
      "2. DFA Design:",
      "   - Start State S: on 'a' -> State 1 (length 1, valid start). On 'b' -> Trap (invalid start).",
      "   - State 1 (length 1 mod 3): on 'a, b' -> State 2 (length 2 mod 3).",
      "   - State 2 (length 2 mod 3): on 'a, b' -> State 3 (+ Accept, length 0 mod 3).",
      "   - State 3 (+ Accept): on 'a, b' -> State 1 (length 1 mod 3, restarting triplet).",
      "   - Trap: on 'a, b' -> Trap.",
      "3. Theorem 21 CFG: S -> aA | bTrap; A -> aB | bB; B -> aC | bC; C -> aA | bA | Λ."
    ],
    answer: `(a) Regular Expression:
  a(a + b)(a + b) [ (a + b)(a + b)(a + b) ]*

(b) DFA:
States: {S (Start), A (len 1), B (len 2), +C (Accept, len 3k), Trap}
Transitions:
  - S: on 'a' -> A; on 'b' -> Trap
  - A: on 'a, b' -> B
  - B: on 'a, b' -> +C
  - +C: on 'a, b' -> A
  - Trap: on 'a, b' -> Trap

(c) Context-Free Grammar (CFG) via Theorem 21:
  S -> aA
  A -> aB | bB
  B -> aC | bC
  C -> aA | bA | Λ`,
    diagram: {
      type: 'dfa',
      title: 'DFA for words starting with "a" with length multiple of 3 (2019 May/June Q1b)',
      states: [
        { id: 'S', label: 'S', x: 60, y: 120, isStart: true },
        { id: 'A', label: 'A (1)', x: 200, y: 120 },
        { id: 'B', label: 'B (2)', x: 360, y: 120 },
        { id: 'C', label: '+C (3)', x: 520, y: 120, isFinal: true },
        { id: 'Trap', label: 'Trap', x: 60, y: 220 }
      ],
      transitions: [
        { from: 'S', to: 'A', label: 'a' },
        { from: 'S', to: 'Trap', label: 'b' },
        { from: 'A', to: 'B', label: 'a, b' },
        { from: 'B', to: 'C', label: 'a, b' },
        { from: 'C', to: 'A', label: 'a, b', curve: -35 },
        { from: 'Trap', to: 'Trap', label: 'a, b', loopDirection: 'bottom' }
      ]
    }
  },

  {
    id: 'Q-2021-4',
    typeId: 'type-5-closure',
    year: 2021,
    session: 'Sep/Oct/Nov',
    questionNumber: 'Question 4',
    marks: 6,
    verbatimQuestion: `Given that:
  L1 = (aa + bb)* and
  L2 = b(a + b)*
1. Provide the Context free grammars generating L1 and L2 respectively. (2 marks)
2. Apply Theorem 36 to determine L1 + L2. (4 marks)`,
    simpleExplanation: `L1 is any word made of pairs of 'aa' or 'bb'.
L2 is any word starting with 'b'.
Theorem 36 is the rule for Union of two context-free languages:
1. Label CFG1 with subscript 1.
2. Label CFG2 with subscript 2.
3. Make a new start rule: S -> S1 | S2!`,
    stepByStep: [
      "1. CFG for L1 = (aa + bb)*:",
      "   S1 -> aaS1 | bbS1 | Λ",
      "2. CFG for L2 = b(a + b)*:",
      "   S2 -> bA2",
      "   A2 -> aA2 | bA2 | Λ",
      "3. Apply Theorem 36 (Closure under Union):",
      "   Create a new start symbol S and add the production:",
      "   S -> S1 | S2",
      "   Combine all productions together. Since subscripts are disjoint, the languages cannot interfere."
    ],
    answer: `1. Context-Free Grammars for L1 and L2:
CFG1 for L1:
  S1 -> aaS1 | bbS1 | Λ

CFG2 for L2:
  S2 -> bA2
  A2 -> aA2 | bA2 | Λ

2. Combined Grammar for L1 + L2 (Theorem 36):
  S -> S1 | S2
  S1 -> aaS1 | bbS1 | Λ
  S2 -> bA2
  A2 -> aA2 | bA2 | Λ`
  }
];

