
import React from 'react';
// Assuming react-markdown and remark-gfm are available in the environment
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReviewOutputProps {
  review: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
    <p className="mt-4 text-lg font-semibold">Gemini is reviewing your code...</p>
    <p className="text-sm">This may take a few moments.</p>
  </div>
);

const InitialState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
    <h3 className="text-lg font-semibold text-gray-400">Your Code Review Awaits</h3>
    <p>Submit your code to get feedback from Gemini.</p>
  </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-red-400 p-4 bg-red-900/20 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-semibold">An Error Occurred</p>
        <p className="text-sm">{message}</p>
    </div>
);


export const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
  return (
    <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-4 h-full min-h-[300px] lg:min-h-[460px] flex flex-col">
       <label className="block text-sm font-medium text-gray-400 mb-2">
        Review Feedback
      </label>
      <div className="prose prose-invert prose-sm max-w-none w-full h-full overflow-y-auto p-2 rounded-md bg-transparent prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-600/50 prose-code:before:content-none prose-code:after:content-none">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
            <ErrorState message={error} />
        ) : review ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{review}</ReactMarkdown>
        ) : (
          <InitialState />
        )}
      </div>
    </div>
  );
};
