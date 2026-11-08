import fs from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from '../src/App';
import { blogPosts } from '../src/data/blog-posts';
import { BLOG_TITLE, BLOG_DESCRIPTION, SITE_URL, blogUrl, buildBlogJsonLd, buildBlogArticleJsonLd } from '../src/lib/blog-seo';

const escape = (text: string) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const template = await fs.readFile('dist/index.html', 'utf8');
const pages = [
  { route: '/blog', title: BLOG_TITLE, description: BLOG_DESCRIPTION, image: new URL(blogPosts[0].image, SITE_URL).href, type: 'website', jsonLd: buildBlogJsonLd() },
  ...blogPosts.map(post => ({ route: `/blog/${post.slug}`, title: `${post.title} | Carplus Autos`, description: post.description, image: new URL(post.image, SITE_URL).href, type: 'article', jsonLd: buildBlogArticleJsonLd(post) })),
];
for (const page of pages) {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(page.title)}</title>`);
  const meta: Record<string, string> = {
    description: page.description, robots: 'index, follow, max-image-preview:large',
    'og:title': page.title, 'og:description': page.description, 'og:url': SITE_URL + page.route, 'og:type': page.type,
    'og:image': page.image, 'og:image:secure_url': page.image, 'og:image:alt': page.title,
    'twitter:title': page.title, 'twitter:description': page.description, 'twitter:image': page.image,
  };
  for (const [key, value] of Object.entries(meta)) {
    const attr = key.startsWith('og:') ? 'property' : 'name';
    const tag = `<meta ${attr}="${key}" content="${escape(value)}" />`;
    const regex = new RegExp(`<meta ${attr}="${key}"[^>]*>`, 'g');
    html = regex.test(html) ? html.replace(regex, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
  }
  html = html.replace(/\s*<meta property="og:image:(?:type|width|height)"[^>]*>/g, '');
  const ld = JSON.stringify(page.jsonLd).replaceAll('<', '\\u003c');
  html = html.replace('</head>', `    <link rel="canonical" href="${SITE_URL + page.route}" />\n    <script type="application/ld+json" id="page-json-ld">${ld}</script>\n  </head>`);
  const body = renderToString(<StaticRouter location={page.route}><AppContent /></StaticRouter>);
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  const output = path.join('dist', page.route, 'index.html');
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, html);
  console.log(`Pre-rendered ${page.route}`);
}
let sitemap = await fs.readFile('public/sitemap.xml', 'utf8');
const entries = pages.map(page => `<url><loc>${SITE_URL + page.route}</loc><lastmod>${blogPosts.find(post => blogUrl(post) === SITE_URL + page.route)?.dateModified || blogPosts[0].dateModified}</lastmod></url>`).join('\n  ');
sitemap = sitemap.replace('</urlset>', `  <!-- Blog: generated from the same article data as the pages -->\n  ${entries}\n</urlset>`);
await fs.writeFile('dist/sitemap.xml', sitemap);
const llms = `# Carplus Autos\n\n> Loja de compra, venda, troca e consignação de veículos no bairro Portão, em Curitiba, Paraná.\n\n## Contato\n- Site oficial: ${SITE_URL}\n- Endereço: Av. Presidente Arthur da Silva Bernardes, 1323, Portão, Curitiba, PR, CEP 80320-300\n- Telefone e WhatsApp: (41) 98874-0258\n\n## Páginas oficiais\n- [Estoque](${SITE_URL}/estoque): consulte a disponibilidade na página de cada veículo e confirme com a loja.\n- [Empresa](${SITE_URL}/empresa)\n- [Contato](${SITE_URL}/contato)\n- [Venda e troca](${SITE_URL}/venda-seu-carro)\n- [Financiamento](${SITE_URL}/financiamento): condições dependem de proposta e análise de crédito.\n- [Consignação](${SITE_URL}/consignacao)\n\n## Guias do blog\n${blogPosts.map(post => `- [${post.title}](${blogUrl(post)}): ${post.description}`).join('\n')}\n\n## Contexto editorial\nOs artigos incluem data, autoria institucional, referências e perguntas frequentes. Fotografias de veículos são ilustrações do acervo e não indicam disponibilidade. Preços, estoque e condições comerciais devem ser confirmados nas páginas atuais e com a loja. Este arquivo é um índice auxiliar; o conteúdo completo está disponível em HTML nas páginas do blog.\n`;
await fs.writeFile('dist/llms.txt', llms);
