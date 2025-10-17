
import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';

interface LanguageSelectorProps {
  language: string;
  setLanguage: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage }) => {
  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="appearance-none w-full md:w-auto bg-gray-700 border border-gray-600 text-white py-2 pl-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
};
