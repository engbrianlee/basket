import React from "react";
import { formatRelative } from "date-fns";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import { Link } from "react-router-dom";
import ActiveUser from "./ActiveUser";
import { gql } from "@apollo/client";
import {
  ShoppingListDataFragment,
  UpdateShoppingListMutationVariables,
  useDeleteShoppingListMutation,
  useUpdateShoppingListMutation,
  GetCreatedShoppingListsQuery,
} from "../../generated/graphql";
import { GET_CREATED_SHOPPING_LISTS } from "./CreatedShoppingLists";
import produce from "immer";
import { ApolloDataNotFoundError } from "../../lib/error";
import _ from "lodash";
import Creator from "./Creator";

type ShoppingListProps = {
  shoppingList: ShoppingListDataFragment;
} & typeof shoppingListDefaultProps;
const shoppingListDefaultProps = {
  canDelete: true,
};
type FormData = Omit<UpdateShoppingListMutationVariables, "id">;
const ShoppingList = ({ shoppingList, canDelete }: ShoppingListProps) => {
  const [deleteShoppingList] = useDeleteShoppingListMutation({
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
  const [updateShoppingList] = useUpdateShoppingListMutation();

  const { register, handleSubmit, watch, errors, reset } = useForm<FormData>({
    defaultValues: {
      set_input: {
        title: shoppingList.title,
        description: shoppingList.description,
      },
    },
  });
  useEffect(() => {
    reset({
      set_input: {
        title: shoppingList.title,
        description: shoppingList.description,
      },
    });
  }, [reset, shoppingList]);

  const [isEditing, setIsEditing] = useState(false);

  const title = watch("set_input.title");

  const onSubmit: SubmitHandler<FormData> = ({ set_input }) => {
    setIsEditing(false);
    updateShoppingList({
      variables: { id: shoppingList.id, set_input },
      optimisticResponse: {
        update_shopping_lists_by_pk: {
          ...shoppingList,
          title: set_input.title || "",
          description: set_input.description,
        },
      },
    });
  };

  return (
    <div>
      <time dateTime={shoppingList.created_at}>
        {formatRelative(new Date(shoppingList.created_at), new Date())}
      </time>
      {isEditing ? (
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm">
            <div className="relative">
              <input
                autoFocus
                aria-label="New List Title"
                name="set_input.title"
                type="text"
                className={classNames("w-full rounded-b-none form-input", {
                  "focus:shadow-outline-red border-red-300 placeholder-red-800 focus:border-red-300":
                    errors.set_input?.title,
                })}
                placeholder="Title"
                ref={register({ required: "Required" })}
              />
              {errors.set_input?.title && (
                <div className="absolute inset-y-0 right-0 flex items-center px-2 space-x-2">
                  <span className="text-xs text-red-800">
                    {errors.set_input.title.message}
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
                name="set_input.description"
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
                Save
              </button>
            </div>
          </div>
        </form>
      ) : (
        <Link to={`shopping-list/${shoppingList.id}`}>
          <div>
            <p>{shoppingList.title}</p>
            <p>{shoppingList.description}</p>
          </div>
        </Link>
      )}
      {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      {canDelete && (
        <button
          onClick={() =>
            deleteShoppingList({
              variables: { id: shoppingList.id },
              optimisticResponse: {
                delete_shopping_lists_by_pk: { id: shoppingList.id },
              },
            })
          }
        >
          Delete
        </button>
      )}
    </div>
  );
};

ShoppingList.defaultProps = shoppingListDefaultProps;
ShoppingList.fragments = {
  shoppingList: gql`
    fragment ShoppingListData on shopping_lists {
      id
      created_at
      description
      title
      creator {
        ...CreatorData
      }
      active_users {
        ...ActiveUserData
      }
    }
    ${ActiveUser.fragments.activeUser}
    ${Creator.fragments.creator}
  `,
};

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
  ${ShoppingList.fragments.shoppingList}
`;

export { DELETE_SHOPPING_LIST, UPDATE_SHOPPING_LIST };

export default ShoppingList;
