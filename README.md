# Meet Brief - AI Meeting Intelligence System

A full-stack Google Meet productivity platform built with Cloudflare Workers, NVIDIA NIM, and Next.js.

## Components

### 1. Cloudflare Workers Backend (`/worker`)
- **Stack**: Hono.js, D1 (SQLite), Drizzle ORM, KV, R2.
- **Setup**:
  1. `cd worker`
  2. `npm install`
  3. Create D1 database: `npx wrangler d1 create meet-brief-db`
  4. Create KV namespace: `npx wrangler kv:namespace create SESSIONS`
  5. Update `wrangler.toml` with the generated IDs.
  6. Run migrations: `npx drizzle-kit generate:sqlite` (then manually run SQL in wrangler d1 or setup drizzle-kit properly for D1).
     *Shortcut*: `npx wrangler d1 execute meet-brief-db --file=./migrations/0000_initial.sql`
  7. Deploy: `npx wrangler deploy`

### 2. Chrome Extension (`/extension`)
- **Stack**: Manifest V3, Content Scripts.
- **Setup**:
  1. Open Chrome Extensions (`chrome://extensions/`).
  2. Enable "Developer mode".
  3. Click "Load unpacked" and select the `extension` folder.
  4. Configure `API_URL` in `background.js` if deploying the worker.

### 3. Next.js Dashboard (`/frontend`)
- **Stack**: Next.js 14, Tailwind CSS.
- **Setup**:
  1. `cd frontend`
  2. `npm install`
  3. Set `NEXT_PUBLIC_API_URL` in `.env.local`.
  4. Run: `npm run dev`

## AI Integration
- **Primary**: NVIDIA NIM (Llama 3.1 70B).
- **Fallback**: AgentRouter API.
- Prompting is optimized for structured JSON output to feed directly into the dashboard.

## Free Tier Usage
- Respects Cloudflare Workers (100k/day), D1, KV, and R2 free limits.
- Uses NVIDIA NIM free tier API credits.
- Vercel Hobby plan for frontend deployment.