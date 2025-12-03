// Types pour les catégories de transactions
export type CategoryType =
    | 'FOOD'
    | 'TRANSPORT'
    | 'SHOPPING'
    | 'BILLS'
    | 'ENTERTAINMENT'
    | 'HEALTH'
    | 'TRANSFER'
    | 'OTHER';

export interface Category {
    id: CategoryType;
    name: string;
    icon: string;
    color: string;
    bgColor: string;
    textColor: string;
    darkBgColor: string;
    darkTextColor: string;
}

export const CATEGORIES: Record<CategoryType, Category> = {
    FOOD: {
        id: 'FOOD',
        name: 'Alimentation',
        icon: '🍔',
        color: '#f97316',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-600',
        darkBgColor: 'dark:bg-orange-900/20',
        darkTextColor: 'dark:text-orange-400',
    },
    TRANSPORT: {
        id: 'TRANSPORT',
        name: 'Transport',
        icon: '🚗',
        color: '#3b82f6',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600',
        darkBgColor: 'dark:bg-blue-900/20',
        darkTextColor: 'dark:text-blue-400',
    },
    SHOPPING: {
        id: 'SHOPPING',
        name: 'Shopping',
        icon: '🛍️',
        color: '#ec4899',
        bgColor: 'bg-pink-100',
        textColor: 'text-pink-600',
        darkBgColor: 'dark:bg-pink-900/20',
        darkTextColor: 'dark:text-pink-400',
    },
    BILLS: {
        id: 'BILLS',
        name: 'Factures',
        icon: '📱',
        color: '#8b5cf6',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-600',
        darkBgColor: 'dark:bg-purple-900/20',
        darkTextColor: 'dark:text-purple-400',
    },
    ENTERTAINMENT: {
        id: 'ENTERTAINMENT',
        name: 'Loisirs',
        icon: '🎮',
        color: '#10b981',
        bgColor: 'bg-green-100',
        textColor: 'text-green-600',
        darkBgColor: 'dark:bg-green-900/20',
        darkTextColor: 'dark:text-green-400',
    },
    HEALTH: {
        id: 'HEALTH',
        name: 'Santé',
        icon: '⚕️',
        color: '#ef4444',
        bgColor: 'bg-red-100',
        textColor: 'text-red-600',
        darkBgColor: 'dark:bg-red-900/20',
        darkTextColor: 'dark:text-red-400',
    },
    TRANSFER: {
        id: 'TRANSFER',
        name: 'Transfert',
        icon: '💸',
        color: '#6366f1',
        bgColor: 'bg-indigo-100',
        textColor: 'text-indigo-600',
        darkBgColor: 'dark:bg-indigo-900/20',
        darkTextColor: 'dark:text-indigo-400',
    },
    OTHER: {
        id: 'OTHER',
        name: 'Autre',
        icon: '📦',
        color: '#6b7280',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600',
        darkBgColor: 'dark:bg-gray-700',
        darkTextColor: 'dark:text-gray-400',
    },
};

// Helper pour auto-catégoriser une transaction
export const categorizeTransaction = (name: string): CategoryType => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes('restaurant') || lowerName.includes('food') || lowerName.includes('café')) {
        return 'FOOD';
    }
    if (lowerName.includes('uber') || lowerName.includes('taxi') || lowerName.includes('transport')) {
        return 'TRANSPORT';
    }
    if (lowerName.includes('shop') || lowerName.includes('store') || lowerName.includes('amazon')) {
        return 'SHOPPING';
    }
    if (lowerName.includes('electric') || lowerName.includes('water') || lowerName.includes('internet')) {
        return 'BILLS';
    }
    if (lowerName.includes('cinema') || lowerName.includes('game') || lowerName.includes('netflix')) {
        return 'ENTERTAINMENT';
    }
    if (lowerName.includes('pharma') || lowerName.includes('doctor') || lowerName.includes('hospital')) {
        return 'HEALTH';
    }
    if (lowerName.includes('transfer') || lowerName.includes('envoi')) {
        return 'TRANSFER';
    }

    return 'OTHER';
};
