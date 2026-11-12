# React + Vite

## Branding and browser icons

The active navbar in `src/pages/Home.jsx` uses styled XCIX text with theme-aware colors. The older `src/components/Navbar.jsx` references the transparent `public/xcix.png`, but that component is not mounted by the current homepage. The social preview is a separate, existing portrait at `public/images/nine-wai-yan.jpg`.

Both `index.html` and `public/404.html` declare the same browser icon set:

- `public/favicon.svg`: 64px viewBox, outlined XCIX lettering, dark tile, and red accent; no runtime font dependency.
- `public/favicon.png`: 64 × 64 fallback with transparent outer corners and an opaque dark tile behind the lettering.
- `public/favicon.ico`: 16, 32, and 48px PNG frames in a multi-resolution ICO container.
- `public/apple-touch-icon.png`: opaque 180 × 180 icon for Apple devices.

These are exports of the existing favicon branding. To regenerate them on Windows with Consolas installed, run `powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/generate-favicons.ps1`. This process-only execution setting does not change the machine's policy. Generated files are committed; production builds need neither PowerShell nor a font installation.

Icon links use `?v=2` to refresh older cached references. Increase this version when updating the artwork again. The root `/favicon.ico` also exists for clients that request it automatically. Theme-color remains controlled by the existing theme scripts; the standalone dark 404 page sets its own background color.

The initial live investigation found that the existing SVG, original logo, and social portrait returned valid images, but `/favicon.ico` and `/apple-touch-icon.png` returned HTTP 404. Missing fallback formats were confirmed; the reported blank browser rendering was not reproduced. The original SVG used font-dependent text, and production cached image assets for 30 days, so path outlines and refreshed icon URLs address those additional compatibility/cache risks without replacing the brand.

Validation: production build passed; all declared icon URLs plus the original logo and social portrait returned HTTP 200 with image content types in local Vite preview. PNG dimensions/transparency, SVG XML and path data, and all ICO frame headers were checked. Raster exports and the separate social portrait were inspected visually. Browser-tab rendering and Apple home-screen rendering still require device/browser verification after deployment; these checks do not claim a successful production update.

## Production SEO

Canonical origin: `https://www.ninewaiyan.online/`.

- `public/robots.txt` allows all public pages and rendering resources and declares the sitemap. No private, admin, or API routes currently exist. If these are introduced, review crawler rules and protect private data with authentication; robots.txt is not access control.
- `public/sitemap.xml` lists only `/`, the application's sole public page. Section anchors, external projects, downloads, and the catch-all error route are not separate sitemap pages. `lastmod` is omitted because a reliable content modification date is not tracked. Add it only when the homepage's significant content change date is known.
- `index.html` provides a single title, description, canonical link, Open Graph tags, Twitter Card tags, and a JSON-LD graph containing Person and WebSite. The title is `Nine Wai Yan | Software Engineer, SRE & Cybersecurity`. The description is `Explore Nine Wai Yan's portfolio, showcasing software engineering, Site Reliability Engineering, cloud infrastructure, DevOps, and cybersecurity projects.` Both are mirrored in the social metadata. The site name retains the `Nine Wai Yan | Security & Engineering` brand.
- Visible content describes SRE and DevSecOps as growing professional interests. Structured data retains the current, visible `Junior Software Developer` job title and lists existing technical skills; it does not claim SRE employment or add qualifications. No meta keywords tag is used.
- `public/images/nine-wai-yan.jpg` is a compressed copy of the existing portrait used by the hero and social previews. The original remains available.
- `nginx.conf` redirects HTTP and HTTPS non-www requests to HTTPS www while preserving paths and queries. It also redirects `/index.html` to `/`, serves robots and sitemap explicitly, compresses text responses, caches hashed Vite assets, and returns real HTTP 404 responses for missing routes using `public/404.html`.
- `src/pages/NotFound.jsx` handles errors in Vite previews or client routing with `noindex` and removes homepage metadata while mounted. Production HTTP status codes are controlled by Nginx.

### Build and deploy

Run `npm ci` when dependencies need installing, then `npm run build`. Vite copies the public files into `dist/` without additional dependencies. The existing Docker build runs this step and copies `dist/` and `nginx.conf` into Nginx.

Deploy using the existing Docker Compose process on the production server:

```sh
docker compose up -d --build
docker compose exec portfolio nginx -t
```

The existing certificate at `/etc/letsencrypt/live/ninewaiyan.online/` must cover both `ninewaiyan.online` and `www.ninewaiyan.online`, including the redirecting HTTPS host. Preserve the certificate and ACME volume mounts. When adding another application route in the future, update both the sitemap and Nginx route handling.

### Validation

Local checks performed for this implementation:

- Production Vite build and ESLint on the changed React pages.
- Built sitemap validated against the [official sitemap XSD](https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd).
- Built metadata checked for uniqueness, valid JSON-LD, matching canonical/OG URLs, and existing referenced resources.
- React-rendered homepage checked for one H1, descriptive image alternatives, valid section targets, and existing local images/downloads across 41 links. This source-render check does not replace testing interactions in a browser.
- Local HTTP preview checked for homepage, robots.txt, sitemap.xml, image, JavaScript, and CSS responses with status 200 and appropriate content types.
- Heading structure, descriptive image alternatives, viewport, responsive CSS breakpoints, skip link, keyboard focus styles, and reduced-motion rules reviewed in source. Browser layout and Lighthouse scores were not measured because browser access was unavailable.

Docker was unavailable locally, so Nginx syntax and redirect/error behavior still require verification in the deployed container. A Vite preview does not implement Nginx redirects or its HTTP 404 policy.

The application still renders page content in the browser with React; metadata and JSON-LD are present in the initial HTML, while the initial root is empty until JavaScript runs. Crawlers must be able to fetch and execute the JavaScript bundle to read the full portfolio. Verify the rendered homepage with Search Console URL Inspection after deployment; no Google rendering, verification, or indexing success has been claimed.

After deployment, verify these URLs with `curl -I` and inspect their bodies:

| URL | Expected result |
| --- | --- |
| `https://www.ninewaiyan.online/` | 200 HTML; canonical points to this exact URL |
| `https://www.ninewaiyan.online/robots.txt` | 200 plain text; sitemap declaration; no resource blocks |
| `https://www.ninewaiyan.online/sitemap.xml` | 200 XML; sole location is the canonical homepage |
| `http://ninewaiyan.online/` | 301 to HTTPS www |
| `http://www.ninewaiyan.online/` | 301 to HTTPS www |
| `https://ninewaiyan.online/` | 301 to HTTPS www |
| `https://www.ninewaiyan.online/index.html` | 301 to `/` |
| `https://www.ninewaiyan.online/missing-page` | 404 with noindex, without homepage metadata |
| `https://www.ninewaiyan.online/images/nine-wai-yan.jpg` | 200 JPEG |

Before this change was deployed, live checks found that the homepage and HTTPS non-www host both returned 200, and robots.txt and sitemap.xml returned the HTML app with status 200. Recheck after deployment; local changes do not update the production server.

Submit `https://www.ninewaiyan.online/sitemap.xml` in Google Search Console, inspect the homepage with URL Inspection, and check rendered HTML, mobile usability, and Core Web Vitals. Indexing is determined by search engines and is not guaranteed by a sitemap or structured data.

References: [Google's robots.txt guidance](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt) and the [sitemap protocol](https://www.sitemaps.org/protocol.html).

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
