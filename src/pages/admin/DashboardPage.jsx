import { useTranslation } from 'react-i18next';

const DashboardPage = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('admin.dashboard.totalPosts'),
      value: '248',
      change: '+12%',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      bgColor: 'bg-blue-100',
    },
    {
      title: t('admin.dashboard.totalCategories'),
      value: '12',
      change: '+3',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      bgColor: 'bg-purple-100',
    },
    {
      title: t('admin.dashboard.totalViews'),
      value: '45.2K',
      change: '+18%',
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      bgColor: 'bg-green-100',
    },
    {
      title: t('admin.dashboard.totalLocations'),
      value: '14',
      change: '+2',
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bgColor: 'bg-red-100',
    },
  ];

  const recentPosts = [
    { id: 1, title: 'Ekologik farmon: qurilishlar va korxonalar ustidan qat\'iy nazorat', category: "O'zbekiston", time: '2 soat oldin' },
    { id: 2, title: 'Jizzaxda AES qurilishi loyihasi bo\'yicha jamoatchilik eshituvlari', category: "O'zbekiston", time: '5 soat oldin' },
    { id: 3, title: 'O\'zbekiston milliy jamoasi JCH-2026 qur\'asida uchinchi savatdan joy oldi', category: 'Sport', time: '1 kun oldin' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('admin.dashboard.welcome')}</h1>
        <p className="text-gray-600 mt-2">{t('admin.dashboard.subtitle')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-green-600 text-sm mt-2 font-medium">{stat.change}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{t('admin.dashboard.recentPosts')}</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{post.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{post.category}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{t('admin.dashboard.quickActions')}</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <a
                href="/admin/posts"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{t('admin.dashboard.createPost')}</h3>
                  <p className="text-sm text-gray-500">{t('admin.dashboard.createPostDesc')}</p>
                </div>
              </a>

              <a
                href="/admin/categories"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{t('admin.dashboard.manageCategories')}</h3>
                  <p className="text-sm text-gray-500">{t('admin.dashboard.manageCategoriesDesc')}</p>
                </div>
              </a>

              <a
                href="/admin/locations"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{t('admin.dashboard.manageLocations')}</h3>
                  <p className="text-sm text-gray-500">{t('admin.dashboard.manageLocationsDesc')}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
