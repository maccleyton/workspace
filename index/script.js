// Função para módulos em desenvolvimento
function showComingSoon() {
	alert('Este módulo está em desenvolvimento e será disponibilizado em breve!');
}

// Prevenir quebra para módulos não prontos
document.querySelectorAll('.module-card[href]').forEach(card => {
	card.addEventListener('click', function(e) {
		const href = this.getAttribute('href');
		if (href && href.includes('.html')) {
			// Verifica se o arquivo existe (simulação)
			const status = this.querySelector('.card-status').textContent;
			if (status === 'PLANEJAMENTO' || status === 'EM DESENVOLVIMENTO') {
				e.preventDefault();
				showComingSoon();
			}
		}
	});
});

// ✅ FUNCIONALIDADE DO TOGGLE DE TEMA - VERSÃO CORRIGIDA
document.addEventListener('DOMContentLoaded', function() {
	const themeToggle = document.getElementById('themeToggle');
	const themeIcon = document.getElementById('themeIcon');
	
	// Carregar tema salvo
	const savedTheme = localStorage.getItem('workspace-theme') || 'dark';
	applyTheme(savedTheme);
	
	themeToggle.addEventListener('click', function() {
		const currentTheme = document.documentElement.getAttribute('data-theme');
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		
		applyTheme(newTheme);
		localStorage.setItem('workspace-theme', newTheme);
	});
	
	function applyTheme(theme) {
		// ✅ CORREÇÃO: Apenas alterar data-theme, não usar estilos inline
		document.documentElement.setAttribute('data-theme', theme);
		
		if (theme === 'light') {
			themeIcon.setAttribute('data-lucide', 'moon');
			themeToggle.classList.add('active');
			
			// ✅ REMOVIDO: Não aplicar estilos inline no body
			// ✅ REMOVIDO: Não criar CSS inline dinâmico
			// ✅ O CSS já está configurado via [data-theme="light"] no stylesheet
			
		} else {
			themeIcon.setAttribute('data-lucide', 'sun');
			themeToggle.classList.remove('active');
			
			// ✅ REMOVIDO: Não aplicar estilos inline no body
		}
		
		// Atualizar ícones apenas uma vez
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
	}

	// ✅ FUNCIONALIDADE DE BUSCA - VERSÃO OTIMIZADA
	const searchInput = document.getElementById('searchInput');
	const moduleCards = document.querySelectorAll('.module-card');
	
	if (searchInput) {
		searchInput.addEventListener('input', function() {
			const searchTerm = this.value.toLowerCase().trim();
			
			moduleCards.forEach(card => {
				const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
				const description = card.querySelector('.card-desc')?.textContent.toLowerCase() || '';
				
				const isMatch = title.includes(searchTerm) || description.includes(searchTerm);
				
				// ✅ CORREÇÃO: Usar classe para ocultar, não display inline
				if (isMatch) {
					card.classList.remove('hidden');
				} else {
					card.classList.add('hidden');
				}
			});
		});
	}

	// ✅ FUNCIONALIDADE DE FILTRO - VERSÃO OTIMIZADA
	const filterButtons = document.querySelectorAll('.btn-filter');
	
	// Função para aplicar filtro
	function applyFilter(filter) {
		moduleCards.forEach(card => {
			const statusElement = card.querySelector('.card-status');
			if (!statusElement) return;
			
			const status = statusElement.textContent.trim();
			
			let shouldShow = true;
			
			switch(filter) {
				case 'active':
					shouldShow = status === 'PRONTO';
					break;
				case 'all':
				default:
					shouldShow = true;
					break;
			}
			
			// ✅ CORREÇÃO: Usar classe para ocultar, não display inline
			if (shouldShow) {
				card.classList.remove('hidden');
			} else {
				card.classList.add('hidden');
			}
		});
	}
	
	// Aplicar filtro inicial baseado no botão ativo
	const activeFilterBtn = document.querySelector('.btn-filter.active');
	if (activeFilterBtn) {
		applyFilter(activeFilterBtn.getAttribute('data-filter'));
	}
	
	filterButtons.forEach(button => {
		button.addEventListener('click', function() {
			// Remove active from all buttons
			filterButtons.forEach(btn => btn.classList.remove('active'));
			// Add active to clicked button
			this.classList.add('active');
			
			const filter = this.getAttribute('data-filter');
			applyFilter(filter);
		});
	});
		
	// ✅ INICIALIZAÇÃO DOS ÍCONES
	if (typeof lucide !== 'undefined') {
		lucide.createIcons();
	}
});