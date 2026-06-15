import { describe, it, expect, beforeEach } from 'vitest';
import { AnkanitorEngine } from '../src/lib/gameEngine.js';

describe('AnkanitorEngine', () => {
  let engine;

  beforeEach(() => {
    engine = new AnkanitorEngine();
  });

  it('should initialize with a fresh game state', () => {
    const state = engine.start();
    expect(state.currentTurn).toBe(0);
    expect(state.certaintyProgress).toBe(0);
    expect(state.isFinalGuess).toBe(false);
    expect(state.topCandidates.length).toBe(5);
    expect(state.questionText).toBeTruthy();
  });

  it('should process answers and recalculate progress', () => {
    engine.start();
    const state = engine.processAnswer(0, 'YES');
    expect(state.currentTurn).toBe(1);
    expect(state.certaintyProgress).toBeGreaterThanOrEqual(0);
  });

  it('should not make a final guess until certainty reaches 99 or turn reaches 50', () => {
    engine.start();
    let state;
    // Simulate answering "DON'T KNOW" a few times to increase turn count but not certainty
    for (let i = 0; i < 5; i++) {
      state = engine.processAnswer(i, 'DONT_KNOW');
    }
    
    expect(state.currentTurn).toBe(5);
    expect(state.isFinalGuess).toBe(false);
    expect(state.certaintyProgress).toBeLessThan(99);
  });
});
