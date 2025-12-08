import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../contexts/Authcontext';

export default function Profile(){
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(()=> {
    // simple demo: show user email and id
    setProfile({ email: user?.email, id: user?.id });
  }, [user]);

  if (!profile) return <div className="card">No profile</div>;

  return (
    <div className="card centered-card-small">
      <h2>Profile</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>User ID:</strong> {profile.id}</p>
      <p className="muted">Demo profile (extend server to save full profile).</p>
    </div>
  );
}
