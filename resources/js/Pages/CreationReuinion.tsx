import { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";

export default function CreationReunion() {
  const [formData, setFormData] = useState({
    nom: "",
    lieu: "",
    start_time: "",
    end_time: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    Inertia.post("/meetings", formData, {
      onError: (errors) => setErrors(errors),
    });
  };

  return (
    <Authenticated header="Créer une réunion">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Nouvelle réunion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de la réunion
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Ex: Réunion hebdomadaire"
            />
            {errors.nom && <p className="text-red-600 text-sm">{errors.nom}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lieu
            </label>
            <input
              type="text"
              name="lieu"
              value={formData.lieu}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Ex: Salle A101"
            />
            {errors.lieu && <p className="text-red-600 text-sm">{errors.lieu}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Heure de début
            </label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
            />
            {errors.start_time && (
              <p className="text-red-600 text-sm">{errors.start_time}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Heure de fin
            </label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
            />
            {errors.end_time && (
              <p className="text-red-600 text-sm">{errors.end_time}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
          >
            Créer la réunion
          </button>
        </form>
      </div>
    </Authenticated>
  );
}
