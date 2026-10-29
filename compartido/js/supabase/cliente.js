import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./configuracion.js";

const configuracionValida =
  SUPABASE_URL.startsWith("https://") &&
  !SUPABASE_URL.includes("PEGA_AQUI") &&
  !SUPABASE_ANON_KEY.includes("PEGA_AQUI");

export const supabase = configuracionValida
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export function obtenerClienteSupabase() {
  if (!supabase) {
    throw new Error("Configura la URL y la clave anon en compartido/js/supabase/configuracion.js.");
  }

  return supabase;
}
