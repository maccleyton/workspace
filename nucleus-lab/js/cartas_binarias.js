import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Função principal
async function gerarPdfCartas() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 em pontos (72 dpi)
  const { width, height } = page.getSize();

  const margin = 28.35; // 1 cm
  const cardW = 170.08; // 6 cm
  const cardH = 255.12; // 9 cm
  const cols = 3;
  const rows = 2;
  const padding = 14.17; // 0.5 cm

  const cartas = [
    ["Elétron", "[-1]", "Eu não tenho peso… mas movo mundos."],
    ["Próton", "[+1]", "Sou o nome que o universo me deu."],
    ["Nêutron", "[0]", "Não falo. Mas seguro tudo."],
  ].flatMap(carta => Array(12).fill(carta)); // 36 cartas

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Renderizar cartas
  cartas.forEach((carta, i) => {
    const [nome, simbolo, texto] = carta;
    const col = i % cols;
    const row = Math.floor(i / cols) % rows;
    const pageIndex = Math.floor(i / (cols * rows));

    if (i > 0 && i % (cols * rows) === 0) {
      pdfDoc.addPage([595.28, 841.89]);
    }

    const x = margin + col * (cardW + padding);
    const y = height - margin - (row + 1) * (cardH + padding);

    const currentPage = pdfDoc.getPage(pageIndex);

    // Fundo preto
    currentPage.drawRectangle({
      x, y, width: cardW, height: cardH,
      color: rgb(0, 0, 0),
    });

    // Símbolo central
    currentPage.drawText(simbolo, {
      x: x + cardW / 2 - 40,
      y: y + cardH / 2,
      size: 32,
      font,
      color: rgb(1, 1, 1),
    });

    // Nome
    currentPage.drawText(nome, {
      x: x + cardW / 2 - 30,
      y: y + 30,
      size: 10,
      font,
      color: rgb(0.9, 0.83, 0.66), // dourado suave
    });

    // Texto poético
    currentPage.drawText(texto, {
      x: x + 10,
      y: y + 10,
      size: 7,
      font,
      color: rgb(0.75, 0.75, 0.75),
    });

    // Verso binário
    if ((i + 1) % (cols * rows) === 0) {
      currentPage.drawText("01000010 01101001 01101110 01100001 01110010 01101001 01101111", {
        x: width / 2 - 100,
        y: margin + 10,
        size: 5,
        font,
        color: rgb(0, 1, 1),
      });
    }
  });

  // Exportar PDF
  const pdfBytes = await pdfDoc.save();
  downloadPdf(pdfBytes, "Fusao_Cosmica_Cartas.pdf");
}

function downloadPdf(bytes, filename) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}