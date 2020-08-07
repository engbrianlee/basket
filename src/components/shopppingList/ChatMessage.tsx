import React from "react";
import { gql } from "@apollo/client";
import User from "../dashboard/User";
import { ChatMessageDataFragment } from "../../generated/graphql";

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

type ChatMessageProps = { chatMessage: ChatMessageDataFragment };
const ChatMessage = ({ chatMessage }: ChatMessageProps) => {
  return <div>{JSON.stringify(chatMessage)}</div>;
};

ChatMessage.fragment = fragment;

export default ChatMessage;
