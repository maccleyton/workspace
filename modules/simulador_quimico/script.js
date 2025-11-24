// Dados da Tabela Periódica
const elements = [
	{ number: 1, symbol: "H", name: "Hidrogênio", mass: "1.008", category: "nonmetal", state: "Gasoso", density: "0.0000899", melting: "-259.16", boiling: "-252.87", electronegativity: "2.20", configuration: "1s¹", radius: "53", discovered: "1766", protons: 1, neutrons: 0, electrons: 1 },
	{ number: 2, symbol: "He", name: "Hélio", mass: "4.0026", category: "noble-gas", state: "Gasoso", density: "0.0001785", melting: "-272.20", boiling: "-268.93", electronegativity: "-", configuration: "1s²", radius: "31", discovered: "1868", protons: 2, neutrons: 2, electrons: 2 },
	{ number: 3, symbol: "Li", name: "Lítio", mass: "6.94", category: "alkali-metal", state: "Sólido", density: "0.534", melting: "180.50", boiling: "1342", electronegativity: "0.98", configuration: "[He] 2s¹", radius: "167", discovered: "1817", protons: 3, neutrons: 4, electrons: 3 },
	{ number: 4, symbol: "Be", name: "Berílio", mass: "9.0122", category: "alkaline-earth-metal", state: "Sólido", density: "1.85", melting: "1287", boiling: "2470", electronegativity: "1.57", configuration: "[He] 2s²", radius: "112", discovered: "1798", protons: 4, neutrons: 5, electrons: 4 },
	{ number: 5, symbol: "B", name: "Boro", mass: "10.81", category: "metalloid", state: "Sólido", density: "2.34", melting: "2076", boiling: "3927", electronegativity: "2.04", configuration: "[He] 2s² 2p¹", radius: "87", discovered: "1808", protons: 5, neutrons: 6, electrons: 5 },
	{ number: 6, symbol: "C", name: "Carbono", mass: "12.011", category: "nonmetal", state: "Sólido", density: "2.267", melting: "3550", boiling: "4027", electronegativity: "2.55", configuration: "[He] 2s² 2p²", radius: "67", discovered: "Antiguidade", protons: 6, neutrons: 6, electrons: 6 },
	{ number: 7, symbol: "N", name: "Nitrogênio", mass: "14.007", category: "nonmetal", state: "Gasoso", density: "0.0012506", melting: "-210.1", boiling: "-195.79", electronegativity: "3.04", configuration: "[He] 2s² 2p³", radius: "56", discovered: "1772", protons: 7, neutrons: 7, electrons: 7 },
	{ number: 8, symbol: "O", name: "Oxigênio", mass: "15.999", category: "nonmetal", state: "Gasoso", density: "0.001429", melting: "-218.79", boiling: "-182.95", electronegativity: "3.44", configuration: "[He] 2s² 2p⁴", radius: "48", discovered: "1774", protons: 8, neutrons: 8, electrons: 8 },
	{ number: 9, symbol: "F", name: "Flúor", mass: "18.998", category: "halogen", state: "Gasoso", density: "0.001696", melting: "-219.67", boiling: "-188.11", electronegativity: "3.98", configuration: "[He] 2s² 2p⁵", radius: "42", discovered: "1886", protons: 9, neutrons: 10, electrons: 9 },
	{ number: 10, symbol: "Ne", name: "Neônio", mass: "20.180", category: "noble-gas", state: "Gasoso", density: "0.0008999", melting: "-248.59", boiling: "-246.08", electronegativity: "-", configuration: "[He] 2s² 2p⁶", radius: "38", discovered: "1898", protons: 10, neutrons: 10, electrons: 10 },
	{ number: 11, symbol: "Na", name: "Sódio", mass: "22.990", category: "alkali-metal", state: "Sólido", density: "0.971", melting: "97.72", boiling: "883", electronegativity: "0.93", configuration: "[Ne] 3s¹", radius: "190", discovered: "1807", protons: 11, neutrons: 12, electrons: 11 },
	{ number: 12, symbol: "Mg", name: "Magnésio", mass: "24.305", category: "alkaline-earth-metal", state: "Sólido", density: "1.738", melting: "650", boiling: "1090", electronegativity: "1.31", configuration: "[Ne] 3s²", radius: "145", discovered: "1755", protons: 12, neutrons: 12, electrons: 12 },
	{ number: 13, symbol: "Al", name: "Alumínio", mass: "26.982", category: "post-transition-metal", state: "Sólido", density: "2.698", melting: "660.32", boiling: "2519", electronegativity: "1.61", configuration: "[Ne] 3s² 3p¹", radius: "118", discovered: "1825", protons: 13, neutrons: 14, electrons: 13 },
	{ number: 14, symbol: "Si", name: "Silício", mass: "28.085", category: "metalloid", state: "Sólido", density: "2.3296", melting: "1414", boiling: "2900", electronegativity: "1.90", configuration: "[Ne] 3s² 3p²", radius: "111", discovered: "1824", protons: 14, neutrons: 14, electrons: 14 },
	{ number: 15, symbol: "P", name: "Fósforo", mass: "30.974", category: "nonmetal", state: "Sólido", density: "1.82", melting: "44.15", boiling: "280.5", electronegativity: "2.19", configuration: "[Ne] 3s² 3p³", radius: "98", discovered: "1669", protons: 15, neutrons: 16, electrons: 15 },
	{ number: 16, symbol: "S", name: "Enxofre", mass: "32.06", category: "nonmetal", state: "Sólido", density: "2.067", melting: "115.21", boiling: "444.72", electronegativity: "2.58", configuration: "[Ne] 3s² 3p⁴", radius: "88", discovered: "Antiguidade", protons: 16, neutrons: 16, electrons: 16 },
	{ number: 17, symbol: "Cl", name: "Cloro", mass: "35.45", category: "halogen", state: "Gasoso", density: "0.003214", melting: "-101.5", boiling: "-34.04", electronegativity: "3.16", configuration: "[Ne] 3s² 3p⁵", radius: "79", discovered: "1774", protons: 17, neutrons: 18, electrons: 17 },
	{ number: 18, symbol: "Ar", name: "Argônio", mass: "39.95", category: "noble-gas", state: "Gasoso", density: "0.0017837", melting: "-189.34", boiling: "-185.85", electronegativity: "-", configuration: "[Ne] 3s² 3p⁶", radius: "71", discovered: "1894", protons: 18, neutrons: 22, electrons: 18 },
	{ number: 19, symbol: "K", name: "Potássio", mass: "39.098", category: "alkali-metal", state: "Sólido", density: "0.862", melting: "63.38", boiling: "759", electronegativity: "0.82", configuration: "[Ar] 4s¹", radius: "243", discovered: "1807", protons: 19, neutrons: 20, electrons: 19 },
	{ number: 20, symbol: "Ca", name: "Cálcio", mass: "40.078", category: "alkaline-earth-metal", state: "Sólido", density: "1.54", melting: "842", boiling: "1484", electronegativity: "1.00", configuration: "[Ar] 4s²", radius: "194", discovered: "1808", protons: 20, neutrons: 20, electrons: 20 }
];

