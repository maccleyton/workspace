/* --- DADOS (TODAS AS MOLÉCULAS SOLICITADAS) --- */
const MOLECULES = [
	// Solicitadas explicitamente
	{ id: 'h2o', name: 'Água', formula: 'H₂O', mass: '18.01 u', type: 'Inorgânico', geo: 'Angular', state: 'Líquido', atoms: [{e:'O',x:0,y:0,z:0}, {e:'H',x:0.8,y:0.6,z:0}, {e:'H',x:-0.8,y:0.6,z:0}], bonds: [[0,1],[0,2]] },
	{ id: 'co2', name: 'Dióxido de Carbono', formula: 'CO₂', mass: '44.01 u', type: 'Inorgânico', geo: 'Linear', state: 'Gasoso', atoms: [{e:'C',x:0,y:0,z:0}, {e:'O',x:1.2,y:0,z:0}, {e:'O',x:-1.2,y:0,z:0}], bonds: [[0,1],[0,2]] },
	{ id: 'ch4', name: 'Metano', formula: 'CH₄', mass: '16.04 u', type: 'Alcano', geo: 'Tetraédrica', state: 'Gasoso', atoms: [{e:'C',x:0,y:0,z:0}, {e:'H',x:0.6,y:0.6,z:0.6}, {e:'H',x:-0.6,y:-0.6,z:0.6}, {e:'H',x:-0.6,y:0.6,z:-0.6}, {e:'H',x:0.6,y:-0.6,z:-0.6}], bonds: [[0,1],[0,2],[0,3],[0,4]] },
	{ id: 'etano', name: 'Etano', formula: 'C₂H₆', mass: '30.07 u', type: 'Alcano', geo: 'Tetraédrica', state: 'Gasoso', atoms: [{e:'C',x:-0.7,y:0,z:0}, {e:'C',x:0.7,y:0,z:0}, {e:'H',x:-1.1,y:0.9,z:0}, {e:'H',x:-1.1,y:-0.5,z:0.8}, {e:'H',x:-1.1,y:-0.5,z:-0.8}, {e:'H',x:1.1,y:0.9,z:0}, {e:'H',x:1.1,y:-0.5,z:0.8}, {e:'H',x:1.1,y:-0.5,z:-0.8}], bonds: [[0,1],[0,2],[0,3],[0,4],[1,5],[1,6],[1,7]] },
	{ id: 'eteno', name: 'Eteno', formula: 'C₂H₄', mass: '28.05 u', type: 'Alceno', geo: 'Trigonal', state: 'Gasoso', atoms: [{e:'C',x:-0.6,y:0,z:0}, {e:'C',x:0.6,y:0,z:0}, {e:'H',x:-1.2,y:0.9,z:0}, {e:'H',x:-1.2,y:-0.9,z:0}, {e:'H',x:1.2,y:0.9,z:0}, {e:'H',x:1.2,y:-0.9,z:0}], bonds: [[0,1],[0,2],[0,3],[1,4],[1,5]] },
	{ id: 'etino', name: 'Etino', formula: 'C₂H₂', mass: '26.04 u', type: 'Alcino', geo: 'Linear', state: 'Gasoso', atoms: [{e:'C',x:-0.6,y:0,z:0}, {e:'C',x:0.6,y:0,z:0}, {e:'H',x:-1.6,y:0,z:0}, {e:'H',x:1.6,y:0,z:0}], bonds: [[0,1],[0,2],[1,3]] },
	{ id: 'etanol', name: 'Etanol', formula: 'C₂H₅OH', mass: '46.07 u', type: 'Álcool', geo: '-', state: 'Líquido', atoms: [{e:'C',x:-0.8,y:0,z:0}, {e:'C',x:0.6,y:0,z:0}, {e:'O',x:1.4,y:0.8,z:0}, {e:'H',x:2,y:0.5,z:0}, {e:'H',x:-1.2,y:0.9,z:0}, {e:'H',x:-1.2,y:-0.5,z:0.8}, {e:'H',x:-1.2,y:-0.5,z:-0.8}, {e:'H',x:0.6,y:-0.9,z:0}, {e:'H',x:0.6,y:0.5,z:0.9}], bonds: [[0,1],[1,2],[2,3],[0,4],[0,5],[0,6],[1,7],[1,8]] },
	{ id: 'acetona', name: 'Acetona', formula: 'C₃H₆O', mass: '58.08 u', type: 'Cetona', geo: 'Trigonal', state: 'Líquido', atoms: [{e:'C',x:0,y:0,z:0}, {e:'O',x:0,y:1.2,z:0}, {e:'C',x:-1.2,y:-0.7,z:0}, {e:'C',x:1.2,y:-0.7,z:0}, {e:'H',x:-1.2,y:-1.5,z:0.5}, {e:'H',x:-2,y:-0.2,z:0}, {e:'H',x:-1,y:-1.2,z:-0.8}, {e:'H',x:1.2,y:-1.5,z:0.5}, {e:'H',x:2,y:-0.2,z:0}, {e:'H',x:1,y:-1.2,z:-0.8}], bonds: [[0,1],[0,2],[0,3],[2,4],[2,5],[2,6],[3,7],[3,8],[3,9]] },
	{ id: 'acid_acetico', name: 'Ácido Acético', formula: 'CH₃COOH', mass: '60.05 u', type: 'Ác. Carboxílico', geo: '-', state: 'Líquido', atoms: [{e:'C',x:-0.7,y:0,z:0}, {e:'C',x:0.7,y:0,z:0}, {e:'O',x:1.2,y:1.0,z:0}, {e:'O',x:1.4,y:-1.0,z:0}, {e:'H',x:2.1,y:-0.7,z:0}, {e:'H',x:-1.2,y:0.9,z:0}, {e:'H',x:-1.2,y:-0.5,z:0.8}, {e:'H',x:-1.2,y:-0.5,z:-0.8}], bonds: [[0,1],[1,2],[1,3],[3,4],[0,5],[0,6],[0,7]] },
	{ id: 'benzeno', name: 'Benzeno', formula: 'C₆H₆', mass: '78.11 u', type: 'Aromático', geo: 'Plana', state: 'Líquido', atoms: [{e:'C',x:1.4,y:0,z:0}, {e:'C',x:0.7,y:1.2,z:0}, {e:'C',x:-0.7,y:1.2,z:0}, {e:'C',x:-1.4,y:0,z:0}, {e:'C',x:-0.7,y:-1.2,z:0}, {e:'C',x:0.7,y:-1.2,z:0}], bonds: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]] }, // Simplificado sem H
	{ id: 'nh3', name: 'Amoníaco', formula: 'NH₃', mass: '17.03 u', type: 'Inorgânico', geo: 'Piramidal', state: 'Gasoso', atoms: [{e:'N',x:0,y:0,z:0}, {e:'H',x:0,y:-0.9,z:0.4}, {e:'H',x:0.8,y:0.3,z:0.4}, {e:'H',x:-0.8,y:0.3,z:0.4}], bonds: [[0,1],[0,2],[0,3]] },
	{ id: 'glicose', name: 'Glicose', formula: 'C₆H₁₂O₆', mass: '180.16 u', type: 'Carboidrato', geo: 'Anel', state: 'Sólido', atoms: [{e:'O',x:1,y:0,z:-0.5}, {e:'C',x:0,y:0,z:1}, {e:'C',x:-1.5,y:0,z:0.5}, {e:'C',x:-1.5,y:0,z:-1}, {e:'C',x:0,y:0,z:-1.5}, {e:'C',x:1.5,y:0,z:-1}], bonds: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]] } // Representação Anel Simplificado
];

