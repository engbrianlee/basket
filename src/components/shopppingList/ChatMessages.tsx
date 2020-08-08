import { animateScroll as scroll } from "react-scroll";
import { v4 as uuidv4 } from "uuid";
import React, { useState, DOMAttributes, useEffect } from "react";
import { gql } from "@apollo/client";
import {
  ShoppingListItemDataFragment,
  useCreateChatMessageMutation,
  useGetChatMessagesQuery,
  GetChatMessagesQuery,
} from "../../generated/graphql";
import Loading from "../Loading";
import { ApolloDataNotFoundError } from "../../lib/error";
import ChatMessage from "./ChatMessage";
import produce from "immer";
import { formatISO } from "date-fns";
import useGlobalContext from "../context";

type ChatMessagesProps = {
  shopping_list_item_id: ShoppingListItemDataFragment["id"];
};
enum PLACEHOLDERS {
  blur = "Aa",
  focused = "Type a message...",
}
const ChatMessages = ({ shopping_list_item_id }: ChatMessagesProps) => {
  const [message, setMessage] = useState("");
  const [placeholder, setPlaceholder] = useState<PLACEHOLDERS>(
    PLACEHOLDERS.blur
  );
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
    update: (cache, { data }) => {
      const query = GET_CHAT_MESSAGES;
      const cachedData = cache.readQuery<GetChatMessagesQuery>({
        query,
        variables: { shopping_list_item_id },
      });
      const newData = produce(cachedData, (t) => {
        const chat_messages = t?.shopping_list_items_by_pk?.chat_messages;
        if (!chat_messages) {
          throw new ApolloDataNotFoundError({ chat_messages });
        }
        const insert_chat_messages_one = data?.insert_chat_messages_one;
        if (!insert_chat_messages_one) {
          throw new ApolloDataNotFoundError({ insert_chat_messages_one });
        }
        chat_messages.push(insert_chat_messages_one);
      });
      if (newData) {
        cache.writeQuery<GetChatMessagesQuery>({
          query,
          data: newData,
        });
      }
    },
  });
  const {
    currentUser: { loading: currentUserLoading, data: currentUserData },
  } = useGlobalContext();

  useEffect(() => {
    scroll.scrollToBottom();
  }, [data]);

  if (loading || currentUserLoading) {
    return <Loading />;
  }
  const chat_messages = data?.shopping_list_items_by_pk?.chat_messages;
  if (!chat_messages) {
    throw new ApolloDataNotFoundError({ chat_messages });
  }
  const current_user = currentUserData?.current_user[0].user;
  if (!current_user) {
    throw new ApolloDataNotFoundError({ current_user });
  }
  const onSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = (e) => {
    e.preventDefault();
    if (message !== "") {
      const now = formatISO(new Date());

      createChatMessage({
        variables: { message, shopping_list_item_id },
        optimisticResponse: {
          insert_chat_messages_one: {
            created_at: now,
            message,
            creator: current_user,
            id: uuidv4(),
            __typename: "chat_messages",
          },
        },
      });
    }
    setMessage("");
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-center space-y-1 ">
        {chat_messages.map((chatMessage) => (
          <ChatMessage
            key={chatMessage.id}
            chatMessage={chatMessage}
            currentUser={current_user}
          />
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex items-center space-x-1">
        <input
          autoFocus
          type="text"
          className="w-full text-sm font-medium text-white bg-gray-600 border-none rounded-full form-input focus:shadow-none focus:outline-none"
          placeholder={placeholder}
          onFocus={() => setPlaceholder(PLACEHOLDERS.focused)}
          onBlur={() => setPlaceholder(PLACEHOLDERS.blur)}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* <button>
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button> */}
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
