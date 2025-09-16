import { useState } from "react";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import logo from "@/Assets/Icon.png";

export default function CreationForm() {
  const searchParams = new URLSearchParams(window.location.search);
  const meetingId = searchParams.get("meeting_id"); // récupère l'ID

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    fonction: "",
    structure: "", // ✅ nouveau champ
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!meetingId) {
      alert("ID de réunion manquant !");
      return;
    }

    localStorage.setItem("nom", formData.nom);
    localStorage.setItem("prenom", formData.prenom);
    localStorage.setItem("fonction", formData.fonction);
    localStorage.setItem("structure", formData.structure); // ✅ stocker aussi la structure
    localStorage.setItem("meeting_id", meetingId);

    // ✅ redirection avec meeting_id dans l'URL
    window.location.href = `/signature?meeting_id=${meetingId}`;
  };

  const isFormValid =
    formData.nom && formData.prenom && formData.fonction && formData.structure;

  return (
    <>
      <Head title="Informations Personnelles" />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl" style={{ width: "70%" }}>
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            {/* En-tête */}
            <div className="bg-gradient-to-r from-indigo-800 to-indigo-600 py-6 px-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg p-2">
                  <img
                    src={logo}
                    alt="Logo INPHB"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-indigo-200 text-lg">
                  Institut National Polytechnique
                </p>
                <p className="text-indigo-200">Félix Houphouët-Boigny</p>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Informations personnelles
                </h2>
                <p className="text-gray-600">
                  Veuillez remplir vos informations pour finaliser votre
                  inscription
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {/* Nom */}
                <div>
                  <label
                    htmlFor="nom"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nom
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  />
                </div>

                {/* Prénom */}
                <div>
                  <label
                    htmlFor="prenom"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Prénom
                  </label>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    placeholder="Votre prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  />
                </div>

                {/* Fonction */}
                <div>
                  <label
                    htmlFor="fonction"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Fonction
                  </label>
                  <input
                    id="fonction"
                    name="fonction"
                    type="text"
                    placeholder="Votre fonction"
                    value={formData.fonction}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  />
                </div>

                {/* ✅ Structure */}
                <div>
                  <label
                    htmlFor="structure"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Structure
                  </label>
                  <input
                    id="structure"
                    name="structure"
                    type="text"
                    placeholder="Votre structure"
                    value={formData.structure}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center shadow-md transform hover:scale-105 disabled:hover:scale-100"
              >
                Continuer vers la signature
              </button>
            </div>

            {/* Pied de page */}
            <div className="bg-gray-100 py-4 px-6 text-center border-t border-gray-200">
              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} INPHB | Tous droits réservés
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
