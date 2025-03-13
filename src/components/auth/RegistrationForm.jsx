'use client';

import { registerUser } from '@/services/auth';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RegistrationForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		username: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await registerUser(formData);
			toast('Account has been created!', {
				description: 'Check your email for verification',
				type: 'success',
				action: {
					label: 'Close',
					onClick: () => console.log('Undo'),
				},
			});
		} catch (error) {
			toast('Registration Failed!', {
				description: 'Try Aagin',
				action: {
					label: 'Close',
					onClick: () => console.log('Undo'),
				},
			});
		}
	};

	return (
		<>
			<h2>Registration Form</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input name="name" placeholder="Name" onChange={handleChange} />
				<input name="email" placeholder="Email" onChange={handleChange} />
				<input name="username" placeholder="Username" onChange={handleChange} />
				<input
					name="password"
					type="password"
					placeholder="Password"
					onChange={handleChange}
				/>
				<button type="submit">Register</button>
			</form>
		</>
	);
}
