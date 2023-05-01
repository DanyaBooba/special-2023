function GetURL() {
	let splitstr = window.location.pathname.split("/");

	if (splitstr[0] === "") {
		splitstr.shift();
	}

	if (splitstr[splitstr.length - 1] === "") {
		splitstr.pop();
	}

	if (splitstr.length <= 0) {
		return false;
	}

	if (splitstr.length === 1) {
		return "/";
	}

	let url = "/";
	for (i = 0; i < splitstr.length - 1; i++) {
		url += splitstr[i] + "/";
	}
	return url;
}

function Main() {
	let data = GetURL();

	let button = document.getElementById("header__btn_back");
	let btn_link = document.getElementById("header__btn_back_link");

	let mobileback = document.getElementById("mobilebtn_returnback");
	let mobileaddpost = document.getElementById("mobilebtn_addpost");

	if (data !== false) {
		button.classList.remove("d-none");
		btn_link.href = data;

		if (mobileback !== null) {
			mobileback.classList.remove("d-none");
			mobileback.href = data;
		}
		if (mobileaddpost !== null) {
			mobileaddpost.classList.add("d-none");
		}
	} else {
		if (mobileback !== null) {
			mobileback.classList.add("d-none");
		}
		if (mobileaddpost !== null) {
			mobileaddpost.classList.remove("d-none");
		}
	}
}

Main();
