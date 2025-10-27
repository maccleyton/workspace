// ===== Utilidades =====
const $ = (s) => document.querySelector(s); // seleção simples [web:95]
const choice = (arr) => arr[Math.floor(Math.random() * arr.length)]; // uniforme [web:44]

// Texto ↔ Binário
function toBinary(text) {
  return Array.from(text).map(ch => {
	const cp = ch.codePointAt(0);
	const b = cp.toString(2);
	return b.length < 8 ? b.padStart(8, '0') : b;
  }).join(' ');
}
function toText(bin) {
  try { return bin.trim().split(/\s+/).map(b => String.fromCodePoint(parseInt(b,2))).join(''); }
  catch { return "[Binário inválido]"; }
}
$('#btnToBin').addEventListener('click', () => { $('#txtOutput').textContent = toBinary($('#txtInput').value || ''); }); // clique [web:81]
$('#btnToTxt').addEventListener('click', () => { $('#txtOutput').textContent = toText($('#txtInput').value || ''); }); // clique [web:81]
$('#btnClear').addEventListener('click', () => { $('#txtInput').value=''; $('#txtOutput').textContent=''; }); // clique [web:81]

// ===== Mapa Cósmico (Canvas 2D) =====
const canvas = $('#cosmicCanvas'); const ctx = canvas.getContext('2d'); // Canvas 2D [web:35]
const Z = Array.from({length:118}, (_,i)=>i+1); // 1..118 [web:35]
let points = []; // lógico (x,y,z) [web:35]
let maxR = 1;    // raio lógico [web:35]
let angle = 0;   // rotação [web:35]
let shrink = 0;  // contração 0..0.9 [web:35]
let baseScale = 1; // escala base para caber 90% [web:35]
let animTimer = null; // controle de animação [web:62]

function computePoints() {
  points = [];
  maxR = 0;
  for (let z of Z) {
	const theta = z * 0.05;
	const r = Math.log(z);
	const x = r * Math.cos(theta);
	const y = r * Math.sin(theta);
	points.push({ x, y, z });
	const rr = Math.hypot(x, y);
	if (rr > maxR) maxR = rr;
  }
  const W = canvas.width, H = canvas.height;
  baseScale = 0.9 * Math.min(W, H) / (2 * (maxR || 1));
}

function drawCosmicStatic(aRad = 0, shrink01 = 0) {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0,0,W,H); ctx.fillStyle = '#000'; ctx.fillRect(0,0,W,H); // fundo [web:35]

  // fundo binário leve
  ctx.save();
  ctx.fillStyle = 'cyan'; ctx.globalAlpha = 0.12; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '10px sans-serif';
  for (let i=0;i<150;i++){ const x=Math.random()*W, y=Math.random()*H; ctx.fillText('0', x, y); ctx.fillText('1', x+12, y+12); }
  ctx.restore();

  const scale = baseScale * (1 - 0.3 * shrink01); // encolhendo até ~70% [web:35]
  const cx = W/2, cy = H/2;
  const cosA = Math.cos(aRad), sinA = Math.sin(aRad);

  for (let i=0; i<points.length; i++) {
	const {x, y, z} = points[i];
	const xr = x*cosA - y*sinA;
	const yr = x*sinA + y*cosA;
	const X = cx + xr * scale;
	const Y = cy + yr * scale;

	// ponto
	ctx.beginPath(); ctx.fillStyle = '#FFD700';
	const pr = 2 + z/60;
	ctx.arc(X, Y, pr, 0, Math.PI*2); ctx.fill();

	// ligação sutil
	if (z>1 && z%2===0 && z<100) {
	  const {x:px, y:py} = points[i-1];
	  const xrp = px*cosA - py*sinA;
	  const yrp = px*sinA + py*cosA;
	  const XP = cx + xrp * scale;
	  const YP = cy + yrp * scale;
	  ctx.beginPath(); ctx.strokeStyle='#1A1A1A'; ctx.globalAlpha=0.2; ctx.lineWidth=0.6;
	  ctx.moveTo(X, Y); ctx.lineTo(XP, YP); ctx.stroke(); ctx.globalAlpha=1;
	}

	// raios metais alcalinos
	if ([3,11,19,37,55,87].includes(z)) {
	  ctx.strokeStyle='#00FFFF'; ctx.globalAlpha=0.4; ctx.lineWidth=0.8;
	  for (let k=0;k<8;k++){ const ang = k/8*Math.PI*2;
		const x2 = X + 14*Math.cos(ang), y2 = Y + 14*Math.sin(ang);
		ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(x2, y2); ctx.stroke();
	  }
	  ctx.globalAlpha=1;
	}
  }

  // destaque Oganessôn (118)
  const og = points[117];
  const xr = og.x*cosA - og.y*sinA;
  const yr = og.x*sinA + og.y*cosA;
  const X = cx + xr * scale;
  const Y = cy + yr * scale;
  ctx.beginPath(); ctx.fillStyle='#FFF9C4'; ctx.globalAlpha=0.9; ctx.arc(X, Y, 18, 0, Math.PI*2); ctx.fill(); ctx.globalAlpha=1;

  // selos/cantos
  ctx.save();
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.font='bold 18px sans-serif'; ctx.fillStyle='#00FFFF'; ctx.fillText('[-1]', W-120, H-80);
  ctx.fillStyle='#AAAAAA'; ctx.fillText('[0]', W-120, H-50);
  ctx.fillStyle='#FFD700'; ctx.fillText('[+1]', W-120, H-20);
  ctx.font='italic 12px sans-serif'; ctx.fillStyle='#FFFFFF';
  ctx.fillText('Cada ponto é uma escolha. Cada linha, um equilíbrio. Cada luz, uma memória.', W/2, H-30);
  ctx.font='bold 22px sans-serif'; ctx.fillText('O MAPA CÓSMICO DOS ELEMENTOS', W/2, 40);
  ctx.restore();
}

