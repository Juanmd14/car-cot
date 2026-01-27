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
    <div className="h-screen md:min-h-screen overflow-hidden md:overflow-auto bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 relative flex flex-col md:flex md:items-center md:justify-center p-4 md:p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orbes animados */}
        <div className="absolute top-10 md:top-20 left-5 md:left-10 w-48 h-48 md:w-72 md:h-72 bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-64 h-64 md:w-96 md:h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 md:w-64 md:h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid animado */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'moveGrid 20s linear infinite'
          }} />
        </div>
      </div>

      {/* Contenedor del formulario */}
      <div className="relative w-full max-w-4xl flex-1 flex flex-col md:block">
        {/* Botón volver */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors mb-3 md:mb-6 group cursor-pointer shrink-0"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm md:text-base">Volver al inicio</span>
        </Link>

        {/* Card principal con efecto glow */}
        <div className="relative flex-1 flex flex-col md:block">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-purple-800 to-pink-600 rounded-2xl md:rounded-3xl blur-xl opacity-50 animate-pulse"></div>
          
          {/* Card del formulario */}
          <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl p-5 md:p-8 lg:p-10 h-full flex flex-col overflow-hidden md:overflow-visible">
            {/* Header */}
            <div className="text-center mb-4 md:mb-8 shrink-0">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl md:rounded-2xl mb-2 md:mb-4 shadow-lg">
                <Car className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
                Completá tus datos
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                Necesitamos algunos datos para generar tu cotización personalizada
              </p>
            </div>

            {/* Formulario - scrolleable en móvil */}
            <div className="flex-1 overflow-y-auto md:overflow-visible">
              <CotizacionForm codigoPostal={codigoPostal} />
            </div>
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
      <div className="h-screen md:min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-base md:text-xl animate-pulse">Cargando...</div>
      </div>
    }>
      <FormularioContent />
    </Suspense>
  );
}