/**
 * ZEN MASTER GUIDE - WILD INTERACTIVE COMPONENTS
 * This is where the magic happens! 🎭✨
 */

class ZenMasterGuide {
    constructor() {
        this.isInitialized = false;
        this.particles = [];
        this.achievements = this.loadAchievements();
        this.meditationSessions = this.loadMeditationData();
        this.breathingActive = false;
        this.sounds = {
            bell: null,
            rain: null,
            forest: null,
            ocean: null
        };

        this.init();
    }

    init() {
        if (this.isInitialized) return;

        console.log('🧘‍♂️ Initializing Zen Master Guide...');

        this.initializeParticles();
        this.initializeAchievements();
        this.initializeMeditationTimer();
        this.initializeProgressGarden();
        this.initializeBreathingGuide();
        this.initializeFloatingActionMenu();
        this.initializeSoundEffects();
        this.initializeKeyboardShortcuts();
        this.initializeAmbientEffects();
        this.initializeUserProgress();

        // Add some delightful easter eggs
        this.initializeEasterEggs();

        this.isInitialized = true;
        console.log('✨ Zen Master Guide initialized successfully!');
    }

    // 🌸 FLOATING PARTICLES SYSTEM
    initializeParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'zen-petals';
        document.body.appendChild(particleContainer);