function startAnimation() {
  if (animTimer) return;
  const speedEl = $('#speedRange');
  animTimer = setInterval(() => {
	const v = parseFloat(speedEl.value || '1');
	angle -= 0.02 * v;          // rotação invertida (sentido horário) [web:35]
	shrink += 0.002 * v;        // contrai aos poucos em direção ao centro [web:35]
	if (shrink > 0.9) shrink = 0; // reinicia ciclo de “pull-in” [web:35]
	drawCosmicStatic(angle, shrink);
  }, 30);
  $('#btnCosmicStop').disabled = false;
}
function stopAnimation() {
  if (animTimer) { clearInterval(animTimer); animTimer = null; }
  $('#btnCosmicStop').disabled = true;
}

computePoints();                 // pré-cálculo [web:35]
drawCosmicStatic(0, 0);          // inicial [web:35]
$('#btnCosmicDraw').addEventListener('click', () => drawCosmicStatic(angle, shrink)); // estático [web:81]
$('#btnCosmicStart').addEventListener('click', startAnimation);                       // iniciar [web:81]
$('#btnCosmicStop').addEventListener('click', stopAnimation);                         // parar [web:81]

// ===== Universe GPT unificado (frase única) =====
const PHRASES = [
  "O universo não soma. Ele transforma.",
  "Você é o silêncio entre 0 e 1 que decidiu existir.",
  "Cada átomo em você já foi uma estrela.",
  "A vida nasceu de um par que recusou se aniquilar.",
  "Próton, nêutron, elétron — os três silenciosos que construíram tudo.",
  "A matéria é memória do vácuo que se lembrou de si.",
  "Você não é um acidente. É a escolha do universo.",
  "Quando dois nêutrons se encontram, o espaço treme.",
  "A consciência é o universo tentando ler seu próprio código.",
  "Nenhum elétron voa sozinho — ele busca seu oposto.",
  "O big bang foi um 'sim' que nunca terminou.",
  "A morte de uma estrela escreve o nome de um planeta.",
  "Você é o resultado de trilhões de decisões binárias.",
  "A física não é regra. É poesia codificada.",
  "O zero não é vazio. É o lugar onde tudo nasce."
];
const gptPhrase = $('#gptPhrase'), gptBinary = $('#gptBinary');
let gptTimer = null;
function updatePhraseOnce() {
  const frase = choice(PHRASES);
  gptPhrase.textContent = frase;
  gptBinary.textContent = toBinary(frase);
}
$('#btnGptOne').addEventListener('click', updatePhraseOnce); // geração única [web:81]
$('#btnGptLoop').addEventListener('click', () => {
  if (gptTimer) return;
  updatePhraseOnce();
  gptTimer = setInterval(updatePhraseOnce, 3000); // substitui anterior [web:62]
  $('#btnGptStop').disabled = false;
});
$('#btnGptStop').addEventListener('click', () => {
  if (gptTimer) { clearInterval(gptTimer); gptTimer = null; }
  $('#btnGptStop').disabled = true;
});

