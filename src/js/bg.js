function ChangeBackground() {
	let info = localStorage.getItem("bg-color");
	if (info === "color") {
		localStorage.removeItem("bg-color");
	} else {
		localStorage.setItem("bg-color", "color");
	}

	ActiveBackground();
}

function ActiveBackground() {
	let info = localStorage.getItem("bg-color");
	let mobileMenu = document.getElementById("mobileMenu");

	if (info === "color") {
		document.body.classList.add("get-body--color");
		mobileMenu.classList.add("get-body--color");
	} else {
		document.body.classList.remove("get-body--color");
		mobileMenu.classList.remove("get-body--color");
	}
}

ActiveBackground();
