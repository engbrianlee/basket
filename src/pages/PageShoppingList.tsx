import React, { useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../layout/Layout";
import { gql } from "@apollo/client";
import {
  useJoinShoppingListMutation,
  useDeleteShoppingListItemMutation,
  useUpdateShoppingListItemMutation,
  useGetShoppingListQuery,
} from "../generated/graphql";
import Loading from "../components/Loading";
import { ApolloDataNotFoundError } from "../lib/error";
import ShoppingListItem from "../components/shopppingList/ShoppingListItem";
import ShoppingList from "../components/dashboard/ShoppingList";

const PageShoppingList = () => {
  const { id } = useParams();
  const { data, loading, subscribeToMore } = useGetShoppingListQuery({
    variables: { id },
  });
  const [joinShoppingList] = useJoinShoppingListMutation();

  const [onDelete] = useDeleteShoppingListItemMutation();
  const [onUpdate] = useUpdateShoppingListItemMutation();

  useEffect(() => {
    joinShoppingList({ variables: { id } });
    subscribeToMore({
      variables: { id },
      document: SUBSCRIBE_SHOPPING_LIST,
    });
  }, [id, joinShoppingList, subscribeToMore]);

  if (loading) {
    return <Loading />;
  }
  const shopping_list = data?.shopping_lists_by_pk;
  if (!shopping_list) {
    throw new ApolloDataNotFoundError({ shopping_list });
  }

  return (
    <Layout>
      {shopping_list.shopping_list_items.map((shoppingListItem) => (
        <ShoppingListItem
          key={shoppingListItem.id}
          shoppingListItem={shoppingListItem}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
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
  ${ShoppingList.fragment}
  ${ShoppingListItem.fragment}
}
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
