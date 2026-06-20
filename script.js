document.addEventListener("DOMContentLoaded", () => {
    const skyBackground = document.querySelector(".sky-background");
    const milkyWayScene = document.querySelector("#scene-milkyway");
    const milkyWayArt = document.querySelector(".milkyway-art");

    // Ekran yüksekliğini alalım
    const screenHeight = window.innerHeight;

    // [YAĞ GİBİ AKAN AKICILIK İÇİN ÇÖZÜM] 
    // Sahneler ters dizildiği için, ilk açılışta tarayıcıyı zorla en alttaki Gün Batımı (Bank) sahnesine odaklıyoruz.
    // Artık JavaScript ters çevirme yapmadığı için tarayıcının doğal ivmesi (akıcılığı) geri geldi!
    const benchScene = document.querySelector("#scene-bench");
    if (benchScene) {
        benchScene.scrollIntoView({ behavior: "auto", block: "end" });
    }

    // Arka plan renginin süzülerek (pürüzsüz) değişmesi için CSS ekliyoruz
    if (skyBackground) {
        skyBackground.style.transition = "background 1.5s ease-in-out, background-color 1.5s ease-in-out";
    }
    document.body.style.transition = "background-color 1.5s ease-in-out";

    /* ========================================================
       DİNAMİK RENKLER VE SAMANYOLU ZOOM EFEKTİ
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
            // En Üstteki Final (Cennetin İzdüşümü): Küt beyazlık iptal! 
            // Başlangıçtaki gibi sıcacık, romantik turuncu tonu!
            skyBackground.style.background = "linear-gradient(to top, #2c3e50, #ff7e5f, #feb47b)";
            document.body.style.backgroundColor = "#feb47b";
        }

        /* [GERİ GELDİ] SAMANYOLU ZOOM (ZOOM-OUT) EFEKTİ */
        if (milkyWayScene) {
            const milkyWayRect = milkyWayScene.getBoundingClientRect();
            if (milkyWayRect.top < screenHeight && milkyWayRect.bottom > 0) {
                const visibleProgress = (screenHeight - milkyWayRect.top) / screenHeight;
                // Ölçeği 2.5 kat büyüklükten 1 kat büyüklüğe doğru pürüzsüzce düşür
                const scaleValue = Math.max(1, 2.5 - (visibleProgress * 1.5));
                
                if (milkyWayArt) {
                    milkyWayArt.style.transform = `scale(${scaleValue})`;
                    milkyWayArt.style.transition = "transform 0.1s ease-out";
                }
            }
        }
    });
});
