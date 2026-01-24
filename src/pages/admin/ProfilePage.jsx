import { useState } from 'react';
import { adminAPI } from '../../services/api';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

  // Admin ID ni static qiymat sifatida o'rnatamiz
  const ADMIN_ID = 1;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Validate username
      if (!formData.username || formData.username.trim().length < 3) {
        setMessage({
          type: 'error',
          text: 'Username kamida 3 ta belgidan iborat bo\'lishi kerak!'
        });
        setLoading(false);
        return;
      }

      // Validate password
      if (!formData.password || formData.password.length < 6) {
        setMessage({
          type: 'error',
          text: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak!'
        });
        setLoading(false);
        return;
      }

      // Validate password confirmation
      if (formData.password !== formData.password_confirmation) {
        setMessage({
          type: 'error',
          text: 'Parollar mos kelmaydi!'
        });
        setLoading(false);
        return;
      }

      // Build update data with static admin_id
      const updateData = {
        admin_id: ADMIN_ID,
        username: formData.username.trim(),
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      };

      console.log('📤 Sending update data:', updateData);

      const response = await adminAPI.updateProfile(updateData, false);

      setMessage({
        type: 'success',
        text: response.message || 'Profil muvaffaqiyatli yangilandi!'
      });

      // Clear password fields after successful update
      setFormData(prev => ({
        ...prev,
        password: '',
        password_confirmation: '',
      }));
    } catch (error) {
      console.error('Submit error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profil Sozlamalari</h1>
        <p className="text-gray-600 mt-2">Admin ma'lumotlarini boshqaring</p>
      </div>

      {/* Profile Card */}
      <div className="max-w-3xl">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
              </svg>
            </div>
            <div className="relative flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-14 h-14 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 border-4 border-white rounded-full"></div>
              </div>
              {/* Admin Info */}
              <div className="flex-1 text-white">
                <h2 className="text-2xl font-bold mb-1">Admin Panel</h2>
                <p className="text-red-100 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Super Administrator
                </p>
              </div>
              {/* Badge */}
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white border-opacity-30">
                  <p className="text-xs text-red-100 mb-1">Admin ID</p>
                  <p className="text-xl font-bold text-white">#{ADMIN_ID}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8">
          {/* Success/Error Message */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <div className="flex items-center gap-2">
                {message.type === 'success' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="font-medium">{message.text}</span>
              </div>
            </div>
          )}

          <div className="space-y-6">

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                placeholder="Yangi username (kamida 3 belgi)"
                required
                minLength="3"
              />
              <p className="text-xs text-gray-500 mt-1">Kamida 3 ta belgi</p>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Yangi Parol
              </label>
              <div className="relative">
                <input
                  type={showPassword.password ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                  placeholder="Yangi password (kamida 6 belgi)"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword.password ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Kamida 6 ta belgi</p>
            </div>

            {/* Password Confirmation Field */}
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                Passwordni Tasdiqlang
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                  placeholder="Passwordni qayta yoz"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword.confirm ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  username: '',
                  password: '',
                  password_confirmation: '',
                });
                setMessage({ type: '', text: '' });
              }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Tozalash
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-red-300 disabled:to-red-400 text-white rounded-lg transition-all font-semibold flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saqlanmoqda...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Saqlash
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
