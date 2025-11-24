// ==================== INICIALIZAÇÃO ====================
window.addEventListener('DOMContentLoaded', function() {
	if (typeof THREE === 'undefined') {
		console.error('THREE.js não carregou');
		return;
	}
	console.log('✓ THREE.js carregado');
	setTimeout(inicializarSistema, 200);
});

// ==================== VARIÁVEIS GLOBAIS (DECLARADAS UMA VEZ) ====================
let canvas3D, canvas2D, ctx2D;
let scene, camera, renderer;
let isSimulating = false;
let currentModule = 'leis';
let currentTab = '3d';
let animationId = null;
let fps = 0;
let lastTime = Date.now();
let objects3D = [];
let selectedMachineType = 'carnot';
let selectedDiagramType = 'pv';
let selectedMechanism = 'conducao';
let selectedMaterial = 'cobre';  
let selectedGasLaw = 'ideal';
let selectedSubstance = 'agua';
let selectedTransition = 'fusao';
let selectedCycle = 'carnot';

// ==================== FUNÇÕES DE INICIALIZAÇÃO ====================
function inicializarSistema() {
	try {
		init3D();
		init2D();
		setupModuleNavigation();
		setupSearch();
		setupAllSliders();
		loadModule('leis');
		animate();
		addFeedback('Sistema inicializado', 'info');
	} catch(e) {
		console.error('Erro:', e);
		addFeedback('Erro: ' + e.message, 'error');
	}
}

function init3D() {
	canvas3D = document.getElementById('canvas3D');
	if (!canvas3D || typeof THREE === 'undefined') return;
	const container = canvas3D.parentElement;
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x0a0a0a);
	camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
	camera.position.z = 5;
	renderer = new THREE.WebGLRenderer({ canvas: canvas3D, antialias: true });
	renderer.setSize(container.clientWidth, container.clientHeight);
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);
	const pointLight = new THREE.PointLight(0x10b981, 1);
	pointLight.position.set(5, 5, 5);
	scene.add(pointLight);
	window.addEventListener('resize', onWindowResize);
	create3DScene(currentModule);
	addFeedback('3D inicializado', 'info');
}

function init2D() {
	canvas2D = document.getElementById('canvas2D');
	if (!canvas2D) return;
	ctx2D = canvas2D.getContext('2d');
	const container = canvas2D.parentElement;
	canvas2D.width = container.clientWidth;
	canvas2D.height = container.clientHeight;
	addFeedback('2D inicializado', 'info');
}

function onWindowResize() {
	if (canvas3D && camera && renderer) {
		const container = canvas3D.parentElement;
		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.clientWidth, container.clientHeight);
	}
	if (canvas2D) {
		canvas2D.width = canvas2D.parentElement.clientWidth;
		canvas2D.height = canvas2D.parentElement.clientHeight;
	}
}

// ==================== ABAS ====================
function switchTab(tab) {
	currentTab = tab;
	document.getElementById('modoAtual').textContent = tab === '3d' ? '3D' : 'Gráfico';
	document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
	event.target.closest('.tab-button').classList.add('active');
	document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
	document.getElementById('tab-' + tab).classList.add('active');
	addFeedback('Modo ' + (tab === '3d' ? '3D' : 'Gráfico'), 'info');
	if (tab === '3d' && scene) {
		clear3DScene();
		create3DScene(currentModule);
	} else if (tab === 'grafico') {
		setTimeout(function() {
			if (canvas2D && ctx2D) {
				canvas2D.width = canvas2D.parentElement.clientWidth;
				canvas2D.height = canvas2D.parentElement.clientHeight;
				draw2DGraph();
			}
		}, 100);
	}
}

// ==================== NAVEGAÇÃO ====================
function setupModuleNavigation() {
	const items = document.querySelectorAll('.module-item[data-module]');
	items.forEach(item => {
		item.addEventListener('click', function() {
			items.forEach(i => i.classList.remove('active'));
			this.classList.add('active');
			loadModule(this.dataset.module);
		});
	});
}

