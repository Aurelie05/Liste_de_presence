import { useState } from "react";
import Guest from "@/Layouts/GuestLayout";
import { router, Head } from "@inertiajs/react";
import logo from '@/Assets/Icon.png'

export default function RegisterEmail() {
  const [email, setEmail] = useState("");
  const searchParams = new URLSearchParams(window.location.search);
  const meetingId = searchParams.get("meeting_id"); // récupère l'ID depuis l'URL

  const handleSubmit = () => {
    if (!meetingId) {
      alert("ID de réunion manquant !");
      return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("meeting_id", meetingId); // on stocke l'ID pour la suite

    // on redirige vers la page Form en conservant l'ID
    router.visit(`/form?meeting_id=${meetingId}`);
  };

  return (
    <>
      <Head title="Saisie d'Email" />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl" style={{ width: '70%' }}>
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            
            {/* En-tête avec logo INPHB */}
            <div className="bg-gradient-to-r from-indigo-800 to-indigo-600 py-6 px-8 text-center">
              <div className="flex flex-col items-center justify-center">
                {/* Logo INPHB */}
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg p-2">
                  <img 
                    src={logo} 
                    alt="Logo INPHB" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback si l'image ne charge pas
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234f46e5'%3E%3Cpath d='M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <h1 className="text-3xl font-bold text-white mb-1">INPHB</h1>
                <p className="text-indigo-200 text-lg">Institut National Polytechnique</p>
                <p className="text-indigo-200">Félix Houphouët-Boigny</p>
                <p className="text-indigo-100 text-sm mt-2">Inscription à la réunion</p>
              </div>
            </div>
            
            {/* Contenu principal */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Veuillez saisir votre email</h2>
                <p className="text-gray-600">
                  Nous avons besoin de votre adresse email pour finaliser votre inscription
                </p>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="exemple@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Votre email sera utilisé uniquement pour cette réunion et ne sera pas partagé.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!email}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center shadow-md transform hover:scale-105 disabled:hover:scale-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                Continuer
              </button>

              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="text-xs text-indigo-700 text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Vous recevrez un email de confirmation après votre inscription.
                </p>
              </div>
            </div>
            
            {/* Pied de page */}
            <div className="bg-gray-100 py-4 px-6 text-center border-t border-gray-200">
              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} INPHB - Institut National Polytechnique Félix Houphouët-Boigny | Tous droits réservés
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}