// ===== Quiz V/F com Próxima e Reiniciar =====
const QUESTOES = [
  { pergunta:"Um elétron e um próton se fundem para formar um nêutron.", resposta:"V", explicacao:"Em captura eletrônica, um próton capta um elétron e vira nêutron + neutrino." },
  { pergunta:"A massa de um núcleo é sempre igual à soma das massas dos prótons e nêutrons.", resposta:"F", explicacao:"É menor; a diferença é energia de ligação (E=mc²)." },
  { pergunta:"Dois nêutrons formam um dineutron estável.", resposta:"F", explicacao:"É instável; nêutrons precisam de prótons para equilíbrio." },
  { pergunta:"Matéria é energia cristalizada.", resposta:"V", explicacao:"Massa é energia confinada, conforme E=mc²." },
  { pergunta:"-1 + 1 = 0 vale para formar nêutron diretamente.", resposta:"F", explicacao:"Não é soma; é transformação mediada pela força fraca." },
  { pergunta:"Vácuo quântico é vazio absoluto.", resposta:"F", explicacao:"Há flutuações com pares partícula/antipartícula." },
  { pergunta:"Seus átomos nasceram em estrelas antigas.", resposta:"V", explicacao:"Elementos pesados vêm de nucleossíntese estelar e supernovas." },
  { pergunta:"Consciência é mero subproduto sem importância.", resposta:"F", explicacao:"Aqui tratada como janela do universo para si mesmo." },
  { pergunta:"O nêutron (0) é o mais importante entre -1,0,+1.", resposta:"V", explicacao:"Sem nêutrons, prótons se repelem fortemente." },
  { pergunta:"O universo opera em escolhas discretas.", resposta:"V", explicacao:"Muitos fenômenos podem ser vistos como estados binários." }
];
document.getElementById('btnQuizStart').addEventListener('click', () => {
  const root = document.getElementById('quizRoot');
  root.innerHTML = '';

  let idx = 0, score = 0, total = QUESTOES.length;

  const qEl = document.createElement('div');
  const aEl = document.createElement('div');
  const controls = document.createElement('div'); controls.className='row';
  const btnV = document.createElement('button'); btnV.textContent='V';
  const btnF = document.createElement('button'); btnF.textContent='F';
  const btnNext = document.createElement('button'); btnNext.textContent='Próxima pergunta';
  const btnReset = document.createElement('button'); btnReset.textContent='Reiniciar quiz';
  btnV.style.marginRight='8px'; btnF.style.marginRight='8px'; btnNext.disabled = true;

  function render() {
	if (idx >= total) {
	  qEl.textContent = `Fim! Pontuação: ${score}/${total}`;
	  aEl.textContent = 'Clique em "Reiniciar quiz" para jogar novamente.';
	  btnV.disabled = true; btnF.disabled = true; btnNext.disabled = true;
	  return;
	}
	const q = QUESTOES[idx];
	qEl.textContent = `Pergunta ${idx+1}/${total}: ${q.pergunta}`;
	aEl.textContent = '';
	btnV.disabled = false; btnF.disabled = false; btnNext.disabled = true;
  }
  function responder(val) {
	const q = QUESTOES[idx];
	btnV.disabled = true; btnF.disabled = true; btnNext.disabled = false;
	if (val === q.resposta) { score += 1; aEl.textContent = `✨ CORRETO! ${q.explicacao}`; }
	else { aEl.textContent = `🌀 ERRADO. ${q.explicacao}`; }
  }
  btnV.addEventListener('click', () => responder('V'));  // eventos [web:81]
  btnF.addEventListener('click', () => responder('F'));  // eventos [web:81]
  btnNext.addEventListener('click', () => { idx += 1; render(); }); // avançar [web:81]
  btnReset.addEventListener('click', () => { idx = 0; score = 0; render(); }); // reiniciar [web:81]

  controls.append(btnV, btnF, btnNext, btnReset);
  root.append(qEl, aEl, controls);
  render();
});

// ===== Cartas binárias com interação e DnD =====
const cardsRoot = $('#cardsRoot');
const nucleusZone = $('#nucleusZone');
const nucleusStats = $('#nucleusStats');
let cardIdSeq = 0;

