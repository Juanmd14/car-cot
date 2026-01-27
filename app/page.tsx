"use client";
import React, { useState } from "react";
import {
  Car,
  Shield,
  Clock,
  CheckCircle,
  Star,
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
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[url('/hero-car.png')] bg-cover bg-center bg-no-repeat relative overflow-hidden md:flex md:flex-col">
      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/85 via-purple-900/85 to-pink-800/85 md:from-indigo-900/70 md:via-purple-900/70 md:to-pink-800/70"></div>

      {/* Navbar */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md md:flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer">
              <Car className="h-5 w-5 md:h-8 md:w-8 text-white" />
              <span className="ml-2 text-lg md:text-2xl font-bold text-white">
                Name-test
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-white hover:text-pink-200 transition-colors font-medium cursor-pointer">
                Inicio
              </button>
              <button className="text-white hover:text-pink-200 transition-colors font-medium cursor-pointer">
                Beneficios
              </button>
              <button className="text-white hover:text-pink-200 transition-colors font-medium cursor-pointer">
                Cómo Funciona
              </button>
              <button className="flex items-center text-white hover:text-pink-200 transition-colors font-medium cursor-pointer">
                <Phone className="h-4 w-4 mr-2" />
                1234567
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              aria-label="Abrir menú"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-1.5 cursor-pointer"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/30 backdrop-blur-lg border-t border-white/20">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <button className="block text-white hover:text-pink-200 py-2 font-medium w-full text-left text-sm cursor-pointer">
                Inicio
              </button>
              <button className="block text-white hover:text-pink-200 py-2 font-medium w-full text-left text-sm cursor-pointer">
                Beneficios
              </button>
              <button className="block text-white hover:text-pink-200 py-2 font-medium w-full text-left text-sm cursor-pointer">
                Cómo Funciona
              </button>
              <button className="flex items-center text-white hover:text-pink-200 py-2 font-medium w-full text-sm cursor-pointer">
                <Phone className="h-3.5 w-3.5 mr-1.5" />
                1234567
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-3 md:py-12">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 md:top-20 left-5 md:left-10 w-40 h-40 md:w-72 md:h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-52 h-52 md:w-96 md:h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-4 md:gap-12 items-center">
          {/* Left Content - Intro */}
          <div className="text-center md:text-left space-y-2 md:space-y-8">
             {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span>Más de 50,000 clientes satisfechos</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight">
              La manera más{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                fácil
              </span>{" "}
              de cotizar tu auto
            </h1>
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed">
              Compará precios de las mejores aseguradoras en segundos. Simple,
              rápido y sin llamadas molestas.
            </p>

            {/* Benefits - Solo visible en desktop */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                { icon: Clock, text: "Cotización en 30 seg" },
                { icon: Shield, text: "100% Seguro" },
                { icon: CheckCircle, text: "Sin papeleos" },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <benefit.icon className="h-6 w-6 text-white shrink-0" />
                  <span className="text-white font-medium text-sm">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form Card - Formulario */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/50 to-purple-400/50 rounded-2xl md:rounded-3xl blur-2xl"></div>
            
            <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-10">
              <div className="text-center mb-4 md:mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl md:rounded-2xl mb-2 md:mb-4 shadow-lg">
                  <Car className="h-5 w-5 md:h-8 md:w-8 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1.5 md:mb-2">
                  Comenzá tu cotización
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Ingresá tu código postal para obtener las mejores ofertas
                </p>
              </div>

              <div className="space-y-3 md:space-y-6">
                <div>
                  <label
                    htmlFor="cp"
                    className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3"
                  >
                    Código Postal
                  </label>
                  <input
                    id="cp"
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={codigoPostal}
                    onChange={(e) =>
                      setCodigoPostal(e.target.value.replace(/\D/g, ""))
                    }
                    onKeyDown={handleKeyPress}
                    className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all text-lg md:text-2xl text-center text-black font-bold tracking-widest"
                    placeholder="1234"
                  />
                  {error && (
                    <p className="mt-2 md:mt-3 text-xs md:text-sm text-red-600 flex items-center gap-2">
                      <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                      {error}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg hover:from-indigo-700 hover:to-purple-700 active:scale-95 md:hover:scale-105 transition-all shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Cotizar Ahora
                </button>

                <div className="flex items-center justify-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-500">
                  <Shield className="h-3.5 w-3.5 md:h-5 md:w-5 shrink-0" />
                  <span>Tus datos están protegidos y seguros</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Footer - Solo visible en mobile */}
      <div className="md:hidden relative z-40 bg-black/20 backdrop-blur-md border-t border-white/20 py-2 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {[
              { icon: Clock, text: "30 seg" },
              { icon: Shield, text: "Seguro" },
              { icon: CheckCircle, text: "Sin papeleos" },
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5"
              >
                <benefit.icon className="h-3.5 w-3.5 text-white shrink-0" />
                <span className="text-white font-medium text-xs">
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}