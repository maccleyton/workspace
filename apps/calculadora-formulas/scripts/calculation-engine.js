/* ========================================
   ENGINE DE CÁLCULOS MATEMÁTICOS
   ======================================== */

class CalculationEngine {
    static math = {
        pi: Math.PI,
        e: Math.E,
        sqrt: Math.sqrt,
        pow: Math.pow,
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        log: Math.log,
        exp: Math.exp,
        abs: Math.abs,
        max: Math.max,
        min: Math.min
    };

    /* ========================================
       EXECUÇÃO PRINCIPAL DE CÁLCULOS
       ======================================== */
    static execute(formula, variables) {
        try {
            // Validação inicial
            const validation = this.validateInputs(formula, variables);
            if (!validation.isValid) {
                return {
                    success: false,
                    error: validation.errors.join(', ')
                };
            }

            // Processa as variáveis
            const processedVars = this.processVariables(formula, variables);
            
            // Executa o cálculo específico da fórmula
            const result = this.calculateSpecific(formula.id, processedVars);
            
            if (!result.success) {
                return result;
            }

            // Gera os passos de resolução
            const steps = this.generateSteps(formula, processedVars, result);
            
            // Adiciona ao histórico
            this.addToHistory(formula, variables, result, steps);
            
            return {
                success: true,
                result: result.value,
                latexResult: this.formatResultLatex(formula, result.value),
                steps: steps,
                variables: processedVars,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Erro no cálculo:', error);
            return {
                success: false,
                error: `Erro no cálculo: ${error.message}`
            };
        }
    }

    /* ========================================
       VALIDAÇÃO DE ENTRADA
       ======================================== */
    static validateInputs(formula, variables) {
        const errors = [];
        
        // Verifica se a fórmula existe
        if (!formula) {
            errors.push('Fórmula não especificada');
            return { isValid: false, errors };
        }

        // Verifica se as variáveis foram fornecidas
        if (!variables || typeof variables !== 'object') {
            errors.push('Variáveis não fornecidas');
            return { isValid: false, errors };
        }

        // Verifica cada variável requerida
        formula.variables.forEach(variable => {
            if (variable.required && !(variable.name in variables)) {
                errors.push(`Variável '${variable.label}' é obrigatória`);
                return;
            }

            if (variable.name in variables) {
                const value = variables[variable.name];
                const varErrors = CalculatorUtils.Validator.validateVariable(
                    variable.label,
                    value,
                    {
                        required: variable.required,
                        min: variable.min,
                        max: variable.max
                    }
                );
                errors.push(...varErrors);
            }
        });

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /* ========================================
       PROCESSAMENTO DE VARIÁVEIS
       ======================================== */
    static processVariables(formula, variables) {
        const processed = {};
        
        formula.variables.forEach(variable => {
            let value = variables[variable.name];
            
            // Converte string para número se necessário
            if (variable.type === 'number' && typeof value === 'string') {
                value = CalculatorUtils.MathUtils.parseNumber(value);
            }
            
            // Aplica valor padrão se não fornecido
            if (value === undefined || value === null || value === '') {
                value = variable.defaultValue || 0;
            }
            
            processed[variable.name] = {
                value: value,
                displayValue: this.formatValue(value, variable),
                variable: variable
            };
        });
        
        return processed;
    }

    static formatValue(value, variable) {
        if (typeof value === 'number') {
            const formatted = CalculatorUtils.MathUtils.formatNumber(value, 6);
            return variable.unit ? `${formatted} ${variable.unit}` : formatted;
        }
        return value;
    }

    /* ========================================
       CÁLCULOS ESPECÍFICOS POR FÓRMULA
       ======================================== */
    static calculateSpecific(formulaId, variables) {
        const calculators = {
            // ÁLGEBRA
            'equacao_2_grau': () => this.calculateQuadratic(variables),
            'formula_bhaskara': () => this.calculateQuadratic(variables),
            'progressao_aritmetica': () => this.calculateAP(variables),
            'soma_pa': () => this.calculateAPSum(variables),
            'progressao_geometrica': () => this.calculateGP(variables),
            'soma_pg_finita': () => this.calculateGPSum(variables),
            'soma_pg_infinita': () => this.calculateGPInfiniteSum(variables),
            'binomio_newton': () => this.calculateBinomial(variables),
            'sistema_2x2_cramer': () => this.calculateSystem2x2(variables),
            'logaritmo_natural': () => this.calculateNaturalLog(variables),

            // GEOMETRIA
            'area_circulo': () => this.calculateCircleArea(variables),
            'perimetro_circulo': () => this.calculateCirclePerimeter(variables),
            'area_triangulo': () => this.calculateTriangleArea(variables),
            'teorema_pitagoras': () => this.calculatePythagorean(variables),
            'volume_esfera': () => this.calculateSphereVolume(variables),
            'volume_cilindro': () => this.calculateCylinderVolume(variables),
            'area_esfera': () => this.calculateSphereArea(variables),
            'volume_cone': () => this.calculateConeVolume(variables),
            'area_trapezio': () => this.calculateTrapezoidArea(variables),
            'lei_dos_senos': () => this.calculateLawOfSines(variables),
            'lei_dos_cossenos': () => this.calculateLawOfCosines(variables),

            // FÍSICA
            'lei_ohm': () => this.calculateOhmLaw(variables),
            'energia_cinetica': () => this.calculateKineticEnergy(variables),
            'energia_potencial': () => this.calculatePotentialEnergy(variables),
            'trabalho': () => this.calculateWork(variables),
            'potencia': () => this.calculatePower(variables),
            'forca_gravitacional': () => this.calculateGravitationalForce(variables),
            'aceleracao_centripeta': () => this.calculateCentripetalAcceleration(variables),
            'pressao_hidrostatica': () => this.calculateHydrostaticPressure(variables),
            'frequencia_periodo': () => this.calculateFrequencyPeriod(variables),

            // CÁLCULO
            'derivada_basica': () => this.calculateBasicDerivative(variables),
            'regra_cadeia': () => this.calculateChainRule(variables),
            'integral_definida': () => this.calculateDefiniteIntegral(variables),
            'limite_importante': () => this.calculateImportantLimit(variables),

            // QUÍMICA
            'lei_gases_ideais': () => this.calculateIdealGas(variables),
            'concentracao_molar': () => this.calculateMolarConcentration(variables),
            'ph': () => this.calculatePH(variables),
            'diluicao': () => this.calculateDilution(variables),

            // ESTATÍSTICA
            'media_aritmetica': () => this.calculateArithmeticMean(variables),
            'variancia': () => this.calculateVariance(variables),
            'desvio_padrao': () => this.calculateStandardDeviation(variables)
        };

        const calculator = calculators[formulaId];
        if (!calculator) {
            return {
                success: false,
                error: `Calculadora não implementada para: ${formulaId}`
            };
        }

        return calculator();
    }

    /* ========================================
       IMPLEMENTAÇÕES DE CÁLCULOS
       ======================================== */
    
    // ===== ÁLGEBRA =====
    static calculateQuadratic(variables) {
        const a = variables.a.value;
        const b = variables.b.value;
        const c = variables.c.value;

        if (a === 0) {
            return { success: false, error: 'Coeficiente "a" não pode ser zero' };
        }

        const discriminant = b * b - 4 * a * c;
        const sqrtDiscriminant = Math.sqrt(Math.abs(discriminant));
        
        const x1 = (-b + sqrtDiscriminant) / (2 * a);
        const x2 = (-b - sqrtDiscriminant) / (2 * a);

        return {
            success: true,
            value: discriminant >= 0 ? [x1, x2] : 'Sem soluções reais',
            discriminant: discriminant,
            roots: [x1, x2]
        };
    }

    static calculateAP(variables) {
        const a1 = variables.a1.value;
        const n = variables.n.value;
        const r = variables.r.value;

        const an = a1 + (n - 1) * r;
        return { success: true, value: an };
    }

    static calculateAPSum(variables) {
        const a1 = variables.a1.value;
        const n = variables.n.value;
        const r = variables.r.value;

        const an = a1 + (n - 1) * r;
        const sum = (n * (a1 + an)) / 2;
        return { success: true, value: sum };
    }

    static calculateGP(variables) {
        const a1 = variables.a1.value;
        const n = variables.n.value;
        const q = variables.q.value;

        const an = a1 * Math.pow(q, n - 1);
        return { success: true, value: an };
    }

    static calculateGPSum(variables) {
        const a1 = variables.a1.value;
        const n = variables.n.value;
        const q = variables.q.value;

        if (q === 1) {
            return { success: false, error: 'Razão q não pode ser 1' };
        }

        const sum = a1 * (Math.pow(q, n) - 1) / (q - 1);
        return { success: true, value: sum };
    }

    static calculateGPInfiniteSum(variables) {
        const a1 = variables.a1.value;
        const q = variables.q.value;

        if (Math.abs(q) >= 1) {
            return { success: false, error: '|q| deve ser menor que 1' };
        }

        const sum = a1 / (1 - q);
        return { success: true, value: sum };
    }

    static calculateBinomial(variables) {
        const a = variables.a.value;
        const b = variables.b.value;
        const n = variables.n.value;
        
        const result = Math.pow(a + b, n);
        return { success: true, value: result };
    }

    static calculateSystem2x2(variables) {
        const a = variables.a.value;
        const b = variables.b.value;
        const c = variables.c.value;
        const d = variables.d.value;
        const e = variables.e.value;
        const f = variables.f.value;

        const denominator = a * d - b * c;
        
        if (denominator === 0) {
            return { success: false, error: 'Sistema não tem solução única (determinante = 0)' };
        }

        const x = (e * d - b * f) / denominator;
        const y = (a * f - c * e) / denominator;

        return { success: true, value: { x: x, y: y } };
    }

    static calculateNaturalLog(variables) {
        const x = variables.x.value;
        
        if (x <= 0) {
            return { success: false, error: 'x deve ser maior que 0' };
        }

        const result = Math.log(x);
        return { success: true, value: result };
    }

    // ===== GEOMETRIA =====
    static calculateCircleArea(variables) {
        const r = variables.r.value;
        const area = Math.PI * r * r;
        return { success: true, value: area };
    }

    static calculateCirclePerimeter(variables) {
        const r = variables.r.value;
        const perimeter = 2 * Math.PI * r;
        return { success: true, value: perimeter };
    }

    static calculateTriangleArea(variables) {
        const base = variables.base.value;
        const altura = variables.altura.value;
        const area = (base * altura) / 2;
        return { success: true, value: area };
    }

    static calculatePythagorean(variables) {
        const a = variables.a.value;
        const b = variables.b.value;
        const c = variables.c.value;
        
        const result = a * a + b * b;
        const target = c * c;
        const difference = result - target;
        
        return { 
            success: true, 
            value: { 
                calculated: Math.sqrt(result), 
                provided: c,
                difference: difference,
                isValid: Math.abs(difference) < 0.001
            } 
        };
    }

    static calculateSphereVolume(variables) {
        const r = variables.r.value;
        const volume = (4/3) * Math.PI * Math.pow(r, 3);
        return { success: true, value: volume };
    }

    static calculateCylinderVolume(variables) {
        const r = variables.r.value;
        const h = variables.h.value;
        const volume = Math.PI * r * r * h;
        return { success: true, value: volume };
    }

    static calculateSphereArea(variables) {
        const r = variables.r.value;
        const area = 4 * Math.PI * r * r;
        return { success: true, value: area };
    }

    static calculateConeVolume(variables) {
        const r = variables.r.value;
        const h = variables.h.value;
        const volume = (1/3) * Math.PI * r * r * h;
        return { success: true, value: volume };
    }

    static calculateTrapezoidArea(variables) {
        const base1 = variables.base1.value;
        const base2 = variables.base2.value;
        const altura = variables.altura.value;
        const area = ((base1 + base2) * altura) / 2;
        return { success: true, value: area };
    }

    static calculateLawOfSines(variables) {
        const a = variables.a.value;
        const b = variables.b.value;
        const c = variables.c.value;
        const A = variables.A.value * Math.PI / 180;
        const B = variables.B.value * Math.PI / 180;
        const C = variables.C.value * Math.PI / 180;

        const ratio1 = a / Math.sin(A);
        const ratio2 = b / Math.sin(B);
        const ratio3 = c / Math.sin(C);

        return { 
            success: true, 
            value: { 
                ratio1: ratio1,
                ratio2: ratio2, 
                ratio3: ratio3,
                anglesSum: A + B + C
            } 
        };
    }

    static calculateLawOfCosines(variables) {
        const a = variables.a.value;
        const b = variables.b.value;
        const c = variables.c.value;
        const C = variables.C.value * Math.PI / 180;

        const result = a * a + b * b - 2 * a * b * Math.cos(C);
        return { success: true, value: { calculated: result, provided: c * c } };
    }

    // ===== FÍSICA =====
    static calculateOhmLaw(variables) {
        const R = variables.R.value;
        const I = variables.I.value;
        const V = variables.V.value;

        // Calcula o valor desconhecido
        if (!R && I && V) {
            return { success: true, value: V / I, calculated: 'R' };
        } else if (!I && R && V) {
            return { success: true, value: V / R, calculated: 'I' };
        } else if (!V && R && I) {
            return { success: true, value: R * I, calculated: 'V' };
        } else {
            return { success: false, error: 'Forneça exatamente 2 valores' };
        }
    }

    static calculateKineticEnergy(variables) {
        const m = variables.m.value;
        const v = variables.v.value;
        const energy = 0.5 * m * v * v;
        return { success: true, value: energy };
    }

    static calculatePotentialEnergy(variables) {
        const m = variables.m.value;
        const g = variables.g.value;
        const h = variables.h.value;
        const energy = m * g * h;
        return { success: true, value: energy };
    }

    static calculateWork(variables) {
        const F = variables.F.value;
        const d = variables.d.value;
        const theta = variables.θ.value * Math.PI / 180;
        const work = F * d * Math.cos(theta);
        return { success: true, value: work };
    }

    static calculatePower(variables) {
        // Implementação simplificada
        const W = variables.W.value;
        const t = variables.t.value;
        const power = W / t;
        return { success: true, value: power };
    }

    static calculateGravitationalForce(variables) {
        const m1 = variables.m1.value;
        const m2 = variables.m2.value;
        const r = variables.r.value;
        const G = variables.G.value;
        const force = G * m1 * m2 / (r * r);
        return { success: true, value: force };
    }

    static calculateCentripetalAcceleration(variables) {
        const v = variables.v.value;
        const r = variables.r.value;
        const omega = variables.ω.value;
        
        const acc1 = (v * v) / r;
        const acc2 = omega * omega * r;
        return { success: true, value: { acceleration1: acc1, acceleration2: acc2 } };
    }

    static calculateHydrostaticPressure(variables) {
        const p0 = variables.p0.value;
        const rho = variables.ρ.value;
        const g = variables.g.value;
        const h = variables.h.value;
        const pressure = p0 + rho * g * h;
        return { success: true, value: pressure };
    }

    static calculateFrequencyPeriod(variables) {
        const f = variables.f.value;
        const T = variables.T.value;
        
        if (f) {
            return { success: true, value: 1/f, calculated: 'T' };
        } else {
            return { success: true, value: 1/T, calculated: 'f' };
        }
    }

    // ===== CÁLCULO =====
    static calculateBasicDerivative(variables) {
        // Implementação simplificada
        return { success: true, value: 'Limite não pode ser calculado numericamente' };
    }

    static calculateChainRule(variables) {
        return { success: true, value: 'Regra da cadeia requer funções específicas' };
    }

    static calculateDefiniteIntegral(variables) {
        return { success: true, value: 'Integração requer função específica' };
    }

    static calculateImportantLimit(variables) {
        const x = variables.x.value;
        const limit = Math.sin(x) / x;
        return { success: true, value: limit, limit: 1 };
    }

    // ===== QUÍMICA =====
    static calculateIdealGas(variables) {
        const P = variables.P.value;
        const V = variables.V.value;
        const n = variables.n.value;
        const R = variables.R.value;
        const T = variables.T.value;

        if (!P && V && n && R && T) {
            return { success: true, value: (n * R * T) / V, calculated: 'P' };
        } else if (!V && P && n && R && T) {
            return { success: true, value: (n * R * T) / P, calculated: 'V' };
        } else if (!n && P && V && R && T) {
            return { success: true, value: (P * V) / (R * T), calculated: 'n' };
        } else {
            return { success: false, error: 'Forneça 4 valores para calcular o quinto' };
        }
    }

    static calculateMolarConcentration(variables) {
        const n = variables.n.value;
        const V = variables.V.value;
        const concentration = n / V;
        return { success: true, value: concentration };
    }

    static calculatePH(variables) {
        const H = variables.H.value;
        
        if (H <= 0) {
            return { success: false, error: 'Concentração de H⁺ deve ser maior que 0' };
        }

        const pH = -Math.log10(H);
        return { success: true, value: pH };
    }

    static calculateDilution(variables) {
        const C1 = variables.C1.value;
        const V1 = variables.V1.value;
        const C2 = variables.C2.value;
        const V2 = variables.V2.value;

        const result = C1 * V1;
        const check = C2 * V2;
        
        return { 
            success: true, 
            value: { 
                product1: result, 
                product2: check,
                isValid: Math.abs(result - check) < 0.001
            } 
        };
    }

    // ===== ESTATÍSTICA =====
    static calculateArithmeticMean(variables) {
        const values = [];
        
        // Coleta todos os valores numéricos
        Object.entries(variables).forEach(([key, varData]) => {
            if (key.startsWith('x') && typeof varData.value === 'number') {
                values.push(varData.value);
            }
        });
        
        if (values.length === 0) {
            return { success: false, error: 'Nenhum valor numérico fornecido' };
        }
        
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        return { success: true, value: { mean: mean, count: values.length } };
    }

    static calculateVariance(variables) {
        const xi = variables.xi.value;
        const mu = variables.mu.value;
        
        if (typeof xi !== 'string') {
            return { success: false, error: 'Valores devem ser fornecidos como string separada por vírgulas' };
        }
        
        const values = xi.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
        
        if (values.length === 0) {
            return { success: false, error: 'Nenhum valor válido encontrado' };
        }
        
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mu, 2), 0) / values.length;
        return { success: true, value: variance };
    }

