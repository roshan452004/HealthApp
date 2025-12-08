import React, { useState, useEffect } from 'react';

export default function GoalsPanel(){
  const [stepsGoal, setStepsGoal] = useState(() => Number(localStorage.getItem('stepsGoal')) || 10000);
  const [todaySteps, setTodaySteps] = useState(() => Number(localStorage.getItem('todaySteps')) || 5240);

  useEffect(()=> {
    localStorage.setItem('stepsGoal', stepsGoal);
    localStorage.setItem('todaySteps', todaySteps);
  }, [stepsGoal, todaySteps]);

  const pct = Math.min(100, Math.round((todaySteps/stepsGoal)*100));

  return (
    <div className="card" style={{marginBottom:14}}>
      <h3>Goals</h3>
      <div style={{marginTop:8}}>
        <div className="small">Steps goal: {stepsGoal.toLocaleString()}</div>
        <div style={{height:12, background:'#eef2ff', borderRadius:6, marginTop:8}}>
          <div style={{width:`${pct}%`, height:'100%', background:'#0f6ffc', borderRadius:6}} />
        </div>
        <div className="small" style={{marginTop:8}}>{todaySteps.toLocaleString()} steps — {pct}%</div>
        <div style={{marginTop:8}}>
          <input type="number" value={stepsGoal} onChange={e=>setStepsGoal(Number(e.target.value))} className="input" />
        </div>
      </div>
    </div>
  );
}
