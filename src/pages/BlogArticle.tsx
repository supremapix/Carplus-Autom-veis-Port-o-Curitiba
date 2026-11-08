import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/blog-posts';
import { Container } from '../components/ui/Container';
import { SeoHead } from '../components/ui/SeoHead';
import { BlogCard } from '../components/blog/BlogCard';
import { NotFound } from './NotFound';
import { SITE_URL, blogUrl, formatBlogDate, buildBlogArticleJsonLd } from '../lib/blog-seo';

export function BlogArticle() {
  const { slug } = useParams();
  const post = blogPosts.find(item => item.slug === slug);
  if (!post) return <NotFound />;
  const related = blogPosts.filter(item => post.relatedSlugs.includes(item.slug));
  return <>
    <SeoHead title={`${post.title} | Carplus Autos`} description={post.description} canonicalUrl={blogUrl(post)} ogType="article" ogImage={new URL(post.image, SITE_URL).href} jsonLd={buildBlogArticleJsonLd(post)} />
    <article className="blog-article">
      <header className="bg-[#101010] text-white pt-8 pb-10 sm:pt-10 sm:pb-14 border-b-4 border-[#F59C00]"><Container>
        <nav aria-label="Breadcrumb" className="text-sm text-[#D0D0D0] flex flex-wrap gap-x-3 gap-y-2 mb-8"><Link to="/" className="hover:underline">Início</Link><span aria-hidden="true">/</span><Link to="/blog" className="hover:underline">Blog</Link><span aria-hidden="true">/</span><span aria-current="page">{post.category}</span></nav>
        <div className="max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F59C00]">{post.category}</p><h1 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-[1.13]">{post.title}</h1><p className="mt-5 text-base sm:text-lg leading-relaxed text-[#D0D0D0]">{post.description}</p>
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-[#D0D0D0]"><span>Por <Link to="/empresa" rel="author" className="font-semibold text-white underline underline-offset-4">Carplus Autos</Link></span><span>Publicado em <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished)}</time></span><span>{post.readingMinutes} min de leitura</span></p>
        </div>
      </Container></header>
      <Container className="py-8 sm:py-12">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px] xl:gap-14">
          <div className="min-w-0 max-w-3xl">
            <figure className="mb-8"><img src={post.image} alt={post.imageAlt} width="960" height="640" fetchPriority="high" className="w-full aspect-[3/2] object-contain rounded-xl bg-[#F6F6F6]" /><figcaption className="mt-3 text-xs leading-relaxed text-[#666]">{post.imageCaption}</figcaption></figure>
            <section aria-labelledby="resposta-direta" className="mb-8 rounded-r-xl border-l-4 border-[#F59C00] bg-[#FFF6E6] p-5 sm:p-7"><h2 id="resposta-direta" className="font-display text-xl font-bold">Em resumo</h2><p className="mt-3 text-base sm:text-lg leading-relaxed text-[#333]">{post.answer}</p></section>
            <nav aria-label="Neste artigo" className="mb-9 rounded-xl border border-[#E0E0E0] bg-[#FAFAFA] p-5 sm:p-6"><p className="font-bold flex items-center gap-2"><BookOpen size={18} aria-hidden="true" /> Neste artigo</p><ol className="mt-4 space-y-2 list-decimal pl-5 text-sm leading-relaxed">{post.sections.map(section => <li key={section.id}><a href={`#${section.id}`} className="text-[#444] underline underline-offset-4 hover:text-[#805100]">{section.title}</a></li>)}<li><a href="#perguntas-frequentes" className="underline underline-offset-4">Perguntas frequentes</a></li></ol></nav>
            {post.sections.map(section => <section key={section.id} id={section.id} className="scroll-mt-24 mb-9"><h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight mb-4">{section.title}</h2>{section.paragraphs.map((paragraph, i) => <p key={i} className="mb-4 text-base sm:text-lg leading-[1.8] text-[#333]">{paragraph}</p>)}{section.bullets && <ul className="list-disc pl-6 space-y-3 text-base sm:text-lg leading-[1.75] text-[#333] marker:text-[#805100]">{section.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}</ul>}</section>)}
            <section id="perguntas-frequentes" className="scroll-mt-24 mb-10"><h2 className="font-display text-2xl sm:text-3xl font-bold mb-5">Perguntas frequentes</h2><div className="divide-y divide-[#E0E0E0] border-y border-[#E0E0E0]">{post.faqs.map(faq => <div key={faq.q} className="py-5"><h3 className="font-bold text-lg">{faq.q}</h3><p className="mt-2 leading-[1.8] text-[#444]">{faq.a}</p></div>)}</div></section>
            <section className="rounded-xl border border-[#E0E0E0] p-5 sm:p-7 bg-[#FAFAFA]" aria-labelledby="fontes"><h2 id="fontes" className="font-display text-xl font-bold">Fontes e consulta</h2><p className="mt-2 text-sm leading-relaxed text-[#555]">Referências consultadas em {formatBlogDate(post.dateModified)}. Confira a orientação atual no órgão responsável antes de tomar uma decisão.</p><ul className="mt-4 space-y-3">{post.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline underline-offset-4 decoration-[#AAA] hover:text-[#805100]">{source.name} ↗</a></li>)}</ul><p className="mt-5 text-xs leading-relaxed text-[#666]">Conteúdo informativo da Carplus Autos. Não substitui avaliação técnica do veículo, análise individual de crédito ou orientação do órgão de trânsito.</p></section>
            <Link to="/blog" className="mt-8 inline-flex items-center gap-2 font-bold text-sm hover:underline"><ArrowLeft size={18} /> Voltar para o blog</Link>
          </div>
          <aside className="lg:sticky lg:top-24 rounded-2xl bg-[#131313] p-6 text-white border-t-4 border-[#F59C00]">
            <p className="text-xs tracking-widest uppercase font-bold text-[#F59C00]">Carplus Autos · Curitiba</p><h2 className="font-display text-2xl leading-tight font-bold mt-4">Seu próximo passo começa com informação.</h2><p className="mt-4 text-sm leading-relaxed text-[#D0D0D0]">Consulte os veículos e converse sobre sua necessidade com a loja no bairro Portão.</p><Link to={post.cta.href} className="mt-6 flex items-center justify-between gap-3 bg-[#F59C00] text-black p-4 rounded-lg font-bold text-sm hover:bg-[#FFAE22]">{post.cta.label}<ArrowRight size={18} aria-hidden="true" /></Link><Link to="/contato" className="block mt-4 text-sm underline underline-offset-4">Endereço e contato</Link><p className="mt-6 text-xs leading-relaxed text-[#AAA]">Fotos ilustrativas do acervo da loja. A presença de um veículo em um artigo não confirma sua disponibilidade.</p>
          </aside>
        </div>
      </Container>
    </article>
    <section className="bg-[#F6F6F6] py-12 sm:py-16" aria-labelledby="related-posts"><Container><h2 id="related-posts" className="font-display text-3xl font-bold mb-7">Continue sua pesquisa</h2><div className="grid gap-6 md:grid-cols-3">{related.map(item => <BlogCard key={item.slug} post={item} />)}</div></Container></section>
  </>;
}
