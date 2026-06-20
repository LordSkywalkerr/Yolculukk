document.addEventListener("DOMContentLoaded", () => {
    const skyBackground = document.querySelector(".sky-background");
    const milkyWayScene = document.querySelector("#scene-milkyway");
    const milkyWayArt = document.querySelector(".milkyway-art");
    const adenScene = document.querySelector("#scene-aden");

    // Ekran yüksekliğini alalım
    const screenHeight = window.innerHeight;

    // Arka plan renginin küt diye değil, süzülerek (pürüzsüz) değişmesi için CSS ekliyoruz
    if (skyBackground) {
        skyBackground.style.transition = "background 1.5s ease, background-color 1.5s ease";
    }
    document.body.style.transition = "background-color 1.5s ease";

    /* ========================================================
       TAM İSTEDİĞİN YÖN: PARMAĞI YUKARI İTTİKÇE İLERLEME
       ======================================================== */

    // 1. Bilgisayarda: Tekerleği AŞAĞI çevirdikçe (klasik) hikayede İLERİ gider
    window.addEventListener("wheel", (event) => {
        event.preventDefault(); // Varsayılanı engelle

        if (event.deltaY > 0) {
            // Tekerlek aşağı -> Hikayede İLERİ git
            window.scrollBy({ top: 150, behavior: "smooth" });
        } else if (event.deltaY < 0) {
            // Tekerlek yukarı -> Hikayede GERİ git
            window.scrollBy({ top: -150, behavior: "smooth" });
        }
    }, { passive: false });

    // 2. Telefonda: Parmağı AŞAĞI KAVRAYIP YUKARI İTTİKÇE (klasik) hikayede İLERİ gider
    let touchStartY = 0;
    window.addEventListener("touchstart", (event) => {
        touchStartY = event.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchmove", (event) => {
        let touchEndY = event.touches[0].clientY;
        let touchDifference = touchStartY - touchEndY;

        // touchDifference > 0 demek parmağını yukarı doğru itiyorsun demektir (Instagram mantığı)
        if (touchDifference > 0) {
            // Parmağı yukarı itti -> Hikayede İLERİ git
            window.scrollBy(0, Math.abs(touchDifference) * 1.2);
        } else if (touchDifference < 0) {
            // Parmağı aşağı çekti -> Hikayede GERİ git
            window.scrollBy(0, -Math.abs(touchDifference) * 1.2);
        }
        touchStartY = touchEndY;
    }, { passive: true });


    /* ========================================================
       EFEKTLER VE YUMUŞATILMIŞ PARLAMA SİSTEMİ
       ======================================================== */
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - screenHeight;
        const scrollPercent = (scrollTop / totalHeight) * 100;

        /* 1. DİNAMİK GÖKYÜZÜ RENK GEÇİŞLERİ */
        if (scrollPercent < 15) {
            skyBackground.style.background = "linear-gradient(to top, #ff7e5f, #feb47b, #2c3e50)";
        } 
        else if (scrollPercent >= 15 && scrollPercent < 35) {
            skyBackground.style.background = "linear-gradient(to top, #1f1c2c, #0b0914)";
        } 
        else if (scrollPercent >= 35 && scrollPercent < 70) {
            skyBackground.style.background = "linear-gradient(to top, #000000, #0b0914)";
        } 
        else if (scrollPercent >= 70 && scrollPercent < 88) {
            skyBackground.style.background = "linear-gradient(to top, #2c3e50, #fd746c)";
            document.body.style.backgroundColor = "#0b0914"; // Uzay siyahı tabanı
        }
        else {
            // Son düzlükte beyaza pürüzsüz geçiş tetikleniyor
            skyBackground.style.background = "#ffffff";
            document.body.style.backgroundColor = "#ffffff";
        }

        /* 2. SAMANYOLU UZAKLAŞMA (ZOOM-OUT) EFEKTİ */
        const milkyWayRect = milkyWayScene.getBoundingClientRect();
        if (milkyWayRect.top < screenHeight && milkyWayRect.bottom > 0) {
            const visibleProgress = (screenHeight - milkyWayRect.top) / screenHeight;
            const scaleValue = Math.max(1, 2.5 - (visibleProgress * 1.5));
            
            if (milkyWayArt) {
                milkyWayArt.style.transform = `scale(${scaleValue})`;
                milkyWayArt.style.transition = "transform 0.1s ease-out";
            }
        }
    });
});
