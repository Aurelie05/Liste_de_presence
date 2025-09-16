import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guest from '@/Layouts/GuestLayout';
import logo from '@/Assets/Icon.png'

export default function Welcome() {
  // Typage clair des props reçues
  const { props } = usePage<PageProps & { meeting?: any }>();
const meeting = props.meeting;

// Vérifie si la réunion est terminée
const hasMeeting = !!meeting;
const isMeetingFinished = meeting?.status === "closed";


console.log("meeting.end_time:", meeting?.end_time);
console.log("isMeetingFinished:", isMeetingFinished);
console.log("meeting:", meeting);
console.log("meeting.status:", meeting?.status);


const handleInscription = () => {
  if (isMeetingFinished) {
    return alert("Cette réunion est terminée, vous ne pouvez plus vous inscrire.");
  }
  if (!meeting?.id) {
    return alert("Aucune réunion active. Veuillez scanner le QR code de la réunion.");
  }
  window.location.href = `/confidentialité?meeting_id=${meeting.id}`;
};


  return (
    <>
      <Head title="Portail de Réunion" />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl" style={{ width: '70%' }}>
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            
            {/* En-tête avec logo INPHB */}
            <div className="bg-gradient-to-r from-indigo-800 to-indigo-600 py-6 px-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg p-2">
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
                <p className="text-indigo-200 text-lg">Institut National Polytechnique</p>
                <p className="text-indigo-200">Félix Houphouët-Boigny</p>
              </div>
            </div>
            
            {/* Contenu principal */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Bienvenue sur notre plateforme</h2>
                <p className="text-gray-600">
                  Système d'inscription aux réunions et événements institutionnels
                </p>
              </div>

              {/* Affichage conditionnel des infos réunion */}
{meeting ? (
  <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-lg mb-6">
    <h3 className="font-semibold text-indigo-700 text-xl mb-3">{meeting.nom}</h3>
    <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
      <p className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="font-medium">Lieu:</span> {meeting.lieu}
      </p>
      <p className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium">Horaire:</span> {meeting.start_time} - {meeting.end_time}
      </p>
      <p className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-medium">Statut:</span> 
        <span className={meeting.status === 'closed' ? "text-red-600" : "text-green-600"}>
          {meeting.status === 'closed' ? "Réunion terminée" : "Réunion active"}
        </span>
      </p>
    </div>
  </div>
) : (
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg mb-6">
    <div className="flex items-start">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div>
      <h3 className="font-semibold text-yellow-700 text-lg mb-1">
          {hasMeeting ? "Réunion terminée" : "Aucune réunion spécifiée"}
      </h3>
      <p className="text-yellow-600 text-sm">
        {hasMeeting ? "Les inscriptions pour cette réunion sont closes." : "Veuillez utiliser le lien d'invitation fourni par l'organisateur."}
      </p>

      </div>
    </div>
  </div>
)}

              {/* Étapes inscription */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Procédure d'inscription :
                </h4>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2 pl-2">
                  <li>Cliquez sur "S'inscrire à la réunion"</li>
                  <li>Acceptez notre politique de confidentialité</li>
                  <li>Remplissez le formulaire d'inscription</li>
                  <li>Ajoutez votre signature électronique</li>
                  <li>Confirmez votre participation</li>
                </ol>
              </div>
              
              <button
    onClick={handleInscription}
    disabled={!hasMeeting || isMeetingFinished}
    className={`w-full ${
      !hasMeeting || isMeetingFinished
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700"
    } text-white font-medium py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center shadow-md transform ${
      !hasMeeting || isMeetingFinished ? "" : "hover:scale-105"
    }`}
  >
    {!hasMeeting
      ? "Aucune réunion active. Veuillez scanner le QR code."
      : isMeetingFinished
      ? "Réunion terminée"
      : "S'inscrire à la réunion"}
  </button>






              {/* Info confidentialité */}
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="text-xs text-indigo-700 text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Vos informations seront traitées conformément à notre politique de confidentialité.
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