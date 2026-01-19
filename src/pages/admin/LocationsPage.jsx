import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LocationsPage = () => {
  const { t } = useTranslation();
  const [locations, setLocations] = useState([
    { id: 1, name: 'Toshkent', region: 'Toshkent shahri', postsCount: 125, status: 'active' },
    { id: 2, name: 'Samarqand', region: 'Samarqand viloyati', postsCount: 67, status: 'active' },
    { id: 3, name: 'Buxoro', region: 'Buxoro viloyati', postsCount: 45, status: 'active' },
    { id: 4, name: 'Andijon', region: 'Andijon viloyati', postsCount: 38, status: 'active' },
    { id: 5, name: 'Farg\'ona', region: 'Farg\'ona viloyati', postsCount: 52, status: 'active' },
    { id: 6, name: 'Namangan', region: 'Namangan viloyati', postsCount: 41, status: 'inactive' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [formData, setFormData] = useState({ name: '', region: '', status: 'active' });

  const handleOpenModal = (location = null) => {
    if (location) {
      setEditingLocation(location);
      setFormData({ name: location.name, region: location.region, status: location.status });
    } else {
      setEditingLocation(null);
      setFormData({ name: '', region: '', status: 'active' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLocation(null);
    setFormData({ name: '', region: '', status: 'active' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLocation) {
      setLocations(locations.map(loc =>
        loc.id === editingLocation.id ? { ...loc, ...formData } : loc
      ));
    } else {
      const newLocation = {
        id: locations.length + 1,
        ...formData,
        postsCount: 0,
      };
      setLocations([...locations, newLocation]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm(t('admin.locations.deleteConfirm'))) {
      setLocations(locations.filter(loc => loc.id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.locations.title')}</h1>
          <p className="text-gray-600 mt-2">{t('admin.locations.subtitle')}</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          {t('admin.locations.addNew')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{t('admin.locations.totalLocations')}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{locations.length}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{t('admin.locations.activeLocations')}</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {locations.filter(l => l.status === 'active').length}
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
              <p className="text-gray-600 text-sm">{t('admin.locations.totalPosts')}</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {locations.reduce((sum, loc) => sum + loc.postsCount, 0)}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.locations.locationName')}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.locations.region')}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.locations.posts')}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.locations.status')}
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.locations.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {locations.map((location) => (
              <tr key={location.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{location.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{location.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{location.region}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                    {location.postsCount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      location.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {location.status === 'active' ? t('admin.locations.active') : t('admin.locations.inactive')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(location)}
                    className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                  >
                    {t('admin.locations.edit')}
                  </button>
                  <button
                    onClick={() => handleDelete(location.id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                  >
                    {t('admin.locations.delete')}
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
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingLocation ? t('admin.locations.editLocation') : t('admin.locations.addLocation')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admin.locations.locationName')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admin.locations.region')}
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admin.locations.status')}
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="active">{t('admin.locations.active')}</option>
                  <option value="inactive">{t('admin.locations.inactive')}</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('admin.locations.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  {editingLocation ? t('admin.locations.update') : t('admin.locations.create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsPage;
