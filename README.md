# RolegacyAI — Website

> **The AI memory layer that stays when people leave.**

This is the public-facing website for [RolegacyAI](https://rolegacyai.com) — a role-scoped institutional memory platform that helps organisations preserve role knowledge, speed up onboarding, and compound institutional intelligence across successive role holders.

---

## Project overview

RolegacyAI helps organisations answer a difficult question: *what does this role actually know?* Not what's in the wiki. Not what's in someone's head. What the role itself has accumulated — decisions, lessons, workarounds, operational patterns — from every person who has ever held it.

This website is the discovery phase landing page, designed to validate the problem with HR, IT, operations, asset management, enterprise architecture, and delivery leaders.

---

## Local preview

No build step required. Open directly in a browser or use a simple local server:

**Option 1 — VS Code Live Server**
Install the Live Server extension and click "Go Live" at the bottom of the editor.

**Option 2 — Python (Python 3)**
```bash
cd rolegacyai-site
python3 -m http.server 8080
# Open http://localhost:8080
```

**Option 3 — Node.js (npx)**
```bash
cd rolegacyai-site
npx serve .
# Open the URL shown in your terminal
```

---

## GitHub Pages deployment

This site is configured for GitHub Pages via the `rolegacyai/rolegacyai.github.io` repository.

### Deploy steps

1. **Ensure your repository is named** `rolegacyai.github.io` under the `rolegacyai` organisation.
2. **Push all files** from this folder to the `main` branch of that repository.
3. **Enable GitHub Pages** in repository Settings → Pages → Source: `main` branch, `/ (root)` folder.
4. GitHub will automatically build and publish. The site will be live at `https://rolegacyai.github.io` within 1–2 minutes.

### Custom domain

To use `rolegacyai.com`:

1. Ensure DNS is configured before adding the CNAME file:
   - Add an `A` record pointing to GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - OR add a `CNAME` record pointing `www` to `rolegacyai.github.io`
2. Only after DNS is propagated: keep the `CNAME` file in this repository (it contains `rolegacyai.com`).
3. In GitHub Pages settings, enter `rolegacyai.com` as the custom domain and enable HTTPS.

> **Important:** Do not include the `CNAME` file in the repo until your DNS is properly configured. GitHub Pages will fail to verify the domain otherwise and your site may become unavailable.

---

## Replace the Tally form URL

The discovery cohort form is currently a placeholder. To activate it:

1. Create your form at [tally.so](https://tally.so)
2. Copy your form URL (format: `https://tally.so/r/YOUR_FORM_ID`)
3. Find and replace all instances of `https://tally.so/r/REPLACE_ME` in `index.html` with your real URL
4. There are **three** instances: hero CTA, nav CTA, and cohort section CTA

---

## File structure

```
rolegacyai-site/
├── index.html          # Main HTML — all sections and content
├── styles.css          # All styling — dark theme, responsive, animations
├── script.js           # Scroll reveal, hero animation, nav behaviour
├── CNAME               # Custom domain — only include after DNS is ready
├── README.md           # This file
└── assets/
    ├── favicon.svg     # SVG favicon (placeholder)
    ├── favicon.png     # PNG favicon (placeholder — generate from SVG)
    └── og-image.png    # Open Graph image for social sharing (placeholder)
```

---

## Assets to add

The following placeholder assets should be created before launch:

| File | Dimensions | Notes |
|------|-----------|-------|
| `assets/favicon.svg` | — | SVG favicon — can use the logo mark SVG inline in index.html |
| `assets/favicon.png` | 32×32 / 64×64 | PNG version of favicon |
| `assets/og-image.png` | 1200×630 | Open Graph social sharing card — dark background, logo, tagline |

---

## Design principles

**Role succession, not individual excellence.** The visual language (stick-figure evolution) communicates that the role — not any one person — accumulates intelligence over time. Figures are varied, neutral silhouettes. No superpowers. No heroes.

**Premium enterprise AI aesthetic.** Dark charcoal (`#0f0f10`), off-white line art (`#e7e5e4`), muted amber/gold accents (`#d4a373`, `#f2c14e`). No teal. No cyberpunk. No robots. Professional and considered.

**Privacy is foundational.** The personal layer and role layer separation is a design principle, not a feature. The UI communicates this structurally.

**No build step.** Plain HTML, CSS, and JavaScript. No framework dependencies. Fast loading, easy to audit, easy to maintain.

---

## Colour palette

| Role | Hex |
|------|-----|
| Background | `#0f0f10` |
| Panels | `#18181b` |
| Primary text | `#f4f4f5` |
| Secondary text | `#a1a1aa` |
| Line art | `#e7e5e4` |
| Accent amber | `#d4a373` |
| Gold | `#f2c14e` |
| Deep blue | `#334155` |
| Muted green | `#4d7c0f` |
| Muted red | `#991b1b` |

---

## Typography

- **Headings:** Space Grotesk (Google Fonts) — weight 300, 400, 500, 600, 700
- **Body:** Inter (Google Fonts) — weight 300, 400, 500, 600

---

## Next steps

### Discovery phase
- [ ] Replace `REPLACE_ME` in Tally form URLs with live form ID
- [ ] Create and add `assets/og-image.png` (1200×630)
- [ ] Create and add `assets/favicon.png`
- [ ] Configure DNS and re-enable `CNAME` file
- [ ] Set up LinkedIn company page and update footer link

### Post-discovery
- [ ] Add analytics (privacy-respecting — e.g. Plausible, Fathom, or similar)
- [ ] Add form confirmation / thank-you state handling
- [ ] Expand privacy-first architecture section with more technical detail
- [ ] Consider a dedicated `/principles` page once product direction is confirmed
- [ ] Add testimonials / early adopter quotes section once discovery cohort is underway

---

## Contact

Discovery cohort: [Join via Tally](https://tally.so/r/REPLACE_ME)  
General: hello@rolegacyai.com
