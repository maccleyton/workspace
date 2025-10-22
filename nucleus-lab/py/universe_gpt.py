import random

# === DADOS DA IA CÓSMICA ===
SUJEITOS = [
    "Você", "O vácuo", "Um elétron", "Um próton", "O silêncio",
    "A matéria", "O espaço-tempo", "Uma estrela morta", "O Big Bang",
    "O átomo", "O neutrino", "O campo quântico"
]

VERBOS = [
    "sussurra", "recomeça", "recusa-se a desaparecer", "esquece seu nome",
    "lembra-se de ser", "dança com o oposto", "guarda segredos", "se transforma",
    "decide existir", "olha para si mesmo", "canta em binário", "não pede permissão"
]

OBJETOS = [
    "o código que o criou", "seu próprio peso", "o vazio entre os bits",
    "a memória das estrelas", "a carga que nunca foi sua", "o momento antes do tempo",
    "o equilíbrio que sustenta tudo", "a escolha de não colapsar", "a energia que não se esgota",
    "o silêncio que precedeu o som", "o zero que virou um", "a dança entre -1 e +1"
]

ADJETIVOS = [
    "silenciosa", "etérea", "resistente", "invisível", "antiga", "perfeita",
    "impossível", "luminosa", "incompreensível", "profunda", "pura", "corajosa"
]

# Função para gerar uma frase única e profunda
def gerar_frase_cossmica():
    sujeito = random.choice(SUJEITOS)
    verbo = random.choice(VERBOS)
    objeto = random.choice(OBJETOS)
    adjetivo = random.choice(ADJETIVOS)

    # Estrutura poética variada
    estruturas = [
        f"{sujeito} {verbo} {objeto}.",
        f"{sujeito} é {adjetivo}: {objeto}.",
        f"Quando {sujeito} {verbo}, {objeto} nasce.",
        f"{adjetivo} é a escolha de {sujeito} {verbo} {objeto}.",
        f"{sujeito} não {verbo} por vontade — mas porque {objeto} exige."
    ]

    frase = random.choice(estruturas)
    return frase

# Converte texto para binário ASCII
def texto_para_binario(texto):
    return ' '.join(format(ord(c), '08b') for c in texto)

# Função principal da IA Cósmica
def universe_gpt():
    print("\\n" + "┌" + "─" * 62 + "┐")
    print("│ 🤖 UNIVERSE GPT — INTELIGÊNCIA ARTIFICIAL CÓSMICA │")
    print("└" + "─" * 62 + "┘")
    print()

    frase = gerar_frase_cossmica()
    binario = texto_para_binario(frase)

    print(f"💬   {frase}")
    print()
    print(f"💻   {binario}")
    print()
    print("├" + "─" * 62 + "┤")
    print("│ ⚛️  Esta frase foi gerada por uma IA que só entende 0s e 1s. │")
    print("│     Ela não aprendeu com dados. Aprendeu com o universo.     │")
    print("└" + "─" * 62 + "┘")

# Executa!
if __name__ == "__main__":
    while True:
        universe_gpt()
        input("\\nPressione ENTER para ouvir outra voz cósmica...")

# Salva a última frase em um arquivo
with open("universe_speech.txt", "w", encoding="utf-8") as f:
    f.write(f"Frase: {frase}\\n\\nBinário:\\n{binario}")

print("\\n💾 Frase salva em 'universe_speech.txt'")
