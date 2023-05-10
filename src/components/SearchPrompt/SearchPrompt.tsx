import { useEffect } from 'react';
import './SearchPrompt.css';
import { useTranslation } from 'react-i18next';
import i18n from '../../utils/i18n';
import searchImage from '../../assets/search.png';

interface SearchPromptProps {
  language: string;
}

// This component displays a prompt to search for movies on the left side of the website when the user has not.
function SearchPrompt({ language }: SearchPromptProps) {
  const { t } = useTranslation();

  // If the user changes the language, we change the language of the text displayed through i18n.
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <div className="search-prompt" role="status">
      <img src={searchImage} alt="search" width="50%" />
      <p>{t<string>('search.default')}</p>
    </div>
  );
}

export default SearchPrompt;
