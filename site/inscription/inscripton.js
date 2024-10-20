// script.js

document.getElementById('b1').addEventListener('click', function() {
    document.getElementById('popup').style.display = "block";
});

document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('popup').style.display = "none";
});

window.onclick = function(event) {
    if (event.target == document.getElementById('popup')) {
        document.getElementById('popup').style.display = "none";
    }
}

