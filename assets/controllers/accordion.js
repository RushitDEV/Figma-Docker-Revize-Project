// assets/app.js (veya assets/js/article.js)

// Eğer Bootstrap JS kullanmıyorsanız bu event listenerlar önemlidir.
// Bootstrap JS kullanılıyorsa, collapse/toggle işlemleri otomatik halledilir.
// Bu örnek, Bootstrap JS'in varlığını varsayarak veya onun yerine geçecek şekilde yazılmıştır.

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Kaynakça Göster/Gizle İşlevi ---
    const bibliographyContainer = document.getElementById('bibliographyContent');
    const toggleBibliographyButton = document.getElementById('toggleBibliographyButton');

    if (bibliographyContainer && toggleBibliographyButton) {
        // Başlangıçta 5 maddeden fazlası varsa kısalt
        const listItems = bibliographyContainer.querySelectorAll('ol li');
        const initialVisibleCount = 5; // İlk başta gösterilecek madde sayısı

        if (listItems.length > initialVisibleCount) {
            // Sadece ilk X maddeyi göster, diğerlerini gizle
            for (let i = initialVisibleCount; i < listItems.length; i++) {
                listItems[i].style.display = 'none';
            }
            // Başlangıçta buton metnini ayarla
            toggleBibliographyButton.innerHTML = '<i class="fas fa-book mr-2"></i> Tüm Kaynakçayı Göster';
            bibliographyContainer.classList.add('collapsed'); // Sadece CSS tarafından gizleme/gösterme için kullanılır.
        } else {
            // Eğer 5'ten az madde varsa butonu gizle, çünkü tümü zaten görünüyor
            toggleBibliographyButton.style.display = 'none';
        }


        toggleBibliographyButton.addEventListener('click', function() {
            const isCollapsed = bibliographyContainer.classList.contains('collapsed');

            if (isCollapsed) {
                // Gizliyse göster
                listItems.forEach(item => item.style.display = 'block');
                bibliographyContainer.classList.remove('collapsed');
                toggleBibliographyButton.innerHTML = '<i class="fas fa-book mr-2"></i> Kaynakçayı Daralt';
            } else {
                // Görünürse gizle (sadece ilk X maddeyi göster)
                for (let i = initialVisibleCount; i < listItems.length; i++) {
                    listItems[i].style.display = 'none';
                }
                bibliographyContainer.classList.add('collapsed');
                toggleBibliographyButton.innerHTML = '<i class="fas fa-book mr-2"></i> Tüm Kaynakçayı Göster';
            }
        });
    }

    // --- 2. Kopyalama İşlevi ---
    const copyButtons = document.querySelectorAll('.copy-btn');
    const copyToast = document.getElementById('copyToast');
    const toastInstance = copyToast ? new bootstrap.Toast(copyToast) : null; // Bootstrap Toast'ı kullan

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.dataset.text; // `data-text` özelliğinden metni al

            if (navigator.clipboard && navigator.clipboard.writeText) {
                // Modern Clipboard API kullan
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        console.log('Metin panoya kopyalandı:', textToCopy);
                        if (toastInstance) {
                            toastInstance.show(); // Toast mesajını göster
                        }
                    })
                    .catch(err => {
                        console.error('Metin kopyalanamadı:', err);
                        alert('Metin kopyalanamadı. Lütfen manuel olarak kopyalayın.');
                    });
            } else {
                // Eski tarayıcılar için yedekleme (execCommand artık önerilmez)
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                textArea.style.position = 'fixed'; // Ekran dışına taşı
                textArea.style.left = '-9999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    console.log('Metin panoya kopyalandı (execCommand):', textToCopy);
                    if (toastInstance) {
                        toastInstance.show(); // Toast mesajını göster
                    }
                } catch (err) {
                    console.error('Metin kopyalanamadı (execCommand):', err);
                    alert('Metin kopyalanamadı. Lütfen manuel olarak kopyalayın.');
                } finally {
                    document.body.removeChild(textArea);
                }
            }
        });
    });

    // --- 3. İndirme İşlevleri (BibTeX ve RIS) ---
    const bibtexButtons = document.querySelectorAll('.bibtex-btn');
    const risButtons = document.querySelectorAll('.ris-btn');

    bibtexButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.dataset.bibtexContent;
            const filename = 'citation.bib';
            downloadFile(content, filename, 'application/x-bibtex');
        });
    });

    risButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.dataset.risContent;
            const filename = 'citation.ris';
            downloadFile(content, filename, 'application/x-research-info-systems');
        });
    });

    function downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Bellek sızıntılarını önle
    }

    // --- 4. Accordion Başlık Aktivasyonu (Bootstrap ile Entegre) ---
    // Eğer Bootstrap JS kullanıyorsanız, Bootstrap'ın kendi event'lerini dinlemek daha iyidir.
    // Varsayılan olarak ilk kart 'show' ve 'active-header' sınıfına sahip.
    // Diğer kartlar açıldığında 'active-header' sınıfını yönetelim.
    const accordion = document.getElementById('articleAccordion');

    if (accordion) {
        accordion.addEventListener('show.bs.collapse', function(event) {
            // Açılacak kartın başlığını bul
            const targetHeader = event.target.previousElementSibling;
            if (targetHeader) {
                targetHeader.querySelector('.btn').classList.add('active-header');
            }

            // Diğer tüm başlıkların active-header sınıfını kaldır
            const allHeaders = accordion.querySelectorAll('.card-header');
            allHeaders.forEach(header => {
                if (header !== targetHeader) {
                    header.querySelector('.btn').classList.remove('active-header');
                }
            });
        });

        accordion.addEventListener('hide.bs.collapse', function(event) {
            // Kapanacak kartın başlığından active-header sınıfını kaldır
            const targetHeader = event.target.previousElementSibling;
            if (targetHeader) {
                targetHeader.querySelector('.btn').classList.remove('active-header');
            }
        });
    }

    // Başlangıçta aktif olan başlığa 'active-header' sınıfını ekle
    // Twig'de `active-header` zaten var, bu sadece JS ile senkronize etmek için.
    const initialActiveButton = document.querySelector('#headingOne .btn');
    if (initialActiveButton) {
        initialActiveButton.classList.add('active-header');
    }
});
