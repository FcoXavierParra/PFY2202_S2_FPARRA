import React, { createContext, useContext, useEffect, useReducer } from "react";
import { inventarioInicial } from "../data/productos";

// Estado global del inventario: Context API + useReducer.
// Cualquier componente dentro de <InventarioProvider> puede leer la lista de artículos
// y modificarla con dispatch, sin pasar props por cada nivel.

const InventarioContext = createContext(null);

const CLAVE_STORAGE = "supermarket-inventario";

// El reducer concentra todas las formas de cambiar el inventario
function inventarioReducer(articulos, accion) {
  switch (accion.type) {
    case "AGREGAR":
      return [...articulos, accion.articulo];
    case "AJUSTAR_STOCK":
      return articulos.map((a) =>
        a.id === accion.id ? { ...a, stock: Math.max(0, a.stock + accion.delta) } : a
      );
    case "ELIMINAR":
      return articulos.filter((a) => a.id !== accion.id);
    case "RESTABLECER":
      return inventarioInicial;
    default:
      throw new Error(`Acción desconocida: ${accion.type}`);
  }
}

// Estado inicial: lo guardado en el navegador o, si no hay, los datos de ejemplo
function cargarInventario() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    return guardado ? JSON.parse(guardado) : inventarioInicial;
  } catch {
    return inventarioInicial;
  }
}

export function InventarioProvider({ children }) {
  const [articulos, dispatch] = useReducer(inventarioReducer, undefined, cargarInventario);

  // Cada cambio se guarda para que los artículos agregados no se pierdan al recargar
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(articulos));
    } catch {
      // Sin almacenamiento disponible el sitio sigue funcionando en memoria
    }
  }, [articulos]);

  const valor = {
    articulos,
    // Asigna el siguiente id disponible y lo devuelve para poder destacar el artículo nuevo
    agregarArticulo: (articulo) => {
      const id = articulos.reduce((max, a) => Math.max(max, a.id), 0) + 1;
      dispatch({ type: "AGREGAR", articulo: { ...articulo, id } });
      return id;
    },
    ajustarStock: (id, delta) => dispatch({ type: "AJUSTAR_STOCK", id, delta }),
    eliminarArticulo: (id) => dispatch({ type: "ELIMINAR", id }),
    restablecer: () => dispatch({ type: "RESTABLECER" }),
  };

  return <InventarioContext.Provider value={valor}>{children}</InventarioContext.Provider>;
}

// Hook propio para consumir el contexto con un nombre claro
export function useInventario() {
  const contexto = useContext(InventarioContext);
  if (!contexto) {
    throw new Error("useInventario debe usarse dentro de InventarioProvider");
  }
  return contexto;
}