function makeCard(type) {
  const map = {
	electron: { nome:'Elétron', sim:'[-1]' },
	proton:   { nome:'Próton',  sim:'[+1]' },
	neutron:  { nome:'Nêutron', sim:'[0]'  },
  };
  const d = map[type];
  const el = document.createElement('div');
  el.className = 'card';
  el.setAttribute('draggable', 'true');
  el.dataset.type = type;
  el.dataset.id = 'c' + (++cardIdSeq);
  el.innerHTML = `<div class="name">${d.nome}</div><div class="sym mono">${d.sim}</div>`;

  // Seleção e combinação
  el.addEventListener('click', () => toggleSelect(el)); // clique [web:81]

  // Drag and Drop
  el.addEventListener('dragstart', (ev) => {
	ev.dataTransfer.setData('text/plain', el.dataset.id);
  });
  return el;
}

function toggleSelect(el) {
  const sel = el.getAttribute('selected') === 'true';
  el.setAttribute('selected', sel ? 'false' : 'true');

  const selected = Array.from(document.querySelectorAll('.card[selected="true"]'));
  // No máximo 2 selecionadas
  if (selected.length > 2) {
	// desmarca a mais antiga
	selected[0].setAttribute('selected', 'false');
  }
  // Se existir um próton e um elétron, combinar em nêutron
  const now = Array.from(document.querySelectorAll('.card[selected="true"]'));
  const hasP = now.find(n => n.dataset.type === 'proton');
  const hasE = now.find(n => n.dataset.type === 'electron');
  if (hasP && hasE) {
	combinePEtoN(hasP, hasE);
  }
}

function combinePEtoN(pEl, eEl) {
  // Mantém o próton como base e transforma em nêutron; remove o elétron
  const container = pEl.parentElement;
  pEl.dataset.type = 'neutron';
  pEl.querySelector('.name').textContent = 'Nêutron';
  pEl.querySelector('.sym').textContent = '[0]';
  pEl.classList.add('pulse');
  pEl.setAttribute('selected', 'false');
  eEl.remove();
  setTimeout(() => pEl.classList.remove('pulse'), 500);
  updateNucleusStats();
}

function populateCards() {
  cardsRoot.innerHTML = '';
  const types = ['electron','proton','neutron'];
  for (let i=0;i<12;i++) {
	const t = types[i % types.length];
	cardsRoot.appendChild(makeCard(t));
  }
  $('#btnCardsReset').disabled = false;
}

// Drop targets: grade e núcleo
;[cardsRoot, nucleusZone].forEach(zone => {
  zone.addEventListener('dragover', (ev) => ev.preventDefault());
  zone.addEventListener('drop', (ev) => {
	ev.preventDefault();
	const id = ev.dataTransfer.getData('text/plain');
	const card = document.querySelector(`.card[data-id="${id}"]`);
	if (card) zone.appendChild(card);
	updateNucleusStats();
  });
});

function countIn(container) {
  const cards = container.querySelectorAll('.card');
  let p=0,n=0,e=0;
  cards.forEach(c => {
	if (c.dataset.type === 'proton') p++;
	else if (c.dataset.type === 'neutron') n++;
	else if (c.dataset.type === 'electron') e++;
  });
  return {p,n,e};
}

function updateNucleusStats() {
  const {p,n,e} = countIn(nucleusZone);
  const charge = p - e;
  let range = null, status='—', cls='warn';
  if (p > 0) {
	const min = Math.floor(1.2*p - 2);
	const max = Math.ceil(1.2*p + 2);
	range = `${min}…${max}`;
	if (n >= min && n <= max) { status='OK'; cls='ok'; }
	else if (Math.abs(n - 1.2*p) <= 4) { status='Limite'; cls='warn'; }
	else { status='Instável'; cls='bad'; }
  }
  nucleusStats.innerHTML = `
	<span class="badge">p⁺: ${p}</span>
	<span class="badge">n⁰: ${n}</span>
	<span class="badge">e⁻: ${e}</span>
	<span class="badge">Carga: ${charge>=0? '+'+charge : charge}</span>
	<span class="badge">Faixa n≈1.2×p±2: ${range ?? '—'}</span>
	<span class="badge ${cls}">${status}</span>
  `;
}

$('#btnCardsGen').addEventListener('click', () => { populateCards(); updateNucleusStats(); }); // gerar [web:81]
$('#btnCardsReset').addEventListener('click', () => {
  cardsRoot.innerHTML=''; nucleusZone.innerHTML=''; updateNucleusStats();
  $('#btnCardsReset').disabled = true;
}); // reset [web:81]

// Inicializações
populateCards(); updateNucleusStats(); // cartas e stats iniciais [web:81]
