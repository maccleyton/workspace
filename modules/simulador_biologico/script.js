// ==================== GLOBAL VARIABLES ====================
let canvas, ctx;
let isSimulating = false;
let currentModule = 'celulas';
let animationId = null;
let particles = [];
let fps = 0;
let lastTime = Date.now();

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
	initCanvas();
	setupModuleNavigation();
	setupSearch();
	setupSliders();
	loadModule('celulas');
	animate();
});

// ==================== CANVAS SETUP ====================
function initCanvas() {
	canvas = document.getElementById('mainCanvas');
	ctx = canvas.getContext('2d');

	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
	const container = canvas.parentElement;
	canvas.width = container.clientWidth;
	canvas.height = container.clientHeight;
	redrawCurrentModule();
}

// ==================== ANIMATION LOOP ====================
function animate() {
	animationId = requestAnimationFrame(animate);

	// Calculate FPS
	const now = Date.now();
	fps = Math.round(1000 / (now - lastTime));
	lastTime = now;
	document.getElementById('canvasFPS').textContent = fps;

	// Clear canvas
	ctx.fillStyle = '#0a0a0a';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Draw based on current module
	switch(currentModule) {
		case 'celulas':
			drawCell();
			break;
		case 'dna':
			drawDNA();
			break;
		case 'ecossistemas':
			drawEcosystem();
			break;
		case 'microbiologia':
			drawMicrobes();
			break;
		case 'fisiologia':
			drawBody();
			break;
		case 'evolucao':
			drawEvolution();
			break;
	}

	// Update particles if simulating
	if (isSimulating) {
		updateParticles();
	}
}

// ==================== DRAWING FUNCTIONS ====================
function drawCell() {
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;
	const cellRadius = Math.min(canvas.width, canvas.height) * 0.35;

	// Cell membrane
	ctx.strokeStyle = '#10b981';
	ctx.lineWidth = 2;
	ctx.globalAlpha = 0.3;
	ctx.beginPath();
	ctx.arc(centerX, centerY, cellRadius, 0, Math.PI * 2);
	ctx.stroke();

	// Nucleus
	ctx.globalAlpha = 0.6;
	ctx.fillStyle = '#3b82f6';
	ctx.beginPath();
	ctx.arc(centerX, centerY, cellRadius * 0.3, 0, Math.PI * 2);
	ctx.fill();

	// Mitochondria
	ctx.globalAlpha = 0.8;
	ctx.fillStyle = '#ef4444';
	for (let i = 0; i < 5; i++) {
		const angle = (i / 5) * Math.PI * 2 + Date.now() * 0.0001;
		const x = centerX + Math.cos(angle) * cellRadius * 0.6;
		const y = centerY + Math.sin(angle) * cellRadius * 0.6;
		ctx.beginPath();
		ctx.ellipse(x, y, 15, 8, angle, 0, Math.PI * 2);
		ctx.fill();
	}

	// Ribosomes
	ctx.fillStyle = '#10b981';
	for (let i = 0; i < 20; i++) {
		const angle = (i / 20) * Math.PI * 2;
		const radius = cellRadius * (0.4 + Math.random() * 0.3);
		const x = centerX + Math.cos(angle) * radius;
		const y = centerY + Math.sin(angle) * radius;
		ctx.beginPath();
		ctx.arc(x, y, 3, 0, Math.PI * 2);
		ctx.fill();
	}

	ctx.globalAlpha = 1;
	document.getElementById('canvasElements').textContent = 26;
}

