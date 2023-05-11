import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LocalContext } from '../../contexts/LocalContext';
import i18n from '../../utils/i18n';
import './DefaultPage.css';

// This component displays the default page on the right side of the website.
// It access the context to get the local and display the text in the correct language.
function DefaultPage() {
  const { local } = useContext(LocalContext);
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(local);
  }, [local]);

  return (
    <div className="default-page">
      <h2>{t<string>('default.welcome_title')}</h2>
      <p>{t<string>('default.welcome_message')}</p>
    </div>
  );
}

export default DefaultPage;
