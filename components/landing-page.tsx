'use client';

import { useMemo, useState } from 'react';

type DurationKey = 'm1' | 'm3' | 'm6' | 'm12' | 'y1';

type PackageItem = {
  id: string;
  name: string;
  tags: string[];
  highlights: string[];
  prices: Record<DurationKey, number>;
  bestValue: DurationKey;
};

const LINE_LINK = 'https://lin.ee/XIPImHB';

const durationLabels: Record<DurationKey, string> = {
  m1: '1 เดือน',
  m3: '3 เดือน',
  m6: '6 เดือน',
  m12: '12 เดือน',
  y1: 'รายปี'
};

const packages: PackageItem[] = [
  {
    id: 'netflix-premium-no-tv',
    name: 'Netflix Premium 4K (ยกเว้น TV)',
    tags: ['4K', 'Premium'],
    highlights: ['เหมาะสำหรับมือถือ/แท็บเล็ต/คอม', 'ดูหลายโปรไฟล์ได้', 'ภาพคมชัดระดับสูง'],
    prices: { m1: 159, m3: 429, m6: 799, m12: 1490, y1: 1690 },
    bestValue: 'm12'
  },
  {
    id: 'netflix-premium-tv',
    name: 'Netflix Premium 4K (ทุกอุปกรณ์ + TV)',
    tags: ['4K', 'TV', 'Premium'],
    highlights: ['รองรับการดูผ่าน TV', 'รองรับทุกอุปกรณ์หลัก', 'เหมาะกับบ้านที่ดูร่วมกัน'],
    prices: { m1: 209, m3: 569, m6: 1090, m12: 1990, y1: 2290 },
    bestValue: 'm12'
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    tags: ['Premium'],
    highlights: ['ไม่มีโฆษณาคั่น', 'เล่นพื้นหลังได้', 'เหมาะกับสายฟังเพลง/วิดีโอ'],
    prices: { m1: 89, m3: 239, m6: 449, m12: 829, y1: 990 },
    bestValue: 'y1'
  },
  {
    id: 'disney-hotstar',
    name: 'Disney+ Hotstar 4K',
    tags: ['4K', 'Premium'],
    highlights: ['คอนเทนต์หลากหลาย', 'รองรับความละเอียดสูง', 'เหมาะสำหรับครอบครัว'],
    prices: { m1: 119, m3: 329, m6: 619, m12: 1090, y1: 1290 },
    bestValue: 'm12'
  },
  {
    id: 'hbo-max',
    name: 'HBO Max 4K',
    tags: ['4K', 'Premium'],
    highlights: ['ซีรีย์คุณภาพสูง', 'ภาพคมชัด', 'เหมาะกับสายคอนเทนต์เข้มข้น'],
    prices: { m1: 129, m3: 359, m6: 679, m12: 1250, y1: 1490 },
    bestValue: 'm12'
  },
  {
    id: 'viu',
    name: 'Viu 4K',
    tags: ['4K'],
    highlights: ['ซีรีย์เอเชียหลากหลาย', 'ดูต่อเนื่องลื่นไหล', 'เหมาะกับสายซีรีย์เกาหลี/เอเชีย'],
    prices: { m1: 79, m3: 219, m6: 419, m12: 769, y1: 899 },
    bestValue: 'y1'
  },
  {
    id: 'prime-video',
    name: 'Prime Video 4K',
    tags: ['4K', 'Premium'],
    highlights: ['หนังและซีรีย์อัปเดตสม่ำเสมอ', 'รองรับ 4K', 'เหมาะกับผู้ชมหลากหลายแนว'],
    prices: { m1: 99, m3: 279, m6: 529, m12: 959, y1: 1090 },
    bestValue: 'm12'
  },
  {
    id: 'iqiyi',
    name: 'iQIYI 爱奇艺 4K',
    tags: ['4K', 'Premium'],
    highlights: ['ซีรีย์จีน/เอเชียยอดนิยม', 'ดูต่อเนื่องไม่มีสะดุด', 'คุณภาพคมชัด'],
    prices: { m1: 89, m3: 249, m6: 469, m12: 859, y1: 990 },
    bestValue: 'm12'
  },
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    tags: ['Premium'],
    highlights: ['ใช้งานเครื่องมือ AI ได้ลื่นขึ้น', 'เหมาะกับงานเรียน/งานธุรกิจ', 'รองรับการใช้งานต่อเนื่อง'],
    prices: { m1: 259, m3: 729, m6: 1390, m12: 2590, y1: 2990 },
    bestValue: 'm12'
  }
];

