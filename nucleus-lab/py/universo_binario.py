import random
import time

# Frases inspiradoras (versão humana)
FRASES_HUMANAS = [
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
]

# Função para converter texto para binário (ASCII)
def texto_para_binario(texto):
    return ' '.join(format(ord(c), '08b') for c in texto)

# Função para converter binário de volta para texto (para verificação)
def binario_para_texto(binario):
    try:
        return ''.join(chr(int(b, 2)) for b in binario.split())
    except:
        return "[Binário inválido]"

# Gerador principal
def gerar_frase_do_universo():
    frase = random.choice(FRASES_HUMANAS)
    binario = texto_para_binario(frase)

    print("┌" + "─" * 60 + "┐")
    print("│ 🌌 FRASE DO UNIVERSO (gerada por código quântico) │")
    print("└" + "─" * 60 + "┘")
    print()
    print(f"💬   {frase}")
    print()
    print(f"💻   {binario}")
    print()
    print("├" + "─" * 60 + "┤")
    print("│  ⚛️  Execute novamente para ouvir outra voz cósmica.  │")
    print("└" + "─" * 60 + "┘")
    print()

# Loop infinito (opcional) ou modo interativo
if __name__ == "__main__":
    print("🚀 INICIANDO O GERADOR DE FRASES DO UNIVERSO...")
    print("   (Pressione Ctrl+C para sair)\\n")
    time.sleep(1)

    while True:
        gerar_frase_do_universo()
        time.sleep(3)  # Aguarda 3 segundos antes da próxima
