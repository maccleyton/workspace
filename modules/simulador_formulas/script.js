let currentFormula = 'velocidade';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

document.addEventListener('DOMContentLoaded', function() {
	if (typeof renderMathInElement !== 'undefined') {
		renderMathInElement(document.body, {
			delimiters: [
				{left: '$$', right: '$$', display: true},
				{left: '$', right: '$', display: false}
			]
		});
	}
});

function selectFormula(formula) {
	currentFormula = formula;
	
	document.querySelectorAll('.formula-item').forEach(item => item.classList.remove('active'));
	event.currentTarget.classList.add('active');

	document.querySelectorAll('.formula-content').forEach(content => content.style.display = 'none');
	document.getElementById(`formula-${formula}`).style.display = 'block';

	document.querySelectorAll('.resolution-steps').forEach(steps => steps.classList.remove('active'));

	clearCanvas();
	document.getElementById('resultado').textContent = '-';
	document.getElementById('unidade').textContent = '';
}

function calcular() {
	let result = 0;
	let unit = '';

	document.querySelectorAll('.resolution-steps').forEach(steps => steps.classList.remove('active'));

	switch (currentFormula) {
		case 'velocidade':
			const ds = parseFloat(document.getElementById('vel-ds').value);
			const dt = parseFloat(document.getElementById('vel-dt').value);
			result = ds / dt;
			unit = 'm/s';
			drawVelocidade(ds, dt, result);
			showStepsVelocidade(ds, dt, result);
			break;

		case 'mruv':
			const s0 = parseFloat(document.getElementById('mruv-s0').value);
			const v0 = parseFloat(document.getElementById('mruv-v0').value);
			const a = parseFloat(document.getElementById('mruv-a').value);
			const t = parseFloat(document.getElementById('mruv-t').value);
			result = s0 + v0 * t + 0.5 * a * t * t;
			unit = 'm';
			drawMRUV(s0, v0, a, t);
			showStepsMRUV(s0, v0, a, t, result);
			break;

		case 'forca':
			const m = parseFloat(document.getElementById('forca-m').value);
			const ac = parseFloat(document.getElementById('forca-a').value);
			result = m * ac;
			unit = 'N';
			drawForca(m, ac, result);
			showStepsForca(m, ac, result);
			break;

		case 'energia-cinetica':
			const mass = parseFloat(document.getElementById('ec-m').value);
			const vel = parseFloat(document.getElementById('ec-v').value);
			result = 0.5 * mass * vel * vel;
			unit = 'J';
			drawEnergia(mass, vel);
			showStepsEnergia(mass, vel, result);
			break;

		case 'bhaskara':
			const ba = parseFloat(document.getElementById('bhask-a').value);
			const bb = parseFloat(document.getElementById('bhask-b').value);
			const bc = parseFloat(document.getElementById('bhask-c').value);
			const delta = bb * bb - 4 * ba * bc;
			
			drawParabola(ba, bb, bc);
			showStepsBhaskara(ba, bb, bc, delta);
			
			if (delta < 0) {
				document.getElementById('resultado').textContent = 'Sem raízes reais';
				document.getElementById('unidade').textContent = '';
			} else if (delta === 0) {
				const x1 = -bb / (2 * ba);
				document.getElementById('resultado').textContent = `x = ${x1.toFixed(2)}`;
				document.getElementById('unidade').textContent = '';
			} else {
				const x1 = (-bb + Math.sqrt(delta)) / (2 * ba);
				const x2 = (-bb - Math.sqrt(delta)) / (2 * ba);
				document.getElementById('resultado').textContent = `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
				document.getElementById('unidade').textContent = '';
			}
			return;

		case 'pitagoras':
			const catA = parseFloat(document.getElementById('pit-a').value);
			const catB = parseFloat(document.getElementById('pit-b').value);
			result = Math.sqrt(catA * catA + catB * catB);
			unit = 'm';
			drawPitagoras(catA, catB, result);
			showStepsPitagoras(catA, catB, result);
			break;

		case 'area-circulo':
			const r = parseFloat(document.getElementById('circ-r').value);
			result = Math.PI * r * r;
			unit = 'm²';
			drawCirculo(r);
			showStepsAreaCirculo(r, result);
			break;

		case 'volume-esfera':
			const re = parseFloat(document.getElementById('esf-r').value);
			result = (4/3) * Math.PI * Math.pow(re, 3);
			unit = 'm³';
			drawEsfera(re);
			showStepsVolumeEsfera(re, result);
			break;

		case 'volume-cilindro':
			const rc = parseFloat(document.getElementById('cil-r').value);
			const h = parseFloat(document.getElementById('cil-h').value);
			result = Math.PI * rc * rc * h;
			unit = 'm³';
			drawCilindro(rc, h);
			showStepsVolumeCilindro(rc, h, result);
			break;
	}

	document.getElementById('resultado').textContent = result.toFixed(2);
	document.getElementById('unidade').textContent = unit;
}

// ✨ FUNÇÕES DE PASSO A PASSO

function showStepsVelocidade(ds, dt, v) {
	const content = document.getElementById('steps-content-velocidade');
	content.innerHTML = `
		<div class="step-item">
			<div class="step-number">1</div>
			<div class="step-title">Dados Fornecidos</div>
			<div class="step-content">
				Deslocamento: $\\Delta s = ${ds}$ m<br>
				Tempo: $\\Delta t = ${dt}$ s
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">2</div>
			<div class="step-title">Fórmula da Velocidade Média</div>
			<div class="step-content">
				$$v = \\frac{\\Delta s}{\\Delta t}$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">3</div>
			<div class="step-title">Substituição dos Valores</div>
			<div class="step-content">
				$$v = \\frac{${ds}}{${dt}}$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">4</div>
			<div class="step-title">Resultado</div>
			<div class="step-content">
				$$v = ${v.toFixed(2)} \\text{ m/s}$$
				<div class="step-result">
					<i class="fas fa-check-circle"></i>
					Velocidade média = ${v.toFixed(2)} m/s
				</div>
			</div>
		</div>
	`;
	
	document.getElementById('steps-velocidade').classList.add('active');
	renderKaTeX();
}

function showStepsMRUV(s0, v0, a, t, s) {
	const content = document.getElementById('steps-content-mruv');
	content.innerHTML = `
		<div class="step-item">
			<div class="step-number">1</div>
			<div class="step-title">Dados Fornecidos</div>
			<div class="step-content">
				Posição inicial: $S_0 = ${s0}$ m<br>
				Velocidade inicial: $v_0 = ${v0}$ m/s<br>
				Aceleração: $a = ${a}$ m/s²<br>
				Tempo: $t = ${t}$ s
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">2</div>
			<div class="step-title">Equação Horária do MRUV</div>
			<div class="step-content">
				$$S = S_0 + v_0 t + \\frac{1}{2}at^2$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">3</div>
			<div class="step-title">Substituição dos Valores</div>
			<div class="step-content">
				$$S = ${s0} + ${v0} \\cdot ${t} + \\frac{1}{2} \\cdot ${a} \\cdot ${t}^2$$
				$$S = ${s0} + ${v0 * t} + \\frac{1}{2} \\cdot ${a} \\cdot ${t * t}$$
				$$S = ${s0} + ${v0 * t} + ${0.5 * a * t * t}$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">4</div>
			<div class="step-title">Resultado</div>
			<div class="step-content">
				$$S = ${s.toFixed(2)} \\text{ m}$$
				<div class="step-result">
					<i class="fas fa-check-circle"></i>
					Posição final = ${s.toFixed(2)} m
				</div>
			</div>
		</div>
	`;
	
	document.getElementById('steps-mruv').classList.add('active');
	renderKaTeX();
}

function showStepsForca(m, a, f) {
	const content = document.getElementById('steps-content-forca');
	content.innerHTML = `
		<div class="step-item">
			<div class="step-number">1</div>
			<div class="step-title">Dados Fornecidos</div>
			<div class="step-content">
				Massa: $m = ${m}$ kg<br>
				Aceleração: $a = ${a}$ m/s²
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">2</div>
			<div class="step-title">2ª Lei de Newton</div>
			<div class="step-content">
				$$F = m \\cdot a$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">3</div>
			<div class="step-title">Substituição dos Valores</div>
			<div class="step-content">
				$$F = ${m} \\cdot ${a}$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">4</div>
			<div class="step-title">Resultado</div>
			<div class="step-content">
				$$F = ${f.toFixed(2)} \\text{ N}$$
				<div class="step-result">
					<i class="fas fa-check-circle"></i>
					Força resultante = ${f.toFixed(2)} N
				</div>
			</div>
		</div>
	`;
	
	document.getElementById('steps-forca').classList.add('active');
	renderKaTeX();
}

function showStepsEnergia(m, v, ec) {
	const content = document.getElementById('steps-content-energia-cinetica');
	content.innerHTML = `
		<div class="step-item">
			<div class="step-number">1</div>
			<div class="step-title">Dados Fornecidos</div>
			<div class="step-content">
				Massa: $m = ${m}$ kg<br>
				Velocidade: $v = ${v}$ m/s
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">2</div>
			<div class="step-title">Fórmula da Energia Cinética</div>
			<div class="step-content">
				$$E_c = \\frac{1}{2}mv^2$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">3</div>
			<div class="step-title">Substituição dos Valores</div>
			<div class="step-content">
				$$E_c = \\frac{1}{2} \\cdot ${m} \\cdot ${v}^2$$
				$$E_c = \\frac{1}{2} \\cdot ${m} \\cdot ${v * v}$$
				$$E_c = ${0.5 * m} \\cdot ${v * v}$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">4</div>
			<div class="step-title">Resultado</div>
			<div class="step-content">
				$$E_c = ${ec.toFixed(2)} \\text{ J}$$
				<div class="step-result">
					<i class="fas fa-check-circle"></i>
					Energia cinética = ${ec.toFixed(2)} J
				</div>
			</div>
		</div>
	`;
	
	document.getElementById('steps-energia-cinetica').classList.add('active');
	renderKaTeX();
}

function showStepsBhaskara(a, b, c, delta) {
	const content = document.getElementById('steps-content-bhaskara');
	let stepsHTML = `
		<div class="step-item">
			<div class="step-number">1</div>
			<div class="step-title">Equação Fornecida</div>
			<div class="step-content">
				Coeficientes: $a = ${a}$, $b = ${b}$, $c = ${c}$<br>
				Equação: $${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">2</div>
			<div class="step-title">Cálculo do Discriminante (Δ)</div>
			<div class="step-content">
				$$\\Delta = b^2 - 4ac$$
				$$\\Delta = (${b})^2 - 4 \\cdot ${a} \\cdot ${c}$$
				$$\\Delta = ${b * b} - ${4 * a * c}$$
				$$\\Delta = ${delta}$$
			</div>
		</div>
	`;

	if (delta < 0) {
		stepsHTML += `
			<div class="step-item">
				<div class="step-number">3</div>
				<div class="step-title">Análise do Resultado</div>
				<div class="step-content">
					Como $\\Delta < 0$, a equação não possui raízes reais.
					<div class="step-result" style="background: rgba(239, 68, 68, 0.15); border-color: var(--danger); color: var(--danger);">
						<i class="fas fa-times-circle"></i>
						Sem raízes reais
					</div>
				</div>
			</div>
		`;
	} else {
		const x1 = (-b + Math.sqrt(delta)) / (2 * a);
		const x2 = (-b - Math.sqrt(delta)) / (2 * a);
		
		stepsHTML += `
			<div class="step-item">
				<div class="step-number">3</div>
				<div class="step-title">Aplicar a Fórmula de Bhaskara</div>
				<div class="step-content">
					$$x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$$
					$$x = \\frac{-(${b}) \\pm \\sqrt{${delta}}}{2 \\cdot ${a}}$$
					$$x = \\frac{${-b} \\pm ${Math.sqrt(delta).toFixed(2)}}{${2 * a}}$$
				</div>
			</div>

			<div class="step-item">
				<div class="step-number">4</div>
				<div class="step-title">Calcular as Raízes</div>
				<div class="step-content">
					$$x_1 = \\frac{${-b} + ${Math.sqrt(delta).toFixed(2)}}{${2 * a}} = ${x1.toFixed(2)}$$
					$$x_2 = \\frac{${-b} - ${Math.sqrt(delta).toFixed(2)}}{${2 * a}} = ${x2.toFixed(2)}$$
					<div class="step-result">
						<i class="fas fa-check-circle"></i>
						Raízes: x₁ = ${x1.toFixed(2)} e x₂ = ${x2.toFixed(2)}
					</div>
				</div>
			</div>
		`;
	}

	content.innerHTML = stepsHTML;
	document.getElementById('steps-bhaskara').classList.add('active');
	renderKaTeX();
}

function showStepsPitagoras(a, b, c) {
	const content = document.getElementById('steps-content-pitagoras');
	content.innerHTML = `
		<div class="step-item">
			<div class="step-number">1</div>
			<div class="step-title">Dados do Triângulo</div>
			<div class="step-content">
				Cateto $a = ${a}$ m<br>
				Cateto $b = ${b}$ m<br>
				Hipotenusa $c = ?$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">2</div>
			<div class="step-title">Teorema de Pitágoras</div>
			<div class="step-content">
				$$a^2 + b^2 = c^2$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">3</div>
			<div class="step-title">Substituição dos Valores</div>
			<div class="step-content">
				$$${a}^2 + ${b}^2 = c^2$$
				$$${a * a} + ${b * b} = c^2$$
				$$${a * a + b * b} = c^2$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">4</div>
			<div class="step-title">Calcular a Hipotenusa</div>
			<div class="step-content">
				$$c = \\sqrt{${a * a + b * b}}$$
				$$c = ${c.toFixed(2)} \\text{ m}$$
				<div class="step-result">
					<i class="fas fa-check-circle"></i>
					Hipotenusa = ${c.toFixed(2)} m
				</div>
			</div>
		</div>
	`;
	
	document.getElementById('steps-pitagoras').classList.add('active');
	renderKaTeX();
}

function showStepsAreaCirculo(r, a) {
	const content = document.getElementById('steps-content-area-circulo');
	content.innerHTML = `
		<div class="step-item">
			<div class="step-number">1</div>
			<div class="step-title">Dado Fornecido</div>
			<div class="step-content">
				Raio: $r = ${r}$ m
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">2</div>
			<div class="step-title">Fórmula da Área do Círculo</div>
			<div class="step-content">
				$$A = \\pi r^2$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">3</div>
			<div class="step-title">Substituição dos Valores</div>
			<div class="step-content">
				$$A = \\pi \\cdot ${r}^2$$
				$$A = \\pi \\cdot ${r * r}$$
				$$A = ${r * r}\\pi$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">4</div>
			<div class="step-title">Resultado</div>
			<div class="step-content">
				$$A = ${a.toFixed(2)} \\text{ m}^2$$
				<div class="step-result">
					<i class="fas fa-check-circle"></i>
					Área = ${a.toFixed(2)} m²
				</div>
			</div>
		</div>
	`;
	
	document.getElementById('steps-area-circulo').classList.add('active');
	renderKaTeX();
}

function showStepsVolumeEsfera(r, v) {
	const content = document.getElementById('steps-content-volume-esfera');
	content.innerHTML = `
		<div class="step-item">
			<div class="step-number">1</div>
			<div class="step-title">Dado Fornecido</div>
			<div class="step-content">
				Raio: $r = ${r}$ m
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">2</div>
			<div class="step-title">Fórmula do Volume da Esfera</div>
			<div class="step-content">
				$$V = \\frac{4}{3}\\pi r^3$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">3</div>
			<div class="step-title">Substituição dos Valores</div>
			<div class="step-content">
				$$V = \\frac{4}{3}\\pi \\cdot ${r}^3$$
				$$V = \\frac{4}{3}\\pi \\cdot ${r * r * r}$$
				$$V = \\frac{${4 * r * r * r}}{3}\\pi$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">4</div>
			<div class="step-title">Resultado</div>
			<div class="step-content">
				$$V = ${v.toFixed(2)} \\text{ m}^3$$
				<div class="step-result">
					<i class="fas fa-check-circle"></i>
					Volume = ${v.toFixed(2)} m³
				</div>
			</div>
		</div>
	`;
	
	document.getElementById('steps-volume-esfera').classList.add('active');
	renderKaTeX();
}

function showStepsVolumeCilindro(r, h, v) {
	const content = document.getElementById('steps-content-volume-cilindro');
	content.innerHTML = `
		<div class="step-item">
			<div class="step-number">1</div>
			<div class="step-title">Dados Fornecidos</div>
			<div class="step-content">
				Raio: $r = ${r}$ m<br>
				Altura: $h = ${h}$ m
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">2</div>
			<div class="step-title">Fórmula do Volume do Cilindro</div>
			<div class="step-content">
				$$V = \\pi r^2 h$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">3</div>
			<div class="step-title">Substituição dos Valores</div>
			<div class="step-content">
				$$V = \\pi \\cdot ${r}^2 \\cdot ${h}$$
				$$V = \\pi \\cdot ${r * r} \\cdot ${h}$$
				$$V = ${r * r * h}\\pi$$
			</div>
		</div>

		<div class="step-item">
			<div class="step-number">4</div>
			<div class="step-title">Resultado</div>
			<div class="step-content">
				$$V = ${v.toFixed(2)} \\text{ m}^3$$
				<div class="step-result">
					<i class="fas fa-check-circle"></i>
					Volume = ${v.toFixed(2)} m³
				</div>
			</div>
		</div>
	`;
	
	document.getElementById('steps-volume-cilindro').classList.add('active');
	renderKaTeX();
}

function renderKaTeX() {
	if (typeof renderMathInElement !== 'undefined') {
		setTimeout(() => {
			renderMathInElement(document.body, {
				delimiters: [
					{left: '$$', right: '$$', display: true},
					{left: '$', right: '$', display: false}
				],
				throwOnError: false
			});
		}, 50);
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawVelocidade(ds, dt, v) {
	clearCanvas();
	ctx.strokeStyle = '#10b981';
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(50, 250);
	ctx.lineTo(300, 100);
	ctx.stroke();

	ctx.fillStyle = '#10b981';
	ctx.font = '14px Inter';
	ctx.fillText(`v = ${v.toFixed(1)} m/s`, 150, 150);
}

function drawMRUV(s0, v0, a, t) {
	clearCanvas();
	ctx.strokeStyle = '#10b981';
	ctx.lineWidth = 2;

	const scale = 5;
	const points = [];
	for (let time = 0; time <= t; time += 0.1) {
		const s = s0 + v0 * time + 0.5 * a * time * time;
		points.push({x: 50 + time * 30, y: 250 - s * scale});
	}

	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	points.forEach(p => ctx.lineTo(p.x, p.y));
	ctx.stroke();
}

function drawForca(m, a, f) {
	clearCanvas();
	const cx = 200;
	const cy = 150;

	ctx.fillStyle = '#1a1a1a';
	ctx.fillRect(cx - 40, cy - 30, 80, 60);
	ctx.strokeStyle = '#10b981';
	ctx.lineWidth = 2;
	ctx.strokeRect(cx - 40, cy - 30, 80, 60);

	ctx.strokeStyle = '#10b981';
	ctx.fillStyle = '#10b981';
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(cx + 40, cy);
	ctx.lineTo(cx + 120, cy);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(cx + 120, cy);
	ctx.lineTo(cx + 110, cy - 8);
	ctx.lineTo(cx + 110, cy + 8);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = '#10b981';
	ctx.font = '14px Inter';
	ctx.fillText(`F = ${f.toFixed(1)} N`, cx + 50, cy - 20);
}

function drawEnergia(m, v) {
	clearCanvas();
	const cx = 200;
	const cy = 150;
	const radius = 20;

	ctx.fillStyle = '#10b981';
	ctx.beginPath();
	ctx.arc(cx, cy, radius, 0, Math.PI * 2);
	ctx.fill();

	ctx.strokeStyle = '#10b981';
	ctx.lineWidth = 2;
	for (let i = 0; i < 3; i++) {
		const x = cx - radius - 10 - i * 15;
		ctx.beginPath();
		ctx.moveTo(x, cy - 10);
		ctx.lineTo(x - 10, cy + 10);
		ctx.stroke();
	}

	ctx.fillStyle = '#10b981';
	ctx.font = '14px Inter';
	ctx.fillText(`v = ${v} m/s`, cx - 30, cy + 50);
}

function drawParabola(a, b, c) {
	clearCanvas();
	
	const width = canvas.width;
	const height = canvas.height;
	const centerX = width / 2;
	const centerY = height / 2;
	const scale = 20;
	
	ctx.strokeStyle = '#1a1a1a';
	ctx.lineWidth = 1;
	
	for (let x = -10; x <= 10; x++) {
		ctx.beginPath();
		ctx.moveTo(centerX + x * scale, 0);
		ctx.lineTo(centerX + x * scale, height);
		ctx.stroke();
	}
	
	for (let y = -7; y <= 7; y++) {
		ctx.beginPath();
		ctx.moveTo(0, centerY - y * scale);
		ctx.lineTo(width, centerY - y * scale);
		ctx.stroke();
	}
	
	ctx.strokeStyle = '#6b7280';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(0, centerY);
	ctx.lineTo(width, centerY);
	ctx.moveTo(centerX, 0);
	ctx.lineTo(centerX, height);
	ctx.stroke();
	
	ctx.strokeStyle = '#10b981';
	ctx.lineWidth = 3;
	ctx.beginPath();
	
	let firstPoint = true;
	for (let x = -10; x <= 10; x += 0.05) {
		const y = a * x * x + b * x + c;
		if (Math.abs(y) > 15) continue;
		
		const px = centerX + x * scale;
		const py = centerY - y * scale;
		
		if (firstPoint) {
			ctx.moveTo(px, py);
			firstPoint = false;
		} else {
			ctx.lineTo(px, py);
		}
	}
	ctx.stroke();
	
	const delta = b * b - 4 * a * c;
	
	if (delta >= 0) {
		const x1 = (-b + Math.sqrt(delta)) / (2 * a);
		const x2 = (-b - Math.sqrt(delta)) / (2 * a);
		
		if (Math.abs(x1) <= 10) {
			ctx.fillStyle = '#34d399';
			ctx.beginPath();
			ctx.arc(centerX + x1 * scale, centerY, 5, 0, Math.PI * 2);
			ctx.fill();
		}
		
		if (delta > 0 && Math.abs(x2) <= 10) {
			ctx.fillStyle = '#34d399';
			ctx.beginPath();
			ctx.arc(centerX + x2 * scale, centerY, 5, 0, Math.PI * 2);
			ctx.fill();
		}
	}
}

function drawPitagoras(a, b, c) {
	clearCanvas();
	const scale = 30;
	const x1 = 100, y1 = 200;
	const x2 = x1 + a * scale;
	const y2 = y1;
	const x3 = x1;
	const y3 = y1 - b * scale;

	ctx.strokeStyle = '#10b981';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.closePath();
	ctx.stroke();

	ctx.fillStyle = '#10b981';
	ctx.font = '12px Inter';
	ctx.fillText(`a=${a}`, x1 + a * scale / 2 - 10, y1 + 20);
	ctx.fillText(`b=${b}`, x1 - 30, y1 - b * scale / 2);
	ctx.fillText(`c=${c.toFixed(1)}`, x1 + 20, y1 - b * scale / 2 + 20);
}

function drawCirculo(r) {
	clearCanvas();
	const cx = 200;
	const cy = 150;
	const scale = Math.min(100 / r, 30);

	ctx.strokeStyle = '#10b981';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(cx, cy, r * scale, 0, Math.PI * 2);
	ctx.stroke();

	ctx.strokeStyle = '#6b7280';
	ctx.setLineDash([5, 5]);
	ctx.beginPath();
	ctx.moveTo(cx, cy);
	ctx.lineTo(cx + r * scale, cy);
	ctx.stroke();
	ctx.setLineDash([]);

	ctx.fillStyle = '#10b981';
	ctx.font = '12px Inter';
	ctx.fillText(`r=${r}`, cx + r * scale / 2 - 10, cy - 10);
}

function drawEsfera(r) {
	clearCanvas();
	const cx = 200;
	const cy = 150;
	const scale = Math.min(100 / r, 30);

	ctx.strokeStyle = '#10b981';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(cx, cy, r * scale, 0, Math.PI * 2);
	ctx.stroke();

	ctx.strokeStyle = '#6b7280';
	ctx.beginPath();
	ctx.ellipse(cx, cy, r * scale, r * scale * 0.3, 0, 0, Math.PI * 2);
	ctx.stroke();

	ctx.fillStyle = '#10b981';
	ctx.font = '12px Inter';
	ctx.fillText(`r=${r}`, cx + 10, cy - r * scale - 10);
}

function drawCilindro(r, h) {
	clearCanvas();
	const cx = 200;
	const cy = 100;
	const scaleR = Math.min(80 / r, 25);
	const scaleH = Math.min(150 / h, 25);

	ctx.strokeStyle = '#10b981';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.ellipse(cx, cy, r * scaleR, r * scaleR * 0.3, 0, 0, Math.PI * 2);
	ctx.stroke();

	ctx.beginPath();
	ctx.ellipse(cx, cy + h * scaleH, r * scaleR, r * scaleR * 0.3, 0, 0, Math.PI * 2);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(cx - r * scaleR, cy);
	ctx.lineTo(cx - r * scaleR, cy + h * scaleH);
	ctx.moveTo(cx + r * scaleR, cy);
	ctx.lineTo(cx + r * scaleR, cy + h * scaleH);
	ctx.stroke();

	ctx.fillStyle = '#10b981';
	ctx.font = '12px Inter';
	ctx.fillText(`r=${r}`, cx + r * scaleR + 10, cy + 5);
	ctx.fillText(`h=${h}`, cx - 30, cy + h * scaleH / 2);
}

clearCanvas();
ctx.fillStyle = '#6b7280';
ctx.font = '14px Inter';
ctx.textAlign = 'center';
ctx.fillText('Selecione uma fórmula e calcule', 200, 150);
