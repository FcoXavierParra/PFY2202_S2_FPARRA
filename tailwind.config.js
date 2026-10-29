/** @type {import('tailwindcss').Config} */
module.exports = {
  // Archivos donde Tailwind busca clases para generar solo el CSS que se usa
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      // Colores propios del supermercado, disponibles como bg-marca, text-marca-oscuro, etc.
      colors: {
        marca: {
          DEFAULT: "#1b7f3b",
          oscuro: "#155f2c",
          claro: "#e3f1e8",
        },
      },
    },
  },
  plugins: [],
};
