import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { categoriesAPI, locationsAPI } from '../services/api';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [usdRate, setUsdRate] = useState(null);
  const [rubRate, setRubRate] = useState(null);

  const languages = [
    { code: 'uz', name: "O'zbek tili" },
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsLangDropdownOpen(false);
  };

  // API'dan kategoriyalar va hududlarni yuklash
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, locationsData] = await Promise.all([
          categoriesAPI.getFront(i18n.language),
          locationsAPI.getFront(i18n.language)
        ]);
        setCategories(categoriesData || []);
        setLocations(locationsData || []);
      } catch (error) {
        console.error('Ma\'lumotlarni yuklashda xatolik:', error);
      }
    };

    fetchData();
  }, [i18n.language]);

  // Valyuta kurslarini yuklash
  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const [usdResponse, rubResponse] = await Promise.all([
          fetch('https://open.er-api.com/v6/latest/USD'),
          fetch('https://open.er-api.com/v6/latest/RUB')
        ]);

        const usdData = await usdResponse.json();
        const rubData = await rubResponse.json();

        // USD dan UZS ga
        if (usdData?.rates?.UZS) {
          setUsdRate(usdData.rates.UZS);
        }

        // RUB dan UZS ga
        if (rubData?.rates?.UZS) {
          setRubRate(rubData.rates.UZS);
        }
      } catch (error) {
        console.error('Valyuta kurslarini yuklashda xatolik:', error);
      }
    };

    fetchCurrencyRates();
    // Har 60 sekundda yangilanadi
    const interval = setInterval(fetchCurrencyRates, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="w-full px-16">
        <div className="flex flex-row items-center justify-between h-20 gap-8">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="flex items-center gap-1">
              <span className="text-2xl font-bold text-black">KUN.UZ</span>
              <span className="text-red-600 text-2xl">•</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-12 flex-shrink-0 ml-12">
            {/* Kategoriyalar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-1 text-[#000000] hover:text-[#000000] text-xl whitespace-nowrap"
              >
                <span>{t('nav.categories')}</span>
                <img src="/svg/kategoriy.svg.svg" alt="dropdown" className="w-3.5 h-3.5 mt-1" style={{filter: 'brightness(0)'}} />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 min-w-[200px]">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <a
                        key={category.id}
                        href={`/category/${category.id}`}
                        className="block px-4 py-2 text-base hover:bg-gray-100"
                        onClick={() => setIsCategoryDropdownOpen(false)}
                      >
                        {category.name}
                      </a>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">Yuklanmoqda...</div>
                  )}
                </div>
              )}
            </div>

            {/* Hudud Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-1 text-[#000000] hover:text-[#000000] text-xl whitespace-nowrap"
              >
                <span>{t('nav.region')}</span>
                <img src="/svg/kategoriy.svg.svg" alt="dropdown" className="w-3.5 h-3.5 mt-1" style={{filter: 'brightness(0)'}} />
              </button>

              {isLocationDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 min-w-[200px]">
                  {locations.length > 0 ? (
                    locations.map((location) => (
                      <a
                        key={location.id}
                        href={`/location/${location.id}`}
                        className="block px-4 py-2 text-base hover:bg-gray-100"
                        onClick={() => setIsLocationDropdownOpen(false)}
                      >
                        {location.name}
                      </a>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">Yuklanmoqda...</div>
                  )}
                </div>
              )}
            </div>

            {/* Media Link */}
            <a href="/media" className="text-[#000000] hover:text-[#000000] text-xl whitespace-nowrap">
              {t('nav.media')}
            </a>
          </div>

          {/* Right Side - Search, Language, Currency */}
          <div className="flex items-center gap-6 flex-shrink-0 ml-auto">
            {/* Search Icon */}
            <button className="text-[#000000] hover:text-[#000000]">
              <Search className="w-6 h-6" />
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 text-[#000000] hover:text-[#000000] text-lg whitespace-nowrap"
              >
                <span>{currentLanguage.name}</span>
                <img src="/svg/kategoriy.svg.svg" alt="dropdown" className="w-3.5 h-3.5 mt-1" style={{filter: 'brightness(0)'}} />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 min-w-[150px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-base hover:bg-gray-100 ${
                        i18n.language === lang.code ? 'bg-gray-50 font-semibold' : ''
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="h-10 w-0.5 bg-[#000000]"></div>

            {/* Currency Info */}
            <div className="flex items-center gap-4 text-base whitespace-nowrap">
              <div className="flex items-center gap-1">
                <span className="text-[#000000]">USD</span>
                <span className="font-semibold text-[#000000]">
                  {usdRate ? usdRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '...'}
                </span>
                <img src="/svg/red-arrow.svg.svg" alt="down" className="w-5 h-5" style={{filter: 'brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(4066%) hue-rotate(343deg) brightness(102%) contrast(101%)'}} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[#000000]">RUB</span>
                <span className="font-semibold text-[#000000]">
                  {rubRate ? rubRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '...'}
                </span>
                <img src="/svg/red-arrow.svg.svg" alt="down" className="w-5 h-5" style={{filter: 'brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(4066%) hue-rotate(343deg) brightness(102%) contrast(101%)'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
