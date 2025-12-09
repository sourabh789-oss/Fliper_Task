import React, { useState } from 'react';
import { postContact } from '../services/api';

export default function ContactForm() {
  const [form, setForm] = useState({ fullName: '', email: '', mobile: '', city: '', message: '' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await postContact(form);
      setMsg('Thanks — your message has been submitted.');
      setForm({ fullName: '', email: '', mobile: '', city: '', message: '' });
    } catch (err) {
      setMsg('Error: could not submit.');
    }
  };

  return (
    <form onSubmit={submit} className="p-6 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <input required value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} placeholder="Full Name" className="w-full mb-2 p-2 border rounded" />
      <input required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full mb-2 p-2 border rounded" />
      <input value={form.mobile} onChange={e=>setForm({...form, mobile:e.target.value})} placeholder="Mobile" className="w-full mb-2 p-2 border rounded" />
      <input value={form.city} onChange={e=>setForm({...form, city:e.target.value})} placeholder="City" className="w-full mb-2 p-2 border rounded" />
      <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} placeholder="Message" className="w-full mb-4 p-2 border rounded" />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      {msg && <p className="mt-3 text-sm text-green-600">{msg}</p>}
    </form>
  );
}