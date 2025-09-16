import { useRef, useState } from "react";
// @ts-ignore
import SignatureCanvas from "react-signature-canvas";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import logo from '@/Assets/Icon.png'

export default function SignaturePage() {
  const searchParams = new URLSearchParams(window.location.search);
  const meetingId = searchParams.get("meeting_id"); // 🔹 récupère depuis l'URL
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isSaving, setIsSaving] = useState(false);


// Calcul de la taille du canvas pour garder le ratio
  const canvasWidth = Math.min(500, window.innerWidth * 0.9);
  const canvasHeight = (200 / 500) * canvasWidth; // garde le ratio original

  // 👉 Fonction pour envoyer les infos au backend
  const envoyerParticipant = async () => {
    if (!meetingId) {
      alert("⚠️ ID de réunion manquant !");
      return;
    }
  
    const data = {
      nom: localStorage.getItem("nom"),
      prenom: localStorage.getItem("prenom"),
      fonction: localStorage.getItem("fonction"),
      structure: localStorage.getItem("structure"), // 🔹 ajouter ça
      email: localStorage.getItem("email"),
      signature: localStorage.getItem("signature"),
      meeting_id: meetingId,
    };
    
    
  
    console.log("Données envoyées :", data);
  
    try {
      const response = await fetch("/participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector(
            'meta[name="csrf-token"]'
          ) as HTMLMetaElement).content,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        // ✅ seulement si la requête a réussi
        localStorage.clear();
        // Redirige vers Success en passant l'ID en query param
        window.location.href = `/success?meeting_id=${meetingId}`;
      } else {
        const errorText = await response.text();
        console.error("⚠️ Erreur serveur :", errorText);
        alert("⚠️ Erreur serveur : " + errorText);
      }
    } catch (error: any) {
      console.error("❌ Erreur réseau :", error);
      alert("❌ Erreur réseau : " + error.message);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSave = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      setIsSaving(true);
      const signature = sigCanvas.current.getCanvas().toDataURL("image/png");
      localStorage.setItem("signature", signature);
  
      if (navigator.onLine) {
        envoyerParticipant();
      } else {
        alert("Pas de connexion. Vos infos seront envoyées plus tard.");
        setIsSaving(false);
      }
    } else {
      alert("Veuillez signer avant de valider !");
    }
  };
  

  const handleClear = () => {
    sigCanvas.current?.clear();
  };

  return (
    <>
      <Head title="Signature" />
      
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
                {/* <p className="text-indigo-100 text-sm mt-2">Finalisation de l'inscription</p> */}
              </div>
            </div>
            
            {/* Contenu principal */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Votre signature</h2>
                <p className="text-gray-600">
                  Veuillez signer dans le cadre ci-dessous pour finaliser votre inscription
                </p>
              </div>

              <div className="mb-6">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 text-center">
                    Votre signature est requise pour confirmer votre participation à cette réunion.
                  </p>
                </div>

                {/* Zone de signature */}
<div className="flex justify-center items-center my-4">
  <SignatureCanvas
    ref={sigCanvas}
    penColor="black"
    canvasProps={{
      width: canvasWidth,
      height: canvasHeight,
      style: { border: "1px solid #ccc", borderRadius: "8px" },
    }}
  />
</div>

                
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Signez dans la zone ci-dessus en maintenant le bouton de la souris enfoncé
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Effacer
                </button>
                
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center shadow-md"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Valider l'inscription
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="text-xs text-indigo-700 text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Votre signature sera utilisée pour certifier votre présence à cette réunion.
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