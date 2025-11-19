// ====== DADOS DOS ELEMENTOS ======
const elements = {
	// Actinídeos (expandido)
	uranium238: {
		id: 'uranium238',
		name: "Urânio-238",
		symbol: "U-238",
		atomicNumber: 92,
		protons: 92,
		neutrons: 146,
		electrons: 92,
		halfLife: 4.468e9,
		lambda: 1.551e-10,
		decayType: "alpha",
		color: "#ff4444",
		product: "Th-234",
		energy: "4.27 MeV",
		uses: "Combustível nuclear, datação geológica",
		electronConfig: "[Rn] 5f³ 6d¹ 7s²"
	},
	uranium235: {
		id: 'uranium235',
		name: "Urânio-235",
		symbol: "U-235",
		atomicNumber: 92,
		protons: 92,
		neutrons: 143,
		electrons: 92,
		halfLife: 7.038e8,
		lambda: 9.849e-10,
		decayType: "alpha",
		color: "#ff6666",
		product: "Th-231",
		energy: "4.68 MeV",
		uses: "Reatores nucleares, armas nucleares",
		electronConfig: "[Rn] 5f³ 6d¹ 7s²"
	},
	uranium233: {
		id: 'uranium233',
		name: "Urânio-233",
		symbol: "U-233",
		atomicNumber: 92,
		protons: 92,
		neutrons: 141,
		electrons: 92,
		halfLife: 1.592e5,
		lambda: 4.91e-9,
		decayType: "alpha",
		color: "#ff5555",
		product: "Th-229",
		energy: "4.91 MeV",
		uses: "Combustível em reatores de tório",
		electronConfig: "[Rn] 5f³ 6d¹ 7s²"
	},
	plutonium239: {
		id: 'plutonium239',
		name: "Plutônio-239",
		symbol: "Pu-239",
		atomicNumber: 94,
		protons: 94,
		neutrons: 145,
		electrons: 94,
		halfLife: 2.411e4,
		lambda: 2.874e-5,
		decayType: "alpha",
		color: "#ff8888",
		product: "U-235",
		energy: "5.16 MeV",
		uses: "Armas nucleares, combustível nuclear",
		electronConfig: "[Rn] 5f⁶ 7s²"
	},
	plutonium238: {
		id: 'plutonium238',
		name: "Plutônio-238",
		symbol: "Pu-238",
		atomicNumber: 94,
		protons: 94,
		neutrons: 144,
		electrons: 94,
		halfLife: 8.77e1,
		lambda: 7.9e-3,
		decayType: "alpha",
		color: "#ffaaaa",
		product: "U-234",
		energy: "5.59 MeV",
		uses: "Geradores termoelétricos em sondas espaciais",
		electronConfig: "[Rn] 5f⁶ 7s²"
	},
	plutonium240: {
		id: 'plutonium240',
		name: "Plutônio-240",
		symbol: "Pu-240",
		atomicNumber: 94,
		protons: 94,
		neutrons: 146,
		electrons: 94,
		halfLife: 6.56e3,
		lambda: 1.06e-4,
		decayType: "alpha",
		color: "#ff9999",
		product: "U-236",
		energy: "5.26 MeV",
		uses: "Componente do plutônio de reator",
		electronConfig: "[Rn] 5f⁶ 7s²"
	},
	thorium232: {
		id: 'thorium232',
		name: "Tório-232",
		symbol: "Th-232",
		atomicNumber: 90,
		protons: 90,
		neutrons: 142,
		electrons: 90,
		halfLife: 1.405e10,
		lambda: 4.9e-11,
		decayType: "alpha",
		color: "#ff4444",
		product: "Ra-228",
		energy: "4.01 MeV",
		uses: "Ciclo de reatores com tório, ligas metálicas",
		electronConfig: "[Rn] 6d² 7s²"
	},
	thorium228: {
		id: 'thorium228',
		name: "Tório-228",
		symbol: "Th-228",
		atomicNumber: 90,
		protons: 90,
		neutrons: 138,
		electrons: 90,
		halfLife: 1.9116,
		lambda: 0.3629,
		decayType: "alpha",
		color: "#ff5555",
		product: "Ra-224",
		energy: "5.52 MeV",
		uses: "Radiofármacos, pesquisa",
		electronConfig: "[Rn] 6d² 7s²"
	},
	neptunium237: {
		id: 'neptunium237',
		name: "Netúnio-237",
		symbol: "Np-237",
		atomicNumber: 93,
		protons: 93,
		neutrons: 144,
		electrons: 93,
		halfLife: 2.144e6,
		lambda: 3.23e-10,
		decayType: "alpha",
		color: "#ff7777",
		product: "Pa-233",
		energy: "4.96 MeV",
		uses: "Produção de Pu-238, detectores de nêutrons",
		electronConfig: "[Rn] 5f⁴ 6d¹ 7s²"
	},
	americium241: {
		id: 'americium241',
		name: "Amerício-241",
		symbol: "Am-241",
		atomicNumber: 95,
		protons: 95,
		neutrons: 146,
		electrons: 95,
		halfLife: 4.32e2,
		lambda: 1.6e-3,
		decayType: "alpha",
		color: "#ffaa44",
		product: "Np-237",
		energy: "5.49 MeV",
		uses: "Detectores de fumaça, radiografia",
		electronConfig: "[Rn] 5f⁷ 7s²"
	},
	curium244: {
		id: 'curium244',
		name: "Cúrio-244",
		symbol: "Cm-244",
		atomicNumber: 96,
		protons: 96,
		neutrons: 148,
		electrons: 96,
		halfLife: 1.81e1,
		lambda: 3.82e-2,
		decayType: "alpha",
		color: "#ffbb44",
		product: "Pu-240",
		energy: "5.90 MeV",
		uses: "Fonte de energia em missões espaciais",
		electronConfig: "[Rn] 5f⁷ 6d¹ 7s²"
	},
	berkelium247: {
		id: 'berkelium247',
		name: "Berquélio-247",
		symbol: "Bk-247",
		atomicNumber: 97,
		protons: 97,
		neutrons: 150,
		electrons: 97,
		halfLife: 1.38e3,
		lambda: 5.02e-4,
		decayType: "alpha",
		color: "#ffcc44",
		product: "Am-243",
		energy: "5.89 MeV",
		uses: "Pesquisa científica, síntese de elementos",
		electronConfig: "[Rn] 5f⁹ 7s²"
	},
	californium252: {
		id: 'californium252',
		name: "Califórnio-252",
		symbol: "Cf-252",
		atomicNumber: 98,
		protons: 98,
		neutrons: 154,
		electrons: 98,
		halfLife: 2.645,
		lambda: 0.262,
		decayType: "alpha",
		color: "#ffdd44",
		product: "Cm-248",
		energy: "6.22 MeV",
		uses: "Fontes de nêutrons, radiografia industrial",
		electronConfig: "[Rn] 5f¹⁰ 7s²"
	},

	// Série do rádio (expandido)
	radium226: {
		id: 'radium226',
		name: "Rádio-226",
		symbol: "Ra-226",
		atomicNumber: 88,
		protons: 88,
		neutrons: 138,
		electrons: 88,
		halfLife: 1600,
		lambda: 1.373e-3,
		decayType: "alpha",
		color: "#ff8844",
		product: "Rn-222",
		energy: "4.87 MeV",
		uses: "Histórico em medicina, pesquisa científica",
		electronConfig: "[Rn] 7s²"
	},
	radium223: {
		id: 'radium223',
		name: "Rádio-223",
		symbol: "Ra-223",
		atomicNumber: 88,
		protons: 88,
		neutrons: 135,
		electrons: 88,
		halfLife: 11.43,
		lambda: 0.0606,
		decayType: "alpha",
		color: "#ff9955",
		product: "Rn-219",
		energy: "5.87 MeV",
		uses: "Tratamento de câncer ósseo (Xofigo)",
		electronConfig: "[Rn] 7s²"
	},
	radon222: {
		id: 'radon222',
		name: "Radônio-222",
		symbol: "Rn-222",
		atomicNumber: 86,
		protons: 86,
		neutrons: 136,
		electrons: 86,
		halfLife: 3.82,
		lambda: 2.1e-1,
		decayType: "alpha",
		color: "#ff6666",
		product: "Po-218",
		energy: "5.59 MeV",
		uses: "Radioterapia, estudos geológicos",
		electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶"
	},
	radon220: {
		id: 'radon220',
		name: "Radônio-220",
		symbol: "Rn-220",
		atomicNumber: 86,
		protons: 86,
		neutrons: 134,
		electrons: 86,
		halfLife: 55.6,
		lambda: 0.0125,
		decayType: "alpha",
		color: "#ff7777",
		product: "Po-216",
		energy: "6.41 MeV",
		uses: "Pesquisa em física nuclear",
		electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶"
	},
	polonium210: {
		id: 'polonium210',
		name: "Polônio-210",
		symbol: "Po-210",
		atomicNumber: 84,
		protons: 84,
		neutrons: 126,
		electrons: 84,
		halfLife: 0.38,
		lambda: 1.82,
		decayType: "alpha",
		color: "#ff6666",
		product: "Pb-206",
		energy: "5.41 MeV",
		uses: "Fontes de nêutrons, eliminadores de estática",
		electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴"
	},
	polonium218: {
		id: 'polonium218',
		name: "Polônio-218",
		symbol: "Po-218",
		atomicNumber: 84,
		protons: 84,
		neutrons: 134,
		electrons: 84,
		halfLife: 3.10,
		lambda: 0.224,
		decayType: "alpha",
		color: "#ff7777",
		product: "Pb-214",
		energy: "6.12 MeV",
		uses: "Pesquisa em decaimento radioativo",
		electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴"
	},
	astato218: {
		id: 'astato218',
		name: "Astato-218",
		symbol: "At-218",
		atomicNumber: 85,
		protons: 85,
		neutrons: 133,
		electrons: 85,
		halfLife: 1.5,
		lambda: 0.462,
		decayType: "alpha",
		color: "#ff8888",
		product: "Bi-214",
		energy: "6.87 MeV",
		uses: "Pesquisa em radioquímica",
		electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵"
	},
	bismuto210: {
		id: 'bismuto210',
		name: "Bismuto-210",
		symbol: "Bi-210",
		atomicNumber: 83,
		protons: 83,
		neutrons: 127,
		electrons: 83,
		halfLife: 5.012,
		lambda: 0.138,
		decayType: "beta",
		color: "#88aaff",
		product: "Po-210",
		energy: "1.16 MeV",
		uses: "Pesquisa nuclear",
		electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³"
	},
	chumbo210: {
		id: 'chumbo210',
		name: "Chumbo-210",
		symbol: "Pb-210",
		atomicNumber: 82,
		protons: 82,
		neutrons: 128,
		electrons: 82,
		halfLife: 22.3,
		lambda: 0.0311,
		decayType: "beta",
		color: "#88aaff",
		product: "Bi-210",
		energy: "0.063 MeV",
		uses: "Datação de sedimentos, estudos ambientais",
		electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²"
	},

	// Metais de transição radioativos (expandido)
	cobalt60: {
		id: 'cobalt60',
		name: "Cobalto-60",
		symbol: "Co-60",
		atomicNumber: 27,
		protons: 27,
		neutrons: 33,
		electrons: 27,
		halfLife: 5.27,
		lambda: 4.168e-1,
		decayType: "beta",
		color: "#4488ff",
		product: "Ni-60",
		energy: "2.82 MeV (β+γ)",
		uses: "Radioterapia, esterilização de equipamentos",
		electronConfig: "[Ar] 3d⁷ 4s²"
	},
	cobalt57: {
		id: 'cobalt57',
		name: "Cobalto-57",
		symbol: "Co-57",
		atomicNumber: 27,
		protons: 27,
		neutrons: 30,
		electrons: 27,
		halfLife: 271.8,
		lambda: 0.00255,
		decayType: "gamma",
		color: "#5599ff",
		product: "Fe-57",
		energy: "0.122 MeV (γ)",
		uses: "Marcador em medicina nuclear",
		electronConfig: "[Ar] 3d⁷ 4s²"
	},
	cesium137: {
		id: 'cesium137',
		name: "Césio-137",
		symbol: "Cs-137",
		atomicNumber: 55,
		protons: 55,
		neutrons: 82,
		electrons: 55,
		halfLife: 30.17,
		lambda: 7.309e-2,
		decayType: "beta",
		color: "#6666ff",
		product: "Ba-137m",
		energy: "1.17 MeV (β+γ)",
		uses: "Radioterapia, calibração de equipamentos",
		electronConfig: "[Xe] 6s¹"
	},
	cesium134: {
		id: 'cesium134',
		name: "Césio-134",
		symbol: "Cs-134",
		atomicNumber: 55,
		protons: 55,
		neutrons: 79,
		electrons: 55,
		halfLife: 2.0652,
		lambda: 0.335,
		decayType: "beta",
		color: "#7777ff",
		product: "Ba-134",
		energy: "2.06 MeV (β+γ)",
		uses: "Tracer em estudos ambientais",
		electronConfig: "[Xe] 6s¹"
	},
	strontium90: {
		id: 'strontium90',
		name: "Estrôncio-90",
		symbol: "Sr-90",
		atomicNumber: 38,
		protons: 38,
		neutrons: 52,
		electrons: 38,
		halfLife: 28.8,
		lambda: 2.4e-2,
		decayType: "beta",
		color: "#00ff88",
		product: "Y-90",
		energy: "2.28 MeV (β)",
		uses: "Fonte beta em pesquisa, terapia",
		electronConfig: "[Kr] 5s²"
	},
	strontium89: {
		id: 'strontium89',
		name: "Estrôncio-89",
		symbol: "Sr-89",
		atomicNumber: 38,
		protons: 38,
		neutrons: 51,
		electrons: 38,
		halfLife: 50.5,
		lambda: 0.0137,
		decayType: "beta",
		color: "#11ff99",
		product: "Y-89",
		energy: "1.50 MeV (β)",
		uses: "Tratamento de metástases ósseas",
		electronConfig: "[Kr] 5s²"
	},
	itrio90: {
		id: 'itrio90',
		name: "Ítrio-90",
		symbol: "Y-90",
		atomicNumber: 39,
		protons: 39,
		neutrons: 51,
		electrons: 39,
		halfLife: 2.67,
		lambda: 0.259,
		decayType: "beta",
		color: "#00ffaa",
		product: "Zr-90",
		energy: "2.28 MeV (β)",
		uses: "Radioterapia, tratamento de tumores",
		electronConfig: "[Kr] 4d¹ 5s²"
	},
	rutenio106: {
		id: 'rutenio106',
		name: "Rutênio-106",
		symbol: "Ru-106",
		atomicNumber: 44,
		protons: 44,
		neutrons: 62,
		electrons: 44,
		halfLife: 373.6,
		lambda: 0.00185,
		decayType: "beta",
		color: "#44ff88",
		product: "Rh-106",
		energy: "0.039 MeV (β)",
		uses: "Fontes para braquiterapia ocular",
		electronConfig: "[Kr] 4d⁷ 5s¹"
	},
	rodio106: {
		id: 'rodio106',
		name: "Ródio-106",
		symbol: "Rh-106",
		atomicNumber: 45,
		protons: 45,
		neutrons: 61,
		electrons: 45,
		halfLife: 29.9,
		lambda: 0.0232,
		decayType: "beta",
		color: "#55ff99",
		product: "Pd-106",
		energy: "3.54 MeV (β)",
		uses: "Filha do Ru-106 em aplicações médicas",
		electronConfig: "[Kr] 4d⁸ 5s¹"
	},
	niquel63: {
		id: 'niquel63',
		name: "Níquel-63",
		symbol: "Ni-63",
		atomicNumber: 28,
		protons: 28,
		neutrons: 35,
		electrons: 28,
		halfLife: 100.1,
		lambda: 0.00692,
		decayType: "beta",
		color: "#66aaff",
		product: "Cu-63",
		energy: "0.067 MeV (β)",
		uses: "Detectores de fumaça, fontes beta",
		electronConfig: "[Ar] 3d⁸ 4s²"
	},

	// Não-metais radioativos (expandido)
	carbon14: {
		id: 'carbon14',
		name: "Carbono-14",
		symbol: "C-14",
		atomicNumber: 6,
		protons: 6,
		neutrons: 8,
		electrons: 6,
		halfLife: 5730,
		lambda: 1.209e-4,
		decayType: "beta",
		color: "#00ff88",
		product: "N-14",
		energy: "0.156 MeV (β)",
		uses: "Datação de materiais orgânicos",
		electronConfig: "1s² 2s² 2p²"
	},
	tritium: {
		id: 'tritium',
		name: "Trítio",
		symbol: "H-3",
		atomicNumber: 1,
		protons: 1,
		neutrons: 2,
		electrons: 1,
		halfLife: 12.32,
		lambda: 1.782e-1,
		decayType: "beta",
		color: "#00ffff",
		product: "He-3",
		energy: "0.0186 MeV (β)",
		uses: "Marcadores biológicos, estudos de fusão",
		electronConfig: "1s¹"
	},
	iodine131: {
		id: 'iodine131',
		name: "Iodo-131",
		symbol: "I-131",
		atomicNumber: 53,
		protons: 53,
		neutrons: 78,
		electrons: 53,
		halfLife: 8.02,
		lambda: 8.7e-2,
		decayType: "beta",
		color: "#00ff88",
		product: "Xe-131",
		energy: "0.97 MeV (β+γ)",
		uses: "Diagnóstico e tratamento da tireoide",
		electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵"
	},
	iodine125: {
		id: 'iodine125',
		name: "Iodo-125",
		symbol: "I-125",
		atomicNumber: 53,
		protons: 53,
		neutrons: 72,
		electrons: 53,
		halfLife: 59.4,
		lambda: 0.0117,
		decayType: "gamma",
		color: "#11ff99",
		product: "Te-125",
		energy: "0.035 MeV (γ)",
		uses: "Braquiterapia, radioimunoensaios",
		electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵"
	},
	iodine129: {
		id: 'iodine129',
		name: "Iodo-129",
		symbol: "I-129",
		atomicNumber: 53,
		protons: 53,
		neutrons: 76,
		electrons: 53,
		halfLife: 1.57e7,
		lambda: 4.41e-11,
		decayType: "beta",
		color: "#22ffaa",
		product: "Xe-129",
		energy: "0.194 MeV (β)",
		uses: "Datação geológica, estudos ambientais",
		electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵"
	},
	fosforo32: {
		id: 'fosforo32',
		name: "Fósforo-32",
		symbol: "P-32",
		atomicNumber: 15,
		protons: 15,
		neutrons: 17,
		electrons: 15,
		halfLife: 14.29,
		lambda: 0.0485,
		decayType: "beta",
		color: "#88ff44",
		product: "S-32",
		energy: "1.71 MeV (β)",
		uses: "Pesquisa biológica, tratamento de doenças sanguíneas",
		electronConfig: "[Ne] 3s² 3p³"
	},
	enxofre35: {
		id: 'enxofre35',
		name: "Enxofre-35",
		symbol: "S-35",
		atomicNumber: 16,
		protons: 16,
		neutrons: 19,
		electrons: 16,
		halfLife: 87.5,
		lambda: 0.00792,
		decayType: "beta",
		color: "#99ff55",
		product: "Cl-35",
		energy: "0.167 MeV (β)",
		uses: "Marcador em estudos bioquímicos",
		electronConfig: "[Ne] 3s² 3p⁴"
	},
	cloro36: {
		id: 'cloro36',
		name: "Cloro-36",
		symbol: "Cl-36",
		atomicNumber: 17,
		protons: 17,
		neutrons: 19,
		electrons: 17,
		halfLife: 3.01e5,
		lambda: 2.30e-9,
		decayType: "beta",
		color: "#aaff66",
		product: "Ar-36",
		energy: "0.714 MeV (β)",
		uses: "Datação de águas subterrâneas",
		electronConfig: "[Ne] 3s² 3p⁵"
	},

	// Terra rara radioativos (expandido)
	technetium99m: {
		id: 'technetium99m',
		name: "Tecnécio-99m",
		symbol: "Tc-99m",
		atomicNumber: 43,
		protons: 43,
		neutrons: 56,
		electrons: 43,
		halfLife: 0.25,
		lambda: 2.8,
		decayType: "gamma",
		color: "#8888ff",
		product: "Tc-99",
		energy: "0.141 MeV (γ)",
		uses: "Imagem médica (cintilografia)",
		electronConfig: "[Kr] 4d⁵ 5s²"
	},
	technetium99: {
		id: 'technetium99',
		name: "Tecnécio-99",
		symbol: "Tc-99",
		atomicNumber: 43,
		protons: 43,
		neutrons: 56,
		electrons: 43,
		halfLife: 2.111e5,
		lambda: 3.28e-9,
		decayType: "beta",
		color: "#9999ff",
		product: "Ru-99",
		energy: "0.294 MeV (β)",
		uses: "Produto de fissão, pesquisa",
		electronConfig: "[Kr] 4d⁵ 5s²"
	},
	promethium147: {
		id: 'promethium147',
		name: "Promécio-147",
		symbol: "Pm-147",
		atomicNumber: 61,
		protons: 61,
		neutrons: 86,
		electrons: 61,
		halfLife: 2.62,
		lambda: 2.64e-1,
		decayType: "beta",
		color: "#00ffaa",
		product: "Sm-147",
		energy: "0.224 MeV (β)",
		uses: "Fontes beta, luminosos noturnos",
		electronConfig: "[Xe] 4f⁵ 6s²"
	},
	samario147: {
		id: 'samario147',
		name: "Samário-147",
		symbol: "Sm-147",
		atomicNumber: 62,
		protons: 62,
		neutrons: 85,
		electrons: 62,
		halfLife: 1.06e11,
		lambda: 6.54e-12,
		decayType: "alpha",
		color: "#aaff88",
		product: "Nd-143",
		energy: "2.31 MeV (α)",
		uses: "Datação geológica (geocronologia)",
		electronConfig: "[Xe] 4f⁶ 6s²"
	},
	samario153: {
		id: 'samario153',
		name: "Samário-153",
		symbol: "Sm-153",
		atomicNumber: 62,
		protons: 62,
		neutrons: 91,
		electrons: 62,
		halfLife: 1.95,
		lambda: 0.355,
		decayType: "beta",
		color: "#bbff99",
		product: "Eu-153",
		energy: "0.81 MeV (β)",
		uses: "Tratamento de dor óssea metastática",
		electronConfig: "[Xe] 4f⁶ 6s²"
	},
	europio152: {
		id: 'europio152',
		name: "Európio-152",
		symbol: "Eu-152",
		atomicNumber: 63,
		protons: 63,
		neutrons: 89,
		electrons: 63,
		halfLife: 13.5,
		lambda: 0.0513,
		decayType: "beta",
		color: "#ccffaa",
		product: "Gd-152",
		energy: "1.87 MeV (β+γ)",
		uses: "Fontes de calibração, pesquisa",
		electronConfig: "[Xe] 4f⁷ 6s²"
	},
	gadolinio153: {
		id: 'gadolinio153',
		name: "Gadolínio-153",
		symbol: "Gd-153",
		atomicNumber: 64,
		protons: 64,
		neutrons: 89,
		electrons: 64,
		halfLife: 240.4,
		lambda: 0.00288,
		decayType: "gamma",
		color: "#ddffbb",
		product: "Eu-153",
		energy: "0.103 MeV (γ)",
		uses: "Densitometria óssea",
		electronConfig: "[Xe] 4f⁷ 5d¹ 6s²"
	},

	// Alcalinos e alcalino-terrosos (expandido)
	potassium40: {
		id: 'potassium40',
		name: "Potássio-40",
		symbol: "K-40",
		atomicNumber: 19,
		protons: 19,
		neutrons: 21,
		electrons: 19,
		halfLife: 1.251e9,
		lambda: 5.5e-10,
		decayType: "beta",
		color: "#00ff88",
		product: "Ca-40 / Ar-40",
		energy: "1.31 MeV (β)",
		uses: "Datação geológica, radioatividade natural",
		electronConfig: "[Ar] 4s¹"
	},
	rubidium87: {
		id: 'rubidium87',
		name: "Rubídio-87",
		symbol: "Rb-87",
		atomicNumber: 37,
		protons: 37,
		neutrons: 50,
		electrons: 37,
		halfLife: 4.92e10,
		lambda: 4.47e-11,
		decayType: "beta",
		color: "#00ffaa",
		product: "Sr-87",
		energy: "0.283 MeV (β)",
		uses: "Datação geológica (rochas ígneas)",
		electronConfig: "[Kr] 5s¹"
	},

	// Gases nobres (expandido)
	xenon133: {
		id: 'xenon133',
		name: "Xenônio-133",
		symbol: "Xe-133",
		atomicNumber: 54,
		protons: 54,
		neutrons: 79,
		electrons: 54,
		halfLife: 5.25,
		lambda: 1.32e-1,
		decayType: "beta",
		color: "#88aaff",
		product: "Cs-133",
		energy: "0.427 MeV (β+γ)",
		uses: "Imagem médica pulmonar",
		electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁶"
	},
	xenon135: {
		id: 'xenon135',
		name: "Xenônio-135",
		symbol: "Xe-135",
		atomicNumber: 54,
		protons: 54,
		neutrons: 81,
		electrons: 54,
		halfLife: 9.14,
		lambda: 0.0758,
		decayType: "beta",
		color: "#99bbff",
		product: "Cs-135",
		energy: "1.16 MeV (β)",
		uses: "Veneno de nêutrons em reatores",
		electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁶"
	},
	krypton85: {
		id: 'krypton85',
		name: "Criptônio-85",
		symbol: "Kr-85",
		atomicNumber: 36,
		protons: 36,
		neutrons: 49,
		electrons: 36,
		halfLife: 10.76,
		lambda: 6.44e-2,
		decayType: "beta",
		color: "#88aaff",
		product: "Rb-85",
		energy: "0.687 MeV (β)",
		uses: "Indicador de vazamentos, calibração",
		electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁶"
	},
	argonio39: {
		id: 'argonio39',
		name: "Argônio-39",
		symbol: "Ar-39",
		atomicNumber: 18,
		protons: 18,
		neutrons: 21,
		electrons: 18,
		halfLife: 269,
		lambda: 0.00258,
		decayType: "beta",
		color: "#77aaff",
		product: "K-39",
		energy: "0.565 MeV (β)",
		uses: "Datação de águas oceânicas",
		electronConfig: "[Ne] 3s² 3p⁶"
	},

	// Outros elementos importantes (expandido)
	beryllium7: {
		id: 'beryllium7',
		name: "Berílio-7",
		symbol: "Be-7",
		atomicNumber: 4,
		protons: 4,
		neutrons: 3,
		electrons: 4,
		halfLife: 53.22,
		lambda: 1.3e-2,
		decayType: "beta",
		color: "#00ffaa",
		product: "Li-7",
		energy: "0.862 MeV (β+γ)",
		uses: "Estudos de física solar, datação geológica",
		electronConfig: "1s² 2s²"
	},
	sodium22: {
		id: 'sodium22',
		name: "Sódio-22",
		symbol: "Na-22",
		atomicNumber: 11,
		protons: 11,
		neutrons: 11,
		electrons: 11,
		halfLife: 2.6,
		lambda: 2.67e-1,
		decayType: "beta",
		color: "#00ffaa",
		product: "Ne-22",
		energy: "2.84 MeV (β+γ)",
		uses: "Fontes de pósitrons, PET scan",
		electronConfig: "[Ne] 3s¹"
	},
	aluminio26: {
		id: 'aluminio26',
		name: "Alumínio-26",
		symbol: "Al-26",
		atomicNumber: 13,
		protons: 13,
		neutrons: 13,
		electrons: 13,
		halfLife: 7.17e5,
		lambda: 9.66e-10,
		decayType: "beta",
		color: "#aaddff",
		product: "Mg-26",
		energy: "4.00 MeV (β)",
		uses: "Datação geológica, estudos meteoríticos",
		electronConfig: "[Ne] 3s² 3p¹"
	},
	calcio41: {
		id: 'calcio41',
		name: "Cálcio-41",
		symbol: "Ca-41",
		atomicNumber: 20,
		protons: 20,
		neutrons: 21,
		electrons: 20,
		halfLife: 1.02e5,
		lambda: 6.79e-9,
		decayType: "beta",
		color: "#bbeeff",
		product: "K-41",
		energy: "0.421 MeV (β)",
		uses: "Estudos de metabolismo ósseo",
		electronConfig: "[Ar] 4s²"
	},
	escandio46: {
		id: 'escandio46',
		name: "Escândio-46",
		symbol: "Sc-46",
		atomicNumber: 21,
		protons: 21,
		neutrons: 25,
		electrons: 21,
		halfLife: 83.8,
		lambda: 0.00827,
		decayType: "beta",
		color: "#cceeff",
		product: "Ti-46",
		energy: "1.48 MeV (β+γ)",
		uses: "Marcador em estudos metalúrgicos",
		electronConfig: "[Ar] 3d¹ 4s²"
	},
	vanadio48: {
		id: 'vanadio48',
		name: "Vanádio-48",
		symbol: "V-48",
		atomicNumber: 23,
		protons: 23,
		neutrons: 25,
		electrons: 23,
		halfLife: 15.97,
		lambda: 0.0434,
		decayType: "beta",
		color: "#ddeeff",
		product: "Cr-48",
		energy: "2.70 MeV (β+γ)",
		uses: "Pesquisa em física nuclear",
		electronConfig: "[Ar] 3d³ 4s²"
	},
	manganes54: {
		id: 'manganes54',
		name: "Manganês-54",
		symbol: "Mn-54",
		atomicNumber: 25,
		protons: 25,
		neutrons: 29,
		electrons: 25,
		halfLife: 312.2,
		lambda: 0.00222,
		decayType: "gamma",
		color: "#eeffff",
		product: "Cr-54",
		energy: "0.835 MeV (γ)",
		uses: "Calibração de espectrômetros",
		electronConfig: "[Ar] 3d⁵ 4s²"
	},
	ferro55: {
		id: 'ferro55',
		name: "Ferro-55",
		symbol: "Fe-55",
		atomicNumber: 26,
		protons: 26,
		neutrons: 29,
		electrons: 26,
		halfLife: 2.737,
		lambda: 0.253,
		decayType: "gamma",
		color: "#ffeedd",
		product: "Mn-55",
		energy: "0.231 MeV (γ)",
		uses: "Análise por fluorescência de raios X",
		electronConfig: "[Ar] 3d⁶ 4s²"
	},
	cobre64: {
		id: 'cobre64',
		name: "Cobre-64",
		symbol: "Cu-64",
		atomicNumber: 29,
		protons: 29,
		neutrons: 35,
		electrons: 29,
		halfLife: 12.7,
		lambda: 0.0546,
		decayType: "beta",
		color: "#ffcc88",
		product: "Ni-64 / Zn-64",
		energy: "1.68 MeV (β)",
		uses: "PET imaging, terapia",
		electronConfig: "[Ar] 3d¹⁰ 4s¹"
	},
	zinco65: {
		id: 'zinco65',
		name: "Zinco-65",
		symbol: "Zn-65",
		atomicNumber: 30,
		protons: 30,
		neutrons: 35,
		electrons: 30,
		halfLife: 243.9,
		lambda: 0.00284,
		decayType: "beta",
		color: "#ffdd99",
		product: "Cu-65",
		energy: "1.35 MeV (β+γ)",
		uses: "Estudos de metabolismo",
		electronConfig: "[Ar] 3d¹⁰ 4s²"
	},
	germanio68: {
		id: 'germanio68',
		name: "Germânio-68",
		symbol: "Ge-68",
		atomicNumber: 32,
		protons: 32,
		neutrons: 36,
		electrons: 32,
		halfLife: 270.8,
		lambda: 0.00256,
		decayType: "beta",
		color: "#ffeeaa",
		product: "Ga-68",
		energy: "2.92 MeV (β)",
		uses: "Gerador de Gálio-68 para PET",
		electronConfig: "[Ar] 3d¹⁰ 4s² 4p²"
	},
	gallium67: {
		id: 'gallium67',
		name: "Gálio-67",
		symbol: "Ga-67",
		atomicNumber: 31,
		protons: 31,
		neutrons: 36,
		electrons: 31,
		halfLife: 3.261,
		lambda: 0.212,
		decayType: "gamma",
		color: "#ffffbb",
		product: "Zn-67",
		energy: "0.393 MeV (γ)",
		uses: "Cintilografia de infecções e tumores",
		electronConfig: "[Ar] 3d¹⁰ 4s² 4p¹"
	},
	arsenio73: {
		id: 'arsenio73',
		name: "Arsênio-73",
		symbol: "As-73",
		atomicNumber: 33,
		protons: 33,
		neutrons: 40,
		electrons: 33,
		halfLife: 80.3,
		lambda: 0.00863,
		decayType: "beta",
		color: "#ffccaa",
		product: "Se-73",
		energy: "1.36 MeV (β)",
		uses: "Pesquisa em toxicologia",
		electronConfig: "[Ar] 3d¹⁰ 4s² 4p³"
	},
	selenio75: {
		id: 'selenio75',
		name: "Selênio-75",
		symbol: "Se-75",
		atomicNumber: 34,
		protons: 34,
		neutrons: 41,
		electrons: 34,
		halfLife: 119.8,
		lambda: 0.00578,
		decayType: "gamma",
		color: "#ffddbb",
		product: "As-75",
		energy: "0.401 MeV (γ)",
		uses: "Radiografia industrial",
		electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁴"
	},
	bromo82: {
		id: 'bromo82',
		name: "Bromo-82",
		symbol: "Br-82",
		atomicNumber: 35,
		protons: 35,
		neutrons: 47,
		electrons: 35,
		halfLife: 1.47,
		lambda: 0.471,
		decayType: "beta",
		color: "#ffeebb",
		product: "Kr-82",
		energy: "3.10 MeV (β+γ)",
		uses: "Estudos de cinética química",
		electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁵"
	}
};

