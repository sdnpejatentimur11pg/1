// --- FUNGSI FORMATTER GLOBAL (Bisa dipakai Berita & Prestasi) ---
function formatText(text) {
    if (!text) return "";
    
    // 1. Ubah Baris Baru (Enter) menjadi <br>
    let formatted = text.replace(/\n/g, '<br>');

    // 2. Ubah *teks* menjadi Bold (Tebal)
    formatted = formatted.replace(/\*(.*?)\*/g, '<b class="text-gray-900">$1</b>');

    // 3. Ubah _teks_ menjadi Italic (Miring Merah)
    formatted = formatted.replace(/_(.*?)_/g, '<i class="text-sd-red">$1</i>');

    return formatted;
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inisialisasi Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Logic Menu Mobile (BARU)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Ganti icon menu ke silang (opsional logic simple)
            const icon = mobileMenu.classList.contains('hidden') ? 'menu' : 'x';
            mobileMenuBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
            lucide.createIcons();
        });
        
        // Tutup menu saat link diklik
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = `<i data-lucide="menu"></i>`;
                lucide.createIcons();
            });
        });
    }

    // 3. Navbar Scroll Effect (Updated untuk Navbar Merah)
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            // Saat discroll: Tambah bayangan, warna merah sedikit lebih solid
            nav.classList.add('shadow-lg', 'bg-sd-red'); 
            nav.classList.remove('bg-sd-red/95', 'shadow-md');
        } else {
            // Saat di atas: Kembali ke merah transparan
            nav.classList.remove('shadow-lg', 'bg-sd-red');
            nav.classList.add('bg-sd-red/95', 'shadow-md');
        }
    });
    
    // 4. Data Guru (DINAMIS DARI SPREADSHEET)
    let allTeachers = []; // Variabel kosong, nanti diisi oleh fetch

    async function fetchTeachers() {
        const container = document.getElementById('rotating-teachers');
        
        // Tampilkan loading sementara
        if(container) {
            container.innerHTML = '<div class="col-span-full text-center py-10"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-sd-red mx-auto"></div><p class="mt-2 text-gray-500">Memuat Data Guru...</p></div>';
        }

        try {
            // Panggil API Google Script
            const response = await fetch(`${SCRIPT_URL}?action=getTeachers`);
            allTeachers = await response.json();

            // Jika data berhasil diambil, jalankan fungsi render
            if (allTeachers && allTeachers.length > 0) {
                renderRotatingTeachers(); // Render awal
                setInterval(renderRotatingTeachers, 5000); // Mulai rotasi
            } else {
                if(container) container.innerHTML = '<p class="text-center col-span-full">Data guru belum tersedia.</p>';
            }
        } catch (e) {
            console.error("Gagal memuat data guru:", e);
            if(container) container.innerHTML = '<p class="text-center col-span-full text-red-500">Gagal memuat data.</p>';
        }
    }

    // 5. Render Guru Berputar (Dengan Animasi Soft ke Atas)
    function renderRotatingTeachers() {
        const container = document.getElementById('rotating-teachers');
        if (!container || allTeachers.length === 0) return;

        // 1. ANIMASI KELUAR (Jika sudah ada isinya)
        if (container.children.length > 0) {
            // Tambahkan class agar kartu lama bergerak ke atas & menghilang
            Array.from(container.children).forEach(card => {
                card.classList.remove('enter-active'); // Hapus posisi normal
                card.classList.add('exit-to-top');     // Gerakkan ke atas
            });

            // Tunggu 500ms (sesuai durasi CSS) baru ganti konten
            setTimeout(() => {
                injectNewTeachers(container);
            }, 500); 
        } else {
            // Jika pertama kali load (kosong), langsung isi
            injectNewTeachers(container);
        }
    }

    // Fungsi Pembantu untuk Memasukkan HTML Baru
    function injectNewTeachers(container) {
        // Randomize Guru
        const shuffled = [...allTeachers].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        container.innerHTML = '';
        
        selected.forEach((t) => {
            // Perhatikan penambahan class: 'teacher-card' dan 'enter-from-bottom'
            container.innerHTML += `
                <div class="teacher-card enter-from-bottom bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div class="w-28 h-28 mx-auto mb-6 rounded-full p-1 border-2 border-dashed border-gray-200 group-hover:border-sd-red transition-colors">
                        <img src="${t.img || 'https://ui-avatars.com/api/?name=' + t.name}" class="w-full h-full rounded-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${t.name}&background=fee2e2&color=dc2626'">
                    </div>
                    <h4 class="font-bold text-gray-900 text-lg group-hover:text-sd-red transition-colors">${t.name}</h4>
                    <p class="text-gray-500 text-sm font-semibold mt-1 uppercase tracking-wide">${t.role}</p>
                </div>`;
        });

        // Trigger Reflow (Agar browser sadar ada elemen baru sebelum animasi dimulai)
        void container.offsetWidth; 

        // 2. ANIMASI MASUK (Gerakkan ke posisi normal)
        Array.from(container.children).forEach(card => {
            card.classList.remove('enter-from-bottom'); // Hapus posisi bawah
            card.classList.add('enter-active');         // Masuk ke posisi normal
        });
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // 6. Modal Guru (Logika Filter Tetap Sama)
    window.openModal = function() {
        const modal = document.getElementById('teacher-modal');
        const modalContent = document.getElementById('modal-content');
        if (!modal) return;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';

        if (allTeachers.length === 0) {
            modalContent.innerHTML = '<p class="text-center p-10">Sedang memuat data...</p>';
            return;
        }

        let html = '';
        
        const renderSection = (title, data) => {
            if(data.length === 0) return '';
            let sectionHtml = `<div class="mb-10"><h4 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span class="w-1.5 h-6 bg-sd-red rounded-full"></span>${title}</h4><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;
            data.forEach(t => {
                sectionHtml += `
                <div class="bg-white border border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow">
                    <img src="${t.img || 'https://ui-avatars.com/api/?name=' + t.name}" class="w-14 h-14 rounded-full object-cover bg-gray-100" onerror="this.src='https://ui-avatars.com/api/?name=${t.name}&background=random'">
                    <div>
                        <p class="font-bold text-gray-900 text-sm">${t.name}</p>
                        <p class="text-xs text-sd-red font-bold uppercase tracking-wider">${t.role}</p>
                    </div>
                </div>`;
            });
            sectionHtml += `</div></div>`;
            return sectionHtml;
        };

        // Guru Kelas 1-6
        // NOTE: Pastikan di Excel menulis jabatannya mengandung kata "Kelas 1", "Kelas 2", dst.
        for (let i = 1; i <= 6; i++) {
            html += renderSection(`Guru Kelas ${i}`, allTeachers.filter(t => t.role.includes(`Kelas ${i}`)));
        }
        
        // Mapel & Staff (Filter berdasarkan kolom 'type' di Excel)
        html += renderSection('Guru Mata Pelajaran', allTeachers.filter(t => t.type === 'subject'));
        html += renderSection('Tenaga Kependidikan', allTeachers.filter(t => t.type === 'staff'));

        modalContent.innerHTML = html;
    };

    window.closeModal = function() {
        document.getElementById('teacher-modal').classList.add('hidden');
        document.getElementById('teacher-modal').classList.remove('flex');
        document.body.style.overflow = 'auto';
    };

    // Panggil Fetch saat halaman dimuat
    fetchTeachers();

    // ==========================================
    // 7. BUKU TAMU & PESAN (SISTEM MODERASI)
    // ==========================================

    // A. FETCH PESAN (Hanya yang status "Tampilkan")
    async function fetchMessages() {
        const container = document.getElementById('messages-display');
        if (!container) return;

        try {
            const response = await fetch(`${SCRIPT_URL}?action=getMessages`);
            const messages = await response.json();

            container.innerHTML = '';

            if (messages.length === 0) {
                container.innerHTML = '<p class="text-white/60 text-sm italic">Belum ada ulasan baru.</p>';
                return;
            }

            // Batasi hanya tampilkan 3 pesan terbaru agar tidak kepanjangan
            const latestMessages = messages.slice(0, 3);

            latestMessages.forEach(msg => {
                container.innerHTML += `
                <div class="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm animate-[fadeIn_0.5s_ease-out]">
                    <div class="flex justify-between items-start mb-1">
                        <p class="font-bold text-sm text-white">${msg.name}</p>
                        <span class="text-[10px] text-white/60">${msg.date}</span>
                    </div>
                    <p class="text-xs text-white/80 italic line-clamp-3">"${msg.message}"</p>
                </div>`;
            });

        } catch (e) {
            console.error("Gagal ambil pesan:", e);
        }
    }

    // B. SUBMIT PESAN (Kirim ke Database)
    const guestbookForm = document.getElementById('guestbook-form');
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = e.target.querySelector('button');
            const originalText = btn.innerHTML;
            const nameInput = document.getElementById('visitor-name');
            const msgInput = document.getElementById('visitor-message');

            // Ubah tombol jadi loading
            btn.disabled = true;
            btn.innerHTML = 'Mengirim...';

            const payload = {
                action: 'submitMessage',
                name: nameInput.value,
                message: msgInput.value
            };

            try {
                // PERUBAHAN UTAMA DI SINI (Header text/plain)
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8" 
                    }
                });

                const result = await response.json();

                if (result.status === 'success') {
                    alert("Terima kasih! Pesan Anda telah terkirim dan menunggu moderasi admin.");
                    guestbookForm.reset();
                } else {
                    throw new Error(result.message || "Gagal mengirim");
                }
                
            } catch (error) {
                alert("Gagal mengirim pesan: " + error.message);
                console.error(error);
            } finally {
                // Kembalikan tombol
                btn.disabled = false;
                btn.innerHTML = originalText;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    }

    // Panggil fetch pesan saat website dibuka
    fetchMessages();
});

// --- GOOGLE APPS SCRIPT INTEGRATION ---
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyBSUvf1e6Wg130hRsf7PMN9cod-L24xXA7NsBVputF3DPJB6p0lp9b8OJ94VGzvjEwEg/exec";
let allNewsData = [];

// Fetch News
async function fetchNews() {
    try {
        const response = await fetch(`${SCRIPT_URL}?action=getNews`);
        allNewsData = await response.json();
        
        const featuredContainer = document.getElementById('news-featured');
        const archiveList = document.getElementById('news-archive-list');

        if (!allNewsData || allNewsData.length === 0) {
            featuredContainer.innerHTML = "<p class='text-center col-span-full text-gray-500'>Belum ada informasi terbaru.</p>";
            return;
        }

        // Di dalam fetchNews()...
        
        // 3 Berita Utama
        const featured = allNewsData.slice(0, 3);
        featuredContainer.innerHTML = featured.map((n, index) => `
            <div class="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col h-full cursor-pointer" onclick="openNewsModal(${index})">
                <div class="h-48 overflow-hidden relative">
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src="${n.img || 'https://via.placeholder.com/400x250'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <span class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-sd-red z-20 shadow-sm uppercase tracking-wider">${n.date}</span>
                </div>
                <div class="p-6 flex-grow flex flex-col">
                    <h4 class="font-bold text-lg text-gray-900 mb-3 group-hover:text-sd-red transition-colors line-clamp-2">${n.title}</h4>
                    
                    <div class="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
                        ${formatText(n.content)}
                    </div>
                    
                    <div class="pt-4 border-t border-gray-50 flex items-center text-sd-red text-sm font-bold">
                        Baca Selengkapnya <i data-lucide="arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Arsip
        if (allNewsData.length > 3) {
            const archive = allNewsData.slice(3);
            archiveList.innerHTML = archive.map((n, index) => `
                <div onclick="openNewsModal(${index + 3})" class="p-4 rounded-xl hover:bg-gray-50 cursor-pointer flex justify-between items-center group transition-colors border-b border-gray-50 last:border-0">
                    <div>
                        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">${n.date}</span>
                        <h4 class="font-semibold text-gray-700 text-sm group-hover:text-sd-red line-clamp-1">${n.title}</h4>
                    </div>
                    <i data-lucide="chevron-right" class="w-4 h-4 text-gray-300 group-hover:text-sd-red"></i>
                </div>
            `).join('');
        } else {
            document.getElementById('btn-archive')?.classList.add('hidden');
        }
        lucide.createIcons();

    } catch (e) {
        console.error("Gagal load berita:", e);
    }
}

window.toggleArchive = function() {
    const section = document.getElementById('previous-news-section');
    section.classList.toggle('hidden');
    // Scroll ke section jika dibuka
    if (!section.classList.contains('hidden')) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

window.openNewsModal = function(index) {
    const news = allNewsData[index];
    const modal = document.getElementById('news-modal');
    
    document.getElementById('modal-news-img').style.backgroundImage = `url('${news.img || 'https://via.placeholder.com/400x250'}')`;
    document.getElementById('modal-news-date').innerText = news.date;
    document.getElementById('modal-news-title').innerText = news.title;
    
    // --- UPDATE DI SINI ---
    // Hapus kode lama: .innerHTML = news.content.replace(/\n/g, '<br>');
    // Ganti dengan:
    document.getElementById('modal-news-content').innerHTML = formatText(news.content);
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

window.closeNewsModal = function() {
    document.getElementById('news-modal').classList.add('hidden');
    document.getElementById('news-modal').classList.remove('flex');
    document.body.style.overflow = 'auto';
};

// Admin Logic
window.showLogin = function() { 
    const modal = document.getElementById('admin-modal');
    modal.classList.remove('hidden'); 
    modal.classList.add('flex'); 
}
window.closeAdminModal = function() { 
    document.getElementById('admin-modal').classList.add('hidden'); 
    document.getElementById('admin-modal').classList.remove('flex'); 
}

// Fungsi Login Admin
async function attemptLogin() {
    const pass = document.getElementById('admin-pass').value;
    const btn = document.querySelector('#admin-modal button');
    
    // Efek Loading
    const originalText = btn.innerText;
    btn.innerText = "Memeriksa...";
    btn.disabled = true;

    try {
        // PERUBAHAN UTAMA DI SINI (Header text/plain)
        const res = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'login', password: pass }),
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            }
        });
        
        const result = await res.json();
        
        if (result.status === 'success') {
            document.getElementById('admin-panel').classList.remove('hidden');
            closeAdminModal();
            // Kosongkan password field agar aman
            document.getElementById('admin-pass').value = ''; 
        } else {
            alert("Kata sandi salah!");
        }
    } catch(e) {
        console.error(e);
        alert("Terjadi kesalahan koneksi. Coba lagi.");
    } finally {
        // Kembalikan tombol
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

document.getElementById('add-news-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerText = "Mengirim Data...";

    const payload = {
        action: 'addNews',
        title: document.getElementById('news-title').value,
        content: document.getElementById('news-content').value,
        img: document.getElementById('news-img').value
    };

    try {
        await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
        alert("Berita berhasil diposting!");
        location.reload();
    } catch(e) {
        alert("Gagal memposting.");
        btn.disabled = false;
    }
});

