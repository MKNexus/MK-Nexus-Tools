
import React from 'react';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode }) => {
  return (
    <div className="h-full flex flex-col">
       <label htmlFor="codeInput" className="block text-sm font-medium text-gray-400 mb-2">
        Paste your code here
      </label>
      <textarea
        id="codeInput"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={`function greet() {\n  console.log("Hello, World!");\n}`}
        className="w-full flex-grow bg-gray-900/70 border border-gray-700 rounded-lg p-4 font-mono text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 min-h-[300px] lg:min-h-[400px] resize-y"
        spellCheck="false"
      />
    </div>
  );
};
