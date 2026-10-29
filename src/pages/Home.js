import React from "react";
import { Link } from "react-router-dom";
import { useInventario } from "../context/InventarioContext";
import { STOCK_MINIMO } from "../data/productos";
import BotonesStock from "../components/BotonesStock";

// Panel de inicio: resumen del inventario y artículos que requieren reposición
function Home() {
  const { articulos } = useInventario();

  const totalUnidades = articulos.reduce((acc, a) => acc + a.stock, 0);
  const valorInventario = articulos.reduce((acc, a) => acc + a.stock * a.precio, 0);
  const porReponer = articulos
    .filter((a) => a.stock < STOCK_MINIMO)
    .sort((a, b) => a.stock - b.stock);

  const indicadores = [
    { etiqueta: "Artículos", valor: articulos.length },
    { etiqueta: "Unidades", valor: totalUnidades.toLocaleString("es-CL") },
    { etiqueta: "Valor del stock", valor: `$${valorInventario.toLocaleString("es-CL")}` },
    { etiqueta: "Por reponer", valor: porReponer.length, alerta: porReponer.length > 0 },
  ];

  return (
    <section>
      <h2 className="titulo-pagina">Panel de inventario</h2>

      {/* Las tarjetas pasan de 2 a 4 columnas según el ancho de pantalla */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {indicadores.map((i) => (
          <div key={i.etiqueta} className={`tarjeta text-center ${i.alerta ? "bg-orange-50" : ""}`}>
            <span className="block text-2xl font-bold">{i.valor}</span>
            <span className="text-sm text-gray-500">{i.etiqueta}</span>
          </div>
        ))}
      </div>

      <div className="tarjeta">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">Artículos por reponer</h3>
          <span className="text-sm text-gray-500">Stock menor a {STOCK_MINIMO} unidades</span>
        </div>

        {porReponer.length === 0 ? (
          <p className="text-gray-500">Todo el inventario tiene stock suficiente. ✅</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {porReponer.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <Link to={`/producto/${a.id}`} className="font-semibold text-marca hover:underline">
                    {a.nombre}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {a.marca} · {a.tipo}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-orange-600 px-2 py-0.5 text-xs text-white">
                    {a.stock} u.
                  </span>
                  <BotonesStock articulo={a} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/articulos" className="btn-primario">
          Ver todos los artículos
        </Link>
        <Link to="/articulos/nuevo" className="btn-secundario">
          Agregar artículo
        </Link>
      </div>
    </section>
  );
}

export default Home;
