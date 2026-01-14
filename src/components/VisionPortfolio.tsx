import React from 'react';
import Section from './Section';
import styles from './VisionPortfolio.module.css';

export default function VisionPortfolio() {
    return (
        <>
            <Section className={styles.visionSection}>
                <div className={styles.visionContent}>
                    <h2 className={styles.visionTitle}>美しさは、最強の機能である。</h2>
                    <p className={styles.visionText}>
                        日本から世界へ挑むベンチャー企業の背中を、映像の力で押したい。<br />
                        妥協なきクリエイティブが、あなたのビジネスの「翼」になると信じているから。
                    </p>
                </div>
            </Section>

            <Section className={styles.portfolioSection} id="portfolio">
                <h2 className={styles.portfolioTitle}>言葉よりも、雄弁な事実を。</h2>

                <div className={styles.grid}>
                    {/* Example items */}
                    {['Architecture', 'Automotive', 'Technology', 'Fashion'].map((cat, i) => (
                        <div key={i} className={styles.portfolioItem}>
                            <div className={styles.thumbnail} style={{ backgroundColor: `#222` }}>
                                <div className={styles.playIcon}>▶</div>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.category}>Industry: {cat}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </>
    );
}
