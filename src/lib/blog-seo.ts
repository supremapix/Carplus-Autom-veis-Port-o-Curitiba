import { BlogPost, blogPosts } from '../data/blog-posts';
import { buildBreadcrumbJsonLd } from './seo';

export const SITE_URL = 'https://www.carplusautos.com.br';
export const BLOG_TITLE = 'Blog Carplus Autos: guias para comprar e vender carros';
export const BLOG_DESCRIPTION = 'Guias sobre compra de carros usados em Curitiba, transferência no Paraná, financiamento e consignação. Respostas diretas e fontes oficiais.';
export const blogUrl = (post: BlogPost) => `${SITE_URL}/blog/${post.slug}`;
export const formatBlogDate = (value: string) => new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));

const publisher = {
  '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Carplus Autos', url: SITE_URL,
  logo: { '@type': 'ImageObject', url: 'https://img.carplusautos.com.br/carplus-autos-logo.png' },
};

export function buildBlogJsonLd() {
  return [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': `${SITE_URL}/blog#webpage`,
      name: BLOG_TITLE, description: BLOG_DESCRIPTION, url: `${SITE_URL}/blog`, inLanguage: 'pt-BR', publisher,
      mainEntity: { '@type': 'ItemList', numberOfItems: blogPosts.length, itemListElement: blogPosts.map((post, index) => ({ '@type': 'ListItem', position: index + 1, url: blogUrl(post), name: post.title })) } },
    buildBreadcrumbJsonLd([{ name: 'Início', url: `${SITE_URL}/` }, { name: 'Blog', url: `${SITE_URL}/blog` }]),
  ];
}

export function buildBlogArticleJsonLd(post: BlogPost) {
  const articleBody = [post.answer, ...post.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.bullets || [])]), ...post.faqs.flatMap(faq => [faq.q, faq.a])].join('\n\n');
  return [
    { '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': `${blogUrl(post)}#article`,
      headline: post.title, description: post.description, url: blogUrl(post), mainEntityOfPage: blogUrl(post),
      image: [new URL(post.image, SITE_URL).href], datePublished: `${post.datePublished}T09:00:00-03:00`,
      dateModified: `${post.dateModified}T09:00:00-03:00`, author: { '@type': 'Organization', name: 'Carplus Autos', url: `${SITE_URL}/empresa` },
      publisher, inLanguage: 'pt-BR', articleSection: post.category, articleBody,
      citation: post.sources.map(source => source.url),
    },
    buildBreadcrumbJsonLd([{ name: 'Início', url: `${SITE_URL}/` }, { name: 'Blog', url: `${SITE_URL}/blog` }, { name: post.title, url: blogUrl(post) }]),
  ];
}
