// Validaci?n y mensajes comunes de los formularios de acceso.
export function configurarFormularios() {

  const feedback = document.querySelector(".feedback");



  document.querySelectorAll("[data-message]").forEach((link) => {

    link.addEventListener("click", (event) => {

      event.preventDefault();

      feedback.textContent = link.dataset.message;

    });

  });



  document.querySelectorAll("[data-form]").forEach((form) => {

    form.addEventListener("submit", (event) => {

      event.preventDefault();

      if (!form.checkValidity()) {

        form.reportValidity();

        return;

      }

      feedback.textContent = form.dataset.form === "register"

        ? "Cuenta creada correctamente. La conexión con el servidor se agregará después."

        : "Inicio de sesión válido. La conexión con el servidor se agregará después.";

    });

  });

}
