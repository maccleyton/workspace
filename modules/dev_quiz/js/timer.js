// Sistema de Timer
class QuestionTimer {
    constructor(duration, onTick, onComplete) {
        this.duration = duration; // em segundos
        this.remaining = duration;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.interval = null;
        this.isRunning = false;
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.remaining = this.duration;
        this.onTick(this.remaining);
        
        this.interval = setInterval(() => {
            this.remaining--;
            this.onTick(this.remaining);
            
            if (this.remaining <= 0) {
                this.stop();
                this.onComplete();
            }
        }, 1000);
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.isRunning = false;
    }
    
    reset() {
        this.stop();
        this.remaining = this.duration;
    }
    
    getRemaining() {
        return this.remaining;
    }
}
