1️⃣ Install Node.js
-----------------------------------------
Make sure Node.js is installed Check:

node -v
npm -v

2️⃣ Create Project using Next.js
------------------------------------------
Run this command:

npx create-next-app@latest .
3 . --------------------------------------
```readly_bookstore/
│── app/
│   ├── page.js        // Home page
│   ├── layout.js      // Layout
│
│── components/        // Your reusable components
│── public/            // Images
│── styles/            // CSS
```

4. Install tailwind css 
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Monolithic Architecture of my Project :
```
readly-bookstore/
│
├── frontend/ (Next.js / React)
│   ├── pages/
│   ├── components/
│   └── services/ (API calls)
│
├── backend/ (Spring Boot / Node.js)
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   └── models/
│
├── database/
│   └── schema.sql
│
└── config/
```






























