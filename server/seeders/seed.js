const db = require('../config/connection');
const { User, Comment, Art, Artist } = require('../models');
const userSeeds = require('./userSeeds.json');
const commentSeeds = require('./commentSeeds.json');
const artSeeds = require('./artSeeds.json');

db.once('open', async () => {
  try {
    await Comment.deleteMany({});
    await User.deleteMany({});
    await Art.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < commentSeeds.length; i++) {
      const { _id, commentAuthor } = await Comment.create(commentSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: commentAuthor },
        {
          $addToSet: {
            comments: _id,
          },
        }
      );
    }
    for (let i = 0; i < artSeeds.length; i++) {
      const { Art } = await Art.create(artSeeds[i]);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
