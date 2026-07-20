# Deployment Guide

The site runs **free** on this combination:

- **Vercel** (free Hobby plan) — hosts the website. Made by the creators of Next.js.
- **Supabase** (free plan) — stores the admin content: news, collaborators, partners, site text, and uploaded photos. Already set up in project `ncst-website` (https://njpgxaxpwngjfokmvkuk.supabase.co).

The code lives at https://github.com/HappyAxelo/ncstwebsite. Every push to `main` redeploys the site automatically.

## Deploy on Vercel (one-time, ~5 minutes)

1. Go to **vercel.com** → Sign Up → **Continue with GitHub**.
2. Click **Add New → Project** → import **HappyAxelo/ncstwebsite**.
3. Before clicking Deploy, open **Environment Variables** and add these three:

   | Name | Value |
   |---|---|
   | `SUPABASE_URL` | `https://njpgxaxpwngjfokmvkuk.supabase.co` |
   | `SUPABASE_KEY` | the anon key — copy it from supabase.com → project `ncst-website` → Settings → API Keys (or from `.env.local` on the development computer) |
   | `ADMIN_KEY` | a new secret password of your choice — this becomes the admin page login |

4. Click **Deploy**. After a few minutes the site is live at `https://ncstwebsite.vercel.app` (or similar) with SSL included.

## Custom domain (production deliverable)

1. **Best: a ur.ac.rw subdomain (free).** Ask the UR ICT directorate for e.g. `machinevision.ur.ac.rw` pointed as a CNAME to `cname.vercel-dns.com`. Then in Vercel: Project → Settings → Domains → add the subdomain. SSL is automatic.
2. Alternatively buy a `.rw` (~20,000 FRW/year, RICTA registrar) or `.org` domain and add it the same way.

## How content stays safe

- All admin content lives in Supabase, not on the web server — redeploys never touch it.
- A daily automatic ping (`/api/keepalive`, configured in `vercel.json`) keeps the free Supabase project from pausing due to inactivity.
- Backup: supabase.com → project → Database → download a backup occasionally, or export the `site_content` table.

## Costs

| Item | Cost |
|---|---|
| Vercel Hobby | Free |
| Supabase Free plan | Free |
| GitHub | Free |
| Domain | Free (UR subdomain) or ~15,000–20,000 FRW/year |

Fine print: free plans are generous for a project site of this size (Supabase: 500 MB database + 1 GB file storage; Vercel: 100 GB bandwidth/month). If the site ever outgrows them, both providers have paid tiers, or use the Dockerfile in this repository to move to any Node host (e.g. Railway) without code changes to pages — only `lib/store.ts` would need switching back to file storage.
