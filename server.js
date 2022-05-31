const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const express = require("express");
const app = express();
const router = require("./routes/routes");
const userSeeder = require("./seeders/userSeeder");
const bcrypt = require("bcryptjs");
const { User } = require("./models/User");

app.set("view engine", "ejs");

// userSeeder();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  })
);
app.use(passport.session());
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username: username });
    // console.log(user);
    if (!user) {
      console.log("El usuario no existe");
      return done(null, false, { msj: "El usuario no existe" });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      console.log("Las contraseñas no son compatibles");
      return done(null, false, { msj: "Las contraseñas no son compatibles" });
    }
    console.log(user);
    return done(null, user);
  })
);
passport.serializeUser(function (user, done) {
  done(null, user.username);
});
passport.deserializeUser(function (user, done) {
  User.findOne({ username: user })
    .then((user) => {
      done(null, user); // Usuario queda disponible en req.user.
    })
    .catch((error) => {
      done(error, user);
    });
});
app.use("/", router);

app.listen(3000, () => {
  console.log("http://localhost:3000 Servidor corriendo en el puerto 3000");
});
