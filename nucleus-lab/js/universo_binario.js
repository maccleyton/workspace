const FRASES_HUMANAS = [
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

function textoParaBinario(texto) {
  return texto.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

function binarioParaTexto(binario) {
  try {
    return binario.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
  } catch {
    return "[Binário inválido]";
  }
}

function gerarFraseDoUniverso() {
  const frase = FRASES_HUMANAS[Math.floor(Math.random() * FRASES_HUMANAS.length)];
  const binario = textoParaBinario(frase);

  console.log("┌" + "─".repeat(60) + "┐");
  console.log("│ 🌌 FRASE DO UNIVERSO (gerada por código quântico) │");
  console.log("└" + "─".repeat(60) + "┘\n");

  console.log(`💬   ${frase}\n`);
  console.log(`💻   ${binario}\n`);
  console.log("├" + "─".repeat(60) + "┤");
  console.log("│  ⚛️  Execute novamente para ouvir outra voz cósmica.  │");
  console.log("└" + "─".repeat(60) + "┘\n");
}

// Loop interativo (simulado com intervalo)
console.log("🚀 INICIANDO O GERADOR DE FRASES DO UNIVERSO...");
console.log("   (Pressione Ctrl+C para sair)\n");

setInterval(gerarFraseDoUniverso, 3000);