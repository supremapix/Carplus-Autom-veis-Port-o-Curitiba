import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { SeoHead } from '../components/ui/SeoHead';
import { BlogCard } from '../components/blog/BlogCard';
import { blogPosts } from '../data/blog-posts';
import { BLOG_TITLE, BLOG_DESCRIPTION, SITE_URL, buildBlogJsonLd } from '../lib/blog-seo';

export function Blog() {
  return <>
    <SeoHead title={BLOG_TITLE} description={BLOG_DESCRIPTION} canonicalUrl={`${SITE_URL}/blog`} ogImage={new URL(blogPosts[0].image, SITE_URL).href} jsonLd={buildBlogJsonLd()} />
    <header className="bg-[#101010] text-white border-b-4 border-[#F59C00] py-10 sm:py-16"><Container>
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#D0D0D0]"><Link to="/" className="hover:underline">Início</Link><span aria-hidden="true" className="mx-3">/</span><span aria-current="page">Blog</span></nav>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F59C00]">Informação para decidir melhor</p>
      <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold uppercase leading-tight">Blog Carplus Autos</h1>
      <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#D0D0D0]">Da primeira visita à transferência: respostas claras sobre compra, venda, troca e financiamento de veículos em Curitiba e no Paraná.</p>
    </Container></header>
    <section className="bg-[#F6F6F6] py-10 sm:py-16" aria-label="Todos os artigos"><Container>
      <p className="mb-6 text-sm font-medium text-[#555]">4 guias • Fontes oficiais • Fotos do acervo Carplus Autos</p>
      <div className="grid gap-7 md:grid-cols-2">{blogPosts.map(post => <BlogCard key={post.slug} post={post} />)}</div>
      <div className="mt-10 rounded-xl bg-white p-6 sm:p-8 border border-[#E0E0E0]"><h2 className="font-display text-2xl font-bold">Conteúdo para orientar sua pesquisa</h2><p className="mt-3 leading-relaxed text-[#555]">Os artigos são publicados pela Carplus Autos e incluem referências para consulta. Regras, taxas e condições podem mudar. Confirme os dados do veículo, os procedimentos oficiais e os termos da proposta antes de negociar.</p><Link to="/contato" className="mt-4 inline-block font-bold underline underline-offset-4">Fale com a Carplus Autos</Link></div>
    </Container></section>
  </>;
}
