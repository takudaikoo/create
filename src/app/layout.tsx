import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Premium Video Strategy',
    description: '映像の『格』が、企業の『格』を決める。',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    );
}
