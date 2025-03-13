import axios from 'axios';

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/';

export const API = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add token to headers if it exists
API.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Unauthorized errors
API.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			console.log('Unauthorized Logging Out');
			localStorage.removeItem('token');
		}
		return Promise.reject(error);
	}
);
