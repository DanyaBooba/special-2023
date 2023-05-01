function CopyLink() {
	let text = "https://news.dybka.ru" + window.location.pathname;

	navigator.clipboard.writeText(text);
}
