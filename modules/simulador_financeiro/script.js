// GLOBALS
let currentSchedule = [];
let currentSimulator = 'investimentos';
let chartInvestimentos = null;
let chartDesconto = null;

// CHART CONFIG
const chartConfig = {
	type: 'line',
	options: {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				labels: { color: '#e0e0e0', font: { size: 10 } }
			}
		},
		scales: {
			x: {
				ticks: { color: '#9ca3af', font: { size: 9 } },
				grid: { color: '#1a1a1a' }
			},
			y: {
				ticks: { 
					color: '#9ca3af', 
					font: { size: 9 },
					callback: value => 'R$ ' + value.toLocaleString('pt-BR')
				},
				grid: { color: '#1a1a1a' }
			}
		}
	}
};

// NAVIGATION
function selectSimulator(simulator) {
	currentSimulator = simulator;
	document.querySelectorAll('.simulator-item').forEach(item => item.classList.remove('active'));
	event.currentTarget.classList.add('active');
	document.querySelectorAll('.form-content').forEach(form => form.classList.remove('active'));
	document.getElementById(`form-${simulator}`).classList.add('active');
	
	// Reset visualizações
	document.querySelectorAll('.viz-content').forEach(viz => viz.classList.remove('active'));
	const hasResults = document.getElementById(`results-${simulator}`)?.classList.contains('active');
	
	if (hasResults) {
		document.getElementById(`viz-${simulator}`).classList.add('active');
	} else {
		document.getElementById('viz-empty').classList.add('active');
	}
}

function showViz(simulator) {
	document.querySelectorAll('.viz-content').forEach(viz => viz.classList.remove('active'));
	document.getElementById(`viz-${simulator}`).classList.add('active');
}

// INVESTIMENTOS
function updateTaxaFields() {
	const tipoTaxa = document.getElementById('tipoTaxa').value;
	const taxaBaseGroup = document.getElementById('taxaBaseGroup');
	const flexGroup = document.getElementById('flexGroup');
	const spreadGroup = document.getElementById('spreadGroup');

	taxaBaseGroup.style.display = 'none';
	flexGroup.style.display = 'none';
	spreadGroup.style.display = 'none';

	if (tipoTaxa.includes('+')) {
		taxaBaseGroup.style.display = 'block';
		flexGroup.style.display = 'block';
		spreadGroup.style.display = 'block';
	} else if (tipoTaxa && tipoTaxa !== 'Prefixada') {
		flexGroup.style.display = 'block';
	} else if (tipoTaxa === 'Prefixada') {
		taxaBaseGroup.style.display = 'block';
	}
}

