// Estado global
let currentAtom = null;
let atom1 = null;
let atom2 = null;
let fusionAttempt = null;

const canvas = document.getElementById('atomCanvas');
const ctx = canvas.getContext('2d');

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
    this.excitedElectron = null;
    this.electronsInShell = null; // usado apenas durante excitação
    this.maxShells = 4;
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

  absorbPhoton() {
    if (this.excitedElectron || this.electrons <= 0) return;

    const config = this.getElectronConfiguration();
    let outerShell = -1;
    for (let i = config.length - 1; i >= 0; i--) {
      if (config[i] > 0) {
        outerShell = i;
        break;
      }
    }

    if (outerShell === -1 || outerShell >= this.maxShells - 1) return;

    this.excitedElectron = {
      fromShell: outerShell,
      toShell: outerShell + 1,
      progress: 0,
      duration: 120 // ~2 segundos a 60fps
    };

    this.electronsInShell = [...config];
    this.electronsInShell[outerShell]--;
    this.electronsInShell[outerShell + 1] = (this.electronsInShell[outerShell + 1] || 0) + 1;
  }

  emitPhoton() {
    console.log("Fóton emitido! Energia liberada.");
    // Aqui poderia haver efeito sonoro ou visual mais rico
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Núcleo
    const nucleusRadius = Math.max(12, 8 + Math.sqrt(this.massNumber));
    ctx.fillStyle = this.isStable ? '#4caf50' : '#f44336';
    ctx.beginPath();
    ctx.arc(cx, cy, nucleusRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.symbol}-${this.massNumber}`, cx, cy + 4);

    // Camadas e elétrons
    const config = this.electronsInShell || this.getElectronConfiguration();
    const limits = [2, 8, 18, 32];

    for (let shell = 0; shell < config.length; shell++) {
      const electronsHere = config[shell] || 0;
      if (electronsHere === 0) continue;

      const radius = 50 + shell * 40;

      // Órbita (tracejada)
      ctx.strokeStyle = '#333';
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Elétrons
      for (let i = 0; i < electronsHere; i++) {
        const angle = (i / electronsHere) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        ctx.fillStyle = '#bb86fc';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Animação de elétron excitado
    if (this.excitedElectron) {
      const { fromShell, toShell, progress, duration } = this.excitedElectron;
      const t = progress / duration;
      const radiusFrom = 50 + fromShell * 40;
      const radiusTo = 50 + toShell * 40;
      const currentRadius = radiusFrom + (radiusTo - radiusFrom) * t;

      const angle = -Math.PI / 2;
      const x = cx + Math.cos(angle) * currentRadius;
      const y = cy + Math.sin(angle) * currentRadius;

      // Fóton entrando (primeiros frames)
      if (t < 0.3) {
        ctx.strokeStyle = '#ffeb3b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 120);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      // Elétron excitado (laranja)
      ctx.fillStyle = '#ff5722';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      this.excitedElectron.progress++;
      if (this.excitedElectron.progress > duration) {
        this.emitPhoton();
        this.excitedElectron = null;
        this.electronsInShell = null;
      }
    }
  }
}

function getSymbol(z) {
  const symbols = {
    1: 'H', 2: 'He', 3: 'Li', 4: 'Be', 5: 'B', 6: 'C', 7: 'N', 8: 'O',
    9: 'F', 10: 'Ne', 11: 'Na', 12: 'Mg', 13: 'Al', 14: 'Si', 15: 'P',
    16: 'S', 17: 'Cl', 18: 'Ar', 26: 'Fe', 29: 'Cu', 79: 'Au', 92: 'U'
  };
  return symbols[z] || `El-${z}`;
}

// ====== CONTROLES PRINCIPAIS ======

function createAtom() {
  const p = parseInt(document.getElementById('protons').value) || 1;
  const n = parseInt(document.getElementById('neutrons').value) || 0;
  const e = parseInt(document.getElementById('electrons').value) || p;
  currentAtom = new Atom(p, n, e);
  document.getElementById('info').innerHTML = currentAtom.getInfo();
  currentAtom.draw();
}

function absorbPhoton() {
  if (!currentAtom) {
    alert("Crie um átomo primeiro.");
    return;
  }
  currentAtom.absorbPhoton();
  currentAtom.draw();
  // Animação contínua durante excitação
  if (currentAtom.excitedElectron) {
    const animate = () => {
      if (currentAtom && currentAtom.excitedElectron) {
        currentAtom.draw();
        requestAnimationFrame(animate);
      }
    };
    animate();
  }
}

// ====== FISSÃO ======

function simulateFission() {
  if (!currentAtom || currentAtom.massNumber < 230) {
    alert("Fissão requer núcleos pesados (ex: Urânio-235). Tente Z=92, N=143.");
    return;
  }
  document.getElementById('info').innerHTML += `
    <hr>
    <p style="color:#ff5252"><strong>Fissão induzida!</strong></p>
    <p>U-235 + n → Kr-92 + Ba-141 + 3 nêutrons + ~200 MeV</p>
    <p>Energia suficiente para iluminar uma casa por dias.</p>
  `;
}

// ====== FUSÃO ======

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
    x2: canvas.width - 100,
    v1: 2,
    v2: -2
  };
  animateFusion();
}

function drawMiniAtom(atom, x, y) {
  const r = 15;
  ctx.fillStyle = atom.isStable ? '#4caf50' : '#f44336';
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'white';
  ctx.font = '10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(atom.symbol, x, y + 4);
}

function animateFusion() {
  if (!fusionAttempt || !atom1 || !atom2) return;

  const { x1, x2, v1, v2 } = fusionAttempt;
  const distance = Math.abs(x2 - x1);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawMiniAtom(atom1, x1, centerY);
  drawMiniAtom(atom2, x2, centerY);

  // Barreira de Coulomb: força repulsiva ~ Z1*Z2 / r²
  const coulomb = (atom1.protons * atom2.protons) / (distance + 50);
  const threshold = 60; // distância mínima para fusão

  if (distance > threshold) {
    // Desaceleração devido à repulsão
    const newV1 = Math.max(0.1, v1 - coulomb * 0.02);
    const newV2 = Math.min(-0.1, v2 + coulomb * 0.02);
    fusionAttempt.v1 = newV1;
    fusionAttempt.v2 = newV2;
    fusionAttempt.x1 += newV1;
    fusionAttempt.x2 += newV2;

    // Linhas de campo elétrico
    ctx.strokeStyle = '#ff5252';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x1 + 20, centerY);
    ctx.lineTo(x2 - 20, centerY);
    ctx.stroke();
    ctx.setLineDash([]);

    requestAnimationFrame(animateFusion);
  } else {
    // Fusão bem-sucedida!
    const totalP = atom1.protons + atom2.protons;
    const totalN = atom1.neutrons + atom2.neutrons;
    const newAtom = new Atom(totalP, totalN, totalP); // assume neutro

    currentAtom = newAtom;
    fusionAttempt = null;
    atom1 = null;
    atom2 = null;

    document.getElementById('info').innerHTML += `
      <hr>
      <p style="color:#66bb6a"><strong>FUSÃO ESTELAR!</strong></p>
      <p>${atom1?.symbol || 'H'} + ${atom2?.symbol || 'H'} → ${newAtom.symbol}-${newAtom.massNumber}</p>
      <p>O cosmos cria. A humanidade observa.</p>
    `;
    newAtom.draw();
  }
}

function reset() {
  currentAtom = null;
  atom1 = null;
  atom2 = null;
  fusionAttempt = null;
  document.getElementById('info').innerHTML = '';
  
  // Limpa o canvas
  const ctx = document.getElementById('atomCanvas').getContext('2d');
  ctx.clearRect(0, 0, 400, 300);
  
  // Reseta os campos
  document.getElementById('protons').value = 1;
  document.getElementById('neutrons').value = 0;
  document.getElementById('electrons').value = 1;
}