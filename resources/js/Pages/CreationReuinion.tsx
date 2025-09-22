import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
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
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [meetingId, setMeetingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Récupération des flash props
  const page: any = usePage();
  const { flash } = page.props;
  
  useEffect(() => {
    if (flash?.qr_code_svg && flash?.meeting_id) {
      setQrCodeData(flash.qr_code_svg);
      setMeetingId(flash.meeting_id);
      
      // Téléchargement automatique
      const blob = new Blob([flash.qr_code_svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr_meeting_${flash.meeting_id}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      URL.revokeObjectURL(url);
    }
  }, [flash]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Effacer l'erreur du champ lorsqu'il est modifié
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setQrCodeData(null); // Réinitialiser le QR code précédent
    
    Inertia.post("/meetings", formData, {
      onError: (errors) => {
        setErrors(errors);
        setIsSubmitting(false);
      },
      onSuccess: () => {
        setIsSubmitting(false);
      }
    });
  };

  const downloadQrCode = () => {
    if (!qrCodeData || !meetingId) return;

    const blob = new Blob([qrCodeData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `qr_meeting_${meetingId}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url); // Libérer la mémoire
  };

  // Définir les valeurs par défaut pour l'heure de début et de fin
  useEffect(() => {
    const now = new Date();
    const defaultStartTime = now.toTimeString().slice(0, 5);
    
    // Ajouter 1 heure pour l'heure de fin
    const endTime = new Date(now.getTime() + 60 * 60 * 1000);
    const defaultEndTime = endTime.toTimeString().slice(0, 5);
    
    setFormData(prev => ({
      ...prev,
      start_time: prev.start_time || defaultStartTime,
      end_time: prev.end_time || defaultEndTime
    }));
  }, []);

  return (
    <Authenticated header="Créer une réunion">
      <div className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Créer une nouvelle réunion</h1>
          <p className="text-gray-600 mt-2">Planifiez votre réunion et générez un QR code d'invitation</p>
        </div>
        
        {/* Messages de statut */}
        {flash && flash.success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-start">
            <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>{flash.success}</div>
          </div>
        )}
        
        {flash && flash.error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start">
            <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>{flash.error}</div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la réunion</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Ex: Réunion d'équipe projet"
              />
              {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
              <input
                type="text"
                name="lieu"
                value={formData.lieu}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Ex: Salle de conférence A"
              />
              {errors.lieu && (
                <p className="mt-1 text-sm text-red-600">{errors.lieu}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heure de début</label>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.start_time && (
                <p className="mt-1 text-sm text-red-600">{errors.start_time}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heure de fin</label>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.end_time && (
                <p className="mt-1 text-sm text-red-600">{errors.end_time}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Création en cours...
              </span>
            ) : "Créer la réunion"}
          </button>
        </form>

        {/* Affichage du QR code après création */}
        {qrCodeData && (
          <div className="mt-8 p-6 border rounded-xl bg-gray-50">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">QR Code généré</h3>
            <p className="text-gray-600 mb-4">Le QR code a été téléchargé automatiquement. Vous pouvez le télécharger à nouveau si nécessaire.</p>
            
            <div className="flex flex-col items-center">
              <div 
                className="mb-6 p-4 bg-white rounded-lg shadow-inner"
                dangerouslySetInnerHTML={{ __html: qrCodeData }} 
              />
              <button
                onClick={downloadQrCode}
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition"
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Télécharger à nouveau
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Authenticated>
  );
}