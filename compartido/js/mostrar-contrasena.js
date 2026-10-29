// Control com?n para mostrar u ocultar contrase?as.
export function configurarMostrarContrasenas() {

  document.querySelectorAll(".password-toggle").forEach((button) => {

    button.addEventListener("click", () => {

      const input = button.closest(".input-control").querySelector("input");

      const visible = input.type === "password";

      input.type = visible ? "text" : "password";

      button.setAttribute("aria-label", visible ? "Ocultar contraseña" : "Mostrar contraseña");

    });

  });

}
