// Types pour les analytics et statistiques
export interface MonthlyData {
    month: string;
    amount: number;
    transactions: number;
}

export interface CategoryStats {
    category: string;
    amount: number;
    percentage: number;
    count: number;
    color: string;
}

export interface QuickStat {
    title: string;
    value: string | number;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    icon: React.ReactNode;
}

export interface Analytics {
    totalSpent: number;
    totalReceived: number;
    totalTransactions: number;
    monthlyTrend: string;
    monthlyData: MonthlyData[];
    categoryBreakdown: CategoryStats[];
}
