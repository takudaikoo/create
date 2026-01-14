import React from 'react';
import Section from './Section';
import styles from './USP.module.css';

export default function USP() {
    return (
        <Section className={styles.uspSection}>
            <h2 className={styles.title}>選ばれた企業だけが手にする、3つの特権。</h2>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <div className={styles.icon}>Immersive</div>
                    <h3>圧倒的没入感</h3>
                    <p>脳裏に焼き付く、ドローン・ダイナミクス技術。</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>Branding</div>
                    <h3>ブランド設計力</h3>
                    <p>マーケティング視点に基づいた、成約へ導く構成。</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>Bespoke</div>
                    <h3>完全オーダーメイド</h3>
                    <p>テンプレート不使用。一社一社の「色」をゼロから調合。</p>
                </div>
            </div>

            <div className={styles.beforeAfter}>
                <p className={styles.baLabel}>映像が変われば、顧客の「目」が変わる。</p>
                <div className={styles.metrics}>
                    <div className={styles.metricItem}>
                        <span className={styles.metricVal}>300%</span>
                        <span className={styles.metricLabel}>採用エントリー増</span>
                    </div>
                    <div className={styles.metricItem}>
                        <span className={styles.metricVal}>2x</span>
                        <span className={styles.metricLabel}>商談成約率</span>
                    </div>
                    <div className={styles.metricItem}>
                        <span className={styles.metricVal}>Success</span>
                        <span className={styles.metricLabel}>資金調達成功</span>
                    </div>
                </div>
            </div>
        </Section>
    );
}
