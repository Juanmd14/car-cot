"use client";
import React, { useState } from "react";
import {
  Car,
  Shield,
  Clock,
  CheckCircle,
  Phone,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingCotizadora() {
  const [codigoPostal, setCodigoPostal] = useState("");
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setError("");
    if (!/^[0-9]{4}$/.test(codigoPostal)) {
      setError("Código postal debe tener 4 dígitos");
      return;
    }
    router.push(`/formulario?cp=${codigoPostal}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="h-svh md:min-h-screen overflow-hidden md:overflow-auto bg-[url('/hero-car.png')] bg-cover bg-center bg-no-repeat relative flex flex-col">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-900/85 via-purple-900/85 to-pink-800/85 md:from-indigo-900/70 md:via-purple-900/70 md:to-pink-800/70"></div>

      {/* Navbar */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-20">
            <div className="flex items-center cursor-pointer">
              <Car className="h-5 w-5 md:h-8 md:w-8 text-white" />
              <span className="ml-2 text-base md:text-2xl font-bold text-white">
                Name-test
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button className="text-white font-medium">Inicio</button>
              <button className="text-white font-medium">Beneficios</button>
              <button className="text-white font-medium">Cómo Funciona</button>
              <button className="flex items-center text-white font-medium">
                <Phone className="h-4 w-4 mr-2" />
                1234567
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-1.5"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-black/30 backdrop-blur-lg border-t border-white/20">
            <div className="px-4 pt-2 pb-2.5 space-y-1">
              <button className="block text-white py-1.5 text-sm">Inicio</button>
              <button className="block text-white py-1.5 text-sm">Beneficios</button>
              <button className="block text-white py-1.5 text-sm">Cómo Funciona</button>
              <button className="flex items-center text-white py-1.5 text-sm">
                <Phone className="h-3.5 w-3.5 mr-1.5" />
                1234567
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <div className="relative flex-1 md:min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-0 md:py-12 overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 md:top-20 left-5 md:left-10 w-40 h-40 md:w-72 md:h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-48 h-48 md:w-96 md:h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-4 md:gap-12 items-center">
          
          {/* Left */}
          <div className="text-center md:text-left space-y-2 md:space-y-8">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight">
              La manera más{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-pink-200">
                fácil
              </span>{" "}
              de cotizar tu auto
            </h1>

            <p className="text-sm md:text-xl lg:text-2xl text-white/90">
              Compará precios de las mejores aseguradoras en segundos. Simple,
              rápido y sin llamadas molestas.
            </p>

            <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[Clock, Shield, CheckCircle].map((Icon, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <Icon className="h-6 w-6 text-white" />
                  <span className="text-white font-medium text-sm">
                    {["Cotización en 30 seg", "100% Seguro", "Sin papeleos"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-pink-400/50 to-purple-400/50 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl"></div>

            <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10">
              <div className="text-center mb-5 md:mb-6">
                <div className="inline-flex w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl md:rounded-2xl mb-3 md:mb-4 items-center justify-center">
                  <Car className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                  Comenzá tu cotización
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  Ingresá tu código postal para obtener las mejores ofertas
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={codigoPostal}
                  onChange={(e) =>
                    setCodigoPostal(e.target.value.replace(/\D/g, ""))
                  }
                  onKeyDown={handleKeyPress}
                  placeholder="1234"
                  className="w-full bg-white text-black placeholder-gray-400 px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all text-xl md:text-2xl text-center font-bold tracking-widest"
                />

                {error && (
                  <p className="text-xs md:text-sm text-red-600 text-center">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:from-indigo-700 hover:to-purple-700 active:scale-95 md:hover:scale-105 transition-all shadow-lg"
                >
                  Cotizar Ahora
                </button>

                <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500">
                  <Shield className="h-4 w-4 md:h-5 md:w-5" />
                  <span>Tus datos están protegidos y seguros</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile footer */}
      <div className="md:hidden bg-black/20 backdrop-blur-md border-t border-white/20 py-2 shrink-0">
        <div className="flex justify-center gap-4 text-white text-xs">
          <span>30 seg</span>
          <span>Seguro</span>
          <span>Sin papeleos</span>
        </div>
      </div>
    </div>
  );
}
