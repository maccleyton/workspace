let currentConverter = 'json-xml';

function selectConverter(converter) {
	currentConverter = converter;
	
	document.querySelectorAll('.converter-item').forEach(item => item.classList.remove('active'));
	event.currentTarget.classList.add('active');

	document.querySelectorAll('.info-content').forEach(info => info.style.display = 'none');
	const infoId = 'info-' + converter;
	const infoElement = document.getElementById(infoId);
	if (infoElement) {
		infoElement.style.display = 'block';
	}

	document.getElementById('outputText').value = '';
	
	const conversionsDiv = document.getElementById('baseConversions');
	if (conversionsDiv) conversionsDiv.innerHTML = '';
}

function convert() {
	const input = document.getElementById('inputText').value.trim();
	const output = document.getElementById('outputText');

	if (!input) {
		output.value = 'Por favor, insira algum conteúdo na entrada.';
		return;
	}

	try {
		let result = '';

		switch (currentConverter) {
			case 'json-xml':
				result = convertJsonToXml(input);
				break;
			case 'json-yaml':
				result = convertJsonToYaml(input);
				break;
			case 'json-csv':
				result = convertJsonToCsv(input);
				break;
			case 'csv-sql':
				result = convertCsvToSql(input);
				break;
			case 'number-bases':
				result = convertNumberBases(input);
				break;
			case 'text-binary':
				result = convertTextBinary(input);
				break;
			case 'text-hex':
				result = convertTextHex(input);
				break;
			case 'minify-css':
				result = minifyCSS(input);
				break;
			case 'minify-js':
				result = minifyJS(input);
				break;
			case 'minify-json':
				result = minifyJson(input);
				break;
			case 'beautify':
				result = beautifyJson(input);
				break;
			case 'validate':
				result = validateJson(input);
				break;
			case 'base64':
				result = convertBase64(input);
				break;
			default:
				result = 'Conversor não implementado.';
		}

		output.value = result;
		updateStats(input, result);

	} catch (error) {
		output.value = 'ERRO: ' + error.message;
	}
}

// ✨ MINIFICADORES CSS E JS

function minifyCSS(css) {
	let minified = css;
	
	// Remove comentários
	minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
	
	// Remove espaços ao redor de {, }, :, ;, ,
	minified = minified.replace(/\s*{\s*/g, '{');
	minified = minified.replace(/\s*}\s*/g, '}');
	minified = minified.replace(/\s*:\s*/g, ':');
	minified = minified.replace(/\s*;\s*/g, ';');
	minified = minified.replace(/\s*,\s*/g, ',');
	
	// Remove quebras de linha e espaços múltiplos
	minified = minified.replace(/\s+/g, ' ');
	
	// Remove espaços antes e depois
	minified = minified.trim();
	
	// Remove último ponto-e-vírgula antes de }
	minified = minified.replace(/;}/g, '}');
	
	const original = css.length;
	const result = minified.length;
	const saved = ((1 - result / original) * 100).toFixed(1);
	
	return `/* CSS Minificado */
/* Original: ${original.toLocaleString()} bytes */
/* Minificado: ${result.toLocaleString()} bytes */
/* Economia: ${saved}% */

${minified}`;
}

function minifyJS(js) {
	let minified = js;
	
	// Remove comentários de linha
	minified = minified.replace(/\/\/.*$/gm, '');
	
	// Remove comentários de bloco
	minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
	
	// Remove espaços ao redor de operadores e pontuação
	minified = minified.replace(/\s*([{};,=()[\]])\s*/g, '$1');
	
	// Remove quebras de linha e espaços múltiplos
	minified = minified.replace(/\s+/g, ' ');
	
	// Remove espaços antes e depois
	minified = minified.trim();
	
	const original = js.length;
	const result = minified.length;
	const saved = ((1 - result / original) * 100).toFixed(1);
	
	return `/* JavaScript Minificado */
/* Original: ${original.toLocaleString()} bytes */
/* Minificado: ${result.toLocaleString()} bytes */
/* Economia: ${saved}% */

${minified}`;
}

