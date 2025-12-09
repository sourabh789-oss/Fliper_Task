import React, { useState } from 'react';
import { subscribe } from '../services/api';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await subscribe(email);
      setMsg('Subscribed! 🎉');
      setEmail('');
    } catch (err) {
      setMsg('Error or already subscribed.');
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="flex-1 p-2 border rounded" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Subscribe</button>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}