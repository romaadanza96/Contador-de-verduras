const listaVentas = document.getElementById("lista-ventas");
const agregarBtn = document.getElementById("agregar");
const guardarBtn = document.getElementById("guardar");
const borrarBtn = document.getElementById("borrar");

let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

function renderizarVentas() {
	listaVentas.innerHTML = "";
	ventas.forEach((venta, index) => {
		const li = document.createElement("li");
		li.textContent = `${venta.producto} - Cantidad: ${venta.cantidad} - Precio: $${venta.precio}`;
		const eliminarBtn = document.createElement("button");
		eliminarBtn.textContent = "Eliminar";
		eliminarBtn.addEventListener("click", () => {
			ventas.splice(index, 1);
			renderizarVentas();
		});
		li.appendChild(eliminarBtn);
		listaVentas.appendChild(li);
	});
}

function agregarVenta() {
	const producto = document.getElementById("producto").value;
	const cantidad = parseInt(document.getElementById("cantidad").value);
	const precio = parseFloat(document.getElementById("precio").value);

	if (producto !== "" && cantidad > 0 && precio > 0) {
		if ((producto.toLowerCase() === "manzanas" || producto.toLowerCase() === "peras") && cantidad > 5) {
			alert(`No tenemos tantas ${producto}.`);
			return;
		}

		const venta = { producto, cantidad, precio };
		ventas.push(venta);
		renderizarVentas();
		document.getElementById("producto").value = "";
		document.getElementById("cantidad").value = "";
		document.getElementById("precio").value = "";
	}
}

function guardarVentas() {
	localStorage.setItem("ventas", JSON.stringify(ventas));
	alert("Ventas guardadas correctamente");
}

function borrarVentas() {
	localStorage.removeItem("ventas");
	ventas = [];
	renderizarVentas();
}

agregarBtn.addEventListener("click", agregarVenta);
guardarBtn.addEventListener("click", guardarVentas);
borrarBtn.addEventListener("click", borrarVentas);

renderizarVentas();

alert("VERDULERIA 'EL PASTELERO': FALTA STOCK EN MANZANAS Y PERAS!");