// Variáveis globais
let currentElement = elements[0];
let scene, camera, renderer, controls;
let animationId = null;
let isAnimating = true;
let viewMode = 'orbital';

// Variáveis do Simulador de Reações
let selectedReagents = { reactant1: null, reactant2: null };
let reactionCanvas, reactionCtx, reactionAnimationId;
let reactionState = {
	isAnimating: false,
	speed: 1,
	stage: 0,
	bubbles: []
};

// Dados dos Reagentes
const reagents = {
	acidos: [
		{ name: 'Ácido Clorídrico', formula: 'HCl', type: 'acid' },
		{ name: 'Ácido Sulfúrico', formula: 'H₂SO₄', type: 'acid' },
		{ name: 'Ácido Nítrico', formula: 'HNO₃', type: 'acid' },
		{ name: 'Ácido Acético', formula: 'CH₃COOH', type: 'acid' }
	],
	bases: [
		{ name: 'Hidróxido de Sódio', formula: 'NaOH', type: 'base' },
		{ name: 'Hidróxido de Potássio', formula: 'KOH', type: 'base' },
		{ name: 'Hidróxido de Cálcio', formula: 'Ca(OH)₂', type: 'base' },
		{ name: 'Hidróxido de Amônio', formula: 'NH₄OH', type: 'base' }
	],
	sais: [
		{ name: 'Cloreto de Sódio', formula: 'NaCl', type: 'salt' },
		{ name: 'Carbonato de Cálcio', formula: 'CaCO₃', type: 'salt' },
		{ name: 'Sulfato de Cobre', formula: 'CuSO₄', type: 'salt' },
		{ name: 'Nitrato de Prata', formula: 'AgNO₃', type: 'salt' }
	],
	metais: [
		{ name: 'Zinco', formula: 'Zn', type: 'metal' },
		{ name: 'Ferro', formula: 'Fe', type: 'metal' },
		{ name: 'Cobre', formula: 'Cu', type: 'metal' },
		{ name: 'Magnésio', formula: 'Mg', type: 'metal' }
	],
	organicos: [
		{ name: 'Metano', formula: 'CH₄', type: 'organic' },
		{ name: 'Etanol', formula: 'C₂H₅OH', type: 'organic' },
		{ name: 'Benzeno', formula: 'C₆H₆', type: 'organic' },
		{ name: 'Acetona', formula: 'C₃H₆O', type: 'organic' }
	],
	gases: [
		{ name: 'Oxigênio', formula: 'O₂', type: 'gas' },
		{ name: 'Hidrogênio', formula: 'H₂', type: 'gas' },
		{ name: 'Nitrogênio', formula: 'N₂', type: 'gas' },
		{ name: 'Dióxido de Carbono', formula: 'CO₂', type: 'gas' }
	]
};

// Reações Conhecidas
const knownReactions = {
	'HCl+NaOH': {
		reactants: ['HCl', 'NaOH'],
		products: ['NaCl', 'H₂O'],
		coefficients: [1, 1, 1, 1],
		type: 'neutralization',
		description: 'Neutralização: Ácido + Base → Sal + Água'
	},
	'H₂SO₄+NaOH': {
		reactants: ['H₂SO₄', 'NaOH'],
		products: ['Na₂SO₄', 'H₂O'],
		coefficients: [1, 2, 1, 2],
		type: 'neutralization',
		description: 'Neutralização com ácido diprótico'
	},
	'Zn+HCl': {
		reactants: ['Zn', 'HCl'],
		products: ['ZnCl₂', 'H₂'],
		coefficients: [1, 2, 1, 1],
		type: 'metal-acid',
		description: 'Metal + Ácido → Sal + Hidrogênio'
	},
	'CaCO₃+HCl': {
		reactants: ['CaCO₃', 'HCl'],
		products: ['CaCl₂', 'H₂O', 'CO₂'],
		coefficients: [1, 2, 1, 1, 1],
		type: 'carbonate-acid',
		description: 'Carbonato + Ácido → Sal + Água + CO₂'
	}
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
	initializePeriodicTable();
	initSearch();
	init3DViewer();
	updateElementInfo();
	updateAtomInfo();
	initializeReagentDropdowns();
	initializeReactionCanvas();
	setupReactionEventListeners();
});

// ====== TOGGLES CENTRAIS ======
function switchCenterView(view, btn) {
	// Atualizar botões da coluna central
	document.querySelectorAll('.center-toggle .toggle-btn').forEach(b => b.classList.remove('active'));
	if (btn) btn.classList.add('active');
	
	// Mostrar/ocultar views da coluna central
	document.getElementById('elementView').style.display = view === 'element' ? 'flex' : 'none';
	document.getElementById('reactionView').style.display = view === 'reaction' ? 'flex' : 'none';
	
	// Sincronizar com a coluna direita
	if (view === 'element') {
		// Modo elemento: mostrar visualização do átomo
		document.getElementById('elementRightView').style.display = 'flex';
		document.getElementById('reactionRightView').style.display = 'none';
		
		// Redimensionar canvas 3D e forçar renderização
		setTimeout(() => {
			onWindowResize();
			if (renderer && scene && camera) {
				renderer.render(scene, camera);
			}
		}, 50);
	} else {
		// Modo reação: mostrar simulador de reações
		document.getElementById('elementRightView').style.display = 'none';
		document.getElementById('reactionRightView').style.display = 'flex';
		
		// Redimensionar canvas da reação e forçar desenho
		setTimeout(() => {
			resizeCanvas();
			drawBeaker();
		}, 50);
	}
}

// ====== SISTEMA DE ABAS ======
function switchElementTab(name, btn) {
	document.querySelectorAll('#elementRightView .tab-btn').forEach(b => b.classList.remove('active'));
	if (btn) btn.classList.add('active');
	
	document.querySelectorAll('#elementRightView .tab-content').forEach(c => c.classList.remove('active'));
	
	const tabElement = document.getElementById('tab-' + name);
	if (tabElement) {
		tabElement.classList.add('active');
		if (name === 'visualization') {
			setTimeout(() => {
				onWindowResize();
				if (renderer && scene && camera) {
					renderer.render(scene, camera);
				}
			}, 50);
		}
	}
}

function switchReactionTab(name, btn) {
	// remove active dos botoes
	document.querySelectorAll('#reactionRightView .tab-btn').forEach(b => b.classList.remove('active'));
	btn.classList.add('active');

	// remove active apenas do nível INTERNO
	document.querySelectorAll('#reactionRightView > .tab-content .tab-content').forEach(section => {
		section.classList.remove('active');
		section.style.display = 'none';
	});

	// ativa a aba correta
	const target = document.querySelector(`#tab-reaction-${tab}`);
	if (target) {
		target.classList.add('active');
		target.style.display = 'block';
	}
}

