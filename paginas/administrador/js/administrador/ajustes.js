// Preferencias visuales y cierre de sesi?n del administrador.
export function configurarAjustesAdministrador() {

  const menu = document.querySelector("[data-settings-menu]");

  document.querySelector("[data-settings-toggle]")?.addEventListener("click", () => menu.classList.toggle("is-hidden"));

  document.querySelectorAll("[data-theme]").forEach((button) => {

    button.addEventListener("click", () => {

      document.querySelectorAll("[data-theme]").forEach((item) => item.classList.remove("is-selected"));

      button.classList.add("is-selected");

      document.body.dataset.theme = button.dataset.theme;

      menu.classList.add("is-hidden");

    });

  });

  document.querySelector("[data-logout]")?.addEventListener("click", () => {

    window.location.href = "../inicio-sesion/inicio-sesion.html";

  });

}
