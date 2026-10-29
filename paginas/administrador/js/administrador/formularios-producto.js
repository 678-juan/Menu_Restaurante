// Validaci?n y mensajes de los formularios de productos.
export function configurarFormulariosProducto() {

  const feedback = document.querySelector(".admin-feedback");

  document.querySelectorAll(".tag-list").forEach((list) => {

    list.addEventListener("click", (event) => {

      const tag = event.target.closest("button");

      if (!tag) return;

      list.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));

      tag.classList.add("is-active");

    });

  });

  document.querySelectorAll("[data-product-form]").forEach((form) => {

    form.addEventListener("submit", (event) => {

      event.preventDefault();

      if (!form.checkValidity()) {

        form.reportValidity();

        return;

      }

      feedback.textContent = form.querySelector(".admin-submit").textContent + " correctamente.";

    });

  });

}
