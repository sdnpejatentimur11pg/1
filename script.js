// Initialize Lucide Icons
lucide.createIcons();

// Database Guru & Staff
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
    // Tenaga Kependidikan (Staff)
    { name: "M. Dary Ammar", role: "Operator Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/1lG13UjQhtM5AQamrBwkftcGS_InrUv3u" },
    { name: "Kamil", role: "Penjaga Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/19DgOWtpM8TqEH7lVe_2905jIWI1kdNbk" },
    { name: "Supriyanto", role: "Penjaga Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/1WkQvZO2ijrdrUZqJojZY_0_ykiBzRHcO" },
    { name: "M. Fitrah", role: "Penjaga Sekolah", type: "staff", img: "https://lh3.googleusercontent.com/d/1OQkgOY0FhN3oQGiAEdwZSfGUA6RXMIqI" }
];

// Logic for Randomizing 3 Teachers on the main page
function getRandomTeachers(count) {
    const shuffled = [...allTeachers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function renderRotatingTeachers() {
    const container = document.getElementById('rotating-teachers');
    if (!container) return;

    const teachers = getRandomTeachers(3);
    
    container.innerHTML = '';
    teachers.forEach(teacher => {
        const card = `
            <div class="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center fade-in">
                <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-sd-red/10 shadow-sm">
                    <img src="${teacher.img}" class="w-full h-full object-cover">
                </div>
                <h4 class="font-bold text-gray-900">${teacher.name}</h4>
                <p class="text-sd-red text-sm font-semibold mt-1 uppercase tracking-wider">${teacher.role}</p>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Initial render and set interval for rotation
setInterval(renderRotatingTeachers, 5000);
renderRotatingTeachers();

// Modal Management
function openModal() {
    const modal = document.getElementById('teacher-modal');
    const modalContent = document.getElementById('modal-content');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    let html = '';
    
    // 1. Guru Kelas Grouping
    const classes = [1, 2, 3, 4, 5, 6];
    classes.forEach(num => {
        const classTeachers = allTeachers.filter(t => t.role.includes(`Kelas ${num}`));
        if(classTeachers.length > 0) {
            html += `<div class="mb-12"><h4 class="text-xl font-bold text-sd-red mb-6 border-b-2 border-sd-red/20 pb-2">Guru Kelas ${num}</h4><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;
            classTeachers.forEach(t => {
                html += `
                    <div class="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-4">
                        <img src="${t.img}" class="w-16 h-16 rounded-full border">
                        <div><p class="font-bold text-gray-800">${t.name}</p><p class="text-xs text-sd-red font-bold uppercase">${t.role}</p></div>
                    </div>
                `;
            });
            html += `</div></div>`;
        }
    });

    // 2. Guru Mata Pelajaran
    const subjectTeachers = allTeachers.filter(t => t.type === "subject");
    if(subjectTeachers.length > 0) {
        html += `<div class="mb-12"><h4 class="text-xl font-bold text-sd-red mb-6 border-b-2 border-sd-red/20 pb-2">Guru Mata Pelajaran (Agama & Olahraga)</h4><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;
        subjectTeachers.forEach(t => {
            html += `
                <div class="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-4">
                    <img src="${t.img}" class="w-16 h-16 rounded-full border">
                    <div><p class="font-bold text-gray-800">${t.name}</p><p class="text-xs text-sd-red font-bold uppercase">${t.role}</p></div>
                </div>
            `;
        });
        html += `</div></div>`;
    }

    // 3. Tenaga Kependidikan
    const staffMembers = allTeachers.filter(t => t.type === "staff");
    if(staffMembers.length > 0) {
        html += `<div class="mb-12"><h4 class="text-xl font-bold text-sd-red mb-6 border-b-2 border-sd-red/20 pb-2">Tenaga Kependidikan</h4><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;
        staffMembers.forEach(t => {
            html += `
                <div class="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-4">
                    <img src="${t.img}" class="w-16 h-16 rounded-full border bg-gray-100">
                    <div><p class="font-bold text-gray-800">${t.name}</p><p class="text-xs text-gray-500 font-bold uppercase">${t.role}</p></div>
                </div>
            `;
        });
        html += `</div></div>`;
    }

    modalContent.innerHTML = html;
}

function closeModal() {
    document.getElementById('teacher-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Mobile Menu Handler
const menuBtn = document.getElementById('menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        alert("Fitur Menu Mobile akan segera hadir!");
    });
}
