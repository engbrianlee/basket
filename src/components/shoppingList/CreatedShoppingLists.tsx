import React from "react";
import { gql } from "@apollo/client";
import { useGetCreatedShoppingListsQuery } from "../../generated/graphql";
import CreateShoppingList from "./CreateShoppingList";
import Loading from "../Loading";
import ShoppingList from "./ShoppingList";
import { ApolloDataNotFoundError } from "../../lib/error";
import Creator from "./Creator";

const CreatedShoppingLists = () => {
  const { loading, data } = useGetCreatedShoppingListsQuery();

  if (loading) {
    return <Loading />;
  }
  const created_shopping_lists =
    data?.current_user[0].user?.created_shopping_lists;

  if (!created_shopping_lists) {
    throw new ApolloDataNotFoundError({ created_shopping_lists });
  }

  return (
    <div>
      <h2>Created Shopping Lists</h2>
      <div className="divide-y-2 divide-gray-500">
        {created_shopping_lists.map((shoppingList) => (
          <ShoppingList key={shoppingList.id} shoppingList={shoppingList} />
        ))}
      </div>

      <CreateShoppingList />
    </div>
  );
};
CreatedShoppingLists.fragments = {
  createdShoppingLists: gql`
    fragment CreatedShoppingListsData on shopping_lists {
      ...ShoppingListData
    }
    ${ShoppingList.fragments.shoppingList}
  `,
};

const GET_CREATED_SHOPPING_LISTS = gql`
  query getCreatedShoppingLists {
    current_user {
      id
      user {
        created_shopping_lists {
          ...CreatedShoppingListsData
        }
        ...CreatorData
      }
    }
  }
  ${CreatedShoppingLists.fragments.createdShoppingLists}
  ${Creator.fragments.creator}
`;

export { GET_CREATED_SHOPPING_LISTS };

export default CreatedShoppingLists;