// ====== INICIALIZAR TABELA PERIÓDICA ======
function initializePeriodicTable() {
	const table = document.getElementById('periodicTable');
	if (!table) return;
	
	table.innerHTML = '';
	
	elements.forEach((element, index) => {
		const elementItem = document.createElement('div');
		elementItem.className = `element-item ${index === 0 ? 'active' : ''}`;
		elementItem.innerHTML = `
			<div class="element-number">${element.number}</div>
			<div class="element-symbol">${element.symbol}</div>
			<div class="element-name">${element.name}</div>
		`;
		
		elementItem.addEventListener('click', () => selectElement(element, elementItem));
		table.appendChild(elementItem);
	});
}

// ====== SISTEMA DE BUSCA ======
function initSearch() {
	const searchInput = document.getElementById('searchInput');
	if (!searchInput) return;
	
	searchInput.addEventListener('input', function(e) {
		const searchTerm = e.target.value.toLowerCase().trim();
		const elementItems = document.querySelectorAll('.element-item');
		
		elementItems.forEach(element => {
			const symbol = element.querySelector('.element-symbol').textContent.toLowerCase();
			const name = element.querySelector('.element-name').textContent.toLowerCase();
			const number = element.querySelector('.element-number').textContent;
			
			const matches = symbol.includes(searchTerm) || 
						  name.includes(searchTerm) || 
						  number.includes(searchTerm);
			
			element.style.display = matches ? 'flex' : 'none';
		});
	});
	
	searchInput.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			searchInput.value = '';
			searchInput.dispatchEvent(new Event('input'));
			searchInput.blur();
		}
	});
}

// ====== SELECIONAR ELEMENTO ======
function selectElement(element, elementItem) {
	currentElement = element;
	
	document.querySelectorAll('.element-item').forEach(item => {
		item.classList.remove('active');
	});
	elementItem.classList.add('active');
	
	updateElementInfo();
	updateAtomInfo();
	update3DViewer();
}

// ====== ATUALIZAR INFORMAÇÕES DO ELEMENTO ======
function updateElementInfo() {
	if (!currentElement) return;
	
	document.getElementById('infoName').textContent = currentElement.name;
	document.getElementById('infoSymbol').textContent = currentElement.symbol;
	document.getElementById('infoNumber').textContent = currentElement.number;
	document.getElementById('infoMass').textContent = currentElement.mass + ' u';
	
	document.getElementById('infoState').textContent = currentElement.state;
	document.getElementById('infoDensity').textContent = currentElement.density + ' g/cm³';
	document.getElementById('infoMelting').textContent = currentElement.melting + ' °C';
	document.getElementById('infoBoiling').textContent = currentElement.boiling + ' °C';
	
	document.getElementById('infoElectronegativity').textContent = currentElement.electronegativity;
	document.getElementById('infoConfiguration').textContent = currentElement.configuration;
	document.getElementById('infoRadius').textContent = currentElement.radius + ' pm';
	document.getElementById('infoDiscovered').textContent = currentElement.discovered;
}

// ====== ATUALIZAR INFORMAÇÕES DO ÁTOMO ======
function updateAtomInfo() {
	if (!currentElement) return;
	
	document.getElementById('protonCount').textContent = currentElement.protons;
	document.getElementById('neutronCount').textContent = currentElement.neutrons;
	document.getElementById('electronCount').textContent = currentElement.electrons;
	
	const description = `O ${currentElement.name} (${currentElement.symbol}) possui ${currentElement.protons} prótons, ${currentElement.neutrons} nêutrons e ${currentElement.electrons} elétrons. Sua configuração eletrônica é ${currentElement.configuration}.`;
	document.getElementById('structureDescription').textContent = description;
}

// ====== VISUALIZADOR 3D ======
function init3DViewer() {
	const container = document.getElementById('atom3DCanvas');
	if (!container) return;
	
	const parent = container.parentElement;
	if (!parent) return;

	// Criar cena
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x0a0a0a);
	
	// Configurar câmera
	const width = parent.clientWidth;
	const height = parent.clientHeight;
	camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
	camera.position.set(0, 0, 25);
	
	// Configurar renderizador
	renderer = new THREE.WebGLRenderer({ 
		canvas: container,
		antialias: true,
		alpha: true
	});
	renderer.setPixelRatio(window.devicePixelRatio || 1);
	renderer.setSize(width, height, false);
	
	// Configurar controles
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.08;
	controls.enablePan = false;
	controls.minDistance = 10;
	controls.maxDistance = 50;
	
	// Iluminação
	const ambient = new THREE.AmbientLight(0x404040, 0.6);
	scene.add(ambient);
	
	const point = new THREE.PointLight(0xffffff, 1.2);
	point.position.set(10, 10, 15);
	scene.add(point);
	
	const back = new THREE.PointLight(0x10b981, 0.6);
	back.position.set(-15, -10, -10);
	scene.add(back);
	
	// Redimensionamento responsivo
	window.addEventListener('resize', onWindowResize);
	
	// Criar átomo inicial
	update3DViewer();
	
	// Iniciar animação
	animate3D();
}

function onWindowResize() {
	if (!renderer || !camera) return;
	const container = document.getElementById('atom3DCanvas');
	if (!container) return;
	
	const parent = container.parentElement;
	if (!parent) return;

	const width = parent.clientWidth;
	const height = parent.clientHeight;
	
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height, false);
}

function animate3D() {
	animationId = requestAnimationFrame(animate3D);
	
	if (isAnimating) {
		scene.children.forEach(child => {
			if (child.userData.isAtomGroup) {
				animateAtomGroup(child);
			}
		});
	}
	
	if (controls) controls.update();
	if (renderer && scene && camera) renderer.render(scene, camera);
}

function animateAtomGroup(atomGroup) {
	atomGroup.rotation.y += 0.005;
	
	for (let i = 1; i < atomGroup.children.length; i++) {
		const child = atomGroup.children[i];
		if (child.userData.orbitRadius !== undefined) {
			child.userData.angle += child.userData.speed;
			child.position.x = Math.cos(child.userData.angle) * child.userData.orbitRadius;
			child.position.z = Math.sin(child.userData.angle) * child.userData.orbitRadius;
		}
	}
}

function update3DViewer() {
	if (!scene || !currentElement) return;
	
	// Limpar cena
	scene.children.slice().forEach(child => {
		if (child.type !== 'AmbientLight' && child.type !== 'PointLight') {
			scene.remove(child);
		}
	});
	
	// Criar átomo
	const atomGroup = createAtomGroup(currentElement);
	scene.add(atomGroup);
}

