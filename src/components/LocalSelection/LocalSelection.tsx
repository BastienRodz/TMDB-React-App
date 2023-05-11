import React from 'react';
import './LocalSelection.css';
import { useLocal } from '../../contexts/LocalContext';
import quebec from '../../assets/quebec.svg';

// This component is used to select the local used by the app.
// On click on a flag, the local is changed in the context and the displayed language is changed.
function LocalSelection() {
  const { local, setLocal } = useLocal();

  const handleFrenchClick = () => {
    setLocal('fr-FR');
  };

  const handleQuebecClick = () => {
    setLocal('fr-CA');
  };

  const handleEnglishClick = () => {
    setLocal('en-US');
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
          local === 'fr-FR' ? 'selected' : ''
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
          local === 'fr-CA' ? 'selected' : ''
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
          local === 'en-US' ? 'selected' : ''
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

export default LocalSelection;
