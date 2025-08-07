    // Gerekli DOM elemanlarını seçin
    var modal = document.getElementById("modal");
    var resim = document.getElementsByClassName("buyutulebilir-resim")[0];
    var modalResim = document.getElementById("buyuk-resim");

    // Resme tıklama olay dinleyicisi ekleyin
    if (resim) { // Resim elemanının varlığını kontrol edin
    resim.onclick = function() {
        modal.style.display = "block";
        modalResim.src = this.src;
    }
}

    // Kapatma düğmesini seçin
    var kapatButonu = document.getElementsByClassName("kapat-butonu")[0];

    // Kapatma düğmesine tıklama olay dinleyicisi ekleyin
    if (kapatButonu) { // Kapatma butonu elemanının varlığını kontrol edin
    kapatButonu.onclick = function() {
        modal.style.display = "none";
    }
}

    // Modal arkaplanına tıklama olay dinleyicisi ekleyin (isteğe bağlı)
    window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
}
}
