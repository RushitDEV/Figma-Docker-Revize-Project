// accordion.js - AssetMapper için ES6 Module formatında
// Bootstrap 4 ve Stimulus uyumlu

// DOM yüklendiğinde çalışacak kod
document.addEventListener('DOMContentLoaded', function() {
    console.log('Accordion script loaded'); // Debug için

    // Ana işlevleri başlat
    initializeBibliographyToggle();
    initializeCopyFunctionality();
    initializeDownloadFunctionality();
    initializeAccordionAnimations();
    initializeToastNotifications();
    initializeMobileOptimizations();

    // CSS stillerini ekle
    addCustomStyles();
});

/**
 * Kaynakça göster/gizle işlevini başlatır
 */
function initializeBibliographyToggle() {
    const bibliographyContainer = document.getElementById('bibliographyContent');
    const toggleButton = document.getElementById('toggleBibliographyButton');

    if (!bibliographyContainer || !toggleButton) {
        console.warn('Bibliography elements not found');
        return;
    }

    // İlk yüklemede sadece ilk 5 kaynağı göster
    showLimitedBibliography(5);

    toggleButton.addEventListener('click', function(e) {
        e.preventDefault();

        if (bibliographyContainer.classList.contains('collapsed')) {
            // Tüm kaynakçayı göster
            showFullBibliography();
            toggleButton.innerHTML = '<i class="fas fa-book mr-2"></i> Kaynakçayı Gizle';
            toggleButton.classList.remove('btn-outline-primary');
            toggleButton.classList.add('btn-outline-secondary');
        } else {
            // Kaynakçayı sınırla
            showLimitedBibliography(5);
            toggleButton.innerHTML = '<i class="fas fa-book mr-2"></i> Tüm Kaynakçayı Göster';
            toggleButton.classList.remove('btn-outline-secondary');
            toggleButton.classList.add('btn-outline-primary');
        }
    });
}

/**
 * Sınırlı sayıda kaynakça gösterir
 * @param {number} limit - Gösterilecek kaynak sayısı
 */
function showLimitedBibliography(limit) {
    const bibliographyContainer = document.getElementById('bibliographyContent');
    if (!bibliographyContainer) return;

    const listItems = bibliographyContainer.querySelectorAll('li');

    listItems.forEach((item, index) => {
        if (index < limit) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    bibliographyContainer.classList.add('collapsed', 'fade-overlay');
}

/**
 * Tüm kaynakçayı gösterir
 */
function showFullBibliography() {
    const bibliographyContainer = document.getElementById('bibliographyContent');
    if (!bibliographyContainer) return;

    const listItems = bibliographyContainer.querySelectorAll('li');

    listItems.forEach(item => {
        item.style.display = 'block';
    });

    bibliographyContainer.classList.remove('collapsed', 'fade-overlay');
}

/**
 * Kopyalama işlevlerini başlatır
 */
function initializeCopyFunctionality() {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const textToCopy = this.dataset.text;

            if (textToCopy) {
                copyToClipboard(textToCopy)
                    .then(() => {
                        showSuccessAnimation(this);
                        showToast('Metin panoya kopyalandı!', 'success');
                    })
                    .catch(err => {
                        console.error('Kopyalama hatası:', err);
                        showToast('Kopyalama işlemi başarısız oldu!', 'error');
                    });
            }
        });
    });
}

/**
 * İndirme işlevlerini başlatır
 */
function initializeDownloadFunctionality() {
    // BibTeX indirme
    const bibtexButtons = document.querySelectorAll('.bibtex-btn');
    bibtexButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const bibtexContent = this.dataset.bibtexContent;

            if (bibtexContent) {
                downloadFile(bibtexContent, 'citation.bib', 'text/plain');
                showSuccessAnimation(this);
                showToast('BibTeX dosyası indirildi!', 'success');
            }
        });
    });

    // RIS indirme
    const risButtons = document.querySelectorAll('.ris-btn');
    risButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const risContent = decodeURIComponent(this.dataset.risContent);

            if (risContent) {
                downloadFile(risContent, 'citation.ris', 'text/plain');
                showSuccessAnimation(this);
                showToast('RIS dosyası indirildi!', 'success');
            }
        });
    });
}

/**
 * Accordion animasyonlarını başlatır
 */
function initializeAccordionAnimations() {
    const accordionElement = document.getElementById('articleAccordion');
    if (!accordionElement) return;

    const collapseElements = accordionElement.querySelectorAll('.collapse');

    collapseElements.forEach(collapseEl => {
        // Bootstrap events için addEventListener kullan
        collapseEl.addEventListener('show.bs.collapse', function() {
            const card = this.closest('.card');
            const button = card.querySelector('[data-toggle="collapse"]');

            if (button) {
                button.classList.remove('collapsed');
                button.classList.add('active-header');

                // Smooth scroll
                setTimeout(() => {
                    card.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 100);
            }
        });

        collapseEl.addEventListener('hide.bs.collapse', function() {
            const card = this.closest('.card');
            const button = card.querySelector('[data-toggle="collapse"]');

            if (button) {
                button.classList.add('collapsed');
                button.classList.remove('active-header');
            }
        });
    });
}

/**
 * Toast bildirimlerini başlatır
 */
function initializeToastNotifications() {
    const toastElement = document.getElementById('copyToast');
    if (!toastElement) return;

    // Bootstrap toast'ı manuel olarak başlat
    if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
        window.toastInstance = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 3000
        });
    }
}

