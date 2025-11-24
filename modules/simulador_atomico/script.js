// ================= DADOS COMPLETOS (118 ELEMENTOS) =================
const elementsDB = [
	{ s: 'H', n: 'Hidrogênio', p: 1, n0: 0, e: 1 }, { s: 'He', n: 'Hélio', p: 2, n0: 2, e: 2 },
	{ s: 'Li', n: 'Lítio', p: 3, n0: 4, e: 3 }, { s: 'Be', n: 'Berílio', p: 4, n0: 5, e: 4 },
	{ s: 'B', n: 'Boro', p: 5, n0: 6, e: 5 }, { s: 'C', n: 'Carbono', p: 6, n0: 6, e: 6 },
	{ s: 'N', n: 'Nitrogênio', p: 7, n0: 7, e: 7 }, { s: 'O', n: 'Oxigênio', p: 8, n0: 8, e: 8 },
	{ s: 'F', n: 'Flúor', p: 9, n0: 10, e: 9 }, { s: 'Ne', n: 'Neônio', p: 10, n0: 10, e: 10 },
	{ s: 'Na', n: 'Sódio', p: 11, n0: 12, e: 11 }, { s: 'Mg', n: 'Magnésio', p: 12, n0: 12, e: 12 },
	{ s: 'Al', n: 'Alumínio', p: 13, n0: 14, e: 13 }, { s: 'Si', n: 'Silício', p: 14, n0: 14, e: 14 },
	{ s: 'P', n: 'Fósforo', p: 15, n0: 16, e: 15 }, { s: 'S', n: 'Enxofre', p: 16, n0: 16, e: 16 },
	{ s: 'Cl', n: 'Cloro', p: 17, n0: 18, e: 17 }, { s: 'Ar', n: 'Argônio', p: 18, n0: 22, e: 18 },
	{ s: 'K', n: 'Potássio', p: 19, n0: 20, e: 19 }, { s: 'Ca', n: 'Cálcio', p: 20, n0: 20, e: 20 },
	{ s: 'Sc', n: 'Escândio', p: 21, n0: 24, e: 21 }, { s: 'Ti', n: 'Titânio', p: 22, n0: 26, e: 22 },
	{ s: 'V', n: 'Vanádio', p: 23, n0: 28, e: 23 }, { s: 'Cr', n: 'Cromo', p: 24, n0: 28, e: 24 },
	{ s: 'Mn', n: 'Manganês', p: 25, n0: 30, e: 25 }, { s: 'Fe', n: 'Ferro', p: 26, n0: 30, e: 26 },
	{ s: 'Co', n: 'Cobalto', p: 27, n0: 32, e: 27 }, { s: 'Ni', n: 'Níquel', p: 28, n0: 31, e: 28 },
	{ s: 'Cu', n: 'Cobre', p: 29, n0: 35, e: 29 }, { s: 'Zn', n: 'Zinco', p: 30, n0: 35, e: 30 },
	{ s: 'Ga', n: 'Gálio', p: 31, n0: 39, e: 31 }, { s: 'Ge', n: 'Germânio', p: 32, n0: 41, e: 32 },
	{ s: 'As', n: 'Arsênio', p: 33, n0: 42, e: 33 }, { s: 'Se', n: 'Selênio', p: 34, n0: 45, e: 34 },
	{ s: 'Br', n: 'Bromo', p: 35, n0: 45, e: 35 }, { s: 'Kr', n: 'Criptônio', p: 36, n0: 48, e: 36 },
	{ s: 'Rb', n: 'Rubídio', p: 37, n0: 48, e: 37 }, { s: 'Sr', n: 'Estrôncio', p: 38, n0: 50, e: 38 },
	{ s: 'Y', n: 'Ítrio', p: 39, n0: 50, e: 39 }, { s: 'Zr', n: 'Zircônio', p: 40, n0: 51, e: 40 },
	{ s: 'Nb', n: 'Nióbio', p: 41, n0: 52, e: 41 }, { s: 'Mo', n: 'Molibdênio', p: 42, n0: 54, e: 42 },
	{ s: 'Tc', n: 'Tecnécio', p: 43, n0: 55, e: 43 }, { s: 'Ru', n: 'Rutênio', p: 44, n0: 57, e: 44 },
	{ s: 'Rh', n: 'Ródio', p: 45, n0: 58, e: 45 }, { s: 'Pd', n: 'Paládio', p: 46, n0: 60, e: 46 },
	{ s: 'Ag', n: 'Prata', p: 47, n0: 61, e: 47 }, { s: 'Cd', n: 'Cádmio', p: 48, n0: 66, e: 48 },
	{ s: 'In', n: 'Índio', p: 49, n0: 66, e: 49 }, { s: 'Sn', n: 'Estanho', p: 50, n0: 69, e: 50 },
	{ s: 'Sb', n: 'Antimônio', p: 51, n0: 71, e: 51 }, { s: 'Te', n: 'Telúrio', p: 52, n0: 76, e: 52 },
	{ s: 'I', n: 'Iodo', p: 53, n0: 74, e: 53 }, { s: 'Xe', n: 'Xenônio', p: 54, n0: 77, e: 54 },
	{ s: 'Cs', n: 'Césio', p: 55, n0: 78, e: 55 }, { s: 'Ba', n: 'Bário', p: 56, n0: 81, e: 56 },
	{ s: 'La', n: 'Lantânio', p: 57, n0: 82, e: 57 }, { s: 'Ce', n: 'Cério', p: 58, n0: 82, e: 58 },
	{ s: 'Pr', n: 'Praseodímio', p: 59, n0: 82, e: 59 }, { s: 'Nd', n: 'Neodímio', p: 60, n0: 84, e: 60 },
	{ s: 'Pm', n: 'Promécio', p: 61, n0: 84, e: 61 }, { s: 'Sm', n: 'Samário', p: 62, n0: 88, e: 62 },
	{ s: 'Eu', n: 'Európio', p: 63, n0: 89, e: 63 }, { s: 'Gd', n: 'Gadolínio', p: 64, n0: 93, e: 64 },
	{ s: 'Tb', n: 'Térbio', p: 65, n0: 94, e: 65 }, { s: 'Dy', n: 'Disprósio', p: 66, n0: 97, e: 66 },
	{ s: 'Ho', n: 'Hólmio', p: 67, n0: 98, e: 67 }, { s: 'Er', n: 'Érbio', p: 68, n0: 99, e: 68 },
	{ s: 'Tm', n: 'Túlio', p: 69, n0: 100, e: 69 }, { s: 'Yb', n: 'Itérbio', p: 70, n0: 103, e: 70 },
	{ s: 'Lu', n: 'Lutécio', p: 71, n0: 104, e: 71 }, { s: 'Hf', n: 'Háfnio', p: 72, n0: 106, e: 72 },
	{ s: 'Ta', n: 'Tântalo', p: 73, n0: 108, e: 73 }, { s: 'W', n: 'Tungstênio', p: 74, n0: 110, e: 74 },
	{ s: 'Re', n: 'Rênio', p: 75, n0: 111, e: 75 }, { s: 'Os', n: 'Ósmio', p: 76, n0: 114, e: 76 },
	{ s: 'Ir', n: 'Irídio', p: 77, n0: 115, e: 77 }, { s: 'Pt', n: 'Platina', p: 78, n0: 117, e: 78 },
	{ s: 'Au', n: 'Ouro', p: 79, n0: 118, e: 79 }, { s: 'Hg', n: 'Mercúrio', p: 80, n0: 121, e: 80 },
	{ s: 'Tl', n: 'Tálio', p: 81, n0: 123, e: 81 }, { s: 'Pb', n: 'Chumbo', p: 82, n0: 125, e: 82 },
	{ s: 'Bi', n: 'Bismuto', p: 83, n0: 126, e: 83 }, { s: 'Po', n: 'Polônio', p: 84, n0: 125, e: 84 },
	{ s: 'At', n: 'Astato', p: 85, n0: 125, e: 85 }, { s: 'Rn', n: 'Radônio', p: 86, n0: 136, e: 86 },
	{ s: 'Fr', n: 'Frâncio', p: 87, n0: 136, e: 87 }, { s: 'Ra', n: 'Rádio', p: 88, n0: 138, e: 88 },
	{ s: 'Ac', n: 'Actínio', p: 89, n0: 138, e: 89 }, { s: 'Th', n: 'Tório', p: 90, n0: 142, e: 90 },
	{ s: 'Pa', n: 'Protactínio', p: 91, n0: 140, e: 91 }, { s: 'U', n: 'Urânio', p: 92, n0: 146, e: 92 },
	{ s: 'Np', n: 'Netúnio', p: 93, n0: 144, e: 93 }, { s: 'Pu', n: 'Plutônio', p: 94, n0: 150, e: 94 },
	{ s: 'Am', n: 'Amerício', p: 95, n0: 148, e: 95 }, { s: 'Cm', n: 'Cúrio', p: 96, n0: 151, e: 96 },
	{ s: 'Bk', n: 'Berquélio', p: 97, n0: 150, e: 97 }, { s: 'Cf', n: 'Califórnio', p: 98, n0: 153, e: 98 },
	{ s: 'Es', n: 'Einstênio', p: 99, n0: 153, e: 99 }, { s: 'Fm', n: 'Férmio', p: 100, n0: 157, e: 100 },
	{ s: 'Md', n: 'Mendelévio', p: 101, n0: 157, e: 101 }, { s: 'No', n: 'Nobélio', p: 102, n0: 157, e: 102 },
	{ s: 'Lr', n: 'Laurêncio', p: 103, n0: 159, e: 103 }, { s: 'Rf', n: 'Rutherfórdio', p: 104, n0: 163, e: 104 },
	{ s: 'Db', n: 'Dúbnio', p: 105, n0: 163, e: 105 }, { s: 'Sg', n: 'Seabórgio', p: 106, n0: 163, e: 106 },
	{ s: 'Bh', n: 'Bóhrio', p: 107, n0: 163, e: 107 }, { s: 'Hs', n: 'Hássio', p: 108, n0: 169, e: 108 },
	{ s: 'Mt', n: 'Meitnério', p: 109, n0: 169, e: 109 }, { s: 'Ds', n: 'Darmstádio', p: 110, n0: 171, e: 110 },
	{ s: 'Rg', n: 'Roentgênio', p: 111, n0: 171, e: 111 }, { s: 'Cn', n: 'Copernício', p: 112, n0: 173, e: 112 },
	{ s: 'Nh', n: 'Nihônio', p: 113, n0: 173, e: 113 }, { s: 'Fl', n: 'Fleróvio', p: 114, n0: 175, e: 114 },
	{ s: 'Mc', n: 'Moscóvio', p: 115, n0: 175, e: 115 }, { s: 'Lv', n: 'Livermório', p: 116, n0: 177, e: 116 },
	{ s: 'Ts', n: 'Tenesso', p: 117, n0: 177, e: 117 }, { s: 'Og', n: 'Oganessônio', p: 118, n0: 176, e: 118 }
];

