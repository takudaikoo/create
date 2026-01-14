"use client";

import { useState } from 'react';
import Section from './Section';
import styles from './ProcessFAQ.module.css';

const STEPS = [
    { title: 'ヒアリング・戦略策定', num: '01' },
    { title: 'ロケーション・絵コンテ', num: '02' },
    { title: '撮影（ドローン/地上波）', num: '03' },
    { title: '編集・納品', num: '04' },
];

export default function ProcessFAQ() {
    const [faqOpen, setFaqOpen] = useState(false);

    return (
        <>
            <Section className={styles.processSection}>
                <h2 className={styles.title}>至高のアウトプットを生む、4つのプロセス。</h2>
                <div className={styles.processSteps}>
                    <div className={styles.line}></div>
                    {STEPS.map((step, i) => (
                        <div key={i} className={styles.step}>
                            <div className={styles.stepNum}>Step.{step.num}</div>
                            <div className={styles.stepTitle}>{step.title}</div>
                            <div className={styles.dot}></div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section className={styles.faqSection}>
                <div className={styles.faqItem}>
                    <button className={styles.faqQuestion} onClick={() => setFaqOpen(!faqOpen)}>
                        <span>Q. 予算はどのくらい必要ですか？</span>
                        <span>{faqOpen ? '−' : '＋'}</span>
                    </button>
                    <div className={`${styles.faqAnswer} ${faqOpen ? styles.open : ''}`}>
                        <p>
                            私たちは安さを売りにしていません。しかし、得られるブランドリフト効果（資産価値）を考えれば、
                            最もコストパフォーマンスの高い投資となります。詳細はお問い合わせください。
                        </p>
                    </div>
                </div>
            </Section>

            <Section className={styles.finalCtaSection} id="contact">
                <div className={styles.finalCtaContent}>
                    <h2 className={styles.finalTitle}>あなたのビジネスは、もっと美しくなれる。</h2>
                    <p className={styles.finalNote}>
                        制作枠には限りがあります。クオリティ維持のため、月間5社のみの受付とさせていただいております。
                    </p>
                    <a href="mailto:contact@example.com" className={styles.finalButton}>
                        今すぐ戦略ミーティングを予約する
                    </a>
                </div>
            </Section>
        </>
    );
}
