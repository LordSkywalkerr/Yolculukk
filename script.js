document.addEventListener("DOMContentLoaded", () => {
    const skyBackground = document.querySelector(".sky-background");
    const milkyWayScene = document.querySelector("#scene-milkyway");
    const milkyWayArt = document.querySelector(".milkyway-art");

    // Ekran yüksekliğini alalım
    const screenHeight = window.innerHeight;

    // [KRİTİK ÇÖZÜM] Site ilk açıldığında direkt en alttaki Gün Batımı sahnesine odaklan!
    setTimeout(() => {
        const benchScene = document.querySelector("#scene-bench");
        if (benchScene) {
            benchScene.scrollIntoView({ behavior: "auto", block: "end" });
        }
    }, 100); // Tarayıcının sayfayı yükleyip boyutu algılaması için küçük bir gecikme

    // Arka plan geçişlerinin ipeksi bir yumuşaklıkla değişmesi için CSS ekliyoruz
    if (skyBackground) {
        skyBackground.style.transition = "background 1.5s ease-in-out, background-color 1.5s ease-in-out";
    }
    document.body.style.transition = "background-color 1.5s ease-in-out";

    /* ========================================================
       1. DOĞAL HAREKET: PARMAĞI AŞAĞI ÇEKTİKÇE YUKARIDAKİLER İNER
       ======================================================== */

    // Bilgisayarda: Tekerleği YUKARI ittikçe sayfayı İLERİ (aşağı) götürür
    window.addEventListener("wheel", (event) => {
        event.preventDefault();

        if (event.deltaY < 0) {
            // Tekerlek yukarı -> Hikayede İLERİ git (Aşağı kaydır)
            window.scrollBy({ top: 140, behavior: "smooth" });
        } else if (event.deltaY > 0) {
            // Tekerlek aşağı -> Hikayede GERİ git (Yukarı kaydır)
            window.scrollBy({ top: -140, behavior: "smooth" });
        }
    }, { passive: false });

    // Telefonda: Parmağını YUKARIDAN AŞAĞIYA çektikçe sayfayı İLERİ (aşağı) götürür
    let touchStartY = 0;
    window.addEventListener("touchstart", (event) => {
        touchStartY = event.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchmove", (event) => {
        let touchEndY = event.touches[0].clientY;
        let touchDifference = touchStartY - touchEndY;

        if (touchDifference < 0) {
            // Parmağı aşağı çekti -> Hikayede İLERİ git (Aşağı kaydır)
            window.scrollBy(0, Math.abs(touchDifference) * 1.4);
        } else if (touchDifference > 0) {
            // Parmağı yukarı itti -> Hikayede GERİ git (Yukarı kaydır)
            window.scrollBy(0, -Math.abs(touchDifference) * 1.4);
        }
        touchStartY = touchEndY;
    }, { passive: true });


    /* ========================================================
       2. REZİVE EDİLMİŞ DİNAMİK RENKLER VE SAMANYOLU EFEKTİ
       ======================================================== */
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - screenHeight;
        const scrollPercent = (scrollTop / totalHeight) * 100;

        // Yön ters döndüğü için yüzdelikleri tırmanış sırasına göre eşitledik
        if (scrollPercent > 85) {
            // En Alttaki Başlangıç: Romantik Gün Batımı (Bank Sahnesi)
            skyBackground.style.background = "linear-gradient(to top, #ff7e5f, #feb47b, #2c3e50)";
            document.body.style.backgroundColor = "#0b0914";
        } 
        else if (scrollPercent <= 85 && scrollPercent > 65) {
            // Bulutlar Sahnesi: Geceye geçiş mavisi
            skyBackground.style.background = "linear-gradient(to top, #1f1c2c, #0b0914)";
        } 
        else if (scrollPercent <= 65 && scrollPercent > 30) {
            // Uzay Boyu (Ay, Venüs, Mars, Güneş, Sirius): Derin Uzay Siyahı
            skyBackground.style.background = "linear-gradient(to top, #000000, #0b0914)";
        } 
        else if (scrollPercent <= 30 && scrollPercent > 12) {
            // Samanyolu ve Onun Fotoğrafı: Alacakaranlık mor/pembe geçişi
            skyBackground.style.background = "linear-gradient(to top, #2c3e50, #fd746c)";
            document.body.style.backgroundColor = "#0b0914";
        }
        else {
            // En Üstteki Final (Cennetin İzdüşümü): Başlangıçtaki gibi sıcacık, romantik turuncu tonu!
            skyBackground.style.background = "linear-gradient(to top, #2c3e50, #ff7e5f, #feb47b)";
            document.body.style.backgroundColor = "#feb47b";
        }

        /* SAMANYOLU UZAKLAŞMA (ZOOM-OUT) EFEKTİ */
        if (milkyWayScene) {
            const milkyWayRect = milkyWayScene.getBoundingClientRect();
            if (milkyWayRect.top < screenHeight && milkyWayRect.bottom > 0) {
                const visibleProgress = (screenHeight - milkyWayRect.top) / screenHeight;
                const scaleValue = Math.max(1, 2.5 - (visibleProgress * 1.5));
                
                if (milkyWayArt) {
                    milkyWayArt.style.transform = `scale(${scaleValue})`;
                    milkyWayArt.style.transition = "transform 0.1s ease-out";
                }
            }
        }
    });
});
