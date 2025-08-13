---
title: 'Practice Dashboard'
description: 'Track your daily practice progress and insights'
tags:
    - meta:dashboard
    - theme:tracking
    - skill:progress
---

# 🌅 Practice Dashboard

<div class="zen-banner">
    <div class="sunset-gradient">
        <h1>🧘‍♀️ Your Zen Journey</h1>
        <p>Inner peace, one breath at a time</p>
    </div>
</div>

<div class="dashboard-container">
    
    ??? info "🎯 Current Status"
        
        <div class="status-grid">
            <div class="status-card current-day">
                <h3>📅 Today</h3>
                <div class="day-number">Day 1</div>
                <div class="phase-label">🌱 Phase 1: Foundation</div>
                <a href="../days/day01/" class="practice-button">Start Today's Practice</a>
            </div>
            
            <div class="status-card streak">
                <h3>🔥 Practice Streak</h3>
                <div class="streak-number">0</div>
                <div class="streak-label">consecutive days</div>
            </div>
            
            <div class="status-card completion">
                <h3>📈 Progress</h3>
                <div class="completion-circle">
                    <svg class="progress-ring" width="80" height="80">
                        <circle cx="40" cy="40" r="32" stroke="#e0e0e0" stroke-width="6" fill="transparent"/>
                        <circle cx="40" cy="40" r="32" stroke="var(--md-accent-fg-color)" stroke-width="6" 
                                fill="transparent" stroke-dasharray="201" stroke-dashoffset="201"/>
                    </svg>
                    <div class="progress-text">0%</div>
                </div>
            </div>
            
            <div class="status-card next-milestone">
                <h3>⭐ Next Milestone</h3>
                <div class="milestone-name">Week 1 Complete</div>
                <div class="milestone-days">in 7 days</div>
            </div>
        </div>

    ??? example "📈 Weekly Overview"

    ??? example "📈 Weekly Overview"

        <div class="weekly-progress">
            <h3>This Week (Days 1-7): Foundation Phase 🌱</h3>
            <div class="week-grid">
                <div class="day-box future" data-day="1">
                    <div class="day-label">Mon</div>
                    <div class="day-number">1</div>
                    <div class="day-status">🔲</div>
                    <div class="practice-focus">Foundation</div>
                </div>
                <div class="day-box future" data-day="2">
                    <div class="day-label">Tue</div>
                    <div class="day-number">2</div>
                    <div class="day-status">🔲</div>
                    <div class="practice-focus">Posture</div>
                </div>
                <div class="day-box future" data-day="3">
                    <div class="day-label">Wed</div>
                    <div class="day-number">3</div>
                    <div class="day-status">🔲</div>
                    <div class="practice-focus">Breath</div>
                </div>
                <div class="day-box future" data-day="4">
                    <div class="day-label">Thu</div>
                    <div class="day-number">4</div>
                    <div class="day-status">🔲</div>
                    <div class="practice-focus">Mindfulness</div>
                </div>
                <div class="day-box future" data-day="5">
                    <div class="day-label">Fri</div>
                    <div class="day-number">5</div>
                    <div class="day-status">🔲</div>
                    <div class="practice-focus">Patience</div>
                </div>
                <div class="day-box future" data-day="6">
                    <div class="day-label">Sat</div>
                    <div class="day-number">6</div>
                    <div class="day-status">🔲</div>
                    <div class="practice-focus">Consistency</div>
                </div>
                <div class="day-box future" data-day="7">
                    <div class="day-label">Sun</div>
                    <div class="day-number">7</div>
                    <div class="day-status">🔲</div>
                    <div class="practice-focus">Integration</div>
                </div>
            </div>
        </div>

    ??? success "🏆 Achievement Badges"

    <div class="badges-grid">
        <div class="badge locked">
            <div class="badge-icon">🌱</div>
            <div class="badge-name">First Sit</div>
            <div class="badge-desc">Complete Day 1</div>
        </div>
        <div class="badge locked">
            <div class="badge-icon">🔥</div>
            <div class="badge-name">Three Day Streak</div>
            <div class="badge-desc">Practice 3 days in a row</div>
        </div>
        <div class="badge locked">
            <div class="badge-icon">📅</div>
            <div class="badge-name">Week Warrior</div>
            <div class="badge-desc">Complete first week</div>
        </div>
        <div class="badge locked">
            <div class="badge-icon">🎯</div>
            <div class="badge-name">Foundation Solid</div>
            <div class="badge-desc">Complete Phase 1</div>
        </div>
        <div class="badge locked">
            <div class="badge-icon">⚖️</div>
            <div class="badge-name">Finding Balance</div>
            <div class="badge-desc">Complete Phase 2</div>
        </div>
        <div class="badge locked">
            <div class="badge-icon">🌊</div>
            <div class="badge-name">Going Deeper</div>
            <div class="badge-desc">Complete Phase 3</div>
        </div>
        <div class="badge locked">
            <div class="badge-icon">🔗</div>
            <div class="badge-name">Life Integration</div>
            <div class="badge-desc">Complete Phase 4</div>
        </div>
        <div class="badge locked">
            <div class="badge-icon">✨</div>
            <div class="badge-name">Zen Master</div>
            <div class="badge-desc">Complete all 90 days</div>
        </div>
    </div>

    ## 📝 Quick Practice Log

    <div class="practice-log">
        <div class="log-header">
            <h3>Today's Practice Entry</h3>
            <button class="log-save-btn">Save Entry</button>
        </div>

        <form class="practice-form">
            <div class="form-row">
                <label>Duration (minutes):</label>
                <input type="number" min="1" max="120" placeholder="10">
            </div>

            <div class="form-row">
                <label>Mood Before:</label>
                <div class="mood-buttons">
                    <button type="button" data-mood="😴">😴</button>
                    <button type="button" data-mood="😔">😔</button>
                    <button type="button" data-mood="😐">😐</button>
                    <button type="button" data-mood="😊">😊</button>
                    <button type="button" data-mood="😤">😤</button>
                </div>
            </div>

            <div class="form-row">
                <label>Mood After:</label>
                <div class="mood-buttons">
                    <button type="button" data-mood="😴">😴</button>
                    <button type="button" data-mood="😔">😔</button>
                    <button type="button" data-mood="😐">😐</button>
                    <button type="button" data-mood="😊">😊</button>
                    <button type="button" data-mood="😤">😤</button>
                </div>
            </div>

            <div class="form-row">
                <label>Practice Rating:</label>
                <div class="star-rating">
                    <span data-rating="1">⭐</span>
                    <span data-rating="2">⭐</span>
                    <span data-rating="3">⭐</span>
                    <span data-rating="4">⭐</span>
                    <span data-rating="5">⭐</span>
                </div>
            </div>

            <div class="form-row">
                <label>Notes:</label>
                <textarea placeholder="How did your practice feel today? Any insights or challenges?"></textarea>
            </div>
        </form>
    </div>

    ## 🎨 Inspiration Corner

    <div class="inspiration-box">
        <blockquote>
            "The present moment is the only time over which we have dominion."
        </blockquote>
        <cite>— Thích Nhất Hạnh</cite>
    </div>

</div>

---

!!! tip "Dashboard Tips"

    - **Check in daily** to track your progress and log practice
    - **Celebrate small wins** - every practice session matters
    - **Use the calendar view** for a broader perspective of your journey
    - **Review badges** to see upcoming milestones and stay motivated
    - **Be honest in your logs** - they help you understand patterns
