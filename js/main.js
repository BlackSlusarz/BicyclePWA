
if ('serviceWorker' in navigator) {

    navigator.serviceWorker
        .register('./serviceWorker.js', { scope: './' })
        .then(function(registration) {
            console.log("Service Worker Registered. Scope is:"+registration.scope);
        })
        .catch(function(err) {
            console.log("Service Worker Failed to Register", err);
        })

}


let deferredPrompt;

let btnAdd = document.getElementById("btnAdd");

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earli	er from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can b	e triggered later.
    deferredPrompt = e;
    // Update UI notify the user t	hey can add to home screen
    let btnAdd = document.getElementById("btnAdd");
    btnAdd.style.display = 'inline-block';
    //btnAdd.style.border = 'solid 2px #e09636';
    btnAdd.onclick = function() {
        deferredPrompt.prompt();
    };
});

// See https://developers.google.com/web/fundamentals/app-install-banners/
btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
});
window.addEventListener('appinstalled', (evt) => {
    // For debug purposes only!
    console.log('a2hs installed');
});
