import React, { useState, useEffect } from 'react';
import { adminCreateProject, adminCreateClient, adminGetContacts, adminGetSubscriptions } from '../services/api';

export default function AdminPanel() {
  const [projForm, setProjForm] = useState({ title: '', description: '', link: '', file: null });
  const [clientForm, setClientForm] = useState({ name: '', designation: '', description: '', file: null });
  const [contacts, setContacts] = useState([]);
  const [subs, setSubs] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(()=> {
    adminGetContacts().then(setContacts).catch(()=>{});
    adminGetSubscriptions().then(setSubs).catch(()=>{});
  },[]);

  const submitProject = async (e) => {
    e.preventDefault();
    await adminCreateProject(projForm);
    setMsg('Project created (may need refresh).');
  };
  const submitClient = async (e) => {
    e.preventDefault();
    await adminCreateClient(clientForm);
    setMsg('Client created (may need refresh).');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="bg-white p-4 rounded shadow">
          <h1 className="text-2xl font-bold">PortfolioCMS — Admin</h1>
          <p className="text-sm text-gray-600">Use these forms to add projects / clients. Contacts & subscriptions listed below.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={submitProject} className="p-4 bg-white rounded shadow space-y-2">
            <h3 className="font-semibold">Add Project</h3>
            <input value={projForm.title} onChange={e=>setProjForm({...projForm, title:e.target.value})} placeholder="Title" className="w-full p-2 border rounded" />
            <input value={projForm.link} onChange={e=>setProjForm({...projForm, link:e.target.value})} placeholder="External link (optional)" className="w-full p-2 border rounded" />
            <textarea value={projForm.description} onChange={e=>setProjForm({...projForm, description:e.target.value})} placeholder="Description" className="w-full p-2 border rounded" />
            <input type="file" onChange={e=>setProjForm({...projForm, file:e.target.files[0]})} />
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Create Project</button>
          </form>

          <form onSubmit={submitClient} className="p-4 bg-white rounded shadow space-y-2">
            <h3 className="font-semibold">Add Client</h3>
            <input value={clientForm.name} onChange={e=>setClientForm({...clientForm, name:e.target.value})} placeholder="Name" className="w-full p-2 border rounded" />
            <input value={clientForm.designation} onChange={e=>setClientForm({...clientForm, designation:e.target.value})} placeholder="Designation" className="w-full p-2 border rounded" />
            <textarea value={clientForm.description} onChange={e=>setClientForm({...clientForm, description:e.target.value})} placeholder="Description" className="w-full p-2 border rounded" />
            <input type="file" onChange={e=>setClientForm({...clientForm, file:e.target.files[0]})} />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">Create Client</button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded shadow p-4">
            <h4 className="font-semibold mb-2">Contacts</h4>
            <div className="space-y-2 max-h-64 overflow-auto">
              {contacts.map(c => (
                <div key={c._id} className="p-2 border rounded">
                  <div className="text-sm font-semibold">{c.fullName} — {c.email}</div>
                  <div className="text-xs text-gray-600">{c.mobile} • {c.city}</div>
                  <div className="text-sm mt-1">{c.message}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h4 className="font-semibold mb-2">Subscriptions</h4>
            <div className="space-y-2 max-h-64 overflow-auto">
              {subs.map(s => <div key={s._id} className="p-2 border rounded text-sm">{s.email}</div>)}
            </div>
          </div>
        </div>

        {msg && <div className="text-green-600">{msg}</div>}
      </div>
    </div>
  );
}