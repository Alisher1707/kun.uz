import Navbar from '../components/Navbar';
import CategoryMenu from '../components/CategoryMenu';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const UzbekistanPage = () => {
  const { t } = useTranslation();
  // O'zbekiston yangiliklari
  const newsData = [
    {
      id: 1,
      image: '/img/ozbekiston-1.png',
      date: '26.11.2025',
    },
    {
      id: 2,
      image: '/img/ozbekiston-2.png',
      date: '26.11.2025',
    },
    {
      id: 3,
      image: '/img/ozbekiston-3.png',
      date: '26.11.2025',
    },
    {
      id: 4,
      image: '/img/ozbekiston-4.png',
      date: '26.11.2025',
    },
    {
      id: 5,
      image: '/img/ozbekiston-5.png',
      date: '26.11.2025',
    },
    {
      id: 6,
      image: '/img/ozbekiston-6.png',
      date: '26.11.2025',
    },
    {
      id: 7,
      image: '/img/ozbekiston-7.png',
      date: '26.11.2025',
    },
    {
      id: 8,
      image: '/img/ozbekiston-8.png',
      date: '26.11.2025',
    },
    {
      id: 9,
      image: '/img/ozbekiston-9.png',
      date: '26.11.2025',
    },
  ];

  // So'ngi yangiliklar (o'ng sidebar uchun)
  const latestNews = [
    {
      id: 1,
      date: '26.11.2025',
    },
    {
      id: 2,
      date: '26.11.2025',
    },
    {
      id: 3,
      date: '26.11.2025',
    },
    {
      id: 4,
      date: '26.11.2025',
    },
    {
      id: 5,
      date: '26.11.2025',
    },
    {
      id: 6,
      date: '26.11.2025',
    },
    {
      id: 7,
      date: '26.11.2025',
    },
    {
      id: 8,
      date: '26.11.2025',
    },
    {
      id: 9,
      date: '26.11.2025',
    },
    {
      id: 10,
      date: '26.11.2025',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryMenu />

      {/* Main Content */}
      <div className="w-full bg-[#F7F7F7] py-6">
        <div className="max-w-[1400px] mx-auto px-16">
          <div className="flex gap-6">
            {/* Left Side - Hero + News Grid */}
            <div className="flex-1">
              {/* Hero Section */}
              <Link to="/news/hero" className="relative overflow-hidden mb-12 block cursor-pointer group">
                <img
                  src="/img/ozbekiston-asosiy.png"
                  alt="Hero"
                  className="w-full h-[670px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Category Badge */}
                <div className="absolute top-0 right-0">
                  <div className="bg-gray-700/80 px-6 py-3">
                    <span className="text-base font-bold text-white tracking-wider font-sans">
                      {t('hero.category')}
                    </span>
                  </div>
                </div>
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-8 py-6">
                  <h2 className="text-white text-2xl font-bold leading-snug font-sans group-hover:opacity-90 transition-opacity">
                    {t('uzbekistanPage.heroTitle')}
                  </h2>
                </div>
              </Link>

              {/* News Grid - 3x3 */}
              <div className="grid grid-cols-3 gap-6">
                {newsData.map((item) => (
                  <a
                    key={item.id}
                    href="#"
                    className="group flex flex-col bg-white overflow-hidden"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-0 right-0">
                        <div className="bg-black/60 px-3 py-1.5">
                          <span className="text-xs font-bold text-white tracking-wider font-sans">
                            {t('hero.category')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-4">
                      {/* Date */}
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="none"
                          stroke="#666666"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                        </svg>
                        <span className="text-xs text-gray-600 font-sans">{item.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base leading-relaxed font-semibold line-clamp-3 text-black group-hover:opacity-70 transition-opacity font-sans">
                        {t(`uzbekistanPage.newsCards.${item.id}`)}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>

              {/* Yana yuklash button */}
              <div className="mt-8 flex justify-start">
                <button className="py-3 px-16 bg-gray-200 border border-gray-300 font-medium text-base hover:bg-gray-300 transition-colors flex items-center gap-2 font-sans" style={{ color: '#010E38' }}>
                  {t('uzbekistanPage.loadMore')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Sidebar - So'ngi yangiliklar */}
            <div className="w-[320px] flex-shrink-0">
              <div className="bg-[#F5F5F5] p-6">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold font-sans" style={{ color: '#010E38' }}>
                    {t('uzbekistanPage.latestNews')}
                  </h3>
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                </div>

                {/* News List */}
                <div className="space-y-4">
                  {latestNews.map((item, index) => (
                    <a
                      key={item.id}
                      href="#"
                      className={`block ${index !== latestNews.length - 1 ? 'pb-4 border-b border-gray-100' : ''} hover:opacity-70 transition-opacity`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                        </svg>
                        <span className="text-xs text-gray-600 font-sans">{item.date}</span>
                      </div>
                      <p className="text-sm text-black leading-relaxed font-normal line-clamp-3 font-sans">
                        {t(`uzbekistanPage.sidebarNews.${item.id}`)}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Bo'limga o'tish button - outside sidebar box */}
              <button className="mt-2 w-full py-4 bg-gray-200 text-sm font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 font-sans" style={{ color: '#010E38' }}>
                {t('uzbekistanPage.viewSection')}
                <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* App Download Section */}
      <AppDownload />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UzbekistanPage;