function calcularInvestimento() {
	const valorInvestimento = parseFloat(document.getElementById('valorInvestimento').value);
	const tipoTaxa = document.getElementById('tipoTaxa').value;
	const dataVencimento = new Date(document.getElementById('dataVencimento').value);
	const isentoIR = document.getElementById('isentoIR').checked;

	if (!valorInvestimento || !tipoTaxa || !dataVencimento) {
		alert('Preencha todos os campos obrigatórios');
		return;
	}

	const hoje = new Date();
	const prazo = Math.floor((dataVencimento - hoje) / (1000 * 60 * 60 * 24));

	let taxaReal = 0;
	const taxasBase = { CDI: 14.9, SELIC: 15.0, IPCA: 5.2 };

	if (tipoTaxa === 'Prefixada') {
		taxaReal = parseFloat(document.getElementById('taxaBase').value) || 0;
	} else if (tipoTaxa.includes('+')) {
		const base = tipoTaxa.replace('+', '');
		const taxaBaseValor = taxasBase[base];
		const flex = parseFloat(document.getElementById('flex').value) || 100;
		const spread = parseFloat(document.getElementById('spread').value) || 0;
		taxaReal = (taxaBaseValor * flex / 100) + spread;
	} else {
		const flex = parseFloat(document.getElementById('flex').value) || 100;
		taxaReal = taxasBase[tipoTaxa] * flex / 100;
	}

	const taxaDiaria = Math.pow(1 + taxaReal / 100, 1 / 252) - 1;
	const fatorRendimento = Math.pow(1 + taxaDiaria, prazo);
	const valorBruto = valorInvestimento * fatorRendimento;
	const rendimento = valorBruto - valorInvestimento;

	let iof = 0;
	if (prazo < 30) {
		const tabelaIOF = [96, 93, 90, 86, 83, 80, 76, 73, 70, 66, 63, 60, 56, 53, 50, 46, 43, 40, 36, 33, 30, 26, 23, 20, 16, 13, 10, 6, 3, 0];
		const aliquotaIOF = prazo < tabelaIOF.length ? tabelaIOF[prazo] : 0;
		iof = rendimento * (aliquotaIOF / 100);
	}

	let ir = 0;
	if (!isentoIR) {
		let aliquotaIR = 0;
		if (prazo <= 180) aliquotaIR = 22.5;
		else if (prazo <= 360) aliquotaIR = 20;
		else if (prazo <= 720) aliquotaIR = 17.5;
		else aliquotaIR = 15;
		ir = rendimento * (aliquotaIR / 100);
	}

	const valorLiquido = valorBruto - iof - ir;

	document.getElementById('taxaReal').textContent = taxaReal.toFixed(2) + '% a.a.';
	document.getElementById('valorBruto').textContent = formatCurrency(valorBruto);
	document.getElementById('rendimento').textContent = formatCurrency(rendimento);
	document.getElementById('iof').textContent = formatCurrency(iof);
	document.getElementById('irrf').textContent = formatCurrency(ir);
	document.getElementById('valorLiquido').textContent = formatCurrency(valorLiquido);

	document.getElementById('results-investimentos').classList.add('active');
	
	// Gerar gráfico
	gerarGraficoInvestimento(valorInvestimento, valorBruto, valorLiquido, prazo, taxaDiaria);
	showViz('investimentos');
}

function gerarGraficoInvestimento(inicial, bruto, liquido, dias, taxaDiaria) {
	const meses = Math.ceil(dias / 30);
	const labels = [];
	const dataInicial = [];
	const dataBruto = [];
	const dataLiquido = [];

	for (let i = 0; i <= meses; i++) {
		const diasAtual = i * 30;
		labels.push(`Mês ${i}`);
		dataInicial.push(inicial);
		
		const fator = Math.pow(1 + taxaDiaria, diasAtual);
		const valorBrutoAtual = inicial * fator;
		const rendAtual = valorBrutoAtual - inicial;
		
		let irAtual = 0;
		if (diasAtual <= 180) irAtual = rendAtual * 0.225;
		else if (diasAtual <= 360) irAtual = rendAtual * 0.20;
		else if (diasAtual <= 720) irAtual = rendAtual * 0.175;
		else irAtual = rendAtual * 0.15;
		
		dataBruto.push(valorBrutoAtual);
		dataLiquido.push(valorBrutoAtual - irAtual);
	}

	if (chartInvestimentos) chartInvestimentos.destroy();
	
	chartInvestimentos = new Chart(document.getElementById('chartInvestimentos'), {
		...chartConfig,
		data: {
			labels,
			datasets: [
				{
					label: 'Valor Inicial',
					data: dataInicial,
					borderColor: '#6b7280',
					backgroundColor: 'rgba(107, 114, 128, 0.1)',
					borderDash: [5, 5]
				},
				{
					label: 'Valor Bruto',
					data: dataBruto,
					borderColor: '#34d399',
					backgroundColor: 'rgba(52, 211, 153, 0.1)'
				},
				{
					label: 'Valor Líquido',
					data: dataLiquido,
					borderColor: '#10b981',
					backgroundColor: 'rgba(16, 185, 129, 0.2)',
					fill: true
				}
			]
		}
	});
}

