import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';

const Interviews = () => {
  const { t, i18n } = useTranslation();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        const data = await postsAPI.getInterviews(i18n.language);
        setInterviews(data?.slice(0, 4) || []);
      } catch (error) {
        console.error('Error fetching interviews:', error);
        setInterviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [i18n.language]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
  };

  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-[1400px] mx-auto px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold font-sans text-[#000000]">
              {t('interviews.title')}
            </h2>
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          </div>
          <button className="py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2 mr-10 font-sans text-[#010E38]">
            {t('interviews.viewAll')}
            <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
          </button>
        </div>

        {/* Interviews Grid - 2x2 */}
        {loading ? (
          <div className="grid grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-6 animate-pulse">
                <div className="w-[290px] h-[200px] bg-gray-300 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {interviews.map((interview) => (
              <Link
                key={interview.id}
                to={`/news/${interview.id}`}
                className="group flex gap-6 bg-white hover:shadow-lg transition-shadow duration-300 p-0"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden w-[290px] flex-shrink-0">
                  <img
                    src={interview.image || '/img/placeholder.png'}
                    alt={interview.name}
                    className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/img/placeholder.png';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 py-2">
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
                    <span className="text-sm font-sans text-[#000000]">{formatDate(interview.created_at)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold leading-snug mb-3 font-sans text-[#000000] group-hover:text-[#000000] transition-colors">
                    {interview.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed font-sans text-[#666666] line-clamp-3">
                    {interview.body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviews;
