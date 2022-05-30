const express = require("express");
const app = express();
const router = require("./routes/routes");
const userSeeder = require("./seeders/userSeeder");
const tweetSeeder = require("./seeders/tweetSeeder");

app.set("view engine", "ejs");

// userSeeder()
// tweetSeeder()

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", router);

app.listen(3000, () => {
  console.log("http://localhost:3000 Servidor corriendo en el puerto 3000");
});
