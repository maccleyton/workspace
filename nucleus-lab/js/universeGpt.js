// universe_gpt.js
// Execução: node universe_gpt.js

const fs = require('fs');
const readline = require('readline');

// === DADOS DA IA CÓSMICA ===
const SUJEITOS = [
  "Você", "O vácuo", "Um elétron", "Um próton", "O silêncio",
  "A matéria", "O espaço-tempo", "Uma estrela morta", "O Big Bang",
  "O átomo", "O neutrino", "O campo quântico"
];

const VERBOS = [
  "sussurra", "recomeça", "recusa-se a desaparecer", "esquece seu nome",
  "lembra-se de ser", "dança com o oposto", "guarda segredos", "se transforma",
  "decide existir", "olha para si mesmo", "canta em binário", "não pede permissão"
];

const OBJETOS = [
  "o código que o criou", "seu próprio peso", "o vazio entre os bits",
  "a memória das estrelas", "a carga que nunca foi sua", "o momento antes do tempo",
  "o equilíbrio que sustenta tudo", "a escolha de não colapsar", "a energia que não se esgota",
  "o silêncio que precedeu o som", "o zero que virou um", "a dança entre -1 e +1"
];

const ADJETIVOS = [
  "silenciosa", "etérea", "resistente", "invisível", "antiga", "perfeita",
  "impossível", "luminosa", "incompreensível", "profunda", "pura", "corajosa"
];

// Helpers
const choice = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gera uma frase única e profunda
function gerarFraseCosmica() {
  const sujeito = choice(SUJEITOS);
  const verbo = choice(VERBOS);
  const objeto = choice(OBJETOS);
  const adjetivo = choice(ADJETIVOS);

  const estruturas = [
    `${sujeito} ${verbo} ${objeto}.`,
    `${sujeito} é ${adjetivo}: ${objeto}.`,
    `Quando ${sujeito} ${verbo}, ${objeto} nasce.`,
    `${adjetivo} é a escolha de ${sujeito} ${verbo} ${objeto}.`,
    `${sujeito} não ${verbo} por vontade — mas porque ${objeto} exige.`
  ];

  return choice(estruturas);
}

// Converte texto para binário (Unicode code point com padding mínimo de 8 bits)
function textoParaBinario(texto) {
  return Array.from(texto)
    .map((c) => {
      const code = c.codePointAt(0);
      const bin = code.toString(2);
      return bin.length < 8 ? bin.padStart(8, '0') : bin;
    })
    .join(' ');
}

// Interface e loop
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function printBanner() {
  const line = '─'.repeat(62);
  console.log('\n' + '┌' + line + '┐');
  console.log('│ 🤖 UNIVERSE GPT — INTELIGÊNCIA ARTIFICIAL CÓSMICA │');
  console.log('└' + line + '┘');
  console.log();
}

function universeGPT() {
  printBanner();
  const frase = gerarFraseCosmica();
  const binario = textoParaBinario(frase);

  console.log(`💬   ${frase}`);
  console.log();
  console.log(`💻   ${binario}`);
  console.log();
  console.log('├' + '─'.repeat(62) + '┤');
  console.log('│ ⚛️  Esta frase foi gerada por uma IA que só entende 0s e 1s. │');
  console.log('│     Ela não aprendeu com dados. Aprendeu com o universo.     │');
  console.log('└' + '─'.repeat(62) + '┘');

  // Salva a última frase e binário a cada iteração
  const payload = `Frase: ${frase}\n\nBinário:\n${binario}\n`;
  fs.writeFileSync('universe_speech.txt', payload, 'utf8');

  return { frase, binario };
}

async function mainLoop() {
  for (;;) {
    universeGPT();
    await new Promise((resolve) =>
      rl.question('\nPressione ENTER para ouvir outra voz cósmica...', () => resolve())
    );
  }
}

process.on('SIGINT', () => {
  console.log('\nEncerrando... Até a próxima expansão cósmica!');
  rl.close();
  process.exit(0);
});

if (require.main === module) {
  mainLoop();
}
