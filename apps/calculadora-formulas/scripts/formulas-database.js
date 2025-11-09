/* ========================================
   BASE DE DADOS DE FÓRMULAS
   ======================================== */

class FormulasDatabase {
    static formulas = {
        algebra: [
            {
                id: 'equacao_2_grau',
                name: 'Equação do 2º Grau',
                latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
                variables: [
                    { name: 'a', label: 'Coeficiente a', type: 'number', required: true, min: -100, max: 100 },
                    { name: 'b', label: 'Coeficiente b', type: 'number', required: true, min: -100, max: 100 },
                    { name: 'c', label: 'Coeficiente c', type: 'number', required: true, min: -100, max: 100 }
                ],
                description: 'Resolve equações do segundo grau na forma ax² + bx + c = 0',
                category: 'algebra',
                difficulty: 'medium',
                tags: ['equação', 'quadrática', 'polinômio']
            },
            {
                id: 'formula_bhaskara',
                name: 'Fórmula de Bhaskara',
                latex: '\\Delta = b^2 - 4ac \\quad \\text{e} \\quad x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}',
                variables: [
                    { name: 'a', label: 'Coeficiente a', type: 'number', required: true },
                    { name: 'b', label: 'Coeficiente b', type: 'number', required: true },
                    { name: 'c', label: 'Coeficiente c', type: 'number', required: true }
                ],
                description: 'Método para encontrar as raízes de uma equação quadrática',
                category: 'algebra',
                difficulty: 'medium',
                tags: ['bhaskara', 'raízes', 'discriminante']
            },
            {
                id: 'progressao_aritmetica',
                name: 'Termo Geral da PA',
                latex: 'a_n = a_1 + (n-1) \\cdot r',
                variables: [
                    { name: 'a1', label: 'Primeiro termo (a₁)', type: 'number', required: true },
                    { name: 'n', label: 'Posição do termo (n)', type: 'number', required: true, min: 1 },
                    { name: 'r', label: 'Razão (r)', type: 'number', required: true }
                ],
                description: 'Calcula o n-ésimo termo de uma progressão aritmética',
                category: 'algebra',
                difficulty: 'easy',
                tags: ['progressão', 'aritmética', 'sequência']
            },
            {
                id: 'soma_pa',
                name: 'Soma dos n Primeiros Termos da PA',
                latex: 'S_n = \\frac{n(a_1 + a_n)}{2} \\quad \\text{ou} \\quad S_n = \\frac{n[2a_1 + (n-1)r]}{2}',
                variables: [
                    { name: 'a1', label: 'Primeiro termo (a₁)', type: 'number', required: true },
                    { name: 'n', label: 'Número de termos (n)', type: 'number', required: true, min: 1 },
                    { name: 'r', label: 'Razão (r)', type: 'number', required: true }
                ],
                description: 'Calcula a soma dos n primeiros termos de uma progressão aritmética',
                category: 'algebra',
                difficulty: 'easy',
                tags: ['soma', 'progressão', 'aritmética']
            },
            {
                id: 'progressao_geometrica',
                name: 'Termo Geral da PG',
                latex: 'a_n = a_1 \\cdot q^{(n-1)}',
                variables: [
                    { name: 'a1', label: 'Primeiro termo (a₁)', type: 'number', required: true },
                    { name: 'n', label: 'Posição do termo (n)', type: 'number', required: true, min: 1 },
                    { name: 'q', label: 'Razão (q)', type: 'number', required: true }
                ],
                description: 'Calcula o n-ésimo termo de uma progressão geométrica',
                category: 'algebra',
                difficulty: 'medium',
                tags: ['progressão', 'geométrica', 'sequência']
            },
            {
                id: 'soma_pg_finita',
                name: 'Soma da PG Finita',
                latex: 'S_n = a_1 \\frac{q^n - 1}{q - 1} \\quad (q \\neq 1)',
                variables: [
                    { name: 'a1', label: 'Primeiro termo (a₁)', type: 'number', required: true },
                    { name: 'n', label: 'Número de termos (n)', type: 'number', required: true, min: 1 },
                    { name: 'q', label: 'Razão (q)', type: 'number', required: true }
                ],
                description: 'Calcula a soma dos n primeiros termos de uma progressão geométrica finita',
                category: 'algebra',
                difficulty: 'medium',
                tags: ['soma', 'progressão', 'geométrica']
            },
            {
                id: 'soma_pg_infinita',
                name: 'Soma da PG Infinita',
                latex: 'S_\\infty = \\frac{a_1}{1-q} \\quad (|q| < 1)',
                variables: [
                    { name: 'a1', label: 'Primeiro termo (a₁)', type: 'number', required: true },
                    { name: 'q', label: 'Razão (q)', type: 'number', required: true }
                ],
                description: 'Calcula a soma de uma progressão geométrica infinita convergente',
                category: 'algebra',
                difficulty: 'medium',
                tags: ['soma', 'progressão', 'geométrica', 'infinita']
            },
            {
                id: 'binomio_newton',
                name: 'Teorema do Binômio de Newton',
                latex: '(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k',
                variables: [
                    { name: 'a', label: 'Termo a', type: 'number', required: true },
                    { name: 'b', label: 'Termo b', type: 'number', required: true },
                    { name: 'n', label: 'Expoente n', type: 'number', required: true, min: 0 }
                ],
                description: 'Expansão de (a + b)ⁿ usando coeficientes binomiais',
                category: 'algebra',
                difficulty: 'hard',
                tags: ['binomio', 'newton', 'coeficientes', 'combinatória']
            },
            {
                id: 'sistema_2x2_cramer',
                name: 'Sistema Linear 2x2 (Regra de Cramer)',
                latex: '\\begin{cases} ax + by = e \\\\ cx + dy = f \\end{cases} \\quad \\Rightarrow \\quad x = \\frac{ed - bf}{ad - bc}, \\, y = \\frac{af - ce}{ad - bc}',
                variables: [
                    { name: 'a', label: 'Coeficiente a', type: 'number', required: true },
                    { name: 'b', label: 'Coeficiente b', type: 'number', required: true },
                    { name: 'c', label: 'Coeficiente c', type: 'number', required: true },
                    { name: 'd', label: 'Coeficiente d', type: 'number', required: true },
                    { name: 'e', label: 'Termo independente e', type: 'number', required: true },
                    { name: 'f', label: 'Termo independente f', type: 'number', required: true }
                ],
                description: 'Resolve sistemas lineares 2x2 usando a regra de Cramer',
                category: 'algebra',
                difficulty: 'hard',
                tags: ['sistema', 'linear', 'cramer', '2x2']
            },
            {
                id: 'logaritmo_natural',
                name: 'Logaritmo Natural',
                latex: '\\ln(x) = \\int_1^x \\frac{1}{t} dt',
                variables: [
                    { name: 'x', label: 'Valor x', type: 'number', required: true, min: 0 }
                ],
                description: 'Logaritmo na base e (número de Euler)',
                category: 'algebra',
                difficulty: 'medium',
                tags: ['logaritmo', 'natural', 'e', 'integral']
            }
        ],

        geometria: [
            {
                id: 'area_circulo',
                name: 'Área do Círculo',
                latex: 'A = \\pi r^2',
                variables: [
                    { name: 'r', label: 'Raio (r)', type: 'number', required: true, min: 0 }
                ],
                description: 'Calcula a área de um círculo',
                category: 'geometria',
                difficulty: 'easy',
                tags: ['área', 'círculo', 'pi', 'raio']
            },
            {
                id: 'perimetro_circulo',
                name: 'Perímetro do Círculo',
                latex: 'P = 2\\pi r',
                variables: [
                    { name: 'r', label: 'Raio (r)', type: 'number', required: true, min: 0 }
                ],
                description: 'Calcula o perímetro (circunferência) de um círculo',
                category: 'geometria',
                difficulty: 'easy',
                tags: ['perímetro', 'círculo', 'circunferência', 'pi']
            },
            {
                id: 'area_triangulo',
                name: 'Área do Triângulo',
                latex: 'A = \\frac{base \\cdot altura}{2}',
                variables: [
                    { name: 'base', label: 'Base', type: 'number', required: true, min: 0 },
                    { name: 'altura', label: 'Altura', type: 'number', required: true, min: 0 }
                ],
                description: 'Calcula a área de um triângulo',
                category: 'geometria',
                difficulty: 'easy',
                tags: ['área', 'triângulo', 'base', 'altura']
            },
            {
                id: 'teorema_pitagoras',
                name: 'Teorema de Pitágoras',
                latex: 'a^2 + b^2 = c^2',
                variables: [
                    { name: 'a', label: 'Cateto a', type: 'number', required: true, min: 0 },
                    { name: 'b', label: 'Cateto b', type: 'number', required: true, min: 0 },
                    { name: 'c', label: 'Hipotenusa c', type: 'number', required: true, min: 0 }
                ],
                description: 'Relação entre os lados de um triângulo retângulo',
                category: 'geometria',
                difficulty: 'medium',
                tags: ['pitágoras', 'triângulo', 'retângulo', 'hipotenusa']
            },
            {
                id: 'volume_esfera',
                name: 'Volume da Esfera',
                latex: 'V = \\frac{4}{3}\\pi r^3',
                variables: [
                    { name: 'r', label: 'Raio (r)', type: 'number', required: true, min: 0 }
                ],
                description: 'Calcula o volume de uma esfera',
                category: 'geometria',
                difficulty: 'medium',
                tags: ['volume', 'esfera', 'pi', 'raio']
            },
            {
                id: 'volume_cilindro',
                name: 'Volume do Cilindro',
                latex: 'V = \\pi r^2 h',
                variables: [
                    { name: 'r', label: 'Raio (r)', type: 'number', required: true, min: 0 },
                    { name: 'h', label: 'Altura (h)', type: 'number', required: true, min: 0 }
                ],
                description: 'Calcula o volume de um cilindro circular reto',
                category: 'geometria',
                difficulty: 'medium',
                tags: ['volume', 'cilindro', 'pi', 'raio', 'altura']
            },
            {
                id: 'area_esfera',
                name: 'Área da Esfera',
                latex: 'A = 4\\pi r^2',
                variables: [
                    { name: 'r', label: 'Raio (r)', type: 'number', required: true, min: 0 }
                ],
                description: 'Calcula a área da superfície de uma esfera',
                category: 'geometria',
                difficulty: 'medium',
                tags: ['área', 'esfera', 'superfície', 'pi']
            },
            {
                id: 'volume_cone',
                name: 'Volume do Cone',
                latex: 'V = \\frac{1}{3}\\pi r^2 h',
                variables: [
                    { name: 'r', label: 'Raio da base (r)', type: 'number', required: true, min: 0 },
                    { name: 'h', label: 'Altura (h)', type: 'number', required: true, min: 0 }
                ],
                description: 'Calcula o volume de um cone circular reto',
                category: 'geometria',
                difficulty: 'medium',
                tags: ['volume', 'cone', 'pi', 'raio', 'altura']
            },
            {
                id: 'area_trapezio',
                name: 'Área do Trapézio',
                latex: 'A = \\frac{(base_1 + base_2) \\cdot altura}{2}',
                variables: [
                    { name: 'base1', label: 'Base menor', type: 'number', required: true, min: 0 },
                    { name: 'base2', label: 'Base maior', type: 'number', required: true, min: 0 },
                    { name: 'altura', label: 'Altura', type: 'number', required: true, min: 0 }
                ],
                description: 'Calcula a área de um trapézio',
                category: 'geometria',
                difficulty: 'easy',
                tags: ['área', 'trapézio', 'base', 'altura']
            },
            {
                id: 'lei_dos_senos',
                name: 'Lei dos Senos',
                latex: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}',
                variables: [
                    { name: 'a', label: 'Lado a', type: 'number', required: true, min: 0 },
                    { name: 'b', label: 'Lado b', type: 'number', required: true, min: 0 },
                    { name: 'c', label: 'Lado c', type: 'number', required: true, min: 0 },
                    { name: 'A', label: 'Ângulo A (°)', type: 'number', required: true, min: 0, max: 180 },
                    { name: 'B', label: 'Ângulo B (°)', type: 'number', required: true, min: 0, max: 180 },
                    { name: 'C', label: 'Ângulo C (°)', type: 'number', required: true, min: 0, max: 180 }
                ],
                description: 'Relação entre lados e senos dos ângulos opostos em um triângulo',
                category: 'geometria',
                difficulty: 'hard',
                tags: ['lei', 'senos', 'triângulo', 'ângulos']
            },
            {
                id: 'lei_dos_cossenos',
                name: 'Lei dos Cossenos',
                latex: 'c^2 = a^2 + b^2 - 2ab\\cos C',
                variables: [
                    { name: 'a', label: 'Lado a', type: 'number', required: true, min: 0 },
                    { name: 'b', label: 'Lado b', type: 'number', required: true, min: 0 },
                    { name: 'c', label: 'Lado c', type: 'number', required: true, min: 0 },
                    { name: 'C', label: 'Ângulo C (°)', type: 'number', required: true, min: 0, max: 180 }
                ],
                description: 'Relação entre os lados e o cosseno de um ângulo em um triângulo',
                category: 'geometria',
                difficulty: 'hard',
                tags: ['lei', 'cossenos', 'triângulo', 'ângulos']
            }
        ],

