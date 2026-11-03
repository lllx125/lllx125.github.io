# lllx125.github.io

Personal portfolio of Lixing Li, served by GitHub Pages at <https://lllx125.github.io>.

Plain static HTML/CSS/JS with no build step. Push to `main` and the site redeploys.

After portfolio edits, commit and push directly to `main` to deploy, then verify publication. Lixing requested this as the default workflow on 2026-11-02.

## Pages

| File | Content |
|---|---|
| `index.html` | Home: bio, research highlights, and CV sections (education, experience, mentorship, honors, skills) |
| `research.html` | Papers in time order, each with links and a slide deck |
| `projects.html` | Placeholder ("coming soon") |

Content is derived from the master CV (`Planning/cv and resume/master/cv_master.tex`). When the CV changes, update the matching sections here.

## Profile photo

Add a square image at `assets/img/profile.jpg` (at least 400×400). It automatically replaces the "LL" initials avatar.

## Paper slides

Each paper has a slide deck in `slides/<slug>.html`: one `<section class="slide">` (1280×720) per page, directly inside `<body>`. All decks share `slides/slide.css`; figures live in `slides/figures/<slug>/`. After editing a deck, re-render its PDF and per-page PNGs (`<slug>-1.png`, `<slug>-2.png`, ...):

```bash
slides/render.sh <slug>
```

`render.sh` uses Playwright's headless Chromium (`~/.cache/ms-playwright/chromium_headless_shell-*`). Set `CHROME=/path/to/chrome` to use a different browser. If the page count changes, update `data-pages` on that paper's `.slide-thumb` button in `research.html`.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
