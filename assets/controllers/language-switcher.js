// language-switcher.js
const languageContent = {
    'tr': {
        'badge': 'ARAŞTIRMA MAKALESİ',
        'publicationInfo': 'Yıl 2023, Cilt: 10 Sayı: 20, 40 - 46, 31.12.2023',
        'title': 'Yaban Keçisinin (Capra aegagrus, ERXLEBEN) Popülasyon Büyüklüğü ve Yapısı: Göller Yöresi Örneği',
        'abstractTitle': 'Öz',
        'abstractText': 'Bu makale kapsamında, Göller Yöresinde yer alan; Antalya, Isparta ve Burdur illerinde 2017 ve 2018 yıllarında yaban keçisi envanteri çalışması yapılmıştır. Yaban keçilerinin popülasyon durumu, büyüklüğü ve yapısının, popülasyon içinde bireylerin cinsiyet, yaş ve grup içinde popülasyon dağılımının, nasıl bir ilişkisinin olduğu, yoğunluğun neye göre şekillendiği ele alınmıştır.',
        'keywordsTitle': 'Anahtar Kelimeler',
        'keywords': ['Yaban Hayatı', 'Jamovi', 'Yaban Keçisi', 'Popülasyon Büyüklüğü', 'Popülasyon Yapısı'],
        'supportingInstitutionTitle': 'Destekleyen Kurum',
        'supportingInstitutionText': 'Isparta Uygulamalı Bilimler Üniversitesi BAP Yönetim Birimi Başkanlığı - Doğa Koruma ve Milli Parklar 6. Bölge Müdürlüğü',
        'projectNumberTitle': 'Proje Numarası',
        'projectNumberText': '2019-YL1-0002',
        'acknowledgmentsTitle': 'Teşekkür',
        'acknowledgmentsText': 'Desteklerinden dolayı Isparta Uygulamalı Bilimler Üniversitesi BAP Yönetim Birimi Başkanlığına – Doğa Koruma ve Milli Parklar 6. Bölge Müdürlüğüne teşekkür ederiz.'
    },
    'en': {
        'badge': 'RESEARCH ARTICLE',
        'publicationInfo': 'Year 2023, Volume: 10 Issue: 20, 40 - 46, 31.12.2023',
        'title': 'Population Size and Structure of the Wild Goat (Capra aegagrus, ERXLEBEN): The Lakes Region Example',
        'abstractTitle': 'Abstract',
        'abstractText': 'Within the scope of this article, a wild goat inventory study was carried out in Antalya, Isparta and Burdur provinces located in the Lakes Region in 2017 and 2018. The study examines the wild goat population status, size, and structure, the relationship between the distribution of individuals by gender, age, and group within the population, and how density is shaped.',
        'keywordsTitle': 'Keywords',
        'keywords': ['Wildlife', 'Jamovi', 'Wild Goat', 'Population Size', 'Population Structure'],
        'supportingInstitutionTitle': 'Supporting Institution',
        'supportingInstitutionText': 'Isparta University of Applied Sciences BAP Management Unit Presidency - 6th Regional Directorate of Nature Conservation and National Parks',
        'projectNumberTitle': 'Project Number',
        'projectNumberText': '2019-YL1-0002',
        'acknowledgmentsTitle': 'Acknowledgments',
        'acknowledgmentsText': 'We would like to thank the Isparta University of Applied Sciences BAP Management Unit Presidency - 6th Regional Directorate of Nature Conservation and National Parks for their support.'
    }
};

// Fonksiyonu global window nesnesine ekleyerek dışarıya açın
window.switchLanguage = function (event, lang) {
    event.preventDefault(); // Sayfanın yukarı kaymasını engeller

    const content = languageContent[lang];

    document.querySelector('.badge').innerText = content.badge;
    document.querySelector('.publication-info small').innerText = content.publicationInfo;
    document.querySelector('.card-title').innerText = content.title;
    document.querySelector('.abstract-section h6').innerText = content.abstractTitle;
    document.querySelector('.abstract-section p').innerText = content.abstractText;
    document.querySelector('.keywords-section h6').innerText = content.keywordsTitle;

    const keywordsContainer = document.querySelector('.keywords');
    keywordsContainer.innerHTML = '';
    content.keywords.forEach(keywordText => {
        const keywordLink = document.createElement('a');
        keywordLink.href = '#';
        keywordLink.className = 'ml-2';
        keywordLink.innerText = keywordText;
        keywordsContainer.appendChild(keywordLink);
    });

    document.querySelector('.institution-section h6').innerText = content.supportingInstitutionTitle;
    document.querySelector('.institution-section p').innerText = content.supportingInstitutionText;
    document.querySelector('.project-section h6').innerText = content.projectNumberTitle;
    document.querySelector('.project-section p').innerText = content.projectNumberText;
    document.querySelector('.acknowledgments-section h6').innerText = content.acknowledgmentsTitle;
    document.querySelector('.acknowledgments-section p').innerText = content.acknowledgmentsText;
};