function loadModule(module) {
	currentModule = module;
	document.querySelectorAll('.module-content').forEach(c => c.classList.remove('active'));
	const content = document.getElementById(module + '-content');
	if (content) content.classList.add('active');
	if (currentTab === '3d' && scene) {
		clear3DScene();
		create3DScene(module);
	} else if (currentTab === 'grafico') {
		draw2DGraph();
	}
	addFeedback('Módulo "' + module + '"', 'info');
}

// ==================== CENAS 3D ====================
function create3DScene(module) {
	if (!scene || typeof THREE === 'undefined') return;
	switch(module) {
		case 'leis': create3DThermo(); break;
		case 'maquinas': create3DEngine(); break;
		case 'transferencia': create3DHeatTransfer(); break;
		case 'gases': create3DGas(); break;
		case 'fases': create3DPhases(); break;
		case 'diagramas': create3DDiagram(); break;
	}
}

function create3DThermo() {
	const box = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshPhongMaterial({ color: 0x10b981, transparent: true, opacity: 0.3 }));
	scene.add(box);
	objects3D.push(box);
	for (let i = 0; i < 20; i++) {
		const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), new THREE.MeshPhongMaterial({ color: 0xef4444 }));
		sphere.position.set((Math.random() - 0.5) * 1.8, (Math.random() - 0.5) * 1.8, (Math.random() - 0.5) * 1.8);
		scene.add(sphere);
		objects3D.push(sphere);
	}
}

function create3DEngine() {
	const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2, 32), new THREE.MeshPhongMaterial({ color: 0x10b981 }));
	scene.add(cylinder);
	objects3D.push(cylinder);
}

function create3DHeatTransfer() {
	const hot = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshPhongMaterial({ color: 0xef4444 }));
	hot.position.x = -1.5;
	scene.add(hot);
	objects3D.push(hot);
	const cold = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshPhongMaterial({ color: 0x3b82f6 }));
	cold.position.x = 1.5;
	scene.add(cold);
	objects3D.push(cold);
}

function create3DGas() {
	const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 32), new THREE.MeshPhongMaterial({ color: 0x10b981, transparent: true, opacity: 0.2, wireframe: true }));
	scene.add(sphere);
	objects3D.push(sphere);
	for (let i = 0; i < 30; i++) {
		const particle = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshPhongMaterial({ color: 0x3b82f6 }));
		particle.position.set((Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 2.5);
		scene.add(particle);
		objects3D.push(particle);
	}
}

function create3DPhases() {
	const solid = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), new THREE.MeshPhongMaterial({ color: 0x3b82f6 }));
	solid.position.x = -2;
	scene.add(solid);
	objects3D.push(solid);
	const liquid = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshPhongMaterial({ color: 0x10b981 }));
	scene.add(liquid);
	objects3D.push(liquid);
	const gas = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 0), new THREE.MeshPhongMaterial({ color: 0xef4444, wireframe: true }));
	gas.position.x = 2;
	scene.add(gas);
	objects3D.push(gas);
}

function create3DDiagram() {
	const geometry = new THREE.PlaneGeometry(3, 3, 10, 10);
	const material = new THREE.MeshPhongMaterial({ color: 0x10b981, side: THREE.DoubleSide, wireframe: true });
	const plane = new THREE.Mesh(geometry, material);
	plane.rotation.x = -Math.PI / 4;
	scene.add(plane);
	objects3D.push(plane);
}

function clear3DScene() {
	objects3D.forEach(obj => {
		if (obj.geometry) obj.geometry.dispose();
		if (obj.material) obj.material.dispose();
		scene.remove(obj);
	});
	objects3D = [];
}

// ==================== GRÁFICOS 2D DINÂMICOS ====================
function draw2DGraph() {
	if (!ctx2D || !canvas2D) return;
	ctx2D.fillStyle = '#0a0a0a';
	ctx2D.fillRect(0, 0, canvas2D.width, canvas2D.height);

	switch(currentModule) {
		case 'leis': drawThermoDiagram(); break;
		case 'maquinas': drawEngineCycle(); break;
		case 'transferencia': drawHeatGradient(); break;
		case 'gases': drawGasDistribution(); break;
		case 'fases': drawPhaseDiagram(); break;
		case 'diagramas': drawSelectedDiagram(); break;
		default: drawThermoDiagram();
	}
}

