# DesignHaven Studio

Production website and content-management dashboard for DesignHaven Studio.

## Stack
- Next.js App Router
- React
- Supabase Postgres, Storage and Edge Functions
- Vercel

## Local development
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Admin onboarding
Open `/admin/setup` and use the one-time setup token issued during deployment. After the owner account is created, sign in at `/admin/login`.

## Main routes
- `/` public website
- `/work` portfolio
- `/pricing` packages
- `/about` studio information
- `/contact` quotation request
- `/admin` dashboard

The repository intentionally contains no private API keys. Admin sessions are issued by the isolated DesignHaven backend and stored in secure HTTP-only cookies.
