import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreationForm = () => {
  
  const [formData, setFormData] = useState({
    nom: '',
    fonction: '',
    titre: '',
    heureDebut: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // reste du code...
  
  

    // ⚠️ Tu vas remplacer cette partie par un appel API plus tard (vers Laravel)
    const fakeMeetingId = Date.now();

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-800">Créer une réunion</h2>

        <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="fonction"
          placeholder="Votre fonction"
          value={formData.fonction}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="titre"
          placeholder="Titre de la réunion"
          value={formData.titre}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="time"
          name="heureDebut"
          placeholder="Heure de début"
          value={formData.heureDebut}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          onClick={ () => window.open('/listedepresence','_self')}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreationForm;
