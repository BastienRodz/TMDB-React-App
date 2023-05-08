import React, { createContext, useState, useContext, useMemo } from 'react';

interface LanguageContextState {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextState>({
  language: 'fr-FR',
  setLanguage: () => undefined,
});

function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('fr-FR');

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export { useLanguage, LanguageContext };
export default LanguageProvider;
