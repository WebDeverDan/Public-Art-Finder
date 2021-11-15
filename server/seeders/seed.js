const db = require('../config/connection');
const { User, Comment, Art, Artist } = require('../models');
const userSeeds = require('./userSeeds.json');
const commentSeeds = require('./commentSeeds.json');
const artSeeds = require('./artSeeds.json');

db.once('open', async () => {
  // try {
  await Comment.deleteMany({});
  await User.deleteMany({});
  await Art.deleteMany({});

  await User.create(userSeeds);
  console.log('User seed created');
  for (let i = 0; i < artSeeds.length; i++) {
    const { _id, addedBy } = await Art.create(artSeeds[i]);
    console.log('Art seed created');
    const user = await User.findOneAndUpdate(
      { username: addedBy },
      {
        $addToSet: {
          addedArt: _id,
        },
      },
    );
  }
  for (let i = 0; i < commentSeeds.length; i++) {
    const { _id, commentAuthor } = await Comment.create(commentSeeds[i]);
    console.log('Comment seed created');
    const user = await User.findOneAndUpdate(
      { username: commentAuthor },
      {
        $addToSet: {
          comments: _id,
        },
      }
    );
  }
  // for (let i = 0; i < artSeeds.length; i++) {
  //   const { Art } = await Art.create(artSeeds[i]);
  //   console.log('art seed created');
  //   const user = await User.findOneAndUpdate(
  //     { username: addedBy },
  //     {
  //       $addToSet: {
  //         arts: _id,
  //       },
  //     }
  // );
  //   }
  // } catch (err) {
  //   console.error(err);
  //   process.exit(1);
  // }

  console.log('all done!');
  process.exit(0);
});