const elementOrder = [
	// Actinídeos
	'uranium238', 'uranium235', 'uranium233', 'plutonium239', 'plutonium238', 'plutonium240',
	'thorium232', 'thorium228', 'neptunium237', 'americium241', 'curium244', 'berkelium247', 'californium252',
	
	// Série do rádio
	'radium226', 'radium223', 'radon222', 'radon220', 'polonium210', 'polonium218', 
	'astato218', 'bismuto210', 'chumbo210',
	
	// Metais de transição
	'cobalt60', 'cobalt57', 'cesium137', 'cesium134', 'strontium90', 'strontium89',
	'itrio90', 'rutenio106', 'rodio106', 'niquel63',
	
	// Não-metais
	'carbon14', 'tritium', 'iodine131', 'iodine125', 'iodine129',
	'fosforo32', 'enxofre35', 'cloro36',
	
	// Terra raras
	'technetium99m', 'technetium99', 'promethium147', 'samario147', 'samario153',
	'europio152', 'gadolinio153',
	
	// Alcalinos/terrosos
	'potassium40', 'rubidium87',
	
	// Gases nobres
	'xenon133', 'xenon135', 'krypton85', 'argonio39',
	
	// Outros importantes
	'beryllium7', 'sodium22', 'aluminio26', 'calcio41', 'escandio46', 'vanadio48',
	'manganes54', 'ferro55', 'cobre64', 'zinco65', 'germanio68', 'gallium67',
	'arsenio73', 'selenio75', 'bromo82'
];

