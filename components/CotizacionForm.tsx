"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Calendar,
  Car,
  ClipboardList,
  CheckCircle,
  ArrowLeft,
  Home,
  Mail,
} from "lucide-react";

interface CotizacionFormProps {
  codigoPostal: string;
}

export default function CotizacionForm({}: CotizacionFormProps) {
  const [step, setStep] = useState(1);
  const [year, setYear] = useState<number | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [version, setVersion] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [sent, setSent] = useState(false);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  if (sent) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-50 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            ¡Cotización enviada!
          </h2>
          <p className="text-gray-600 mb-8">
            Hemos recibido tu solicitud. Te contactaremos a{" "}
            <span className="font-semibold text-indigo-600">{email}</span> a la
            brevedad.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all hover:shadow-lg"
          >
            <Home size={18} />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-50 p-4 pb-safe">
      {/* Header con botón Home */}
      <div className="max-w-md mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-indigo-700 hover:text-indigo-900 transition-colors font-medium"
        >
          <Home size={18} />
          <span className="text-sm">Inicio</span>
        </Link>
      </div>

      {/* Card principal */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Barra de progreso */}
        <div className="bg-gray-100 h-2">
          <div
            className="h-full bg-linear-to-r from-indigo-600 to-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Espacio para la barra de progreso */}
        <div className="px-6 pt-6 pb-4">
          {/* Solo la barra visual, sin texto */}
        </div>

        {/* Contenido del formulario */}
        <div className="px-6 pb-6">
          <div className="min-h-80 flex flex-col">
            {step === 1 && <StepYear value={year} onSelect={setYear} />}
            {step === 2 && <StepBrand value={brand} onSelect={setBrand} />}
            {step === 3 && <StepModel value={model} onSelect={setModel} />}
            {step === 4 && (
              <StepVersion
                version={version}
                setVersion={setVersion}
                accepted={accepted}
                setAccepted={setAccepted}
              />
            )}
            {step === 5 && (
              <StepEmail
                email={email}
                setEmail={setEmail}
              />
            )}

            {/* Botones de navegación */}
            <div className="flex gap-3 mt-auto pt-6">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="w-1/3 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center gap-2 font-medium transition-all"
                >
                  <ArrowLeft size={18} />
                  Atrás
                </button>
              )}

              <button
                onClick={() => {
                  if (step < totalSteps) setStep(step + 1);
                  else setSent(true);
                }}
                disabled={
                  (step === 1 && !year) ||
                  (step === 2 && !brand) ||
                  (step === 3 && !model) ||
                  (step === 4 && (!version.trim() || !accepted)) ||
                  (step === 5 && !email.trim())
                }
                className={`${
                  step > 1 ? "flex-1" : "w-full"
                } py-3 rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 text-white font-medium hover:from-indigo-700 hover:to-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg disabled:hover:shadow-md`}
              >
                {step < totalSteps ? "Continuar" : "Enviar cotización"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer opcional */}
      <div className="max-w-md mx-auto mt-6 text-center">
        <p className="text-sm text-gray-600">
          Proceso 100% seguro y confidencial
        </p>
      </div>
    </div>
  );
}

/* ───────── PASOS ───────── */

function StepYear({
  value,
  onSelect,
}: {
  value: number | null;
  onSelect: (v: number) => void;
}) {
  const years = Array.from({ length: 20 }, (_, i) => 2024 - i);

  return (
    <div className="animate-fade-in">
      <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Calendar className="w-8 h-8 text-indigo-600" />
      </div>
      <h2 className="text-xl font-bold text-center mb-2 text-gray-900">
        Año del vehículo
      </h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        Selecciona el año de fabricación
      </p>

      <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelect(year)}
            className={`py-3 px-2 rounded-xl border-2 text-sm font-medium transition-all
              ${
                value === year
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepBrand({
  value,
  onSelect,
}: {
  value: string | null;
  onSelect: (v: string) => void;
}) {
  const brands = [
    "Toyota",
    "Ford",
    "Chevrolet",
    "Volkswagen",
    "Fiat",
    "Renault",
    "Peugeot",
    "Honda",
    "Nissan",
    "Hyundai",
  ];

  return (
    <div className="animate-fade-in">
      <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Car className="w-8 h-8 text-indigo-600" />
      </div>
      <h2 className="text-xl font-bold text-center mb-2 text-gray-900">
        Marca del vehículo
      </h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        ¿Qué marca es tu auto?
      </p>

      <div className="grid grid-cols-2 gap-3">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => onSelect(brand)}
            className={`py-4 px-4 rounded-xl border-2 text-sm font-medium transition-all
              ${
                value === brand
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepModel({
  value,
  onSelect,
}: {
  value: string | null;
  onSelect: (v: string) => void;
}) {
  const models = [
    "Modelo A",
    "Modelo B",
    "Modelo C",
    "Modelo D",
    "Modelo E",
    "Modelo F",
  ];

  return (
    <div className="animate-fade-in">
      <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <ClipboardList className="w-8 h-8 text-indigo-600" />
      </div>
      <h2 className="text-xl font-bold text-center mb-2 text-gray-900">
        Modelo del vehículo
      </h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        Selecciona el modelo específico
      </p>

      <div className="grid grid-cols-2 gap-3">
        {models.map((model) => (
          <button
            key={model}
            onClick={() => onSelect(model)}
            className={`py-4 px-4 rounded-xl border-2 text-sm font-medium transition-all
              ${
                value === model
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
          >
            {model}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepVersion({
  version,
  setVersion,
  accepted,
  setAccepted,
}: {
  version: string;
  setVersion: (v: string) => void;
  accepted: boolean;
  setAccepted: (v: boolean) => void;
}) {
  return (
    <div className="animate-fade-in">
      <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <ClipboardList className="w-8 h-8 text-indigo-600" />
      </div>
      <h2 className="text-xl font-bold text-center mb-2 text-gray-900">
        Versión del vehículo
      </h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        Especifica la versión o motor
      </p>

      <div className="space-y-4">
        <input
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          placeholder="Ej: 1.4 Turbo LTZ"
          className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl text-sm focus:border-indigo-600 focus:outline-none transition-colors"
        />

        <label className="flex gap-3 items-start text-sm cursor-pointer bg-gray-50 p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-colors">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 accent-indigo-600"
          />
          <span className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Mi auto es de uso particular.</strong>
            <br />
            Funciona correctamente y se encuentra en buenas condiciones de chapa,
            pintura, cristales, ópticas y ruedas.
          </span>
        </label>
      </div>
    </div>
  );
}

function StepEmail({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (v: string) => void;
}) {
  return (
    <div className="animate-fade-in">
      <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Mail className="w-8 h-8 text-indigo-600" />
      </div>
      <h2 className="text-xl font-bold text-center mb-2 text-gray-900">
        Información de contacto
      </h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        ¿Dónde te enviamos la cotización?
      </p>

      <div className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl text-sm focus:border-indigo-600 focus:outline-none transition-colors"
        />

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-xs text-green-800">
            ✅ <strong>Último paso:</strong> Recibirás tu cotización personalizada en este email.
          </p>
        </div>
      </div>
    </div>
  );
}