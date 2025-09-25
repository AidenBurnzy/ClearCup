// Enhanced ClearCup with SimplyStrips Animations
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
            { id: 'five-days', days: 5, title: 'High Five' },
            { id: 'one-week', days: 7, title: 'Week Warrior' },
            { id: 'ten-days', days: 10, title: 'Double Digits' },
            { id: 'two-weeks', days: 14, title: 'Fortnight Fighter' },
            { id: 'twenty-days', days: 20, title: 'Twenty Triumph' },
            { id: 'one-month', days: 30, title: 'Monthly Master' },
            { id: 'fifty-days', days: 50, title: 'Fifty Force' },
            { id: 'three-months', days: 90, title: 'Quarterly Champion' },
            { id: 'six-months', days: 180, title: 'Half-Year Hero' },
            { id: 'one-year', days: 365, title: 'Year Legend' }
        ];

        this.init();
    }

    init() {
        this.loadData();
        this.bindEvents();
        this.updateDisplay();
        this.updateDailyTip();
        this.checkAchievements();
        
        // Initialize animations after a short delay
        setTimeout(() => {
            this.initializeAnimations();
        }, 500);
    }

    initializeAnimations() {
        this.createColorWaves();
        this.initializeParticleEffects();
        this.initializeSectionAnimations();
        this.initializeAdvancedScrollEffects();
    }

    // SimplyStrips Animation Methods
    createColorWaves() {
        const waves = document.querySelector('.color-waves');
        if (waves) {
            for (let i = 0; i < 5; i++) {
                const wave = document.createElement('div');
                wave.className = `wave wave-${i + 1}`;
                waves.appendChild(wave);
            }
        }
    }

    initializeParticleEffects() {
        // Create floating particles
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 15; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const colors = ['#ff6b9d', '#c2185b', '#ff8e53', '#ffb74d', '#4CAF50'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s infinite linear;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                this.createParticle(container);
            }
        }, (Math.random() * 10 + 10) * 1000);
    }

    initializeSectionAnimations() {
        // Animate sections as they come into view
        const sections = document.querySelectorAll('section, .header');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    this.animateSectionContent(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        sections.forEach(section => {
            section.style.opacity = '0.9';
            section.style.transform = 'translateY(20px)';
            sectionObserver.observe(section);
        });
    }

    animateSectionContent(section) {
        section.style.transition = 'all 0.8s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        
        // Animate child elements
        const elements = section.querySelectorAll('h2, h3, p, .btn, .alternative-card, .achievement');
        elements.forEach((el, index) => {
            el.style.opacity = '0.8';
            el.style.transform = 'translateY(15px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 80);
        });
    }

    initializeAdvancedScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            
            // Parallax for floating particles
            const particleContainer = document.querySelector('.particle-container');
            if (particleContainer) {
                particleContainer.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
            
            // Update wave positions with scroll
            const waves = document.querySelectorAll('.wave');
            waves.forEach((wave, index) => {
                const speed = (index + 1) * 0.05;
                const currentTransform = wave.style.transform || '';
                wave.style.transform = currentTransform + ` translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    // Original ClearCup Methods
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
        
        this.showMessage(`Amazing! ${this.streak} days caffeine-free! 🌟`, 'success');
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
        
        this.showMessage("Don't worry! Every slip is a learning opportunity. Start fresh tomorrow! 💪", 'warning');
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
        this.showMessage(`Great choice! ${card.querySelector('h3').textContent} is an excellent caffeine alternative. ✨`, 'success');
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
        this.showMessage('Your progress has been reset. Ready for a fresh start! 🚀', 'info');
    }

    celebrateSuccess() {
        // Add bounce animation to streak counter
        const counter = document.getElementById('streakCounter');
        counter.classList.add('bounce');
        setTimeout(() => counter.classList.remove('bounce'), 600);

        // Add celebration effect for milestones
        if (this.streak % 7 === 0 || this.streak === 1 || this.streak === 3 || this.streak === 5) {
            this.addCelebrationEffect();
        }

        // Create success particles
        this.createSuccessParticles();
    }

    createSuccessParticles() {
        const colors = ['#4CAF50', '#45a049', '#66bb6a', '#81c784'];
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createFloatingEmoji('⭐', colors[Math.floor(Math.random() * colors.length)]);
            }, i * 100);
        }
    }

    addCelebrationEffect() {
        // Create floating emojis
        const emojis = ['🎉', '⭐', '🏆', '💪', '🌟', '✨', '🎊', '🌈'];
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                this.createFloatingEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
            }, i * 100);
        }
    }

    createFloatingEmoji(emoji, color = null) {
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
            text-shadow: 0 0 10px ${color || 'rgba(255,255,255,0.8)'};
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
            if (document.body.contains(element)) {
                document.body.removeChild(element);
            }
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
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
            border-radius: 15px;
            color: white;
            font-weight: 600;
            z-index: 1001;
            max-width: 320px;
            animation: slideInRight 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        `;

        // Set background color based on type
        const colors = {
            success: 'linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(69, 160, 73, 0.9))',
            warning: 'linear-gradient(135deg, rgba(255, 152, 0, 0.9), rgba(245, 124, 0, 0.9))',
            info: 'linear-gradient(135deg, rgba(255, 107, 157, 0.9), rgba(194, 24, 91, 0.9))',
            achievement: 'linear-gradient(135deg, rgba(156, 39, 176, 0.9), rgba(123, 31, 162, 0.9))'
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

// Initialize the enhanced app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main application
    new CaffeineTracker();
    
    // Add some entrance animations for initial load
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 1s ease';
    }, 100);
});