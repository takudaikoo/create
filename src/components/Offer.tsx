import React from 'react';
import Section from './Section';
import styles from './Offer.module.css';

export default function Offer() {
    return (
        <Section className={styles.offerSection}>
            <div className={styles.card}>
                <div className={styles.line} />
                <h2 className={styles.title}>御社のブランドポテンシャルを診断する</h2>
                <p className={styles.subtitle}>無料戦略ミーティング（毎月5社限定）</p>
                <p className={styles.description}>
                    単なる「見積もり」ではなく、ビジネスを加速させるための「戦略相談」として、<br />
                    現在の課題とクリエイティブによる解決策をご提案します。
                </p>

                <div className={styles.ctaWrapper}>
                    <p className={styles.microCopy}>まずは、あなたが目指す世界観をお聞かせください。</p>
                    <a href="#contact" className={styles.ctaButton}>
                        無料戦略ミーティングに申し込む
                    </a>
                </div>
            </div>
        </Section>
    );
}