// ====== SISTEMA DE BUSCA ======
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const elements = document.querySelectorAll('.element-item');
        let hasResults = false;
        
        elements.forEach(element => {
            const symbol = element.querySelector('.element-symbol').textContent.toLowerCase();
            const name = element.querySelector('.element-name').textContent.toLowerCase();
            const halfLife = element.querySelector('.element-half-life').textContent.toLowerCase();
            
            const matches = symbol.includes(searchTerm) || 
                          name.includes(searchTerm) || 
                          halfLife.includes(searchTerm);
            
            if (matches) {
                element.style.display = 'flex';
                hasResults = true;
            } else {
                element.style.display = 'none';
            }
        });
        
        // Feedback visual quando não há resultados
        const elementsList = document.getElementById('elementsList');
        if (!hasResults && searchTerm.length > 0) {
            if (!document.getElementById('noResults')) {
                const noResults = document.createElement('div');
                noResults.id = 'noResults';
                noResults.className = 'no-results-message';
                noResults.textContent = `Nenhum elemento encontrado para "${searchTerm}"`;
                elementsList.appendChild(noResults);
            }
        } else {
            const noResults = document.getElementById('noResults');
            if (noResults) noResults.remove();
        }
    });
    
    // Limpar busca ao clicar no X (se adicionar um)
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.blur();
        }
    });
}

