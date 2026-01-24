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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
  };

  // YouTube video ID ni olish
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // YouTube thumbnail olish
  const getYoutubeThumbnail = (url) => {
    const videoId = getYoutubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
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
              {/* Image/Video Container */}
              <div className="relative overflow-hidden">
                {item.image ? (
                  // Rasm mavjud bo'lsa
                  <img
                    src={item.image}
                    alt={getPostName(item)}
                    className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : item.youtube_url ? (
                  // YouTube video bo'lsa
                  <div className="relative w-full h-[200px]">
                    <img
                      src={getYoutubeThumbnail(item.youtube_url)}
                      alt={getPostName(item)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=YouTube+Video';
                      }}
                    />
                    {/* YouTube Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Rasm ham, video ham yo'q
                  <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Media yo'q</span>
                  </div>
                )}
                {/* Category Badge */}
                {item.category && getCategoryName(item.category) && (
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-black/70 px-4 py-2">
                      <span className="text-xs font-bold text-white tracking-wider uppercase font-sans">
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
