<script>
  // ====== SISTEMA DE ABAS ======
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab') + '-tab';
      document.getElementById(tabId).classList.add('active');
    });
  });

  // ====== MÓDULO DE FÍSICA NUCLEAR ======
  let currentAtom = null;
  let atom1 = null;
  let atom2 = null;
  let fusionAttempt = null;

  const atomCanvas = document.getElementById('atomCanvas');
  const atomCtx = atomCanvas.getContext('2d');

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
      this.electronsInShell = null;
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
        duration: 120
      };
      this.electronsInShell = [...config];
      this.electronsInShell[outerShell]--;
      this.electronsInShell[outerShell + 1] = (this.electronsInShell[outerShell + 1] || 0) + 1;
    }

    emitPhoton() {
      console.log("Fóton emitido!");
    }

    draw() {
      atomCtx.clearRect(0, 0, atomCanvas.width, atomCanvas.height);
      const cx = atomCanvas.width / 2;
      const cy = atomCanvas.height / 2;

      const nucleusRadius = Math.max(12, 8 + Math.sqrt(this.massNumber));
      atomCtx.fillStyle = this.isStable ? '#10b981' : '#ef4444';
      atomCtx.beginPath();
      atomCtx.arc(cx, cy, nucleusRadius, 0, Math.PI * 2);
      atomCtx.fill();

      atomCtx.fillStyle = 'white';
      atomCtx.font = '12px monospace';
      atomCtx.textAlign = 'center';
      atomCtx.fillText(`${this.symbol}-${this.massNumber}`, cx, cy + 4);

      const config = this.electronsInShell || this.getElectronConfiguration();
      for (let shell = 0; shell < config.length; shell++) {
        const electronsHere = config[shell] || 0;
        if (electronsHere === 0) continue;
        const radius = 50 + shell * 40;
        atomCtx.strokeStyle = '#374151';
        atomCtx.setLineDash([3, 4]);
        atomCtx.beginPath();
        atomCtx.arc(cx, cy, radius, 0, Math.PI * 2);
        atomCtx.stroke();
        atomCtx.setLineDash([]);
        for (let i = 0; i < electronsHere; i++) {
          const angle = (i / electronsHere) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          atomCtx.fillStyle = '#8b5cf6';
          atomCtx.beginPath();
          atomCtx.arc(x, y, 4, 0, Math.PI * 2);
          atomCtx.fill();
        }
      }

      if (this.excitedElectron) {
        const { fromShell, toShell, progress, duration } = this.excitedElectron;
        const t = progress / duration;
        const radiusFrom = 50 + fromShell * 40;
        const radiusTo = 50 + toShell * 40;
        const currentRadius = radiusFrom + (radiusTo - radiusFrom) * t;
        const angle = -Math.PI / 2;
        const x = cx + Math.cos(angle) * currentRadius;
        const y = cy + Math.sin(angle) * currentRadius;
        if (t < 0.3) {
          atomCtx.strokeStyle = '#f59e0b';
          atomCtx.lineWidth = 2;
          atomCtx.beginPath();
          atomCtx.moveTo(cx, cy - 120);
          atomCtx.lineTo(x, y);
          atomCtx.stroke();
        }
        atomCtx.fillStyle = '#f59e0b';
        atomCtx.beginPath();
        atomCtx.arc(x, y, 5, 0, Math.PI * 2);
        atomCtx.fill();
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

  function reset() {
    currentAtom = null;
    atom1 = null;
    atom2 = null;
    fusionAttempt = null;
    document.getElementById('info').innerHTML = '';
    atomCtx.clearRect(0, 0, atomCanvas.width, atomCanvas.height);
    document.getElementById('protons').value = 1;
    document.getElementById('neutrons').value = 0;
    document.getElementById('electrons').value = 1;
  }

  function simulateFission() {
    if (!currentAtom || currentAtom.massNumber < 230) {
      alert("Fissão requer núcleos pesados (ex: Urânio-235). Tente Z=92, N=143.");
      return;
    }
    document.getElementById('info').innerHTML += `
      <hr>
      <p style="color:#ef4444"><strong>Fissão induzida!</strong></p>
      <p>U-235 + n → Kr-92 + Ba-141 + 3 nêutrons + ~200 MeV</p>
    `;
  }

  function simulateAlphaDecay() {
    if (!currentAtom || currentAtom.atomicNumber < 83) {
      alert("Decaimento Alpha ocorre em elementos pesados (Z ≥ 83). Tente Polônio-210.");
      return;
    }
    document.getElementById('info').innerHTML += `
      <hr>
      <p style="color:#f59e0b"><strong>Decaimento Alpha!</strong></p>
      <p>${currentAtom.symbol}-${currentAtom.massNumber} → ${getSymbol(currentAtom.atomicNumber - 2)}-${currentAtom.massNumber - 4} + α</p>
    `;
  }

  function simulateBetaDecay() {
    if (!currentAtom) {
      alert("Crie um átomo primeiro.");
      return;
    }
    document.getElementById('info').innerHTML += `
      <hr>
      <p style="color:#ef4444"><strong>Decaimento Beta!</strong></p>
      <p>n → p + e⁻ + ν̅ₑ</p>
    `;
  }

  function exportData() {
    if (!currentAtom) {
      alert("Crie um átomo primeiro para exportar dados.");
      return;
    }
    const data = {
      elemento: currentAtom.symbol,
      protons: currentAtom.protons,
      neutrons: currentAtom.neutrons,
      electrons: currentAtom.electrons,
      massa: currentAtom.massNumber,
      carga: currentAtom.charge,
      estavel: currentAtom.isStable
    };
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atom_${currentAtom.symbol}_${currentAtom.massNumber}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
      x2: atomCanvas.width - 100,
      v1: 2,
      v2: -2
    };
    animateFusion();
  }

  function drawMiniAtom(atom, x, y) {
    const r = 15;
    atomCtx.fillStyle = atom.isStable ? '#10b981' : '#ef4444';
    atomCtx.beginPath();
    atomCtx.arc(x, y, r, 0, Math.PI * 2);
    atomCtx.fill();
    atomCtx.fillStyle = 'white';
    atomCtx.font = '10px monospace';
    atomCtx.textAlign = 'center';
    atomCtx.fillText(atom.symbol, x, y + 4);
  }

  function animateFusion() {
    if (!fusionAttempt || !atom1 || !atom2) return;
    const { x1, x2, v1, v2 } = fusionAttempt;
    const distance = Math.abs(x2 - x1);
    const centerX = atomCanvas.width / 2;
    const centerY = atomCanvas.height / 2;
    atomCtx.clearRect(0, 0, atomCanvas.width, atomCanvas.height);
    drawMiniAtom(atom1, x1, centerY);
    drawMiniAtom(atom2, x2, centerY);
    const coulomb = (atom1.protons * atom2.protons) / (distance + 50);
    const threshold = 60;
    if (distance > threshold) {
      const newV1 = Math.max(0.1, v1 - coulomb * 0.02);
      const newV2 = Math.min(-0.1, v2 + coulomb * 0.02);
      fusionAttempt.v1 = newV1;
      fusionAttempt.v2 = newV2;
      fusionAttempt.x1 += newV1;
      fusionAttempt.x2 += newV2;
      atomCtx.strokeStyle = '#ef4444';
      atomCtx.setLineDash([4, 4]);
      atomCtx.beginPath();
      atomCtx.moveTo(x1 + 20, centerY);
      atomCtx.lineTo(x2 - 20, centerY);
      atomCtx.stroke();
      atomCtx.setLineDash([]);
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
        <p style="color:#10b981"><strong>FUSÃO ESTELAR!</strong></p>
        <p>${atom1?.symbol || 'H'} + ${atom2?.symbol || 'H'} → ${newAtom.symbol}-${newAtom.massNumber}</p>
      `;
      newAtom.draw();
    }
  }

  // ====== MÓDULO DE FÍSICA DE PARTÍCULAS ======
  // (Seu código existente de partículas permanece aqui, sem alterações)
  const particleCanvas = document.getElementById('particleCanvas');
  const particleCtx = particleCanvas.getContext('2d');
  let acceleratorRunning = false;
  let selectedParticle = 'proton';
  let magneticField = false;
  let calorimeter = false;

  class Particle {
    constructor(type, energy) {
      this.type = type;
      this.energy = energy;
      this.x = 50;
      this.y = particleCanvas.height / 2;
      this.vx = 2 + (energy / 10);
      this.radius = this.getRadius();
      this.color = this.getColor();
      this.trail = [];
      this.maxTrail = 20;
    }

    getRadius() {
      const sizes = {
        'proton': 6,
        'electron': 3,
        'alpha': 8,
        'photon': 4
      };
      return sizes[this.type] || 5;
    }

    getColor() {
      const colors = {
        'proton': '#4fc3f7',
        'electron': '#ff5252',
        'alpha': '#66bb6a',
        'photon': '#ffeb3b'
      };
      return colors[this.type] || '#ffffff';
    }

    update() {
      if (magneticField) {
        this.y += Math.sin(Date.now() * 0.01) * 0.5;
      }
      this.x += this.vx;
      this.trail.push({x: this.x, y: this.y});
      if (this.trail.length > this.maxTrail) {
        this.trail.shift();
      }
      return this.x < particleCanvas.width + 50;
    }

    draw() {
      for (let i = 0; i < this.trail.length; i++) {
        const point = this.trail[i];
        const alpha = i / this.trail.length;
        particleCtx.fillStyle = this.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
        particleCtx.beginPath();
        particleCtx.arc(point.x, point.y, this.radius * alpha, 0, Math.PI * 2);
        particleCtx.fill();
      }
      particleCtx.fillStyle = this.color;
      particleCtx.beginPath();
      particleCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      particleCtx.fill();
      if (this.energy > 20) {
        particleCtx.strokeStyle = this.color;
        particleCtx.lineWidth = 2;
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.radius + 3, 0, Math.PI * 2);
        particleCtx.stroke();
      }
    }
  }

  let particles = [];
  let collisionParticles = [];

  function startAccelerator() {
    acceleratorRunning = true;
    const energy = parseInt(document.getElementById('energySlider').value);
    const intensity = parseInt(document.getElementById('intensitySlider').value);
    addToLog(`Acelerador iniciado - Energia: ${energy} GeV, Intensidade: ${intensity}%`);
    function generateParticles() {
      if (!acceleratorRunning) return;
      const count = Math.floor(intensity / 25);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(selectedParticle, energy));
      }
      setTimeout(generateParticles, 1000 - (intensity * 8));
    }
    generateParticles();
    animateParticles();
  }

  function stopAccelerator() {
    acceleratorRunning = false;
    addToLog('Acelerador parado');
  }

  function selectParticle(type) {
    selectedParticle = type;
    const names = {
      'proton': 'Próton',
      'electron': 'Elétron', 
      'alpha': 'Partícula Alpha',
      'photon': 'Fóton'
    };
    addToLog(`Partícula selecionada: ${names[type]}`);
  }

  function collideParticles() {
    if (particles.length < 2) {
      addToLog('⚠️ Necessário pelo menos 2 partículas para colisão');
      return;
    }
    addToLog('💥 COLISÃO DETETADA! Gerando partículas secundárias...');
    const collisionX = particleCanvas.width / 2;
    const collisionY = particleCanvas.height / 2;
    const secondaryParticles = [
      new Particle('electron', 5),
      new Particle('photon', 8),
      new Particle('proton', 12)
    ];
    secondaryParticles.forEach(p => {
      p.x = collisionX;
      p.y = collisionY;
      p.vx = (Math.random() - 0.5) * 4;
      collisionParticles.push(p);
    });
    drawCollisionEffect(collisionX, collisionY);
  }

  function drawCollisionEffect(x, y) {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const angle = (i / 10) * Math.PI * 2;
        const spark = {
          x: x,
          y: y,
          vx: Math.cos(angle) * 3,
          vy: Math.sin(angle) * 3,
          life: 30
        };
        function animateSpark() {
          spark.x += spark.vx;
          spark.y += spark.vy;
          spark.life--;
          particleCtx.fillStyle = `rgba(255, 235, 59, ${spark.life / 30})`;
          particleCtx.beginPath();
          particleCtx.arc(spark.x, spark.y, 2, 0, Math.PI * 2);
          particleCtx.fill();
          if (spark.life > 0) {
            requestAnimationFrame(animateSpark);
          }
        }
        animateSpark();
      }, i * 50);
    }
  }

  function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    drawDetectors();
    particles = particles.filter(particle => {
      const alive = particle.update();
      if (alive) {
        particle.draw();
        if (particle.x > particleCanvas.width - 100 && particle.x < particleCanvas.width - 40) {
          if (Math.random() < 0.02) {
            addToLog(`📡 Partícula ${particle.type} detetada no calorímetro`);
          }
        }
      }
      return alive;
    });
    collisionParticles = collisionParticles.filter(particle => {
      particle.update();
      particle.draw();
      return particle.x > 0 && particle.x < particleCanvas.width && particle.y > 0 && particle.y < particleCanvas.height;
    });
    if (acceleratorRunning || particles.length > 0 || collisionParticles.length > 0) {
      requestAnimationFrame(animateParticles);
    }
  }

  function drawDetectors() {
    if (magneticField) {
      particleCtx.strokeStyle = 'rgba(79, 195, 247, 0.3)';
      particleCtx.setLineDash([5, 5]);
      particleCtx.beginPath();
      particleCtx.moveTo(0, particleCanvas.height / 3);
      particleCtx.lineTo(particleCanvas.width, particleCanvas.height / 3);
      particleCtx.moveTo(0, particleCanvas.height * 2/3);
      particleCtx.lineTo(particleCanvas.width, particleCanvas.height * 2/3);
      particleCtx.stroke();
      particleCtx.setLineDash([]);
    }
    if (calorimeter) {
      particleCtx.fillStyle = 'rgba(229, 115, 115, 0.2)';
      particleCtx.fillRect(particleCanvas.width - 100, 0, 60, particleCanvas.height);
    }
  }

  function toggleMagneticField() {
    magneticField = !magneticField;
    addToLog(`Campo magnético ${magneticField ? 'ativado' : 'desativado'}`);
  }

  function toggleCalorimeter() {
    calorimeter = !calorimeter;
    addToLog(`Calorímetro ${calorimeter ? 'ativado' : 'desativado'}`);
  }

  function resetDetectors() {
    magneticField = false;
    calorimeter = false;
    particles = [];
    collisionParticles = [];
    addToLog('Sistema de detetores resetado');
  }

  function analyzeEvent() {
    const analyses = [
      "📊 Análise: Bóson de Higgs detectado!",
      "📊 Análise: Quark top produzido",
      "📊 Análise: Decaimento de múon observado", 
      "📊 Análise: Jatos hadrônicos identificados",
      "📊 Análise: Fóton de alta energia"
    ];
    const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)];
    addToLog(randomAnalysis);
  }

  function addToLog(message) {
    const log = document.getElementById('particleLog');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
  }

  function clearLog() {
    document.getElementById('particleLog').innerHTML = '<div class="log-entry">Log limpo</div>';
  }

  // Inicializar sliders
  document.getElementById('energySlider').addEventListener('input', function(e) {
    document.getElementById('energyValue').textContent = e.target.value + ' GeV';
  });

  document.getElementById('intensitySlider').addEventListener('input', function(e) {
    document.getElementById('intensityValue').textContent = e.target.value + '%';
  });

  // Inicializar animação de partículas
  animateParticles();
</script>