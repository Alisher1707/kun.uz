import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';

const Business = () => {
  const { t, i18n } = useTranslation();
  const [businessNews, setBusinessNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        setLoading(true);
        const data = await postsAPI.getBusiness(i18n.language);
        setBusinessNews(data?.slice(0, 4) || []);
      } catch (error) {
        console.error('Error fetching business:', error);
        setBusinessNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [i18n.language]);

  return (
    <div className="w-full bg-white py-10 mb-12">
      <div className="max-w-[1400px] mx-auto px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold font-sans text-[#000000]">
              {t('business.title')}
            </h2>
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          </div>
          <button className="py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2 mr-10 font-sans text-[#010E38]">
            {t('business.viewAll')}
            <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
          </button>
        </div>

        {/* Business Grid - 4 columns */}
        {loading ? (
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-gray-300 h-[260px] rounded"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {businessNews.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.id}`}
                className="group flex flex-col bg-[#D8D8D8] hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden mb-4 h-[180px]">
                  <img
                    src={item.image || '/img/placeholder.png'}
                    alt={item.name}
                    className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/img/placeholder.png';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-4 pb-4">
                  {/* Title */}
                  <h3 className="text-base leading-relaxed font-normal line-clamp-3 transition-colors font-sans text-[#000000] hover:text-[#000000]">
                    {item.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Business;
