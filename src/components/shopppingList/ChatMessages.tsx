import React, { useState, DOMAttributes, useEffect } from "react";
import { gql } from "@apollo/client";
import {
  ShoppingListItemDataFragment,
  useCreateChatMessageMutation,
  useGetChatMessagesQuery,
} from "../../generated/graphql";
import Loading from "../Loading";
import { ApolloDataNotFoundError } from "../../lib/error";
import ChatMessage from "./ChatMessage";

type ChatMessagesProps = {
  shopping_list_item_id: ShoppingListItemDataFragment["id"];
};
const ChatMessages = ({ shopping_list_item_id }: ChatMessagesProps) => {
  const [message, setMessage] = useState("");
  const { data, loading, subscribeToMore } = useGetChatMessagesQuery({
    variables: { shopping_list_item_id },
  });
  useEffect(() => {
    subscribeToMore({
      variables: { shopping_list_item_id },
      document: SUBSCRIBE_CHAT_MESSAGES,
    });
  }, [shopping_list_item_id, subscribeToMore]);
  const [createChatMessage] = useCreateChatMessageMutation({
    // update: (cache, { data }) => {
    //   const query = GET_CHAT_MESSAGES;
    //   const cachedData = cache.readQuery<GetChatMessagesQuery>({
    //     query,
    //   });
    //   const newData = produce(cachedData, (t) => {
    //     const chat_messages = t?.shopping_list_items_by_pk?.chat_messages;
    //     if (!chat_messages) {
    //       throw new ApolloDataNotFoundError({ chat_messages });
    //     }
    //     const insert_chat_messages_one = data?.insert_chat_messages_one;
    //     if (!insert_chat_messages_one) {
    //       throw new ApolloDataNotFoundError({ insert_chat_messages_one });
    //     }
    //     chat_messages.unshift(insert_chat_messages_one);
    //   });
    //   if (newData) {
    //     cache.writeQuery<GetChatMessagesQuery>({
    //       query,
    //       data: newData,
    //     });
    //   }
    // },
  });
  const onSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = (e) => {
    e.preventDefault();
    if (message !== "") {
      createChatMessage({ variables: { message, shopping_list_item_id } });
    }
    setMessage("");
  };
  if (loading) {
    return <Loading />;
  }
  const chat_messages = data?.shopping_list_items_by_pk?.chat_messages;
  if (!chat_messages) {
    throw new ApolloDataNotFoundError({ chat_messages });
  }
  return (
    <div>
      {chat_messages.map((chatMessage) => (
        <ChatMessage key={chatMessage.id} chatMessage={chatMessage} />
      ))}
      <form onSubmit={onSubmit}>
        <input
          autoFocus
          type="text"
          className="w-full text-xl font-bold leading-none form-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

const GET_CHAT_MESSAGES = gql`
  query getChatMessages($shopping_list_item_id: uuid!) {
    shopping_list_items_by_pk(id: $shopping_list_item_id) {
      chat_messages(order_by: { created_at: asc }) {
        ...ChatMessageData
      }
      id
    }
  }
  ${ChatMessage.fragment}
`;

const SUBSCRIBE_CHAT_MESSAGES = gql`
  subscription subscribeChatMessages($shopping_list_item_id: uuid!) {
    shopping_list_items_by_pk(id: $shopping_list_item_id) {
      chat_messages(order_by: { created_at: asc }) {
        ...ChatMessageData
      }
      id
    }
  }
  ${ChatMessage.fragment}
`;

const CREATE_CHAT_MESSAGE = gql`
  mutation createChatMessage($shopping_list_item_id: uuid!, $message: String!) {
    insert_chat_messages_one(
      object: {
        shopping_list_item_id: $shopping_list_item_id
        message: $message
      }
    ) {
      ...ChatMessageData
    }
  }
  ${ChatMessage.fragment}
`;

export { CREATE_CHAT_MESSAGE, SUBSCRIBE_CHAT_MESSAGES, GET_CHAT_MESSAGES };
export default ChatMessages;
