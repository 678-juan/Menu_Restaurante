import { cerrarSesion } from "../../../../compartido/js/supabase/autenticacion.js";

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

  document.querySelector("[data-logout]")?.addEventListener("click", async () => {
    const boton = document.querySelector("[data-logout]");
    boton.disabled = true;
    const { error } = await cerrarSesion();
    if (error) {
      boton.disabled = false;
      return;
    }
    window.location.href = "../inicio-sesion/inicio-sesion.html";
  });

}
