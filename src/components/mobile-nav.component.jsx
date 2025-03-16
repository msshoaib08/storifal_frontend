'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Divide as Hamburger } from 'hamburger-react';
import { NAV_LINKS } from '@/utils/siteData';
import { AnimatedButton } from './button.component';

export default function MobileNav() {
	const [isOpen, setIsOpen] = useState(false);
	const [openDropdowns, setOpenDropdowns] = useState({});

	const toggleDropdown = (linkName) => {
		setOpenDropdowns((prev) => ({
			...prev,
			[linkName]: !prev[linkName],
		}));
	};

	return (
		<div className="lg:hidden">
			{/* Mobile Menu Button */}
			<Hamburger size={28} toggled={isOpen} toggle={setIsOpen} />

			{/* Mobile Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="absolute top-full left-0 w-full bg-black md:hidden flex flex-col space-y-3 mt-4 px-8 py-10 overflow-hidden"
					>
						{NAV_LINKS.map((link, index) =>
							link.dropdown ? (
								<div key={link.name} className="overflow-hidden">
									{/* Dropdown Header */}
									<motion.button
										onClick={() => toggleDropdown(link.name)}
										className="w-full flex justify-between items-center text-white font-bold text-lg py-2"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
									>
										{link.name}
										{openDropdowns[link.name] ? (
											<ChevronUp size={18} />
										) : (
											<ChevronDown size={18} />
										)}
									</motion.button>

									{/* Dropdown Content */}
									<AnimatePresence>
										{openDropdowns[link.name] && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.2 }}
												className="ml-4 space-y-2 overflow-hidden"
											>
												{link.items.map((item, itemIndex) => (
													<motion.div
														className=""
														key={item.name}
														initial={{ opacity: 0, x: -10 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{
															duration: 0.2,
															delay: itemIndex * 0.05,
														}}
													>
														<Link
															href={item.href}
															className="text-white font-bold hover:text-softPurple block py-2"
														>
															{item.name}
														</Link>
													</motion.div>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							) : (
								<motion.div
									key={link.name}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.3, delay: index * 0.05 }}
								>
									<Link
										href={link.href}
										className="text-white hover:text-softPurple font-bold text-lg block py-2"
									>
										{link.name}
									</Link>
								</motion.div>
							)
						)}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3, duration: 0.3 }}
							className="pt-2"
						>
							<AnimatedButton />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
