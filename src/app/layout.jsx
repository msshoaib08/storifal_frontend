'use client';

import './globals.css';

import { Toaster } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import StaticNavbar from '@/components/navbar.component';

export default function RootLayout({ children }) {
	const pathname = usePathname();

	const showStaticNavbar = !pathname.startsWith('/blog');

	return (
		<html lang="en">
			<body className="font-serif antialiased text-lightGray bg-black">
				<AuthProvider>
					{showStaticNavbar && <StaticNavbar />}
					<AnimatePresence mode="wait">
						<motion.main
							key={pathname}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="relative flex flex-col items-center justify-items-center mx-auto"
						>
							{children}
						</motion.main>
					</AnimatePresence>
					<Toaster />
				</AuthProvider>
			</body>
		</html>
	);
}
