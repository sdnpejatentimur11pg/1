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

    // 3. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            nav.classList.add('shadow-md', 'bg-white/95');
            nav.classList.remove('bg-white/90');
        } else {
            nav.classList.remove('shadow-md', 'bg-white/95');
            nav.classList.add('bg-white/90');
        }
    });

    // 4. Data Guru
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
        { name: "M. Sahari, S.Pd.I.", role: "Guru PAI", type: "subject", img: "https://lh3.googleusercontent.com/d/1-KFdAlFVBH58mQbRzkaBeDDyYCRZv3Vp" },
        { name: "Maimunah, S.Pd.I.", role: "Guru PAI", type: "subject", img: "https://lh3.googleusercontent.com/d/1J1itUg0pbdTmdR-qPuizp-kcwotnHVWd" },
        { name: "M. Gilang G., S.Pd.", role: "Guru Olahraga", type: "subject", img: "https://lh3.googleusercontent.com/d/1cuW7NfceUF9UiNPqm7RpYQLitUaf_MH5" },
        { name: "Iis Yudiani", role: "Guru Olahraga", type: "subject", img: "https://ui-avatars.com/api/?name=Iis+Yudiani&background=fecaca&color=A52A2A" },
        // Staff
        { name: "M. Dary Ammar", role: "Operator", type: "staff", img: "https://lh3.googleusercontent.com/d/1lG13UjQhtM5AQamrBwkftcGS_InrUv3u" },
        { name: "Kamil", role: "Penjaga Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/19DgOWtpM8TqEH7lVe_2905jIWI1kdNbk" },
        { name: "Supriyanto", role: "Penjaga Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/1WkQvZO2ijrdrUZqJojZY_0_ykiBzRHcO" },
        { name: "M. Fitrah", role: "Penjaga Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/1OQkgOY0FhN3oQGiAEdwZSfGUA6RXMIqI" }
    ];

    // 5. Render Guru Berputar
    function renderRotatingTeachers() {
        const container = document.getElementById('rotating-teachers');
        if (!container) return;
        
        // Randomize
        const shuffled = [...allTeachers].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        
        container.innerHTML = '';
        selected.forEach((t, i) => {
            // Style Card Baru
            container.innerHTML += `
                <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div class="w-28 h-28 mx-auto mb-6 rounded-full p-1 border-2 border-dashed border-gray-200 group-hover:border-sd-red transition-colors">
                        <img src="${t.img}" class="w-full h-full rounded-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${t.name}&background=fee2e2&color=dc2626'">
                    </div>
                    <h4 class="font-bold text-gray-900 text-lg group-hover:text-sd-red transition-colors">${t.name}</h4>
                    <p class="text-gray-500 text-sm font-semibold mt-1 uppercase tracking-wide">${t.role}</p>
                </div>`;
        });
    }
    
    // Jalankan pertama kali & Interval
    renderRotatingTeachers();
    setInterval(renderRotatingTeachers, 5000);

    // 6. Modal Guru
    window.openModal = function() {
        const modal = document.getElementById('teacher-modal');
        const modalContent = document.getElementById('modal-content');
        if (!modal) return;

        modal.classList.remove('hidden');
        modal.classList.add('flex'); // Pakai flex agar center
        document.body.style.overflow = 'hidden';

        // Render Content
        let html = '';
        
        const renderSection = (title, data) => {
            if(data.length === 0) return '';
            let sectionHtml = `<div class="mb-10"><h4 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span class="w-1.5 h-6 bg-sd-red rounded-full"></span>${title}</h4><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;
            data.forEach(t => {
                sectionHtml += `
                <div class="bg-white border border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow">
                    <img src="${t.img}" class="w-14 h-14 rounded-full object-cover bg-gray-100" onerror="this.src='https://ui-avatars.com/api/?name=${t.name}&background=random'">
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
        for (let i = 1; i <= 6; i++) {
            html += renderSection(`Guru Kelas ${i}`, allTeachers.filter(t => t.role.includes(`Kelas ${i}`)));
        }
        // Mapel & Staff
        html += renderSection('Guru Mata Pelajaran', allTeachers.filter(t => t.type === 'subject'));
        html += renderSection('Tenaga Kependidikan', allTeachers.filter(t => t.type === 'staff'));

        modalContent.innerHTML = html;
    };

    window.closeModal = function() {
        document.getElementById('teacher-modal').classList.add('hidden');
        document.getElementById('teacher-modal').classList.remove('flex');
        document.body.style.overflow = 'auto';
    };

    // 7. Buku Tamu (Dummy)
    const guestbookForm = document.getElementById('guestbook-form');
    const messagesDisplay = document.getElementById('messages-display');

    if (guestbookForm) {
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const name = document.getElementById('visitor-name').value;
            const msg = document.getElementById('visitor-message').value;

            btn.disabled = true;
            btn.innerHTML = 'Mengirim...';

            setTimeout(() => {
                // Tampilkan dummy message
                const newMsg = `
                <div class="bg-white/10 p-4 rounded-xl border border-white/20 animate-pulse">
                    <p class="font-bold text-sm text-white">${name}</p>
                    <p class="text-xs text-white/80 italic line-clamp-2">"${msg}"</p>
                </div>`;
                if(messagesDisplay) messagesDisplay.insertAdjacentHTML('afterbegin', newMsg);
                
                alert("Pesan terkirim! Terima kasih.");
                e.target.reset();
                btn.disabled = false;
                btn.innerHTML = '<span>Kirim Pesan</span><i data-lucide="send" class="w-4 h-4"></i>';
                lucide.createIcons();
            }, 1000);
        });
    }
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
                    <p class="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">${n.content}</p>
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
    document.getElementById('modal-news-content').innerHTML = news.content.replace(/\n/g, '<br>');
    
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

window.attemptLogin = async function() {
    const pass = document.getElementById('admin-pass').value;
    const btn = document.querySelector('#admin-modal button');
    
    btn.innerText = "Memeriksa...";
    btn.disabled = true;

    try {
        const res = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'login', password: pass })
        });
        const result = await res.json();
        
        if (result.status === 'success') {
            document.getElementById('admin-panel').classList.remove('hidden');
            closeAdminModal();
        } else {
            alert("Kata sandi salah!");
        }
    } catch(e) {
        alert("Terjadi kesalahan koneksi.");
    } finally {
        btn.innerText = "Masuk Dashboard";
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
