/**
 * ANKANITOR GAME ENGINE
 * Core logic: confidence scoring, entropy-maximizing question selection,
 * progress calculation, and final guess triggering.
 */

class AkinatorEngine {
  constructor() {
    this.reset();
  }

  /**
   * Reset the game engine to initial state.
   */
  reset() {
    this.currentTurn = 0;
    this.certaintyProgress = 0;
    this.usedQuestionIndices = new Set();
    this.isFinalGuess = false;
    this.guessedStateName = null;

    // Initialize leaderboard: every state starts at 100
    this.leaderboard = ANKANITOR_KNOWLEDGE_BASE.map(state => ({
      stateName: state.name,
      confidenceScore: 100
    }));
  }

  /**
   * Get the current sorted leaderboard (highest score first).
   */
  getSortedLeaderboard() {
    return [...this.leaderboard].sort((a, b) => b.confidenceScore - a.confidenceScore);
  }

  /**
   * Get top N candidates from the leaderboard.
   */
  getTopCandidates(n = 5) {
    return this.getSortedLeaderboard().slice(0, n);
  }

  /**
   * Check if the state's attribute value matches the question's target.
   * For boolean attributes, matchValue is true/false.
   * For categorical attributes (like region), matchValue is a specific string.
   */
  doesAttributeMatch(stateData, question) {
    const attrValue = stateData[question.attribute];
    return attrValue === question.matchValue;
  }

  /**
   * Apply the confidence weight scoring logic based on user's answer.
   *
   * | User Input     | Matches State  | Conflicts State |
   * |----------------|----------------|-----------------|
   * | YES            | +25            | -30             |
   * | PROBABLY       | +15            | -10             |
   * | DONT_KNOW      |  0             |  0              |
   * | PROBABLY_NOT   | -10            | +15             |
   * | NO             | -30            | +25             |
   */
  processAnswer(questionIndex, userAnswer) {
    const question = QUESTION_BANK[questionIndex];
    this.currentTurn++;
    this.usedQuestionIndices.add(questionIndex);

    // Weight deltas based on answer
    const weights = {
      YES:          { match: +25, conflict: -30 },
      PROBABLY:     { match: +15, conflict: -10 },
      DONT_KNOW:    { match:   0, conflict:   0 },
      PROBABLY_NOT: { match: -10, conflict: +15 },
      NO:           { match: -30, conflict: +25 }
    };

    const w = weights[userAnswer];
    if (!w) {
      console.error("Invalid answer:", userAnswer);
      return;
    }

    // Update every state's confidence score
    for (let i = 0; i < this.leaderboard.length; i++) {
      const stateData = ANKANITOR_KNOWLEDGE_BASE[i];
      const matches = this.doesAttributeMatch(stateData, question);

      if (matches) {
        this.leaderboard[i].confidenceScore += w.match;
      } else {
        this.leaderboard[i].confidenceScore += w.conflict;
      }
    }

    // Recalculate progress
    this._updateCertaintyProgress();

    // Check if we should trigger the final guess
    this._checkFinalGuess();

    return this.getGameState();
  }

  /**
   * LEADERBOARD ANALYSIS & PROGRESS CALCULATION
   *
   * 1. Sort scorecard descending.
   * 2. Isolate #1 and #2 ranked regions.
   * 3. Calculate Delta = Score_Rank_1 - Score_Rank_2.
   * 4. Scale certaintyProgress using structural milestones:
   *    - Delta 0–20  → progress 5%–35%
   *    - Delta 21–50  → progress 36%–75%
   *    - Delta > 50   → progress 76%–95%
   */
  _updateCertaintyProgress() {
    const sorted = this.getSortedLeaderboard();
    if (sorted.length < 2) {
      this.certaintyProgress = 100;
      return;
    }

    const topScore = sorted[0].confidenceScore;
    const secondScore = sorted[1].confidenceScore;
    const delta = topScore - secondScore;

    if (delta <= 0) {
      // No separation yet — minimal progress, slight turn-based bump
      this.certaintyProgress = Math.max(5, Math.min(15, 5 + this.currentTurn));
    } else if (delta <= 20) {
      // Delta 0–20 → linearly map to 5%–35%
      this.certaintyProgress = Math.round(5 + (delta / 20) * 30);
    } else if (delta <= 50) {
      // Delta 21–50 → linearly map to 36%–75%
      this.certaintyProgress = Math.round(36 + ((delta - 21) / 29) * 39);
    } else {
      // Delta > 50 → linearly map to 76%–95%, capped at 95
      this.certaintyProgress = Math.min(95, Math.round(76 + ((delta - 51) / 50) * 19));
    }
  }

