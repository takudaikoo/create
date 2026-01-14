import React from 'react';
import Section from './Section';
import styles from './Comparison.module.css';

export default function Comparison() {
    return (
        <Section className={styles.comparisonSection}>
            <h2 className={styles.title}>なぜ、他社ではこのクオリティが出せないのか？</h2>
            <p className={styles.subtitle}>
                多くの制作会社は「機材」を売りにする。私たちは「美学」を売りにする。<br />
                ただ飛ばすだけのドローン撮影と、計算し尽くされた「空の建築学」の違い。
            </p>

            <div className={styles.comparisonContainer}>
                <div className={styles.comparisonBox}>
                    <h3 className={styles.compTitle}>一般的な映像</h3>
                    <ul className={styles.compList}>
                        <li>× 画質が良いだけ</li>
                        <li>× テンプレート通りの構成</li>
                        <li>× 説明的で退屈</li>
                        <li>× 「記録」としての映像</li>
                    </ul>
                </div>
                <div className={`${styles.comparisonBox} ${styles.highlight}`}>
                    <h3 className={styles.compTitle}>貴社の映像 (Our Work)</h3>
                    <ul className={styles.compList}>
                        <li>○ 脳裏に焼き付く「画」</li>
                        <li>○ 感情を揺さぶる「演出」</li>
                        <li>○ 企業の格を上げる「芸術」</li>
                        <li>○ 「資産」としての映像</li>
                    </ul>
                </div>
            </div>
        </Section>
    );
}
