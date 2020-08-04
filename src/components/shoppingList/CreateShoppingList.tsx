import React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import {
  CreateShoppingListMutationVariables,
  useCreateShoppingListMutation,
  GetCreatedShoppingListsQuery,
} from "../../generated/graphql";
import { gql } from "@apollo/client";
import { GET_CREATED_SHOPPING_LISTS } from "./CreatedShoppingLists";
import ShoppingList from "./ShoppingList";
import produce from "immer";
import { ApolloDataNotFoundError } from "../../lib/error";
import { formatISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";

type FormData = CreateShoppingListMutationVariables;

const CreateShoppingList = () => {
  const [createShoppingList] = useCreateShoppingListMutation({
    update: (cache, { data }) => {
      const query = GET_CREATED_SHOPPING_LISTS;
      const cachedData = cache.readQuery<GetCreatedShoppingListsQuery>({
        query,
      });
      const newData = produce(cachedData, (t) => {
        const created_shopping_lists =
          t?.current_user[0].user?.created_shopping_lists;
        if (!created_shopping_lists) {
          throw new ApolloDataNotFoundError({ created_shopping_lists });
        }
        const insert_shopping_lists_one = data?.insert_shopping_lists_one;
        if (!insert_shopping_lists_one) {
          throw new ApolloDataNotFoundError({ insert_shopping_lists_one });
        }
        created_shopping_lists.unshift(insert_shopping_lists_one);
      });
      if (newData) {
        cache.writeQuery<GetCreatedShoppingListsQuery>({
          query,
          data: newData,
        });
      }
    },
  });

  const { register, handleSubmit, watch, errors, reset } = useForm<FormData>();

  const title = watch("title");

  return (
    <div className="fixed inset-x-0 bottom-0 w-full">
      <form
        className="mt-8"
        onSubmit={(e) => {
          handleSubmit((variables) => {
            createShoppingList({
              variables,
              optimisticResponse: {
                insert_shopping_lists_one: {
                  __typename: "shopping_lists",
                  active_users: [],
                  updated_at: formatISO(new Date()),
                  creator: { name: "Mock", public_id: "testId" },
                  id: uuidv4(),
                  title: variables.title,
                },
              },
            });
          })(e);
          reset();
        }}
      >
        <div className="rounded-md shadow-sm">
          <div className="relative">
            <input
              autoFocus
              aria-label="New List Title"
              name="title"
              type="text"
              className={classNames("w-full rounded-b-none form-input", {
                "focus:shadow-outline-red border-red-300 placeholder-red-800 focus:border-red-300":
                  errors.title,
              })}
              placeholder="Title"
              ref={register({ required: "Required" })}
            />
            {errors.title && (
              <div className="absolute inset-y-0 right-0 flex items-center px-2 space-x-2">
                <span className="text-xs text-red-800">
                  {errors.title.message}
                </span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6 text-red-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className={classNames(
                { "opacity-50 cursor-not-allowed": !title },
                "relative flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              )}
            >
              Create Shopping List
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const CREATE_SHOPPING_LIST = gql`
  mutation createShoppingList($title: String!) {
    insert_shopping_lists_one(object: { title: $title }) {
      ...ShoppingListData
    }
  }
  ${ShoppingList.fragment}
`;

const GET_CREATOR = gql`
  query getCreator {
    current_user {
      id
      user {
        ...CreatorData
      }
    }
  }
`;

export { CREATE_SHOPPING_LIST, GET_CREATOR };

export default CreateShoppingList;
