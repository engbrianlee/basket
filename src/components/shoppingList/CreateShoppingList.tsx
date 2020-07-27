import React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import {
  CreateShoppingListMutationVariables,
  useCreateShoppingListMutation,
} from "../../generated/graphql";
import { gql } from "@apollo/client";
import { GET_CREATED_SHOPPING_LISTS } from "./CreatedShoppingLists";
import ShoppingList from "./ShoppingList";

type FormData = CreateShoppingListMutationVariables;

const CreateShoppingList = () => {
  const [createShoppingList] = useCreateShoppingListMutation();

  const { register, handleSubmit, watch, errors, reset } = useForm<FormData>();

  const title = watch("title");

  return (
    <div className="fixed inset-x-0 bottom-0 w-full">
      <form
        className="mt-8"
        onSubmit={(e) => {
          handleSubmit((data) => {
            createShoppingList({ variables: data });
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
            <input
              aria-label="New List Description"
              name="description"
              type="text"
              className="w-full rounded-none form-input"
              placeholder="Description"
              ref={register}
            />
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
  mutation createShoppingList($title: String!, $description: String) {
    insert_shopping_lists_one(
      object: { title: $title, description: $description }
    ) {
      ...ShoppingListData
    }
  }
  ${ShoppingList.fragments.shoppingList}
`;

export { CREATE_SHOPPING_LIST };

export default CreateShoppingList;