function drawThermoDiagram() {
	const cx = canvas2D.width / 2;
	const cy = canvas2D.height / 2;
	ctx2D.strokeStyle = '#10b981';
	ctx2D.lineWidth = 2;
	ctx2D.beginPath();
	ctx2D.moveTo(50, cy + 100);
	ctx2D.lineTo(canvas2D.width - 50, cy + 100);
	ctx2D.moveTo(50, cy + 100);
	ctx2D.lineTo(50, cy - 100);
	ctx2D.stroke();
	ctx2D.strokeStyle = '#3b82f6';
	ctx2D.lineWidth = 3;
	ctx2D.beginPath();
	for (let i = 0; i < 100; i++) {
		const x = 50 + (i / 100) * (canvas2D.width - 100);
		const offset = isSimulating ? Date.now() * 0.002 : 0;
		const y = cy + 100 - Math.sin(i * 0.1 + offset) * 80;
		if (i === 0) ctx2D.moveTo(x, y);
		else ctx2D.lineTo(x, y);
	}
	ctx2D.stroke();
	ctx2D.fillStyle = '#e0e0e0';
	ctx2D.font = '12px Inter';
	ctx2D.fillText('Volume', canvas2D.width - 80, cy + 120);
	ctx2D.save();
	ctx2D.translate(30, cy);
	ctx2D.rotate(-Math.PI / 2);
	ctx2D.fillText('Pressão', -40, 0);
	ctx2D.restore();
	ctx2D.font = '14px Inter';
	ctx2D.fillStyle = '#10b981';
	ctx2D.fillText('Diagrama P-V', cx - 50, 30);
}

function drawEngineCycle() {
	const cx = canvas2D.width / 2;
	const cy = canvas2D.height / 2;
	ctx2D.fillStyle = '#10b981';
	ctx2D.font = '14px Inter';

	if (selectedMachineType === 'carnot') {
		ctx2D.fillText('Ciclo de Carnot', cx - 60, 30);
		ctx2D.strokeStyle = '#10b981';
		ctx2D.lineWidth = 3;
		ctx2D.beginPath();
		ctx2D.moveTo(cx - 80, cy - 60);
		ctx2D.lineTo(cx + 80, cy - 60);
		ctx2D.lineTo(cx + 60, cy + 60);
		ctx2D.lineTo(cx - 60, cy + 60);
		ctx2D.closePath();
		ctx2D.stroke();
		if (isSimulating) {
			ctx2D.fillStyle = 'rgba(16, 185, 129, 0.1)';
			ctx2D.fill();
		}
	} else if (selectedMachineType === 'otto') {
		ctx2D.fillText('Ciclo Otto', cx - 50, 30);
		ctx2D.strokeStyle = '#3b82f6';
		ctx2D.lineWidth = 3;
		ctx2D.beginPath();
		ctx2D.moveTo(cx - 60, cy + 60);
		ctx2D.lineTo(cx - 60, cy - 60);
		ctx2D.lineTo(cx + 60, cy - 30);
		ctx2D.lineTo(cx + 60, cy + 30);
		ctx2D.closePath();
		ctx2D.stroke();
		if (isSimulating) {
			ctx2D.fillStyle = 'rgba(59, 130, 246, 0.1)';
			ctx2D.fill();
		}
	} else if (selectedMachineType === 'diesel') {
		ctx2D.fillText('Ciclo Diesel', cx - 50, 30);
		ctx2D.strokeStyle = '#ef4444';
		ctx2D.lineWidth = 3;
		ctx2D.beginPath();
		ctx2D.moveTo(cx - 70, cy + 50);
		ctx2D.lineTo(cx - 70, cy - 50);
		ctx2D.lineTo(cx + 40, cy - 50);
		ctx2D.lineTo(cx + 70, cy);
		ctx2D.lineTo(cx + 70, cy + 50);
		ctx2D.closePath();
		ctx2D.stroke();
	} else if (selectedMachineType === 'rankine') {
		ctx2D.fillText('Ciclo Rankine', cx - 60, 30);
		ctx2D.strokeStyle = '#8b5cf6';
		ctx2D.lineWidth = 3;
		ctx2D.beginPath();
		ctx2D.moveTo(cx - 50, cy + 70);
		ctx2D.bezierCurveTo(cx - 50, cy - 30, cx + 50, cy - 30, cx + 50, cy + 70);
		ctx2D.lineTo(cx - 50, cy + 70);
		ctx2D.stroke();
	} else {
		ctx2D.fillText('Ciclo Stirling', cx - 60, 30);
		ctx2D.strokeStyle = '#f59e0b';
		ctx2D.lineWidth = 3;
		ctx2D.beginPath();
		for (let i = 0; i <= 100; i++) {
			const angle = (i / 100) * Math.PI * 2;
			const r = 60 + 20 * Math.sin(angle * 2);
			const x = cx + r * Math.cos(angle);
			const y = cy + r * Math.sin(angle);
			if (i === 0) ctx2D.moveTo(x, y);
			else ctx2D.lineTo(x, y);
		}
		ctx2D.stroke();
	}
}

