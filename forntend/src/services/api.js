import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - Clear token and redirect to login
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ==================== AUTH ENDPOINTS ====================

export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getProfile: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout'),
};

// ==================== PRODUCT ENDPOINTS ====================

export const productAPI = {
    getAllProducts: (params) => api.get('/products', { params }),
    getProductById: (id) => api.get(`/products/${id}`),
};

// ==================== CONTACT ENDPOINTS ====================

export const contactAPI = {
    submitContact: (data) => api.post('/contact', data),
};

// ==================== ADMIN ENDPOINTS ====================

export const adminAPI = {
    // Products
    getAllProducts: (params) => api.get('/admin/products', { params }),
    addProduct: (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'image' && data[key]) {
                formData.append('image', data[key]);
            } else {
                formData.append(key, data[key]);
            }
        });
        return api.post('/admin/products', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    updateProduct: (id, data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'image' && data[key]) {
                formData.append('image', data[key]);
            } else if (key !== 'image' || data[key]) {
                formData.append(key, data[key]);
            }
        });
        return api.put(`/admin/products/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    deleteProduct: (id) => api.delete(`/admin/products/${id}`),
    toggleProductStatus: (id) => api.patch(`/admin/products/${id}/toggle`),

    // Contacts
    getAllContacts: (params) => api.get('/admin/contacts', { params }),
    getContactById: (id) => api.get(`/admin/contacts/${id}`),
    updateContactStatus: (id, data) => api.patch(`/admin/contacts/${id}`, data),
    deleteContact: (id) => api.delete(`/admin/contacts/${id}`),

    // Dashboard
    getDashboardStats: () => api.get('/admin/dashboard'),
};

export default api;
