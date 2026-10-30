import { obtenerClienteSupabase } from "./cliente.js";

const nombresCategorias = {
  ENTRADA: "Entradas",
  "PLATO FUERTE": "Platos Fuertes",
  POSTRE: "Postres",
  BEBIDAS: "Bebidas",
};

function obtenerNombreCategoria(etiqueta) {
  return nombresCategorias[etiqueta] || etiqueta;
}

export async function obtenerCategoriaId(etiqueta) {
  const cliente = obtenerClienteSupabase();
  const nombre = obtenerNombreCategoria(etiqueta);
  const { data, error } = await cliente
    .from("categorias")
    .select("id")
    .eq("nombre", nombre)
    .single();

  if (error) {
    throw error;
  }

  return data.id;
}

export async function subirImagenProducto(archivo, usuarioId) {
  if (!archivo) {
    return null;
  }

  if (!["image/jpeg", "image/png"].includes(archivo.type)) {
    throw new Error("La imagen debe estar en formato JPG o PNG.");
  }

  if (archivo.size > 5 * 1024 * 1024) {
    throw new Error("La imagen no puede superar los 5 MB.");
  }

  const extension = archivo.name.split(".").pop().toLowerCase();
  const ruta = `${usuarioId}/${crypto.randomUUID()}.${extension}`;
  const cliente = obtenerClienteSupabase();
  const { error: errorSubida } = await cliente.storage
    .from("imagenes-productos")
    .upload(ruta, archivo, { contentType: archivo.type });

  if (errorSubida) {
    throw errorSubida;
  }

  const { data } = cliente.storage
    .from("imagenes-productos")
    .getPublicUrl(ruta);

  return data.publicUrl;
}

export async function crearProducto({
  nombre,
  descripcion,
  precio,
  categoria,
  etiqueta,
  imagen,
  usuarioId,
}) {
  const cliente = obtenerClienteSupabase();
  const categoriaId = await obtenerCategoriaId(categoria);
  const imagenUrl = await subirImagenProducto(imagen, usuarioId);
  const { data, error } = await cliente
    .from("productos")
    .insert({
      nombre,
      descripcion,
      precio,
      categoria_id: categoriaId,
      etiqueta: etiqueta || null,
      imagen_url: imagenUrl,
      creado_por: usuarioId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function obtenerProductosDisponibles() {
  const { data, error } = await obtenerClienteSupabase()
    .from("productos")
    .select("id, nombre, descripcion, precio, etiqueta, imagen_url, categorias(nombre)")
    .eq("disponible", true)
    .order("creado_en", { ascending: false });

  if (error) {
    throw error;
  }

  return data.map((producto) => ({
    name: producto.nombre,
    category: convertirCategoria(producto.categorias?.nombre),
    tag: producto.etiqueta || "Disponible",
    price: formatearPrecio(producto.precio),
    image: producto.imagen_url || "../../recursos/productos/risotto.png",
    description: producto.descripcion,
  }));
}

function convertirCategoria(nombre) {
  const categorias = {
    Entradas: "entradas",
    "Platos Fuertes": "fuertes",
    Postres: "postres",
    Bebidas: "bebidas",
  };

  return categorias[nombre] || "otros";
}

function formatearPrecio(precio) {
  return `$${Number(precio).toLocaleString("es-CO")} COP`;
}
