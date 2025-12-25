// Tunggu sampai seluruh HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // Inisialisasi Ikon Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Database Guru & Staff (Pastikan data ini ada)
    const allTeachers = [
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
        { name: "M. Sahari, S.Pd.I.", role: "Guru Pendidikan Agama Islam", type: "subject", img: "https://lh3.googleusercontent.com/d/1-KFdAlFVBH58mQbRzkaBeDDyYCRZv3Vp" },
        { name: "Maimunah, S.Pd.I.", role: "Guru Pendidikan Agama Islam", type: "subject", img: "https://lh3.googleusercontent.com/d/1J1itUg0pbdTmdR-qPuizp-kcwotnHVWd" },
        { name: "M. Gilang G., S.Pd.", role: "Guru Olahraga", type: "subject", img: "https://lh3.googleusercontent.com/d/1cuW7NfceUF9UiNPqm7RpYQLitUaf_MH5" },
        { name: "Iis Yudiani", role: "Guru Olahraga", type: "subject", img: "https://ui-avatars.com/api/?name=Iis+Yudiani&background=fecaca&color=A52A2A" },
        { name: "M. Dary Ammar", role: "Operator Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/1lG13UjQhtM5AQamrBwkftcGS_InrUv3u" },
        { name: "Kamil", role: "Penjaga Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/19DgOWtpM8TqEH7lVe_2905jIWI1kdNbk" },
        { name: "Supriyanto", role: "Penjaga Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/1WkQvZO2ijrdrUZqJojZY_0_ykiBzRHcO" },
        { name: "M. Fitrah", role: "Penjaga Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/1OQkgOY0FhN3oQGiAEdwZSfGUA6RXMIqI" }
    ];

    function renderRotatingTeachers() {
        const container = document.getElementById('rotating-teachers');
        if (!container) return;

        // Acak data guru
        const shuffled = [...allTeachers].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        
        container.innerHTML = '';
        selected.forEach(teacher => {
            container.innerHTML += `
                <div class="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center fade-in">
                    <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-sd-red/10 shadow-sm">
                        <img src="${teacher.img}" class="w-full h-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${teacher.name}'">
                    </div>
                    <h4 class="font-bold text-gray-900">${teacher.name}</h4>
                    <p class="text-sd-red text-sm font-semibold mt-1 uppercase tracking-wider">${teacher.role}</p>
                </div>
            `;
        });
    }

    // Jalankan pertama kali dan set interval
    renderRotatingTeachers();
    setInterval(renderRotatingTeachers, 5000);

    // Ekspos fungsi modal ke global window agar bisa dipanggil dari HTML onclick
    window.openModal = function() {
        const modal = document.getElementById('teacher-modal');
        const modalContent = document.getElementById('modal-content');
        if (!modal || !modalContent) return;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        let html = '';
        // Grouping logic (sama seperti sebelumnya)
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
        modalContent.innerHTML = html;
    };

    window.closeModal = function() {
        document.getElementById('teacher-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => alert("Menu Mobile segera hadir!"));
    }

    // --- Tambahkan ini di dalam DOMContentLoaded ---

    const guestbookForm = document.getElementById('guestbook-form');
    const messagesDisplay = document.getElementById('messages-display');
    
    // Array untuk menyimpan pesan (sementara)
    let visitorMessages = [
        { name: "Orang Tua Siswa", message: "Sekolah yang sangat bersih dan guru-gurunya ramah!", date: "25 Des 2025" }
    ];
    
    // Fungsi untuk menampilkan pesan
    function renderMessages() {
        if (!messagesDisplay) return;
        
        messagesDisplay.innerHTML = '<h4 class="font-bold text-gray-800 mb-4">Pesan Terbaru:</h4>';
        
        visitorMessages.forEach(item => {
            messagesDisplay.innerHTML += `
                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm fade-in">
                    <div class="flex justify-between items-start mb-2">
                        <h5 class="font-bold text-sd-red">${item.name}</h5>
                        <span class="text-xs text-gray-400">${item.date}</span>
                    </div>
                    <p class="text-gray-600 text-sm italic">"${item.message}"</p>
                </div>
            `;
        });
    }
    
    // Menangani submit form
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('visitor-name');
            const messageInput = document.getElementById('visitor-message');
            
            // Buat objek pesan baru
            const newMessage = {
                name: nameInput.value,
                message: messageInput.value,
                date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
            };
            
            // Tambahkan ke daftar
            visitorMessages.unshift(newMessage);
            
            // Reset form dan render ulang
            nameInput.value = '';
            messageInput.value = '';
            renderMessages();
            
            alert("Terima kasih! Pesan Anda telah terkirim.");
        });
    }
    
    // Panggil render saat pertama kali muat
    renderMessages();
});
