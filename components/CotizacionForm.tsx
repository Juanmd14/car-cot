"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Calendar,
  Car,
  ClipboardList,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

interface CotizacionFormProps {
  codigoPostal: string;
}

export default function CotizacionForm({ }: CotizacionFormProps) {  
  const [step, setStep] = useState(1);
  const [year, setYear] = useState<number | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [version, setVersion] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 text-center animate-fade">
        <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-3" />
        <h2 className="text-lg font-semibold mb-2">
          Cotización enviada correctamente
        </h2>
        <p className="text-sm text-gray-600 mb-5">
          Nos contactaremos por email a la brevedad.
        </p>

        <Link
          href="/"
          className="inline-block px-5 py-2 rounded-lg bg-indigo-600 text-white text-center hover:bg-indigo-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-4 sm:p-6">
      <div className="min-h-105 flex flex-col animate-fade">
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

        {/* BOTONES */}
        <div className="flex gap-3 mt-auto pt-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="w-1/2 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} /> Volver
            </button>
          )}

          <button
            onClick={() => {
              if (step < 4) setStep(step + 1);
              else setSent(true);
            }}
            disabled={
              (step === 1 && !year) ||
              (step === 2 && !brand) ||
              (step === 3 && !model) ||
              (step === 4 && (!version || !accepted))
            }
            className="flex-1 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step < 4 ? "Continuar" : "Cotizar"}
          </button>
        </div>
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
    <>
      <Calendar className="w-12 h-12 mx-auto mb-3 text-indigo-600" />
      <h2 className="text-lg font-semibold text-center mb-3">
        Año del vehículo
      </h2>

      <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelect(year)}
            className={`py-2 rounded-lg border text-sm transition
              ${
                value === year
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "hover:bg-indigo-50"
              }`}
          >
            {year}
          </button>
        ))}
      </div>
    </>
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
  ];

  return (
    <>
      <Car className="w-12 h-12 mx-auto mb-3 text-indigo-600" />
      <h2 className="text-lg font-semibold text-center mb-3">Marca</h2>

      <div className="grid grid-cols-2 gap-2">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => onSelect(brand)}
            className={`py-2 rounded-lg border text-sm transition
              ${
                value === brand
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "hover:bg-indigo-50"
              }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </>
  );
}

function StepModel({
  value,
  onSelect,
}: {
  value: string | null;
  onSelect: (v: string) => void;
}) {
  const models = ["Modelo A", "Modelo B", "Modelo C", "Modelo D"];

  return (
    <>
      <ClipboardList className="w-12 h-12 mx-auto mb-3 text-indigo-600" />
      <h2 className="text-lg font-semibold text-center mb-3">Modelo</h2>

      <div className="grid grid-cols-2 gap-2">
        {models.map((model) => (
          <button
            key={model}
            onClick={() => onSelect(model)}
            className={`py-2 rounded-lg border text-sm transition
              ${
                value === model
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "hover:bg-indigo-50"
              }`}
          >
            {model}
          </button>
        ))}
      </div>
    </>
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
    <>
      <h2 className="text-lg font-semibold text-center mb-4">
        Versión del vehículo
      </h2>

      <input
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        placeholder="Ej: 1.2..."
        className="w-full py-2 px-3 border rounded-lg text-sm mb-4"
      />

      <label className="flex gap-3 items-start text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1"
        />
        <span>
          <strong>Mi auto es de uso particular.</strong>
          <br />
          Funciona correctamente y se encuentra en buenas condiciones de chapa,
          pintura, cristales, ópticas y ruedas.
        </span>
      </label>
    </>
  );
}
