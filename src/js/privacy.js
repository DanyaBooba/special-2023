function CommitPrivacy() {
    localStorage.setItem('privacy-block', 'close');
    CheckPrivacy();
}

function CheckPrivacy() {
    if (localStorage.getItem('privacy-block') !== 'close') {
        let block = document.getElementById('privacyblock');
        if (block !== null) {
            block.classList.remove('d-none');
        }
    }
}
