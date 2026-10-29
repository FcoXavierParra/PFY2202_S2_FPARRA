// Inventario inicial del supermercado (datos de ejemplo)
export const inventarioInicial = [
  { id: 1, nombre: "Arroz Grado 1 1kg", marca: "Tucapel", tipo: "Abarrotes", stock: 120, precio: 1290 },
  { id: 2, nombre: "Leche Entera 1L", marca: "Colún", tipo: "Lácteos", stock: 48, precio: 990 },
  { id: 3, nombre: "Pan Molde Integral", marca: "Ideal", tipo: "Panadería", stock: 15, precio: 2190 },
  { id: 4, nombre: "Manzana Fuji kg", marca: "Granel", tipo: "Frutas y Verduras", stock: 6, precio: 1590 },
  { id: 5, nombre: "Detergente 3L", marca: "Omo", tipo: "Limpieza", stock: 22, precio: 6490 },
  { id: 6, nombre: "Pollo Entero kg", marca: "Super Pollo", tipo: "Carnes", stock: 9, precio: 3290 },
];

// Tipos de producto disponibles en el formulario de ingreso
export const TIPOS_PRODUCTO = [
  "Abarrotes",
  "Lácteos",
  "Panadería",
  "Frutas y Verduras",
  "Carnes",
  "Limpieza",
  "Bebidas",
  "Congelados",
];

export const STOCK_MINIMO = 10;
