class NuclearSimulator {
  constructor() {
	this.container = document.getElementById('nuclearCanvas');
	this.currentElement = { protons: 1, neutrons: 0, name: 'Hidrogênio', mass: '1.008' };
	this.isSimulating = false;

	// 3D
	this.scene = null; this.camera = null; this.renderer = null;
	this.atomGroup = null; this.particleGroup = null; this.nucleusMesh = null;
	this.rotationSpeed = 0.01; // base
	this.clock = new THREE.Clock();

	this.init3D();
	this.setupEventListeners();
	this.updateCounters();
	this.updateElementInfo();
	this.buildAtom3D();
	this.animate();
  }

  // ---------- 3D SETUP ----------
  init3D() {
	const w = this.container.clientWidth || 600;
	const h = this.container.clientHeight || 400;

	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 2000);
	this.camera.position.set(0, 0, 180);

	this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	this.renderer.setSize(w, h);
	this.container.appendChild(this.renderer.domElement);

	const amb = new THREE.AmbientLight(0xffffff, 0.6);
	const key = new THREE.PointLight(0xffffff, 1.0, 0, 2);
	key.position.set(120, 120, 160);
	const rim = new THREE.PointLight(0x88ccff, 0.6, 0, 2);
	rim.position.set(-140, -80, -120);
	this.scene.add(amb, key, rim);

	this.atomGroup = new THREE.Group();
	this.scene.add(this.atomGroup);
	this.particleGroup = new THREE.Group();
	this.scene.add(this.particleGroup);

	// Resize
	const onResize = () => {
	  const w2 = this.container.clientWidth || 600;
	  const h2 = this.container.clientHeight || 400;
	  this.camera.aspect = w2 / h2;
	  this.camera.updateProjectionMatrix();
	  this.renderer.setSize(w2, h2);
	};
	window.addEventListener('resize', onResize);

