import { useTranslation } from 'react-i18next';

const Articles = () => {
  const { t } = useTranslation();

  const articles = [
    { id: 1, date: '26.11.2025' },
    { id: 2, date: '26.11.2025' },
    { id: 3, date: '26.11.2025' },
    { id: 4, date: '26.11.2025' },
    { id: 5, date: '26.11.2025' },
    { id: 6, date: '26.11.2025' },
  ];

  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-[1400px] mx-auto px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold font-sans text-[#000000]">
              {t('articles.title')}
            </h2>
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          </div>
          <button className="py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2 mr-10 font-sans text-[#010E38]">
            {t('articles.viewAll')}
            <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
          </button>
        </div>

        {/* Articles Grid - 3 columns, 2 rows */}
        <div className="grid grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.id}
              href="#"
              className="group bg-[#E8E8E8] p-6 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Date */}
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="#000000"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                </svg>
                <span className="text-sm font-sans text-[#000000]">{article.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold leading-snug mb-4 font-sans text-[#000000] group-hover:text-[#000000] transition-colors">
                {t(`articles.items.${article.id}.title`)}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed font-sans text-[#666666] line-clamp-3">
                {t(`articles.items.${article.id}.description`)}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
