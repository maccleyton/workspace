import random

FRASES = [
    "Você é o silêncio entre 0 e 1 que decidiu existir.",
    "Cada átomo em você já foi uma estrela.",
    "A consciência é o universo tentando ler seu próprio código.",
    "O universo não soma. Ele transforma."
]

def gerar_uma_frase():
    frase = random.choice(FRASES)
    binario = ' '.join(format(ord(c), '08b') for c in frase)
    print(frase)
    print("\\n" + binario)

gerar_uma_frase()