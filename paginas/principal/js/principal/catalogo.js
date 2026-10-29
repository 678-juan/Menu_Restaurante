// Renderizado, busqueda y filtrado del catalogo.
const cardTemplate = (product) => `

  <article class="product-card">

    <div class="product-photo">

      <img src="${product.image}" alt="${product.name}" loading="lazy" />

      <span class="product-tag ${product.tagStyle ? `product-tag--${product.tagStyle}` : ""}">${product.tag}</span>

    </div>

    <div class="product-info"><h2>${product.name}</h2><p>${product.description}</p></div>

    <div class="product-bottom"><span class="product-price">${product.price}</span><button class="add-product" type="button" aria-label="Agregar ${product.name}">+</button></div>

  </article>`;



export function renderizarProductos(items) {

  const container = document.querySelector("[data-productos]");

  container.innerHTML = items.length ? items.map(cardTemplate).join("") : '<p class="empty-productos">No encontramos platos con esa búsqueda.</p>';

  container.querySelectorAll(".add-product").forEach((button) => {

    button.addEventListener("click", () => {

      const originalLabel = button.getAttribute("aria-label");

      button.textContent = "✓";

      button.setAttribute("aria-label", "Producto agregado");

      window.setTimeout(() => {

        button.textContent = "+";

        button.setAttribute("aria-label", originalLabel);

      }, 1200);

    });

  });

}



export function configurarFiltrosProductos(items) {

  let selectedCategory = "all";

  const search = document.querySelector("[data-search]");

  const tabs = document.querySelectorAll("[data-category]");

  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filter = () => {

    const query = normalize(search.value.trim());

    renderizarProductos(items.filter((item) => (selectedCategory === "all" || item.category === selectedCategory) && normalize(`${item.name} ${item.description}`).includes(query)));

  };

  search.addEventListener("input", filter);

  tabs.forEach((tab) => tab.addEventListener("click", () => {

    selectedCategory = tab.dataset.category;

    tabs.forEach((item) => item.classList.toggle("is-active", item === tab));

    filter();

  }));

}
