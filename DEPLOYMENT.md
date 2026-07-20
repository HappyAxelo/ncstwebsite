# Deployment Guide

The site needs two things from a host:

1. A **Node.js server** (it is not a static site — the admin page saves data through server routes)
2. A **persistent disk** for the `data/` folder (news, collaborators, partners, site text, uploaded photos)

**Railway** (railway.com) is the recommended host: it meets both requirements, deploys straight from GitHub, includes free SSL, and costs about **$5/month** on the Hobby plan. Render.com (Starter + disk, ~$7/month) is a good alternative; both are far simpler to operate than a raw VPS. Free tiers are not suitable — they lose the `data/` folder on every restart, which would delete everything added through the admin page.

## Step 1 — Put the code on GitHub

1. Create a GitHub account at github.com if you don't have one.
2. Install GitHub Desktop (desktop.github.com) and sign in.
3. File → Add local repository → choose `Desktop\NCST website\site`.
4. Publish repository (keep "private" ticked).

## Step 2 — Deploy on Railway

1. Go to railway.com and sign up **with your GitHub account**.
2. New Project → **Deploy from GitHub repo** → select the `site` repository.
3. Railway detects the Dockerfile and builds automatically. Wait for the build to finish.
4. Add the persistent disk: right-click the service → **Attach volume** → mount path: `/app/data`.
5. Set the admin key: service → **Variables** → add `ADMIN_KEY` = a strong secret of your choosing (this replaces `ur-unima-2026`).
6. Service → **Settings → Networking → Generate Domain**. The site is now live at `something.up.railway.app` with SSL — this URL is enough for the PI's staging review.

## Step 3 — Custom domain and SSL (production deliverable)

Best option, in order:

1. **A ur.ac.rw subdomain** (free, most credible). Write to the UR ICT directorate requesting a subdomain such as `machinevision.ur.ac.rw`, pointed as a CNAME to your Railway domain. In Railway: Settings → Networking → Custom Domain → enter the subdomain; Railway shows the CNAME target to give ICT. SSL is issued automatically once DNS is set.
2. **A .rw domain** (~20,000 FRW/year from a RICTA-accredited registrar) or a **.org** (~15,000 FRW/year from any registrar). Add it in Railway the same way.

## Step 4 — After deployment

- Log in to `https://your-domain/admin` with your new `ADMIN_KEY` and add real content (news, photos).
- Back up occasionally: Railway → service → volume, or keep copies of `data/` exports.
- Redeploys are automatic: any change pushed to GitHub rebuilds the site. Content in `data/` is untouched because it lives on the volume.

## Costs summary (for the budget request)

| Item | Cost | Notes |
|---|---|---|
| Railway Hobby plan | ~$5/month (≈ 7,000 FRW) | Hosting, SSL included |
| Domain | 0–20,000 FRW/year | Free if UR ICT provides a subdomain |
| GitHub | Free | Private repository |

Total: roughly **85,000–105,000 FRW per year** depending on the domain choice.
