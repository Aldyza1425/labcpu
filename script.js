/* ==========================================================================
   MODUL AJAR: PRAKTIK PEMBONGKARAN & PERAKITAN PC
   Interactive Engine, Component Gallery & Quiz Script
   Style & Experience Reference: https://aldyza1425.github.io/Materi-Micro-2/
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       0. AUDIO FEEDBACK (Web Audio API Synthesizer - Clean & Zero Dependency)
       ========================================================================== */
    const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;
    
    function playBeep(type = 'click') {
        if (!audioCtx) return;
        try {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            const now = audioCtx.currentTime;
            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(580, now);
                osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'success') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
                osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.35);
            } else if (type === 'warning') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(220, now + 0.15);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
            }
        } catch (e) {
            // Audio policy ignore
        }
    }

    /* ==========================================================================
       1. DATA: 14 KOMPONEN PC (Lengkap dengan Gambar dari folder image/)
       ========================================================================== */
    const hardwareData = [
        {
            id: 'motherboard',
            name: 'Motherboard',
            image: 'image/Motherboard.jpg',
            category: 'core',
            categoryName: 'Komponen Utama',
            icon: 'fa-solid fa-microchip',
            color: '#2563eb',
            desc: 'Papan sirkuit utama yang menjadi tempat pemasangan dan penghubung seluruh komponen komputer.',
            fungsi: [
                'Menghubungkan processor, RAM, dan perangkat lainnya.',
                'Menjadi tempat pemasangan berbagai komponen komputer.',
                'Mengatur komunikasi dan transfer data antar komponen satu dengan lainnya.'
            ],
            manfaat: 'Membuat seluruh perangkat keras komputer dapat saling terhubung dan bekerja sinkron sebagai satu kesatuan sistem.',
            tips: 'Saat memasang ke casing, pastikan baut dudukan (standoff/spacer) terpasang presisi agar motherboard tidak mengalami korsleting.'
        },
        {
            id: 'processor',
            name: 'Processor (CPU)',
            image: 'image/Processor.jpg',
            category: 'core',
            categoryName: 'Komponen Utama',
            icon: 'fa-solid fa-brain',
            color: '#2563eb',
            desc: 'Komponen utama komputer yang bertindak sebagai otak komputer untuk memproses instruksi logika.',
            fungsi: [
                'Mengolah data dan mengeksekusi instruksi program.',
                'Melakukan operasi perhitungan aritmetika dan logika.',
                'Mengatur dan mengoordinasikan jalannya seluruh proses kerja komputer.'
            ],
            manfaat: 'Membantu komputer menjalankan sistem operasi, membuka aplikasi, mengolah informasi grafis, dan menjalankan tugas berat.',
            tips: 'Perhatikan tanda segitiga emas di sudut processor dan socket motherboard. Jangan memaksakan posisi pemasangan!'
        },
        {
            id: 'ram',
            name: 'RAM (Random Access Memory)',
            image: 'image/RAM.jpg',
            category: 'core',
            categoryName: 'Komponen Utama',
            icon: 'fa-solid fa-memory',
            color: '#10b981',
            desc: 'Tempat penyimpanan data sementara berkecepatan tinggi yang digunakan komputer saat sedang bekerja.',
            fungsi: [
                'Menyimpan data sementara dari aplikasi yang sedang berjalan.',
                'Membantu processor mengakses data dengan kecepatan tinggi.',
                'Mendukung kestabilan kegiatan multitasking membuka banyak aplikasi.'
            ],
            manfaat: 'Membuat komputer responsif dan lancar dalam menjalankan banyak program sekaligus. Data akan terhapus saat PC dimatikan (bersifat volatil).',
            tips: 'Sesuaikan coakan (notch) pada RAM dengan pembatas di slot RAM. Tekan kedua ujung RAM hingga pengunci berbunyi "klik".'
        },
        {
            id: 'heatsink',
            name: 'Heatsink dan Fan (Pendingin)',
            image: 'image/Heatsink.jpg',
            category: 'cooling',
            categoryName: 'Pendingin & Casing',
            icon: 'fa-solid fa-fan',
            color: '#0284c7',
            desc: 'Perangkat pendingin aktif gabungan sirip logam dan kipas yang dipasang tepat di atas processor.',
            fungsi: [
                'Menyerap panas tinggi yang dihasilkan oleh processor.',
                'Mengalirkan panas keluar agar suhu processor tetap terkendali.',
                'Mencegah processor mengalami panas berlebih (thermal throttling/overheat).'
            ],
            manfaat: 'Menjaga kestabilan suhu kerja processor sehingga komputer terhindar dari hang, crash, atau kerusakan chip akibat suhu tinggi.',
            tips: 'Pastikan kabel kipas heatsink selalu ditancapkan ke port berkode "CPU_FAN" pada motherboard, bukan port kipas biasa.'
        },
        {
            id: 'thermalpaste',
            name: 'Thermal Paste',
            image: 'image/Thermal Paste.jpg',
            category: 'cooling',
            categoryName: 'Pendingin & Casing',
            icon: 'fa-solid fa-fill-drip',
            color: '#64748b',
            desc: 'Pasta konduktif khusus yang dioleskan tipis di antara permukaan atas processor dan dasar heatsink.',
            fungsi: [
                'Mengisi celah mikroskopis udara antara permukaan processor dan heatsink.',
                'Membantu menghantarkan panas secara efisien dari processor ke heatsink.'
            ],
            manfaat: 'Meningkatkan efektivitas pendinginan hingga berkali-kali lipat dan mencegah processor mengalami panas berlebih yang fatal.',
            tips: 'Oleskan secukupnya (seukuran sebutir kacang polong atau jagung) tepat di tengah processor. Jangan terlalu banyak agar tidak meluber.'
        },
        {
            id: 'casing',
            name: 'Casing Komputer',
            image: 'image/Case.jpg',
            category: 'cooling',
            categoryName: 'Pendingin & Casing',
            icon: 'fa-solid fa-box',
            color: '#475569',
            desc: 'Rangka atau wadah pelindung tempat meletakkan, mengunci, dan mengorganisasi seluruh komponen PC.',
            fungsi: [
                'Menjadi tempat dudukan dan pemasangan semua komponen PC.',
                'Melindungi komponen elektronik dari benturan fisik, kotoran, dan debu.',
                'Membantu mengatur arah sirkulasi udara (airflow) untuk mendinginkan hardware.'
            ],
            manfaat: 'Membuat komponen komputer tertata rapi, terhindar dari kontak benda luar, aman dari bahaya listrik, dan mudah dirawat.',
            tips: 'Pastikan manajemen kabel (cable management) di dalam casing rapi agar aliran udara segar dari depan ke belakang tidak terhalang.'
        },
        {
            id: 'harddisk',
            name: 'Harddisk (HDD)',
            image: 'image/Harddisk.jpg',
            category: 'storage',
            categoryName: 'Penyimpanan & Kabel',
            icon: 'fa-solid fa-hard-drive',
            color: '#8b5cf6',
            desc: 'Perangkat penyimpanan data magnetik atau flash permanen untuk menyimpan sistem operasi, aplikasi, dan file.',
            fungsi: [
                'Menyimpan data dan file secara permanen (non-volatile).',
                'Menyimpan sistem operasi (Windows, Linux, dll) untuk proses booting.',
                'Menyimpan dokumen, aplikasi, video, database, dan media pengguna.'
            ],
            manfaat: 'Menyediakan ruang arsip luas untuk menyimpan seluruh berkas penting pengguna meskipun komputer dalam keadaan mati.',
            tips: 'Kencangkan baut pada dudukan drive bay casing agar getaran piringan harddisk tidak menimbulkan bunyi bising atau bad sector.'
        },
        {
            id: 'powersupply',
            name: 'Power Supply (PSU)',
            image: 'image/Power Supply.jpg',
            category: 'expansion',
            categoryName: 'Ekspansi & Daya',
            icon: 'fa-solid fa-bolt',
            color: '#d97706',
            desc: 'Perangkat catu daya yang mengubah arus listrik bolak-balik (AC) dari sumber listrik menjadi tegangan searah (DC) stabil.',
            fungsi: [
                'Menyalurkan daya listrik utama ke motherboard (kabel 24-pin ATX).',
                'Memberikan daya ke CPU (kabel 4/8-pin), harddisk, GPU, dan DVD-ROM.',
                'Menyediakan tegangan terbagi (+12V, +5V, +3.3V) sesuai spesifikasi komponen.'
            ],
            manfaat: 'Memastikan seluruh komponen mendapatkan suplai energi yang stabil dan aman dari fluktuasi arus listrik.',
            tips: 'PERINGATAN: Jangan pernah membongkar kotak bagian dalam power supply karena kapasitor menyimpan muatan listrik berbahaya!'
        },
        {
            id: 'dvdrom',
            name: 'DVD-ROM Drive',
            image: 'image/DVD ROM.jpg',
            category: 'storage',
            categoryName: 'Penyimpanan & Kabel',
            icon: 'fa-solid fa-compact-disc',
            color: '#0284c7',
            desc: 'Perangkat keras optik yang membaca data digital dari kepingan CD atau DVD menggunakan sinar laser.',
            fungsi: [
                'Membaca data perangkat lunak dan file media dari keping DVD.',
                'Membantu instalasi sistem operasi versi disc optik atau akses file disc.'
            ],
            manfaat: 'Memudahkan pengguna membaca dan mengakses data dari media penyimpanan fisik kepingan optik.',
            tips: 'Pemasangan DVD-ROM dimasukkan melalui bagian depan casing, lalu sejajarkan dengan lubang baut pada rangka casing.'
        },
        {
            id: 'lancard',
            name: 'LAN Card',
            image: 'image/LAN Card.jpg',
            category: 'expansion',
            categoryName: 'Ekspansi & Daya',
            icon: 'fa-solid fa-network-wired',
            color: '#10b981',
            desc: 'Perangkat keras yang digunakan untuk menghubungkan komputer ke jaringan lokal (LAN) melalui kabel Ethernet.',
            fungsi: [
                'Menghubungkan komputer dengan switch/router melalui kabel UTP berkonektor RJ-45.',
                'Mengirim dan menerima paket data protokol jaringan secara stabil.'
            ],
            manfaat: 'Memungkinkan komputer saling bertukar data dengan komputer lain, mencetak via jaringan, dan berselancar di internet.',
            tips: 'Pasang pada slot ekspansi (PCI atau PCIe x1) yang pas pada motherboard dan kunci bracket logamnya dengan baut pada casing.'
        },
        {
            id: 'vgacard',
            name: 'VGA Card (Graphics Card)',
            image: 'image/VGA Card.jpg',
            category: 'expansion',
            categoryName: 'Ekspansi & Daya',
            icon: 'fa-solid fa-display',
            color: '#8b5cf6',
            desc: 'Komponen yang bertugas mengolah data grafis dan menghasilkan tampilan gambar visual pada layar monitor.',
            fungsi: [
                'Mengolah gambar 2D, 3D, efek visual, dan rendering video.',
                'Menghasilkan tampilan visual berkualitas tinggi ke layar monitor.',
                'Membantu menjalankan aplikasi grafis berat dan permainan komputer.'
            ],
            manfaat: 'Membantu menghasilkan tampilan visual jernih serta mendukung pekerjaan desain, editing video, dan gaming.',
            tips: 'VGA Card umumnya dipasang pada slot khusus PCI Express x16 (slot PCIe terpanjang). Pastikan pengait ujung slot terkunci rapat.'
        },
        {
            id: 'kabelsata',
            name: 'Kabel SATA',
            image: 'image/Kabel SATA.jpg',
            category: 'storage',
            categoryName: 'Penyimpanan & Kabel',
            icon: 'fa-solid fa-diagram-project',
            color: '#6366f1',
            desc: 'Kabel data yang digunakan untuk menghubungkan perangkat penyimpanan seperti HDD/SSD dan DVD-ROM ke motherboard.',
            fungsi: [
                'Menghubungkan harddisk dengan motherboard.',
                'Menghubungkan DVD-ROM dengan motherboard.',
                'Mengirimkan data bolak-balik antara media penyimpanan dan motherboard.'
            ],
            manfaat: 'Memungkinkan komputer membaca dan mengakses data dari perangkat penyimpanan secara cepat dan stabil.',
            tips: 'Perhatikan konektor kabel SATA yang berbentuk huruf "L" agar tidak terbalik saat ditancapkan ke port motherboard atau harddisk.'
        },
        {
            id: 'cmos',
            name: 'CMOS Battery',
            image: 'image/CMOS.jpg',
            category: 'core',
            categoryName: 'Komponen Utama',
            icon: 'fa-solid fa-battery-half',
            color: '#d97706',
            desc: 'Baterai kecil (tipe kancing CR2032) yang terdapat pada papan motherboard.',
            fungsi: [
                'Menjaga pengaturan BIOS/UEFI ketika komputer dimatikan atau dicabut dari listrik.',
                'Menjaga jam dan tanggal komputer tetap berjalan akurat.'
            ],
            manfaat: 'Membantu mempertahankan konfigurasi dasar komputer meskipun komputer tidak mendapatkan aliran listrik PLN.',
            tips: 'Jika waktu komputer selalu kembali ke tahun lampau saat dinyalakan, itu tanda baterai CMOS sudah habis dan perlu diganti baru.'
        },
        {
            id: 'frontpanel',
            name: 'Kabel Front Panel',
            image: 'image/Kabel Front.jpg',
            category: 'cooling',
            categoryName: 'Pendingin & Casing',
            icon: 'fa-solid fa-plug',
            color: '#f43f5e',
            desc: 'Kumpulan kabel kecil dari bagian depan casing yang dihubungkan ke motherboard.',
            fungsi: [
                'Menghubungkan tombol Power (Power SW).',
                'Menghubungkan tombol Reset (Reset SW).',
                'Menghubungkan lampu indikator Power dan aktivitas harddisk (HDD LED).'
            ],
            manfaat: 'Memudahkan pengguna menghidupkan, mereset, dan mengetahui kondisi kerja komputer melalui bagian depan casing.',
            tips: 'Perhatikan tanda positif (+) dan negatif (-) pada pin LED front panel. Ikuti petunjuk diagram yang tercetak di permukaan motherboard.'
        }
    ];

    /* ==========================================================================
       2. HARDWARE GRID RENDERING & FILTERING
       ========================================================================== */
    const hardwareGrid = document.getElementById('hardware-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-hw');

    function renderHardwareCards(items) {
        if (!hardwareGrid) return;
        hardwareGrid.innerHTML = '';

        if (items.length === 0) {
            hardwareGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.5;"></i>
                    <p>Komponen tidak ditemukan. Coba kata kunci lainnya!</p>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'hardware-card';
            card.innerHTML = `
                <div class="hw-card-img-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="hw-card-img" loading="lazy" onerror="this.src='https://placehold.co/600x400/2563eb/ffffff?text=${encodeURIComponent(item.name)}'">
                    <span class="hw-card-img-badge">${item.categoryName}</span>
                </div>
                <div class="hw-card-content">
                    <h3><i class="${item.icon}" style="color: ${item.color};"></i> ${item.name}</h3>
                    <p class="hw-desc">${item.desc}</p>
                    <div class="hw-meta-preview">
                        <strong><i class="fa-solid fa-circle-info" style="color: ${item.color};"></i> Fungsi:</strong>
                        ${item.fungsi[0]}
                    </div>
                    <button type="button" class="btn-detail-card" data-id="${item.id}">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Lihat Fungsi & Manfaat
                    </button>
                </div>
            `;
            hardwareGrid.appendChild(card);
        });

        // Attach modal triggers
        document.querySelectorAll('.btn-detail-card').forEach(btn => {
            btn.addEventListener('click', () => {
                const hwId = btn.getAttribute('data-id');
                openHardwareModal(hwId);
            });
        });
    }

    // Filter by tab
    let currentCategory = 'all';
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            filterHardware();
            playBeep('click');
        });
    });

    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            filterHardware();
        });
    }

    function filterHardware() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const filtered = hardwareData.filter(item => {
            const matchesCat = (currentCategory === 'all' || item.category === currentCategory);
            const matchesQuery = item.name.toLowerCase().includes(query) || 
                                 item.desc.toLowerCase().includes(query) ||
                                 item.categoryName.toLowerCase().includes(query);
            return matchesCat && matchesQuery;
        });
        renderHardwareCards(filtered);
    }

    // Initial render
    renderHardwareCards(hardwareData);

    /* ==========================================================================
       3. COMPONENT DETAIL MODAL
       ========================================================================== */
    const modalOverlay = document.getElementById('hardware-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImg = document.getElementById('modal-img');
    const modalCategory = document.getElementById('modal-category');
    const modalPengertian = document.getElementById('modal-pengertian');
    const modalFungsi = document.getElementById('modal-fungsi');
    const modalManfaat = document.getElementById('modal-manfaat');
    const modalTips = document.getElementById('modal-tips');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    function openHardwareModal(id) {
        const item = hardwareData.find(h => h.id === id);
        if (!item || !modalOverlay) return;

        modalTitle.innerHTML = `<i class="${item.icon}" style="color: ${item.color};"></i> ${item.name}`;
        if (modalImg) {
            modalImg.src = item.image;
            modalImg.alt = item.name;
        }
        modalCategory.textContent = item.categoryName;
        modalPengertian.textContent = item.desc;

        modalFungsi.innerHTML = '';
        item.fungsi.forEach(f => {
            const li = document.createElement('li');
            li.textContent = f;
            modalFungsi.appendChild(li);
        });

        modalManfaat.textContent = item.manfaat;
        modalTips.textContent = item.tips;

        modalOverlay.classList.add('open');
        playBeep('click');
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('open');
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('open');
            }
        });
    }

    /* ==========================================================================
       4. PROSEDUR LANGKAH-LANGKAH (Perakitan & Pembongkaran Tabs)
       ========================================================================== */
    const procTabBtns = document.querySelectorAll('.proc-tab-btn');
    const procPanes = document.querySelectorAll('.procedure-pane');

    procTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPaneId = btn.getAttribute('data-pane');
            
            procTabBtns.forEach(b => b.classList.remove('active'));
            procPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPane = document.getElementById(targetPaneId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
            playBeep('click');
        });
    });

    /* ==========================================================================
       5. KUIS INTERAKTIF (5 Soal Pilihan Ganda & Cek Pemahaman)
       ========================================================================== */
    const quizQuestions = [
        {
            question: '1. Komponen utama komputer yang bertindak sebagai "otak komputer" untuk mengolah data dan menjalankan perintah adalah...',
            options: [
                'Power Supply',
                'Processor (CPU)',
                'Harddisk (HDD)',
                'Casing'
            ],
            correct: 1,
            explanation: 'Tepat sekali! Processor (CPU) adalah unit pemrosesan sentral yang mengolah instruksi dan mengatur jalannya seluruh proses komputasi.'
        },
        {
            question: '2. Apakah fungsi utama dari Thermal Paste yang dioleskan di antara processor dan heatsink?',
            options: [
                'Sebagai lem perekat permanen agar heatsink tidak lepas',
                'Membantu menghantarkan panas dari processor ke heatsink',
                'Membersihkan kotoran debu pada permukaan chip',
                'Menyediakan daya listrik tegangan DC'
            ],
            correct: 1,
            explanation: 'Benar! Thermal paste mengisi celah mikroskopis udara untuk menghantarkan panas dari permukaan processor ke heatsink secara optimal.'
        },
        {
            question: '3. Pada slot apakah umumnya VGA Card (Graphics Card) modern dipasang pada motherboard?',
            options: [
                'Slot PCI Express (PCIe) x16',
                'Slot RAM DDR',
                'Port SATA 3',
                'Port CPU_FAN'
            ],
            correct: 0,
            explanation: 'Tepat! VGA Card modern membutuhkan bandwidth transfer tinggi sehingga dipasang pada slot PCI Express x16 di motherboard.'
        },
        {
            question: '4. Baterai pipih CR2032 (CMOS Battery) yang terpasang pada motherboard berfungsi untuk...',
            options: [
                'Mengalirkan daya ke kipas pendingin saat komputer mati',
                'Menjaga pengaturan BIOS/UEFI dan jam komputer tetap tersimpan',
                'Menyimpan file dokumen dan sistem operasi permanen',
                'Mendinginkan sirkuit chipset motherboard'
            ],
            correct: 1,
            explanation: 'Hebat! CMOS battery menjaga chip RTC (Real Time Clock) dan pengaturan setup BIOS tetap aktif meskipun kabel listrik dicabut.'
        },
        {
            question: '5. Kabel front panel dari casing dihubungkan ke motherboard, salah satu fungsinya adalah untuk...',
            options: [
                'Menghubungkan monitor ke kartu grafis',
                'Menyalurkan daya 220V langsung dari stopkontak',
                'Menghubungkan tombol Power, tombol Reset, dan lampu indikator LED',
                'Mengalirkan cairan pendingin ke heatsink'
            ],
            correct: 2,
            explanation: 'Sangat tepat! Kabel front panel menghubungkan tombol fisik casing (Power, Reset) dan lampu indikator sistem ke motherboard.'
        }
    ];

    let currentQuizIdx = 0;
    let quizScore = 0;
    let quizAnswered = false;

    const quizProgressText = document.getElementById('quiz-progress-text');
    const quizScoreBadge = document.getElementById('quiz-score-badge');
    const quizQuestionText = document.getElementById('quiz-question-text');
    const quizOptionsList = document.getElementById('quiz-options-list');
    const quizFeedbackBox = document.getElementById('quiz-feedback-box');
    const btnNextQuiz = document.getElementById('btn-next-quiz');
    const btnRestartQuiz = document.getElementById('btn-restart-quiz');

    function renderQuizQuestion() {
        if (!quizQuestionText || !quizOptionsList) return;
        const q = quizQuestions[currentQuizIdx];
        quizAnswered = false;

        if (quizProgressText) quizProgressText.textContent = `Soal ${currentQuizIdx + 1} dari ${quizQuestions.length}`;
        if (quizScoreBadge) quizScoreBadge.textContent = `Skor: ${quizScore} / ${quizQuestions.length * 20}`;
        quizQuestionText.textContent = q.question;
        quizOptionsList.innerHTML = '';
        if (quizFeedbackBox) {
            quizFeedbackBox.className = 'quiz-feedback-box';
            quizFeedbackBox.textContent = '';
        }

        if (btnNextQuiz) {
            btnNextQuiz.style.display = 'inline-flex';
            btnNextQuiz.disabled = true;
            if (currentQuizIdx === quizQuestions.length - 1) {
                btnNextQuiz.innerHTML = '<i class="fa-solid fa-flag-checkered"></i> Selesai Kuis';
            } else {
                btnNextQuiz.innerHTML = 'Soal Berikutnya <i class="fa-solid fa-arrow-right"></i>';
            }
        }
        if (btnRestartQuiz) btnRestartQuiz.style.display = 'none';

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'quiz-option-btn';
            btn.innerHTML = `
                <span><strong>${String.fromCharCode(65 + idx)}.</strong> ${opt}</span>
                <i class="fa-regular fa-circle"></i>
            `;
            btn.addEventListener('click', () => {
                if (quizAnswered) return;
                handleQuizSelection(idx);
            });
            quizOptionsList.appendChild(btn);
        });
    }

    function handleQuizSelection(selectedIdx) {
        quizAnswered = true;
        const q = quizQuestions[currentQuizIdx];
        const optionBtns = quizOptionsList.querySelectorAll('.quiz-option-btn');

        optionBtns.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === q.correct) {
                btn.classList.add('correct');
                btn.querySelector('i').className = 'fa-solid fa-circle-check';
            }
            if (idx === selectedIdx && idx !== q.correct) {
                btn.classList.add('wrong');
                btn.querySelector('i').className = 'fa-solid fa-circle-xmark';
            }
        });

        if (selectedIdx === q.correct) {
            quizScore += 20;
            if (quizScoreBadge) quizScoreBadge.textContent = `Skor: ${quizScore} / ${quizQuestions.length * 20}`;
            if (quizFeedbackBox) {
                quizFeedbackBox.className = 'quiz-feedback-box show correct';
                quizFeedbackBox.innerHTML = `<strong><i class="fa-solid fa-circle-check"></i> Hebat!</strong> ${q.explanation}`;
            }
            playBeep('success');
        } else {
            if (quizFeedbackBox) {
                quizFeedbackBox.className = 'quiz-feedback-box show wrong';
                quizFeedbackBox.innerHTML = `<strong><i class="fa-solid fa-circle-xmark"></i> Kurang Tepat!</strong> Jawaban yang benar adalah pilihan <strong>${String.fromCharCode(65 + q.correct)}</strong>. ${q.explanation}`;
            }
            playBeep('warning');
        }

        if (btnNextQuiz) btnNextQuiz.disabled = false;
    }

    if (btnNextQuiz) {
        btnNextQuiz.addEventListener('click', () => {
            if (currentQuizIdx < quizQuestions.length - 1) {
                currentQuizIdx++;
                renderQuizQuestion();
                playBeep('click');
            } else {
                showQuizResults();
            }
        });
    }

    function showQuizResults() {
        if (!quizQuestionText || !quizOptionsList) return;
        quizQuestionText.textContent = `Selamat! Anda telah menyelesaikan Kuis Pemahaman PC!`;
        quizOptionsList.innerHTML = `
            <div style="text-align: center; padding: 30px; background: #f8fafc; border-radius: 16px; border: 1px solid var(--border-light);">
                <i class="fa-solid fa-award" style="font-size: 3.5rem; color: #d97706; margin-bottom: 14px;"></i>
                <h3 style="font-size: 1.6rem; margin-bottom: 8px;">Skor Akhir Anda: ${quizScore} / 100</h3>
                <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto;">
                    ${quizScore >= 80 ? 'Luar biasa! Pemahaman Anda mengenai perangkat keras dan prosedur komputer sudah sangat matang dan siap dipraktikkan!' : 'Kerja bagus! Pelajari kembali materi 14 komponen dan langkah-langkah prosedur di atas, lalu coba kuis lagi untuk hasil terbaik!'}
                </p>
            </div>
        `;
        if (quizFeedbackBox) quizFeedbackBox.className = 'quiz-feedback-box';
        if (btnNextQuiz) btnNextQuiz.style.display = 'none';
        if (btnRestartQuiz) {
            btnRestartQuiz.style.display = 'inline-flex';
        }
        playBeep('success');
    }

    if (btnRestartQuiz) {
        btnRestartQuiz.addEventListener('click', () => {
            currentQuizIdx = 0;
            quizScore = 0;
            renderQuizQuestion();
            playBeep('click');
        });
    }

    renderQuizQuestion();

    /* ==========================================================================
       6. NAVBAR & SMOOTH SCROLL & BACK TO TOP
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            if (backToTopBtn) backToTopBtn.classList.add('visible');
        } else {
            if (backToTopBtn) backToTopBtn.classList.remove('visible');
        }

        // Active link highlighting based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(sec => {
            const sectionHeight = sec.offsetHeight;
            const sectionTop = sec.offsetTop - 120;
            const sectionId = sec.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