function drawDNA() {
	const centerX = canvas.width / 2;
	const startY = 20;
	const amplitude = 40;
	const frequency = 0.05;
	const segments = 100;

	ctx.lineWidth = 2;

	for (let i = 0; i < segments; i++) {
		const y = startY + (i / segments) * (canvas.height - 40);
		const offset = Date.now() * 0.001;
		const x1 = centerX + Math.sin((i * frequency) + offset) * amplitude;
		const x2 = centerX - Math.sin((i * frequency) + offset) * amplitude;

		// Strand 1
		ctx.strokeStyle = '#3b82f6';
		ctx.beginPath();
		ctx.arc(x1, y, 4, 0, Math.PI * 2);
		ctx.stroke();

		// Strand 2
		ctx.strokeStyle = '#ef4444';
		ctx.beginPath();
		ctx.arc(x2, y, 4, 0, Math.PI * 2);
		ctx.stroke();

		// Base pairs
		if (i % 5 === 0) {
			ctx.strokeStyle = '#10b981';
			ctx.globalAlpha = 0.3;
			ctx.beginPath();
			ctx.moveTo(x1, y);
			ctx.lineTo(x2, y);
			ctx.stroke();
			ctx.globalAlpha = 1;
		}
	}

	document.getElementById('canvasElements').textContent = segments * 2;
}

