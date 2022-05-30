const controller = {
    showWelcome: (req, res) => {
        res.render("welcome")
    },
    showHome: (req, res) => {
        res.render("home")
    }
}

module.exports = controller