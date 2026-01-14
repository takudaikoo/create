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
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize
    useEffect(() => {
        setTotalSections(children.length);
    }, [children.length, setTotalSections]);

    // Helper to check if current section is scrollable and at edge
    const checkScroll = (direction: 'up' | 'down', element: HTMLElement) => {
        // Tolerance for float inconsistencies
        const tolerance = 2;

        if (direction === 'down') {
            const isAtBottom = Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < tolerance;
            return isAtBottom;
        } else {
            const isAtTop = element.scrollTop < tolerance;
            return isAtTop;
        }
    };

    // Wheel handling
    const handleWheel = (e: WheelEvent) => {
        if (isAnimating) return;

        // Find the currently active section element
        // The containerRef has children divs. The active one is children[currentSection]
        const activeSection = containerRef.current?.children[currentSection] as HTMLElement;

        if (!activeSection) return;

        const isScrollable = activeSection.scrollHeight > activeSection.clientHeight;

        if (e.deltaY > 20) { // Scrolling Down
            if (!isScrollable || checkScroll('down', activeSection)) {
                // If not scrollable OR at bottom, trigger next
                nextSection();
            } else {
                // Let native scroll happen (don't prevent default)
                // But we need to stop propagation if we were hijacking it? 
                // Actually, standard behavior is fine here.
            }
        } else if (e.deltaY < -20) { // Scrolling Up
            if (!isScrollable || checkScroll('up', activeSection)) {
                prevSection();
            }
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
        const activeSection = containerRef.current?.children[currentSection] as HTMLElement;
        if (!activeSection) return;

        const isScrollable = activeSection.scrollHeight > activeSection.clientHeight;

        if (diff > 20) { // Swipe Up -> Next
            if (!isScrollable || checkScroll('down', activeSection)) {
                nextSection();
            }
        } else if (diff < -20) { // Swipe Down -> Prev
            if (!isScrollable || checkScroll('up', activeSection)) {
                prevSection();
            }
        }
    };

    // We need to disable native scroll on the body
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Additional effect: When section changes, reset scroll of the NEW section? 
    // Usually good practice, though absolute positioning might keep them fresh if unmounted. 
    // But here they are always mounted.
    useEffect(() => {
        const activeSection = containerRef.current?.children[currentSection] as HTMLElement;
        if (activeSection) {
            activeSection.scrollTop = 0;
        }
    }, [currentSection]);


    return (
        <>
            <TransitionCanvas />

            <div
                ref={containerRef}
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{
                    height: '100vh',
                    width: '100vw',
                    overflow: 'hidden',
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: '#111', // Ensure background is dark
                }}
            >
                {React.Children.map(children, (child, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            // Allow internal scrolling
                            overflowY: 'auto',
                            // Hide scrollbar for aesthetics
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',

                            // Visibility Logic
                            opacity: currentSection === index ? 1 : 0,
                            visibility: currentSection === index ? 'visible' : 'hidden', // Add visibility for better browser optimization
                            pointerEvents: currentSection === index ? 'auto' : 'none',
                            zIndex: currentSection === index ? 10 : 0, // Ensure active section is on top within container
                            transition: 'opacity 0.1s linear', // smooth fallback
                        }}
                    >
                        {/* Hide scrollbar for Chrome/Safari */}
                        <style jsx>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {child}
                    </div>
                ))}
            </div>
        </>
    );
}
