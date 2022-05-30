const controller = {
    showWelcome: (req, res) => {
        res.render("welcome")
    },
    showHome: (req, res) => {
        res.render("home")
    },
    showRegister: (req, res) => {
        res.render("register")
    },
    createTweet: (req, res) => {
        console.log(req.body)
    }
}

module.exports = controller