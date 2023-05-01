function PostTextUp() {
	let fontSize = Number(localStorage.getItem("post-font-size"));
	if (fontSize < 2) {
		fontSize += 1;
		localStorage.setItem("post-font-size", fontSize);
	}

	SetFontSize(fontSize);
}

function PostTextDown() {
	let fontSize = Number(localStorage.getItem("post-font-size"));
	if (fontSize > -2) {
		fontSize -= 1;
		localStorage.setItem("post-font-size", fontSize);
	}

	SetFontSize(fontSize);
}

function PostTextDefault() {
	localStorage.getItem("post-font-size", 0);
	SetFontSize(0);
}

function SetFontSize(num) {
	let block = document.getElementById("post--main");
	let text = document.getElementById("fontsizetextedit");

	if (block === null) {
		return false;
	}

	if (num == 2) {
		// console.log("2");
		block.classList.remove("post--font-size-u1");
		block.classList.remove("post--font-size-u2");
		block.classList.remove("post--font-size-d1");
		block.classList.remove("post--font-size-d2");
		block.classList.add("post--font-size-u2");

		text.textContent = "Увеличен на 2";
	} else if (num == 1) {
		// console.log("1");
		block.classList.remove("post--font-size-u1");
		block.classList.remove("post--font-size-u2");
		block.classList.remove("post--font-size-d1");
		block.classList.remove("post--font-size-d2");
		block.classList.add("post--font-size-u1");

		text.textContent = "Увеличен на 1";
	} else if (num == -1) {
		// console.log("-1");
		block.classList.remove("post--font-size-u1");
		block.classList.remove("post--font-size-u2");
		block.classList.remove("post--font-size-d1");
		block.classList.remove("post--font-size-d2");
		block.classList.add("post--font-size-d1");

		text.textContent = "Уменьшен на 1";
	} else if (num == -2) {
		// console.log("-2");
		block.classList.remove("post--font-size-u1");
		block.classList.remove("post--font-size-u2");
		block.classList.remove("post--font-size-d1");
		block.classList.remove("post--font-size-d2");
		block.classList.add("post--font-size-d2");

		text.textContent = "Уменьшен на 2";
	} else {
		// console.log("default");
		block.classList.remove("post--font-size-u1");
		block.classList.remove("post--font-size-u2");
		block.classList.remove("post--font-size-d1");
		block.classList.remove("post--font-size-d2");

		text.textContent = "";
	}
}

let fontSize = Number(localStorage.getItem("post-font-size"));
if (fontSize !== null) {
	SetFontSize(fontSize);
}
