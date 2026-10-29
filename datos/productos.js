// Catalogo central de productos mostrado en la pagina principal.
const obtenerImagen = (name) => `../../recursos/productos/${name}.png`;



export const productos = [

  { name: "Risotto de Trufa", category: "entradas", tag: "Vegetariano", tagStyle: "green", price: "$29,900 COP", image: obtenerImagen("risotto"), description: "Arroz arborio cremoso cocinado lentamente con caldo de hongos silvestres, trufa negra fresca rallada y parmesano reggiano." },

  { name: "Salmón a la Parrilla", category: "fuertes", tag: "Gluten Free", tagStyle: "accent", price: "$59,900 COP", image: obtenerImagen("salmon"), description: "Filete de salmón salvaje al grill sobre un puré aterciopelado de camote, espárragos frescos tiernos y reducción de cítricos." },

  { name: "Tacos al Pastor", category: "fuertes", tag: "Clásico", price: "$12,900 COP", image: obtenerImagen("tacos"), description: "Tres tacos tradicionales en tortilla de maíz, pastor, piña y cebolla fresca." },

  { name: "Ensalada César", category: "entradas", tag: "Clásico", price: "$34,900 COP", image: obtenerImagen("ensalada"), description: "Lechuga romana crujiente, crotones de focaccia hechos en casa, aderezo César y queso pecorino." },

  { name: "Pasta Carbonara", category: "fuertes", tag: "Firma", tagStyle: "accent", price: "$35,900 COP", image: obtenerImagen("carbonara"), description: "Espagueti hecho en casa con guanciale crujiente, yema de huevo orgánico, pimienta negra y pecorino romano." },

  { name: "Filete Mignon", category: "fuertes", tag: "Premium", tagStyle: "accent", price: "$89,900 COP", image: obtenerImagen("filete"), description: "Corte premium de res con salsa de pimienta y acompañamiento de temporada." },

  { name: "Ceviche Clásico", category: "entradas", tag: "Gluten Free", tagStyle: "green", price: "$29,900 COP", image: obtenerImagen("ceviche"), description: "Pesca fresca del día marinada en leche de tigre, cebolla morada, cilantro y camote." },

  { name: "Paella Valenciana", category: "fuertes", tag: "Firma", tagStyle: "accent", price: "$39,900 COP", image: obtenerImagen("paella"), description: "Arroz bomba cocinado a fuego abierto con azafrán, camarones, calamares, mejillones y limón." },

  { name: "Tiramisú de la Casa", category: "postres", tag: "Dulce", price: "$19,900 COP", image: obtenerImagen("tiramisu"), description: "Bizcocho de soletilla empapado en café espresso y licor de café, con crema de mascarpone y cacao." }

];
