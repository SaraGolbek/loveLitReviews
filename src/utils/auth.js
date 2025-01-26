import { API_BASE_URL } from '../utils/api';

export const checkAuthenticated = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/authenticated`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) throw new Error('Not authenticated');

        const data = await response.json();
        return { authenticated: data.authenticated, username: data.username };
    } catch (error) {
        console.error('Error checking authentication:', error);
        return { authenticated: false, username: null };
    }
};

export const getCurrentUsername = () => {
    const match = document.cookie.match(/username=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
};