// Funções existentes (mantidas)
function convertNumberBases(input) {
	const num = input.trim();
	let decimal;

	if (num.startsWith('0b')) {
		decimal = parseInt(num.slice(2), 2);
	} else if (num.startsWith('0x')) {
		decimal = parseInt(num.slice(2), 16);
	} else if (num.startsWith('0o')) {
		decimal = parseInt(num.slice(2), 8);
	} else {
		decimal = parseInt(num, 10);
	}

	if (isNaN(decimal)) {
		throw new Error('Número inválido');
	}

	const binary = decimal.toString(2);
	const octal = decimal.toString(8);
	const hex = decimal.toString(16).toUpperCase();

	showBaseConversions(decimal, binary, octal, hex);

	return `Conversões de Base para: ${decimal}

BINÁRIO (Base 2):
${binary}

OCTAL (Base 8):
${octal}

DECIMAL (Base 10):
${decimal}

HEXADECIMAL (Base 16):
${hex}`;
}

function showBaseConversions(dec, bin, oct, hex) {
	const conversionsDiv = document.getElementById('baseConversions');
	if (!conversionsDiv) return;

	conversionsDiv.innerHTML = `
		<div class="conversion-item">
			<div class="conversion-label"><span class="badge">DEC</span> Decimal</div>
			<div class="conversion-value">${dec}</div>
		</div>
		<div class="conversion-item">
			<div class="conversion-label"><span class="badge">BIN</span> Binário</div>
			<div class="conversion-value">${bin}</div>
		</div>
		<div class="conversion-item">
			<div class="conversion-label"><span class="badge">OCT</span> Octal</div>
			<div class="conversion-value">${oct}</div>
		</div>
		<div class="conversion-item">
			<div class="conversion-label"><span class="badge">HEX</span> Hexadecimal</div>
			<div class="conversion-value">${hex}</div>
		</div>
	`;
}

function convertTextBinary(input) {
	if (/^[01\s]+$/.test(input)) {
		const binary = input.replace(/\s/g, '');
		let text = '';
		for (let i = 0; i < binary.length; i += 8) {
			const byte = binary.substr(i, 8);
			if (byte.length === 8) {
				text += String.fromCharCode(parseInt(byte, 2));
			}
		}
		return `BINÁRIO → TEXTO\n\n${text}`;
	} else {
		let binary = '';
		for (let i = 0; i < input.length; i++) {
			const byte = input.charCodeAt(i).toString(2).padStart(8, '0');
			binary += byte + ' ';
			if ((i + 1) % 4 === 0) binary += ' ';
		}
		return `TEXTO → BINÁRIO\n\n${binary.trim()}`;
	}
}

function convertTextHex(input) {
	if (/^[0-9A-Fa-f\s]+$/.test(input) && input.length > 3) {
		const hex = input.replace(/\s/g, '');
		let text = '';
		for (let i = 0; i < hex.length; i += 2) {
			const byte = hex.substr(i, 2);
			text += String.fromCharCode(parseInt(byte, 16));
		}
		return `HEXADECIMAL → TEXTO\n\n${text}`;
	} else {
		let hex = '';
		for (let i = 0; i < input.length; i++) {
			const byte = input.charCodeAt(i).toString(16).toUpperCase().padStart(2, '0');
			hex += byte + ' ';
			if ((i + 1) % 8 === 0) hex += '\n';
		}
		return `TEXTO → HEXADECIMAL\n\n${hex.trim()}`;
	}
}

function convertJsonToXml(input) {
	const obj = JSON.parse(input);
	
	function objectToXml(obj, indent = 0) {
		const spaces = '  '.repeat(indent);
		let xml = '';

		for (const key in obj) {
			const value = obj[key];
			xml += `${spaces}<${key}>`;

			if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
				xml += '\n' + objectToXml(value, indent + 1) + spaces;
			} else if (Array.isArray(value)) {
				xml += '\n';
				value.forEach(item => {
					xml += `${spaces}  <item>`;
					if (typeof item === 'object') {
						xml += '\n' + objectToXml(item, indent + 2) + spaces + '  ';
					} else {
						xml += item;
					}
					xml += `</item>\n`;
				});
				xml += spaces;
			} else {
				xml += value;
			}

			xml += `</${key}>\n`;
		}

		return xml;
	}

	return '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n' + objectToXml(obj, 1) + '</root>';
}

