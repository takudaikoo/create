import { create } from 'zustand';

type Direction = 'up' | 'down';

interface StoreState {
    currentSection: number;
    direction: Direction;
    isAnimating: boolean;
    totalSections: number;
    setTotalSections: (count: number) => void;
    nextSection: () => void;
    prevSection: () => void;
    setAnimating: (isAnimating: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
    currentSection: 0,
    direction: 'down',
    isAnimating: false,
    totalSections: 0,

    setTotalSections: (count: number) => set({ totalSections: count }),

    setAnimating: (isAnimating: boolean) => set({ isAnimating }),

    nextSection: () => {
        const { currentSection, totalSections, isAnimating } = get();
        if (currentSection < totalSections - 1 && !isAnimating) {
            set({ direction: 'down', isAnimating: true });
        }
    },

    prevSection: () => {
        const { currentSection, isAnimating } = get();
        if (currentSection > 0 && !isAnimating) {
            set({ direction: 'up', isAnimating: true });
        }
    },
}));

// We'll need a way to commit the section change halfway through the animation
// Adding a specific action for that
export const commitSectionChange = () => {
    useStore.setState((state: StoreState) => {
        if (state.direction === 'down') {
            return { currentSection: state.currentSection + 1 };
        } else {
            return { currentSection: state.currentSection - 1 };
        }
    });
};
