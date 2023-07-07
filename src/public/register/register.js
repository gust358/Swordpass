async function register() {
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("c_password").value;

    await fetch("/register", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, username, password, confirm_password })
    }).then((res) => { return res.json() }).then((data) => {
        if (data.success === false) {
            document.getElementById(data.type).value = "";
            document.getElementById(data.type).placeholder = data.message
        } else {
            window.location.href = "/login"
        }
    })

}


document.getElementById("register_btn").addEventListener("click", async (e) => {
    if (e.pointerId === 1) {
        await register();
    }
})

document.getElementById("signin_btn").addEventListener("click", () => {
    window.location.href = "/login";
})

document.addEventListener("keypress", async (e) => {
    if (e.keyCode === 13) {
        await register();
    }
})