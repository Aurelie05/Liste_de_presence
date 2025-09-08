import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-white px-4">
                <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-md">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
                        Créer un compte
                    </h2>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Nom" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full rounded-xl border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2 text-sm text-red-600" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-xl border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2 text-sm text-red-600" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Mot de passe" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-xl border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2 text-sm text-red-600" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full rounded-xl border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2 text-sm text-red-600" />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
                            <Link
                                href={route('login')}
                                className="text-sm text-gray-600 underline hover:text-gray-900 mb-2 sm:mb-0"
                            >
                                Déjà inscrit ?
                            </Link>

                            <PrimaryButton className="w-full sm:w-auto rounded-xl py-3 px-6" disabled={processing}>
                                S'inscrire
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
