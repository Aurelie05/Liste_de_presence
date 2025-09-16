import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";

export default function Dashboard({ meetings }: { meetings: any[] }) {
  // Récupérer les flash props (Inertia les place dans page.props.flash)
  const page: any = usePage();
  const flash: any = page.props?.flash || {};

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

      // Révoquer après un petit délai pour laisser le navigateur démarrer le téléchargement
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

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className="text-lg font-bold mb-4">Liste des réunions</h3>

              {/* Message de succès + bouton secours pour retélécharger le QR si besoin */}
              {flash?.success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded flex items-center justify-between">
                  <span>{flash.success}</span>

                  {flash?.qr_code_svg && flash?.meeting_id && (
                    <button
                      onClick={() => downloadQr(flash.qr_code_svg, flash.meeting_id)}
                      className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Télécharger le QR
                    </button>
                  )}
                </div>
              )}

              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Nom de la réunion</th>
                    <th className="border px-4 py-2 text-center">Participants</th>
                    <th className="border px-4 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {meetings.length > 0 ? (
                    meetings.map((meeting) => (
                      <tr key={meeting.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{meeting.nom}</td>
                        <td className="border px-4 py-2 text-center">
                          {meeting.participants_count ?? 0}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          <button
                            onClick={() => handleDelete(meeting.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="border px-4 py-2 text-center text-gray-500">
                        Aucune réunion pour l’instant.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
