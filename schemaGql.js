import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [QuoteWithName]
    iquote(by: ID!): [Quote]
    myprofile: User
  }

  type QuoteWithName {
    _id: ID!
    name: String!
    by: idName!
  }

  type idName {
    _id: ID!
    firstName: String!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    quotes: [Quote]
  }

  type Quote {
    _id: ID!
    name: String!
    by: ID!
  }

  type Token {
    token: String!
  }

  type Mutation {
    signupUser(usernew: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token
    createQuote(name: String!): String
    updateQuote(update: UpdateExistingQuote!): Quote!
    deleteQuote(_id:ID!):String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }
  input UpdateExistingQuote {
    name: String!
    value: String!
  }
`;

export default typeDefs;
