# Dokumentasi Kode BSS-UINSA CBT

## Struktur Proyek
- `src/app/` (Expo Router): Berisi layar aplikasi.
- `src/components/`: Komponen UI reusable.
- `src/data/`: Data statis dan mock API (dummy data).
- `src/screens/`: Layar-layar utama (Home, Exam, History, dll).
- `src/theme/`: Definisi warna dan gaya (tokens).

## Daftar File & Fungsi
- `App.js`: Entry point aplikasi. Mengelola state navigasi global (`currentScreen`, `activeTab`) dan alur transisi antar layar.
- `src/screens/`:
  - `HomeScreen.js`: Dashboard utama, menampilkan statistik ujian dan tombol mulai.
  - `ExamScreen.js`: Halaman utama ujian, memuat logika timer dan pemilihan jawaban.
  - `ExamInstructionScreen.js`: Menampilkan instruksi sebelum ujian dimulai.
  - `HistoryScreen.js`: Menampilkan riwayat hasil ujian pengguna.
  - `ProfileScreen.js`: Informasi pengguna dan akses logout.
  - `SplashScreen.js`: Layar pembuka (logo/branding).
- `src/components/`:
  - `TabBar.js`: Navigasi bawah untuk beralih antar layar Home, History, dan Profile.
  - `ResultModal.js`: Pop-up modal menampilkan skor hasil ujian.
  - `QuestionNavModal.js`: Navigasi daftar pertanyaan ujian.
- `src/data/`:
  - `mockData.js`: Data awal (User, Stats, History).
  - `questions.js`: Kumpulan soal dan konfigurasi ujian.

## Alur Navigasi
Aplikasi menggunakan state berbasis `currentScreen` di `App.js` untuk berpindah antar layar:
- `splash`: Layar pembuka (transisi otomatis).
- `main`: Layar utama berisi Tab Bar (Home/History/Profile).
- `instruction`: Instruksi sebelum ujian.
- `exam`: Layar pengerjaan soal.
- `review`: Tampilan ulasan jawaban setelah ujian selesai.
