import Navbar from './components/Navbar';
import CategoryMenu from './components/CategoryMenu';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryMenu />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content will go here */}
      </main>
    </div>
  );
}

export default App;
