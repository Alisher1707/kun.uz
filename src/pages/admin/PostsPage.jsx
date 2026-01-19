import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PostsPage = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Ekologik farmon: qurilishlar va korxonalar ustidan qat\'iy nazorat',
      category: "O'zbekiston",
      author: 'Admin',
      date: '26.11.2025',
      status: 'published',
      views: 1250,
    },
    {
      id: 2,
      title: 'Jizzaxda AES qurilishi loyihasi bo\'yicha jamoatchilik eshituvlari',
      category: "O'zbekiston",
      author: 'Editor',
      date: '25.11.2025',
      status: 'published',
      views: 890,
    },
    {
      id: 3,
      title: 'O\'zbekiston milliy jamoasi JCH-2026 qur\'asida uchinchi savatdan joy oldi',
      category: 'Sport',
      author: 'Admin',
      date: '24.11.2025',
      status: 'draft',
      views: 0,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: "O'zbekiston",
    content: '',
    status: 'draft',
  });

  const handleOpenModal = (post = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        category: post.category,
        content: '',
        status: post.status,
      });
    } else {
      setEditingPost(null);
      setFormData({ title: '', category: "O'zbekiston", content: '', status: 'draft' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
    setFormData({ title: '', category: "O'zbekiston", content: '', status: 'draft' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      setPosts(posts.map(post =>
        post.id === editingPost.id
          ? { ...post, title: formData.title, category: formData.category, status: formData.status }
          : post
      ));
    } else {
      const newPost = {
        id: posts.length + 1,
        ...formData,
        author: 'Admin',
        date: new Date().toLocaleDateString('uz-UZ'),
        views: 0,
      };
      setPosts([...posts, newPost]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm(t('admin.posts.deleteConfirm'))) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.posts.title')}</h1>
          <p className="text-gray-600 mt-2">{t('admin.posts.subtitle')}</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          {t('admin.posts.addNew')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{t('admin.posts.totalPosts')}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{posts.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{t('admin.posts.published')}</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {posts.filter(p => p.status === 'published').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{t('admin.posts.drafts')}</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {posts.filter(p => p.status === 'draft').length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{t('admin.posts.totalViews')}</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {posts.reduce((sum, post) => sum + post.views, 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.posts.postTitle')}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.posts.category')}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.posts.author')}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.posts.date')}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.posts.views')}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.posts.status')}
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.posts.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{post.id}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-md truncate">
                    {post.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {post.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {post.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {post.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.status === 'published' ? t('admin.posts.published') : t('admin.posts.draft')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(post)}
                    className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                  >
                    {t('admin.posts.edit')}
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                  >
                    {t('admin.posts.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingPost ? t('admin.posts.editPost') : t('admin.posts.addPost')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admin.posts.postTitle')}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admin.posts.category')}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="O'zbekiston">O'zbekiston</option>
                  <option value="Jahon">Jahon</option>
                  <option value="Sport">Sport</option>
                  <option value="Iqtisodiyot">Iqtisodiyot</option>
                  <option value="Jamiyat">Jamiyat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admin.posts.content')}
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admin.posts.status')}
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="draft">{t('admin.posts.draft')}</option>
                  <option value="published">{t('admin.posts.published')}</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('admin.posts.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  {editingPost ? t('admin.posts.update') : t('admin.posts.create')}
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
