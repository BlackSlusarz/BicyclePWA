let btnAdd = document.querySelector(".btnAdd");

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js').then(() => {
        return navigator.serviceWorker.ready;
    }).then(reg => {
        console.log('Service Worker ready :^)', reg);
    }).catch(error => {
        console.log('Service Worker error :^(', error);
    });
}
let deferredPrompt;

window.addEventListener('beforeinstallprompt', function (e) {e.preventDefault();
    deferredPrompt = e;
    showAddToHomeScreen();

});

function showAddToHomeScreen() {

    let a2hsBtn = document.querySelector(".ad2hs-prompt");

    a2hsBtn.style.display = "block";

    a2hsBtn.addEventListener("click", addToHomeScreen);

}

function addToHomeScreen() {
    let a2hsBtn = document.querySelector(".ad2hs-prompt");  // hide our user interface thatshowsourA2HSbutton

    a2hsBtn.style.display = 'none';  // Show the prompt

    deferredPrompt.prompt();  // Wait for the user to respond to the prompt

    deferredPrompt.userChoice
        .then(function(choiceResult){

            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }

            deferredPrompt = null;

        });}
