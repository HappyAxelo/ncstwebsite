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

Data is stored as JSON files in `data/`. Uploaded images go to `data/uploads/`. Back up both when moving hosts.

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