// Start
fetchNews();

// --- LOGIKA PRESTASI DINAMIS ---
let allPrestasiData = [];

async function fetchPrestasi() {
    const highlightContainer = document.getElementById('prestasi-highlight');
    const listContainer = document.getElementById('prestasi-list');
    const archiveContainer = document.getElementById('prestasi-archive');
    const btnContainer = document.getElementById('btn-prestasi-container');
    
    try {
        const response = await fetch(`${SCRIPT_URL}?action=getAchievements`);
        allPrestasiData = await response.json();

        // Kosongkan container (hapus skeleton loading)
        highlightContainer.innerHTML = '';
        listContainer.innerHTML = '';

        if (!allPrestasiData || allPrestasiData.length === 0) {
            highlightContainer.innerHTML = '<div class="p-10 bg-gray-50 rounded-3xl text-center">Belum ada data prestasi.</div>';
            return;
        }

        // 1. RENDER HIGHLIGHT (Data Pertama)
        const main = allPrestasiData[0];
        highlightContainer.innerHTML = `
            <div class="group relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px] cursor-pointer hover:-translate-y-2 transition-transform duration-500">
                <img src="${main.img || 'https://via.placeholder.com/600x800'}" 
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-10">
                    <div class="bg-yellow-500 text-black font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider w-fit mb-4 flex items-center gap-1">
                        <i data-lucide="crown" class="w-3 h-3"></i> ${main.category}
                    </div>
                    <h3 class="text-white text-2xl md:text-3xl font-bold mb-2 leading-tight">${main.title}</h3>
                    
                    <div class="text-gray-300 line-clamp-3 mb-6 text-sm md:text-base leading-relaxed">
                        ${formatText(main.desc)}
                    </div>

                    <div class="text-white font-bold text-xs border-b border-yellow-500 w-fit pb-1">
                        ${main.date}
                    </div>
                </div>
            </div>`;

        // 2. RENDER LIST SAMPING
        const sideList = allPrestasiData.slice(1, 3);
        sideList.forEach(item => {
            listContainer.innerHTML += `
            <div class="bg-gray-50 p-4 rounded-3xl border border-gray-100 flex items-center gap-4 hover:bg-white hover:shadow-lg hover:border-sd-red/20 transition-all cursor-pointer group">
                <div class="w-20 h-20 flex-none rounded-2xl overflow-hidden relative shadow-sm">
                    <img src="${item.img || 'https://via.placeholder.com/200'}" class="w-full h-full object-cover group-hover:scale-110 transition-transform">
                </div>
                <div>
                    <span class="text-sd-red font-bold text-[10px] uppercase tracking-wide bg-sd-red/10 px-2 py-0.5 rounded-md mb-1 inline-block">${item.category}</span>
                    <h4 class="font-bold text-base text-gray-900 group-hover:text-sd-red transition-colors line-clamp-1">${item.title}</h4>
                    
                    <div class="text-xs text-gray-500 mt-1 line-clamp-2">
                        ${formatText(item.desc)}
                    </div>
                </div>
            </div>`;
        });

        // 3. RENDER ARSIP (Jika ada)
        if (allPrestasiData.length > 3) {
            // ... kode tombol ...
            const archiveList = allPrestasiData.slice(3);
            archiveList.forEach(item => {
                archiveContainer.innerHTML += `
                <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                    <div class="h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <div class="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm">${item.date}</div>
                        <img src="${item.img || 'https://via.placeholder.com/400'}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <span class="text-sd-red font-bold text-xs uppercase">${item.category}</span>
                    <h4 class="font-bold text-lg mt-1 mb-2 group-hover:text-sd-red transition-colors">${item.title}</h4>
                    
                    <div class="text-gray-500 text-sm line-clamp-3">
                        ${formatText(item.desc)}
                    </div>
                </div>`;
            });
        }

        lucide.createIcons();
    } catch (e) {
        console.error("Gagal load prestasi:", e);
    }
}