function createAtomGroup(element) {
	const group = new THREE.Group();
	group.userData.isAtomGroup = true;
	
	// Núcleo
	const nucleusGeometry = new THREE.SphereGeometry(1.0, 32, 32);
	const nucleusMaterial = new THREE.MeshPhongMaterial({ 
		color: getAtomColor(element.symbol),
		emissive: getAtomEmissive(element.symbol),
		shininess: 100
	});
	const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
	group.add(nucleus);
	
	if (viewMode === 'orbital') {
		createOrbitalView(group, element);
	} else if (viewMode === 'cloud') {
		createCloudView(group, element);
	} else if (viewMode === 'nucleus') {
		createNucleusView(group, element);
	}
	
	return group;
}

function createOrbitalView(group, element) {
	const electronCount = element.electrons;
	const shells = calculateElectronShells(electronCount);
	
	shells.forEach((shell, idx) => {
		const orbitRadius = 2.5 + idx * 1.2;
		
		// Órbita visual
		const orbitGeometry = new THREE.RingGeometry(orbitRadius - 0.05, orbitRadius + 0.05, 64);
		const orbitMaterial = new THREE.MeshBasicMaterial({ 
			color: 0x444444,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.3
		});
		const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
		orbitMesh.rotation.x = Math.PI / 2;
		group.add(orbitMesh);
		
		// Elétrons
		for (let i = 0; i < shell; i++) {
			const angle = (i / shell) * Math.PI * 2;
			const electronGeometry = new THREE.SphereGeometry(0.15, 16, 16);
			const electronMaterial = new THREE.MeshPhongMaterial({ 
				color: 0x10b981,
				emissive: 0x003322,
				shininess: 100
			});
			const electron = new THREE.Mesh(electronGeometry, electronMaterial);
			
			electron.userData.orbitRadius = orbitRadius;
			electron.userData.angle = angle;
			electron.userData.speed = 0.015 + Math.random() * 0.01;
			
			electron.position.x = Math.cos(angle) * orbitRadius;
			electron.position.z = Math.sin(angle) * orbitRadius;
			
			group.add(electron);
		}
	});
}

function createCloudView(group, element) {
	const cloudRadius = 5.0;
	const cloudGeometry = new THREE.SphereGeometry(cloudRadius, 32, 32);
	const cloudMaterial = new THREE.MeshBasicMaterial({ 
		color: 0x10b981,
		transparent: true,
		opacity: 0.1
	});
	const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
	group.add(cloud);
	
	const electronCount = Math.min(element.electrons, 30);
	const electronGeometry = new THREE.SphereGeometry(0.12, 16, 16);
	const electronMaterial = new THREE.MeshPhongMaterial({ 
		color: 0x10b981,
		emissive: 0x003322,
		shininess: 100
	});
	
	for (let i = 0; i < electronCount; i++) {
		const electron = new THREE.Mesh(electronGeometry, electronMaterial);
		const theta = Math.random() * Math.PI * 2;
		const phi = Math.random() * Math.PI;
		const r = cloudRadius * 0.8 * Math.random();
		
		electron.position.x = r * Math.sin(phi) * Math.cos(theta);
		electron.position.y = r * Math.sin(phi) * Math.sin(theta);
		electron.position.z = r * Math.cos(phi);
		
		group.add(electron);
	}
}

function createNucleusView(group, element) {
	const particleGeometry = new THREE.SphereGeometry(0.15, 16, 16);
	
	// Prótons
	const protonMaterial = new THREE.MeshPhongMaterial({ 
		color: 0xff4444,
		shininess: 80
	});
	const protonCount = Math.min(element.protons, 30);
	for (let i = 0; i < protonCount; i++) {
		const proton = new THREE.Mesh(particleGeometry, protonMaterial);
		const theta = Math.random() * Math.PI * 2;
		const phi = Math.random() * Math.PI;
		const r = Math.random() * 1.5;
		
		proton.position.x = r * Math.sin(phi) * Math.cos(theta);
		proton.position.y = r * Math.sin(phi) * Math.sin(theta);
		proton.position.z = r * Math.cos(phi);
		
		group.add(proton);
	}
	
	// Nêutrons
	const neutronMaterial = new THREE.MeshPhongMaterial({ 
		color: 0xaaaaaa,
		shininess: 80
	});
	const neutronCount = Math.min(element.neutrons, 30);
	for (let i = 0; i < neutronCount; i++) {
		const neutron = new THREE.Mesh(particleGeometry, neutronMaterial);
		const theta = Math.random() * Math.PI * 2;
		const phi = Math.random() * Math.PI;
		const r = Math.random() * 1.5;
		
		neutron.position.x = r * Math.sin(phi) * Math.cos(theta);
		neutron.position.y = r * Math.sin(phi) * Math.sin(theta);
		neutron.position.z = r * Math.cos(phi);
		
		group.add(neutron);
	}
}

function calculateElectronShells(electrons) {
	const shells = [];
	let remaining = electrons;
	const maxPerShell = [2, 8, 18, 32, 32, 18, 8, 2];
	
	for (let i = 0; i < maxPerShell.length && remaining > 0; i++) {
		const electronsInShell = Math.min(remaining, maxPerShell[i]);
		shells.push(electronsInShell);
		remaining -= electronsInShell;
	}
	return shells;
}

