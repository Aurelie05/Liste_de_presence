import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import logo from '@/Assets/Icon.png'

export default function Pagedeconfidentialité() {
  const searchParams = new URLSearchParams(window.location.search);
  const meetingId = searchParams.get("meeting_id");

  const handleAccepte = () => {
    window.location.href = `/email?meeting_id=${meetingId}`;
  };

  return (
    <>
      <Head title="Politique de Confidentialité" />
      
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
                {/* <p className="text-indigo-100 text-sm mt-2">Politique de confidentialité</p> */}
              </div>
            </div>
            
            {/* Contenu principal */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Politique de Confidentialité</h2>
                <p className="text-gray-600">
                  Avant de procéder à votre inscription, veuillez prendre connaissance de nos conditions
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                  <p className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    En vous inscrivant, vous acceptez que vos données personnelles soient utilisées uniquement 
                    pour l'organisation et la gestion de la réunion. Ces informations ne seront en aucun cas 
                    partagées avec des tiers sans votre consentement préalable.
                  </p>

                  <p className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      <span className="font-semibold">Confidentialité des échanges :</span>  
                      L'ensemble des discussions et informations partagées durant cette réunion sont strictement 
                      confidentiels. Chaque participant s'engage à ne pas divulguer, reproduire ou exploiter ces 
                      informations à des fins personnelles ou professionnelles, sauf accord explicite des parties concernées.
                    </span>
                  </p>

                  <p className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    En confirmant votre inscription et en participant à la réunion, vous reconnaissez avoir 
                    pris connaissance de cette politique et vous engagez à la respecter.
                  </p>
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
                <p className="text-xs text-indigo-700 text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Vos données sont protégées et utilisées uniquement dans le cadre de cette réunion.
                </p>
              </div>
              
              <button
                onClick={handleAccepte}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center shadow-md transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                J'accepte et continue
              </button>
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