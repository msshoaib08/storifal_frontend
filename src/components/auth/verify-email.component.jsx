'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { API } from '@/utils/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const VerifyEmail = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (!token) {
			setMessage('Invalid verification link');
			setLoading(false);
			return;
		}

		const verifyEmail = async () => {
			try {
				const res = await API.get(`/auth/verify-email?token=${token}`);
				setMessage(res.data.message || 'Email verified successfully!');
				toast.success('Email verified successfully! 🎉');

				setTimeout(() => router.push('/auth/login'), 5000);
			} catch (error) {
				const errorMsg =
					error.response?.data?.message || 'Invalid or expired link';
				setMessage(errorMsg);
				toast.error(errorMsg);
			} finally {
				setLoading(false);
			}
		};

		verifyEmail();
	}, [token, router]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black text-lightGray">
			{loading ? (
				<>
					<h2 className="text-2xl font-bold mb-4">Verifying Email...</h2>
					<div className="w-8 h-8 border-4 border-softBlue border-t-transparent rounded-full animate-spin"></div>
				</>
			) : (
				<>
					<h2 className="text-2xl font-bold">{message}</h2>
					<p className="text-mutedGray mt-2">
						Redirecting to login in 5 sec...
					</p>
					<Button
						onClick={() => router.push('/auth/login')}
						className="mt-4 bg-softBlue text-white px-4 py-2"
					>
						Go to Login
					</Button>
				</>
			)}
		</div>
	);
};

export default VerifyEmail;
