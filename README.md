# lllx125.github.io

Personal portfolio of Lixing Li, served by GitHub Pages at <https://lllx125.github.io>.

Plain static HTML/CSS/JS with no build step. Push to `main` and the site redeploys.

## Pages

| File | Content |
|---|---|
| `index.html` | Home: bio, research highlights, and CV sections (education, experience, mentorship, honors, skills) |
| `research.html` | Papers in time order, each with links and a one-slide summary |
| `projects.html` | Placeholder ("coming soon") |

Content is derived from the master CV (`Planning/cv and resume/master/cv_master.tex`). When the CV changes, update the matching sections here.

## Profile photo

Add a square image at `assets/img/profile.jpg` (at least 400×400). It automatically replaces the "LL" initials avatar.

## Paper slides

Each paper has a 1280×720 HTML slide in `slides/`. All slides share `slides/slide.css`. After editing a slide, re-render its PNG preview and PDF:

```bash
slides/render.sh <slug>
```

`render.sh` uses Playwright's headless Chromium (`~/.cache/ms-playwright/chromium_headless_shell-*`). Set `CHROME=/path/to/chrome` to use a different browser.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