let state = { p: 1, n: 0, e: 1, temp: 300, mag: 0, rad: 0, ph: 7, anim: true, view: '3d' };

// ================= INICIALIZAÇÃO =================
document.addEventListener('DOMContentLoaded', () => {
	renderList();
	initThree();
	initChart();
	updateAll();
	animateLoop();

	// Search Filter
	document.getElementById('searchInput').addEventListener('input', (e) => {
		const t = e.target.value.toLowerCase();
		document.querySelectorAll('.element-item').forEach(el => {
			el.style.display = el.innerText.toLowerCase().includes(t) ? 'flex' : 'none';
		});
	});
});

// ================= LOGICA UI =================
function renderList() {
	const l = document.getElementById('elementsList');
	l.innerHTML = '';
	elementsDB.forEach(el => {
		const d = document.createElement('div');
		d.className = 'element-item';
		d.id = `el-${el.s}`;
		d.onclick = () => loadEl(el);
		// Estrutura exata do molde
		d.innerHTML = `
			<span class="element-number">${el.p}</span>
			<span class="element-symbol">${el.s}</span>
			<span class="element-name">${el.n}</span>
		`;
		l.appendChild(d);
	});
}

function loadEl(el) { state.p=el.p; state.n=el.n0; state.e=el.e; updateAll(); }

