import React from "react";
import { gql } from "@apollo/client";
import {
  useGetJoinedShoppingListsQuery,
  useUpdateShoppingListMutation,
  useLeaveShoppingListMutation,
} from "../../generated/graphql";
import Loading from "../Loading";
import ShoppingList from "./ShoppingList";
import { ApolloDataNotFoundError } from "../../lib/error";
import ActiveUser from "./ActiveUser";
import User from "./User";

const ShoppingListFragment = gql`
  fragment ShoppingListData on shopping_lists {
    id
    updated_at
    created_at
    title
    creator {
      ...UserData
    }
    active_users {
      ...ActiveUserData
    }
  }
  ${ActiveUser.fragment}
  ${User.fragment}
`;

const fragment = gql`
  fragment JoinedShoppingListsData on shopping_list_active_users {
    shopping_list {
      ...ShoppingListData
    }
  }
  ${ShoppingListFragment}
`;

const JoinedShoppingLists = () => {
  const { loading, data } = useGetJoinedShoppingListsQuery();
  const [onUpdate] = useUpdateShoppingListMutation();
  const [onLeave] = useLeaveShoppingListMutation();
  if (loading) {
    return <Loading />;
  }
  const joined_shopping_lists =
    data?.current_user[0].user?.joined_shopping_lists;
  if (!joined_shopping_lists) {
    throw new ApolloDataNotFoundError({ joined_shopping_lists });
  }

  return (
    <div className="flex flex-col items-center justify-between flex-1 flex-grow mt-4 overflow-auto rounded-lg">
      <div
        className="flex w-full overflow-auto rounded-lg "
        style={{ minHeight: "min-content" }}
      >
        <div className="w-full space-y-2">
          {joined_shopping_lists.map(({ shopping_list: shoppingList }) => (
            <ShoppingList
              key={shoppingList.id}
              shoppingList={shoppingList}
              onUpdate={onUpdate}
              onLeave={onLeave}
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
      affected_rows
    }
  }
`;
export { GET_JOINED_SHOPPING_LISTS, LEAVE_SHOPPING_LIST };

export default JoinedShoppingLists;
