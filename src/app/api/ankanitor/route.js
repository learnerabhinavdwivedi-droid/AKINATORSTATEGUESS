import { NextResponse } from 'next/server';
import { AnkanitorEngine } from '@/lib/gameEngine';
import { QUESTION_BANK } from '@/lib/questions';

export async function POST(request) {
  try {
    const { history, latestUserResponse, latestAttributeKey } = await request.json();

    // Instantiate our local engine
    const engine = new AnkanitorEngine();
    let state = engine.start();

    // Replay the history to reconstruct the exact state of the game
    if (history && history.length > 0) {
      for (const move of history) {
        const qIndex = QUESTION_BANK.findIndex(q => q.text === move.question);
        if (qIndex !== -1) {
          state = engine.processAnswer(qIndex, move.answer);
        }
      }
    }

    // Process the new incoming move if it's not the initial START payload
    if (latestUserResponse && latestUserResponse !== "START") {
      const qIndex = QUESTION_BANK.findIndex(q => q.text === latestAttributeKey);
      if (qIndex !== -1) {
        state = engine.processAnswer(qIndex, latestUserResponse);
      }
    }

    // Return the calculated deterministic state (no LLM required!)
    return NextResponse.json(state);

  } catch (error) {
    console.error("Ankanitor Pipeline Processing Error:", error);
    return NextResponse.json({ error: "Failed to compile state run" }, { status: 500 });
  }
}
