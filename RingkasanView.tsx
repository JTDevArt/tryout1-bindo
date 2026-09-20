import React, { useMemo, useState } from 'react';
import { BookOpenCheck, Check, ChevronDown, Lightbulb, Search, Sparkles } from 'lucide-react';
import { materiData } from '../data/materiData';
import { GradeLevel } from '../types';

export const extraExamples: Record<string, string[]> = {
  'Kalimat Efektif': [
    'Tidak efektif: Para siswa-siswa sedang belajar. → Efektif: Para siswa sedang belajar.',
    'Tidak efektif: Ia masuk ke dalam kelas. → Efektif: Ia masuk kelas.',
    'Efektif: Rani membaca buku di perpustakaan karena besok ada ujian.'
  ],
  'Kalimat Majemuk': [
    'Setara: Raka membaca buku dan Dini menulis rangkuman.',
    'Bertingkat: Raka belajar karena besok ada ujian.',
    'Campuran: Raka belajar karena besok ada ujian dan Dini membuat rangkuman.'
  ],
  'Konjungsi Antarkalimat': [
    'Hujan turun sangat deras. Namun, pertandingan tetap berlangsung.',
    'Ia rajin membaca. Oleh karena itu, wawasannya bertambah.',
    'Data sudah diperiksa. Dengan demikian, laporan dapat diselesaikan.'
  ],
  'Kalimat Fakta dan Opini': [
    'Fakta: Air membeku pada suhu 0°C pada tekanan standar.',
    'Opini: Buku itu sangat menarik untuk dibaca.',
    'Petunjuk: cari data yang dapat dibuktikan untuk mengenali fakta.'
  ],
  'Imbuhan (Afiks): pe-, me-, -kan, -lah, pe-an': [
    'pe-: tulis → penulis; me-: baca → membaca.',
    '-kan: bersih → bersihkan; -lah: duduk → duduklah.',
    'pe-an: didik → pendidikan; ajar → pelajaran.'
  ],
  'Unsur Intrinsik Cerita': [
    'Tema = gagasan utama; alur = urutan peristiwa; tokoh = pelaku cerita.',
    'Latar menjelaskan tempat, waktu, dan suasana.',
    'Amanat adalah pesan yang dapat dipetik dari cerita.'
  ],
  'Teks Nonfiksi': [
    'Berita, ensiklopedia, biografi, dan laporan pengamatan dapat termasuk nonfiksi.',
    'Contoh: “Kucing adalah mamalia.” Pernyataan ini dapat diperiksa kebenarannya.',
    'Saat membaca nonfiksi, bedakan data/fakta dari pendapat penulis.'
  ],
  'Majas (Gaya Bahasa)': [
    'Personifikasi: Daun-daun menari tertiup angin.',
    'Metafora: Dia adalah bintang kelas.',
    'Hiperbola: Suaranya menggelegar membelah langit.'
  ],
  'Teks Narasi, Deskripsi, dan Eksposisi': [
    'Narasi: menceritakan kejadian secara berurutan.',
    'Deskripsi: menggambarkan objek secara rinci.',
    'Eksposisi: menjelaskan informasi secara jelas dan logis.'
  ],
  'Jenis Kalimat Berdasarkan Fungsi Komunikasi': [
    'Perintah: Tolong rapikan meja itu!',
    'Ajakan: Mari kita membaca bersama.',
    'Harapan: Semoga kamu berhasil. Larangan: Jangan berlari di koridor.'
  ],
  'Catatan Perjalanan': [
    'Awali dengan waktu/tempat, lanjutkan urutan perjalanan, lalu tuliskan pengalaman atau kesan.',
    'Contoh singkat: “Pukul 08.00 kami tiba di museum. Setelah itu, kami mengamati koleksi...”'
  ],
  'Kalimat Majemuk Setara dan Majemuk Bertingkat': [
    'Setara: Aku membaca dan adikku menggambar.',
    'Bertingkat: Aku belajar karena besok ada ujian.',
    'Kata hubung dan hubungan antarklausa membantu membedakan keduanya.'
  ],
  'Informasi Sebab-Akibat': [
    'Sebab: hujan deras dan saluran tersumbat. Akibat: jalan tergenang.',
    'Kata penanda: karena, sebab, sehingga, akibatnya, oleh karena itu.'
  ],
  'Sinonim dan Antonim': [
    'Sinonim: cerdas = pintar. Antonim: tinggi × rendah.',
    'Pilih kata berdasarkan konteks kalimat, bukan hanya kemiripan bunyi.'
  ],
  'Informasi, Ide Pokok, dan Ide Pendukung': [
    'Ide pokok adalah inti pembahasan paragraf.',
    'Ide pendukung berupa alasan, data, contoh, atau penjelasan yang memperkuat ide pokok.',
    'Baca seluruh paragraf sebelum menentukan ide pokok.'
  ],
  'Simpulan Teks': [
    'Baca seluruh teks → cari ide pokok → gabungkan inti informasi → tulis singkat dengan kata sendiri.',
    'Simpulan harus mencakup inti teks, bukan hanya mengambil satu kalimat.'
  ],
  'Teks Laporan Hasil Pengamatan dan Wawancara': [
    'Pengamatan: catat objek dan data yang benar-benar terlihat/terukur.',
    'Wawancara: siapkan pertanyaan, catat jawaban narasumber, lalu susun hasilnya secara sistematis.',
    'Hindari menambahkan data yang tidak ditemukan.'
  ]
};

