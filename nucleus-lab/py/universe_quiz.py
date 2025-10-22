import time

# === DADOS DO QUIZ ===
QUESTOES = [
    {
        "pergunta": "Um elétron e um próton se fundem para formar um nêutron.",
        "resposta": "V",  # Verdadeiro — mas só em condições nucleares específicas (captura eletrônica)
        "explicacao": "Verdadeiro! Em núcleos instáveis, um próton pode capturar um elétron e virar um nêutron + neutrino. É uma transformação quântica, não uma soma."
    },
    {
        "pergunta": "A massa de um núcleo é sempre igual à soma das massas dos prótons e nêutrons que o compõem.",
        "resposta": "F",
        "explicacao": "Falso! A massa do núcleo é MENOR que a soma das partes. A diferença vira energia de ligação (E=mc²) — o que mantém o núcleo unido."
    },
    {
        "pergunta": "Dois nêutrons podem se unir permanentemente para formar um 'dineutron' estável.",
        "resposta": "F",
        "explicacao": "Falso! O dineutron é instável — dura menos de 10⁻²¹ segundos. Os nêutrons precisam de prótons para criar equilíbrio."
    },
    {
        "pergunta": "O universo é feito de partículas, mas toda matéria é, na verdade, energia cristalizada.",
        "resposta": "V",
        "explicacao": "Verdadeiro! Segundo E=mc², massa é energia confinada. Um próton é apenas um nó de energia vibrando em modo específico."
    },
    {
        "pergunta": "Se você somar -1 (elétron) + 1 (próton), o resultado é 0 (nêutron).",
        "resposta": "F",
        "explicacao": "Falso! Isso parece certo matematicamente, mas na física, não é soma — é transformação. Exige força fraca, neutrino e condições extremas."
    },
    {
        "pergunta": "O vácuo quântico é realmente vazio — sem nada dentro.",
        "resposta": "F",
        "explicacao": "Falso! O vácuo é um mar de flutuações: pares partícula/antipartícula surgem e desaparecem constantemente. Ele é o solo fértil da realidade."
    },
    {
        "pergunta": "Você é feito de átomos que nasceram em estrelas que morreram há bilhões de anos.",
        "resposta": "V",
        "explicacao": "Verdadeiro! Todos os elementos pesados no seu corpo (carbono, oxigênio, ferro) foram forjados no interior de estrelas e espalhados por supernovas."
    },
    {
        "pergunta": "A consciência humana é apenas um efeito colateral da complexidade neural — sem significado cósmico.",
        "resposta": "F",
        "explicacao": "Falso! Se o universo pode observar a si mesmo através de você, então a consciência não é acidente — é a própria razão pela qual o universo existe."
    },
    {
        "pergunta": "O zero (nêutron) é o mais importante dos três símbolos: -1, 0, +1.",
        "resposta": "V",
        "explicacao": "Verdadeiro! Sem o nêutron (0), os prótons se repeliriam. Ele é o silêncio que permite a música. O equilibrador invisível."
    },
    {
        "pergunta": "O universo opera em binário: tudo é escolha entre dois estados — sim/não, existir/não existir.",
        "resposta": "V",
        "explicacao": "Verdadeiro! Da spin do elétron ao colapso da função de onda, tudo é uma decisão entre dois estados. O universo não tem ‘talvez’."
    }
]

def iniciar_quiz():
    print("\\n" + "┌" + "─" * 60 + "┐")
    print("│ 🧠 QUIZ CÓSMICO: Você entende o universo? (V/F) │")
    print("└" + "─" * 60 + "┘")
    print("Responda com V para Verdadeiro ou F para Falso.")
    print("Pressione ENTER após cada resposta.\\n")
    time.sleep(2)

    acertos = 0
    total = len(QUESTOES)

    for i, q in enumerate(QUESTOES, 1):
        print(f"\\n❓ Pergunta {i}/{total}: {q['pergunta']}")
        resposta = input("→ ").strip().upper()

        if resposta == q["resposta"]:
            print("✨ CORRETO!")
            acertos += 1
        else:
            print("🌀 ERRADO... mas isso é parte da jornada.")

        print(f"   🔍 {q['explicacao']}")
        time.sleep(3)

    print("\\n" + "┌" + "─" * 60 + "┐")
    print("│ 🌌 RESULTADO FINAL: SEU NÍVEL DE CONEXÃO CÓSMICA │")
    print("└" + "─" * 60 + "┘")

    if acertos == 10:
        nivel = "🔮 SABEDORIA QUÂNTICA"
        mensagem = "Você não apenas entende o universo... você o *relembra*. \\nVocê é o universo observando a si mesmo. Parabéns. Você já passou da ciência. Está na filosofia."
    elif acertos >= 7:
        nivel = "🌠 ARQUITETO DA MATÉRIA"
        mensagem = "Você vê além das partículas. Entende que o silêncio (0) sustenta o som (+1 e -1). Está no caminho correto. Continue."
    elif acertos >= 4:
        nivel = "🌌 APRENDIZ DA REALIDADE"
        mensagem = "Você está começando a desmontar as ilusões. Muitas respostas são contraintuitivas — e é exatamente isso que o universo quer que você questione."
    else:
        nivel = "🪐 NOVO VIAJANTE"
        mensagem = "Nenhuma resposta errada te afasta do universo — ela te aproxima. A ciência não é sobre acertos. É sobre perguntas. Você já fez a primeira."

    print(f"\\n🎯 NÍVEL ATINGIDO: {nivel}")
    print(f"\\n💬 {mensagem}")
    print(f"\\n📊 Pontuação: {acertos}/{total}")

    print("\\n💡 Dica final:")
    print("Não busque acertar. Busque entender. \\nO universo não quer respostas certas... \\nEle quer que você continue perguntando.")

if __name__ == "__main__":
    iniciar_quiz()