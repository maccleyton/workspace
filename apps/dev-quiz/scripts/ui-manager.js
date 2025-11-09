/**
 * UI Manager - Handles user interface interactions and visual feedback
 * Manages animations, modals, notifications, and responsive design
 */

class UIManager {
    constructor() {
        this.modals = new Map();
        this.activeAnimations = new Set();
        this.isAnimationsEnabled = true;
        this.theme = 'default';
        this.notificationQueue = [];
        this.isNotificationShowing = false;
        
        // Animation configurations
        this.animations = {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        };
        
        this.init();
    }

    /**
     * Initialize UI Manager
     */
    init() {
        this.setupEventListeners();
        this.loadPreferences();
        this.setupKeyboardNavigation();
        this.setupResponsiveHandling();
        console.log('UI Manager initialized');
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
                this.closeModal(e.target.closest('.modal'));
            }
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.show');
                if (activeModal) {
                    this.closeModal(activeModal);
                }
            }
        });

        // Window resize handling
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Focus management
        document.addEventListener('focusin', (e) => {
            this.handleFocusChange(e.target);
        });

        // Prevent context menu on quiz elements
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.quiz-content')) {
                e.preventDefault();
            }
        });
    }

    /**
     * Load user preferences
     */
    loadPreferences() {
        const settings = window.storageManager?.getUserSettings() || {};
        this.isAnimationsEnabled = settings.animationsEnabled !== false;
        this.theme = settings.theme || 'default';
        
        this.applyTheme(this.theme);
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Number keys for multiple choice options
            if (e.target.closest('.options-container') && e.key >= '1' && e.key <= '5') {
                e.preventDefault();
                const optionIndex = parseInt(e.key) - 1;
                const options = e.target.closest('.options-container').querySelectorAll('.option');
                if (options[optionIndex]) {
                    options[optionIndex].click();
                }
            }

            // Enter key for form submission
            if (e.key === 'Enter' && e.target.matches('input[type="text"]')) {
                e.preventDefault();
                const button = e.target.closest('form, .screen')?.querySelector('.btn-primary');
                if (button) {
                    button.click();
                }
            }

            // Arrow keys for navigation
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const activeElement = document.activeElement;
                if (activeElement.closest('.options-container')) {
                    e.preventDefault();
                    this.navigateOptions(activeElement, e.key);
                }
            }
        });
    }

    /**
     * Setup responsive design handling
     */
    setupResponsiveHandling() {
        this.checkViewportSize();
        
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleResize(), 100);
        });
    }

    /**
     * Check current viewport size
     */
    checkViewportSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.viewportSize = {
            width: width,
            height: height,
            isMobile: width < 768,
            isTablet: width >= 768 && width < 1024,
            isDesktop: width >= 1024,
            isLandscape: width > height,
            isPortrait: height >= width
        };

        this.updateResponsiveClasses();
    }

    /**
     * Update responsive CSS classes
     */
    updateResponsiveClasses() {
        const body = document.body;
        const classes = [];
        
        if (this.viewportSize.isMobile) classes.push('viewport-mobile');
        if (this.viewportSize.isTablet) classes.push('viewport-tablet');
        if (this.viewportSize.isDesktop) classes.push('viewport-desktop');
        if (this.viewportSize.isLandscape) classes.push('viewport-landscape');
        if (this.viewportSize.isPortrait) classes.push('viewport-portrait');

        // Remove existing viewport classes
        body.className = body.className.replace(/viewport-\w+/g, '');
        // Add new viewport classes
        classes.forEach(cls => body.classList.add(cls));
    }

    /**
     * Show modal with animation
     */
    showModal(modalId, options = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`Modal ${modalId} not found`);
            return;
        }

        const { 
            animation = true, 
            backdrop = true, 
            focus = true,
            closeOnBackdrop = true 
        } = options;

        if (backdrop) {
            this.showBackdrop();
        }

        if (animation && this.isAnimationsEnabled) {
            this.animateModalOpen(modal);
        } else {
            modal.classList.add('show');
        }

        this.modals.set(modalId, { options });

        if (focus) {
            setTimeout(() => this.focusFirstElement(modal), 300);
        }

        // Auto close timer (if specified)
        if (options.autoClose) {
            setTimeout(() => {
                if (this.modals.has(modalId)) {
                    this.closeModal(modal);
                }
            }, options.autoClose);
        }

        return modal;
    }

    /**
     * Close modal with animation
     */
    closeModal(modal) {
        if (!modal || !modal.classList.contains('show')) {
            return;
        }

        const modalId = modal.id;

        if (this.isAnimationsEnabled) {
            this.animateModalClose(modal).then(() => {
                modal.classList.remove('show');
                this.hideBackdrop();
            });
        } else {
            modal.classList.remove('show');
            this.hideBackdrop();
        }

        this.modals.delete(modalId);

        // Return focus to trigger element
        const focusManager = this.getFocusManager();
        if (focusManager && focusManager.triggerElement) {
            focusManager.triggerElement.focus();
        }
    }

    /**
     * Animate modal opening
     */
    animateModalOpen(modal) {
        return new Promise((resolve) => {
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9) translateY(20px)';
            modal.classList.add('show');

            requestAnimationFrame(() => {
                modal.style.transition = `all ${this.animations.duration}ms ${this.animations.easing}`;
                modal.style.opacity = '1';
                modal.style.transform = 'scale(1) translateY(0)';

                setTimeout(() => {
                    modal.style.transition = '';
                    resolve();
                }, this.animations.duration);
            });
        });
    }

    /**
     * Animate modal closing
     */
    animateModalClose(modal) {
        return new Promise((resolve) => {
            modal.style.transition = `all ${this.animations.duration}ms ${this.animations.easing}`;
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9) translateY(20px)';

            setTimeout(() => {
                modal.style.transition = '';
                resolve();
            }, this.animations.duration);
        });
    }

    /**
     * Show backdrop
     */
    showBackdrop() {
        let backdrop = document.querySelector('.modal-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop';
            backdrop.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                z-index: 999;
                opacity: 0;
                transition: opacity ${this.animations.duration}ms ease;
            `;
            document.body.appendChild(backdrop);
        }

        if (this.isAnimationsEnabled) {
            requestAnimationFrame(() => {
                backdrop.style.opacity = '1';
            });
        } else {
            backdrop.style.opacity = '1';
        }
    }

    /**
     * Hide backdrop
     */
    hideBackdrop() {
        const backdrop = document.querySelector('.modal-backdrop');
        if (!backdrop) return;

        if (this.isAnimationsEnabled) {
            backdrop.style.opacity = '0';
            setTimeout(() => {
                if (backdrop.parentNode) {
                    backdrop.parentNode.removeChild(backdrop);
                }
            }, this.animations.duration);
        } else {
            if (backdrop.parentNode) {
                backdrop.parentNode.removeChild(backdrop);
            }
        }
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info', options = {}) {
        const notification = this.createNotification(message, type, options);
        
        this.notificationQueue.push(notification);
        this.processNotificationQueue();
    }

    /**
     * Create notification element
     */
    createNotification(message, type, options) {
        const {
            duration = 3000,
            position = 'top-right',
            closable = true,
            icon = null
        } = options;

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            padding: 15px 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 2000;
            max-width: 300px;
            transform: translateX(100%);
            transition: transform ${this.animations.duration}ms ${this.animations.easing};
            border-left: 4px solid ${this.getNotificationColor(type)};
        `;

        // Position
        switch (position) {
            case 'top-left':
                notification.style.top = '20px';
                notification.style.left = '20px';
                notification.style.right = 'auto';
                break;
            case 'top-center':
                notification.style.top = '20px';
                notification.style.left = '50%';
                notification.style.transform = 'translateX(-50%) translateX(100%)';
                break;
            case 'bottom-right':
                notification.style.top = 'auto';
                notification.style.bottom = '20px';
                break;
            case 'bottom-left':
                notification.style.top = 'auto';
                notification.style.left = '20px';
                notification.style.right = 'auto';
                break;
        }

        // Icon
        const iconElement = icon || this.getNotificationIcon(type);
        
        notification.innerHTML = `
            <div class="notification-content" style="display: flex; align-items: center; gap: 10px;">
                <i class="${iconElement}" style="font-size: 1.2rem; color: ${this.getNotificationColor(type)};"></i>
                <span>${message}</span>
                ${closable ? '<button class="notification-close" style="background: none; border: none; margin-left: 10px; cursor: pointer;"><i class="fas fa-times" style="color: #999;"></i></button>' : ''}
            </div>
        `;

        // Close button
        if (closable) {
            notification.querySelector('.notification-close').addEventListener('click', () => {
                this.removeNotification(notification);
            });
        }

        return notification;
    }

    /**
     * Process notification queue
     */
    processNotificationQueue() {
        if (this.isNotificationShowing || this.notificationQueue.length === 0) {
            return;
        }

        const notification = this.notificationQueue.shift();
        this.isNotificationShowing = true;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        if (notification.dataset.duration) {
            setTimeout(() => {
                this.removeNotification(notification);
            }, parseInt(notification.dataset.duration));
        }
    }

    /**
     * Remove notification
     */
    removeNotification(notification) {
        if (!notification || !notification.parentNode) {
            return;
        }

        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.isNotificationShowing = false;
            this.processNotificationQueue();
        }, this.animations.duration);
    }

    /**
     * Show loading indicator
     */
    showLoading(container, message = 'Carregando...') {
        const loading = document.createElement('div');
        loading.className = 'loading-overlay';
        loading.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 15px;
            z-index: 1000;
        `;

        loading.innerHTML = `
            <div class="loading-spinner" style="width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <span style="color: #666;">${message}</span>
        `;

        // Add spinner animation if not exists
        if (!document.querySelector('#loading-animations')) {
            const style = document.createElement('style');
            style.id = 'loading-animations';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        container.style.position = 'relative';
        container.appendChild(loading);

        return loading;
    }

    /**
     * Hide loading indicator
     */
    hideLoading(container) {
        const loading = container.querySelector('.loading-overlay');
        if (loading) {
            loading.remove();
        }
    }

    /**
     * Show progress bar
     */
    showProgress(container, options = {}) {
        const {
            value = 0,
            max = 100,
            showText = true,
            animated = true
        } = options;

        const progress = document.createElement('div');
        progress.className = 'progress-container';
        progress.style.cssText = `
            width: 100%;
            background: #e0e6ed;
            border-radius: 10px;
            overflow: hidden;
            height: 8px;
            margin: 10px 0;
        `;

        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        bar.style.cssText = `
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
            transition: width ${animated ? 300 : 0}ms ease;
            width: ${(value / max) * 100}%;
            position: relative;
        `;

        if (showText) {
            bar.innerHTML = `
                <span style="
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: white;
                    font-size: 0.8rem;
                    font-weight: 600;
                ">${value}/${max}</span>
            `;
        }

        progress.appendChild(bar);
        container.appendChild(progress);

        return {
            element: progress,
            setProgress: (newValue) => {
                const percentage = Math.min(100, Math.max(0, (newValue / max) * 100));
                bar.style.width = `${percentage}%`;
                if (showText) {
                    const text = bar.querySelector('span');
                    if (text) text.textContent = `${newValue}/${max}`;
                }
            }
        };
    }

    /**
     * Animate element
     */
    animate(element, animation, options = {}) {
        if (!this.isAnimationsEnabled) {
            return Promise.resolve();
        }

        const {
            duration = 300,
            easing = this.animations.easing,
            delay = 0,
            fill = 'forwards'
        } = options;

        return new Promise((resolve) => {
            const animationMap = {
                'fadeIn': { opacity: [0, 1] },
                'fadeOut': { opacity: [1, 0] },
                'slideInUp': { transform: ['translateY(20px)', 'translateY(0)'] },
                'slideInDown': { transform: ['translateY(-20px)', 'translateY(0)'] },
                'slideInLeft': { transform: ['translateX(-20px)', 'translateX(0)'] },
                'slideInRight': { transform: ['translateX(20px)', 'translateX(0)'] },
                'scaleIn': { transform: ['scale(0.9)', 'scale(1)'] },
                'scaleOut': { transform: ['scale(1)', 'scale(0.9)'] },
                'bounce': {
                    transform: [
                        'scale(1)',
                        'scale(1.1)',
                        'scale(0.95)',
                        'scale(1)'
                    ]
                }
            };

            const keyframes = animationMap[animation] || animationMap.fadeIn;

            element.animate(keyframes, {
                duration,
                easing,
                delay,
                fill
            }).addEventListener('finish', () => {
                resolve();
            });
        });
    }

    /**
     * Navigate options with keyboard
     */
    navigateOptions(currentElement, direction) {
        const container = currentElement.closest('.options-container');
        const options = Array.from(container.querySelectorAll('.option'));
        const currentIndex = options.indexOf(currentElement);
        
        let nextIndex;
        if (direction === 'ArrowLeft') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        } else {
            nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        }
        
        options[nextIndex].focus();
        options[nextIndex].click();
    }

    /**
     * Focus first element in modal
     */
    focusFirstElement(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    /**
     * Handle focus change
     */
    handleFocusChange(target) {
        // Update aria attributes for accessibility
        if (target.matches('.option')) {
            target.setAttribute('aria-selected', 'true');
            // Remove aria-selected from other options in the same container
            const container = target.closest('.options-container');
            if (container) {
                container.querySelectorAll('.option').forEach(option => {
                    if (option !== target) {
                        option.setAttribute('aria-selected', 'false');
                    }
                });
            }
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        this.checkViewportSize();
        
        // Adjust modal positions if needed
        this.modals.forEach((modalData, modalId) => {
            const modal = document.getElementById(modalId);
            if (modal && modal.classList.contains('show')) {
                this.adjustModalPosition(modal);
            }
        });
    }

    /**
     * Adjust modal position for small screens
     */
    adjustModalPosition(modal) {
        if (this.viewportSize.isMobile) {
            modal.style.maxHeight = '80vh';
            modal.style.margin = '10px';
        } else {
            modal.style.maxHeight = '';
            modal.style.margin = '';
        }
    }

    /**
     * Apply theme
     */
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        
        // Apply theme-specific CSS custom properties
        const themes = {
            default: {
                '--primary-color': '#667eea',
                '--secondary-color': '#764ba2',
                '--success-color': '#28a745',
                '--warning-color': '#ffc107',
                '--danger-color': '#dc3545',
                '--info-color': '#17a2b8'
            },
            dark: {
                '--primary-color': '#5a67d8',
                '--secondary-color': '#6b46c1',
                '--success-color': '#38a169',
                '--warning-color': '#d69e2e',
                '--danger-color': '#e53e3e',
                '--info-color': '#319795'
            },
            highContrast: {
                '--primary-color': '#0066cc',
                '--secondary-color': '#6600cc',
                '--success-color': '#006600',
                '--warning-color': '#cc6600',
                '--danger-color': '#cc0000',
                '--info-color': '#006666'
            }
        };

        const themeColors = themes[theme] || themes.default;
        Object.entries(themeColors).forEach(([property, value]) => {
            document.documentElement.style.setProperty(property, value);
        });
    }

    /**
     * Get notification color
     */
    getNotificationColor(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        return colors[type] || colors.info;
    }

    /**
     * Get notification icon
     */
    getNotificationIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    /**
     * Get focus manager
     */
    getFocusManager() {
        // Return focus management data
        return this.focusManager;
    }

    /**
     * Set focus manager
     */
    setFocusManager(triggerElement) {
        this.focusManager = { triggerElement };
    }

    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Check if animations are supported
     */
    checkAnimationSupport() {
        const el = document.createElement('div');
        return el.style.animationName !== undefined;
    }

    /**
     * Update accessibility attributes
     */
    updateAccessibility() {
        // Add ARIA labels and roles
        document.querySelectorAll('.option').forEach(option => {
            if (!option.getAttribute('role')) {
                option.setAttribute('role', 'radio');
            }
        });

        document.querySelectorAll('.quiz-stats .stat').forEach(stat => {
            if (!stat.getAttribute('role')) {
                stat.setAttribute('role', 'status');
                stat.setAttribute('aria-live', 'polite');
            }
        });
    }

    /**
     * Initialize accessibility features
     */
    initAccessibility() {
        this.updateAccessibility();
        
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Pular para o conteúdo principal';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #667eea;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Initialize UI Manager
const uiManager = new UIManager();

// Export for global use
window.uiManager = uiManager;