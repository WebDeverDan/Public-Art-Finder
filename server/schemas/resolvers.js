const { AuthenticationError } = require('apollo-server-express');
const { User, Comment, Art, UserType } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // this is just for the user's multiple 
    users: async () => {
      return User.find().populate('comments');
    },
    // this is for the individual's thoughts
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('comments');
    },
    // this is for the individual's thoughts if they are an artist
    user: async (parent, { UserType: artist }) => {
      return User.findOne({ UserType: artist } ).populate('comments');
    },

    // add art query based on username's uploaded art
    art: async(parent, { username}) => {
      return Art.findOne({ username }).populate('arts');
    },
    // add art query for multiple arts
    arts: async(parent, { location, title, artist }) => {
      return Art.find({}).populate('arts');
    },

    comments: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Comment.find(params).sort({ createdAt: -1 });
    },
    comment: async (parent, { commentId }) => {
      return Comment.findOne({ _id: commentId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('comments');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
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
    addArt: async(parent, { title, artist, location, description, image, createdAt, comments }, context) => {
      if (context.user) {
        const art = Art.create({
          title,
          artist,
          location,
          description,
          image,
          createdAt,
          comments,
          addedBy: context.user.username,
        });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { addedArt: art._id } }
      );
        return art;
      }
      throw new AuthenticationError('You need to be logged in!');
      },
    


    // for users to comment on the art
    addComment: async (parent, { artId, commentText }, context) => {
      if (context.user) {
        return Art.findOneAndUpdate(
          { _id: artId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
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
