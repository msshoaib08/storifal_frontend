import { Suspense } from 'react';
import BlogNavbar from './components/blog-nav.component';

export default function RootLayout({ children }) {
	return (
		<Suspense fallback={<Loading />}>
			<BlogNavbar />
			<main>{children}</main>
		</Suspense>
	);
}

function Loading() {
	return (
		<div className="flex justify-center items-center min-h-[200px]">
			<div className="w-10 h-10 border-4 border-softBlue border-t-transparent rounded-full animate-spin"></div>
		</div>
	);
}
