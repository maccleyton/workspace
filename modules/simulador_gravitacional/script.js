/* --- CONSTANTES E ESTADO --- */
const G_BASE = 1; let G_SCALE = 1.0;
let TIME_SCALE = 1.0; const DT = 0.016;
let simulationRunning = false, currentScenario = null;
let scene, camera, renderer, controls, celestialBodies = [];
let energyChart = null, energyData = { t:[], e:[] }, simTime = 0;

/* --- CENÁRIOS DISPONÍVEIS --- */
const SCENARIOS = [
	{ id: 'solar_system', name: 'Sistema Planetário', type: 'Sistema', desc: 'Sistema estelar com múltiplos planetas em órbita.', builder: createSolarSystemScenario },
	{ id: 'binary_stars', name: 'Estrelas Binárias', type: 'Interação Estelar', desc: 'Duas estrelas orbitando um centro de massa comum.', builder: createBinaryStarsScenario },
	{ id: 'blackhole', name: 'Atração de Buraco Negro', type: 'Gravitação Extrema', desc: 'Corpos em órbitas instáveis ao redor de um buraco negro.', builder: createBlackHoleScenario },
	{ id: 'collision', name: 'Colisão Planetária', type: 'Colisão', desc: 'Dois planetas em rota de colisão frontal.', builder: createCollisionScenario },
	{ id: 'complex_orbits', name: 'Órbitas Complexas', type: 'N-corpos', desc: 'Vários planetas com inclinações orbitais variadas.', builder: createComplexOrbitsScenario },
	{ id: 'sandbox', name: 'Sandbox (Livre)', type: 'Sandbox', desc: 'Cenário vazio para criar seus próprios sistemas.', builder: createSandboxScenario }
];

/* --- CLASSE DE CORPO CELESTE --- */
class CelestialBody {
	constructor(name, mass, radius, position, velocity, color, fixed=false) {
		this.name=name; this.mass=mass; this.radius=radius;
		this.position=position.clone(); this.velocity=velocity.clone();
		this.acc=new THREE.Vector3(); this.fixed=fixed;
		const geo = new THREE.SphereGeometry(radius, 24, 24);
		const mat = new THREE.MeshStandardMaterial({ color, roughness:0.6, metalness:0.1 });
		this.mesh = new THREE.Mesh(geo, mat);
		this.mesh.position.copy(this.position);
		scene.add(this.mesh);
		const trailGeo = new THREE.BufferGeometry();
		const trailPoints = new Float32Array(300 * 3);
		trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPoints, 3));
		this.trail = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({color, transparent:true, opacity:0.5}));
		this.trail.userData.index = 0;
		scene.add(this.trail);
	}
	updateTrail() {
		const attr = this.trail.geometry.getAttribute('position'); let idx = this.trail.userData.index;
		attr.array[idx++] = this.position.x; attr.array[idx++] = this.position.y; attr.array[idx++] = this.position.z;
		if (idx >= attr.array.length) idx = 0;
		this.trail.userData.index = idx; attr.needsUpdate = true;
	}
}

/* --- SETUP --- */
window.onload = () => {
	initEngines();
	buildScenarioList();
	animate();
	window.addEventListener('resize', onResize);
};

function initEngines() {
	const container = document.getElementById('cnv-sim');
	scene = new THREE.Scene(); scene.background = new THREE.Color(0x000000);
	camera = new THREE.PerspectiveCamera(50, container.clientWidth/container.clientHeight, 0.1, 2000);
	camera.position.set(0, 40, 80);
	renderer = new THREE.WebGLRenderer({ antialias:true });
	renderer.setSize(container.clientWidth, container.clientHeight);
	container.appendChild(renderer.domElement);
	controls = new THREE.OrbitControls(camera, renderer.domElement); controls.enableDamping=true;
	scene.add(new THREE.AmbientLight(0x404040), new THREE.DirectionalLight(0xffffff, 1.2));
	const starsGeo = new THREE.BufferGeometry(), starCount = 2000, starPos = new Float32Array(starCount * 3);
	for (let i = 0; i < starCount * 3; i+=3) { starPos[i] = (Math.random()-0.5)*800; starPos[i+1] = (Math.random()-0.5)*800; starPos[i+2] = (Math.random()-0.5)*800; }
	starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
	scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({color:0xffffff, size:0.6})));
	const ctx = document.getElementById('energy-chart').getContext('2d');
	energyChart = new Chart(ctx, { type:'line', data:{labels:energyData.t, datasets:[{label:'Energia Total (unid. arb.)', data:energyData.e, borderColor:'#10b981', borderWidth:1, pointRadius:0}]}, options:{animation:false, responsive:true, maintainAspectRatio:false, scales:{x:{display:false}, y:{ticks:{color:'#9ca3af'}}}, plugins:{legend:{labels:{color:'#e5e7eb', font:{size:10}}}}}});
}

