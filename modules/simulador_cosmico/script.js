/* --- SHADER DE ESTRELA (Visual Processual) --- */
const StarShader = {
	vertexShader: `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
	fragmentShader: `
		uniform float time;
		uniform vec3 color;
		varying vec2 vUv;

		float hash(vec2 p) {
			return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5);
		}
		float noise(vec2 p) {
			vec2 i = floor(p), f = fract(p);
			float a = hash(i);
			float b = hash(i+vec2(1,0));
			float c = hash(i+vec2(0,1));
			float d = hash(i+vec2(1,1));
			vec2 u = f*f*(3.0-2.0*f);
			return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
		}
		void main() {
			float n = noise(vUv * 15.0 + time * 0.3);
			gl_FragColor = vec4(color * (0.7 + n * 0.5), 1.0);
		}
	`
};

/* --- DADOS COMPLETOS --- */
const DATA = {
	solar: [
		{ id:'sun',     name:'Sol',     type:'Estrela G2V',     mass:'1.0 Sol',  r:'696 Mm', temp:'5778 K', color:0xffaa00, isStar:true },
		{ id:'mercury', name:'Mercúrio',type:'Planeta',        mass:'0.05 T',   r:'2.4 Mm', dist:'0.39 UA',color:0x8c7853 },
		{ id:'venus',   name:'Vênus',  type:'Planeta',         mass:'0.81 T',   r:'6.0 Mm', dist:'0.72 UA',color:0xe89b3c },
		{ id:'earth',   name:'Terra',  type:'Planeta',         mass:'1.0 T',    r:'6.3 Mm', dist:'1.00 UA',color:0x2233ff },
		{ id:'mars',    name:'Marte',  type:'Planeta',         mass:'0.10 T',   r:'3.3 Mm', dist:'1.52 UA',color:0xff4422 },
		{ id:'jupiter', name:'Júpiter',type:'Gigante Gasoso',  mass:'317 T',    r:'69.9 Mm',dist:'5.20 UA',color:0xc88b3a },
		{ id:'saturn',  name:'Saturno',type:'Gigante Gasoso',  mass:'95 T',     r:'58.2 Mm',dist:'9.58 UA',color:0xfad5a5, ring:true },
		{ id:'uranus',  name:'Urano',  type:'Gigante de Gelo', mass:'14 T',     r:'25.3 Mm',dist:'19.2 UA',color:0x4fd0e7 },
		{ id:'neptune', name:'Netuno', type:'Gigante de Gelo', mass:'17 T',     r:'24.6 Mm',dist:'30.0 UA',color:0x4166f5 }
	],
	stars: [
		{ id:'red_dwarf',   name:'Anã Vermelha',  type:'Classe M',  mass:'0.1 Sol', temp:'3000 K',  color:0xff3300, isStar:true },
		{ id:'yellow_dwarf',name:'Anã Amarela',   type:'Classe G',  mass:'1.0 Sol', temp:'5800 K',  color:0xffaa00, isStar:true },
		{ id:'blue_giant',  name:'Gigante Azul',  type:'Classe O',  mass:'20 Sol',  temp:'30000 K', color:0x0088ff, isStar:true },
		{ id:'red_giant',   name:'Gigante Vermelha',type:'Fase Final',mass:'1-8 Sol', temp:'3500 K',color:0xff5500, isStar:true }
	],
	exotic: [
		{ id:'blackhole',    name:'Buraco Negro',        type:'Singularidade', mass:'10 Sol',   r:'30 km', isBlackHole:true },
		{ id:'neutron_star', name:'Estrela de Nêutrons', type:'Remanescente',  mass:'1.4 Sol',  r:'10 km', color:0xcccccc },
		{ id:'pulsar',       name:'Pulsar',              type:'Estrela de Nêutrons', mass:'1.4 Sol', r:'10 km', color:0x00ffff, isPulsar:true },
		{ id:'magnetar',     name:'Magnetar',            type:'Estrela de Nêutrons', mass:'1.5 Sol', r:'12 km', color:0xff00ff },
		{ id:'quasar',       name:'Quasar',              type:'AGN',           mass:'Milhões Sol', r:'-', isBlackHole:true, color:0xffffff }
	],
	events: [
		{ id:'supernova', name:'Supernova', type:'Explosão', action:'triggerSupernova' },
		{ id:'kilonova',  name:'Kilonova',  type:'Colisão',  action:'triggerSupernova' }
	],
	sims: [
		{ id:'sim_fusion', name:'Fusão Estelar', type:'Simulador', action:'startFusionSim' }
	]
};

/* --- ESTADO --- */
let activeTab = 'viewer';
let solarSpeed = 1;
let builderMode = 'add';
let builderRunning = true;
let currentViewerObj = null;
let sims = { viewer:{}, solar:{}, builder:{} };

window.onload = () => {
	initEngines();
	populateCatalog();
	animate();
	window.addEventListener('resize', onResize);

	// Seleciona o primeiro item (Sol) após popular a lista
	const firstItemEl = document.querySelector('.nav-item');
	if (firstItemEl) {
		selectItem(DATA.solar[0], firstItemEl);
	}
};

/* --- CATÁLOGO CORRIGIDO (sem innerHTML +=) --- */
function populateCatalog() {
	const list = document.getElementById('catalog-list');
	list.innerHTML = '';

	for (const cat in DATA) {
		// Título da categoria
		const title = document.createElement('div');
		title.className = 'cat-title';
		title.textContent = cat.toUpperCase();
		list.appendChild(title);

		// Itens
		DATA[cat].forEach(item => {
			const el = document.createElement('div');
			el.className = 'nav-item';
			el.innerHTML = `
				<i class="fas fa-circle" style="font-size:6px; color:var(--accent);"></i>
				<div>
					<div style="font-weight:600; font-size:11px;">${item.name}</div>
					<div style="font-size:9px; color:#666;">${item.type}</div>
				</div>
			`;
			el.onclick = () => selectItem(item, el);
			list.appendChild(el);
		});
	}
}

function selectItem(item, el) {
	if (el) {
		document.querySelectorAll('.nav-item').forEach(e => e.classList.remove('active'));
		el.classList.add('active');
	}
	document.querySelectorAll('.module-ctrl').forEach(c => c.classList.remove('active'));
	
	if (item.type === 'Simulador') {
		if (item.id === 'sim_fusion') {
			document.getElementById('ctrl-fusion').classList.add('active');
		}
	} else {
		document.getElementById('ctrl-general').classList.add('active');
		document.getElementById('det-name').innerText   = item.name || '-';
		document.getElementById('det-type').innerText   = item.type || '-';
		document.getElementById('det-mass').innerText   = item.mass || '-';
		document.getElementById('det-radius').innerText = item.r || '-';
		document.getElementById('det-extra').innerText  = item.temp || item.dist || '-';
		document.getElementById('det-desc').innerText   = item.desc || '';
		const actDiv = document.getElementById('action-container');
		actDiv.innerHTML = item.action
			? `<button class="btn-action" onclick="${item.action}()">INICIAR EFEITO</button>`
			: '';
	}

	if (activeTab === 'viewer' && !item.action) {
		renderViewerObject(item);
	}
}

function setTab(t) {
	activeTab = t;
	document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
	document.getElementById('btn-'+t).classList.add('active');

	document.querySelectorAll('.module-ctrl').forEach(c => c.classList.remove('active'));
	if (t === 'solar')   document.getElementById('ctrl-solar').classList.add('active');
	if (t === 'builder') document.getElementById('ctrl-builder').classList.add('active');
	if (t === 'viewer')  document.getElementById('ctrl-general').classList.add('active');

	document.querySelectorAll('.sim-canvas').forEach(c => c.classList.remove('active'));
	document.getElementById('cnv-'+t).classList.add('active');

	document.getElementById('sim-overlay').innerHTML =
		`<div style="color:var(--accent); font-weight:bold; font-size:12px;">${t.toUpperCase()}</div>`;

	onResize();
}

/* --- ENGINE 3D (ajuste de câmera para parecer 3D) --- */
function createEngine(id) {
	const c = document.getElementById(id);
	const s = new THREE.Scene();
	s.background = new THREE.Color(0x000005);

	const width  = c.clientWidth  || 1;
	const height = c.clientHeight || 1;

	const cam = new THREE.PerspectiveCamera(45, width/height, 0.1, 2000);
	// Posição inclinada: sensação 3D clara
	cam.position.set(10, 10, 20);
	cam.lookAt(0, 0, 0);

	const ren = new THREE.WebGLRenderer({ antialias:true });
	ren.setSize(width, height);
	c.appendChild(ren.domElement);

	const ctr = new THREE.OrbitControls(cam, ren.domElement);

	s.add(new THREE.AmbientLight(0x404040));
	s.add(new THREE.PointLight(0xffffff, 1.5, 200));

	return { scn:s, cam:cam, ren:ren, ctr:ctr, objs:[], list:[] };
}

function initEngines() {
	sims.viewer  = createEngine('cnv-viewer');
	sims.solar   = createEngine('cnv-solar');
	sims.builder = createEngine('cnv-builder');

	sims.solar.scn.add(new THREE.PointLight(0xffffff, 2, 500));
	initSolarScene();

	sims.builder.scn.add(new THREE.GridHelper(100, 100, 0x333333, 0x111111));
	initBuilderInput();
}

/* --- RENDERIZAÇÃO DO VISUALIZADOR --- */
function renderViewerObject(item) {
	const s = sims.viewer;
	s.objs.forEach(o => s.scn.remove(o));
	s.objs = [];
	currentViewerObj = null;

	// 1. Buraco Negro / Quasar
	if (item.isBlackHole || item.id === 'blackhole' || item.id === 'quasar') {
		const bh = new THREE.Mesh(
			new THREE.SphereGeometry(3, 32, 32),
			new THREE.MeshBasicMaterial({ color:0x000000 })
		);
		const disk = new THREE.Mesh(
			new THREE.TorusGeometry(7, 2, 16, 100),
			new THREE.MeshBasicMaterial({ color:0xff8800, wireframe:true })
		);
		disk.rotation.x = 1.3;
		s.scn.add(bh);
		s.scn.add(disk);
		s.objs.push(bh, disk);
		currentViewerObj = { type:'blackhole', mesh:disk };
	}
	// 2. Pulsar
	else if (item.isPulsar || item.id === 'pulsar') {
		const ps = new THREE.Mesh(
			new THREE.SphereGeometry(1.5, 32, 32),
			new THREE.MeshBasicMaterial({ color:0x00ffff })
		);
		const jetGeo = new THREE.CylinderGeometry(0.2, 1, 20, 8, 1, true);
		const jetMat = new THREE.MeshBasicMaterial({
			color:0x00ffff,
			transparent:true,
			opacity:0.6,
			side:THREE.DoubleSide
		});
		const j1 = new THREE.Mesh(jetGeo, jetMat); j1.position.y = 10;
		const j2 = j1.clone(); j2.position.y = -10;

		const grp = new THREE.Group();
		grp.add(ps, j1, j2);
		grp.rotation.z = 0.5;

		s.scn.add(grp);
		s.objs.push(grp);
		currentViewerObj = { type:'pulsar', mesh:grp };
	}
	// 3. Estrelas (Com Shader)
	else if (item.isStar) {
		const mat = new THREE.ShaderMaterial({
			uniforms: {
				time:  { value: 1.0 },
				color: { value: new THREE.Color(item.color || 0xffaa00) }
			},
			vertexShader:   StarShader.vertexShader,
			fragmentShader: StarShader.fragmentShader
		});
		const star = new THREE.Mesh(
			new THREE.SphereGeometry(5, 64, 64),
			mat
		);
		s.scn.add(star);
		s.objs.push(star);
		currentViewerObj = { type:'star', mesh:star, material:mat };
	}
	// 4. Planetas e Outros (Genérico com Cor)
	else {
		const col = item.color || 0x888888;
		const p = new THREE.Mesh(
			new THREE.SphereGeometry(4, 32, 32),
			new THREE.MeshStandardMaterial({
				color:col,
				roughness:0.7,
				metalness:0.1
			})
		);
		s.scn.add(p);
		s.objs.push(p);
		currentViewerObj = { type:'planet', mesh:p };
	}
}

function triggerSupernova() {
	setTab('viewer');
	const s = sims.viewer;
	s.objs.forEach(o => s.scn.remove(o));
	s.objs = [];

	const cnt = 3000;
	const pos = new Float32Array(cnt * 3);
	const vel = [];

	for (let i = 0; i < cnt; i++) {
		const v = new THREE.Vector3(
			Math.random()-0.5,
			Math.random()-0.5,
			Math.random()-0.5
		).normalize().multiplyScalar(0.3 + Math.random()*0.5);
		vel.push(v);

		const idx = i * 3;
		pos[idx]   = 0;
		pos[idx+1] = 0;
		pos[idx+2] = 0;
	}

	const pGeo = new THREE.BufferGeometry();
	pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

	const sys = new THREE.Points(
		pGeo,
		new THREE.PointsMaterial({ color:0xff5500, size:0.3 })
	);
	sys.userData = { vel:vel, isExplosion:true };

	s.scn.add(sys);
	s.objs.push(sys);
	currentViewerObj = { type:'explosion', mesh:sys };
}

// Helper para iniciar fusão já garantindo uma estrela no viewer
function startFusionSim() {
	setTab('viewer');
	renderViewerObject({ id:'fusion_star', color:0xffaa00, isStar:true });
}

function updateFusion(val) {
	if (activeTab !== 'viewer') return;
	if (!currentViewerObj || currentViewerObj.type !== 'star') {
		renderViewerObject({ id:'temp_star', color:0xff0000, isStar:true });
	}
	const temp = parseInt(val, 10);
	const col = new THREE.Color(
		temp < 40 ? 0xff0000 :
		(temp < 80 ? 0xffff00 : 0x00ffff)
	);
	if (currentViewerObj.material) {
		currentViewerObj.material.uniforms.color.value = col;
	}
	document.getElementById('fusion-elem').innerText =
		temp < 40 ? "Hidrogênio" :
		(temp < 80 ? "Hélio" : "Carbono");
}

function initSolarScene() {
	const s = sims.solar;
	DATA.solar.forEach((d, i) => {
		let r = 1, dist = i * 10;
		if (d.id === 'sun') { r = 4; dist = 0; }

		const mesh = new THREE.Mesh(
			new THREE.SphereGeometry(r, 32, 32),
			new THREE.MeshStandardMaterial({
				color:d.color,
				emissive:(d.id === 'sun') ? d.color : 0x000000,
				emissiveIntensity:0.5
			})
		);

		const pivot = new THREE.Group();
		pivot.add(mesh);
		mesh.position.x = dist;

		if (d.ring) {
			const rg = new THREE.Mesh(
				new THREE.RingGeometry(1.5, 3, 32),
				new THREE.MeshBasicMaterial({
					color:0xaa8866,
					side:THREE.DoubleSide,
					transparent:true,
					opacity:0.6
				})
			);
			rg.rotation.x = Math.PI/2;
			mesh.add(rg);
		}

		if (dist > 0) {
			const orb = new THREE.Mesh(
				new THREE.RingGeometry(dist-0.1, dist+0.1, 64),
				new THREE.MeshBasicMaterial({
					color:0x333333,
					side:THREE.DoubleSide
				})
			);
			orb.rotation.x = Math.PI/2;
			s.scn.add(orb);
		}

		s.scn.add(pivot);
		s.list.push({ pivot:pivot, mesh:mesh, speed:(10-i)*0.002 });
	});
}

function initBuilderInput() {
	const s = sims.builder;
	const plane = new THREE.Mesh(
		new THREE.PlaneGeometry(200, 200),
		new THREE.MeshBasicMaterial({ visible:false })
	);
	plane.rotation.x = -Math.PI/2;
	s.scn.add(plane);

	s.ren.domElement.onclick = (e) => {
		if (activeTab !== 'builder') return;

		const ray   = new THREE.Raycaster();
		const mouse = new THREE.Vector2();
		const rect  = s.ren.domElement.getBoundingClientRect();

		mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
		mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

		ray.setFromCamera(mouse, s.cam);
		const hits = ray.intersectObject(plane);

		if (hits.length > 0) {
			const type = document.getElementById('build-type').value;
			let col = 0xffffff, sz = 1;
			if (type === 'star')     { col = 0xffaa00; sz = 3; }
			if (type === 'blackhole'){ col = 0x222222; sz = 2; }

			const m = new THREE.Mesh(
				new THREE.SphereGeometry(sz, 16, 16),
				new THREE.MeshStandardMaterial({ color:col })
			);
			m.position.copy(hits[0].point);
			s.scn.add(m);

			s.list.push({
				mesh:m,
				vel:new THREE.Vector3(
					(Math.random()-0.5)*0.2,
					0,
					(Math.random()-0.5)*0.2
				)
			});
		}
	};
}

function resetBuilder() {
	const s = sims.builder;
	s.list.forEach(b => s.scn.remove(b.mesh));
	s.list = [];
}

function toggleBuilderSim() {
	builderRunning = !builderRunning;
}

/* --- LOOP DE ANIMAÇÃO (3D claro no viewer) --- */
function animate() {
	requestAnimationFrame(animate);
	const time = Date.now() * 0.001;

	if (currentViewerObj) {
		if (currentViewerObj.type === 'blackhole') {
			currentViewerObj.mesh.rotation.y += 0.05;
			currentViewerObj.mesh.rotation.x += 0.02;
		} else if (currentViewerObj.type === 'pulsar') {
			currentViewerObj.mesh.rotation.y += 0.2;
			currentViewerObj.mesh.rotation.x += 0.05;
		} else if (currentViewerObj.type === 'star') {
			if (currentViewerObj.material && currentViewerObj.material.uniforms.time) {
				currentViewerObj.material.uniforms.time.value = time;
			}
			if (currentViewerObj.mesh) {
				currentViewerObj.mesh.rotation.y += 0.03;
				currentViewerObj.mesh.rotation.x += 0.01;
			}
		} else if (currentViewerObj.type === 'explosion') {
			const geo = currentViewerObj.mesh.geometry;
			const pos = geo.attributes.position.array;
			const vels = currentViewerObj.mesh.userData.vel;

			for (let i = 0; i < vels.length; i++) {
				const v = vels[i];
				const idx = i * 3;
				pos[idx]   += v.x * 0.1;
				pos[idx+1] += v.y * 0.1;
				pos[idx+2] += v.z * 0.1;
			}
			geo.attributes.position.needsUpdate = true;
		} else if (currentViewerObj.type === 'planet') {
			currentViewerObj.mesh.rotation.y += 0.03;
			currentViewerObj.mesh.rotation.x += 0.01;
		}
	}

	// Renders por aba ativa
	if (activeTab === 'viewer') {
		sims.viewer.ren.render(sims.viewer.scn, sims.viewer.cam);
	}

	if (activeTab === 'solar') {
		sims.solar.list.forEach(o => {
			if (o.speed) o.pivot.rotation.y += o.speed * solarSpeed;
			o.mesh.rotation.y += 0.01;
		});
		sims.solar.ren.render(sims.solar.scn, sims.solar.cam);
	}

	if (activeTab === 'builder') {
		if (builderRunning) {
			sims.builder.list.forEach(b => b.mesh.position.add(b.vel));
		}
		sims.builder.ren.render(sims.builder.scn, sims.builder.cam);
	}
}

function onResize() {
	const update = (s, id) => {
		if (!s.cam || !s.ren) return;
		const wrapper = document.getElementById(id).parentElement;
		if (wrapper && wrapper.clientWidth && wrapper.clientHeight) {
			s.cam.aspect = wrapper.clientWidth / wrapper.clientHeight;
			s.cam.updateProjectionMatrix();
			s.ren.setSize(wrapper.clientWidth, wrapper.clientHeight);
		}
	};
	update(sims.viewer,  'cnv-viewer');
	update(sims.solar,   'cnv-solar');
	update(sims.builder, 'cnv-builder');
}

// ====== VOLTAR ======
document.getElementById('toGoBackBtn').addEventListener('click', function() {
    window.location.href = "../../index.html";
});