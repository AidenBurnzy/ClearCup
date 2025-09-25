// Enhanced ClearCup with Custom Goal Tracking
class CaffeineGoalTracker {
    constructor() {
        // Goal settings
        this.goalType = 'quit'; // 'quit' or 'reduction'
        this.dailyLimit = 0; // mg per day
        
        // Tracking data
        this.streak = 0;
        this.totalDays = 0;
        this.goalSuccessDays = 0; // Days where goal was met
        this.zeroCaffeineDays = 0; // Days with 0mg caffeine
        this.longestStreak = 0;
        this.achievements = [];
        this.lastUpdateDate = null;
        
        // Daily caffeine tracking
        this.todayCaffeine = 0;
        this.todayCaffeineItems = [];
        this.lastCaffeineDate = null;
        this.totalCaffeineConsumed = 0;
        
        // Tips for motivation
        this.tips = [
            "Every small step towards your goal is progress worth celebrating!",
            "Consistency is more powerful than perfection - keep going!",
            "Your body will thank you for making healthier choices.",
            "Building better habits takes time, but you're doing amazing!",
            "Focus on progress, not perfection. You've got this!",
            "Each day within your goal is a victory!",
            "Your energy levels will improve as you reach your goals consistently.",
            "Remember why you started this journey - you're worth it!",
            "Small changes lead to big transformations over time.",
            "Celebrate every achievement, no matter how small!"
        ];

        // Achievement configurations
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
        this.updateGoalDisplay();
        this.updateDailyTip();
        this.checkAchievements();
        this.updateCaffeineDisplay();
        
        // Initialize animations
        setTimeout(() => {
            this.initializeAnimations();
        }, 500);
    }

