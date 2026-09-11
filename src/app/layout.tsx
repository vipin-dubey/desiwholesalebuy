import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Desi Bulk Club Norway | Wholesale Indian & Pakistani Groceries',
  description:
    'Community group buying for Indian and Pakistani groceries (Atta, Basmati, Ghee, Daal, Spices, Snacks, Pickles) directly from verified Norwegian wholesalers delivered to your apartment complex.',
  keywords: [
    'indian grocery norway',
    'pakistani groceries oslo',
    'aashirvaad atta norway',
    'basmati rice wholesale',
    'amul ghee oslo',
    'community group buying norway',
    'desi bulk club',
    'indian food oslo',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
