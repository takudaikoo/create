import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore, commitSectionChange } from '@/store/useStore';
import { Plane } from '@react-three/drei';

const WipeShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uColor: { value: new THREE.Color('#000000') },
        uResolution: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uProgress;
    uniform vec3 uColor;
    varying vec2 vUv;

    // Pseudo-random noise
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      // "Alternating" (Kougo) Effect with Creative Style
      
      // We divide the screen into two halves: Left (y < 0.5?) No, Left (x < 0.5) and Right (x > 0.5).
      // Or we alternate strips.
      // Let's stick thereto: Left Block and Right Block coming together.
      
      // Coordinate manipulation
      // Add some noise to the edges
      float noiseVal = random(vec2(vUv.y * 100.0, uProgress)) * 0.05;
      
      // Animation Progress
      float p = uProgress;
      float alpha = 0.0;
      
      // Split into two halves
      // Left side (Top-Left to Bottom-Right angle?)
      // Let's do a clean angular cut.
      // Left side comes from -x to 0.5
      // Right side comes from 1.0+x to 0.5
      
      // Dynamic Progress:
      // 0.0 -> 0.5: In
      // 0.5: Held
      // 0.5 -> 1.0: Out
      
      float limit = 0.0;
      
      // In Phase
      if (p <= 0.5) {
        float t = p * 2.0; // 0 -> 1
        
        // Left Shutter
        float leftPos = t * 0.5; // 0 -> 0.5
        // Right Shutter
        float rightPos = 1.0 - (t * 0.5); // 1.0 -> 0.5
        
        if (vUv.x < leftPos + noiseVal || vUv.x > rightPos - noiseVal) {
            alpha = 1.0;
        }
      } 
      // Out Phase
      else {
        float t = (p - 0.5) * 2.0; // 0 -> 1
        
        // They retract back?
        // Or cross over? Let's cross over for "Alternating/Kougo" feeling.
        // Wait, "Kougo" often implies A then B.
        // But requested is "Left/Right Kougo Wipe".
        // Let's make them retract to reveal new content.
        
        float leftPos = 0.5 - (t * 0.5); // 0.5 -> 0.0
        float rightPos = 0.5 + (t * 0.5); // 0.5 -> 1.0
        
        if (vUv.x < leftPos + noiseVal || vUv.x > rightPos - noiseVal) {
            alpha = 1.0;
        }
      }
      
      // Color tint based on progress (subtle)
      vec3 finalColor = uColor;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

export function WipeEffect() {
    const meshRef = useRef<THREE.Mesh>(null);
    const shaderRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();
    const isAnimating = useStore((state) => state.isAnimating);
    const setAnimating = useStore((state) => state.setAnimating);

    // Animation state
    const progress = useRef(0);
    const speed = 1.5; // Multiplier for delta time

    useFrame((state, delta) => {
        // Safety check: if not animating, ensure progress is 0
        if (!isAnimating) {
            if (progress.current !== 0) {
                progress.current = 0;
                if (shaderRef.current) {
                    shaderRef.current.uniforms.uProgress.value = 0;
                }
            }
            return;
        }

        if (isAnimating) {
            progress.current += delta * speed;

            // Midpoint trigger
            if (progress.current >= 0.5 && progress.current < 0.5 + (delta * speed)) {
                // Trigger state change exactly once when crossing 0.5
                commitSectionChange();
            }

            // End trigger
            if (progress.current >= 1) {
                progress.current = 0;
                setAnimating(false);
            }
        }

        if (shaderRef.current) {
            shaderRef.current.uniforms.uProgress.value = progress.current;
            shaderRef.current.uniforms.uResolution.value.set(viewport.width, viewport.height);
        }
    });

    // Full viewport plane
    return (
        <Plane args={[viewport.width, viewport.height]} position={[0, 0, 0]}>
            <shaderMaterial
                ref={shaderRef}
                args={[WipeShaderMaterial]}
                transparent
                depthTest={false}
            />
        </Plane>
    );
}
