import React from "react";
import { gql } from "@apollo/client";
import classNames from "classnames";
import User from "../dashboard/User";
import {
  ChatMessageDataFragment,
  CurrentUserDataFragment,
} from "../../generated/graphql";
import AvatarWithPlaceholderInitials, {
  parseInitials,
  AVATAR_COLORS,
} from "../Avatar";

const fragment = gql`
  fragment ChatMessageData on chat_messages {
    created_at
    creator {
      ...UserData
    }
    id
    message
  }
  ${User.fragment}
`;

type ChatMessageProps = {
  chatMessage: ChatMessageDataFragment;
  currentUser: CurrentUserDataFragment;
};
const ChatMessage = ({ chatMessage, currentUser }: ChatMessageProps) => {
  return (
    <div
      className={classNames(
        currentUser.public_id === chatMessage.creator.public_id
          ? "self-end"
          : "self-start",
        "flex items-center space-x-1"
      )}
    >
      {chatMessage.creator.public_id !== currentUser.public_id && (
        <AvatarWithPlaceholderInitials
          initials={parseInitials(chatMessage.creator.name)}
          className={classNames(AVATAR_COLORS[0], "text-sm text-white w-6 h-6")}
        />
      )}
      <div
        className={classNames(
          currentUser.public_id === chatMessage.creator.public_id
            ? "bg-pink-600 self-end ml-14"
            : "bg-gray-600 self-start mr-14",
          "text-sm font-semibold text-white rounded-lg px-2 py-1 break-all"
        )}
      >
        {chatMessage.message}
      </div>
    </div>
  );
};

ChatMessage.fragment = fragment;

export default ChatMessage;
