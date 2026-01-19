import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Default to Android Emulator host IP (10.0.2.2) and Docker port (3003)
// Change this to your LAN IP (e.g., 192.168.1.x) if testing on a physical device
const BASE_URL = 'http://10.0.2.2:3003/api';

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem('token');
            // Navigate to login handled by App.js state
        }
        return Promise.reject(error);
    }
);

export default api;
