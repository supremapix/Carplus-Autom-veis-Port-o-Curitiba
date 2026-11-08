import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { blogPosts } from '../../data/blog-posts';
import { BlogCard } from './BlogCard';

export function BlogPreview() {
  return <section className="bg-[#F6F6F6] py-14 sm:py-20" aria-labelledby="blog-preview-title"><Container>
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
      <div><p className="mb-2 font-bold text-xs uppercase tracking-[0.18em] text-[#805100]">Blog Carplus Autos</p><h2 id="blog-preview-title" className="font-display text-3xl sm:text-4xl font-bold uppercase">Informação antes da decisão</h2><p className="mt-3 max-w-2xl text-[#555]">Guias práticos para comprar, vender e financiar seu próximo carro.</p></div>
      <Link to="/blog" className="inline-flex rounded-lg border-2 border-[#121212] px-5 py-3 text-sm font-bold hover:bg-[#121212] hover:text-white">Explorar o blog →</Link>
    </div>
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{blogPosts.map(post => <BlogCard key={post.slug} post={post} />)}</div>
  </Container></section>;
}
