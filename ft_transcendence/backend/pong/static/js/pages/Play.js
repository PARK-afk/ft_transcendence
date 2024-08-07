import { NavBar } from "../components/NavBar.js";
import { Persistents } from "../components/Persistents.js";
import { getLang } from "../route.js";
import { checkUID, clearFeedbacks } from "../utils.js";

function Play(context) {
	let div = document.createElement("div");
	div.innerHTML = NavBar(getLang(context, "pages.play.title"), context);
	div.innerHTML += Persistents(context);
	div.innerHTML += /*html*/`
		<div class="container container-blur form-ssm" style="padding: 50px; margin-top: 100px;">
			<form class="row g-3" id="play-form" style="margin-top: 0px;">
				<div class="row col-12">
					<div class="col-8" style="padding-right: 2px;">
						<input type="text" class="form-control" id="uid" placeholder="${getLang(context, "pages.play.placeholder")}">
					</div>
					<div class="col-4" style="padding-left: 2px;">
						<button id="join-button" class="btn btn-success" type="submit">${getLang(context, "pages.play.join")}</button>
					</div>
				</div>
				
				<hr>

				<div class="row col-12">
					<div class="col-12">
						<button id="play-button" class="btn btn-success" type="submit">${getLang(context, "pages.play.play")}</span>
					</div>
				</div>
			</form>
		</div>
	`;
	setTimeout(() => {
		let form = document.querySelector("#play-form");
		if (form === null)
			return;
		form.onsubmit = (event) => event.preventDefault();
		document.querySelector("#join-button").onclick = () => {
			clearFeedbacks(form);
			if (!checkUID(context, "#uid"))
				return;
			console.log("Joining game...");
		};
		document.querySelector("#play-button").onclick = () => {
			console.log("Playing game...");
		};
	}, 250);
	return div.innerHTML;
}

export { Play };
