import React from 'react';
import { CategoryType } from '../types/category';

interface CategoryBadgeProps {
    category: CategoryType;
    icon: string;
    name: string;
    color: string;
    bgColor: string;
    textColor: string;
    darkBgColor?: string;
    darkTextColor?: string;
    size?: 'sm' | 'md';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
    icon,
    name,
    bgColor,
    textColor,
    darkBgColor = '',
    darkTextColor = '',
    size = 'sm',
}) => {
    const sizeClasses = size === 'sm'
        ? 'px-2 py-1 text-xs'
        : 'px-3 py-1.5 text-sm';

    return (
        <span
            className={`inline-flex items-center gap-1.5 ${bgColor} ${darkBgColor} ${textColor} ${darkTextColor} ${sizeClasses} rounded-full font-semibold`}
        >
            <span>{icon}</span>
            <span>{name}</span>
        </span>
    );
};
