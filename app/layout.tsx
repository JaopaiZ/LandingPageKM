import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://king-movie.vercel.app'),
  title: 'KING MOVIE | แพ็กเกจพรีเมียมสุดคุ้ม สำหรับสายดูหนัง/ซีรีย์',
  description:
    'KING MOVIE บริการสมาชิกพรีเมียมและแพ็กเกจดูหนัง-ซีรีย์ เลือกระยะเวลา 1/3/6/12 เดือน หรือรายปี พร้อมดูแลตลอดการใช้งาน',
  openGraph: {
    title: 'KING MOVIE | แพ็กเกจพรีเมียมสุดคุ้ม',
    description:
      'เลือกแพ็กเกจดูหนัง-ซีรีย์แบบพรีเมียม พร้อมตัวเลือกระยะเวลา 1/3/6/12 เดือน และรายปี',
    type: 'website',
    locale: 'th_TH',
    url: 'https://king-movie.vercel.app'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
