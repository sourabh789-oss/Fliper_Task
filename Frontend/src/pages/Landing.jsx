import React, { useEffect, useState } from 'react';
import { getProjects, getClients } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import ClientCard from '../components/ClientCard';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';

export default function Landing() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects).catch(()=>{});
    getClients().then(setClients).catch(()=>{});
  }, []);

  return (
    <div>
      <header className="bg-white py-8 shadow">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">PortfolioCMS</h1>
          <p className="text-sm text-gray-600">Projects, clients, contact & newsletter</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map(p => <ProjectCard key={p._id} project={p} />)}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clients.map(c => <ClientCard key={c._id} client={c} />)}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <ContactForm />
          <Newsletter />
        </section>
      </main>

      <footer className="py-6 text-center text-sm text-gray-600">
        Built with ❤️ — PortfolioCMS
      </footer>
    </div>
  );
}