"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CotizacionForm from "@/components/CotizacionForm";

function FormularioContent() {
  const searchParams = useSearchParams();
  const codigoPostal = searchParams.get("cp") ?? "";

  return (
    <div className="w-full max-w-md mx-auto bg-white text-gray-900 rounded-xl shadow p-4 sm:p-6">
      <CotizacionForm codigoPostal={codigoPostal} />
    </div>
  );
}

export default function FormularioPage() {
  return (
    <Suspense fallback={<div className="text-white">Cargando…</div>}>
      <FormularioContent />
    </Suspense>
  );
}
