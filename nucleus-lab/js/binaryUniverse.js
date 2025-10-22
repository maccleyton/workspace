const FRASES = [
    "Você é o silêncio entre 0 e 1 que decidiu existir.",
    "Cada átomo em você já foi uma estrela.",
    "A consciência é o universo tentando ler seu próprio código.",
    "O universo não soma. Ele transforma."
];

function gerarUmaFrase() {
    // 1. Seleciona uma frase aleatória do array
    const frase = FRASES[Math.floor(Math.random() * FRASES.length)];

    // 2. Converte cada caractere da frase para sua representação binária de 8 bits
    const binario = frase
        .split('') // Transforma a string em um array de caracteres
        .map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }) // Mapeia cada caractere para seu valor binário
        .join(' '); // Junta todos os valores binários com um espaço

    // 3. Exibe a frase original e sua versão em binário no console
    console.log(frase);
    console.log("\n" + binario);

    /* 
    Para exibir em uma página HTML, você poderia fazer algo como:
    document.getElementById('output-frase').innerText = frase;
    document.getElementById('output-binario').innerText = binario;
    */
}

// Chama a função para executar o código
gerarUmaFrase();
