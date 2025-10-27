class ThermodynamicsLab {
	constructor() {
		this.simulationArea = document.getElementById('simulationArea');
		this.isRunning = false;
		this.currentSystem = 'engine';
		this.currentProcess = 'isothermal';
		
		// Estado do sistema
		this.state = {
			temperature: 450, // K
			pressure: 100,    // kPa
			volume: 1.0,      // m³
			hotTemp: 600,     // K
			coldTemp: 300,    // K
			n: 1,             // moles
			R: 8.314          // J/mol·K
		};

		this.init();
		this.setupEventListeners();
		this.createGasParticles();
		this.startHeatFlow();
		this.updateDisplay();
	}

	init() {
		this.calculateState();
		this.updateDiagram();
	}

	setupEventListeners() {
		// Sistemas térmicos
		document.querySelectorAll('.system-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				document.querySelectorAll('.system-btn').forEach(b => b.classList.remove('active'));
				e.target.classList.add('active');
				this.currentSystem = e.target.dataset.system;
				this.switchSystem();
			});
		});

		// Processos
		document.querySelectorAll('.process-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				document.querySelectorAll('.process-btn').forEach(b => b.classList.remove('active'));
				e.target.classList.add('active');
				this.currentProcess = e.target.dataset.process;
				this.updateProcess();
			});
		});

		// Leis da termodinâmica
		document.querySelectorAll('.law-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				this.explainLaw(e.target.dataset.law);
			});
		});

		// Experimentos
		document.querySelectorAll('.process-btn[data-experiment]').forEach(btn => {
			btn.addEventListener('click', (e) => {
				this.runExperiment(e.target.dataset.experiment);
			});
		});

		// Sliders de controle
		document.getElementById('hotTempSlider').addEventListener('input', (e) => {
			this.state.hotTemp = parseInt(e.target.value);
			document.getElementById('hotTempValue').textContent = this.state.hotTemp + ' K';
			this.calculateState();
		});

		document.getElementById('coldTempSlider').addEventListener('input', (e) => {
			this.state.coldTemp = parseInt(e.target.value);
			document.getElementById('coldTempValue').textContent = this.state.coldTemp + ' K';
			this.calculateState();
		});

		document.getElementById('pressureSlider').addEventListener('input', (e) => {
			this.state.pressure = parseInt(e.target.value);
			document.getElementById('pressureValue').textContent = this.state.pressure + ' kPa';
			this.calculateState();
		});

		document.getElementById('volumeSlider').addEventListener('input', (e) => {
			this.state.volume = parseFloat(e.target.value);
			document.getElementById('volumeValue').textContent = this.state.volume.toFixed(1) + ' m³';
			this.calculateState();
		});

		// Controles de simulação
		document.getElementById('startBtn').addEventListener('click', () => this.startSimulation());
		document.getElementById('stopBtn').addEventListener('click', () => this.stopSimulation());
		document.getElementById('resetBtn').addEventListener('click', () => this.resetSystem());
		document.getElementById('analyzeBtn').addEventListener('click', () => this.analyzeSystem());
		document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());
		document.getElementById('dataBtn').addEventListener('click', () => this.showData());
	}

	calculateState() {
		// Equação do gás ideal: PV = nRT
		const { pressure, volume, n, R } = this.state;
		this.state.temperature = (pressure * volume) / (n * R) * 1000; // Convertendo para K

		// Cálculos de energia
		const Cv = (3/2) * R; // Capacidade calorífica a volume constante (gás monoatômico)
		this.internalEnergy = n * Cv * this.state.temperature;
		
		// Cálculos de eficiência para máquina térmica
		this.heatInput = n * R * this.state.hotTemp * Math.log(this.state.volume);
		this.heatOutput = n * R * this.state.coldTemp * Math.log(this.state.volume);
		this.workDone = this.heatInput - this.heatOutput;
		this.efficiency = (this.workDone / this.heatInput) * 100;
		this.carnotEfficiency = (1 - this.state.coldTemp / this.state.hotTemp) * 100;
		this.entropy = this.heatOutput / this.state.coldTemp - this.heatInput / this.state.hotTemp;

		this.updateDisplay();
	}

	updateDisplay() {
		// Atualizar displays principais
		document.getElementById('systemTemp').textContent = Math.round(this.state.temperature) + ' K';
		document.getElementById('internalEnergy').textContent = Math.round(this.internalEnergy) + ' J';
		document.getElementById('heatIn').textContent = Math.round(this.heatInput) + ' J';
		document.getElementById('heatOut').textContent = Math.round(this.heatOutput) + ' J';
		document.getElementById('workDone').textContent = Math.round(this.workDone) + ' J';
		document.getElementById('efficiency').textContent = this.efficiency.toFixed(1) + '%';
		document.getElementById('entropy').textContent = this.entropy.toFixed(2) + ' J/K';
		document.getElementById('carnotEfficiency').textContent = this.carnotEfficiency.toFixed(1) + '%';
		document.getElementById('netWork').textContent = Math.round(this.workDone) + ' J';

		// Atualizar status bar
		document.getElementById('statusTemp').textContent = Math.round(this.state.temperature) + ' K';
		document.getElementById('statusPressure').textContent = this.state.pressure + ' kPa';
		document.getElementById('statusVolume').textContent = this.state.volume.toFixed(1) + ' m³';
	}

	createGasParticles() {
		const container = document.getElementById('gasParticles');
		container.innerHTML = '';
		
		// Criar partículas de gás
		for (let i = 0; i < 20; i++) {
			const particle = document.createElement('div');
			particle.className = 'gas-particle';
			particle.style.left = Math.random() * 100 + 'px';
			particle.style.bottom = Math.random() * 100 + 'px';
			particle.style.animationDelay = Math.random() * 2 + 's';
			container.appendChild(particle);
		}
	}

	startHeatFlow() {
		// Criar partículas de calor subindo
		setInterval(() => {
			if (this.isRunning) {
				this.createHeatParticle();
				this.createColdParticle();
			}
		}, 500);
	}

	createHeatParticle() {
		const particle = document.createElement('div');
		particle.className = 'heat-particle';
		
		const heatSource = document.getElementById('heatSource');
		const rect = heatSource.getBoundingClientRect();
		const containerRect = this.simulationArea.getBoundingClientRect();
		
		particle.style.left = (rect.left - containerRect.left + Math.random() * rect.width) + 'px';
		particle.style.bottom = (rect.top - containerRect.top) + 'px';
		particle.style.animationDelay = Math.random() * 2 + 's';
		
		this.simulationArea.appendChild(particle);
		
		setTimeout(() => {
			if (particle.parentNode) {
				particle.parentNode.removeChild(particle);
			}
		}, 3000);
	}

	createColdParticle() {
		const particle = document.createElement('div');
		particle.className = 'cold-particle';
		
		const coldSink = document.getElementById('coldSink');
		const rect = coldSink.getBoundingClientRect();
		const containerRect = this.simulationArea.getBoundingClientRect();
		
		particle.style.left = (rect.left - containerRect.left + Math.random() * rect.width) + 'px';
		particle.style.top = (rect.bottom - containerRect.top) + 'px';
		particle.style.animationDelay = Math.random() * 2 + 's';
		
		this.simulationArea.appendChild(particle);
		
		setTimeout(() => {
			if (particle.parentNode) {
				particle.parentNode.removeChild(particle);
			}
		}, 3000);
	}

	startSimulation() {
		this.isRunning = true;
		document.getElementById('piston').classList.add('piston-moving');
		document.getElementById('crankShaft').classList.add('crank-rotating');
		
		// Atualizar diagrama continuamente
		this.simulationInterval = setInterval(() => {
			this.updateDiagram();
		}, 100);
	}

	stopSimulation() {
		this.isRunning = false;
		document.getElementById('piston').classList.remove('piston-moving');
		document.getElementById('crankShaft').classList.remove('crank-rotating');
		
		if (this.simulationInterval) {
			clearInterval(this.simulationInterval);
		}
	}

	resetSystem() {
		this.stopSimulation();
		this.state = {
			temperature: 450,
			pressure: 100,
			volume: 1.0,
			hotTemp: 600,
			coldTemp: 300,
			n: 1,
			R: 8.314
		};
		
		document.getElementById('hotTempSlider').value = 600;
		document.getElementById('coldTempSlider').value = 300;
		document.getElementById('pressureSlider').value = 100;
		document.getElementById('volumeSlider').value = 1.0;
		
		document.getElementById('hotTempValue').textContent = '600 K';
		document.getElementById('coldTempValue').textContent = '300 K';
		document.getElementById('pressureValue').textContent = '100 kPa';
		document.getElementById('volumeValue').textContent = '1.0 m³';
		
		this.calculateState();
		this.updateDiagram();
	}

	switchSystem() {
		// Alterar comportamento baseado no sistema selecionado
		switch(this.currentSystem) {
			case 'engine':
				this.showMessage('Máquina Térmica: Convertendo calor em trabalho');
				break;
			case 'refrigerator':
				this.showMessage('Refrigerador: Transferindo calor do reservatório frio para o quente');
				break;
			case 'gas-chamber':
				this.showMessage('Câmara de Gás Ideal: Estudando comportamento PVT');
				break;
			case 'heat-pump':
				this.showMessage('Bomba de Calor: Aquecimento eficiente');
				break;
		}
		this.updateDiagram();
	}

	updateProcess() {
		// Atualizar diagrama PV baseado no processo
		const path = document.getElementById('cyclePath');
		let d = '';
		
		switch(this.currentProcess) {
			case 'isothermal':
				d = 'M50,120 Q100,80 150,120 L150,30 Q100,70 50,30 Z';
				this.showMessage('Processo Isotérmico: Temperatura constante');
				break;
			case 'adiabatic':
				d = 'M50,120 C80,100 120,100 150,120 L150,30 C120,50 80,50 50,30 Z';
				this.showMessage('Processo Adiabático: Sem transferência de calor');
				break;
			case 'isobaric':
				d = 'M50,120 L150,120 L150,30 L50,30 Z';
				this.showMessage('Processo Isobárico: Pressão constante');
				break;
			case 'isochoric':
				d = 'M50,120 L50,30 L150,30 L150,120 Z';
				this.showMessage('Processo Isocórico: Volume constante');
				break;
			case 'carnot':
				d = 'M50,120 L150,120 L150,30 L50,30 Z';
				this.showMessage('Ciclo de Carnot: Eficiência máxima teórica');
				break;
		}
		
		path.setAttribute('d', d);
	}

	updateDiagram() {
		// Atualizar diagrama PV dinamicamente baseado no estado
		if (this.isRunning) {
			// Simular variações no ciclo
			const time = Date.now() / 1000;
			const variation = Math.sin(time) * 0.2 + 1;
			
			// Atualizar caminho do diagrama
			this.updateProcess();
		}
	}

	analyzeSystem() {
		const analysis = `
		🔍 ANÁLISE TERMODINÂMICA:

		Sistema: ${this.currentSystem.toUpperCase()}
		Processo: ${this.currentProcess.toUpperCase()}

		📊 ESTADO ATUAL:
		• Temperatura: ${Math.round(this.state.temperature)} K
		• Pressão: ${this.state.pressure} kPa
		• Volume: ${this.state.volume.toFixed(2)} m³
		• Energia Interna: ${Math.round(this.internalEnergy)} J

		💫 FLUXOS ENERGÉTICOS:
		• Calor Entrada: ${Math.round(this.heatInput)} J
		• Calor Saída: ${Math.round(this.heatOutput)} J
		• Trabalho Realizado: ${Math.round(this.workDone)} J

		⚖️ EFICIÊNCIA:
		• Eficiência Atual: ${this.efficiency.toFixed(1)}%
		• Eficiência de Carnot: ${this.carnotEfficiency.toFixed(1)}%
		• Entropia Gerada: ${this.entropy.toFixed(2)} J/K

		📈 OBSERVAÇÕES:
		${this.getSystemObservations()}
		`;
		
		alert(analysis);
	}

	getSystemObservations() {
		const observations = {
			'engine': '• Máquina convertendo calor em trabalho útil\n• Segue o ciclo termodinâmico selecionado\n• Eficiência limitada pela 2ª Lei',
			'refrigerator': '• Transferindo calor contra gradiente térmico\n• Consome trabalho para mover calor\n• Coeficiente de performance variável',
			'gas-chamber': '• Comportamento de gás ideal\n• Segue equação PV = nRT\n• Estudo de processos quasi-estáticos',
			'heat-pump': '• Bombeando calor para aquecimento\n• Mais eficiente que resistência elétrica\n• Performance depende da temperatura externa'
		};
		
		return observations[this.currentSystem] || 'Sistema em operação normal.';
	}

	explainLaw(law) {
		const explanations = {
			'zeroth': `⚖️ 0ª LEI DA TERMODINÂMICA - EQUILÍBRIO TÉRMICO

			"Dois sistemas em equilíbrio térmico com um terceiro estão em equilíbrio térmico entre si."

			• Define o conceito de temperatura
			• Base para medições térmicas
			• Permite uso de termômetros`,

			'first': `⚡ 1ª LEI DA TERMODINÂMICA - CONSERVAÇÃO DE ENERGIA

			"ΔU = Q - W (Variação da energia interna = Calor adicionado - Trabalho realizado)"

			• Energia não pode ser criada nem destruída
			• Calor e trabalho são formas de transferência
			• Fundamenta máquinas térmicas`,

			'second': `📈 2ª LEI DA TERMODINÂMICA - ENTROPIA

			"A entropia de um sistema isolado nunca diminui."

			• Define a direção dos processos naturais
			• Limita a eficiência de máquinas térmicas
			• Estabelece a irreversibilidade`,

			'third': `❄️ 3ª LEI DA TERMODINÂMICA - ZERO ABSOLUTO

			"À medida que a temperatura se aproxima do zero absoluto, a entropia de um sistema se aproxima de um valor constante mínimo."

			• Entropia é zero no zero absoluto
			• Impossibilidade de atingir 0K
			• Base para criogenia`
		};
		
		alert(explanations[law]);
	}

	runExperiment(experiment) {
		const experiments = {
			'efficiency': this.runEfficiencyExperiment.bind(this),
			'expansion': this.runExpansionExperiment.bind(this),
			'mixing': this.runMixingExperiment.bind(this),
			'heat-transfer': this.runHeatTransferExperiment.bind(this)
		};
		
		if (experiments[experiment]) {
			experiments[experiment]();
		}
	}

	runEfficiencyExperiment() {
		this.stopSimulation();
		this.showMessage('Experimento: Maximizando Eficiência');
		
		// Otimizar para eficiência máxima
		this.state.hotTemp = 800;
		this.state.coldTemp = 300;
		document.getElementById('hotTempSlider').value = 800;
		document.getElementById('hotTempValue').textContent = '800 K';
		
		this.calculateState();
		this.startSimulation();
		
		setTimeout(() => {
			alert(`🎯 EXPERIMENTO DE EFICIÊNCIA MÁXIMA

			Configuração Otimizada:
			• T_quente = 800 K
			• T_fria = 300 K
			• Eficiência de Carnot: ${this.carnotEfficiency.toFixed(1)}%

			Observação: A eficiência aumenta com maior diferença de temperatura entre reservatórios.`);
		}, 2000);
	}

	runExpansionExperiment() {
		this.showMessage('Experimento: Expansão Livre de Gás');
		
		// Simular expansão livre
		const originalVolume = this.state.volume;
		this.state.volume = 2.0;
		document.getElementById('volumeSlider').value = 2.0;
		document.getElementById('volumeValue').textContent = '2.0 m³';
		
		this.calculateState();
		
		alert(`💨 EXPANSÃO LIVRE DO GÁS

		Antes da Expansão:
		• Volume: ${originalVolume.toFixed(1)} m³
		• Temperatura: ${Math.round(this.state.temperature * originalVolume / this.state.volume)} K

		Após Expansão:
		• Volume: ${this.state.volume.toFixed(1)} m³  
		• Temperatura: ${Math.round(this.state.temperature)} K

		Observação: Na expansão livre, a temperatura permanece constante (processo isotérmico).`);
	}

	runMixingExperiment() {
		this.showMessage('Experimento: Mistura de Gases Diferentes');
		
		alert(`🔄 MISTURA DE GASES

		Simulação de dois gases ideais se misturando:

		Gás A (Nitrogênio):
		• Temperatura: 400 K
		• Pressão: 150 kPa

		Gás B (Oxigênio):
		• Temperatura: 300 K  
		• Pressão: 100 kPa

		Após Mistura:
		• Temperatura de Equilíbrio: 350 K
		• Pressão Final: 125 kPa

		Observação: A temperatura final é a média ponderada pelas capacidades caloríficas.`);
	}

	runHeatTransferExperiment() {
		this.showMessage('Experimento: Transferência de Calor');
		
		alert(`🔥 TRANSFERÊNCIA DE CALOR

		Estudo dos mecanismos de transferência:

		1. CONDUÇÃO:
		   • Através de sólidos
		   • Lei de Fourier
		   • Exemplo: Barra metálica

		2. CONVECÇÃO:
		   • Fluidos em movimento
		   • Natural/forçada
		   • Exemplo: Água fervendo

		3. RADIAÇÃO:
		   • Ondas eletromagnéticas
		   • Lei de Stefan-Boltzmann
		   • Exemplo: Calor do Sol

		No sistema atual: Predomina convecção nos gases.`);
	}

	showMessage(message) {
		// Feedback visual temporário
		const tempDisplay = document.getElementById('systemTemp');
		const originalText = tempDisplay.textContent;
		tempDisplay.textContent = message;
		tempDisplay.style.color = '#10b981';
		
		setTimeout(() => {
			tempDisplay.textContent = originalText;
			tempDisplay.style.color = '';
		}, 3000);
	}

	showHelp() {
		alert(`🔥 GUIA DO MÓDULO TERMODINÂMICA

		1. 🚗 SISTEMAS TÉRMICOS: Selecione diferentes configurações
		2. 📈 PROCESSOS: Estude transformações termodinâmicas
		3. ⚖️ LEIS: Aprenda os fundamentos da termodinâmica
		4. 🎯 EXPERIMENTOS: Execute simulações específicas

		CONTROLES:
		• Ajuste temperaturas dos reservatórios
		• Modifique pressão e volume do sistema
		• Inicie/pare a simulação
		• Analise resultados em tempo real

		EXPERIMENTE:
		• Maximizar eficiência da máquina térmica
		• Observar expansão livre do gás
		• Estudar diferentes processos termodinâmicos`);
	}

	showData() {
		const data = `
		📊 DADOS TERMODINÂMICOS - TEMPO REAL

		VARIÁVEIS DE ESTADO:
		Temperatura: ${Math.round(this.state.temperature)} K
		Pressão: ${this.state.pressure} kPa
		Volume: ${this.state.volume.toFixed(3)} m³
		Energia Interna: ${Math.round(this.internalEnergy)} J

		FLUXOS ENERGÉTICOS:
		Q_in = ${Math.round(this.heatInput)} J
		Q_out = ${Math.round(this.heatOutput)} J
		W_net = ${Math.round(this.workDone)} J

		EFICIÊNCIAS:
		η = ${this.efficiency.toFixed(2)}%
		η_Carnot = ${this.carnotEfficiency.toFixed(2)}%

		PROPRIEDADES:
		n = ${this.state.n} mol
		R = ${this.state.R} J/mol·K
		ΔS = ${this.entropy.toFixed(3)} J/K

		SISTEMA: ${this.currentSystem.toUpperCase()}
		PROCESSO: ${this.currentProcess.toUpperCase()}
		`;
		
		alert(data);
	}
}

// Inicializar laboratório de termodinâmica
document.addEventListener('DOMContentLoaded', () => {
	new ThermodynamicsLab();
});