// Estilo para mensagem de "sem resultados"
const noResultsStyle = `
.no-results-message {
    text-align: center;
    padding: var(--space-lg);
    color: var(--text-tertiary);
    font-size: var(--font-sm);
    font-style: italic;
    border: 1px dashed var(--border-color);
    border-radius: var(--radius-sm);
    margin: var(--space-sm) 0;
}
`;

// Adicione os estilos dinamicamente
const styleSheet = document.createElement('style');
styleSheet.textContent = noResultsStyle;
document.head.appendChild(styleSheet);

let currentElementId = 'uranium238';
let chart = null;

// Atom 2D (meio)
let atomAngle = 0;
let atomAnimationFrame = null;
let atomInteractive = true;
let atomRepresentation = 'orbits';

// Canvas 2D central
let atomCanvas, atomCtx;

// ====== 3D ESTRUTURA (aba Estrutura) ======
let cloudShellGroups = [];
let structureScene, structureCamera, structureRenderer, structureControls;
let structureAtomGroup = null;
let structureElectronMeshes = [];
let structureAnimationId = null;
let cloudAnimationId = null;

// ====== CONTROLES DA VISUALIZAÇÃO ======
let viewMode = "orbital"; 
let isAnimationEnabled = true;

document.addEventListener('DOMContentLoaded', () => {
	initElementsList();
	initSearch();
	initChart();
	setupInputs();
	updateAllDisplays();
	initDecayFormula();
	initAtomCanvas();
	initStructure3D();
	startParticleAnimation();
});

