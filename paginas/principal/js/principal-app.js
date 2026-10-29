// Punto de entrada de la pagina principal.
import { productos } from "../../../datos/productos.js";

import { renderizarProductos, configurarFiltrosProductos } from "./principal/catalogo.js";

import { configurarAjustesPrincipal } from "./principal/ajustes.js";



renderizarProductos(productos);

configurarFiltrosProductos(productos);

configurarAjustesPrincipal();
