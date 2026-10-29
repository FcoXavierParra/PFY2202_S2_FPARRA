import React from "react";

const valores = [
  ["Cercanía", "conocemos a nuestros clientes por su nombre."],
  ["Frescura", "reposición diaria de frutas, verduras y panadería."],
  ["Transparencia", "precios claros y sin letra chica."],
  ["Sustentabilidad", "reducimos mermas controlando el inventario."],
];

const equipo = [
  { iniciales: "MG", nombre: "María González", cargo: "Gerente General" },
  { iniciales: "JP", nombre: "Jorge Pérez", cargo: "Jefe de Bodega" },
  { iniciales: "CR", nombre: "Camila Rojas", cargo: "Atención al Cliente" },
];

function QuienesSomos() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="titulo-pagina">Quiénes somos</h2>
        <p className="leading-relaxed">
          <strong>SuperMarket</strong> es un supermercado de barrio fundado en 2010 en Santiago de Chile.
          Comenzamos como un almacén familiar y hoy contamos con tres locales y un equipo de 45 personas
          comprometidas con ofrecer productos frescos a precios justos.
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Nuestra misión</h3>
        <p className="leading-relaxed">
          Abastecer a las familias de nuestra comunidad con productos de calidad, manteniendo siempre el stock
          disponible gracias a una gestión de inventario moderna y transparente.
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Nuestros valores</h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {valores.map(([titulo, texto]) => (
            <li key={titulo} className="tarjeta">
              <strong className="text-marca">{titulo}:</strong> {texto}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Equipo</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {equipo.map((p) => (
            <div key={p.nombre} className="tarjeta flex flex-col items-center gap-1 text-center">
              <span className="mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-marca text-lg font-bold text-white">
                {p.iniciales}
              </span>
              <span className="font-medium">{p.nombre}</span>
              <small className="text-gray-500">{p.cargo}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuienesSomos;
