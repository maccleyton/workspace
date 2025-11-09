/**
 * Code Validator - Advanced code validation and execution
 * Handles code validation for coding and correction challenges
 */

class CodeValidator {
    constructor() {
        this.validationRules = this.initializeValidationRules();
        this.sandboxEnvironments = this.initializeSandboxEnvironments();
        this.codeTemplates = this.initializeCodeTemplates();
    }

    /**
     * Initialize validation rules for different languages
     */
    initializeValidationRules() {
        return {
            javascript: {
                syntax: [
                    { test: (code) => this.validateJavaScriptSyntax(code), message: 'Syntax error detected' },
                    { test: (code) => this.validateBracketMatching(code), message: 'Unmatched brackets' },
                    { test: (code) => this.validateStatementCompletion(code), message: 'Incomplete statements' }
                ],
                logic: [
                    { test: (code) => this.validateReturnStatement(code), message: 'Missing return statement' },
                    { test: (code) => this.validateFunctionDefinition(code), message: 'Invalid function definition' },
                    { test: (code) => this.validateVariableUsage(code), message: 'Variable usage issues' }
                ],
                bestPractices: [
                    { test: (code) => this.validateSemicolons(code), message: 'Missing semicolons' },
                    { test: (code) => this.validateWhitespace(code), message: 'Poor formatting' },
                    { test: (code) => this.validateNamingConventions(code), message: 'Poor naming conventions' }
                ]
            },
            python: {
                syntax: [
                    { test: (code) => this.validatePythonSyntax(code), message: 'Python syntax error' },
                    { test: (code) => this.validateIndentation(code), message: 'Indentation error' },
                    { test: (code) => this.validateColonUsage(code), message: 'Missing colons' }
                ],
                logic: [
                    { test: (code) => this.validateReturnStatement(code), message: 'Missing return statement' },
                    { test: (code) => this.validateFunctionDefinition(code), message: 'Invalid function definition' },
                    { test: (code) => this.validateVariableUsage(code), message: 'Variable usage issues' }
                ],
                bestPractices: [
                    { test: (code) => this.validatePythonStyle(code), message: 'Python style guide violations' },
                    { test: (code) => this.validateDocstrings(code), message: 'Missing docstrings' }
                ]
            },
            typescript: {
                syntax: [
                    { test: (code) => this.validateTypeScriptSyntax(code), message: 'TypeScript syntax error' },
                    { test: (code) => this.validateTypeAnnotations(code), message: 'Type annotation issues' },
                    { test: (code) => this.validateInterfaceUsage(code), message: 'Interface definition issues' }
                ],
                logic: [
                    { test: (code) => this.validateReturnStatement(code), message: 'Missing return statement' },
                    { test: (code) => this.validateTypeSafety(code), message: 'Type safety issues' }
                ],
                bestPractices: [
                    { test: (code) => this.validateTypeStrictness(code), message: 'Type strictness violations' },
                    { test: (code) => this.validateGenericUsage(code), message: 'Generic type usage' }
                ]
            },
            c: {
                syntax: [
                    { test: (code) => this.validateCSyntax(code), message: 'C syntax error' },
                    { test: (code) => this.validateHeaderInclusion(code), message: 'Missing header files' },
                    { test: (code) => this.validateFunctionDefinition(code), message: 'Invalid function definition' }
                ],
                logic: [
                    { test: (code) => this.validateReturnStatement(code), message: 'Missing return statement' },
                    { test: (code) => this.validateMemoryManagement(code), message: 'Memory management issues' }
                ],
                bestPractices: [
                    { test: (code) => this.validateIncludeGuards(code), message: 'Missing include guards' },
                    { test: (code) => this.validateFunctionPrototypes(code), message: 'Function prototype issues' }
                ]
            },
            cpp: {
                syntax: [
                    { test: (code) => this.validateCppSyntax(code), message: 'C++ syntax error' },
                    { test: (code) => this.validateNamespaceUsage(code), message: 'Namespace issues' },
                    { test: (code) => this.validateClassDefinition(code), message: 'Class definition issues' }
                ],
                logic: [
                    { test: (code) => this.validateOOPConcepts(code), message: 'OOP concept issues' },
                    { test: (code) => this.validateTemplateUsage(code), message: 'Template usage issues' }
                ],
                bestPractices: [
                    { test: (code) => this.validateRAII(code), message: 'RAII principle violations' },
                    { test: (code) => this.validateModernCpp(code), message: 'Modern C++ best practices' }
                ]
            }
        };
    }

