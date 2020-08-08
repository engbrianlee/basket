import React from "react";
import { gql } from "@apollo/client";
import {
  useGetJoinedShoppingListsQuery,
  useUpdateShoppingListMutation,
  useLeaveShoppingListMutation,
  GetJoinedShoppingListsQuery,
} from "../../generated/graphql";
import Loading from "../Loading";
import ShoppingList from "./ShoppingList";
import { ApolloDataNotFoundError } from "../../lib/error";
import produce from "immer";
import _ from "lodash";

const fragment = gql`
  fragment JoinedShoppingListsData on shopping_list_active_users {
    shopping_list {
      ...ShoppingListData
    }
  }
  ${ShoppingList.fragment}
`;

const JoinedShoppingLists = () => {
  const { loading, data } = useGetJoinedShoppingListsQuery();
  const [onUpdate] = useUpdateShoppingListMutation();
  const [onDelete] = useLeaveShoppingListMutation({
    update: (cache, { data }) => {
      const query = GET_JOINED_SHOPPING_LISTS;
      const cachedData = cache.readQuery<GetJoinedShoppingListsQuery>({
        query,
      });
      const newData = produce(cachedData, (t) => {
        const delete_shopping_list_active_users =
          data?.delete_shopping_list_active_users;
        if (!delete_shopping_list_active_users) {
          throw new ApolloDataNotFoundError({
            delete_shopping_list_active_users,
          });
        }
        if (t?.current_user[0].user?.joined_shopping_lists) {
          _.remove(
            t?.current_user[0].user.joined_shopping_lists,
            (joined_shopping_lists) =>
              joined_shopping_lists.shopping_list.id ===
              delete_shopping_list_active_users.returning[0].shopping_list.id
          );
        }
      });
      if (newData) {
        cache.writeQuery<GetJoinedShoppingListsQuery>({
          query,
          data: newData,
        });
      }
    },
  });
  if (loading) {
    return <Loading />;
  }
  const joined_shopping_lists =
    data?.current_user[0].user?.joined_shopping_lists;
  if (!joined_shopping_lists) {
    throw new ApolloDataNotFoundError({ joined_shopping_lists });
  }

  return (
    <div className="flex flex-col items-center justify-between flex-1 flex-grow mt-4 overflow-auto">
      <div
        className="flex w-full overflow-auto scrolling-auto"
        style={{ minHeight: "min-content" }}
      >
        <div className="w-full space-y-2">
          {joined_shopping_lists.map(({ shopping_list: shoppingList }) => (
            <ShoppingList
              key={shoppingList.id}
              shoppingList={shoppingList}
              onUpdate={onUpdate}
              onDelete={onDelete}
              deleteButtonText="Leave"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
JoinedShoppingLists.fragment = fragment;
const GET_JOINED_SHOPPING_LISTS = gql`
  query getJoinedShoppingLists {
    current_user {
      id
      user {
        public_id
        joined_shopping_lists {
          ...JoinedShoppingListsData
        }
      }
    }
  }
  ${JoinedShoppingLists.fragment}
`;

const LEAVE_SHOPPING_LIST = gql`
  mutation leaveShoppingList($id: uuid!) {
    delete_shopping_list_active_users(
      where: { shopping_list: { id: { _eq: $id } } }
    ) {
      returning {
        shopping_list {
          id
        }
      }
    }
  }
`;
export { GET_JOINED_SHOPPING_LISTS, LEAVE_SHOPPING_LIST };

export default JoinedShoppingLists;
