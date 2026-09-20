# Bindo Tryout 1 — Latest Base

## Vercel
1. Upload/import this project as a Vite project.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add Environment Variable:
   - `GEMINI_API_KEY` = your Gemini API key
5. Redeploy.

The Mini AI calls `/api/ai`, which is implemented as a Vercel serverless function. The API key is not placed in the frontend.

## Main changes
- New `Ringkasan` tab between Materi and Flashcards.
- Materi pointer panel for Kelas 4–6.
- Expandable “Lihat contoh lainnya” in Materi and Ringkasan.
- Added explicit Kelas 5 topic: Kalimat Majemuk Setara dan Majemuk Bertingkat.
- Mini AI broadened to general knowledge + school tutor with conversation context.
- Vercel-compatible `/api/ai` using Gemini.
- Tryout remains grouped: PG → Isian → Esai; questions/options are randomized within their section.
- Existing Flashcards, Latihan, Statistik, timer, results, retry, sound, and dark mode retained.
