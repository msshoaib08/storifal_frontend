// Header Navigation
export const NAV_LINKS = [
	{ name: 'Features', href: '/features' },
	{
		name: 'Resources',
		dropdown: true,
		items: [
			{
				name: 'About Us',
				href: '/about',
				description: 'Learn more about our company and mission.',
			},
			{
				name: 'Blog',
				href: '/blog',
				description: 'Read the latest stories and updates.',
			},
			{
				name: 'FAQs',
				href: '/faqs',
				description: 'Find answers to common questions.',
			},
		],
	},
	{ name: 'Pricing', href: '/pricing' },
	{ name: 'Docs', href: '/docs' },
	{ name: 'Contact', href: '/contact' },
];
