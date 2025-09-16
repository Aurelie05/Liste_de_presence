import { useState, useRef } from "react"; 
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
// @ts-ignore
import SignatureCanvas from "react-signature-canvas";

interface Participant {
  id: number;
  nom: string;
  prenom: string;
  fonction: string;
  structure?: string;
  email?: string;
}

interface Meeting {
  id: number;
  nom: string;
  participants: Participant[];
}

export default function ListeParticipants({ meetings }: { meetings: Meeting[] }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    fonction: "",
    structure: "",
    email: "",
    meeting_id: "",
    admin_signature: "",
  });

  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleAddParticipant = () => {
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      return alert("Veuillez signer avant d'ajouter le participant !");
    }

    const signature = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    const dataToSend = { ...formData, admin_signature: signature };

    console.log("📤 Données envoyées :", dataToSend); // Debug

    router.post("/participants/add", dataToSend, {
      onSuccess: () => {
        alert("Participant ajouté !");
        setFormData({
          nom: "",
          prenom: "",
          fonction: "",
          structure: "",
          email: "",
          meeting_id: "",
          admin_signature: "",
        });
        sigCanvas.current?.clear();
        setShowModal(false);
      },
      onError: (errors) => alert(JSON.stringify(errors)),
    });
  };

  const handleFinish = (meetingId: number) => {
    if (!confirm("Voulez-vous valider cette réunion et envoyer le PDF au créateur ?")) return;

    router.post(`/meetings/${meetingId}/finish`, {}, {
      onSuccess: () => alert("✅ Réunion terminée et PDF envoyé au créateur !"),
      onError: (error) => alert("❌ Une erreur est survenue : " + JSON.stringify(error)),
    });
  };

  return (
    <AuthenticatedLayout header="Liste des participants">
      <Head title="Liste des participants" />

      {/* Bouton Ajouter un participant */}
      <div className="flex justify-start mb-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          Ajouter un participant
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Ajouter un participant</h2>

            <select
              value={formData.meeting_id}
              onChange={(e) => setFormData({ ...formData, meeting_id: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            >
              <option value="">Choisir la réunion</option>
              {meetings.map((m) => (
                <option key={m.id} value={m.id}>{m.nom}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Nom"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Fonction"
              value={formData.fonction}
              onChange={(e) => setFormData({ ...formData, fonction: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Structure"
              value={formData.structure}
              onChange={(e) => setFormData({ ...formData, structure: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border p-2 rounded w-full mb-4"
            />

            {/* Signature admin */}
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium">Signature de l'administrateur :</p>
              <div className="border rounded">
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="black"
                  canvasProps={{ width: 400, height: 150, className: "w-full" }}
                />
              </div>
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => sigCanvas.current?.clear()}
              >
                Effacer la signature
              </button>
            </div>

            <button
              onClick={handleAddParticipant}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Ajouter
            </button>
          </div>
        </div>
      )}

      {/* Liste des réunions */}
      {meetings.length > 0 ? (
        meetings.map((meeting) => (
          <div key={meeting.id} className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Réunion : {meeting.nom} ({meeting.participants.length} participants)
              </h3>
              <button
                onClick={() => handleFinish(meeting.id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Valider la liste
              </button>
            </div>

            {meeting.participants.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Nom</th>
                    <th className="border p-2">Prénom</th>
                    <th className="border p-2">Fonction</th>
                    <th className="border p-2">Structure</th>
                    <th className="border p-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {meeting.participants.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="border p-2">{p.nom}</td>
                      <td className="border p-2">{p.prenom}</td>
                      <td className="border p-2">{p.fonction}</td>
                      <td className="border p-2">{p.structure ?? "-"}</td>
                      <td className="border p-2">{p.email ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">Aucun participant pour cette réunion.</p>
            )}
          </div>
        ))
      ) : (
        <p>Aucune réunion trouvée.</p>
      )}
    </AuthenticatedLayout>
  );
}
