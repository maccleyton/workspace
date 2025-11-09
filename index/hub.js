// ========================================
// WORKSPACE HUB - APPLICATION DATA
// Dados das aplicações e configuração
// ========================================

/**
 * Configuração principal do Workspace
 */
const WORKSPACE_CONFIG = {
  name: 'Workspace',
  version: '1.0.0',
  description: 'Hub central para gerenciamento de aplicações de desenvolvimento',
  maxFutureSlots: 20,
  lastUpdated: new Date().toISOString()
};

/**
 * Dados das aplicações implementadas
 */
const APPLICATIONS = [
  {
	id: 'markdown-editor',
	name: 'Markdown Editor',
	icon: 'Edit3',
	description: 'Editor avançado de Markdown com suporte a KaTeX, sintaxe highlighting e visualização em tempo real.',
	version: '1.0.0',
	status: 'active',
	category: 'editor',
	path: '../',
	features: [
	  'Editor em tempo real',
	  'Suporte a LaTeX (KaTeX)',
	  'Syntax highlighting',
	  'Temas personalizáveis',
	  'Exportação PDF',
	  'Atalhos de teclado'
	],
	stats: {
	  filesCreated: 0,
	  totalEdits: 0,
	  lastUsed: null
	},
	metadata: {
	  created: '2024-01-01',
	  updated: '2024-01-01',
	  author: 'MiniMax Agent',
	  tags: ['markdown', 'editor', 'latex', 'real-time']
	}
  },
  {
	id: 'mini-ide',
	name: 'Mini IDE',
	icon: 'Code2',
	description: 'Ambiente de desenvolvimento integrado com editor de código, terminal e preview integrados.',
	version: '1.0.0',
	status: 'active',
	category: 'development',
	path: 'mini-ide/',
	features: [
	  'Editor de código multi-linguagem',
	  'Terminal integrado',
	  'Preview de HTML/CSS/JS',
	  'Gerenciador de arquivos',
	  'Temas de syntax highlighting',
	  'Execução de código'
	],
	stats: {
	  filesCreated: 0,
	  totalEdits: 0,
	  lastUsed: null
	},
	metadata: {
	  created: '2024-01-01',
	  updated: '2024-01-01',
	  author: 'MiniMax Agent',
	  tags: ['ide', 'development', 'code', 'terminal']
	}
  },
  {
	id: 'formula-calculator',
	name: 'Interactive Formula Calculator',
	icon: 'Calculator',
	description: 'Calculadora interativa com mais de 40 fórmulas matemáticas, científicas e de engenharia.',
	version: '1.0.0',
	status: 'active',
	category: 'calculator',
	path: 'calculadora-formulas/',
	features: [
	  '40+ fórmulas predefinidas',
	  'Calculadora científica',
	  'Gráficos interativos',
	  'Histórico de cálculos',
	  'Exportação de resultados',
	  'Interface responsiva'
	],
	stats: {
	  calculationsMade: 0,
	  formulasUsed: 0,
	  lastUsed: null
	},
	metadata: {
	  created: '2024-01-01',
	  updated: '2024-01-01',
	  author: 'MiniMax Agent',
	  tags: ['calculator', 'math', 'formulas', 'scientific']
	}
  },
  {
	id: 'knowledge-hub',
	name: 'Knowledge Hub',
	icon: 'BookOpen',
	description: 'Hub centralizado para arquivar e gerenciar projetos Markdown e PDF com visualização integrada.',
	version: '1.0.0',
	status: 'active',
	category: 'management',
	path: 'knowledge-hub/',
	features: [
	  'Armazenamento IndexedDB',
	  'Suporte a Markdown e PDF',
	  'Sistema de busca',
	  '6 temas personalizáveis',
	  'Backup automático',
	  'Visualização avançada'
	],
	stats: {
	  documentsStored: 0,
	  searchesMade: 0,
	  lastUsed: null
	},
	metadata: {
	  created: '2024-01-01',
	  updated: '2024-01-01',
	  author: 'MiniMax Agent',
	  tags: ['storage', 'markdown', 'pdf', 'search']
	}
  },
  {
	id: 'format-converter',
	name: 'Conversor de Formatos',
	icon: 'RefreshCw',
	description: 'Conversor completo para texto e números entre diferentes formatos: binário, hexadecimal, octal e decimal.',
	version: '1.0.0',
	status: 'active',
	category: 'converter',
	path: 'conversor-formatos/',
	features: [
	  'Conversão de texto: texto ↔ binário/hex/octal',
	  'Conversão de números: decimal ↔ binário/hex/octal',
	  '6 temas personalizáveis',
	  'Auto-conversão em tempo real',
	  'Validação inteligente',
	  'Ações rápidas e atalhos de teclado'
	],
	stats: {
	  conversionsMade: 0,
	  formatsUsed: 0,
	  lastUsed: null
	},
	metadata: {
	  created: '2024-11-07',
	  updated: '2024-11-07',
	  author: 'MiniMax Agent',
	  tags: ['converter', 'binary', 'hex', 'octal', 'numbers', 'text']
	}
  }
];

/**
 * Slots para futuras aplicações
 */
const FUTURE_SLOTS = Array.from({ length: 20 }, (_, index) => ({
  id: `future-slot-${index + 1}`,
  name: `Slot Disponível ${index + 1}`,
  icon: 'Plus',
  description: 'Espaço reservado para futura aplicação',
  version: 'TBD',
  status: 'future',
  category: 'future',
  path: null,
  features: [],
  stats: {},
  metadata: {
	created: null,
	updated: null,
	author: null,
	tags: ['future', 'placeholder']
  }
}));

/**
 * Configurações de navegação
 */
const NAVIGATION_CONFIG = {
  keyboardShortcuts: {
	openApp: 'Enter',
	openModal: 'O',
	closeModal: 'Escape',
	search: 'Ctrl+K',
	switchTheme: 'Ctrl+T',
	filterActive: 'A',
	filterCompleted: 'C',
	showAll: 'S'
  },
  animations: {
	cardHoverDelay: 150,
	modalOpenDelay: 100,
	themeSwitchDelay: 300
  },
  search: {
	minLength: 2,
	debounceDelay: 300,
	highlightClass: 'search-highlight'
  }
};

/**
 * Configurações de tema
 */
const THEME_CONFIG = {
  default: 'dark',
  available: [
	{ id: 'dark', name: 'Dark', icon: 'Moon' },
	{ id: 'light', name: 'Light', icon: 'Sun' },
	{ id: 'blue', name: 'Blue', icon: 'Droplets' },
	{ id: 'green', name: 'Green', icon: 'Leaf' },
	{ id: 'purple', name: 'Purple', icon: 'Sparkles' },
	{ id: 'orange', name: 'Orange', icon: 'Flame' }
  ],
  storage: {
	key: 'workspace-theme',
	autoSave: true
  }
};

/**
 * Categorias de aplicações
 */
const CATEGORIES = {
  all: { name: 'Todos', icon: 'Grid3X3' },
  editor: { name: 'Editores', icon: 'Edit3' },
  development: { name: 'Desenvolvimento', icon: 'Code2' },
  calculator: { name: 'Calculadoras', icon: 'Calculator' },
  management: { name: 'Gerenciamento', icon: 'FolderOpen' },
  future: { name: 'Futuras', icon: 'Plus' }
};

/**
 * Configurações de UI
 */
const UI_CONFIG = {
  grid: {
	minCardWidth: 280,
	gap: 24,
	maxColumns: 4
  },
  modal: {
	maxWidth: '500px',
	backdropBlur: '4px'
  },
  toast: {
	maxVisible: 3,
	duration: 5000,
	position: 'top-right'
  },
  search: {
	placeholder: 'Buscar aplicações...',
	clearOnEscape: true
  }
};

/**
 * Estatísticas globais do workspace
 */
