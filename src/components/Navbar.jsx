import { useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

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

  return (
    <nav className="w-full bg-white border-b border-gray-200">
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
            <button className="flex items-center gap-1 text-[#000000] hover:text-[#000000] text-xl whitespace-nowrap">
              <span>{t('nav.categories')}</span>
              <img src="/svg/kategoriy.svg.svg" alt="dropdown" className="w-3.5 h-3.5 mt-1" style={{filter: 'brightness(0)'}} />
            </button>

            {/* Hudud Dropdown */}
            <button className="flex items-center gap-1 text-[#000000] hover:text-[#000000] text-xl whitespace-nowrap">
              <span>{t('nav.region')}</span>
              <img src="/svg/kategoriy.svg.svg" alt="dropdown" className="w-3.5 h-3.5 mt-1" style={{filter: 'brightness(0)'}} />
            </button>

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
                <span className="font-semibold text-[#000000]">11,980.08</span>
                <img src="/svg/red-arrow.svg.svg" alt="down" className="w-5 h-5" style={{filter: 'brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(4066%) hue-rotate(343deg) brightness(102%) contrast(101%)'}} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[#000000]">RUS</span>
                <span className="font-semibold text-[#000000]">148.85</span>
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
