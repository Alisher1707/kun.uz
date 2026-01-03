import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const CategoryMenu = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('barchasi');

  const categories = [
    { id: 'barchasi', label: t('menu.barchasi'), path: '/' },
    { id: 'ozbekiston', label: t('menu.ozbekiston'), path: '/ozbekiston' },
    { id: 'jahon', label: t('menu.jahon'), path: '#' },
    { id: 'iqtisodiyot', label: t('menu.iqtisodiyot'), path: '#' },
    { id: 'jamiyat', label: t('menu.jamiyat'), path: '#' },
    { id: 'fan-texnika', label: t('menu.fanTexnika'), path: '#' },
    { id: 'sport', label: t('menu.sport'), path: '#' },
    { id: 'light', label: t('menu.light'), path: '#' },
    { id: 'business-class', label: t('menu.businessClass'), path: '#' },
    { id: 'audio', label: t('menu.audio'), path: '#' },
  ];

  return (
    <div className="w-full bg-[#F7F7F7] border-b border-gray-100">
      <div className="w-full px-16">
        <div className="flex items-center gap-12 py-7 overflow-x-auto ml-28">
          {categories.map((category) => {
            const isActive = location.pathname === category.path || (category.id === 'barchasi' && location.pathname === '/');

            return category.path === '#' ? (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`font-sans text-base whitespace-nowrap transition-all pb-2 relative ${
                  activeCategory === category.id
                    ? 'font-medium'
                    : 'hover:text-[#666666]'
                }`}
                style={{ color: activeCategory === category.id ? '#000000' : '#666666' }}
              >
                {category.label}
                {activeCategory === category.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#000000' }}></div>
                )}
              </button>
            ) : (
              <Link
                key={category.id}
                to={category.path}
                className={`font-sans text-base whitespace-nowrap transition-all pb-2 relative ${
                  isActive
                    ? 'font-medium'
                    : 'hover:text-[#666666]'
                }`}
                style={{ color: isActive ? '#000000' : '#666666' }}
              >
                {category.label}
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
