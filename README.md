# lllx125.github.io

Personal portfolio of Lixing Li, served by GitHub Pages at <https://lllx125.github.io>.

Plain static HTML/CSS/JS with no build step. Push to `main` and the site redeploys.

Pages load `assets/css/style.css?v=…` and `assets/js/main.js?v=…`. GitHub Pages lets browsers cache these for 10 minutes, so after changing either file, bump the `v=` value in every page (including `projects/*.html` and `templates/`) or visitors may see new HTML with old styles.

After portfolio edits, commit and push directly to `main` to deploy, then verify publication. Lixing requested this as the default workflow on 2026-11-02.

## Pages

| File | Content |
|---|---|
| `index.html` | Home: bio, research highlights, and CV sections (education, experience, mentorship, honors, skills) |
| `research.html` | Papers in time order, each with links and a slide deck |
| `projects.html` | Project cards (photo, title, short intro), each linking to a detail page |
| `projects/<slug>.html` | One detail page per project; images in `projects/<slug>/` |
| `templates/` | Copy-and-fill templates for a project card and a project page (not linked from the site) |

Content is derived from the master CV (`Planning/cv and resume/master/cv_master.tex`). When the CV changes, update the matching sections here.

## Profile photo

Add a square image at `assets/img/profile.jpg` (at least 400×400). It automatically replaces the "LL" initials avatar.

## Adding a project

1. Copy `templates/project-page.html` to `projects/<slug>.html`, fill in every `{{...}}`, remove the `noindex` line, and delete the optional sections you don't need. `projects/baby-yoda.html` is a full example, including stat tiles, a controls grid, and pipeline diagrams.
2. Put images in `projects/<slug>/`: a square `cover.jpg` (shown 1:1 on the detail page and cropped to 16:10 on the card) plus any figures. Resize to at most 1600 px wide and strip metadata first, because phone photos carry GPS location in their EXIF data.
3. Paste `templates/project-card.html` into the `.project-grid` in `projects.html`.
4. Link `projects/<slug>.html` from every place that mentions the project (for example the experience bullets and link pills in `index.html`).

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
