import { usePosts } from '../hooks/usePosts';
import Navbar from '../components/Navbar';
import CategoryMenu from '../components/CategoryMenu';
import HeroSection from '../components/HeroSection';
import TrendingNews from '../components/TrendingNews';
import PhotoGallery from '../components/PhotoGallery';
import Survey from '../components/Survey';
import Articles from '../components/Articles';
import VideoNews from '../components/VideoNews';
import Interviews from '../components/Interviews';
import Business from '../components/Business';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';

const HomePage = () => {
  const { posts, loading, error } = usePosts();

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
      <HeroSection posts={posts.carousel} />
      <TrendingNews posts={posts.latest} />
      <PhotoGallery posts={posts.gallery} />
      <Survey />
      <Articles posts={posts.articles} />
      <VideoNews posts={posts.youtube} />
      <Interviews posts={posts.interviews} />
      <Business posts={posts.business} />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default HomePage;
