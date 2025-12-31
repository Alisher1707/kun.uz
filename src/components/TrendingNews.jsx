import { useTranslation } from 'react-i18next';

const TrendingNews = () => {
  const { t } = useTranslation();

  const newsItems = [
    {
      id: 1,
      image: '/img/dolzarb-1.png',
      category: t('hero.category'),
      date: '26.11.2025',
    },
    {
      id: 2,
      image: '/img/dolzarb-2.png',
      category: t('hero.category'),
      date: '26.11.2025',
    },
    {
      id: 3,
      image: '/img/dolzarb-3.png',
      category: t('hero.category'),
      date: '26.11.2025',
    },
    {
      id: 4,
      image: '/img/dolzarb-4.png',
      category: t('hero.category'),
      date: '26.11.2025',
    },
    {
      id: 5,
      image: '/img/dolzarb-5.png',
      category: t('hero.category'),
      date: '26.11.2025',
    },
    {
      id: 6,
      image: '/img/dolzarb-6.png',
      category: t('hero.category'),
      date: '26.11.2025',
    },
    {
      id: 7,
      image: '/img/dolzarb-7.png',
      category: t('hero.category'),
      date: '26.11.2025',
    },
    {
      id: 8,
      image: '/img/dolzarb-8.png',
      category: t('hero.category'),
      date: '26.11.2025',
    },
  ];

  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-[1400px] mx-auto px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold font-bluu" style={{ color: '#010E38' }}>
              {t('trending.title')}
            </h2>
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          </div>
          <button className="py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2 mr-10" style={{ color: '#010E38' }}>
            {t('trending.viewAll')}
            <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
          </button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className="group flex flex-col bg-white hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Category Badge */}
                <div className="absolute top-0 right-0">
                  <div className="bg-black/60 px-4 py-2">
                    <span className="text-xs font-bold text-white tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 pt-4">
                {/* Date */}
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-4 h-4 text-gray-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                  </svg>
                  <span className="text-sm text-gray-600">{item.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-base text-black leading-relaxed font-normal line-clamp-3 group-hover:text-gray-700 transition-colors">
                  {t(`trending.news.${item.id}`)}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingNews;
