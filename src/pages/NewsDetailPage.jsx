import Navbar from '../components/Navbar';
import CategoryMenu from '../components/CategoryMenu';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const NewsDetailPage = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  // So'ngi yangiliklar
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
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryMenu />

      {/* Main Content */}
      <div className="w-full bg-[#F7F7F7] py-6">
        <div className="max-w-[1400px] mx-auto px-16">
          <div className="flex gap-6">
            {/* Left Side - Main Content */}
            <div className="flex-1">
              {/* Hero Image */}
              <div className="relative overflow-hidden bg-white">
                <img
                  src="/img/batafsil-asosiy.png"
                  alt="News Detail"
                  className="w-full h-auto object-cover"
                />
                {/* Category Badge */}
                <div className="absolute top-0 right-0">
                  <div className="bg-gray-700/80 px-6 py-3">
                    <span className="text-base font-bold text-white tracking-wider font-sans">
                      {t('hero.category')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Date and Title - with background */}
              <div className="bg-[#F0F0F0] p-6">
                {/* Date */}
                <div className="flex items-center gap-2 mb-1">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="#666666"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                  </svg>
                  <span className="text-sm text-gray-600 font-sans">26.11.2025</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-black leading-snug font-sans">
                  {t('newsDetail.title')}
                </h1>
              </div>

              {/* Article Content */}
              <div className="p-6 mt-6">
                {/* First Paragraph */}
                <p className="text-lg text-black leading-relaxed font-sans mb-6">
                  {t('newsDetail.paragraph1')}
                </p>

                {/* Quote Block 1 */}
                <div className="p-6 mb-6 ml-12">
                  <p className="text-lg text-gray-700 leading-relaxed font-sans mb-8 italic">
                    {t('newsDetail.quote1_1')}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed font-sans italic">
                    {t('newsDetail.quote1_2')}
                  </p>
                </div>

                {/* Second Paragraph */}
                <p className="text-lg text-black leading-relaxed font-sans mb-6">
                  {t('newsDetail.paragraph2')}
                </p>

                {/* Quote Block 2 */}
                <div className="p-6 mb-6 ml-12">
                  <p className="text-lg text-gray-700 leading-relaxed font-sans mb-8 italic">
                    {t('newsDetail.quote1_1')}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed font-sans italic">
                    {t('newsDetail.quote1_2')}
                  </p>
                </div>

                {/* Video Section */}
                <div className="mt-8 mb-6">
                  <div className="relative w-full bg-black cursor-pointer group" style={{ aspectRatio: '16/9' }} onClick={handlePlayPause}>
                    <video
                      className="w-full h-full object-contain"
                      poster="/img/batafsil-asosiy.png"
                    >
                      <source src="/video/batafsil-video.mp4" type="video/mp4" />
                      Brauzeringiz video playbackni qo'llab-quvvatlamaydi.
                    </video>
                    {/* Play Icon */}
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gray-500/80 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
                <div className="space-y-3">
                  {latestNews.map((item, index) => (
                    <a
                      key={item.id}
                      href="#"
                      className={`block ${index !== latestNews.length - 1 ? 'pb-3 border-b border-gray-100' : ''} hover:opacity-70 transition-opacity`}
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

              {/* Bo'limga o'tish button */}
              <button className="mt-2 w-full py-4 bg-gray-200 text-sm font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 font-sans" style={{ color: '#010E38' }}>
                {t('uzbekistanPage.viewSection')}
                <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* O'xshash xabarlar Section */}
      <div className="w-full bg-white py-10">
        <div className="max-w-[1400px] mx-auto px-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold font-sans text-[#000000]">
                {t('newsDetail.similarNews')}
              </h2>
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            </div>
            <button className="py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2 mr-10 font-sans text-[#010E38]">
              {t('newsDetail.viewSection')}
              <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
            </button>
          </div>

          {/* News Grid - 4 columns */}
          <div className="grid grid-cols-4 gap-6">
            {[7, 2, 3, 4].map((item) => (
              <a
                key={item}
                href="#"
                className="group flex flex-col bg-white hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={item === 7 ? '/img/ozbekiston-7.png' : `/img/dolzarb-${item}.png`}
                    alt="O'xshash xabar"
                    className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-0 right-0">
                    <div className="bg-black/60 px-4 py-2">
                      <span className="text-xs font-bold text-white tracking-wider font-sans">
                        {t('hero.category')}
                      </span>
                    </div>
                  </div>
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
                    <span className="text-sm font-sans text-[#000000]">26.11.2025</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base leading-relaxed font-normal line-clamp-3 transition-colors font-sans text-[#000000] hover:text-[#000000]">
                    {item === 7 ? t('uzbekistanPage.newsCards.7') : t(`trending.news.${item}`)}
                  </h3>
                </div>
              </a>
            ))}
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

export default NewsDetailPage;