function getAtomColor(symbol) {
	const colors = {
		'H': 0xffffff, 'He': 0xffd700, 'Li': 0xff6b6b, 'Be': 0x4ecdc4,
		'B': 0xff9f40, 'C': 0x333333, 'N': 0x0066ff, 'O': 0xff0000,
		'F': 0x90ee90, 'Ne': 0xff69b4, 'Na': 0xff6b6b, 'Mg': 0x4ecdc4,
		'Al': 0xc0c0c0, 'Si': 0x808080, 'P': 0xffa500, 'S': 0xffff00,
		'Cl': 0x00ff00, 'Ar': 0x87ceeb, 'K': 0xff6b6b, 'Ca': 0x4ecdc4,
		'Sc': 0x9370db, 'Ti': 0x708090, 'V': 0x9370db, 'Cr': 0x708090,
		'Mn': 0x9370db, 'Fe': 0xff8c00, 'Co': 0x9370db, 'Ni': 0x708090,
		'Cu': 0xb87333, 'Zn': 0x708090, 'Ga': 0x9370db, 'Ge': 0x708090,
		'As': 0x9370db, 'Se': 0xffa500, 'Br': 0x8b4513, 'Kr': 0x87ceeb,
		'Rb': 0xff6b6b, 'Sr': 0x4ecdc4, 'Y': 0x9370db, 'Zr': 0x708090,
		'Nb': 0x9370db, 'Mo': 0x708090, 'Tc': 0x9370db, 'Ru': 0x708090,
		'Rh': 0x9370db, 'Pd': 0x708090, 'Ag': 0xc0c0c0, 'Cd': 0x708090,
		'In': 0x9370db, 'Sn': 0x708090, 'Sb': 0x9370db, 'Te': 0xffa500,
		'I': 0x8b4513, 'Xe': 0x87ceeb, 'Cs': 0xff6b6b, 'Ba': 0x4ecdc4,
		'La': 0x9370db, 'Ce': 0x9370db, 'Pr': 0x9370db, 'Nd': 0x9370db,
		'Pm': 0x9370db, 'Sm': 0x9370db, 'Eu': 0x9370db, 'Gd': 0x9370db,
		'Tb': 0x9370db, 'Dy': 0x9370db, 'Ho': 0x9370db, 'Er': 0x9370db,
		'Tm': 0x9370db, 'Yb': 0x9370db, 'Lu': 0x9370db, 'Hf': 0x708090,
		'Ta': 0x9370db, 'W': 0x708090, 'Re': 0x9370db, 'Os': 0x708090,
		'Ir': 0x9370db, 'Pt': 0x708090, 'Au': 0xffd700, 'Hg': 0x708090,
		'Tl': 0x9370db, 'Pb': 0x708090, 'Bi': 0x9370db, 'Po': 0x9370db,				
		'At': 0x9370db, 'Rn': 0x87ceeb, 'Fr': 0xff6b6b, 'Ra': 0x4ecdc4,
		'Ac': 0x9370db, 'Th': 0x9370db, 'Pa': 0x9370db, 'U': 0x9370db,
		'Np': 0x9370db, 'Pu': 0x9370db, 'Am': 0x9370db, 'Cm': 0x9370db,
		'Bk': 0x9370db, 'Cf': 0x9370db, 'Es': 0x9370db, 'Fm': 0x9370db,
		'Md': 0x9370db, 'No': 0x9370db, 'Lr': 0x9370db, 'Rf': 0x708090,
		'Db': 0x9370db, 'Sg': 0x708090, 'Bh': 0x9370db, 'Hs': 0x708090,
		'Mt': 0x9370db, 'Ds': 0x708090, 'Rg': 0x9370db, 'Cn': 0x708090,
		'Nh': 0x9370db, 'Fl': 0x708090, 'Mc': 0x9370db, 'Lv': 0x708090,
		'Ts': 0x9370db, 'Og': 0x224444
	};
	return colors[symbol] || 0x222222;
}

function getAtomEmissive(symbol) {
	const emissive = {
		'H': 0x222222, 'He': 0x444400, 'Li': 0x442222, 'Be': 0x224444,
		'B': 0x444200, 'C': 0x111111, 'N': 0x002244, 'O': 0x440000,
		'F': 0x224422, 'Ne': 0x442244, 'Na': 0x442222, 'Mg': 0x224444,
		'Al': 0x444444, 'Si': 0x333333, 'P': 0x444200, 'S': 0x444400,
		'Cl': 0x004400, 'Ar': 0x224444, 'K': 0x442222, 'Ca': 0x224444,
		'Sc': 0x442244, 'Ti': 0x334444, 'V': 0x442244, 'Cr': 0x334444,
		'Mn': 0x442244, 'Fe': 0x444200, 'Co': 0x442244, 'Ni': 0x334444,
		'Cu': 0x444322, 'Zn': 0x334444, 'Ga': 0x442244, 'Ge': 0x334444,
		'As': 0x442244, 'Se': 0x444200, 'Br': 0x442222, 'Kr': 0x224444,
		'Rb': 0x442222, 'Sr': 0x224444, 'Y': 0x442244, 'Zr': 0x334444,
		'Nb': 0x442244, 'Mo': 0x334444, 'Tc': 0x442244, 'Ru': 0x334444,
		'Rh': 0x442244, 'Pd': 0x334444, 'Ag': 0x444444, 'Cd': 0x334444,
		'In': 0x442244, 'Sn': 0x334444, 'Sb': 0x442244, 'Te': 0x444200,
		'I': 0x442222, 'Xe': 0x224444, 'Cs': 0x442222, 'Ba': 0x224444,
		'La': 0x442244, 'Ce': 0x442244, 'Pr': 0x442244, 'Nd': 0x442244,
		'Pm': 0x442244, 'Sm': 0x442244, 'Eu': 0x442244, 'Gd': 0x442244,
		'Tb': 0x442244, 'Dy': 0x442244, 'Ho': 0x442244, 'Er': 0x442244,
		'Tm': 0x442244, 'Yb': 0x442244, 'Lu': 0x442244, 'Hf': 0x334444,
		'Ta': 0x442244, 'W': 0x334444, 'Re': 0x442244, 'Os': 0x334444,
		'Ir': 0x442244, 'Pt': 0x334444, 'Au': 0x444400, 'Hg': 0x334444,
		'Tl': 0x442244, 'Pb': 0x334444, 'Bi': 0x442244, 'Po': 0x442244,
		'At': 0x442244, 'Rn': 0x224444, 'Fr': 0x442222, 'Ra': 0x224444,
		'Ac': 0x442244, 'Th': 0x442244, 'Pa': 0x442244, 'U': 0x442244,
		'Np': 0x442244, 'Pu': 0x442244, 'Am': 0x442244, 'Cm': 0x442244,
		'Bk': 0x442244, 'Cf': 0x442244, 'Es': 0x442244, 'Fm': 0x442244,
		'Md': 0x442244, 'No': 0x442244, 'Lr': 0x442244, 'Rf': 0x334444,
		'Db': 0x442244, 'Sg': 0x334444, 'Bh': 0x442244, 'Hs': 0x334444,
		'Mt': 0x442244, 'Ds': 0x334444, 'Rg': 0x442244, 'Cn': 0x334444,
		'Nh': 0x442244, 'Fl': 0x334444, 'Mc': 0x442244, 'Lv': 0x334444,
		'Ts': 0x442244, 'Og': 0x112222
	};
	return emissive[symbol] || 0x222222;
}

// ====== CONTROLES DA VISUALIZAÇÃO ======
function setViewMode(mode, btn) {
	viewMode = mode;
	
	// Atualizar botões
	document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
	if (btn) btn.classList.add('active');
	
	// Atualizar visualização
	update3DViewer();
}

function toggleAnimation(btn) {
	isAnimating = !isAnimating;
	
	// Atualizar botão
	if (isAnimating) {
		btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar';
	} else {
		btn.innerHTML = '<i class="fa-solid fa-play"></i> Animar';
	}
}

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

// ====== SIMULADOR DE REAÇÕES ======

// Inicializar Dropdowns de Reagentes
function initializeReagentDropdowns() {
	const dropdown1 = document.getElementById('reactant1Dropdown');
	const dropdown2 = document.getElementById('reactant2Dropdown');
	
	if (!dropdown1 || !dropdown2) return;
	
	Object.keys(reagents).forEach(category => {
		const categoryHeader = document.createElement('div');
		categoryHeader.className = 'reagent-option';
		categoryHeader.style.background = 'var(--surface-alt)';
		categoryHeader.style.fontWeight = 'bold';
		categoryHeader.textContent = category.toUpperCase();
		categoryHeader.style.color = 'var(--accent)';
		dropdown1.appendChild(categoryHeader.cloneNode(true));
		dropdown2.appendChild(categoryHeader.cloneNode(true));
		
		reagents[category].forEach(reagent => {
			const option = document.createElement('div');
			option.className = `reagent-option ${reagent.type}`;
			option.textContent = `${reagent.name} (${reagent.formula})`;
			option.onclick = () => selectReagent('reactant1', reagent);
			dropdown1.appendChild(option);
			
			const option2 = option.cloneNode(true);
			option2.onclick = () => selectReagent('reactant2', reagent);
			dropdown2.appendChild(option2);
		});
	});
}

