import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Circle

# Dados reais: número atômico até 118
Z = list(range(1, 119))  # Número atômico
massas = [
    1.008, 4.003, 6.94, 9.012, 10.81, 12.01, 14.01, 16.00, 19.00, 20.18,
    22.99, 24.31, 26.98, 28.09, 30.97, 32.07, 35.45, 39.95, 39.10, 40.08,
    44.96, 47.87, 50.94, 52.00, 54.94, 55.85, 58.93, 58.69, 63.55, 65.38,
    69.72, 72.63, 74.92, 78.97, 79.90, 83.80, 85.47, 87.62, 88.91, 91.22,
    92.91, 95.95, 98, 101.07, 102.91, 106.42, 107.87, 112.41, 114.82, 118.71,
    121.76, 127.60, 126.90, 131.29, 132.91, 137.33, 138.91, 140.12, 140.91, 144.24,
    145, 150.36, 151.96, 157.25, 158.93, 162.50, 164.93, 167.26, 168.93, 173.05,
    174.97, 178.49, 180.95, 183.84, 186.21, 190.23, 192.22, 195.08, 196.97, 200.59,
    204.38, 207.2, 208.98, 209, 210, 222, 223, 226, 227, 232.04,
    231.04, 238.03, 237, 244, 243, 247, 247, 251, 252, 257,
    258, 259, 260, 261, 262, 266, 264, 269, 270, 271,
    270, 276, 281, 281, 285, 285, 286, 289, 289, 293,
    294
]

# Posicionamento em espiral logarítmica
theta = np.array(Z) * 0.05  # Ângulo proporcional ao número atômico
r = np.log(Z) * 3.5         # Raio aumenta com log da massa

fig, ax = plt.subplots(figsize=(14, 14), facecolor='black')
ax.set_xlim(-15, 15)
ax.set_ylim(-15, 15)
ax.axis('off')

# Fundo: partículas binárias flutuantes
for _ in range(150):
    x = np.random.uniform(-15, 15)
    y = np.random.uniform(-15, 15)
    alpha = np.random.uniform(0.05, 0.15)
    ax.text(x, y, '0', color='cyan', fontsize=6, alpha=alpha, ha='center', va='center')
    ax.text(x+0.2, y+0.2, '1', color='cyan', fontsize=5, alpha=alpha, ha='center', va='center')

# Esboçar a espiral com pontos
for i, z in enumerate(Z):
    x = r[i] * np.cos(theta[i])
    y = r[i] * np.sin(theta[i])

    # Próton = dourado
    if z <= 118:
        color = '#FFD700'  # Ouro
        size = 4 + (z/118)*8  # Tamanho cresce
        ax.scatter(x, y, s=size, color=color, edgecolors='none', alpha=0.9)

        # Linhas de nêutrons (sutil)
        if z > 1 and z % 2 == 0 and z < 100:  # Apenas alguns para não poluir
            x_prev = r[i-1] * np.cos(theta[i-1])
            y_prev = r[i-1] * np.sin(theta[i-1])
            ax.plot([x, x_prev], [y, y_prev], color='#1A1A1A', linewidth=0.3, alpha=0.2)

        # Raios de elétrons (ciano) para metais reativos
        if z in [3, 11, 19, 37, 55, 87]:  # Metais alcalinos
            for angle in np.linspace(0, 2*np.pi, 8):
                ax.plot([x, x + 0.8*np.cos(angle)], [y, y + 0.8*np.sin(angle)],
                        color='#00FFFF', linewidth=0.5, alpha=0.4)

# Destaque final: Oganessôn (118)
z_oganesson = 118
i = z_oganesson - 1
x_og = r[i] * np.cos(theta[i])
y_og = r[i] * np.sin(theta[i])
circle = Circle((x_og, y_og), 1.2, color='#FFF9C4', fill=True, alpha=0.9, lw=0)
ax.add_patch(circle)
ax.scatter(x_og, y_og, s=250, color='#FFD700', edgecolors='#FF9800', linewidth=2, alpha=1, marker='*')

# Símbolos finais no canto inferior direito
ax.text(12, -12, "[-1]", color='#00FFFF', fontsize=18, fontweight='bold', ha='center', va='center')
ax.text(12, -13.5, "[0]", color='#AAAAAA', fontsize=18, fontweight='bold', ha='center', va='center')
ax.text(12, -15, "[+1]", color='#FFD700', fontsize=18, fontweight='bold', ha='center', va='center')

# Texto poético ao redor
ax.text(0, -17, "Cada ponto é uma escolha.\\nCada linha, um equilíbrio.\\nCada luz, uma memória.",
        color='white', fontsize=9, ha='center', va='center', style='italic', alpha=0.7)

# Título central
ax.text(0, 14, "O MAPA CÓSMICO DOS ELEMENTOS", color='white', fontsize=16, ha='center', fontweight='bold', alpha=0.9)

plt.tight_layout()
plt.savefig("Mapa_Cosmico_Digital.png", dpi=600, bbox_inches='tight', facecolor='black')
plt.show()

print("🎨 QUADRO CÓSMICO GERADO! Salvo como: Mapa_Cosmico_Digital.png")