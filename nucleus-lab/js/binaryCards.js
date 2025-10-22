// gerar_pdf_cartas.js
// Requer: npm i pdfkit
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Conversão: 1 cm = 28.3464567 pt
const cmToPt = (cm) => cm * 28.3464566929;

// Fonte opcional JetBrainsMono (fallback para Helvetica/Courier)
const JBM_TTF = 'JetBrainsMono-Regular.ttf';

// Cores
const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldSoft: '#E6D3A8',
  lightGrey: '#D3D3D3',
  cyan: '#00FFFF',
};

function gerarPdfCartas() {
  const doc = new PDFDocument({ size: 'A4', margin: 0 });

  // Saída do arquivo
  const outputFile = 'Fusao_Cosmica_Cartas.pdf';
  doc.pipe(fs.createWriteStream(outputFile));

  // Tenta registrar JetBrainsMono
  let hasJet = false;
  try {
    if (fs.existsSync(JBM_TTF)) {
      doc.registerFont('JetBrainsMono', JBM_TTF);
      hasJet = true;
    }
  } catch (_) {
    // ignora
  }

  const A4_W = doc.page.width;
  const A4_H = doc.page.height;

  // Layout
  const margem = cmToPt(1);
  const card_w = cmToPt(6);
  const card_h = cmToPt(9);
  const cols = 3;
  const rows = 2;
  const padding = cmToPt(0.5);

  // Cartas
  const baseCartas = [
    ['Elétron', '[-1]', 'Eu não tenho peso… mas movo mundos.'],
    ['Próton', '[+1]', 'Sou o nome que o universo me deu.'],
    ['Nêutron', '[0]', 'Não falo. Mas seguro tudo.'],
  ];
  const cartas = Array.from({ length: 12 }, () => baseCartas).flat();

  // Página inicial: configurações base
  doc.font('Helvetica').fontSize(8).fillColor(COLORS.black);

  // Renderização das cartas 3x2 por página
  for (let i = 0; i < cartas.length; i++) {
    const [nome, simbolo, texto] = cartas[i];
    const col = i % cols;
    const row = Math.floor(i / cols) % rows;

    if (i > 0 && i % (cols * rows) === 0) {
      doc.addPage();
      doc.font('Helvetica').fontSize(8).fillColor(COLORS.black);
    }

    const x = margem + col * (card_w + padding);
    const y = A4_H - margem - (row + 1) * (card_h + padding);

    // Fundo da carta (preto)
    doc.save();
    doc.fillColor(COLORS.black).rect(x, y, card_w, card_h).fill();
    doc.restore();

    // Símbolo central (branco)
    doc
      .font('Helvetica-Bold')
      .fontSize(32)
      .fillColor(COLORS.white)
      .text(simbolo, x, y + card_h / 2 - cmToPt(0.5), { width: card_w, align: 'center' });

    // Nome abaixo (dourado suave)
    doc
      .font(hasJet ? 'JetBrainsMono' : 'Helvetica')
      .fontSize(10)
      .fillColor(COLORS.goldSoft)
      .text(nome, x, y + cmToPt(1.2), { width: card_w, align: 'center' });

    // Texto poético na borda inferior (cinza claro)
    doc
      .font('Helvetica-Oblique')
      .fontSize(7)
      .fillColor(COLORS.lightGrey)
      .text(texto, x + cmToPt(0.3), y + cmToPt(0.2), {
        width: card_w - cmToPt(0.6),
        lineBreak: false,
      });

    // Verso padrão (binário) — última carta de cada página
    if ((i + 1) % (cols * rows) === 0) {
      const binario = '01000010 01101001 01101110 01100001 01110010 01101001 01101111';
      doc
        .font('Helvetica')
        .fontSize(5)
        .fillColor(COLORS.cyan)
        .text(binario, 0, A4_H - (margem + cmToPt(0.3)), {
          width: A4_W,
          align: 'center',
        });
    }
  }

  // Página 7: Tabela de Elementos Estáveis
  doc.addPage();

  // Título (branco)
  doc
    .font('Helvetica-Bold')
    .fontSize(16)
    .fillColor(COLORS.white)
    .text('TABELA DE ELEMENTOS ESTÁVEIS', 0, 50, { width: A4_W, align: 'center' });

  // Linhas (volta para preto para garantir legibilidade)
  doc.font(hasJet ? 'JetBrainsMono' : 'Helvetica').fontSize(10).fillColor(COLORS.black);

  const dados = [
    ['Hidrogênio-1', '1', '0', '5'],
    ['Hélio-4', '2', '2', '10'],
    ['Carbono-12', '6', '6', '20'],
    ['Oxigênio-16', '8', '8', '25'],
    ['Ferro-56', '26', '30', '50'],
    ['Urânio-238', '92', '146', '70'],
    ['Oganessôn-294', '118', '176', '80'],
  ];

  let yTab = A4_H - 100;
  for (const [elem, p, n, pts] of dados) {
    doc.text(`${elem}`, margem, yTab);
    doc.text(`p⁺: ${p}`, margem + cmToPt(4), yTab);
    doc.text(`n⁰: ${n}`, margem + cmToPt(7), yTab);
    doc.text(`Pontos: ${pts}`, margem + cmToPt(10), yTab);
    yTab -= 15;
  }

  // Página 8: Regras
  doc.addPage();
  doc.font('Helvetica-Bold').fontSize(16).fillColor(COLORS.black);
  doc.text('REGRAS DO JOGO', 0, 50, { width: A4_W, align: 'center' });

  doc.font(hasJet ? 'JetBrainsMono' : 'Helvetica').fontSize(10).fillColor(COLORS.black);
  const regras = [
    '• Objetivo: Construir núcleos estáveis combinando prótons (+1), elétrons (-1) e nêutrons (0).',
    '• Cada jogador começa com 5 cartas.',
    '• Para formar um núcleo: soma das cargas = número atômico. Nêutrons devem estar dentro da faixa de estabilidade.',
    '• Faixa segura: n ≈ 1.2 × p ± 2',
    '• Fazer Oganessôn-294? Ganha 80 pontos — e seu nome entra na história.',
    '• Se a carga for desequilibrada → colapso! Perca 10 pontos.',
    '• Use o modo Solitário: tente construir o maior núcleo possível com 10 cartas.',
    '• Vence quem tiver mais pontos ao fim do jogo.',
    '',
    '💡 Este não é um jogo de acertos. É um ritual de compreensão.',
  ];

  let yReg = A4_H - 100;
  for (const r of regras) {
    doc.text(r, margem, yReg);
    yReg -= 12;
  }

  // Finaliza
  doc.end();
  console.log('✅ PDF GERADO COM SUCESSO!');
  console.log(`📁 Arquivo salvo como: ${outputFile}`);
}

// Executa
if (require.main === module) {
  gerarPdfCartas();
}
