document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inisialisasi Ikon Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Database Guru & Staff Lengkap
    const allTeachers = [
        // Guru Kelas
        { name: "Cicik Mulki Ijati, S.Pd.", role: "Guru Kelas 1A", type: "teacher", img: "https://lh3.googleusercontent.com/d/110uFs58y3lwVdsYaKlqgCpPNG6TCn-OM" },
        { name: "Dewi Iriani, S.Pd.", role: "Guru Kelas 1B", type: "teacher", img: "https://lh3.googleusercontent.com/d/1hxV4g803gXEWNi8LvDxdlynWTkWf9b1V" },
        { name: "Nofiah Diana, S.Pd.", role: "Guru Kelas 1C", type: "teacher", img: "https://lh3.googleusercontent.com/d/1GcCrzR2gT47_mhbACJouemI5sIL3banx" },
        { name: "Nur Fadilah, S.Pd.", role: "Guru Kelas 2A", type: "teacher", img: "https://lh3.googleusercontent.com/d/14nbCm4cqr8bNZ8nAroGLFmK2y1VIUjTD" },
        { name: "Fiqra Haninditha", role: "Guru Kelas 2B", type: "teacher", img: "https://lh3.googleusercontent.com/d/1WlQr4pwxw76s97j0eg6TyF3u6LIH_7VI" },
        { name: "Wuri Utami, S.Pd.", role: "Guru Kelas 3A", type: "teacher", img: "https://lh3.googleusercontent.com/d/1E9q9sKR3v8rl2f9y5Lxb3n90naWKNBSH" },
        { name: "Nurul Maghfirah, S.Pd.", role: "Guru Kelas 3B", type: "teacher", img: "https://ui-avatars.com/api/?name=Nurul+Maghfirah&background=fecaca&color=A52A2A" },
        { name: "Rosari Indah, S.Pd.", role: "Guru Kelas 3C", type: "teacher", img: "https://lh3.googleusercontent.com/d/1khxu5hmEuplCxQ8Q2NAXTTwZK0y9kLQ6" },
        { name: "Raida, S.Pd.", role: "Guru Kelas 4A", type: "teacher", img: "https://lh3.googleusercontent.com/d/1FnKxAvGz4vABRI139LNv4mTn7_ScycOu" },
        { name: "Siti Nurasiah, S.Pd.", role: "Guru Kelas 4B", type: "teacher", img: "https://lh3.googleusercontent.com/d/1rAaPFvD32VMBS3U7KoBYscW244hm9SzI" },
        { name: "Tuti Rohita, S.Pd.", role: "Guru Kelas 4C", type: "teacher", img: "https://lh3.googleusercontent.com/d/1yUkBDg1jcNPX-DOj_aNvFri1LAn3Cvs_" },
        { name: "Waryanti, S.Pd.", role: "Guru Kelas 5A", type: "teacher", img: "https://lh3.googleusercontent.com/d/1Urwli-zxecgLKF25BxkfDlz8iZxB2zJV" },
        { name: "Listia Ningsih, S.Pd.", role: "Guru Kelas 5B", type: "teacher", img: "https://lh3.googleusercontent.com/d/1Ztuc89l1w0c9E0WIp3TvLeoluGHE-3RF" },
        { name: "Faniyyatu Syifail Qolby, S.Pd.", role: "Guru Kelas 5C", type: "teacher", img: "https://ui-avatars.com/api/?name=Faniyyatu+Syifail+Qolby&background=fecaca&color=A52A2A" },
        { name: "Amri Nasrulloh, S.Pd.", role: "Guru Kelas 6A", type: "teacher", img: "https://lh3.googleusercontent.com/d/1_eD4krfAy5Vi0tItAZPUofHkIQvte3Ml" },
        { name: "Banjar Amrullah, S.Pd.", role: "Guru Kelas 6B", type: "teacher", img: "https://lh3.googleusercontent.com/d/1aXUDyoX9wCNZao8uErnJUN_Xkz5o39Qv" },
        { name: "Shabrina Awanis, S.Pd.", role: "Guru Kelas 6C", type: "teacher", img: "https://lh3.googleusercontent.com/d/1wuyp26XfeBUhLGRVFXoO8TGJhjoXEz6S" },
        { name: "Didik Rahmadi, S.Pd.", role: "Guru Kelas 6D", type: "teacher", img: "https://lh3.googleusercontent.com/d/10c79L5Mtm4n15AdxhDISsqF3UQA2v7Sg" },
        // Guru Mata Pelajaran
        { name: "M. Sahari, S.Pd.I.", role: "Guru Pendidikan Agama Islam", type: "subject", img: "https://lh3.googleusercontent.com/d/1-KFdAlFVBH58mQbRzkaBeDDyYCRZv3Vp" },
        { name: "Maimunah, S.Pd.I.", role: "Guru Pendidikan Agama Islam", type: "subject", img: "https://lh3.googleusercontent.com/d/1J1itUg0pbdTmdR-qPuizp-kcwotnHVWd" },
        { name: "M. Gilang G., S.Pd.", role: "Guru Olahraga", type: "subject", img: "https://lh3.googleusercontent.com/d/1cuW7NfceUF9UiNPqm7RpYQLitUaf_MH5" },
        { name: "Iis Yudiani", role: "Guru Olahraga", type: "subject", img: "https://ui-avatars.com/api/?name=Iis+Yudiani&background=fecaca&color=A52A2A" },
        // Staff
        { name: "M. Dary Ammar", role: "Operator Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/1lG13UjQhtM5AQamrBwkftcGS_InrUv3u" },
        { name: "Kamil", role: "Penjaga Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/19DgOWtpM8TqEH7lVe_2905jIWI1kdNbk" },
        { name: "Supriyanto", role: "Penjaga Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/1WkQvZO2ijrdrUZqJojZY_0_ykiBzRHcO" },
        { name: "M. Fitrah", role: "Penjaga Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/1OQkgOY0FhN3oQGiAEdwZSfGUA6RXMIqI" }
    ];

    // 3. Logika Rotasi Guru di Beranda
    function renderRotatingTeachers() {
        const container = document.getElementById('rotating-teachers');
        if (!container) return;
        const shuffled = [...allTeachers].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        container.innerHTML = '';
        selected.forEach(t => {
            container.innerHTML += `
                <div class="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center fade-in">
                    <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-sd-red/10 shadow-sm">
                        <img src="${t.img}" class="w-full h-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${t.name}'">
                    </div>
                    <h4 class="font-bold text-gray-900">${t.name}</h4>
                    <p class="text-sd-red text-sm font-semibold mt-1 uppercase tracking-wider">${t.role}</p>
                </div>`;
        });
    }
    renderRotatingTeachers();
    setInterval(renderRotatingTeachers, 5000);

    // 4. Logika Modal (DIPERBAIKI)
    window.openModal = function() {
        const modal = document.getElementById('teacher-modal');
        const modalContent = document.getElementById('modal-content');
        if (!modal || !modalContent) return;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        let html = '';

        // Bagian A: Guru Kelas (1-6)
        for (let i = 1; i <= 6; i++) {
            const classTeachers = allTeachers.filter(t => t.role.includes(`Kelas ${i}`));
            if(classTeachers.length > 0) {
                html += `<div class="mb-12"><h4 class="text-xl font-bold text-sd-red mb-6 border-b-2 border-sd-red/20 pb-2">Guru Kelas ${i}</h4><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;
                classTeachers.forEach(t => {
                    html += `<div class="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-4">
                        <img src="${t.img}" class="w-16 h-16 rounded-full border" onerror="this.src='https://ui-avatars.com/api/?name=${t.name}'">
                        <div><p class="font-bold text-gray-800">${t.name}</p><p class="text-xs text-sd-red font-bold uppercase">${t.role}</p></div>
                    </div>`;
                });
                html += `</div></div>`;
            }
        }

        // Bagian B: Guru Mapel (DITAMBAHKAN KEMBALI)
        const subjectTeachers = allTeachers.filter(t => t.type === "subject");
        if(subjectTeachers.length > 0) {
            html += `<div class="mb-12"><h4 class="text-xl font-bold text-sd-red mb-6 border-b-2 border-sd-red/20 pb-2">Guru Mata Pelajaran</h4><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;
            subjectTeachers.forEach(t => {
                html += `<div class="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-4">
                    <img src="${t.img}" class="w-16 h-16 rounded-full border" onerror="this.src='https://ui-avatars.com/api/?name=${t.name}'">
                    <div><p class="font-bold text-gray-800">${t.name}</p><p class="text-xs text-sd-red font-bold uppercase">${t.role}</p></div>
                </div>`;
            });
            html += `</div></div>`;
        }

        // Bagian C: Staff (DITAMBAHKAN KEMBALI)
        const staffMembers = allTeachers.filter(t => t.type === "staff");
        if(staffMembers.length > 0) {
            html += `<div class="mb-12"><h4 class="text-xl font-bold text-sd-red mb-6 border-b-2 border-sd-red/20 pb-2">Tenaga Kependidikan</h4><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;
            staffMembers.forEach(t => {
                html += `<div class="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-4">
                    <img src="${t.img}" class="w-16 h-16 rounded-full border bg-gray-100" onerror="this.src='https://ui-avatars.com/api/?name=${t.name}'">
                    <div><p class="font-bold text-gray-800">${t.name}</p><p class="text-xs text-gray-500 font-bold uppercase">${t.role}</p></div>
                </div>`;
            });
            html += `</div></div>`;
        }

        modalContent.innerHTML = html;
    };

    window.closeModal = function() {
        document.getElementById('teacher-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // 5. Fitur Pesan Pengunjung (Buku Tamu)
    const guestbookForm = document.getElementById('guestbook-form');
    const messagesDisplay = document.getElementById('messages-display');
    const SCRIPT_URL = "URL_APPS_SCRIPT_ANDA"; // Ganti dengan URL dari Google Apps Script

    function renderMessages(messages) {
        if (!messagesDisplay) return;
        messagesDisplay.innerHTML = '<h4 class="font-bold text-gray-800 mb-4 text-center">Pesan Terbaru</h4>';
        messages.forEach(item => {
            messagesDisplay.innerHTML += `
                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-4">
                    <div class="flex justify-between items-start mb-2">
                        <h5 class="font-bold text-sd-red">${item.name}</h5>
                        <span class="text-xs text-gray-400">${item.date || ''}</span>
                    </div>
                    <p class="text-gray-600 text-sm italic">"${item.message}"</p>
                </div>`;
        });
    }

    if (guestbookForm) {
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const name = document.getElementById('visitor-name').value;
            const message = document.getElementById('visitor-message').value;

            btn.disabled = true;
            btn.innerText = "Mengirim...";

            // Simulasi simpan (Ganti dengan fetch ke SCRIPT_URL jika sudah ada)
            setTimeout(() => {
                alert("Pesan Berhasil Terkirim!");
                e.target.reset();
                btn.disabled = false;
                btn.innerText = "Kirim Pesan";
            }, 1000);
        });
    }
});

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyBSUvf1e6Wg130hRsf7PMN9cod-L24xXA7NsBVputF3DPJB6p0lp9b8OJ94VGzvjEwEg/exec";

// Fungsi Load Berita Otomatis saat Halaman Dibuka
let allNewsData = []; // Simpan data global untuk modal

async function fetchNews() {
    try {
        const response = await fetch(`${SCRIPT_URL}?action=getNews`);
        allNewsData = await response.json();
        
        const featuredContainer = document.getElementById('news-featured');
        const archiveContainer = document.getElementById('news-archive');
        const previousSection = document.getElementById('previous-news-section');

        if (!allNewsData || allNewsData.length === 0) {
            featuredContainer.innerHTML = "<p class='text-center col-span-full'>Belum ada informasi terbaru.</p>";
            return;
        }

        // 1. Tampilkan 3 Berita Utama
        const featured = allNewsData.slice(0, 3);
        featuredContainer.innerHTML = featured.map((n, index) => renderNewsCard(n, index, false)).join('');

        // 2. Tampilkan Berita Selebihnya (Arsip)
        if (allNewsData.length > 3) {
            previousSection.classList.remove('hidden');
            const archive = allNewsData.slice(3);
            archiveContainer.innerHTML = archive.map((n, index) => renderNewsCard(n, index + 3, true)).join('');
        }
    } catch (e) {
        console.error("Gagal memuat berita:", e);
    }
}

// Fungsi Helper untuk Render Card
function renderNewsCard(n, index, isArchive) {
    // Gunakan class 'line-clamp-3' untuk memotong teks secara otomatis dengan titik-titik
    return `
        <div class="bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
            <img src="${n.img || 'https://via.placeholder.com/400x250'}" class="w-full h-48 object-cover">
            <div class="p-6 flex-grow flex flex-col">
                <span class="text-xs text-sd-red font-bold uppercase">${n.date}</span>
                <h4 class="font-bold text-lg mt-1 mb-2">${n.title}</h4>
                <p class="text-gray-600 text-sm line-clamp-3 mb-4">${n.content}</p>
                <div class="mt-auto">
                    <button onclick="openNewsModal(${index})" class="text-sd-red font-bold text-sm hover:underline flex items-center gap-1">
                        Baca Selengkapnya <i data-lucide="chevron-right" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        </div>`;
}

// Logika Modal Berita
window.openNewsModal = function(index) {
    const news = allNewsData[index];
    const modal = document.getElementById('news-modal');
    
    document.getElementById('modal-news-img').style.backgroundImage = `url('${news.img || 'https://via.placeholder.com/400x250'}')`;
    document.getElementById('modal-news-date').innerText = news.date;
    document.getElementById('modal-news-title').innerText = news.title;
    document.getElementById('modal-news-content').innerHTML = news.content.replace(/\n/g, '<br>');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
};

window.closeNewsModal = function() {
    document.getElementById('news-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
};

// Panggil saat aplikasi siap
fetchNews();

// Logika Admin
function showLogin() { document.getElementById('admin-modal').classList.remove('hidden'); document.getElementById('admin-modal').classList.add('flex'); }
function closeAdminModal() { document.getElementById('admin-modal').classList.add('hidden'); }

async function attemptLogin() {
    const pass = document.getElementById('admin-pass').value;
    const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'login', password: pass })
    });
    const result = await res.json();
    if (result.status === 'success') {
        document.getElementById('admin-panel').classList.remove('hidden');
        closeAdminModal();
    } else {
        alert("Sandi Salah!");
    }
}

// Tambah Berita Baru via Admin Panel
document.getElementById('add-news-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerText = "Mengirim...";

    const payload = {
        action: 'addNews',
        title: document.getElementById('news-title').value,
        content: document.getElementById('news-content').value,
        img: document.getElementById('news-img').value
    };

    await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
    alert("Berita Berhasil Ditambahkan!");
    location.reload(); // Segarkan halaman untuk melihat hasil
});
