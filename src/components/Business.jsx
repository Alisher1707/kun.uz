import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Business = ({ posts = [] }) => {
  const { t, i18n } = useTranslation();

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
          {posts.length > 0 && posts[0].category?.id ? (
            <Link
              to={`/category/${posts[0].category.id}`}
              className="py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2 mr-10 font-sans text-[#010E38]"
            >
              {t('business.viewAll')}
              <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              to="/"
              className="py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2 mr-10 font-sans text-[#010E38]"
            >
              {t('business.viewAll')}
              <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
            </Link>
          )}
        </div>

        {/* Business Grid - 4 columns */}
        <div className="grid grid-cols-4 gap-6">
          {posts.length > 0 ? (
            posts.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.id}`}
                className="group flex flex-col bg-[#D8D8D8] hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden mb-4 h-[180px]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={getPostName(item)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">Rasm yo'q</span>
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
                <div className="flex flex-col flex-1 px-4 pb-4">
                  {/* Title */}
                  <h3 className="text-base leading-relaxed font-normal line-clamp-3 transition-colors font-sans text-[#000000] hover:text-[#000000]">
                    {getPostName(item)}
                  </h3>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-gray-500">Biznes yangiliklari topilmadi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Business;