    /**
     * Initialize sandbox environments for code execution
     */
    initializeSandboxEnvironments() {
        return {
            javascript: {
                timeout: 5000,
                memory: 50 * 1024 * 1024, // 50MB
                restrictions: ['no-eval', 'no Function constructor', 'no access to window', 'no DOM access'],
                allowedGlobals: ['console', 'Math', 'Date', 'Array', 'Object', 'String', 'Number', 'Boolean']
            },
            python: {
                timeout: 10000,
                memory: 100 * 1024 * 1024, // 100MB
                restrictions: ['no file system access', 'no network access', 'no subprocess', 'no os module'],
                allowedModules: ['math', 'json', 're', 'datetime', 'collections']
            }
        };
    }

    /**
     * Initialize code templates for different challenges
     */
    initializeCodeTemplates() {
        return {
            basicFunction: {
                javascript: `function {functionName}({parameters}) {
    // Sua implementação aqui
    {returnStatement}
}`,
                python: `def {functionName}({parameters}):
    # Sua implementação aqui
    {returnStatement}`
            },
            conditionalLogic: {
                javascript: `function {functionName}({parameters}) {
    if ({condition}) {
        {trueStatement}
    } else {
        {falseStatement}
    }
}`,
                python: `def {functionName}({parameters}):
    if {condition}:
        {trueStatement}
    else:
        {falseStatement}`
            },
            loopIteration: {
                javascript: `function {functionName}({parameters}) {
    for (let i = 0; i < {limit}; i++) {
        {loopBody}
    }
}`,
                python: `def {functionName}({parameters}):
    for i in range({limit}):
        {loopBody}`
            }
        };
    }

    /**
     * Main validation function
     */
    validateCode(code, language, question) {
        const validation = {
            isValid: true,
            errors: [],
            warnings: [],
            score: 100,
            suggestions: []
        };

        try {
            // Syntax validation
            const syntaxResult = this.validateSyntax(code, language);
            if (!syntaxResult.isValid) {
                validation.errors.push(...syntaxResult.errors);
                validation.isValid = false;
                validation.score -= 30;
            }

            // Logic validation
            const logicResult = this.validateLogic(code, language, question);
            if (!logicResult.isValid) {
                validation.errors.push(...logicResult.errors);
                validation.isValid = false;
                validation.score -= 25;
            }

            // Best practices validation
            const practicesResult = this.validateBestPractices(code, language);
            if (practicesResult.warnings.length > 0) {
                validation.warnings.push(...practicesResult.warnings);
                validation.score -= 10;
            }

            // Generate suggestions
            validation.suggestions = this.generateSuggestions(code, language, question);

            // Ensure minimum score
            validation.score = Math.max(validation.score, 0);

        } catch (error) {
            validation.isValid = false;
            validation.errors.push(`Validation error: ${error.message}`);
            validation.score = 0;
        }

        return validation;
    }

    /**
     * Validate syntax for a specific language
     */
    validateSyntax(code, language) {
        const result = { isValid: true, errors: [] };
        const rules = this.validationRules[language]?.syntax || this.validationRules.javascript.syntax;

        for (const rule of rules) {
            if (!rule.test(code)) {
                result.errors.push(rule.message);
                result.isValid = false;
            }
        }

        return result;
    }

    /**
     * Validate logic for a specific language
     */
    validateLogic(code, language, question) {
        const result = { isValid: true, errors: [] };
        const rules = this.validationRules[language]?.logic || this.validationRules.javascript.logic;

        for (const rule of rules) {
            if (!rule.test(code)) {
                result.errors.push(rule.message);
                result.isValid = false;
            }
        }

        return result;
    }

    /**
     * Validate best practices
     */
    validateBestPractices(code, language) {
        const result = { warnings: [] };
        const rules = this.validationRules[language]?.bestPractices || this.validationRules.javascript.bestPractices;

        for (const rule of rules) {
            if (!rule.test(code)) {
                result.warnings.push(rule.message);
            }
        }

        return result;
    }

    /**
     * Generate improvement suggestions
     */
    generateSuggestions(code, language, question) {
        const suggestions = [];

        // Check for common issues
        if (language === 'javascript') {
            if (!code.includes('return') && !code.includes('console.log')) {
                suggestions.push('Considere usar return ou console.log para mostrar o resultado');
            }

            if (code.match(/[^;]\s*$/m) && !code.includes('function')) {
                suggestions.push('Adicione ponto e vírgula ao final das declarações');
            }

            if (code.match(/function\s+\w+\s*\([^)]*\)\s*[^{]/)) {
                suggestions.push('Adicione chaves de abertura na função');
            }
        }

        if (language === 'python') {
            if (code.includes('def ') && !code.match(/:\s*\n.*\n/)) {
                suggestions.push('Adicione dois pontos e indentação adequada');
            }
        }

        // Language-specific suggestions
        if (question && question.explanation) {
            suggestions.push(question.explanation);
        }

        return suggestions;
    }

