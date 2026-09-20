import { ClassMateriGroup } from '../types';

export const materiData: ClassMateriGroup[] = [
  {
    kelas: 4,
    dot: 'kelas4',
    title: 'MATERI KELAS 4',
    percentageText: '10 Soal (20%)',
    topics: [
      {
        title: 'Kalimat Efektif',
        desc: 'Kalimat efektif adalah kalimat yang memenuhi syarat: hemat kata, jelas maknanya, sesuai dengan kaidah tata bahasa (PUEBI/EYD), dan logis. Kalimat efektif mengungkapkan gagasan secara tepat, ringkas, dan tidak berbelit-belit.',
        points: [
          'Hemat kata: tidak menggunakan kata-kata yang berulang atau berlebihan (misal: "sangat manis sekali" -> "sangat manis")',
          'Jelas: maknanya mudah dipahami dan tidak menimbulkan tafsir ganda (ambigu)',
          'Logis: hubungan gagasan masuk akal dan dapat diterima nalar',
          'Sesuai kaidah: memiliki unsur gramatikal minimal Subjek dan Predikat (SPOK) dengan ejaan yang tepat'
        ],
        contoh: 'Efektif: "Budi pergi ke sekolah bersama kakaknya." | Tidak efektif: "Budi itu dia pergi berjalan ke sekolah itu bersama dengan kakaknya."'
      },
      {
        title: 'Kalimat Majemuk',
        desc: 'Kalimat majemuk adalah kalimat yang terdiri dari dua atau lebih klausa yang saling berhubungan. Klausa adalah kelompok kata yang memiliki unsur subjek dan predikat.',
        points: [
          'Majemuk setara: klausa-klausanya sejajar, dihubungkan kata penghubung seperti "dan", "atau", "tetapi", "serta"',
          'Majemuk bertingkat: terdapat induk kalimat (klausa utama) dan anak kalimat (klausa bawahan), dihubungkan kata "karena", "ketika", "jika", "agar", "meskipun"',
          'Majemuk campuran: perpaduan antara majemuk setara dan bertingkat dalam satu kalimat'
        ],
        contoh: 'Setara: "Adik menggambar pemandangan dan kakak membaca buku cerita." | Bertingkat: "Rina tidak masuk sekolah karena badannya demam tinggi."'
      },
      {
        title: 'Konjungsi Antarkalimat',
        desc: 'Konjungsi antarkalimat adalah kata penghubung yang bertugas menghubungkan dua kalimat utuh yang terpisah oleh tanda titik (.). Konjungsi ini selalu diletakkan di awal kalimat baru dan diawali huruf kapital.',
        points: [
          'Menghubungkan dua kalimat mandiri yang berbeda',
          'Selalu diawali huruf kapital dan biasanya diikuti tanda koma (,)',
          'Contoh konjungsi: Namun, Oleh karena itu, Dengan demikian, Meskipun demikian, Sebaliknya, Jadi, Selanjutnya, Kemudian'
        ],
        contoh: 'Hujan deras mengguyur kota sejak dini hari. Oleh karena itu, beberapa ruas jalan utama tergenang air.'
      },
      {
        title: 'Kalimat Fakta dan Opini',
        desc: 'Kalimat fakta berisi peristiwa nyata yang benar-benar terjadi dan dapat dibuktikan kebenarannya dengan data konkret. Sedangkan kalimat opini memuat pendapat, anggapan, atau perasaan subjektif yang belum tentu benar bagi setiap orang.',
        points: [
          'Fakta: dapat diverifikasi, ada data angka/waktu/tempat yang pasti, bersifat objektif',
          'Opini: bersifat perkiraan atau penilaian pribadi, menggunakan kata sifat relatif seperti "indah", "enak", "sebaiknya", "paling", "menurut saya"'
        ],
        contoh: 'Fakta: "Indonesia memproklamasikan kemerdekaan pada 17 Agustus 1945." | Opini: "Pantai Kuta adalah pantai paling menakjubkan di seluruh Indonesia."'
      }
    ]
  },
  {
    kelas: 5,
    dot: 'kelas5',
    title: 'MATERI KELAS 5',
    percentageText: '25 Soal (50%)',
    topics: [
      {
        title: 'Imbuhan (Afiks): pe-, me-, -kan, -lah, pe-an',
        desc: 'Imbuhan adalah bunyi atau morfem yang dibubuhkan pada kata dasar untuk membentuk kata baru dengan makna dan kategori gramatikal yang baru.',
        points: [
          'pe-: membentuk kata benda yang menyatakan pelaku/profesi (lari -> pelari, tari -> penari, lukis -> pelukis)',
          'me-: membentuk kata kerja aktif transitif atau intransitif (baca -> membaca, tulis -> menulis, sapu -> menyapu)',
          '-kan: menyatakan sebab-akibat, melakukan untuk orang lain, atau mengarahkan objek (jatuh -> menjatuhkan, kirim -> mengirimkan)',
          '-lah: berfungsi sebagai partikel penegas instruksi/keharusan (baca -> bacalah, dengar -> dengarkanlah)',
          'pe-an: membentuk kata benda abstrak yang menyatakan proses, hal, atau tempat (ajar -> pelajaran, didik -> pendidikan, rawat -> perawatan)'
        ],
        contoh: 'Kata dasar "tari" diberi imbuhan pe- menjadi "penari" (orang yang menari); "didik" diberi pe-an menjadi "pendidikan".'
      },
      {
        title: 'Unsur Intrinsik Cerita',
        desc: 'Unsur intrinsik adalah unsur-unsur pembangun yang secara langsung membentuk isi karya sastra atau cerita dari dalam.',
        points: [
          'Tema: gagasan utama atau dasar pemikiran seluruh alur cerita (misal: kejujuran, persahabatan, kepahlawanan)',
          'Alur (plot): rangkaian jalinan peristiwa yang membentuk cerita (awal/pengenalan, komplikasi/konflik, klimaks, dan penyelesaian/resolusi)',
          'Penokohan/Karakter: penggambaran watak tokoh (protagonis berwatak baik, antagonis berwatak jahat/penentang, tritagonis penengah)',
          'Latar (setting): keterangan tempat, waktu peristiwa, dan suasana batin/sosial dalam cerita',
          'Sudut pandang: posisi pengarang dalam membawakan cerita (orang pertama: "aku/saya"; orang ketiga: "dia/mereka/nama tokoh")',
          'Amanat: pesan budi pekerti atau nasihat moral yang ingin disampaikan penulis kepada pembaca'
        ],
        contoh: 'Dalam fabel "Kancil dan Buaya", temanya adalah kecerdikan, tokoh utamanya si Kancil yang cerdik, berlatar di tepi sungai pada siang hari, amanatnya jangan mudah tertipu.'
      },
      {
        title: 'Teks Nonfiksi',
        desc: 'Teks nonfiksi adalah tulisan yang memuat informasi faktual, ilmiah, dan nyata berdasarkan data, pengamatan, atau kajian objektif, bukan khayalan penulis.',
        points: [
          'Memuat fakta yang dapat diuji kebenarannya',
          'Menggunakan ragam bahasa baku dan kata bermakna denotatif (makna sebenarnya)',
          'Disusun secara runtut, logis, dan informatif',
          'Contoh tulisan: teks berita, artikel ensiklopedia, buku biografi, laporan pengamatan ilmiah'
        ],
        contoh: '"Candi Borobudur dibangun pada abad ke-8 oleh Dinasti Syailendra dan merupakan candi Buddha terbesar di dunia."'
      },
      {
        title: 'Majas (Gaya Bahasa)',
        desc: 'Majas adalah gaya bahasa kiasan yang digunakan pengarang untuk memberikan efek estetis dan menghidupkan gambaran angan bagi pembaca.',
        points: [
          'Metafora: perbandingan langsung dua objek secara analogis tanpa kata pembanding ("Dewi adalah bintang kelas")',
          'Personifikasi: penginsanan benda mati seolah-olah memiliki nyawa atau perilaku manusia ("Angin malam membelai rambutnya")',
          'Hiperbola: ungkapan yang melebih-lebihkan kenyataan hingga melampaui logika ("Jeritannya membelah angkasa")',
          'Simile (Perumpamaan): perbandingan eksplisit menggunakan kata hubung pembanding seperti, bagai, laksana, ibarat ("Wajahnya berseri laksana rembulan purnama")'
        ],
        contoh: 'Personifikasi: "Pena itu menari-nari di atas kertas putih." | Hiperbola: "Keringatnya mengucur bagaikan air bah."'
      },
      {
        title: 'Teks Narasi, Deskripsi, dan Eksposisi',
        desc: 'Tiga jenis paragraf atau teks yang memiliki tujuan komunikatif berbeda dalam penyampaian ide.',
        points: [
          'Teks Narasi: menceritakan rangkaian peristiwa berdasarkan urutan kronologis waktu, ada tokoh dan peristiwa',
          'Teks Deskripsi: menggambarkan wujud fisik, rasa, atau panorama suatu objek secara rinci sehingga pembaca seolah melihat atau merasakan sendiri',
          'Teks Eksposisi: memaparkan pengetahuan, konsep, atau petunjuk operasional secara ringkas, padat, dan lugas'
        ],
        contoh: 'Narasi: "Minggu pagi, kami berangkat mendaki bukit..." | Deskripsi: "Air terjun itu memiliki tinggi 20 meter, airnya sangat bening dan sejuk..." | Eksposisi: "Langkah-langkah mencuci tangan yang higienis..."'
      },
      {
        title: 'Jenis Kalimat Berdasarkan Fungsi Komunikasi',
        desc: 'Kalimat dibedakan berdasarkan tujuan penutur saat berbicara kepada mitra tutur.',
        points: [
          'Kalimat Perintah (Imperatif): menuntut tindakan pendengar ("Kumpulkan lembar jawaban sekarang!")',
          'Kalimat Ajakan: membujuk bersama melakukan sesuatu dengan kata "ayo", "mari" ("Mari kita jaga kebersihan kelas!")',
          'Kalimat Harapan: menyatakan doa atau harapan dengan kata "semoga", "mudah-mudahan" ("Semoga cita-citamu tercapai!")',
          'Kalimat Larangan: melarang suatu perbuatan dengan kata "jangan", "dilarang" ("Jangan membuang sampah sembarangan!")'
        ]
      },
      {
        title: 'Catatan Perjalanan',
        desc: 'Catatan perjalanan adalah rekaman tulisan autobiografis tentang pengalaman, pemandangan, dan kesan yang dirasakan selama menempuh rute perjalanan tertentu yang disusun secara runtut.',
        points: [
          'Disusun kronologis (menurut urutan waktu perjalanan)',
          'Memuat detail lokasi, sarana transportasi, waktu singgah, dan kesan batin'
        ],
        contoh: '"Hari pertama tiba di Yogyakarta, kami langsung mencicipi gudeg di Wijilan sebelum melanjutkan perjalanan ke Malioboro."'
      },
      {
        title: 'Kalimat Majemuk Setara dan Majemuk Bertingkat',
        desc: 'Kalimat majemuk menggabungkan dua klausa atau lebih. Kalimat majemuk setara menghubungkan klausa yang kedudukannya sejajar, sedangkan majemuk bertingkat memiliki induk kalimat dan anak kalimat.',
        points: [
          'Setara: kedua klausa memiliki kedudukan sejajar dan sering dihubungkan dan, atau, tetapi, lalu, kemudian',
          'Bertingkat: satu klausa menjadi bagian penjelas bagi klausa lain dan dapat memakai karena, ketika, jika, agar, sehingga, walaupun',
          'Cara membedakan: cari hubungan antarklausa dan kata hubung yang digunakan',
          'Kalimat setara: Rina membaca buku dan Dodi mengerjakan tugas',
          'Kalimat bertingkat: Rina belajar karena besok ada ujian'
        ],
        contoh: 'Setara: "Ayah memasak dan Ibu menyiapkan meja." Bertingkat: "Ayah memasak karena tamu akan datang."'
      },
      {
        title: 'Informasi Sebab-Akibat',
        desc: 'Informasi yang menerangkan keterkaitan antara suatu peristiwa pemicu (kausalitas) dan dampak yang dihasilkannya.',
        points: [
          'Sebab: kondisi awal yang menimbulkan kejadian',
          'Akibat: hasil atau konsekuensi dari kondisi tersebut',
          'Kata penghubung: karena, sebab, akibatnya, sehingga, oleh karena itu'
        ],
        contoh: '"Sungai tersumbat oleh tumpukan sampah plastik (sebab), sehingga air meluap ke perkampungan warga saat hujan lebat (akibat)."'
      }
    ]
  },
  {
    kelas: 6,
    dot: 'kelas6',
    title: 'MATERI KELAS 6',
    percentageText: '15 Soal (30%)',
    topics: [
      {
        title: 'Sinonim dan Antonim',
        desc: 'Sinonim adalah padanan kata yang memiliki arti sama atau mirip. Antonim adalah lawan kata yang menunjukkan pertentangan makna.',
        points: [
          'Sinonim memperkaya variasi tulisan agar tidak monoton (pandai = pintar = cerdas, gembira = sukacita = riang)',
          'Antonim mempertajam komparasi makna (luas x sempit, hemat x boros, tegak x condong)'
        ],
        contoh: 'Sinonim: "elok" sama artinya dengan "indah". Antonim: "tinggi" berlawanan dengan "rendah".'
      },
      {
        title: 'Informasi, Ide Pokok, dan Ide Pendukung',
        desc: 'Struktur informasi dalam paragraf terdiri dari gagasan utama (ide pokok) dan gagasan penjelas (ide pendukung).',
        points: [
          'Ide Pokok: inti sari atau masalah utama yang dibahas dalam suatu paragraf',
          'Paragraf Deduktif: ide pokok terletak di awal paragraf',
          'Paragraf Induktif: ide pokok terletak di akhir paragraf (berisi simpulan)',
          'Paragraf Campuran: ide pokok ada di awal dan ditegaskan kembali di akhir',
          'Ide Pendukung: rincian fakta, contoh, atau alasan yang menguraikan dan memperkuat ide pokok'
        ],
        contoh: 'Ide Pokok: "Menjaga kesehatan gigi sangat penting sejak dini." Ide Pendukung: "Gigi berlubang dapat memicu infeksi dan mengganggu konsentrasi belajar."'
      },
      {
        title: 'Simpulan Teks',
        desc: 'Simpulan adalah rumusan intisari atau penilaian akhir yang ditarik dari keterkaitan ide pokok seluruh paragraf dalam sebuah teks utuh.',
        points: [
          'Simpulan bukan sekadar memotong kalimat (itu ikhtisar ringkas), melainkan mengambil intisari pesan utama',
          'Langkah: baca menyeluruh -> identifikasi ide pokok setiap paragraf -> hubungkan gagasan utama -> buat rumusan ringkas yang menyeluruh'
        ],
        contoh: 'Simpulan teks banjir: "Bencana banjir di perkotaan dapat diatasi bila warga menghentikan kebiasaan membuang sampah ke saluran air dan pemerintah memperbanyak ruang resapan."'
      },
      {
        title: 'Teks Laporan Hasil Pengamatan dan Wawancara',
        desc: 'Teks laporan menyajikan data konkret dari aktivitas observasi langsung ke lapangan atau tanya jawab terencana dengan narasumber yang berwenang.',
        points: [
          'Laporan Pengamatan (Observasi): mendeskripsikan fakta objek secara teliti, faktual, dan sistematis',
          'Laporan Wawancara: menyajikan tanya jawab terarah seputar topik tertentu dengan pakar atau narasumber',
          'Ciri-ciri: objektif, faktual, memakai ragam bahasa baku, data valid dan terukur',
          'Sistematika: Judul, Tujuan, Waktu & Tempat Pelaksanaan, Objek/Narasumber, Hasil Temuan, Simpulan'
        ],
        contoh: 'Pengamatan: "Pada hari ke-5, biji kacang hijau mulai menumbuhkan radikula sepanjang 1,5 cm ke arah bawah."'
      }
    ]
  }
];
