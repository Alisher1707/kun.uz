import Navbar from './components/Navbar';
import CategoryMenu from './components/CategoryMenu';
import HeroSection from './components/HeroSection';
import TrendingNews from './components/TrendingNews';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryMenu />
      <HeroSection />
      <TrendingNews />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content will go here */}
      </main>
    </div>
  );
}

export default App;
