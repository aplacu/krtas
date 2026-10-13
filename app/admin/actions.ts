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
export async function updateInquiry(formData: FormData) { const supabase=await createClient(); const id=String(formData.get('id')||''); const status=String(formData.get('status')||'baru'); const value=String(formData.get('estimated_value')||''); const allowed=['baru','dihubungi','penawaran','deal','selesai','batal']; if(!allowed.includes(status)) return; const {data:{user}}=await supabase.auth.getUser(); if(!user) redirect('/admin/login'); const {data:admin}=await supabase.from('admins').select('user_id').eq('user_id',user.id).maybeSingle(); if(!admin) redirect('/admin/login'); await supabase.from('inquiries').update({status,estimated_value:value?Number(value):null}).eq('id',id); revalidatePath('/admin'); revalidatePath(`/admin/permintaan/${id}`) }
export async function addInquiryNote(formData: FormData) { const supabase=await createClient(); const inquiry_id=String(formData.get('inquiry_id')||''); const body=String(formData.get('body')||'').trim(); const {data:{user}}=await supabase.auth.getUser(); if(!user||!body) return; const {data:admin}=await supabase.from('admins').select('user_id').eq('user_id',user.id).maybeSingle(); if(!admin) redirect('/admin/login'); await supabase.from('inquiry_notes').insert({inquiry_id,body,author_id:user.id}); revalidatePath(`/admin/permintaan/${inquiry_id}`) }
export async function deleteInquiry(formData: FormData) { const supabase=await createClient(); const id=String(formData.get('id')||''); const {data:{user}}=await supabase.auth.getUser(); if(!user) redirect('/admin/login'); const {data:admin}=await supabase.from('admins').select('user_id').eq('user_id',user.id).maybeSingle(); if(!admin) redirect('/admin/login'); await supabase.from('inquiries').delete().eq('id',id); revalidatePath('/admin/permintaan'); redirect('/admin/permintaan') }
