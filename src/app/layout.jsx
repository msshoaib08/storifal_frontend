'use client';

import './globals.css';

import { Toaster } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/navbar.component';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
	const pathname = usePathname();

	return (
		<html lang="en">
			<body className="font-serif antialiased text-lightGray bg-black">
				<AuthProvider>
					<Navbar />
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