	// Mouse orbit simples (inclinação)
	let isDown = false, lastX = 0, lastY = 0;
	this.container.addEventListener('mousedown', (e) => { isDown = true; lastX=e.clientX; lastY=e.clientY; });
	window.addEventListener('mouseup', ()=> isDown=false);
	window.addEventListener('mousemove', (e)=>{
	  if(!isDown) return;
	  const dx = (e.clientX-lastX) * 0.005;
	  const dy = (e.clientY-lastY) * 0.005;
	  this.atomGroup.rotation.y += dx;
	  this.atomGroup.rotation.x += dy;
	  lastX=e.clientX; lastY=e.clientY;
	});
  }

  nucleusRadius() {
	const total = Math.max(1, (this.currentElement.protons + this.currentElement.neutrons));
	return Math.min(60, 12 + Math.cbrt(total) * 2.5);
  }

  buildAtom3D() {
	// limpa grupo
	this.atomGroup.clear();
	const R = this.nucleusRadius();

	// Núcleo (esfera emissiva)
	const nucleusGeo = new THREE.SphereGeometry(R, 48, 48);
	const heavy = this.currentElement.protons >= 90;
	const nucleusMat = new THREE.MeshPhysicalMaterial({
	  color: heavy ? 0xdc2626 : 0x1d4ed8,
	  emissive: heavy ? 0x991b1b : 0x233b8e,
	  emissiveIntensity: 0.35,
	  metalness: 0.1, roughness: 0.3, clearcoat: 0.3, transparent: true, opacity: 0.96
	});
	this.nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
	this.nucleusMesh.castShadow = false; this.nucleusMesh.receiveShadow = false;
	this.atomGroup.add(this.nucleusMesh);

	// Instancing para prótons/nêutrons (dentro do núcleo com leve jitter)
	const placeInstances = (count, color, radius=1.6) => {
	  if (count <= 0) return;
	  const maxInst = Math.min(count, 400);
	  const geo = new THREE.SphereGeometry(radius, 16, 16);
	  const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.2, roughness: 0.4 });
	  const mesh = new THREE.InstancedMesh(geo, mat, maxInst);
	  const m = new THREE.Matrix4();
	  for (let i=0;i<maxInst;i++){
		// posição aleatória dentro de uma esfera de raio ~R*0.65 com “casca” leve
		const rr = (0.25 + Math.random()*0.4) * R;
		const th = Math.acos(2*Math.random()-1);
		const ph = Math.random()*Math.PI*2;
		const x = rr*Math.sin(th)*Math.cos(ph);
		const y = rr*Math.cos(th);
		const z = rr*Math.sin(th)*Math.sin(ph);
		m.setPosition(x, y, z);
		mesh.setMatrixAt(i, m);
	  }
	  mesh.instanceMatrix.needsUpdate = true;
	  this.atomGroup.add(mesh);
	};

	placeInstances(this.currentElement.protons, 0xef4444, 1.8);  // prótons (vermelhos)
	placeInstances(this.currentElement.neutrons, 0x9ca3af, 1.8); // nêutrons (cinza)

	// Halo sutil
	const haloGeo = new THREE.SphereGeometry(R*1.05, 48, 48);
	const haloMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.06, side: THREE.BackSide });
	const halo = new THREE.Mesh(haloGeo, haloMat);
	this.atomGroup.add(halo);
  }

  // Partículas emitidas (sprites/pequenas esferas com fade)
  emitParticle3D(type, vx, vy) {
	const colorMap = {
	  alpha: 0x3b82f6, beta: 0x10b981, gamma: 0xf59e0b, neutron: 0x9ca3af
	};
	const geom = new THREE.SphereGeometry(type==='alpha'? 2.4 : 1.6, 12, 12);
	const mat = new THREE.MeshStandardMaterial({ color: colorMap[type] || 0xffffff, emissive: colorMap[type] || 0xffffff, emissiveIntensity: 0.25, metalness: 0.1, roughness: 0.5 });
	const mesh = new THREE.Mesh(geom, mat);
	mesh.position.set(0,0,0);

	// direção a partir de tx,ty relativos convertidos
	const len = Math.hypot(vx, vy) || 1;
	const dir = new THREE.Vector3(vx/len, -vy/len, (Math.random()*2-1)*0.6).normalize();
	const speed = 60 + Math.random()*40;
	mesh.userData = { vel: dir.multiplyScalar(speed), life: 1.5 }; // segundos

	this.particleGroup.add(mesh);
  }

  // ---------- UI E EVENTOS ----------
  setupEventListeners() {
	document.querySelectorAll('.tool-item').forEach(item => {
	  item.addEventListener('click', (e) => {
		document.querySelectorAll('.tool-item').forEach(i => i.classList.remove('active'));
		e.currentTarget.classList.add('active');
	  });
	});

	document.querySelectorAll('.element-item').forEach(item => {
	  item.addEventListener('click', (e) => {
		const el = e.currentTarget.dataset.element;
		this.loadElement(el);
	  });
	});

	document.getElementById('energySlider').addEventListener('input', (e) => {
	  const val = parseFloat(e.target.value);
	  document.getElementById('energyValue').textContent = `${val.toFixed(1)} MeV`;
	  this.rotationSpeed = 0.003 + val*0.0015; // energia influencia a rotação
	});

	document.getElementById('tempSlider').addEventListener('input', (e) => {
	  document.getElementById('tempValue').textContent = `${parseInt(e.target.value).toLocaleString()} K`;
	});

	document.getElementById('fusionBtn').addEventListener('click', () => this.simulateFusion());
	document.getElementById('fissionBtn').addEventListener('click', () => this.simulateFission());
	document.getElementById('alphaDecayBtn').addEventListener('click', () => this.simulateAlphaDecay());
	document.getElementById('betaDecayBtn').addEventListener('click', () => this.simulateBetaDecay());
	document.getElementById('resetBtn').addEventListener('click', () => this.reset());
	document.getElementById('simulateBtn').addEventListener('click', () => this.toggleSimulation());
  }

  loadElement(symbol) {
	const map = {
	  H:{p:1,n:0,name:'Hidrogênio',mass:'1.008'},
	  He:{p:2,n:2,name:'Hélio',mass:'4.002'},
	  Li:{p:3,n:4,name:'Lítio',mass:'6.941'},
	  U:{p:92,n:143,name:'Urânio-235',mass:'235.044'},
	  Pu:{p:94,n:145,name:'Plutônio-239',mass:'239.052'}
	};
	const d = map[symbol] || map.H;
	this.currentElement = { protons:d.p, neutrons:d.n, name:d.name, mass:d.mass };
	this.updateCounters();
	this.updateElementInfo();
	this.buildAtom3D();
  }

  updateCounters() {
	document.getElementById('protonCount').textContent = this.currentElement.protons;
	document.getElementById('neutronCount').textContent = this.currentElement.neutrons;
  }

  updateElementInfo() {
	document.getElementById('currentElement').textContent = this.currentElement.name || '—';
	document.getElementById('currentMass').textContent = `${this.currentElement.mass || '—'} u`;
	const ratio = this.currentElement.neutrons / Math.max(1, this.currentElement.protons);
	document.getElementById('stability').textContent = (ratio < 1 || ratio > 1.5) ? 'Instável' : 'Estável';
  }

  // ---------- REAÇÕES ----------
  simulateFusion() {
	if (this.currentElement.protons === 1) {
	  this.emitParticle3D('alpha', 200, -100);
	  this.emitParticle3D('neutron', -150, 150);
	  this.showEnergyRelease(17.6);
	  this.currentElement = { protons: 2, neutrons: 2, name:'Hélio', mass:'4.002' };
	  this.nuclearFlash();
	  this.updateCounters(); this.updateElementInfo(); this.buildAtom3D();
	} else {
	  this.nuclearFlash();
	}
  }

  simulateFission() {
	if (this.currentElement.protons >= 92) {
	  this.emitParticle3D('alpha', 200, -50);
	  this.emitParticle3D('beta', -200, 50);
	  this.emitParticle3D('neutron', 100, 200);
	  this.emitParticle3D('neutron', -100, -200);
	  this.emitParticle3D('gamma', 150, -150);
	  this.showEnergyRelease(200);
	}
	this.nuclearFlash();
  }

  simulateAlphaDecay() {
	if (this.currentElement.protons > 2) {
	  this.emitParticle3D('alpha', 300, -100);
	  this.currentElement.protons -= 2;
	  this.currentElement.neutrons -= 2;
	  this.showEnergyRelease(5.0);
	  this.nuclearFlash();
	  this.updateCounters(); this.updateElementInfo(); this.buildAtom3D();
	} else {
	  this.nuclearFlash();
	}
  }

  simulateBetaDecay() {
	this.emitParticle3D('beta', -300, 100);
	this.currentElement.protons += 1;
	this.currentElement.neutrons -= 1;
	this.showEnergyRelease(1.0);
	this.nuclearFlash();
	this.updateCounters(); this.updateElementInfo(); this.buildAtom3D();
  }

  nuclearFlash() {
	this.container.classList.add('nuclear-flash');
	setTimeout(()=> this.container.classList.remove('nuclear-flash'), 500);
  }

  showEnergyRelease(energy) {
	const el = document.getElementById('releasedEnergy');
	el.textContent = `${energy.toFixed(1)} MeV`;
	el.style.color = '#10b981';
  }

  toggleSimulation() {
	this.isSimulating = !this.isSimulating;
	document.getElementById('simulateBtn').textContent = this.isSimulating ? '⏸️ Pausar' : '▶️ Simular';
  }

  reset() {
	this.currentElement = { protons:1, neutrons:0, name:'Hidrogênio', mass:'1.008' };
	document.getElementById('releasedEnergy').textContent = '0.0 MeV';
	this.updateCounters(); this.updateElementInfo(); this.buildAtom3D();
  }

  // ---------- LOOP ----------
  animate() {
	requestAnimationFrame(()=>this.animate());
	const dt = this.clock.getDelta();

	// rotação contínua quando simulando ou suavizada pela energia
	if (this.atomGroup) {
	  const spin = this.isSimulating ? this.rotationSpeed*1.6 : this.rotationSpeed*0.6;
	  this.atomGroup.rotation.y += spin;
	}

	// atualizar partículas (movimento + fade)
	for (let i = this.particleGroup.children.length - 1; i >= 0; i--) {
	  const p = this.particleGroup.children[i];
	  p.userData.life -= dt;
	  const v = p.userData.vel.clone().multiplyScalar(dt);
	  p.position.add(v);
	  const mat = p.material;
	  if (!mat.transparent) mat.transparent = true;
	  mat.opacity = Math.max(0, p.userData.life / 1.5);
	  if (p.userData.life <= 0) {
		this.particleGroup.remove(p);
		p.geometry.dispose(); p.material.dispose();
	  }
	}

	this.renderer.render(this.scene, this.camera);
  }
}

document.addEventListener('DOMContentLoaded', ()=> { new NuclearSimulator(); });
