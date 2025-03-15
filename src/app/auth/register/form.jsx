'use client';

import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import validator from 'validator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

const nameRegex = /^[A-Za-z\s]+$/;
const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const disposalEmail = ['tempmail.com', 'mailinator.com', 'guerrillamail.com'];

const RegisterForm = () => {
	const { register } = useAuth();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);

	const validateField = useCallback((name, value) => {
		if (!value.trim())
			return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;

		if (name === 'name') {
			if (value.length < 3) return 'Name must be at least 3 characters';
			if (!nameRegex.test(value)) return 'Only alphabets & spaces allowed';
		}

		if (name === 'email') {
			if (!validator.isEmail(value)) return 'Invalid email format';
			if (disposalEmail.some((domain) => value.endsWith(domain)))
				return 'Disposable emails not allowed';
		}

		if (name === 'password' && !passwordRegex.test(value)) {
			return 'Password must have 6+ characters, 1 uppercase, 1 number & 1 special character';
		}

		return '';
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleBlur = (e) => {
		const { name, value } = e.target;
		const error = validateField(name, value);
		if (error) toast.error(error);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		for (const key of Object.keys(formData)) {
			const error = validateField(key, formData[key]);
			if (error) {
				toast.error(error);
				setLoading(false);
				return;
			}
		}

		// Call register function from AuthContext
		const result = await register(formData);
		if (result.success) {
			setFormData({ name: '', email: '', password: '' });
		}

		setLoading(false);
	};

	return (
		<Card className="w-full max-w-6xl bg-darkGray border-mutedGray p-6">
			<CardHeader>
				<CardTitle className="text-lightGray text-center text-2xl font-bold">
					Create Your Account
				</CardTitle>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					{['name', 'email', 'password'].map((field) => (
						<Input
							key={field}
							type={field === 'password' ? 'password' : 'text'}
							name={field}
							value={formData[field]}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder={
								field === 'name'
									? 'Full Name'
									: field === 'email'
									? 'Email Address'
									: 'Password'
							}
							className="mt-1 md:text-base bg-black text-lightGray border-mutedGray placeholder:text-mutedGray"
						/>
					))}

					<Button
						variant="primary"
						type="submit"
						disabled={loading}
						className="w-fit mx-auto bg-black text-lightGray text-base font-bold"
					>
						{loading ? 'Creating your account...' : 'Create your account'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default RegisterForm;