        setInterval(() => {
            if (this.particles.length < 10) {
                this.createParticle(particleContainer);
            }
        }, 3000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'zen-petal';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';

        // Random petal colors
        const colors = ['#ffc107', '#ff8a50', '#4fc3f7', '#8bc34a'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
        this.particles.push(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
            }
        }, 25000);
    }

    // 🏆 ACHIEVEMENT SYSTEM
    initializeAchievements() {
        this.achievements = {
            first_meditation: { unlocked: false, name: "First Steps", icon: "🧘‍♂️" },
            week_streak: { unlocked: false, name: "Weekly Warrior", icon: "🔥" },
            breath_master: { unlocked: false, name: "Breath Master", icon: "💨" },
            zen_garden: { unlocked: false, name: "Garden Keeper", icon: "🌸" },
            mindful_moment: { unlocked: false, name: "Mindful Moment", icon: "🌟" },
            inner_peace: { unlocked: false, name: "Inner Peace", icon: "☮️" },
            wisdom_seeker: { unlocked: false, name: "Wisdom Seeker", icon: "📿" },
            zen_master: { unlocked: false, name: "Zen Master", icon: "🏯" }
        };

        this.renderAchievements();
    }

    renderAchievements() {
        const achievementGrids = document.querySelectorAll('.achievement-grid');
        achievementGrids.forEach(grid => {
            grid.innerHTML = '';
            Object.entries(this.achievements).forEach(([key, achievement]) => {
                const badge = document.createElement('div');
                badge.className = `achievement-badge ${achievement.unlocked ? 'unlocked' : ''}`;
                badge.innerHTML = `
                    <div class="badge-icon">${achievement.icon}</div>
                    <div class="badge-name">${achievement.name}</div>
                `;
                badge.addEventListener('click', () => this.showAchievementDetails(key));
                grid.appendChild(badge);
            });
        });
    }

    unlockAchievement(achievementKey) {
        if (!this.achievements[achievementKey].unlocked) {
            this.achievements[achievementKey].unlocked = true;
            this.showAchievementNotification(this.achievements[achievementKey]);
            this.renderAchievements();
            this.saveAchievements();
            this.playSound('achievement');
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-popup">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <h3>Achievement Unlocked!</h3>
                    <p>${achievement.name}</p>
                </div>
            </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => document.body.removeChild(notification), 500);
            }, 3000);
        }, 100);
    }

    // 🎯 MEDITATION TIMER
    initializeMeditationTimer() {
        this.timerState = {
            duration: 300, // 5 minutes default
            remaining: 300,
            isRunning: false,
            interval: null,
            sessions: 0
        };

        this.renderMeditationTimer();
        this.attachTimerEvents();
    }

    renderMeditationTimer() {
        const timerContainers = document.querySelectorAll('.meditation-timer');
        timerContainers.forEach(container => {
            container.innerHTML = `
                <div class="meditation-timer-container">
                    <div class="timer-presets">
                        <button class="preset-button" data-duration="300">5 min</button>
                        <button class="preset-button active" data-duration="600">10 min</button>
                        <button class="preset-button" data-duration="900">15 min</button>
                        <button class="preset-button" data-duration="1200">20 min</button>
                        <button class="preset-button" data-duration="1800">30 min</button>
                    </div>
                    
                    <div class="meditation-types">
                        <button class="type-selector active" data-type="mindfulness">Mindfulness</button>
                        <button class="type-selector" data-type="breathing">Breathing</button>
                        <button class="type-selector" data-type="loving-kindness">Loving Kindness</button>
                        <button class="type-selector" data-type="walking">Walking</button>
                    </div>
                    
                    <div class="timer-circle-container">
                        <div class="timer-circle-bg"></div>
                        <div class="timer-progress-ring"></div>
                        <div class="timer-inner-circle">
                            <div class="timer-display">${this.formatTime(this.timerState.remaining)}</div>
                            <div class="timer-label">MINUTES REMAINING</div>
                        </div>
                        <div class="breathing-indicator"></div>
                        <div class="bell-animation">🔔</div>
                    </div>
                    
                    <div class="timer-controls">
                        <button class="control-button play">▶️</button>
                        <button class="control-button pause">⏸️</button>
                        <button class="control-button reset">🔄</button>
                    </div>
                    
                    <div class="session-stats">
                        <div class="stat-card">
                            <div class="stat-value">${this.timerState.sessions}</div>
                            <div class="stat-label">Sessions Today</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${Math.floor(this.getTotalMeditationTime() / 60)}</div>
                            <div class="stat-label">Total Minutes</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${this.getCurrentStreak()}</div>
                            <div class="stat-label">Day Streak</div>
                        </div>
                    </div>
                    
                    <div class="audio-controls">
                        <button class="sound-toggle" data-sound="rain">🌧️</button>
                        <button class="sound-toggle" data-sound="forest">🌲</button>
                        <button class="sound-toggle" data-sound="ocean">🌊</button>
                        <input type="range" class="volume-slider" min="0" max="100" value="50">
                    </div>
                </div>
            `;
        });
    }

    attachTimerEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.preset-button')) {
                this.setTimerDuration(parseInt(e.target.dataset.duration));
                document.querySelectorAll('.preset-button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }

            if (e.target.matches('.control-button.play')) {
                this.startTimer();
            }

            if (e.target.matches('.control-button.pause')) {
                this.pauseTimer();
            }

            if (e.target.matches('.control-button.reset')) {
                this.resetTimer();
            }

            if (e.target.matches('.type-selector')) {
                document.querySelectorAll('.type-selector').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                this.setMeditationType(e.target.dataset.type);
            }

            if (e.target.matches('.sound-toggle')) {
                this.toggleAmbientSound(e.target.dataset.sound);
            }
        });
    }

    startTimer() {
        if (this.timerState.isRunning) return;

        this.timerState.isRunning = true;
        this.showBreathingGuide();

        this.timerState.interval = setInterval(() => {
            this.timerState.remaining--;
            this.updateTimerDisplay();

            if (this.timerState.remaining <= 0) {
                this.timerComplete();
            }
        }, 1000);

        this.unlockAchievement('first_meditation');
    }

    pauseTimer() {
        this.timerState.isRunning = false;
        clearInterval(this.timerState.interval);
        this.hideBreathingGuide();
    }

    resetTimer() {
        this.pauseTimer();
        this.timerState.remaining = this.timerState.duration;
        this.updateTimerDisplay();
    }

    timerComplete() {
        this.pauseTimer();
        this.timerState.sessions++;
        this.playBellSound();
        this.showCompletionCelebration();
        this.saveMeditationSession();
        this.checkStreakAchievements();
    }

    // 🌊 BREATHING GUIDE
    initializeBreathingGuide() {
        this.breathingPatterns = {
            '4-4-4-4': { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
            '4-7-8': { inhale: 4, hold1: 7, exhale: 8, hold2: 0 },
            '6-6': { inhale: 6, hold1: 0, exhale: 6, hold2: 0 }
        };

        this.currentPattern = '4-4-4-4';
        this.renderBreathingGuide();
    }

    renderBreathingGuide() {
        const breathingContainers = document.querySelectorAll('.breathing-guide-placeholder');
        breathingContainers.forEach(container => {
            container.innerHTML = `
                <div class="breathing-guide-container">
                    <div class="breathing-exercise-selector">
                        <button class="breathing-type active" data-pattern="4-4-4-4">Box Breathing</button>
                        <button class="breathing-type" data-pattern="4-7-8">4-7-8 Calming</button>
                        <button class="breathing-type" data-pattern="6-6">Equal Breathing</button>
                    </div>
                    
                    <div class="breathing-circle-main">
                        <div class="breathing-circle-outer"></div>
                        <div class="breathing-circle-inner">
                            <div class="breathing-instruction">Breathe In</div>
                        </div>
                    </div>
                    
                    <div class="breathing-controls">
                        <button class="breath-control-btn" data-action="start">Start</button>
                        <button class="breath-control-btn" data-action="pause">Pause</button>
                        <button class="breath-control-btn" data-action="reset">Reset</button>
                    </div>
                    
                    <div class="breath-sound-waves">
                        <div class="breath-sound-bar"></div>
                        <div class="breath-sound-bar"></div>
                        <div class="breath-sound-bar"></div>
                        <div class="breath-sound-bar"></div>
                        <div class="breath-sound-bar"></div>
                    </div>
                    
                    <div class="breathing-session-stats">
                        <div class="breath-stat-card">
                            <div class="breath-stat-value">0</div>
                            <div class="breath-stat-label">Cycles</div>
                        </div>
                        <div class="breath-stat-card">
                            <div class="breath-stat-value">0</div>
                            <div class="breath-stat-label">Minutes</div>
                        </div>
                        <div class="breath-stat-card">
                            <div class="breath-stat-value">0</div>
                            <div class="breath-stat-label">Calm Level</div>
                        </div>
                    </div>
                    
                    <div class="breathing-tips">
                        <h4>Breathing Tips</h4>
                        <ul>
                            <li>Find a comfortable, quiet position</li>
                            <li>Place one hand on chest, one on belly</li>
                            <li>Focus on moving only your belly hand</li>
                            <li>Breathe through your nose when possible</li>
                            <li>Don't force the breath - let it flow naturally</li>
                        </ul>
                    </div>
                </div>
            `;
        });

        this.attachBreathingEvents();
    }

    // 🏯 PROGRESS GARDEN
    initializeProgressGarden() {
        this.gardenState = {
            completedDays: this.getCompletedDays(),
            currentDay: this.getCurrentDay(),
            stones: [],
            season: this.getCurrentSeason()
        };

        this.renderProgressGarden();
    }

    renderProgressGarden() {
        const gardenContainers = document.querySelectorAll('.progress-garden-placeholder');
        gardenContainers.forEach(container => {
            container.innerHTML = `
                <div class="progress-garden-container garden-${this.gardenState.season}">
                    <div class="garden-path"></div>
                    ${this.generateGardenElements()}
                    <div class="progress-stats">
                        <h3>Progress</h3>
                        <div class="stat-item">
                            <span>Completed:</span>
                            <span class="stat-value">${this.gardenState.completedDays.length}/90</span>
                        </div>
                        <div class="stat-item">
                            <span>Current Day:</span>
                            <span class="stat-value">${this.gardenState.currentDay}</span>
                        </div>
                        <div class="stat-item">
                            <span>Streak:</span>
                            <span class="stat-value">${this.getCurrentStreak()}</span>
                        </div>
                    </div>
                    <div class="garden-legend">
                        <div class="legend-item">
                            <div class="legend-icon completed"></div>
                            <span>Completed</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-icon current"></div>
                            <span>Current</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-icon pending"></div>
                            <span>Upcoming</span>
                        </div>
                    </div>
                    <div class="meditation-streak-indicator">
                        <div>🔥 ${this.getCurrentStreak()} Day Streak!</div>
                    </div>
                </div>
            `;
        });

        this.attachGardenEvents();
    }

    generateGardenElements() {
        let elements = '';
        const positions = this.generateStonePositions(90);

        for (let day = 1; day <= 90; day++) {
            const position = positions[day - 1];
            const isCompleted = this.gardenState.completedDays.includes(day);
            const isCurrent = day === this.gardenState.currentDay;
            const milestone = this.getMilestoneClass(day);

            let className = `zen-stone ${milestone}`;
            if (isCompleted) className += ' completed';
            if (isCurrent) className += ' current';

            elements += `
                <div class="${className}" 
                     style="left: ${position.x}%; top: ${position.y}%;"
                     data-day="${day}"
                     title="Day ${day}">
                    ${day}
                </div>
            `;

            // Add decorative elements for milestones
            if ([7, 21, 45, 90].includes(day) && isCompleted) {
                elements += `
                    <div class="achievement-flowers" 
                         style="left: ${position.x + 5}%; top: ${position.y - 5}%;">
                        🌸
                    </div>
                `;
            }
        }

        // Add water features
        elements += `
            <div class="zen-water" style="left: 70%; top: 80%; width: 60px; height: 40px;"></div>
            <div class="zen-plant" style="left: 15%; top: 20%;">🌿</div>
            <div class="zen-plant" style="left: 85%; top: 70%;">🍃</div>
        `;

        return elements;
    }

    // 🎵 SOUND EFFECTS & AMBIENT SOUNDS
    initializeSoundEffects() {
        // Create audio context for better control
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Bell sounds for meditation completion
        this.createBellSound();

        // Ambient sounds
        this.ambientSounds = {
            rain: this.createAmbientSound('rain'),
            forest: this.createAmbientSound('forest'),
            ocean: this.createAmbientSound('ocean')
        };
    }

    createBellSound() {
        // Generate a pleasant bell sound using Web Audio API
        this.bellSound = {
            play: () => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);

                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 2);

                gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 2);

                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 2);
            }
        };
    }

    // 🎭 FLOATING ACTION MENU
    initializeFloatingActionMenu() {
        const fab = document.createElement('div');
        fab.className = 'zen-fab';
        fab.innerHTML = `
            <button class="fab-main">🧘‍♂️</button>
            <div class="fab-menu">
                <button class="fab-option" data-action="quick-meditation" title="Quick Meditation">⏱️</button>
                <button class="fab-option" data-action="breathing-exercise" title="Breathing Exercise">💨</button>
                <button class="fab-option" data-action="mindful-bell" title="Mindful Bell">🔔</button>
                <button class="fab-option" data-action="progress-check" title="Check Progress">📊</button>
                <button class="fab-option" data-action="wisdom-quote" title="Daily Wisdom">💭</button>
            </div>
        `;

        document.body.appendChild(fab);

        fab.querySelector('.fab-main').addEventListener('click', () => {
            fab.classList.toggle('active');
        });

        fab.querySelectorAll('.fab-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.handleFabAction(e.target.dataset.action);
                fab.classList.remove('active');
            });
        });
    }

    handleFabAction(action) {
        switch (action) {
            case 'quick-meditation':
                this.startQuickMeditation();
                break;
            case 'breathing-exercise':
                this.showBreathingGuide();
                break;
            case 'mindful-bell':
                this.playBellSound();
                break;
            case 'progress-check':
                this.showProgressSummary();
                break;
            case 'wisdom-quote':
                this.showWisdomQuote();
                break;
        }
    }

    // 🎪 EASTER EGGS & DELIGHTFUL INTERACTIONS
    initializeEasterEggs() {
        // Konami code for special zen mode
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }

            if (konamiCode.join(',') === konamiSequence.join(',')) {
                this.activateZenMode();
                konamiCode = [];
            }
        });

        // Secret meditation when clicking on specific elements
        document.addEventListener('click', (e) => {
            if (e.target.textContent === '🧘‍♂️' && e.shiftKey) {
                this.secretMeditation();
            }
        });

        // Random wisdom quotes on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (Math.random() < 0.01) { // 1% chance
                    this.showFloatingWisdom();
                }
            }, 500);
        });
    }

    activateZenMode() {
        document.body.classList.add('zen-mode-active');
        this.showNotification('🧘‍♂️ Secret Zen Mode Activated! 🌸');

        // Add extra visual effects
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createParticle(document.querySelector('.zen-petals'));
            }, i * 100);
        }

        this.unlockAchievement('zen_master');
    }

    // 🔧 UTILITY METHODS
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    getCurrentDay() {
        // This would typically come from user progress data
        return parseInt(localStorage.getItem('zenCurrentDay') || '1');
    }

    getCurrentStreak() {
        return parseInt(localStorage.getItem('zenStreak') || '0');
    }

    loadAchievements() {
        const saved = localStorage.getItem('zenAchievements');
        return saved ? JSON.parse(saved) : {};
    }

    saveAchievements() {
        localStorage.setItem('zenAchievements', JSON.stringify(this.achievements));
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'zen-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(145deg, var(--zen-accent), var(--zen-gold));
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => document.body.removeChild(notification), 300);
            }, 3000);
        }, 100);
    }

    // Initialize when DOM is ready
    initializeUserProgress() {
        // Load user's meditation data from localStorage
        this.userProgress = JSON.parse(localStorage.getItem('zenUserProgress') || '{}');
        this.updateProgressVisuals();
    }

    updateProgressVisuals() {
        // Update all progress indicators throughout the site
        this.renderAchievements();
        this.renderProgressGarden();
        this.updateStreakDisplays();
    }
}

// 🚀 INITIALIZE THE ZEN EXPERIENCE
document.addEventListener('DOMContentLoaded', () => {
    window.zenMaster = new ZenMasterGuide();
});

// Add global keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'm':
                e.preventDefault();
                if (window.zenMaster) window.zenMaster.startQuickMeditation();
                break;
            case 'b':
                e.preventDefault();
                if (window.zenMaster) window.zenMaster.showBreathingGuide();
                break;
            case 'p':
                e.preventDefault();
                if (window.zenMaster) window.zenMaster.showProgressSummary();
                break;
        }
    }
});

console.log('🧘‍♂️ Zen Master Guide JavaScript loaded! Press Ctrl+M for quick meditation.');
