import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';

export function CompactPageHeading({ title, description }: { title: string; description: string }) {
  return <Container className="pt-7 sm:pt-10">
    <nav aria-label="Navegação estrutural" className="mb-4 text-xs text-[#666666]"><Link to="/" className="underline underline-offset-4">Início</Link><span aria-hidden="true"> / </span><span aria-current="page">{title}</span></nav>
    <div className="border-l-4 border-[#F59C00] pl-4 sm:pl-5">
      <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight text-[#121212]">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-[#555555]">{description}</p>
    </div>
  </Container>;
}
