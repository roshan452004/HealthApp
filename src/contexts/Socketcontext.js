import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { API_BASE } from '../api';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('health_app_token');
    if (!token) return;
    const s = io(API_BASE, { auth: { token }, transports: ['websocket'] });
    setSocket(s);
    s.on('connect_error', (err) => console.warn('socket connect_error', err));
    return () => s.disconnect();
  }, []);

  const value = useMemo(() => ({ socket }), [socket]);
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  return useContext(SocketContext);
}
