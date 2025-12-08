import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext';

export default function Login(){
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const { login, register } = useAuth();

  async function submit(e){
    e.preventDefault();
    setErr('');
    if(!email || !password) return setErr('Enter email & password');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // try register if login fails (demo behaviour)
      try {
        await register(email, password);
        navigate('/');
      } catch (er2) {
        setErr('Auth failed');
      }
    }
  }

  return (
    <div className="centered-card">
      <form className="form card" onSubmit={submit}>
        <h2>Sign in</h2>
        {err && <div className="error">{err}</div>}
        <label className="label">Email
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email"/>
        </label>
        <label className="label">Password
          <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password"/>
        </label>
        <button className="btn" type="submit">Sign in</button>
        <p className="muted">Use any credentials to demo (will register automatically).</p>
      </form>
    </div>
  );
}
