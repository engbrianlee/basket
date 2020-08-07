import { gql } from "@apollo/client";

const fragment = gql`
  fragment UserData on users {
    name
    public_id
  }
`;

const User = () => {
  return null;
};
User.fragment = fragment;
export default User;
