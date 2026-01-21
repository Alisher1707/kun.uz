import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LatestNewsSection = ({ posts = [] }) => {
  const { i18n } = useTranslation();

  const getPostName = (post) => {
    const lang = i18n.language;
    return post[`name_${lang}`] || post.name_uz || post.name || '';
  };

  const getCategoryName = (category) => {
    if (!category) return '';
    const lang = i18n.language;
    return category[`name_${lang}`] || category.name_uz || category.name || '';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
  };

  if (posts.length === 0) return null;

  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-[1400px] mx-auto px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold font-sans text-[#000000]">
              Dolzarb yangiliklar
            </h2>
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          </div>
          <Link
            to="/"
            className="py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2 mr-10 font-sans text-[#010E38]"
          >
            Bo'limga o'tish
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* News Grid - 4 columns */}
        <div className="grid grid-cols-4 gap-6">
          {posts.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.id}`}
              className="group flex flex-col bg-white hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={getPostName(item)}
                    className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Rasm yo'q</span>
                  </div>
                )}
                {/* Category Badge */}
                {item.category && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-black/60 px-4 py-2">
                      <span className="text-xs font-bold text-white tracking-wider font-sans">
                        {getCategoryName(item.category)}
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
                  <span className="text-sm font-sans text-[#000000]">
                    {formatDate(item.created_at)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base leading-relaxed font-normal line-clamp-3 transition-colors font-sans text-[#000000]">
                  {getPostName(item)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNewsSection;
