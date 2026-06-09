document.addEventListener('DOMContentLoaded', () => {

    const splashScreen = document.getElementById('splash-screen');
    const viewLogin = document.getElementById('view-login');
    const viewMain = document.getElementById('view-main');
    const loginForm = document.getElementById('login-form');
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    const cbtModal = document.getElementById('cbt-modal');
    const btnStartCbt = document.getElementById('btn-start-cbt');
    const btnCloseCbt = document.getElementById('btn-close-cbt');

    // ================= TOAST NOTIFIKASI =================
    function showToast(message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        toast.className = `bg-slate-800 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center justify-between toast-enter border border-slate-700`;
        toast.innerHTML = `
            <span class="text-xs font-semibold">${message}</span>
            <i class="fa-solid fa-check-circle text-green-400"></i>
        `;
        
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.replace('toast-enter', 'toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ================= SPLASH SCREEN & LOGIN =================
    setTimeout(() => {
        splashScreen.classList.add('opacity-0');
        setTimeout(() => {
            splashScreen.classList.add('hidden');
        }, 500);
    }, 1500);

    // Mencegah dua tampilan muncul bersamaan (Bug Fixing)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const btn = loginForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memuat...';
        
        setTimeout(() => {
            // Sembunyikan halaman login sepenuhnya
            viewLogin.classList.add('hidden');
            viewLogin.classList.remove('flex');
            
            // Tampilkan halaman utama sepenuhnya
            viewMain.classList.remove('hidden');
            viewMain.classList.add('flex');
            
            btn.innerHTML = originalText;
        }, 800);
    });

    document.getElementById('btn-logout').addEventListener('click', () => {
        // Kembalikan ke halaman login
        viewMain.classList.add('hidden');
        viewMain.classList.remove('flex');
        
        viewLogin.classList.remove('hidden');
        viewLogin.classList.add('flex');
        
        // Reset tab ke posisi Home
        switchTab('tab-home');
        resetNavButtons(navButtons[0]);
    });

    // ================= NAVIGASI TAB BAWAH =================
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            switchTab(targetId);
            resetNavButtons(btn);
        });
    });

    function switchTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('block');
            content.classList.add('hidden');
        });
        document.getElementById(tabId).classList.remove('hidden');
        document.getElementById(tabId).classList.add('block');
    }

    function resetNavButtons(activeBtn) {
        navButtons.forEach(b => {
            b.classList.remove('active', 'text-blue-600');
            b.classList.add('text-gray-400');
        });
        activeBtn.classList.add('active', 'text-blue-600');
        activeBtn.classList.remove('text-gray-400');
    }

    // ================= MODAL TRYOUT (CBT) =================
    btnStartCbt.addEventListener('click', () => {
        cbtModal.classList.remove('hidden');
        // Sedikit delay agar animasi transisi CSS terbaca
        setTimeout(() => cbtModal.classList.add('modal-open'), 50);
    });

    btnCloseCbt.addEventListener('click', () => {
        cbtModal.classList.remove('modal-open');
        setTimeout(() => cbtModal.classList.add('hidden'), 300);
    });

    // ================= SIMULASI PRESENSI =================
    document.getElementById('btn-manual-absen').addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Membaca Lokasi...';
        setTimeout(() => {
            this.innerHTML = originalText;
            showToast('Presensi Anda berhasil tersimpan!');
        }, 1500);
    });
});
