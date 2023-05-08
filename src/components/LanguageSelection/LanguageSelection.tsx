import React from 'react';
import './LanguageSelection.css';
import { useLanguage } from '../../context/LanguageContext';

function LanguageSelection() {
  const { language, setLanguage } = useLanguage();

  const handleFrenchClick = () => {
    setLanguage('fr-FR');
  };

  const handleEnglishClick = () => {
    setLanguage('en-US');
  };

  const handleKeyDown = (event: React.KeyboardEvent, callback: () => void) => {
    if (event.key === 'Enter') {
      callback();
    }
  };

  return (
    <div className="language-selection">
      <div
        className={`language-selection-flag ${
          language === 'fr-FR' ? 'selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={handleFrenchClick}
        onKeyDown={(event) => handleKeyDown(event, handleFrenchClick)}
      >
        🇫🇷
      </div>
      <div
        className={`language-selection-flag ${
          language === 'en-US' ? 'selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={handleEnglishClick}
        onKeyDown={(event) => handleKeyDown(event, handleEnglishClick)}
      >
        🇬🇧
      </div>
    </div>
  );
}

export default LanguageSelection;
