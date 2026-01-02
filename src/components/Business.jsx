import { useTranslation } from 'react-i18next';

const Business = () => {
  const { t } = useTranslation();

  const businessNews = [
    {
      id: 1,
      image: '/img/biznes-1.png',
    },
    {
      id: 2,
      image: '/img/biznes-2.png',
    },
    {
      id: 3,
      image: '/img/biznes-3.png',
    },
    {
      id: 4,
      image: '/img/biznes-4.png',
    },
  ];

  return (
    <div className="w-full bg-white py-10">
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
        <div className="grid grid-cols-4 gap-6">
          {businessNews.map((item) => (
            <a
              key={item.id}
              href="#"
              className="group flex flex-col bg-[#D8D8D8] hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden mb-4 h-[180px]">
                <img
                  src={item.image}
                  alt={t(`business.items.${item.id}.title`)}
                  className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 px-4 pb-4">
                {/* Title */}
                <h3 className="text-base leading-relaxed font-normal line-clamp-3 transition-colors font-sans text-[#000000] hover:text-[#000000]">
                  {t(`business.items.${item.id}.title`)}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Business;
