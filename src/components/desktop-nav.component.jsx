'use client';

import React from 'react';
import Link from 'next/link';
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

export default function DesktopNav() {
	return (
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
