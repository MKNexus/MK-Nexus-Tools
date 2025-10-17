
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { LanguageSelector } from './components/LanguageSelector';
import { CodeInput } from './components/CodeInput';
import { ReviewOutput } from './components/ReviewOutput';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { reviewCode } from './services/geminiService';
import { SUPPORTED_LANGUAGES } from './constants';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(SUPPORTED_LANGUAGES[0].value);
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setReview('');

    try {
      const result = await reviewCode(code, language);
      setReview(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-800/50 rounded-xl shadow-2xl shadow-indigo-900/10 border border-gray-700/50 p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-100">Submit Your Code for Review</h2>
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <CodeInput code={code} setCode={setCode} />
              <button
                onClick={handleReview}
                disabled={isLoading || !code.trim()}
                className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Reviewing...
                  </>
                ) : (
                  <>
                    <SparklesIcon />
                    Review Code
                  </>
                )}
              </button>
            </div>
            
            <ReviewOutput review={review} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Google Gemini. Built for developers.</p>
      </footer>
    </div>
  );
};

export default App;