// ====== LISTA DE ELEMENTOS ======
function initElementsList() {
	const list = document.getElementById('elementsList');
	elementOrder.forEach(id => {
		const el = elements[id];
		const div = document.createElement('div');
		div.className = 'element-item' + (id === currentElementId ? ' active' : '');
		div.dataset.id = id;

		div.innerHTML = `
			<div class="decay-dot decay-${el.decayType}"></div>
			<div class="element-symbol">${el.symbol}</div>
			<div class="element-name">${el.name.split('-')[0]}</div>
			<div class="element-half-life">${formatHalfLife(el.halfLife)}</div>
		`;

		div.addEventListener('click', () => {
			document.querySelectorAll('.element-item').forEach(b => b.classList.remove('active'));
			div.classList.add('active');
			currentElementId = id;
			updateAllDisplays();
			resetSimulation();
			startParticleAnimation();
		});

		list.appendChild(div);
	});
}

function setupInputs() {
	document.getElementById('initialAtoms').addEventListener('input', updateAllDisplays);
	document.getElementById('timeRange').addEventListener('input', updateAllDisplays);

	document.getElementById('interactiveToggle').addEventListener('change', (e) => {
		atomInteractive = e.target.checked;
		restartAtomAnimation();
	});

	document.getElementById('representationToggle').addEventListener('change', (e) => {
		atomRepresentation = e.target.checked ? 'cloud' : 'orbits';
		restartAtomAnimation();
	});
}

function initDecayFormula() {
	if (window.katex) {
		katex.render("N(t) = N_0 \\cdot e^{-\\lambda t}", document.getElementById('decayFormula'), {
			throwOnError: false,
			displayMode: true
		});
	}
}

// ====== FORMATOS ======
function formatHalfLife(years) {
	if (years >= 1e9) return (years / 1e9).toFixed(1) + "B anos";
	if (years >= 1e6) return (years / 1e6).toFixed(1) + "M anos";
	if (years >= 1e3) return (years / 1e3).toFixed(0) + "k anos";
	if (years >= 1) return years.toFixed(2) + " anos";
	const days = years * 365;
	if (days >= 1) return days.toFixed(1) + " dias";
	const hours = days * 24;
	return hours.toFixed(1) + " h";
}

function calculateActivity() {
	const N0 = parseInt(document.getElementById('initialAtoms').value, 10) || 0;
	const el = elements[currentElementId];
	const lambda = el.lambda;
	const activity = N0 * lambda * 3.154e7;
	return activity.toExponential(2) + " Bq";
}

// ====== CHART ======
function initChart() {
	const ctx = document.getElementById('decayChart').getContext('2d');
	chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: [],
			datasets: [{
				label: "Átomos restantes",
				data: [],
				borderWidth: 2,
				fill: true,
				tension: 0.35
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					labels: {
						color: '#ffffff',
						font: { size: 9 }
					}
				},
				title: {
					display: true,
					text: 'Curva de Decaimento Radioativo',
					color: '#ffffff',
					font: { size: 12 }
				},
				tooltip: {
					mode: 'index',
					intersect: false,
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					titleColor: '#ffffff',
					bodyColor: '#ffffff',
					borderColor: '#00ff88',
					borderWidth: 1,
					callbacks: {
						label: function (context) {
							const el = elements[currentElementId];
							const percentage = ((context.parsed.y / parseInt(document.getElementById('initialAtoms').value)) * 100).toFixed(1);
							return [
								`Átomos: ${context.parsed.y.toFixed(0)}`,
								`Porcentagem: ${percentage}%`,
								`Meias-vidas: ${(context.parsed.x / el.halfLife).toFixed(2)}`
							];
						}
					}
				}
			},
			scales: {
				x: {
					title: {
						display: true,
						text: 'Tempo (anos)',
						color: '#cccccc',
						font: { size: 10 }
					},
					grid: { color: 'rgba(255,255,255,0.1)' },
					ticks: {
						color: '#888888',
						font: { size: 8 },
						maxTicksLimit: 12
					}
				},
				y: {
					title: {
						display: true,
						text: 'Átomos restando',
						color: '#cccccc',
						font: { size: 10 }
					},
					grid: { color: 'rgba(255,255,255,0.1)' },
					ticks: {
						color: '#888888',
						font: { size: 8 },
						callback: function (value) {
							return value.toLocaleString('pt-BR');
						}
					},
					beginAtZero: true
				}
			},
			interaction: {
				mode: 'nearest',
				axis: 'x',
				intersect: false
			}
		}
	});
}

function startSimulation() {
	const N0 = parseInt(document.getElementById('initialAtoms').value, 10) || 0;
	const totalTime = parseInt(document.getElementById('timeRange').value, 10) || 0;
	const el = elements[currentElementId];

	const steps = 150;
	chart.data.labels = [];
	chart.data.datasets[0].data = [];
	chart.data.datasets[0].borderColor = el.color;
	chart.data.datasets[0].backgroundColor = el.color + '26';

	const halfLives = Math.floor(totalTime / el.halfLife);

	for (let i = 0; i <= steps; i++) {
		const t = (i / steps) * totalTime;
		const N = N0 * Math.exp(-el.lambda * t);

		if (i % Math.floor(steps / Math.max(halfLives, 1)) === 0) {
			const halfLifeCount = (t / el.halfLife).toFixed(1);
			chart.data.labels.push(`${t.toFixed(0)} (${halfLifeCount} T½)`);
		} else {
			chart.data.labels.push(t.toFixed(0));
		}
		chart.data.datasets[0].data.push(Math.max(0, N));
	}

	chart.update();
	startParticleAnimation();
}

function resetSimulation() {
	if (chart) {
		chart.data.labels = [];
		chart.data.datasets[0].data = [];
		chart.update();
	}
	const canvas = document.getElementById('particleCanvas');
	canvas.innerHTML = '';
}

// ====== PARTICULAS (2D) ======
function startParticleAnimation() {
	const container = document.getElementById('particleCanvas');
	container.innerHTML = '';
	const el = elements[currentElementId];

	const count = 20;
	for (let i = 0; i < count; i++) {
		createParticle(container, el.decayType, el.color);
	}
	updateDecayTypeIndicator(el.decayType);
}

function updateDecayTypeIndicator(decayType) {
	const badge = document.getElementById('decayTypeBadge');
	badge.className = `decay-type-badge decay-type-${decayType}`;
	badge.textContent = decayType.toUpperCase();
}

function createParticle(container, type, color) {
	const p = document.createElement('div');
	p.className = 'particle';
	p.style.background = color;
	const w = container.offsetWidth || 260;
	const h = container.offsetHeight || 120;

	p.style.left = (Math.random() * w) + 'px';
	p.style.top = (Math.random() * h) + 'px';
	container.appendChild(p);

	const distance = type === 'alpha' ? 25 : type === 'beta' ? 35 : 30;
	const duration = type === 'alpha' ? 1800 : type === 'beta' ? 1400 : 1600;

	const deltaX = (Math.random() * distance) - distance / 2;
	const deltaY = (Math.random() * distance) - distance / 2;

	p.animate([
		{ opacity: 0, transform: 'scale(0.6)' },
		{ opacity: 1, transform: `scale(1.2) translate(${deltaX}px, ${deltaY}px)` },
		{ opacity: 0, transform: 'scale(0.2)' }
	], {
		duration: duration + Math.random() * 800,
		iterations: Infinity,
		easing: 'ease-out'
	});
}

// ====== ATOM 2D (CANVAS CENTRAL) ======
function initAtomCanvas() {
	atomCanvas = document.getElementById('atomCanvas');
	if (!atomCanvas) return;

	const dpr = window.devicePixelRatio || 1;
	const rect1 = atomCanvas.getBoundingClientRect();
	atomCanvas.width = rect1.width * dpr;
	atomCanvas.height = rect1.height * dpr;
	atomCtx = atomCanvas.getContext('2d');

	window.addEventListener('resize', () => {
		const rect = atomCanvas.getBoundingClientRect();
		atomCanvas.width = rect.width * dpr;
		atomCanvas.height = rect.height * dpr;
	});

	restartAtomAnimation();
}

function restartAtomAnimation() {
	cancelAnimationFrame(atomAnimationFrame);
	if (atomInteractive) {
		atomAngle = 0;
		animateAtom();
	} else {
		drawAtomFrame(atomCtx, atomCanvas);
	}
}

function animateAtom() {
	atomAngle += 0.03;
	drawAtomFrame(atomCtx, atomCanvas);
	atomAnimationFrame = requestAnimationFrame(animateAtom);
}

function drawAtomFrame(ctx, canvas) {
	if (!ctx || !canvas.width) return;
	const w = canvas.width;
	const h = canvas.height;
	ctx.clearRect(0, 0, w, h);

	const el = elements[currentElementId];
	const centerX = w / 2;
	const centerY = h / 2;
	const baseRadius = Math.min(w, h) * 0.05;

	drawNucleus2D(ctx, centerX, centerY, baseRadius * 2.5, el);

	if (atomRepresentation === 'orbits') {
		drawOrbits2D(ctx, centerX, centerY, baseRadius * 3, el);
	} else {
		drawCloud2D(ctx, centerX, centerY, baseRadius * 4, el);
	}

	updateAtomInfo(el);
}