function drawHeatGradient() {
	const cx = canvas2D.width / 2;
	const cy = canvas2D.height / 2;
	for (let i = 0; i < canvas2D.width - 100; i++) {
		const ratio = i / (canvas2D.width - 100);
		const r = Math.floor(239 * (1 - ratio) + 59 * ratio);
		const g = Math.floor(68 * (1 - ratio) + 130 * ratio);
		const b = Math.floor(68 * (1 - ratio) + 246 * ratio);
		ctx2D.fillStyle = `rgb(${r}, ${g}, ${b})`;
		ctx2D.fillRect(50 + i, cy - 50, 2, 100);
	}
	ctx2D.fillStyle = '#e0e0e0';
	ctx2D.font = '14px Inter';
	ctx2D.fillText('🔥 Quente', 60, cy - 60);
	ctx2D.fillText('❄️ Frio', canvas2D.width - 120, cy - 60);
	ctx2D.fillStyle = '#10b981';
	ctx2D.fillText('Gradiente de Temperatura', cx - 100, 30);
	if (isSimulating) {
		ctx2D.fillStyle = '#f59e0b';
		for (let i = 0; i < 8; i++) {
			const x = 100 + i * 60 + ((Date.now() * 0.05) % 60);
			ctx2D.beginPath();
			ctx2D.arc(x, cy, 5, 0, Math.PI * 2);
			ctx2D.fill();
		}
	}
}

function drawGasDistribution() {
	const cx = canvas2D.width / 2;
	const cy = canvas2D.height / 2;
	ctx2D.strokeStyle = '#10b981';
	ctx2D.lineWidth = 3;
	ctx2D.beginPath();
	for (let i = 0; i < canvas2D.width - 100; i++) {
		const x = i / (canvas2D.width - 100) * 5;
		const y = Math.pow(x, 2) * Math.exp(-x) * 100;
		const canvasX = 50 + i;
		const canvasY = cy + 80 - y;
		if (i === 0) ctx2D.moveTo(canvasX, canvasY);
		else ctx2D.lineTo(canvasX, canvasY);
	}
	ctx2D.stroke();
	ctx2D.lineTo(canvas2D.width - 50, cy + 80);
	ctx2D.lineTo(50, cy + 80);
	ctx2D.fillStyle = 'rgba(16, 185, 129, 0.2)';
	ctx2D.fill();
	ctx2D.fillStyle = '#10b981';
	ctx2D.font = '14px Inter';
	ctx2D.fillText('Distribuição de Maxwell-Boltzmann', cx - 130, 30);
}

