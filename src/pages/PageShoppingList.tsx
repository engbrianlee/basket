import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../layout/Layout";
import { gql } from "@apollo/client";
import {
  useJoinShoppingListMutation,
  useDeleteShoppingListItemMutation,
  useUpdateShoppingListItemMutation,
  useCreateShoppingListItemMutation,
  ShoppingListItemDataFragment,
  GetShoppingListQuery,
  useGetShoppingListLazyQuery,
} from "../generated/graphql";
import Loading from "../components/Loading";
import { ApolloDataNotFoundError } from "../lib/error";
import ShoppingListItem from "../components/shopppingList/ShoppingListItem";
import ShoppingList from "../components/dashboard/ShoppingList";
import { formatISO } from "date-fns";
import useGlobalContext from "../components/context";
import ShoppingListHeader from "../components/shopppingList/ShoppingListHeader";
import produce from "immer";

enum FILTER {
  todo = "todo",
  done = "done",
  all = "all",
}
const FILTERS_FILTER_FN = {
  [FILTER.todo]: (shoppingListItem: ShoppingListItemDataFragment) =>
    !shoppingListItem.is_completed,
  [FILTER.done]: (shoppingListItem: ShoppingListItemDataFragment) =>
    shoppingListItem.is_completed,
  [FILTER.all]: (_shoppingListItem: ShoppingListItemDataFragment) => true,
};
const FILTERS_SORT_FN = {
  [FILTER.todo]: (
    shoppingListItemA: ShoppingListItemDataFragment,
    shoppingListItemB: ShoppingListItemDataFragment
  ) => 0,
  [FILTER.done]: (
    shoppingListItemA: ShoppingListItemDataFragment,
    shoppingListItemB: ShoppingListItemDataFragment
  ) => 0,
  [FILTER.all]: (
    shoppingListItemA: ShoppingListItemDataFragment,
    shoppingListItemB: ShoppingListItemDataFragment
  ) => {
    if (shoppingListItemA.is_completed === shoppingListItemB.is_completed) {
      return 0;
    } else {
      return shoppingListItemA.is_completed ? 1 : -1;
    }
  },
};
type Params = {
  id: ShoppingListItemDataFragment["id"];
};
const PageShoppingList = () => {
  const { id } = useParams<Params>();
  const [filter, setFilter] = useState(FILTER.todo);
  const filterFn = FILTERS_FILTER_FN[filter];
  const sortFn = FILTERS_SORT_FN[filter];

  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");

  const [
    getShoppingList,
    { data, loading, subscribeToMore, called },
  ] = useGetShoppingListLazyQuery({
    variables: { id },
  });
  const [joinShoppingList] = useJoinShoppingListMutation({
    onCompleted: () => {
      getShoppingList();
    },
  });
  useEffect(() => {
    if (called && subscribeToMore) {
      subscribeToMore({
        variables: { id },
        document: SUBSCRIBE_SHOPPING_LIST,
      });
    }
  }, [called, id, subscribeToMore]);
  const [createShoppingListItem] = useCreateShoppingListItemMutation({
    update: (cache, { data }) => {
      const query = GET_SHOPPING_LIST;
      const cachedData = cache.readQuery<GetShoppingListQuery>({
        query,
        variables: { id },
      });
      const newData = produce(cachedData, (t) => {
        const shopping_list_items =
          t?.shopping_lists_by_pk?.shopping_list_items;
        if (!shopping_list_items) {
          throw new ApolloDataNotFoundError({ shopping_list_items });
        }
        const insert_shopping_list_items_one =
          data?.insert_shopping_list_items_one;
        if (!insert_shopping_list_items_one) {
          throw new ApolloDataNotFoundError({ insert_shopping_list_items_one });
        }
        shopping_list_items.unshift(insert_shopping_list_items_one);
      });
      if (newData) {
        cache.writeQuery<GetShoppingListQuery>({
          query,
          data: newData,
        });
      }
    },
  });

  const [onDelete] = useDeleteShoppingListItemMutation({
    update: (cache, { data }) => {
      const query = GET_SHOPPING_LIST;
      const cachedData = cache.readQuery<GetShoppingListQuery>({
        query,
        variables: { id },
      });
      const newData = produce(cachedData, (t) => {
        const delete_shopping_lists_items_by_pk =
          data?.delete_shopping_list_items_by_pk;
        if (!delete_shopping_lists_items_by_pk) {
          throw new ApolloDataNotFoundError({
            delete_shopping_lists_items_by_pk,
          });
        }
        if (t?.shopping_lists_by_pk?.shopping_list_items) {
          _.remove(
            t?.shopping_lists_by_pk.shopping_list_items,
            (shopping_list_item) =>
              shopping_list_item.id === delete_shopping_lists_items_by_pk.id
          );
        }
      });
      if (newData) {
        cache.writeQuery<GetShoppingListQuery>({
          query,
          data: newData,
        });
      }
    },
  });
  useEffect(() => {
    joinShoppingList({ variables: { id } });
  }, [id, joinShoppingList]);

  const [onUpdate] = useUpdateShoppingListItemMutation();
  const {
    currentUser: { loading: currentUserLoading, data: currentUserData },
  } = useGlobalContext();

  if (loading || !called || currentUserLoading) {
    return <Loading />;
  }

  const shopping_list = data?.shopping_lists_by_pk;
  if (!shopping_list) {
    throw new ApolloDataNotFoundError({ shopping_list });
  }
  const current_user = currentUserData?.current_user[0].user;
  if (!current_user) {
    throw new ApolloDataNotFoundError({ current_user });
  }

  const onCreateNewShoppingListItem = (
    e: React.FormEvent | React.FocusEvent
  ) => {
    e.preventDefault();
    if (title !== "") {
      const now = formatISO(new Date());
      createShoppingListItem({
        variables: {
          title,
          shopping_list_id: shopping_list.id,
        },
        optimisticResponse: {
          insert_shopping_list_items_one: {
            __typename: "shopping_list_items",
            created_at: now,
            updated_at: now,
            creator: current_user,
            id: uuidv4(),
            title,
            is_completed: false,
            updator: current_user,
            chat_messages_aggregate: { aggregate: { count: 0 } },
          },
        },
      });
    }

    setTitle("");
    setIsCreating(false);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <ShoppingListHeader
          title={shopping_list.title}
          updated_at={shopping_list.updated_at}
        />
        <nav className="flex mt-6">
          <button
            className={classNames(
              filter === FILTER.todo
                ? "text-white bg-blue-500"
                : "bg-white text-blue-500",
              "w-1/2 text-center border border-blue-500 rounded-md rounded-r-none"
            )}
            onClick={() => setFilter(FILTER.todo)}
          >
            Todo
          </button>
          <button
            className={classNames(
              filter === FILTER.done
                ? "text-white bg-blue-500"
                : "bg-white text-blue-500",
              "w-1/2 text-center border border-blue-500 border-l-0 border-r-0"
            )}
            onClick={() => setFilter(FILTER.done)}
          >
            Done
          </button>
          <button
            className={classNames(
              filter === FILTER.all
                ? "text-white bg-blue-500"
                : "bg-white text-blue-500",
              "w-1/2 text-center border border-blue-500 rounded-md rounded-l-none"
            )}
            onClick={() => setFilter(FILTER.all)}
          >
            All
          </button>
        </nav>
        {/* https://stackoverflow.com/questions/21515042/scrolling-a-flexbox-with-overflowing-content */}
        <div className="flex flex-col items-center justify-between flex-1 flex-grow mt-4 overflow-auto rounded-lg">
          <div
            className="flex w-full overflow-auto rounded-lg"
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
                      className="w-full py-2 text-xl font-bold leading-none bg-transparent focus:outline-none"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </form>
                </div>
              )}

              {shopping_list.shopping_list_items
                .filter(filterFn)
                .sort(sortFn)
                .map((shoppingListItem) => (
                  <ShoppingListItem
                    key={shoppingListItem.id}
                    shoppingListItem={shoppingListItem}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                  />
                ))}
            </div>
          </div>
          <button
            onClick={() => {
              setFilter(FILTER.todo);
              setIsCreating(true);
            }}
          >
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
      </div>
    </Layout>
  );
};
const GET_SHOPPING_LIST = gql`
  query getShoppingList($id: uuid!) {
    shopping_lists_by_pk(id: $id) {
      ...ShoppingListData
      shopping_list_items {
        ...ShoppingListItemData
      }
    }
  }
  ${ShoppingList.fragment}
  ${ShoppingListItem.fragment}
`;
const SUBSCRIBE_SHOPPING_LIST = gql`
  subscription subscribeShoppingList($id: uuid!) {
    shopping_lists_by_pk(id: $id) {
      ...ShoppingListData
      shopping_list_items {
        ...ShoppingListItemData
      }
    }
  }
  ${ShoppingList.fragment}
  ${ShoppingListItem.fragment}
`;
const JOIN_SHOPPING_LIST = gql`
  mutation joinShoppingList($id: uuid!) {
    join_shopping_list(shopping_list_id: $id) {
      shopping_list_id
    }
  }
`;

