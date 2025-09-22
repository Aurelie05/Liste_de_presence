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
        alert("Participant ajouté avec succès !");
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
    <AuthenticatedLayout 
      header={
        <h2 className="text-2xl font-bold text-gray-900">
          Gestion des participants
        </h2>
      }
    >
      <Head title="Liste des participants" />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bouton Ajouter un participant */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">Liste des réunions et participants</h3>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
              onClick={() => setShowModal(true)}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Ajouter un participant
            </button>
          </div>

          {/* Modal d'ajout de participant */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-medium text-gray-900">Ajouter un participant</h3>
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowModal(false)}
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Réunion</label>
                    <select
                      value={formData.meeting_id}
                      onChange={(e) => setFormData({ ...formData, meeting_id: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choisir la réunion</option>
                      {meetings.map((m) => (
                        <option key={m.id} value={m.id}>{m.nom}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        placeholder="Nom"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <input
                        type="text"
                        placeholder="Prénom"
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fonction</label>
                    <input
                      type="text"
                      placeholder="Fonction"
                      value={formData.fonction}
                      onChange={(e) => setFormData({ ...formData, fonction: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Structure</label>
                    <input
                      type="text"
                      placeholder="Structure"
                      value={formData.structure}
                      onChange={(e) => setFormData({ ...formData, structure: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Signature admin */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Signature de l'administrateur</label>
                    <div className="border border-gray-300 rounded-md p-2">
                      <SignatureCanvas
                        ref={sigCanvas}
                        penColor="black"
                        canvasProps={{ width: 400, height: 150, className: "w-full bg-gray-50 rounded" }}
                      />
                    </div>
                    <button
                      type="button"
                      className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition flex items-center"
                      onClick={() => sigCanvas.current?.clear()}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Effacer la signature
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 p-4 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddParticipant}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Liste des réunions */}
          {meetings.length > 0 ? (
            <div className="space-y-6">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {meeting.nom}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => handleFinish(meeting.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Valider la liste
                    </button>
                  </div>

                  <div className="px-4 py-5 sm:p-6">
                    {meeting.participants.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fonction</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Structure</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {meeting.participants.map((p) => (
                              <tr key={p.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.nom}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.prenom}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.fonction}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.structure ?? "-"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.email ?? "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="mt-2">Aucun participant pour cette réunion.</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune réunion</h3>
              <p className="mt-2 text-gray-500">Aucune réunion n'a été créée pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}