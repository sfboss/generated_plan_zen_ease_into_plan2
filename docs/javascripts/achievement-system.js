/**
 * ACHIEVEMENT SYSTEM - Gamification and Motivation
 */

class AchievementSystem {
    constructor() {
        this.achievements = {
            // Beginner Achievements
            first_session: {
                id: 'first_session',
                name: 'First Steps',
                description: 'Complete your first meditation session',
                icon: '🧘‍♂️',
                category: 'beginner',
                points: 10,
                unlocked: false,
                unlockedAt: null,
                rarity: 'common'
            },
            first_week: {
                id: 'first_week',
                name: 'Weekly Warrior',
                description: 'Practice for 7 consecutive days',
                icon: '🌱',
                category: 'consistency',
                points: 50,
                unlocked: false,
                unlockedAt: null,
                rarity: 'uncommon'
            },
            breath_master: {
                id: 'breath_master',
                name: 'Breath Master',
                description: 'Complete 100 breathing cycles',
                icon: '💨',
                category: 'technique',
                points: 30,
                unlocked: false,
                unlockedAt: null,
                rarity: 'common'
            },

            // Intermediate Achievements
            mindful_moment: {
                id: 'mindful_moment',
                name: 'Mindful Moment',
                description: 'Complete a 20-minute session',
                icon: '⏰',
                category: 'duration',
                points: 40,
                unlocked: false,
                unlockedAt: null,
                rarity: 'uncommon'
            },
            garden_keeper: {
                id: 'garden_keeper',
                name: 'Garden Keeper',
                description: 'Complete 30 days of practice',
                icon: '🌸',
                category: 'milestone',
                points: 100,
                unlocked: false,
                unlockedAt: null,
                rarity: 'rare'
            },
            night_owl: {
                id: 'night_owl',
                name: 'Night Owl',
                description: 'Meditate after 9 PM',
                icon: '🦉',
                category: 'special',
                points: 20,
                unlocked: false,
                unlockedAt: null,
                rarity: 'common'
            },
            early_bird: {
                id: 'early_bird',
                name: 'Early Bird',
                description: 'Meditate before 6 AM',
                icon: '🐦',
                category: 'special',
                points: 25,
                unlocked: false,
                unlockedAt: null,
                rarity: 'uncommon'
            },

            // Advanced Achievements
            inner_peace: {
                id: 'inner_peace',
                name: 'Inner Peace',
                description: 'Maintain a 21-day streak',
                icon: '☮️',
                category: 'consistency',
                points: 150,
                unlocked: false,
                unlockedAt: null,
                rarity: 'rare'
            },
            wisdom_seeker: {
                id: 'wisdom_seeker',
                name: 'Wisdom Seeker',
                description: 'Read all cultural context pages',
                icon: '📿',
                category: 'knowledge',
                points: 60,
                unlocked: false,
                unlockedAt: null,
                rarity: 'uncommon'
            },
            marathon_meditator: {
                id: 'marathon_meditator',
                name: 'Marathon Meditator',
                description: 'Complete a 60-minute session',
                icon: '🏃‍♂️',
                category: 'duration',
                points: 200,
                unlocked: false,
                unlockedAt: null,
                rarity: 'epic'
            },

            // Master Achievements
            zen_master: {
                id: 'zen_master',
                name: 'Zen Master',
                description: 'Complete the full 90-day journey',
                icon: '🏯',
                category: 'mastery',
                points: 500,
                unlocked: false,
                unlockedAt: null,
                rarity: 'legendary'
            },
            perfectionist: {
                id: 'perfectionist',
                name: 'Perfectionist',
                description: 'Complete 90 days without missing a single day',
                icon: '💎',
                category: 'mastery',
                points: 1000,
                unlocked: false,
                unlockedAt: null,
                rarity: 'legendary'
            },

            // Hidden/Secret Achievements
            konami_code: {
                id: 'konami_code',
                name: 'Secret Master',
                description: 'Found the hidden zen mode',
                icon: '🔮',
                category: 'secret',
                points: 100,
                unlocked: false,
                unlockedAt: null,
                rarity: 'epic',
                hidden: true
            },
            sound_explorer: {
                id: 'sound_explorer',
                name: 'Sound Explorer',
                description: 'Try all ambient sounds',
                icon: '🎵',
                category: 'exploration',
                points: 40,
                unlocked: false,
                unlockedAt: null,
                rarity: 'uncommon'
            },
            midnight_meditation: {
                id: 'midnight_meditation',
                name: 'Midnight Mystic',
                description: 'Meditate at exactly midnight',
                icon: '🌙',
                category: 'secret',
                points: 75,
                unlocked: false,
                unlockedAt: null,
                rarity: 'rare',
                hidden: true
            }
        };

        this.userStats = {
            totalSessions: 0,
            totalMinutes: 0,
            currentStreak: 0,
            longestStreak: 0,
            breathingCycles: 0,
            totalPoints: 0,
            level: 1
        };

        this.categories = {
            beginner: { name: 'Beginner', color: '#4caf50' },
            consistency: { name: 'Consistency', color: '#ff9800' },
            technique: { name: 'Technique', color: '#2196f3' },
            duration: { name: 'Duration', color: '#9c27b0' },
            milestone: { name: 'Milestone', color: '#f44336' },
            special: { name: 'Special', color: '#ffc107' },
            knowledge: { name: 'Knowledge', color: '#795548' },
            mastery: { name: 'Mastery', color: '#607d8b' },
            secret: { name: 'Secret', color: '#e91e63' },
            exploration: { name: 'Exploration', color: '#00bcd4' }
        };

        this.rarityColors = {
            common: '#95a5a6',
            uncommon: '#3498db',
            rare: '#9b59b6',
            epic: '#e74c3c',
            legendary: '#f39c12'
        };

        this.loadData();
        this.init();
    }