function convertJsonToYaml(input) {
	const obj = JSON.parse(input);
	return jsyaml.dump(obj, { indent: 2 });
}

function convertJsonToCsv(input) {
	const arr = JSON.parse(input);
	
	if (!Array.isArray(arr) || arr.length === 0) {
		throw new Error('JSON deve ser um array não vazio');
	}

	const headers = Object.keys(arr[0]);
	let csv = headers.join(',') + '\n';

	arr.forEach(obj => {
		const values = headers.map(header => {
			const value = obj[header];
			return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
		});
		csv += values.join(',') + '\n';
	});

	return csv;
}

function convertCsvToSql(input) {
	const lines = input.trim().split('\n');
	
	if (lines.length < 2) {
		throw new Error('CSV deve ter cabeçalho e dados');
	}

	const tableName = 'tabela';
	const headers = lines[0].split(',').map(h => h.trim());
	let sql = '';

	for (let i = 1; i < lines.length; i++) {
		const values = lines[i].split(',').map(v => {
			v = v.trim();
			return isNaN(v) ? `'${v}'` : v;
		});

		sql += `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${values.join(', ')});\n`;
	}

	return sql;
}

function minifyJson(input) {
	const obj = JSON.parse(input);
	return JSON.stringify(obj);
}

function beautifyJson(input) {
	const obj = JSON.parse(input);
	return JSON.stringify(obj, null, 2);
}

function validateJson(input) {
	try {
		JSON.parse(input);
		return '✓ JSON válido!\n\nSua sintaxe está correta.';
	} catch (e) {
		return '✗ JSON inválido\n\nErro: ' + e.message;
	}
}

function convertBase64(input) {
	try {
		const decoded = atob(input);
		return 'DECODE (Base64 → Texto):\n\n' + decoded;
	} catch {
		const encoded = btoa(input);
		return 'ENCODE (Texto → Base64):\n\n' + encoded;
	}
}

function updateStats(input, output) {
	const chars = input.length;
	const lines = input.split('\n').length;
	
	const statsElement = document.querySelector('#statsJson');
	if (statsElement) {
		const values = statsElement.querySelectorAll('.stat-value');
		values[0].textContent = chars.toLocaleString();
		values[1].textContent = lines.toLocaleString();
	}
}

function clearInput() {
	document.getElementById('inputText').value = '';
	document.getElementById('outputText').value = '';
	updateStats('', '');
	
	const conversionsDiv = document.getElementById('baseConversions');
	if (conversionsDiv) conversionsDiv.innerHTML = '';
}

function copyOutput() {
	const output = document.getElementById('outputText');
	output.select();
	document.execCommand('copy');
	
	const btn = event.currentTarget;
	const originalText = btn.innerHTML;
	btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
	setTimeout(() => {
		btn.innerHTML = originalText;
	}, 2000);
}

function downloadOutput() {
	const output = document.getElementById('outputText').value;
	
	if (!output) {
		alert('Nada para baixar');
		return;
	}

	const extensions = {
		'json-xml': 'xml',
		'json-yaml': 'yaml',
		'json-csv': 'csv',
		'csv-sql': 'sql',
		'number-bases': 'txt',
		'text-binary': 'txt',
		'text-hex': 'txt',
		'minify-css': 'css',
		'minify-js': 'js',
		'minify-json': 'json',
		'beautify': 'json',
		'validate': 'txt',
		'base64': 'txt'
	};

	const ext = extensions[currentConverter] || 'txt';
	const blob = new Blob([output], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `output.${ext}`;
	a.click();
	URL.revokeObjectURL(url);
}

// Sample data
document.getElementById('inputText').value = JSON.stringify({
	"nome": "João Silva",
	"idade": 30,
	"cidade": "São Paulo",
	"ativo": true
}, null, 2);

updateStats(document.getElementById('inputText').value, '');
