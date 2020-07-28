import { gql } from "@apollo/client";

const Creator = () => {
  return null;
};
Creator.fragments = {
  creator: gql`
    fragment CreatorData on users {
      name
      public_id
    }
  `,
};
export default Creator;
