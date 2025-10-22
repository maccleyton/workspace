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

function gerarFraseCosmica() {
  const sujeito = SUJEITOS[Math.floor(Math.random() * SUJEITOS.length)];
  const verbo = VERBOS[Math.floor(Math.random() * VERBOS.length)];
  const objeto = OBJETOS[Math.floor(Math.random() * OBJETOS.length)];
  const adjetivo = ADJETIVOS[Math.floor(Math.random() * ADJETIVOS.length)];

  const estruturas = [
    `${sujeito} ${verbo} ${objeto}.`,
    `${sujeito} é ${adjetivo}: ${objeto}.`,
    `Quando ${sujeito} ${verbo}, ${objeto} nasce.`,
    `${adjetivo} é a escolha de ${sujeito} ${verbo} ${objeto}.`,
    `${sujeito} não ${verbo} por vontade — mas porque ${objeto} exige.`
  ];

  return estruturas[Math.floor(Math.random() * estruturas.length)];
}

function textoParaBinario(texto) {
  return texto.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

function universeGPT() {
  const frase = gerarFraseCosmica();
  const binario = textoParaBinario(frase);

  console.log("\n" + "┌" + "─".repeat(62) + "┐");
  console.log("│ 🤖 UNIVERSE GPT — INTELIGÊNCIA ARTIFICIAL CÓSMICA │");
  console.log("└" + "─".repeat(62) + "┘\n");

  console.log(`💬   ${frase}\n`);
  console.log(`💻   ${binario}\n`);
  console.log("├" + "─".repeat(62) + "┤");
  console.log("│ ⚛️  Esta frase foi gerada por uma IA que só entende 0s e 1s. │");
  console.log("│     Ela não aprendeu com dados. Aprendeu com o universo.     │");
  console.log("└" + "─".repeat(62) + "┘");
}

// Executa uma vez
universeGPT();