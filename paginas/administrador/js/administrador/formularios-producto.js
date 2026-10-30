import { obtenerUsuario } from "../../../../compartido/js/supabase/autenticacion.js";
import { crearProducto } from "../../../../compartido/js/supabase/productos.js";

function obtenerEtiquetaActiva(form, indice) {
  return form.querySelectorAll(".tag-list")[indice]
    ?.querySelector(".is-active")
    ?.textContent
    .replace("⊕", "")
    .trim() || "";
}

function convertirPrecio(valor) {
  const texto = valor.trim().replace(/[^\d,.-]/g, "");
  const normalizado = texto.includes(",")
    ? (texto.split(",")[1].length === 3
      ? texto.replace(/,/g, "").replace(/\./g, "")
      : texto.replace(/\./g, "").replace(",", "."))
    : texto.replace(/\./g, "");

  return Number(normalizado);
}

export function configurarFormulariosProducto() {
  const feedback = document.querySelector(".admin-feedback");

  document.querySelectorAll(".tag-list").forEach((list) => {

    list.addEventListener("click", (event) => {

      const tag = event.target.closest("button");

      if (!tag) return;

      list.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));

      tag.classList.add("is-active");

    });

    document.querySelector("[data-campo='imagen']")?.addEventListener("change", (event) => {
      const archivo = event.target.files[0];
      const vistaPrevia = document.querySelector("[data-vista-previa]");

      if (!archivo || !vistaPrevia) {
        return;
      }

      vistaPrevia.src = URL.createObjectURL(archivo);
      vistaPrevia.classList.remove("is-hidden");
    });

  });

  document.querySelectorAll("[data-product-form]").forEach((form) => {
    if (!form.querySelector("[data-campo='nombre']")) {
      return;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const boton = form.querySelector(".admin-submit");
      boton.disabled = true;
      feedback.textContent = "Guardando producto...";

      try {
        const usuario = await obtenerUsuario();
        if (!usuario) {
          throw new Error("Tu sesión expiró. Inicia sesión nuevamente.");
        }

        const campos = {
          nombre: form.querySelector("[data-campo='nombre']").value.trim(),
          descripcion: form.querySelector("[data-campo='descripcion']").value.trim(),
          precio: convertirPrecio(form.querySelector("[data-campo='precio']").value),
          categoria: obtenerEtiquetaActiva(form, 0),
          etiqueta: obtenerEtiquetaActiva(form, 1),
          imagen: form.querySelector("[data-campo='imagen']")?.files[0] || null,
          usuarioId: usuario.id,
        };

        if (!Number.isFinite(campos.precio) || campos.precio < 0) {
          throw new Error("Ingresa un precio válido.");
        }

        await crearProducto(campos);
        feedback.textContent = "Producto publicado correctamente.";
        form.reset();
        const vistaPrevia = form.querySelector("[data-vista-previa]");
        if (vistaPrevia) {
          vistaPrevia.removeAttribute("src");
          vistaPrevia.classList.add("is-hidden");
        }
        form.querySelectorAll(".tag-list button").forEach((item) => item.classList.remove("is-active"));
        form.querySelector(".tag-list button")?.classList.add("is-active");
      } catch (error) {
        feedback.textContent = error.message || "No fue posible guardar el producto.";
      } finally {
        boton.disabled = false;
      }

    });
  });
}