function updPart(t, v) {
	if(t==='p') state.p = Math.max(1, state.p+v);
	if(t==='n') state.n = Math.max(0, state.n+v);
	if(t==='e') state.e = Math.max(0, state.e+v);
	updateAll();
}

function updEnv() {
	state.temp = document.getElementById('rngTemp').value;
	document.getElementById('lblTemp').innerText = state.temp + ' K';
	
	state.mag = document.getElementById('rngMag').value;
	document.getElementById('lblMag').innerText = state.mag + ' T';
	
	state.rad = document.getElementById('rngRad').value;
	document.getElementById('lblRad').innerText = state.rad + ' Bq';
	
	state.ph = document.getElementById('rngPH').value;
	document.getElementById('lblPH').innerText = state.ph;
	
	updateAll();
}

function resetSim() { state.p=1; state.n=0; state.e=1; state.temp=300; state.mag=0; state.rad=0; state.ph=7; updateAll(); }

function updateAll() {
	// UI Particulas
	document.getElementById('valP').innerText = state.p;
	document.getElementById('valN').innerText = state.n;
	document.getElementById('valE').innerText = state.e;
	
	const c = state.p - state.e;
	const cEl = document.getElementById('valC');
	cEl.innerText = c>0 ? `+${c}` : c; 
	cEl.style.color = c===0 ? 'var(--accent)' : (c>0 ? 'var(--danger)' : '#3b82f6');

	// UI Identificação
	const match = elementsDB.find(e => e.p === state.p);
	document.getElementById('lblEl').innerText = match ? `${match.n} (${match.s})` : `Sintético ${state.p}`;
	document.getElementById('lblMass').innerText = (state.p + state.n * 1.008).toFixed(3) + ' u';

	// Highlight List
	document.querySelectorAll('.element-item').forEach(i => i.classList.remove('active'));
	if(match) {
		const i = document.getElementById(`el-${match.s}`);
		if(i) { i.classList.add('active'); i.scrollIntoView({block:"center", behavior:"smooth"}); }
	}

	// Estabilidade
	const r = state.p>0 ? state.n/state.p : 0;
	let stable = (state.p===1 && state.n===0) || (r>=1 && r<=1.5);
	if(state.p>82 || state.rad > 50) stable=false;
	
	const sLbl = document.getElementById('lblStab');
	const sMark = document.getElementById('markStab');
	
	if(stable) {
		sLbl.innerText = "Estável"; sLbl.style.color = "var(--accent)";
		sMark.style.left = "90%";
	} else {
		sLbl.innerText = "Instável"; sLbl.style.color = "var(--danger)";
		sMark.style.left = "10%";
	}

	// Updates Visuais
	upd3D();
	updChart();
	if(state.view === '2d') draw2D();
}

