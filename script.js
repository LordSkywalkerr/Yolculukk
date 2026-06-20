document.addEventListener("DOMContentLoaded", () => {
    const skyBackground = document.querySelector(".sky-background");
    const milkyWayScene = document.querySelector("#scene-milkyway");
    const milkyWayArt = document.querySelector(".milkyway-art");

    // Ekran yüksekliğini alalım
    const screenHeight = window.innerHeight;

    // Arka plan geçişlerinin süzülerek, ipeksi bir yumuşaklıkla değişmesi için CSS ekliyoruz
    if (skyBackground) {
        skyBackground.style.transition = "background 1.5s ease-in-out, background-color 1.5s ease-in-out";
    }
    document.body.style.transition = "background-color 1.5s ease-in-out";

    /* ========================================================
       1. KAYDIRMA YÖNÜNÜ TAM İSTEDİĞİN GİBİ TERSİNE ÇEVİRME
       ======================================================== */

    // Bilgisayarda: Tekerleği YUKARI ittikçe sayfayı İLERİ (aşağı) götürür (Görseller yukarıdan aşağı süzülür)
    window.addEventListener("wheel", (event) => {
        event.preventDefault(); // Tarayıcının varsayılan hareketini engelle

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

        // Parmağı YUKARIDAN AŞAĞIYA çekince (touchDifference < 0) hikayede İLERİ gider
        if (touchDifference < 0) {
            window.scrollBy(0, Math.abs(touchDifference) * 1.4); // Akıcı tırmanış hassasiyeti
        } else if (touchDifference > 0) {
            window.scrollBy(0, -Math.abs(touchDifference) * 1.4);
        }
        touchStartY = touchEndY;
    }, { passive: true });


    /* ========================================================
       2. SÜZÜLEN RENKLER VE SAMANYOLU EFEKTİ
       ======================================================== */
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - screenHeight;
        const scrollPercent = (scrollTop / totalHeight) * 100;

        /* DİNAMİK GÖKYÜZÜ RENK GEÇİŞLERİ */
        if (scrollPercent < 15) {
            // Başlangıç: Romantik Gün Batımı
            skyBackground.style.background = "linear-gradient(to top, #ff7e5f, #feb47b, #2c3e50)";
            document.body.style.backgroundColor = "#0b0914";
        } 
        else if (scrollPercent >= 15 && scrollPercent < 35) {
            // Geceye geçiş mavisi
            skyBackground.style.background = "linear-gradient(to top, #1f1c2c, #0b0914)";
        } 
        else if (scrollPercent >= 35 && scrollPercent < 70) {
            // Derin Uzay Siyahı
            skyBackground.style.background = "linear-gradient(to top, #000000, #0b0914)";
        } 
        else if (scrollPercent >= 70 && scrollPercent < 88) {
            // Alacakaranlık pembeliği/mora geçiş
            skyBackground.style.background = "linear-gradient(to top, #2c3e50, #fd746c)";
            document.body.style.backgroundColor = "#0b0914";
        }
        else {
            // KÜT BEYAZLIK TAMAMEN İPTAL! 
            // Son kısım da (Cennetin İzdüşümü) tıpkı ilki gibi romantik, sıcak bir turuncu/mor gün batımı tonuna süzülüyor.
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
