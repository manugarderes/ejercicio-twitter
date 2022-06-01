const { User } = require("../models/User");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

const userSeeder = async () => {
  let hash = await bcrypt.hash("Manu03", 10);
  for (let index = 0; index < 3; index++) {
    const user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      description: faker.lorem.sentence(30),
      profileImg: faker.image.avatar(),
      password: hash,
    });
    user.save(() => {
      console.log("Usuario creados con exito");
    });
  }
};

module.exports = userSeeder;
