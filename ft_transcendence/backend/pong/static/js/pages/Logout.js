import { getJson } from "../utils.js";
import { getLang, persistError, persistSuccess, popNext, redirect } from "../route.js";
import { NavBar } from "../components/NavBar.js";
import { Persistents, overridePersistents } from "../components/Persistents.js";

function Logout(context) {
	let div = document.createElement("div");
	div.innerHTML = NavBar(getLang(context, "pages.logout.title"), context);
	div.innerHTML += Persistents(context);
	getJson("/api/logout").then(data => {
		if (data.ok) {
			context.user.is_authenticated = false;
			persistSuccess(context, getLang(context, data.success));
			if (context.user.is_authenticated) {
				context.user.is_authenticated = false;
				if (!context.next)
					overridePersistents(context);
			}
			if (context.next)
				redirect(popNext(context));
		} else {
			persistError(context, getLang(context, data.error));
			overridePersistents(context);
		}
	});
	return div.innerHTML;
}

export { Logout };