// Toggle Dropdown
function toggleDropdown(reactant) {
	const dropdown = document.getElementById(reactant + 'Dropdown');
	if (dropdown) {
		dropdown.classList.toggle('show');
	}
}

// Selecionar Reagente
function selectReagent(reactant, reagent) {
	selectedReagents[reactant] = reagent;
	const display = document.getElementById(reactant + 'Display');
	if (display) {
		display.textContent = `${reagent.name} (${reagent.formula})`;
	}
	const dropdown = document.getElementById(reactant + 'Dropdown');
	if (dropdown) {
		dropdown.classList.remove('show');
	}
	updateReactionEquation();
	drawBeaker();
}

// Atualizar Equação da Reação
function updateReactionEquation() {
	const r1 = selectedReagents.reactant1;
	const r2 = selectedReagents.reactant2;
	const equationElement = document.getElementById('reactionEquation');
	
	if (equationElement) {
		if (r1 && r2) {
			equationElement.textContent = `${r1.formula} + ${r2.formula} → ?`;
		} else {
			equationElement.textContent = '? + ? → ?';
		}
	}
}

// Balancear Equação
function balanceEquation() {
	if (!selectedReagents.reactant1 || !selectedReagents.reactant2) {
		alert('Selecione ambos os reagentes primeiro!');
		return;
	}

	const r1 = selectedReagents.reactant1;
	const r2 = selectedReagents.reactant2;
	
	const reactionKey1 = `${r1.formula}+${r2.formula}`;
	const reactionKey2 = `${r2.formula}+${r1.formula}`;
	
	let knownReaction = knownReactions[reactionKey1] || knownReactions[reactionKey2];
	
	if (knownReaction) {
		displayKnownReaction(knownReaction, r1, r2);
	} else {
		attemptAutoBalance(r1, r2);
	}
}

// Exibir Reação Conhecida
function displayKnownReaction(reaction, r1, r2) {
	const coeff = reaction.coefficients;
	const products = reaction.products;
	
	let equation = '';
	
	if (r1.formula === reaction.reactants[0]) {
		equation += `${coeff[0] > 1 ? coeff[0] : ''}${r1.formula} + ${coeff[1] > 1 ? coeff[1] : ''}${r2.formula}`;
	} else {
		equation += `${coeff[1] > 1 ? coeff[1] : ''}${r2.formula} + ${coeff[0] > 1 ? coeff[0] : ''}${r1.formula}`;
	}
	
	equation += ' → ';
	
	products.forEach((product, index) => {
		const productCoeff = coeff[2 + index];
		if (index > 0) equation += ' + ';
		equation += `${productCoeff > 1 ? productCoeff : ''}${product}`;
	});
	
	const equationElement = document.getElementById('reactionEquation');
	if (equationElement) {
		equationElement.innerHTML = `<strong>${equation}</strong>`;
	}
	
	const resultElement = document.getElementById('reactionResult');
	if (resultElement) {
		resultElement.innerHTML = `
			<div style="text-align: left;">
				<strong style="color: var(--color-primary-500);">✓ Equação Balanceada</strong><br>
				<strong>Tipo:</strong> ${reaction.type}<br>
				<strong>Descrição:</strong> ${reaction.description}<br>
				<strong>Estado:</strong> Reação viável ✅
			</div>
		`;
		resultElement.style.display = 'block';
	}
	
	// Atualizar dados da reação
	updateReactionData(reaction, true);
}

// Tentar Balancear Automaticamente
function attemptAutoBalance(r1, r2) {
	let reactionType = 'unknown';
	let products = [];
	let description = 'Reação genérica';
	
	if (r1.type === 'acid' && r2.type === 'base') {
		reactionType = 'neutralization';
		products = ['Sal', 'H₂O'];
		description = 'Neutralização ácido-base';
	} else if (r2.type === 'acid' && r1.type === 'base') {
		reactionType = 'neutralization';
		products = ['Sal', 'H₂O'];
		description = 'Neutralização ácido-base';
	} else if (r1.type === 'metal' && r2.type === 'acid') {
		reactionType = 'metal-acid';
		products = ['Sal', 'H₂'];
		description = 'Metal + Ácido';
	} else if (r2.type === 'metal' && r1.type === 'acid') {
		reactionType = 'metal-acid';
		products = ['Sal', 'H₂'];
		description = 'Metal + Ácido';
	}
	
	if (products.length > 0) {
		const equation = ` ${r1.formula} + ${r2.formula} → ${products.join(' + ')}`;
		const equationElement = document.getElementById('reactionEquation');
		if (equationElement) {
			equationElement.innerHTML = `<strong>${equation}</strong>`;
		}
		
		const resultElement = document.getElementById('reactionResult');
		if (resultElement) {
			resultElement.innerHTML = `
				<div style="text-align: left;">
					<strong style="color: var(--color-base);">⚠ Equação Não Balanceada</strong><br>
					<strong>Tipo:</strong> ${reactionType}<br>
					<strong>Descrição:</strong> ${description}<br>
					<strong>Estado:</strong> Reação possível (balanceamento manual necessário)<br>
					<strong>Produtos:</strong> ${products.join(', ')}
				</div>
			`;
		}
		
		updateReactionData({ type: reactionType, description }, false);
	} else {
		const resultElement = document.getElementById('reactionResult');
		if (resultElement) {
			resultElement.innerHTML = `
				<div style="text-align: left;">
					<strong style="color: var(--danger);">❌ Reação Desconhecida</strong><br>
					<strong>Estado:</strong> Não foi possível determinar os produtos<br>
					<strong>Sugestão:</strong> Tente combinações diferentes de reagentes
				</div>
			`;
		}
		
		updateReactionData({ type: 'unknown', description: 'Reação não identificada' }, false);
	}
	
	const resultElement = document.getElementById('reactionResult');
	if (resultElement) {
		resultElement.style.display = 'block';
	}
}