/* --- INTERFACE --- */
function buildScenarioList() {
	const list = document.getElementById('scenario-list');
	SCENARIOS.forEach(sc => {
		const el = document.createElement('div');
		el.className = 'nav-item';
		el.innerHTML = `<i class="fas fa-circle" style="font-size:6px; color:var(--accent);"></i><div><div style="font-size:11px; font-weight:600;">${sc.name}</div><div style="font-size:9px; color:var(--text-tertiary);">${sc.type}</div></div>`;
		el.onclick = () => selectScenario(sc, el);
		list.appendChild(el);
	});
	const first = list.querySelector('.nav-item'); if(first) first.click();
}

function selectScenario(sc, el) {
	currentScenario = sc;
	document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
	el.classList.add('active');
	document.getElementById('sc-name').innerText = sc.name;
	document.getElementById('sc-type').innerText = sc.type;
	document.getElementById('sc-desc').innerText = sc.desc;
	resetSimulation(); sc.builder(); updateInfoPanel();
}

function updateInfoPanel() {
	document.getElementById('info-count').innerText = celestialBodies.length;
	document.getElementById('info-state').innerText = simulationRunning ? 'Rodando' : 'Pausada';
}
function setGravityScale(v) { G_SCALE = parseFloat(v); document.getElementById('lbl-g').innerText = `${G_SCALE.toFixed(1)}x`; }
function setTimeScale(v) { TIME_SCALE = parseFloat(v); document.getElementById('lbl-time').innerText = `${TIME_SCALE.toFixed(1)}x`; }
function toggleSimulation() { simulationRunning = !simulationRunning; document.getElementById('btn-play').innerText = simulationRunning ? 'Pausar' : 'Iniciar'; updateInfoPanel(); }
function resetCurrentScenario() { if (currentScenario) { resetSimulation(); currentScenario.builder(); updateInfoPanel(); } }
function clearAllBodies() { resetSimulation(); updateInfoPanel(); }

function setView(mode) {
	if(mode === 'sim') { document.getElementById('cnv-sim').classList.add('active'); document.getElementById('cnv-chart').classList.remove('active'); document.getElementById('tab-sim').classList.add('active'); document.getElementById('tab-chart').classList.remove('active'); }
	else { document.getElementById('cnv-sim').classList.remove('active'); document.getElementById('cnv-chart').classList.add('active'); document.getElementById('tab-sim').classList.remove('active'); document.getElementById('tab-chart').classList.add('active'); }
}

/* --- SIMULAÇÃO --- */
function resetSimulation() {
	celestialBodies.forEach(b => { scene.remove(b.mesh); scene.remove(b.trail); });
	celestialBodies = []; simTime=0; energyData.t.length=0; energyData.e.length=0; energyChart.update();
}

function addRandomPlanet() {
	if (!scene) return;
	const dist=20+Math.random()*40, angle=Math.random()*Math.PI*2;
	const pos = new THREE.Vector3(Math.cos(angle)*dist, (Math.random()-0.5)*4, Math.sin(angle)*dist);
	const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize();
	const vel = tangent.multiplyScalar(8 + Math.random()*4);
	celestialBodies.push(new CelestialBody(`Planeta ${celestialBodies.length+1}`, 5.97e24, 1.2, pos, vel, new THREE.Color(Math.random(),Math.random(),Math.random())));
	updateInfoPanel();
}

