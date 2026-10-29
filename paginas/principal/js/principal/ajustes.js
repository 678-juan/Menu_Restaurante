// Menu de ajustes y cambio de tema de la pagina principal.
export function configurarAjustesPrincipal() {

  const page = document.querySelector(".menu-page");

  const popover = document.querySelector("[data-settings]");

  document.querySelector("[data-menu-toggle]").addEventListener("click", () => popover.classList.toggle("is-hidden"));

  document.querySelectorAll("[data-theme-value]").forEach((button) => {

    button.addEventListener("click", () => {

      page.dataset.theme = button.dataset.themeValue;

      popover.classList.add("is-hidden");

    });

  });

}
