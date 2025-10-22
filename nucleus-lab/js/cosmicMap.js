// gerar_mapa_cosmico.js
// Requer: npm i canvas
const fs = require('fs');
const { createCanvas /*, registerFont*/ } = require('canvas');

// Se desejar usar uma fonte TTF local, descomente e ajuste:
// registerFont('JetBrainsMono-Regular.ttf', { family: 'JetBrainsMono' }); // [Opcional]

// Canvas grande para alta definição (aprox. 600 DPI sobre ~10 in)
const WIDTH = 6000;
const HEIGHT = 6000;
const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// Mundo lógico para mapeamento (x: [-16,16], y: [-18,16]) para acomodar textos fora do quadro
const XMIN = -16, XMAX = 16;
const YMIN = -18, YMAX = 16;

// Funções de mapeamento mundo->canvas
const mapX = (x) => ((x - XMIN) / (XMAX - XMIN)) * WIDTH;
const mapY = (y) => (HEIGHT - ((y - YMIN) / (YMAX - YMIN)) * HEIGHT);

// Desenho de círculo em coordenadas do mundo
function drawCircleWorld(cx, cy, r, fill, stroke, lineWidth = 1, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(mapX(cx), mapY(cy), (r / (XMAX - XMIN)) * WIDTH, 0, Math.PI * 2);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  ctx.restore();
}

// Desenho de linha em coordenadas do mundo
function drawLineWorld(x1, y1, x2, y2, color, lineWidth = 1, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(mapX(x1), mapY(y1));
  ctx.lineTo(mapX(x2), mapY(y2));
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.restore();
}

// Texto em coordenadas do mundo
function drawTextWorld(text, x, y, options = {}) {
  const {
    font = '16px sans-serif',
    color = '#FFFFFF',
    align = 'center',
    baseline = 'alphabetic',
    alpha = 1,
    maxWidth = undefined,
  } = options;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  const cx = mapX(x);
  const cy = mapY(y);
  if (maxWidth !== undefined) {
    ctx.fillText(text, cx, cy, maxWidth);
  } else {
    ctx.fillText(text, cx, cy);
  }
  ctx.restore();
}

// Desenhar estrela de 5 pontas
function drawStarWorld(cx, cy, spikes = 5, outerR = 1, innerR = 0.5, fill = '#FFD700', stroke = '#FF9800', lineWidth = 2, alpha = 1) {
  const step = Math.PI / spikes;
  let rot = -Math.PI / 2;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  for (let i = 0; i < spikes; i++) {
    const xOuter = cx + Math.cos(rot) * outerR;
    const yOuter = cy + Math.sin(rot) * outerR;
    if (i === 0) {
      ctx.moveTo(mapX(xOuter), mapY(yOuter));
    } else {
      ctx.lineTo(mapX(xOuter), mapY(yOuter));
    }
    rot += step;
    const xInner = cx + Math.cos(rot) * innerR;
    const yInner = cy + Math.sin(rot) * innerR;
    ctx.lineTo(mapX(xInner), mapY(yInner));
    rot += step;
  }
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
  ctx.restore();
}

// Fundo preto
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Dados Z 1..118
const Z = Array.from({ length: 118 }, (_, i) => i + 1);

// Espiral
const theta = Z.map(z => z * 0.05);
const r = Z.map(z => Math.log(z) * 3.5);

// Fundo: partículas binárias
for (let k = 0; k < 150; k++) {
  const x = Math.random() * (15 - (-15)) + (-15);
  const y = Math.random() * (15 - (-15)) + (-15);
  const alpha = Math.random() * (0.15 - 0.05) + 0.05;

  drawTextWorld('0', x, y, {
    font: '6px sans-serif',
    color: '#00FFFF',
    align: 'center',
    baseline: 'middle',
    alpha,
  });

  drawTextWorld('1', x + 0.2, y + 0.2, {
    font: '5px sans-serif',
    color: '#00FFFF',
    align: 'center',
    baseline: 'middle',
    alpha,
  });
}

// Desenho dos pontos na espiral
for (let i = 0; i < Z.length; i++) {
  const z = Z[i];
  const x = r[i] * Math.cos(theta[i]);
  const y = r[i] * Math.sin(theta[i]);

  // Próton = dourado
  const color = '#FFD700';
  const size = 4 + (z / 118) * 8; // ponto em pixels, convertido para raio em mundo
  const pxRadius = size / 2;
  const worldRadius = pxRadius / WIDTH * (XMAX - XMIN);

  drawCircleWorld(x, y, worldRadius, color, null, 0, 0.9);

  // Linhas de nêutrons (sutil)
  if (z > 1 && z % 2 === 0 && z < 100) {
    const xPrev = r[i - 1] * Math.cos(theta[i - 1]);
    const yPrev = r[i - 1] * Math.sin(theta[i - 1]);
    drawLineWorld(x, y, xPrev, yPrev, '#1A1A1A', 0.6, 0.2);
  }

  // Raios de elétrons para metais alcalinos
  if ([3, 11, 19, 37, 55, 87].includes(z)) {
    const rayR = 0.8;
    const steps = 8;
    for (let t = 0; t < steps; t++) {
      const angle = (t / steps) * Math.PI * 2;
      const x2 = x + rayR * Math.cos(angle);
      const y2 = y + rayR * Math.sin(angle);
      drawLineWorld(x, y, x2, y2, '#00FFFF', 0.8, 0.4);
    }
  }
}

// Destaque: Oganessôn (118)
const zOg = 118;
const iOg = zOg - 1;
const xOg = r[iOg] * Math.cos(theta[iOg]);
const yOg = r[iOg] * Math.sin(theta[iOg]);

// Halo suave
drawCircleWorld(xOg, yOg, 1.2, '#FFF9C4', null, 0, 0.9);
// Estrela dourada
drawStarWorld(xOg, yOg, 5, 1.0, 0.45, '#FFD700', '#FF9800', 3, 1.0);

// Símbolos finais (canto inferior direito)
drawTextWorld('[-1]', 12, -12, {
  font: 'bold 18px sans-serif',
  color: '#00FFFF',
  align: 'center',
  baseline: 'middle',
});
drawTextWorld('[0]', 12, -13.5, {
  font: 'bold 18px sans-serif',
  color: '#AAAAAA',
  align: 'center',
  baseline: 'middle',
});
drawTextWorld('[+1]', 12, -15, {
  font: 'bold 18px sans-serif',
  color: '#FFD700',
  align: 'center',
  baseline: 'middle',
});

// Texto poético
drawTextWorld('Cada ponto é uma escolha.\nCada linha, um equilíbrio.\nCada luz, uma memória.', 0, -17, {
  font: 'italic 9px sans-serif',
  color: '#FFFFFF',
  align: 'center',
  baseline: 'middle',
  alpha: 0.7,
});

// Título central
drawTextWorld('O MAPA CÓSMICO DOS ELEMENTOS', 0, 14, {
  font: 'bold 24px sans-serif',
  color: '#FFFFFF',
  align: 'center',
  baseline: 'middle',
  alpha: 0.9,
});

// Salvar PNG
const out = fs.createWriteStream('Mapa_Cosmico_Digital.png');
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => {
  console.log('🎨 QUADRO CÓSMICO GERADO! Salvo como: Mapa_Cosmico_Digital.png');
});
