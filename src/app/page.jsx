import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-[#E0E0E0] px-4">
			<Card className="w-full max-w-lg bg-[#1E1E1E] p-6 rounded-2xl shadow-lg">
				<CardContent className="text-center">
					<h1 className="text-4xl font-bold text-softBlue">Storifal</h1>
					<p className="text-mutedGray my-3 text-lg text-center max-w-lg">
						Share your thoughts, write your ideas, and inspire the world.
					</p>
					<Link href="/auth/register">
						<Button>Register Now</Button>
					</Link>
				</CardContent>
			</Card>
		</main>
	);
}
