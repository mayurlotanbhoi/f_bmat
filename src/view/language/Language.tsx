import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'zh', label: '中文' },
];

const LanguageSelect: React.FC = () => {
    const [selectedLang, setSelectedLang] = useState<string | null>(null);
    const navigate = useNavigate()

    const handleSelect = (code: string) => {
        setSelectedLang(code);
        navigate('/')
    };

    const handleConfirm = () => {
        if (!selectedLang) return alert('Please select a language.');
        alert(`Language selected: ${selectedLang}`);

        // You can add your logic here to save the choice, e.g., context, localStorage, etc.
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <h1 className="text-3xl font-extrabold mb-8 text-gray-800 select-none">
                Select Your Language
            </h1>

            <div className="flex flex-wrap justify-center gap-6 max-w-xl w-full">
                {languages.map(({ code, label }) => (
                    <button
                        key={code}
                        onClick={() => handleSelect(code)}
                        className={`
              relative flex items-center justify-center
              w-32 h-32 rounded-xl cursor-pointer
              bg-white shadow-lg
              font-semibold text-lg
              transform transition-transform duration-300
              hover:scale-110
              focus:outline-none focus:ring-4 focus:ring-pink-400
              ${selectedLang === code ? 'ring-4 ring-pink-600 scale-110' : ''}
              animate-bounce-slow
            `}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <button
                onClick={handleConfirm}
                disabled={!selectedLang}
                className={`
          mt-12 px-8 py-3 rounded-full text-white font-semibold
          bg-indigo-600 disabled:bg-indigo-300
          hover:bg-indigo-700 disabled:cursor-not-allowed
          transition-colors duration-300
          shadow-md
          select-none
        `}
            >
                Confirm
            </button>
        </div>
    );
};

export default LanguageSelect;
