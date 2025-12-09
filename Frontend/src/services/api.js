
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function getProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  return res.json();
}
export async function getClients() {
  const res = await fetch(`${API_BASE}/clients`);
  return res.json();
}
export async function postContact(payload) {
  const res = await fetch(`${API_BASE}/contacts`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  return res.json();
}
export async function subscribe(email) {
  const res = await fetch(`${API_BASE}/subscribe`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email })
  });
  return res.json();
}

// Admin: multipart uploads
export async function adminCreateProject({ title, description, link, file }) {
  const fd = new FormData();
  fd.append('title', title);
  fd.append('description', description);
  fd.append('link', link);
  if (file) fd.append('image', file);
  const res = await fetch(`${API_BASE}/admin/projects`, { method: 'POST', body: fd });
  return res.json();
}
export async function adminCreateClient({ name, designation, description, file }) {
  const fd = new FormData();
  fd.append('name', name);
  fd.append('designation', designation);
  fd.append('description', description);
  if (file) fd.append('image', file);
  const res = await fetch(`${API_BASE}/admin/clients`, { method: 'POST', body: fd });
  return res.json();
}
export async function adminGetContacts() {
  const res = await fetch(`${API_BASE}/admin/contacts`);
  return res.json();
}
export async function adminGetSubscriptions() {
  const res = await fetch(`${API_BASE}/admin/subscriptions`);
  return res.json();
}