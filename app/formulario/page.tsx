"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CotizacionForm from "@/components/CotizacionForm";
import { Car, ArrowLeft } from "lucide-react";
import Link from "next/link";

function FormularioContent() {
  const searchParams = useSearchParams();
  const codigoPostal = searchParams.get("cp") ?? "";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orbes animados */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid animado */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-linear(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-linear(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'moveGrid 20s linear infinite'
          }} />
        </div>
      </div>

      {/* Contenedor del formulario */}
      <div className="relative w-full max-w-4xl">
        {/* Botón volver */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver al inicio</span>
        </Link>

        {/* Card principal con efecto glow */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-purple-800 to-pink-600 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
          
          {/* Card del formulario */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Formulario */}
            <CotizacionForm codigoPostal={codigoPostal} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes moveGrid {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  );
}

export default function FormularioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Cargando...</div>
      </div>
    }>
      <FormularioContent />
    </Suspense>
  );
}