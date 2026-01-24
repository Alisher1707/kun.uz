import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { postsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import CategoryMenu from '../components/CategoryMenu';
import Footer from '../components/Footer';

const MediaPage = () => {
  const { t, i18n } = useTranslation();
  const [videoPosts, setVideoPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await postsAPI.getAllFront(i18n.language);
        const allPosts = response?.posts || [];

        // YouTube URL mavjud bo'lgan postlarni filter qilish
        const videos = allPosts.filter(post => post.youtube_url);
        setVideoPosts(videos);
      } catch (err) {
        console.error('Video postlarni yuklashda xatolik:', err);
        setError(err.message || 'Xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [i18n.language]);

  const getPostName = (post) => {
    const lang = i18n.language;
    return post[`name_${lang}`] || post.name_uz || post.name || '';
  };

  const getCategoryName = (category) => {
    if (!category) return '';
    const lang = i18n.language;

    return category[`name_${lang}`] ||
           category.name_uz ||
           category.name ||
           category.title ||
           category[`title_${lang}`] ||
           category.title_uz ||
           category.category_name ||
           '';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
  };

  // YouTube video ID ni olish
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // YouTube thumbnail olish
  const getYoutubeThumbnail = (url) => {
    const videoId = getYoutubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <CategoryMenu />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Xatolik yuz berdi</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryMenu />

      {/* Page Header */}
      <div className="w-full bg-white py-8 border-b">
        <div className="max-w-[1400px] mx-auto px-16">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold text-gray-900 font-sans">
              Media
            </h1>
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-2">
            {videoPosts.length} ta video topildi
          </p>
        </div>
      </div>

      {/* Videos Section */}
      <div className="w-full bg-white py-10">
        <div className="max-w-[1400px] mx-auto px-16">
          {videoPosts.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
              {videoPosts.map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="group flex flex-col bg-white hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Video Thumbnail Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={getYoutubeThumbnail(item.youtube_url)}
                      alt={getPostName(item)}
                      className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=YouTube+Video';
                      }}
                    />
                    {/* YouTube Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>

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
          ) : (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Hozircha videolar yo'q
                </h2>
                <p className="text-gray-600">
                  YouTube videolar mavjud emas
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MediaPage;
