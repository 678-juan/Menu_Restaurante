// Punto de entrada de la pagina principal.
import { productos } from "../../../datos/productos.js";
import { obtenerProductosDisponibles } from "../../../compartido/js/supabase/productos.js";

import { renderizarProductos, configurarFiltrosProductos } from "./principal/catalogo.js";

import { configurarAjustesPrincipal } from "./principal/ajustes.js";



configurarAjustesPrincipal();

async function cargarCatalogo() {
  let productosGuardados = [];

  try {
    productosGuardados = await obtenerProductosDisponibles();
  } catch (error) {
    console.error("No se pudieron cargar los productos de Supabase:", error);
  }

  const catalogo = [...productos, ...productosGuardados];
  renderizarProductos(catalogo);
  configurarFiltrosProductos(catalogo);
}

cargarCatalogo();
