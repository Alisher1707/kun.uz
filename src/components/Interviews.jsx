import { useTranslation } from 'react-i18next';

const Interviews = () => {
  const { t } = useTranslation();

  const interviews = [
    {
      id: 1,
      image: '/img/interview-1.png',
      date: '02.12.2025',
      badge: null,
    },
    {
      id: 2,
      image: '/img/interview-2.png',
      date: '02.12.2025',
      badge: 'JONLI EFIR',
    },
    {
      id: 3,
      image: '/img/interview-3.png',
      date: '02.12.2025',
      badge: null,
    },
    {
      id: 4,
      image: '/img/interview-4.png',
      date: '02.12.2025',
      badge: null,
    },
  ];

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
        <div className="grid grid-cols-2 gap-6">
          {interviews.map((interview) => (
            <a
              key={interview.id}
              href="#"
              className="group flex gap-6 bg-white hover:shadow-lg transition-shadow duration-300 p-0"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden w-[290px] flex-shrink-0">
                <img
                  src={interview.image}
                  alt={t(`interviews.items.${interview.id}.title`)}
                  className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Badge - Only for items with badge */}
                {interview.badge && (
                  <div className="absolute top-3 right-1">
                    <div className="bg-red-600 px-2.5 py-[1px] rounded-xl">
                      <span className="text-[9px] font-bold text-white tracking-wider font-sans">
                        {interview.badge}
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
                  <span className="text-sm font-sans text-[#000000]">{interview.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold leading-snug mb-3 font-sans text-[#000000] group-hover:text-[#000000] transition-colors">
                  {t(`interviews.items.${interview.id}.title`)}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed font-sans text-[#666666] line-clamp-3">
                  {t(`interviews.items.${interview.id}.description`)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interviews;
