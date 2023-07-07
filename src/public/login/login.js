async function signin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    await fetch("/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then((res) => { return res.json() }).then((data) => {
        if (data.auth) {
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            window.location.href = "/user";
        } else if (data.message) {
            document.getElementById("warning").innerHTML = data.message;
        }
    }).catch((err) => { console.log(err) });
}

document.getElementById("signin_btn").addEventListener("click", async () => {
    await signin();
});

document.getElementById("register_btn").addEventListener("click", () => {
    window.location.href = "/register";
})

document.addEventListener("keypress", async (e) => {
    if (e.keyCode === 13) {
        await signin();
    }
})