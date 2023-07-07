document.addEventListener("DOMContentLoaded", async () => {
    await fetch("/username", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
        }
    }).then((res) => { return res.json() }).then((data) => {
        document.getElementById("username").innerHTML = data.username;
    })
})


document.getElementById("home").addEventListener("click", () => {
    window.location.href = "/";
})


document.getElementById("changePassword").addEventListener("click", () => {
    window.location.href = "/changePassword";
})

document.getElementById("logout").addEventListener("click", async () => {
    await fetch("/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secret: 123 })
    }).then((res) => { return res.json() }).then((data) => {
        window.location.href = "/"
    })
})


document.getElementById("btn1").addEventListener("click", () => {
    fetch("/sendIIfaToken").then((res) => { return res.json() }).then((data) => {
    })
    document.getElementById("box").style.display = "flex"
    document.getElementById("btn1").style.display = "none";
})

document.getElementById("btn2").addEventListener("click", () => {
    const IIfaCode = document.getElementById("code").value;
    fetch("/IIfa", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ IIfaCode })
    }).then((res) => { return res.json() }).then((data) => {
        if (data.success === true) {
            window.location.href = "/user";
        } else {
            document.getElementById("message").style.display = "inline";
            document.getElementById("message").innerHTML = data.message;
        }
    })
})