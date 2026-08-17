import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl space-y-6 shadow-xl shadow-slate-900/5">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#d97706] mx-auto">
          <Car className="w-8 h-8" />
        </div>

        <div>
          <span className="text-4xl font-display font-bold text-[#d97706]">404</span>
          <h1 className="font-display font-bold text-2xl uppercase text-slate-900 tracking-wide mt-2">
            Página Não Encontrada
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            O endereço que você tentou acessar não existe ou o anúncio foi movido.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/"
            className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Página Inicial</span>
          </Link>

          <Link
            to="/estoque"
            className="flex-1 px-4 py-3 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#F59C00]/20"
          >
            <Car className="w-4 h-4" />
            <span>Ver Estoque</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
