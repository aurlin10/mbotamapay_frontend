import React from 'react';

interface TransactionSkeletonProps {
    count?: number;
}

export const TransactionSkeleton: React.FC<TransactionSkeletonProps> = ({ count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-5 flex items-center gap-4 border border-gray-100 dark:border-gray-700 animate-pulse"
                >
                    <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                    <div className="flex-1">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="text-right">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-1"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                    </div>
                </div>
            ))}
        </>
    );
};

interface DashboardSkeletonProps { }

export const DashboardSkeleton: React.FC<DashboardSkeletonProps> = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
            {/* Header Skeleton */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-6 pt-12 pb-24 rounded-b-[2.5rem]">
                <div className="flex items-center justify-between mb-8 animate-pulse">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl"></div>
                        <div>
                            <div className="h-3 bg-white/20 rounded w-20 mb-2"></div>
                            <div className="h-4 bg-white/30 rounded w-24"></div>
                        </div>
                    </div>
                    <div className="w-11 h-11 bg-white/20 rounded-2xl"></div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/30 animate-pulse">
                    <div className="h-3 bg-white/20 rounded w-32 mb-3"></div>
                    <div className="h-10 bg-white/30 rounded w-40 mb-4"></div>
                    <div className="h-3 bg-white/20 rounded w-full"></div>
                </div>
            </div>

            {/* Quick Actions Skeleton */}
            <div className="px-6 -mt-10 mb-6 animate-pulse">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-5 grid grid-cols-2 gap-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col items-center gap-3 p-5">
                        <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-5">
                        <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                </div>
            </div>

            {/* Transactions Skeleton */}
            <div className="flex-1 px-6 pb-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-5 animate-pulse"></div>
                <div className="space-y-3">
                    <TransactionSkeleton count={3} />
                </div>
            </div>
        </div>
    );
};

interface CardSkeletonProps {
    className?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ className = '' }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl p-5 animate-pulse ${className}`}>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
    );
};
