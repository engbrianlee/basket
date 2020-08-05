import React from "react";
import { gql } from "@apollo/client";
import { CurrentUserDataFragment } from "../../generated/graphql";
import AvatarWithPlaceholderInitials, {
  parseInitials,
  CURRENT_USER_AVATAR_COLOR,
} from "../Avatar";
import classNames from "classnames";

const fragment = gql`
  fragment CurrentUserData on users {
    name
    public_id
  }
`;

export type CurrentUserProps = {
  currentUser: CurrentUserDataFragment;
};
const CurrentUser = ({ currentUser }: CurrentUserProps) => {
  return (
    <AvatarWithPlaceholderInitials
      initials={parseInitials(currentUser.name)}
      className={classNames(
        CURRENT_USER_AVATAR_COLOR,
        "text-white w-12 h-12 text-xl"
      )}
    />
  );
};
CurrentUser.fragment = fragment;

const getCurrentUser = gql`
  query getCurrentUser {
    current_user {
      user {
        name
        public_id
      }
    }
  }
`;
export { getCurrentUser };
export default CurrentUser;
