$(document).ready(function () {
    const editText = document.getElementById('editText');

    // Get the placeholder attribute
    const placeholder = editText.getAttribute('data-placeholder');

    // Set the placeholder as initial content if it's empty
    (editText.innerHTML === "") && (editText.innerHTML = placeholder);

    editText.addEventListener('focus', function (e) {
        const value = e.target.innerHTML;
        value === placeholder && (e.target.innerHTML = "");
    });

    editText.addEventListener('blur', function (e) {
        const value = e.target.innerHTML;
        value === "" && (e.target.innerHTML = placeholder);
    });
});

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
/* NodeList objects are collections of nodes, usually returned by properties such as Node.childNodes and methods such as document.querySelectorAll(). */
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;

    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
});

recognition.addEventListener('end', recognition.start);

recognition.start();