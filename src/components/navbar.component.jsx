'use client';

import React from 'react';
import Link from 'next/link';
import { AnimatedButton } from './button.component';
import DesktopNav from './desktop-nav.component';
import MobileNav from './mobile-nav.component';
import Image from 'next/image';

export default function StaticNavbar() {
	return (
		<nav className="w-full py-5 bg-black text-white border-b border-mutedGray/20 sticky top-0 z-50 backdrop-blur-lg bg-opacity-70">
			<div className="max-w-7xl mx-auto w-full px-5 md:px-10 flex justify-between items-center">
				<div className="flex items-center gap-10">
					{/* Logo */}
					<Link href="/" className="text-xl font-bold text-softPurple">
						<Image src="/assets/logo.svg" width={40} height={40} alt="logo" />
					</Link>

					{/* Desktop Navigation */}
					<DesktopNav />
				</div>

				{/* Animated Button (Visible on Desktop) */}
				<div className="hidden md:flex">
					<AnimatedButton />
				</div>

				{/* Mobile Navigation */}
				<MobileNav />
			</div>
		</nav>
	);
}
