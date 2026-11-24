const body = document.body;
const fx = document.getElementById('fx');
const title = document.getElementById('title');
const hint = document.getElementById('hint');
const btn = document.getElementById('btn');
const overlay = document.getElementById('overlay');
const COLORS = ['#f06292', '#4dd0c4', '#1c1c1c', '#f5c242', '#f3d9cf', '#e53950'];
let balloonTimer = null;
let audio = null;

function setText(h, p) {
  title.textContent = h;
  hint.textContent = p;
  [title, hint].forEach(el => {
    el.classList.remove('swap');
    void el.offsetWidth;
    el.classList.add('swap');
  });
}

function balloon() {
  const b = document.createElement('div');
  b.className = 'balloon';
  b.style.left = Math.random() * 92 + 'vw';
  b.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
  b.style.setProperty('--sway', (Math.random() * 60 - 30) + 'px');
  const dur = 7 + Math.random() * 5;
  b.style.animationDuration = dur + 's';
  const s = .7 + Math.random() * .6;
  b.style.width = 34 * s + 'px';
  b.style.height = 42 * s + 'px';
  fx.appendChild(b);
  setTimeout(() => b.remove(), dur * 1000);
}

function confetti(n) {
  for (let i = 0; i < n; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.top = -10 - Math.random() * 30 + 'vh';
    c.style.background = COLORS[i % COLORS.length];
    c.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
    c.style.setProperty('--rot', Math.random() * 720 + 'deg');
    const dur = 2.5 + Math.random() * 2.5;
    c.style.animationDuration = dur + 's';
    fx.appendChild(c);
    setTimeout(() => c.remove(), dur * 1000);
  }
}

function hearts(x, y, n) {
  const list = ['💕', '💖', '💗', '❤️', '💘'];
  for (let i = 0; i < n; i++) {
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = list[Math.floor(Math.random() * list.length)];
    h.style.left = x + Math.random() * 40 - 20 + 'px';
    h.style.top = y + 'px';
    h.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
    h.style.animationDelay = i * 0.08 + 's';
    fx.appendChild(h);
    setTimeout(() => h.remove(), 2500 + i * 80);
  }
}

// "Happy Birthday" melody with WebAudio
function playSong() {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const notes = [
      [392, .3], [392, .15], [440, .45], [392, .45], [523, .45], [494, .9],
      [392, .3], [392, .15], [440, .45], [392, .45], [587, .45], [523, .9],
      [392, .3], [392, .15], [784, .45], [659, .45], [523, .45], [494, .45], [440, .9],
      [698, .3], [698, .15], [659, .45], [523, .45], [587, .45], [523, 1.1]
    ];
    let t = audio.currentTime + .1;
    notes.forEach(([f, d]) => {
      const o = audio.createOscillator();
      const g = audio.createGain();
      o.type = 'triangle';
      o.frequency.value = f;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(.18, t + .02);
      g.gain.exponentialRampToValueAtTime(.001, t + d * .95);
      o.connect(g).connect(audio.destination);
      o.start(t);
      o.stop(t + d);
      t += d;
    });
  } catch (e) { /* audio not available */ }
}

function openGift() {
  if (body.classList.contains('open')) return;
  body.classList.add('open');
  setText('¡Feliz Cumpleaños!', '✨ Pide un deseo y toca la velita para soplarla ✨');
  btn.textContent = '🕯️ Soplar la velita';
  confetti(70);
  for (let i = 0; i < 6; i++) setTimeout(balloon, i * 250);
  balloonTimer = setInterval(balloon, 900);
  playSong();
}

function blow() {
  if (!body.classList.contains('open') || body.classList.contains('blown')) return;
  body.classList.add('blown', 'dark');
  confetti(50);
  setTimeout(() => overlay.classList.add('show'), 700);
  setTimeout(() => {
    setText('¡Feliz Cumpleaños!', '💖 ¡Deseo enviado al universo!');
    btn.textContent = '🕯️ Volver a encender';
  }, 300);
}

function relight() {
  body.classList.remove('blown', 'dark');
  setText('¡Feliz Cumpleaños!', '✨ Pide un deseo y toca la velita para soplarla ✨');
  btn.textContent = '🕯️ Soplar la velita';
}

document.getElementById('steamer').addEventListener('click', openGift);
document.getElementById('flame-hit').addEventListener('click', e => {
  if (body.classList.contains('open')) { e.stopPropagation(); blow(); }
});
btn.addEventListener('click', () => body.classList.contains('blown') ? relight() : blow());
document.getElementById('close').addEventListener('click', () => overlay.classList.remove('show'));
overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('show'); });
document.getElementById('hearts').addEventListener('click', e => {
  const r = e.currentTarget.getBoundingClientRect();
  hearts(r.left + r.width / 2 - 12, r.top, 10);
});