const WORKSPACE_STATS = {
  totalApplications: APPLICATIONS.length,
  activeApplications: APPLICATIONS.filter(app => app.status === 'active').length,
  completedApplications: APPLICATIONS.filter(app => app.status === 'completed').length,
  futureSlots: FUTURE_SLOTS.length,
  totalSlots: APPLICATIONS.length + FUTURE_SLOTS.length,
  lastLaunch: new Date().toISOString(),
  totalLaunches: 1
};

/**
 * Configurações de inicialização
 */
const INIT_CONFIG = {
  checkVersion: true,
  preloadIcons: true,
  initializeStorage: true,
  showWelcomeMessage: true,
  loadUserPreferences: true,
  validatePaths: true
};

/**
 * APIs externas disponíveis
 */
const EXTERNAL_APIS = {
  github: {
	baseUrl: 'https://api.github.com',
	rateLimit: 5000
  },
  unsplash: {
	baseUrl: 'https://api.unsplash.com',
	rateLimit: 50
  }
};

/**
 * Mensagens do sistema
 */
const MESSAGES = {
  success: {
	appOpened: 'Aplicação aberta com sucesso!',
	themeChanged: 'Tema alterado com sucesso!',
	searchCompleted: 'Busca concluída!',
	preferencesSaved: 'Preferências salvas!'
  },
  error: {
	appNotFound: 'Aplicação não encontrada!',
	invalidPath: 'Caminho inválido!',
	loadFailed: 'Falha ao carregar aplicação!',
	storageError: 'Erro no armazenamento!'
  },
  info: {
	welcome: 'Bem-vindo ao Workspace!',
	searching: 'Buscando...',
	loading: 'Carregando...',
	ready: 'Pronto para usar!'
  }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Obter aplicação por ID
 * @param {string} id - ID da aplicação
 * @returns {Object|null} - Dados da aplicação
 */
function getApplicationById(id) {
  return APPLICATIONS.find(app => app.id === id) || null;
}

/**
 * Filtrar aplicações por categoria
 * @param {string} category - Categoria para filtrar
 * @returns {Array} - Lista de aplicações filtradas
 */
function getApplicationsByCategory(category = 'all') {
  if (category === 'all') return APPLICATIONS;
  if (category === 'future') return FUTURE_SLOTS;
  return APPLICATIONS.filter(app => app.category === category);
}

/**
 * Buscar aplicações por termo
 * @param {string} query - Termo de busca
 * @returns {Array} - Lista de aplicações encontradas
 */
function searchApplications(query) {
  if (!query || query.length < 2) return APPLICATIONS;
  
  const searchTerm = query.toLowerCase();
  return APPLICATIONS.filter(app => 
	app.name.toLowerCase().includes(searchTerm) ||
	app.description.toLowerCase().includes(searchTerm) ||
	app.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

/**
 * Obter estatísticas do workspace
 * @returns {Object} - Estatísticas atuais
 */
function getWorkspaceStats() {
  return {
	...WORKSPACE_STATS,
	availableSlots: FUTURE_SLOTS.length,
	utilization: `${Math.round((APPLICATIONS.length / FUTURE_SLOTS.length) * 100)}%`
  };
}

/**
 * Validar caminho da aplicação
 * @param {string} path - Caminho da aplicação
 * @returns {boolean} - Validação do caminho
 */
function validateAppPath(path) {
  if (!path) return false;
  
  // Validar se é um caminho relativo válido
  const relativePathPattern = /^(\.\.\/|\.\/|\w+\/|\w+$)/;
  return relativePathPattern.test(path);
}

/**
 * Obter configuração de tema
 * @param {string} themeId - ID do tema
 * @returns {Object|null} - Configuração do tema
 */
function getThemeConfig(themeId) {
  return THEME_CONFIG.available.find(theme => theme.id === themeId) || null;
}

// ========================================
// WORKSPACE HUB - UI MANAGER
// Gerenciamento de interface, modais, busca, tema
// ========================================

class UIManager {
  constructor() {
	this.currentTheme = 'dark';
	this.currentFilter = 'all';
	this.searchQuery = '';
	this.toastQueue = [];
	this.isModalOpen = false;
	this.searchTimeout = null;
	
	this.init();
  }

  init() {
	this.loadTheme();
	this.setupEventListeners();
	this.initializeComponents();
	this.setupKeyboardShortcuts();
  }

  /**
   * Configurar event listeners
   */
  setupEventListeners() {
	// Theme toggle
	const themeToggle = document.getElementById('themeToggle');
	if (themeToggle) {
	  themeToggle.addEventListener('click', () => this.toggleTheme());
	}

	// Search input
	const searchInput = document.getElementById('searchInput');
	if (searchInput) {
	  searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
	  searchInput.addEventListener('keydown', (e) => this.handleSearchKeydown(e));
	}

	// Filter buttons
	document.addEventListener('click', (e) => {
	  if (e.target.classList.contains('btn-filter')) {
		this.setFilter(e.target.dataset.filter);
	  }
	});

	// Modal events
	const modalClose = document.getElementById('modalClose');
	const modalCancel = document.getElementById('modalCancel');
	const modalOverlay = document.getElementById('appModal');

	if (modalClose) {
	  modalClose.addEventListener('click', () => this.closeModal());
	}

	if (modalCancel) {
	  modalCancel.addEventListener('click', () => this.closeModal());
	}

	if (modalOverlay) {
	  modalOverlay.addEventListener('click', (e) => {
		if (e.target === modalOverlay) {
		  this.closeModal();
		}
	  });
	}

	// Toast events
	document.addEventListener('workspace-show-toast', (e) => {
	  this.showToast(e.detail.message, e.detail.type);
	});

	// Theme toggle event
	document.addEventListener('workspace-theme-toggle', () => {
	  this.toggleTheme();
	});

	// Window events
	window.addEventListener('resize', () => this.handleResize());
	window.addEventListener('beforeunload', () => this.savePreferences());
  }

  /**
   * Inicializar componentes
   */
  initializeComponents() {
	this.renderApplications();
	this.renderFutureSlots();
	this.updateStatistics();
	this.updateThemeIcon();
	this.initializeTooltips();
  }

  /**
   * Configurar atalhos de teclado específicos da UI
   */
  setupKeyboardShortcuts() {
	document.addEventListener('keydown', (e) => {
	  const cmd = e.ctrlKey || e.metaKey;

	  switch (e.key) {
		case '/':
		  e.preventDefault();
		  this.focusSearch();
		  break;

		case 'Escape':
		  if (this.isModalOpen) {
			e.preventDefault();
			this.closeModal();
		  } else if (document.activeElement === document.getElementById('searchInput')) {
			this.clearSearch();
		  }
		  break;

		case 'a':
		case 'A':
		  if (cmd) {
			e.preventDefault();
			this.selectAllCards();
		  }
		  break;
	  }
	});
  }

  /**
   * Renderizar aplicações
   */
  renderApplications() {
	const appsGrid = document.getElementById('appsGrid');
	if (!appsGrid) return;

	const filteredApps = this.getFilteredApplications();
	
	appsGrid.innerHTML = '';
	
	filteredApps.forEach((app, index) => {
	  const appCard = this.createAppCard(app, index);
	  appsGrid.appendChild(appCard);
	});

	// Inicializar ícones Lucide
	if (typeof lucide !== 'undefined') {
	  lucide.createIcons();
	}

	// Animar entrada dos cards
	this.animateCards();
  }

  /**
   * Criar card de aplicação
   * @param {Object} app - Dados da aplicação
   * @param {number} index - Índice para animação
   * @returns {HTMLElement} - Elemento do card
   */
  createAppCard(app, index) {
	const card = document.createElement('div');
	card.className = 'app-card';
	card.dataset.appId = app.id;
	card.setAttribute('tabindex', '0');
	card.setAttribute('role', 'button');
	card.setAttribute('aria-label', `Abrir ${app.name}`);

	// Construir HTML do card
	card.innerHTML = `
	  <div class="app-card-header">
		<div class="app-card-icon-title">
		  <div class="app-card-icon">
			<i data-lucide="${app.icon}"></i>
		  </div>
		  <h3 class="app-card-title">${app.name}</h3>
		</div>
		<div class="app-card-status">
		  <span class="status-tag ${app.status}">${this.getStatusText(app.status)}</span>
		</div>
	  </div>
	  <p class="app-card-description">${app.description}</p>
	  <div class="app-card-footer">
		<div class="app-card-meta">
		  <div class="app-card-version">v${app.version}</div>
		  <div class="app-card-date">${this.formatDate(app.metadata.updated)}</div>
		</div>
		<div class="app-card-action">
		  <button class="btn btn-primary btn-sm">
			<i data-lucide="external-link"></i>
			Abrir
		  </button>
		</div>
	  </div>
	`;

	// Adicionar delay de animação
	card.style.animationDelay = `${index * 50}ms`;

	return card;
  }

  /**
   * Renderizar slots futuros
   */
  renderFutureSlots() {
	const futureGrid = document.getElementById('futureGrid');
	if (!futureGrid) return;

	futureGrid.innerHTML = '';

	// Mostrar apenas alguns slots para não sobrecarregar a UI
	const visibleSlots = FUTURE_SLOTS.slice(0, 8);

	visibleSlots.forEach((slot, index) => {
	  const slotCard = this.createFutureSlotCard(slot, index);
	  futureGrid.appendChild(slotCard);
	});
  }

  /**
   * Criar card de slot futuro
   * @param {Object} slot - Dados do slot
   * @param {number} index - Índice para animação
   * @returns {HTMLElement} - Elemento do card
   */
  createFutureSlotCard(slot, index) {
	const card = document.createElement('div');
	card.className = 'app-card future';
	card.dataset.slotId = slot.id;
	card.setAttribute('tabindex', '-1');
	card.setAttribute('aria-label', slot.name);

	card.innerHTML = `
	  <div class="app-card-header">
		<div class="app-card-icon-title">
		  <div class="app-card-icon">
			<i data-lucide="plus"></i>
		  </div>
		  <h3 class="app-card-title">${slot.name}</h3>
		</div>
		<div class="app-card-status">
		  <span class="status-tag future">Futuro</span>
		</div>
	  </div>
	  <p class="app-card-description">${slot.description}</p>
	  <div class="app-card-footer">
		<div class="app-card-meta">
		  <div class="app-card-version">Em breve</div>
		  <div class="app-card-date">Aguardando implementação</div>
		</div>
		<div class="app-card-action">
		  <button class="btn btn-ghost btn-sm" disabled>
			<i data-lucide="clock"></i>
			Em breve
		  </button>
		</div>
	  </div>
	`;

	card.style.animationDelay = `${(index + APPLICATIONS.length) * 50}ms`;

	return card;
  }

  /**
   * Obter aplicações filtradas
   * @returns {Array} - Lista de aplicações filtradas
   */
  getFilteredApplications() {
	let apps = [...APPLICATIONS];

	// Aplicar filtro de categoria
	if (this.currentFilter !== 'all') {
	  apps = apps.filter(app => app.category === this.currentFilter);
	}

	// Aplicar busca
	if (this.searchQuery) {
	  apps = this.searchApps(apps, this.searchQuery);
	}

	return apps;
  }

  /**
   * Buscar nas aplicações
   * @param {Array} apps - Lista de aplicações
   * @param {string} query - Termo de busca
   * @returns {Array} - Aplicações encontradas
   */
  searchApps(apps, query) {
	const searchTerm = query.toLowerCase();
	
	return apps.filter(app => 
	  app.name.toLowerCase().includes(searchTerm) ||
	  app.description.toLowerCase().includes(searchTerm) ||
	  app.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
	  app.features.some(feature => feature.toLowerCase().includes(searchTerm))
	);
  }

  /**
   * Lidar com busca
   * @param {string} value - Valor do input de busca
   */
  handleSearch(value) {
	this.searchQuery = value;
	
	// Debounce da busca
	clearTimeout(this.searchTimeout);
	this.searchTimeout = setTimeout(() => {
	  this.renderApplications();
	  this.updateSearchResults();
	}, 300);
  }

  /**
   * Lidar com teclas na busca
   * @param {KeyboardEvent} e - Evento de teclado
   */
  handleSearchKeydown(e) {
	switch (e.key) {
	  case 'Enter':
		e.preventDefault();
		this.executeSearch();
		break;

	  case 'Escape':
		this.clearSearch();
		break;

	  case 'ArrowDown':
		e.preventDefault();
		this.focusFirstCard();
		break;
	}
  }

  /**
   * Executar busca
   */
  executeSearch() {
	const apps = this.getFilteredApplications();
	
	if (apps.length === 0) {
	  this.showToast('Nenhuma aplicação encontrada!', 'warning');
	} else if (apps.length === 1) {
	  // Se há apenas uma resultado, focar no card
	  const card = document.querySelector(`[data-app-id="${apps[0].id}"]`);
	  if (card) {
		card.focus();
		card.scrollIntoView({ behavior: 'smooth', block: 'center' });
	  }
	}
  }

  /**
   * Atualizar resultados da busca
   */
  updateSearchResults() {
	// Remover resultados anteriores
	const existingResults = document.querySelector('.search-results');
	if (existingResults) {
	  existingResults.remove();
	}

	if (this.searchQuery && this.searchQuery.length >= 2) {
	  const apps = this.getFilteredApplications();
	  const resultsDiv = document.createElement('div');
	  resultsDiv.className = 'search-results';
	  
	  if (apps.length === 0) {
		resultsDiv.className += ' empty';
		resultsDiv.innerHTML = 'Nenhuma aplicação encontrada';
	  } else {
		const searchCount = document.createElement('div');
		searchCount.className = 'search-count';
		searchCount.textContent = `${apps.length} aplicação(s) encontrada(s)`;
		
		resultsDiv.appendChild(searchCount);
	  }

	  const appsGrid = document.getElementById('appsGrid');
	  appsGrid.parentNode.insertBefore(resultsDiv, appsGrid.nextSibling);
	}
  }

  /**
   * Limpar busca
   */
  clearSearch() {
	const searchInput = document.getElementById('searchInput');
	if (searchInput) {
	  searchInput.value = '';
	  this.searchQuery = '';
	  this.renderApplications();
	  
	  const resultsDiv = document.querySelector('.search-results');
	  if (resultsDiv) {
		resultsDiv.remove();
	  }
	}
  }

  /**
   * Focar na busca
   */
  focusSearch() {
	const searchInput = document.getElementById('searchInput');
	if (searchInput) {
	  searchInput.focus();
	  searchInput.select();
	}
  }

  /**
   * Focar no primeiro card
   */
  focusFirstCard() {
	const firstCard = document.querySelector('.app-card:not(.future)');
	if (firstCard) {
	  firstCard.focus();
	}
  }

  /**
   * Definir filtro
   * @param {string} filter - Filtro a aplicar
   */
  setFilter(filter) {
	this.currentFilter = filter;
	
	// Atualizar botões de filtro
	document.querySelectorAll('.btn-filter').forEach(btn => {
	  btn.classList.toggle('active', btn.dataset.filter === filter);
	});

	this.renderApplications();
	this.updateSearchResults();
  }

  /**
   * Alternar tema
   */
  toggleTheme() {
	const themes = ['dark', 'light', 'blue', 'green', 'purple', 'orange'];
	const currentIndex = themes.indexOf(this.currentTheme);
	const nextIndex = (currentIndex + 1) % themes.length;
	const newTheme = themes[nextIndex];
	
	this.setTheme(newTheme);
  }

  /**
   * Definir tema
   * @param {string} theme - ID do tema
   */
  setTheme(theme) {
	this.currentTheme = theme;
	document.documentElement.setAttribute('data-theme', theme);
	this.updateThemeIcon();
	this.saveTheme();
	this.showToast(`Tema alterado para ${this.getThemeName(theme)}!`, 'success');
  }

  /**
   * Carregar tema salvo
   */
  loadTheme() {
	try {
	  const savedTheme = localStorage.getItem('workspace-theme');
	  if (savedTheme && THEME_CONFIG.available.find(t => t.id === savedTheme)) {
		this.currentTheme = savedTheme;
	  } else {
		this.currentTheme = THEME_CONFIG.default;
	  }
	} catch (error) {
	  console.warn('Não foi possível carregar tema:', error);
	  this.currentTheme = THEME_CONFIG.default;
	}
	
	document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  /**
   * Salvar tema
   */
  saveTheme() {
	try {
	  localStorage.setItem('workspace-theme', this.currentTheme);
	} catch (error) {
	  console.warn('Não foi possível salvar tema:', error);
	}
  }

  /**
   * Atualizar ícone do tema
   */
  updateThemeIcon() {
	const themeIcon = document.getElementById('themeIcon');
	if (themeIcon && typeof lucide !== 'undefined') {
	  const theme = THEME_CONFIG.available.find(t => t.id === this.currentTheme);
	  if (theme) {
		themeIcon.setAttribute('data-lucide', theme.icon);
		lucide.createIcons();
	  }
	}
  }

  /**
   * Obter nome do tema
   * @param {string} themeId - ID do tema
   * @returns {string} - Nome do tema
   */
  getThemeName(themeId) {
	const theme = THEME_CONFIG.available.find(t => t.id === themeId);
	return theme ? theme.name : themeId;
  }

  /**
   * Abrir modal
   */
  openModal() {
	const modal = document.getElementById('appModal');
	if (modal) {
	  modal.classList.add('active');
	  this.isModalOpen = true;
	  document.body.style.overflow = 'hidden';
	}
  }

  /**
   * Fechar modal
   */
  closeModal() {
	const modal = document.getElementById('appModal');
	if (modal) {
	  modal.classList.remove('active');
	  this.isModalOpen = false;
	  document.body.style.overflow = '';
	}
  }

  /**
   * Mostrar toast
   * @param {string} message - Mensagem
   * @param {string} type - Tipo (success, error, warning, info)
   * @param {number} duration - Duração em ms
   */
  showToast(message, type = 'info', duration = 5000) {
	const toast = this.createToast(message, type);
	
	// Adicionar à fila se já temos muitos toasts visíveis
	const visibleToasts = document.querySelectorAll('.toast').length;
	
	if (visibleToasts >= UI_CONFIG.toast.maxVisible) {
	  this.toastQueue.push({ toast, duration });
	} else {
	  this.showToastImmediately(toast, duration);
	}
  }

  /**
   * Criar elemento toast
   * @param {string} message - Mensagem
   * @param {string} type - Tipo
   * @returns {HTMLElement} - Elemento toast
   */
  createToast(message, type) {
	const toast = document.createElement('div');
	toast.className = `toast ${type}`;
	toast.setAttribute('role', 'alert');
	toast.setAttribute('aria-live', 'polite');

	const iconName = this.getToastIcon(type);
	
	toast.innerHTML = `
	  <div class="toast-icon">
		<i data-lucide="${iconName}"></i>
	  </div>
	  <div class="toast-content">
		<div class="toast-title">${this.getToastTitle(type)}</div>
		<div class="toast-message">${message}</div>
	  </div>
	  <button class="toast-close" aria-label="Fechar notificação">
		<i data-lucide="x"></i>
	  </button>
	`;

	// Event listener para fechar
	const closeBtn = toast.querySelector('.toast-close');
	closeBtn.addEventListener('click', () => this.removeToast(toast));

	return toast;
  }

  /**
   * Mostrar toast imediatamente
   * @param {HTMLElement} toast - Elemento toast
   * @param {number} duration - Duração
   */
  showToastImmediately(toast, duration) {
	const container = document.getElementById('toastContainer');
	if (!container) return;

	container.appendChild(toast);
	
	// Animar entrada
	setTimeout(() => toast.classList.add('show'), 10);
	
	// Auto-remove
	setTimeout(() => {
	  this.removeToast(toast);
	}, duration);
  }

  /**
   * Remover toast
   * @param {HTMLElement} toast - Elemento toast
   */
  removeToast(toast) {
	toast.classList.remove('show');
	
	setTimeout(() => {
	  if (toast.parentNode) {
		toast.parentNode.removeChild(toast);
	  }
	  
	  // Mostrar próximo toast da fila
	  if (this.toastQueue.length > 0) {
		const { toast: nextToast, duration } = this.toastQueue.shift();
		this.showToastImmediately(nextToast, duration);
	  }
	}, 200);
  }

  /**
   * Obter ícone do toast
   * @param {string} type - Tipo do toast
   * @returns {string} - Nome do ícone
   */
  getToastIcon(type) {
	const icons = {
	  success: 'check-circle',
	  error: 'alert-circle',
	  warning: 'alert-triangle',
	  info: 'info'
	};
	return icons[type] || icons.info;
  }

  /**
   * Obter título do toast
   * @param {string} type - Tipo do toast
   * @returns {string} - Título
   */
  getToastTitle(type) {
	const titles = {
	  success: 'Sucesso!',
	  error: 'Erro!',
	  warning: 'Atenção!',
	  info: 'Informação'
	};
	return titles[type] || titles.info;
  }

  /**
   * Atualizar estatísticas
   */
  updateStatistics() {
	const stats = getWorkspaceStats();
	
	const elements = {
	  totalApps: document.getElementById('totalApps'),
	  activeApps: document.getElementById('activeApps'),
	  completedApps: document.getElementById('completedApps'),
	  availableSlots: document.getElementById('availableSlots')
	};

	if (elements.totalApps) elements.totalApps.textContent = stats.totalApplications;
	if (elements.activeApps) elements.activeApps.textContent = stats.activeApplications;
	if (elements.completedApps) elements.completedApps.textContent = stats.completedApplications;
	if (elements.availableSlots) elements.availableSlots.textContent = stats.futureSlots;
  }

  /**
   * Animar entrada dos cards
   */
  animateCards() {
	const cards = document.querySelectorAll('.app-card');
	
	cards.forEach((card, index) => {
	  setTimeout(() => {
		card.classList.add('fade-in');
	  }, index * 50);
	});
  }

  /**
   * Inicializar tooltips
   */
  initializeTooltips() {
	// Implementar tooltips se necessário
	// Por agora, usar apenas atributos title
  }

  /**
   * Selecionar todos os cards
   */
  selectAllCards() {
	const cards = document.querySelectorAll('.app-card:not(.future)');
	cards.forEach(card => {
	  card.style.outline = '2px solid var(--color-primary-500)';
	  setTimeout(() => {
		card.style.outline = '';
	  }, 1000);
	});
  }

  /**
   * Lidar com redimensionamento
   */
  handleResize() {
	// Ajustar layout se necessário
	// Por ora, apenas garantir que os cards estão visíveis
	this.renderApplications();
  }

  /**
   * Obter texto do status
   * @param {string} status - Status da aplicação
   * @returns {string} - Texto do status
   */
  getStatusText(status) {
	const statusTexts = {
	  active: 'Ativo',
	  completed: 'Concluído',
	  development: 'Em desenvolvimento',
	  future: 'Futuro'
	};
	return statusTexts[status] || status;
  }

  /**
   * Formatar data
   * @param {string} dateString - String da data
   * @returns {string} - Data formatada
   */
  formatDate(dateString) {
	if (!dateString) return 'Data não disponível';
	
	const date = new Date(dateString);
	const now = new Date();
	const diffTime = Math.abs(now - date);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	
	if (diffDays === 1) return 'Hoje';
	if (diffDays === 2) return 'Ontem';
	if (diffDays <= 7) return `${diffDays} dias atrás`;
	
	return date.toLocaleDateString('pt-BR', {
	  day: '2-digit',
	  month: '2-digit',
	  year: 'numeric'
	});
  }

  /**
   * Salvar preferências
   */
  savePreferences() {
	const preferences = {
	  theme: this.currentTheme,
	  filter: this.currentFilter,
	  searchQuery: this.searchQuery,
	  lastUsed: new Date().toISOString()
	};

	try {
	  localStorage.setItem('workspace-preferences', JSON.stringify(preferences));
	} catch (error) {
	  console.warn('Não foi possível salvar preferências:', error);
	}
  }

  /**
   * Carregar preferências
   */
  loadPreferences() {
	try {
	  const saved = localStorage.getItem('workspace-preferences');
	  if (saved) {
		const preferences = JSON.parse(saved);
		
		if (preferences.theme) this.setTheme(preferences.theme);
		if (preferences.filter) this.currentFilter = preferences.filter;
		if (preferences.searchQuery) this.searchQuery = preferences.searchQuery;
	  }
	} catch (error) {
	  console.warn('Não foi possível carregar preferências:', error);
	}
  }

  /**
   * Obter estado atual da UI
   * @returns {Object} - Estado da UI
   */
  getUIState() {
	return {
	  theme: this.currentTheme,
	  filter: this.currentFilter,
	  searchQuery: this.searchQuery,
	  isModalOpen: this.isModalOpen
	};
  }

  /**
   * Destruir UI Manager
   */
  destroy() {
	this.savePreferences();
	// Remover event listeners se necessário
  }
}

// ========================================
// WORKSPACE HUB - NAVIGATION SYSTEM
// Gerenciamento de navegação entre aplicações
// ========================================

class NavigationManager {
  constructor() {
	this.currentApp = null;
	this.history = [];
	this.isTransitioning = false;
	this.transitionTimeout = null;
	
	this.init();
  }

  init() {
	this.setupEventListeners();
	this.validateAppPaths();
	this.preloadApplications();
  }

  /**
   * Configurar event listeners
   */
  setupEventListeners() {
	// Card clicks
	document.addEventListener('click', (e) => {
	  const card = e.target.closest('.app-card');
	  if (card && !card.classList.contains('future')) {
		const appId = card.dataset.appId;
		this.openApplication(appId);
	  }
	});

	// Keyboard shortcuts
	document.addEventListener('keydown', (e) => {
	  this.handleKeyboardShortcuts(e);
	});

	// Browser navigation
	window.addEventListener('popstate', (e) => {
	  this.handleBrowserNavigation(e);
	});

	// Focus management
	document.addEventListener('keydown', (e) => {
	  if (e.key === 'Tab') {
		this.manageFocus(e);
	  }
	});
  }

  /**
   * Abrir aplicação
   * @param {string} appId - ID da aplicação
   * @param {Object} options - Opções de abertura
   */
  async openApplication(appId, options = {}) {
	if (this.isTransitioning) return;
	
	const app = getApplicationById(appId);
	if (!app) {
	  this.showToast('Aplicação não encontrada!', 'error');
	  return;
	}

	if (!validateAppPath(app.path)) {
	  this.showToast('Caminho da aplicação inválido!', 'error');
	  return;
	}

	try {
	  this.isTransitioning = true;
	  this.currentApp = appId;

	  // Pre-loading animation
	  await this.showTransition('Abrindo aplicação...');

	  // Update browser history
	  if (!options.silent) {
		this.addToHistory(appId);
		this.updateBrowserUrl(appId);
	  }

	  // Update app statistics
	  this.updateAppStats(appId);

	  // Show loading state
	  this.setAppLoadingState(appId, true);

	  // Navigate to application
	  setTimeout(() => {
		this.navigateToApp(app.path, app);
	  }, 200);

	} catch (error) {
	  console.error('Erro ao abrir aplicação:', error);
	  this.showToast('Erro ao abrir aplicação!', 'error');
	  this.isTransitioning = false;
	}
  }

  /**
   * Navegar para aplicação
   * @param {string} path - Caminho da aplicação
   * @param {Object} app - Dados da aplicação
   */
  navigateToApp(path, app) {
	try {
	  // Construir URL completa
	  const baseUrl = window.location.origin;
	  const appUrl = new URL(path, baseUrl);
	  
	  // Verificar se é caminho relativo
	  if (path.startsWith('./') || path.startsWith('../')) {
		const currentPath = window.location.pathname;
		const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
		const fullPath = basePath + '/' + path;
		appUrl.pathname = fullPath;
	  }

	  // Verificar se a aplicação existe
	  this.checkAppAvailability(appUrl.href)
		.then(isAvailable => {
		  if (isAvailable) {
			window.location.href = appUrl.href;
		  } else {
			this.showAppNotFoundModal(app);
		  }
		})
		.catch(() => {
		  // Se não conseguir verificar, tentar navegar mesmo assim
		  window.location.href = appUrl.href;
		});

	} catch (error) {
	  console.error('Erro na navegação:', error);
	  this.showToast('Erro na navegação!', 'error');
	  this.isTransitioning = false;
	}
  }

  /**
   * Verificar disponibilidade da aplicação
   * @param {string} url - URL da aplicação
   * @returns {Promise<boolean>}
   */
  async checkAppAvailability(url) {
	try {
	  // Para aplicações locais, simular verificação
	  if (url.includes(window.location.origin)) {
		// Verificar se é uma das aplicações conhecidas
		const knownPaths = ['../', 'mini-ide/', 'calculadora-formulas/', 'knowledge-hub/'];
		return knownPaths.some(path => url.includes(path));
	  }
	  
	  // Para URLs externas, fazer verificação real
	  const response = await fetch(url, { method: 'HEAD' });
	  return response.ok;
	} catch (error) {
	  console.warn('Não foi possível verificar disponibilidade:', error);
	  return true; // Assumir que está disponível
	}
  }

  /**
   * Mostrar modal de aplicação não encontrada
   * @param {Object} app - Dados da aplicação
   */
  showAppNotFoundModal(app) {
	const modal = document.getElementById('appModal');
	const modalTitle = document.getElementById('modalTitle');
	const appInfo = document.getElementById('appInfo');
	const appPreview = document.getElementById('appPreview');
	const modalOpen = document.getElementById('modalOpen');

	modalTitle.textContent = 'Aplicação não disponível';
	
	appInfo.innerHTML = `
	  <div class="app-info-item">
		<span class="app-info-label">Nome:</span>
		<span class="app-info-value">${app.name}</span>
	  </div>
	  <div class="app-info-item">
		<span class="app-info-label">Status:</span>
		<span class="app-info-value text-warning">Em desenvolvimento</span>
	  </div>
	  <div class="app-info-item">
		<span class="app-info-label">Caminho:</span>
		<span class="app-info-value">${app.path}</span>
	  </div>
	`;

	appPreview.innerHTML = `
	  <div class="app-preview-icon">
		<i data-lucide="alert-triangle" style="color: var(--color-warning-500);"></i>
	  </div>
	  <div class="app-preview-text">
		Esta aplicação ainda está em desenvolvimento ou não está disponível no momento.
	  </div>
	`;

	modalOpen.textContent = 'Entendi';
	modalOpen.onclick = () => this.closeModal();

	this.openModal();

	this.isTransitioning = false;
  }

  /**
   * Mostrar tela de transição
   * @param {string} message - Mensagem a exibir
   */
  showTransition(message) {
	return new Promise((resolve) => {
	  const existingOverlay = document.querySelector('.transition-overlay');
	  if (existingOverlay) {
		existingOverlay.remove();
	  }

	  const overlay = document.createElement('div');
	  overlay.className = 'transition-overlay';
	  overlay.innerHTML = `
		<div class="transition-content">
		  <div class="spinner"></div>
		  <p class="transition-message">${message}</p>
		</div>
	  `;

	  // Adicionar estilos inline para a transição
	  overlay.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--theme-bg-page);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		opacity: 0;
		transition: opacity 200ms ease-out;
	  `;

	  const content = overlay.querySelector('.transition-content');
	  content.style.cssText = `
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		color: var(--theme-text-primary);
	  `;

	  const messageEl = overlay.querySelector('.transition-message');
	  messageEl.style.cssText = `
		font-size: 16px;
		font-weight: 500;
		margin: 0;
	  `;

	  document.body.appendChild(overlay);

	  // Animar entrada
	  setTimeout(() => {
		overlay.style.opacity = '1';
	  }, 10);

	  // Resolver após um delay mínimo
	  setTimeout(() => {
		resolve();
	  }, 500);
	});
  }

  /**
   * Esconder tela de transição
   */
  hideTransition() {
	const overlay = document.querySelector('.transition-overlay');
	if (overlay) {
	  overlay.style.opacity = '0';
	  setTimeout(() => {
		overlay.remove();
		this.isTransitioning = false;
	  }, 200);
	}
  }

  /**
   * Definir estado de carregamento da aplicação
   * @param {string} appId - ID da aplicação
   * @param {boolean} loading - Estado de carregamento
   */
  setAppLoadingState(appId, loading) {
	const card = document.querySelector(`[data-app-id="${appId}"]`);
	if (card) {
	  if (loading) {
		card.classList.add('loading');
	  } else {
		card.classList.remove('loading');
	  }
	}
  }

  /**
   * Atualizar estatísticas da aplicação
   * @param {string} appId - ID da aplicação
   */
  updateAppStats(appId) {
	const app = getApplicationById(appId);
	if (app && app.stats) {
	  app.stats.lastUsed = new Date().toISOString();
	  
	  // Incrementar contador específico baseado na categoria
	  if (app.category === 'editor') {
		app.stats.filesCreated = (app.stats.filesCreated || 0) + 1;
	  } else if (app.category === 'calculator') {
		app.stats.calculationsMade = (app.stats.calculationsMade || 0) + 1;
	  } else if (app.category === 'management') {
		app.stats.documentsStored = (app.stats.documentsStored || 0) + 1;
	  } else {
		app.stats.totalEdits = (app.stats.totalEdits || 0) + 1;
	  }

	  this.saveStatsToStorage();
	}
  }

  /**
   * Salvar estatísticas no localStorage
   */
  saveStatsToStorage() {
	try {
	  localStorage.setItem('workspace-app-stats', JSON.stringify(APPLICATIONS));
	} catch (error) {
	  console.warn('Não foi possível salvar estatísticas:', error);
	}
  }

  /**
   * Carregar estatísticas do localStorage
   */
  loadStatsFromStorage() {
	try {
	  const saved = localStorage.getItem('workspace-app-stats');
	  if (saved) {
		const savedStats = JSON.parse(saved);
		savedStats.forEach(savedApp => {
		  const currentApp = APPLICATIONS.find(app => app.id === savedApp.id);
		  if (currentApp && savedApp.stats) {
			currentApp.stats = { ...currentApp.stats, ...savedApp.stats };
		  }
		});
	  }
	} catch (error) {
	  console.warn('Não foi possível carregar estatísticas:', error);
	}
  }

  /**
   * Adicionar ao histórico
   * @param {string} appId - ID da aplicação
   */
  addToHistory(appId) {
	this.history.push({
	  appId,
	  timestamp: Date.now(),
	  url: window.location.href
	});

	// Manter apenas os últimos 10 itens
	if (this.history.length > 10) {
	  this.history = this.history.slice(-10);
	}
  }

  /**
   * Atualizar URL do navegador
   * @param {string} appId - ID da aplicação
   */
  updateBrowserUrl(appId) {
	const newUrl = `${window.location.pathname}?app=${appId}`;
	window.history.pushState({ appId }, '', newUrl);
  }

  /**
   * Lidar com navegação do navegador
   * @param {PopStateEvent} e - Evento de popstate
   */
  handleBrowserNavigation(e) {
	if (e.state && e.state.appId) {
	  // Usuário usou botões do navegador
	  const appId = e.state.appId;
	  this.openApplication(appId, { silent: true });
	}
  }

  /**
   * Gerenciar atalhos de teclado
   * @param {KeyboardEvent} e - Evento de teclado
   */
  handleKeyboardShortcuts(e) {
	// Verificar se estamos em um input
	if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
	  return;
	}

	const cmd = e.ctrlKey || e.metaKey;
	const shift = e.shiftKey;

	switch (e.key) {
	  case 'Enter':
		if (document.activeElement) {
		  const card = document.activeElement.closest('.app-card');
		  if (card && !card.classList.contains('future')) {
			e.preventDefault();
			const appId = card.dataset.appId;
			this.openApplication(appId);
		  }
		}
		break;

	  case 'o':
	  case 'O':
		if (cmd) {
		  e.preventDefault();
		  this.focusSearch();
		}
		break;

	  case 't':
	  case 'T':
		if (cmd) {
		  e.preventDefault();
		  this.toggleTheme();
		}
		break;

	  case '1':
	  case '2':
	  case '3':
	  case '4':
		if (!cmd && !shift) {
		  e.preventDefault();
		  const index = parseInt(e.key) - 1;
		  const visibleCards = Array.from(document.querySelectorAll('.app-card:not(.future)'));
		  if (visibleCards[index]) {
			visibleCards[index].focus();
			visibleCards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
		  }
		}
		break;

	  case 'Escape':
		this.closeModal();
		break;
	}
  }

  /**
   * Gerenciar foco da navegação por teclado
   * @param {KeyboardEvent} e - Evento de teclado
   */
  manageFocus(e) {
	const focusableElements = Array.from(
	  document.querySelectorAll(
		'.app-card:not(.future), .btn, .search-input, [tabindex]:not([tabindex="-1"])'
	  )
	).filter(el => el.offsetParent !== null);

	if (focusableElements.length === 0) return;

	const currentIndex = focusableElements.indexOf(document.activeElement);
	let nextIndex;

	if (e.shiftKey) {
	  // Shift + Tab (Backward)
	  nextIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
	} else {
	  // Tab (Forward)
	  nextIndex = currentIndex === focusableElements.length - 1 ? 0 : currentIndex + 1;
	}

	e.preventDefault();
	focusableElements[nextIndex].focus();
  }

  /**
   * Focar na busca
   */
  focusSearch() {
	const searchInput = document.getElementById('searchInput');
	if (searchInput) {
	  searchInput.focus();
	  searchInput.select();
	}
  }

  /**
   * Alternar tema
   */
  toggleTheme() {
	const event = new CustomEvent('workspace-theme-toggle');
	document.dispatchEvent(event);
  }

  /**
   * Validar caminhos das aplicações
   */
  validateAppPaths() {
	APPLICATIONS.forEach(app => {
	  if (!validateAppPath(app.path)) {
		console.warn(`Caminho inválido para aplicação ${app.name}: ${app.path}`);
	  }
	});
  }

  /**
   * Pre-carregar aplicações
   */
  preloadApplications() {
	// Simular pre-carregamento de recursos
	APPLICATIONS.forEach(app => {
	  if (validateAppPath(app.path)) {
		// Pre-carregar ícones, se necessário
		this.preloadAppIcon(app.icon);
	  }
	});
  }

  /**
   * Pre-carregar ícone da aplicação
   * @param {string} iconName - Nome do ícone
   */
  preloadAppIcon(iconName) {
	// Implementar pre-carregamento de ícones se necessário
	// Por agora, apenas garantir que o Lucide está carregado
	if (typeof lucide !== 'undefined') {
	  lucide.createIcons();
	}
  }

  /**
   * Mostrar toast de notificação
   * @param {string} message - Mensagem
   * @param {string} type - Tipo (success, error, warning, info)
   */
  showToast(message, type = 'info') {
	const event = new CustomEvent('workspace-show-toast', {
	  detail: { message, type }
	});
	document.dispatchEvent(event);
  }

  /**
   * Abrir modal
   */
  openModal() {
	const modal = document.getElementById('appModal');
	if (modal) {
	  modal.classList.add('active');
	  document.body.style.overflow = 'hidden';
	}
  }

  /**
   * Fechar modal
   */
  closeModal() {
	const modal = document.getElementById('appModal');
	if (modal) {
	  modal.classList.remove('active');
	  document.body.style.overflow = '';
	}
  }

  /**
   * Obter histórico de navegação
   * @returns {Array} - Histórico de aplicações visitadas
   */
  getNavigationHistory() {
	return [...this.history];
  }

  /**
   * Limpar histórico
   */
  clearHistory() {
	this.history = [];
  }

  /**
   * Obter aplicação atual
   * @returns {string|null} - ID da aplicação atual
   */
  getCurrentApp() {
	return this.currentApp;
  }

  /**
   * Verificar se está em transição
   * @returns {boolean} - Estado de transição
   */
  isInTransition() {
	return this.isTransitioning;
  }

  /**
   * Destruir navegação
   */
  destroy() {
	if (this.transitionTimeout) {
	  clearTimeout(this.transitionTimeout);
	}
	
	// Remover event listeners se necessário
	// (embora isso seja difícil de fazer de forma limpa em JavaScript)
  }
}

// ========================================
// WORKSPACE HUB - MAIN APPLICATION
// Orquestração principal e inicialização
// ========================================

class WorkspaceHub {
  constructor() {
	this.version = '1.0.0';
	this.isInitialized = false;
	this.components = {
	  navigation: null,
	  ui: null
	};
	
	this.init();
  }

  /**
   * Inicializar aplicação
   */
  async init() {
	try {
	  console.log('🚀 Inicializando Workspace Hub v' + this.version);
	  
	  // Aguardar DOM estar pronto
	  if (document.readyState === 'loading') {
		await new Promise(resolve => {
		  document.addEventListener('DOMContentLoaded', resolve);
		});
	  }

	  // Verificar dependências
	  this.checkDependencies();

	  // Aguardar Lucide estar disponível
	  await this.waitForLucide();

	  // Inicializar componentes
	  await this.initializeComponents();

	  // Configurar handlers globais
	  this.setupGlobalHandlers();

	  // Inicializar eventos globais
	  this.setupGlobalEvents();

	  // Finalizar inicialização
	  await this.finalizeInitialization();

	  this.isInitialized = true;
	  console.log('✅ Workspace Hub inicializado com sucesso!');

	  // Mostrar mensagem de boas-vindas
	  this.showWelcomeMessage();

	} catch (error) {
	  console.error('❌ Erro na inicialização:', error);
	  this.showInitializationError(error);
	}
  }

  /**
   * Verificar dependências
   */
  checkDependencies() {
	const required = ['WORKSPACE_CONFIG', 'APPLICATIONS', 'FUTURE_SLOTS'];
	const missing = required.filter(dep => typeof window[dep] === 'undefined');
	
	if (missing.length > 0) {
	  throw new Error(`Dependências não encontradas: ${missing.join(', ')}`);
	}
  }

  /**
   * Aguardar Lucide estar disponível
   */
  waitForLucide() {
	return new Promise((resolve) => {
	  if (typeof lucide !== 'undefined') {
		resolve();
		return;
	  }

	  // Aguardar Lucide carregar
	  const checkLucide = () => {
		if (typeof lucide !== 'undefined') {
		  resolve();
		} else {
		  setTimeout(checkLucide, 100);
		}
	  };
	  checkLucide();

	  // Timeout de segurança
	  setTimeout(() => {
		console.warn('⚠️ Lucide não carregou, continuando sem ícones');
		resolve();
	  }, 5000);
	});
  }

  /**
   * Inicializar componentes
   */
  async initializeComponents() {
	// Aguardar componentes UI e Navegação
	this.components.ui = window.uiManager;
	this.components.navigation = window.navigationManager;

	if (!this.components.ui || !this.components.navigation) {
	  throw new Error('Componentes UI ou Navegação não foram inicializados');
	}

	console.log('📦 Componentes inicializados');
  }

  /**
   * Configurar handlers globais
   */
  setupGlobalHandlers() {
	// Handler de erros globais
	window.addEventListener('error', (e) => {
	  console.error('Erro global:', e.error);
	  this.handleGlobalError(e.error);
	});

	// Handler de promises rejeitadas
	window.addEventListener('unhandledrejection', (e) => {
	  console.error('Promise rejeitada:', e.reason);
	  this.handleGlobalError(e.reason);
	});

	// Handler de conexão
	window.addEventListener('online', () => {
	  this.showToast('Conexão restaurada!', 'success');
	});

	window.addEventListener('offline', () => {
	  this.showToast('Conexão perdida. Funcionalidades offline continuam disponíveis.', 'warning');
	});

	// Handler de visibilidade
	document.addEventListener('visibilitychange', () => {
	  this.handleVisibilityChange();
	});

	console.log('🔗 Handlers globais configurados');
  }

  /**
   * Configurar eventos globais
   */
  setupGlobalEvents() {
	// Event para atualizar estatísticas
	document.addEventListener('workspace-stats-update', () => {
	  this.updateGlobalStats();
	});

	// Event para tema
	document.addEventListener('workspace-theme-changed', (e) => {
	  this.handleThemeChange(e.detail);
	});

	// Event para navegação
	document.addEventListener('workspace-navigation', (e) => {
	  this.handleNavigationEvent(e.detail);
	});

	// Event para métricas
	document.addEventListener('workspace-metric', (e) => {
	  this.trackMetric(e.detail);
	});

	console.log('📡 Eventos globais configurados');
  }

  /**
   * Finalizar inicialização
   */
  async finalizeInitialization() {
	// Atualizar estatísticas globais
	this.updateGlobalStats();

	// Configurar Service Worker (se necessário)
	this.setupServiceWorker();

	// Configurar performance monitoring
	this.setupPerformanceMonitoring();

	// Validar integridade
	this.validateIntegrity();

	console.log('🎯 Inicialização finalizada');
  }

  /**
   * Mostrar mensagem de boas-vindas
   */
  showWelcomeMessage() {
	if (INIT_CONFIG.showWelcomeMessage) {
	  setTimeout(() => {
		this.showToast('Bem-vindo ao Workspace! Use Ctrl+K para buscar.', 'info', 8000);
	  }, 1000);
	}
  }

  /**
   * Mostrar erro de inicialização
   * @param {Error} error - Erro
   */
  showInitializationError(error) {
	const errorDiv = document.createElement('div');
	errorDiv.style.cssText = `
	  position: fixed;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	  background: var(--theme-bg-surface);
	  border: 1px solid var(--color-error-500);
	  border-radius: 12px;
	  padding: 32px;
	  text-align: center;
	  z-index: 10000;
	  max-width: 400px;
	`;

	errorDiv.innerHTML = `
	  <h3 style="color: var(--color-error-500); margin-bottom: 16px;">
		Erro na Inicialização
	  </h3>
	  <p style="color: var(--theme-text-secondary); margin-bottom: 24px;">
		${error.message}
	  </p>
	  <button onclick="location.reload()" style="
		background: var(--color-primary-500);
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 8px;
		cursor: pointer;
	  ">
		Recarregar Página
	  </button>
	`;

	document.body.appendChild(errorDiv);
  }

  /**
   * Lidar com mudança de visibilidade
   */
  handleVisibilityChange() {
	if (document.hidden) {
	  // Página ficou oculta
	  this.onPageHidden();
	} else {
	  // Página ficou visível
	  this.onPageVisible();
	}
  }

  /**
   * Página ficou oculta
   */
  onPageHidden() {
	console.log('👁️ Página ocultada');
	// Pausar animações se necessário
  }

  /**
   * Página ficou visível
   */
  onPageVisible() {
	console.log('👁️ Página visível');
	// Retomar animações, verificar atualizações
	this.checkForUpdates();
  }

  /**
   * Verificar atualizações
   */
  checkForUpdates() {
	if (INIT_CONFIG.checkVersion) {
	  // Implementar verificação de versão se necessário
	  console.log('🔄 Verificando atualizações...');
	}
  }

  /**
   * Configurar Service Worker
   */
  setupServiceWorker() {
	if ('serviceWorker' in navigator) {
	  navigator.serviceWorker.register('/sw.js')
		.then(registration => {
		  console.log('🔧 Service Worker registrado:', registration.scope);
		})
		.catch(error => {
		  console.warn('Service Worker não disponível:', error);
		});
	}
  }

  /**
   * Configurar monitoramento de performance
   */
  setupPerformanceMonitoring() {
	// Monitoring básico de performance
	if (typeof PerformanceObserver !== 'undefined') {
	  try {
		const observer = new PerformanceObserver((list) => {
		  list.getEntries().forEach((entry) => {
			if (entry.entryType === 'measure') {
			  console.log(`⏱️ ${entry.name}: ${entry.duration}ms`);
			}
		  });
		});
		
		observer.observe({ entryTypes: ['measure'] });
		
		// Marcar tempo de carregamento
		performance.mark('workspace-loaded');
		performance.measure('workspace-init', 'workspace-start', 'workspace-loaded');
		
	  } catch (error) {
		console.warn('Performance monitoring não disponível:', error);
	  }
	}
  }

  /**
   * Validar integridade
   */
  validateIntegrity() {
	// Verificações básicas de integridade
	const checks = [
	  { name: 'Applications loaded', test: () => APPLICATIONS.length > 0 },
	  { name: 'UI Manager ready', test: () => this.components.ui && this.components.ui.isInitialized },
	  { name: 'Navigation ready', test: () => this.components.navigation && this.components.navigation.isInTransition !== undefined }
	];

	const failed = checks.filter(check => !check.test());
	
	if (failed.length > 0) {
	  console.warn('⚠️ Verificações de integridade falharam:', failed.map(f => f.name));
	} else {
	  console.log('✅ Todas as verificações de integridade passaram');
	}
  }

  /**
   * Lidar com erro global
   * @param {Error} error - Erro
   */
  handleGlobalError(error) {
	// Não mostrar toasts para erros muito frequentes
	if (error.message && error.message.includes('Script error')) {
	  return;
	}

	this.showToast('Erro inesperado. Recarregue a página se o problema persistir.', 'error', 10000);
  }

  /**
   * Lidar com mudança de tema
   * @param {Object} detail - Detalhes da mudança
   */
  handleThemeChange(detail) {
	console.log('🎨 Tema alterado para:', detail.theme);
	// Atualizar analytics se necessário
  }

  /**
   * Lidar com evento de navegação
   * @param {Object} detail - Detalhes da navegação
   */
  handleNavigationEvent(detail) {
	console.log('🧭 Navegação:', detail);
	// Atualizar analytics
  }

  /**
   * Acompanhar métrica
   * @param {Object} detail - Dados da métrica
   */
  trackMetric(detail) {
	// Implementar tracking de métricas
	console.log('📊 Métrica:', detail);
  }

  /**
   * Mostrar toast
   * @param {string} message - Mensagem
   * @param {string} type - Tipo
   * @param {number} duration - Duração
   */
  showToast(message, type = 'info', duration = 5000) {
	const event = new CustomEvent('workspace-show-toast', {
	  detail: { message, type, duration }
	});
	document.dispatchEvent(event);
  }

  /**
   * Atualizar estatísticas globais
   */
  updateGlobalStats() {
	// Disparar evento para UI Manager atualizar
	const event = new CustomEvent('workspace-stats-update');
	document.dispatchEvent(event);
  }

  /**
   * Obter informações da aplicação
   * @returns {Object} - Informações
   */
  getAppInfo() {
	return {
	  name: WORKSPACE_CONFIG.name,
	  version: this.version,
	  configVersion: WORKSPACE_CONFIG.version,
	  isInitialized: this.isInitialized,
	  components: Object.keys(this.components),
	  stats: getWorkspaceStats(),
	  features: {
		themeSupport: true,
		search: true,
		keyboardShortcuts: true,
		responsive: true,
		offlineSupport: 'serviceWorker' in navigator
	  }
	};
  }

  /**
   * Obter saúde da aplicação
   * @returns {Object} - Status de saúde
   */
  getHealthStatus() {
	return {
	  status: this.isInitialized ? 'healthy' : 'initializing',
	  uptime: Date.now() - (window.workspaceStartTime || Date.now()),
	  memory: this.getMemoryUsage(),
	  errors: this.getErrorCount(),
	  lastUpdate: new Date().toISOString()
	};
  }

  /**
   * Obter uso de memória
   * @returns {Object} - Dados de memória
   */
  getMemoryUsage() {
	if ('memory' in performance) {
	  return {
		used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
		total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
		limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
	  };
	}
	return null;
  }

  /**
   * Obter contagem de erros
   * @returns {number} - Número de erros
   */
  getErrorCount() {
	// Implementar tracking de erros se necessário
	return 0;
  }

  /**
   * Reinicializar aplicação
   */
  async restart() {
	console.log('🔄 Reinicializando Workspace...');
	
	this.isInitialized = false;
	
	// Limpar estado
	if (this.components.navigation) {
	  this.components.navigation.clearHistory();
	}
	
	if (this.components.ui) {
	  this.components.ui.destroy();
	}
	
	// Reinicializar
	setTimeout(() => {
	  location.reload();
	}, 500);
  }

  /**
   * Destruir aplicação
   */
  destroy() {
	console.log('🗑️ Destruindo Workspace...');
	
	this.isInitialized = false;
	
	// Destruir componentes
	Object.values(this.components).forEach(component => {
	  if (component && typeof component.destroy === 'function') {
		component.destroy();
	  }
	});
	
	// Limpar eventos globais
	window.removeEventListener('error', this.handleGlobalError);
	window.removeEventListener('unhandledrejection', this.handleGlobalError);
	
	console.log('✅ Workspace destruído');
  }
}

// ========================================
// GLOBAL INITIALIZATION
// ========================================

// Marcar início da inicialização
window.workspaceStartTime = Date.now();

// ========================================
// DEVELOPMENT HELPERS
// ========================================

// Adicionar helpers de desenvolvimento em modo debug
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.workspaceDebug = {
	app: null,
	getInfo: () => window.workspaceDebug.app?.getAppInfo(),
	getHealth: () => window.workspaceDebug.app?.getHealthStatus(),
	restart: () => window.workspaceDebug.app?.restart(),
	stats: () => getWorkspaceStats(),
	applications: () => APPLICATIONS,
	components: () => ({
	  ui: window.uiManager,
	  navigation: window.navigationManager
	}),
	themes: THEME_CONFIG.available,
	shortcuts: NAVIGATION_CONFIG.keyboardShortcuts
  };
  
  console.log('🔧 Debug helpers disponíveis em window.workspaceDebug');
}

// ========================================
// APP STARTUP
// ========================================

// Inicializar aplicação
let workspaceApp = null;

// Aguardar DOM estar pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
	// Criar instâncias dos managers
	window.uiManager = new UIManager();
	window.navigationManager = new NavigationManager();
	window.navigationManager.loadStatsFromStorage();
	
	workspaceApp = new WorkspaceHub();
	if (window.workspaceDebug) {
	  window.workspaceDebug.app = workspaceApp;
	}
  });
} else {
  // Criar instâncias dos managers
  window.uiManager = new UIManager();
  window.navigationManager = new NavigationManager();
  window.navigationManager.loadStatsFromStorage();
  
  workspaceApp = new WorkspaceHub();
  if (window.workspaceDebug) {
	window.workspaceDebug.app = workspaceApp;
  }
}

// ========================================
// EXPORT FOR MODULES
// ========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = WorkspaceHub;
}

// Global export
if (typeof window !== 'undefined') {
  window.WorkspaceHub = WorkspaceHub;
  window.workspaceApp = workspaceApp;
}
