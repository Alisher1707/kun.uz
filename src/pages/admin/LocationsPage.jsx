import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { locationsAPI } from '../../services/api';
import { MapPin, Edit2, Trash2, Plus, Globe } from 'lucide-react';

const LocationsPage = () => {
  const { t, i18n } = useTranslation();

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [formData, setFormData] = useState({
    name_uz: '',
    name_ru: '',
    name_en: '',
  });

  // Load locations
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const data = await locationsAPI.getAll();
      setLocations(data || []);
    } catch (err) {
      console.error('Error fetching locations:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name_uz: '',
      name_ru: '',
      name_en: '',
    });
    setEditingLocation(null);
  };

  const handleOpenModal = (location = null) => {
    if (location) {
      setEditingLocation(location);
      setFormData({
        name_uz: location.name_uz || '',
        name_ru: location.name_ru || '',
        name_en: location.name_en || '',
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name_uz.trim() || !formData.name_ru.trim() || !formData.name_en.trim()) {
      alert('Iltimos, barcha maydonlarni to\'ldiring!');
      return;
    }

    try {
      if (editingLocation) {
        await locationsAPI.update(editingLocation.id, formData);
      } else {
        await locationsAPI.create(formData);
      }
      handleCloseModal();
      fetchLocations(); // Refresh list
    } catch (err) {
      console.error('Error saving location:', err);
      alert('Xatolik yuz berdi!');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Joyni o\'chirishga ishonchingiz komilmi?')) return;

    try {
      await locationsAPI.delete(id);
      fetchLocations(); // Refresh list
    } catch (err) {
      console.error('Error deleting location:', err);
      alert('O\'chirishda xatolik yuz berdi!');
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
          <h1 className="text-3xl font-bold text-gray-900">Locations Management</h1>
          <p className="text-gray-600 mt-2">Joylarni boshqaring va tahrirlang</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-md"
        >
          <Plus className="w-5 h-5" />
          Yangi Joy
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Jami Joylar</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{locations.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">O'zbek Tilida</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {locations.filter(l => l.name_uz).length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">3 Tilda</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {locations.filter(l => l.name_uz && l.name_ru && l.name_en).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  O'zbek
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Русский
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  English
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-lg font-medium">Hozircha joylar yo'q</p>
                    <p className="text-sm mt-1">Yangi joy qo'shish uchun yuqoridagi tugmani bosing</p>
                  </td>
                </tr>
              ) : (
                locations.map((location) => (
                  <tr key={location.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">#{location.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {location.name_uz || '-'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{location.name_ru || '-'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{location.name_en || '-'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {location.name_uz && location.name_ru && location.name_en ? (
                        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          To'liq
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Noto'liq
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenModal(location)}
                        className="text-blue-600 hover:text-blue-900 mr-4 transition-colors inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Tahrirlash</span>
                      </button>
                      <button
                        onClick={() => handleDelete(location.id)}
                        className="text-red-600 hover:text-red-900 transition-colors inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>O'chirish</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-red-600" />
                {editingLocation ? 'Joyni Tahrirlash' : 'Yangi Joy Qo\'shish'}
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

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Uzbek Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Joy nomi (O'zbek) *
                </label>
                <input
                  type="text"
                  value={formData.name_uz}
                  onChange={(e) => setFormData({ ...formData, name_uz: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                  placeholder="Masalan: Toshkent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">O'zbek tilidagi joy nomini kiriting</p>
              </div>

              {/* Russian Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Joy nomi (Rus) *
                </label>
                <input
                  type="text"
                  value={formData.name_ru}
                  onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                  placeholder="Например: Ташкент"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Rus tilidagi joy nomini kiriting</p>
              </div>

              {/* English Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Joy nomi (Ingliz) *
                </label>
                <input
                  type="text"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                  placeholder="For example: Tashkent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Ingliz tilidagi joy nomini kiriting</p>
              </div>

              {/* Preview Card */}
              {(formData.name_uz || formData.name_ru || formData.name_en) && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-600 mb-2">Ko'rinish:</p>
                  <div className="space-y-1">
                    {formData.name_uz && (
                      <p className="text-sm">
                        <span className="font-medium">O'zbek:</span> {formData.name_uz}
                      </p>
                    )}
                    {formData.name_ru && (
                      <p className="text-sm">
                        <span className="font-medium">Русский:</span> {formData.name_ru}
                      </p>
                    )}
                    {formData.name_en && (
                      <p className="text-sm">
                        <span className="font-medium">English:</span> {formData.name_en}
                      </p>
                    )}
                  </div>
                </div>
              )}

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
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium shadow-md flex items-center justify-center gap-2"
                >
                  {editingLocation ? (
                    <>
                      <Edit2 className="w-4 h-4" />
                      Yangilash
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Saqlash
                    </>
                  )}
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
