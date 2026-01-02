import Navbar from './components/Navbar';
import CategoryMenu from './components/CategoryMenu';
import HeroSection from './components/HeroSection';
import TrendingNews from './components/TrendingNews';
import PhotoGallery from './components/PhotoGallery';
import Survey from './components/Survey';
import Articles from './components/Articles';
import VideoNews from './components/VideoNews';
import Interviews from './components/Interviews';
import Business from './components/Business';
import AppDownload from './components/AppDownload';
import Footer from './components/Footer';

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
      <Interviews />
      <Business />
      <AppDownload />
      <Footer />
    </div>
  );
}

export default App;
