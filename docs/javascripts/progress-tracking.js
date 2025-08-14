/**
 * PROGRESS TRACKING - Advanced Visualization and Analytics
 */

class ProgressTracker {
    constructor() {
        this.data = JSON.parse(localStorage.getItem('zenProgressData') || '{}');
        this.achievements = JSON.parse(localStorage.getItem('zenAchievements') || '{}');
        this.streaks = JSON.parse(localStorage.getItem('zenStreaks') || '{}');

        this.defaultData = {
            currentDay: 1,
            completedDays: [],
            meditationSessions: [],
            breathingSessions: [],
            journalEntries: [],
            moods: {},
            goals: [],
            milestones: {
                7: false,
                21: false,
                45: false,
                90: false
            }
        };

        this.data = { ...this.defaultData, ...this.data };
        this.init();
    }

    init() {
        this.renderProgressCharts();
        this.renderStreakCalendar();
        this.renderMilestoneTracker();
        this.renderGoalTracker();
        this.bindEvents();
        this.calculateInsights();
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.day-complete-btn')) {
                this.markDayComplete(parseInt(e.target.dataset.day));
            }

            if (e.target.matches('.mood-selector')) {
                this.recordMood(e.target.dataset.mood);
            }

            if (e.target.matches('.add-goal-btn')) {
                this.showGoalDialog();
            }

