// assets/js/header.js

// Sayfa yüklendiğinde çalışacak fonksiyon


    // Tüm dil dropdown menülerini bul
    const languageDropdowns = document.querySelectorAll('.dropdown');

    languageDropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        if (dropdownToggle && dropdownMenu) {
            // Butona tıklandığında menüyü açıp kapat
            dropdownToggle.addEventListener('click', function(event) {
                event.stopPropagation(); // Diğer tıklama olaylarını engelle
                dropdownMenu.classList.toggle('show');
                dropdownToggle.setAttribute('aria-expanded', dropdownMenu.classList.contains('show'));
            });

            // Dropdown dışına tıklanınca menüyü kapat
            document.addEventListener('click', function(event) {
                if (!dropdown.contains(event.target)) {
                    dropdownMenu.classList.remove('show');
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });




