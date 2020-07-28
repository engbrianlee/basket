import React from "react";
import { gql } from "@apollo/client";
import { useGetCreatedShoppingListsQuery } from "../../generated/graphql";
import CreateShoppingList from "./CreateShoppingList";
import Loading from "../Loading";
import ShoppingList from "./ShoppingList";
import { ApolloDataNotFoundError } from "../../lib/error";

const CreatedShoppingLists = () => {
  const { loading, data } = useGetCreatedShoppingListsQuery();

  if (loading) {
    return <Loading />;
  }

  if (!data || !data.current_user) {
    throw new ApolloDataNotFoundError();
  }

  return (
    <div>
      <h2>Created Shopping Lists</h2>
      <div className="divide-y-2 divide-gray-500">
        {data.current_user[0].user?.created_shopping_lists.map(
          (shoppingList) => (
            <ShoppingList key={shoppingList.id} shoppingList={shoppingList} />
          )
        )}
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
        public_id
        created_shopping_lists {
          ...CreatedShoppingListsData
        }
      }
    }
  }
  ${CreatedShoppingLists.fragments.createdShoppingLists}
`;

export { GET_CREATED_SHOPPING_LISTS };

export default CreatedShoppingLists;
