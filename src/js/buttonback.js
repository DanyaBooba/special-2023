function GetURL() {
	let splitstr = window.location.pathname.split("/");

	splitstr.pop();
	splitstr.shift();

	if (splitstr.length <= 0) {
		return false;
	}

	if (splitstr.length == 1) {
		return "/";
	}

	return "/" + splitstr[splitstr.length - 2];
}

function Main() {
	let data = GetURL();
	let button = document.getElementById("header__btn_back");
	let btn_link = document.getElementById("header__btn_back_link");

	if (data === false) {
		button.classList.add("d-none");
	} else {
		btn_link.href = data;
	}
}

Main();
