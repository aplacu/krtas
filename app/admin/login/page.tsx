'use client'
import Link from 'next/link'
import { useActionState } from 'react'
import { loginAdmin } from '../actions'
const initial = { error: '' }
export default function LoginPage() { const [state, action, pending] = useActionState(loginAdmin, initial); return <main className="admin-shell"><div className="form-card admin-auth-card"><div className="eyebrow">KRTAS / ADMIN</div><h1>Masuk ke dashboard</h1><p>Gunakan akun admin yang sudah terdaftar.</p><form action={action} className="admin-form"><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Password<input name="password" type="password" required autoComplete="current-password" /></label>{state.error&&<p className="form-error">{state.error}</p>}<button className="pill" disabled={pending}>{pending?'Memeriksa…':'Masuk'}</button></form><div className="auth-links"><Link href="/admin/lupa-password">Lupa password?</Link><Link href="/">← Kembali ke situs</Link></div></div></main> }
