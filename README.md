# LYGN — DJ Portfolio (static site)

A fast, self-contained portfolio site for **DJ LYGN**. No build step, no
installation — just plain HTML/CSS/JS. Bilingual **English / Vietnamese**,
with an animated Three.js hero and a separate video-portfolio page.

## How to view it locally

Because the pages load JavaScript, photos and video, open them through a small
local web server (double-clicking `index.html` will show the text but not the
styles/animation).

```bash
node server.cjs
```

Then open **http://localhost:5173** in your browser.

## How to publish it (recommended: Netlify — free)

1. Go to https://app.netlify.com/drop
2. Drag the **whole project folder** onto the page.
3. Netlify gives you a public link you can send to anyone.

(Any static host works too: GitHub Pages, Vercel, Cloudflare Pages, or normal
web hosting. Just upload all files, keeping the folder structure.)

## Pages

| File | What it is |
|------|------------|
| `index.html` | Home — animated hero, portfolio teaser, contacts |
| `portfolio.html` | Separate **video portfolio** page (opens from the "Portfolio" button) |

## Editing content

- **Contacts & DJ styles** → `assets/js/i18n.js` (top of the file)
- **English / Vietnamese texts** → `assets/js/i18n.js` (the `I18N` object)
- **Home photos** → the three `photo_*.jpg` files in the project root
- **Portfolio videos** → see `portfolio/README.txt`

## Language

The site opens in English and remembers the visitor's choice. The EN/VI button
is in the top-right of every page.

## Contacts on the site

Zalo · Facebook · Instagram · Telegram · WhatsApp — edit them in
`assets/js/i18n.js`.

---

### Notes

- The hero animation loads the Three.js library from a CDN, so the animation
  needs an internet connection when the page is opened. Everything else works
  offline.
- `server.cjs`, `build_videos.sh`, `convert.bat` and `video/` are helper/source
  files — they are not part of the published site, but harmless to keep.
