import { Home } from "./pages/Home.js";
import { Login } from "./pages/Login.js";
import { Logout } from "./pages/Logout.js";
import { Register } from "./pages/Register.js";
import { Err404 } from "./pages/Err404.js";
import { CompleteProfileSample, Profile } from "./pages/Profile.js";
import { Play } from "./pages/Play.js";
import { PlayId } from "./pages/PlayId.js";
import { Pong } from "./pages/Pong.js";

import { getJson } from "./utils.js";

const DEFAULT_LANG = "en";

var global_context = {
	lang: {},
	user: {
		username: null,
		email: null,
		is_authenticated: false,
	},
	persistent: [],
	next: null,
};

/**
 * @note	Path arguments:
 * @note	- <numbers>		: Any number
 * @note	- <letters>		: Any letter
 * @note	- <alphanum>	: Any alphanumeric character
 * @note	- <any>			: Any character
 */
const router = [
	{
		path: undefined,
		component: Err404,
	},
	{
		path: "/",
		component: Home,
	},
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/logout",
		component: Logout,
	},
	{
		path: "/register",
		component: Register,
	},
	{
		path: "/profile",
		component: Profile,
	},
	{
		path: "/profile/sample",
		component: CompleteProfileSample,
	},
	{
		path: "/profile/<any>",
		component: Profile,
	},
	{
		path: "/play",
		component: Play,
	},
	{
		path: "/play/<numbers>",
		component: PlayId,
	},
	{
		path: "/pong",
		component: Pong,
	},
];

const content = document.getElementById("body-content");

const loadPage = (path) => {
	let next = new URLSearchParams(window.location.search).get("next");
	if (next)
		global_context.next = next;
	
	let route = null;
	let args = [];
	let pathes = path.split("/");
	for (let i = 1; i < router.length; i++) {
		let rPathes = router[i].path.split("/");
		let ok = rPathes.length === pathes.length;
		for (let j = 0; ok && j < rPathes.length; j++) {
			if (rPathes[j] === "<numbers>")
				if (isNaN(pathes[j]))
					ok = false;
				else
					args.push(parseInt(pathes[j]));
			else if (rPathes[j] === "<letters>")
				if (!/^[a-zA-Z]+$/.test(pathes[j]))
					ok = false;
				else
					args.push(pathes[j]);
			else if (rPathes[j] === "<alphanum>")
				if (!/^[a-zA-Z0-9]+$/.test(pathes[j]))
					ok = false;
				else
					args.push(pathes[j]);
			else if (rPathes[j] === "<any>")
				args.push(pathes[j]);
			else if (rPathes[j] !== pathes[j])
				ok = false;
		}
		if (ok) {
			route = router[i];
			break;
		}
		args = [];
	}
	if (!route)
		route = router[0];
	let inner = route.component(global_context, ...args);
	if (inner === null || inner === undefined || inner === "")
		return;
	content.innerHTML = inner;
}

const redirect = (path) => {
	let href = window.location.origin + path;
	window.history.pushState(null, null, href);
	loadPage(path.split("?")[0].split("#")[0]);
}

// 현재 페이지 다시 로드
const refresh = () => {
	loadPage(window.location.pathname);
}

// 다음 페이지로 이동
const popNext = (context) => { 
	if (!context.next)
		return null;
	context.next = context.next.split(";");
	while (context.next.length) {
		if (context.next[0] === "")
			context.next.shift();
		else {
			let nextPath = context.next.shift();
			if (context.next.length)
				nextPath += "?next=" + context.next.join(";");
			context.next = null;
			return nextPath;
		}
	}
	context.next = null;
	return null;
}

// 성공 메시지를 context.persistent 배열에 추가
const persistSuccess = (context, message) => {
	context.persistent.push({ ok: true, message: message });
}

// 에러 메시지를 context.persistent 배열에 추가
const persistError = (context, message) => {
	context.persistent.push({ ok: false, message: message });
}

// context.persistent 배열을 복사하여 반환
const persistCopy = (context) => {
	let copy = [];
	for (let p of context.persistent)
		copy.push({ ...p });
	return copy;
}

// context.persistent 배열에 복사본을 추가
const persist = (context, copy) => {
	for (let p of copy)
		context.persistent.push({ ...p });
}

const loadLang = async (context, lang) => {
	context.lang = await getJson(`/static/lang/${lang}.json`); // 백틱(`) 사용
	if (!context.lang.locale) {
		console.error(`[❌] Failed to fetch language file: ${lang}.json`); // 백틱(`) 사용
	} else {
		console.log(`[✅] Loaded language file: ${lang}.json`, context.lang); // 백틱(`) 사용
	}
}

// 언어 파일에서 키에 해당하는 문자열을 반환
const getLang = (context, key) => {
	const notFound = `{'${key}' not found}`; // 백틱(`) 사용
	let pathes = key.split(".");
	let found = context.lang;
	for (let path of pathes) {
		if (!found[path]) {
			return notFound;
		}
		found = found[path];
	}
	if (typeof found !== "string") {
		return notFound;
	}
	return found;
}


window.addEventListener("load", async () => {
	if (window.location.pathname !== "/" && window.location.pathname.endsWith("/"))
		window.history.pushState(null, null, window.location.pathname.slice(0, -1)
			+ window.location.search + window.location.hash);

	document.body.addEventListener("click", (e) => {
		if (e.target.matches("[data-link]")) {
			e.preventDefault();
			window.history.pushState(null, null, e.target.href);
			loadPage(new URL(e.target.href).pathname);
		}
	});

	// onLocationChange (using back/forward buttons)
	window.addEventListener("popstate", () => {
		loadPage(window.location.pathname);
	});

	await loadLang(global_context, DEFAULT_LANG);
	loadPage(window.location.pathname);
});

export {
	redirect, 
	refresh,
	popNext, 
	persistSuccess,
	persistError,
	persistCopy,
	persist,
	loadLang,
	getLang,
};

console.log("[✅] Scripts loaded successfully!");