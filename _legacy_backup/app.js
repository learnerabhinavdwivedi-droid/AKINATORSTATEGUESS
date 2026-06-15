/**
 * ANKANITOR APP CONTROLLER
 * Wires the UI screens, buttons, and animations to the game engine.
 */

(function () {
  "use strict";

  // ── DOM References ─────────────────────────────────────────
  const screens = {
    start: document.getElementById("start-screen"),
    game: document.getElementById("game-screen"),
    result: document.getElementById("result-screen"),
  };

  const dom = {
    btnStart: document.getElementById("btn-start"),
    turnNumber: document.getElementById("turn-number"),
    progressRingFill: document.getElementById("progress-ring-fill"),
    progressValue: document.getElementById("progress-value"),
    questionText: document.getElementById("question-text"),
    questionCard: document.querySelector(".question-card"),
    answerBtns: document.getElementById("answer-buttons"),
    leaderboardBars: document.getElementById("leaderboard-bars"),
    resultName: document.getElementById("result-name"),
    resultConfidence: document.getElementById("result-confidence"),
    resultTurns: document.getElementById("result-turns"),
    btnCorrect: document.getElementById("btn-correct"),
    btnWrong: document.getElementById("btn-wrong"),
    wrongReveal: document.getElementById("wrong-reveal"),
    correctReveal: document.getElementById("correct-reveal"),
    btnPlayAgain: document.getElementById("btn-play-again"),
    btnPlayAgain2: document.getElementById("btn-play-again-2"),
    canvas: document.getElementById("particle-canvas"),
  };

  // ── Engine Instance ────────────────────────────────────────
  const engine = new AnkanitorEngine();
  let currentQuestionIndex = null;

  // ── SVG Gradient for Progress Ring ─────────────────────────
  const svgNS = "http://www.w3.org/2000/svg";
  const progressRingSvg = document.querySelector(".progress-ring");
  const defs = document.createElementNS(svgNS, "defs");
  const linearGrad = document.createElementNS(svgNS, "linearGradient");
  linearGrad.setAttribute("id", "progress-gradient");
  linearGrad.setAttribute("x1", "0%");
  linearGrad.setAttribute("y1", "0%");
  linearGrad.setAttribute("x2", "100%");
  linearGrad.setAttribute("y2", "100%");
  const stop1 = document.createElementNS(svgNS, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#7c3aed");
  const stop2 = document.createElementNS(svgNS, "stop");
  stop2.setAttribute("offset", "50%");
  stop2.setAttribute("stop-color", "#6366f1");
  const stop3 = document.createElementNS(svgNS, "stop");
  stop3.setAttribute("offset", "100%");
  stop3.setAttribute("stop-color", "#06b6d4");
  linearGrad.appendChild(stop1);
  linearGrad.appendChild(stop2);
  linearGrad.appendChild(stop3);
  defs.appendChild(linearGrad);
  progressRingSvg.insertBefore(defs, progressRingSvg.firstChild);

  // ── Progress Ring Constants ────────────────────────────────
  const RING_CIRCUMFERENCE = 2 * Math.PI * 52; // r=52

  function setProgress(pct) {
    const offset = RING_CIRCUMFERENCE - (pct / 100) * RING_CIRCUMFERENCE;
    dom.progressRingFill.style.strokeDashoffset = offset;
    dom.progressValue.textContent = pct;
  }

  // ── Screen Transitions ─────────────────────────────────────
  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  // ── Leaderboard Rendering ──────────────────────────────────
  function renderLeaderboard(topCandidates) {
    const maxScore = Math.max(...topCandidates.map((c) => c.confidenceScore), 1);
    dom.leaderboardBars.innerHTML = topCandidates
      .map((c, i) => {
        const pct = Math.max(2, (c.confidenceScore / maxScore) * 100);
        return `
          <div class="lb-row fade-in" style="animation-delay: ${i * 0.08}s">
            <span class="lb-rank">${i + 1}</span>
            <span class="lb-name" title="${c.stateName}">${c.stateName}</span>
            <div class="lb-bar-track">
              <div class="lb-bar-fill" style="width: ${pct}%"></div>
            </div>
            <span class="lb-score">${c.confidenceScore}</span>
          </div>
        `;
      })
      .join("");
  }

  // ── Question Card Transition ───────────────────────────────
  function showQuestion(text) {
    dom.questionCard.classList.remove("slide-in");
    // Force reflow
    void dom.questionCard.offsetWidth;
    dom.questionText.textContent = text;
    dom.questionCard.classList.add("slide-in");
  }

  // ── Update Game UI ─────────────────────────────────────────
  function updateGameUI(state) {
    dom.turnNumber.textContent = state.currentTurn + 1;
    setProgress(state.certaintyProgress);
    showQuestion(state.questionText);
    renderLeaderboard(state.topCandidates);
    currentQuestionIndex = state.questionIndex;
  }

  // ── Confetti Burst ─────────────────────────────────────────
  function launchConfetti() {
    const colors = ["#7c3aed", "#f59e0b", "#10b981", "#f43f5e", "#06b6d4", "#fbbf24", "#a855f7"];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.top = -10 + "px";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = (Math.random() * 8 + 5) + "px";
      piece.style.height = (Math.random() * 8 + 5) + "px";
      piece.style.animationDuration = (Math.random() * 1.5 + 2) + "s";
      piece.style.animationDelay = (Math.random() * 0.8) + "s";
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }
  }

  // ── Show Result Screen ─────────────────────────────────────
  function showResult(state) {
    dom.resultName.textContent = state.guessedStateName;
    dom.resultConfidence.textContent = state.certaintyProgress + "%";
    dom.resultTurns.textContent = state.currentTurn;
    dom.wrongReveal.style.display = "none";
    dom.correctReveal.style.display = "none";
    dom.btnCorrect.style.display = "";
    dom.btnWrong.style.display = "";
    showScreen("result");
  }

  // ── Event Handlers ─────────────────────────────────────────

  // Start button
  dom.btnStart.addEventListener("click", () => {
    const state = engine.start();
    showScreen("game");
    updateGameUI(state);
  });

  // Answer buttons
  dom.answerBtns.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-answer");
    if (!btn || currentQuestionIndex === null) return;

    // Press animation
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 400);

    const answer = btn.dataset.answer;
    const state = engine.processAnswer(currentQuestionIndex, answer);

    if (state.isFinalGuess) {
      // Short delay for dramatic effect
      setTimeout(() => showResult(state), 600);
    } else {
      // Update UI with next question
      setTimeout(() => updateGameUI(state), 300);
    }
  });

  // Correct guess
  dom.btnCorrect.addEventListener("click", () => {
    dom.btnCorrect.style.display = "none";
    dom.btnWrong.style.display = "none";
    dom.correctReveal.style.display = "";
    launchConfetti();
  });

  // Wrong guess
  dom.btnWrong.addEventListener("click", () => {
    dom.btnCorrect.style.display = "none";
    dom.btnWrong.style.display = "none";
    dom.wrongReveal.style.display = "";
  });

  // Play again buttons
  dom.btnPlayAgain.addEventListener("click", () => showScreen("start"));
  dom.btnPlayAgain2.addEventListener("click", () => showScreen("start"));

  // ═══════════════════════════════════════════════════════════
  //  PARTICLE BACKGROUND
  // ═══════════════════════════════════════════════════════════
  (function initParticles() {
    const canvas = dom.canvas;
    const ctx = canvas.getContext("2d");
    let w, h;
    const particles = [];
    const PARTICLE_COUNT = 50;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
        // Color variety: purple, indigo, cyan
        const hues = [270, 240, 190];
        this.hue = hues[Math.floor(Math.random() * hues.length)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.update();
        p.draw();
      }
      // Draw connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    animate();
  })();
})();
