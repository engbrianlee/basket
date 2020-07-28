import { gql } from "@apollo/client";

const ActiveUser = () => {
  return null;
};
ActiveUser.fragments = {
  activeUser: gql`
    fragment ActiveUserData on shopping_list_active_users {
      user {
        name
        public_id
      }
    }
  `,
};
export default ActiveUser;
