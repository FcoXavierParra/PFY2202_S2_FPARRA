import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Articulos from "./pages/Articulos";
import NuevoArticulo from "./pages/NuevoArticulo";
import DetalleProducto from "./pages/DetalleProducto";
import QuienesSomos from "./pages/QuienesSomos";
import Contactanos from "./pages/Contactanos";
import NoEncontrado from "./pages/NoEncontrado";
import MenuGestion from "./components/MenuGestion";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 pb-24 text-gray-800">
      <header className="bg-marca text-white shadow">
        <div className="mx-auto max-w-5xl px-4 pt-4">
          <h1 className="text-xl font-bold sm:text-2xl">SuperMarket Inventario</h1>
          <p className="text-sm opacity-90">Gestión de inventario para supermercado</p>
          {/* Menú de gestión (nuevo en S2): artículos y formulario de ingreso */}
          <MenuGestion />
        </div>
      </header>

      {/* Área principal: React Router decide qué página renderizar según la URL */}
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/articulos/nuevo" element={<NuevoArticulo />} />
          {/* Ruta dinámica: :id toma el valor de la URL, por ejemplo /producto/3 */}
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/contactanos" element={<Contactanos />} />
          {/* La ruta comodín va al final: captura cualquier URL no definida */}
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>

      {/* Menú inferior: navegación principal del sitio */}
      <BottomNav />
    </div>
  );
}

export default App;
