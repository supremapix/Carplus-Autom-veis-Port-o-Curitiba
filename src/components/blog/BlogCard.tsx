import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BlogPost } from '../../data/blog-posts';

export function BlogCard({ post }: { post: BlogPost; key?: React.Key }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#E0E0E0] bg-white transition-shadow hover:shadow-lg">
      <Link to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden bg-[#EDEDED]">
        <img src={post.image} alt="" width="960" height="640" loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#805100]">{post.category} <span className="text-[#767676]">· {post.readingMinutes} min</span></p>
        <h2 className="font-display text-2xl font-bold leading-tight text-[#121212]"><Link to={`/blog/${post.slug}`} className="hover:underline decoration-[#F59C00] underline-offset-4">{post.title}</Link></h2>
        <p className="mb-5 mt-3 text-sm leading-relaxed text-[#555]">{post.description}</p>
        <Link to={`/blog/${post.slug}`} className="mt-auto flex items-center gap-2 font-bold text-sm text-[#121212] hover:text-[#805100]" aria-label={`Ler: ${post.title}`}>Ler guia completo <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
