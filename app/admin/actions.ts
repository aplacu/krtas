'use server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function loginAdmin(_state: { error: string }, formData: FormData) {
  const supabase = await createClient()
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: 'Email atau password salah.' }
  const { data: { user } } = await supabase.auth.getUser()
  const { data: admin } = user ? await supabase.from('admins').select('user_id').eq('user_id', user.id).maybeSingle() : { data: null }
  if (!admin) { await supabase.auth.signOut(); return { error: 'Akun ini tidak punya akses admin.' } }
  redirect('/admin')
}

export async function logoutAdmin() { const supabase = await createClient(); await supabase.auth.signOut(); revalidatePath('/admin'); redirect('/admin/login') }
export async function requestPasswordReset(_state: { ok: boolean }, formData: FormData) { const supabase = await createClient(); const email = String(formData.get('email') ?? '').trim(); await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? ''}/admin/ganti-password` }); return { ok: true } }
export async function updatePassword(_state: { error: string }, formData: FormData) { const supabase = await createClient(); const password = String(formData.get('password') ?? ''); if (password.length < 8) return { error: 'Password minimal 8 karakter.' }; const { error } = await supabase.auth.updateUser({ password }); if (error) return { error: 'Password belum berhasil diubah.' }; redirect('/admin') }
