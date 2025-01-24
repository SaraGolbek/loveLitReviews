import { API_BASE_URL } from '../utils/api';

export const checkAuthenticated = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/authenticated`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.authenticated;
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
};

