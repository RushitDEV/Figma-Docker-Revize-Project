// assets/js/dergi_navigation.js

document.addEventListener('DOMContentLoaded', function() {

    // Tüm navigasyon öğelerini seç
    const navItems = document.querySelectorAll('.nav-item');
    const ciltItems = document.querySelectorAll('.cilt-item');

    // Ana navigasyon öğeleri için click eventi
    navItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            // Tüm nav-item'lardan active class'ını kaldır
            navItems.forEach(function(navItem) {
                navItem.classList.remove('active');
            });

            // Tıklanan öğeye active class'ı ekle
            this.classList.add('active');

            // Eğer "Arşiv" seçilirse, cilt-sayi-list'i göster
            const ciltSayiList = document.querySelector('.cilt-sayi-list');
            if (index === 1 && ciltSayiList) { // index 1 = Arşiv
                ciltSayiList.style.display = 'block';
                ciltSayiList.style.opacity = '0';
                setTimeout(() => {
                    ciltSayiList.style.opacity = '1';
                }, 10);
            }
        });
    });

    // Cilt ve sayı öğeleri için click eventi
    ciltItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Tüm cilt-item'lardan active class'ını kaldır
            ciltItems.forEach(function(ciltItem) {
                ciltItem.classList.remove('active');
            });

            // Tıklanan öğeye active class'ı ekle
            this.classList.add('active');

            // Seçilen cilt ve sayı bilgisini konsola yazdır (isteğe bağlı)
            const selectedText = this.textContent.trim();
            console.log('Seçilen: ' + selectedText);

            // Burada AJAX çağrısı yapabilirsiniz
            // loadCiltSayi(selectedText);
        });
    });

    // Hover efektleri için ek fonksiyonlar
    function addHoverEffects() {
        // Nav items hover
        navItems.forEach(function(item) {
            item.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.backgroundColor = '#f8f9fa';
                    this.style.transition = 'background-color 0.3s ease';
                }
            });

            item.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.backgroundColor = '';
                }
            });
        });

        // Cilt items hover
        ciltItems.forEach(function(item) {
            item.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateX(5px)';
                    this.style.transition = 'transform 0.2s ease';
                }
            });

            item.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = '';
                }
            });
        });
    }

    // Hover efektlerini başlat
    addHoverEffects();

    // Aktif öğeyi vurgulamak için animasyon
    function highlightActive(element) {
        element.style.transform = 'scale(1.02)';
        element.style.transition = 'transform 0.2s ease';

        setTimeout(() => {
            element.style.transform = '';
        }, 200);
    }

    // Sayfa yüklendiğinde varsayılan aktif öğeyi ayarla
    function setDefaultActive() {
        // Eğer hiçbir cilt-item aktif değilse, ilkini aktif yap
        const activeCiltItem = document.querySelector('.cilt-item.active');
        if (!activeCiltItem && ciltItems.length > 0) {
            ciltItems[2].classList.add('active'); // "Cilt: 10 Sayı: 20" varsayılan olarak aktif
        }

        // Varsayılan olarak "Dergi Ana Sayfası" aktif
        if (navItems.length > 0) {
            navItems[0].classList.add('active');
        }
    }

    setDefaultActive();

    // URL değişikliklerini dinle (eğer SPA kullanıyorsanız)
    window.addEventListener('popstate', function() {
        setDefaultActive();
    });

    // Klavye navigasyonu için (isteğe bağlı)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const activeItem = document.querySelector('.cilt-item.active');
            if (activeItem) {
                e.preventDefault();
                let nextItem;

                if (e.key === 'ArrowDown') {
                    nextItem = activeItem.nextElementSibling;
                } else {
                    nextItem = activeItem.previousElementSibling;
                }

                if (nextItem && nextItem.classList.contains('cilt-item')) {
                    activeItem.classList.remove('active');
                    nextItem.classList.add('active');
                    highlightActive(nextItem);

                    // Scroll into view
                    nextItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        }
    });
});

// Dış fonksiyonlar (isteğe bağlı)
function loadCiltSayi(ciltSayiText) {
    // AJAX çağrısı örneği
    console.log('Loading content for: ' + ciltSayiText);

    // Burada Symfony controller'ına AJAX çağrısı yapabilirsiniz
    /*
    fetch('/dergi/cilt-sayi/' + encodeURIComponent(ciltSayiText))
        .then(response => response.json())
        .then(data => {
            // İçeriği güncelle
            console.log('Data loaded:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    */
}

// Programatik olarak aktif öğeyi değiştirmek için
function setActiveCilt(ciltSayiText) {
    const ciltItems = document.querySelectorAll('.cilt-item');
    ciltItems.forEach(function(item) {
        if (item.textContent.trim() === ciltSayiText) {
            // Mevcut aktif öğeyi kaldır
            document.querySelector('.cilt-item.active')?.classList.remove('active');
            // Yeni öğeyi aktif yap
            item.classList.add('active');
            highlightActive(item);
        }
    });
}
