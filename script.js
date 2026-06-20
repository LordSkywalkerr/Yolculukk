document.addEventListener("DOMContentLoaded", () => {
    const skyBackground = document.querySelector(".sky-background");
    const milkyWayScene = document.querySelector("#scene-milkyway");
    const milkyWayArt = document.querySelector(".milkyway-art");
    const adenScene = document.querySelector("#scene-aden");

    // Telefonun ekran yüksekliğini alalım
    const screenHeight = window.innerHeight;

    window.addEventListener("scroll", () => {
        // Kullanıcının ne kadar kaydırdığını piksel olarak alıyoruz
        const scrollTop = window.scrollY;
        
        // Toplam kaydırma oranını yüzdeye çeviriyoruz (0 ile 100 arası)
        const totalHeight = document.documentElement.scrollHeight - screenHeight;
        const scrollPercent = (scrollTop / totalHeight) * 100;

        /* ========================================================
           1. DİNAMİK GÖKYÜZÜ RENK GEÇİŞLERİ (GRADIENT SHIFT)
           ======================================================== */
        if (scrollPercent < 15) {
            // Başlangıç: Romantik Gün Batımı
            skyBackground.style.background = "linear-gradient(to top, #ff7e5f, #feb47b, #2c3e50)";
        } 
        else if (scrollPercent >= 15 && scrollPercent < 35) {
            // Bulutlardan çıkış: Geceye geçiş mavisi
            skyBackground.style.background = "linear-gradient(to top, #1f1c2c, #0b0914)";
        } 
        else if (scrollPercent >= 35 && scrollPercent < 75) {
            // Uzay Boyu (Gezegenler, Güneş, Sirius): Derin Uzay Siyahı
            skyBackground.style.background = "linear-gradient(to top, #000000, #0b0914)";
        } 
        else if (scrollPercent >= 75 && scrollPercent < 92) {
            // Samanyolu ve Onun Yıldızı: Şafak söküyor, pembe/mavi alacakaranlık
            skyBackground.style.background = "linear-gradient(to top, #2c3e50, #fd746c)";
        }
       else {
            // Aden Bahçesi: Tamamen aydınlık beyaza pürüzsüz geçiş
            skyBackground.style.background = "#ffffff";
        }

        /* ========================================================
           2. SAMANYOLU UZAKLAŞMA (ZOOM-OUT) EFEKTİ
           ======================================================== */
        // Samanyolu sahnesinin ekrana olan mesafesini hesaplayalım
        const milkyWayRect = milkyWayScene.getBoundingClientRect();
        
        // Eğer Samanyolu sahnesi telefonun ekranına girmeye başladıysa
        if (milkyWayRect.top < screenHeight && milkyWayRect.bottom > 0) {
            // Sahne merkezine yaklaştıkça küçülen (zoom out olan) bir çarpan hesapla
            const visibleProgress = (screenHeight - milkyWayRect.top) / screenHeight;
            // Ölçeği 2.5 kat büyüklükten (yakın) 1 kat büyüklüğe (uzak) doğru düşür
            const scaleValue = Math.max(1, 2.5 - (visibleProgress * 1.5));
            
            if (milkyWayArt) {
                milkyWayArt.style.transform = `scale(${scaleValue})`;
                milkyWayArt.style.transition = "transform 0.1s ease-out";
            }
        }

       /* ========================================================
           3. ADEN BAHÇESİNE GEÇİŞ (PARLAMA EFEKTİ)
           ======================================================== */
        const adenRect = adenScene.getBoundingClientRect();
        // Ekrana iyice girdiğinde (ekranın %70'ine ulaştığında) arka planı beyaza çevir
        if (adenRect.top < screenHeight * 0.7) {
            document.body.style.backgroundColor = "#ffffff";
        } else {
            document.body.style.backgroundColor = "#0b0914";
        }
    });
});
