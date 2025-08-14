/**
 * BREATHING GUIDE - Interactive Breathing Exercise Component
 */

class BreathingGuide {
    constructor() {
        this.patterns = {
            'box': {
                name: 'Box Breathing',
                description: 'Equal breathing with holds',
                phases: [
                    { name: 'Breathe In', duration: 4000, instruction: 'Inhale slowly through your nose' },
                    { name: 'Hold', duration: 4000, instruction: 'Hold your breath gently' },
                    { name: 'Breathe Out', duration: 4000, instruction: 'Exhale slowly through your mouth' },
                    { name: 'Hold', duration: 4000, instruction: 'Hold with empty lungs' }
                ],
                benefits: ['Reduces stress', 'Improves focus', 'Calms nervous system']
            },
            'triangle': {
                name: 'Triangle Breathing',
                description: 'Three-phase breathing',
                phases: [
                    { name: 'Breathe In', duration: 4000, instruction: 'Inhale deeply' },
                    { name: 'Hold', duration: 4000, instruction: 'Hold the breath' },
                    { name: 'Breathe Out', duration: 4000, instruction: 'Exhale completely' }
                ],
                benefits: ['Balances energy', 'Improves concentration', 'Simple and effective']
            },
            '4-7-8': {
                name: '4-7-8 Calming',
                description: 'Relaxing breath for sleep',
                phases: [
                    { name: 'Breathe In', duration: 4000, instruction: 'Inhale through nose for 4' },
                    { name: 'Hold', duration: 7000, instruction: 'Hold breath for 7' },
                    { name: 'Breathe Out', duration: 8000, instruction: 'Exhale through mouth for 8' }
                ],
                benefits: ['Promotes sleep', 'Reduces anxiety', 'Deep relaxation']
            },
            'equal': {
                name: 'Equal Breathing',
                description: 'Simple in-out rhythm',
                phases: [
                    { name: 'Breathe In', duration: 6000, instruction: 'Inhale slowly and deeply' },
                    { name: 'Breathe Out', duration: 6000, instruction: 'Exhale slowly and completely' }
                ],
                benefits: ['Beginner friendly', 'Improves balance', 'Increases lung capacity']
            },
            'coherent': {
                name: 'Coherent Breathing',
                description: '5-second rhythm for heart coherence',
                phases: [
                    { name: 'Breathe In', duration: 5000, instruction: 'Breathe in for 5 seconds' },
                    { name: 'Breathe Out', duration: 5000, instruction: 'Breathe out for 5 seconds' }
                ],
                benefits: ['Heart-brain coherence', 'Optimal breathing rate', 'Scientific backing']
            }
        };

        this.state = {
            currentPattern: 'box',
            isActive: false,
            currentPhase: 0,
            cycleCount: 0,
            sessionStartTime: null,
            totalCycles: 0,
            phaseTimeout: null
        };

        this.stats = JSON.parse(localStorage.getItem('zenBreathingStats') || '{}');
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadUserPreferences();
        this.updateDisplay();
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            // Pattern selection
            if (e.target.matches('.breathing-type')) {
                this.selectPattern(e.target.dataset.pattern);
                this.updatePatternButtons(e.target);
            }

            // Control buttons
            if (e.target.matches('.breath-control-btn[data-action="start"]')) {
                this.start();
            }
            if (e.target.matches('.breath-control-btn[data-action="pause"]')) {
                this.pause();
            }
            if (e.target.matches('.breath-control-btn[data-action="reset"]')) {
                this.reset();
            }

            // Advanced technique cards
            if (e.target.matches('.technique-card')) {
                this.showTechniqueDetails(e.target);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;

            switch (e.key) {
                case ' ':
                    if (document.querySelector('.breathing-guide-container')) {
                        e.preventDefault();
                        this.state.isActive ? this.pause() : this.start();
                    }
                    break;
                case 'b':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.showBreathingGuide();
                    }
                    break;
            }
        });
    }

    selectPattern(patternKey) {
        if (this.state.isActive) return;

        this.state.currentPattern = patternKey;
        this.state.currentPhase = 0;
        this.updateDisplay();
        this.saveUserPreferences();
    }

    start() {
        if (this.state.isActive) return;

        this.state.isActive = true;
        this.state.sessionStartTime = Date.now();
        this.state.currentPhase = 0;
        this.state.cycleCount = 0;

        this.showVisualGuide();
        this.startPhase();
        this.updateControlButtons();

        this.trackEvent('breathing_session_started', {
            pattern: this.state.currentPattern
        });
    }

    pause() {
        if (!this.state.isActive) return;

        this.state.isActive = false;
        clearTimeout(this.state.phaseTimeout);
        this.hideVisualGuide();
        this.updateControlButtons();

        this.trackEvent('breathing_session_paused', {
            pattern: this.state.currentPattern,
            cycles: this.state.cycleCount
        });
    }

    reset() {
        this.state.isActive = false;
        this.state.currentPhase = 0;
        this.state.cycleCount = 0;

        clearTimeout(this.state.phaseTimeout);
        this.hideVisualGuide();
        this.updateDisplay();
        this.updateControlButtons();
    }

    startPhase() {
        if (!this.state.isActive) return;

        const pattern = this.patterns[this.state.currentPattern];
        const phase = pattern.phases[this.state.currentPhase];

        this.updateInstruction(phase.name, phase.instruction);
        this.animateBreathingCircle(phase.name, phase.duration);

        // Gentle vibration on mobile for phase changes
        if (navigator.vibrate && this.state.currentPhase === 0) {
            navigator.vibrate(50);
        }

        this.state.phaseTimeout = setTimeout(() => {
            this.nextPhase();
        }, phase.duration);
    }

    nextPhase() {
        if (!this.state.isActive) return;

        const pattern = this.patterns[this.state.currentPattern];
        this.state.currentPhase++;

        if (this.state.currentPhase >= pattern.phases.length) {
            this.state.currentPhase = 0;
            this.state.cycleCount++;
            this.updateStats();

            // Achievement check
            if (this.state.cycleCount === 10) {
                this.showMilestoneMessage("Great! 10 breathing cycles completed!");
                if (window.zenMaster) {
                    window.zenMaster.unlockAchievement('breath_master');
                }
            }
        }

        this.startPhase();
    }

    animateBreathingCircle(phaseName, duration) {
        const circles = document.querySelectorAll('.breathing-circle-main');

        circles.forEach(circleContainer => {
            const outer = circleContainer.querySelector('.breathing-circle-outer');
            const inner = circleContainer.querySelector('.breathing-circle-inner');

            if (!outer || !inner) return;

            // Remove existing animations
            outer.style.animation = 'none';
            inner.style.animation = 'none';

            // Force reflow
            outer.offsetHeight;
            inner.offsetHeight;

            // Apply new animation based on phase
            const animationDuration = duration / 1000;

            if (phaseName === 'Breathe In') {
                outer.style.animation = `breathe-in ${animationDuration}s ease-in-out forwards`;
                inner.style.animation = `breathe-in-inner ${animationDuration}s ease-in-out forwards`;
            } else if (phaseName === 'Breathe Out') {
                outer.style.animation = `breathe-out ${animationDuration}s ease-in-out forwards`;
                inner.style.animation = `breathe-out-inner ${animationDuration}s ease-in-out forwards`;
            } else if (phaseName === 'Hold') {
                outer.style.animation = `breathe-hold ${animationDuration}s ease-in-out forwards`;
                inner.style.animation = `breathe-hold-inner ${animationDuration}s ease-in-out forwards`;
            }
        });

        // Update progress indicator
        this.updateProgressIndicator(duration);
    }

    updateInstruction(phase, instruction) {
        const instructionElements = document.querySelectorAll('.breathing-instruction');
        instructionElements.forEach(element => {
            element.textContent = phase;
            element.title = instruction;

            // Add gentle pulsing effect for visibility
            element.style.animation = 'none';
            element.offsetHeight; // Force reflow
            element.style.animation = 'instruction-pulse 0.5s ease-in-out';
        });
    }

    updateProgressIndicator(duration) {
        // Create a subtle progress indicator around the breathing circle
        const indicators = document.querySelectorAll('.breathing-progress-indicator');
        indicators.forEach(indicator => {
            if (!indicator) {
                // Create if doesn't exist
                const progress = document.createElement('div');
                progress.className = 'breathing-progress-indicator';
                progress.style.cssText = `
                    position: absolute;
                    top: -5px;
                    left: -5px;
                    right: -5px;
                    bottom: -5px;
                    border: 2px solid transparent;
                    border-top-color: var(--zen-accent);
                    border-radius: 50%;
                    animation: progress-spin ${duration / 1000}s linear forwards;
                `;
                document.querySelector('.breathing-circle-main').appendChild(progress);
            }
        });
    }

    showVisualGuide() {
        const containers = document.querySelectorAll('.breathing-guide-container');
        containers.forEach(container => {
            container.classList.add('active');
        });

        // Show sound waves
        const soundWaves = document.querySelectorAll('.breath-sound-waves');
        soundWaves.forEach(waves => {
            waves.classList.add('active');
        });
    }

    hideVisualGuide() {
        const containers = document.querySelectorAll('.breathing-guide-container');
        containers.forEach(container => {
            container.classList.remove('active');
        });

        const soundWaves = document.querySelectorAll('.breath-sound-waves');
        soundWaves.forEach(waves => {
            waves.classList.remove('active');
        });
    }

    updateDisplay() {
        // Update pattern information
        const pattern = this.patterns[this.state.currentPattern];

        // Update stats display
        this.updateStatsDisplay();

        // Update pattern description
        const descriptions = document.querySelectorAll('.pattern-description');
        descriptions.forEach(desc => {
            desc.textContent = pattern.description;
        });

        // Update benefits list
        const benefitsLists = document.querySelectorAll('.pattern-benefits');
        benefitsLists.forEach(list => {
            list.innerHTML = pattern.benefits.map(benefit =>
                `<li>${benefit}</li>`
            ).join('');
        });
    }

    updateStatsDisplay() {
        const sessionMinutes = this.state.sessionStartTime ?
            Math.floor((Date.now() - this.state.sessionStartTime) / 60000) : 0;

        const statElements = document.querySelectorAll('.breath-stat-value');
        if (statElements.length >= 3) {
            statElements[0].textContent = this.state.cycleCount;
            statElements[1].textContent = sessionMinutes;
            statElements[2].textContent = this.calculateCalmLevel();
        }
    }

    calculateCalmLevel() {
        // Simple calm level calculation based on session length and consistency
        const minutes = this.state.sessionStartTime ?
            Math.floor((Date.now() - this.state.sessionStartTime) / 60000) : 0;
        const cycles = this.state.cycleCount;

        return Math.min(10, Math.floor((minutes * 2) + (cycles / 5)));
    }

    updateControlButtons() {
        const startBtns = document.querySelectorAll('.breath-control-btn[data-action="start"]');
        const pauseBtns = document.querySelectorAll('.breath-control-btn[data-action="pause"]');

        startBtns.forEach(btn => {
            btn.textContent = this.state.isActive ? 'Resume' : 'Start';
            btn.style.display = this.state.isActive ? 'none' : 'inline-block';
        });

        pauseBtns.forEach(btn => {
            btn.style.display = this.state.isActive ? 'inline-block' : 'none';
        });
    }

    updatePatternButtons(activeButton) {
        document.querySelectorAll('.breathing-type').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    updateStats() {
        const today = new Date().toDateString();
        if (!this.stats[today]) {
            this.stats[today] = {
                sessions: 0,
                cycles: 0,
                minutes: 0,
                patterns: {}
            };
        }

        this.stats[today].cycles++;

        if (!this.stats[today].patterns[this.state.currentPattern]) {
            this.stats[today].patterns[this.state.currentPattern] = 0;
        }
        this.stats[today].patterns[this.state.currentPattern]++;

        localStorage.setItem('zenBreathingStats', JSON.stringify(this.stats));
    }

    showMilestoneMessage(message) {
        const milestone = document.createElement('div');
        milestone.className = 'breathing-milestone';
        milestone.innerHTML = `
            <div class="milestone-content">
                <div class="milestone-icon">🌟</div>
                <div class="milestone-text">${message}</div>
            </div>
        `;

        milestone.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(145deg, var(--zen-accent), var(--zen-gold));
            color: white;
            padding: 20px 30px;
            border-radius: 20px;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            opacity: 0;
            transition: all 0.5s ease;
        `;

        document.body.appendChild(milestone);

        setTimeout(() => {
            milestone.style.opacity = '1';
            milestone.style.transform = 'translate(-50%, -50%) scale(1.05)';
        }, 100);

        setTimeout(() => {
            milestone.style.opacity = '0';
            setTimeout(() => document.body.removeChild(milestone), 500);
        }, 3000);
    }

    showBreathingGuide() {
        // Scroll to breathing guide section or show modal
        const guide = document.querySelector('.breathing-guide-container');
        if (guide) {
            guide.scrollIntoView({ behavior: 'smooth', block: 'center' });
            guide.style.boxShadow = '0 0 30px rgba(79, 195, 247, 0.5)';
            setTimeout(() => {
                guide.style.boxShadow = '';
            }, 2000);
        }
    }

    showTechniqueDetails(card) {
        const technique = card.dataset.technique;
        // Show detailed information about the technique
        console.log(`Showing details for technique: ${technique}`);
    }

    loadUserPreferences() {
        const prefs = JSON.parse(localStorage.getItem('zenBreathingPrefs') || '{}');
        if (prefs.pattern && this.patterns[prefs.pattern]) {
            this.state.currentPattern = prefs.pattern;
        }
    }

    saveUserPreferences() {
        const prefs = {
            pattern: this.state.currentPattern
        };
        localStorage.setItem('zenBreathingPrefs', JSON.stringify(prefs));
    }

    trackEvent(eventName, data) {
        console.log(`Breathing Event: ${eventName}`, data);

        // Integration with main zen guide
        if (window.zenMaster) {
            window.zenMaster.trackEvent(eventName, data);
        }
    }

    // Public methods for external integration
    getCurrentPattern() {
        return this.patterns[this.state.currentPattern];
    }

    getSessionStats() {
        return {
            isActive: this.state.isActive,
            cycles: this.state.cycleCount,
            pattern: this.state.currentPattern,
            sessionDuration: this.state.sessionStartTime ?
                Date.now() - this.state.sessionStartTime : 0
        };
    }
}

// Add breathing-specific CSS animations
const breathingStyles = `
<style>
@keyframes breathe-in {
    from { transform: scale(1); border-color: rgba(79, 195, 247, 0.3); }
    to { transform: scale(1.2); border-color: rgba(79, 195, 247, 0.8); }
}

@keyframes breathe-in-inner {
    from { transform: scale(0.8); background: radial-gradient(circle, rgba(79, 195, 247, 0.2), rgba(79, 195, 247, 0.05)); }
    to { transform: scale(1.1); background: radial-gradient(circle, rgba(79, 195, 247, 0.6), rgba(79, 195, 247, 0.2)); }
}

@keyframes breathe-out {
    from { transform: scale(1.2); border-color: rgba(79, 195, 247, 0.8); }
    to { transform: scale(1); border-color: rgba(79, 195, 247, 0.3); }
}

@keyframes breathe-out-inner {
    from { transform: scale(1.1); background: radial-gradient(circle, rgba(79, 195, 247, 0.6), rgba(79, 195, 247, 0.2)); }
    to { transform: scale(0.8); background: radial-gradient(circle, rgba(79, 195, 247, 0.2), rgba(79, 195, 247, 0.05)); }
}

@keyframes breathe-hold {
    0%, 100% { transform: scale(1.2); border-color: rgba(255, 193, 7, 0.8); }
    50% { transform: scale(1.15); border-color: rgba(255, 193, 7, 0.6); }
}

@keyframes breathe-hold-inner {
    0%, 100% { transform: scale(1.1); background: radial-gradient(circle, rgba(255, 193, 7, 0.6), rgba(255, 193, 7, 0.2)); }
    50% { transform: scale(1.05); background: radial-gradient(circle, rgba(255, 193, 7, 0.4), rgba(255, 193, 7, 0.1)); }
}

@keyframes instruction-pulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
}

@keyframes progress-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', breathingStyles);

// Initialize breathing guide when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.breathing-guide-container')) {
        window.breathingGuide = new BreathingGuide();
    }
});

export default BreathingGuide;
