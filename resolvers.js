import mongoose, { Query } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "./config.js";

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }), //users.find((user) => user._id === _id),
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
    iquote: async (_, { by }) => await Quote.find({ by }), //quotes.filter((quote) => quote.by === _id),
    myprofile: async (_, args, { userId }) => {
      if (!userId) throw new Error("You must be logged in.");
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (user) => await Quote.find({ by: user._id }), //quotes.filter((quote) => quote.by === user._id),
  },
  Mutation: {
    signupUser: async (_, { usernew }) => {
      const user = await User.findOne({ email: usernew.email });
      if (user) {
        throw new Error("User already exist with that email");
      }
      const hashedPassword = await bcrypt.hash(usernew.password, 12);

      const newUser = new User({
        ...usernew,
        password: hashedPassword,
      });
      return await newUser.save();
    },

    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User doesn't exist with that email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("email or password is invalid");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
    createQuote: async (_, { name }, { userId }) => {
      //(Parent, Args, context)
      if (!userId) throw new Error("You must be logged in.");
      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return "Quote saved successfully :)";
    },
    updateQuote: async (_, { update }) => {
      console.log(update.name);
      let updatedQuote = await Quote.findOneAndUpdate(
        { name: update.name },
        { name: update.value },
        { new: true }
      );
      console.log(updatedQuote);
      await updatedQuote.save();
      return updatedQuote;
    },
    deleteQuote: async (_, { _id }) => {
      await Quote.findByIdAndDelete({ _id });
      return "Deleted Successfully";
    },
  },
};

export default resolvers;