const REACTION_DATA = [
	{ eq: 'CH₄ + 2O₂ → CO₂ + 2H₂O', desc: 'Combustão: Liberação de energia.' },
	{ eq: 'C₂H₄ + H₂ → C₂H₆', desc: 'Hidrogenação: Conversão alceno -> alcano.' },
	{ eq: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O', desc: 'Esterificação: Produção de acetato de etila.' }
];

/* --- ENGINE 3D --- */
let viewer = { scn:null, cam:null, ren:null, grp:new THREE.Group() };
let builder = { scn:null, cam:null, ren:null, list:[], tool:'C' };
let activeTab = 'viewer';

/* --- INICIALIZAÇÃO --- */
window.onload = () => {
	// Popula Lista
	const listEl = document.getElementById('molecule-list');
	MOLECULES.forEach(mol => {
		const div = document.createElement('div');
		div.className = 'nav-item';
		div.innerHTML = `<span>${mol.name}</span><span class="nav-formula">${mol.formula}</span>`;
		div.onclick = () => selectMolecule(mol, div);
		listEl.appendChild(div);
	});

	// Inicia Canvas
	initViewer();
	initBuilder();

	// Seleciona primeiro
	selectMolecule(MOLECULES[0], listEl.firstChild);
	
	window.addEventListener('resize', handleResize);
};

function selectMolecule(data, el) {
	// UI Highlights
	document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
	if(el) el.classList.add('active');

	// Info
	document.getElementById('det-name').innerText = data.name;
	document.getElementById('det-formula').innerText = data.formula;
	document.getElementById('det-mass').innerText = data.mass;
	document.getElementById('det-type').innerText = data.type;
	document.getElementById('det-geo').innerText = data.geo;
	document.getElementById('det-state').innerText = data.state;

	// 3D Render
	viewer.grp.clear();
	const cols = { 'H':0xffffff, 'C':0x333333, 'O':0xff0000, 'N':0x0000ff };
	const sph = new THREE.SphereGeometry(0.3, 16, 16);
	
	data.atoms.forEach(a => {
		const m = new THREE.Mesh(sph, new THREE.MeshPhongMaterial({color: cols[a.e]||0x888888}));
		m.position.set(a.x, a.y, a.z);
		viewer.grp.add(m);
	});

	if(data.bonds) {
		data.bonds.forEach(b => {
			if(data.atoms[b[0]] && data.atoms[b[1]]) {
				const p1 = new THREE.Vector3(data.atoms[b[0]].x, data.atoms[b[0]].y, data.atoms[b[0]].z);
				const p2 = new THREE.Vector3(data.atoms[b[1]].x, data.atoms[b[1]].y, data.atoms[b[1]].z);
				const dist = p1.distanceTo(p2);
				const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,dist,8), new THREE.MeshPhongMaterial({color:0x999999}));
				cyl.position.copy(p1.clone().add(p2).multiplyScalar(0.5));
				cyl.lookAt(p2);
				cyl.rotateX(Math.PI/2);
				viewer.grp.add(cyl);
			}
		});
	}
	
	setTab('viewer');
}

