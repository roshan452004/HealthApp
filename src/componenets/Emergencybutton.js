import React from 'react';
import { useAuth } from '../contexts/Authcontext';
import { api } from '../api';

export default function EmergencyButton(){
  const { user } = useAuth();

  async function triggerEmergency(){
    // for demo: just POST an alert to server (server would broadcast)
    try {
      if (!user) return alert('Login first');
      await api.post('/api/metrics', { heartRate: 180, steps: 0, sleepMinutes: 0 });
      alert('Emergency alert sent (demo).');
    } catch (err) {
      alert('Failed to send emergency');
    }
  }

  return (
    <div className="card" style={{textAlign:'center'}}>
      <h3>Emergency</h3>
      <p className="muted">Press to send an emergency alert.</p>
      <button className="btn" style={{background:'#dc2626'}} onClick={triggerEmergency}>EMERGENCY</button>
    </div>
  );
}