    init() {
        this.renderAchievementGrid();
        this.renderProgressSummary();
        this.bindEvents();
        this.checkPendingAchievements();

        // Set up auto-check intervals
        setInterval(() => this.checkTimeBasedAchievements(), 60000); // Check every minute
    }

    renderAchievementGrid() {
        const containers = document.querySelectorAll('.achievement-system');

        containers.forEach(container => {
            container.innerHTML = `
                <div class="achievement-header">
                    <h3>🏆 Achievements</h3>
                    <div class="achievement-stats">
                        <div class="stat-item">
                            <span class="stat-value">${this.getUnlockedCount()}</span>
                            <span class="stat-label">/${this.getTotalCount()}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.userStats.totalPoints}</span>
                            <span class="stat-label">Points</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">Level ${this.userStats.level}</span>
                            <span class="stat-label">${this.getNextLevelProgress()}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="achievement-filters">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="unlocked">Unlocked</button>
                    <button class="filter-btn" data-filter="locked">Locked</button>
                    ${Object.entries(this.categories).map(([key, cat]) =>
                `<button class="filter-btn" data-filter="${key}">${cat.name}</button>`
            ).join('')}
                </div>
                
                <div class="achievement-grid">
                    ${this.renderAchievements()}
                </div>
                
                <div class="level-progress">
                    <h4>Level Progress</h4>
                    <div class="level-bar">
                        <div class="level-fill" style="width: ${this.getNextLevelProgress()}%"></div>
                    </div>
                    <div class="level-info">
                        <span>Level ${this.userStats.level}</span>
                        <span>${this.getPointsForNextLevel() - this.userStats.totalPoints} points to next level</span>
                    </div>
                </div>
            `;
        });
    }

