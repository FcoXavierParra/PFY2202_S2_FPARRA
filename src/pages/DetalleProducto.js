import React from "react";
import { Link, useParams } from "react-router-dom";
import { useInventario } from "../context/InventarioContext";
import { STOCK_MINIMO } from "../data/productos";
import BotonesStock from "../components/BotonesStock";

function DetalleProducto() {
  // useParams lee los parámetros de la ruta dinámica /producto/:id
  const { id } = useParams();
  const { articulos } = useInventario();
  const producto = articulos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <section className="py-10 text-center">
        <h2 className="titulo-pagina">Producto no encontrado</h2>
        <p className="mb-6 text-gray-600">No existe un producto con el código {id}.</p>
        <Link to="/articulos" className="btn-primario">
          Volver a artículos
        </Link>
      </section>
    );
  }

  const bajoStock = producto.stock < STOCK_MINIMO;
  const datos = [
    ["Código", producto.id],
    ["Marca", producto.marca],
    ["Tipo de producto", producto.tipo],
    ["Precio", `$${producto.precio.toLocaleString("es-CL")}`],
    ["Stock mínimo", `${STOCK_MINIMO} unidades`],
  ];

  return (
    <section className="mx-auto max-w-2xl">
      <Link to="/articulos" className="mb-3 inline-block text-marca hover:underline">
        ← Volver a artículos
      </Link>
      <h2 className="titulo-pagina">{producto.nombre}</h2>

      <div className={`tarjeta ${bajoStock ? "bg-orange-50" : ""}`}>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {datos.map(([etiqueta, valor]) => (
            <div key={etiqueta}>
              <dt className="text-sm text-gray-500">{etiqueta}</dt>
              <dd className="font-medium">{valor}</dd>
            </div>
          ))}
          <div>
            <dt className="text-sm text-gray-500">Stock</dt>
            <dd className="font-medium">
              {producto.stock} unidades
              {bajoStock && (
                <span className="ml-2 rounded-full bg-orange-600 px-2 py-0.5 text-xs text-white">
                  ¡Reponer!
                </span>
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
          <span className="text-sm text-gray-600">Ajustar stock:</span>
          <BotonesStock articulo={producto} />
        </div>
      </div>
    </section>
  );
}

export default DetalleProducto;
