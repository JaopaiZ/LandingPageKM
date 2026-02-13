# KING MOVIE Landing Page (Astro + Tailwind)

Landing Page หน้าเดียวแบบ Static สำหรับใช้งานจริง (Production-ready) และพร้อม Deploy บน Vercel

## Tech Stack
- Astro (Static Site)
- Tailwind CSS
- Frontend only (ไม่มี Backend / DB / Admin)

## ติดตั้งและรันในเครื่อง
```bash
npm install
npm run dev
```
เปิดที่ `http://localhost:4321`

## Build/Preview
```bash
npm run build
npm run preview
```

## โครงสร้างโปรเจกต์
```text
.
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
├── public
│   └── img
│       └── (วางไฟล์รูปจริงตอน deploy เช่น packages-collage.png)
├── src
│   ├── data
│   │   ├── bundles.json
│   │   ├── packages.json
│   │   └── site.json
│   ├── pages
│   │   └── index.astro
│   └── styles
│       └── global.css
└── README.md
```

## จุดสำคัญของการแก้ข้อมูล (Data-driven)
แก้ราคา/เพิ่มแพ็ก/เพิ่มโปรได้จากไฟล์ data เท่านั้น
- `src/data/packages.json` → แพ็กเดี่ยว + ราคาแต่ละระยะเวลา
- `src/data/bundles.json` → โปรจับคู่ + promoPrice
- `src/data/site.json` → ข้อความหลักของเว็บ + LINE URL + disclaimer

## Deploy บน Vercel (ทีละขั้น)
1. Push โปรเจกต์ขึ้น GitHub/GitLab/Bitbucket
2. เข้า [https://vercel.com](https://vercel.com)
3. กด **Add New Project** แล้วเลือก repository
4. Vercel ตรวจจับ Astro อัตโนมัติ
5. ตรวจค่าหลัก
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. กด **Deploy**

เสร็จแล้วจะได้ URL สำหรับใช้งานจริงทันที

## หมายเหตุ
- CTA LINE ทุกปุ่มในหน้าเว็บลิงก์ไป: `https://lin.ee/XIPImHB`
- ไม่มีการอ้างว่าเป็นตัวแทนอย่างเป็นทางการของแพลตฟอร์มต้นทาง


## หมายเหตุไฟล์ภาพ
- ใน repository นี้ตั้งค่า `.gitignore` ให้ไม่ track ไฟล์ภาพไบนารีใน `public/img/*`
- สามารถอัปโหลดไฟล์จริงในขั้นตอน deploy หรือเก็บผ่าน asset storage/CDN ตาม workflow ทีม