    renderAchievements(filter = 'all') {
        const achievements = Object.values(this.achievements)
            .filter(achievement => {
                if (achievement.hidden && !achievement.unlocked) return false;

                switch (filter) {
                    case 'unlocked': return achievement.unlocked;
                    case 'locked': return !achievement.unlocked;
                    case 'all': return true;
                    default: return achievement.category === filter;
                }
            });

        return achievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'} ${achievement.category}"
                 data-rarity="${achievement.rarity}"
                 data-achievement="${achievement.id}">
                <div class="achievement-icon ${achievement.rarity}">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4 class="achievement-name">${achievement.name}</h4>
                    <p class="achievement-description">${achievement.description}</p>
                    <div class="achievement-meta">
                        <span class="achievement-points">${achievement.points} pts</span>
                        <span class="achievement-rarity ${achievement.rarity}">${achievement.rarity}</span>
                        ${achievement.unlocked ?
                `<span class="achievement-date">${this.formatDate(achievement.unlockedAt)}</span>` :
                ''
            }
                    </div>
                </div>
                ${achievement.unlocked ? '<div class="achievement-glow"></div>' : ''}
            </div>
        `).join('');
    }

    renderProgressSummary() {
        const summaries = document.querySelectorAll('.achievement-summary');

        summaries.forEach(summary => {
            const recentAchievements = Object.values(this.achievements)
                .filter(a => a.unlocked)
                .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
                .slice(0, 3);

            summary.innerHTML = `
                <div class="achievement-mini-summary">
                    <div class="summary-stats">
                        <div class="mini-stat">
                            <span class="mini-value">${this.getUnlockedCount()}</span>
                            <span class="mini-label">Achievements</span>
                        </div>
                        <div class="mini-stat">
                            <span class="mini-value">${this.userStats.totalPoints}</span>
                            <span class="mini-label">Points</span>
                        </div>
                        <div class="mini-stat">
                            <span class="mini-value">${this.userStats.level}</span>
                            <span class="mini-label">Level</span>
                        </div>
                    </div>
                    
                    ${recentAchievements.length > 0 ? `
                        <div class="recent-achievements">
                            <h5>Recent Achievements</h5>
                            <div class="recent-list">
                                ${recentAchievements.map(a => `
                                    <div class="recent-achievement">
                                        <span class="recent-icon">${a.icon}</span>
                                        <span class="recent-name">${a.name}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        });
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.filter-btn')) {
                this.handleFilterClick(e.target);
            }

            if (e.target.matches('.achievement-card') || e.target.closest('.achievement-card')) {
                const card = e.target.matches('.achievement-card') ? e.target : e.target.closest('.achievement-card');
                this.showAchievementDetail(card.dataset.achievement);
            }
        });

        // Listen for meditation events
        document.addEventListener('meditation-session-complete', (e) => {
            this.handleMeditationComplete(e.detail);
        });

        document.addEventListener('breathing-session-complete', (e) => {
            this.handleBreathingComplete(e.detail);
        });

        document.addEventListener('page-visit', (e) => {
            this.handlePageVisit(e.detail);
        });
    }

    handleFilterClick(button) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        const grid = button.closest('.achievement-system').querySelector('.achievement-grid');
        grid.innerHTML = this.renderAchievements(filter);
    }

    checkAchievement(achievementId, data = {}) {
        const achievement = this.achievements[achievementId];
        if (!achievement || achievement.unlocked) return false;

        let shouldUnlock = false;

        switch (achievementId) {
            case 'first_session':
                shouldUnlock = this.userStats.totalSessions >= 1;
                break;

            case 'first_week':
                shouldUnlock = this.userStats.currentStreak >= 7;
                break;

            case 'breath_master':
                shouldUnlock = this.userStats.breathingCycles >= 100;
                break;

            case 'mindful_moment':
                shouldUnlock = data.sessionDuration >= 1200; // 20 minutes
                break;

            case 'garden_keeper':
                shouldUnlock = this.userStats.totalSessions >= 30;
                break;

            case 'inner_peace':
                shouldUnlock = this.userStats.currentStreak >= 21;
                break;

            case 'zen_master':
                shouldUnlock = this.userStats.totalSessions >= 90;
                break;

            case 'perfectionist':
                shouldUnlock = this.userStats.currentStreak >= 90 && this.userStats.totalSessions >= 90;
                break;

            case 'marathon_meditator':
                shouldUnlock = data.sessionDuration >= 3600; // 60 minutes
                break;

            case 'night_owl':
                shouldUnlock = data.sessionTime && new Date(data.sessionTime).getHours() >= 21;
                break;

            case 'early_bird':
                shouldUnlock = data.sessionTime && new Date(data.sessionTime).getHours() <= 6;
                break;

            case 'midnight_meditation':
                shouldUnlock = data.sessionTime &&
                    new Date(data.sessionTime).getHours() === 0 &&
                    new Date(data.sessionTime).getMinutes() === 0;
                break;
        }

        if (shouldUnlock) {
            this.unlockAchievement(achievementId);
            return true;
        }

        return false;
    }

    unlockAchievement(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement || achievement.unlocked) return;

        achievement.unlocked = true;
        achievement.unlockedAt = new Date().toISOString();

        this.userStats.totalPoints += achievement.points;
        this.updateLevel();

        this.showAchievementNotification(achievement);
        this.saveData();
        this.renderAchievementGrid();
        this.renderProgressSummary();

        // Play achievement sound
        if (window.zenSounds) {
            window.zenSounds.playSound('achievement');
        }

        console.log(`🏆 Achievement unlocked: ${achievement.name}`);
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = `achievement-notification ${achievement.rarity}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-header">
                    <div class="notification-icon">${achievement.icon}</div>
                    <div class="notification-text">
                        <h3>Achievement Unlocked!</h3>
                        <h4 class="${achievement.rarity}">${achievement.name}</h4>
                    </div>
                </div>
                <p class="notification-description">${achievement.description}</p>
                <div class="notification-footer">
                    <span class="notification-points">+${achievement.points} points</span>
                    <span class="notification-rarity ${achievement.rarity}">${achievement.rarity}</span>
                </div>
            </div>
            <div class="notification-glow ${achievement.rarity}"></div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 350px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.5s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 5000);

        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 500);
        });
    }

    showAchievementDetail(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement) return;

        const modal = document.createElement('div');
        modal.className = 'achievement-modal';
        modal.innerHTML = `
            <div class="achievement-detail ${achievement.rarity}">
                <div class="detail-header">
                    <div class="detail-icon ${achievement.rarity}">${achievement.icon}</div>
                    <h2 class="detail-name">${achievement.name}</h2>
                    <span class="detail-rarity ${achievement.rarity}">${achievement.rarity}</span>
                </div>
                
                <p class="detail-description">${achievement.description}</p>
                
                <div class="detail-meta">
                    <div class="meta-item">
                        <span class="meta-label">Category:</span>
                        <span class="meta-value">${this.categories[achievement.category].name}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Points:</span>
                        <span class="meta-value">${achievement.points}</span>
                    </div>
                    ${achievement.unlocked ? `
                        <div class="meta-item">
                            <span class="meta-label">Unlocked:</span>
                            <span class="meta-value">${this.formatDate(achievement.unlockedAt)}</span>
                        </div>
                    ` : `
                        <div class="meta-item">
                            <span class="meta-label">Progress:</span>
                            <span class="meta-value">${this.getAchievementProgress(achievementId)}%</span>
                        </div>
                    `}
                </div>
                
                <button class="close-detail">Close</button>
            </div>
        `;

        modal.style.cssText = `
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
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-detail').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    handleMeditationComplete(data) {
        this.userStats.totalSessions++;
        this.userStats.totalMinutes += Math.floor(data.duration / 60);

        // Update streak logic would go here
        // For now, just increment
        this.userStats.currentStreak++;
        if (this.userStats.currentStreak > this.userStats.longestStreak) {
            this.userStats.longestStreak = this.userStats.currentStreak;
        }

        // Check relevant achievements
        this.checkAchievement('first_session');
        this.checkAchievement('first_week');
        this.checkAchievement('mindful_moment', data);
        this.checkAchievement('garden_keeper');
        this.checkAchievement('inner_peace');
        this.checkAchievement('zen_master');
        this.checkAchievement('perfectionist');
        this.checkAchievement('marathon_meditator', data);
        this.checkAchievement('night_owl', data);
        this.checkAchievement('early_bird', data);
        this.checkAchievement('midnight_meditation', data);

        this.saveData();
    }

    handleBreathingComplete(data) {
        this.userStats.breathingCycles += data.cycles || 1;
        this.checkAchievement('breath_master');
        this.saveData();
    }

    handlePageVisit(data) {
        // Track knowledge-based achievements
        if (data.page && data.page.includes('cultural-respect')) {
            this.checkAchievement('wisdom_seeker');
        }
    }

    checkTimeBasedAchievements() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        // Check for midnight meditation
        if (hour === 0 && minute === 0) {
            // If user is currently in a meditation session
            if (window.meditationTimer && window.meditationTimer.state.isRunning) {
                this.checkAchievement('midnight_meditation', { sessionTime: now.toISOString() });
            }
        }
    }

    checkPendingAchievements() {
        // Check all achievements against current stats
        Object.keys(this.achievements).forEach(id => {
            this.checkAchievement(id, { sessionTime: new Date().toISOString() });
        });
    }

    updateLevel() {
        const newLevel = this.calculateLevel(this.userStats.totalPoints);
        if (newLevel > this.userStats.level) {
            this.userStats.level = newLevel;
            this.showLevelUpNotification(newLevel);
        }
    }

    calculateLevel(points) {
        // Level curve: Level = sqrt(points / 100) + 1
        return Math.floor(Math.sqrt(points / 100)) + 1;
    }

    getPointsForLevel(level) {
        return Math.pow(level - 1, 2) * 100;
    }

    getPointsForNextLevel() {
        return this.getPointsForLevel(this.userStats.level + 1);
    }

    getNextLevelProgress() {
        const currentLevelPoints = this.getPointsForLevel(this.userStats.level);
        const nextLevelPoints = this.getPointsForNextLevel();
        const progressPoints = this.userStats.totalPoints - currentLevelPoints;
        const totalNeeded = nextLevelPoints - currentLevelPoints;

        return Math.round((progressPoints / totalNeeded) * 100);
    }

    showLevelUpNotification(level) {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-content">
                <div class="level-up-icon">⬆️</div>
                <h3>Level Up!</h3>
                <div class="level-up-level">Level ${level}</div>
                <p>Your zen practice is growing stronger!</p>
            </div>
        `;

        // Similar styling and behavior to achievement notifications
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 10000;
            background: linear-gradient(145deg, var(--zen-gold), var(--zen-accent));
            color: white;
            padding: 20px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            opacity: 0;
            transform: translateX(-100%);
            transition: all 0.5s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }

    // Utility methods
    getUnlockedCount() {
        return Object.values(this.achievements).filter(a => a.unlocked).length;
    }

    getTotalCount() {
        return Object.values(this.achievements).filter(a => !a.hidden || a.unlocked).length;
    }

    getAchievementProgress(achievementId) {
        // This would calculate progress towards each achievement
        // For now, return 0 for locked achievements
        return this.achievements[achievementId].unlocked ? 100 : 0;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    }

    loadData() {
        const savedAchievements = localStorage.getItem('zenAchievements');
        const savedStats = localStorage.getItem('zenUserStats');

        if (savedAchievements) {
            const saved = JSON.parse(savedAchievements);
            Object.keys(saved).forEach(id => {
                if (this.achievements[id]) {
                    this.achievements[id] = { ...this.achievements[id], ...saved[id] };
                }
            });
        }

        if (savedStats) {
            this.userStats = { ...this.userStats, ...JSON.parse(savedStats) };
        }
    }

    saveData() {
        localStorage.setItem('zenAchievements', JSON.stringify(this.achievements));
        localStorage.setItem('zenUserStats', JSON.stringify(this.userStats));
    }

    // Public API
    forceUnlock(achievementId) {
        this.unlockAchievement(achievementId);
    }

    getStats() {
        return { ...this.userStats };
    }

    exportAchievements() {
        return {
            achievements: this.achievements,
            stats: this.userStats,
            exportDate: new Date().toISOString()
        };
    }
}

// Add achievement system styles
const achievementStyles = `
<style>
.achievement-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.achievement-card {
    background: linear-gradient(145deg, #f8f9fa, #e9ecef);
    border-radius: 15px;
    padding: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: 2px solid transparent;
}

.achievement-card.unlocked {
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
    border-color: var(--zen-accent);
    box-shadow: 0 5px 20px rgba(255, 193, 7, 0.2);
}

.achievement-card.locked {
    opacity: 0.6;
    filter: grayscale(50%);
}

.achievement-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.achievement-icon {
    font-size: 3em;
    text-align: center;
    margin-bottom: 15px;
    position: relative;
}

.achievement-icon.common { filter: drop-shadow(0 0 5px #95a5a6); }
.achievement-icon.uncommon { filter: drop-shadow(0 0 5px #3498db); }
.achievement-icon.rare { filter: drop-shadow(0 0 5px #9b59b6); }
.achievement-icon.epic { filter: drop-shadow(0 0 5px #e74c3c); }
.achievement-icon.legendary { filter: drop-shadow(0 0 10px #f39c12); }

.achievement-name {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 8px;
    color: var(--zen-void);
}

.achievement-description {
    color: #666;
    font-size: 0.9em;
    margin-bottom: 15px;
    line-height: 1.4;
}

.achievement-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8em;
}

.achievement-points {
    background: var(--zen-accent);
    color: white;
    padding: 4px 8px;
    border-radius: 10px;
    font-weight: bold;
}

.achievement-rarity {
    padding: 4px 8px;
    border-radius: 10px;
    font-weight: bold;
    text-transform: uppercase;
}

.achievement-rarity.common { background: #95a5a6; color: white; }
.achievement-rarity.uncommon { background: #3498db; color: white; }
.achievement-rarity.rare { background: #9b59b6; color: white; }
.achievement-rarity.epic { background: #e74c3c; color: white; }
.achievement-rarity.legendary { background: #f39c12; color: white; }

.achievement-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 193, 7, 0.1) 0%, transparent 70%);
    animation: achievement-shimmer 3s infinite;
    pointer-events: none;
}

@keyframes achievement-shimmer {
    0%, 100% { opacity: 0.3; transform: rotate(0deg); }
    50% { opacity: 0.6; transform: rotate(180deg); }
}

.achievement-filters {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
}

.filter-btn {
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
    border: 2px solid transparent;
    border-radius: 20px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9em;
}

.filter-btn:hover,
.filter-btn.active {
    background: linear-gradient(145deg, var(--zen-accent), var(--zen-gold));
    color: white;
    border-color: var(--zen-accent);
}

.achievement-notification {
    background: linear-gradient(145deg, #ffffff, #f8f9fa);
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    border-left: 4px solid var(--zen-accent);
}

.achievement-notification.legendary {
    background: linear-gradient(145deg, #f39c12, #e67e22);
    color: white;
    border-left-color: #f39c12;
    animation: legendary-glow 2s infinite alternate;
}

@keyframes legendary-glow {
    0% { box-shadow: 0 10px 30px rgba(0,0,0,0.3), 0 0 20px rgba(243, 156, 18, 0.5); }
    100% { box-shadow: 0 15px 40px rgba(0,0,0,0.4), 0 0 30px rgba(243, 156, 18, 0.8); }
}

.level-progress {
    background: linear-gradient(145deg, #f8f9fa, #e9ecef);
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
}

.level-bar {
    background: #e0e0e0;
    border-radius: 10px;
    height: 20px;
    margin: 10px 0;
    overflow: hidden;
}

.level-fill {
    background: linear-gradient(90deg, var(--zen-primary), var(--zen-accent));
    height: 100%;
    border-radius: 10px;
    transition: width 1s ease;
    position: relative;
}

.level-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: level-shine 2s infinite;
}

@keyframes level-shine {
    0% { left: -100%; }
    100% { left: 100%; }
}

.level-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
    color: #666;
}

/* Dark mode adaptations */
[data-md-color-scheme="slate"] .achievement-card {
    background: linear-gradient(145deg, #3b4252, #434c5e);
    color: #eceff4;
}

[data-md-color-scheme="slate"] .achievement-card.unlocked {
    background: linear-gradient(145deg, #434c5e, #4c566a);
}

[data-md-color-scheme="slate"] .achievement-name {
    color: #eceff4;
}

[data-md-color-scheme="slate"] .filter-btn {
    background: linear-gradient(145deg, #434c5e, #4c566a);
    color: #eceff4;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', achievementStyles);

// Initialize achievement system
document.addEventListener('DOMContentLoaded', () => {
    window.achievementSystem = new AchievementSystem();
});

export default AchievementSystem;
