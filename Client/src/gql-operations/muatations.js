import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation createUser($usernew: UserInput!) {
    user: signupUser(usernew: $usernew) {
      firstName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation SigninUser($userSignin: UserSigninInput!) {
    user: signinUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation createQuote($name: String!) {
    quote: createQuote(name: $name)
  }
`;

export const UPDATE_QUOTE = gql`
  mutation updateQuote($input: UpdateExistingQuote!) {
    updateQuote(update: $input) {
      name
    }
  }
`;

export const DELETE_QUOTE = gql`
  mutation deleteQuote($id: ID!) {
    deleteQuote(_id: $id)
  }
`;
