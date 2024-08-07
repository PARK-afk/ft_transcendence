var i = 0;

function Persistents(context) {
	let div = document.createElement("div");
	div.innerHTML = /*html*/`
		<div class="container-fluid" id="persistent-container"></div>
	`;
	let container = div.querySelector("#persistent-container");
	let j = 0;
	while (context.persistent.length > 0) {
		let persistent = context.persistent.shift();
		let className = persistent.ok ? "success" : "error";
		container.innerHTML += /*html*/`
			<div id="persistent-container-${i}" class="container alert alert-dismissible fade show container-blur-${className}" role="alert">
				<div class="content"></div>
				<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>
		`;
		container.querySelector(`#persistent-container-${i} .content`).innerText = persistent.message;
		setTimeout((i) => {
			try {
				document.getElementById(`persistent-container-${i}`).remove();
			} catch (ignored) {
			}
		}, 4000 + 130 * j, i);
		i++;
		j++;
		if (i > 100000)
			i = 0;
	}
	return div.innerHTML;
}

function overridePersistents(context) {
	let container = document.querySelector("#persistent-container");
	if (container)
		container.outerHTML = Persistents(context);
}

export { Persistents, overridePersistents };
