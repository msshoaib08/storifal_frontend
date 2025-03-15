'use client';

import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import validator from 'validator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { API } from '@/utils/api';
import { formatDate } from '@/utils/dateUtils';
import { useAuth } from '@/context/AuthContext';

const LoginForm = () => {
	const { login } = useAuth(); // Global AuthContext
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const validateField = useCallback(async (name, value) => {
		if (!value.trim())
			return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;

		if (name === 'email' && !validator.isEmail(value)) {
			return 'Invalid email format';
		}

		if (name === 'password' && value.length < 6) {
			return 'Password must be at least 6 characters';
		}

		return '';
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: '' }));
	};

	const handleBlur = async (e) => {
		const { name, value } = e.target;
		const error = await validateField(name, value);
		setErrors((prev) => ({ ...prev, [name]: error }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		let newErrors = {};
		for (const key of Object.keys(formData)) {
			const error = await validateField(key, formData[key]);
			if (error) newErrors[key] = error;
		}

		// Stop execution if there are validation errors
		if (Object.keys(newErrors).length) {
			setErrors(newErrors);
			toast.error(Object.values(newErrors)[0]);
			setLoading(false);
			return;
		}

		try {
			console.log('Sending data:', formData); // Debugging
			const { data } = await API.post('/auth/login', formData);

			// Ensure data is valid before proceeding
			if (!data || !data.user || !data.token) {
				throw new Error('Invalid login response');
			}

			// Store token and set user globally
			login(data.user, data.token);
			toast.success('Login successful!', {
				description: formatDate(new Date()),
				action: { label: 'Close' },
			});
		} catch (error) {
			// Handle different types of errors properly
			const errorMessage =
				error.response?.data?.message ||
				(error.message.includes('JSON')
					? 'Server error, please try again.'
					: 'Invalid credentials');

			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="w-full max-w-6xl bg-darkGray border-mutedGray p-6">
			<CardHeader>
				<CardTitle className="text-lightGray text-center text-2xl font-bold">
					Login to Your Account
				</CardTitle>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					{['email', 'password'].map((field) => (
						<Input
							key={field}
							type={field === 'password' ? 'password' : 'text'}
							name={field}
							value={formData[field]}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder={field === 'email' ? 'Email Address' : 'Password'}
							className="mt-1 md:text-base bg-black text-lightGray border-mutedGray placeholder:text-mutedGray"
						/>
					))}

					<Button
						variant="primary"
						type="submit"
						disabled={loading}
						className="w-fit mx-auto bg-black text-lightGray text-base font-bold"
					>
						{loading ? 'Logging in...' : 'Login'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default LoginForm;
