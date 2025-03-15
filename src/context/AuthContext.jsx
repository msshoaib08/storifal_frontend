'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { API } from '@/utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState(null);

	// Check for existing token in local storage
	useEffect(() => {
		const storedToken = localStorage.getItem('authToken');
		if (storedToken) {
			setToken(storedToken);
			fetchUser(storedToken);
		} else {
			setLoading(false);
		}
	}, []);

	const fetchUser = async (token) => {
		try {
			const { data } = await API.get('/auth/me', {
				headers: { Authorization: `Bearer ${token}` },
			});
			setUser(data.user);
		} catch (error) {
			setUser(null);
			localStorage.removeItem('authToken');
		} finally {
			setLoading(false);
		}
	};

	// Register User
	const register = async (formData) => {
		try {
			// Check if email is already registered
			const emailCheck = await API.post('auth/check-email', {
				email: formData.email,
			});
			if (emailCheck.data.exists) {
				toast.error('Email is already registered');
				return { success: false };
			}

			// Register User
			await API.post('/auth/register', formData);
			toast.success('Verification email sent! Check your inbox.');
			return { success: true };
		} catch (error) {
			toast.error(
				error.response?.data?.message || 'Registration Failed. Try Again.'
			);
			return { success: false };
		}
	};

	// Login User
	const login = async (credentials) => {
		try {
			const { data } = await API.post('/auth/login', credentials);
			localStorage.setItem('authToken', data.token);
			setToken(data.token);
			fetchUser(data.token);
			toast.success('Logged in successfully!');
			return { success: true };
		} catch (error) {
			toast.error(error.response?.data?.message || 'Login failed.');
			return { success: false };
		}
	};

	// Logout User
	const logout = () => {
		localStorage.removeItem('authToken');
		setUser(null);
		setToken(null);
		toast.success('Logged out successfully!');
	};

	return (
		<AuthContext.Provider
			value={{ user, token, loading, register, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);