export const RingkasanView: React.FC = () => {
  const [kelas, setKelas] = useState<'all' | '4' | '5' | '6'>('all');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const groups = useMemo(() => materiData.filter(g => kelas === 'all' || g.kelas === Number(kelas)).map(g => ({
    ...g,
    topics: g.topics.filter(t => {
      const q = search.toLowerCase().trim();
      if (!q) return true;
      return [t.title, t.desc, ...t.points, t.contoh || ''].join(' ').toLowerCase().includes(q);
    })
  })).filter(g => g.topics.length), [kelas, search]);

  return <div className="space-y-6 animate-fade-in">
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/15">
      <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-white/10 blur-2xl" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold mb-3"><BookOpenCheck className="w-4 h-4" /> Peta Belajar Lengkap</div>
        <h2 className="text-2xl sm:text-3xl font-black">Ringkasan Bahasa Indonesia</h2>
        <p className="mt-2 max-w-3xl text-sm text-indigo-100 leading-relaxed">Ringkasan cepat dari seluruh pointer Kelas 4–6. Gunakan bagian ini untuk memahami inti materi, mengingat ciri-ciri penting, dan melihat contoh sebelum latihan atau tryout.</p>
      </div>
    </section>

    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div className="flex gap-2 flex-wrap">
        {(['all','4','5','6'] as const).map(k => <button key={k} onClick={() => setKelas(k)} className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${kelas===k?'bg-indigo-600 text-white border-indigo-600':'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>{k==='all'?'Semua Kelas':`Kelas ${k}`}</button>)}
      </div>
      <div className="relative sm:w-72"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari ringkasan..." className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500" /></div>
    </div>

    <div className="space-y-8">
      {groups.map(group => <section key={group.kelas}>
        <div className="flex items-center gap-2 mb-3"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /><h3 className="text-lg font-black text-slate-900 dark:text-white">MATERI KELAS {group.kelas}</h3><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">{group.topics.length} topik</span></div>
        <div className="grid md:grid-cols-2 gap-4">
          {group.topics.map(topic => { const id=`${group.kelas}-${topic.title}`; const expanded=open===id; const examples=extraExamples[topic.title] || [topic.contoh || 'Belum ada contoh tambahan.']; return <article key={id} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 overflow-hidden shadow-sm hover:shadow-md transition">
            <button onClick={()=>setOpen(expanded?null:id)} className="w-full text-left p-5 flex items-start justify-between gap-3"><div><div className="text-base font-black text-slate-900 dark:text-white">{topic.title}</div><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{topic.desc}</p></div><ChevronDown className={`w-5 h-5 flex-shrink-0 text-slate-400 transition ${expanded?'rotate-180':''}`} /></button>
            <div className="px-5 pb-5 space-y-3"><div className="space-y-1.5">{topic.points.map((p,i)=><div key={i} className="flex gap-2 text-xs text-slate-700 dark:text-slate-300"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5"/><span>{p}</span></div>)}</div>
              {topic.contoh && <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 p-3"><div className="flex gap-2 items-center text-xs font-bold text-indigo-700 dark:text-indigo-300"><Sparkles className="w-3.5 h-3.5"/>Contoh utama</div><p className="text-xs mt-1 text-slate-700 dark:text-slate-300">{topic.contoh}</p></div>}
              {expanded && <div className="rounded-xl bg-amber-50 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-900/60 p-3 space-y-2"><div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-300"><Lightbulb className="w-3.5 h-3.5"/>Contoh lainnya</div>{examples.map((ex,i)=><div key={i} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">• {ex}</div>)}</div>}
              <button onClick={()=>setOpen(expanded?null:id)} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">{expanded?'Sembunyikan contoh':'Lihat contoh lainnya →'}</button>
            </div>
          </article>})}
        </div>
      </section>)}
    </div>
    {!groups.length && <div className="p-10 text-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-500">Materi yang dicari belum ditemukan.</div>}
  </div>;
};
