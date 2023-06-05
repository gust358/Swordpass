document.getElementById("register_btn").addEventListener("click", async () => {

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


})


document.getElementById("signin_btn").addEventListener("click", () => {
    window.location.href = "/";
})