// DESCONTO COMERCIAL
function calcularDesconto() {
	const valorNominal = parseFloat(document.getElementById('valorNominal').value);
	const dataVencimento = new Date(document.getElementById('dataVencimentoDesconto').value);
	const taxaDesconto = parseFloat(document.getElementById('taxaDesconto').value) / 100;
	const tarifas = parseFloat(document.getElementById('tarifasAdicionais').value) || 0;

	if (!valorNominal || !dataVencimento || !taxaDesconto) {
		alert('Preencha todos os campos obrigatórios');
		return;
	}

	const hoje = new Date();
	const prazo = Math.floor((dataVencimento - hoje) / (1000 * 60 * 60 * 24));

	const descontoComercial = valorNominal * taxaDesconto * (prazo / 30);
	const iofFixo = 0.0038 * valorNominal;
	const iofAdicional = 0.000082 * valorNominal * prazo;
	const valorDescontado = valorNominal - descontoComercial - iofFixo - iofAdicional - tarifas;

	document.getElementById('prazoMedio').textContent = prazo + ' dias';
	document.getElementById('jurosCustos').textContent = formatCurrency(descontoComercial);
	document.getElementById('iofFixo').textContent = formatCurrency(iofFixo);
	document.getElementById('iofAdicional').textContent = formatCurrency(iofAdicional);
	document.getElementById('valorDescontado').textContent = formatCurrency(valorDescontado);

	document.getElementById('results-desconto').classList.add('active');
	
	// Gerar gráfico
	gerarGraficoDesconto(valorNominal, valorDescontado, prazo);
	showViz('desconto');
}

function gerarGraficoDesconto(nominal, descontado, dias) {
	const meses = Math.ceil(dias / 30);
	const labels = [];
	const dataNominal = [];
	const dataRecebido = [];

	for (let i = 0; i <= meses; i++) {
		labels.push(`Mês ${i}`);
		dataNominal.push(i === meses ? nominal : 0);
		dataRecebido.push(i === 0 ? descontado : 0);
	}

	if (chartDesconto) chartDesconto.destroy();
	
	chartDesconto = new Chart(document.getElementById('chartDesconto'), {
		...chartConfig,
		type: 'bar',
		data: {
			labels,
			datasets: [
				{
					label: 'Valor Recebido (Antecipação)',
					data: dataRecebido,
					backgroundColor: 'rgba(16, 185, 129, 0.8)',
					borderColor: '#10b981'
				},
				{
					label: 'Valor Nominal (Vencimento)',
					data: dataNominal,
					backgroundColor: 'rgba(52, 211, 153, 0.4)',
					borderColor: '#34d399'
				}
			]
		}
	});
}

// CONVERSOR
function converterTaxas() {
	const taxaEntrada = parseFloat(document.getElementById('taxaEntrada').value) / 100;
	const periodoOrigem = document.getElementById('periodoOrigem').value;
	const periodoDestino = document.getElementById('periodoDestino').value;

	if (!taxaEntrada || !periodoOrigem || !periodoDestino) {
		alert('Preencha todos os campos');
		return;
	}

	const periodos = {
		diario: 1, semanal: 7, mensal: 30, bimestral: 60,
		trimestral: 90, semestral: 180, anual: 360
	};

	const diasOrigem = periodos[periodoOrigem];
	const taxaDiaria = Math.pow(1 + taxaEntrada, 1 / diasOrigem) - 1;

	const diasDestino = periodos[periodoDestino];
	const taxaConvertida = (Math.pow(1 + taxaDiaria, diasDestino) - 1) * 100;

	const taxaMensal = (Math.pow(1 + taxaDiaria, 30) - 1) * 100;
	const taxaAnual = (Math.pow(1 + taxaDiaria, 360) - 1) * 100;

	document.getElementById('taxaConvertida').textContent = taxaConvertida.toFixed(4) + '%';
	document.getElementById('equivalenteMensal').textContent = taxaMensal.toFixed(4) + '%';
	document.getElementById('equivalenteAnual').textContent = taxaAnual.toFixed(4) + '%';

	const tbody = document.getElementById('tabelaConversao');
	tbody.innerHTML = '';
	
	Object.keys(periodos).forEach(periodo => {
		const dias = periodos[periodo];
		const taxa = (Math.pow(1 + taxaDiaria, dias) - 1) * 100;
		const row = tbody.insertRow();
		row.insertCell(0).textContent = periodo.charAt(0).toUpperCase() + periodo.slice(1);
		row.insertCell(1).textContent = taxa.toFixed(4) + '%';
	});

	document.getElementById('results-conversor').classList.add('active');
	showViz('conversor');
}

