import Navbar from './components/Navbar';
import CategoryMenu from './components/CategoryMenu';
import HeroSection from './components/HeroSection';
import TrendingNews from './components/TrendingNews';
import PhotoGallery from './components/PhotoGallery';
import Survey from './components/Survey';
import Articles from './components/Articles';
import VideoNews from './components/VideoNews';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryMenu />
      <HeroSection />
      <TrendingNews />
      <PhotoGallery />
      <Survey />
      <Articles />
      <VideoNews />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content will go here */}
      </main>
    </div>
  );
}

export default App;
