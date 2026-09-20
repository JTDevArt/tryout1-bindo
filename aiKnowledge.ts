export interface AIKnowledgeEntry {
  keywords: string[];
  response: string;
}

export const aiKnowledge: AIKnowledgeEntry[] = [
  {
    keywords: ["kalimat efektif", "efektif"],
    response: `Kalimat efektif adalah kalimat yang mampu menyampaikan gagasan secara utuh, hemat kata, jelas maknanya, sesuai kaidah tata bahasa (SPOK/PUEBI), dan logis.

Ciri-ciri pokok kalimat efektif:
1. Hemat kata: tidak menggunakan kata-kata yang mubazir atau berulang (misal: "para guru-guru sekalian" ➔ "para guru").
2. Jelas maknanya: tidak menimbulkan tafsir ganda (ambigu).
3. Logis: hubungan antargagasan masuk akal dan dapat diterima nalar.
4. Sesuai kaidah bahasa: memiliki unsur Subjek dan Predikat yang jelas.

Contoh:
• Efektif: "Siswa kelas 6 mengunjungi museum sejarah kemarin pagi."
• Tidak Efektif: "Para siswa-siswa kelas 6 itu pada mengunjungi museum sejarah yang mana kemarin pagi."`
  },
  {
    keywords: ["kalimat majemuk", "majemuk setara", "majemuk bertingkat", "klausa"],
    response: `Kalimat majemuk adalah kalimat yang terdiri atas dua klausa atau lebih yang saling berhubungan.

Jenis-jenis kalimat majemuk:
1. Majemuk Setara: kedudukan antarklausa sederajat atau setara, dihubungkan kata hubung "dan", "atau", "tetapi", "serta".
   Contoh: "Kakak belajar berhitung dan adik menggambar pemandangan."
2. Majemuk Bertingkat: kedudukan antarklausa tidak setara, terdiri dari induk kalimat dan anak kalimat. Dihubungkan dengan kata hubung "karena", "ketika", "jika", "agar", "meskipun".
   Contoh: "Budi tidak dapat mengikuti upacara bendera karena badannya sedang demam."
3. Majemuk Campuran: gabungan majemuk setara dan majemuk bertingkat dalam satu susunan kalimat.`
  },
  {
    keywords: ["konjungsi antarkalimat", "konjungsi antar kalimat", "konjungsi"],
    response: `Konjungsi antarkalimat adalah kata hubung yang menghubungkan dua kalimat mandiri yang terpisah oleh tanda titik (.). 

Kaidah penulisan konjungsi antarkalimat:
• Selalu diletakkan pada posisi paling depan kalimat baru.
• Wajib diawali huruf kapital setelah tanda titik (.).
• Umumnya diikuti tanda koma (,).

Contoh konjungsi antarkalimat:
• Namun, ... (menyatakan pertentangan)
• Oleh karena itu, ... (menyatakan akibat)
• Dengan demikian, ... (menyatakan kesimpulan)
• Meskipun demikian, ... (menyatakan pertentangan konsesif)
• Sebaliknya, ... (menyatakan kebalikan)

Contoh: "Cuaca pagi ini tampak sangat mendung. Namun, para petani tetap berangkat ke sawah dengan penuh semangat."`
  },
  {
    keywords: ["fakta", "opini"],
    response: `Perbedaan Kalimat Fakta dan Opini:

1. Kalimat Fakta:
• Berisi peristiwa, data empiris, atau kenyataan yang benar-benar terjadi.
• Kebenarannya dapat dibuktikan dan diverifikasi oleh siapa saja.
• Bersifat objektif, sering dilengkapi data angka, tanggal, dan lokasi pasti.
• Contoh: "Proklamasi Kemerdekaan Republik Indonesia dibacakan pada tanggal 17 Agustus 1945 di Jakarta."

2. Kalimat Opini:
• Berisi pendapat, perkiraan, anggapan, atau perasaan subjektif seseorang.
• Belum tentu diakui atau disepakati kebenarannya oleh orang lain.
• Ditandai dengan kata sifat relatif: "paling indah", "sangat lezat", "sebaiknya", "menurut saya".
• Contoh: "Pantai Kuta adalah pantai paling menawan di seluruh Pulau Dewata."`
  },
  {
    keywords: ["imbuhan", "pe-", "me-", "-kan", "-lah", "pe-an", "afiks"],
    response: `Imbuhan (Afiks) adalah bunyi yang dibubuhkan pada kata dasar untuk membentuk kata turunan:

1. Awalan pe-: membentuk kata benda yang menyatakan pelaku atau profesi.
   • lari ➔ pelari | tari ➔ penari | lukis ➔ pelukis

2. Awalan me-: membentuk kata kerja aktif (melakukan tindakan).
   • baca ➔ membaca | tulis ➔ menulis | sapu ➔ menyapu

3. Akhiran -kan: menyatakan sebab-akibat atau melakukan tindakan kepada objek.
   • jatuh ➔ menjatuhkan | kirim ➔ mengirimkan

4. Partikel -lah: menegaskan instruksi atau harapan agar lebih santun atau berbobot.
   • makan ➔ makanlah | baca ➔ bacalah

5. Konfiks pe-an: membentuk kata benda abstrak yang menyatakan proses, hasil, atau hal tertentu.
   • didik ➔ pendidikan | ajar ➔ pelajaran | layan ➔ pelayanan`
  },
  {
    keywords: ["unsur intrinsik", "tema", "alur", "plot", "penokohan", "latar", "setting", "amanat", "sudut pandang"],
    response: `Unsur intrinsik adalah bagian-bagian pembangun yang membentuk sebuah karya cerita dari dalam:

1. Tema: gagasan sentral atau ide pokok pemikiran cerita (misal: persahabatan, kejujuran).
2. Alur (Plot): jalinan urutan peristiwa dari awal (orientasi), pertikaian (konflik/klimaks), hingga akhir (penyelesaian/resolusi).
3. Penokohan: cara pengarang melukiskan watak tokoh:
   • Protagonis: tokoh berwatak baik/pembawa nilai positif.
   • Antagonis: tokoh penentang/berwatak jahat.
   • Tritagonis: tokoh penengah/pembantu.
4. Latar (Setting): meliputi latar tempat (di mana), waktu (kapan), dan suasana (bagaimana suasananya).
5. Sudut Pandang: posisi pencerita (orang pertama: "aku/saya"; orang ketiga: "dia/mereka").
6. Amanat: nasihat atau pesan budi pekerti luhur yang hendak disampaikan pengarang kepada pembaca.`
  },
  {
    keywords: ["nonfiksi", "non fiksi", "non-fiksi", "fiksi"],
    response: `Teks Nonfiksi adalah karangan yang ditulis berdasarkan fakta, kenyataan empiris, data ilmiah, dan pengamatan nyata, bukan karangan khayalan/rekaan.

Ciri-ciri teks nonfiksi:
• Memuat informasi faktual yang dapat diverifikasi kebenarannya.
• Bersifat objektif dan tidak memihak.
• Menggunakan ragam bahasa baku dan kata bermakna denotatif (sebenarnya).
• Disajikan secara runtut dan informatif.

Contoh teks nonfiksi:
• Teks berita koran/portal berita
• Artikel ensiklopedia
• Buku biografi dan autobiografi tokoh
• Laporan hasil pengamatan ilmiah`
  },
  {
    keywords: ["majas", "metafora", "personifikasi", "hiperbola", "simile", "gaya bahasa"],
    response: `Majas adalah gaya bahasa kiasan yang digunakan untuk memperindah tulisan dan memberikan kesan mendalam bagi pembaca.

Jenis-jenis majas penting:
1. Metafora: perbandingan langsung dua hal tanpa kata pembanding.
   Contoh: "Budi adalah anak emas di keluarganya." / "Sang raja siang mulai bersinar."
2. Personifikasi: mengumpamakan benda mati atau alam bertingkah laku seperti manusia bernyawa.
   Contoh: "Pohon kelapa melambai-lambai di tepi pantai tertiup angin."
3. Hiperbola: ungkapan yang melebih-lebihkan keadaan secara ekstrem melampaui kenyataan.
   Contoh: "Air matanya mengalir deras hingga membasahi seisi ruangan."
4. Simile (Perumpamaan): perbandingan eksplisit memakai kata bantu: bagai, laksana, ibarat, bak.
   Contoh: "Wajahnya berseri-seri laksana rembulan di malam purnama."`
  },
  {
    keywords: ["narasi", "deskripsi", "eksposisi", "jenis teks"],
    response: `Perbedaan Tiga Jenis Teks:

1. Teks Narasi:
• Tujuan: menceritakan alur peristiwa yang dialami tokoh.
• Ciri: ada tokoh, urutan kronologis waktu (pagi, siang, lalu, kemudian), dan konflik.
• Contoh: "Pagi itu, Raka melangkahkan kaki menyusuri jalan setapak menuju puncak bukit..."

2. Teks Deskripsi:
• Tujuan: menggambarkan objek atau tempat secara rinci melalui panca indra.
• Ciri: pembaca seolah melihat, mendengar, atau merasakan sendiri objek tersebut.
• Contoh: "Ruang perpustakaan itu sangat bersih, deretan buku tersusun rapi di rak kayu jati yang harum..."

3. Teks Eksposisi:
• Tujuan: memaparkan informasi, pengetahuan, atau petunjuk secara ringkas dan lugas.
• Ciri: bersifat ilmiah, objektif, padat, dan memuat fakta penjelas.
• Contoh: "Langkah-langkah mencuci tangan bersih dengan sabun untuk mencegah penularan penyakit..."`
  },
  {
    keywords: ["perintah", "ajakan", "harapan", "larangan", "jenis kalimat"],
    response: `Empat Jenis Kalimat Berdasarkan Fungsinya:

1. Kalimat Perintah: menyuruh atau menuntut tindakan pendengar. Diakhiri tanda seru (!).
   Contoh: "Kumpulkan lembar jawabanmu sekarang juga!"

2. Kalimat Ajakan: membujuk bersama melakukan sesuatu dengan kata "ayo" atau "mari".
   Contoh: "Mari kita rawat taman sekolah agar tetap hijau dan asri!"

3. Kalimat Harapan: menyatakan doa atau keinginan positif di masa depan dengan kata "semoga" atau "mudah-mudahan".
   Contoh: "Semoga kamu berhasil meraih juara dalam perlombaan cerdas cermat ini!"

4. Kalimat Larangan: melarang suatu tindakan dengan kata "jangan" atau "dilarang". Diakhiri tanda seru (!).
   Contoh: "Jangan mencoret-coret meja belajar kelas!"`
  },
  {
    keywords: ["catatan perjalanan", "perjalanan"],
    response: `Catatan perjalanan adalah tulisan autobiografis yang merekam pengalaman pribadi pengarang selama melakukan perjalanan ke suatu destinasi tertentu.

Ciri-ciri penulisan:
• Disusun secara kronologis (runtut berdasarkan urutan waktu dari hari pertama, kedua, dan seterusnya).
• Memuat detail lokasi yang dikunjungi, sarana transportasi yang dinaiki, dan tempat singgah.
• Menguraikan kesan batin, keunikan budaya lokal, atau peristiwa berkesan yang dirasakan pengarang sepanjang rute.`
  },
  {
    keywords: ["sebab akibat", "sebab-akibat", "kausal", "akibat"],
    response: `Informasi Sebab-Akibat menerangkan hubungan kausalitas antara suatu pemicu (sebab) dan dampak lanjutan (akibat).

Konjungsi penghubung yang lazim digunakan:
• Menunjukkan sebab: karena, sebab, oleh karena.
• Menunjukkan akibat: sehingga, akibatnya, oleh sebab itu, oleh karena itu.

Contoh:
"Karena saluran pembuangan air tersumbat sampah plastik (sebab), jalan raya tergenang air saat hujan deras (akibat)."`
  },
  {
    keywords: ["sinonim", "antonim"],
    response: `Sinonim dan Antonim:

1. Sinonim (Persamaan Kata):
• Kata yang mempunyai makna sama atau sangat mirip.
• Berfungsi memperkaya ragam kosakata agar tulisan tidak terasa membosankan.
• Contoh:
  - pandai = cerdas = cakap
  - elok = indah = rupawan
  - asa = harapan = cita-cita
  - gembira = sukacita = riang

2. Antonim (Lawan Kata):
• Kata yang mempunyai pertentangan makna.
• Contoh:
  - hemat × boros
  - tinggi × rendah
  - pemberani × penakut
  - modern × tradisional`
  },
  {
    keywords: ["ide pokok", "gagasan utama", "ide pendukung", "paragraf deduktif", "paragraf induktif"],
    response: `Ide Pokok dan Ide Pendukung dalam Paragraf:

1. Ide Pokok (Gagasan Utama):
• Inti sari atau permasalahan pokok yang menjadi fondasi pengembangan seluruh kalimat dalam suatu paragraf.
• Letak ide pokok:
  - Paragraf Deduktif: ide pokok di awal kalimat paragraf.
  - Paragraf Induktif: ide pokok di akhir paragraf (berupa simpulan).
  - Paragraf Campuran: di awal paragraf dan ditegaskan kembali di akhir paragraf.

2. Ide Pendukung (Gagasan Penjelas):
• Kalimat-kalimat yang menguraikan rincian data, alasan, fakta pendukung, atau contoh konkret yang memperjelas ide pokok.`
  },
  {
    keywords: ["simpulan", "kesimpulan", "ringkasan"],
    response: `Simpulan Teks vs Ringkasan:

1. Simpulan Teks:
• Intisari menyeluruh yang ditarik dari perpaduan seluruh ide pokok dalam teks bacaan.
• Cara menyusun:
  a. Baca teks secara teliti dari awal sampai akhir.
  b. Tentukan ide pokok tiap-tiap paragraf.
  c. Hubungkan ide pokok tersebut menjadi satu rumusan padat yang merangkum pesan utama.

2. Perbedaan dengan Ringkasan:
• Ringkasan adalah penulisan kembali teks secara lebih pendek dengan mempertahankan urutan aslinya.
• Simpulan mengambil inti sari atau pelajaran berharga dari keseluruhan bacaan.`
  },
  {
    keywords: ["laporan", "pengamatan", "wawancara", "observasi"],
    response: `Teks Laporan Hasil Pengamatan dan Wawancara:

1. Laporan Pengamatan (Observasi):
• Berisi uraian fakta objektif dari kegiatan meneliti langsung suatu objek di lapangan.
• Sistematika: Judul, Tujuan Pengamatan, Waktu & Tempat, Objek Pengamatan, Hasil Pengamatan, Simpulan.

2. Laporan Wawancara:
• Berisi tanya jawab terarah antara pewawancara dan narasumber ahli tentang suatu topik bahasan.
• Sistematika: Judul, Tujuan, Waktu & Tempat, Nama Pewawancara & Narasumber, Ringkasan Hasil Tanya Jawab, Simpulan.

Ciri keduanya: faktual, objektif, menggunakan bahasa Indonesia baku, dan datanya valid.`
  }
];
