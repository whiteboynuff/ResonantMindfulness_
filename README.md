# Awakened Peace Publishing

Static site for a book publisher (6 titles). Built for Cloudflare Pages with no build step.

## File tree

```
index.html
404.html
robots.txt
sitemap.xml
favicon.svg
_headers
.gitignore
assets/css/styles.css
assets/js/main.js
assets/covers/soothe.webp
assets/covers/nervous.webp
assets/covers/awakened.webp
assets/covers/luminous.webp
assets/covers/rest.webp
assets/covers/spirit.webp
```

## Preview locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080

Also verify by opening `index.html` directly from the file system (double-click) — this confirms relative paths work.

## Placeholders

Two values must be replaced before deploying:

1. `#REPLACE-LINK` — Membership button in the Academy section (`index.html` and `404.html`). Replace with your Whop membership URL.
2. `#REPLACE-FORM-ACTION` — Email form action in the Free Meditation section (`index.html` and `404.html`). Replace with your email provider form endpoint. The JavaScript checks for this exact string to show a placeholder message instead of submitting.

## Swapping a cover image

1. Add a new WebP file to `assets/covers/` (e.g., `new-cover.webp`)
2. Edit `assets/css/styles.css` and find the corresponding `.cv-<name>` rule
3. Change `background-image:url(../covers/<name>.webp)` to point to the new file
4. Commit and deploy

## Cloudflare Pages settings

- Framework preset: **None**
- Build command: **empty**
- Build output directory: **repository root** (the folder containing index.html)

## Notes

- No build step, no package.json, no bundler
- All paths are relative (not root-relative) so the site works when opened directly from disk
- The inline script in `<head>` (`document.documentElement.className+=' js'`) must stay inline — it gates the scroll-reveal animation
- The large IIFE at the bottom of `<body>` loads via `<script defer src="assets/js/main.js">`
- Cover images are WebP files in `assets/covers/`, referenced from CSS with relative paths
- No em-dashes anywhere in the project