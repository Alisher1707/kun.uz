const API_BASE_URL = 'https://proftestitlive.uz/api';

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

  // Bitta post
  getById: (id, lang = 'uz') => fetchAPI(`/posts/${id}?lang=${lang}`),

  // ❌ Flag metodlari o'chirildi - frontend o'zi filter qiladi
  // Frontend categorizePostsByFlags() dan foydalanadi
};

// Categories API
export const categoriesAPI = {
  getAll: () => fetchAPI(`/categories`),
  getFront: (lang = 'uz') => fetchAPI(`/front/categories?lang=${lang}`),
};

// Locations API
export const locationsAPI = {
  getAll: () => fetchAPI(`/locations`),
  getFront: (lang = 'uz') => fetchAPI(`/front/locations?lang=${lang}`),
};

// Admin API (if needed)
export const adminAPI = {
  login: (credentials) => fetchAPI('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  createPost: (postData) => fetchAPI('/admin/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  }),
  updatePost: (id, postData) => fetchAPI(`/admin/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  }),
  deletePost: (id) => fetchAPI(`/admin/posts/${id}`, {
    method: 'DELETE',
  }),
  createCategory: (categoryData) => fetchAPI('/admin/categories', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  }),
  updateCategory: (id, categoryData) => fetchAPI(`/admin/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoryData),
  }),
  deleteCategory: (id) => fetchAPI(`/admin/categories/${id}`, {
    method: 'DELETE',
  }),
};

export default {
  posts: postsAPI,
  categories: categoriesAPI,
  locations: locationsAPI,
  admin: adminAPI,
};
