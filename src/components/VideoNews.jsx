import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

const VideoNews = () => {
  const { t } = useTranslation();
  const mainVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videos, setVideos] = useState([
    { id: 1, date: '26.11.2025', video: '/video/video-1.mp4' },
    { id: 2, date: '26.11.2025', video: '/video/video-2.mp4' },
    { id: 3, date: '26.11.2025', video: '/video/video-3.mp4' },
    { id: 4, date: '26.11.2025', video: '/video/video-4.mp4' },
    { id: 5, date: '26.11.2025', video: '/video/video-5.mp4' },
  ]);

  const handlePlayVideo = (videoRef) => {
    if (videoRef && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVideoSwap = (sidebarIndex) => {
    const newVideos = [...videos];
    // Sidebar'dagi videoning asl indexi (0 asosiy, shuning uchun +1)
    const actualIndex = sidebarIndex + 1;
    // Asosiy video bilan almashish
    [newVideos[0], newVideos[actualIndex]] = [newVideos[actualIndex], newVideos[0]];
    setVideos(newVideos);
  };

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
          <div className="relative group cursor-pointer overflow-hidden" onClick={() => handlePlayVideo(mainVideoRef)}>
            <div className="relative aspect-video bg-gray-800">
              <video
                ref={mainVideoRef}
                src={videos[0].video}
                className="w-full h-full object-cover"
                preload="metadata"
              />
              {/* Play Button Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                  <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-7 h-7 text-white fill-white" />
                  </div>
                </div>
              )}
            </div>
            {/* Main Video Title */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-6 pointer-events-none">
              <h3 className="text-xl font-bold font-sans text-white leading-snug">
                {t(`videoNews.videos.${videos[0].id}.title`)}
              </h3>
            </div>
          </div>

          {/* Side Videos - Right Side */}
          <div className="flex flex-col gap-1">
            {/* Videos Container */}
            <div className="bg-[#1a1f2e] p-4">
              {videos.slice(1).map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoSwap(index)}
                  className="group flex items-start gap-4 hover:bg-[#2A2A2A] p-3 transition-colors rounded cursor-pointer"
                >
                  {/* Video Thumbnail */}
                  <div className="relative w-32 h-20 flex-shrink-0 bg-gray-800 overflow-hidden rounded">
                    <video
                      src={video.video}
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
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
                      <span className="text-xs font-sans text-[#999999]">{video.date}</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-medium font-sans text-white leading-snug line-clamp-2 group-hover:text-gray-200">
                      {t(`videoNews.videos.${video.id}.title`)}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button - Separate from sidebar */}
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