function drawNucleus2D(ctx, cx, cy, radius, element) {
	const totalParticles = element.protons + element.neutrons;
	const particleRadius = Math.max(1.5, radius / Math.sqrt(totalParticles) * 0.7);

	for (let i = 0; i < element.neutrons; i++) {
		const angle = (i / element.neutrons) * Math.PI * 2;
		const r = radius * 0.6 * Math.sqrt(i / element.neutrons);
		const x = cx + r * Math.cos(angle + atomAngle * 0.5);
		const y = cy + r * Math.sin(angle + atomAngle * 0.5);
		ctx.fillStyle = '#888888';
		ctx.beginPath();
		ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
		ctx.fill();
	}

	for (let i = 0; i < element.protons; i++) {
		const angle = (i / element.protons) * Math.PI * 2 + Math.PI / element.protons;
		const r = radius * 0.6 * Math.sqrt(i / element.protons);
		const x = cx + r * Math.cos(angle - atomAngle * 0.3);
		const y = cy + r * Math.sin(angle - atomAngle * 0.3);
		ctx.fillStyle = element.color;
		ctx.beginPath();
		ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
		ctx.fill();
	}
}

function drawOrbits2D(ctx, cx, cy, baseRadius, element) {
	const shells = calculateElectronShells(element.electrons);

	shells.forEach((shell, shellIndex) => {
		const radius = baseRadius * (1 + shellIndex * 0.8);

		ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.ellipse(cx, cy, radius, radius * 0.8, shellIndex * 0.2, 0, Math.PI * 2);
		ctx.stroke();

		for (let i = 0; i < shell.electrons; i++) {
			const angle = atomAngle * (1 + shellIndex * 0.3) + (i / shell.electrons) * Math.PI * 2;
			const ex = cx + radius * Math.cos(angle) * 0.95;
			const ey = cy + radius * Math.sin(angle) * 0.72;

			ctx.fillStyle = '#00ff88';
			ctx.beginPath();
			ctx.arc(ex, ey, 3, 0, Math.PI * 2);
			ctx.fill();
		}
	});
}

function drawCloud2D(ctx, cx, cy, radius, element) {
	const points = element.electrons * 15;
	for (let i = 0; i < points; i++) {
		const r = radius * Math.sqrt(Math.random());
		const angle = Math.random() * Math.PI * 2;
		const ex = cx + r * Math.cos(angle) * 0.8;
		const ey = cy + r * Math.sin(angle) * 0.6;
		const alpha = 0.04 + Math.random() * 0.06;

		ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
		ctx.beginPath();
		ctx.arc(ex, ey, 2, 0, Math.PI * 2);
		ctx.fill();
	}
}

function calculateElectronShells(electrons) {
	const shells = [];
	let remaining = electrons;
	const maxPerShell = [2, 8, 18, 32, 32, 18, 8, 2];

	for (let i = 0; i < maxPerShell.length && remaining > 0; i++) {
		const electronsInShell = Math.min(remaining, maxPerShell[i]);
		shells.push({ shell: i + 1, electrons: electronsInShell });
		remaining -= electronsInShell;
	}
	return shells;
}

function updateAtomInfo(element) {
	const info = document.getElementById('atomInfo');
	info.innerHTML = `
		<strong>${element.symbol}</strong> - ${element.name}<br>
		Prótons: ${element.protons} | Nêutrons: ${element.neutrons} | Elétrons: ${element.electrons}
	`;
}

// ====== 3D: ESTRUTURA ATÔMICA (ABA ESTRUTURA) ======
function initStructure3D() {
	const canvas = document.getElementById('structureCanvas');
	const preview = document.getElementById('structurePreview');
	if (!canvas || !preview || typeof THREE === 'undefined') return;

	const width = preview.clientWidth;
	const height = preview.clientHeight || 260;

	structureScene = new THREE.Scene();
	structureScene.background = new THREE.Color(0x050505);

	structureCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
	structureCamera.position.set(0, 15, 40);

	structureRenderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha: true
	});
	structureRenderer.setPixelRatio(window.devicePixelRatio || 1);
	structureRenderer.setSize(width, height, false);

	const ambient = new THREE.AmbientLight(0xffffff, 0.35);
	structureScene.add(ambient);

	const point = new THREE.PointLight(0xffffff, 1.2);
	point.position.set(10, 15, 20);
	structureScene.add(point);

	const back = new THREE.PointLight(0x00ff88, 0.6);
	back.position.set(-20, -10, -10);
	structureScene.add(back);

	structureControls = new THREE.OrbitControls(structureCamera, structureRenderer.domElement);
	structureControls.enableDamping = true;
	structureControls.dampingFactor = 0.08;
	structureControls.enablePan = false;
	structureControls.minDistance = 10;
	structureControls.maxDistance = 80;

	window.addEventListener('resize', onStructureResize);

	buildAtom3D(elements[currentElementId]);
	animateStructure3D();
}

function onStructureResize() {
	if (!structureRenderer || !structureCamera) return;
	const preview = document.getElementById('structurePreview');
	if (!preview) return;
	const width = preview.clientWidth;
	const height = preview.clientHeight || 260;

	structureCamera.aspect = width / height;
	structureCamera.updateProjectionMatrix();
	structureRenderer.setSize(width, height, false);
}

function clearStructureScene() {
    // Cancelar animações
    cancelAnimationFrame(structureAnimationId);
    cancelAnimationFrame(cloudAnimationId);

    // Remove núcleo + elétrons
    if (structureAtomGroup) {
        structureScene.remove(structureAtomGroup);

        structureAtomGroup.traverse(obj => {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach(m => m.dispose());
                } else {
                    obj.material.dispose();
                }
            }
        });
        
        structureAtomGroup = null;
    }

    structureElectronMeshes = [];

    // Remove todas as nuvens
    if (cloudShellGroups && cloudShellGroups.length > 0) {
        cloudShellGroups.forEach(cloud => {
            structureScene.remove(cloud);
            if (cloud.geometry) cloud.geometry.dispose();
            if (cloud.material) cloud.material.dispose();
        });
        cloudShellGroups = [];
    }
}

function buildAtom3D(element) {
	if (!structureScene) return;
	clearStructureScene();

	structureAtomGroup = new THREE.Group();
	structureScene.add(structureAtomGroup);

	// Núcleo 3D
	const nucleusRadius = 4;
	const nucleusGeo = new THREE.SphereGeometry(nucleusRadius, 32, 32);
	const nucleusMat = new THREE.MeshPhongMaterial({
		color: new THREE.Color(element.color || 0xff6666),
		emissive: 0x111111,
		shininess: 80
	});
	const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
	structureAtomGroup.add(nucleusMesh);

	// "Grumos" no núcleo pra ficar mais orgânico
	const numLumps = 40;
	for (let i = 0; i < numLumps; i++) {
		const r = nucleusRadius * 0.6 * (0.5 + Math.random() * 0.5);
		const theta = Math.random() * 2 * Math.PI;
		const phi = Math.acos(2 * Math.random() - 1);
		const x = r * Math.sin(phi) * Math.cos(theta);
		const y = r * Math.sin(phi) * Math.sin(theta);
		const z = r * Math.cos(phi);

		const lumpGeo = new THREE.SphereGeometry(0.5, 12, 12);
		const isProton = i % 2 === 0;
		const lumpMat = new THREE.MeshPhongMaterial({
			color: isProton ? element.color : 0x888888,
			shininess: 50
		});
		const lump = new THREE.Mesh(lumpGeo, lumpMat);
		lump.position.set(x, y, z);
		structureAtomGroup.add(lump);
	}

	// Camadas eletrônicas
	const shells = calculateElectronShells(element.electrons);
	const baseRadius = 9;

	shells.forEach((shell, idx) => {
		const radius = baseRadius + idx * 3;

		// Órbita como anel
		const ringGeo = new THREE.RingGeometry(radius - 0.05, radius + 0.05, 64);
		const ringMat = new THREE.MeshBasicMaterial({
			color: 0x444444,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.4
		});
		const ring = new THREE.Mesh(ringGeo, ringMat);
		ring.rotation.x = Math.PI / 2;
		structureAtomGroup.add(ring);

		// Elétrons
		for (let i = 0; i < shell.electrons; i++) {
			const electronGeo = new THREE.SphereGeometry(0.7, 16, 16);
			const electronMat = new THREE.MeshPhongMaterial({
				color: 0x00ff88,
				emissive: 0x003322,
				shininess: 60
			});
			const electron = new THREE.Mesh(electronGeo, electronMat);

			const angleOffset = (i / shell.electrons) * Math.PI * 2;
			electron.userData = {
				radius,
				shellIndex: idx,
				angleOffset: angleOffset,
				angle: Math.random() * Math.PI*2,
				speed: 0.01 + Math.random() * 0.005
			};

			structureElectronMeshes.push(electron);
			structureAtomGroup.add(electron);
		}
	});

	// Atualiza infos textuais
	updateStructureInfo(element);
}

function animateStructure3D() {
    if (!structureRenderer || !structureCamera || !structureScene) {
        return;
    }
    
    structureAnimationId = requestAnimationFrame(animateStructure3D);
    
    const t = performance.now() * 0.001;

    structureElectronMeshes.forEach(m => {
        const { radius, shellIndex, angleOffset } = m.userData;
        const speed = 0.6 + shellIndex * 0.25;
        const angle = t * speed + angleOffset;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 1.3) * (radius * 0.25);

        m.position.set(x, y, z);
    });

    if (structureAtomGroup) {
        structureAtomGroup.rotation.y += 0.002;
    }

    if (structureControls) structureControls.update();
    structureRenderer.render(structureScene, structureCamera);
}