/* --- FÁBRICA DE CENÁRIOS --- */
function createSolarSystemScenario() {
	celestialBodies.push(new CelestialBody('Sol', 1.989e30, 4, new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0), 0xFBBF24, true));
	[{n:'Mercúrio',d:10,r:0.8,c:0x8c7853,s:11},{n:'Vênus',d:14,r:1.0,c:0xe89b3c,s:9},{n:'Terra',d:18,r:1.1,c:0x3B82F6,s:8},{n:'Marte',d:22,r:0.9,c:0xff4422,s:7}].forEach(p => {
		const angle=Math.random()*Math.PI*2, pos=new THREE.Vector3(Math.cos(angle)*p.d,0,Math.sin(angle)*p.d);
		const tangent=new THREE.Vector3(-Math.sin(angle),0,Math.cos(angle)).normalize();
		celestialBodies.push(new CelestialBody(p.n, 5.97e24, p.r, pos, tangent.multiplyScalar(p.s), p.c));
	});
	simulationRunning = true;
}
function createBinaryStarsScenario() {
	celestialBodies.push(new CelestialBody('Estrela A', 1.2e30, 3, new THREE.Vector3(-10,0,0), new THREE.Vector3(0,0,6), 0xffdd55));
	celestialBodies.push(new CelestialBody('Estrela B', 1.2e30, 3, new THREE.Vector3(10,0,0), new THREE.Vector3(0,0,-6), 0xff8800));
	simulationRunning = true;
}
function createBlackHoleScenario() {
	celestialBodies.push(new CelestialBody('Buraco Negro', 5e31, 3.5, new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0), 0x000000, true));
	for(let i=0; i<20; i++) {
		const dist=15+Math.random()*25, angle=Math.random()*Math.PI*2, pos=new THREE.Vector3(Math.cos(angle)*dist, (Math.random()-0.5)*2, Math.sin(angle)*dist);
		const tangent=new THREE.Vector3(-Math.sin(angle),0,Math.cos(angle)).normalize();
		celestialBodies.push(new CelestialBody(`Corpo ${i+1}`, 5.97e24, 0.8, pos, tangent.multiplyScalar(14+Math.random()*6), 0x8888ff));
	}
	simulationRunning = true;
}
function createCollisionScenario() {
	celestialBodies.push(new CelestialBody('Planeta A', 5.97e24, 1.5, new THREE.Vector3(-20,0,0), new THREE.Vector3(5,0,0), 0x3B82F6));
	celestialBodies.push(new CelestialBody('Planeta B', 4.87e24, 1.3, new THREE.Vector3(20,0,0), new THREE.Vector3(-5,0,0), 0xDC2626));
	simulationRunning = true;
}
function createComplexOrbitsScenario() {
	celestialBodies.push(new CelestialBody('Sol', 1.989e30, 5, new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0), 0xFBBF24, true));
	for(let i=0; i<8; i++) {
		const dist=15+i*8, angle=(i/8)*Math.PI*2, inclination=(Math.random()-0.5)*0.5;
		const pos=new THREE.Vector3(Math.cos(angle)*dist, Math.sin(angle)*inclination*dist, Math.sin(angle)*dist);
		const tangent=new THREE.Vector3(-Math.sin(angle), inclination, Math.cos(angle)).normalize();
		celestialBodies.push(new CelestialBody(`Planeta ${i+1}`, 5.97e24*(0.5+Math.random()), 1+Math.random(), pos, tangent.multiplyScalar((20+Math.random()*10)*0.1), new THREE.Color(Math.random(),Math.random(),Math.random())));
	}
	simulationRunning = true;
}
function createSandboxScenario() {
	resetSimulation();
	addRandomPlanet();
}

/* --- MOTOR GRAVITACIONAL E LOOP PRINCIPAL (100% migrado) --- */
function animate() {
	requestAnimationFrame(animate);
	if(!simulationRunning) return;

	// Loop de simulação com física N-Body
	for(let i=0; i < (TIME_SCALE * 2); i++) { // Roda mais rápido para tempo acelerado
		// 1. Calcular Forças
		for(const bodyA of celestialBodies) {
			if(bodyA.fixed) continue;
			bodyA.acc.set(0,0,0);
			for(const bodyB of celestialBodies) {
				if (bodyA === bodyB) continue;
				const rVec = bodyB.position.clone().sub(bodyA.position);
				const distSq = rVec.lengthSq();
				if (distSq < (bodyA.radius + bodyB.radius)) continue; // Evita divisão por zero
				const forceDir = rVec.normalize();
				const forceMag = (G_BASE * G_SCALE * bodyA.mass * bodyB.mass) / distSq;
				const forceVec = forceDir.multiplyScalar(forceMag);
				bodyA.acc.add(forceVec.clone().divideScalar(bodyA.mass));
			}
		}
		// 2. Atualizar Posição
		for(const body of celestialBodies) {
			if(body.fixed) continue;
			body.velocity.add(body.acc.clone().multiplyScalar(DT * TIME_SCALE));
			body.position.add(body.velocity.clone().multiplyScalar(DT * TIME_SCALE));
			body.mesh.position.copy(body.position);
		}
	}
	
	// 3. Atualizar Trilhas e Gráfico
	simTime += DT;
	let totalEnergy = 0;
	celestialBodies.forEach((b, i) => {
		if(i % 3 === 0) b.updateTrail(); // Otimização
		totalEnergy += 0.5 * b.mass * b.velocity.lengthSq();
	});
	if(simTime % 1 < 0.1) { // Adiciona ponto ao gráfico a cada ~1s
		if(energyData.t.length > 50) { energyData.t.shift(); energyData.e.shift(); }
		energyData.t.push(simTime.toFixed(1));
		energyData.e.push(totalEnergy / 1e33);
		energyChart.update();
	}

	controls.update();
	renderer.render(scene, camera);
}

function onResize() {
	const c = renderer.domElement.parentElement;
	if(c.clientWidth) {
		camera.aspect = c.clientWidth/c.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(c.clientWidth, c.clientHeight);
	}
}

// ====== VOLTAR ======
document.getElementById('toGoBackBtn').addEventListener('click', function() {
    window.location.href = "../../index.html";
});