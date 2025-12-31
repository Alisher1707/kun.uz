import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  const newsItems = [
    {
      id: 1,
      date: '26.11.2025',
      title: "Ukraina va AQSh tinchlik rejasining kamida 3 ta punktida ixtilof qilmoqda – CNN...",
    },
    {
      id: 2,
      date: '26.11.2025',
      title: "Ukraina va AQSh tinchlik rejasining kamida 3 ta punktida ixtilof qilmoqda – CNN...",
    },
    {
      id: 3,
      date: '26.11.2025',
      title: "Ukraina va AQSh tinchlik rejasining kamida 3 ta punktida ixtilof qilmoqda – CNN...",
    },
    {
      id: 4,
      date: '26.11.2025',
      title: "Ukraina va AQSh tinchlik rejasining kamida 3 ta punktida ixtilof qilmoqda – CNN...",
    },
  ];

  return (
    <div className="w-full bg-[#F7F7F7] py-10">
      <div className="max-w-[1400px] mx-auto px-16">
        <div className="flex gap-6">
          {/* Hero Image */}
          <div className="flex-1 relative max-w-[850px] flex flex-col">
            <div className="relative overflow-hidden flex-1">
              <img
                src="/img/hero img.png"
                alt="Hero"
                className="w-full h-full object-cover"
              />
              {/* Category Badge */}
              <div className="absolute top-0 right-0">
                <div className="bg-white/60 px-10 py-3.5">
                  <span className="text-sm font-bold text-black tracking-wider">
                    {t('hero.category')}
                  </span>
                </div>
              </div>
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-10 py-6">
                <h2 className="text-white text-2xl font-bold leading-snug">
                  {t('hero.title')}
                </h2>
              </div>
            </div>
            {/* Dots Navigation */}
            <div className="flex justify-center gap-2.5 mt-5">
              <div className="w-10 h-1 bg-[#2D3E50] rounded-full"></div>
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Latest News Sidebar */}
          <div className="w-[380px] flex-shrink-0 flex flex-col">
            <div className="bg-[#F5F5F5] px-8 pt-0 pb-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center gap-2 justify-start mb-8 pt-0">
                  <h3 className="text-2xl font-bold font-bluu" style={{ color: '#010E38' }}>
                    {t('hero.latestNews')}
                  </h3>
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                </div>

                {/* News List */}
                <div className="space-y-2">
                  {newsItems.map((item, index) => (
                    <a
                      key={item.id}
                      href="#"
                      className={`block ${index !== newsItems.length - 1 ? 'pb-2' : ''} hover:opacity-70 transition-opacity`}
                    >
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
                      <p className="text-base text-black leading-relaxed font-normal">
                        {item.title}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              {/* View More Button */}
              <button className="mt-6 py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2" style={{ color: '#010E38' }}>
                {t('hero.viewMore')}
                <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
