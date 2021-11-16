const { AuthenticationError } = require('apollo-server-express');
const { User, Comment, Art } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // this is just for the user's multiple
    users: async () => {
      return User.find().populate('comments');
    },
    // this is for the individual's thoughts
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate({
        path: 'comments',
        populate: [{ path: 'user', select: 'username' }],
        // path: 'addedArt',
        // populate: [{ path: 'user', select: 'username' }],
      });
    },
    // this is for the individual's thoughts if they are an artist
    // user: async (parent, { artist }) => {
    //   return User.findOne({ artist }).populate('comments');
    // },

    // add art query based on username's uploaded art
    art: async (parent, { artId }) => {
      return Art.findOne({ _id: artId }).populate('comments');
    },
    // add art query for multiple arts
    arts: async (parent) => {
      return Art.find({}).populate('comments');
    },

    artsByLocation: async (parent, { location }) => {
      return Art.find({ location }).populate('comments');
    },

    comments: async (parent, { username }) => {
      // const params = username ? { username } : {};
      return User.find()
        .sort({ createdAt: -1 })
        .populate('comments')
        .select('username');
    },
    comment: async (parent, { artId }, context) => {
      return Art.findOne({ _id: artId }).populate('comments');
      // .select('username');
    },
    getSingleComment: async (parent, { commentId }, context) => {
      return Art.findOne({ _id: commentId }).populate('comments');
      // .select('username');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('addedArt');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, isArtist }) => {
      const user = await User.create({ username, email, password, isArtist });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // initial comment
    // addThought: async (parent, { thoughtText }, context) => {
    //   if (context.user) {
    //     const thought = await Thought.create({
    //       thoughtText,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    // addArt mutation
    addArt: async (parent, { art }, context) => {
      if (context.user) {
        const {
          title,
          artist,
          location,
          description,
          url,
          createdAt,
          comment,
        } = art;
        const artData = await Art.create({
          title,
          artist,
          location,
          description,
          url,
          createdAt,
          comment,
          addedBy: context.user.username,
        });

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { addedArt: artData._id } }
        );
        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeArt: async (parent, { artId }, context) => {
      if (context.user) {
        return Art.findOneAndUpdate(
          { _id: artId },
          {
            $pull: {
              comments: {
                _id: artId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // for users to comment on the art
    addComment: async (parent, { artId, comment }, context) => {
      console.log(comment);
      if (context.user) {
        const commentDoc = await Comment.create({
          ...comment,
          user: context.user._id,
          commentAuthor: context.user.username,
        });

        const art = await Art.findOneAndUpdate(
          { _id: artId },
          {
            $addToSet: {
              comments: commentDoc._id,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return art;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // removes initial upload comment
    // removeThought: async (parent, { thoughtId }, context) => {
    //   if (context.user) {
    //     const thought = await Thought.findOneAndDelete({
    //       _id: thoughtId,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    // remove user comment
    removeComment: async (parent, { artId, commentId }, context) => {
      if (context.user) {
        return Art.findOneAndUpdate(
          { _id: artId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
