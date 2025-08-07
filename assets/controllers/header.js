// Header Scripts - Bootstrap 4 & Asset Mapper Compatible

// Header scroll effects
function initScrollEffects() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeaderOnScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeaderOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Mobile menu animations
function initMobileMenuAnimations() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerBtn = document.querySelector('[data-target="#mobileMenu"]');

    if (!mobileMenu || !hamburgerBtn) return;

    // Bootstrap collapse event listeners
    $(mobileMenu).on('show.bs.collapse', function () {
        // Hamburger button animation
        const icon = hamburgerBtn.querySelector('i');
        if (icon) {
            icon.style.transform = 'rotate(90deg)';
        }

        // Menu items stagger animation
        const menuItems = mobileMenu.querySelectorAll('.header-button, .dropdown');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';

            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    });

    $(mobileMenu).on('hide.bs.collapse', function () {
        // Hamburger button reset
        const icon = hamburgerBtn.querySelector('i');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    });
}

// Notification system
function initNotificationSystem() {
    const notificationBtns = document.querySelectorAll('.header-button i.fa-bell');

    notificationBtns.forEach(btn => {
        const button = btn.closest('.header-button');
        if (!button) return;

        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Button loading state
            this.classList.add('header-loading');

            // Simulate notification fetch
            setTimeout(() => {
                this.classList.remove('header-loading');
                showNotificationDropdown(this);
            }, 1000);
        });
    });
}

// Show notification dropdown
function showNotificationDropdown(button) {
    // Remove existing notification dropdown
    const existingDropdown = document.querySelector('.notification-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }

    // Create notification dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'notification-dropdown dropdown-menu show';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        width: 300px;
        max-height: 400px;
        overflow-y: auto;
        z-index: 1050;
        margin-top: 5px;
    `;

    // Sample notifications
    const notifications = [
        {
            icon: 'fas fa-info-circle text-info',
            title: 'Yeni Makale Yayınlandı',
            message: 'Teknoloji kategorisinde yeni bir makale eklendi.',
            time: '2 saat önce'
        },
        {
            icon: 'fas fa-user-plus text-success',
            title: 'Yeni Üye',
            message: 'Sistemde yeni bir kullanıcı kaydoldu.',
            time: '5 saat önce'
        },
        {
            icon: 'fas fa-exclamation-triangle text-warning',
            title: 'Bakım Bildirimi',
            message: 'Sistem bakımı yarın saat 02:00\'da başlayacak.',
            time: '1 gün önce'
        }
    ];

    let notificationHTML = '<h6 class="dropdown-header">Bildirimler</h6>';

    notifications.forEach(notif => {
        notificationHTML += `
            <div class="dropdown-item-text notification-item">
                <div class="d-flex align-items-start">
                    <i class="${notif.icon} mr-2 mt-1"></i>
                    <div class="flex-grow-1">
                        <div class="font-weight-bold">${notif.title}</div>
                        <small class="text-muted">${notif.message}</small>
                        <div class="text-muted mt-1" style="font-size: 0.75rem;">${notif.time}</div>
                    </div>
                </div>
            </div>
        `;
    });

    notificationHTML += `
        <div class="dropdown-divider"></div>
        <a class="dropdown-item text-center text-primary" href="#">
            <small>Tüm bildirimleri görüntüle</small>
        </a>
    `;

    dropdown.innerHTML = notificationHTML;

    // Position dropdown
    const buttonRect = button.getBoundingClientRect();
    const container = button.closest('.container') || document.body;
    container.style.position = 'relative';
    container.appendChild(dropdown);

    // Close dropdown when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeDropdown(e) {
            if (!dropdown.contains(e.target) && !button.contains(e.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        });
    }, 100);
}

// Language switching
function initLanguageSwitching() {
    const langLinks = document.querySelectorAll('a[href^="/lang/"]');

    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const lang = this.getAttribute('href').split('/').pop();
            const currentLang = document.documentElement.lang || 'tr';

            if (lang === currentLang) {
                showToast('Zaten bu dil seçili!', 'info');
                return;
            }

            // Loading state
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';

            // Simulate language change
            setTimeout(() => {
                // Update language indicators
                updateLanguageIndicators(lang);

                // Reset loading state
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';

                // Show success message
                const langName = lang === 'tr' ? 'Türkçe' : 'English';
                showToast(`Dil ${langName} olarak değiştirildi!`, 'success');

                // Close dropdown
                const dropdown = this.closest('.dropdown-menu');
                if (dropdown) {
                    $(dropdown).prev('.dropdown-toggle').dropdown('hide');
                }

                // Here you would normally redirect or reload the page
                // window.location.href = this.getAttribute('href');
            }, 800);
        });
    });
}

// Update language indicators
function updateLanguageIndicators(newLang) {
    const langButtons = document.querySelectorAll('[id*="LanguageDropdown"]');
    const langName = newLang === 'tr' ? 'Türkçe' : 'English';
    const flag = newLang === 'tr' ? '🇹🇷' : '🇬🇧';

    langButtons.forEach(btn => {
        const textNode = Array.from(btn.childNodes).find(node =>
            node.nodeType === Node.TEXT_NODE && node.textContent.includes('Dil')
        );
        if (textNode) {
            textNode.textContent = ` ${langName}`;
        }
    });

    // Update document language
    document.documentElement.lang = newLang;
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.header-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `header-toast alert alert-${type} alert-dismissible`;
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        transform: translateX(400px);
        transition: all 0.3s ease;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    `;

    const iconMap = {
        success: 'fas fa-check-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-exclamation-circle'
    };

    toast.innerHTML = `
        <i class="${iconMap[type]} mr-2"></i>
        ${message}
        <button type="button" class="close" data-dismiss="alert">
            <span>&times;</span>
        </button>
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Dropdown animation enhancements
function initDropdownAnimations() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (!menu) return;

        $(dropdown).on('show.bs.dropdown', function () {
            menu.style.transform = 'translateY(-10px) scale(0.95)';
            menu.style.opacity = '0';
            menu.style.transition = 'all 0.2s ease';

            setTimeout(() => {
                menu.style.transform = 'translateY(0) scale(1)';
                menu.style.opacity = '1';
            }, 10);
        });

        $(dropdown).on('hide.bs.dropdown', function () {
            menu.style.transform = 'translateY(-10px) scale(0.95)';
            menu.style.opacity = '0';
        });
    });
}

// Initialize all header functionality
document.addEventListener('DOMContentLoaded', function() {
    initScrollEffects();
    initMobileMenuAnimations();
    initNotificationSystem();
    initLanguageSwitching();
    initDropdownAnimations();

    // Add click effects to all header buttons
    const headerButtons = document.querySelectorAll('.header-button');
    headerButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .notification-item {
        padding: 12px 16px !important;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .notification-item:hover {
        background-color: rgba(0,123,255,0.05);
    }

    .notification-item:last-of-type {
        border-bottom: none;
    }
`;
document.head.appendChild(style);
