# KRTAS

Website KRTAS menggunakan Next.js App Router, TypeScript, Tailwind CSS, dan Supabase.

## Menjalankan

Variabel Supabase sudah disediakan melalui environment Vercel: `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (atau `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Jalankan `npm run dev` untuk preview lokal.

## Admin pertama

1. Buat user email + password melalui Supabase Auth.
2. Ambil UUID user tersebut dari Auth users.
3. Jalankan SQL berikut di SQL Editor Supabase: `insert into public.admins (user_id) values ('UUID_USER');`
4. Buka `/admin` dan masuk dengan akun tersebut.

Seluruh tabel aplikasi, seed empat layanan, dan kebijakan RLS dibuat oleh migrasi `create_krtas_schema` yang sudah diterapkan. Jangan mengirim dokumen rahasia atau data pribadi sensitif melalui formulir publik.
