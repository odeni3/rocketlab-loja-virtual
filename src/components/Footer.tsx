import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="w-full py-4 text-center text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 shadow-lg">🚀</span>
          <span className="font-bold text-lg tracking-wide">{t('footer.storeName')}</span>
        </div>
        <div className="text-sm text-blue-1000/80 text-center md:text-right max-w-md">
          <span className="font-semibold text-blue-1000/80">{t('footer.aboutUs')}:</span> {t('footer.description')}
          <br className="hidden md:block" />
          &copy; {new Date().getFullYear()} {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 