function toggleAnim() {
	state.anim = !state.anim;
	document.getElementById('iconAnim').className = state.anim ? 'fa-solid fa-pause' : 'fa-solid fa-play';
}

function switchView(v, btn) {
	state.view = v;
	document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
	btn.classList.add('active');
	
	document.querySelectorAll('.view-layer').forEach(l => l.classList.remove('active'));
	if(v === '3d') document.getElementById('view3D').classList.add('active');
	if(v === '2d') {
		document.getElementById('view2D').classList.add('active');
		init2D();
	}
	if(v === 'sp') document.getElementById('viewSp').classList.add('active');
}

// ================= THREE.JS (3D) =================
let scene, camera, renderer, controls, nGroup, eGroup, oGroup;

function initThree() {
	const c = document.getElementById('view3D');
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000); // Fundo do Canvas
	
	camera = new THREE.PerspectiveCamera(45, c.clientWidth/c.clientHeight, 0.1, 1000);
	camera.position.z = 25;

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(c.clientWidth, c.clientHeight);
	c.appendChild(renderer.domElement);

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;

	scene.add(new THREE.AmbientLight(0x404040, 2));
	const pl = new THREE.PointLight(0xffffff, 1); pl.position.set(10,10,10); scene.add(pl);

	nGroup = new THREE.Group(); scene.add(nGroup);
	eGroup = new THREE.Group(); scene.add(eGroup);
	oGroup = new THREE.Group(); scene.add(oGroup);

	new ResizeObserver(() => {
		camera.aspect = c.clientWidth/c.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(c.clientWidth, c.clientHeight);
	}).observe(c);
}

function upd3D() {
	nGroup.clear();
	const total = state.p + state.n;
	
	if(total > 0) {
		const radius = 0.6;
		const goldenAngle = Math.PI * (3 - Math.sqrt(5));
		const step = total > 1 ? total - 1 : 1;
		const spread = Math.max(1.2, Math.pow(total, 1/3));

		for(let i=0; i<total; i++) {
			const y = total === 1 ? 0 : 1 - (i / step) * 2;
			const r = Math.sqrt(1 - y*y);
			const theta = goldenAngle * i;
			const x = Math.cos(theta) * r;
			const z = Math.sin(theta) * r;
			
			const isP = i < state.p;
			const mat = new THREE.MeshPhongMaterial({color: isP ? 0xef4444 : 0x3b82f6});
			const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius,16,16), mat);
			mesh.position.set(x,y,z).multiplyScalar(spread);
			nGroup.add(mesh);
		}
	}

	eGroup.clear(); oGroup.clear();
	let rem = state.e;
	let lvl = 0;
	const caps = [2, 8, 18, 32, 32, 18, 8];

	while(rem > 0) {
		const cnt = Math.min(rem, caps[lvl]);
		const r = 6 + (lvl * 3.5);

		const ring = new THREE.Mesh(
			new THREE.RingGeometry(r, r+0.05, 64),
			new THREE.MeshBasicMaterial({color:0x10b981, side:THREE.DoubleSide, transparent:true, opacity:0.2})
		);
		ring.rotation.x = Math.PI/2;
		oGroup.add(ring);

		for(let i=0; i<cnt; i++) {
			const el = new THREE.Mesh(new THREE.SphereGeometry(0.25,16,16), new THREE.MeshBasicMaterial({color:0x10b981}));
			el.userData = { ang: (i/cnt)*Math.PI*2, r: r, spd: 0.02 - (lvl*0.003), yOff: Math.random()*Math.PI };
			eGroup.add(el);
		}
		rem -= cnt; lvl++;
	}
}

