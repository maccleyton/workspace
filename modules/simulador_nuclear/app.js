// ====== DADOS DOS ELEMENTOS ======
const elements = {
	// Actinídeos
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
		uses: "Reatores nucleares, armas",
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
		uses: "Armas nucleares, geradores",
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
		uses: "Geração de energia em sondas espaciais",
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
		uses: "Ciclo de reatores com tório",
		electronConfig: "[Rn] 6d² 7s²"
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
		uses: "Detectores de fumaça",
		electronConfig: "[Rn] 5f⁷ 7s²"
	},
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
		uses: "Histórico em medicina, pesquisa",
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
		energy: "5.49 MeV",
		uses: "Gás nobre radioativo",
		electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶"
	},

	// Metais de transição radioativos
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
		energy: "1.17 / 1.33 MeV",
		uses: "Radioterapia, esterilização",
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
		energy: "0.662 MeV",
		uses: "Radioterapia, calibração",
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
		energy: "0.546 MeV",
		uses: "Fonte beta em pesquisa e terapia",
		electronConfig: "[Kr] 5s²"
	},

	// Não-metais radioativos
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
		energy: "0.156 MeV",
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
		energy: "0.018 MeV",
		uses: "Marcadores e estudos de fusão",
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
		energy: "0.61 MeV",
		uses: "Diagnóstico e tratamento da tireoide",
		electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵"
	},

	// Terra rara radioativos
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
		energy: "0.14 MeV",
		uses: "Imagem médica (cintilografia)",
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
		product: "Nd-147",
		energy: "0.224 MeV",
		uses: "Fonte beta, luminosos",
		electronConfig: "[Xe] 4f⁵ 6s²"
	},

	// Alcalinos e alcalino-terrosos
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
		energy: "1.31 MeV",
		uses: "Radioatividade natural em organismos",
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
		energy: "0.283 MeV",
		uses: "Datação geológica",
		electronConfig: "[Kr] 5s¹"
	},

	// Gases nobres
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
		energy: "0.427 MeV",
		uses: "Imagem médica pulmonar",
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
		energy: "0.687 MeV",
		uses: "Indicador de vazamentos",
		electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁶"
	},

	// Outros elementos importantes
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
		energy: "5.30 MeV",
		uses: "Fonte alfa, eliminador de estática",
		electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴"
	},
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
		energy: "0.862 MeV",
		uses: "Datação geológica, estudos solares",
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
		energy: "2.83 MeV",
		uses: "Fonte pósitron, PET",
		electronConfig: "[Ne] 3s¹"
	}
};

const elementOrder = [
	'uranium238','uranium235','plutonium239','plutonium238',
	'thorium232','americium241','radium226','radon222',
	'cobalt60','cesium137','strontium90',
	'carbon14','tritium','iodine131',
	'technetium99m','promethium147',
	'potassium40','rubidium87',
	'xenon133','krypton85',
	'polonium210','beryllium7','sodium22'
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
let structureScene, structureCamera, structureRenderer, structureControls;
let structureAtomGroup = null;
let structureElectronMeshes = [];
let structureAnimationId = null;

document.addEventListener('DOMContentLoaded', () => {
	initElementsList();
	initSearch(); // ← ADICIONE ESTA LINHA
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
			buildAtom3D(elements[currentElementId]);
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
	}
	structureAtomGroup = null;
	structureElectronMeshes = [];
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
		color: element.color || '#ff6666',
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
				angleOffset
			};

			structureElectronMeshes.push(electron);
			structureAtomGroup.add(electron);
		}
	});

	// Atualiza infos textuais
	updateStructureInfo(element);
}

function animateStructure3D() {
	structureAnimationId = requestAnimationFrame(animateStructure3D);
	if (!structureRenderer || !structureCamera || !structureScene) return;

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

function updateStructureInfo(element) {
	document.getElementById('protonCount').textContent = element.protons;
	document.getElementById('neutronCount').textContent = element.neutrons;
	document.getElementById('electronCount').textContent = element.electrons;
	document.getElementById('electronConfig').textContent = element.electronConfig;
	document.getElementById('atomicMass').textContent = (element.protons + element.neutrons).toFixed(0);
}

// ====== TABS ======
function switchTab(name, btn) {
	document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
	if (btn) btn.classList.add('active');
	document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
	document.getElementById('tab-' + name).classList.add('active');

	if (name === 'structure') {
		onStructureResize();
	}
}

// ====== UPDATE GERAL ======
function updateAllDisplays() {
	const atoms = parseInt(document.getElementById('initialAtoms').value, 10) || 0;
	const time = parseInt(document.getElementById('timeRange').value, 10) || 0;

	document.getElementById('initialAtomsValue').textContent = atoms.toLocaleString('pt-BR');
	document.getElementById('timeValue').textContent = time.toLocaleString('pt-BR');

	const el = elements[currentElementId];

	document.getElementById('infoElement').textContent = el.symbol;
	document.getElementById('infoHalfLife').textContent = formatHalfLife(el.halfLife);
	document.getElementById('infoLambda').textContent = el.lambda.toExponential(2);
	document.getElementById('infoActivity').textContent = calculateActivity();
	document.getElementById('infoProduct').textContent = el.product;
	document.getElementById('infoEnergy').textContent = el.energy;

	document.getElementById('detailsTitle').textContent = `${el.name}`;
	document.getElementById('detailsBody').innerHTML = `
		<strong>Isótopo radioativo de ${el.name.split('-')[0]}</strong><br><br>
		<strong>Meia-vida:</strong> ${formatHalfLife(el.halfLife)}<br>
		<strong>Tipo de decaimento:</strong> ${el.decayType.toUpperCase()}<br>
		<strong>Produto:</strong> ${el.product}<br>
		<strong>Energia:</strong> ${el.energy}<br>
		<strong>Aplicações:</strong> ${el.uses}<br><br>
		<strong>Configuração eletrônica:</strong> ${el.electronConfig}<br>
		<strong>Número atômico:</strong> ${el.atomicNumber}<br>
		<strong>Massa atômica:</strong> ${el.protons + el.neutrons}
	`;

	updateDecayTypeIndicator(el.decayType);
	buildAtom3D(el);
}

// Botões da toolbar da aba direita
window.startSimulation = startSimulation;
window.resetSimulation = resetSimulation;
window.switchTab = switchTab;

document.getElementById('toGoBackBtn').addEventListener('click', toGoBack);

function toGoBack() {
	const base = window.location.origin;
	window.location.href = "../../index.html";
}
