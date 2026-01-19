import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { categoriesAPI } from '../services/api';

const CategoryMenu = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('barchasi');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoriesAPI.getAll();

        // API dan kelgan data: [{ id, name_uz, name_ru, name_en }]
        // Barchasi kategoriyasini qo'shamiz
        const allCategories = [
          { id: 0, name_uz: 'Barchasi', name_ru: 'Все', name_en: 'All', path: '/' },
          ...data.map(cat => ({ ...cat, path: `/category/${cat.id}` }))
        ];

        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to default categories if API fails
        setCategories([
          { id: 0, name_uz: 'Barchasi', name_ru: 'Все', name_en: 'All', path: '/' },
          { id: 1, name_uz: "O'zbekiston", name_ru: 'Узбекистан', name_en: 'Uzbekistan', path: '/ozbekiston' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryName = (category) => {
    const lang = i18n.language;
    return category[`name_${lang}`] || category.name_uz;
  };

  if (loading) {
    return (
      <div className="w-full bg-[#F7F7F7] border-b border-gray-100">
        <div className="w-full px-16">
          <div className="flex items-center gap-12 py-7 overflow-x-auto ml-28">
            <div className="animate-pulse flex gap-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 w-20 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F7F7] border-b border-gray-100">
      <div className="w-full px-16">
        <div className="flex items-center gap-12 py-7 overflow-x-auto ml-28">
          {categories.map((category) => {
            const isActive = location.pathname === category.path || (category.id === 0 && location.pathname === '/');

            return (
              <Link
                key={category.id}
                to={category.path}
                onClick={() => setActiveCategory(category.id)}
                className={`font-sans text-base whitespace-nowrap transition-all pb-2 relative ${
                  isActive
                    ? 'font-medium'
                    : 'hover:text-[#666666]'
                }`}
                style={{ color: isActive ? '#000000' : '#666666' }}
              >
                {getCategoryName(category)}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#000000' }}></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