    static calculateStandardDeviation(variables) {
        const sigma2 = variables.sigma2.value;
        const stdDev = Math.sqrt(sigma2);
        return { success: true, value: stdDev };
    }

    /* ========================================
       GERAÇÃO DE PASSOS
       ======================================== */
    static generateSteps(formula, variables, result) {
        const steps = [];
        
        // Passo 1: Identificar as variáveis
        steps.push({
            number: 1,
            title: 'Identificar Variáveis',
            content: 'Identificamos os valores fornecidos para cada variável da fórmula.',
            latex: this.formatVariablesLatex(variables)
        });
        
        // Passo 2: Aplicar a fórmula
        steps.push({
            number: 2,
            title: 'Aplicar a Fórmula',
            content: `Substituímos os valores na fórmula: ${formula.latex}`,
            latex: this.formatSubstitutionLatex(formula, variables)
        });
        
        // Passo 3: Calcular
        steps.push({
            number: 3,
            title: 'Calcular Resultado',
            content: 'Realizamos os cálculos matemáticos.',
            latex: this.formatCalculationLatex(formula, variables, result)
        });
        
        return steps;
    }

    static formatVariablesLatex(variables) {
        let latex = '\\text{Valores fornecidos:}\\\\';
        Object.entries(variables).forEach(([name, varData]) => {
            latex += `${varData.variable.displayName} = ${varData.displayValue}\\\\`;
        });
        return latex;
    }

