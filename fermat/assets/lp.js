(function () {
  "use strict";

  // 1. Scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // 2. Interactive FERMAT Demo
  const root = document.getElementById("fermat-demo");
  if (!root) return;

  const lang = root.dataset.lang === "ja" ? "ja" : "en";
  const COPY = {
    en: {
      remembered: "I remembered!",
      tapOrder: (next, total) => `Tap in order (${next} / ${total})`,
      clearTitle: "STAGE CLEAR!",
      clearSub: (cards) => `You memorized all ${cards} numbers.`,
      overTitle: "GAME OVER",
      overSub: (expected) => `Next number was ${expected}.`,
      nextLevel: "Next level",
      tryAgain: "Try again",
    },
    ja: {
      remembered: "覚えた！",
      tapOrder: (next, total) => `数字の順番通りにタップ (${next} / ${total})`,
      clearTitle: "STAGE CLEAR!",
      clearSub: (cards) => `${cards} 枚の数字をすべて覚えました！`,
      overTitle: "GAME OVER",
      overSub: (expected) => `正解は「${expected}」でした。`,
      nextLevel: "次のレベルへ",
      tryAgain: "もう一回",
    },
  }[lang];

  const PRESETS = [
    { level: 1, cards: 5, cols: 3 },
    { level: 4, cards: 8, cols: 3 },
    { level: 8, cards: 12, cols: 4 },
  ];

  const tabs = document.querySelectorAll(".demo-tabs button");
  const levelEl = document.getElementById("p-level");
  const boardEl = document.getElementById("p-board");
  const footerEl = document.getElementById("p-footer");
  const resetBtn = document.getElementById("p-reset");
  const overlayEl = document.getElementById("p-overlay");
  const overlayTitle = document.getElementById("p-overlay-title");
  const overlaySub = document.getElementById("p-overlay-sub");
  const overlayPrimary = document.getElementById("p-overlay-primary");
  const overlaySecondary = document.getElementById("p-overlay-secondary");

  let presetIdx = 0;
  let phase = "memorize"; // memorize | recall | clear | fail
  let cells = [];
  let nextNum = 1;
  let wrongCellIndex = -1;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startRound(idx) {
    presetIdx = idx;
    const preset = PRESETS[presetIdx];
    phase = "memorize";
    nextNum = 1;
    wrongCellIndex = -1;

    tabs.forEach((btn, i) => {
      btn.classList.toggle("active", i === presetIdx);
      btn.setAttribute("aria-selected", i === presetIdx ? "true" : "false");
    });

    const totalSquares = preset.cols * preset.cols;
    const nums = [];
    for (let i = 1; i <= totalSquares; i++) {
      nums.push(i <= preset.cards ? i : 0);
    }
    cells = shuffle(nums);

    levelEl.textContent = `Level-${preset.level}`;
    overlayEl.classList.remove("show");
    render();
  }

  function render() {
    const preset = PRESETS[presetIdx];
    boardEl.className = `p-board cols-${preset.cols}`;
    boardEl.style.gridTemplateColumns = `repeat(${preset.cols}, minmax(0, 1fr))`;
    boardEl.style.gridTemplateRows = `repeat(${preset.cols}, minmax(0, 1fr))`;
    boardEl.innerHTML = "";

    cells.forEach((val, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "p-tile";

      if (val === 0) {
        btn.classList.add("empty");
        btn.disabled = true;
        btn.setAttribute("aria-hidden", "true");
      } else if (phase === "memorize") {
        btn.classList.add("shown");
        btn.textContent = String(val);
        btn.disabled = true;
      } else if (phase === "recall") {
        if (val < nextNum) {
          btn.classList.add("opened");
          btn.textContent = String(val);
          btn.disabled = true;
        } else {
          btn.classList.add("hidden");
          btn.setAttribute("aria-label", "Card");
          btn.addEventListener("click", () => handleTap(idx, val));
        }
      } else if (phase === "clear") {
        btn.classList.add("opened");
        btn.textContent = String(val);
        btn.disabled = true;
      } else if (phase === "fail") {
        if (idx === wrongCellIndex) {
          btn.classList.add("wrong");
          btn.textContent = String(val);
        } else if (val < nextNum) {
          btn.classList.add("opened");
          btn.textContent = String(val);
        } else {
          btn.classList.add("missed");
          btn.textContent = String(val);
        }
        btn.disabled = true;
      }

      boardEl.appendChild(btn);
    });

    footerEl.innerHTML = "";
    if (phase === "memorize") {
      const goBtn = document.createElement("button");
      goBtn.type = "button";
      goBtn.className = "p-btn";
      goBtn.textContent = COPY.remembered;
      goBtn.addEventListener("click", () => {
        phase = "recall";
        render();
      });
      footerEl.appendChild(goBtn);
    } else if (phase === "recall") {
      const hint = document.createElement("div");
      hint.className = "p-hint";
      hint.textContent = COPY.tapOrder(nextNum, preset.cards);
      footerEl.appendChild(hint);
    }
  }

  function handleTap(idx, val) {
    if (phase !== "recall") return;
    const preset = PRESETS[presetIdx];

    if (val === nextNum) {
      nextNum += 1;
      if (nextNum > preset.cards) {
        phase = "clear";
        render();
        setTimeout(() => showOverlay(true), 220);
      } else {
        render();
      }
    } else {
      phase = "fail";
      wrongCellIndex = idx;
      render();
      setTimeout(() => showOverlay(false), 550);
    }
  }

  function showOverlay(cleared) {
    const preset = PRESETS[presetIdx];
    overlayTitle.textContent = cleared ? COPY.clearTitle : COPY.overTitle;
    overlaySub.textContent = cleared
      ? COPY.clearSub(preset.cards)
      : COPY.overSub(nextNum);

    if (cleared && presetIdx < PRESETS.length - 1) {
      overlayPrimary.textContent = COPY.nextLevel;
      overlayPrimary.onclick = () => startRound(presetIdx + 1);
      overlaySecondary.style.display = "";
      overlaySecondary.textContent = COPY.tryAgain;
      overlaySecondary.onclick = () => startRound(presetIdx);
    } else {
      overlayPrimary.textContent = COPY.tryAgain;
      overlayPrimary.onclick = () => startRound(presetIdx);
      overlaySecondary.style.display = "none";
    }
    overlayEl.classList.add("show");
  }

  tabs.forEach((btn, i) => {
    btn.addEventListener("click", () => startRound(i));
  });
  resetBtn.addEventListener("click", () => startRound(presetIdx));

  startRound(0);
})();
