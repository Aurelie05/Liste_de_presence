import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import logo from "@/Assets/Icon.png"


export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth?.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white rounded-r-3xl p-6 flex flex-col space-y-6 shadow-lg">
                <div className="flex items-center justify-center mb-6">
                    <img src={logo} alt="Oups" className="h-16 w-auto cursor-pointer" onClick={() => window.location.href = '/dashboard'} />
                </div>

                <nav className="flex-1 flex flex-col gap-4">
                    <InertiaLink
                        href="/admincreate"
                        className="block px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-center font-medium transition"
                    >
                        Créer une réunion
                    </InertiaLink>
                    <Link
                        href="/participants-list"
                        className="block px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-center font-medium transition"
                    >
                        Liste des participants
                    </Link>
                </nav>

                
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar existante */}
                <nav className="border-b border-gray-100 bg-white">
                    {/* ... ici tu gardes exactement ta navbar actuelle ... */}
                </nav>
                

                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
                            {/* Titre / dashboard */}
                            <div className="text-xl font-semibold text-gray-900">{header}</div>

                            {/* Dropdown utilisateur */}
                            <div>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition">
                                        {user?.name || "Invité"}
                                            <svg
                                                className="h-4 w-4 ml-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </header>
                )}

                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
