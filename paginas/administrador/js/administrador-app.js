// Punto de entrada del panel administrador.
import { configurarNavegacionAdministrador } from "./administrador/navegacion.js";

import { configurarAjustesAdministrador } from "./administrador/ajustes.js";

import { configurarFormulariosProducto } from "./administrador/formularios-producto.js";

import { obtenerPerfil, obtenerUsuario } from "../../../compartido/js/supabase/autenticacion.js";

async function iniciarPanelAdministrador() {
  const usuario = await obtenerUsuario();
  if (!usuario) {
    window.location.href = "../inicio-sesion/inicio-sesion.html";
    return;
  }

  const { perfil, error } = await obtenerPerfil(usuario.id);
  if (error || perfil?.rol !== "administrador") {
    window.location.href = "../principal/principal.html";
    return;
  }

  configurarNavegacionAdministrador();
  configurarAjustesAdministrador();
  configurarFormulariosProducto();
}

iniciarPanelAdministrador();