function drawPhaseDiagram() {
	const cx = canvas2D.width / 2;
	const cy = canvas2D.height / 2;
	ctx2D.strokeStyle = '#666';
	ctx2D.lineWidth = 2;
	ctx2D.beginPath();
	ctx2D.moveTo(50, cy + 80);
	ctx2D.lineTo(canvas2D.width - 50, cy + 80);
	ctx2D.moveTo(50, cy + 80);
	ctx2D.lineTo(50, cy - 80);
	ctx2D.stroke();
	ctx2D.strokeStyle = '#10b981';
	ctx2D.lineWidth = 3;
	ctx2D.beginPath();
	ctx2D.moveTo(50, cy + 80);
	ctx2D.quadraticCurveTo(cx - 50, cy, cx, cy - 60);
	ctx2D.stroke();
	ctx2D.strokeStyle = '#3b82f6';
	ctx2D.beginPath();
	ctx2D.moveTo(cx, cy - 60);
	ctx2D.quadraticCurveTo(cx + 50, cy - 20, canvas2D.width - 50, cy - 10);
	ctx2D.stroke();
	ctx2D.fillStyle = '#e0e0e0';
	ctx2D.font = '14px Inter';
	ctx2D.fillText('❄️ Sólido', 100, cy + 40);
	ctx2D.fillText('💧 Líquido', cx - 30, cy + 20);
	ctx2D.fillText('💨 Gás', cx + 80, cy - 40);
	ctx2D.fillStyle = '#10b981';
	ctx2D.fillText('Diagrama de Fases', cx - 80, 30);
}

function drawSelectedDiagram() {
	const cx = canvas2D.width / 2;
	const cy = canvas2D.height / 2;
	ctx2D.fillStyle = '#10b981';
	ctx2D.font = '14px Inter';

	if (selectedDiagramType === 'pv') {
		ctx2D.fillText('Diagrama P-V', cx - 50, 30);
		drawThermoDiagram();
	} else if (selectedDiagramType === 'ts') {
		ctx2D.fillText('Diagrama T-S', cx - 50, 30);
		ctx2D.strokeStyle = '#10b981';
		ctx2D.lineWidth = 2;
		ctx2D.beginPath();
		ctx2D.moveTo(50, cy + 100);
		ctx2D.lineTo(canvas2D.width - 50, cy + 100);
		ctx2D.moveTo(50, cy + 100);
		ctx2D.lineTo(50, cy - 100);
		ctx2D.stroke();
		ctx2D.strokeStyle = '#ef4444';
		ctx2D.lineWidth = 3;
		ctx2D.beginPath();
		for (let i = 0; i < 100; i++) {
			const x = 50 + (i / 100) * (canvas2D.width - 100);
			const y = cy + 100 - (i / 100) * 180;
			if (i === 0) ctx2D.moveTo(x, y);
			else ctx2D.lineTo(x, y);
		}
		ctx2D.stroke();
	} else if (selectedDiagramType === 'hs') {
		ctx2D.fillText('Diagrama H-S', cx - 50, 30);
		ctx2D.strokeStyle = '#8b5cf6';
		ctx2D.lineWidth = 3;
		ctx2D.beginPath();
		for (let i = 0; i < 100; i++) {
			const x = 50 + (i / 100) * (canvas2D.width - 100);
			const y = cy + 100 - Math.sqrt(i * 8) * 20;
			if (i === 0) ctx2D.moveTo(x, y);
			else ctx2D.lineTo(x, y);
		}
		ctx2D.stroke();
	} else {
		ctx2D.fillText('Diagrama P-T', cx - 50, 30);
		drawPhaseDiagram();
	}
}

// ==================== ANIMAÇÃO ====================
function animate() {
	animationId = requestAnimationFrame(animate);
	const now = Date.now();
	fps = Math.round(1000 / (now - lastTime));
	lastTime = now;
	const fpsEl = document.getElementById('canvasFPS');
	if (fpsEl) fpsEl.textContent = fps;
	if (currentTab === '3d' && renderer && scene && camera) {
		objects3D.forEach(obj => {
			if (obj.rotation) {
				obj.rotation.x += 0.005;
				obj.rotation.y += 0.01;
			}
		});
		renderer.render(scene, camera);
	} else if (currentTab === 'grafico') {
		draw2DGraph();
	}
}

