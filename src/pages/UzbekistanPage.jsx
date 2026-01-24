import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import CategoryMenu from '../components/CategoryMenu';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';
import { postsAPI } from '../services/api';

const UzbekistanPage = () => {
  const { t, i18n } = useTranslation();
  const [uzbekistanPosts, setUzbekistanPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [heroPost, setHeroPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, [i18n.language]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getAllFront(i18n.language);
      const allPosts = response?.posts || [];

      // Get Uzbekistan category posts (o'zbekiston kategoriyasidagi postlar)
      const uzbekPosts = allPosts.filter(p =>
        p.category?.name_uz?.toLowerCase().includes('o\'zbekiston') ||
        p.location?.name_uz?.toLowerCase().includes('o\'zbekiston')
      );

      // Hero post (birinchi post)
      setHeroPost(uzbekPosts[0] || null);

      // Grid posts (qolgan postlar)
      setUzbekistanPosts(uzbekPosts.slice(1, 10));

      // Latest posts (so'ngi yangiliklar)
      const latest = allPosts.filter(p => p.flags?.is_latest).slice(0, 10);
      setLatestPosts(latest);

    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
  };

  const getPostName = (post) => {
    const lang = i18n.language;
    return post[`name_${lang}`] || post.name_uz || post.name || '';
  };

  const getPostBody = (post) => {
    const lang = i18n.language;
    return post[`body_${lang}`] || post.body_uz || post.body || '';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <CategoryMenu />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

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
              {heroPost ? (
                <Link
                  to={`/news/${heroPost.id}`}
                  className="relative overflow-hidden mb-12 block cursor-pointer group"
                >
                  <img
                    src={heroPost.image || '/img/ozbekiston-asosiy.png'}
                    alt={getPostName(heroPost)}
                    className="w-full h-[670px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Category Badge */}
                  {heroPost.category && getCategoryName(heroPost.category) && (
                    <div className="absolute top-0 right-0 z-10">
                      <div className="bg-black/70 px-10 py-3.5">
                        <span className="text-sm font-bold text-white tracking-wider uppercase font-sans">
                          {getCategoryName(heroPost.category)}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-8 py-6">
                    <h2 className="text-white text-2xl font-bold leading-snug font-sans group-hover:opacity-90 transition-opacity">
                      {getPostName(heroPost)}
                    </h2>
                  </div>
                </Link>
              ) : (
                <div className="mb-12 h-[670px] bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Hero post topilmadi</p>
                </div>
              )}

              {/* News Grid - 3x3 */}
              <div className="grid grid-cols-3 gap-6">
                {uzbekistanPosts.length > 0 ? (
                  uzbekistanPosts.map((item) => (
                    <Link
                      key={item.id}
                      to={`/news/${item.id}`}
                      className="group flex flex-col bg-white overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {/* Image Container */}
                      <div className="relative overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={getPostName(item)}
                            className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-[220px] bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">Rasm yo'q</span>
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
                          <span className="text-xs text-gray-600 font-sans">{formatDate(item.created_at)}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base leading-relaxed font-semibold line-clamp-3 text-black group-hover:opacity-70 transition-opacity font-sans">
                          {getPostName(item)}
                        </h3>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">O'zbekiston yangiliklari topilmadi</p>
                  </div>
                )}
              </div>

              {/* Yana yuklash button */}
              {uzbekistanPosts.length > 0 && (
                <div className="mt-8 flex justify-start">
                  <button className="py-3 px-16 bg-gray-200 border border-gray-300 font-medium text-base hover:bg-gray-300 transition-colors flex items-center gap-2 font-sans" style={{ color: '#010E38' }}>
                    {t('uzbekistanPage.loadMore')}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              )}
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
                  {latestPosts.length > 0 ? (
                    latestPosts.map((item, index) => (
                      <Link
                        key={item.id}
                        to={`/news/${item.id}`}
                        className={`block ${index !== latestPosts.length - 1 ? 'pb-4 border-b border-gray-100' : ''} hover:opacity-70 transition-opacity`}
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
                          <span className="text-xs text-gray-600 font-sans">{formatDate(item.created_at)}</span>
                        </div>
                        <p className="text-sm text-black leading-relaxed font-normal line-clamp-3 font-sans">
                          {getPostName(item)}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">So'ngi yangiliklar topilmadi</p>
                  )}
                </div>
              </div>

              {/* Bo'limga o'tish button */}
              <Link
                to="/"
                className="mt-2 w-full py-4 bg-gray-200 text-sm font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 font-sans"
                style={{ color: '#010E38' }}
              >
                {t('uzbekistanPage.viewSection')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dolzarb Yangiliklar Section */}
      {latestPosts.length > 0 && (
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
              {latestPosts.slice(0, 4).map((item) => (
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
      )}

      {/* App Download Section */}
      <AppDownload />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UzbekistanPage;