// ====== NUVEM ======
function buildElectronCloud(element) {
    if (!structureScene) return;
    clearStructureScene();

    structureAtomGroup = new THREE.Group();
    structureScene.add(structureAtomGroup);

    cloudShellGroups = [];

    const shells = calculateElectronShells(element.electrons);
    const baseRadius = 9;

    shells.forEach((shell, idx) => {
        const radius = baseRadius + idx * 3;

        // número de partículas proporcional ao número de elétrons
        const particles = shell.electrons * 120;

        const positions = new Float32Array(particles * 3);

        for (let i = 0; i < particles; i++) {
            // distribuição radial probabilística (esfera fuzzy)
            const r = radius + (Math.random() - 0.5) * 1.6;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            const index = i * 3;
            positions[index] = x;
            positions[index + 1] = y;
            positions[index + 2] = z;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x00ff88,
            size: 0.18,
            transparent: true,
            opacity: 0.55,
            blending: THREE.AdditiveBlending
        });

        const cloud = new THREE.Points(geometry, material);
        cloud.userData = { radius, shellIndex: idx };

        cloudShellGroups.push(cloud);
        structureScene.add(cloud);
    });

    // mantém o núcleo igual ao modo órbitas
    createNucleus(element);
}

function createNucleus(element) {
    const nucleusRadius = 4;
    const nucleusGeo = new THREE.SphereGeometry(nucleusRadius, 32, 32);
    const nucleusMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(element.color || 0xff6666),
        emissive: 0x111111,
        shininess: 80
    });

    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    structureAtomGroup.add(nucleus);
}

function animateCloud() {
	if (!structureRenderer || !structureCamera || !structureScene) return;
	
    cloudAnimationId = requestAnimationFrame(animateCloud);

    const t = performance.now() * 0.0008;

    cloudShellGroups.forEach((cloud, idx) => {
        const positions = cloud.geometry.attributes.position;

        for (let i = 0; i < positions.count; i++) {
            const ix = i * 3;
            const iy = ix + 1;
            const iz = ix + 2;

            // leve oscilação (efeito quântico)
            positions.array[ix] += Math.sin(t + i * 0.01) * 0.002;
            positions.array[iy] += Math.cos(t + i * 0.013) * 0.002;
            positions.array[iz] += Math.sin(t + i * 0.017) * 0.002;
        }

        positions.needsUpdate = true;
    });

    structureRenderer.render(structureScene, structureCamera);
}

// ====== MODO NÚCLEO ULTRARREALISTA ======
function buildRealisticNucleus(element) {
    if (!structureScene) return;
    clearStructureScene();

    structureAtomGroup = new THREE.Group();
    structureScene.add(structureAtomGroup);

    const protons = element.protons;
    const neutrons = element.neutrons;
    const totalNucleons = protons + neutrons;
    
    // Raio nuclear baseado na fórmula R = R₀ * A^(1/3), onde R₀ ≈ 1.2 fm
    const nuclearConstant = 1.2;
    const nucleusRadius = nuclearConstant * Math.pow(totalNucleons, 1/3);
    
    // Escala para visualização
    const visualScale = 0.8;
    const scaledRadius = nucleusRadius * visualScale;

    // Criar núcleo como contêiner
    const nucleusContainer = new THREE.Group();
    structureAtomGroup.add(nucleusContainer);

    // Arrays para armazenar partículas
    const protonMeshes = [];
    const neutronMeshes = [];

    // Força nuclear forte - parâmetros
    const strongForceDistance = 2.0;
    const repulsionForce = 0.5;

    // Posicionar nucleons usando algoritmo de empacotamento esférico
    const positions = calculateNuclearPacking(protons, neutrons, scaledRadius);

    // Criar prótons
    for (let i = 0; i < protons; i++) {
        const proton = createNucleon('proton', element.color);
        proton.position.copy(positions[i]);
        protonMeshes.push(proton);
        nucleusContainer.add(proton);
    }

    // Criar nêutrons
    for (let i = 0; i < neutrons; i++) {
        const neutron = createNucleon('neutron', 0x888888);
        neutron.position.copy(positions[protons + i]);
        neutronMeshes.push(neutron);
        nucleusContainer.add(neutron);
    }

    // Adicionar forças de interação para movimento realista
    setupNuclearForces(protonMeshes, neutronMeshes, strongForceDistance, repulsionForce);

    // Adicionar rótulos informativos
    addNuclearLabels(element, totalNucleons, scaledRadius);

    // Animação do núcleo
    animateRealisticNucleus(protonMeshes, neutronMeshes);

    return nucleusContainer;
}

function createNucleon(type, color) {
    // Tamanhos relativos baseados em dados reais
    const protonRadius = 0.8;
    const neutronRadius = 0.85;
    
    const radius = type === 'proton' ? protonRadius : neutronRadius;
    
    const geometry = new THREE.SphereGeometry(radius, 16, 16);
    
    let material;
    if (type === 'proton') {
        material = new THREE.MeshPhongMaterial({
            color: color,
            emissive: new THREE.Color(color).multiplyScalar(0.3),
            shininess: 90,
            specular: 0x444444
        });
    } else {
        material = new THREE.MeshPhongMaterial({
            color: 0x888888,
            emissive: 0x222222,
            shininess: 80,
            specular: 0x333333
        });
    }

    const nucleon = new THREE.Mesh(geometry, material);
    
    // Adicionar "glow" sutil
    const glowGeometry = new THREE.SphereGeometry(radius * 1.1, 12, 12);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: type === 'proton' ? color : 0x666666,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    nucleon.add(glow);

    // Propriedades físicas
    nucleon.userData = {
        type: type,
        velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
        ),
        mass: type === 'proton' ? 1.0 : 1.001,
        charge: type === 'proton' ? 1 : 0
    };

    return nucleon;
}

function calculateNuclearPacking(protons, neutrons, maxRadius) {
    const totalParticles = protons + neutrons;
    const positions = [];
    
    // Algoritmo de empacotamento esférico melhorado
    const maxAttempts = 1000;
    const minDistance = 1.6;
    
    for (let i = 0; i < totalParticles; i++) {
        let position;
        let attempts = 0;
        let validPosition = false;
        
        while (!validPosition && attempts < maxAttempts) {
            // Distribuição mais densa no centro (modelo de densidade nuclear)
            const r = maxRadius * Math.pow(Math.random(), 1/3);
            const theta = Math.acos(2 * Math.random() - 1);
            const phi = Math.random() * Math.PI * 2;
            
            position = new THREE.Vector3(
                r * Math.sin(theta) * Math.cos(phi),
                r * Math.sin(theta) * Math.sin(phi),
                r * Math.cos(theta)
            );
            
            // Verificar colisões
            validPosition = true;
            for (let j = 0; j < positions.length; j++) {
                if (position.distanceTo(positions[j]) < minDistance) {
                    validPosition = false;
                    break;
                }
            }
            
            attempts++;
        }
        
        if (!validPosition) {
            // Fallback: posição aleatória na superfície
            const r = maxRadius * 0.9;
            const theta = Math.acos(2 * Math.random() - 1);
            const phi = Math.random() * Math.PI * 2;
            position = new THREE.Vector3(
                r * Math.sin(theta) * Math.cos(phi),
                r * Math.sin(theta) * Math.sin(phi),
                r * Math.cos(theta)
            );
        }
        
        positions.push(position);
    }
    
    return positions;
}

function setupNuclearForces(protons, neutrons, strongForceDistance, repulsionForce) {
    const allNucleons = [...protons, ...neutrons];
    
    allNucleons.forEach(nucleon => {
        nucleon.userData.applyForces = function() {
            const force = new THREE.Vector3();
            
            // Interação com outros nucleons
            allNucleons.forEach(other => {
                if (nucleon === other) return;
                
                const distance = nucleon.position.distanceTo(other.position);
                const direction = new THREE.Vector3()
                    .subVectors(other.position, nucleon.position)
                    .normalize();
                
                // Força nuclear forte (atrativa em curta distância)
                if (distance < strongForceDistance * 1.5) {
                    const strongForce = (distance - strongForceDistance) * 0.01;
                    force.add(direction.multiplyScalar(strongForce));
                }
                
                // Repulsão coulombiana entre prótons
                if (nucleon.userData.charge > 0 && other.userData.charge > 0) {
                    const coulombForce = repulsionForce / (distance * distance);
                    force.add(direction.multiplyScalar(-coulombForce));
                }
                
                // Repulsão de contato (evitar sobreposição)
                if (distance < 1.4) {
                    const contactForce = 0.1 / (distance * distance);
                    force.add(direction.multiplyScalar(-contactForce));
                }
            });
            
            // Força de confinamento (mantém no núcleo)
            const centerDistance = nucleon.position.length();
            if (centerDistance > 5) {
                const confinementForce = -0.005 * centerDistance;
                force.add(nucleon.position.clone().normalize().multiplyScalar(confinementForce));
            }
            
            return force;
        };
    });
}

function animateRealisticNucleus(protons, neutrons) {
    const allNucleons = [...protons, ...neutrons];
    const damping = 0.95;
    
    function animate() {
        if (!isAnimationEnabled) return;
        
        cloudAnimationId = requestAnimationFrame(animate);
        
        // Aplicar forças e atualizar posições
        allNucleons.forEach(nucleon => {
            const force = nucleon.userData.applyForces();
            
            // Integração de velocidade (Euler simples)
            nucleon.userData.velocity.add(force);
            nucleon.userData.velocity.multiplyScalar(damping);
            
            // Atualizar posição
            nucleon.position.add(nucleon.userData.velocity);
            
            // Pequena rotação para efeito visual
            nucleon.rotation.x += 0.01;
            nucleon.rotation.y += 0.015;
        });
        
        structureRenderer.render(structureScene, structureCamera);
    }
    
    if (isAnimationEnabled) {
        animate();
    }
}