// CRÉDITO
function calculateCredit() {
	const creditValue = parseFloat(document.getElementById('creditValue')?.value) || 0;
	const amortizationType = document.getElementById('amortizationType')?.value;
	const baseDay = document.getElementById('baseDay')?.value;
	const gracePeriod = parseInt(document.getElementById('gracePeriod')?.value) || 0;
	const interestOnGrace = document.querySelector('input[name="interestOnGrace"]:checked')?.value === "yes";
	const interestCharge = document.querySelector('input[name="interestCharge"]:checked')?.value || "first";
	const amortizationFrequency = document.getElementById('amortizationFrequency')?.value;
	const totalTerm = parseInt(document.getElementById('totalTerm')?.value) || 0;
	const tac = parseFloat(document.getElementById('tac')?.value) || 0;
	const flatCommission = parseFloat(document.getElementById('flatCommission')?.value) || 0;
	const interestRate = parseFloat(document.getElementById('interestRate')?.value) / 100 || 0;
	const surchargeRate = parseFloat(document.getElementById('surchargeRate')?.value) / 100 || 0;

	if (!creditValue || !amortizationType || !totalTerm || !interestRate) {
		alert('Preencha todos os campos obrigatórios');
		return;
	}

	const totalRate = interestRate + surchargeRate;
	const amortizationTerm = totalTerm - gracePeriod;

	if (amortizationTerm <= 0) {
		alert('Prazo total deve ser maior que a carência');
		return;
	}

	const schedule = generatePaymentSchedule({
		creditValue, totalRate, amortizationType, gracePeriod,
		amortizationTerm, amortizationFrequency, interestOnGrace,
		interestCharge, baseDay
	});

	currentSchedule = schedule;

	const totalInterest = schedule.reduce((sum, item) => sum + item.juros, 0);
	const totalPaid = schedule.reduce((sum, item) => sum + item.parcelaValor, 0);

	const cetMonthly = calculateCET(creditValue, totalPaid + tac + flatCommission, totalTerm);
	const cetAnnual = Math.pow(1 + cetMonthly, 12) - 1;

	document.getElementById('cetMensal').textContent = (cetMonthly * 100).toFixed(4) + '%';
	document.getElementById('cetAnual').textContent = (cetAnnual * 100).toFixed(4) + '%';
	document.getElementById('totalJuros').textContent = formatCurrency(totalInterest);
	document.getElementById('totalPago').textContent = formatCurrency(totalPaid);

	const tbody = document.getElementById('cronograma');
	tbody.innerHTML = '';
	
	schedule.forEach(item => {
		const row = tbody.insertRow();
		row.insertCell(0).textContent = item.numero;
		row.insertCell(1).textContent = formatDate(item.vencimento);
		row.insertCell(2).textContent = formatCurrency(item.amortizacao);
		row.insertCell(3).textContent = formatCurrency(item.juros);
		row.insertCell(4).textContent = formatCurrency(item.parcelaValor);
		row.insertCell(5).textContent = formatCurrency(item.saldoDevedor);
	});

	document.getElementById('results-credito').classList.add('active');
	showViz('credito');
}

