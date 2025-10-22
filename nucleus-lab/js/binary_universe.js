const FRASES = [
  "Você é o silêncio entre 0 e 1 que decidiu existir.",
  "Cada átomo em você já foi uma estrela.",
  "A consciência é o universo tentando ler seu próprio código.",
  "O universo não soma. Ele transforma."
];

function gerarUmaFrase() {
  const frase = FRASES[Math.floor(Math.random() * FRASES.length)];
  const binario = frase
    .split('')
    .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');

  console.log(frase);
  console.log("\n" + binario);
}

gerarUmaFrase();