import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { gql } from "@apollo/client";
import {
  useGetCreatedShoppingListsQuery,
  useDeleteShoppingListMutation,
  GetCreatedShoppingListsQuery,
  useUpdateShoppingListMutation,
  useCreateShoppingListMutation,
} from "../../generated/graphql";
import Loading from "../Loading";
import ShoppingList from "./ShoppingList";
import { ApolloDataNotFoundError } from "../../lib/error";
import User from "./User";
import produce from "immer";
import _ from "lodash";
import { formatISO } from "date-fns";

const fragment = gql`
  fragment CreatedShoppingListsData on shopping_lists {
    ...ShoppingListData
  }
  ${ShoppingList.fragment}
`;
const CreatedShoppingLists = () => {
  const { loading, data } = useGetCreatedShoppingListsQuery();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");

  const [createShoppingList] = useCreateShoppingListMutation({
    update: (cache, { data }) => {
      const query = GET_CREATED_SHOPPING_LISTS;
      const cachedData = cache.readQuery<GetCreatedShoppingListsQuery>({
        query,
      });
      const newData = produce(cachedData, (t) => {
        const created_shopping_lists =
          t?.current_user[0].user?.created_shopping_lists;
        if (!created_shopping_lists) {
          throw new ApolloDataNotFoundError({ created_shopping_lists });
        }
        const insert_shopping_lists_one = data?.insert_shopping_lists_one;
        if (!insert_shopping_lists_one) {
          throw new ApolloDataNotFoundError({ insert_shopping_lists_one });
        }
        created_shopping_lists.unshift(insert_shopping_lists_one);
      });
      if (newData) {
        cache.writeQuery<GetCreatedShoppingListsQuery>({
          query,
          data: newData,
        });
      }
    },
  });

  const onCreateNewShoppingListItem = (
    e: React.FormEvent | React.FocusEvent
  ) => {
    e.preventDefault();
    if (title !== "") {
      const now = formatISO(new Date());
      createShoppingList({
        variables: { title },
        optimisticResponse: {
          insert_shopping_lists_one: {
            __typename: "shopping_lists",
            active_users: [],
            created_at: now,
            updated_at: now,
            creator: { name: "Mock", public_id: "testId" },
            id: uuidv4(),
            title,
          },
        },
      });
    }

    setTitle("");
    setIsCreating(false);
  };

  const [onDelete] = useDeleteShoppingListMutation({
    update: (cache, { data }) => {
      const query = GET_CREATED_SHOPPING_LISTS;
      const cachedData = cache.readQuery<GetCreatedShoppingListsQuery>({
        query,
      });
      const newData = produce(cachedData, (t) => {
        const delete_shopping_lists_by_pk = data?.delete_shopping_lists_by_pk;
        if (!delete_shopping_lists_by_pk) {
          throw new ApolloDataNotFoundError({ delete_shopping_lists_by_pk });
        }
        if (t?.current_user[0].user?.created_shopping_lists) {
          _.remove(
            t?.current_user[0].user?.created_shopping_lists,
            (shopping_list) =>
              shopping_list.id === delete_shopping_lists_by_pk.id
          );
        }
      });
      if (newData) {
        cache.writeQuery<GetCreatedShoppingListsQuery>({
          query,
          data: newData,
        });
      }
    },
  });
  const [onUpdate] = useUpdateShoppingListMutation();

  if (loading) {
    return <Loading />;
  }
  const created_shopping_lists =
    data?.current_user[0].user?.created_shopping_lists;

  if (!created_shopping_lists) {
    throw new ApolloDataNotFoundError({ created_shopping_lists });
  }

  return (
    // /* https://stackoverflow.com/questions/21515042/scrolling-a-flexbox-with-overflowing-content */
    <div className="flex flex-col items-center justify-between flex-1 flex-grow mt-4 overflow-auto">
      <div
        className="flex w-full overflow-auto scrolling-auto"
        style={{ minHeight: "min-content" }}
      >
        <div className="w-full space-y-2">
          {isCreating && (
            <div className="w-full px-3 overflow-hidden bg-gray-300 rounded-lg dark:text-gray-900">
              <form
                onBlur={onCreateNewShoppingListItem}
                onSubmit={onCreateNewShoppingListItem}
              >
                <input
                  autoFocus
                  type="text"
                  className="w-full text-xl font-bold leading-none form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </form>
            </div>
          )}

          {created_shopping_lists.map((shoppingList) => (
            <ShoppingList
              key={shoppingList.id}
              shoppingList={shoppingList}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      </div>
      <button onClick={() => setIsCreating(true)}>
        <svg
          className="text-blue-500 w-18 h-18"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};
CreatedShoppingLists.fragment = fragment;

const GET_CREATED_SHOPPING_LISTS = gql`
  query getCreatedShoppingLists {
    current_user {
      id
      user {
        created_shopping_lists {
          ...CreatedShoppingListsData
        }
        ...UserData
      }
    }
  }
  ${CreatedShoppingLists.fragment}
  ${User.fragment}
`;
const DELETE_SHOPPING_LIST = gql`
  mutation deleteShoppingList($id: uuid!) {
    delete_shopping_lists_by_pk(id: $id) {
      id
    }
  }
`;

const UPDATE_SHOPPING_LIST = gql`
  mutation updateShoppingList(
    $id: uuid!
    $set_input: shopping_lists_set_input!
  ) {
    update_shopping_lists_by_pk(pk_columns: { id: $id }, _set: $set_input) {
      ...ShoppingListData
    }
  }
  ${ShoppingList.fragment}
`;
const CREATE_SHOPPING_LIST = gql`
  mutation createShoppingList($title: String!) {
    insert_shopping_lists_one(object: { title: $title }) {
      ...ShoppingListData
    }
  }
  ${ShoppingList.fragment}
`;

export {
  GET_CREATED_SHOPPING_LISTS,
  DELETE_SHOPPING_LIST,
  UPDATE_SHOPPING_LIST,
  CREATE_SHOPPING_LIST,
};

export default CreatedShoppingLists;
