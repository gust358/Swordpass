const base = "$2azFZPuyGt3KdD7KOjEWF$05$ZChaRSM.ECvoyeS1iYtRNfhoSSngnG1oWS";
const animationContainer = document.getElementById("animation-line");
const cursor = document.getElementById("cursor");
const copyBtn = document.getElementById("copy-btn");
const refreshBtn = document.getElementById("refresh-btn");
let charIndex = 0;
let password = "";

function generatePassword() {
    for (let i = 0; i < base.length / 2; i++) {
        const index = parseInt(Math.random() * 100);
        if (index < base.length) {
            password += base.charAt(index);
        } else {
            i--
        }
    }
}

function type() {
    if (charIndex < password.length) {
        if (!cursor.classList.contains("typing")) {
            cursor.classList.add("typing");
            copyBtn.style.opacity = 0.5;
            refreshBtn.style.opacity = 0.5;
        }
        animationContainer.innerHTML += password.charAt(charIndex);
        charIndex++;
        setTimeout(type, 200);
    } else {
        cursor.classList.remove("typing");
        copyBtn.disabled = false;
        refreshBtn.disabled = false;
        copyBtn.style.opacity = 1;
        refreshBtn.style.opacity = 1;
    }
}

function erase() {
    copyBtn.disabled = true;
    refreshBtn.disabled = true;
    if (charIndex > -1) {
        if (!cursor.classList.contains("typing")) {
            cursor.classList.add("typing");
            copyBtn.style.opacity = 0.5;
            refreshBtn.style.opacity = 0.5;
        }
        password = password.slice(0, charIndex);
        animationContainer.innerHTML = password;
        charIndex--;
        setTimeout(erase, 100);
    } else {
        charIndex = 0;
        cursor.classList.remove("typing")
        generatePassword();
        type();
    }
}

function copy() {
    var textArea = document.createElement("textarea");
    textArea.value = password;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand("copy", false, null);
        var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
}


document.addEventListener("DOMContentLoaded", () => {
    copyBtn.disabled = true;
    refreshBtn.disabled = true;
    generatePassword();
    type();
    copyBtn.addEventListener("click", copy);
    refreshBtn.addEventListener("click", erase);
})
