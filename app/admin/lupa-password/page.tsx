'use client'
import Link from 'next/link'
import { useActionState } from 'react'
import { requestPasswordReset } from '../actions'
export default function ForgotPasswordPage() { const [state, action, pending] = useActionState(requestPasswordReset, { ok:false }); return <main className="admin-shell"><div className="form-card admin-auth-card"><div className="eyebrow">PEMULIHAN AKUN</div><h1>Lupa password</h1><p>Masukkan email admin. Jika terdaftar, tautan pemulihan akan dikirim.</p><form action={action} className="admin-form"><label>Email<input name="email" type="email" required /></label><button className="pill" disabled={pending}>{pending?'Mengirim…':'Kirim tautan'}</button></form>{state.ok&&<p className="form-success">Periksa kotak masuk email Anda.</p>}<Link href="/admin/login">← Kembali ke login</Link></div></main> }
