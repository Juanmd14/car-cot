"use client";
import React, { useState } from 'react';
import { Car, Shield, Clock, CheckCircle, Star, Phone, Menu, X } from 'lucide-react';

export default function LandingCotizadora() {
  const [codigoPostal, setCodigoPostal] = useState('');
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = () => {
    setError('');

    if (!/^[0-9]{4}$/.test(codigoPostal)) {
      setError('Código postal debe tener 4 dígitos');
      return;
    }

    // Simular navegación al formulario
    alert(`Redirigiendo al formulario con CP: ${codigoPostal}`);
    // En tu app real: window.location.href = `/formulario?cp=${codigoPostal}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div
  className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
  style={{ backgroundImage: "url('/hero-car.png')" }}
>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Car className="h-8 w-8 text-white" />
              <span className="ml-2 text-2xl font-bold text-white">AutoCotiza</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-white hover:text-pink-200 transition-colors font-medium">
                Inicio
              </button>
              <button className="text-white hover:text-pink-200 transition-colors font-medium">
                Beneficios
              </button>
              <button className="text-white hover:text-pink-200 transition-colors font-medium">
                Cómo Funciona
              </button>
              <button className="flex items-center text-white hover:text-pink-200 transition-colors font-medium">
                <Phone className="h-4 w-4 mr-2" />
                0800-555-AUTO
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20">
            <div className="px-4 pt-2 pb-4 space-y-3">
              <button className="block text-white hover:text-pink-200 py-2 font-medium w-full text-left">
                Inicio
              </button>
              <button className="block text-white hover:text-pink-200 py-2 font-medium w-full text-left">
                Beneficios
              </button>
              <button className="block text-white hover:text-pink-200 py-2 font-medium w-full text-left">
                Cómo Funciona
              </button>
              <button className="block text-white hover:text-pink-200 py-2 font-medium w-full text-left">
                Contacto
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Full Screen */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
              <span className="text-white text-sm font-semibold">4.9 de 5 estrellas</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              La manera más <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">fácil</span> de cotizar tu auto
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Compará precios de las mejores aseguradoras en segundos. Simple, rápido y sin llamadas molestas.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                { icon: Clock, text: 'Cotización en 30 seg' },
                { icon: Shield, text: '100% Seguro' },
                { icon: CheckCircle, text: 'Sin papeleos' }
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <benefit.icon className="h-6 w-6 text-white flex-shrink-0" />
                  <span className="text-white font-medium text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-3xl blur-2xl opacity-50"></div>
            
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Comenzá tu cotización
                </h2>
                <p className="text-gray-600">
                  Ingresá tu código postal para obtener las mejores ofertas
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="cp" className="block text-sm font-semibold text-gray-700 mb-3">
                    Código Postal
                  </label>
                  <input
                    id="cp"
                    type="text"
                    maxLength={4}
                    value={codigoPostal}
                    onChange={(e) => setCodigoPostal(e.target.value.replace(/\D/g, ''))}
                    onKeyPress={handleKeyPress}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all text-2xl text-center font-bold tracking-widest"
                    placeholder="1234"
                  />
                  {error && (
                    <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
                      <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                      {error}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                >
                  Cotizar Ahora - Es Gratis
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>Tus datos están protegidos y seguros</span>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="font-semibold">+50,000 personas</span> ya cotizaron
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="fixed bottom-8 right-8 bg-white rounded-full shadow-2xl px-6 py-3 hidden lg:flex items-center gap-3 animate-bounce">
        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        <div className="text-left">
          <div className="font-bold text-gray-900">4.9/5</div>
          <div className="text-xs text-gray-600">50,000+ reviews</div>
        </div>
      </div>
    </div>
  );
}