import React, { useEffect, useRef, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";

export default function Dashboard({ meetings }: { meetings: any[] }) {
  const page: any = usePage();
  const flash: any = page.props?.flash || {};
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [recordingMeetingId, setRecordingMeetingId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"meetings" | "recordings">("meetings");
  
  const downloadQr = (qrCodeSvg: string, meetingId: number) => {
    try {
      const blob = new Blob([qrCodeSvg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `qr_meeting_${meetingId}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error("Erreur lors du téléchargement du QR :", e);
    }
  };

  useEffect(() => {
    console.log("🔎 Props reçus de Inertia (page.props):", page.props);
    console.log("🔎 Flash reçu:", flash);

    if (flash?.qr_code_svg && flash?.meeting_id) {
      console.log("✅ QR code détecté, lancement du téléchargement...");
      downloadQr(flash.qr_code_svg, flash.meeting_id);
    } else {
      console.warn("⚠️ Aucun qr_code_svg ou meeting_id trouvé dans flash");
    }
  }, [flash?.qr_code_svg, flash?.meeting_id]);

  const handleDelete = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cette réunion ?")) {
      router.delete(`/meetings/${id}`);
    }
  };

  const startRecording = async (meetingId: number) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];
  
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
  
      mediaRecorderRef.current.start();
      setRecordingMeetingId(meetingId);
    } catch (error) {
      console.error("Erreur lors de l'accès au micro :", error);
      alert("Impossible d'accéder au microphone. Veuillez vérifier les permissions.");
    }
  };
  
  const stopRecording = async (meetingId: number) => {
    if (!mediaRecorderRef.current) return;
    
    mediaRecorderRef.current.stop();
    setRecordingMeetingId(null);
  
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
      const formData = new FormData();
      formData.append("audio", audioBlob, `reunion_${meetingId}.mp3`);
      formData.append("meeting_id", meetingId.toString());
  
      try {
        const response = await fetch("/reunions/upload-audio", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
        if (data.success) {
          alert("Audio enregistré avec succès !");
        } else {
          alert("Erreur lors de l'enregistrement audio.");
        }
      } catch (e) {
        console.error(e);
        alert("Une erreur est survenue lors de l'envoi de l'audio.");
      }
    };
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-2xl font-bold text-gray-900">
          Tableau de bord des réunions
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Message de succès */}
          {flash?.success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-green-700 font-medium">{flash.success}</p>
                </div>
                {flash?.qr_code_svg && flash?.meeting_id && (
                  <button
                    onClick={() => downloadQr(flash.qr_code_svg, flash.meeting_id)}
                    className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Télécharger le QR
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Navigation par onglets */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("meetings")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "meetings" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
              >
                Mes réunions
              </button>
              <button
                onClick={() => setActiveTab("recordings")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "recordings" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
              >
                Enregistrements
              </button>
            </nav>
          </div>

          {/* Contenu des onglets */}
          {activeTab === "meetings" && (
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Liste des réunions</h3>
                <p className="mt-1 text-sm text-gray-500">Gérez vos réunions et enregistrements audio</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {meetings.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {meetings.map((meeting) => (
                      <div key={meeting.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{meeting.nom}</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{meeting.participants_count ?? 0} participants</span>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() => handleDelete(meeting.id)}
                              className="px-3 py-2 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition flex items-center justify-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Supprimer
                            </button>

                            {recordingMeetingId === meeting.id ? (
                              <button
                                onClick={() => stopRecording(meeting.id)}
                                className="px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition flex items-center justify-center"
                              >
                                <div className="w-4 h-4 mr-1 bg-white rounded-sm animate-pulse"></div>
                                Arrêter l'enregistrement
                              </button>
                            ) : (
                              <button
                                onClick={() => startRecording(meeting.id)}
                                className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                                Commencer l'enregistrement
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune réunion</h3>
                    <p className="mt-1 text-sm text-gray-500">Commencez par créer votre première réunion.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "recordings" && (
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Gestion des enregistrements</h3>
                <p className="mt-1 text-sm text-gray-500">Visualisez et gérez vos enregistrements audio</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="text-center py-12 text-gray-500">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <p className="mt-4">Aucun enregistrement pour le moment.</p>
                  <p className="text-sm">Commencez un enregistrement depuis l'onglet "Mes réunions".</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}