// ==================== CONTROLES ====================
function toggleSimulation() {
	isSimulating = !isSimulating;
	const btn = document.getElementById('playBtn');
	const status = document.getElementById('canvasStatus');
	if (isSimulating) {
		btn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
		if (status) status.textContent = 'Simulando';
		addFeedback('Simulação iniciada', 'info');
	} else {
		btn.innerHTML = '<i class="fas fa-play"></i> Iniciar';
		if (status) status.textContent = 'Pausado';
		addFeedback('Simulação pausada', 'warning');
	}
}

function resetSimulation() {
	isSimulating = false;
	document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i> Iniciar';
	clear3DScene();
	if (currentTab === '3d') create3DScene(currentModule);
	addFeedback('Sistema reiniciado', 'info');
}

function exportCanvas() {
	const canvas = currentTab === '3d' ? canvas3D : canvas2D;
	if (!canvas) return;
	const url = canvas.toDataURL('image/png');
	const a = document.createElement('a');
	a.href = url;
	a.download = 'termo_' + currentModule + '_' + Date.now() + '.png';
	a.click();
	addFeedback('Imagem exportada', 'info');
}

function exportData(module) {
	const data = { module: module, timestamp: new Date().toISOString() };
	const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'termo_' + module + '_' + Date.now() + '.json';
	a.click();
	URL.revokeObjectURL(url);
	addFeedback('Dados exportados', 'info');
}

// ==================== BUSCA E SLIDERS ====================
function setupSearch() {
	const input = document.getElementById('searchInput');
	if (input) {
		input.addEventListener('input', function() {
			const q = this.value.toLowerCase();
			document.querySelectorAll('.module-item[data-module]').forEach(item => {
				const name = item.querySelector('.module-name').textContent.toLowerCase();
				item.style.display = name.includes(q) ? 'flex' : 'none';
			});
		});
	}
}

function setupAllSliders() {
	const sliders = [
		['calorQ', 'calorQValue', ' J'], ['trabalhoW', 'trabalhoWValue', ' J'],
		['tempLeis', 'tempLeisValue', ' K'], ['pressaoLeis', 'pressaoLeisValue', ' atm'],
		['volumeLeis', 'volumeLeisValue', ' m³'], ['tempQuente', 'tempQuenteValue', ' K'],
		['tempFria', 'tempFriaValue', ' K'], ['razaoComp', 'razaoCompValue', ':1'],
		['tempQuenteTransf', 'tempQuenteTransfValue', '°C'], ['tempFriaTransf', 'tempFriaTransfValue', '°C'],
		['comprimento', 'comprimentoValue', ' m'], ['pressaoGas', 'pressaoGasValue', ' kPa'],
		['volumeGas', 'volumeGasValue', ' m³'], ['tempGas', 'tempGasValue', ' K'],
		['tempFase', 'tempFaseValue', '°C'], ['pressaoFase', 'pressaoFaseValue', ' atm'],
		['calorAdd', 'calorAddValue', ' kJ'], ['escalaX', 'escalaXValue', ''],
		['escalaY', 'escalaYValue', '']
	];
	sliders.forEach(([id, valueId, suffix]) => {
		const slider = document.getElementById(id);
		const valueEl = document.getElementById(valueId);
		if (slider && valueEl) {
			slider.addEventListener('input', function() {
				valueEl.textContent = this.value + suffix;
			});
		}
	});
	['tempQuente', 'tempFria'].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.addEventListener('input', updateEfficiency);
	});
	['calorQ', 'trabalhoW'].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.addEventListener('input', updateDeltaU);
	});
}

function updateEfficiency() {
	const tqEl = document.getElementById('tempQuente');
	const tfEl = document.getElementById('tempFria');
	if (!tqEl || !tfEl) return;
	const tq = parseFloat(tqEl.value);
	const tf = parseFloat(tfEl.value);
	const eff = ((1 - tf/tq) * 100).toFixed(1);
	const formula = document.getElementById('eficienciaFormula');
	const efVal = document.getElementById('eficiencia');
	if (formula) formula.textContent = 'η = 1 - T₂/T₁ = ' + eff + '%';
	if (efVal) efVal.textContent = eff + '%';
}

