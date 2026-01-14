import { Canvas } from '@react-three/fiber';
import { WipeEffect } from './WipeEffect';
import { Suspense } from 'react';

export default function TransitionCanvas() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999, // High z-index to sit on top of content
            pointerEvents: 'none', // Allow clicks to pass through when transparent
        }}>
            <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 10] }}>
                <Suspense fallback={null}>
                    <WipeEffect />
                </Suspense>
            </Canvas>
        </div>
    );
}
