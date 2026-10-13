'use client'
import { useActionState } from 'react'
import { updatePassword } from '../actions'
export default function ChangePasswordPage() { const [state, action, pending] = useActionState(updatePassword, { error:'' }); return <main className="admin-shell"><div className="form-card admin-auth-card"><h1>Ganti password</h1><form action={action} className="admin-form"><label>Password baru<input name="password" type="password" minLength={8} required /></label>{state.error&&<p className="form-error">{state.error}</p>}<button className="pill" disabled={pending}>{pending?'Menyimpan…':'Simpan password'}</button></form></div></main> }
