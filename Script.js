document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // CARA MENGGANTI LAGU LATAR (MUSIK):
    // Ganti teks URL di bawah dengan link file .mp3 online atau 
    // letakkan file lagu di folder yang sama lalu tulis namanya (misal: "lagu.mp3")
    // ==========================================================
    const BACKGROUND_MUSIC_URL = "music/Sad Forever.mp3";

    // 1. PIN LOCK SCREEN (Bisa diubah kodenya di sini)
    const CORRECT_PIN = "1625"; 

    // 2. KATA-KATA MOTIVASI DI BAB 8 (Bisa ditambah/diedit)
    const motivationalQuotes = [
        "\"Kegagalan kemarin hanyalah cara semesta menyuruhmu bersiap lebih matang untuk kemenangan besar di 2027.\"",
        "\"Kamu jauh lebih kuat dari keraguan yang sempat hadir di kepalamu. Tarik napas, mari mulai langkah baru\"",
        "\"Impian besarmu sangat layak diperjuangkan dua kali lipat. Aku percaya penuh dengan kapasitas dan usahamu.\"",
        "\"Setiap detik lelah belajarmu hari ini adalah investasi emas untuk kesuksesanmu tahun depan.\""
    ];

    let currentInput = "";

    // Jam Real-time
    function updateClock() {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        document.querySelectorAll('.currentTime').forEach(el => el.textContent = timeStr);

        const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
        document.querySelectorAll('.currentDate').forEach(el => el.textContent = dateStr);
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Partikel Latar Belakang
    const particlesContainer = document.getElementById('particles-container');
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.width = `${Math.random() * 4 + 2}px`;
        p.style.height = p.style.width;
        p.style.left = `${Math.random() * 100}%`;
        p.style.animationDuration = `${Math.random() * 6 + 4}s`;
        p.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(p);
    }

    // --- BAB 1: LOGIKA PIN LOCK SCREEN ---
    const pinDots = document.querySelectorAll('.pin-dot');
    const lockStatusText = document.getElementById('lockStatusText');
    const keypadBtns = document.querySelectorAll('.keypad-btn[data-value]');
    const deleteBtn = document.getElementById('deleteBtn');
    const hintBtn = document.getElementById('hintBtn');
    const hintBox = document.getElementById('hintBox');
    const unlockSuccess = document.getElementById('unlockSuccess');
    const keypadContainer = document.querySelector('.keypad-container');

    keypadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentInput.length < 4) {
                currentInput += btn.getAttribute('data-value');
                updatePinDots();
                if (currentInput.length === 4) setTimeout(checkPin, 200);
            }
        });
    });

    deleteBtn.addEventListener('click', () => {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            updatePinDots();
            lockStatusText.textContent = "Masukkan PIN rahasia untuk membuka";
            lockStatusText.classList.remove('error');
        }
    });

    hintBtn.addEventListener('click', () => hintBox.classList.toggle('hidden'));

    function updatePinDots() {
        pinDots.forEach((dot, index) => {
            if (index < currentInput.length) dot.classList.add('filled');
            else dot.classList.remove('filled', 'error');
        });
    }

    function checkPin() {
        if (currentInput === CORRECT_PIN) {
            lockStatusText.textContent = "PIN Benar! ✨";
            keypadContainer.style.display = "none";
            hintBox.classList.add('hidden');
            unlockSuccess.classList.remove('hidden');

            setTimeout(() => {
                switchBab(2);
            }, 800);
        } else {
            lockStatusText.textContent = "PIN Salah! Coba lagi ya sayang 💜";
            lockStatusText.classList.add('error');
            pinDots.forEach(dot => dot.classList.add('error'));
            setTimeout(() => {
                currentInput = "";
                updatePinDots();
            }, 600);
        }
    }

    // --- FUNGSI PINDAH SLIDE & PESAWAT KERTAS TERBANG ---
    window.switchBab = function(babNumber) {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active-page'));
        const targetPage = document.getElementById(`bab${babNumber}`);
        if (targetPage) targetPage.classList.add('active-page');
    }

    window.flyToNextBab = function(nextBabNumber) {
        const plane = document.getElementById('paperPlaneFly');
        plane.classList.add('fly-active');

        setTimeout(() => {
            plane.classList.remove('fly-active');
            switchBab(nextBabNumber);
        }, 600);
    }

    // --- BAB 2: PEMUTAR MUSIK ---
    const bgAudio = document.getElementById('bgAudio');
    bgAudio.src = BACKGROUND_MUSIC_URL;
    
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const playIcon = document.getElementById('playIcon');
    const musicStatusText = document.getElementById('musicStatusText');
    const musicIconPulse = document.querySelector('.music-icon-pulse');
    let isMusicPlaying = false;

    musicToggleBtn.addEventListener('click', () => {
        isMusicPlaying = !isMusicPlaying;
        if (isMusicPlaying) {
            bgAudio.play().catch(e => console.log("Audio play blocked:", e));
            playIcon.className = "fa-solid fa-pause";
            musicStatusText.textContent = "Musik sedang diputar...";
            musicIconPulse.classList.add('playing');
        } else {
            bgAudio.pause();
            playIcon.className = "fa-solid fa-play";
            musicStatusText.textContent = "Ketuk untuk putar musik";
            musicIconPulse.classList.remove('playing');
        }
    });

    // --- KOTAK MISTERI / SURAT TERSEMBUNYI ---
    window.openMysteryBox = function(boxElement) {
        const content = boxElement.querySelector('.mystery-content');
        content.classList.toggle('hidden');
    }

    // --- BAB 8: KOTAK MANTRA SEMANGAT ---
    const quoteBtn = document.getElementById('quoteBtn');
    const quoteBox = document.getElementById('quoteBox');
    const quoteText = document.getElementById('quoteText');

    quoteBtn.addEventListener('click', () => {
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        quoteText.textContent = randomQuote;
        quoteBox.classList.remove('hidden');
    });

    // --- BAB 10: KUNCI KEMBALI KE LOCK SCREEN ---
    document.getElementById('resetLockBtn').addEventListener('click', () => {
        currentInput = "";
        updatePinDots();
        keypadContainer.style.display = "grid";
        unlockSuccess.classList.add('hidden');
        lockStatusText.textContent = "Masukkan PIN rahasia untuk membuka";
        lockStatusText.classList.remove('error');
        
        if (isMusicPlaying) {
            bgAudio.pause();
            playIcon.className = "fa-solid fa-play";
            musicStatusText.textContent = "Ketuk untuk putar musik";
            musicIconPulse.classList.remove('playing');
            isMusicPlaying = false;
        }

        switchBab(1);
    });

});