import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { usePostsByFlag } from '../hooks/usePosts';

const HeroSection = ({ posts = [] }) => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { posts: latestPosts } = usePostsByFlag('is_latest');

  const carouselPosts = posts;

  // Auto slide har 5 sekundda
  useEffect(() => {
    if (!carouselPosts || carouselPosts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselPosts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselPosts]);

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

  const currentCarouselPost = carouselPosts?.[currentSlide];

  // Debug: Kategoriya ma'lumotlarini tekshirish
  useEffect(() => {
    if (currentCarouselPost) {
      console.log('Current Carousel Post:', currentCarouselPost);
      console.log('Category Object:', JSON.stringify(currentCarouselPost.category, null, 2));
      console.log('Category Keys:', Object.keys(currentCarouselPost.category || {}));
      console.log('Category Name:', getCategoryName(currentCarouselPost.category));
    }
  }, [currentCarouselPost]);

  return (
    <div className="w-full bg-[#F7F7F7] py-10">
      <div className="max-w-[1400px] mx-auto px-16">
        <div className="flex gap-6">
          {/* Carousel - Hero Image */}
          <div className="flex-1 relative max-w-[850px] flex flex-col">
            {currentCarouselPost ? (
              <>
                <Link to={`/news/${currentCarouselPost.id}`} className="relative overflow-hidden flex-1">
                  <img
                    src={currentCarouselPost.image || '/img/hero img.png'}
                    alt={getPostName(currentCarouselPost)}
                    className="w-full h-full object-cover"
                  />
                  {/* Category Badge */}
                  {currentCarouselPost.category && getCategoryName(currentCarouselPost.category) && (
                    <div className="absolute top-0 right-0 z-10">
                      <div className="bg-black/70 px-10 py-3.5">
                        <span className="text-sm font-bold text-white tracking-wider uppercase">
                          {getCategoryName(currentCarouselPost.category)}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-10 py-6">
                    <h2 className="text-white text-2xl font-bold leading-snug">
                      {getPostName(currentCarouselPost)}
                    </h2>
                  </div>
                </Link>
                {/* Dots Navigation */}
                {carouselPosts && carouselPosts.length > 1 && (
                  <div className="flex justify-center gap-2.5 mt-5">
                    {carouselPosts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-10 h-1 rounded-full transition-colors ${
                          index === currentSlide ? 'bg-[#2D3E50]' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">Carousel postlar topilmadi</p>
              </div>
            )}
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

                {/* Latest News List */}
                <div className="space-y-2">
                  {latestPosts && latestPosts.length > 0 ? (
                    latestPosts.slice(0, 4).map((post, index) => (
                      <Link
                        key={post.id}
                        to={`/news/${post.id}`}
                        className={`block ${index !== latestPosts.slice(0, 4).length - 1 ? 'pb-2' : ''} hover:opacity-70 transition-opacity`}
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
                          <span className="text-sm text-gray-600">{formatDate(post.created_at)}</span>
                        </div>
                        <p className="text-base text-black leading-relaxed font-normal line-clamp-3">
                          {getPostBody(post)}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">So'ngi yangiliklar topilmadi</p>
                  )}
                </div>
              </div>

              {/* View More Button */}
              <Link
                to="/"
                className="mt-6 py-3 px-20 bg-[#E8E8E8] text-center font-medium text-base hover:bg-[#D8D8D8] transition-colors flex items-center justify-center gap-2"
                style={{ color: '#010E38' }}
              >
                {t('hero.viewMore')}
                <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
