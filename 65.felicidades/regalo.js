(() => {
  "use strict";

  const giftScreen = document.getElementById("giftScreen");
  const giftBox = document.getElementById("giftBox");
  const instructionText = document.getElementById("instructionText");
  const confettiContainer = document.getElementById("confetti-container");
  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7", "#fd79a8", "#a29bfe", "#fdcb6e"];

  // Tiempos de la transición (ms)
  const BURST_AT = 1300;     // las paredes ya cayeron: sale el destello
  const GALAXY_AT = 1900;    // arranca la galaxia (túnel de estrellas)
  const FADE_MS = 1200;      // lo que tarda en desaparecer la pantalla del regalo

  let isOpened = false;

  function createConfetti(amount) {
    for (let i = 0; i < amount; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = 6 + Math.random() * 8 + "px";
      piece.style.height = 4 + Math.random() * 6 + "px";
      piece.style.setProperty("--dx", (Math.random() - 0.5) * 200 + "px");
      piece.style.setProperty("--rot", Math.random() * 1080 - 540 + "deg");
      piece.style.animationDuration = 2.5 + Math.random() * 3 + "s";
      piece.style.animationDelay = Math.random() * 0.5 + "s";
      piece.addEventListener("animationend", () => piece.remove());
      confettiContainer.appendChild(piece);
    }
  }

  function openGift() {
    if (isOpened) return;
    isOpened = true;

    giftBox.classList.add("open");
    instructionText.classList.add("hidden");

    // Explosión de confeti cuando caen las paredes
    setTimeout(() => createConfetti(80), 600);

    // Destello de luz desde la caja
    setTimeout(() => giftScreen.classList.add("bursting"), BURST_AT);

    // En vez de la carta: aparece la galaxia con las fotos
    setTimeout(() => {
      window.Galaxia.start();
      giftScreen.classList.add("leaving");
      setTimeout(() => giftScreen.remove(), FADE_MS);
    }, GALAXY_AT);
  }

  giftBox.addEventListener("click", openGift);
  giftBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openGift();
    }
  });
})();
