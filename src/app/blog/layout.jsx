import { Suspense } from 'react';
import BlogNavbar from './components/blog-nav.component';
import Spinner from '@/components/spinner.component';

export default function RootLayout({ children }) {
	return (
		<>
			<BlogNavbar />
			<Suspense fallback={<Spinner />}>
				<main>{children}</main>
			</Suspense>
		</>
	);
}
