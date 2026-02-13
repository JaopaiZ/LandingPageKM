# KING MOVIE Landing Page

โปรเจกต์หน้า Landing Page แบบ Single Page (Frontend Only) สำหรับแบรนด์ **KING MOVIE**

## เทคโนโลยี
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- พร้อม Deploy บน Vercel

## วิธีเริ่มใช้งานในเครื่อง
```bash
npm install
npm run dev
```
เปิดเว็บที่ `http://localhost:3000`

## คำสั่งที่ใช้บ่อย
```bash
npm run lint
npm run build
npm run start
```

## โครงสร้างไฟล์
```text
.
├── app
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   └── landing-page.tsx
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Deploy ขึ้น Vercel
1. Push โค้ดขึ้น Git repository ของคุณ
2. เข้า [vercel.com](https://vercel.com) แล้วกด **Add New Project**
3. เลือก repository นี้
4. Vercel จะตรวจจับ Next.js อัตโนมัติ (ไม่ต้องแก้ Build Command)
5. กด Deploy

หลัง Deploy เสร็จ จะได้ URL สำหรับใช้งานทันที

## หมายเหตุ
- หน้าเว็บนี้เป็น Frontend ล้วน ไม่มี Backend/Database/Admin
- ลิงก์ CTA หลักที่ใช้ทั้งหน้า:
  - `https://lin.ee/XIPImHB`
