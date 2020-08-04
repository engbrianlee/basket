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
  if (joined_shopping_lists) {
    throw new ApolloDataNotFoundError({ joined_shopping_lists });
  }

  return (
    <div>
      <h2>Joined Shopping Lists</h2>
      <p>{JSON.stringify(data)}</p>
      {!(loading || !data) && (
        <div className="divide-y-2 divide-gray-500">
          {data.current_user[0].user?.joined_shopping_lists.map(
            (joined_shopping_lists) => (
              <ShoppingList
                key={joined_shopping_lists.shopping_list.id}
                shoppingList={joined_shopping_lists.shopping_list}
                canDelete={false}
                onUpdate={onUpdate}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};
JoinedShoppingLists.fragment = fragment;
const GET_JOINED_SHOPPING_LISTS = gql`
  query getJoinedShoppingLists {
    current_user {
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