// Simular Reação
function simulateReaction() {
	if (!selectedReagents.reactant1 || !selectedReagents.reactant2) {
		alert('Selecione ambos os reagentes primeiro!');
		return;
	}

	// Primeiro balancear a equação
	balanceEquation();
	
	// Iniciar animação da reação
	startReactionAnimation();
	
	// Adicionar efeitos visuais
	const resultDiv = document.getElementById('reactionResult');
	if (resultDiv) {
		resultDiv.innerHTML += `
			<div style="margin-top: 15px; padding: 10px; background: var(--color-primary-500); border-radius: 5px; text-align: center; color: white;">
				<strong>🧪 SIMULAÇÃO EM ANDAMENTO...</strong><br>
				<div style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
					<div class="bubble"></div>
					<div class="bubble"></div>
					<div class="bubble"></div>
				</div>
			</div>
		`;

		// Simular tempo de processamento
		setTimeout(() => {
			const simulationDiv = resultDiv.querySelector('div:last-child');
			if (simulationDiv) {
				simulationDiv.innerHTML = `
					<strong>✅ SIMULAÇÃO CONCLUÍDA!</strong><br>
					<small>Reação simulada com sucesso</small>
				`;
				simulationDiv.style.background = 'var(--color-primary-500)';
			}
		}, 3000);
	}
}

// Carregar Exemplo de Reação
function loadReactionExample(type) {
	const examples = {
		'acid-base': 'Reações Ácido-Base: HCl + NaOH → NaCl + H₂O',
		'salt-formation': 'Formação de Sais: Ácido + Base → Sal + Água',
		'precipitation': 'Precipitação: Formação de sólido insolúvel',
		'organic': 'Reações Orgânicas: Combustão, substituição, etc.'
	};
	
	const infoDiv = document.getElementById('reactionDetails');
	if (infoDiv) {
		infoDiv.innerHTML = examples[type] || 'Tipo de reação não encontrado.';
	}
}

// Carregar Exemplo Específico
function loadExample(example) {
	const examples = {
		'neutralization': {
			r1: reagents.acidos[0], // HCl
			r2: reagents.bases[0]   // NaOH
		},
		'carbonate': {
			r1: reagents.acidos[0], // HCl
			r2: reagents.sais[1]    // CaCO₃
		},
		'metal': {
			r1: reagents.metais[0], // Zn
			r2: reagents.acidos[0]  // HCl
		},
		'combustion': {
			r1: reagents.organicos[0], // CH₄
			r2: reagents.gases[0]      // O₂
		}
	};

	const selectedExample = examples[example];
	if (selectedExample) {
		selectedReagents.reactant1 = selectedExample.r1;
		selectedReagents.reactant2 = selectedExample.r2;
		
		const reactant1Display = document.getElementById('reactant1Display');
		const reactant2Display = document.getElementById('reactant2Display');
		
		if (reactant1Display) {
			reactant1Display.textContent = `${selectedExample.r1.name} (${selectedExample.r1.formula})`;
		}
		if (reactant2Display) {
			reactant2Display.textContent = `${selectedExample.r2.name} (${selectedExample.r2.formula})`;
		}
		
		updateReactionEquation();
		balanceEquation();
	}
}

// ====== CANVAS DA REAÇÃO ======

// Inicializar Canvas
function initializeReactionCanvas() {
	reactionCanvas = document.getElementById('reactionCanvas');
	if (!reactionCanvas) return;
	
	reactionCtx = reactionCanvas.getContext('2d');
	if (!reactionCtx) {
		console.error('Não foi possível obter o contexto 2D do canvas');
		return;
	}
	
	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);
	
	// Força o desenho inicial
	setTimeout(drawBeaker, 100);
}

// Redimensionar Canvas
function resizeCanvas() {
	if (!reactionCanvas || !reactionCtx) return;
	
	const container = reactionCanvas.parentElement;
	if (!container) return;
	
	// Suporte para High DPI (Retina displays)
	const dpr = window.devicePixelRatio || 1;
	const rect = container.getBoundingClientRect();
	
	// Define o tamanho real do canvas (em pixels do dispositivo)
	reactionCanvas.width = rect.width * dpr;
	reactionCanvas.height = rect.height * dpr;
	
	// Escala o contexto para o DPI correto
	reactionCtx.scale(dpr, dpr);
	
	// Ajusta o estilo CSS para o tamanho visível
	reactionCanvas.style.width = rect.width + 'px';
	reactionCanvas.style.height = rect.height + 'px';
	
	// Redesenha o béquer após o redimensionamento
	drawBeaker();
}

// Desenhar Béquer
function drawBeaker() {
	if (!reactionCtx || !reactionCanvas) return;
	
	// Obter tamanho lógico (CSS pixels)
	const width = parseFloat(reactionCanvas.style.width) || reactionCanvas.width;
	const height = parseFloat(reactionCanvas.style.height) || reactionCanvas.height;
	
	// Limpar canvas
	reactionCtx.clearRect(0, 0, width, height);
	
	// Fundo gradiente
	const gradient = reactionCtx.createLinearGradient(0, 0, 0, height);
	gradient.addColorStop(0, '#0a0a0a');
	gradient.addColorStop(0.5, '#1a1a2e');
	gradient.addColorStop(1, '#16213e');
	reactionCtx.fillStyle = gradient;
	reactionCtx.fillRect(0, 0, width, height);
	
	// Desenhar béquer
	const beakerX = width * 0.2;
	const beakerY = height * 0.1;
	const beakerWidth = width * 0.6;
	const beakerHeight = height * 0.8;
	
	// Béquer (forma de U)
	reactionCtx.strokeStyle = '#cccccc';
	reactionCtx.lineWidth = 3;
	reactionCtx.beginPath();
	reactionCtx.moveTo(beakerX, beakerY);
	reactionCtx.lineTo(beakerX, beakerY + beakerHeight * 0.9);
	reactionCtx.arc(beakerX + beakerWidth/2, beakerY + beakerHeight * 0.9, beakerWidth/2, Math.PI, 0);
	reactionCtx.lineTo(beakerX + beakerWidth, beakerY);
	reactionCtx.stroke();
	
	// Líquido no béquer (se houver reagentes)
	if (selectedReagents.reactant1 || selectedReagents.reactant2) {
		const liquidLevel = beakerHeight * 0.6;
		const liquidGradient = reactionCtx.createLinearGradient(0, beakerY + beakerHeight - liquidLevel, 0, beakerY + beakerHeight);
		
		if (selectedReagents.reactant1?.type === 'acid' || selectedReagents.reactant2?.type === 'acid') {
			liquidGradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
			liquidGradient.addColorStop(1, 'rgba(239, 68, 68, 0.6)');
		} else if (selectedReagents.reactant1?.type === 'base' || selectedReagents.reactant2?.type === 'base') {
			liquidGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
			liquidGradient.addColorStop(1, 'rgba(59, 130, 246, 0.6)');
		} else {
			liquidGradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
			liquidGradient.addColorStop(1, 'rgba(16, 185, 129, 0.6)');
		}
		
		reactionCtx.fillStyle = liquidGradient;
		reactionCtx.fillRect(beakerX + 2, beakerY + beakerHeight - liquidLevel, beakerWidth - 4, liquidLevel);
	}
	
	// Partículas/átomos
	drawReactionParticles(beakerX, beakerY, beakerWidth, beakerHeight);
}

