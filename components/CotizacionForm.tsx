"use client";

import { useState, useRef, useEffect } from "react";
import { Car, User, Calendar, ChevronDown, Mail } from "lucide-react";

type CotizacionFormProps = {
  codigoPostal: string;
};

type FormData = {
  marca: string;
  año: string;
  email: string;
  fechaNacimiento: string;
  genero: string;
};

type Errors = Record<string, string>;

// Base de datos de marcas populares
const MARCAS_AUTOS = [
  "Audi",
  "BMW",
  "Chevrolet",
  "Chrysler",
  "Citroën",
  "Dodge",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
  "Mercedes-Benz",
  "Nissan",
  "Peugeot",
  "Renault",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

export default function CotizacionForm({ codigoPostal }: CotizacionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    marca: "",
    año: "",
    email: "",
    fechaNacimiento: "",
    genero: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredMarcas, setFilteredMarcas] = useState<string[]>([]);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Cerrar sugerencias al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Filtrar marcas mientras el usuario escribe
    if (name === "marca") {
      if (value.trim() === "") {
        setFilteredMarcas([]);
        setShowSuggestions(false);
      } else {
        const filtered = MARCAS_AUTOS.filter((marca) =>
          marca.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredMarcas(filtered);
        setShowSuggestions(filtered.length > 0);
      }
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectMarca = (marca: string) => {
    setFormData((prev) => ({
      ...prev,
      marca: marca,
    }));
    setShowSuggestions(false);
    setFilteredMarcas([]);
    
    if (errors.marca) {
      setErrors((prev) => ({
        ...prev,
        marca: "",
      }));
    }
  };

  const validate = () => {
    const newErrors: Errors = {};

    if (!formData.marca.trim()) newErrors.marca = "La marca es requerida";
    if (!formData.año) newErrors.año = "El año es requerido";
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    // Validación de fecha de nacimiento
    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
    } else {
      const year = new Date(formData.fechaNacimiento).getFullYear();
      if (year < 1920 || year > 2026) {
        newErrors.fechaNacimiento = "Fecha inválida (1920-2026)";
      }
    }
    
    if (!formData.genero) newErrors.genero = "El género es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setSubmitted(true);
      console.log("Datos del formulario:", {
        ...formData,
        codigoPostal,
      });

      // Acá después va la API
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          ¡Cotización enviada!
        </h3>
        <p className="text-gray-600 mb-8">
          Te contactaremos pronto con las mejores ofertas para tu vehículo.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 cursor-pointer"
        >
          Hacer otra cotización
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Datos del Vehículo */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Car className="h-6 w-6 text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-900">
            Datos del Vehículo
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative" ref={suggestionRef}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Marca *
            </label>
            <div className="relative">
              <input
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                onFocus={() => {
                  if (formData.marca.trim() !== "" && filteredMarcas.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all text-gray-900"
                placeholder="Escribe para buscar..."
                autoComplete="off"
              />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            
            {/* Sugerencias */}
            {showSuggestions && filteredMarcas.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {filteredMarcas.map((marca, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectMarca(marca)}
                    className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 group"
                  >
                    <Car className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    <span className="text-gray-900 group-hover:text-purple-900 font-medium">
                      {marca}
                    </span>
                  </button>
                ))}
              </div>
            )}
            
            {errors.marca && (
              <p className="mt-2 text-sm text-red-600">{errors.marca}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Año *
            </label>
            <input
              name="año"
              type="number"
              min="1990"
              max="2026"
              value={formData.año}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all text-gray-900"
              placeholder="2020"
            />
            {errors.año && (
              <p className="mt-2 text-sm text-red-600">{errors.año}</p>
            )}
          </div>
        </div>
      </div>

      {/* Datos Personales */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <User className="h-6 w-6 text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-900">
            Datos Personales
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Mail className="inline h-4 w-4 mr-1" />
              Email *
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all text-gray-900"
              placeholder="ejemplo@email.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Fecha de Nacimiento *
            </label>
            <input
              name="fechaNacimiento"
              type="date"
              min="1920-01-01"
              max="2026-12-31"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all text-gray-900"
            />
            {errors.fechaNacimiento && (
              <p className="mt-2 text-sm text-red-600">
                {errors.fechaNacimiento}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Género *
            </label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all text-gray-900"
            >
              <option value="">Seleccionar...</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
            {errors.genero && (
              <p className="mt-2 text-sm text-red-600">{errors.genero}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg cursor-pointer"
      >
        Obtener Cotización
      </button>
    </form>
  );
}