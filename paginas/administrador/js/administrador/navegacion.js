// Navegaci?n entre las vistas del administrador.
export function configurarNavegacionAdministrador() {

  const page = document.querySelector(".admin-page");

  const views = document.querySelectorAll("[data-admin-view]");

  const feedback = document.querySelector(".admin-feedback");



  document.querySelectorAll("[data-admin-link]").forEach((link) => {

    link.addEventListener("click", (event) => {

      event.preventDefault();

      const target = link.dataset.adminLink;

      page.dataset.adminScreen = target;

      views.forEach((view) => view.classList.toggle("is-hidden", view.dataset.adminView !== target));

      window.scrollTo({ top: 0, behavior: "smooth" });

      if (feedback) feedback.textContent = "";

    });

  });

}
