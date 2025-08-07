// Card Scripts - Bootstrap 4 & Asset Mapper Compatible

// Kapak resmi indirme fonksiyonu
function downloadCover() {
    const coverImage = document.querySelector('.card-img-featured');
    const downloadLink = document.querySelector('.download-link');

    if (!coverImage || !downloadLink) return;

    // Loading göster
    const originalText = downloadLink.innerHTML;
    downloadLink.innerHTML = '<span class="loading-spinner"></span>İndiriliyor...';
    downloadLink.style.pointerEvents = 'none';

    // Resmi canvas'a çiz ve indir
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.onload = function() {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        // Blob oluştur ve indir
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'dergi-kapak.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Loading kaldır
            setTimeout(() => {
                downloadLink.innerHTML = originalText;
                downloadLink.style.pointerEvents = 'auto';
                showSuccessMessage('Kapak resmi başarıyla indirildi!');
            }, 500);
        }, 'image/jpeg', 0.9);
    };

    img.onerror = function() {
        // Hata durumunda direkt link kullan
        const a = document.createElement('a');
        a.href = coverImage.src;
        a.download = 'dergi-kapak.jpg';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        downloadLink.innerHTML = originalText;
        downloadLink.style.pointerEvents = 'auto';
        showSuccessMessage('İndirme başlatıldı!');
    };

    img.src = coverImage.src;
}

// Sosyal medya paylaşım fonksiyonları
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'facebook-share', 'width=600,height=400');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, 'twitter-share', 'width=600,height=400');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, 'linkedin-share', 'width=600,height=400');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const text = `${title} - ${url}`;

    // Mobil cihazlarda WhatsApp uygulamasını aç
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.open(`whatsapp://send?text=${text}`, '_blank');
    } else {
        window.open(`https://web.whatsapp.com/send?text=${text}`, 'whatsapp-share', 'width=600,height=400');
    }
}

function shareViaEmail() {
    const subject = encodeURIComponent(document.title);
    const body = encodeURIComponent(`Bu içeriği beğeneceğinizi düşündüm: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function copyToClipboard() {
    const url = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
        // Modern tarayıcılar için
        navigator.clipboard.writeText(url).then(() => {
            showSuccessMessage('Link kopyalandı!');
        }).catch(err => {
            fallbackCopyToClipboard(url);
        });
    } else {
        // Eski tarayıcılar için fallback
        fallbackCopyToClipboard(url);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showSuccessMessage('Link kopyalandı!');
    } catch (err) {
        showSuccessMessage('Kopyalama başarısız. Link: ' + text);
    }

    document.body.removeChild(textArea);
}

// Başarı mesajı gösterme
function showSuccessMessage(message) {
    // Var olan mesajı kaldır
    const existingMessage = document.querySelector('.copy-success');
    if (existingMessage) {
        existingMessage.remove();
    }

    const successDiv = document.createElement('div');
    successDiv.className = 'copy-success';
    successDiv.innerHTML = `<i class="fas fa-check mr-2"></i>${message}`;
    document.body.appendChild(successDiv);

    // Animasyon ile göster
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 100);

    // 3 saniye sonra kaldır
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, 3000);
}

// Dropdown animasyonları
function initDropdownAnimations() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (!toggle || !menu) return;

        // Bootstrap dropdown event'lerini dinle
        $(dropdown).on('show.bs.dropdown', function () {
            menu.style.transform = 'translateY(-10px)';
            menu.style.opacity = '0';
            menu.style.transition = 'all 0.3s ease';

            setTimeout(() => {
                menu.style.transform = 'translateY(0)';
                menu.style.opacity = '1';
            }, 10);
        });

        $(dropdown).on('hide.bs.dropdown', function () {
            menu.style.transform = 'translateY(-10px)';
            menu.style.opacity = '0';
        });
    });
}

// Resim lazy loading ve optimizasyon
function initImageOptimization() {
    const images = document.querySelectorAll('.card-img-featured');

    images.forEach(img => {
        // Resim yüklendiğinde fade-in efekti
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.onload = () => {
                img.style.opacity = '1';
            };
        }

        // Resme tıklandığında büyük görünüm (modal benzeri)
        img.addEventListener('click', function() {
            showImageModal(this.src);
        });
    });
}

// Resim modal gösterimi
function showImageModal(src) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 30px;
        right: 30px;
        color: white;
        font-size: 30px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        transition: all 0.3s ease;
    `;

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        closeBtn.style.transform = 'scale(1.1)';
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        closeBtn.style.transform = 'scale(1)';
    });

    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);

    // Animasyon
    setTimeout(() => {
        modal.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 10);

    // Kapatma eventi
    const closeModal = () => {
        modal.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    };

    modal.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    // ESC tuşu ile kapatma
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// Event listener'ları bağla
document.addEventListener('DOMContentLoaded', function() {
    // Download link'ine class ekle
    const downloadLink = document.querySelector('a[onclick="downloadCover()"]');
    if (downloadLink) {
        downloadLink.classList.add('download-link');
    }

    // Sosyal medya butonlarına event listener ekle
    const socialBtns = {
        '.social-facebook': shareOnFacebook,
        '.social-twitter': shareOnTwitter,
        '.social-linkedin': shareOnLinkedIn,
        '.social-whatsapp': shareOnWhatsApp,
        '.social-email': shareViaEmail,
        '.social-copy': copyToClipboard
    };

    Object.entries(socialBtns).forEach(([selector, handler]) => {
        const btn = document.querySelector(selector);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();

                // Butona tıklama efekti
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);

                handler();
            });
        }
    });

    // Diğer init fonksiyonları
    initDropdownAnimations();
    initImageOptimization();

    // Tooltip'leri etkinleştir (Bootstrap 4)
    if (typeof $().tooltip === 'function') {
        $('[data-toggle="tooltip"]').tooltip();
    }
});

// Sayfa yüklendiğinde smooth scroll efekti
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
