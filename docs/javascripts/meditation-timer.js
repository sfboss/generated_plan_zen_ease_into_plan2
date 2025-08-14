/**
 * MEDITATION TIMER - Advanced Interactive Component
 */

class MeditationTimer {
    constructor() {
        this.state = {
            duration: 600, // 10 minutes default
            remaining: 600,
            isRunning: false,
            isPaused: false,
            interval: null,
            startTime: null,
            sessionType: 'mindfulness',
            settings: {
                bellInterval: 0, // 0 = no interval bells
                bellStart: true,
                bellEnd: true,
                breathingGuide: false,
                ambientSound: null,
                volume: 0.5
            }
        };

        this.audioContext = null;
        this.ambientAudio = null;
        this.sessions = JSON.parse(localStorage.getItem('zenMeditationSessions') || '[]');

        this.init();
    }

    init() {
        this.initAudioContext();
        this.bindEvents();
        this.updateDisplay();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Web Audio API not supported');
        }
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            // Timer presets
            if (e.target.matches('.preset-button')) {
                this.setDuration(parseInt(e.target.dataset.duration));
                this.updatePresetButtons(e.target);
            }

            // Control buttons
            if (e.target.matches('.control-button.play')) this.start();
            if (e.target.matches('.control-button.pause')) this.pause();
            if (e.target.matches('.control-button.reset')) this.reset();

            // Meditation types
            if (e.target.matches('.type-selector')) {
                this.setType(e.target.dataset.type);
                this.updateTypeButtons(e.target);
            }