  /**
   * FINAL GUESS TRIGGER
   *
   * If Delta crosses 75 points, OR if currentTurn hits 15,
   * immediately toggle isFinalGuess: true and output the
   * name of the #1 ranked region as guessedStateName.
   */
  _checkFinalGuess() {
    const sorted = this.getSortedLeaderboard();
    const topScore = sorted[0].confidenceScore;
    const secondScore = sorted[1].confidenceScore;
    const delta = topScore - secondScore;

    if (delta >= 75 || this.currentTurn >= 15) {
      this.isFinalGuess = true;
      this.guessedStateName = sorted[0].stateName;
      // Lock progress at a confident value
      this.certaintyProgress = Math.max(this.certaintyProgress, 90);
    }
  }

  /**
   * NEXT ITERATION STRATEGY — ENTROPY-MAXIMIZING QUESTION SELECTION
   *
   * 1. Scan the top 5 highest-ranked states on the current leaderboard.
   * 2. For each unused question, identify whether its target attribute
   *    is a highly distinguishing column — one that the top 5 do NOT
   *    all share the same value for.
   * 3. Among distinguishing questions, pick the one that creates the
   *    most balanced (closest to 50/50) weighted split across ALL
   *    viable candidates — maximizing Shannon entropy.
   */
  pickNextQuestion() {
    const sorted = this.getSortedLeaderboard();
    const top5 = sorted.slice(0, 5);

    // Resolve top-5 state data objects
    const top5Data = top5.map(c =>
      ANKANITOR_KNOWLEDGE_BASE.find(s => s.name === c.stateName)
    );

    // Identify questions where top 5 do NOT all agree (distinguishing)
    const distinguishing = [];
    const nonDistinguishing = [];

    for (let qi = 0; qi < QUESTION_BANK.length; qi++) {
      if (this.usedQuestionIndices.has(qi)) continue;

      const question = QUESTION_BANK[qi];
      const matchResults = top5Data.map(s => this.doesAttributeMatch(s, question));
      const allSame = matchResults.every(v => v === matchResults[0]);

      if (allSame) {
        nonDistinguishing.push(qi);
      } else {
        distinguishing.push(qi);
      }
    }

    // Prefer distinguishing questions; fall back to non-distinguishing
    const candidatePool = distinguishing.length > 0 ? distinguishing : nonDistinguishing;

    // Use all viable states (top half by score) for entropy calculation
    const medianScore = sorted[Math.floor(sorted.length / 2)].confidenceScore;
    const viableStates = sorted.filter(s => s.confidenceScore >= medianScore);

    let bestQuestionIndex = -1;
    let bestEntropy = -1;

    for (const qi of candidatePool) {
      const question = QUESTION_BANK[qi];

      // Count weighted match vs conflict among viable states
      let matchWeight = 0;
      let conflictWeight = 0;

      for (const candidate of viableStates) {
        const stateData = ANKANITOR_KNOWLEDGE_BASE.find(s => s.name === candidate.stateName);
        const matches = this.doesAttributeMatch(stateData, question);
        const weight = Math.max(1, candidate.confidenceScore);

        if (matches) {
          matchWeight += weight;
        } else {
          conflictWeight += weight;
        }
      }

      const total = matchWeight + conflictWeight;
      if (total === 0) continue;

      // Shannon entropy: H = -p*log2(p) - (1-p)*log2(1-p)
      // Maximized when p = 0.5 (perfect 50/50 split)
      const p = matchWeight / total;
      let entropy = 0;
      if (p > 0 && p < 1) {
        entropy = -(p * Math.log2(p)) - ((1 - p) * Math.log2(1 - p));
      }

      if (entropy > bestEntropy) {
        bestEntropy = entropy;
        bestQuestionIndex = qi;
      }
    }

    // Absolute fallback: pick any unused question
    if (bestQuestionIndex === -1) {
      for (let qi = 0; qi < QUESTION_BANK.length; qi++) {
        if (!this.usedQuestionIndices.has(qi)) {
          bestQuestionIndex = qi;
          break;
        }
      }
    }

    return bestQuestionIndex;
  }

  /**
   * Get the full game state as the expected JSON output.
   */
  getGameState() {
    const nextQ = this.isFinalGuess ? null : this.pickNextQuestion();
    const questionText = nextQ !== null ? QUESTION_BANK[nextQ].text : null;

    return {
      currentTurn: this.currentTurn,
      certaintyProgress: this.certaintyProgress,
      questionText: questionText,
      questionIndex: nextQ,
      isFinalGuess: this.isFinalGuess,
      guessedStateName: this.guessedStateName,
      topCandidates: this.getTopCandidates(5)
    };
  }

  /**
   * Start the game and return the first question.
   */
  start() {
    this.reset();
    const firstQ = this.pickNextQuestion();
    return {
      currentTurn: 0,
      certaintyProgress: 0,
      questionText: QUESTION_BANK[firstQ].text,
      questionIndex: firstQ,
      isFinalGuess: false,
      guessedStateName: null,
      topCandidates: this.getTopCandidates(5)
    };
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { AkinatorEngine };
}