/* --- VISUALIZADOR 3D --- */
function initViewer() {
	const c = document.getElementById('canvas3d');
	if(!c) return;
	
	viewer.scn = new THREE.Scene();
	viewer.scn.background = new THREE.Color(0x050505);
	
	viewer.cam = new THREE.PerspectiveCamera(45, c.clientWidth/c.clientHeight, 0.1, 100);
	viewer.cam.position.set(0,0,5);
	
	viewer.ren = new THREE.WebGLRenderer({antialias:true});
	viewer.ren.setSize(c.clientWidth, c.clientHeight);
	c.appendChild(viewer.ren.domElement);
	
	const light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(2,2,5);
	viewer.scn.add(light);
	viewer.scn.add(new THREE.AmbientLight(0x555555));
	viewer.scn.add(viewer.grp);
	
	if(THREE.OrbitControls) new THREE.OrbitControls(viewer.cam, viewer.ren.domElement);
	
	animateViewer();
}

function animateViewer() {
	requestAnimationFrame(animateViewer);
	if(activeTab === 'viewer') {
		viewer.grp.rotation.y += 0.002;
		viewer.ren.render(viewer.scn, viewer.cam);
	}
}

/* --- CONSTRUTOR --- */
function initBuilder() {
	const c = document.getElementById('builder3d');
	if(!c) return;

	builder.scn = new THREE.Scene();
	builder.scn.background = new THREE.Color(0x111111);
	
	builder.cam = new THREE.PerspectiveCamera(45, c.clientWidth/c.clientHeight, 0.1, 100);
	builder.cam.position.set(0,5,5);
	builder.cam.lookAt(0,0,0);
	
	builder.ren = new THREE.WebGLRenderer({antialias:true});
	builder.ren.setSize(c.clientWidth, c.clientHeight);
	c.appendChild(builder.ren.domElement);
	
	builder.scn.add(new THREE.GridHelper(10,10, 0x333333, 0x222222));
	builder.scn.add(new THREE.AmbientLight(0xffffff));
	
	const plane = new THREE.Mesh(new THREE.PlaneGeometry(20,20), new THREE.MeshBasicMaterial({visible:false}));
	plane.rotation.x = -Math.PI/2;
	builder.scn.add(plane);
	builder.plane = plane;
	
	if(THREE.OrbitControls) new THREE.OrbitControls(builder.cam, builder.ren.domElement);
	
	builder.ren.domElement.addEventListener('click', onBuildClick);
	animateBuilder();
}

