'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import validator from 'validator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { API } from '@/utils/api';
import { formatDate } from '@/utils/dateUtils';

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const nameRegex = /^[A-Za-z\s]+$/;
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

	// Disposable email domains
	const disposalEmail = ['tempmail.com', 'mailinator.com', 'guerrillamail.com'];

	const validateField = (name, value) => {
		let error = '';

		if (name === 'name') {
			if (!value.trim()) {
				error = 'Name is required';
			} else if (value.length < 3) {
				error = 'Name must be at least 3 characters';
			} else if (!nameRegex.test(value)) {
				error = 'Name should only contain alphabets and spaces';
			}
		}

		if (name === 'email') {
			if (!value.trim()) {
				error = 'Email is required';
			} else if (!validator.isEmail(value)) {
				error = 'Invalid email format';
			} else if (disposalEmail.some((domain) => value.endsWith(domain))) {
				error = 'Disposable email addresses are not allowed';
			}
		}

		if (name === 'password') {
			if (!value.trim()) {
				error = 'Password is required';
			} else if (!passwordRegex.test(value)) {
				error =
					'Password must be at least 6 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character';
			}
		}

		return error;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		setErrors({ ...errors, [name]: '' });
	};

	const handleBlur = (e) => {
		const { name, value } = e.target;
		const error = validateField(name, value);
		setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

		if (error) toast.error(error);
	};

	// Form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate all fields before submission
		let newErrors = {};
		Object.keys(formData).forEach((key) => {
			const error = validateField(key, formData[key]);
			if (error) newErrors[key] = error;
		});

		setErrors(newErrors);

		// If errors exist, prevent submission
		if (Object.keys(newErrors).length > 0) return;

		setLoading(true);

		try {
			const res = await API.post('/auth/register', formData);
			toast('Verification email sent successfully! Check your Inbox.', {
				description: formatDate,
				action: {
					label: 'Close',
				},
			});

			setFormData({ name: '', email: '', password: '' });
			setErrors({});
			console.log(res.data);
		} catch (error) {
			toast('Registration Failed. Try Again.', {
				description: formatDate,
				action: {
					label: 'Close',
				},
			});
			console.log(error);
		} finally {
			setLoading(false);
		}
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
					<Input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Full Name"
						className="mt-1 md:text-base bg-black text-lightGray border-mutedGray placeholder:text-mutedGray"
					/>

					<Input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Email address"
						className="mt-1 md:text-base bg-black text-lightGray border-mutedGray placeholder:text-mutedGray"
					/>

					<Input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Password"
						className="mt-1 md:text-base bg-black text-lightGray border-mutedGray placeholder:text-mutedGray"
					/>

					<Button
						variant="primary"
						type="submit"
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
