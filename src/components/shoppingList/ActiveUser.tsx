import { gql } from "@apollo/client";

const fragment = gql`
  fragment ActiveUserData on shopping_list_active_users {
    user {
      name
      public_id
    }
  }
`;
const ActiveUser = () => {
  return null;
};
ActiveUser.fragment = fragment;
export default ActiveUser;
