import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Dashboard({ meetings }: { meetings: any[] }) {
    const handleDelete = (id: number) => {
        if (confirm("Voulez-vous vraiment supprimer cette réunion ?")) {
            router.delete(`/meetings/${id}`, {
                onSuccess: () => {
                    
                },
            });
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
    {meeting.participants_count}
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
                                            <td
                                                colSpan={3}
                                                className="border px-4 py-2 text-center text-gray-500"
                                            >
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
