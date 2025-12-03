// Animation variants pour les transitions de pages
export const pageVariants = {
    initial: {
        opacity: 0,
        x: 20,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
    exit: {
        opacity: 0,
        x: -20,
    },
};

export const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3,
} as const;

// Slide from right (pour les pages "forward")
export const slideFromRight = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
};

// Slide from left (pour les pages "back")
export const slideFromLeft = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
};

// Fade simple
export const fadeVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

// Scale effect
export const scaleVariant = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
};

// Stagger children
export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.05,
        },
    },
};

export const staggerItem = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
};

// Ripple effect keyframes (pour utiliser avec CSS)
export const rippleAnimation = {
    scale: [0, 2.5],
    opacity: [0.5, 0],
};
