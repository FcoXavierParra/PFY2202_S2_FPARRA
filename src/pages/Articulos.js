import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useInventario } from "../context/InventarioContext";
import { STOCK_MINIMO, TIPOS_PRODUCTO } from "../data/productos";
import BotonesStock from "../components/BotonesStock";

// Lista en una tabla todos los artículos del estado global
function Articulos() {
  const { articulos, eliminarArticulo, restablecer } = useInventario();
  const [filtro, setFiltro] = useState("");
  const [tipo, setTipo] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Mensaje enviado por el formulario de ingreso mediante el state de la navegación
  const mensaje = location.state?.mensaje;
  const nuevoId = location.state?.nuevoId;
  const cerrarMensaje = () => navigate(location.pathname, { replace: true });

  const texto = filtro.trim().toLowerCase();
  const visibles = articulos.filter(
    (a) =>
      (tipo === "" || a.tipo === tipo) &&
      [a.nombre, a.marca, a.tipo].some((campo) => campo.toLowerCase().includes(texto))
  );

  const confirmarEliminar = (articulo) => {
    if (window.confirm(`¿Eliminar "${articulo.nombre}" del inventario?`)) {
      eliminarArticulo(articulo.id);
    }
  };

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="titulo-pagina mb-0">Artículos en inventario</h2>
        <Link to="/articulos/nuevo" className="btn-primario">
          + Nuevo artículo
        </Link>
      </div>

      {mensaje && (
        <div
          role="status"
          className="mb-4 flex items-start justify-between gap-3 rounded-lg border-l-4 border-marca bg-marca-claro p-3"
        >
          <span>{mensaje}</span>
          <button type="button" onClick={cerrarMensaje} className="text-sm text-marca underline">
            Cerrar
          </button>
        </div>
      )}

      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_220px]">
        <div>
          <label htmlFor="buscar-articulo" className="sr-only">
            Buscar por nombre, marca o tipo
          </label>
          <input
            id="buscar-articulo"
            className="campo"
            type="search"
            placeholder="Buscar por nombre, marca o tipo..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="filtro-tipo" className="sr-only">
            Filtrar por tipo de producto
          </label>
          <select id="filtro-tipo" className="campo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Todos los tipos</option>
            {TIPOS_PRODUCTO.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* overflow-x-auto: en pantallas pequeñas la tabla se desplaza en vez de desbordar */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <caption className="sr-only">Listado de artículos del inventario</caption>
          <thead className="bg-marca-claro text-xs uppercase tracking-wide text-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3">Nombre</th>
              <th scope="col" className="px-4 py-3">Marca</th>
              <th scope="col" className="px-4 py-3">Tipo</th>
              <th scope="col" className="px-4 py-3 text-right">Precio</th>
              <th scope="col" className="px-4 py-3 text-right">Stock</th>
              <th scope="col" className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visibles.map((a) => {
              const bajoStock = a.stock < STOCK_MINIMO;
              const esNuevo = a.id === nuevoId;
              return (
                <tr
                  key={a.id}
                  className={esNuevo ? "bg-marca-claro" : bajoStock ? "bg-orange-50" : "hover:bg-gray-50"}
                >
                  <td className="px-4 py-3">
                    <Link to={`/producto/${a.id}`} className="font-semibold text-marca hover:underline">
                      {a.nombre}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{a.marca}</td>
                  <td className="px-4 py-3">{a.tipo}</td>
                  <td className="px-4 py-3 text-right">${a.precio.toLocaleString("es-CL")}</td>
                  <td className="px-4 py-3 text-right">
                    {a.stock}
                    {bajoStock && (
                      <span className="ml-2 rounded-full bg-orange-600 px-2 py-0.5 text-xs text-white">
                        ¡Reponer!
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <BotonesStock articulo={a} />
                      <button
                        type="button"
                        onClick={() => confirmarEliminar(a)}
                        className="text-sm text-red-600 hover:underline"
                        aria-label={`Eliminar ${a.nombre}`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {visibles.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-400">
                  No se encontraron artículos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
        <span>
          Mostrando {visibles.length} de {articulos.length} artículos
        </span>
        <button type="button" onClick={restablecer} className="underline hover:text-marca">
          Restablecer datos de ejemplo
        </button>
      </div>
    </section>
  );
}

export default Articulos;
