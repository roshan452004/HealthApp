import React from 'react';

export default function AlertsPanel({ metrics }) {
  const alerts = [];
  if (metrics.heartRate > 110) alerts.push({ id: 'hr', title: 'High heart rate', text: `HR ${metrics.heartRate} bpm` });
  if (metrics.heartRate < 45) alerts.push({ id: 'lowhr', title: 'Low heart rate', text: `HR ${metrics.heartRate} bpm` });
  return (
    <div className="card" style={{marginBottom:14}}>
      <h3>Alerts</h3>
      {alerts.length === 0 ? <p className="muted">No alerts — all metrics normal.</p> : alerts.map(a => (
        <div key={a.id} style={{padding:'10px 0', borderBottom:'1px solid #f1f5f9'}}>
          <strong>{a.title}</strong>
          <div className="small">{a.text}</div>
        </div>
      ))}
    </div>
  );
}
