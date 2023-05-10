import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../context/LanguageContext';
import i18n from '../../utils/i18n';
import './DefaultPage.css';

// This component displays the default page on the right side of the website.
function DefaultPage() {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <div className="default-page">
      <h2>{t<string>('default.welcome_title')}</h2>
      <p>{t<string>('default.welcome_message')}</p>
    </div>
  );
}

export default DefaultPage;
