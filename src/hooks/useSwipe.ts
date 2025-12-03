import { useState, useEffect, TouchEvent, MouseEvent } from 'react';

interface SwipeInput {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    minSwipeDistance?: number;
}

interface SwipeOutput {
    onTouchStart: (e: TouchEvent) => void;
    onTouchMove: (e: TouchEvent) => void;
    onTouchEnd: () => void;
    onMouseDown: (e: MouseEvent) => void;
    onMouseMove: (e: MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
}

export const useSwipe = (input: SwipeInput): SwipeOutput => {
    const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
    const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
    const [mouseDown, setMouseDown] = useState(false);

    const minSwipeDistance = input.minSwipeDistance || 50;

    const onTouchStart = (e: TouchEvent) => {
        setTouchEnd(null);
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY,
        });
    };

    const onTouchMove = (e: TouchEvent) => {
        setTouchEnd({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY,
        });
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;
        const isLeftSwipe = distanceX > minSwipeDistance;
        const isRightSwipe = distanceX < -minSwipeDistance;
        const isUpSwipe = distanceY > minSwipeDistance;
        const isDownSwipe = distanceY < -minSwipeDistance;

        if (isLeftSwipe && input.onSwipeLeft) {
            input.onSwipeLeft();
        }
        if (isRightSwipe && input.onSwipeRight) {
            input.onSwipeRight();
        }
        if (isUpSwipe && input.onSwipeUp) {
            input.onSwipeUp();
        }
        if (isDownSwipe && input.onSwipeDown) {
            input.onSwipeDown();
        }
    };

    // Mouse events for desktop
    const onMouseDown = (e: MouseEvent) => {
        setMouseDown(true);
        setTouchEnd(null);
        setTouchStart({
            x: e.clientX,
            y: e.clientY,
        });
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!mouseDown) return;
        setTouchEnd({
            x: e.clientX,
            y: e.clientY,
        });
    };

    const onMouseUp = () => {
        if (!mouseDown) return;
        onTouchEnd();
        setMouseDown(false);
    };

    const onMouseLeave = () => {
        setMouseDown(false);
    };

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
    };
};
