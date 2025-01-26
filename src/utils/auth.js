import { API_BASE_URL } from './api.js';

export const checkAuthenticated = async () => {
    try {
        console.log('Sending request to check authentication...');
        console.log('Request headers:', {
            method: 'GET',
            credentials: 'include',
        });

        const response = await fetch(`${API_BASE_URL}/api/authenticated`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            console.error('Authentication request failed with status:', response.status);
            throw new Error('Not authenticated');
        }

        const data = await response.json();
        console.log('Authentication response data:', data);
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



