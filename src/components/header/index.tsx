'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async (): Promise<void> => {
        try {
            //   handleClose();
            await logout();
            router.push('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="https://monoma.io" className="flex items-center">
                        <img src="https://monoma.io/wp-content/uploads/2022/05/logo-white.png" className="mr-3 h-6 sm:h-9" alt="monoma Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Test Pokemon</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <button className='p-2 hover:bg-gray-50 focus:ring-4' onClick={handleLogout}>
                            Sign out
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}