        fisica: [
            {
                id: 'lei_ohm',
                name: 'Lei de Ohm',
                latex: 'V = R \\cdot I',
                variables: [
                    { name: 'R', label: 'Resistência (Ω)', type: 'number', required: true, min: 0 },
                    { name: 'I', label: 'Corrente (A)', type: 'number', required: true, min: 0 },
                    { name: 'V', label: 'Tensão (V)', type: 'number', required: true, min: 0 }
                ],
                description: 'Relação entre tensão, corrente e resistência elétrica',
                category: 'fisica',
                difficulty: 'easy',
                tags: ['ohm', 'tensão', 'corrente', 'resistência', 'elétrica']
            },
            {
                id: 'energia_cinetica',
                name: 'Energia Cinética',
                latex: 'E_c = \\frac{1}{2} m v^2',
                variables: [
                    { name: 'm', label: 'Massa (kg)', type: 'number', required: true, min: 0 },
                    { name: 'v', label: 'Velocidade (m/s)', type: 'number', required: true, min: 0 }
                ],
                description: 'Energia associada ao movimento de um objeto',
                category: 'fisica',
                difficulty: 'easy',
                tags: ['energia', 'cinética', 'massa', 'velocidade']
            },
            {
                id: 'energia_potencial',
                name: 'Energia Potencial Gravitacional',
                latex: 'E_p = m g h',
                variables: [
                    { name: 'm', label: 'Massa (kg)', type: 'number', required: true, min: 0 },
                    { name: 'g', label: 'Aceleração da gravidade (m/s²)', type: 'number', required: true, default: 9.81 },
                    { name: 'h', label: 'Altura (m)', type: 'number', required: true, min: 0 }
                ],
                description: 'Energia devido à posição de um objeto no campo gravitacional',
                category: 'fisica',
                difficulty: 'easy',
                tags: ['energia', 'potencial', 'gravidade', 'altura']
            },
            {
                id: 'trabalho',
                name: 'Trabalho Mecânico',
                latex: 'W = F \\cdot d \\cdot \\cos\\theta',
                variables: [
                    { name: 'F', label: 'Força (N)', type: 'number', required: true, min: 0 },
                    { name: 'd', label: 'Distância (m)', type: 'number', required: true, min: 0 },
                    { name: 'θ', label: 'Ângulo (°)', type: 'number', required: true, min: 0, max: 180 }
                ],
                description: 'Trabalho realizado por uma força',
                category: 'fisica',
                difficulty: 'medium',
                tags: ['trabalho', 'força', 'distância', 'ângulo']
            },
            {
                id: 'potencia',
                name: 'Potência',
                latex: 'P = \\frac{W}{t} = F \\cdot v',
                variables: [
                    { name: 'W', label: 'Trabalho (J)', type: 'number', required: true, min: 0 },
                    { name: 't', label: 'Tempo (s)', type: 'number', required: true, min: 0 },
                    { name: 'F', label: 'Força (N)', type: 'number', required: true, min: 0 },
                    { name: 'v', label: 'Velocidade (m/s)', type: 'number', required: true, min: 0 }
                ],
                description: 'Potência mecânica (taxa de realização de trabalho)',
                category: 'fisica',
                difficulty: 'medium',
                tags: ['potência', 'trabalho', 'tempo', 'força', 'velocidade']
            },
            {
                id: 'forca_gravitacional',
                name: 'Lei da Gravitação Universal',
                latex: 'F = G \\frac{m_1 m_2}{r^2}',
                variables: [
                    { name: 'm1', label: 'Massa 1 (kg)', type: 'number', required: true, min: 0 },
                    { name: 'm2', label: 'Massa 2 (kg)', type: 'number', required: true, min: 0 },
                    { name: 'r', label: 'Distância (m)', type: 'number', required: true, min: 0 },
                    { name: 'G', label: 'Constante gravitacional (N⋅m²/kg²)', type: 'number', required: true, default: 6.674e-11 }
                ],
                description: 'Força de atração gravitacional entre duas massas',
                category: 'fisica',
                difficulty: 'hard',
                tags: ['gravitação', 'newton', 'massa', 'força', 'universal']
            },
            {
                id: 'aceleracao_centripeta',
                name: 'Aceleração Centrípeta',
                latex: 'a_c = \\frac{v^2}{r} = \\omega^2 r',
                variables: [
                    { name: 'v', label: 'Velocidade (m/s)', type: 'number', required: true, min: 0 },
                    { name: 'r', label: 'Raio (m)', type: 'number', required: true, min: 0 },
                    { name: 'ω', label: 'Velocidade angular (rad/s)', type: 'number', required: true, min: 0 }
                ],
                description: 'Aceleração necessária para manter um objeto em movimento circular',
                category: 'fisica',
                difficulty: 'medium',
                tags: ['aceleração', 'centrípeta', 'circular', 'angular', 'velocidade']
            },
            {
                id: 'pressao_hidrostatica',
                name: 'Pressão Hidrostática',
                latex: 'p = p_0 + \\rho g h',
                variables: [
                    { name: 'p0', label: 'Pressão atmosférica (Pa)', type: 'number', required: true, default: 101325 },
                    { name: 'ρ', label: 'Densidade (kg/m³)', type: 'number', required: true, min: 0 },
                    { name: 'g', label: 'Aceleração da gravidade (m/s²)', type: 'number', required: true, default: 9.81 },
                    { name: 'h', label: 'Profundidade (m)', type: 'number', required: true, min: 0 }
                ],
                description: 'Pressão exercida por um fluido em repouso',
                category: 'fisica',
                difficulty: 'medium',
                tags: ['pressão', 'hidrostática', 'fluido', 'densidade', 'profundidade']
            },
            {
                id: 'frequencia_periodo',
                name: 'Relação entre Frequência e Período',
                latex: 'f = \\frac{1}{T} \\quad \\text{e} \\quad T = \\frac{1}{f}',
                variables: [
                    { name: 'f', label: 'Frequência (Hz)', type: 'number', required: true, min: 0 },
                    { name: 'T', label: 'Período (s)', type: 'number', required: true, min: 0 }
                ],
                description: 'Relação entre frequência e período de uma onda ou movimento',
                category: 'fisica',
                difficulty: 'easy',
                tags: ['frequência', 'período', 'onda', 'oscilação']
            }
        ],

