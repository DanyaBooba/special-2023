function CopyLink() {
	let text = SpecialURL();
	navigator.clipboard.writeText(text);
}

function LinkToVK() {
	window.open("https://vk.com/share.php?url=" + SpecialURL(), "_blank");
}

function LinkToTelegram() {
	window.open(
		"https://telegram.me/share/url?url=" +
			SpecialURL() +
			"&text=" +
			document.title,
		"_blank"
	);
}

function LinkToOK() {
	window.open(
		"https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=" +
			SpecialURL(),
		"_blank"
	);
}

function SpecialURL() {
	return "https://news.dybka.ru" + window.location.pathname;
}
