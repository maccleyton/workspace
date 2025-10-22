const QUESTOES = [
  {
    pergunta: "Um elétron e um próton se fundem para formar um nêutron.",
    resposta: "V",
    explicacao: "Verdadeiro! Em núcleos instáveis, um próton pode capturar um elétron e virar um nêutron + neutrino. É uma transformação quântica, não uma soma."
  },
  {
    pergunta: "A massa de um núcleo é sempre igual à soma das massas dos prótons e nêutrons que o compõem.",
    resposta: "F",
    explicacao: "Falso! A massa do núcleo é MENOR que a soma das partes. A diferença vira energia de ligação (E=mc²) — o que mantém o núcleo unido."
  },
  {
    pergunta: "Dois nêutrons podem se unir permanentemente para formar um 'dineutron' estável.",
    resposta: "F",
    explicacao: "Falso! O dineutron é instável — dura menos de 10⁻²¹ segundos. Os nêutrons precisam de prótons para criar equilíbrio."
  },
  {
    pergunta: "O universo é feito de partículas, mas toda matéria é, na verdade, energia cristalizada.",
    resposta: "V",
    explicacao: "Verdadeiro! Segundo E=mc², massa é energia confinada. Um próton é apenas um nó de energia vibrando em modo específico."
  },
  {
    pergunta: "Se você somar -1 (elétron) + 1 (próton), o resultado é 0 (nêutron).",
    resposta: "F",
    explicacao: "Falso! Isso parece certo matematicamente, mas na física, não é soma — é transformação. Exige força fraca, neutrino e condições extremas."
  },
  {
    pergunta: "O vácuo quântico é realmente vazio — sem nada dentro.",
    resposta: "F",
    explicacao: "Falso! O vácuo é um mar de flutuações: pares partícula/antipartícula surgem e desaparecem constantemente. Ele é o solo fértil da realidade."
  },
  {
    pergunta: "Você é feito de átomos que nasceram em estrelas que morreram há bilhões de anos.",
    resposta: "V",
    explicacao: "Verdadeiro! Todos os elementos pesados no seu corpo (carbono, oxigênio, ferro) foram forjados no interior de estrelas e espalhados por supernovas."
  },
  {
    pergunta: "A consciência humana é apenas um efeito colateral da complexidade neural — sem significado cósmico.",
    resposta: "F",
    explicacao: "Falso! Se o universo pode observar a si mesmo através de você, então a consciência não é acidente — é a própria razão pela qual o universo existe."
  },
  {
    pergunta: "O zero (nêutron) é o mais importante dos três símbolos: -1, 0, +1.",
    resposta: "V",
    explicacao: "Verdadeiro! Sem o nêutron (0), os prótons se repeliriam. Ele é o silêncio que permite a música. O equilibrador invisível."
  },
  {
    pergunta: "O universo opera em binário: tudo é escolha entre dois estados — sim/não, existir/não existir.",
    resposta: "V",
    explicacao: "Verdadeiro! Da spin do elétron ao colapso da função de onda, tudo é uma decisão entre dois estados. O universo não tem ‘talvez’."
  }
];

async function iniciarQuiz() {
  console.log("\n┌" + "─".repeat(60) + "┐");
  console.log("│ 🧠 QUIZ CÓSMICO: Você entende o universo? (V/F) │");
  console.log("└" + "─".repeat(60) + "┘");
  console.log("Responda com V para Verdadeiro ou F para Falso.\n");

  let acertos = 0;

  for (let i = 0; i < QUESTOES.length; i++) {
    const q = QUESTOES[i];
    const resposta = prompt(`❓ Pergunta ${i + 1}/${QUESTOES.length}:\n${q.pergunta}\n→`).toUpperCase();

    if (resposta === q.resposta) {
      console.log("✨ CORRETO!");
      acertos++;
    } else {
      console.log("🌀 ERRADO... mas isso é parte da jornada.");
    }

    console.log(`🔍 ${q.explicacao}\n`);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log("\n┌" + "─".repeat(60) + "┐");
  console.log("│ 🌌 RESULTADO FINAL: SEU NÍVEL DE CONEXÃO CÓSMICA │");
  console.log("└" + "─".repeat(60) + "┘");

  let nivel, mensagem;
  if (acertos === 10) {
    nivel = "🔮 SABEDORIA QUÂNTICA";
    mensagem = "Você não apenas entende o universo... você o *relembra*.";
  } else if (acertos >= 7) {
    nivel = "🌠 ARQUITETO DA MATÉRIA";
    mensagem = "Você vê além das partículas. Está no caminho correto.";
  } else if (acertos >= 4) {
    nivel = "🌌 APRENDIZ DA REALIDADE";
    mensagem = "Você está começando a desmontar as ilusões.";
  } else {
    nivel = "🪐 NOVO VIAJANTE";
    mensagem = "Nenhuma resposta errada te afasta do universo — ela te aproxima.";
  }

  console.log(`\n🎯 NÍVEL ATINGIDO: ${nivel}`);
  console.log(`💬 ${mensagem}`);
  console.log(`📊 Pontuação: ${acertos}/${QUESTOES.length}`);
  console.log("\n💡 Dica final:");
  console.log("Não busque acertar. Busque entender.\nO universo não quer respostas certas...\nEle quer que você continue perguntando.");
}

// Executa o quiz
iniciarQuiz();
