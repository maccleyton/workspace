/* --- BANCO DE DADOS EXPANDIDO (UPGRADE) --- */
const LIGHT_NUCLEI = [
	"Hidrogênio-1 (Prótio)", "Hidrogênio-2 (Deutério)", "Hidrogênio-3 (Trítio)",
	"Hélio-3", "Hélio-4", "Lítio-6", "Lítio-7", "Berílio-9", "Boro-10", "Boro-11",
	"Carbono-12", "Carbono-13", "Nitrogênio-14", "Nitrogênio-15", "Oxigênio-16"
];

const HEAVY_NUCLEI = [
	"Tório-232", "Urânio-233", "Urânio-234", "Urânio-235", "Urânio-236", "Urânio-238",
	"Netúnio-237", "Plutônio-238", "Plutônio-239", "Plutônio-240", "Plutônio-241", "Plutônio-242",
	"Amerício-241", "Amerício-243", "Cúrio-242", "Cúrio-244", "Berquélio-247", "Califórnio-252",
	"Einstênio-254", "Férmio-257", "Mendelévio-258", "Nobélio-259", "Laurêncio-262",
	"Rutherfórdio-267", "Dúbnio-268", "Seabórgio-271", "Bóhrio-272", "Hássio-270",
	"Meitnério-278", "Darmstádio-281", "Roentgênio-280", "Copernício-285",
	"Nihônio-284", "Fleróvio-289", "Moscóvio-288", "Livermório-293", "Tenesso-294", "Oganessônio-294",
	"Césio-137 (Produto)", "Estrôncio-90 (Produto)", "Iodo-131 (Produto)", "Xenônio-135 (Produto)",
	"Bário-141 (Produto)", "Criptônio-92 (Produto)", "Tecnécio-99 (Produto)", "Promécio-147 (Produto)"
];

/* --- ESTADO GLOBAL --- */
let activeModule = 'fusion';
let sims = { fusion:{}, fission:{}, collider:{}, antimatter:{} };

/* --- INICIALIZAÇÃO --- */
window.onload = () => {
	// Popula listas expandidas
	populateLists();

	// Inicia Three.js
	initFusion();
	initFission();
	initCollider();
	initAntimatter();
	
	animate();
	window.addEventListener('resize', onResize);
};

function populateLists() {
	// Fusão
	const fSel = document.getElementById('sel-fusion-react');
	LIGHT_NUCLEI.forEach(n => fSel.innerHTML += `<option>${n}</option>`);
	fSel.selectedIndex = 1; // Deutério

	// Fissão
	const fisSel = document.getElementById('sel-fission-fuel');
	HEAVY_NUCLEI.forEach(n => fisSel.innerHTML += `<option>${n}</option>`);
	fisSel.selectedIndex = 3; // U-235
}

function setModule(modId) {
	activeModule = modId;
	
	// UI Navigation
	document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
	event.currentTarget.classList.add('active');
	
	// UI Controls
	document.querySelectorAll('.module-ctrl').forEach(el => el.classList.remove('active'));
	document.getElementById('ctrl-'+modId).classList.add('active');
	
	// Canvas Switching
	document.querySelectorAll('.sim-canvas').forEach(el => el.classList.remove('active'));
	document.getElementById('canvas-'+modId).classList.add('active');
	
	updateOverlay(modId);
	onResize();
}

function updateOverlay(mod) {
	const eq = document.getElementById('sim-equation');
	const st = document.getElementById('sim-status');
	
	if(mod === 'fusion') {
		eq.innerText = "D + T → He⁴ + n + 17.6 MeV";
		st.innerText = "Câmara de Confinamento Magnético";
	} else if(mod === 'fission') {
		eq.innerText = "A(Z,N) + n → B + C + 3n + Energia";
		st.innerText = "Núcleo do Reator";
	} else if(mod === 'collider') {
		eq.innerText = "E = mc²";
		st.innerText = "Ponto de Colisão";
	} else {
		eq.innerText = "Aniquilação";
		st.innerText = "Armadilha de Penning";
	}
}

/* --- MÓDULO 1: FUSÃO --- */
function initFusion() {
	const c = document.getElementById('canvas-fusion');
	const s = sims.fusion;
	s.scn = new THREE.Scene();
	s.scn.background = new THREE.Color(0x050010);
	s.cam = new THREE.PerspectiveCamera(45, c.clientWidth/c.clientHeight, 0.1, 100);
	s.cam.position.set(0,0,15);
	s.ren = new THREE.WebGLRenderer({antialias:true});
	s.ren.setSize(c.clientWidth, c.clientHeight);
	c.appendChild(s.ren.domElement);
	
	// Tokamak Ring
	const geo = new THREE.TorusGeometry(4, 1.5, 16, 50);
	const mat = new THREE.MeshBasicMaterial({ color: 0xff4400, wireframe: true, transparent:true, opacity:0.3 });
	s.tokamak = new THREE.Mesh(geo, mat);
	s.scn.add(s.tokamak);
	
	// Plasma Particles
	const pGeo = new THREE.BufferGeometry();
	const pCnt = 800;
	const pPos = new Float32Array(pCnt * 3);
	for(let i=0; i<pCnt*3; i++) pPos[i] = (Math.random()-0.5)*3;
	pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
	s.particles = new THREE.Points(pGeo, new THREE.PointsMaterial({color:0xffaa00, size:0.15}));
	s.scn.add(s.particles);
	
	s.active = false;
	s.temp = 15;
}

