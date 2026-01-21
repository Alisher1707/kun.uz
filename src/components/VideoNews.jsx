import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Play } from 'lucide-react';

const VideoNews = ({ posts = [] }) => {
  const { t, i18n } = useTranslation();
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const handleVideoSelect = (index) => {
    setSelectedVideoIndex(index);
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
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

  if (!posts || posts.length === 0) {
    return null;
  }

  const selectedVideo = posts[selectedVideoIndex];
  const sideVideos = posts.filter((_, index) => index !== selectedVideoIndex).slice(0, 4);

  return (
    <div className="w-full bg-[#1A1A1A] py-16">
      <div className="max-w-[1400px] mx-auto px-16">
        {/* Header */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold font-sans text-white">
              {t('videoNews.title')}
            </h2>
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          {/* Main Video - Left Side */}
          <div className="relative group overflow-hidden">
            <div className="relative aspect-video bg-gray-800">
              <iframe
                src={getYoutubeEmbedUrl(selectedVideo?.youtube_url)}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={getPostName(selectedVideo)}
              />
            </div>
            {/* Main Video Title */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-6 pointer-events-none">
              <h3 className="text-xl font-bold font-sans text-white leading-snug">
                {getPostName(selectedVideo)}
              </h3>
            </div>
          </div>

          {/* Side Videos - Right Side */}
          <div className="flex flex-col gap-1">
            {/* Videos Container */}
            <div className="bg-[#1a1f2e] p-4">
              {sideVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(posts.findIndex(p => p.id === video.id))}
                  className="group flex items-start gap-4 hover:bg-[#2A2A2A] p-3 transition-colors rounded cursor-pointer"
                >
                  {/* Video Thumbnail */}
                  <div className="relative w-32 h-20 flex-shrink-0 bg-gray-800 overflow-hidden rounded">
                    {video.image ? (
                      <img
                        src={video.image}
                        alt={getPostName(video)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    )}
                    {/* Small Play Button */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="w-7 h-7 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-3.5 h-3.5 text-white fill-white" />
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0"
                        fill="none"
                        stroke="#999999"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                      </svg>
                      <span className="text-xs font-sans text-[#999999]">{formatDate(video.created_at)}</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-medium font-sans text-white leading-snug line-clamp-2 group-hover:text-gray-200">
                      {getPostName(video)}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <button className="py-4 px-6 bg-[#1a1f2e] text-center font-medium text-sm hover:bg-[#252b3d] transition-colors flex items-center justify-center gap-2 text-white font-sans">
              {t('videoNews.viewMore')}
              <img src="/svg/Bolim svg.svg" alt="arrow" className="w-5 h-5 brightness-0 invert" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoNews;
