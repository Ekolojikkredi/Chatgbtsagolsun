// Sayfa Geçişi (Yeni Sayfa Açma)
function openPage(pageName) {
    // Tüm form container'ları gizle
    document.querySelectorAll('.form-container').forEach(form => {
        form.classList.add('hidden-page');
        form.classList.remove('active-page');
    });

    // Tıklanan sayfayı aktif hale getir
    const page = document.getElementById(pageName + 'FormContainer');
    page.classList.add('active-page');
    page.classList.remove('hidden-page');
}

// Okul Kaydını Yap
document.getElementById('okulKayitForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const schoolName = document.getElementById('schoolName').value;
    const schoolPassword = document.getElementById('schoolPassword').value;
    const schoolProvince = document.getElementById('schoolProvince').value;
    const schoolDistrict = document.getElementById('schoolDistrict').value;
    
    localStorage.setItem('school', JSON.stringify({
        schoolName, schoolPassword, schoolProvince, schoolDistrict
    }));

    alert("Okul kaydınız başarıyla tamamlandı.");
    openPage('ogrenciKayit');
});

// Öğrenci Kaydını Yap
document.getElementById('ogrenciKayitForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const studentName = document.getElementById('studentName').value;
    const studentSurname = document.getElementById('studentSurname').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const studentNumber = document.getElementById('studentNumber').value;
    const studentPhone = document.getElementById('studentPhone').value;
    const studentClass = document.getElementById('studentClass').value;
    
    localStorage.setItem(studentEmail, JSON.stringify({
        studentName, studentSurname, studentEmail, studentNumber, studentPhone, studentClass, points: 0, title: 'Çevreci Aday'
    }));

    alert("Öğrenci kaydınız başarıyla tamamlandı.");
    openPage('dataEntry');
});

// Veri Girişi
document.getElementById('dataEntryForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const studentNumber = document.getElementById('studentNumberEntry').value;
    const wasteType = document.getElementById('wasteType').value;
    const wasteWeight = document.getElementById('wasteWeight').value;
    const enteredBy = document.getElementById('enteredBy').value;

    const studentEmail = prompt("Öğrencinin E-posta adresini girin:");

    if (!studentEmail || !localStorage.getItem(studentEmail)) {
        alert("Öğrenci bulunamadı.");
        return;
    }

    const studentData = JSON.parse(localStorage.getItem(studentEmail));

    // Kredi hesaplama
    const credit = calculateCredit(wasteWeight, wasteType);
    studentData.points += credit;

    // Unvan güncelleme
    studentData.title = getStudentTitle(studentData.points);

    // Veriyi kaydet
    localStorage.setItem(studentEmail, JSON.stringify(studentData));

    alert(`${wasteType} için ${credit} kredi eklendi. Öğrencinin yeni unvanı: ${studentData.title}`);
});

// Kredi Hesaplama Fonksiyonu
function calculateCredit(weight, type) {
    let creditPerKg;

    switch(type) {
        case "Yağ":
            creditPerKg = 5;
            break;
        case "Tekstil":
            creditPerKg = 3;
            break;
        case "Pil":
            creditPerKg = 10;
            break;
        case "Elektronik":
            creditPerKg = 20;
            break;
        case "Kağıt":
            creditPerKg = 2;
            break;
        case "Cam":
            creditPerKg = 4;
            break;
        case "Metal":
            creditPerKg = 6;
            break;
        case "Plastik":
            creditPerKg = 3;
            break;
        default:
            creditPerKg = 0;
    }

    return creditPerKg * weight;
}

// Öğrenci Unvanını Güncelle
function getStudentTitle(points) {
    if (points < 10) return "Çevreci Aday"; // Eco Candidate
    if (points < 30) return "Yeşil Savaşçı"; // Green Warrior
    if (points < 60) return "Doğa Kahramanı"; // Nature Hero
    return "Ekolojik Lider"; // Ecological Leader
}

// Veri Görüntüleme
document.getElementById('viewDataForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const viewEmail = document.getElementById('viewStudentEmail').value;
    const viewNumber = document.getElementById('viewStudentNumber').value;

    const studentData = JSON.parse(localStorage.getItem(viewEmail));

    if (!studentData || studentData.studentNumber !== viewNumber) {
        alert("Geçersiz e-posta veya öğrenci numarası.");
        return;
    }

    const resultHTML = `
        <p><strong>Adı:</strong> ${studentData.studentName} ${studentData.studentSurname}</p>
        <p><strong>Öğrenci Numarası:</strong> ${studentData.studentNumber}</p>
        <p><strong>Sınıf:</strong> ${studentData.studentClass}</p>
        <p><strong>Toplam Kredi:</strong> ${studentData.points}</p>
        <p><strong>Unvan:</strong> ${studentData.title}</p>
        <p><strong>Telefon Numarası:</strong> ${studentData.studentPhone}</p>
    `;
    
    document.getElementById('viewResult').innerHTML = resultHTML;
});

// Sayfa Geçişi - Menü Linklerine Tıklandığında
function openPage(pageName) {
    // Tüm form container'ları gizle
    document.querySelectorAll('.form-container').forEach(form => {
        form.classList.add('hidden-page');
        form.classList.remove('active-page');
    });

    // Tıklanan sayfayı aktif hale getir
    const page = document.getElementById(pageName + 'FormContainer');
    page.classList.add('active-page');
    page.classList.remove('hidden-page');
}

// Okul Kaydını Yap
document.getElementById('okulKayitForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const schoolName = document.getElementById('schoolName').value;
    const schoolPassword = document.getElementById('schoolPassword').value;
    const schoolProvince = document.getElementById('schoolProvince').value;
    const schoolDistrict = document.getElementById('schoolDistrict').value;
    
    localStorage.setItem('school', JSON.stringify({
        schoolName, schoolPassword, schoolProvince, schoolDistrict
    }));

    alert("Okul kaydınız başarıyla tamamlandı.");
    openPage('ogrenciKayit');
});
