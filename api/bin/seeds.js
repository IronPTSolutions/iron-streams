require("../config/db.config");

const Stream = require("../models/stream.model");
const { faker } = require("@faker-js/faker");

Stream.deleteMany({})
  .then(() => {
    for (let i = 0; i < 20; i++) {
      Stream.create({
        title: faker.music.songName(),
        description: faker.lorem.paragraph(),
        author: faker.internet.userName(),
        url: faker.internet.url(),
        views: Math.floor(Math.random() * 10000),
        category: faker.music.genre(),
        duration: Math.floor(Math.random() * 200),
        thumbnail: faker.image.abstract(undefined, undefined, true),
        private: Math.random() < 0.8,
      }).then((stream) => {
        console.log(`stream ${stream.title} created`);

        // TODO: create relations
      });
    }
  })
  .catch((err) => {
    console.error(err);
  });
