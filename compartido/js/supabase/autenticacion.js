import { obtenerClienteSupabase } from "./cliente.js";

export async function registrarUsuario({ nombre, correo, contrasena, telefono }) {
  return obtenerClienteSupabase().auth.signUp({
    email: correo,
    password: contrasena,
    options: {
      data: {
        nombre_completo: nombre,
        telefono,
      },
    },
  });
}

export async function iniciarSesion(correo, contrasena) {
  return obtenerClienteSupabase().auth.signInWithPassword({
    email: correo,
    password: contrasena,
  });
}

export async function cerrarSesion() {
  return obtenerClienteSupabase().auth.signOut();
}

export async function obtenerUsuario() {
  const { data, error } = await obtenerClienteSupabase().auth.getUser();

  if (error) {
    return null;
  }

  return data.user;
}

export async function obtenerPerfil(usuarioId) {
  const { data, error } = await obtenerClienteSupabase()
    .from("perfiles")
    .select("id, nombre_completo, rol")
    .eq("id", usuarioId)
    .single();

  return { perfil: data, error };
}
