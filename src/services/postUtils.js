/**
 * Postlarni flaglariga qarab filter qilish utility funksiyalari
 */

/**
 * Barcha postlarni flaglariga va youtube_url mavjudligiga qarab guruhlaydi
 * @param {Array} posts - Barcha postlar ro'yxati
 * @returns {Object} - Guruhlanagan postlar
 */
export const categorizePostsByFlags = (posts) => {
  if (!Array.isArray(posts)) return {};

  return {
    // is_main = true
    main: posts.filter(post => post.flags?.is_main === true),

    // is_latest = true
    latest: posts.filter(post => post.flags?.is_latest === true),

    // is_gallery = true
    gallery: posts.filter(post => post.flags?.is_gallery === true),

    // is_kun_uz = true
    kunUz: posts.filter(post => post.flags?.is_kun_uz === true),

    // is_interview = true
    interviews: posts.filter(post => post.flags?.is_interview === true),

    // is_business = true
    business: posts.filter(post => post.flags?.is_business === true),

    // is_carousel = true
    carousel: posts.filter(post => post.flags?.is_carousel === true),

    // is_articles = true
    articles: posts.filter(post => post.flags?.is_articles === true),

    // Hamma flag false va youtube_url bor
    youtube: posts.filter(post => {
      const flags = post.flags || {};
      const allFlagsFalse = !flags.is_main && !flags.is_latest &&
                            !flags.is_gallery && !flags.is_kun_uz &&
                            !flags.is_interview && !flags.is_business &&
                            !flags.is_carousel && !flags.is_articles;
      return allFlagsFalse && post.youtube_url;
    }),

    // Barcha postlar
    all: posts,
  };
};

/**
 * Berilgan flag bo'yicha postlarni qaytaradi
 * @param {Array} posts - Barcha postlar ro'yxati
 * @param {String} flagName - Flag nomi (masalan: 'is_main', 'is_latest')
 * @returns {Array} - Filter qilingan postlar
 */
export const getPostsByFlag = (posts, flagName) => {
  if (!Array.isArray(posts)) return [];
  return posts.filter(post => post.flags?.[flagName] === true);
};

/**
 * YouTube video postlarni qaytaradi
 * (Hamma flag false va youtube_url mavjud)
 * @param {Array} posts - Barcha postlar ro'yxati
 * @returns {Array} - YouTube video postlar
 */
export const getYoutubePosts = (posts) => {
  if (!Array.isArray(posts)) return [];

  return posts.filter(post => {
    const flags = post.flags || {};
    const allFlagsFalse = Object.values(flags).every(val => val === false);
    return allFlagsFalse && post.youtube_url;
  });
};

/**
 * Post'ning turini aniqlaydi
 * @param {Object} post - Post ob'ekti
 * @returns {String} - Post turi: 'youtube', 'main', 'latest', va h.k.
 */
export const getPostType = (post) => {
  if (!post || !post.flags) return 'unknown';

  const flags = post.flags;

  // YouTube video ekanligini tekshirish
  const allFlagsFalse = Object.values(flags).every(val => val === false);
  if (allFlagsFalse && post.youtube_url) {
    return 'youtube';
  }

  // Qaysi flag true ekanligini topish
  for (const [key, value] of Object.entries(flags)) {
    if (value === true) {
      return key; // masalan: 'is_main', 'is_latest'
    }
  }

  return 'regular';
};

/**
 * Postni to'liq URL bilan qaytaradi (agar kerak bo'lsa)
 * @param {Object} post - Post ob'ekti
 * @returns {Object} - To'ldirilgan post
 */
export const enrichPost = (post) => {
  return {
    ...post,
    type: getPostType(post),
    hasYoutube: !!post.youtube_url,
    hasImage: !!post.image,
  };
};

export default {
  categorizePostsByFlags,
  getPostsByFlag,
  getYoutubePosts,
  getPostType,
  enrichPost,
};
