import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import CategoryMenu from '../components/CategoryMenu';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';
import { postsAPI } from '../services/api';

const NewsDetailPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [similarNews, setSimilarNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    loadPostData();
  }, [id, i18n.language]);

  const loadPostData = async () => {
    try {
      setLoading(true);

      // Get current post
      const postData = await postsAPI.getById(id, i18n.language);
      setPost(postData);

      // Get all posts for latest and similar
      const allPostsResponse = await postsAPI.getAllFront(i18n.language);
      const allPosts = allPostsResponse?.posts || [];

      // Filter latest news (excluding current post)
      const latest = allPosts
        .filter(p => p.id !== parseInt(id) && p.flags?.is_latest)
        .slice(0, 4);
      setLatestNews(latest);

      // Filter similar news from same category (excluding current post)
      const similar = allPosts
        .filter(p => {
          // O'xshash habarlar: bir xil kategoriya va joriy postni o'chirib tashlash
          return p.id !== parseInt(id) &&
                 p.category?.id === postData.category?.id &&
                 postData.category?.id; // Category mavjud bo'lsa
        })
        .slice(0, 4);
      setSimilarNews(similar);

    } catch (error) {
      console.error('Error loading post:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
  };

  const getPostName = (post) => {
    const lang = i18n.language;
    return post[`name_${lang}`] || post.name_uz || post.name;
  };

  const getPostBody = (post) => {
    const lang = i18n.language;
    return post[`body_${lang}`] || post.body_uz || post.body || '';
  };

  const getCategoryName = (post) => {
    if (!post.category) return '';
    const lang = i18n.language;
    return post.category[`name_${lang}`] || post.category.name_uz || '';
  };

  // YouTube video ID ni olish
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
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

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <CategoryMenu />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Post topilmadi</h2>
            <Link to="/" className="text-red-600 hover:underline">Bosh sahifaga qaytish</Link>
          </div>
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
            {/* Left Side - Main Content */}
            <div className="flex-1">
              {/* Hero Image or YouTube Video */}
              <div className="relative overflow-hidden bg-white">
                {post.youtube_url ? (
                  <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                    <iframe
                      src={getYoutubeEmbedUrl(post.youtube_url)}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      title="YouTube video"
                    ></iframe>
                  </div>
                ) : post.image ? (
                  <img
                    src={post.image}
                    alt={getPostName(post)}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Rasm yo'q</span>
                  </div>
                )}

                {/* Category Badge */}
                {getCategoryName(post) && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gray-700/80 px-6 py-3">
                      <span className="text-base font-bold text-white tracking-wider font-sans">
                        {getCategoryName(post)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Date and Title */}
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
                  <span className="text-sm text-gray-600 font-sans">
                    {formatDate(post.created_at)}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-black leading-snug font-sans">
                  {getPostName(post)}
                </h1>
              </div>

              {/* Article Content */}
              <div className="p-6 mt-6">
                {/* Body Text */}
                <div
                  className="text-lg text-black leading-relaxed font-sans prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: getPostBody(post).replace(/\n/g, '<br />') }}
                />
              </div>
            </div>

            {/* Right Sidebar - So'ngi yangiliklar */}
            <div className="w-[320px] flex-shrink-0">
              <div className="bg-[#F5F5F5] p-6">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold font-sans" style={{ color: '#010E38' }}>
                    So'ngi yangiliklar
                  </h3>
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                </div>

                {/* News List */}
                <div className="space-y-3">
                  {latestNews.length > 0 ? (
                    latestNews.map((item, index) => (
                      <Link
                        key={item.id}
                        to={`/news/${item.id}`}
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
                          <span className="text-xs text-gray-600 font-sans">
                            {formatDate(item.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-black leading-relaxed font-normal line-clamp-3 font-sans">
                          {getPostName(item)}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Yangiliklar yo'q</p>
                  )}
                </div>
              </div>

              {/* Bo'limga o'tish button */}
              <Link
                to="/"
                className="mt-2 w-full py-4 bg-gray-200 text-sm font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 font-sans"
                style={{ color: '#010E38' }}
              >
                Bosh sahifaga qaytish
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* O'xshash xabarlar Section */}
      {similarNews.length > 0 && (
        <div className="w-full bg-white py-10">
          <div className="max-w-[1400px] mx-auto px-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold font-sans text-[#000000]">
                  O'xshash xabarlar
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

            {/* News Grid */}
            <div className="grid grid-cols-4 gap-6">
              {similarNews.map((item) => (
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
                    {getCategoryName(item) && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-black/60 px-4 py-2">
                          <span className="text-xs font-bold text-white tracking-wider font-sans">
                            {getCategoryName(item)}
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
                    <h3 className="text-base leading-relaxed font-normal line-clamp-3 transition-colors font-sans text-[#000000] hover:text-[#000000]">
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

export default NewsDetailPage;
