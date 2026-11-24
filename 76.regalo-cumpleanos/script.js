const giftBox = document.getElementById('giftBox');
const modal = document.getElementById('birthdayModal');
const closeBtn = document.getElementById('closeBtn');
const instructionText = document.getElementById('instructionText');
const confettiContainer = document.getElementById('confetti-container');
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#a29bfe', '#fdcb6e'];

let isOpened = false;
let confettiInterval = null;
let modalTimeout = null;

// Si una foto no carga, se muestra un marcador
document.querySelectorAll('.photo img').forEach((img) => {
  img.addEventListener('error', () => {
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    placeholder.textContent = '📷';
    img.replaceWith(placeholder);
  });
});

function createConfetti(amount) {
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = 6 + Math.random() * 8 + 'px';
    piece.style.height = 4 + Math.random() * 6 + 'px';
    piece.style.setProperty('--dx', (Math.random() - 0.5) * 200 + 'px');
    piece.style.setProperty('--rot', Math.random() * 1080 - 540 + 'deg');
    piece.style.animationDuration = 2.5 + Math.random() * 3 + 's';
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.addEventListener('animationend', () => piece.remove());
    confettiContainer.appendChild(piece);
  }
}

function openGift() {
  if (isOpened) return;
  isOpened = true;

  giftBox.classList.add('open');
  instructionText.classList.add('hidden');

  // Explosión inicial cuando caen las paredes
  setTimeout(() => createConfetti(80), 600);

  modalTimeout = setTimeout(() => {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    createConfetti(60);
    confettiInterval = setInterval(() => createConfetti(8), 300);
    closeBtn.focus();
  }, 1600);
}

function closeModal() {
  clearTimeout(modalTimeout);
  clearInterval(confettiInterval);
  confettiInterval = null;

  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');

  // La caja se vuelve a armar para poder abrirla otra vez
  setTimeout(() => {
    giftBox.classList.remove('open');
    instructionText.classList.remove('hidden');
    isOpened = false;
    giftBox.focus();
  }, 400);
}

giftBox.addEventListener('click', openGift);
giftBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openGift();
  }
});

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});
