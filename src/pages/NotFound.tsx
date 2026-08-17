import React from 'react';
import { Car, Home, ArrowLeft } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-20 px-4">
      <Container>
        <div className="max-w-md w-full text-center bg-[#FAFAFA] border border-[#E0E0E0] p-10 rounded-3xl space-y-6 shadow-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-[#F59C00] mx-auto shadow-md">
            <Car className="w-8 h-8" />
          </div>

          <div>
            <span className="text-5xl font-display font-bold text-[#F59C00]">404</span>
            <h1 className="font-display font-bold text-2xl uppercase text-[#121212] tracking-wide mt-2">
              Página Não Encontrada
            </h1>
            <p className="text-sm text-[#666666] mt-2">
              O endereço que você tentou acessar não existe ou o veículo foi vendido e removido.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              to="/"
              variant="outline"
              icon={<Home className="w-4 h-4 text-black" />}
            >
              PÁGINA INICIAL
            </Button>

            <Button
              to="/estoque"
              variant="primary"
              icon={<Car className="w-4 h-4 text-black" />}
            >
              VER ESTOQUE
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