function addNuclearLabels(element, totalNucleons, radius) {
    // Informações do núcleo
    const infoGroup = new THREE.Group();
    
    // Linhas de força nuclear
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ff88, 
        transparent: true, 
        opacity: 0.3 
    });
    
    // Adicionar algumas linhas de força entre nucleons próximos
    const allNucleons = [];
    structureAtomGroup.traverse(child => {
        if (child.userData && child.userData.type) {
            allNucleons.push(child);
        }
    });
    
    for (let i = 0; i < Math.min(20, allNucleons.length); i++) {
        for (let j = i + 1; j < Math.min(i + 3, allNucleons.length); j++) {
            const distance = allNucleons[i].position.distanceTo(allNucleons[j].position);
            if (distance < 3) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    allNucleons[i].position,
                    allNucleons[j].position
                ]);
                const line = new THREE.Line(geometry, lineMaterial);
                infoGroup.add(line);
            }
        }
    }
    
    structureAtomGroup.add(infoGroup);
}

function showOnlyNucleus(element) {
    clearStructureScene();
    buildRealisticNucleus(element);
    
    // Ajustar câmera para melhor visualização do núcleo
    structureCamera.position.set(0, 0, 15);
    structureControls.reset();
    
    if (!isAnimationEnabled) {
        structureRenderer.render(structureScene, structureCamera);
    }
}

// ====== CONTROLES DA VISUALIZAÇÃO ======
function setViewMode(mode, btn) {
    viewMode = mode;

    // Atualizar botões
    document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Cancelar animações anteriores
    cancelAnimationFrame(structureAnimationId);
    cancelAnimationFrame(cloudAnimationId);

    const el = elements[currentElementId];

    clearStructureScene();

    if (mode === "orbital") {
        buildAtom3D(el);
        if (isAnimationEnabled) {
            structureAnimationId = requestAnimationFrame(animateStructure3D);
        }
    }
    else if (mode === "cloud") {
        buildElectronCloud(el);
        if (isAnimationEnabled) {
            cloudAnimationId = requestAnimationFrame(animateCloud);
        }
    }
    else if (mode === "nucleus") {
        showOnlyNucleus(el);
        if (isAnimationEnabled) {
            // A animação do núcleo é iniciada dentro de buildRealisticNucleus
        }
    }
}

function toggleAnimation(btn) {
    isAnimationEnabled = !isAnimationEnabled;

    btn.querySelector("i").classList.toggle("fa-pause");
    btn.querySelector("i").classList.toggle("fa-play");

    cancelAnimationFrame(structureAnimationId);
    cancelAnimationFrame(cloudAnimationId);

    if (!isAnimationEnabled) {
        // Se desativou, renderiza uma frame estática
        structureRenderer.render(structureScene, structureCamera);
        return;
    }

    // Se ativou, reinicia a animação correta
    if (viewMode === "orbital") {
        structureAnimationId = requestAnimationFrame(animateStructure3D);
    } else if (viewMode === "cloud") {
        cloudAnimationId = requestAnimationFrame(animateCloud);
    } else if (viewMode === "nucleus") {
        // Para o modo núcleo, precisamos recriar a cena
        const el = elements[currentElementId];
        showOnlyNucleus(el);
    }
}

// ====== TABS ======
function switchTab(name, btn) {
    // Alternar classes dos botões
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Alternar conteúdo das abas
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    const activeTab = document.getElementById(`tab-${name}`);
    if (activeTab) activeTab.classList.add('active');

    // Seletores principais
    const tabActions = document.querySelector('.tab-actions');
    const structurePreview = document.querySelector('.structure-preview');
    const structureSide = document.querySelector('.structure-side');
    const chartContainer = document.querySelector('.chart-container');
    const paramsSection = document.querySelector('.params-section');
    const infoBar = document.querySelector('.info-bar');

    if (name === "decay") {
        // Mostra elementos do decaimento
        if (tabActions) tabActions.style.display = "flex";
        if (chartContainer) chartContainer.style.display = "block";
        if (paramsSection) paramsSection.style.display = "block";
        if (infoBar) infoBar.style.display = "grid";

        // Esconde elementos da estrutura
        if (structurePreview) structurePreview.style.display = "none";
        if (structureSide) structureSide.style.display = "none";
    } 
    else if (name === "structure") {
        // Esconde tudo do decaimento
        if (tabActions) tabActions.style.display = "none";
        if (chartContainer) chartContainer.style.display = "none";
        if (paramsSection) paramsSection.style.display = "none";
        if (infoBar) infoBar.style.display = "none";

        // Mostra tudo da estrutura
        if (structurePreview) structurePreview.style.display = "block";
        if (structureSide) structureSide.style.display = "block";

        // Força o canvas 3D a atualizar tamanho
        onStructureResize();
    }
}

function refreshStructureMode(element) {
    cancelAnimationFrame(structureAnimationId);
    cancelAnimationFrame(cloudAnimationId);

    switch(viewMode) {
        case "orbital":
            buildAtom3D(element);
            if (isAnimationEnabled) {
                structureAnimationId = requestAnimationFrame(animateStructure3D);
            }
            break;

        case "cloud":
            buildElectronCloud(element);
            if (isAnimationEnabled) {
                cloudAnimationId = requestAnimationFrame(animateCloud);
            }
            break;

        case "nucleus":
            showOnlyNucleus(element);
            break;
    }
}

// ====== UPDATE GERAL ======
function updateAllDisplays() {
	const atoms = parseInt(document.getElementById('initialAtoms').value, 10) || 0;
	const time = parseInt(document.getElementById('timeRange').value, 10) || 0;

	document.getElementById('initialAtomsValue').textContent = atoms.toLocaleString('pt-BR');
	document.getElementById('timeValue').textContent = time.toLocaleString('pt-BR');

	const el = elements[currentElementId];

	document.getElementById('detailsTitle').textContent = `${el.name}`;

document.getElementById("detailsBody").innerHTML = `
    <div class="section">
        <h4>${el.name}</h4>

        <div class="info-line">
            <span class="label">Meia-vida:</span>
            <span class="value">${formatHalfLife(el.halfLife)}</span>
        </div>

        <div class="info-line">
            <span class="label">Tipo de decaimento:</span>
            <span class="value">${el.decayType.toUpperCase()}</span>
        </div>

        <div class="info-line">
            <span class="label">Produto:</span>
            <span class="value">${el.product}</span>
        </div>

        <div class="info-line">
            <span class="label">Energia:</span>
            <span class="value">${el.energy}</span>
        </div>
    </div>

    <div class="section">
        <h4>Aplicações</h4>
        <div class="label">${el.uses}</div>
    </div>

    <div class="section">
        <h4>Estrutura Atômica</h4>

        <div class="info-line">
            <span class="label">Prótons:</span>
            <span class="value">${el.protons}</span>
        </div>

        <div class="info-line">
            <span class="label">Nêutrons:</span>
            <span class="value">${el.neutrons}</span>
        </div>

        <div class="info-line">
            <span class="label">Elétrons:</span>
            <span class="value">${el.electrons}</span>
        </div>

        <div class="info-line">
            <span class="label">Configuração eletrônica:</span>
            <span class="value">${el.electronConfig}</span>
        </div>

        <div class="info-line">
            <span class="label">Número atômico:</span>
            <span class="value">${el.atomicNumber}</span>
        </div>

        <div class="info-line">
            <span class="label">Massa atômica:</span>
            <span class="value">${el.protons + el.neutrons}</span>
        </div>
    </div>
`;

	updateDecayTypeIndicator(el.decayType);
	
	refreshStructureMode(el);
}

function updateStructureInfo(element) {
	document.getElementById('protonCount').textContent = element.protons;
	document.getElementById('neutronCount').textContent = element.neutrons;
	document.getElementById('electronCount').textContent = element.electrons;
	document.getElementById('electronConfig').textContent = element.electronConfig;
	document.getElementById('atomicMass').textContent = (element.protons + element.neutrons).toFixed(0);
	
	// Adicionar informações específicas do núcleo se estivermos no modo núcleo
	if (viewMode === "nucleus") {
		const totalNucleons = element.protons + element.neutrons;
		const nuclearRadius = (1.2 * Math.pow(totalNucleons, 1/3)).toFixed(2);
		
		// Criar ou atualizar informações do núcleo
		let nuclearInfo = document.getElementById('nuclearInfo');
		if (!nuclearInfo) {
			nuclearInfo = document.createElement('div');
			nuclearInfo.id = 'nuclearInfo';
			nuclearInfo.className = 'nuclear-info';
			document.querySelector('.structure-side').appendChild(nuclearInfo);
		}
		
		nuclearInfo.innerHTML = `
			<div class="section">
				<h4>Estrutura Nuclear</h4>
				<div class="info-line">
					<span class="label">Nucleons totais:</span>
					<span class="value">${totalNucleons}</span>
				</div>
				<div class="info-line">
					<span class="label">Raio nuclear:</span>
					<span class="value">${nuclearRadius} fm</span>
				</div>
				<div class="info-line">
					<span class="label">Densidade:</span>
					<span class="value">~2.3×10¹⁷ kg/m³</span>
				</div>
				<div class="info-line">
					<span class="label">Estabilidade:</span>
					<span class="value">${element.halfLife > 1e6 ? 'Estável' : 'Instável'}</span>
				</div>
			</div>
		`;
	} else {
		// Remover informações do núcleo se não estivermos no modo núcleo
		const nuclearInfo = document.getElementById('nuclearInfo');
		if (nuclearInfo) nuclearInfo.remove();
	}
}

// Botões da toolbar da aba direita
window.startSimulation = startSimulation;
window.resetSimulation = resetSimulation;
window.switchTab = switchTab;

// ====== TEMA ======
document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    const icon = document.getElementById('themeIcon');
    if (document.body.classList.contains('light-theme')) {
        icon.className = 'fa-solid fa-moon';
    } else {
        icon.className = 'fa-solid fa-sun';
    }
});

// ====== VOLTAR ======
document.getElementById('toGoBackBtn').addEventListener('click', function() {
    window.location.href = "../../index.html";
});