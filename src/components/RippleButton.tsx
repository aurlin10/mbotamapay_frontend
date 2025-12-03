import React, { useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface RippleButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

interface Ripple {
    id: number;
    x: number;
    y: number;
}

export const RippleButton: React.FC<RippleButtonProps> = ({
    children,
    onClick,
    className = '',
    disabled = false,
}) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const addRipple = (event: MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const newRipple: Ripple = {
            id: Date.now(),
            x,
            y,
        };

        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);

        onClick?.();
    };

    return (
        <button
            className={`relative overflow-hidden ${className}`}
            onClick={addRipple}
            disabled={disabled}
        >
            {children}
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/30 dark:bg-white/20 pointer-events-none"
                    style={{
                        left: ripple.x - 25,
                        top: ripple.y - 25,
                        width: 50,
                        height: 50,
                    }}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />
            ))}
        </button>
    );
};
