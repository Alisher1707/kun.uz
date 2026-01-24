import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UzbekistanPage from './pages/UzbekistanPage';
import CategoryPage from './pages/CategoryPage';
import LocationPage from './pages/LocationPage';
import MediaPage from './pages/MediaPage';
import NewsDetailPage from './pages/NewsDetailPage';
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './components/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import PostsPage from './pages/admin/PostsPage';
import LocationsPage from './pages/admin/LocationsPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/ozbekiston" element={<UzbekistanPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/location/:id" element={<LocationPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="locations" element={<LocationsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
