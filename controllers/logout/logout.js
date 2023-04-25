function logout(req, res) {
    const { secret } = req.body;
    if (secret === 123) {
        res.clearCookie("token");
        res.clearCookie("authToken");
        res.status(200).json({ auth: false, message: "Successfully log out" })
    } else {
        res.redirect("/");
    }
}
module.exports = { logout };