    // Animation methods (same as before)
    initializeAnimations() {
        this.createColorWaves();
        this.initializeParticleEffects();
        this.initializeSectionAnimations();
    }

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
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: -1;
        `;
        document.body.appendChild(particleContainer);
        
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
            position: absolute; width: ${size}px; height: ${size}px;
            background: ${color}; border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s infinite linear;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                this.createParticle(container);
            }
        }, (Math.random() * 10 + 10) * 1000);
    }

    initializeSectionAnimations() {
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

    // Data management
    loadData() {
        const saved = localStorage.getItem('caffeineGoalTrackerData');
        if (saved) {
            const data = JSON.parse(saved);
            this.goalType = data.goalType || 'quit';
            this.dailyLimit = data.dailyLimit || 0;
            this.streak = data.streak || 0;
            this.totalDays = data.totalDays || 0;
            this.goalSuccessDays = data.goalSuccessDays || 0;
            this.zeroCaffeineDays = data.zeroCaffeineDays || 0;
            this.longestStreak = data.longestStreak || 0;
            this.achievements = data.achievements || [];
            this.lastUpdateDate = data.lastUpdateDate || null;
            this.todayCaffeine = data.todayCaffeine || 0;
            this.todayCaffeineItems = data.todayCaffeineItems || [];
            this.lastCaffeineDate = data.lastCaffeineDate || null;
            this.totalCaffeineConsumed = data.totalCaffeineConsumed || 0;
            
            // Reset daily caffeine if new day
            const today = new Date().toDateString();
            if (this.lastCaffeineDate !== today) {
                this.todayCaffeine = 0;
                this.todayCaffeineItems = [];
            }
        }
    }

    saveData() {
        const data = {
            goalType: this.goalType,
            dailyLimit: this.dailyLimit,
            streak: this.streak,
            totalDays: this.totalDays,
            goalSuccessDays: this.goalSuccessDays,
            zeroCaffeineDays: this.zeroCaffeineDays,
            longestStreak: this.longestStreak,
            achievements: this.achievements,
            lastUpdateDate: this.lastUpdateDate,
            todayCaffeine: this.todayCaffeine,
            todayCaffeineItems: this.todayCaffeineItems,
            lastCaffeineDate: this.lastCaffeineDate,
            totalCaffeineConsumed: this.totalCaffeineConsumed
        };
        localStorage.setItem('caffeineGoalTrackerData', JSON.stringify(data));
    }

    // Event binding
    bindEvents() {
        // Main action buttons
        document.getElementById('successBtn').addEventListener('click', () => this.markGoalSuccess());
        document.getElementById('slipBtn').addEventListener('click', () => this.showCaffeineModal());
        
        // Goal settings
        document.getElementById('goalSettingsBtn').addEventListener('click', () => this.showGoalModal());
        document.getElementById('closeGoalModal').addEventListener('click', () => this.closeGoalModal());
        document.getElementById('saveGoal').addEventListener('click', () => this.saveGoalSettings());
        document.getElementById('cancelGoal').addEventListener('click', () => this.closeGoalModal());
        
        // Goal option changes
        document.querySelectorAll('input[name="goalType"]').forEach(radio => {
            radio.addEventListener('change', () => this.updateGoalPreview());
        });
        document.getElementById('dailyLimit').addEventListener('input', () => this.updateGoalPreview());
        
        // Preset goal buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const limit = parseInt(e.target.dataset.limit);
                document.getElementById('dailyLimit').value = limit;
                this.updateGoalPreview();
            });
        });

        // Statistics and reset
        document.getElementById('statsBtn').addEventListener('click', () => this.showStats());
        document.getElementById('resetBtn').addEventListener('click', () => this.confirmReset());
        document.getElementById('closeStatsModal').addEventListener('click', () => this.closeStatsModal());
        
        // Modal click outside to close
        document.getElementById('goalModal').addEventListener('click', (e) => {
            if (e.target.id === 'goalModal') this.closeGoalModal();
        });
        document.getElementById('statsModal').addEventListener('click', (e) => {
            if (e.target.id === 'statsModal') this.closeStatsModal();
        });

        // Caffeine modal events
        document.getElementById('closeCaffeineModal').addEventListener('click', () => this.closeCaffeineModal());
        document.getElementById('cancelCaffeine').addEventListener('click', () => this.closeCaffeineModal());
        document.getElementById('caffeineModal').addEventListener('click', (e) => {
            if (e.target.id === 'caffeineModal') this.closeCaffeineModal();
        });

        // Custom caffeine entry
        document.getElementById('customEntry').addEventListener('click', () => this.showCustomForm());
        document.getElementById('addCustom').addEventListener('click', () => this.addCustomCaffeine());
        document.getElementById('cancelCustom').addEventListener('click', () => this.hideCustomForm());

        // Caffeine product selection
        document.querySelectorAll('.caffeine-product:not(.custom-entry)').forEach(product => {
            product.addEventListener('click', () => this.selectCaffeineProduct(product));
        });

        // Alternative cards interaction
        document.querySelectorAll('.alternative-card').forEach(card => {
            card.addEventListener('click', () => this.selectAlternative(card));
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (!this.isModalOpen()) this.markGoalSuccess();
            } else if (e.key === 'Escape') {
                this.closeGoalModal();
                this.closeStatsModal();
                this.closeCaffeineModal();
            }
        });
    }

    isModalOpen() {
        return document.getElementById('goalModal').style.display === 'block' ||
               document.getElementById('statsModal').style.display === 'block' ||
               document.getElementById('caffeineModal').style.display === 'block';
    }

    // Goal management
    showGoalModal() {
        const modal = document.getElementById('goalModal');
        
        // Set current values
        document.querySelector(`input[value="${this.goalType}"]`).checked = true;
        document.getElementById('dailyLimit').value = this.dailyLimit;
        
        // Show/hide inputs based on goal type
        this.toggleReductionInputs();
        this.updateGoalPreview();
        
        modal.style.display = 'block';
        modal.querySelector('.modal-content').classList.add('fade-in');
    }

    closeGoalModal() {
        document.getElementById('goalModal').style.display = 'none';
    }

    toggleReductionInputs() {
        const reductionInputs = document.getElementById('reductionInputs');
        const isReduction = document.getElementById('reduction').checked;
        reductionInputs.style.display = isReduction ? 'block' : 'none';
    }

    updateGoalPreview() {
        const goalType = document.querySelector('input[name="goalType"]:checked').value;
        const dailyLimit = parseInt(document.getElementById('dailyLimit').value) || 0;
        const previewText = document.getElementById('goalPreviewText');
        
        this.toggleReductionInputs();
        
        if (goalType === 'quit') {
            previewText.textContent = 'Track days with 0mg caffeine (Complete Quit)';
        } else {
            previewText.textContent = `Stay under ${dailyLimit}mg of caffeine per day (Reduction)`;
        }
    }

    saveGoalSettings() {
        const newGoalType = document.querySelector('input[name="goalType"]:checked').value;
        const newDailyLimit = newGoalType === 'quit' ? 0 : (parseInt(document.getElementById('dailyLimit').value) || 100);
        
        // Check if goal changed significantly
        const goalChanged = (this.goalType !== newGoalType) || 
                           (newGoalType === 'reduction' && this.dailyLimit !== newDailyLimit);
        
        this.goalType = newGoalType;
        this.dailyLimit = newDailyLimit;
        
        if (goalChanged) {
            this.showMessage('Goal updated! Your progress continues with the new target. 🎯', 'success');
        }
        
        this.saveData();
        this.updateDisplay();
        this.updateGoalDisplay();
        this.updateCaffeineDisplay();
        this.closeGoalModal();
    }

    updateGoalDisplay() {
        const goalTypeEl = document.getElementById('goalType');
        const goalDetailsEl = document.getElementById('goalDetails');
        const streakLabelEl = document.getElementById('streakLabel');
        const successBtnTextEl = document.getElementById('successBtnText');
        
        if (this.goalType === 'quit') {
            goalTypeEl.textContent = 'Complete Quit';
            goalDetailsEl.textContent = '0mg daily limit';
            streakLabelEl.textContent = 'days caffeine-free';
            successBtnTextEl.textContent = 'I stayed caffeine-free today!';
        } else {
            goalTypeEl.textContent = 'Caffeine Reduction';
            goalDetailsEl.textContent = `${this.dailyLimit}mg daily limit`;
            streakLabelEl.textContent = 'days on track';
            successBtnTextEl.textContent = 'I stayed within my goal today!';
        }
    }

    // Main tracking logic
    markGoalSuccess() {
        const today = new Date().toDateString();
        
        if (this.lastUpdateDate === today) {
            this.showMessage("You've already logged today! Come back tomorrow. ⏰", 'info');
            return;
        }

        // Check if today's caffeine intake meets the goal
        if (!this.isWithinGoal()) {
            this.showMessage(`You've already had ${this.todayCaffeine}mg today, which exceeds your ${this.dailyLimit}mg goal. Try again tomorrow! 💪`, 'warning');
            return;
        }

        this.streak++;
        this.totalDays++;
        this.goalSuccessDays++;
        
        // Track zero caffeine days separately
        if (this.todayCaffeine === 0) {
            this.zeroCaffeineDays++;
        }
        
        this.lastUpdateDate = today;
        
        // Reset daily tracking for tomorrow
        this.todayCaffeine = 0;
        this.todayCaffeineItems = [];
        this.lastCaffeineDate = today;

        if (this.streak > this.longestStreak) {
            this.longestStreak = this.streak;
        }

        this.saveData();
        this.updateDisplay();
        this.updateCaffeineDisplay();
        this.checkAchievements();
        this.celebrateSuccess();
        
        const message = this.goalType === 'quit' 
            ? `Amazing! ${this.streak} days caffeine-free! 🌟`
            : `Great job! ${this.streak} days staying within your ${this.dailyLimit}mg goal! 🎯`;
        
        this.showMessage(message, 'success');
    }

    isWithinGoal() {
        if (this.goalType === 'quit') {
            return this.todayCaffeine === 0;
        } else {
            return this.todayCaffeine <= this.dailyLimit;
        }
    }

    // Caffeine tracking
    showCaffeineModal() {
        const modal = document.getElementById('caffeineModal');
        modal.style.display = 'block';
        modal.querySelector('.modal-content').classList.add('fade-in');
    }

    closeCaffeineModal() {
        document.getElementById('caffeineModal').style.display = 'none';
        this.hideCustomForm();
        document.querySelectorAll('.caffeine-product').forEach(product => {
            product.classList.remove('selected');
        });
    }

    selectCaffeineProduct(product) {
        const caffeine = parseInt(product.dataset.caffeine);
        const name = product.dataset.name;
        
        this.addCaffeine(caffeine, name);
        this.closeCaffeineModal();
    }

    showCustomForm() {
        document.getElementById('customForm').style.display = 'block';
        document.getElementById('customName').focus();
    }

    hideCustomForm() {
        document.getElementById('customForm').style.display = 'none';
        document.getElementById('customName').value = '';
        document.getElementById('customCaffeine').value = '';
    }

    addCustomCaffeine() {
        const name = document.getElementById('customName').value.trim();
        const caffeine = parseInt(document.getElementById('customCaffeine').value);
        
        if (!name) {
            this.showMessage('Please enter a product name', 'warning');
            return;
        }
        
        if (!caffeine || caffeine < 0 || caffeine > 1000) {
            this.showMessage('Please enter a valid caffeine amount (0-1000mg)', 'warning');
            return;
        }
        
        this.addCaffeine(caffeine, name);
        this.closeCaffeineModal();
    }

    addCaffeine(amount, name) {
        const today = new Date().toDateString();
        
        // Add to today's totals
        this.todayCaffeine += amount;
        this.todayCaffeineItems.push({ name, amount });
        this.lastCaffeineDate = today;
        this.totalCaffeineConsumed += amount;
        
        // Check if this breaks the streak
        if (!this.isWithinGoal()) {
            this.streak = 0;
            this.totalDays++;
            this.lastUpdateDate = today;
            
            const message = this.goalType === 'quit' 
                ? `Added ${amount}mg from ${name}. Don't give up - tomorrow is a fresh start! 💪`
                : `Added ${amount}mg from ${name}. You're now at ${this.todayCaffeine}mg (${this.dailyLimit}mg goal). Tomorrow's a new day! 💪`;
                
            this.showMessage(message, 'warning');
        } else {
            const remaining = this.goalType === 'quit' ? 0 : this.dailyLimit - this.todayCaffeine;
            const message = this.goalType === 'quit' 
                ? `Added ${amount}mg from ${name}. Your streak is reset, but keep going!`
                : `Added ${amount}mg from ${name}. You have ${remaining}mg remaining for your goal today! 👍`;
                
            this.showMessage(message, 'info');
        }
        
        this.saveData();
        this.updateDisplay();
        this.updateCaffeineDisplay();
    }

    removeCaffeineItem(index) {
        const item = this.todayCaffeineItems[index];
        this.todayCaffeine -= item.amount;
        this.totalCaffeineConsumed -= item.amount;
        this.todayCaffeineItems.splice(index, 1);
        
        this.saveData();
        this.updateCaffeineDisplay();
        this.showMessage(`Removed ${item.name}`, 'info');
    }

    updateCaffeineDisplay() {
        const amountEl = document.getElementById('caffeineAmount');
        const levelEl = document.getElementById('caffeineLevel');
        const fillEl = document.getElementById('caffeineFill');
        const itemsEl = document.getElementById('caffeineItems');
        const goalRemainingEl = document.getElementById('goalRemaining');
        
        // Update amount display
        amountEl.textContent = this.todayCaffeine;
        goalRemainingEl.textContent = `/ ${this.dailyLimit}mg goal`;
        
        // Update level description and progress bar
        let level = '';
        let percentage = 0;
        let isOverLimit = false;
        
        if (this.goalType === 'quit') {
            if (this.todayCaffeine === 0) {
                level = 'Perfect! No caffeine consumed';
                percentage = 0;
            } else {
                level = 'Goal exceeded - caffeine consumed';
                percentage = 100;
                isOverLimit = true;
            }
            goalRemainingEl.textContent = '/ 0mg goal (quit)';
        } else {
            if (this.todayCaffeine === 0) {
                level = 'Excellent! No caffeine consumed';
                percentage = 0;
            } else if (this.todayCaffeine <= this.dailyLimit) {
                level = `Within goal limits (${this.dailyLimit - this.todayCaffeine}mg remaining)`;
                percentage = (this.todayCaffeine / this.dailyLimit) * 100;
            } else {
                level = `Over goal limit by ${this.todayCaffeine - this.dailyLimit}mg`;
                percentage = 100;
                isOverLimit = true;
            }
        }
        
        levelEl.textContent = level;
        fillEl.style.width = `${Math.min(percentage, 100)}%`;
        
        // Update colors based on goal status
        if (isOverLimit) {
            fillEl.classList.add('over-limit');
            amountEl.style.background = 'linear-gradient(45deg, #ff4444, #cc0000)';
        } else {
            fillEl.classList.remove('over-limit');
            amountEl.style.background = 'linear-gradient(45deg, #ff1bbbff, #fcc224ff)';
        }
        
        // Apply gradient text
        amountEl.style.backgroundClip = 'text';
        amountEl.style.webkitBackgroundClip = 'text';
        amountEl.style.webkitTextFillColor = 'transparent';
        
        // Update items list
        itemsEl.innerHTML = '';
        this.todayCaffeineItems.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'caffeine-item';
            itemEl.innerHTML = `
                <i class="fas fa-coffee"></i>
                <span>${item.name} (${item.amount}mg)</span>
                <button class="remove-caffeine" onclick="tracker.removeCaffeineItem(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            itemsEl.appendChild(itemEl);
        });
    }

    // Display updates
    updateDisplay() {
        document.getElementById('streakCounter').textContent = this.streak;
        
        // Update progress bar (30 days = 100%)
        const progressPercent = Math.min((this.streak / 30) * 100, 100);
        document.getElementById('progressFill').style.width = `${progressPercent}%`;
        
        // Update progress text based on goal type
        let progressText = '';
        if (this.streak === 0) {
            progressText = this.goalType === 'quit' 
                ? "Ready to start your caffeine-free journey?"
                : "Ready to start achieving your daily goals?";
        } else if (this.streak < 7) {
            progressText = `${7 - this.streak} days until your first week milestone!`;
        } else if (this.streak < 30) {
            progressText = `${30 - this.streak} days until your first month milestone!`;
        } else {
            progressText = "You're on fire! Keep up the amazing work!";
        }
        document.getElementById('progressText').textContent = progressText;
        
        // Update quick stats
        document.getElementById('goalDays').textContent = this.goalSuccessDays;
        document.getElementById('zeroDays').textContent = this.zeroCaffeineDays;
        document.getElementById('avgCaffeine').textContent = this.totalDays > 0 
            ? Math.round(this.totalCaffeineConsumed / this.totalDays) 
            : 0;
        document.getElementById('longestStreak').textContent = this.longestStreak;
    }

    // Statistics
    showStats() {
        const modal = document.getElementById('statsModal');
        
        document.getElementById('totalDays').textContent = this.totalDays;
        document.getElementById('goalSuccessRate').textContent = this.totalDays > 0 ? 
            Math.round((this.goalSuccessDays / this.totalDays) * 100) + '%' : '0%';
        document.getElementById('zeroSuccessRate').textContent = this.totalDays > 0 ? 
            Math.round((this.zeroCaffeineDays / this.totalDays) * 100) + '%' : '0%';
        document.getElementById('totalCaffeineConsumed').textContent = this.totalCaffeineConsumed;
        
        modal.style.display = 'block';
        modal.querySelector('.modal-content').classList.add('fade-in');
    }

    closeStatsModal() {
        document.getElementById('statsModal').style.display = 'none';
    }

    // Achievements
    checkAchievements() {
        this.achievementConfig.forEach(config => {
            if (this.streak >= config.days && !this.achievements.includes(config.id)) {
                this.unlockAchievement(config.id);
                this.achievements.push(config.id);
            }
        });

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

    // User interactions
    selectAlternative(card) {
        document.querySelectorAll('.alternative-card').forEach(c => c.classList.remove('selected'));
        
        card.classList.add('selected');
        card.classList.add('pulse');
        
        setTimeout(() => {
            card.classList.remove('pulse');
        }, 2000);

        const alternative = card.dataset.alternative;
        this.showMessage(`Great choice! ${card.querySelector('h3').textContent} is an excellent alternative. ✨`, 'success');
    }

    updateDailyTip() {
        const today = new Date().getDate();
        const tipIndex = today % this.tips.length;
        document.getElementById('dailyTip').textContent = this.tips[tipIndex];
    }

    // Reset functionality
    confirmReset() {
        if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
            this.resetData();
        }
    }

    resetData() {
        this.goalType = 'quit';
        this.dailyLimit = 0;
        this.streak = 0;
        this.totalDays = 0;
        this.goalSuccessDays = 0;
        this.zeroCaffeineDays = 0;
        this.longestStreak = 0;
        this.achievements = [];
        this.lastUpdateDate = null;
        this.todayCaffeine = 0;
        this.todayCaffeineItems = [];
        this.lastCaffeineDate = null;
        this.totalCaffeineConsumed = 0;
        
        localStorage.removeItem('caffeineGoalTrackerData');
        
        // Reset UI
        document.querySelectorAll('.achievement').forEach(achievement => {
            achievement.classList.remove('unlocked');
            achievement.classList.add('locked');
        });
        
        document.querySelectorAll('.alternative-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        this.updateDisplay();
        this.updateGoalDisplay();
        this.updateCaffeineDisplay();
        this.showMessage('Your progress has been reset. Ready for a fresh start! 🚀', 'info');
    }

    // Success celebrations
    celebrateSuccess() {
        const counter = document.getElementById('streakCounter');
        counter.classList.add('bounce');
        setTimeout(() => counter.classList.remove('bounce'), 600);

        if (this.streak % 7 === 0 || this.streak === 1 || this.streak === 3 || this.streak === 5) {
            this.addCelebrationEffect();
        }

        this.createSuccessParticles();
    }

    createSuccessParticles() {
        const colors = ['#ff3333ff', '#ff1affff', '#ff830eff', '#ff2566ff'];
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createFloatingEmoji('⭐', colors[Math.floor(Math.random() * colors.length)]);
            }, i * 100);
        }
    }

    addCelebrationEffect() {
        const emojis = ['🎉', '⭐', '🏆', '💪', '🌟', '✨', '🎊', '🎯'];
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
            position: fixed; font-size: 2rem; pointer-events: none; z-index: 1000;
            left: ${Math.random() * window.innerWidth}px; top: ${window.innerHeight}px;
            animation: floatUp 3s ease-out forwards;
            text-shadow: 0 0 10px ${color || 'rgba(255,255,255,0.8)'};
        `;
        
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
        
        setTimeout(() => {
            if (document.body.contains(element)) document.body.removeChild(element);
            if (document.head.contains(style)) document.head.removeChild(style);
        }, 3000);
    }

    // Message system
    showMessage(message, type = 'info') {
        const existingMessage = document.querySelector('.notification-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageEl = document.createElement('div');
        messageEl.className = `notification-message notification-${type}`;
        messageEl.textContent = message;
        
        messageEl.style.cssText = `
            position: fixed; top: 20px; right: 20px; padding: 15px 20px;
            border-radius: 15px; color: white; font-weight: 600; z-index: 1001;
            max-width: 320px; animation: slideInRight 0.3s ease;
            backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        `;

        const colors = {
            success: 'linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(69, 160, 73, 0.9))',
            warning: 'linear-gradient(135deg, rgba(255, 152, 0, 0.9), rgba(245, 124, 0, 0.9))',
            info: 'linear-gradient(135deg, rgba(255, 107, 157, 0.9), rgba(194, 24, 91, 0.9))',
            achievement: 'linear-gradient(135deg, rgba(156, 39, 176, 0.9), rgba(123, 31, 162, 0.9))'
        };
        
        messageEl.style.background = colors[type] || colors.info;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => {
                    if (messageEl.parentNode) messageEl.remove();
                    if (style.parentNode) style.remove();
                }, 300);
            }
        }, 4000);
    }
}

// Global tracker instance
let tracker;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    tracker = new CaffeineGoalTracker();
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% { transform: translateY(100vh) rotate(0deg); }
            100% { transform: translateY(-100px) rotate(360deg); }
        }
        .section-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 1s ease';
    }, 100);
});