function drawEcosystem() {
	// Ground
	ctx.fillStyle = '#047857';
	ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

	// Trees
	ctx.fillStyle = '#78350f';
	for (let i = 0; i < 8; i++) {
		const x = (i / 7) * canvas.width;
		const y = canvas.height - 80;
		ctx.fillRect(x - 5, y, 10, 30);

		// Foliage
		ctx.fillStyle = '#10b981';
		ctx.beginPath();
		ctx.arc(x, y, 20, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = '#78350f';
	}

	// Sun
	ctx.fillStyle = '#f59e0b';
	ctx.globalAlpha = 0.8;
	ctx.beginPath();
	ctx.arc(canvas.width - 50, 50, 30, 0, Math.PI * 2);
	ctx.fill();
	ctx.globalAlpha = 1;

	// Animals (moving)
	ctx.fillStyle = '#dc2626';
	const animalX = (Date.now() * 0.05) % canvas.width;
	ctx.beginPath();
	ctx.arc(animalX, canvas.height - 70, 8, 0, Math.PI * 2);
	ctx.fill();

	document.getElementById('canvasElements').textContent = 17;
}

function drawMicrobes() {
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;
	const petriRadius = Math.min(canvas.width, canvas.height) * 0.4;

	// Petri dish
	ctx.strokeStyle = '#1a1a1a';
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.arc(centerX, centerY, petriRadius, 0, Math.PI * 2);
	ctx.stroke();

	// Microbes
	const colors = ['#ef4444', '#10b981', '#3b82f6', '#f59e0b'];
	for (let i = 0; i < 30; i++) {
		const angle = (i / 30) * Math.PI * 2 + Date.now() * 0.0002;
		const radius = Math.random() * petriRadius * 0.8;
		const x = centerX + Math.cos(angle) * radius;
		const y = centerY + Math.sin(angle) * radius;

		ctx.fillStyle = colors[i % colors.length];
		ctx.globalAlpha = 0.7;
		ctx.beginPath();
		ctx.arc(x, y, 5 + Math.random() * 5, 0, Math.PI * 2);
		ctx.fill();
	}

	ctx.globalAlpha = 1;
	document.getElementById('canvasElements').textContent = 30;
}

function drawBody() {
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;

	// Head
	ctx.fillStyle = '#10b981';
	ctx.globalAlpha = 0.6;
	ctx.beginPath();
	ctx.arc(centerX, centerY - 80, 40, 0, Math.PI * 2);
	ctx.fill();

	// Torso
	ctx.fillRect(centerX - 30, centerY - 40, 60, 80);

	// Heart (pulsing)
	const heartScale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
	ctx.fillStyle = '#ef4444';
	ctx.globalAlpha = 0.9;
	ctx.beginPath();
	ctx.arc(centerX - 10, centerY - 10, 15 * heartScale, 0, Math.PI * 2);
	ctx.fill();

	// Lungs
	ctx.fillStyle = '#3b82f6';
	ctx.globalAlpha = 0.7;
	ctx.beginPath();
	ctx.arc(centerX - 25, centerY, 12, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(centerX + 15, centerY, 12, 0, Math.PI * 2);
	ctx.fill();

	ctx.globalAlpha = 1;
	document.getElementById('canvasElements').textContent = 5;
}

function drawEvolution() {
	const centerX = canvas.width / 2;
	const baseY = canvas.height - 50;

	// Tree trunk
	ctx.fillStyle = '#78350f';
	ctx.fillRect(centerX - 10, baseY - 150, 20, 150);

	// Branches (evolutionary paths)
	ctx.strokeStyle = '#10b981';
	ctx.lineWidth = 3;

	for (let i = 0; i < 6; i++) {
		const angle = ((i / 6) * Math.PI) - Math.PI / 2;
		const length = 80;
		const startY = baseY - 150 + (i * 25);

		ctx.beginPath();
		ctx.moveTo(centerX, startY);
		ctx.lineTo(
			centerX + Math.cos(angle) * length,
			startY + Math.sin(angle) * length
		);
		ctx.stroke();

		// Species nodes
		ctx.fillStyle = '#3b82f6';
		ctx.beginPath();
		ctx.arc(
			centerX + Math.cos(angle) * length,
			startY + Math.sin(angle) * length,
			8, 0, Math.PI * 2
		);
		ctx.fill();
	}

	document.getElementById('canvasElements').textContent = 12;
}

function updateParticles() {
	particles.forEach((p, index) => {
		p.x += p.vx;
		p.y += p.vy;
		p.life--;

		if (p.life <= 0) {
			particles.splice(index, 1);
		}
	});
}

// ==================== MODULE NAVIGATION ====================
function setupModuleNavigation() {
	const moduleItems = document.querySelectorAll('.module-item[data-module]');
	moduleItems.forEach(item => {
		item.addEventListener('click', function() {
			moduleItems.forEach(m => m.classList.remove('active'));
			this.classList.add('active');
			loadModule(this.dataset.module);
		});
	});
}

function loadModule(module) {
	currentModule = module;

	// Hide all modules
	document.querySelectorAll('.module-content').forEach(content => {
		content.classList.remove('active');
	});

	// Show selected module
	const moduleContent = document.getElementById(module + '-content');
	if (moduleContent) {
		moduleContent.classList.add('active');
	}

	particles = [];
	redrawCurrentModule();
}

function redrawCurrentModule() {
	// Force redraw on next frame
}

// ==================== SIMULATION CONTROLS ====================
function toggleSimulation() {
	isSimulating = !isSimulating;
	const btn = document.getElementById('playBtn');
	const status = document.getElementById('canvasStatus');

	if (isSimulating) {
		btn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
		btn.classList.add('primary');
		status.textContent = 'Simulando';
	} else {
		btn.innerHTML = '<i class="fas fa-play"></i> Iniciar';
		status.textContent = 'Pausado';
	}
}

function resetSimulation() {
	isSimulating = false;
	particles = [];
	document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i> Iniciar';
	document.getElementById('canvasStatus').textContent = 'Resetado';
	loadModule(currentModule);
}

function exportCanvas() {
	const dataURL = canvas.toDataURL('image/png');
	const a = document.createElement('a');
	a.href = dataURL;
	a.download = `biologico_${currentModule}_${Date.now()}.png`;
	a.click();
}

function exportData(module) {
	const data = {
		module: module,
		timestamp: new Date().toISOString(),
		isSimulating: isSimulating
	};
	const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `biologico_${module}_${Date.now()}.json`;
	a.click();
	URL.revokeObjectURL(url);
}

// ==================== SEARCH ====================
function setupSearch() {
	const searchInput = document.getElementById('searchInput');
	searchInput.addEventListener('input', function() {
		const query = this.value.toLowerCase();
		const items = document.querySelectorAll('.module-item[data-module]');
		items.forEach(item => {
			const name = item.querySelector('.module-name').textContent.toLowerCase();
			item.style.display = name.includes(query) ? 'flex' : 'none';
		});
	});
}

// ==================== SLIDERS ====================
function setupSliders() {
	// Ecossistema
	['ecoTemp', 'ecoUmidade', 'ecoLuz'].forEach(id => {
		const slider = document.getElementById(id);
		if (slider) {
			slider.addEventListener('input', function() {
				const value = this.value;
				const suffix = id === 'ecoTemp' ? '°C' : '%';
				document.getElementById(id + 'Value').textContent = value + suffix;
			});
		}
	});

	// Microbiologia
	['microPh', 'microTemp', 'microNutri'].forEach(id => {
		const slider = document.getElementById(id);
		if (slider) {
			slider.addEventListener('input', function() {
				const value = parseFloat(this.value).toFixed(id === 'microPh' ? 1 : 0);
				const suffix = id === 'microTemp' ? '°C' : (id === 'microNutri' ? '%' : '');
				document.getElementById(id + 'Value').textContent = value + suffix;
			});
		}
	});

	// Evolução
	['evoMutacao', 'evoPressao', 'evoPopulacao'].forEach(id => {
		const slider = document.getElementById(id);
		if (slider) {
			slider.addEventListener('input', function() {
				let value = this.value;
				if (id === 'evoPopulacao') {
					value = parseInt(value).toLocaleString();
				} else {
					value = value + '%';
				}
				document.getElementById(id + 'Value').textContent = value;
			});
		}
	});
}

// ==================== MODULE SPECIFIC FUNCTIONS ====================
function focusOrganelle(type) {
	addLog('cellLog', `Focando organela: ${type}`);
}

function startCellProcesses() {
	addLog('cellLog', 'Processos celulares iniciados');
	isSimulating = true;
	toggleSimulation();
}

function divideCell() {
	addLog('cellLog', 'Divisão celular em progresso (mitose)');
}

function startGeneticProcess(type) {
	addLog('dnaLog', `Processo genético iniciado: ${type}`);
}

function executeCRISPR() {
	addLog('dnaLog', 'Edição CRISPR executada com sucesso');
}

function startDNAProcess() {
	addLog('dnaLog', 'Replicação de DNA iniciada');
}

function resetDNA() {
	addLog('dnaLog', 'Sistema genético reiniciado');
}

function selectBiome(type) {
	addLog('ecoLog', `Bioma selecionado: ${type}`);
}

function startEcosystem() {
	addLog('ecoLog', 'Simulação de ecossistema iniciada');
	isSimulating = true;
}

function addSpecies() {
	addLog('ecoLog', 'Nova espécie adicionada ao ecossistema');
}

function addMicrobe(type) {
	addLog('microLog', `Microrganismo adicionado: ${type}`);
}

function setInteraction(type) {
	addLog('microLog', `Tipo de interação: ${type}`);
}

function startInfection() {
	addLog('microLog', 'Processo de infecção iniciado');
	isSimulating = true;
}

function focusSystem(type) {
	addLog('fisioLog', `Sistema focado: ${type}`);
}

function introducePathogen() {
	addLog('fisioLog', 'Patógeno introduzido no sistema');
}

function activateImmunity() {
	addLog('fisioLog', 'Sistema imune ativado');
}

function applyVaccine() {
	addLog('fisioLog', 'Vacina aplicada com sucesso');
}

function startPhysiology() {
	addLog('fisioLog', 'Simulação fisiológica iniciada');
	isSimulating = true;
}

function resetPhysiology() {
	addLog('fisioLog', 'Sistema fisiológico reiniciado');
}

function applyMechanism(type) {
	addLog('evoLog', `Mecanismo evolutivo aplicado: ${type}`);
}

function startEvolution() {
	addLog('evoLog', 'Evolução iniciada');
	isSimulating = true;
}

function applySelection() {
	addLog('evoLog', 'Pressão seletiva aplicada');
}

function triggerSpeciation() {
	addLog('evoLog', 'Evento de especiação disparado');
}

function executeGeneration() {
	addLog('evoLog', 'Nova geração executada');
}

function resetEvolution() {
	addLog('evoLog', 'Sistema evolutivo reiniciado');
}

function addLog(logId, message) {
	const logEl = document.getElementById(logId);
	if (logEl) {
		const line = document.createElement('div');
		line.className = 'log-line';
		line.textContent = message;
		logEl.appendChild(line);
		logEl.scrollTop = logEl.scrollHeight;

		// Keep only last 10 lines
		while (logEl.children.length > 10) {
			logEl.removeChild(logEl.firstChild);
		}
	}
}

// ====== VOLTAR ======
document.getElementById('toGoBackBtn').addEventListener('click', function() {
    window.location.href = "../../index.html";
});