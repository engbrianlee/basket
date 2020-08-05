import React from "react";
import { gql } from "@apollo/client";
import {
  useGetCreatedShoppingListsQuery,
  useDeleteShoppingListMutation,
  GetCreatedShoppingListsQuery,
  useUpdateShoppingListMutation,
} from "../../generated/graphql";
import Loading from "../Loading";
import ShoppingList from "./ShoppingList";
import { ApolloDataNotFoundError } from "../../lib/error";
import Creator from "./Creator";
import produce from "immer";
import _ from "lodash";

const fragment = gql`
  fragment CreatedShoppingListsData on shopping_lists {
    ...ShoppingListData
  }
  ${ShoppingList.fragment}
`;
const CreatedShoppingLists = () => {
  const { loading, data } = useGetCreatedShoppingListsQuery();
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
    <div className="w-full space-y-2">
      {created_shopping_lists.map((shoppingList) => (
        <ShoppingList
          key={shoppingList.id}
          shoppingList={shoppingList}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
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
        ...CreatorData
      }
    }
  }
  ${CreatedShoppingLists.fragment}
  ${Creator.fragment}
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

export {
  GET_CREATED_SHOPPING_LISTS,
  DELETE_SHOPPING_LIST,
  UPDATE_SHOPPING_LIST,
};

export default CreatedShoppingLists;
