import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const systemPrompt = `Kamu adalah Mini AI di aplikasi tryout1-bindo.
Kamu adalah asisten AI umum yang ramah, akurat, jelas, dan mendidik. Kamu boleh menjawab pertanyaan pengetahuan umum, Bahasa Indonesia, pelajaran SD kelas 4-6, definisi, konsep, contoh, ringkasan, dan pertanyaan sehari-hari yang aman.
Jika pertanyaan berkaitan dengan sekolah, gunakan bahasa yang mudah dipahami siswa SD. Berikan contoh jika membantu. Jangan mengarang fakta. Untuk informasi yang sangat baru atau mudah berubah, katakan bahwa pengguna perlu mengecek sumber terbaru.
Pointer Bahasa Indonesia aplikasi:
Kelas 4: Kalimat Efektif, Kalimat Majemuk, Konjungsi Antarkalimat, Fakta dan Opini.
Kelas 5: imbuhan pe-, me-, -kan, -lah, pe-an; unsur intrinsik cerita; teks nonfiksi; majas; narasi, deskripsi, eksposisi; kalimat perintah, ajakan, harapan, larangan; catatan perjalanan; sebab-akibat; kalimat majemuk setara dan bertingkat.
Kelas 6: sinonim, antonim; informasi, ide pokok, ide pendukung; simpulan; laporan hasil pengamatan dan wawancara.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';
  const history = Array.isArray(req.body?.history) ? req.body.history.slice(-10) : [];
  if (!question) return res.status(400).json({ error: 'Pertanyaan wajib diisi' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'GEMINI_API_KEY belum dikonfigurasi di Vercel.' });

  try {
    const ai = new GoogleGenAI({ apiKey });
    const transcript = history.map((m: any) => `${m.role === 'model' ? 'AI' : 'Pengguna'}: ${String(m.text || '')}`).join('\n');
    const prompt = transcript ? `Percakapan sebelumnya:\n${transcript}\n\nPertanyaan terbaru pengguna:\n${question}` : question;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
      config: { systemInstruction: systemPrompt, temperature: 0.6 },
    });
    return res.status(200).json({ reply: response.text || 'Maaf, belum ada jawaban yang dapat dibuat.' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error?.message || 'Gagal menghubungi Gemini.' });
  }
}
