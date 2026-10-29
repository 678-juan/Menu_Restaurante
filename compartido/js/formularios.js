import {
  iniciarSesion,
  obtenerPerfil,
  registrarUsuario,
} from "./supabase/autenticacion.js";

function mostrarMensaje(feedback, mensaje, esError = false) {
  feedback.textContent = mensaje;
  feedback.dataset.estado = esError ? "error" : "exito";
}

export function configurarFormularios() {
  const feedback = document.querySelector(".feedback");

  document.querySelectorAll("[data-message]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      mostrarMensaje(feedback, link.dataset.message);
    });
  });

  document.querySelectorAll("[data-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const boton = form.querySelector(".submit-button");
      boton.disabled = true;
      mostrarMensaje(feedback, "Procesando...");

      try {
        const datos = new FormData(form);
        const respuesta = form.dataset.form === "register"
          ? await registrarUsuario({
              nombre: datos.get("name"),
              correo: datos.get("email"),
              contrasena: datos.get("password"),
              telefono: datos.get("phone"),
            })
          : await iniciarSesion(datos.get("email"), datos.get("password"));

        if (respuesta.error) {
          throw respuesta.error;
        }

        if (form.dataset.form === "register") {
          mostrarMensaje(feedback, respuesta.data.session
            ? "Cuenta creada correctamente. Redirigiendo..."
            : "Cuenta creada. Revisa tu correo para confirmar la cuenta.");
          if (respuesta.data.session) {
            window.location.href = "../principal/principal.html";
          }
        } else {
          mostrarMensaje(feedback, "Inicio de sesión correcto. Redirigiendo...");
          const { perfil, error: errorPerfil } = await obtenerPerfil(respuesta.data.user.id);

          if (errorPerfil) {
            throw errorPerfil;
          }

          window.location.href = perfil?.rol === "administrador"
            ? "../administrador/administrador.html"
            : "../principal/principal.html";
        }
      } catch (error) {
        mostrarMensaje(feedback, error.message || "No fue posible completar la operación.", true);
      } finally {
        boton.disabled = false;
      }

    });
  });
}
