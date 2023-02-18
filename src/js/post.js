function PostShowMore() {
	console.log("PostShowMore");
}

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
	if (num == 2) {
		console.log("2");
	} else if (num == 1) {
		console.log("1");
	} else if (num == -1) {
		console.log("-1");
	} else if (num == -2) {
		console.log("-2");
	} else {
		console.log("default");
	}
}

let fontSize = Number(localStorage.getItem("post-font-size"));
if (fontSize !== null) {
	SetFontSize(fontSize);
}
