import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';

const PhotoGallery = () => {
  const { t, i18n } = useTranslation();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        // ✅ Bitta endpoint - barcha postlar
        const response = await postsAPI.getAllFront(i18n.language);
        const allPosts = response?.posts || [];

        // ✅ Frontend'da is_gallery filter qilish
        const galleryPosts = allPosts.filter(post => post.flags?.is_gallery === true);
        setPhotos(galleryPosts.slice(0, 2));
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [i18n.language]);

  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-[1400px] mx-auto px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold font-sans text-[#000000]">
              {t('photoGallery.title')}
            </h2>
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          </div>
          <button className="py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2 mr-10 font-sans text-[#010E38]">
            {t('photoGallery.viewAll')}
            <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
          </button>
        </div>

        {/* Photo Grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-[450px] bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {photos.map((photo) => (
              <Link
                key={photo.id}
                to={`/news/${photo.id}`}
                className="group relative overflow-hidden"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={photo.image || '/img/placeholder.png'}
                    alt={photo.name}
                    className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/img/placeholder.png';
                    }}
                  />

                  {/* Category Badge */}
                  {photo.category && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-black/60 px-6 py-3">
                        <span className="text-xs font-bold text-white tracking-wider font-sans">
                          {photo.category.name}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Text Overlay at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-8 py-6">
                    <p className="text-white text-lg font-normal leading-relaxed font-sans">
                      {photo.body || photo.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