        calculo: [
            {
                id: 'derivada_basica',
                name: 'Derivada Básica',
                latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}',
                variables: [
                    { name: 'f', label: 'Função f(x)', type: 'function', required: true },
                    { name: 'x', label: 'Ponto x', type: 'number', required: true }
                ],
                description: 'Definição formal da derivada de uma função',
                category: 'calculo',
                difficulty: 'hard',
                tags: ['derivada', 'limite', 'diferenciação']
            },
            {
                id: 'regra_cadeia',
                name: 'Regra da Cadeia',
                latex: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
                variables: [
                    { name: 'f', label: 'Função externa f(u)', type: 'function', required: true },
                    { name: 'g', label: 'Função interna g(x)', type: 'function', required: true },
                    { name: 'x', label: 'Ponto x', type: 'number', required: true }
                ],
                description: 'Derivada de uma função composta',
                category: 'calculo',
                difficulty: 'hard',
                tags: ['regra', 'cadeia', 'derivada', 'composta']
            },
            {
                id: 'integral_definida',
                name: 'Integral Definida',
                latex: '\\int_a^b f(x) dx = F(b) - F(a)',
                variables: [
                    { name: 'f', label: 'Função f(x)', type: 'function', required: true },
                    { name: 'a', label: 'Limite inferior a', type: 'number', required: true },
                    { name: 'b', label: 'Limite superior b', type: 'number', required: true }
                ],
                description: 'Valor da integral definida usando o Teorema Fundamental do Cálculo',
                category: 'calculo',
                difficulty: 'hard',
                tags: ['integral', 'definida', 'fundamental', 'calculus']
            },
            {
                id: 'limite_importante',
                name: 'Limite Importante',
                latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',
                variables: [
                    { name: 'x', label: 'Valor de x (aproximação)', type: 'number', required: true }
                ],
                description: 'Limite fundamental que relaciona seno e arco',
                category: 'calculo',
                difficulty: 'medium',
                tags: ['limite', 'seno', 'fundamental', 'trigonométrico']
            }
        ],

        quimica: [
            {
                id: 'lei_gases_ideais',
                name: 'Lei dos Gases Ideais',
                latex: 'PV = nRT',
                variables: [
                    { name: 'P', label: 'Pressão (atm)', type: 'number', required: true, min: 0 },
                    { name: 'V', label: 'Volume (L)', type: 'number', required: true, min: 0 },
                    { name: 'n', label: 'Mols (mol)', type: 'number', required: true, min: 0 },
                    { name: 'R', label: 'Constante dos gases (0.0821 L⋅atm/(mol⋅K))', type: 'number', required: true, default: 0.0821 },
                    { name: 'T', label: 'Temperatura (K)', type: 'number', required: true, min: 0 }
                ],
                description: 'Relação entre pressão, volume, temperatura e quantidade de gás',
                category: 'quimica',
                difficulty: 'medium',
                tags: ['gases', 'ideais', 'pressão', 'volume', 'temperatura']
            },
            {
                id: 'concentracao_molar',
                name: 'Concentração Molar',
                latex: 'M = \\frac{n}{V}',
                variables: [
                    { name: 'n', label: 'Mols do soluto (mol)', type: 'number', required: true, min: 0 },
                    { name: 'V', label: 'Volume da solução (L)', type: 'number', required: true, min: 0 }
                ],
                description: 'Concentração em mol por litro (molaridade)',
                category: 'quimica',
                difficulty: 'easy',
                tags: ['concentração', 'molar', 'solução', 'mol']
            },
            {
                id: 'ph',
                name: 'pH',
                latex: 'pH = -\\log_{10}[H^+]',
                variables: [
                    { name: 'H', label: 'Concentração de H⁺ (mol/L)', type: 'number', required: true, min: 0 }
                ],
                description: 'Medida de acidez de uma solução',
                category: 'quimica',
                difficulty: 'medium',
                tags: ['ph', 'acidez', 'concentração', 'hydrogen']
            },
            {
                id: 'diluicao',
                name: 'Fórmula de Diluição',
                latex: 'C_1V_1 = C_2V_2',
                variables: [
                    { name: 'C1', label: 'Concentração inicial', type: 'number', required: true, min: 0 },
                    { name: 'V1', label: 'Volume inicial', type: 'number', required: true, min: 0 },
                    { name: 'C2', label: 'Concentração final', type: 'number', required: true, min: 0 },
                    { name: 'V2', label: 'Volume final', type: 'number', required: true, min: 0 }
                ],
                description: 'Relação entre concentrações e volumes em diluições',
                category: 'quimica',
                difficulty: 'easy',
                tags: ['diluição', 'concentração', 'volume', 'mistura']
            }
        ],

        estatistica: [
            {
                id: 'media_aritmetica',
                name: 'Média Aritmética',
                latex: '\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}',
                variables: [
                    { name: 'x1', label: 'Valor 1', type: 'number', required: true },
                    { name: 'x2', label: 'Valor 2', type: 'number', required: true },
                    { name: 'x3', label: 'Valor 3', type: 'number', required: false },
                    { name: 'xn', label: 'Valor n', type: 'number', required: false }
                ],
                description: 'Média aritmética de um conjunto de valores',
                category: 'estatistica',
                difficulty: 'easy',
                tags: ['média', 'aritmética', 'conjunto', 'valores']
            },
            {
                id: 'variancia',
                name: 'Variância',
                latex: '\\sigma^2 = \\frac{\\sum_{i=1}^{n}(x_i - \\mu)^2}{N}',
                variables: [
                    { name: 'xi', label: 'Valores (separados por vírgula)', type: 'text', required: true },
                    { name: 'mu', label: 'Média populacional (μ)', type: 'number', required: true }
                ],
                description: 'Medida de dispersão dos dados em relação à média',
                category: 'estatistica',
                difficulty: 'medium',
                tags: ['variância', 'dispersão', 'dados', 'estatística']
            },
            {
                id: 'desvio_padrao',
                name: 'Desvio Padrão',
                latex: '\\sigma = \\sqrt{\\sigma^2}',
                variables: [
                    { name: 'sigma2', label: 'Variância (σ²)', type: 'number', required: true, min: 0 }
                ],
                description: 'Medida de dispersão (raiz quadrada da variância)',
                category: 'estatistica',
                difficulty: 'easy',
                tags: ['desvio', 'padrão', 'dispersão', 'estatística']
            }
        ]
    };

    static categories = {
        algebra: { name: 'Álgebra', icon: 'fa-calculator', color: '#3B82F6' },
        geometria: { name: 'Geometria', icon: 'fa-shapes', color: '#10B981' },
        fisica: { name: 'Física', icon: 'fa-atom', color: '#8B5CF6' },
        calculo: { name: 'Cálculo', icon: 'fa-chart-line', color: '#F59E0B' },
        quimica: { name: 'Química', icon: 'fa-flask', color: '#EF4444' },
        estatistica: { name: 'Estatística', icon: 'fa-chart-bar', color: '#06B6D4' }
    };

    /* ========================================
       MÉTODOS PRINCIPAIS
       ======================================== */
    static getAllFormulas() {
        const allFormulas = [];
        Object.entries(this.formulas).forEach(([category, formulas]) => {
            formulas.forEach(formula => {
                allFormulas.push({
                    ...formula,
                    categoryKey: category
                });
            });
        });
        return allFormulas;
    }

    static getFormulasByCategory(category) {
        return this.formulas[category] || [];
    }

    static getFormulaById(id) {
        for (const [category, formulas] of Object.entries(this.formulas)) {
            const formula = formulas.find(f => f.id === id);
            if (formula) {
                return {
                    ...formula,
                    categoryKey: category
                };
            }
        }
        return null;
    }

    static searchFormulas(query) {
        if (!query || query.trim() === '') {
            return this.getAllFormulas();
        }

        const searchTerm = query.toLowerCase();
        return this.getAllFormulas().filter(formula => {
            return (
                formula.name.toLowerCase().includes(searchTerm) ||
                formula.description.toLowerCase().includes(searchTerm) ||
                formula.latex.toLowerCase().includes(searchTerm) ||
                formula.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        });
    }

    static getCategories() {
        return this.categories;
    }

    static getTotalCount() {
        return this.getAllFormulas().length;
    }

    static getCountByCategory() {
        const counts = {};
        Object.entries(this.formulas).forEach(([category, formulas]) => {
            counts[category] = formulas.length;
        });
        return counts;
    }

    /* ========================================
       UTILITÁRIOS
       ======================================== */
    static validateFormulaData(formula) {
        const required = ['id', 'name', 'latex', 'variables', 'description'];
        return required.every(field => formula.hasOwnProperty(field));
    }

    static getRandomFormula(category = null) {
        let formulas;
        if (category && this.formulas[category]) {
            formulas = this.formulas[category];
        } else {
            const allFormulas = this.getAllFormulas();
            formulas = allFormulas;
        }
        
        if (formulas.length === 0) return null;
        
        const randomIndex = Math.floor(Math.random() * formulas.length);
        return {
            ...formulas[randomIndex],
            categoryKey: category || 'random'
        };
    }

    static getFormulasByDifficulty(difficulty) {
        return this.getAllFormulas().filter(formula => formula.difficulty === difficulty);
    }

    static getFormulasByTag(tag) {
        return this.getAllFormulas().filter(formula => 
            formula.tags && formula.tags.includes(tag)
        );
    }
}

// Disponibiliza globalmente
window.FormulasDatabase = FormulasDatabase;