    static formatSubstitutionLatex(formula, variables) {
        // Esta é uma implementação simplificada
        // Em um sistema real, seria mais sofisticada
        return formula.latex;
    }

    static formatCalculationLatex(formula, variables, result) {
        if (typeof result.value === 'number') {
            return `\\text{Resultado: } ${CalculatorUtils.MathUtils.formatNumber(result.value, 6)}`;
        } else if (Array.isArray(result.value)) {
            return `\\text{Raízes: } x_1 = ${CalculatorUtils.MathUtils.formatNumber(result.value[0], 6)}, \\, x_2 = ${CalculatorUtils.MathUtils.formatNumber(result.value[1], 6)}`;
        } else {
            return `\\text{Resultado: } ${JSON.stringify(result.value)}`;
        }
    }

    static formatResultLatex(formula, value) {
        if (typeof value === 'number') {
            return `\\boxed{${CalculatorUtils.MathUtils.formatNumber(value, 6)}}`;
        } else if (Array.isArray(value)) {
            return `\\boxed{x_1 = ${CalculatorUtils.MathUtils.formatNumber(value[0], 6)}, \\, x_2 = ${CalculatorUtils.MathUtils.formatNumber(value[1], 6)}}`;
        } else {
            return `\\boxed{${JSON.stringify(value)}}`;
        }
    }

    /* ========================================
       HISTÓRICO
       ======================================== */
    static addToHistory(formula, variables, result, steps) {
        CalculatorUtils.HistoryManager.add({
            formulaId: formula.id,
            formulaName: formula.name,
            variables: variables,
            result: result,
            steps: steps
        });
    }
}

// Disponibiliza globalmente
window.CalculationEngine = CalculationEngine;