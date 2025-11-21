// Validador de respostas
class Validator {
    // Validar múltipla escolha
    static validateMultipleChoice(selectedOption, correctOption) {
        return selectedOption === correctOption;
    }
    
    // Comparar código (simples comparação de texto normalizado)
    static compareCode(userCode, correctCode) {
        const normalize = (code) => {
            return code
                .replace(/\s+/g, ' ')
                .replace(/;\s*/g, ';')
                .trim()
                .toLowerCase();
        };
        
        return normalize(userCode) === normalize(correctCode);
    }
    
    // Verificar se código tem sintaxe básica válida
    static hasValidSyntax(code, language) {
        const brackets = { '(': ')', '[': ']', '{': '}' };
        const stack = [];
        
        for (let char of code) {
            if (brackets[char]) {
                stack.push(char);
            } else if (Object.values(brackets).includes(char)) {
                const last = stack.pop();
                if (brackets[last] !== char) {
                    return false;
                }
            }
        }
        
        return stack.length === 0;
    }
}
