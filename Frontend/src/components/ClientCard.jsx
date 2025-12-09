import React from 'react';

export default function ClientCard({ client }) {
  return (
    <div className="bg-white rounded shadow p-4 flex items-start gap-4">
      {client.imageUrl ? <img src={client.imageUrl.startsWith('/uploads') ? `${window.location.origin}${client.imageUrl}` : client.imageUrl} alt={client.name} className="w-20 h-20 object-cover rounded" /> : <div className="w-20 h-20 bg-gray-200 rounded" />}
      <div>
        <h4 className="font-semibold">{client.name}</h4>
        <p className="text-sm text-gray-600">{client.designation}</p>
        <p className="text-sm mt-2">{client.description}</p>
      </div>
    </div>
  );
}