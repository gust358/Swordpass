// _________________________________________basic front engine_________________________________________


document.getElementById("addBtnContainer").addEventListener("click", () => {
    document.getElementById("addContainer").style.display = "flex";
})


document.getElementById("addContainer").addEventListener("click", (e) => {
    const id = e.target.id;
    if (id === "addContainer") {
        document.getElementById("addContainer").style.display = "none";
    }
})


document.getElementById("delContainer").addEventListener("click", (e) => {
    const id = e.target.id;
    if (id === "delContainer") {
        document.getElementById("delContainer").style.display = "none";
    }
})




// _________________________________________basic front engine_________________________________________


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

    await fetch("/userData", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
        }
    }

    ).then((res) => { return res.json() }).then((data) => {
        if (data.IIfa === 0) {
            document.getElementById("IIfa").style.display = "inline"
        }
        data.passwords.forEach((it) => {
            const card_model = `<div class="card">
            <p class="service card_its">${it.service}</p>
            <div class="card_btns">
            <button id="${it.service_password}" class="copyBtn card_its">Copy</button>
            <button id="${it.service_id}" class="rmBtn card_its" name="${it.service}">X</button>
            </div>
            </div>`;
            document.getElementById("container").innerHTML += card_model;
        })
    })

    document.querySelectorAll(".copyBtn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const payload = e.target.id;
            var textArea = document.createElement("textarea");
            textArea.value = payload;
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
        })
    })


    document.querySelectorAll(".rmBtn").forEach((it) => {
        it.addEventListener("click", (e) => {
            const id = e.target.id;
            document.getElementById("deleteName").innerHTML = `Delete ${it.name} ?`;
            document.getElementById("delContainer").style.display = "flex";
            document.getElementById("confirmBtn").addEventListener("click", () => {
                const password = document.getElementById("confirmPassword").value;
                fetch("/removePassword", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ service_id: id, password })
                }).then((res) => { return res.json() }).then((data) => {
                    console.log(data);
                    if (data.success === true) {
                        window.location.reload();
                    } else {
                        document.getElementById("confirmMessage").innerHTML = data.message;
                    }
                })

            })
        })
    })
})
document.getElementById("logout").addEventListener("click", async () => {
    await fetch("/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secret: 123 })
    }).then((res) => { return res.json() }).then((data) => {
        console.log(data);
        window.location.href = "/"
    })
})

document.getElementById("add_btn").addEventListener("click", async () => {

    const service = document.getElementById("addService").value;

    await fetch("/addPassword", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ service })
    }).then((res) => { return res.json() }).then((data) => {
        if (data.success === false) {
            document.getElementById("message").innerHTML = data.message;
        } else {
            window.location.reload();
        }
    })
})

document.getElementById("addService").addEventListener("input", () => {
    document.getElementById("message").innerHTML = "";
});

document.getElementById("changePassword").addEventListener("click", () => {
    window.location.href = "/changePassword";
})
document.getElementById("IIfa").addEventListener("click", () => {
    window.location.href = "/IIfa"
})
