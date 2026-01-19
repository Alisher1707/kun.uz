import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';

const TrendingNews = () => {
  const { t, i18n } = useTranslation();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // ✅ Bitta endpoint - barcha postlar
        const response = await postsAPI.getAllFront(i18n.language);
        const allPosts = response?.posts || [];

        // ✅ Frontend'da is_main filter qilish
        const mainPosts = allPosts.filter(post => post.flags?.is_main === true);
        setNewsItems(mainPosts.slice(0, 8));
      } catch (error) {
        console.error('Error fetching posts:', error);
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [i18n.language]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
  };

  if (loading) {
    return (
      <div className="w-full bg-white py-10">
        <div className="max-w-[1400px] mx-auto px-16">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-12 w-48 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-[200px] bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-[1400px] mx-auto px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold font-sans text-[#000000]">
              {t('trending.title')}
            </h2>
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          </div>
          <button className="py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2 mr-10 font-sans text-[#010E38]">
            {t('trending.viewAll')}
            <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
          </button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.id}`}
              className="group flex flex-col bg-white hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image || '/img/placeholder.png'}
                  alt={item.name}
                  className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/img/placeholder.png';
                  }}
                />
                {/* Category Badge */}
                {item.category && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-black/60 px-4 py-2">
                      <span className="text-xs font-bold text-white tracking-wider font-sans">
                        {item.category.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 pt-4 pl-4">
                {/* Date */}
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="#000000"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                  </svg>
                  <span className="text-sm font-sans text-[#000000]">{formatDate(item.created_at)}</span>
                </div>

                {/* Title */}
                <h3 className="text-base leading-relaxed font-normal line-clamp-3 transition-colors font-sans text-[#000000] hover:text-[#000000]">
                  {item.body || item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingNews;
