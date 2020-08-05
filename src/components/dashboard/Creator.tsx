import { gql } from "@apollo/client";

const fragment = gql`
  fragment CreatorData on users {
    name
    public_id
  }
`;

const Creator = () => {
  return null;
};
Creator.fragment = fragment;
export default Creator;
