document.addEventListener("DOMContentLoaded", async () => {
    await fetch("/username", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then((res) => { return res.json() }).then((data) => {
        document.getElementById("username").innerHTML = data.username
        if (data.IIfa === 0) {
            document.getElementById("IIfa").style.display = "inline"
        }
    })
})

document.getElementById("home").addEventListener("click", () => {
    window.location.href = "/";
})

document.getElementById("IIfa").addEventListener("click", () => {
    window.location.href = "/IIfa";
})

document.getElementById("logout").addEventListener("click", async () => {
    await fetch("/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secret: 123 })
    }).then((res) => { return res.json() }).then((data) => {
        window.location.href = "/login"
    })
})

document.getElementById("changeBtn").addEventListener("click", () => {
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;

    fetch("/changePassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmNewPassword })
    }).then((res) => { return res.json() }).then((data) => {
        if (data.success === false) {
            document.getElementById("w2").innerHTML = data.message;
        } else {
            window.location.reload();
        }
    });
});