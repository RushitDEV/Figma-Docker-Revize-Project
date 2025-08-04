// assets/app.js

// CSS for bibliography-container.collapsed, added in previous step's style block

document.addEventListener('DOMContentLoaded', function() {
    // "Tüm Kaynakçayı Göster" butonu için işlevsellik
    const bibliographyContent = document.getElementById('bibliographyContent');
    const toggleButton = document.getElementById('toggleBibliographyButton');

    // Başlangıçta buton metnini ve listenin durumunu ayarla
    // HTML'de 'collapsed' sınıfı zaten varsa, buton 'Tüm Kaynakçayı Göster' olmalı.
    if (bibliographyContent && toggleButton) { // Null kontrolü ekle
        if (bibliographyContent.classList.contains('collapsed')) {
            toggleButton.textContent = 'Tüm Kaynakçayı Göster';
        } else {
            toggleButton.textContent = 'Kaynakçayı Gizle';
        }

        toggleButton.addEventListener('click', function() {
            bibliographyContent.classList.toggle('collapsed');
            if (bibliographyContent.classList.contains('collapsed')) {
                toggleButton.textContent = 'Tüm Kaynakçayı Göster';
            } else {
                toggleButton.textContent = 'Kaynakçayı Gizle';
            }
        });
    }


    // Kopyala Butonu İşlevselliği
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.dataset.text;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    $('#copyToast').toast('show'); // Bootstrap Toast'ı göster
                }).catch(err => {
                    console.error('Kopyalama başarısız oldu:', err);
                    alert('Kopyalama başarısız oldu. Lütfen manuel olarak kopyalayın.');
                });
            } else {
                // Geriye dönük uyumluluk (eski tarayıcılar için)
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                textarea.style.position = 'fixed'; // Ekran dışına taşı
                textarea.style.top = 0;
                textarea.style.left = 0;
                textarea.style.width = '1px';
                textarea.style.height = '1px';
                textarea.style.opacity = 0;
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        $('#copyToast').toast('show'); // Bootstrap Toast'ı göster
                    } else {
                        alert('Kopyalama başarısız oldu. Lütfen manuel olarak kopyalayın.');
                    }
                } catch (err) {
                    console.error('Kopyalama başarısız oldu:', err);
                    alert('Kopyalama başarısız oldu. Lütfen manuel olarak kopyalayın.');
                }
                document.body.removeChild(textarea);
            }
        });
    });

    // BibTeX İndirme İşlevselliği
    document.querySelectorAll('.bibtex-btn').forEach(button => {
        button.addEventListener('click', function() {
            const bibtexContent = this.dataset.bibtexContent;
            const blob = new Blob([bibtexContent], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'citation.bib';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });

    // RIS İndirme İşlevselliği
    document.querySelectorAll('.ris-btn').forEach(button => {
        button.addEventListener('click', function() {
            const risContent = this.dataset.risContent.replace(/%0A/g, '\n'); // URL kodlamasını düzelt
            const blob = new Blob([risContent], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'citation.ris';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });

    // Bootstrap Toast'ı jQuery kullanarak başlatmak için (eğer jQuery ve Bootstrap JS yüklüyse)
    // $('#copyToast').toast({ delay: 3000 }); // Artık her kopyalamada gösterildiği için başlatmaya gerek yok.

    // Akordeon başlıklarına tıklama efekti (active-header sınıfı için)
    document.querySelectorAll('.accordion-custom .card-header button').forEach(button => {
        button.addEventListener('click', function() {
            // Tüm header'lardan active-header'ı kaldır
            document.querySelectorAll('.accordion-custom .card-header button').forEach(headerBtn => {
                headerBtn.classList.remove('active-header');
            });
            // Tıklanan butona active-header ekle
            this.classList.add('active-header');
        });
    });
});
