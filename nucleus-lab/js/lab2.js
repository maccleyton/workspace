// Estado global
let currentAtom = null;
let atom1 = null;
let atom2 = null;
let fusionAttempt = null;

// Cena 3D
let scene, camera, renderer, nucleusGroup, electronGroups;

// Inicializa Three.js
function init3D() {
  const canvas = document.getElementById('atomCanvas');
  
  // Cena
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0e20);

  // Câmera
  camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 1000);
  camera.position.z = 200;

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.width, canvas.height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Luzes
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x4fc3f7, 1);
  pointLight.position.set(100, 100, 100);
  scene.add(pointLight);

  // Grupo para o átomo
  nucleusGroup = new THREE.Group();
  scene.add(nucleusGroup);

  electronGroups = [];
  for (let i = 0; i < 4; i++) {
    const group = new THREE.Group();
    scene.add(group);
    electronGroups.push(group);
  }

  // Animação contínua
  animate3D();
}

function animate3D() {
  requestAnimationFrame(animate3D);
  
  // Rotação suave do átomo
  if (nucleusGroup) {
    nucleusGroup.rotation.y += 0.005;
  }
  electronGroups.forEach((group, i) => {
    if (group.visible) {
      group.rotation.y += 0.01 / (i + 1);
    }
  });

  renderer.render(scene, camera);
}

// Classe Atom adaptada para 3D
class Atom {
  constructor(protons, neutrons, electrons) {
    this.protons = protons;
    this.neutrons = neutrons;
    this.electrons = electrons;
    this.massNumber = protons + neutrons;
    this.atomicNumber = protons;
    this.charge = protons - electrons;
    this.symbol = getSymbol(protons);
    this.isStable = neutrons >= protons && neutrons <= Math.floor(1.5 * protons + 5);
    this.config = this.getElectronConfiguration();
  }

  getInfo() {
    const chargeText = this.charge === 0 ? 'Neutro' :
                       this.charge > 0 ? `${this.charge}+` : `${Math.abs(this.charge)}-`;
    return `
      <p><strong>Elemento:</strong> ${this.symbol} (${this.atomicNumber})</p>
      <p><strong>Número de massa:</strong> ${this.massNumber}</p>
      <p><strong>Carga iônica:</strong> ${chargeText}</p>
      <p><strong>Estável?</strong> ${this.isStable ? 'Sim' : 'Radioativo!'}</p>
    `;
  }

  getElectronConfiguration() {
    const config = [];
    let remaining = this.electrons;
    const limits = [2, 8, 18, 32];
    for (let i = 0; i < limits.length && remaining > 0; i++) {
      config[i] = Math.min(remaining, limits[i]);
      remaining -= config[i];
    }
    return config;
  }

