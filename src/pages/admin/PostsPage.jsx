import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { adminAPI, categoriesAPI, locationsAPI } from '../../services/api';

const PostsPage = () => {
  const { t, i18n } = useTranslation();

  const flagsList = [
    { key: 'is_main', label: 'Main' },
    { key: 'is_latest', label: 'Latest' },
    { key: 'is_gallery', label: 'Gallery' },
    { key: 'is_kun_uz', label: 'Kun.uz' },
    { key: 'is_interview', label: 'Interview' },
    { key: 'is_business', label: 'Business' },
    { key: 'is_carousel', label: 'Carousel' },
    { key: 'is_articles', label: 'Articles' },
  ];

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    category_id: '',
    location_id: '',
    name_uz: '',
    name_ru: '',
    name_en: '',
    body_uz: '',
    body_ru: '',
    body_en: '',
    youtube_url: '',
    image: null,
    flags: flagsList.reduce((a, f) => ({ ...a, [f.key]: false }), {}),
  });

  // Load data
  useEffect(() => {
    loadData();
  }, [i18n.language]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [postsData, categoriesData, locationsData] = await Promise.all([
        adminAPI.getPosts(i18n.language),
        categoriesAPI.getAll(),
        locationsAPI.getAll(),
      ]);
      setPosts(postsData.posts || []);
      setCategories(categoriesData || []);
      setLocations(locationsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      category_id: '',
      location_id: '',
      name_uz: '',
      name_ru: '',
      name_en: '',
      body_uz: '',
      body_ru: '',
      body_en: '',
      youtube_url: '',
      image: null,
      flags: flagsList.reduce((a, f) => ({ ...a, [f.key]: false }), {}),
    });
    setImagePreview(null);
    setEditingPost(null);
  };

  const handleOpenModal = (post = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        category_id: post.category?.id || '',
        location_id: post.location?.id || '',
        name_uz: post.name_uz || '',
        name_ru: post.name_ru || '',
        name_en: post.name_en || '',
        body_uz: post.body_uz || '',
        body_ru: post.body_ru || '',
        body_en: post.body_en || '',
        youtube_url: post.youtube_url || '',
        image: null,
        flags: flagsList.reduce((a, f) => ({ ...a, [f.key]: !!post.flags?.[f.key] }), {}),
      });
      if (post.image) {
        setImagePreview(post.image);
      }
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append('category_id', formData.category_id);
      fd.append('location_id', formData.location_id);
      fd.append('name_uz', formData.name_uz);
      fd.append('name_ru', formData.name_ru);
      fd.append('name_en', formData.name_en);
      fd.append('body_uz', formData.body_uz);
      fd.append('body_ru', formData.body_ru);
      fd.append('body_en', formData.body_en);
      fd.append('youtube_url', formData.youtube_url);

      flagsList.forEach((f) => {
        fd.append(f.key, formData.flags[f.key] ? 1 : 0);
      });

      if (formData.image) {
        fd.append('image', formData.image);
      }

      if (editingPost) {
        fd.append('_method', 'PUT');
        await adminAPI.updatePost(editingPost.id, fd);
      } else {
        await adminAPI.createPost(fd);
      }

      handleCloseModal();
      loadData();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Xatolik yuz berdi!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Postni o\'chirishga ishonchingiz komilmi?')) {
      try {
        await adminAPI.deletePost(id);
        loadData();
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('O\'chirishda xatolik yuz berdi!');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts Management</h1>
          <p className="text-gray-600 mt-2">Postlarni boshqaring va tahrirlang</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Yangi Post
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Jami Postlar</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{posts.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Main Posts</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {posts.filter(p => p.flags?.is_main).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Kategoriyalar</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{categories.length}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Joylar</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{locations.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Nomi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Media
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Kategoriya
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Flags
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">#{post.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-md">
                      {post.name || post.name_uz}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {post.youtube_url ? (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <span className="text-xs text-gray-600">YouTube</span>
                      </div>
                    ) : post.image ? (
                      <img
                        src={post.image}
                        alt=""
                        className="w-20 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">Yo'q</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {post.category?.name_uz || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {Object.keys(post.flags || {})
                        .filter((f) => post.flags[f])
                        .slice(0, 3)
                        .map((flag) => (
                          <span
                            key={flag}
                            className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded"
                          >
                            {flag.replace('is_', '').replace('_', ' ')}
                          </span>
                        ))}
                      {Object.keys(post.flags || {}).filter((f) => post.flags[f]).length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                          +{Object.keys(post.flags || {}).filter((f) => post.flags[f]).length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(post)}
                      className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                    >
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 my-8 max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingPost ? 'Postni Tahrirlash' : 'Yangi Post Qo\'shish'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategoriya *
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    required
                  >
                    <option value="">Kategoriya tanlang</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_uz}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Joy *
                  </label>
                  <select
                    value={formData.location_id}
                    onChange={(e) => setFormData({ ...formData, location_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    required
                  >
                    <option value="">Joy tanlang</option>
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name_uz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Names */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomi (O'zbek) *
                </label>
                <input
                  type="text"
                  value={formData.name_uz}
                  onChange={(e) => setFormData({ ...formData, name_uz: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Post nomini kiriting..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomi (Rus)
                  </label>
                  <input
                    type="text"
                    value={formData.name_ru}
                    onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Название поста..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomi (Ingliz)
                  </label>
                  <input
                    type="text"
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Post title..."
                  />
                </div>
              </div>

              {/* Bodies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matn (O'zbek) *
                </label>
                <textarea
                  value={formData.body_uz}
                  onChange={(e) => setFormData({ ...formData, body_uz: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Post matnini kiriting..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Matn (Rus)
                  </label>
                  <textarea
                    value={formData.body_ru}
                    onChange={(e) => setFormData({ ...formData, body_ru: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Текст поста..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Matn (Ingliz)
                  </label>
                  <textarea
                    value={formData.body_en}
                    onChange={(e) => setFormData({ ...formData, body_en: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Post content..."
                  />
                </div>
              </div>

              {/* YouTube & Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={formData.youtube_url}
                    onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rasm
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rasm ko'rinishi
                  </label>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg border"
                  />
                </div>
              )}

              {/* Flags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Flags (Ko'rsatish joylari)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {flagsList.map((flag) => (
                    <label
                      key={flag.key}
                      className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.flags[flag.key]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            flags: { ...formData.flags, [flag.key]: e.target.checked },
                          })
                        }
                        className="w-4 h-4 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{flag.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium shadow-md"
                >
                  {editingPost ? 'Yangilash' : 'Saqlash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
