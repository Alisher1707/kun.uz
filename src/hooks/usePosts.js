import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { postsAPI } from '../services/api';
import { categorizePostsByFlags } from '../services/postUtils';

/**
 * Custom hook - barcha postlarni yuklash va kategoriyalash
 * @returns {Object} - Posts va loading holatlari
 */
export const usePosts = () => {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState({
    all: [],
    main: [],
    latest: [],
    gallery: [],
    kunUz: [],
    interviews: [],
    business: [],
    carousel: [],
    articles: [],
    youtube: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // API'dan barcha postlarni olish
        const response = await postsAPI.getAllFront(i18n.language);
        const allPosts = response?.posts || [];

        // Postlarni kategoriyalash
        const categorized = categorizePostsByFlags(allPosts);

        setPosts(categorized);
      } catch (err) {
        console.error('Postlarni yuklashda xatolik:', err);
        setError(err.message || 'Xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [i18n.language]);

  return { posts, loading, error };
};

/**
 * Custom hook - ma'lum bir flag bo'yicha postlarni yuklash
 * ✅ BITTA REQUEST - Frontend filter qiladi
 * @param {String} flag - Flag nomi (masalan: 'is_main')
 * @returns {Object} - Posts va loading holatlari
 */
export const usePostsByFlag = (flag) => {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Bitta endpoint - barcha postlar
        const response = await postsAPI.getAllFront(i18n.language);
        const allPosts = response?.posts || [];

        // ✅ Frontend'da filter qilish
        const filtered = allPosts.filter(post => post.flags?.[flag] === true);

        setPosts(filtered);
      } catch (err) {
        console.error(`${flag} postlarni yuklashda xatolik:`, err);
        setError(err.message || 'Xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [flag, i18n.language]);

  return { posts, loading, error };
};

/**
 * Custom hook - YouTube video postlarni yuklash
 * @returns {Object} - YouTube posts va loading holatlari
 */
export const useYoutubePosts = () => {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await postsAPI.getAllFront(i18n.language);
        const allPosts = response?.posts || [];

        // Faqat YouTube postlarni filter qilish
        const youtubePosts = allPosts.filter(post => {
          const flags = post.flags || {};
          const allFlagsFalse = Object.values(flags).every(val => val === false);
          return allFlagsFalse && post.youtube_url;
        });

        setPosts(youtubePosts);
      } catch (err) {
        console.error('YouTube postlarni yuklashda xatolik:', err);
        setError(err.message || 'Xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [i18n.language]);

  return { posts, loading, error };
};

export default {
  usePosts,
  usePostsByFlag,
  useYoutubePosts,
};