function updateFusionParam(type, val) {
	if(type === 'temp') {
		document.getElementById('val-fus-temp').innerText = val + " MK";
		sims.fusion.temp = val;
	}
}

/* --- MÓDULO 2: FISSÃO (COM VISUALIZAÇÃO DE DIVISÃO) --- */
function initFission() {
	const c = document.getElementById('canvas-fission');
	const s = sims.fission;
	s.scn = new THREE.Scene();
	s.scn.background = new THREE.Color(0x000510);
	s.cam = new THREE.PerspectiveCamera(45, c.clientWidth/c.clientHeight, 0.1, 100);
	s.cam.position.set(5,5,5);
	s.cam.lookAt(0,0,0);
	s.ren = new THREE.WebGLRenderer({antialias:true});
	s.ren.setSize(c.clientWidth, c.clientHeight);
	c.appendChild(s.ren.domElement);
	
	const l = new THREE.PointLight(0xffffff, 1);
	l.position.set(5,5,5);
	s.scn.add(l);
	s.scn.add(new THREE.AmbientLight(0x222222));
	
	// Setup Visual (Barras)
	s.rods = new THREE.Group();
	const rodGeo = new THREE.CylinderGeometry(0.15, 0.15, 4, 12);
	const rodMat = new THREE.MeshPhongMaterial({color: 0x00ff00});
	for(let i=-2; i<=2; i++) {
		for(let j=-2; j<=2; j++) {
			const rod = new THREE.Mesh(rodGeo, rodMat);
			rod.position.set(i, 0, j);
			s.rods.add(rod);
		}
	}
	s.scn.add(s.rods);
	
	s.rodLevel = 0.5;
	s.fragments = []; // Para os átomos divididos
}

function triggerFissionVisual() {
	const s = sims.fission;
	// Cria um núcleo "instável" no centro
	const nucGeo = new THREE.SphereGeometry(0.4, 16, 16);
	const nucMat = new THREE.MeshPhongMaterial({color: 0xffff00}); // Amarelo = Instável
	const nucleus = new THREE.Mesh(nucGeo, nucMat);
	nucleus.position.set((Math.random()-0.5)*2, 0, (Math.random()-0.5)*2);
	s.scn.add(nucleus);

	// Animação de divisão (Upgrade)
	let t = 0;
	const anim = setInterval(() => {
		t++;
		// 1. Vibração
		nucleus.scale.x = 1 + Math.sin(t)*0.3;
		nucleus.scale.y = 1 + Math.cos(t)*0.3;
		
		if(t > 20) {
			clearInterval(anim);
			s.scn.remove(nucleus);
			
			// 2. Divisão em 2 (Fissão)
			const f1 = new THREE.Mesh(new THREE.SphereGeometry(0.25), new THREE.MeshPhongMaterial({color:0xff00ff})); // Produto 1
			const f2 = new THREE.Mesh(new THREE.SphereGeometry(0.25), new THREE.MeshPhongMaterial({color:0x00ffff})); // Produto 2
			f1.position.copy(nucleus.position);
			f2.position.copy(nucleus.position);
			
			s.scn.add(f1); s.scn.add(f2);
			
			// Adiciona vetor de velocidade para a animação principal
			f1.userData = { vel: new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize().multiplyScalar(0.1) };
			f2.userData = { vel: new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize().multiplyScalar(0.1) };
			
			s.fragments.push(f1, f2);
			
			// Atualiza Métricas
			document.getElementById('met-fis-neu').innerText = (parseInt(document.getElementById('met-fis-neu').innerText) + 3) + "/s";
		}
	}, 16);
}

function updateFissionParam(type, val) {
	if(type === 'rod') {
		document.getElementById('val-fis-rod').innerText = val + "%";
		sims.fission.rodLevel = val/100;
		sims.fission.rods.position.y = (val/100) * -2; 
	}
}

/* --- MÓDULO 3: COLISOR --- */
function initCollider() {
	const c = document.getElementById('canvas-collider');
	const s = sims.collider;
	s.scn = new THREE.Scene();
	s.scn.background = new THREE.Color(0x000000);
	s.cam = new THREE.PerspectiveCamera(45, c.clientWidth/c.clientHeight, 0.1, 100);
	s.cam.position.set(0,0,20);
	s.ren = new THREE.WebGLRenderer({antialias:true});
	s.ren.setSize(c.clientWidth, c.clientHeight);
	c.appendChild(s.ren.domElement);
	
	// Detector Tunnel
	const tubeGeo = new THREE.CylinderGeometry(4, 4, 10, 32, 1, true);
	const tubeMat = new THREE.MeshBasicMaterial({color:0x333333, wireframe:true, side:THREE.DoubleSide});
	const tube = new THREE.Mesh(tubeGeo, tubeMat);
	tube.rotation.z = Math.PI/2;
	s.scn.add(tube);
	
	s.beam1 = new THREE.Mesh(new THREE.SphereGeometry(0.2), new THREE.MeshBasicMaterial({color:0x00ffff}));
	s.beam2 = new THREE.Mesh(new THREE.SphereGeometry(0.2), new THREE.MeshBasicMaterial({color:0xff00ff}));
	s.scn.add(s.beam1); s.scn.add(s.beam2);
	
	s.active = false;
}

