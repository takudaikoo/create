'use client';

import React, { useEffect, useRef, WheelEvent, useState } from 'react';
import { useStore } from '@/store/useStore';
import TransitionCanvas from './Three/TransitionCanvas';

interface SectionManagerProps {
    children: React.ReactNode[];
}

export default function SectionManager({ children }: SectionManagerProps) {
    const { currentSection, nextSection, prevSection, setTotalSections, isAnimating } = useStore();
    const touchStartY = useRef(0);

    // Initialize
    useEffect(() => {
        setTotalSections(children.length);
    }, [children.length, setTotalSections]);

    // Wheel handling
    const handleWheel = (e: WheelEvent) => {
        // Prevent default scrolling
        // e.preventDefault(); // Note: cannot prevent default in passive event listener easily in React

        if (isAnimating) return;

        if (e.deltaY > 50) {
            nextSection();
        } else if (e.deltaY < -50) {
            prevSection();
        }
    };

    // Touch handling
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (isAnimating) return;

        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY.current - touchEndY;

        if (diff > 50) { // Swipe Up -> Next
            nextSection();
        } else if (diff < -50) { // Swipe Down -> Prev
            prevSection();
        }
    };

    // Use a ref to attach non-passive listener if needed, but for now simple standard events:
    // We need to disable native scroll on the body
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            <TransitionCanvas />

            <div
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{
                    height: '100vh',
                    width: '100vw',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                {children.map((child, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: currentSection === index ? 1 : 0,
                            pointerEvents: currentSection === index ? 'auto' : 'none',
                            // We don't animate opacity or transform here because the WipeEffect covers the transition.
                            // We just swap visibility when the wipe is fully closed (commitSectionChange).
                        }}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </>
    );
}
