# CodeGrid — Portfolio

A static, bilingual (Turkish / English) marketing site for **CodeGrid**: services, featured projects, GitHub highlights, and a contact form. A dedicated **[projects.html](projects.html)** page lists the full project catalog.

## Tech stack

- **HTML**, **CSS**, **JavaScript** (no build step)
- **i18n** via `data-i18n` keys and `script.js` translation maps
- **Botpress** webchat (loaded on the main site and projects page)
- **Contact API**: [Resend](https://resend.com) for outbound email

## Repository layout

| Path | Purpose |
|------|---------|
| `index.html` | Landing page (hero, about, featured projects, services, GitHub, contact) |
| `projects.html` | Full project grid + shared navbar / language switcher |
| `style.css` | Global styles |
| `script.js` | i18n, navigation, scroll, particles, contact form `fetch` |
| `sitepics/` | Project preview images (`.avif`) |
| `siteicons/` | Per-project favicons (`.ico`) for cards |
| `favicon.ico` | Site tab icon |
| `api/contact.js` | **Vercel** serverless route — `POST /api/contact` |
| `netlify/functions/contact.js` | **Netlify** serverless function (same Resend flow) |
| `netlify.toml` | Netlify publish root + functions directory |

## Local preview

Any static file server works, for example:

```bash
npx serve .
# or open index.html with VS Code Live Server, etc.
```

- Main page: `/index.html`
- All projects: `/projects.html`

## Contact form (production)

The form posts JSON to **`/api/contact`** (`script.js`).

### Vercel

Uses **`api/contact.js`**. Set environment variables in the project dashboard:

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_EMAIL` | Inbox that receives submissions |

### Netlify

Uses **`netlify/functions/contact.js`**. Configure the same variables under **Site settings → Environment variables**.  
By default Netlify exposes functions at `/.netlify/functions/<name>`. To keep `/api/contact` working on Netlify, add a redirect (e.g. in `_redirects` or `netlify.toml`) from `/api/contact` to `/.netlify/functions/contact` if you deploy there.

## Deployment notes

- **Root publish**: the site is designed to be served from the repository root (`publish = "."` on Netlify).
- **Assets**: keep previews under `sitepics/` and card icons under `siteicons/` so paths in HTML stay stable.
- **CORS**: the Vercel handler sets permissive CORS for the contact endpoint; adjust if you lock the site to a single origin.

## License & branding

Content and branding belong to the site owner unless stated otherwise. Third-party scripts (fonts, Botpress, Resend API) are subject to their respective terms.

---

**Is a README necessary for a portfolio?**  
Not strictly required for the site to run, but on GitHub it is **recommended**: it documents structure, env vars, and how to run or redeploy the project—useful for you later, for recruiters, and for anyone forking or auditing the repo.