/* --- MÓDULO 4: ANTIMATÉRIA --- */
function initAntimatter() {
	const c = document.getElementById('canvas-antimatter');
	const s = sims.antimatter;
	s.scn = new THREE.Scene();
	s.scn.background = new THREE.Color(0x110011);
	s.cam = new THREE.PerspectiveCamera(45, c.clientWidth/c.clientHeight, 0.1, 100);
	s.cam.position.set(0,5,10);
	s.cam.lookAt(0,0,0);
	s.ren = new THREE.WebGLRenderer({antialias:true});
	s.ren.setSize(c.clientWidth, c.clientHeight);
	c.appendChild(s.ren.domElement);
	
	const trapGeo = new THREE.IcosahedronGeometry(2, 1);
	const trapMat = new THREE.MeshBasicMaterial({color:0x8800ff, wireframe:true});
	s.trap = new THREE.Mesh(trapGeo, trapMat);
	s.scn.add(s.trap);
	
	s.particles = [];
}

function createAntimatter() {
	const s = sims.antimatter;
	const p = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshBasicMaterial({color:0xff0000}));
	p.position.set((Math.random()-0.5), (Math.random()-0.5), (Math.random()-0.5));
	s.scn.add(p);
	s.particles.push(p);
	document.getElementById('met-ant-count').innerText = s.particles.length;
}

function annihilate() {
	const s = sims.antimatter;
	s.particles.forEach(p => s.scn.remove(p));
	s.particles = [];
	document.getElementById('met-ant-count').innerText = "0";
	s.scn.background = new THREE.Color(0xffffff);
	setTimeout(() => s.scn.background = new THREE.Color(0x110011), 100);
}

/* --- LOOP PRINCIPAL --- */
function animate() {
	requestAnimationFrame(animate);
	const time = Date.now() * 0.001;
	
	// Fusão
	if(sims.fusion.active) {
		sims.fusion.tokamak.rotation.z += 0.01;
		sims.fusion.particles.rotation.y += 0.02 * (sims.fusion.temp/10);
		document.getElementById('met-fus-eng').innerText = Math.floor(Math.random()*10 + sims.fusion.temp) + " MeV";
	}
	sims.fusion.ren.render(sims.fusion.scn, sims.fusion.cam);
	
	// Fissão (Barras + Fragmentos)
	if(sims.fission.rods) {
		sims.fission.rods.children.forEach(r => {
			r.material.emissive.setHex(0x00ff00);
			r.material.emissiveIntensity = Math.sin(time*5)*(1-sims.fission.rodLevel);
		});
	}
	if(sims.fission.fragments) {
		sims.fission.fragments.forEach(f => {
			f.position.add(f.userData.vel);
			// Remove se sair de longe
			if(f.position.length() > 10) {
				sims.fission.scn.remove(f);
			}
		});
	}
	sims.fission.ren.render(sims.fission.scn, sims.fission.cam);
	
	// Colisor
	if(sims.collider.active) {
		sims.collider.beam1.position.x = Math.sin(time*10) * 5;
		sims.collider.beam2.position.x = Math.sin(time*10 + Math.PI) * 5;
		if(Math.abs(sims.collider.beam1.position.x) < 0.5) {
			document.getElementById('met-col-evt').innerText = parseInt(document.getElementById('met-col-evt').innerText) + 1;
		}
	}
	sims.collider.ren.render(sims.collider.scn, sims.collider.cam);
	
	// Antimatéria
	sims.antimatter.trap.rotation.y += 0.01;
	sims.antimatter.particles.forEach(p => {
		p.position.y += Math.sin(time*5 + p.id)*0.01;
	});
	sims.antimatter.ren.render(sims.antimatter.scn, sims.antimatter.cam);
}

function toggleSim(mod) {
	sims[mod].active = !sims[mod].active;
}

function onResize() {
	Object.values(sims).forEach(s => {
		if(s.cam && s.ren) {
			const w = document.querySelector('.canvas-wrapper').clientWidth;
			const h = document.querySelector('.canvas-wrapper').clientHeight;
			s.cam.aspect = w/h;
			s.cam.updateProjectionMatrix();
			s.ren.setSize(w, h);
		}
	});
}

// ====== VOLTAR ======
document.getElementById('toGoBackBtn').addEventListener('click', function() {
    window.location.href = "../../index.html";
});