const CREATE_SHOPPING_LIST_ITEM = gql`
  mutation createShoppingListItem($shopping_list_id: uuid!, $title: String!) {
    insert_shopping_list_items_one(
      object: { shopping_list_id: $shopping_list_id, title: $title }
    ) {
      ...ShoppingListItemData
    }
  }
  ${ShoppingListItem.fragment}
`;

const DELETE_SHOPPING_LIST_ITEM = gql`
  mutation deleteShoppingListItem($id: uuid!) {
    delete_shopping_list_items_by_pk(id: $id) {
      id
    }
  }
`;

const UPDATE_SHOPPING_LIST_ITEM = gql`
  mutation updateShoppingListItem(
    $id: uuid!
    $set_input: shopping_list_items_set_input!
  ) {
    update_shopping_list_items_by_pk(
      pk_columns: { id: $id }
      _set: $set_input
    ) {
      ...ShoppingListItemData
    }
  }
  ${ShoppingListItem.fragment}
`;

export {
  JOIN_SHOPPING_LIST,
  CREATE_SHOPPING_LIST_ITEM,
  DELETE_SHOPPING_LIST_ITEM,
  UPDATE_SHOPPING_LIST_ITEM,
  SUBSCRIBE_SHOPPING_LIST,
  GET_SHOPPING_LIST,
};

export default PageShoppingList;
