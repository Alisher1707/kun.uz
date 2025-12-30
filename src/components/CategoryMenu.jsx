import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CategoryMenu = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('barchasi');

  const categories = [
    { id: 'barchasi', label: t('menu.barchasi') },
    { id: 'ozbekiston', label: t('menu.ozbekiston') },
    { id: 'jahon', label: t('menu.jahon') },
    { id: 'iqtisodiyot', label: t('menu.iqtisodiyot') },
    { id: 'jamiyat', label: t('menu.jamiyat') },
    { id: 'fan-texnika', label: t('menu.fanTexnika') },
    { id: 'sport', label: t('menu.sport') },
    { id: 'light', label: t('menu.light') },
    { id: 'business-class', label: t('menu.businessClass') },
    { id: 'audio', label: t('menu.audio') },
  ];

  return (
    <div className="w-full bg-[#F7F7F7] border-b border-gray-100">
      <div className="w-full px-16">
        <div className="flex items-center gap-12 py-7 overflow-x-auto ml-28">
          {categories.map((category) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
