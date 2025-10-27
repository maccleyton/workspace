class OrganicChemistryLab {
	constructor() {
		this.canvas = document.getElementById('moleculeCanvas');
		this.atoms = [];
		this.bonds = [];
		this.currentMolecule = null;
		this.isomerType = 'structural';
		
		this.init();
		this.setupEventListeners();
		this.loadMoleculePreset('methane');
	}

	init() {
		this.updateDisplay();
	}

	setupEventListeners() {
		// Elementos
		document.querySelectorAll('.element-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const element = e.target.dataset.element;
				this.addAtom(element);
			});
		});

		// Grupos funcionais
		document.querySelectorAll('.group-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const group = e.target.dataset.group;
				this.addFunctionalGroup(group);
			});
		});

		// Moléculas pré-definidas
		document.querySelectorAll('.preset-btn[data-molecule]').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const molecule = e.target.dataset.molecule;
				this.loadMoleculePreset(molecule);
			});
		});

		// Reações
		document.querySelectorAll('.preset-btn[data-reaction]').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const reaction = e.target.dataset.reaction;
				this.simulateReaction(reaction);
			});
		});

		// Isômeros
		document.querySelectorAll('.isomer-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				document.querySelectorAll('.isomer-btn').forEach(b => b.classList.remove('active'));
				e.target.classList.add('active');
				this.isomerType = e.target.dataset.isomer;
				this.updateIsomerView();
			});
		});

		// Controles
		document.getElementById('clearBtn').addEventListener('click', () => this.clearCanvas());
		document.getElementById('optimizeBtn').addEventListener('click', () => this.optimizeGeometry());
		document.getElementById('analyzeBtn').addEventListener('click', () => this.analyzeMolecule());
		document.getElementById('reactBtn').addEventListener('click', () => this.simulateOrganicReaction());
		document.getElementById('resetBtn').addEventListener('click', () => this.resetLab());
		document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());

		// Análise espectral
		document.getElementById('irBtn').addEventListener('click', () => this.showIRSpectrum());
		document.getElementById('nmrBtn').addEventListener('click', () => this.showNMRSpectrum());
		document.getElementById('massBtn').addEventListener('click', () => this.showMassSpectrum());
	}

	loadMoleculePreset(molecule) {
		this.clearCanvas();
		
		const molecules = {
			'methane': this.createMethane.bind(this),
			'ethane': this.createEthane.bind(this),
			'ethene': this.createEthene.bind(this),
			'ethyne': this.createEthyne.bind(this),
			'benzene': this.createBenzene.bind(this),
			'ethanol': this.createEthanol.bind(this),
			'acetic-acid': this.createAceticAcid.bind(this),
			'glucose': this.createGlucose.bind(this)
		};

		if (molecules[molecule]) {
			molecules[molecule]();
			this.updateDisplay();
		}
	}

	createMethane() {
		const centerX = this.canvas.offsetWidth / 2;
		const centerY = this.canvas.offsetHeight / 2;
		
		// Carbono central
		const carbon = this.createAtom('C', centerX, centerY);
		
		// Hidrogênios em tetraedro
		const positions = [
			{ x: centerX - 80, y: centerY - 80 },
			{ x: centerX + 80, y: centerY - 80 },
			{ x: centerX, y: centerY + 80 },
			{ x: centerX, y: centerY - 160 }
		];
		
		positions.forEach(pos => {
			const hydrogen = this.createAtom('H', pos.x, pos.y);
			this.createBond(carbon, hydrogen, 'single');
		});
		
		this.currentMolecule = { name: 'Metano', formula: 'CH₄' };
	}

	createEthane() {
		const centerX = this.canvas.offsetWidth / 2;
		const centerY = this.canvas.offsetHeight / 2;
		
		// Dois carbonos
		const c1 = this.createAtom('C', centerX - 60, centerY);
		const c2 = this.createAtom('C', centerX + 60, centerY);
		this.createBond(c1, c2, 'single');
		
		// Hidrogênios
		const hPositions = [
			// Carbono 1
			{ atom: c1, x: centerX - 120, y: centerY - 40 },
			{ atom: c1, x: centerX - 120, y: centerY + 40 },
			{ atom: c1, x: centerX - 80, y: centerY - 80 },
			{ atom: c1, x: centerX - 80, y: centerY + 80 },
			// Carbono 2
			{ atom: c2, x: centerX + 120, y: centerY - 40 },
			{ atom: c2, x: centerX + 120, y: centerY + 40 },
			{ atom: c2, x: centerX + 80, y: centerY - 80 },
			{ atom: c2, x: centerX + 80, y: centerY + 80 }
		];
		
		hPositions.forEach(pos => {
			const hydrogen = this.createAtom('H', pos.x, pos.y);
			this.createBond(pos.atom, hydrogen, 'single');
		});
		
		this.currentMolecule = { name: 'Etano', formula: 'C₂H₆' };
	}

	createEthene() {
		const centerX = this.canvas.offsetWidth / 2;
		const centerY = this.canvas.offsetHeight / 2;
		
		// Dois carbonos com ligação dupla
		const c1 = this.createAtom('C', centerX - 50, centerY);
		const c2 = this.createAtom('C', centerX + 50, centerY);
		this.createBond(c1, c2, 'double');
		
		// Hidrogênios
		const hPositions = [
			{ atom: c1, x: centerX - 100, y: centerY - 40 },
			{ atom: c1, x: centerX - 100, y: centerY + 40 },
			{ atom: c2, x: centerX + 100, y: centerY - 40 },
			{ atom: c2, x: centerX + 100, y: centerY + 40 }
		];
		
		hPositions.forEach(pos => {
			const hydrogen = this.createAtom('H', pos.x, pos.y);
			this.createBond(pos.atom, hydrogen, 'single');
		});
		
		this.currentMolecule = { name: 'Eteno', formula: 'C₂H₄' };
	}

	createEthyne() {
		const centerX = this.canvas.offsetWidth / 2;
		const centerY = this.canvas.offsetHeight / 2;
		
		// Dois carbonos com ligação tripla
		const c1 = this.createAtom('C', centerX - 40, centerY);
		const c2 = this.createAtom('C', centerX + 40, centerY);
		this.createBond(c1, c2, 'triple');
		
		// Hidrogênios
		const h1 = this.createAtom('H', centerX - 100, centerY);
		const h2 = this.createAtom('H', centerX + 100, centerY);
		this.createBond(c1, h1, 'single');
		this.createBond(c2, h2, 'single');
		
		this.currentMolecule = { name: 'Etino', formula: 'C₂H₂' };
	}

	createBenzene() {
		const centerX = this.canvas.offsetWidth / 2;
		const centerY = this.canvas.offsetHeight / 2;
		const radius = 100;
		
		// Anel benzênico - 6 carbonos
		const carbons = [];
		for (let i = 0; i < 6; i++) {
			const angle = (i * 60 * Math.PI) / 180;
			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);
			carbons.push(this.createAtom('C', x, y));
		}
		
		// Ligações alternadas simples e duplas
		for (let i = 0; i < 6; i++) {
			const next = (i + 1) % 6;
			const bondType = i % 2 === 0 ? 'double' : 'single';
			this.createBond(carbons[i], carbons[next], bondType);
		}
		
		// Hidrogênios
		for (let i = 0; i < 6; i++) {
			const angle = (i * 60 * Math.PI) / 180;
			const x = centerX + (radius + 60) * Math.cos(angle);
			const y = centerY + (radius + 60) * Math.sin(angle);
			const hydrogen = this.createAtom('H', x, y);
			this.createBond(carbons[i], hydrogen, 'single');
		}
		
		this.currentMolecule = { name: 'Benzeno', formula: 'C₆H₆' };
	}

	createEthanol() {
		const centerX = this.canvas.offsetWidth / 2;
		const centerY = this.canvas.offsetHeight / 2;
		
		// Cadeia C-C-O
		const c1 = this.createAtom('C', centerX - 80, centerY);
		const c2 = this.createAtom('C', centerX, centerY);
		const o = this.createAtom('O', centerX + 80, centerY);
		
		this.createBond(c1, c2, 'single');
		this.createBond(c2, o, 'single');
		
		// Hidrogênios e grupo OH
		const h1 = this.createAtom('H', centerX - 120, centerY - 40);
		const h2 = this.createAtom('H', centerX - 120, centerY + 40);
		const h3 = this.createAtom('H', centerX - 60, centerY - 80);
		const h4 = this.createAtom('H', centerX + 20, centerY - 80);
		const h5 = this.createAtom('H', centerX + 20, centerY + 80);
		const oh = this.createAtom('H', centerX + 120, centerY - 40);
		
		this.createBond(c1, h1, 'single');
		this.createBond(c1, h2, 'single');
		this.createBond(c1, h3, 'single');
		this.createBond(c2, h4, 'single');
		this.createBond(c2, h5, 'single');
		this.createBond(o, oh, 'single');
		
		this.currentMolecule = { name: 'Etanol', formula: 'C₂H₅OH' };
	}

	createAceticAcid() {
		const centerX = this.canvas.offsetWidth / 2;
		const centerY = this.canvas.offsetHeight / 2;
		
		// Grupo carboxila
		const c1 = this.createAtom('C', centerX - 60, centerY);
		const c2 = this.createAtom('C', centerX + 40, centerY);
		const o1 = this.createAtom('O', centerX + 40, centerY - 80);
		const o2 = this.createAtom('O', centerX + 120, centerY);
		
		this.createBond(c1, c2, 'single');
		this.createBond(c2, o1, 'double');
		this.createBond(c2, o2, 'single');
		
		// Metil e hidrogênios
		const h1 = this.createAtom('H', centerX - 120, centerY - 40);
		const h2 = this.createAtom('H', centerX - 120, centerY + 40);
		const h3 = this.createAtom('H', centerX - 60, centerY + 80);
		const oh = this.createAtom('H', centerX + 160, centerY - 40);
		
		this.createBond(c1, h1, 'single');
		this.createBond(c1, h2, 'single');
		this.createBond(c1, h3, 'single');
		this.createBond(o2, oh, 'single');
		
		this.currentMolecule = { name: 'Ácido Acético', formula: 'CH₃COOH' };
	}

	createGlucose() {
		const centerX = this.canvas.offsetWidth / 2;
		const centerY = this.canvas.offsetHeight / 2;
		
		// Estrutura simplificada da glicose
		const atoms = [
			{ element: 'C', x: centerX - 120, y: centerY },
			{ element: 'C', x: centerX - 60, y: centerY - 60 },
			{ element: 'C', x: centerX, y: centerY },
			{ element: 'C', x: centerX + 60, y: centerY - 60 },
			{ element: 'C', x: centerX + 120, y: centerY },
			{ element: 'C', x: centerX + 60, y: centerY + 60 },
			{ element: 'O', x: centerX - 180, y: centerY },
			{ element: 'O', x: centerX - 60, y: centerY - 120 },
			{ element: 'O', x: centerX, y: centerY + 60 },
			{ element: 'O', x: centerX + 60, y: centerY - 120 },
			{ element: 'O', x: centerX + 180, y: centerY },
			{ element: 'O', x: centerX + 60, y: centerY + 120 }
		];
		
		const createdAtoms = atoms.map(atom => this.createAtom(atom.element, atom.x, atom.y));
		
		// Ligações principais
		for (let i = 0; i < 5; i++) {
			this.createBond(createdAtoms[i], createdAtoms[i + 1], 'single');
		}
		
		this.currentMolecule = { name: 'Glicose', formula: 'C₆H₁₂O₆' };
	}

	createAtom(element, x, y) {
		const atom = {
			id: Date.now() + Math.random(),
			element: element,
			x: x,
			y: y
		};

		this.atoms.push(atom);
		this.renderAtom(atom);
		return atom;
	}

	renderAtom(atom) {
		const atomEl = document.createElement('div');
		atomEl.className = `atom ${atom.element}`;
		atomEl.textContent = atom.element;
		atomEl.style.left = `${atom.x - parseInt(atomEl.style.width || 0)/2}px`;
		atomEl.style.top = `${atom.y - parseInt(atomEl.style.height || 0)/2}px`;
		atomEl.dataset.id = atom.id;

		// Drag and drop
		atomEl.addEventListener('mousedown', (e) => this.startDrag(e, atom));
		
		this.canvas.appendChild(atomEl);
		return atomEl;
	}

	startDrag(e, atom) {
		const atomEl = e.target;
		const startX = e.clientX;
		const startY = e.clientY;
		const startAtomX = atom.x;
		const startAtomY = atom.y;
		
		const moveHandler = (e) => {
			const dx = e.clientX - startX;
			const dy = e.clientY - startY;
			
			atom.x = startAtomX + dx;
			atom.y = startAtomY + dy;
			
			atomEl.style.left = `${atom.x - parseInt(atomEl.style.width || 0)/2}px`;
			atomEl.style.top = `${atom.y - parseInt(atomEl.style.height || 0)/2}px`;
			
			this.updateBonds(atom);
		};

		const upHandler = () => {
			document.removeEventListener('mousemove', moveHandler);
			document.removeEventListener('mouseup', upHandler);
		};

		document.addEventListener('mousemove', moveHandler);
		document.addEventListener('mouseup', upHandler);
	}

	createBond(atom1, atom2, type = 'single') {
		const bond = {
			atom1: atom1.id,
			atom2: atom2.id,
			type: type
		};
		
		this.bonds.push(bond);
		this.renderBond(bond);
		this.updateDisplay();
	}

	renderBond(bond) {
		const atom1 = this.atoms.find(a => a.id === bond.atom1);
		const atom2 = this.atoms.find(a => a.id === bond.atom2);
		
		if (!atom1 || !atom2) return;

		const bondEl = document.createElement('div');
		bondEl.className = `bond ${bond.type}`;
		
		const x1 = atom1.x;
		const y1 = atom1.y;
		const x2 = atom2.x;
		const y2 = atom2.y;
		
		const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
		const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
		
		bondEl.style.width = `${length}px`;
		bondEl.style.left = `${x1}px`;
		bondEl.style.top = `${y1}px`;
		bondEl.style.transform = `rotate(${angle}deg)`;
		bondEl.style.height = bond.type === 'single' ? '3px' : '6px';
		
		this.canvas.appendChild(bondEl);
	}

	updateBonds(atom) {
		// Remove e recria todas as ligações do átomo
		this.bonds = this.bonds.filter(bond => 
			bond.atom1 !== atom.id && bond.atom2 !== atom.id
		);
		
		// Recria ligações baseadas na proximidade
		this.atoms.forEach(otherAtom => {
			if (otherAtom.id !== atom.id) {
				const dx = atom.x - otherAtom.x;
				const dy = atom.y - otherAtom.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				if (distance < 100) {
					this.createBond(atom, otherAtom, 'single');
				}
			}
		});
	}

	addFunctionalGroup(group) {
		// Implementação simplificada de grupos funcionais
		const groupInfo = {
			'hydroxyl': { elements: ['O', 'H'], bonds: ['single', 'single'] },
			'carbonyl': { elements: ['O'], bonds: ['double'] },
			'carboxyl': { elements: ['C', 'O', 'O', 'H'], bonds: ['double', 'single', 'single'] },
			'amino': { elements: ['N', 'H', 'H'], bonds: ['single', 'single', 'single'] }
		};

		if (groupInfo[group]) {
			// Adiciona grupo funcional à molécula existente
			const lastAtom = this.atoms[this.atoms.length - 1];
			if (lastAtom) {
				groupInfo[group].elements.forEach((element, index) => {
					const x = lastAtom.x + (index + 1) * 80;
					const y = lastAtom.y + (index % 2 === 0 ? -40 : 40);
					const newAtom = this.createAtom(element, x, y);
					this.createBond(lastAtom, newAtom, groupInfo[group].bonds[index] || 'single');
				});
			}
		}
	}

	simulateReaction(reaction) {
		this.canvas.classList.add('reaction-flash');
		
		setTimeout(() => {
			this.canvas.classList.remove('reaction-flash');
			
			// Efeitos visuais da reação
			switch(reaction) {
				case 'combustion':
					this.showReactionInfo('Combustão: Liberação de CO₂ + H₂O + Energia');
					break;
				case 'substitution':
					this.showReactionInfo('Substituição: Troca de grupos funcionais');
					break;
				case 'addition':
					this.showReactionInfo('Adição: Quebra de ligação π e adição de átomos');
					break;
				case 'elimination':
					this.showReactionInfo('Eliminação: Formação de ligação dupla');
					break;
				case 'esterification':
					this.showReactionInfo('Esterificação: Ácido + Álcool → Éster + Água');
					break;
			}
		}, 500);
	}

	simulateOrganicReaction() {
		// Simula uma reação orgânica genérica
		if (this.atoms.length >= 2) {
			this.canvas.classList.add('reaction-flash');
			
			setTimeout(() => {
				// Modifica aleatoriamente algumas ligações
				this.bonds.forEach(bond => {
					if (Math.random() > 0.7) {
						bond.type = bond.type === 'single' ? 'double' : 'single';
					}
				});
				
				this.clearCanvas();
				this.atoms.forEach(atom => this.renderAtom(atom));
				this.bonds.forEach(bond => this.renderBond(bond));
				this.canvas.classList.remove('reaction-flash');
				
				this.showReactionInfo('Reação orgânica simulada: Rearranjo molecular ocorrido');
			}, 1000);
		}
	}

	optimizeGeometry() {
		// Simula otimização da geometria molecular
		this.atoms.forEach(atom => {
			atom.x += (Math.random() - 0.5) * 20;
			atom.y += (Math.random() - 0.5) * 20;
		});
		
		this.clearCanvas();
		this.atoms.forEach(atom => this.renderAtom(atom));
		this.bonds.forEach(bond => this.renderBond(bond));
		
		this.showReactionInfo('Geometria molecular otimizada');
	}

	analyzeMolecule() {
		if (this.atoms.length === 0) return;
		
		const elements = {};
		this.atoms.forEach(atom => {
			elements[atom.element] = (elements[atom.element] || 0) + 1;
		});
		
		let formula = '';
		for (const [element, count] of Object.entries(elements)) {
			formula += element + (count > 1 ? count : '');
		}
		
		document.getElementById('moleculeFormula').textContent = formula;
		document.getElementById('moleculeName').textContent = this.currentMolecule?.name || 'Composto Orgânico';
		
		// Calcula propriedades
		const masses = { H: 1, C: 12, O: 16, N: 14, Cl: 35.5, S: 32, P: 31, F: 19, Br: 80 };
		let mass = 0;
		for (const [element, count] of Object.entries(elements)) {
			mass += masses[element] * count;
		}
		document.getElementById('moleculeMass').textContent = mass.toFixed(1) + ' g/mol';
		
		// Determina propriedades físicas baseadas na massa e composição
		document.getElementById('meltingPoint').textContent = this.calculateMeltingPoint(elements);
		document.getElementById('boilingPoint').textContent = this.calculateBoilingPoint(elements);
		document.getElementById('solubility').textContent = this.calculateSolubility(elements);
		document.getElementById('polarity').textContent = this.calculatePolarity(elements);
		document.getElementById('hybridization').textContent = this.determineHybridization();
		
		document.getElementById('bondCount').textContent = this.bonds.length;
		document.getElementById('functionalGroups').textContent = this.detectFunctionalGroups();
	}

	calculateMeltingPoint(elements) {
		const baseMP = elements['C'] * 10 + (elements['O'] || 0) * 5;
		return (baseMP + Math.random() * 50).toFixed(1) + ' °C';
	}

	calculateBoilingPoint(elements) {
		const baseBP = elements['C'] * 20 + (elements['O'] || 0) * 10;
		return (baseBP + Math.random() * 100).toFixed(1) + ' °C';
	}

	calculateSolubility(elements) {
		const oxygenCount = elements['O'] || 0;
		if (oxygenCount > 2) return 'Alta (polar)';
		if (oxygenCount > 0) return 'Moderada';
		return 'Baixa (apolar)';
	}

	calculatePolarity(elements) {
		const heteroatoms = (elements['O'] || 0) + (elements['N'] || 0) + (elements['Cl'] || 0);
		return heteroatoms > 0 ? 'Polar' : 'Apolar';
	}

	determineHybridization() {
		const carbonCount = this.atoms.filter(a => a.element === 'C').length;
		if (carbonCount === 0) return '-';
		
		// Lógica simplificada de hibridação
		const hasDoubleBonds = this.bonds.some(b => b.type === 'double');
		const hasTripleBonds = this.bonds.some(b => b.type === 'triple');
		
		if (hasTripleBonds) return 'sp';
		if (hasDoubleBonds) return 'sp²';
		return 'sp³';
	}

	detectFunctionalGroups() {
		const groups = [];
		const oxygenCount = this.atoms.filter(a => a.element === 'O').length;
		const nitrogenCount = this.atoms.filter(a => a.element === 'N').length;
		
		if (oxygenCount >= 2) groups.push('Carboxila');
		else if (oxygenCount >= 1) groups.push('Hidroxila/Carbonila');
		if (nitrogenCount >= 1) groups.push('Amino');
		
		return groups.length > 0 ? groups.join(', ') : 'Alcano';
	}

	updateIsomerView() {
		const info = {
			'structural': 'Isômeros estruturais mostrados - mesma fórmula, diferente conectividade',
			'geometric': 'Isômeros geométricos (cis/trans) - diferente arranjo espacial',
			'optical': 'Isômeros ópticos - atividade óptica diferente'
		};
		
		document.getElementById('isomerInfo').textContent = info[this.isomerType];
	}

	showIRSpectrum() {
		alert('📊 ESPECTRO IR (INFRAVERMELHO)\n\n• 3300 cm⁻¹: OH ou NH\n• 1700 cm⁻¹: Carbonila (C=O)\n• 1600 cm⁻¹: Anel aromático\n• 2900 cm⁻¹: CH (alifático)');
	}

	showNMRSpectrum() {
		alert('🧲 ESPECTRO NMR (RESSONÂNCIA MAGNÉTICA)\n\n• 0-2 ppm: CH₃ grupos\n• 2-3 ppm: CH₂ grupos\n• 4-5 ppm: Solvente CDCl₃\n• 6-8 ppm: Aromáticos');
	}

	showMassSpectrum() {
		alert('⚖️ ESPECTROMETRIA DE MASSA\n\n• Pico molecular: Massa exata da molécula\n• Picos fragmentação: Quebras características\n• Isotopólogos: Padrão Cl/Br visível');
	}

	showReactionInfo(message) {
		const oldEquation = document.getElementById('moleculeName').textContent;
		document.getElementById('moleculeName').textContent = message;
		document.getElementById('moleculeName').style.color = '#10b981';
		
		setTimeout(() => {
			document.getElementById('moleculeName').textContent = oldEquation;
			document.getElementById('moleculeName').style.color = '';
		}, 3000);
	}

	clearCanvas() {
		this.canvas.innerHTML = '';
		this.atoms = [];
		this.bonds = [];
		this.updateDisplay();
	}

	resetLab() {
		this.clearCanvas();
		this.currentMolecule = null;
		document.getElementById('moleculeName').textContent = 'Nenhuma molécula carregada';
		document.getElementById('moleculeFormula').textContent = '-';
		document.getElementById('moleculeMass').textContent = '-';
		document.getElementById('bondCount').textContent = '0';
		document.getElementById('functionalGroups').textContent = '-';
		document.getElementById('meltingPoint').textContent = '-';
		document.getElementById('boilingPoint').textContent = '-';
		document.getElementById('solubility').textContent = '-';
		document.getElementById('polarity').textContent = '-';
		document.getElementById('hybridization').textContent = '-';
	}

	updateDisplay() {
		document.getElementById('atomCount').textContent = this.atoms.length;
		document.getElementById('totalBonds').textContent = this.bonds.length;
		
		if (this.currentMolecule) {
			document.getElementById('moleculeName').textContent = this.currentMolecule.name;
		}
	}

	showHelp() {
		alert(`🧬 GUIA DO LABORATÓRIO ORGÂNICO:

		1. 🎯 MOLÉCULAS PRÉ-DEFINIDAS: Clique nos exemplos para carregar estruturas complexas
		2. ⚗️ GRUPOS FUNCIONAIS: Adicione grupos específicos à sua molécula
		3. 🔗 LIGAÇÕES: Arraste átomos para perto para formar ligações automáticas
		4. 🔄 ISOMERIA: Visualize diferentes tipos de isômeros
		5. 💥 REAÇÕES: Simule reações orgânicas comuns
		6. 🔍 ANÁLISE: Obtenha propriedades físicas e espectros

		EXPERIMENTE:
		• Criar diferentes hidrocarbonetos
		• Adicionar grupos funcionais
		• Visualizar isômeros geométricos
		• Analisar propriedades físicas`);
	}
}

// Inicializar laboratório de orgânica
document.addEventListener('DOMContentLoaded', () => {
	new OrganicChemistryLab();
});