            if (e.target.matches('.zen-stone')) {
                this.showDayDetails(parseInt(e.target.dataset.day));
            }
        });
    }

    markDayComplete(day) {
        if (!this.data.completedDays.includes(day)) {
            this.data.completedDays.push(day);
            this.data.completedDays.sort((a, b) => a - b);

            // Update current day if completing in sequence
            if (day === this.data.currentDay) {
                this.data.currentDay++;
            }

            // Check for milestones
            this.checkMilestones(day);

            // Update streak
            this.updateStreak();

            this.saveData();
            this.renderAll();
            this.celebrateCompletion(day);
        }
    }

    checkMilestones(day) {
        const milestones = [7, 21, 45, 90];
        milestones.forEach(milestone => {
            if (day === milestone && !this.data.milestones[milestone]) {
                this.data.milestones[milestone] = true;
                this.unlockMilestone(milestone);
            }
        });
    }

    unlockMilestone(milestone) {
        const milestoneData = {
            7: { name: 'First Week', icon: '🌱', message: 'Congratulations! You\'ve completed your first week of zen practice!' },
            21: { name: 'Three Weeks', icon: '🌿', message: 'Amazing! Three weeks of consistent practice!' },
            45: { name: 'Midpoint Master', icon: '🌳', message: 'Halfway there! Your dedication is inspiring!' },
            90: { name: 'Zen Master', icon: '🏯', message: 'Incredible! You\'ve completed the full 90-day journey!' }
        };

        const data = milestoneData[milestone];
        this.showMilestoneAchievement(data);

        if (window.zenMaster) {
            window.zenMaster.unlockAchievement(`milestone_${milestone}`);
        }
    }

    showMilestoneAchievement(data) {
        const modal = document.createElement('div');
        modal.className = 'milestone-modal';
        modal.innerHTML = `
            <div class="milestone-content">
                <div class="milestone-icon">${data.icon}</div>
                <h2>${data.name} Achieved!</h2>
                <p>${data.message}</p>
                <div class="milestone-stats">
                    <div class="stat-item">
                        <span>Total Sessions:</span>
                        <span>${this.data.meditationSessions.length}</span>
                    </div>
                    <div class="stat-item">
                        <span>Current Streak:</span>
                        <span>${this.getCurrentStreak()} days</span>
                    </div>
                </div>
                <button class="milestone-close">Continue Journey</button>
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

        modal.querySelector('.milestone-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    updateStreak() {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

        if (!this.streaks[today]) {
            // Check if we practiced yesterday to continue streak
            if (this.streaks[yesterday]) {
                this.streaks[today] = this.streaks[yesterday] + 1;
            } else {
                this.streaks[today] = 1;
            }
        }
    }

    getCurrentStreak() {
        const today = new Date().toDateString();
        return this.streaks[today] || 0;
    }

    renderProgressCharts() {
        const chartContainers = document.querySelectorAll('.progress-chart');
        chartContainers.forEach(container => {
            this.renderWeeklyProgress(container);
        });
    }

    renderWeeklyProgress(container) {
        const weeks = this.organizeDataByWeeks();

        container.innerHTML = `
            <div class="weekly-chart">
                <h3>Weekly Progress</h3>
                <div class="chart-bars">
                    ${weeks.map((week, index) => `
                        <div class="week-bar">
                            <div class="bar-fill" style="height: ${(week.completion / 7) * 100}%"></div>
                            <div class="week-label">W${index + 1}</div>
                            <div class="week-completion">${week.completion}/7</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderStreakCalendar() {
        const calendars = document.querySelectorAll('.streak-calendar');
        calendars.forEach(calendar => {
            calendar.innerHTML = this.generateCalendarHTML();
        });
    }

    generateCalendarHTML() {
        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        let html = '<div class="calendar-grid">';
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dateString = currentDate.toDateString();
            const hasSession = this.streaks[dateString] > 0;
            const isToday = currentDate.toDateString() === today.toDateString();

            html += `
                <div class="calendar-day ${hasSession ? 'has-session' : ''} ${isToday ? 'today' : ''}"
                     title="${dateString}: ${hasSession ? 'Practiced' : 'No practice'}">
                    ${currentDate.getDate()}
                </div>
            `;

            currentDate.setDate(currentDate.getDate() + 1);
        }

        html += '</div>';
        return html;
    }

    renderMilestoneTracker() {
        const trackers = document.querySelectorAll('.milestone-tracker');
        trackers.forEach(tracker => {
            tracker.innerHTML = `
                <div class="milestones-grid">
                    ${Object.entries(this.data.milestones).map(([day, completed]) => `
                        <div class="milestone-card ${completed ? 'completed' : ''}">
                            <div class="milestone-icon">${this.getMilestoneIcon(day)}</div>
                            <div class="milestone-day">Day ${day}</div>
                            <div class="milestone-name">${this.getMilestoneName(day)}</div>
                            <div class="milestone-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${this.getMilestoneProgress(day)}%"></div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        });
    }

    renderGoalTracker() {
        const trackers = document.querySelectorAll('.goal-tracker');
        trackers.forEach(tracker => {
            tracker.innerHTML = `
                <div class="goals-section">
                    <h3>Your Goals</h3>
                    <div class="goals-list">
                        ${this.data.goals.map(goal => `
                            <div class="goal-item ${goal.completed ? 'completed' : ''}">
                                <div class="goal-icon">${goal.completed ? '✅' : '⭕'}</div>
                                <div class="goal-text">${goal.text}</div>
                                <div class="goal-progress">${goal.progress || 0}%</div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="add-goal-btn">Add New Goal</button>
                </div>
            `;
        });
    }

    renderAll() {
        this.renderProgressCharts();
        this.renderStreakCalendar();
        this.renderMilestoneTracker();
        this.renderGoalTracker();
        this.updateProgressGarden();
    }

    updateProgressGarden() {
        // Update the zen garden visualization
        const stones = document.querySelectorAll('.zen-stone');
        stones.forEach(stone => {
            const day = parseInt(stone.dataset.day);
            if (this.data.completedDays.includes(day)) {
                stone.classList.add('completed');
            }
            if (day === this.data.currentDay) {
                stone.classList.add('current');
            }
        });
    }

    celebrateCompletion(day) {
        // Create celebration animation
        const celebration = document.createElement('div');
        celebration.className = 'day-completion-celebration';
        celebration.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-icon">🎉</div>
                <h3>Day ${day} Complete!</h3>
                <p>Great job on your zen practice today!</p>
                <div class="celebration-stats">
                    <div>Streak: ${this.getCurrentStreak()} days</div>
                    <div>Progress: ${Math.round((this.data.completedDays.length / 90) * 100)}%</div>
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

        document.body.appendChild(celebration);

        setTimeout(() => {
            celebration.style.opacity = '1';
            setTimeout(() => {
                celebration.style.opacity = '0';
                setTimeout(() => document.body.removeChild(celebration), 500);
            }, 3000);
        }, 100);

        // Create floating particles
        this.createCelebrationParticles();
    }

    createCelebrationParticles() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.textContent = ['🌟', '✨', '🎊', '🎉'][Math.floor(Math.random() * 4)];
                particle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: 100%;
                    font-size: 2em;
                    pointer-events: none;
                    z-index: 10001;
                    animation: celebrate-float 3s ease-out forwards;
                `;

                document.body.appendChild(particle);

                setTimeout(() => {
                    if (particle.parentNode) {
                        document.body.removeChild(particle);
                    }
                }, 3000);
            }, i * 100);
        }
    }

    calculateInsights() {
        const insights = {
            totalSessions: this.data.meditationSessions.length,
            averageSessionLength: this.getAverageSessionLength(),
            longestStreak: this.getLongestStreak(),
            favoriteTime: this.getFavoriteTime(),
            progressRate: this.getProgressRate(),
            consistency: this.getConsistencyScore()
        };

        this.displayInsights(insights);
    }

    displayInsights(insights) {
        const insightContainers = document.querySelectorAll('.progress-insights');
        insightContainers.forEach(container => {
            container.innerHTML = `
                <div class="insights-grid">
                    <div class="insight-card">
                        <div class="insight-value">${insights.totalSessions}</div>
                        <div class="insight-label">Total Sessions</div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-value">${insights.averageSessionLength}</div>
                        <div class="insight-label">Avg. Session</div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-value">${insights.longestStreak}</div>
                        <div class="insight-label">Longest Streak</div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-value">${insights.progressRate}%</div>
                        <div class="insight-label">Completion Rate</div>
                    </div>
                </div>
                <div class="insight-recommendations">
                    ${this.generateRecommendations(insights)}
                </div>
            `;
        });
    }

    generateRecommendations(insights) {
        const recommendations = [];

        if (insights.consistency < 70) {
            recommendations.push('💡 Try setting a consistent daily time for practice');
        }

        if (insights.averageSessionLength < 10) {
            recommendations.push('🕐 Consider gradually increasing your session length');
        }

        if (insights.longestStreak < 7) {
            recommendations.push('🔥 Focus on building a weekly streak for better habits');
        }

        return recommendations.map(rec => `<div class="recommendation">${rec}</div>`).join('');
    }

    // Utility methods
    organizeDataByWeeks() {
        const weeks = [];
        for (let week = 0; week < 13; week++) {
            const startDay = week * 7 + 1;
            const endDay = Math.min((week + 1) * 7, 90);
            const weekDays = Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i);
            const completion = weekDays.filter(day => this.data.completedDays.includes(day)).length;
            weeks.push({ week: week + 1, completion, total: weekDays.length });
        }
        return weeks;
    }

    getMilestoneIcon(day) {
        const icons = { 7: '🌱', 21: '🌿', 45: '🌳', 90: '🏯' };
        return icons[day] || '⭕';
    }

    getMilestoneName(day) {
        const names = {
            7: 'First Week',
            21: 'Foundation',
            45: 'Midpoint',
            90: 'Mastery'
        };
        return names[day] || 'Milestone';
    }

    getMilestoneProgress(day) {
        const completed = this.data.completedDays.filter(d => d <= day).length;
        return Math.min(100, (completed / day) * 100);
    }

    getAverageSessionLength() {
        if (this.data.meditationSessions.length === 0) return 0;
        const total = this.data.meditationSessions.reduce((sum, session) => sum + session.duration, 0);
        return Math.round(total / this.data.meditationSessions.length / 60); // in minutes
    }

    getLongestStreak() {
        return Math.max(...Object.values(this.streaks), 0);
    }

    getFavoriteTime() {
        // Analyze session times to find most common practice time
        return "Morning"; // Placeholder
    }

    getProgressRate() {
        return Math.round((this.data.completedDays.length / 90) * 100);
    }

    getConsistencyScore() {
        // Calculate based on streak maintenance
        const streakValues = Object.values(this.streaks);
        if (streakValues.length === 0) return 0;
        return Math.round((streakValues.filter(s => s > 0).length / streakValues.length) * 100);
    }

    saveData() {
        localStorage.setItem('zenProgressData', JSON.stringify(this.data));
        localStorage.setItem('zenStreaks', JSON.stringify(this.streaks));
    }

    // Public API methods
    addMeditationSession(session) {
        this.data.meditationSessions.push({
            ...session,
            timestamp: Date.now()
        });
        this.saveData();
    }

    getCurrentDay() {
        return this.data.currentDay;
    }

    getCompletionPercentage() {
        return (this.data.completedDays.length / 90) * 100;
    }

    exportProgress() {
        return {
            data: this.data,
            streaks: this.streaks,
            exportDate: new Date().toISOString()
        };
    }
}

// Add celebration animation styles
const celebrationStyles = `
<style>
@keyframes celebrate-float {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}

.calendar-day {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 0.8em;
    cursor: pointer;
    transition: all 0.3s ease;
}

.calendar-day.has-session {
    background: var(--zen-accent);
    color: white;
}

.calendar-day.today {
    border: 2px solid var(--zen-primary);
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    max-width: 300px;
}

.insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
}

.insight-card {
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
}

.insight-value {
    font-size: 2em;
    font-weight: bold;
    color: var(--zen-primary);
    margin-bottom: 5px;
}

.insight-label {
    font-size: 0.9em;
    color: #666;
}

.recommendation {
    background: rgba(255, 193, 7, 0.1);
    padding: 10px 15px;
    border-radius: 10px;
    margin-bottom: 10px;
    border-left: 3px solid var(--zen-accent);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', celebrationStyles);

// Initialize progress tracker
document.addEventListener('DOMContentLoaded', () => {
    window.progressTracker = new ProgressTracker();
});

export default ProgressTracker;