function generatePaymentSchedule(params) {
	const { creditValue, totalRate, amortizationType, gracePeriod,
			amortizationTerm, amortizationFrequency, interestOnGrace,
			interestCharge, baseDay } = params;

	let saldoDevedor = creditValue;
	const schedule = [];
	
	let jurosAcumuladosCarencia = 0;
	if (!interestOnGrace && gracePeriod > 0) {
		jurosAcumuladosCarencia = creditValue * (Math.pow(1 + totalRate, gracePeriod) - 1);
	}

	let valorBaseAmortizacao = creditValue;
	if (!interestOnGrace && interestCharge === 'amortization' && gracePeriod > 0) {
		valorBaseAmortizacao = creditValue + jurosAcumuladosCarencia;
	}
	
	const amortizationAmount = amortizationType === 'SAC' ? valorBaseAmortizacao / amortizationTerm : null;
	
	let parcelaPRICE = 0;
	if (amortizationType === 'PRICE') {
		parcelaPRICE = valorBaseAmortizacao * (totalRate * Math.pow(1 + totalRate, amortizationTerm)) / 
					   (Math.pow(1 + totalRate, amortizationTerm) - 1);
	}

	for (let i = 1; i <= (gracePeriod + amortizationTerm); i++) {
		const juros = saldoDevedor * totalRate;
		let amortizacao = 0;
		let parcela = 0;

		if (i <= gracePeriod) {
			amortizacao = 0;
			if (interestOnGrace) {
				parcela = juros;
			} else {
				parcela = 0;
				saldoDevedor += juros;
			}
		} else {
			if (i === gracePeriod + 1 && !interestOnGrace && interestCharge === 'first' && gracePeriod > 0) {
				if (amortizationType === 'SAC') {
					amortizacao = amortizationAmount + jurosAcumuladosCarencia;
					parcela = amortizacao + juros;
				} else {
					parcela = parcelaPRICE + jurosAcumuladosCarencia;
					amortizacao = parcela - juros;
				}
			} else {
				if (amortizationType === 'SAC') {
					amortizacao = amortizationAmount;
					parcela = amortizacao + juros;
				} else {
					parcela = parcelaPRICE;
					amortizacao = parcela - juros;
				}
			}
			saldoDevedor -= amortizacao;
		}

		const vencimentoDate = calculateDueDate(new Date(), i, baseDay);

		schedule.push({
			numero: i,
			vencimento: vencimentoDate,
			amortizacao,
			juros,
			parcelaValor: Math.abs(parcela),
			saldoDevedor: Math.max(0, saldoDevedor)
		});
	}

	return schedule;
}

function calculateDueDate(startDate, installmentNumber, baseDay) {
	const date = new Date(startDate);
	if (baseDay === 'contratacao') {
		date.setMonth(date.getMonth() + installmentNumber);
	} else if (baseDay === '1') {
		date.setMonth(date.getMonth() + installmentNumber);
		date.setDate(1);
	} else if (baseDay === '15') {
		date.setMonth(date.getMonth() + installmentNumber);
		date.setDate(15);
	} else if (baseDay === '30') {
		date.setMonth(date.getMonth() + installmentNumber + 1);
		date.setDate(0);
	}
	return date;
}

function calculateCET(principal, totalPaid, months) {
	let cetMonthly = 0;
	let low = -0.1;
	let high = 1;
	const tolerance = 0.0001;
	
	while (high - low > tolerance) {
		cetMonthly = (low + high) / 2;
		const pv = totalPaid / Math.pow(1 + cetMonthly, months);
		if (pv > principal) {
			low = cetMonthly;
		} else {
			high = cetMonthly;
		}
	}
	return cetMonthly;
}

function exportarCronograma() {
	if (currentSchedule.length === 0) {
		alert('Nenhum cronograma para exportar');
		return;
	}

	let csv = 'Parcela,Data,Amortização,Juros,Parcela,Saldo\n';
	currentSchedule.forEach(item => {
		csv += `${item.numero},${formatDate(item.vencimento)},${item.amortizacao.toFixed(2)},${item.juros.toFixed(2)},${item.parcelaValor.toFixed(2)},${item.saldoDevedor.toFixed(2)}\n`;
	});

	const blob = new Blob([csv], { type: 'text/csv' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'cronograma_pagamento.csv';
	a.click();
	window.URL.revokeObjectURL(url);
}

// UTILITY
function formatCurrency(value) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	}).format(value);
}

function formatDate(date) {
	return new Date(date).toLocaleDateString('pt-BR');
}
