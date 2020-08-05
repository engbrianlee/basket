import React, { useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../layout/Layout";
import { gql } from "@apollo/client";
import { useJoinShoppingListMutation } from "../generated/graphql";
import ShoppingList from "../components/dashboard/ShoppingList";
import Loading from "../components/Loading";
import { ApolloDataNotFoundError } from "../lib/error";

const PageShoppingList = () => {
  const { id } = useParams();
  const [
    joinShoppingList,
    { loading, data, called },
  ] = useJoinShoppingListMutation();

  useEffect(() => {
    joinShoppingList({ variables: { id } });
  }, [id, joinShoppingList]);

  if (!called || loading) {
    return <Loading />;
  }
  const shopping_list = data?.join_shopping_list?.shopping_list;
  if (!shopping_list) {
    throw new ApolloDataNotFoundError({ shopping_list });
  }

  return <Layout>{JSON.stringify(shopping_list)}</Layout>;
};

const JOIN_SHOPPING_LIST = gql`
  mutation joinShoppingList($id: uuid!) {
    join_shopping_list(shopping_list_id: $id) {
      shopping_list {
        ...ShoppingListData
      }
    }
  }
  ${ShoppingList.fragment}
`;

const CREATE_LIST_ITEM = gql`
  mutation createListItem($shopping_list_id: uuid!, $title: String!) {
    insert_list_items_one(
      object: { shopping_list_id: $shopping_list_id, title: $title }
    ) {
      created_at
      created_by_user {
        name
        public_id
      }
      is_completed
      title
      updated_at
      updated_by_user {
        name
        public_id
      }
    }
  }
`;

export { JOIN_SHOPPING_LIST, CREATE_LIST_ITEM };

export default PageShoppingList;
