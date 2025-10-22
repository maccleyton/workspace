// quiz_cosmico.js
// Execução: node quiz_cosmico.js

const readline = require('readline');

// === DADOS DO QUIZ ===
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
    explicacao: "Falso! O vácuo é um mar de flutuações: pares partícula/antipartícula surgem e desaparecem constantemente."
  },
  {
    pergunta: "Você é feito de átomos que nasceram em estrelas que morreram há bilhões de anos.",
    resposta: "V",
    explicacao: "Verdadeiro! Elementos pesados (C, O, Fe) foram forjados em estrelas e espalhados por supernovas."
  },
  {
    pergunta: "A consciência humana é apenas um efeito colateral da complexidade neural — sem significado cósmico.",
    resposta: "F",
    explicacao: "Falso! Se o universo pode observar a si mesmo através de você, então a consciência é central — não um acidente."
  },
  {
    pergunta: "O zero (nêutron) é o mais importante dos três símbolos: -1, 0, +1.",
    resposta: "V",
    explicacao: "Verdadeiro! Sem nêutrons, prótons se repeliriam; o nêutron é o equilibrador invisível."
  },
  {
    pergunta: "O universo opera em binário: tudo é escolha entre dois estados — sim/não, existir/não existir.",
    resposta: "V",
    explicacao: "Verdadeiro! Muitos fenômenos podem ser vistos como escolhas discretas entre estados, do spin ao colapso de onda."
  }
];

// Utilitário: sleep por Promise
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// readline com pergunta promisificada
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (q) => new Promise((resolve) => rl.question(q, resolve));

function banner() {
  console.log('\n' + '┌' + '─'.repeat(60) + '┐');
  console.log('│ 🧠 QUIZ CÓSMICO: Você entende o universo? (V/F) │');
  console.log('└' + '─'.repeat(60) + '┘');
  console.log('Responda com V para Verdadeiro ou F para Falso.');
  console.log('Pressione ENTER após cada resposta.\n');
}

async function iniciarQuiz() {
  banner();
  await sleep(2000);

  let acertos = 0;
  const total = QUESTOES.length;

  for (let i = 0; i < total; i++) {
    const q = QUESTOES[i];
    console.log(`\n❓ Pergunta ${i + 1}/${total}: ${q.pergunta}`);
    const resp = (await question('→ ')).trim().toUpperCase();

    if (resp === q.resposta) {
      console.log('✨ CORRETO!');
      acertos += 1;
    } else {
      console.log('🌀 ERRADO... mas isso é parte da jornada.');
    }

    console.log(`   🔍 ${q.explicacao}`);
    await sleep(3000);
  }

  console.log('\n' + '┌' + '─'.repeat(60) + '┐');
  console.log('│ 🌌 RESULTADO FINAL: SEU NÍVEL DE CONEXÃO CÓSMICA │');
  console.log('└' + '─'.repeat(60) + '┘');

  let nivel, mensagem;
  if (acertos === 10) {
    nivel = '🔮 SABEDORIA QUÂNTICA';
    mensagem = 'Você não apenas entende o universo... você o relembra.\nVocê é o universo observando a si mesmo.';
  } else if (acertos >= 7) {
    nivel = '🌠 ARQUITETO DA MATÉRIA';
    mensagem = 'Você vê além das partículas; entende que o silêncio (0) sustenta o som (+1 e -1).';
  } else if (acertos >= 4) {
    nivel = '🌌 APRENDIZ DA REALIDADE';
    mensagem = 'Você começou a desmontar ilusões — respostas contraintuitivas fazem parte da caminhada.';
  } else {
    nivel = '🪐 NOVO VIAJANTE';
    mensagem = 'Não é sobre acertos; é sobre perguntas — e você já começou a boa jornada.';
  }

  console.log(`\n🎯 NÍVEL ATINGIDO: ${nivel}`);
  console.log(`\n💬 ${mensagem}`);
  console.log(`\n📊 Pontuação: ${acertos}/${total}`);

  console.log('\n💡 Dica final:');
  console.log('Não busque acertar. Busque entender.\nO universo não quer respostas certas...\nEle quer que você continue perguntando.');

  rl.close();
}

process.on('SIGINT', () => {
  console.log('\nEncerrando… Até a próxima jornada cósmica!');
  rl.close();
  process.exit(0);
});

if (require.main === module) {
  iniciarQuiz();
}
