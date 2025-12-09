import React from 'react';
import Landing from './pages/Landing';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  // simple client-side routing by hash
  const hash = window.location.hash.replace('#','') || '/';
  if (hash.startsWith('admin')){ return <AdminPanel />; }
  return <Landing />;
}