// ================= 2D CANVAS =================
function init2D() {
	const c = document.getElementById('canvas2D');
	c.width = c.parentElement.offsetWidth;
	c.height = c.parentElement.offsetHeight;
}

function draw2D() {
	const c = document.getElementById('canvas2D');
	if(c.parentElement.style.display==='none') return;
	if(c.width!==c.parentElement.offsetWidth) { c.width=c.parentElement.offsetWidth; c.height=c.parentElement.offsetHeight; }
	
	const ctx = c.getContext('2d');
	const cx = c.width/2, cy = c.height/2;
	ctx.clearRect(0,0,c.width,c.height);

	// Núcleo
	ctx.beginPath();
	ctx.arc(cx, cy, 6+(state.p*0.3), 0, Math.PI*2);
	ctx.fillStyle = state.p>state.n?'#ef4444':'#3b82f6'; ctx.fill();
	ctx.fillStyle='#fff'; ctx.font='10px Inter'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(`${state.p}p`, cx, cy);

	// Orbitas e Rodapé
	let rem=state.e, lvl=0;
	const caps=[2,8,18,32,32,18,8];
	const layers=['K','L','M','N','O','P','Q'];
	let footerText = [];

	while(rem>0) {
		const cnt = Math.min(rem, caps[lvl]);
		footerText.push(`${layers[lvl]}: ${cnt}`);
		
		const r = 30+(lvl*20);
		ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.strokeStyle='rgba(16,185,129,0.3)'; ctx.stroke();
		for(let i=0; i<cnt; i++) {
			const ang = (i/cnt)*Math.PI*2 + (Date.now()*0.001*(lvl+1));
			ctx.beginPath(); ctx.arc(cx+Math.cos(ang)*r, cy+Math.sin(ang)*r, 3, 0, Math.PI*2); ctx.fillStyle='#10b981'; ctx.fill();
		}
		rem-=cnt; lvl++;
	}

	// Desenha Rodapé das Camadas
	ctx.font = '11px monospace';
	ctx.fillStyle = '#9ca3af';
	ctx.textAlign = 'center';
	ctx.fillText(footerText.join('   '), cx, c.height - 15);
}

// ================= CHART =================
let chart;
function initChart() {
	chart = new Chart(document.getElementById('chartSpec').getContext('2d'), {
		type: 'bar',
		data: { labels:['V','A','C','V','A','L','V'], datasets:[{data:[], backgroundColor:['#8b5cf6','#3b82f6','#06b6d4','#10b981','#eab308','#f97316','#ef4444']}] },
		options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{display:false}, y:{display:false}} }
	});
}
function updChart() {
	if(!chart) return;
	const seed = state.p + (state.mag * 5);
	chart.data.datasets[0].data = [1,2,3,4,5,6,7].map(i => Math.abs(Math.sin(seed*i))*100);
	chart.update();
}

// ================= ANIMATION LOOP =================
function animateLoop() {
	requestAnimationFrame(animateLoop);
	if(state.anim) {
		const t = Date.now()*0.001;
		nGroup.rotation.y = t * 0.2;
		eGroup.children.forEach(el => {
			el.userData.ang += el.userData.spd * (state.temp/300);
			el.position.x = Math.cos(el.userData.ang)*el.userData.r;
			el.position.z = Math.sin(el.userData.ang)*el.userData.r;
			el.position.y = Math.sin(t*3 + el.userData.yOff)*0.5;
		});
	}
	if(state.view==='3d') { controls.update(); renderer.render(scene, camera); }
	else if(state.view==='2d') draw2D();
}

// ====== VOLTAR ======
document.getElementById('toGoBackBtn').addEventListener('click', function() {
    window.location.href = "../../index.html";
});