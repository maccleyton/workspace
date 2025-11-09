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
