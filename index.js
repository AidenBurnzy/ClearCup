class CaffeineTracker {
    constructor() {
        this.streak = 0;
        this.totalDays = 0;
        this.successfulDays = 0;
        this.longestStreak = 0;
        this.achievements = [];
        this.lastUpdateDate = null;
        
        this.tips = [
            "Remember: Each day without caffeine is an investment in your natural energy and better sleep!",
            "Your body's natural energy is more sustainable than any caffeine boost.",
            "Better sleep is one of the first benefits you'll notice without caffeine.",
            "You're breaking free from the caffeine dependency cycle - that's powerful!",
            "Natural energy feels so much better than artificial highs and crashes.",
            "Think of how much money you're saving by not buying coffee every day!",
            "Your anxiety levels may decrease as you reduce caffeine intake.",
            "You're developing incredible self-discipline that applies to all areas of life.",
            "Every craving you resist makes you stronger for the next one.",
            "Your taste buds will appreciate flavors more without the bitter caffeine masking them."
        ];

        this.achievementConfig = [
            { id: 'first-day', days: 1, title: 'First Step' },
            { id: 'three-days', days: 3, title: 'Building Momentum' },
            { id: 'one-week', days: 7, title: 'Week Warrior' },
            { id: 'two-weeks', days: 14, title: 'Fortnight Fighter' },
            { id: 'one-month', days: 30, title: 'Monthly Master' },
            { id: 'three-months', days: 90, title: 'Quarterly Champion' }
        ];

        this.init();
    }

    init() {
        this.loadData();
        this.bindEvents();
        this.updateDisplay();
        this.updateDailyTip();
        this.checkAchievements();
    }

    bindEvents() {
        document.getElementById('successBtn').addEventListener('click', () => this.markSuccess());
        document.getElementById('slipBtn').addEventListener('click', () => this.markSlip());
        document.getElementById('statsBtn').addEventListener('click', () => this.showStats());
        document.getElementById('resetBtn').addEventListener('click', () => this.confirmReset());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('statsModal').addEventListener('click', (e) => {
            if (e.target.id === 'statsModal') this.closeModal();
        });

        // Alternative cards interaction
        document.querySelectorAll('.alternative-card').forEach(card => {
            card.addEventListener('click', () => this.selectAlternative(card));
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.markSuccess();
            } else if (e.key === 'r' || e.key === 'R') {
                this.markSlip();
            } else if (e.key === 's' || e.key === 'S') {
                this.showStats();
            }
        });
    }

    loadData() {
        const saved = localStorage.getItem('caffeineTrackerData');
        if (saved) {
            const data = JSON.parse(saved);
            this.streak = data.streak || 0;
            this.totalDays = data.totalDays || 0;
            this.successfulDays = data.successfulDays || 0;
            this.longestStreak = data.longestStreak || 0;
            this.achievements = data.achievements || [];
            this.lastUpdateDate = data.lastUpdateDate || null;
        }
    }

    saveData() {
        const data = {
            streak: this.streak,
            totalDays: this.totalDays,
            successfulDays: this.successfulDays,
            longestStreak: this.longestStreak,
            achievements: this.achievements,
            lastUpdateDate: this.lastUpdateDate
        };
        localStorage.setItem('caffeineTrackerData', JSON.stringify(data));
    }

    markSuccess() {
        const today = new Date().toDateString();
        
        if (this.lastUpdateDate === today) {
            this.showMessage("You've already logged today! Come back tomorrow.", 'info');
            return;
        }

        this.streak++;
        this.totalDays++;
        this.successfulDays++;
        this.lastUpdateDate = today;

        if (this.streak > this.longestStreak) {
            this.longestStreak = this.streak;
        }

        this.saveData();
        this.updateDisplay();
        this.checkAchievements();
        this.celebrateSuccess();
        
        this.showMessage(`Great job! ${this.streak} days caffeine-free!`, 'success');
    }

    markSlip() {
        const today = new Date().toDateString();
        
        if (this.lastUpdateDate === today) {
            this.showMessage("You've already logged today! Tomorrow is a new day.", 'info');
            return;
        }

        this.streak = 0;
        this.totalDays++;
        this.lastUpdateDate = today;

        this.saveData();
        this.updateDisplay();
        
        this.showMessage("Don't worry! Every slip is a learning opportunity. Start fresh tomorrow!", 'warning');
    }

    updateDisplay() {
        document.getElementById('streakCounter').textContent = this.streak;
        
        // Update progress bar (30 days = 100%)
        const progressPercent = Math.min((this.streak / 30) * 100, 100);
        document.getElementById('progressFill').style.width = `${progressPercent}%`;
        
        // Update progress text
        let progressText = '';
        if (this.streak === 0) {
            progressText = "Ready to start your caffeine-free journey?";
        } else if (this.streak < 7) {
            progressText = `${7 - this.streak} days until your first week milestone!`;
        } else if (this.streak < 30) {
            progressText = `${30 - this.streak} days until your first month milestone!`;
        } else {
            progressText = "You're on fire! Keep up the amazing work!";
        }
        document.getElementById('progressText').textContent = progressText;
    }

    checkAchievements() {
        this.achievementConfig.forEach(config => {
            if (this.streak >= config.days && !this.achievements.includes(config.id)) {
                this.unlockAchievement(config.id);
                this.achievements.push(config.id);
            }
        });

        // Update achievement display
        document.querySelectorAll('.achievement').forEach(achievement => {
            const achievementId = achievement.dataset.achievement;
            if (this.achievements.includes(achievementId)) {
                achievement.classList.remove('locked');
                achievement.classList.add('unlocked');
            }
        });

        this.saveData();
    }

    unlockAchievement(achievementId) {
        const config = this.achievementConfig.find(a => a.id === achievementId);
        if (config) {
            setTimeout(() => {
                this.showMessage(`🏆 Achievement Unlocked: ${config.title}!`, 'achievement');
                this.addCelebrationEffect();
            }, 1000);
        }
    }

    selectAlternative(card) {
        // Remove previous selection
        document.querySelectorAll('.alternative-card').forEach(c => c.classList.remove('selected'));
        
        // Add selection to clicked card
        card.classList.add('selected');
        card.classList.add('pulse');
        
        // Remove pulse after animation
        setTimeout(() => {
            card.classList.remove('pulse');
        }, 2000);

        const alternative = card.dataset.alternative;
        this.showMessage(`Great choice! ${card.querySelector('h3').textContent} is an excellent caffeine alternative.`, 'success');
    }

    updateDailyTip() {
        const today = new Date().getDate();
        const tipIndex = today % this.tips.length;
        document.getElementById('dailyTip').textContent = this.tips[tipIndex];
    }

    showStats() {
        const modal = document.getElementById('statsModal');
        
        document.getElementById('totalDays').textContent = this.totalDays;
        document.getElementById('successRate').textContent = this.totalDays > 0 ? 
            Math.round((this.successfulDays / this.totalDays) * 100) + '%' : '0%';
        document.getElementById('longestStreak').textContent = this.longestStreak;
        document.getElementById('achievementsCount').textContent = this.achievements.length;
        
        modal.style.display = 'block';
        modal.querySelector('.modal-content').classList.add('fade-in');
    }

    closeModal() {
        document.getElementById('statsModal').style.display = 'none';
    }

    confirmReset() {
        if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
            this.resetData();
        }
    }

    resetData() {
        this.streak = 0;
        this.totalDays = 0;
        this.successfulDays = 0;
        this.longestStreak = 0;
        this.achievements = [];
        this.lastUpdateDate = null;
        
        localStorage.removeItem('caffeineTrackerData');
        
        // Reset UI
        document.querySelectorAll('.achievement').forEach(achievement => {
            achievement.classList.remove('unlocked');
            achievement.classList.add('locked');
        });
        
        document.querySelectorAll('.alternative-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        this.updateDisplay();
        this.showMessage('Your progress has been reset. Ready for a fresh start!', 'info');
    }

    celebrateSuccess() {
        // Add bounce animation to streak counter
        const counter = document.getElementById('streakCounter');
        counter.classList.add('bounce');
        setTimeout(() => counter.classList.remove('bounce'), 600);

        // Add celebration effect for milestones
        if (this.streak % 7 === 0) {
            this.addCelebrationEffect();
        }
    }

    addCelebrationEffect() {
        // Create floating emojis
        const emojis = ['🎉', '⭐', '🏆', '💪', '🌟'];
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.createFloatingEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
            }, i * 100);
        }
    }

    createFloatingEmoji(emoji) {
        const element = document.createElement('div');
        element.textContent = emoji;
        element.style.cssText = `
            position: fixed;
            font-size: 2rem;
            pointer-events: none;
            z-index: 1000;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight}px;
            animation: floatUp 3s ease-out forwards;
        `;
        
        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                to {
                    transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(element);
        
        // Remove element after animation
        setTimeout(() => {
            document.body.removeChild(element);
            document.head.removeChild(style);
        }, 3000);
    }

    showMessage(message, type = 'info') {
        // Remove existing message if any
        const existingMessage = document.querySelector('.notification-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageEl = document.createElement('div');
        messageEl.className = `notification-message notification-${type}`;
        messageEl.textContent = message;
        
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 1001;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;

        // Set background color based on type
        const colors = {
            success: 'linear-gradient(135deg, #4CAF50, #45a049)',
            warning: 'linear-gradient(135deg, #ff9800, #f57c00)',
            info: 'linear-gradient(135deg, #2196F3, #1976D2)',
            achievement: 'linear-gradient(135deg, #9C27B0, #7B1FA2)'
        };
        
        messageEl.style.background = colors[type] || colors.info;
        
        // Add slide animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(messageEl);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => {
                    if (messageEl.parentNode) {
                        messageEl.remove();
                    }
                    if (style.parentNode) {
                        style.remove();
                    }
                }, 300);
            }
        }, 4000);
        
        // Add slideOut animation
        style.textContent += `
            @keyframes slideOutRight {
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CaffeineTracker();
});