  draw() {
    // Limpa cena anterior
    while(nucleusGroup.children.length > 0) {
      nucleusGroup.remove(nucleusGroup.children[0]);
    }
    electronGroups.forEach(group => {
      group.visible = false;
      while(group.children.length > 0) {
        group.remove(group.children[0]);
      }
    });

    // Núcleo
    const nucleusRadius = Math.max(8, 5 + Math.sqrt(this.massNumber) * 0.8);
    const nucleusGeometry = new THREE.SphereGeometry(nucleusRadius, 16, 16);
    const nucleusMaterial = new THREE.MeshPhongMaterial({
      color: this.isStable ? 0x4caf50 : 0xf44336,
      emissive: this.isStable ? 0x2a5a2a : 0x5a2a2a,
      shininess: 80
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    nucleusGroup.add(nucleus);

    // Rótulo do núcleo
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 64;
    ctx.fillStyle = 'white';
    ctx.font = '20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.symbol}-${this.massNumber}`, 64, 40);
    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.SpriteMaterial({ map: texture });
    const label = new THREE.Sprite(labelMaterial);
    label.scale.set(40, 20, 1);
    label.position.y = nucleusRadius + 15;
    nucleusGroup.add(label);

    // Camadas eletrônicas
    const shellRadii = [40, 70, 100, 130];
    for (let shell = 0; shell < this.config.length; shell++) {
      const electronsHere = this.config[shell];
      if (electronsHere === 0) continue;

      const group = electronGroups[shell];
      group.visible = true;

      // Órbita (anel)
      const orbitGeometry = new THREE.RingGeometry(shellRadii[shell] - 2, shellRadii[shell] + 2, 64);
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x333355,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      group.add(orbit);

      // Elétrons
      for (let i = 0; i < electronsHere; i++) {
        const angle = (i / electronsHere) * Math.PI * 2;
        const x = Math.cos(angle) * shellRadii[shell];
        const z = Math.sin(angle) * shellRadii[shell];

        const electronGeometry = new THREE.SphereGeometry(4, 12, 12);
        const electronMaterial = new THREE.MeshPhongMaterial({
          color: 0xbb86fc,
          emissive: 0x4a2a6a,
          shininess: 90
        });
        const electron = new THREE.Mesh(electronGeometry, electronMaterial);
        electron.position.set(x, 0, z);
        group.add(electron);
      }
    }
  }
}

// Funções auxiliares (mantidas)
function getSymbol(z) {
  const symbols = {
    1: 'H', 2: 'He', 3: 'Li', 4: 'Be', 5: 'B', 6: 'C', 7: 'N', 8: 'O',
    9: 'F', 10: 'Ne', 11: 'Na', 12: 'Mg', 13: 'Al', 14: 'Si', 15: 'P',
    16: 'S', 17: 'Cl', 18: 'Ar', 26: 'Fe', 29: 'Cu', 79: 'Au', 92: 'U'
  };
  return symbols[z] || `El-${z}`;
}

// Controles (mantidos, mas agora chamam draw() 3D)
function createAtom() {
  const p = parseInt(document.getElementById('protons').value) || 1;
  const n = parseInt(document.getElementById('neutrons').value) || 0;
  const e = parseInt(document.getElementById('electrons').value) || p;
  currentAtom = new Atom(p, n, e);
  document.getElementById('info').innerHTML = currentAtom.getInfo();
  currentAtom.draw();
}

function reset() {
  currentAtom = null;
  atom1 = null;
  atom2 = null;
  fusionAttempt = null;
  document.getElementById('info').innerHTML = '';
  // Limpa cena 3D
  nucleusGroup.clear();
  electronGroups.forEach(g => {
    g.visible = false;
    g.clear();
  });
  document.getElementById('protons').value = 1;
  document.getElementById('neutrons').value = 0;
  document.getElementById('electrons').value = 1;
}

// Funções de fissão/fusão permanecem iguais (só atualizam o info)
function simulateFission() {
  if (!currentAtom || currentAtom.massNumber < 230) {
    alert("Fissão requer núcleos pesados (ex: Urânio-235). Tente Z=92, N=143.");
    return;
  }
  document.getElementById('info').innerHTML += `
    <hr>
    <p style="color:#ff5252"><strong>Fissão induzida!</strong></p>
    <p>U-235 + n → Kr-92 + Ba-141 + 3 nêutrons + ~200 MeV</p>
  `;
}

function startFusionMode() {
  if (!currentAtom) {
    alert("Crie um átomo primeiro.");
    return;
  }
  atom1 = currentAtom;
  alert(`Átomo 1 definido: ${atom1.symbol}-${atom1.massNumber}`);
}

function setAtom2() {
  if (!currentAtom) {
    alert("Crie o segundo átomo.");
    return;
  }
  if (!atom1) {
    alert("Defina o Átomo 1 primeiro.");
    return;
  }
  atom2 = currentAtom;
  fusionAttempt = {
    x1: 100,
    x2: 400, // largura do canvas
    v1: 2,
    v2: -2
  };
  animateFusion();
}

// Animação de fusão (2D simplificada, pois 3D complexo)
function animateFusion() {
  const canvas = document.getElementById('atomCanvas');
  const tempCtx = canvas.getContext('2d');
  tempCtx.clearRect(0, 0, canvas.width, canvas.height);
  
  const { x1, x2, v1, v2 } = fusionAttempt;
  const distance = Math.abs(x2 - x1);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Desenha átomos 2D temporários
  function drawTempAtom(x, atom) {
    tempCtx.fillStyle = atom.isStable ? '#4caf50' : '#f44336';
    tempCtx.beginPath();
    tempCtx.arc(x, centerY, 15, 0, Math.PI * 2);
    tempCtx.fill();
    tempCtx.fillStyle = 'white';
    tempCtx.font = '10px monospace';
    tempCtx.textAlign = 'center';
    tempCtx.fillText(atom.symbol, x, centerY + 4);
  }

  drawTempAtom(x1, atom1);
  drawTempAtom(x2, atom2);

  const coulomb = (atom1.protons * atom2.protons) / (distance + 50);
  const threshold = 60;

  if (distance > threshold) {
    const newV1 = Math.max(0.1, v1 - coulomb * 0.02);
    const newV2 = Math.min(-0.1, v2 + coulomb * 0.02);
    fusionAttempt.v1 = newV1;
    fusionAttempt.v2 = newV2;
    fusionAttempt.x1 += newV1;
    fusionAttempt.x2 += newV2;

    tempCtx.strokeStyle = '#ff5252';
    tempCtx.setLineDash([4, 4]);
    tempCtx.beginPath();
    tempCtx.moveTo(x1 + 20, centerY);
    tempCtx.lineTo(x2 - 20, centerY);
    tempCtx.stroke();
    tempCtx.setLineDash([]);

    requestAnimationFrame(animateFusion);
  } else {
    const totalP = atom1.protons + atom2.protons;
    const totalN = atom1.neutrons + atom2.neutrons;
    const newAtom = new Atom(totalP, totalN, totalP);
    currentAtom = newAtom;
    fusionAttempt = null;
    atom1 = null;
    atom2 = null;
    document.getElementById('info').innerHTML += `
      <hr>
      <p style="color:#66bb6a"><strong>FUSÃO ESTELAR!</strong></p>
      <p>${atom1?.symbol || 'H'} + ${atom2?.symbol || 'H'} → ${newAtom.symbol}-${newAtom.massNumber}</p>
    `;
    newAtom.draw(); // Volta para 3D!
  }
}

// Inicializa o 3D quando a página carrega
window.addEventListener('load', () => {
  init3D();
});