const faqs = [
  {
    q: 'แพ็กเกจเริ่มใช้งานได้เมื่อไร?',
    a: 'หลังยืนยันข้อมูลและชำระเงินแล้ว ทีมงานจะเริ่มดำเนินการให้โดยเร็ว พร้อมแจ้งสถานะผ่าน LINE ทุกขั้นตอน'
  },
  {
    q: 'Netflix แพ็ก TV กับไม่รวม TV ต่างกันยังไง?',
    a: 'แพ็กที่รวม TV จะรองรับการใช้งานบนสมาร์ททีวีโดยตรง ส่วนแพ็กไม่รวม TV จะเน้นใช้งานบนมือถือ แท็บเล็ต และคอมพิวเตอร์'
  },
  {
    q: 'สามารถเปลี่ยนระยะเวลาแพ็กภายหลังได้ไหม?',
    a: 'ได้ สามารถติดต่อทีมงานเพื่ออัปเกรดหรือปรับระยะเวลาในรอบถัดไปให้เหมาะกับการใช้งานของคุณ'
  },
  {
    q: 'มีการดูแลหลังเริ่มใช้งานไหม?',
    a: 'มี ทีมงานดูแลต่อเนื่องตลอดแพ็กเกจและช่วยประสานงานเมื่อมีปัญหา'
  },
  {
    q: 'รองรับการใช้งานพร้อมกันหลายอุปกรณ์ไหม?',
    a: 'ขึ้นอยู่กับประเภทแพ็กและแพลตฟอร์มที่เลือก สามารถสอบถามเงื่อนไขก่อนสั่งซื้อได้'
  },
  {
    q: 'สามารถสั่งหลายแพ็กพร้อมกันได้หรือไม่?',
    a: 'ได้ เราสามารถจัดชุดแพ็กหลายบริการในครั้งเดียวเพื่อความคุ้มค่า'
  },
  {
    q: 'ช่องทางติดต่อหลักคืออะไร?',
    a: 'ติดต่อผ่าน LINE ได้ตลอดเพื่อรับคำแนะนำและอัปเดตสถานะ'
  },
  {
    q: 'มีค่าบริการแอบแฝงไหม?',
    a: 'ไม่มี ค่าบริการจะแจ้งชัดเจนตามแพ็กและระยะเวลาที่คุณเลือก'
  },
  {
    q: 'แพ็กเกจเหมาะกับลูกค้าแบบไหน?',
    a: 'เหมาะทั้งผู้ใช้งานส่วนตัว คู่รัก ครอบครัว และกลุ่มที่ต้องการความคุ้มค่าแบบยืดหยุ่น'
  },
  {
    q: 'ต้องเตรียมข้อมูลอะไรในการสั่งซื้อ?',
    a: 'โดยทั่วไปใช้ข้อมูลการติดต่อพื้นฐานและแพ็กที่ต้องการ ทีมงานจะอธิบายขั้นตอนให้ครบถ้วนก่อนเริ่ม'
  }
];

