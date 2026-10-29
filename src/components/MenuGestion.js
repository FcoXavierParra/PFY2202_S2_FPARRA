import React from "react";
import { NavLink } from "react-router-dom";

// Menú de gestión en la cabecera: lleva a las dos páginas de administración del inventario
function MenuGestion() {
  const claseEnlace = ({ isActive }) =>
    isActive
      ? "rounded-t-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-marca"
      : "rounded-t-lg px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white";

  return (
    <nav className="mt-4 flex gap-1" aria-label="Gestión de inventario">
      {/* end: "Artículos" solo queda activo en /articulos y no en /articulos/nuevo */}
      <NavLink to="/articulos" end className={claseEnlace}>
        📋 Artículos
      </NavLink>
      <NavLink to="/articulos/nuevo" className={claseEnlace}>
        ➕ Nuevo artículo
      </NavLink>
    </nav>
  );
}

export default MenuGestion;
