import React, { useState } from "react";
import api from "../api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await api.post("/login", { email, password });
            alert("Login Successful!");
            localStorage.setItem("token", res.data.token);
            window.location.href = "/";
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