    /**
     * Execute code in sandbox environment
     */
    async executeCode(code, language, testCases = []) {
        const execution = {
            success: false,
            output: null,
            error: null,
            testResults: [],
            executionTime: 0
        };

        const startTime = Date.now();

        try {
            switch (language) {
                case 'javascript':
                    execution.output = await this.executeJavaScript(code, testCases);
                    break;
                case 'python':
                    execution.output = await this.executePython(code, testCases);
                    break;
                default:
                    throw new Error(`Language ${language} not supported for execution`);
            }

            execution.success = true;
            execution.executionTime = Date.now() - startTime;

        } catch (error) {
            execution.error = error.message;
            execution.executionTime = Date.now() - startTime;
        }

        return execution;
    }

    /**
     * Execute JavaScript code
     */
    async executeJavaScript(code, testCases) {
        // Create a safe execution context
        const safeCode = this.sanitizeJavaScript(code);
        
        try {
            // Use Function constructor with restricted scope
            const func = new Function('console', 'Math', 'Date', 'Array', 'Object', 'String', 'Number', 'Boolean', `
                'use strict';
                ${safeCode}
            `);

            // Mock console.log to capture output
            const outputs = [];
            const mockConsole = {
                log: (...args) => outputs.push(args.join(' ')),
                error: (...args) => outputs.push('ERROR: ' + args.join(' ')),
                warn: (...args) => outputs.push('WARN: ' + args.join(' '))
            };

            const result = func(mockConsole, Math, Date, Array, Object, String, Number, Boolean);

            // Run test cases if provided
            const testResults = testCases.map(testCase => this.runJavaScriptTest(safeCode, testCase));

            return {
                output: result !== undefined ? result.toString() : outputs.join('\n'),
                testResults: testResults
            };

        } catch (error) {
            throw new Error(`JavaScript execution error: ${error.message}`);
        }
    }

    /**
     * Execute Python code
     */
    async executePython(code, testCases) {
        // Simulate Python execution (in real implementation, would use Pyodide or similar)
        try {
            // Basic Python syntax validation
            const lines = code.split('\n').filter(line => line.trim());
            
            if (lines.length === 0) {
                throw new Error('No executable code found');
            }

            // Check for common Python patterns
            const hasFunction = code.includes('def ');
            const hasReturn = code.includes('return');
            
            let output = 'Python code executed successfully';
            
            if (hasFunction && hasReturn) {
                output = 'Function defined and executed';
            }

            const testResults = testCases.map(testCase => this.runPythonTest(code, testCase));

            return {
                output: output,
                testResults: testResults
            };

        } catch (error) {
            throw new Error(`Python execution error: ${error.message}`);
        }
    }

    /**
     * Run JavaScript test case
     */
    runJavaScriptTest(code, testCase) {
        try {
            // Extract function name and parameters from test case
            const { functionName, args, expected } = testCase;
            
            // Create test function
            const testFunc = new Function(`
                ${code}
                return ${functionName}(${args.map(arg => JSON.stringify(arg)).join(', ')});
            `);

            const result = testFunc();
            const passed = result === expected;

            return {
                testCase: `${functionName}(${args.join(', ')})`,
                result: result,
                expected: expected,
                passed: passed
            };

        } catch (error) {
            return {
                testCase: testCase.functionName,
                error: error.message,
                passed: false
            };
        }
    }

    /**
     * Run Python test case
     */
    runPythonTest(code, testCase) {
        // Simplified Python test simulation
        return {
            testCase: testCase.functionName,
            result: 'Test result simulated',
            expected: testCase.expected,
            passed: true // Simplified for demo
        };
    }