            // Sound controls
            if (e.target.matches('.sound-toggle')) {
                this.toggleAmbientSound(e.target.dataset.sound);
            }
        });

        // Volume control
        document.addEventListener('input', (e) => {
            if (e.target.matches('.volume-slider')) {
                this.setVolume(e.target.value / 100);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;

            switch (e.key) {
                case ' ':
                    e.preventDefault();
                    this.state.isRunning ? this.pause() : this.start();
                    break;
                case 'r':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.reset();
                    }
                    break;
                case 'Escape':
                    this.reset();
                    break;
            }
        });
    }

    setDuration(seconds) {
        if (this.state.isRunning) return;

        this.state.duration = seconds;
        this.state.remaining = seconds;
        this.updateDisplay();
    }

    setType(type) {
        this.state.sessionType = type;
        this.updateBreathingGuide();
    }

    start() {
        if (this.state.isRunning) return;

        // Resume audio context if needed
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        this.state.isRunning = true;
        this.state.isPaused = false;
        this.state.startTime = this.state.startTime || Date.now();

        if (this.state.settings.bellStart) {
            this.playBell();
        }

        this.startBreathingGuide();
        this.startAmbientSound();

        this.state.interval = setInterval(() => {
            this.tick();
        }, 1000);

        this.updateControlButtons();
        this.trackEvent('meditation_started', {
            duration: this.state.duration,
            type: this.state.sessionType
        });
    }

    pause() {
        if (!this.state.isRunning) return;

        this.state.isRunning = false;
        this.state.isPaused = true;
        clearInterval(this.state.interval);

        this.stopBreathingGuide();
        this.pauseAmbientSound();

        this.updateControlButtons();
    }

    reset() {
        this.state.isRunning = false;
        this.state.isPaused = false;
        this.state.remaining = this.state.duration;
        this.state.startTime = null;

        clearInterval(this.state.interval);
        this.stopBreathingGuide();
        this.stopAmbientSound();

        this.updateDisplay();
        this.updateControlButtons();
    }

    tick() {
        this.state.remaining--;

        // Interval bells
        if (this.state.settings.bellInterval > 0) {
            const elapsed = this.state.duration - this.state.remaining;
            if (elapsed > 0 && elapsed % this.state.settings.bellInterval === 0) {
                this.playBell();
            }
        }

        if (this.state.remaining <= 0) {
            this.complete();
        } else {
            this.updateDisplay();
        }
    }

    complete() {
        this.state.isRunning = false;
        this.state.remaining = 0;
        clearInterval(this.state.interval);

        if (this.state.settings.bellEnd) {
            this.playCompletionBells();
        }

        this.stopBreathingGuide();
        this.stopAmbientSound();
        this.saveSession();
        this.showCompletionAnimation();
        this.updateDisplay();
        this.updateControlButtons();

        this.trackEvent('meditation_completed', {
            duration: this.state.duration,
            type: this.state.sessionType,
            actualDuration: Date.now() - this.state.startTime
        });
    }

    updateDisplay() {
        const displays = document.querySelectorAll('.timer-display');
        displays.forEach(display => {
            display.textContent = this.formatTime(this.state.remaining);
        });

        // Update progress ring
        const progress = 1 - (this.state.remaining / this.state.duration);
        const angle = progress * 360;

        const rings = document.querySelectorAll('.timer-progress-ring');
        rings.forEach(ring => {
            ring.style.background = `conic-gradient(
                var(--zen-accent) ${angle}deg,
                transparent ${angle}deg
            )`;
        });

        // Update session stats
        this.updateSessionStats();
    }

    updateSessionStats() {
        const today = new Date().toDateString();
        const todaySessions = this.sessions.filter(s =>
            new Date(s.date).toDateString() === today
        );

        const totalMinutes = this.sessions.reduce((sum, s) => sum + s.duration, 0) / 60;
        const streak = this.calculateStreak();

        const statsElements = {
            sessions: document.querySelectorAll('.stat-card .stat-value')[0],
            minutes: document.querySelectorAll('.stat-card .stat-value')[1],
            streak: document.querySelectorAll('.stat-card .stat-value')[2]
        };

        if (statsElements.sessions) {
            statsElements.sessions.textContent = todaySessions.length;
        }
        if (statsElements.minutes) {
            statsElements.minutes.textContent = Math.floor(totalMinutes);
        }
        if (statsElements.streak) {
            statsElements.streak.textContent = streak;
        }
    }

    playBell() {
        if (!this.audioContext) return;

        // Create a pleasant bell sound
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const biquadFilter = this.audioContext.createBiquadFilter();

        oscillator.connect(biquadFilter);
        biquadFilter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Bell-like frequency progression
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 3);

        // Filter for more realistic bell sound
        biquadFilter.type = 'lowpass';
        biquadFilter.frequency.setValueAtTime(1000, this.audioContext.currentTime);

        // Volume envelope
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.rapidRampToValueAtTime(0.3 * this.state.settings.volume, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 3);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 3);

        // Visual bell animation
        this.showBellAnimation();
    }

    playCompletionBells() {
        // Play three gentle bells for completion
        for (let i = 0; i < 3; i++) {
            setTimeout(() => this.playBell(), i * 1000);
        }
    }

    showBellAnimation() {
        const bellElements = document.querySelectorAll('.bell-animation');
        bellElements.forEach(bell => {
            bell.classList.add('ring');
            setTimeout(() => bell.classList.remove('ring'), 2000);
        });
    }

    startBreathingGuide() {
        if (!this.state.settings.breathingGuide) return;

        const indicators = document.querySelectorAll('.breathing-indicator');
        indicators.forEach(indicator => {
            indicator.classList.add('active');
        });
    }

    stopBreathingGuide() {
        const indicators = document.querySelectorAll('.breathing-indicator');
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
    }

    updateBreathingGuide() {
        // Update breathing pattern based on meditation type
        if (this.state.sessionType === 'breathing') {
            this.state.settings.breathingGuide = true;
        }
    }

    toggleAmbientSound(soundType) {
        if (this.state.settings.ambientSound === soundType) {
            this.stopAmbientSound();
            this.state.settings.ambientSound = null;
        } else {
            this.stopAmbientSound();
            this.state.settings.ambientSound = soundType;
            if (this.state.isRunning) {
                this.startAmbientSound();
            }
        }

        this.updateSoundButtons();
    }

    startAmbientSound() {
        if (!this.state.settings.ambientSound) return;

        // This would load actual audio files in a real implementation
        // For now, we'll just show visual feedback
        const soundWaves = document.querySelectorAll('.breath-sound-waves');
        soundWaves.forEach(waves => waves.classList.add('active'));
    }

    pauseAmbientSound() {
        if (this.ambientAudio) {
            this.ambientAudio.pause();
        }
    }

    stopAmbientSound() {
        if (this.ambientAudio) {
            this.ambientAudio.pause();
            this.ambientAudio.currentTime = 0;
        }

        const soundWaves = document.querySelectorAll('.breath-sound-waves');
        soundWaves.forEach(waves => waves.classList.remove('active'));
    }

    setVolume(volume) {
        this.state.settings.volume = volume;
        if (this.ambientAudio) {
            this.ambientAudio.volume = volume;
        }
    }

    saveSession() {
        const session = {
            date: new Date().toISOString(),
            duration: this.state.duration,
            actualDuration: Date.now() - this.state.startTime,
            type: this.state.sessionType,
            completed: true
        };

        this.sessions.push(session);
        localStorage.setItem('zenMeditationSessions', JSON.stringify(this.sessions));

        // Update achievements
        this.checkAchievements();
    }

    checkAchievements() {
        const streak = this.calculateStreak();

        if (window.zenMaster) {
            if (this.sessions.length === 1) {
                window.zenMaster.unlockAchievement('first_meditation');
            }
            if (streak >= 7) {
                window.zenMaster.unlockAchievement('week_streak');
            }
            if (this.state.sessionType === 'breathing') {
                window.zenMaster.unlockAchievement('breath_master');
            }
        }
    }

    calculateStreak() {
        if (this.sessions.length === 0) return 0;

        const today = new Date();
        let streak = 0;
        let currentDate = new Date(today);

        while (true) {
            const dateString = currentDate.toDateString();
            const hasSession = this.sessions.some(s =>
                new Date(s.date).toDateString() === dateString
            );

            if (hasSession) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    showCompletionAnimation() {
        // Create completion celebration
        const celebration = document.createElement('div');
        celebration.className = 'meditation-completion';
        celebration.innerHTML = `
            <div class="completion-content">
                <div class="completion-icon">🧘‍♂️</div>
                <h2>Meditation Complete!</h2>
                <p>You meditated for ${this.formatTime(this.state.duration)}</p>
                <div class="completion-stats">
                    <div>Sessions Today: ${this.getSessionsToday()}</div>
                    <div>Current Streak: ${this.calculateStreak()} days</div>
                </div>
            </div>
        `;

        celebration.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;

        celebration.querySelector('.completion-content').style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            transform: scale(0.8);
            transition: transform 0.5s ease;
        `;

        document.body.appendChild(celebration);

        setTimeout(() => {
            celebration.style.opacity = '1';
            celebration.querySelector('.completion-content').style.transform = 'scale(1)';
        }, 100);

        setTimeout(() => {
            celebration.style.opacity = '0';
            setTimeout(() => document.body.removeChild(celebration), 500);
        }, 4000);

        // Click to dismiss
        celebration.addEventListener('click', () => {
            celebration.style.opacity = '0';
            setTimeout(() => document.body.removeChild(celebration), 500);
        });
    }

    updateControlButtons() {
        const playBtns = document.querySelectorAll('.control-button.play');
        const pauseBtns = document.querySelectorAll('.control-button.pause');

        playBtns.forEach(btn => {
            btn.style.display = this.state.isRunning ? 'none' : 'flex';
        });

        pauseBtns.forEach(btn => {
            btn.style.display = this.state.isRunning ? 'flex' : 'none';
        });
    }

    updatePresetButtons(activeButton) {
        document.querySelectorAll('.preset-button').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    updateTypeButtons(activeButton) {
        document.querySelectorAll('.type-selector').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    updateSoundButtons() {
        document.querySelectorAll('.sound-toggle').forEach(btn => {
            btn.classList.toggle('active',
                btn.dataset.sound === this.state.settings.ambientSound
            );
        });
    }

    getSessionsToday() {
        const today = new Date().toDateString();
        return this.sessions.filter(s =>
            new Date(s.date).toDateString() === today
        ).length;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    trackEvent(eventName, data) {
        // Analytics tracking (would integrate with actual analytics)
        console.log(`Meditation Event: ${eventName}`, data);
    }
}

// Initialize timer when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.meditation-timer')) {
        window.meditationTimer = new MeditationTimer();
    }
});

export default MeditationTimer;
