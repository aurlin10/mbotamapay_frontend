import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-all rounded-xl"
            aria-label={`Passer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
        >
            <div className="flex items-center gap-3">
                {theme === 'light' ? (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Thème</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {theme === 'light' ? 'Clair' : 'Sombre'}
                    </p>
                </div>
            </div>
            <div className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors">
                <div
                    className={`absolute top-0.5 w-6 h-6 bg-white dark:bg-indigo-600 rounded-full shadow-md transition-all duration-300 ${theme === 'dark' ? 'right-0.5' : 'left-0.5'
                        }`}
                />
            </div>
        </button>
    );
};
