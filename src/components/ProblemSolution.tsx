import React from 'react';
import Section from './Section';
import styles from './ProblemSolution.module.css';

export default function ProblemSolution() {
    return (
        <>
            <Section className={styles.problemSection}>
                <div className={styles.content}>
                    <p className={styles.problemCopy}>
                        世界を変える技術を持っているのに、<br />なぜ「見た目」で損をするのか？
                    </p>
                    <p className={styles.problemSubCopy}>
                        「ありきたりな構図」「チープな画質」「退屈な構成」……<br />
                        その映像が、企業の信頼を削いでいます。
                    </p>
                </div>
            </Section>

            <Section className={styles.agitationSection}>
                <div className={styles.content}>
                    <p className={styles.agitationTitle}>原因は、制作会社が「ビジネス」を理解していないからだ。</p>
                    <p className={styles.agitationText}>
                        単にカメラを回すだけの制作会社に、あなたのビジョンは描けない。<br />
                        必要なのは「記録」ではなく「演出」です。
                    </p>
                </div>
            </Section>

            <Section className={styles.solutionSection}>
                <div className={styles.solutionContent}>
                    <p className={styles.solutionCopy}>
                        視点を変えれば、世界は変わる。
                    </p>
                    <h2 className={styles.solutionTitle}>ドローン空撮 × シネマティックデザイン</h2>
                    <p className={styles.solutionText}>
                        あなたのビジネスを「アート」の領域まで昇華させ、<br />
                        競合他社を過去のものにする。
                    </p>
                </div>
            </Section>
        </>
    );
}
