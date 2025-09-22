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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar pour desktop */}
            <aside className="hidden md:flex md:w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 flex-col space-y-8 shadow-xl">
                <div className="flex items-center justify-center mb-8">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="h-16 w-auto cursor-pointer transition-transform hover:scale-105" 
                        onClick={() => window.location.href = '/dashboard'} 
                    />
                </div>

                <nav className="flex-1 flex flex-col gap-3">
                    <InertiaLink
                        href="/admincreate"
                        className="flex items-center px-4 py-3 rounded-lg bg-gray-700 hover:bg-blue-600 text-center font-medium transition-all duration-300 group"
                    >
                        <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Créer une réunion
                    </InertiaLink>
                    <Link
                        href="/participants-list"
                        className="flex items-center px-4 py-3 rounded-lg bg-gray-700 hover:bg-blue-600 text-center font-medium transition-all duration-300 group"
                    >
                        <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Liste des participants
                    </Link>
                </nav>

                <div className="pt-6 border-t border-gray-700">
                    <div className="flex items-center px-4 py-3 text-gray-300">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm font-medium">{user?.name || "Invité"}</span>
                    </div>
                </div>
            </aside>

            {/* Menu mobile */}
            <div className="md:hidden bg-gray-800 p-4 flex justify-between items-center">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="h-10 w-auto" 
                    onClick={() => window.location.href = '/dashboard'} 
                />
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-white focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-gray-800 text-white p-4 space-y-4">
                    <InertiaLink
                        href="/admincreate"
                        className="block px-4 py-3 rounded-lg bg-gray-700 hover:bg-blue-600 text-center font-medium transition"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Créer une réunion
                    </InertiaLink>
                    <Link
                        href="/participants-list"
                        className="block px-4 py-3 rounded-lg bg-gray-700 hover:bg-blue-600 text-center font-medium transition"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Liste des participants
                    </Link>
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top navigation bar */}
                <nav className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                {/* Empty space for balance */}
                            </div>
                            <div className="flex items-center">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition">
                                            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                                {user?.name ? user.name.charAt(0).toUpperCase() : "I"}
                                            </div>
                                            <span className="hidden md:block">{user?.name || "Invité"}</span>
                                            <svg
                                                className="h-4 w-4"
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
                                    <Dropdown.Content align="right" width="48">
                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center text-red-600">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Déconnexion
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">{header}</h1>
                        </div>
                    </header>
                )}

                <main className="flex-1 p-4 md:p-6 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}