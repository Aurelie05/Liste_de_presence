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

  // Récupération des flash props
  const page: any = usePage();
  const { flash } = page.props;
  
  useEffect(() => {
    if (flash?.qr_code_svg && flash?.meeting_id) {
      // lancer le téléchargement direct si tu veux
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQrCodeData(null); // Réinitialiser le QR code précédent
    Inertia.post("/meetings", formData, {
      onError: (errors) => setErrors(errors),
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

  return (
    <Authenticated header="Créer une réunion">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Nouvelle réunion</h2>
        
        {/* Message de succès */}
        {flash && flash.success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {flash.success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Nom de la réunion</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
            />
            {errors.nom && <p className="text-red-600 text-sm">{errors.nom}</p>}
          </div>

          <div>
            <label>Lieu</label>
            <input
              type="text"
              name="lieu"
              value={formData.lieu}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
            />
            {errors.lieu && (
              <p className="text-red-600 text-sm">{errors.lieu}</p>
            )}
          </div>

          <div>
            <label>Heure de début</label>
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
            <label>Heure de fin</label>
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

        {/* Affichage du QR code après création */}
        {qrCodeData && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">QR Code généré</h3>
            <div 
              className="mb-4 flex justify-center"
              dangerouslySetInnerHTML={{ __html: qrCodeData }} 
            />
            <button
              onClick={downloadQrCode}
              className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition"
            >
              Télécharger le QR Code
            </button>
          </div>
        )}
      </div>
    </Authenticated>
  );
}