function updateDeltaU() {
	const qEl = document.getElementById('calorQ');
	const wEl = document.getElementById('trabalhoW');
	if (!qEl || !wEl) return;
	const q = parseFloat(qEl.value);
	const w = parseFloat(wEl.value);
	const du = q - w;
	const formula = document.getElementById('deltaU');
	const energy = document.getElementById('energiaInterna');
	if (formula) formula.textContent = 'ΔU = Q - W = ' + du.toFixed(0) + ' J';
	if (energy) energy.textContent = du.toFixed(0) + ' J';
}

function addFeedback(message, type) {
	const log = document.getElementById('feedbackLog');
	if (!log) return;
	const line = document.createElement('div');
	line.className = 'feedback-line ' + (type || 'info');
	const time = new Date().toLocaleTimeString();
	line.textContent = '[' + time + '] ' + message;
	log.appendChild(line);
	log.scrollTop = log.scrollHeight;
	while (log.children.length > 15) {
		log.removeChild(log.firstChild);
	}
}

// ==================== FUNÇÕES DOS MÓDULOS ====================
function showLaw(n) { const laws = ['Lei Zero: Equilíbrio térmico', 'Primeira Lei: ΔU = Q - W', 'Segunda Lei: Entropia aumenta', 'Terceira Lei: Zero absoluto']; const desc = document.getElementById('lawDescription'); if (desc) desc.textContent = laws[n]; addFeedback('Lei ' + n, 'info'); }
function selectProcess(type) { 
	addFeedback('Processo ' + type, 'info'); 
	if (currentTab === 'grafico') draw2DGraph(); 
}
function simulateProcess() { if (!isSimulating) toggleSimulation(); }
function resetLeis() { addFeedback('Resetado', 'info'); }
function selectMachine(type) { selectedMachineType = type.toLowerCase(); addFeedback('Máquina ' + type, 'info'); if (currentTab === 'grafico') draw2DGraph(); }
function startMachine() { if (!isSimulating) toggleSimulation(); }
function stopMachine() { if (isSimulating) toggleSimulation(); }
function selectMechanism(type) { 
	selectedMechanism = type.toLowerCase(); 
	addFeedback('Mecanismo: ' + type, 'info'); 
	if (currentTab === 'grafico') draw2DGraph(); 
}
function selectMaterial(type) { 
	selectedMaterial = type.toLowerCase(); 
	addFeedback('Material: ' + type, 'info'); 
	if (currentTab === 'grafico') draw2DGraph(); 
}
function startTransfer() { if (!isSimulating) toggleSimulation(); }
function resetTransfer() { addFeedback('Resetado', 'info'); }
function selectGasLaw(type) { 
	selectedGasLaw = type.toLowerCase(); 
	addFeedback('Lei: ' + type, 'info'); 
	if (currentTab === 'grafico') draw2DGraph(); 
}
function simulateGas() { if (!isSimulating) toggleSimulation(); }
function resetGas() { addFeedback('Resetado', 'info'); }
function selectSubstance(type) { 
	selectedSubstance = type.toLowerCase(); 
	addFeedback('Substância: ' + type, 'info'); 
	if (currentTab === 'grafico') draw2DGraph(); 
}
function triggerTransition(type) { 
	selectedTransition = type.toLowerCase(); 
	addFeedback('Transição: ' + type, 'info'); 
	if (currentTab === 'grafico') draw2DGraph(); 
}
function simulatePhaseChange() { if (!isSimulating) toggleSimulation(); }
function resetPhase() { addFeedback('Resetado', 'info'); }
function selectDiagram(type) { selectedDiagramType = type.toLowerCase(); addFeedback('Diagrama ' + type, 'info'); if (currentTab === 'grafico') draw2DGraph(); }
function plotCycle(type) { 
	selectedCycle = type.toLowerCase(); 
	addFeedback('Ciclo: ' + type, 'info'); 
	if (currentTab === 'grafico') draw2DGraph(); 
}
function plotDiagram() { if (!isSimulating) toggleSimulation(); }
function clearDiagram() { if (isSimulating) toggleSimulation(); }

// ====== VOLTAR ======
document.getElementById('toGoBackBtn').addEventListener('click', function() {
    window.location.href = "../../index.html";
});