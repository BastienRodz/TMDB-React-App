import React from 'react';
import './LanguageSelection.css';
import { useLanguage } from '../../context/LanguageContext';
import quebec from '../../assets/quebec.svg';

// This component is used to select the language of the app.
// On click on a flag, the language is changed in the context.
function LanguageSelection() {
  const { language, setLanguage } = useLanguage();

  const handleFrenchClick = () => {
    setLanguage('fr-FR');
  };

  const handleQuebecClick = () => {
    setLanguage('fr-CA');
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
          language === 'fr-CA' ? 'selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={handleQuebecClick}
        onKeyDown={(event) => handleKeyDown(event, handleFrenchClick)}
      >
        <img src={quebec} alt="Quebec" style={{ width: '70%' }} />
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
