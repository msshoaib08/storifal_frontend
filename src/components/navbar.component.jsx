'use client';

import * as React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { NAV_LINKS } from '@/utils/siteData';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatedButton } from './button.component';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="w-full py-5 bg-black text-white border-b border-mutedGray/20 sticky top-0 z-50 backdrop-blur-lg bg-opacity-70">
			<div className="max-w-7xl mx-auto w-full px-5 md:px-10 flex justify-between items-center">
				<div className="flex items-center space-x-8">
					{/* Logo */}
					<Link href="/" className="text-xl font-bold text-softPurple">
						Storifal
					</Link>

					{/* Desktop Menu */}
					<div className="hidden lg:flex space-x-6 items-center">
						<NavigationMenu>
							<NavigationMenuList className="flex space-x-6">
								{NAV_LINKS.map((link) =>
									link.dropdown ? (
										<NavigationMenuItem key={link.name}>
											<NavigationMenuTrigger className="text-white hover:text-softPurple font-semibold">
												{link.name}
											</NavigationMenuTrigger>
											<NavigationMenuContent className="bg-darkGray p-2 rounded-md shadow-lg text-white border !border-mutedGray">
												<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:grid-cols-2 lg:w-[600px]">
													{link.items.map((item) => (
														<ListItem
															key={item.name}
															title={item.name}
															href={item.href}
														>
															{item.description}
														</ListItem>
													))}
												</ul>
											</NavigationMenuContent>
										</NavigationMenuItem>
									) : (
										<NavigationMenuItem key={link.name}>
											<NavigationMenuLink asChild>
												<Link
													href={link.href}
													className="text-white font-semibold hover:text-softPurple"
												>
													{link.name}
												</Link>
											</NavigationMenuLink>
										</NavigationMenuItem>
									)
								)}
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>

				{/* Right Section (Get Started Button) */}
				<div className="hidden md:flex">
					<AnimatedButton />
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden text-[#868686]"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden flex flex-col space-y-3 mt-4 border-t border-[#A0A0A0] pt-3 px-5">
					{NAV_LINKS.map((link) =>
						link.dropdown ? (
							<div key={link.name}>
								<p className="text-[#868686] font-medium">{link.name}</p>
								<div className="ml-4 space-y-2">
									{link.items.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className="text-[#A0A0A0] hover:text-[#BBACFF] block"
										>
											{item.name}
										</Link>
									))}
								</div>
							</div>
						) : (
							<Link
								key={link.name}
								href={link.href}
								className="text-[#868686] hover:text-[#BBACFF] block"
							>
								{link.name}
							</Link>
						)
					)}
					<AnimatedButton />
				</div>
			)}
		</nav>
	);
}

/* Custom List Item Component */
const ListItem = React.forwardRef(
	({ className, title, children, ...props }, ref) => (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-softPurple focus:text-softPurple',
						className
					)}
					{...props}
				>
					<div className="text-sm font-bold leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-lightGray">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
);
ListItem.displayName = 'ListItem';
