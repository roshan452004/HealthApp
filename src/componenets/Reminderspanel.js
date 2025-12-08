import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export default function RemindersPanel(){
  const [list, setList] = useState(()=> JSON.parse(localStorage.getItem('reminders')||'[]'));
  const [text, setText] = useState('');
  const [time, setTime] = useState('');

  useEffect(()=> localStorage.setItem('reminders', JSON.stringify(list)), [list]);

  function add() {
    if(!text || !time) return;
    setList(prev => [...prev, { id: uuidv4(), text, time }]);
    setText(''); setTime('');
  }

  function remove(id){ setList(prev => prev.filter(i=>i.id!==id)); }

  return (
    <div className="card">
      <h3>Reminders</h3>
      <div style={{display:'flex', gap:8, marginBottom:8}}>
        <input className="input" placeholder="Medication or task" value={text} onChange={e=>setText(e.target.value)} />
        <input type="time" className="input" value={time} onChange={e=>setTime(e.target.value)} />
        <button className="btn" onClick={add}>Add</button>
      </div>

      {list.length===0 ? <p className="muted">No reminders</p> : list.map(r=>(
        <div key={r.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f3f4f6'}}>
          <div>
            <div>{r.text}</div>
            <div className="small muted">{r.time}</div>
          </div>
          <button className="btn-ghost" onClick={()=>remove(r.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
