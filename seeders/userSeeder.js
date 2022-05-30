const { User } = require("../models/User");
const { faker } = require("@faker-js/faker");

const userSeeder = () => {
  for (let index = 0; index < 3; index++) {
    const user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      description: faker.lorem.sentence(30),
      profileImg: faker.image.avatar(),
      password: "Manu03"
    });
    user.save(() => {
      console.log("Usuario creados con exito");
    });
  }
};

module.exports = userSeeder;
