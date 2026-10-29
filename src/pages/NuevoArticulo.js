import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInventario } from "../context/InventarioContext";
import { TIPOS_PRODUCTO } from "../data/productos";

const formularioVacio = { nombre: "", marca: "", tipo: "", precio: "", stock: "" };

// Valida los datos y devuelve un objeto { campo: mensaje } con los errores encontrados
function validar(form, articulos) {
  const errores = {};
  const nombre = form.nombre.trim();
  const marca = form.marca.trim();

  if (nombre.length < 3) errores.nombre = "Ingresa un nombre de al menos 3 caracteres.";
  if (marca.length < 2) errores.marca = "Ingresa la marca del producto.";
  if (!form.tipo) errores.tipo = "Selecciona un tipo de producto.";

  const precio = Number(form.precio);
  if (form.precio === "" || !Number.isInteger(precio) || precio <= 0) {
    errores.precio = "El precio debe ser un número entero mayor a 0.";
  }
  const stock = Number(form.stock);
  if (form.stock === "" || !Number.isInteger(stock) || stock < 0) {
    errores.stock = "El stock debe ser un número entero igual o mayor a 0.";
  }

  const duplicado = articulos.some(
    (a) => a.nombre.toLowerCase() === nombre.toLowerCase() && a.marca.toLowerCase() === marca.toLowerCase()
  );
  if (duplicado) errores.nombre = "Ya existe un artículo con ese nombre y marca.";

  return errores;
}

// Mensaje de error asociado a un campo (aria-describedby apunta a su id)
function MensajeError({ campo, errores }) {
  if (!errores[campo]) return null;
  return (
    <p id={`error-${campo}`} className="mt-1 text-sm text-red-600">
      {errores[campo]}
    </p>
  );
}

function NuevoArticulo() {
  const { articulos, agregarArticulo } = useInventario();
  const [form, setForm] = useState(formularioVacio);
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Al corregir un campo se limpia su mensaje de error
    if (errores[name]) setErrores({ ...errores, [name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const encontrados = validar(form, articulos);
    if (Object.keys(encontrados).length > 0) {
      setErrores(encontrados);
      return;
    }

    const nuevoId = agregarArticulo({
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      tipo: form.tipo,
      precio: Number(form.precio),
      stock: Number(form.stock),
    });
    // Se vuelve al listado indicando qué artículo se agregó
    navigate("/articulos", {
      state: { mensaje: `Se agregó "${form.nombre.trim()}" al inventario.`, nuevoId },
    });
  };

  // Clases del campo según tenga o no error
  const claseCampo = (campo) => (errores[campo] ? "campo border-red-500" : "campo");

  return (
    <section className="mx-auto max-w-2xl">
      <h2 className="titulo-pagina">Nuevo artículo</h2>
      <p className="mb-4 text-gray-600">
        Completa los datos para ingresar un artículo al inventario. Todos los campos son obligatorios.
      </p>

      <form onSubmit={handleSubmit} noValidate className="tarjeta grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="nombre" className="mb-1 block text-sm font-medium">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            className={claseCampo("nombre")}
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Yogur Natural 1kg"
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? "error-nombre" : undefined}
          />
          <MensajeError campo="nombre" errores={errores} />
        </div>

        <div>
          <label htmlFor="marca" className="mb-1 block text-sm font-medium">
            Marca
          </label>
          <input
            id="marca"
            name="marca"
            className={claseCampo("marca")}
            value={form.marca}
            onChange={handleChange}
            placeholder="Ej: Soprole"
            aria-invalid={Boolean(errores.marca)}
            aria-describedby={errores.marca ? "error-marca" : undefined}
          />
          <MensajeError campo="marca" errores={errores} />
        </div>

        <div>
          <label htmlFor="tipo" className="mb-1 block text-sm font-medium">
            Tipo de producto
          </label>
          <select
            id="tipo"
            name="tipo"
            className={claseCampo("tipo")}
            value={form.tipo}
            onChange={handleChange}
            aria-invalid={Boolean(errores.tipo)}
            aria-describedby={errores.tipo ? "error-tipo" : undefined}
          >
            <option value="">Selecciona un tipo</option>
            {TIPOS_PRODUCTO.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <MensajeError campo="tipo" errores={errores} />
        </div>

        <div>
          <label htmlFor="precio" className="mb-1 block text-sm font-medium">
            Precio (CLP)
          </label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="1"
            step="1"
            className={claseCampo("precio")}
            value={form.precio}
            onChange={handleChange}
            placeholder="Ej: 1890"
            aria-invalid={Boolean(errores.precio)}
            aria-describedby={errores.precio ? "error-precio" : undefined}
          />
          <MensajeError campo="precio" errores={errores} />
        </div>

        <div>
          <label htmlFor="stock" className="mb-1 block text-sm font-medium">
            Stock inicial (unidades)
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            className={claseCampo("stock")}
            value={form.stock}
            onChange={handleChange}
            placeholder="Ej: 30"
            aria-invalid={Boolean(errores.stock)}
            aria-describedby={errores.stock ? "error-stock" : undefined}
          />
          <MensajeError campo="stock" errores={errores} />
        </div>

        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button type="submit" className="btn-primario">
            Agregar artículo
          </button>
          <button
            type="button"
            className="btn-secundario"
            onClick={() => {
              setForm(formularioVacio);
              setErrores({});
            }}
          >
            Limpiar
          </button>
        </div>
      </form>
    </section>
  );
}

export default NuevoArticulo;
