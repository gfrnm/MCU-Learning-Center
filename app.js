document.addEventListener('DOMContentLoaded', () => {

    // ==== UPDATE OS CLOCK (Fake Status Bar) ====
    function updateClock() {
        const now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        document.getElementById('os-clock').innerText = `${hours}:${minutes}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // ==== ELEMEN UI ====
    const splashScreen = document.getElementById('splash-screen');
    const viewLogin = document.getElementById('view-login');
    const viewMain = document.getElementById('view-main');
    const loginForm = document.getElementById('login-form');
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // CBT Elemen
    const cbtModal = document.getElementById('cbt-modal');
    const btnStartCbt = document.getElementById('btn-start-cbt');
    const btnCloseCbt = document.getElementById('btn-close-cbt');

    // ==== FUNGSI TOAST NATIVE ====
    function showToast(message) {
        // Hapus getaran jika didukung browser
        if (navigator.vibrate) navigator.vibrate(50); 
        
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        toast.className = `bg-gray-900/95 backdrop-blur-xl text-white px-5 py-3 rounded-[1.2rem] shadow-xl flex items-center justify-between toast-enter pointer-events-auto border border-gray-700`;
        toast.innerHTML = `
            <span class="text-[13px] font-medium">${message}</span>
            <i class="fa-solid fa-check text-green-400"></i>
        `;
        
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.replace('toast-enter', 'toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ==== SPLASH SCREEN & LOGIN LOGIC ====
    setTimeout(() => {
        splashScreen.classList.add('opacity-0');
        setTimeout(() => {
            splashScreen.style.display = 'none';
            viewLogin.classList.add('active');
        }, 500);
    }, 1500);

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const btn = loginForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            viewLogin.classList.remove('active');
            viewMain.classList.remove('hidden');
            viewMain.classList.add('active');
            btn.innerHTML = originalText;
        }, 800);
    });

    document.getElementById('btn-logout').addEventListener('click', () => {
        viewMain.classList.add('hidden');
        viewMain.classList.remove('active');
        viewLogin.classList.add('active');
        switchTab('tab-home');
        
        // Reset Nav Bawah
        navButtons.forEach(b => {
            b.classList.remove('active', 'text-gray-900');
            b.classList.add('text-gray-400');
        });
        navButtons[0].classList.add('active');
        navButtons[0].classList.remove('text-gray-400');
    });

    // ==== NAVIGASI BAWAH (TAB BAR) ====
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Haptic Feedback Tiruan
            if (navigator.vibrate) navigator.vibrate(10);

            const targetId = btn.getAttribute('data-target');
            switchTab(targetId);
            
            navButtons.forEach(b => {
                b.classList.remove('active');
                b.classList.add('text-gray-400');
            });
            btn.classList.add('active');
            btn.classList.remove('text-gray-400');
        });
    });

    function switchTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.classList.add('hidden');
        });
        const targetTab = document.getElementById(tabId);
        targetTab.classList.remove('hidden');
        targetTab.classList.add('active');
    }

    // ==== CBT MODAL (SWIPE UP NATIVE EFFECT) ====
    btnStartCbt.addEventListener('click', () => {
        cbtModal.classList.add('modal-open');
    });

    btnCloseCbt.addEventListener('click', () => {
        cbtModal.classList.remove('modal-open');
    });

    // ==== SIMULASI PRESENSI ====
    document.getElementById('btn-manual-absen').addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mendeteksi Lokasi...';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            showToast('Kehadiran dicatat (Lat: -6.12, Long: 106.8)');
        }, 1500);
    });
});
