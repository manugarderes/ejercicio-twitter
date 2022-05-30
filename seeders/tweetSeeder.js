const { Tweet } = require("../models/Tweet");
const { faker } = require("@faker-js/faker");

const tweetSeeder = () => {
  for (let index = 0; index < 3; index++) {
    const tweet = new Tweet({
        text: faker.lorem.sentence(5),
        author: faker.name.firstName(),
    });
    tweet.save(() => {
      console.log("Tweet creados con exito");
    });
  }
};

module.exports = tweetSeeder;
