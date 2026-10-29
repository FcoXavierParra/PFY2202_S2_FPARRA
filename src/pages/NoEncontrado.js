import React from "react";
import { Link } from "react-router-dom";

function NoEncontrado() {
  return (
    <section className="py-10 text-center">
      <h2 className="titulo-pagina">404 · Página no encontrada</h2>
      <p className="mb-6 text-gray-600">La ruta que intentaste abrir no existe.</p>
      <Link to="/" className="btn-primario">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NoEncontrado;
