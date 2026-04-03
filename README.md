# Portfolio — Abdul Gaffar Haadi

Modern static site (plain HTML/CSS/JS) in **`docs/`**, suitable for **GitHub Pages**. The old Wix export remains under `hesa/` and `hesa.html` for reference only.

## Publish on GitHub Pages

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **`main`** (or your default branch) and folder **`/docs`**, then save.
5. After a minute, the site will be available at `https://<username>.github.io/<repository>/`.

Navigation and footer load from `docs/partials/` via `fetch()`, which requires **http/https** (not opening `file://` HTML directly).

## Preview locally

```bash
cd docs
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Customize

- **Global styles:** `docs/assets/css/style.css`
- **Nav / footer:** `docs/partials/header.html`, `docs/partials/footer.html`
- **Loader script:** `docs/assets/js/load-partials.js`
- **PDFs / slides:** place files in `docs/assets/files/` and link from the relevant page
