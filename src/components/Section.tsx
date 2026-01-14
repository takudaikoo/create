import React from 'react';
import styles from './Section.module.css';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    fullHeight?: boolean;
}

export default function Section({ children, className = '', id, fullHeight = false }: SectionProps) {
    return (
        <section
            id={id}
            className={`${styles.section} ${fullHeight ? styles.fullHeight : ''} ${className}`}
        >
            <div className={styles.container}>
                {children}
            </div>
        </section>
    );
}