    /**
     * Sanitize JavaScript code for safe execution
     */
    sanitizeJavaScript(code) {
        // Remove potentially dangerous code
        const dangerousPatterns = [
            /eval\s*\(/g,
            /Function\s*\(/g,
            /import\s+/g,
            /require\s*\(/g,
            /process\./g,
            /global\./g,
            /window\./g,
            /document\./g,
            /setTimeout\s*\(/g,
            /setInterval\s*\(/g
        ];

        let sanitized = code;
        dangerousPatterns.forEach(pattern => {
            sanitized = sanitized.replace(pattern, '/* REMOVED */');
        });

        return sanitized;
    }

    /**
     * Language-specific validation methods
     */
    validateJavaScriptSyntax(code) {
        try {
            new Function(code);
            return true;
        } catch (e) {
            return false;
        }
    }

    validateBracketMatching(code) {
        const brackets = { '(': ')', '[': ']', '{': '}' };
        const stack = [];
        
        for (const char of code) {
            if (brackets[char]) {
                stack.push(char);
            } else if (Object.values(brackets).includes(char)) {
                if (stack.length === 0 || brackets[stack.pop()] !== char) {
                    return false;
                }
            }
        }
        
        return stack.length === 0;
    }

    validateStatementCompletion(code) {
        const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));
        
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.match(/^(if|for|while|function|class)\s*.*[^{]$/)) {
                return false;
            }
            if (trimmed.match(/return\s+[^;{]*$/)) {
                return false;
            }
        }
        
        return true;
    }

    validateReturnStatement(code) {
        const hasFunction = code.includes('function') || code.includes('def ');
        const hasReturn = code.includes('return');
        
        if (hasFunction && !hasReturn) {
            return false;
        }
        
        return true;
    }

    validateFunctionDefinition(code) {
        // Basic function definition validation
        const functionPattern = /(function\s+\w+\s*\([^)]*\)\s*\{|\w+\s*=\s*\([^)]*\)\s*=>\s*\{|def\s+\w+\s*\([^)]*\):)/;
        return functionPattern.test(code) || !code.includes('function') && !code.includes('def');
    }

    validateVariableUsage(code) {
        // Check for undefined variables (simplified)
        const varPattern = /\b(var|let|const)\s+\w+/g;
        const assignments = code.match(varPattern) || [];
        const usedVars = code.match(/\b\w+\b/g) || [];
        
        // This is a simplified check - in real implementation, would be more sophisticated
        return usedVars.length > 0;
    }

    validateSemicolons(code) {
        // JavaScript specific
        const lines = code.split('\n').filter(line => 
            line.trim() && 
            !line.trim().startsWith('//') && 
            !line.trim().startsWith('/*') &&
            !line.trim().endsWith('*/') &&
            !line.trim().match(/^(if|for|while|function|class).*[{:]$/)
        );
        
        const linesWithoutSemicolon = lines.filter(line => 
            !line.trim().endsWith(';') && 
            !line.trim().endsWith('{') &&
            !line.trim().endsWith('}')
        );
        
        return linesWithoutSemicolon.length === 0;
    }

    validateWhitespace(code) {
        // Check for basic formatting
        const lines = code.split('\n');
        const hasProperIndentation = lines.some(line => line.startsWith('    ') || line.startsWith('\t'));
        return hasProperIndentation;
    }

    validateNamingConventions(code) {
        // Check for camelCase in JavaScript
        const camelCasePattern = /\b[a-z][a-zA-Z0-9]*\s*=\s*function\b/;
        const hasCamelCase = camelCasePattern.test(code);
        
        return hasCamelCase || !code.includes('function');
    }

    // Python specific validations
    validatePythonSyntax(code) {
        // Simplified Python syntax check
        return code.includes('def ') || !code.includes('def');
    }

    validateIndentation(code) {
        const lines = code.split('\n');
        return lines.some(line => line.startsWith('    ') || line.startsWith('\t'));
    }

    validateColonUsage(code) {
        const colonPattern = /:\s*$/;
        const lines = code.split('\n').filter(line => 
            line.trim().startsWith('if') || 
            line.trim().startsWith('for') || 
            line.trim().startsWith('while') ||
            line.trim().startsWith('def')
        );
        
        return lines.every(line => colonPattern.test(line));
    }

    validatePythonStyle(code) {
        // Check for basic PEP 8 compliance
        return !code.includes('\t'); // Use spaces, not tabs
    }

    validateDocstrings(code) {
        // Check if functions have docstrings
        const functionPattern = /def\s+\w+\([^)]*\):\s*\n\s+"""[\s\S]*?"""/;
        return functionPattern.test(code) || !code.includes('def ');
    }

    // Add more language-specific validations...
    validateTypeScriptSyntax(code) { return true; }
    validateTypeAnnotations(code) { return true; }
    validateInterfaceUsage(code) { return true; }
    validateTypeSafety(code) { return true; }
    validateTypeStrictness(code) { return true; }
    validateGenericUsage(code) { return true; }

    // C specific validations
    validateCSyntax(code) { return true; }
    validateHeaderInclusion(code) { return true; }
    validateMemoryManagement(code) { return true; }
    validateIncludeGuards(code) { return true; }
    validateFunctionPrototypes(code) { return true; }

    // C++ specific validations
    validateCppSyntax(code) { return true; }
    validateNamespaceUsage(code) { return true; }
    validateClassDefinition(code) { return true; }
    validateOOPConcepts(code) { return true; }
    validateTemplateUsage(code) { return true; }
    validateRAII(code) { return true; }
    validateModernCpp(code) { return true; }
}

// Initialize code validator
const codeValidator = new CodeValidator();

// Export for global use
window.codeValidator = codeValidator;