/**
 * Metni panoya kopyalar
 * @param {string} text - Kopyalanacak metin
 * @returns {Promise}
 */
function copyToClipboard(text) {
    return new Promise((resolve, reject) => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(resolve).catch(reject);
        } else {
            // Fallback yöntem
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);

                if (successful) {
                    resolve();
                } else {
                    reject(new Error('Kopyalama komutu başarısız'));
                }
            } catch (err) {
                document.body.removeChild(textArea);
                reject(err);
            }
        }
    });
}

/**
 * Dosya indirir
 * @param {string} content - Dosya içeriği
 * @param {string} filename - Dosya adı
 * @param {string} contentType - İçerik tipi
 */
function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}

/**
 * Başarı animasyonu gösterir
 * @param {HTMLElement} button - Animasyon gösterilecek buton
 */
function showSuccessAnimation(button) {
    const originalHtml = button.innerHTML;
    const originalClasses = button.className;

    // Başarı stilini uygula
    button.classList.remove('btn-outline-primary', 'btn-outline-secondary', 'btn-outline-info');
    button.classList.add('btn-success');
    button.innerHTML = '<i class="fas fa-check mr-1"></i>Başarılı!';

    // 2 saniye sonra eski haline döndür
    setTimeout(() => {
        button.className = originalClasses;
        button.innerHTML = originalHtml;
    }, 2000);
}

/**
 * Toast bildirimi gösterir
 * @param {string} message - Gösterilecek mesaj
 * @param {string} type - Bildirim tipi (success, error, warning, info)
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('copyToast');
    if (!toast) return;

    const toastHeader = toast.querySelector('.toast-header');
    const toastBody = toast.querySelector('.toast-body');
    const iconElement = toastHeader.querySelector('i');
    const titleElement = toastHeader.querySelector('strong');

    // İkon ve renk ayarları
    let iconClass = 'fas fa-check-circle text-success';
    let headerTitle = 'Başarılı';

    switch(type) {
        case 'error':
            iconClass = 'fas fa-exclamation-circle text-danger';
            headerTitle = 'Hata';
            break;
        case 'warning':
            iconClass = 'fas fa-exclamation-triangle text-warning';
            headerTitle = 'Uyarı';
            break;
        case 'info':
            iconClass = 'fas fa-info-circle text-info';
            headerTitle = 'Bilgi';
            break;
    }

    // Toast içeriğini güncelle
    if (iconElement) iconElement.className = iconClass;
    if (titleElement) titleElement.textContent = headerTitle;
    if (toastBody) toastBody.textContent = message;

    // Toast'ı göster
    if (window.toastInstance) {
        window.toastInstance.show();
    } else if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
        const toastInstance = new bootstrap.Toast(toast);
        toastInstance.show();
    }
}

/**
 * Mobile optimizasyonları
 */
function initializeMobileOptimizations() {
    function applyMobileStyles() {
        const accordionButtons = document.querySelectorAll('.accordion .card-header button');
        const accordionBodies = document.querySelectorAll('.accordion .card-body');

        if (window.innerWidth <= 768) {
            accordionButtons.forEach(btn => btn.classList.add('text-sm'));
            accordionBodies.forEach(body => body.classList.add('px-2'));
        } else {
            accordionButtons.forEach(btn => btn.classList.remove('text-sm'));
            accordionBodies.forEach(body => body.classList.remove('px-2'));
        }
    }

    // İlk yüklemede uygula
    applyMobileStyles();

    // Window resize olayını dinle
    window.addEventListener('resize', applyMobileStyles);
}

/**
 * Custom CSS stillerini ekler
 */
function addCustomStyles() {
    const styleId = 'accordion-custom-styles';

    // Eğer stil zaten eklenmişse tekrar ekleme
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        .bibliography-container.collapsed.fade-overlay {
            position: relative;
            max-height: 400px;
            overflow: hidden;
        }

        .bibliography-container.collapsed.fade-overlay::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px;
            background: linear-gradient(transparent, white);
            pointer-events: none;
        }

        .active-header {
            background-color: #f8f9fa !important;
            border-left: 4px solid #007bff;
        }

        .citation-box {
            border-radius: 0.375rem;
            transition: all 0.3s ease;
        }

        .citation-box:hover {
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
            .accordion .card-header button.text-sm {
                font-size: 0.9rem !important;
                padding: 0.75rem !important;
            }

            .bibliography-button-wrapper {
                margin-top: 1rem !important;
            }

            .btn-sm {
                font-size: 0.8rem;
                padding: 0.375rem 0.75rem;
            }
        }
    `;

    document.head.appendChild(style);
}

// Debug için global fonksiyonlar (geliştirme aşamasında kullanabilirsiniz)
window.accordionDebug = {
    showFullBibliography,
    showLimitedBibliography,
    copyToClipboard,
    showToast
};
