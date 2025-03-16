'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Divide as Hamburger } from 'hamburger-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

export default function BlogNavbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="w-full py-5 bg-black text-white border-b border-mutedGray/20 sticky top-0 z-50 backdrop-blur-lg bg-opacity-70">
			<div className="max-w-7xl mx-auto w-full px-5 md:px-10 flex justify-between items-center">
				{/* Logo */}
				<Link href="/" onClick={() => window.location.reload()}>
					<Image src="/assets/logo.svg" width={40} height={40} alt="logo" />
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex items-center space-x-6">
					<Link href="/write" className="text-white hover:text-softBlue">
						Write
					</Link>
					<Link href="/login" className="text-white hover:text-softBlue">
						Login
					</Link>
					<Link
						href="/register"
						className="px-4 py-2 rounded-md bg-softBlue text-black font-medium hover:bg-opacity-90"
					>
						Sign Up
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden">
					<Hamburger toggled={isOpen} toggle={setIsOpen} />
				</div>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="absolute top-full left-0 w-full bg-black md:hidden flex flex-col space-y-3 mt-4 px-5 pb-4"
					>
						<Link
							href="/write"
							className="text-white hover:text-softBlue py-2"
							onClick={() => setIsOpen(false)}
						>
							Write
						</Link>
						<Link
							href="/login"
							className="text-white hover:text-softBlue py-2"
							onClick={() => setIsOpen(false)}
						>
							Login
						</Link>
						<Link
							href="/register"
							className="px-4 py-2 rounded-md bg-softBlue text-black font-medium hover:bg-opacity-90 text-center"
							onClick={() => setIsOpen(false)}
						>
							Sign Up
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
