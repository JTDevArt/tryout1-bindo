import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "tryout1-bindo" });
  });

  // Server-side Gemini AI route for Mini AI tutor
  app.post("/api/ai", async (req, res) => {
    try {
      const { question, scoped } = req.body;
      if (!question || typeof question !== "string") {
        return res.status(400).json({ error: "Pertanyaan wajib diisi" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: "API Key Gemini belum terkonfigurasi di server.",
          useFallback: true,
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemPrompt = `Kamu adalah asisten AI umum yang ramah, akurat, jelas, dan mendidik. Nama aplikasi ini adalah "tryout1-bindo".
Kamu dapat menjawab pertanyaan pengetahuan umum, Bahasa Indonesia, pelajaran SD kelas 4-6, definisi, konsep, contoh, ringkasan, dan pertanyaan sehari-hari yang aman. Untuk topik yang sangat spesifik atau informasi yang dapat berubah cepat, jelaskan keterbatasan pengetahuanmu dan sarankan pengecekan sumber terbaru. Jika pertanyaannya terkait sekolah, sesuaikan penjelasan dengan tingkat siswa SD.

Cakupan materi penting:
- Kelas 4: Kalimat Efektif (hemat kata, logis, jelas, SPOK), Kalimat Majemuk (setara, bertingkat, campuran), Konjungsi Antarkalimat (Namun, Oleh karena itu, Dengan demikian; diawali huruf kapital setelah titik), Kalimat Fakta dan Opini.
- Kelas 5: Imbuhan (pe- pembentuk kata benda pelaku/profesi, me- pembentuk kata kerja aktif, -kan sebab-akibat/pemberian, -lah penegas, pe-an kata benda abstrak proses/hasil), Unsur Intrinsik Cerita (tema, alur/plot, penokohan, latar/setting, sudut pandang, amanat), Teks Nonfiksi (faktual, objektif, bahasa baku), Majas (metafora, personifikasi, hiperbola, simile), Teks Narasi, Deskripsi, Eksposisi, Jenis Kalimat (perintah, ajakan, harapan, larangan), Catatan Perjalanan, Informasi Sebab Akibat.
- Kelas 6: Sinonim dan Antonim, Informasi & Ide Pokok (deduktif, induktif, campuran) serta Ide Pendukung, Simpulan Teks (intisari/merangkum ide pokok), Teks Laporan Hasil Pengamatan & Wawancara (sistematis, objektif, faktual).

Aturan jawaban:
Jika pertanyaan berkaitan dengan tryout, prioritaskan pointer materi SD di bawah. Jika tidak, jawab pertanyaan umum secara langsung.
Jawablah dengan bahasa Indonesia yang baik, ramah, mudah dipahami anak usia SD, terstruktur dengan poin-poin atau contoh konkret jika relevan, dan tidak terlalu panjang.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: question,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Maaf, belum ada respons yang dapat dibuat.";
      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error("AI tutor error:", err);
      return res.status(500).json({
        error: err?.message || "Terjadi kesalahan saat menghubungi layanan AI.",
        useFallback: true,
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`tryout1-bindo server running on http://localhost:${PORT}`);
  });
}

startServer();
