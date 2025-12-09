import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      {project.imageUrl ? (
        <img src={project.imageUrl.startsWith('/uploads') ? `${window.location.origin}${project.imageUrl}` : project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">No image</div>
      )}
      <div className="p-4">
        <h3 className="font-semibold">{project.title}</h3>
        <p className="text-sm text-gray-600 mt-2">{project.description}</p>
        {project.link && <a className="mt-3 inline-block text-indigo-600 text-sm" href={project.link} target="_blank" rel="noreferrer">Visit</a>}
      </div>
    </div>
  );
}

