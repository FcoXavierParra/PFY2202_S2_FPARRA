import React from "react";
import { useInventario } from "../context/InventarioContext";

// Botones −/+ reutilizables; la etiqueta accesible indica el producto sobre el que actúan
function BotonesStock({ articulo }) {
  const { ajustarStock } = useInventario();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="btn-stock"
        onClick={() => ajustarStock(articulo.id, -1)}
        disabled={articulo.stock === 0}
        aria-label={`Restar una unidad de ${articulo.nombre}`}
      >
        −
      </button>
      <button
        type="button"
        className="btn-stock"
        onClick={() => ajustarStock(articulo.id, +1)}
        aria-label={`Sumar una unidad de ${articulo.nombre}`}
      >
        +
      </button>
    </div>
  );
}

export default BotonesStock;
