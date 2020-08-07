import React from "react";
import { gql } from "@apollo/client";
import {
  useGetJoinedShoppingListsQuery,
  useUpdateShoppingListMutation,
} from "../../generated/graphql";
import Loading from "../Loading";
import ShoppingList from "./ShoppingList";
import { ApolloDataNotFoundError } from "../../lib/error";

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
  if (loading) {
    return <Loading />;
  }
  const joined_shopping_lists =
    data?.current_user[0].user?.joined_shopping_lists;
  if (!joined_shopping_lists) {
    throw new ApolloDataNotFoundError({ joined_shopping_lists });
  }

  return (
    <div className="w-full space-y-2">
      {joined_shopping_lists.map(({ shopping_list: shoppingList }) => (
        <ShoppingList
          key={shoppingList.id}
          shoppingList={shoppingList}
          onUpdate={onUpdate}
        />
      ))}
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
export { GET_JOINED_SHOPPING_LISTS };

export default JoinedShoppingLists;
