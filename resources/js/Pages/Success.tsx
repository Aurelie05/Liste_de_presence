import React, { useEffect, useState } from "react";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import logo from '@/Assets/Icon.png'

export default function Success() {
  const [meetingId, setMeetingId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const idFromUrl = searchParams.get("meeting_id");
    const idFromStorage = localStorage.getItem("meeting_id");

    const id = idFromUrl || idFromStorage;
    setMeetingId(id);

    if (id) {
      localStorage.setItem("meeting_id", id);
    }
  }, []);

  const handleReturn = () => {
    if (meetingId) {
      // On passe l'ID en paramètre dans l'URL
      window.location.href = `/?meeting_id=${meetingId}`;
    } else {
      window.location.href = "/"; // sinon vers l'accueil
    }
  };

  return (
    <>
      <Head title="Inscription Réussie" />
      
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
                {/* <h1 className="text-3xl font-bold text-white mb-1">INPHB</h1> */}
                <p className="text-indigo-200 text-lg">Institut National Polytechnique</p>
                <p className="text-indigo-200">Félix Houphouët-Boigny</p>
                {/* <p className="text-indigo-100 text-sm mt-2">Confirmation d'inscription</p> */}
              </div>
            </div>
            
            {/* Contenu principal */}
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Inscription réussie ✅
                </h2>
                <p className="text-gray-600">
                  Votre participation a été enregistrée avec succès
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg mb-6">
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Votre inscription a été validée et enregistrée.
                  </p>
                  
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Merci de votre participation à cette réunion.
                  </p>
                </div>
              </div>

              <button
                onClick={handleReturn}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center shadow-md transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Retour à l'accueil
              </button>

              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="text-xs text-indigo-700 text-center">
                  Vous pouvez à tout moment nous contacter pour toute question concernant votre inscription.
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