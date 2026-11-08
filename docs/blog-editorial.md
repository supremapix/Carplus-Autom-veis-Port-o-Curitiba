# Blog Carplus Autos

## Editorial

The four guides are stored in `src/data/blog-posts.ts`. They cover buying used cars, documentation in Paraná, financing, and sale/trade/consignment. Each has an answer-first summary, original guidance, visible FAQs, organizational authorship, dates, official references and local vehicle imagery. Images are illustrative and do not claim inventory availability. Prices, approval promises, guarantees and commission amounts are deliberately not inferred.

## Rendering and discovery

`npm run build` runs Vite and then `scripts/prerender-blog.tsx`. The index and four article routes contain the same React content in the initial HTML, plus unique metadata, canonical URL and matching BlogPosting/CollectionPage and breadcrumb JSON-LD. No crawler-specific rendering is used. Vercel serves these routes explicitly rather than rewriting them to the empty SPA shell. Other site routes keep their existing behavior.

The build appends the blog routes to `dist/sitemap.xml` and generates `dist/llms.txt` from the article data. The previous manually maintained llms inventory was removed because it could misrepresent current availability. The auxiliary llms index does not guarantee inclusion in AI answers. Google and Bing decide crawling, indexing, rankings and citations.

Navigation is available in the desktop/mobile menu, footer and a new home section. All article images are existing site assets. The stock data remains unchanged.

## Verification

Run `npm run lint`, `npm run build`, `npm run test:blog` and `git diff --check`. The blog test checks four unique articles, source links, related slugs, existing images, one H1 per page, full rendered content, canonical URLs, metadata, schema, sitemap and auxiliary index links.

Verify `/blog` and each article on production, including direct navigation and client-side navigation. Confirm the deployed Git SHA through Vercel and inspect HTTP HTML without JavaScript. Publication alone does not confirm search-engine indexing.
