# Machine Vision Research Project — Website

Website for **AI-Driven Machine Vision for Quality Control and Waste Reduction in Small-Scale Food Processing Manufacturing in Rwanda and Malawi**, a research collaboration between the University of Rwanda and the University of Malawi.

The theme follows the University of Rwanda's website (ur.ac.rw): white background, UR blue `#1a76d1`, deep blue `#00628b`, Poppins headings.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
```

## Build and run

```bash
npm run build
npm start
```

Note: the site uses server routes for news/team data, so it needs a Node server (`npm start` or a host like Vercel/Railway). It is not a static export.

## Admin

Go to `/admin` to manage the site without touching code:

- **News** — add, edit, delete items, with optional images
- **Collaborators** — names, roles, institutions and photos
- **Partners** — the partner list on the team page
- **Site text** — homepage headline, subheading, "the problem" paragraph, and the contact email

Changes appear on the site immediately.

- Default admin key: `ur-unima-2026`
- Change it by setting the `ADMIN_KEY` environment variable (e.g. in `.env.local`):

```
ADMIN_KEY=your-secret-key
```

Content is stored in Supabase (project `ncst-website`): a `site_content` table for news/collaborators/partners/site text and an `uploads` storage bucket for photos. The JSON files in `data/` are the original seed content, kept as a backup. See `DEPLOYMENT.md` for hosting (free on Vercel + Supabase).

Local development needs a `.env.local` with `SUPABASE_URL` and `SUPABASE_KEY` (never commit this file).

## Performance note

`npm run dev` compiles each page the first time you open it, which feels slow. For real-world speed run the production build (`npm run build` then `npm start`) — all pages are served as cached static HTML.

## Pages

| Route | Content |
|---|---|
| `/` | 3D conveyor hero, the problem, interactive system architecture, timeline, latest news |
| `/machine-vision` | Inspection pipeline, detection demo, defect classes |
| `/maintenance` | Simulated maintenance dashboard, Musanze mill case study |
| `/impact` | Impact figures, research questions, research outputs |
| `/news` | All project news |
| `/team` | Investigators (admin-managed, with photos) and partners |
| `/contact` | Contact form and map |
| `/admin` | Content management (key required) |

Content comes from the NCST project proposal (the `.docx` in the parent folder). The contact form drafts an email to `info@ur.ac.rw`; change this in `components/ContactContent.tsx` if the project gets its own address.
