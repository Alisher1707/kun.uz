import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Interviews = ({ posts = [] }) => {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
  };

  const getPostName = (post) => {
    const lang = i18n.language;
    return post[`name_${lang}`] || post.name_uz || post.name || '';
  };

  const getPostBody = (post) => {
    const lang = i18n.language;
    return post[`body_${lang}`] || post.body_uz || post.body || '';
  };

  const getCategoryName = (category) => {
    if (!category) return '';
    const lang = i18n.language;

    // Turli xil mumkin bo'lgan field nomlarini tekshirish
    return category[`name_${lang}`] ||
           category.name_uz ||
           category.name ||
           category.title ||
           category[`title_${lang}`] ||
           category.title_uz ||
           category.category_name ||
           '';
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
          <Link
            to="/"
            className="py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2 mr-10 font-sans text-[#010E38]"
          >
            {t('interviews.viewAll')}
            <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
          </Link>
        </div>

        {/* Interviews Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-6">
          {posts.length > 0 ? (
            posts.slice(0, 4).map((interview) => (
              <Link
                key={interview.id}
                to={`/news/${interview.id}`}
                className="group flex gap-6 bg-white hover:shadow-lg transition-shadow duration-300 p-0"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden w-[290px] flex-shrink-0">
                  {interview.image ? (
                    <img
                      src={interview.image}
                      alt={getPostName(interview)}
                      className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Rasm yo'q</span>
                    </div>
                  )}
                  {/* Category Badge */}
                  {interview.category && getCategoryName(interview.category) && (
                    <div className="absolute top-0 right-0 z-10">
                      <div className="bg-black/70 px-4 py-2">
                        <span className="text-xs font-bold text-white tracking-wider uppercase font-sans">
                          {getCategoryName(interview.category)}
                        </span>
                      </div>
                    </div>
                  )}
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
                    {getPostName(interview)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed font-sans text-[#666666] line-clamp-3">
                    {getPostBody(interview)}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500">Intervyular topilmadi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interviews;
