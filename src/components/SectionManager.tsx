'use client';

import React, { useEffect, useRef, WheelEvent, useState } from 'react';
import { useStore } from '@/store/useStore';
import { AnimatePresence, motion } from 'framer-motion';

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

    // Event Handlers
    const handleWheel = (e: React.WheelEvent) => {
        if (useStore.getState().isAnimating) return;

        const currentSectionIndex = useStore.getState().currentSection;
        const container = containerRef.current;
        if (!container) return;

        const activeSection = container.querySelector(`[data-section-index="${currentSectionIndex}"]`) as HTMLElement;

        // Internal Scroll Logic
        let isScrollable = false;
        let atTop = true;
        let atBottom = true;

        if (activeSection) {
            isScrollable = activeSection.scrollHeight > activeSection.clientHeight;
            const tolerance = 2;
            atTop = activeSection.scrollTop <= tolerance;
            atBottom = Math.abs((activeSection.scrollHeight - activeSection.scrollTop) - activeSection.clientHeight) <= tolerance;
        }

        if (e.deltaY > 5) { // Down
            if (!isScrollable || atBottom) {
                useStore.getState().nextSection();
            }
        } else if (e.deltaY < -5) { // Up
            if (!isScrollable || atTop) {
                useStore.getState().prevSection();
            }
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (useStore.getState().isAnimating) return;

        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY.current - touchEndY;

        const currentSectionIndex = useStore.getState().currentSection;
        const container = containerRef.current;
        if (!container) return;
        const activeSection = container.querySelector(`[data-section-index="${currentSectionIndex}"]`) as HTMLElement;

        let isScrollable = false;
        let atTop = true;
        let atBottom = true;

        if (activeSection) {
            isScrollable = activeSection.scrollHeight > activeSection.clientHeight;
            const tolerance = 2;
            atTop = activeSection.scrollTop <= tolerance;
            atBottom = Math.abs((activeSection.scrollHeight - activeSection.scrollTop) - activeSection.clientHeight) <= tolerance;
        }

        if (diff > 5) { // Swipe Up (Scroll Down)
            if (!isScrollable || atBottom) {
                useStore.getState().nextSection();
            }
        } else if (diff < -5) {
            if (!isScrollable || atTop) {
                useStore.getState().prevSection();
            }
        }
    };

    // Keyboard support via window (safe)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (useStore.getState().isAnimating) return;
            if (e.key === 'ArrowDown') useStore.getState().nextSection();
            if (e.key === 'ArrowUp') useStore.getState().prevSection();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

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
        const activeSection = containerRef.current?.querySelector(`[data-section-index="${currentSection}"]`) as HTMLElement;
        if (activeSection) {
            activeSection.scrollTop = 0;
        }
    }, [currentSection]);


    // Variants for alternating slide
    // Odd index (1, 3...): From Right
    // Even index (2, 4...): From Left (or vice versa based on design)
    // Let's say: 
    // Section 1 (Offer) comes from Right.
    // Section 2 (Problem) comes from Left. (Alternating)

    const slideVariants = {
        enter: (custom: { index: number; direction: 'up' | 'down' }) => {
            const isOdd = custom.index % 2 !== 0;
            // If scrolling down:
            // Odd -> Enter from Right (x: 100%)
            // Even -> Enter from Left (x: -100%)

            // If scrolling UP (Backwards):
            // We want the reverse of the Exit?
            // Usually simpler: Maintain the "Side" of the section.
            // Section 1 always lives on the Right. Section 2 on Left.

            // Let's stick to deck logic:
            // Enter based on Index parity.
            const xInitial = isOdd ? '100%' : '-100%';

            // Adjust for direction? 
            // If direction is 'up' (prev), we are revealing the previous slide.
            // The previous slide (incoming) should slide back IN?
            // Or the Current slide slides OUT to reveal?

            // Standard "Deck" where slides stack logic:
            // If going Down: Next slide slides IN over current.
            // If going Up: Current slide slides OUT to reveal previous.

            if (custom.direction === 'down') {
                return { x: xInitial, opacity: 1, zIndex: 10 };
            } else {
                // Going Up: Incoming (Previous) stays in back/center?
                // Or we slide it in from top? No, request is Left/Right.
                // Let's make it symmetric.
                // If going UP, the incoming is the "Previous" one. 
                // It should probably enter from the opposite side it left?
                return { x: 0, opacity: 1, zIndex: 0, scale: 0.95 }; // Wait behind
            }
        },
        center: { x: 0, opacity: 1, zIndex: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
        exit: (custom: { index: number; direction: 'up' | 'down' }) => {
            const isOdd = custom.index % 2 !== 0;
            // If going Down: Current (Outgoing) stays center? Or scales down?
            if (custom.direction === 'down') {
                return { x: 0, opacity: 0.5, zIndex: 0, scale: 0.95, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } };
            } else {
                // Going Up: Current (was top) slides OUT to where it came from.
                // If it's Odd, it came from Right, so slides back to Right.
                const xExit = isOdd ? '100%' : '-100%';
                return { x: xExit, opacity: 1, zIndex: 10, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } };
            }
        }
    };

    // Simplification for "Alternating Slide In" requested:
    // "下スクロール時に左右から交互にスライドイン"
    // implies: On Scroll Down, the NEW section slides IN.
    // On Scroll Up, the OLD section slides OUT (Reverse).

    const { direction } = useStore(); // Need direction from store

    return (
        <>
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
                    backgroundColor: '#111',
                    touchAction: 'none', // Prevent native touch actions
                }}
            >
                <AnimatePresence
                    initial={false}
                    custom={{ index: currentSection, direction: direction }}
                    onExitComplete={() => useStore.getState().setAnimating(false)}
                >
                    <motion.div
                        key={currentSection}
                        custom={{ index: currentSection, direction: direction }}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        onAnimationStart={() => useStore.getState().setAnimating(true)}
                        // Add data attribute for robust querying
                        data-section-index={currentSection}

                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            overflowY: 'auto',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            backgroundColor: '#000', // Ensure opacity calculations work against black
                        }}
                    >
                        {/* Hide scrollbar */}
                        <style jsx>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {children[currentSection]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
}
