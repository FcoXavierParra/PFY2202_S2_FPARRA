# Supermercado – Gestión de Inventario

**Alumno:** Francisco Parra
**Asignatura:** Desarrollo Frontend II (PFY2202)
**Actividad:** Formativa 2 – Semana 2: "Implementando gestión de estado en componentes frontend con React"

Continuación de la actividad formativa 1. Sitio web SPA en React para la gestión de inventario de un supermercado. En esta entrega se agrega un **estado global** con los artículos del inventario, un **nuevo menú de gestión** con una página para **ingresar artículos** y otra que los **lista en una tabla**, y se migran los estilos a **Tailwind CSS**.

## Páginas y rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Inicio | Panel con indicadores (artículos, unidades, valor del stock, por reponer) y lista de artículos con stock bajo 10 unidades. |
| `/articulos` | Artículos | **Nuevo.** Tabla con todos los artículos (nombre, marca, tipo, precio, stock); búsqueda, filtro por tipo, ajuste de stock y eliminación. |
| `/articulos/nuevo` | Nuevo artículo | **Nuevo.** Formulario controlado con validaciones para ingresar artículos al inventario. |
| `/producto/:id` | Detalle de producto | Ruta dinámica: muestra el artículo según el `id` de la URL (`useParams`). |
| `/quienes-somos` | Quiénes somos | Historia, misión, valores y equipo. |
| `/contactanos` | Contáctanos | Datos de contacto y formulario de demostración. |
| `*` | 404 | Página para rutas no definidas. |

**Menús:** el menú de gestión (cabecera) lleva a *Artículos* y *Nuevo artículo*; el menú inferior fijo lleva a *Inicio*, *Quiénes somos* y *Contáctanos*.

## Gestión de estado global (Context API + useReducer)

`src/context/InventarioContext.js`:

- `InventarioProvider` envuelve la aplicación en `src/index.js` y comparte la lista de artículos (`id`, `nombre`, `marca`, `tipo`, `precio`, `stock`).
- `useReducer` concentra los cambios en un reducer con las acciones `AGREGAR`, `AJUSTAR_STOCK`, `ELIMINAR` y `RESTABLECER`.
- El hook propio `useInventario()` permite a cualquier página leer y modificar el inventario sin pasar props por cada nivel.
- El estado se guarda en `localStorage`, así los artículos agregados se mantienen al recargar la página. El botón *Restablecer datos de ejemplo* vuelve al inventario inicial.

## Framework CSS: Tailwind CSS

- Instalado como dependencia de desarrollo (`tailwindcss` v3) y configurado en `tailwind.config.js`, con colores propios del sitio (`marca`, `marca-oscuro`, `marca-claro`) en `theme.extend`.
- `src/index.css` incluye las directivas `@tailwind` y algunas clases reutilizables con `@apply` (`btn-primario`, `campo`, `tarjeta`, etc.).
- Los componentes usan clases utilitarias y variantes responsivas (`sm:`, `lg:`) para tarjetas, formularios y tablas.

## Mejoras a partir de la retroalimentación de la formativa 1

- El formulario de contacto indica que es una **demostración** y que el mensaje no se envía ni se almacena.
- El temporizador de redirección se maneja con `useEffect` y se **cancela** si el usuario sale de la página antes de los 2 segundos.
- Las tablas están dentro de un contenedor con **desplazamiento horizontal** y las tarjetas del resumen se **reorganizan** según el ancho de pantalla.
- El buscador y los filtros tienen **etiquetas accesibles**, y los botones de stock indican el producto sobre el que actúan (por ejemplo, "Sumar una unidad de Leche Entera 1L").

## Estructura

```
public/index.html
tailwind.config.js             Configuración de Tailwind CSS
src/
  index.js                     BrowserRouter + InventarioProvider
  index.css                    Directivas de Tailwind y clases reutilizables
  App.js                       Layout y definición de rutas
  context/InventarioContext.js Estado global (Context + useReducer)
  data/productos.js            Datos iniciales y tipos de producto
  components/MenuGestion.js    Menú de gestión (Artículos / Nuevo artículo)
  components/BottomNav.js      Menú inferior de navegación
  components/BotonesStock.js   Botones −/+ reutilizables
  pages/Home.js                Panel de inventario
  pages/Articulos.js           Tabla de artículos
  pages/NuevoArticulo.js       Formulario de ingreso
  pages/DetalleProducto.js     Detalle (ruta dinámica)
  pages/QuienesSomos.js
  pages/Contactanos.js
  pages/NoEncontrado.js
```

## Ejecución local

Requisitos: Node.js 24 (versión usada en desarrollo y en el deploy).

```bash
git clone https://github.com/FcoXavierParra/PFY2202_S2_FPARRA.git
cd PFY2202_S2_FPARRA
npm install
npm start
```

La aplicación queda disponible en http://localhost:3000.

## Sitio publicado

https://fcoxavierparra.github.io/PFY2202_S2_FPARRA/

Se publica automáticamente en GitHub Pages con cada push a `main` (`.github/workflows/deploy.yml`).

## Tecnologías

HTML, JavaScript, React 18, React Router DOM 6, Context API + useReducer, Tailwind CSS 3, Create React App (react-scripts 5).
