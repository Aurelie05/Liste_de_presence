import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useNavigate } from 'react-router-dom';
import Guest from '@/Layouts/GuestLayout';
import '@/Style/Welcome.css'

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <Guest>
            
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Bienvenue sur le portail de réunion</h1>
      <button
        onClick={ () => window.open('/formulairedecreation','_self')}
        className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-700"
      >
        Créer une Réunion
      </button>
    </div>
        </Guest>
    );
}
