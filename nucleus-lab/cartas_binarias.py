from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# Registrar fonte elegante (use uma fonte monoespaçada ou serif suave)
pdfmetrics.registerFont(TTFont('JetBrainsMono', 'JetBrainsMono-Regular.ttf'))  # Baixe grátis em google.com/fonts
# Se não tiver a fonte, use 'Courier' como fallback

def gerar_pdf_cartas():
    c = canvas.Canvas("Fusao_Cosmica_Cartas.pdf", pagesize=A4)
    largura, altura = A4
    margem = 1 * cm
    card_w = 6 * cm
    card_h = 9 * cm
    cols = 3
    rows = 2
    padding = 0.5 * cm

    # Lista de cartas
    cartas = [
        ("Elétron", "[-1]", "Eu não tenho peso… mas movo mundos."),
        ("Próton", "[+1]", "Sou o nome que o universo me deu."),
        ("Nêutron", "[0]", "Não falo. Mas seguro tudo."),
    ] * 12  # 12 de cada tipo = 36 cartas

    # Página inicial
    c.setFont("Helvetica", 8)
    c.setFillColor(colors.black)

    for i, (nome, simbolo, texto) in enumerate(cartas):
        col = i % cols
        row = i // cols % rows
        page = i // (cols * rows)

        if i > 0 and i % (cols * rows) == 0:
            c.showPage()
            c.setFont("Helvetica", 8)
            c.setFillColor(colors.black)

        x = margem + col * (card_w + padding)
        y = altura - margem - (row + 1) * (card_h + padding)

        # Fundo da carta (preto)
        c.setFillColor(colors.black)
        c.rect(x, y, card_w, card_h, fill=1)

        # Símbolo central (branco/dourado)
        c.setFillColor(colors.white)
        c.setFont("Helvetica-Bold", 32)
        c.drawCentredString(x + card_w/2, y + card_h/2 + 0.5*cm, simbolo)

        # Nome abaixo
        c.setFont("Helvetica", 10)
        c.setFillColor(colors.HexColor("#E6D3A8"))  # dourado suave
        c.drawCentredString(x + card_w/2, y + 1.2*cm, nome)

        # Texto poético na borda inferior
        c.setFont("Helvetica-Oblique", 7)
        c.setFillColor(colors.lightgrey)
        c.drawString(x + 0.3*cm, y + 0.2*cm, texto)

        # Verso padrão (binário) — só na última carta de cada página
        if (i + 1) % (cols * rows) == 0:
            c.setFont("Helvetica", 5)
            c.setFillColor(colors.HexColor("#00FFFF"))  # ciano
            binario = "01000010 01101001 01101110 01100001 01110010 01101001 01101111"
            c.drawCentredString(largura/2, margem + 0.3*cm, binario)

    # Página 7: Tabela de Elementos Estáveis
    c.showPage()
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(colors.white)
    c.drawCentredString(largura/2, altura - 50, "TABELA DE ELEMENTOS ESTÁVEIS")

    c.setFont("Helvetica", 10)
    dados = [
        ("Hidrogênio-1", "1", "0", "5"),
        ("Hélio-4", "2", "2", "10"),
        ("Carbono-12", "6", "6", "20"),
        ("Oxigênio-16", "8", "8", "25"),
        ("Ferro-56", "26", "30", "50"),
        ("Urânio-238", "92", "146", "70"),
        ("Oganessôn-294", "118", "176", "80"),
    ]

    y = altura - 100
    for elem, p, n, pts in dados:
        c.drawString(margem, y, f"{elem}")
        c.drawString(margem + 4*cm, y, f"p⁺: {p}")
        c.drawString(margem + 7*cm, y, f"n⁰: {n}")
        c.drawString(margem + 10*cm, y, f"Pontos: {pts}")
        y -= 15

    # Página 8: Regras
    c.showPage()
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(largura/2, altura - 50, "REGRAS DO JOGO")

    c.setFont("Helvetica", 10)
    regras = [
        "• Objetivo: Construir núcleos estáveis combinando prótons (+1), elétrons (-1) e nêutrons (0).",
        "• Cada jogador começa com 5 cartas.",
        "• Para formar um núcleo: soma das cargas = número atômico. Nêutrons devem estar dentro da faixa de estabilidade.",
        "• Faixa segura: n ≈ 1.2 × p ± 2",
        "• Fazer Oganessôn-294? Ganha 80 pontos — e seu nome entra na história.",
        "• Se a carga for desequilibrada → colapso! Perca 10 pontos.",
        "• Use o modo Solitário: tente construir o maior núcleo possível com 10 cartas.",
        "• Vence quem tiver mais pontos ao fim do jogo.",
        "",
        "💡 Este não é um jogo de acertos. É um ritual de compreensão.",
    ]

    y = altura - 100
    for r in regras:
        c.drawString(margem, y, r)
        y -= 12

    c.save()
    print("✅ PDF GERADO COM SUCESSO!")
    print("📁 Arquivo salvo como: Fusao_Cosmica_Cartas.pdf")

if __name__ == "__main__":
    gerar_pdf_cartas()