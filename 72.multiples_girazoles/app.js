// ================== Configuración ==================
const FRASES = [
  "Un sol para ti",
  "Contigo todo es mejor",
  "Por siempre",
  "Eres especial",
  "Gracias por existir",
  "Flores para ti",
  "Siempre brillas",
  "Feliz día",
  "Mi persona favorita",
  "Eres para mí",
  "Mi girasol",
  "Te quiero"
];

const Z_MAX = 3200;        // profundidad donde nacen los objetos
const VELOCIDAD = 650;     // unidades por segundo hacia la cámara
const NUM_OBJETOS = 190;
const NUM_ESTRELLAS = 420;

// ================== Canvas ==================
const canvas = document.getElementById("escena");
const ctx = canvas.getContext("2d");
let W = 0, H = 0, FOCAL = 0;

function redimensionar() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  FOCAL = Math.max(W, H) * 0.55;
}
window.addEventListener("resize", redimensionar);
redimensionar();

function crearLienzo(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

const azar = (a, b) => a + Math.random() * (b - a);
const elegir = (lista) => lista[Math.floor(Math.random() * lista.length)];

// ================== Dibujo de sprites ==================
function dibujarCabezaGirasol(g, x, y, r) {
  const capas = [
    { n: 16, largo: r * 1.0, ancho: r * 0.34, color: "#F29E0C", giro: 0 },
    { n: 16, largo: r * 0.9, ancho: r * 0.3, color: "#FFD23A", giro: Math.PI / 16 }
  ];
  for (const capa of capas) {
    g.fillStyle = capa.color;
    for (let i = 0; i < capa.n; i++) {
      const a = (i / capa.n) * Math.PI * 2 + capa.giro;
      g.beginPath();
      g.ellipse(
        x + Math.cos(a) * r * 0.58,
        y + Math.sin(a) * r * 0.58,
        capa.largo * 0.46,
        capa.ancho * 0.5,
        a, 0, Math.PI * 2
      );
      g.fill();
    }
  }
  g.fillStyle = "#6B3A12";
  g.beginPath();
  g.arc(x, y, r * 0.44, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#3E1F07";
  g.beginPath();
  g.arc(x, y, r * 0.32, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "rgba(160, 95, 30, 0.8)";
  for (let i = 0; i < 26; i++) {
    const a = Math.random() * Math.PI * 2;
    const d = Math.random() * r * 0.38;
    g.beginPath();
    g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, r * 0.03, 0, Math.PI * 2);
    g.fill();
  }
}

function dibujarHoja(g, x, y, largo, angulo) {
  g.save();
  g.translate(x, y);
  g.rotate(angulo);
  g.fillStyle = "#3FA34D";
  g.beginPath();
  g.ellipse(largo / 2, 0, largo / 2, largo / 4.5, 0, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "#2B7A38";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(0, 0);
  g.lineTo(largo * 0.9, 0);
  g.stroke();
  g.restore();
}

function spriteGirasol() {
  const c = crearLienzo(256, 390);
  const g = c.getContext("2d");
  g.strokeStyle = "#3E9B4F";
  g.lineWidth = 12;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(128, 200);
  g.quadraticCurveTo(122, 300, 130, 382);
  g.stroke();
  dibujarHoja(g, 126, 300, 80, Math.PI + 0.5);
  dibujarHoja(g, 128, 270, 78, -0.5);
  dibujarCabezaGirasol(g, 128, 118, 104);
  return c;
}

function spriteRamo() {
  const c = crearLienzo(340, 430);
  const g = c.getContext("2d");
  // hojas de fondo
  for (let i = 0; i < 6; i++) {
    dibujarHoja(g, 170, 230, 110, -Math.PI / 2 + azar(-1.3, 1.3));
  }
  // cabezas
  const cabezas = [
    [110, 150, 50], [230, 150, 50], [170, 105, 54],
    [80, 215, 44], [260, 215, 44], [170, 185, 52], [125, 60, 36], [220, 62, 36]
  ];
  for (const [x, y, r] of cabezas) dibujarCabezaGirasol(g, x, y, r);
  // envoltura
  g.fillStyle = "#2F8F8A";
  g.beginPath();
  g.moveTo(55, 235);
  g.lineTo(285, 235);
  g.lineTo(190, 425);
  g.lineTo(150, 425);
  g.closePath();
  g.fill();
  g.fillStyle = "#4BB7AD";
  g.beginPath();
  g.moveTo(55, 235);
  g.lineTo(175, 250);
  g.lineTo(160, 425);
  g.lineTo(150, 425);
  g.closePath();
  g.fill();
  // lazo
  g.fillStyle = "#F7D34A";
  g.fillRect(140, 330, 60, 14);
  return c;
}

function spriteCempasuchil() {
  const c = crearLienzo(210, 280);
  const g = c.getContext("2d");
  g.strokeStyle = "#3E9B4F";
  g.lineWidth = 9;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(105, 140);
  g.lineTo(105, 270);
  g.stroke();
  dibujarHoja(g, 105, 215, 55, -0.6);
  dibujarHoja(g, 105, 235, 55, Math.PI + 0.6);
  const colores = ["#F59E0B", "#FBBF24", "#F97316", "#FCD34D", "#EA8A0C"];
  for (let i = 0; i < 170; i++) {
    const a = Math.random() * Math.PI * 2;
    const d = Math.sqrt(Math.random()) * 70;
    g.fillStyle = elegir(colores);
    g.beginPath();
    g.arc(105 + Math.cos(a) * d, 95 + Math.sin(a) * d * 0.85, azar(9, 16), 0, Math.PI * 2);
    g.fill();
  }
  return c;
}

function spriteCorazon() {
  const c = crearLienzo(80, 80);
  const g = c.getContext("2d");
  g.fillStyle = "#A78BFA";
  g.shadowColor = "#C4B5FD";
  g.shadowBlur = 12;
  g.beginPath();
  g.moveTo(40, 66);
  g.bezierCurveTo(6, 44, 10, 12, 40, 26);
  g.bezierCurveTo(70, 12, 74, 44, 40, 66);
  g.fill();
  return c;
}

function spriteTexto(frase) {
  const tam = 64;
  const fuente = `${tam}px "Gochi Hand", "Comic Sans MS", cursive`;
  const medir = crearLienzo(10, 10).getContext("2d");
  medir.font = fuente;
  const ancho = Math.ceil(medir.measureText(frase).width) + 50;
  const c = crearLienzo(ancho, tam + 50);
  const g = c.getContext("2d");
  g.font = fuente;
  g.textBaseline = "middle";
  g.shadowColor = "rgba(255, 200, 70, 0.9)";
  g.shadowBlur = 16;
  g.fillStyle = Math.random() < 0.3 ? "#FFD54A" : "#FFF6D8";
  g.fillText(frase, 25, c.height / 2);
  return c;
}

// ================== Objetos del viaje ==================
const sprites = { girasol: [], ramo: [], cempasuchil: [], corazon: [], texto: [] };

function prepararSprites() {
  for (let i = 0; i < 4; i++) sprites.girasol.push(spriteGirasol());
  for (let i = 0; i < 3; i++) sprites.ramo.push(spriteRamo());
  for (let i = 0; i < 4; i++) sprites.cempasuchil.push(spriteCempasuchil());
  sprites.corazon.push(spriteCorazon());
  for (const f of FRASES) sprites.texto.push(spriteTexto(f));
}

// tipo, probabilidad, altura en unidades del mundo
const TIPOS = [
  { tipo: "texto", p: 0.42, alto: [22, 46] },
  { tipo: "girasol", p: 0.24, alto: [120, 190] },
  { tipo: "cempasuchil", p: 0.16, alto: [70, 120] },
  { tipo: "ramo", p: 0.12, alto: [170, 260] },
  { tipo: "corazon", p: 0.06, alto: [18, 30] }
];

function tipoAlAzar() {
  let r = Math.random();
  for (const t of TIPOS) {
    if ((r -= t.p) <= 0) return t;
  }
  return TIPOS[0];
}

function reiniciarObjeto(o, zInicial) {
  const t = tipoAlAzar();
  o.tipo = t.tipo;
  o.sprite = elegir(sprites[t.tipo]);
  o.alto = azar(t.alto[0], t.alto[1]);
  o.ancho = o.alto * (o.sprite.width / o.sprite.height);
  const angulo = Math.random() * Math.PI * 2;
  const radio = Math.random() < 0.12 ? azar(0, 120) : azar(140, 950);
  o.x = Math.cos(angulo) * radio;
  o.y = Math.sin(angulo) * radio * 0.8;
  o.z = zInicial;
  o.giro = o.tipo === "texto" ? azar(-0.15, 0.15) : azar(-0.4, 0.4);
  o.vgiro = o.tipo === "texto" ? 0 : azar(-0.3, 0.3);
  return o;
}

function reiniciarEstrella(e, zInicial) {
  const angulo = Math.random() * Math.PI * 2;
  const radio = azar(40, 1400);
  e.x = Math.cos(angulo) * radio;
  e.y = Math.sin(angulo) * radio;
  e.z = zInicial;
  return e;
}

const objetos = [];
const estrellas = [];

// ================== Cámara (se mueve con el puntero) ==================
const camara = { x: 0, y: 0, objX: 0, objY: 0, rot: 0, objRot: 0 };

function moverPuntero(px, py) {
  const nx = px / W - 0.5;
  const ny = py / H - 0.5;
  camara.objX = nx * 500;
  camara.objY = ny * 400;
  camara.objRot = nx * 0.25;
}
window.addEventListener("pointermove", (e) => moverPuntero(e.clientX, e.clientY));
window.addEventListener("pointerleave", () => moverPuntero(W / 2, H / 2));

// ================== Bucle de animación ==================
function proyectar(x, y, z) {
  const s = FOCAL / z;
  return { x: (x - camara.x) * s, y: (y - camara.y) * s, s };
}

function dibujarFondo() {
  const dpr = canvas.width / W;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const fondo = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.75);
  fondo.addColorStop(0, "#141a3a");
  fondo.addColorStop(1, "#04050d");
  ctx.fillStyle = fondo;
  ctx.fillRect(0, 0, W, H);
}

function dibujarBrilloCentral(cx, cy) {
  const r = Math.min(W, H) * 0.38;
  const brillo = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  brillo.addColorStop(0, "rgba(255, 205, 120, 0.55)");
  brillo.addColorStop(0.35, "rgba(210, 140, 60, 0.3)");
  brillo.addColorStop(1, "rgba(120, 70, 20, 0)");
  ctx.fillStyle = brillo;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
}

let ultimo = 0;
function cuadro(t) {
  const dt = Math.min((t - ultimo) / 1000, 0.05);
  ultimo = t;

  camara.x += (camara.objX - camara.x) * 0.04;
  camara.y += (camara.objY - camara.y) * 0.04;
  camara.rot += (camara.objRot - camara.rot) * 0.04;

  dibujarFondo();

  ctx.translate(W / 2, H / 2);
  ctx.rotate(camara.rot);

  // punto de fuga
  const fuga = proyectar(0, 0, Z_MAX);
  dibujarBrilloCentral(fuga.x, fuga.y);

  // estrellas en líneas (efecto velocidad)
  ctx.lineCap = "round";
  for (const e of estrellas) {
    e.z -= VELOCIDAD * 1.6 * dt;
    if (e.z < 20) reiniciarEstrella(e, Z_MAX);
    const a = proyectar(e.x, e.y, e.z);
    const b = proyectar(e.x, e.y, e.z + 140);
    const alfa = Math.min(1, (Z_MAX - e.z) / 800);
    ctx.strokeStyle = `rgba(255, 244, 210, ${alfa * 0.8})`;
    ctx.lineWidth = Math.min(1.6, a.s * 0.8);
    ctx.beginPath();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(a.x, a.y);
    ctx.stroke();
  }

  // flores y frases, de lejos a cerca
  for (const o of objetos) {
    o.z -= VELOCIDAD * dt;
    o.giro += o.vgiro * dt;
    if (o.z < 25) reiniciarObjeto(o, Z_MAX + azar(0, 300));
  }
  objetos.sort((a, b) => b.z - a.z);

  for (const o of objetos) {
    const p = proyectar(o.x, o.y, o.z);
    const w = o.ancho * p.s;
    const h = o.alto * p.s;
    if (w < 1.5) continue;
    let alfa = Math.min(1, (Z_MAX - o.z) / 700);
    if (o.z < 140) alfa *= (o.z - 25) / 115;
    if (alfa <= 0) continue;
    ctx.globalAlpha = alfa;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(o.giro);
    ctx.drawImage(o.sprite, -w / 2, -h / 2, w, h);
    ctx.restore();
  }
  ctx.globalAlpha = 1;

  requestAnimationFrame(cuadro);
}

// ================== Inicio ==================
const intro = document.getElementById("intro");
const botonEmpezar = document.getElementById("empezar");
const preparando = document.getElementById("preparando");

botonEmpezar.addEventListener("click", async () => {
  botonEmpezar.hidden = true;
  preparando.hidden = false;

  const espera = new Promise((r) => setTimeout(r, 2600));
  try {
    await document.fonts.load('64px "Gochi Hand"');
  } catch (e) {
    // sin internet se usa la fuente de respaldo
  }
  prepararSprites();
  for (let i = 0; i < NUM_OBJETOS; i++) objetos.push(reiniciarObjeto({}, azar(60, Z_MAX)));
  for (let i = 0; i < NUM_ESTRELLAS; i++) estrellas.push(reiniciarEstrella({}, azar(20, Z_MAX)));
  await espera;

  intro.classList.add("oculto");
  canvas.classList.add("visible");
  ultimo = performance.now();
  requestAnimationFrame(cuadro);
});
