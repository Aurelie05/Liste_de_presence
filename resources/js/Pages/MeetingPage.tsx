import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MeetingPage() {
  const [participants, setParticipants] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    meeting_id: 1,
    nom: '',
    prenom: '',
    fonction: '',
    telephone: '',
    email: '',
    signature: '',
  });

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/participants');
      setParticipants(res.data);
    } catch (error) {
      console.error('Erreur chargement participants :', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Envoi des données:', formData); // ✅ test console
  
    try {
      const res = await axios.post('http://localhost:8000/api/participants', formData);
      console.log('Participant ajouté :', res.data);
      fetchParticipants(); // mise à jour
      setShowForm(false);  // on ferme le form
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Affiche les erreurs de validation retournées par Laravel
        console.error('Erreur ajout participant :', error.response.data);
        alert('Erreur validation:\n' + JSON.stringify(error.response.data.errors, null, 2));
      } else {
        console.error('Erreur ajout participant inconnue :', error);
      }
    }
  };
  

  const handleFinishMeeting = async () => {
    try {
      await axios.post('http://localhost:8000/api/finish-meeting');
      alert('Réunion terminée et liste envoyée !');
    } catch (error) {
      console.error('Erreur fin réunion :', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-2">Liste de présence</h1>
        <p className="text-gray-500">Gérez votre réunion et les participants en un clic.</p>
      </div>

      {/* Boutons */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow"
        >
          ➕ S'inscrire
        </button>
      </div>

      {/* Formulaire d'inscription */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 mb-8 space-y-4 border border-indigo-100"
        >
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Ajouter un participant</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nom"
              onChange={handleChange}
              value={formData.nom}
              placeholder="Nom"
              className="bg-gray-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="text"
              name="prenom"
              onChange={handleChange}
              value={formData.prenom}
              placeholder="Prénom"
              className="bg-gray-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="text"
              name="fonction"
              onChange={handleChange}
              value={formData.fonction}
              placeholder="Fonction"
              className="bg-gray-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="tel"
              name="telephone"
              onChange={handleChange}
              value={formData.telephone}
              placeholder="Téléphone"
              className="bg-gray-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Email"
              className="bg-gray-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full mt-4 shadow"
            >
              ✅ Soumettre
            </button>
          </div>
        </form>
      )}

      {/* Liste des participants */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-md overflow-hidden">
          <thead className="bg-indigo-100 text-indigo-900 font-semibold">
            <tr>
              <th className="p-3">Nom</th>
              <th className="p-3">Prénom</th>
              <th className="p-3">Fonction</th>
              <th className="p-3">Téléphone</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {participants.map((p: any, index: number) => (
              <tr key={index} className="hover:bg-indigo-50">
                <td className="p-3 border-t">{p.nom}</td>
                <td className="p-3 border-t">{p.prenom}</td>
                <td className="p-3 border-t">{p.fonction}</td>
                <td className="p-3 border-t">{p.telephone}</td>
                <td className="p-3 border-t">{p.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Terminer la réunion : en bas à droite */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleFinishMeeting}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow"
        >
          🔒 Terminer la réunion
        </button>
      </div>
    </div>
  );
}
