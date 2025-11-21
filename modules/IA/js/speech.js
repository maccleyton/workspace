// Web Speech API para reconhecimento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isRecording = false;

// Inicializar reconhecimento de voz
function initSpeechRecognition() {
    if (!SpeechRecognition) {
        console.warn('Web Speech API não suportada');
        return false;
    }
    
    recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
        isRecording = true;
        updateStatus('🎤 Ouvindo...');
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.classList.add('recording');
            voiceBtn.textContent = '⏹️';
        }
    };
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('userInput');
        if (input) {
            input.value = transcript;
            input.focus();
        }
        updateStatus(`Você disse: "${transcript}"`);
    };
    
    recognition.onerror = (event) => {
        console.error('Erro no reconhecimento:', event.error);
        let errorMsg = 'Erro no reconhecimento de voz';
        
        switch(event.error) {
            case 'no-speech':
                errorMsg = 'Nenhuma fala detectada';
                break;
            case 'audio-capture':
                errorMsg = 'Microfone não encontrado';
                break;
            case 'not-allowed':
                errorMsg = 'Permissão de microfone negada';
                break;
        }
        
        updateStatus('❌ ' + errorMsg);
    };
    
    recognition.onend = () => {
        isRecording = false;
        updateStatus('Pronto');
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.classList.remove('recording');
            voiceBtn.textContent = '🎤';
        }
    };
    
    return true;
}

// Iniciar/parar reconhecimento
function toggleVoiceRecognition() {
    if (!recognition) {
        if (!initSpeechRecognition()) {
            alert('❌ Reconhecimento de voz não suportado.\n\nFunciona apenas no Chrome e Edge.');
            return;
        }
    }
    
    if (isRecording) {
        recognition.stop();
    } else {
        try {
            recognition.start();
        } catch (error) {
            console.error('Erro ao iniciar reconhecimento:', error);
            updateStatus('Erro ao iniciar reconhecimento');
        }
    }
}

function updateStatus(text) {
    const statusText = document.getElementById('statusText');
    if (statusText) {
        statusText.textContent = text;
    }
}
