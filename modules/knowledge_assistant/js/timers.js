// js/timers.js

export class Timer {
    constructor(container) {
        this.container = container;
        this.minutes = 0;
        this.seconds = 0;
        this.intervalId = null;
        this.isRunning = false;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="timer-widget">
                <h3>⏰ Timer</h3>
                <div class="timer-display" id="timerDisplay">00:00</div>
                <div class="timer-controls">
                    <input type="number" id="minutesInput" class="timer-input" placeholder="Min" min="0" max="59">
                    <span>:</span>
                    <input type="number" id="secondsInput" class="timer-input" placeholder="Seg" min="0" max="59">
                </div>
                <div class="timer-buttons">
                    <button id="startPauseBtn" class="timer-btn timer-btn-start">Iniciar</button>
                    <button id="resetBtn" class="timer-btn timer-btn-reset">Redefinir</button>
                </div>
            </div>
        `;
        this.displayElement = this.container.querySelector('#timerDisplay');
    }

    attachEventListeners() {
        const startPauseBtn = this.container.querySelector('#startPauseBtn');
        const resetBtn = this.container.querySelector('#resetBtn');
        const minutesInput = this.container.querySelector('#minutesInput');
        const secondsInput = this.container.querySelector('#secondsInput');

        startPauseBtn.addEventListener('click', () => this.toggleTimer());
        resetBtn.addEventListener('click', () => this.resetTimer());

        [minutesInput, secondsInput].forEach(input => {
            input.addEventListener('input', () => {
                if (!this.isRunning) {
                    this.minutes = parseInt(minutesInput.value) || 0;
                    this.seconds = parseInt(secondsInput.value) || 0;
                    this.updateDisplay();
                }
            });
        });
    }

    toggleTimer() {
        const btn = this.container.querySelector('#startPauseBtn');
        if (this.isRunning) {
            this.pauseTimer();
            btn.textContent = 'Iniciar';
            btn.classList.remove('timer-btn-pause');
        } else {
            this.startTimer();
            btn.textContent = 'Pausar';
            btn.classList.add('timer-btn-pause');
        }
    }

    startTimer() {
        if (this.minutes === 0 && this.seconds === 0) return;

        this.isRunning = true;
        this.intervalId = setInterval(() => this.tick(), 1000);
    }

    pauseTimer() {
        this.isRunning = false;
        clearInterval(this.intervalId);
    }

    resetTimer() {
        this.pauseTimer();
        this.minutes = 0;
        this.seconds = 0;
        this.updateDisplay();
        this.container.querySelector('#minutesInput').value = '';
        this.container.querySelector('#secondsInput').value = '';
        const btn = this.container.querySelector('#startPauseBtn');
        btn.textContent = 'Iniciar';
        btn.classList.remove('timer-btn-pause');
    }

    tick() {
        if (this.seconds > 0) {
            this.seconds--;
        } else if (this.minutes > 0) {
            this.minutes--;
            this.seconds = 59;
        } else {
            this.pauseTimer();
            alert("⏰ Tempo esgotado!");
            this.playAlarmSound(); // <-- ADICIONE ESTA LINHA
            return;
        }
        this.updateDisplay();
    }

    // ADICIONE ESTA NOVA FUNÇÃO
    playAlarmSound() {
        // Cria um contexto de áudio simples
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800; // Frequência do bipe
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    updateDisplay() {
        const displayMinutes = String(this.minutes).padStart(2, '0');
        const displaySeconds = String(this.seconds).padStart(2, '0');
        this.displayElement.textContent = `${displayMinutes}:${displaySeconds}`;
    }
}