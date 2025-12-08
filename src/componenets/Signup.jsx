import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{minHeight:"100vh"}} className="p-6 flex items-center justify-center">
      <div style={{maxWidth:420, width:"100%"}} className="bg-white rounded-2xl shadow-lg p-6">
        <h2 style={{fontSize:20, fontWeight:600}}>Create account</h2>
        <p style={{color:"#6b7280", marginBottom:16}}>Start tracking your health data securely</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm">Full name</label>
            <input value={name} onChange={e=>setName(e.target.value)} required style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #d1d5db", marginTop:6}} placeholder="John Doe"/>
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #d1d5db", marginTop:6}} placeholder="you@example.com"/>
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required minLength={6} style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #d1d5db", marginTop:6}} placeholder="Min 6 characters"/>
          </div>

          {error && <div style={{color:"#dc2626"}}>{error}</div>}

          <button className="primary" type="submit" style={{width:"100%", padding:10, borderRadius:8, marginTop:10}}>Create account</button>

          <div style={{textAlign:"center", marginTop:12, color:"#6b7280"}}>
            Already have an account? <Link to="/login" style={{color:"#4f46e5"}}>Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
