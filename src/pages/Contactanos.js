import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Contactanos() {
  const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const navigate = useNavigate(); // hook de React Router para redirección programática

  // Redirección condicional: tras enviar, vuelve al inicio a los 2 segundos.
  // La función de limpieza cancela el temporizador si el usuario sale antes de la página.
  useEffect(() => {
    if (!enviado) return undefined;
    const temporizador = setTimeout(() => navigate("/"), 2000);
    return () => clearTimeout(temporizador);
  }, [enviado, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <section className="mx-auto max-w-2xl">
      <h2 className="titulo-pagina">Contáctanos</h2>

      <div className="tarjeta mb-4 space-y-1.5">
        <p><strong>Dirección:</strong> Av. Los Almendros 1234, Ñuñoa, Santiago</p>
        <p><strong>Teléfono:</strong> +56 2 2345 6789</p>
        <p><strong>Correo:</strong> contacto@supermarket.cl</p>
        <p><strong>Horario:</strong> Lunes a domingo, 08:00 a 22:00 hrs.</p>
      </div>

      <p className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
        Formulario de demostración: el mensaje no se envía ni se almacena.
      </p>

      {enviado ? (
        <div role="status" className="rounded-lg border-l-4 border-marca bg-marca-claro p-4">
          Gracias, {form.nombre}. Este es un formulario de prueba, así que tu mensaje no fue enviado.
          Te redirigimos al inicio...
        </div>
      ) : (
        <form className="tarjeta grid gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="contacto-nombre" className="mb-1 block text-sm font-medium">Nombre</label>
            <input id="contacto-nombre" name="nombre" className="campo" value={form.nombre} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="contacto-correo" className="mb-1 block text-sm font-medium">Correo electrónico</label>
            <input id="contacto-correo" type="email" name="correo" className="campo" value={form.correo} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="contacto-mensaje" className="mb-1 block text-sm font-medium">Mensaje</label>
            <textarea id="contacto-mensaje" name="mensaje" rows="4" className="campo" value={form.mensaje} onChange={handleChange} required />
          </div>
          <div>
            <button type="submit" className="btn-primario">Enviar</button>
          </div>
        </form>
      )}
    </section>
  );
}

export default Contactanos;
