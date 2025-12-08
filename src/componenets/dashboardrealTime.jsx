import React, { useEffect, useState } from "react";

function DashboardRealtime() {
    const [hr, setHr] = useState(72);
    const [spo2, setSpo2] = useState(98);
    const [steps, setSteps] = useState(3200);
    const [bp, setBp] = useState("120/80");

    useEffect(() => {
        const interval = setInterval(() => {
            setHr(60 + Math.floor(Math.random() * 40));
            setSpo2(95 + Math.floor(Math.random() * 4));
            setSteps((prev) => prev + Math.floor(Math.random() * 10));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: 30 }}>
            <h2>Real-Time Health Dashboard</h2>

            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
                <div className="card">❤️ Heart Rate: {hr} bpm</div>
                <div className="card">🫁 SpO2: {spo2}%</div>
                <div className="card">🦶 Steps: {steps}</div>
                <div className="card">🩸 BP: {bp}</div>
            </div>

            <h3 style={{ marginTop: 30 }}>AI Health Assistant</h3>
            <div style={{ border: "1px solid #ddd", padding: 20 }}>
                <p><b>AI Suggestion:</b></p>
                <p>
                    {hr > 100 ? "High heart rate detected. Relax & drink water." :
                        spo2 < 95 ? "Low oxygen levels detected!" :
                            "Everything looks normal 😊"}
                </p>
            </div>
        </div>
    );
}

export default DashboardRealtime;
