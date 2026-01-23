import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { postsAPI, locationsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import CategoryMenu from '../components/CategoryMenu';
import LatestNewsSection from '../components/LatestNewsSection';
import Footer from '../components/Footer';

const LocationPage = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Location ma'lumotlarini olish
        const locationsData = await locationsAPI.getAll();
        const currentLocation = locationsData.find(loc => loc.id === parseInt(id));
        setLocation(currentLocation);

        // Location bo'yicha postlarni to'g'ridan-to'g'ri API dan olish
        const response = await postsAPI.getByLocation(id, i18n.language);
        // Backend to'g'ridan-to'g'ri array qaytaradi, response.posts emas
        const locationPosts = Array.isArray(response) ? response : [];
        setPosts(locationPosts);
      } catch (err) {
        console.error('Location ma\'lumotlarini yuklashda xatolik:', err);
        setError(err.message || 'Xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, i18n.language]);

  const getLocationName = (location) => {
    if (!location) return '';
    const lang = i18n.language;
    return location[`name_${lang}`] || location.name_uz || location.name || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <CategoryMenu />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <CategoryMenu />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Xatolik yuz berdi</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryMenu />

      {/* Location Header */}
      <div className="w-full bg-white py-8 border-b">
        <div className="max-w-[1400px] mx-auto px-16">
          <h1 className="text-4xl font-bold text-gray-900">
            {getLocationName(location)}
          </h1>
          <p className="text-gray-600 mt-2">
            {posts.length} ta yangilik topildi
          </p>
        </div>
      </div>

      {/* Posts Section */}
      {posts.length > 0 ? (
        <LatestNewsSection posts={posts} />
      ) : (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Hozircha yangiliklar yo'q
            </h2>
            <p className="text-gray-600">
              Bu hudud uchun yangiliklar mavjud emas
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LocationPage;
