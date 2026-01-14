import React from 'react';
import Section from './Section';
import styles from './SocialProof.module.css';

export default function SocialProof() {
    return (
        <Section className={styles.socialSection}>
            <h2 className={styles.mainCopy}>
                「ただの映像ではない。これは経営戦略だ」
            </h2>
            <p className={styles.subCopy}>先見の明を持つリーダーたちからの評価。</p>

            <div className={styles.testimonials}>
                <div className={styles.testimonial}>
                    <div className={styles.imagePlaceholder}></div>
                    <div className={styles.content}>
                        <p className={styles.quote}>
                            「自社の技術力が、ここまで美しく表現されるとは思わなかった。<br />
                            投資家からの反応が劇的に変わりました。」
                        </p>
                        <p className={styles.author}>
                            株式会社TechNova 代表取締役 CEO<br />
                            <strong>佐藤 健一</strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.logos}>
                {/* Placeholder for logos */}
                <div className={styles.logoItem}>CLIENT LOGO</div>
                <div className={styles.logoItem}>CLIENT LOGO</div>
                <div className={styles.logoItem}>CLIENT LOGO</div>
                <div className={styles.logoItem}>CLIENT LOGO</div>
            </div>

            <div className={styles.ctaWrapper}>
                <p className={styles.ctaText}>そろそろ、本物のクオリティに触れてください。</p>
                <a href="#contact" className={styles.ctaButton}>無料戦略ミーティングに申し込む</a>
            </div>
        </Section>
    );
}
