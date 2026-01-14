import React from 'react';
import Section from './Section';
import styles from './Hero.module.css';

interface HeroProps {
    videoSrc?: string;
}

export default function Hero({ videoSrc = '/movie/background.mp4' }: HeroProps) {
    return (
        <Section className={styles.hero} fullHeight>
            <div className={styles.videoOverlay} />
            <video
                className={styles.videoBackground}
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={videoSrc} type="video/mp4" />
            </video>

            <div className={styles.content}>
                <div className={styles.copyWrapper}>
                    <p className={styles.mainCopy}>その映像は、あなたの「野心」を語れているか。</p>
                    <h1 className={styles.subCopy}>
                        圧倒的な視覚体験で、<br />
                        ブランド価値を最大化する。<br />
                        プレミアム・プロモーション映像制作。
                    </h1>
                </div>

                <div className={styles.ctaWrapper}>
                    <a href="#portfolio" className={styles.ctaButton}>
                        制作事例（ポートフォリオ）を見る
                    </a>
                </div>
            </div>
        </Section>
    );
}
