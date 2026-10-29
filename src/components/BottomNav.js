import React from "react";
import { NavLink } from "react-router-dom";

// NavLink es un Link que sabe si su ruta está activa: permite resaltar la pestaña actual.
function BottomNav() {
  const claseEnlace = ({ isActive }) =>
    `flex flex-1 flex-col items-center gap-0.5 border-t-4 py-2 text-xs sm:text-sm ${
      isActive ? "border-marca font-semibold text-marca" : "border-transparent text-gray-500 hover:text-marca"
    }`;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 flex border-t border-gray-200 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.06)]"
      aria-label="Navegación principal"
    >
      <NavLink to="/" end className={claseEnlace}>
        <span className="text-xl" aria-hidden="true">🏠</span>
        <span>Inicio</span>
      </NavLink>
      <NavLink to="/quienes-somos" className={claseEnlace}>
        <span className="text-xl" aria-hidden="true">🏬</span>
        <span>Quiénes somos</span>
      </NavLink>
      <NavLink to="/contactanos" className={claseEnlace}>
        <span className="text-xl" aria-hidden="true">✉️</span>
        <span>Contáctanos</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
