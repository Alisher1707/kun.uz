// Development uchun proxy ishlatamiz (vite.config.js da sozlangan)
// Production da to'liq URL ishlatiladi
const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://proftestitlive.uz/api';

// Generic API fetch function
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

// Posts API
export const postsAPI = {
  // Barcha postlar (frontend uchun) - ASOSIY ENDPOINT
  getAllFront: (lang = 'uz') => fetchAPI(`/front/posts?lang=${lang}`),

  // Bitta post - Frontend API endpoint
  getById: (id, lang = 'uz') => fetchAPI(`/front/posts/${id}?lang=${lang}`),

  // Kategoriya bo'yicha postlar
  getByCategory: (categoryId, lang = 'uz') => fetchAPI(`/front/category/${categoryId}/posts?lang=${lang}`),

  // Location bo'yicha postlar
  getByLocation: (locationId, lang = 'uz') => fetchAPI(`/front/location/${locationId}/posts?lang=${lang}`),

  // ❌ Flag metodlari o'chirildi - frontend o'zi filter qiladi
  // Frontend categorizePostsByFlags() dan foydalanadi
};

// Categories API
export const categoriesAPI = {
  // Frontend
  getFront: (lang = 'uz') => fetchAPI(`/front/categories?lang=${lang}`),

  // Admin
  getAll: () => fetchAPI(`/categories`),
  create: (data) => fetchAPI('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`/categories/${id}`, {
    method: 'DELETE',
  }),
};

// Locations API
export const locationsAPI = {
  // Frontend
  getFront: (lang = 'uz') => fetchAPI(`/front/locations?lang=${lang}`),

  // Admin
  getAll: () => fetchAPI(`/locations`),
  create: (data) => fetchAPI('/locations', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`/locations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`/locations/${id}`, {
    method: 'DELETE',
  }),
};

// Admin API
export const adminAPI = {
  // Login
  login: (credentials) => fetchAPI('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  // Posts CRUD - multipart/form-data uchun
  getPosts: (lang = 'uz') => fetchAPI(`/posts?lang=${lang}`),

  createPost: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        body: formData, // FormData - NO Content-Type header
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  },

  updatePost: async (id, formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'POST', // Laravel _method=PUT yoki POST
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  },

  deletePost: (id) => fetchAPI(`/posts/${id}`, {
    method: 'DELETE',
  }),

  // Get admin profile - https://proftestitlive.uz/api/admin/update
  getProfile: async () => {
    try {
      const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
      const authToken = adminUser.token || localStorage.getItem('authToken');

      const headers = {
        'Content-Type': 'application/json',
      };
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch(`${API_BASE_URL}/admin/update`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ action: 'get' }), // Send action to differentiate get from update
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get Profile Error:', error);
      throw error;
    }
  },

  // Profile update - https://proftestitlive.uz/api/admin/update
  updateProfile: async (data, isFormData = false) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      // Get authentication token or user data from localStorage
      const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
      const authToken = adminUser.token || localStorage.getItem('authToken');

      // Add authorization header if token exists
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      console.log('🔄 Sending PUT request to:', `${API_BASE_URL}/admin/update`);
      console.log('📦 Request data:', data);

      const response = await fetch(`${API_BASE_URL}/admin/update`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
        mode: 'cors',
        credentials: 'include',
      });

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Error response:', errorData);
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Success response:', result);
      return result;
    } catch (error) {
      console.error('❌ Profile Update Error:', error);
      throw error;
    }
  },
};

export default {
  posts: postsAPI,
  categories: categoriesAPI,
  locations: locationsAPI,
  admin: adminAPI,
};
