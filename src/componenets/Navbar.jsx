import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={{ padding: "15px", background: "#0A6EBD", color: "white", display: "flex", justifyContent: "space-between" }}>
            <h2>Health Monitor</h2>
            <div>
                <Link to="/" style={{ marginRight: 20, color: "white" }}>Dashboard</Link>
                <Link to="/profile" style={{ marginRight: 20, color: "white" }}>Profile</Link>
                <Link to="/login" style={{ color: "white" }}>Logout</Link>
            </div>
        </nav>
    );
}

export default Navbar;
