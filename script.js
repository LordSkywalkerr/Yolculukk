document.addEventListener("DOMContentLoaded", () => {
    const skyBackground = document.querySelector(".sky-background");
    const milkyWayScene = document.querySelector("#scene-milkyway");
    const milkyWayArt = document.querySelector(".milkyway-art");

    const screenHeight = window.innerHeight;

    // Site açıldığında direkt en alttaki Gün Batımı sahnesine odaklan
    setTimeout(() => {
        const benchScene = document.querySelector("#scene-bench");
        if (benchScene) {
            benchScene.scrollIntoView({ behavior: "auto", block: "end" });
        }
    }, 100);

    if (skyBackground) {
        skyBackground.style.transition = "background 1.2s ease-in-out, background-color 1.2s ease-in-out";
    }
    document.body.style.transition = "background-color 1.2s ease-in-out";

    /* ========================================================
       1. AKICI VE YAĞ GİBİ AKAN TERS KAYDIRMA MEKANİZMASI
       ======================================================== */

    // Bilgisayarda: Tekerlek hareketi
    window.addEventListener("wheel", (event) => {
        event.preventDefault();
        if (event.deltaY < 0) {
            window.scrollBy({ top: 180, behavior: "smooth" }); // Adım mesafesini biraz artırdık
        } else if (event.deltaY > 0) {
            window.scrollBy({ top: -180, behavior: "smooth" });
        }
    }, { passive: false });

    // Telefonda: [YENİ] Ağırlaşmayı çözen, ivmeli ve akıcı dokunmatik sistemi
    let touchStartY = 0;

    window.addEventListener("touchstart", (event) => {
        touchStartY = event.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchmove", (event) => {
        let touchEndY = event.touches[0].clientY;
        let touchDifference = touchStartY - touchEndY;

        // Ekranda parmağı aşağı doğru çekerken (touchDifference < 0) yukarıdaki sahneler aşağı iner
        if (touchDifference < 0) {
            // "smooth" behavior ekleyerek telefonun donma hissini kaldırdık ve kaydırmayı yumuşattık
            window.scrollBy({ top: Math.abs(touchDifference) * 2.5, behavior: "smooth" });
        } else if (touchDifference > 0) {
            window.scrollBy({ top: -Math.abs(touchDifference) * 2.5, behavior: "smooth" });
        }
        
        touchStartY = touchEndY;
    }, { passive: false }); // Hassas yön kontrolü için passive: false yaptık


    /* ========================================================
       2. DİNAMİK RENKLER VE SAMANYOLU EFEKTİ
       ======================================================== */
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - screenHeight;
        const scrollPercent = (scrollTop / totalHeight) * 100;

        if (scrollPercent > 85) {
            skyBackground.style.background = "linear-gradient(to top, #ff7e5f, #feb47b, #2c3e50)";
            document.body.style.backgroundColor = "#0b0914";
        } 
        else if (scrollPercent <= 85 && scrollPercent > 65) {
            skyBackground.style.background = "linear-gradient(to top, #1f1c2c, #0b0914)";
        } 
        else if (scrollPercent <= 65 && scrollPercent > 30) {
            skyBackground.style.background = "linear-gradient(to top, #000000, #0b0914)";
        } 
        else if (scrollPercent <= 30 && scrollPercent > 12) {
            skyBackground.style.background = "linear-gradient(to top, #2c3e50, #fd746c)";
            document.body.style.backgroundColor = "#0b0914";
        }
        else {
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