// Desenhar Partículas da Reação
function drawReactionParticles(beakerX, beakerY, beakerWidth, beakerHeight) {
	if (!selectedReagents.reactant1 || !selectedReagents.reactant2) return;
	
	const r1 = selectedReagents.reactant1;
	const r2 = selectedReagents.reactant2;
	
	// Partículas do reagente 1
	for (let i = 0; i < 8; i++) {
		const x = beakerX + beakerWidth * 0.2 + Math.random() * beakerWidth * 0.3;
		const y = beakerY + beakerHeight * 0.7 + Math.random() * beakerHeight * 0.2;
		drawParticle(x, y, getParticleColor(r1.type), 4);
	}
	
	// Partículas do reagente 2
	for (let i = 0; i < 8; i++) {
		const x = beakerX + beakerWidth * 0.5 + Math.random() * beakerWidth * 0.3;
		const y = beakerY + beakerHeight * 0.7 + Math.random() * beakerHeight * 0.2;
		drawParticle(x, y, getParticleColor(r2.type), 4);
	}
}

// Desenhar Partícula
function drawParticle(x, y, color, size) {
	if (!reactionCtx) return;
	
	reactionCtx.fillStyle = color;
	reactionCtx.beginPath();
	reactionCtx.arc(x, y, size, 0, Math.PI * 2);
	reactionCtx.fill();
	
	// Brilho
	reactionCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
	reactionCtx.beginPath();
	reactionCtx.arc(x - size/3, y - size/3, size/3, 0, Math.PI * 2);
	reactionCtx.fill();
}

// Cor da Partícula
function getParticleColor(type) {
	const colors = {
		'acid': '#ef4444',
		'base': '#3b82f6',
		'salt': '#10b981',
		'organic': '#8b5cf6',
		'metal': '#f59e0b',
		'gas': '#6b7280'
	};
	return colors[type] || '#cccccc';
}

// ====== ANIMAÇÃO DA REAÇÃO ======

// Iniciar Animação
function startReactionAnimation() {
	if (reactionState.isAnimating) return;
	
	reactionState.isAnimating = true;
	reactionState.stage = 0;
	reactionState.bubbles = [];
	
	animateReaction();
}

// Animar Reação
function animateReaction() {
	if (!reactionState.isAnimating) return;
	
	// Verificar se o canvas está visível
	if (document.getElementById('reactionRightView').style.display === 'none') {
		reactionState.isAnimating = false;
		return;
	}

	drawBeaker();
	
	// Obter dimensões lógicas para o cálculo das bolhas
	const width = parseFloat(reactionCanvas.style.width) || reactionCanvas.width;
	const height = parseFloat(reactionCanvas.style.height) || reactionCanvas.height;
	
	// Criar bolhas durante a reação
	if (reactionState.stage < 100) {
		if (Math.random() < 0.3) {
			createBubble(width, height);
		}
		reactionState.stage++;
	} else {
		reactionState.isAnimating = false;
	}
	
	// Animar bolhas existentes
	animateBubbles();
	
	reactionAnimationId = requestAnimationFrame(animateReaction);
}

// Criar Bolha
function createBubble(canvasWidth, canvasHeight) {
	if (!reactionCanvas) return;
	
	const bubble = {
		x: canvasWidth * (0.3 + Math.random() * 0.4),
		y: canvasHeight * 0.8,
		radius: Math.random() * 8 + 3,
		speed: Math.random() * 2 + 1,
		alpha: 1
	};
	
	reactionState.bubbles.push(bubble);
}

// Animar Bolhas
function animateBubbles() {
	reactionState.bubbles = reactionState.bubbles.filter(bubble => {
		bubble.y -= bubble.speed;
		bubble.alpha -= 0.01;
		
		if (bubble.alpha > 0) {
			drawBubble(bubble);
			return true;
		}
		return false;
	});
}

// Desenhar Bolha
function drawBubble(bubble) {
	if (!reactionCtx) return;
	
	reactionCtx.save();
	reactionCtx.globalAlpha = bubble.alpha;
	reactionCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
	reactionCtx.lineWidth = 1;
	reactionCtx.beginPath();
	reactionCtx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
	reactionCtx.stroke();
	reactionCtx.restore();
}

// Pausar Animação
function pauseReactionAnimation() {
	reactionState.isAnimating = false;
	if (reactionAnimationId) {
		cancelAnimationFrame(reactionAnimationId);
	}
}

// Resetar Animação
function resetReactionAnimation() {
	pauseReactionAnimation();
	reactionState.stage = 0;
	reactionState.bubbles = [];
	drawBeaker();
}

// Alterar Velocidade
function changeReactionSpeed() {
	const speeds = [0.5, 1, 2, 3];
	const currentIndex = speeds.indexOf(reactionState.speed);
	const nextIndex = (currentIndex + 1) % speeds.length;
	reactionState.speed = speeds[nextIndex];
	
	const btn = document.getElementById('speedBtn');
	if (btn) {
		btn.innerHTML = `<i class="fa-solid fa-tachometer-alt"></i> ${reactionState.speed}x`;
	}
}

// Atualizar Dados da Reação
function updateReactionData(reaction, isBalanced) {
	const dataDiv = document.getElementById('reactionData');
	if (!dataDiv) return;
	
	let state = 'Aguardando reagentes...';
	if (selectedReagents.reactant1 && selectedReagents.reactant2) {
		state = 'Reagentes selecionados';
		if (isBalanced) state = 'Reação balanceada';
	}
	
	dataDiv.innerHTML = `
		<p><strong>Estado:</strong> ${state}</p>
		<p><strong>Temperatura:</strong> 25°C</p>
		<p><strong>Pressão:</strong> 1 atm</p>
		<p><strong>pH:</strong> ${getPH()}</p>
		<p><strong>Produtos formados:</strong> ${reaction.products ? reaction.products.length : 0}</p>
		<p><strong>Tipo:</strong> ${reaction.type || 'N/A'}</p>
		<p><strong>Balanceada:</strong> ${isBalanced ? 'Sim' : 'Não'}</p>
	`;
}

// Obter pH Estimado
function getPH() {
	if (!selectedReagents.reactant1 || !selectedReagents.reactant2) return '7.0';
	
	const hasAcid = selectedReagents.reactant1.type === 'acid' || selectedReagents.reactant2.type === 'acid';
	const hasBase = selectedReagents.reactant1.type === 'base' || selectedReagents.reactant2.type === 'base';
	
	if (hasAcid && hasBase) return '7.0 (neutralizado)';
	if (hasAcid) return '2-3 (ácido)';
	if (hasBase) return '11-12 (básico)';
	return '7.0 (neutro)';
}

// Configurar Event Listeners
function setupReactionEventListeners() {
	// Fechar dropdowns ao clicar fora
	window.addEventListener('click', function(e) {
		if (!e.target.matches('.reagent-input')) {
			document.querySelectorAll('.dropdown-content').forEach(dropdown => {
				dropdown.classList.remove('show');
			});
		}
	});
}