function animateBuilder() {
	requestAnimationFrame(animateBuilder);
	if(activeTab === 'builder') builder.ren.render(builder.scn, builder.cam);
}

function onBuildClick(e) {
	if(activeTab !== 'builder') return;
	const r = builder.ren.domElement.getBoundingClientRect();
	const m = new THREE.Vector2( ((e.clientX-r.left)/r.width)*2-1, -((e.clientY-r.top)/r.height)*2+1 );
	const ray = new THREE.Raycaster();
	ray.setFromCamera(m, builder.cam);
	
	if(builder.tool === 'eraser') {
		const ints = ray.intersectObjects(builder.list);
		if(ints.length) {
			builder.scn.remove(ints[0].object);
			builder.list = builder.list.filter(o => o !== ints[0].object);
		}
	} else {
		const ints = ray.intersectObject(builder.plane);
		if(ints.length) {
			const cols = {'C':0x333333,'H':0xffffff,'O':0xff0000};
			const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.3,16,16), new THREE.MeshPhongMaterial({color:cols[builder.tool]}));
			mesh.position.copy(ints[0].point).add(new THREE.Vector3(0,0.3,0));
			builder.scn.add(mesh);
			builder.list.push(mesh);
		}
	}
}

/* --- UI LOGIC --- */
function setTab(t) {
	activeTab = t;
	document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
	document.getElementById('btn-'+t).classList.add('active');
	
	document.getElementById('view-viewer').classList.remove('active');
	document.getElementById('view-builder').classList.remove('active');
	document.getElementById('view-'+t).classList.add('active');
	
	handleResize();
}

function toggleMod(id) {
	const el = document.getElementById('mod-'+id);
	el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

function calcName() {
	const p = document.getElementById('n-pref').value;
	const i = document.getElementById('n-inf').value;
	const s = document.getElementById('n-suf').value;
	document.getElementById('n-result').innerText = p + i + s;
}

function showReact(idx) {
	const d = document.getElementById('react-display');
	d.style.display = 'block';
	d.innerHTML = `<strong>${REACTION_DATA[idx].eq}</strong><br>${REACTION_DATA[idx].desc}`;
}

function loadFunc(id) {
	const mol = MOLECULES.find(m => m.id === id);
	if(mol) selectMolecule(mol);
}

function setTool(t, el) {
	builder.tool = t;
	document.querySelectorAll('.tool').forEach(e => e.classList.remove('active'));
	el.classList.add('active');
}

function clearBuild() {
	builder.list.forEach(o => builder.scn.remove(o));
	builder.list = [];
}

function handleResize() {
	if(viewer.cam && document.getElementById('canvas3d')) {
		const c = document.getElementById('canvas3d');
		viewer.cam.aspect = c.clientWidth/c.clientHeight;
		viewer.cam.updateProjectionMatrix();
		viewer.ren.setSize(c.clientWidth, c.clientHeight);
	}
	if(builder.cam && document.getElementById('builder3d')) {
		const c = document.getElementById('builder3d');
		builder.cam.aspect = c.clientWidth/c.clientHeight;
		builder.cam.updateProjectionMatrix();
		builder.ren.setSize(c.clientWidth, c.clientHeight);
	}
}

function resetCam() {
	if(viewer.cam) viewer.cam.position.set(0,0,5);
	if(builder.cam) builder.cam.position.set(0,5,5);
}

// ====== VOLTAR ======
document.getElementById('toGoBackBtn').addEventListener('click', function() {
    window.location.href = "../../index.html";
});