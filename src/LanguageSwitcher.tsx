import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'fr', label: 'Français', native: 'Français' },
    { code: 'de', label: 'Deutsch', native: 'Deutsch' },
    { code: 'hi', label: 'हिन्दी', native: 'हिन्दी' },
    { code: 'ar', label: 'العربية', native: 'العربية' },
    { code: 'kn', label: 'ಕನ್ನಡ', native: 'ಕನ್ನಡ' },
  ];

  const currentLang = languages.find((l) => l.code === i18n.language);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        {currentLang?.native || 'EN'}
      </button>
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${i18n.language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.native}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