// Fungsi Toggle Tombol "Lihat Lainnya"
window.togglePrestasiArchive = function() {
    const archive = document.getElementById('prestasi-archive');
    const btnText = document.querySelector('#btn-prestasi-more span');
    const icon = document.querySelector('#btn-prestasi-more i');

    if (archive.classList.contains('hidden')) {
        archive.classList.remove('hidden');
        btnText.innerText = "Tutup Prestasi Lainnya";
        icon.setAttribute('data-lucide', 'chevron-up');
    } else {
        archive.classList.add('hidden');
        btnText.innerText = "Lihat Prestasi Lainnya";
        icon.setAttribute('data-lucide', 'chevron-down');
        // Scroll kembali ke atas section prestasi agar rapi
        document.getElementById('prestasi').scrollIntoView({behavior: 'smooth'});
    }
    lucide.createIcons();
};

// Panggil fungsi saat load
fetchPrestasi();

async function updateVisitorCount() {
    const counterElement = document.getElementById('visitor-count');
    if(!counterElement) return;

    try {
        // Panggil script dengan action trackVisit
        const response = await fetch(`${SCRIPT_URL}?action=trackVisit`);
        const data = await response.json();
        
        if (data.status === 'success') {
            // Format angka (contoh: 1.200)
            counterElement.innerText = new Intl.NumberFormat('id-ID').format(data.count);
        }
    } catch (e) {
        console.error("Gagal memuat statistik", e);
        counterElement.innerText = "-";
    }
}

// Panggil fungsi ini saat halaman dimuat
updateVisitorCount();