export default function LandingPage() {
  const [selectedDurations, setSelectedDurations] = useState<Record<string, DurationKey>>(
    Object.fromEntries(packages.map((item) => [item.id, 'm1']))
  );

  const localBusinessSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'KING MOVIE',
      description: 'บริการสมาชิกพรีเมียมและแพ็กเกจดูหนัง-ซีรีย์ พร้อมดูแลตลอดการใช้งาน',
      areaServed: 'TH',
      url: 'https://king-movie.vercel.app',
      sameAs: [LINE_LINK],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          url: LINE_LINK,
          availableLanguage: ['Thai']
        }
      ]
    }),
    []
  );

  return (
    <main className="pb-24">
      <section className="section-wrap pt-10 sm:pt-14">
        <div className="rounded-3xl border border-luxury-gold/30 bg-luxury-card/80 p-6 shadow-glow backdrop-blur md:p-10">
          <p className="mb-4 inline-flex rounded-full border border-luxury-gold/40 px-3 py-1 text-xs text-luxury-softGold">
            KING MOVIE · บริการสมาชิกพรีเมียม
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            แพ็กเกจพรีเมียมสุดคุ้ม สำหรับสายดูหนัง/ซีรีย์
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-zinc-300 sm:text-base">
            เลือกแพ็ก • เลือกระยะเวลา 1/3/6/12 เดือน หรือรายปี • ดูแลตลอดการใช้งาน
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={LINE_LINK}
              target="_blank"
              rel="noreferrer"
              className="gold-gradient rounded-xl px-6 py-3 text-center font-semibold text-black transition hover:opacity-90"
            >
              แอดไลน์สอบถาม
            </a>
            <a
              href="#packages"
              className="rounded-xl border border-luxury-gold/60 px-6 py-3 text-center font-semibold text-luxury-softGold transition hover:bg-luxury-gold/10"
            >
              ดูแพ็กเกจราคา
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs sm:text-sm">
            {['ตอบไว', 'ดูแลง่าย', 'คุ้มค่า'].map((badge) => (
              <div key={badge} className="rounded-xl border border-zinc-700 bg-black/20 px-3 py-2 text-zinc-200">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="section-wrap mt-14">
        <div className="mb-6 flex items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold sm:text-3xl">แพ็กเกจราคา</h2>
          <p className="text-xs text-zinc-400 sm:text-sm">เลือกแพ็กและระยะเวลาที่เหมาะกับคุณ</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((item) => {
            const currentDuration = selectedDurations[item.id];
            const price = item.prices[currentDuration];

            return (
              <article key={item.id} className="rounded-2xl border border-zinc-800 bg-luxury-card p-5 transition hover:-translate-y-1">
                <div className="mb-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <ul className="mt-3 space-y-1 text-sm text-zinc-300">
                  {item.highlights.map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>

                <div className="mt-4 md:hidden">
                  <label className="mb-1 block text-xs text-zinc-400">เลือกระยะเวลา</label>
                  <select
                    className="w-full rounded-lg border border-zinc-700 bg-black/40 p-2 text-sm"
                    value={currentDuration}
                    onChange={(e) =>
                      setSelectedDurations((prev) => ({ ...prev, [item.id]: e.target.value as DurationKey }))
                    }
                  >
                    {(Object.keys(durationLabels) as DurationKey[]).map((key) => (
                      <option key={key} value={key}>
                        {durationLabels[key]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 hidden flex-wrap gap-2 md:flex">
                  {(Object.keys(durationLabels) as DurationKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedDurations((prev) => ({ ...prev, [item.id]: key }))}
                      className={`rounded-lg px-3 py-1.5 text-xs transition ${
                        currentDuration === key
                          ? 'bg-luxury-gold text-black'
                          : 'border border-zinc-700 text-zinc-300 hover:border-luxury-gold/50'
                      }`}
                    >
                      {durationLabels[key]}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-400">ราคาแพ็กเกจ</p>
                    <p className="text-2xl font-bold text-luxury-softGold">฿{price.toLocaleString()}</p>
                    <p className="text-xs text-zinc-500">/{durationLabels[currentDuration]}</p>
                  </div>
                  {currentDuration === item.bestValue && (
                    <span className="animate-float rounded-full bg-luxury-gold px-3 py-1 text-xs font-semibold text-black">
                      คุ้มสุด
                    </span>
                  )}
                </div>

                <a
                  href={LINE_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 block rounded-xl bg-white/5 px-4 py-2.5 text-center text-sm font-semibold text-luxury-softGold ring-1 ring-luxury-gold/30 transition hover:bg-luxury-gold/15"
                >
                  แอดไลน์เพื่อสั่งซื้อ
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-wrap mt-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">จุดเด่นบริการ</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'ให้คำแนะนำแพ็กที่เหมาะกับงบประมาณ',
            'ตอบแชทไวในช่วงเวลาบริการ',
            'ขั้นตอนสั่งซื้อง่าย ไม่ซับซ้อน',
            'ดูแลการใช้งานต่อเนื่องตามแพ็ก',
            'ปรับแผนแพ็กเกจได้ในรอบถัดไป',
            'เน้นความคุ้มค่าและใช้งานจริง'
          ].map((benefit) => (
            <div key={benefit} className="rounded-xl border border-zinc-800 bg-luxury-card p-4 text-sm text-zinc-200">
              {benefit}
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap mt-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">ขั้นตอนการสั่งซื้อ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {['เลือกแพ็ก', 'เลือกระยะเวลา', 'ชำระเงิน', 'ส่งข้อมูล/เปิดใช้งาน + ดูแลต่อเนื่อง'].map((step, index) => (
            <div key={step} className="rounded-xl border border-zinc-800 bg-luxury-card p-4">
              <p className="text-xs text-luxury-gold">STEP {index + 1}</p>
              <p className="mt-2 text-sm text-zinc-200">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap mt-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">รีวิวจากผู้ใช้งาน</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            'แพ็กใช้งานลื่นดีมาก ทีมงานตอบเร็ว',
            'ขั้นตอนไม่ยุ่งยาก แนะนำดี',
            'เลือกระยะเวลาได้ยืดหยุ่น คุ้มค่า',
            'มีอัปเดตสถานะตลอด อุ่นใจ',
            'บริการเป็นกันเอง ดูแลต่อเนื่อง',
            'เหมาะกับคนที่อยากได้ความสะดวก'
          ].map((review, idx) => (
            <div key={review} className="rounded-xl border border-zinc-800 bg-luxury-card p-4">
              <p className="text-luxury-gold">★★★★★</p>
              <p className="mt-2 text-sm text-zinc-200">“{review}”</p>
              <p className="mt-3 text-xs text-zinc-500">ผู้ใช้งาน #{idx + 1}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap mt-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">คำถามที่พบบ่อย</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((item) => (
            <details key={item.q} className="rounded-xl border border-zinc-800 bg-luxury-card p-4">
              <summary className="cursor-pointer font-medium">{item.q}</summary>
              <p className="mt-2 text-sm text-zinc-300">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section-wrap mt-16">
        <div className="gold-gradient rounded-2xl p-[1px]">
          <div className="rounded-2xl bg-luxury-black p-6 text-center sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">พร้อมเลือกแพ็กที่เหมาะกับคุณแล้วหรือยัง?</h2>
            <p className="mt-3 text-sm text-zinc-300 sm:text-base">ทัก LINE เพื่อรับคำแนะนำแพ็ก + ระยะเวลาที่คุ้มที่สุดได้ทันที</p>
            <a
              href={LINE_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-xl bg-luxury-gold px-6 py-3 font-semibold text-black transition hover:opacity-90"
            >
              แอดไลน์สอบถามเลย
            </a>
          </div>
        </div>
      </section>

      <footer className="section-wrap mt-14 border-t border-zinc-800 pt-8 text-xs text-zinc-400 sm:text-sm">
        <p>
          KING MOVIE เป็นผู้ให้บริการดูแล/ตั้งค่าบัญชีตามแพ็กเกจที่ลูกค้าเลือก ไม่ใช่เจ้าของแพลตฟอร์มต้นทาง
        </p>
        <p className="mt-2">
          ติดต่อ: <a href={LINE_LINK} className="text-luxury-softGold">{LINE_LINK}</a>
        </p>
      </footer>

      <a
        href={LINE_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-luxury-gold px-4 py-3 text-sm font-bold text-black shadow-glow"
      >
        LINE
      </a>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </main>
  );
}
