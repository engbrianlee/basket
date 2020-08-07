import React from "react";
import ShoppingList from "./ShoppingList";
import { ShoppingListDataFragment } from "../../generated/graphql";
import { action } from "@storybook/addon-actions";

export default {
  component: ShoppingList,
  title: "ShoppingList",
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const taskData: ShoppingListDataFragment = {
  __typename: "shopping_lists",
  id: "b37f5d77-40ee-45c2-a790-2fa1d72784bb",
  created_at: "2020-07-31T17:21:03.064864+00:00",
  updated_at: "2020-07-31T17:21:08.064864+00:00",
  title: "Pasta Run",
  creator: {
    __typename: "users",
    name: "Brian Lee",
    public_id: "8932d914-24ef-494a-a8fe-435554562bc7",
  },
  active_users: [
    {
      __typename: "shopping_list_active_users",
      user: {
        __typename: "users",
        name: "Brian Lee",
        public_id: "33caacb2-275b-4e51-a952-6df94284da39",
      },
    },
    {
      __typename: "shopping_list_active_users",
      user: {
        __typename: "users",
        name: "Crystal Chu",
        public_id: "33caacb2-275b-4e51-a952-6df94285da39",
      },
    },
    {
      __typename: "shopping_list_active_users",
      user: {
        __typename: "users",
        name: "Steve Carrel",
        public_id: "33caacb2-275b-4e51-a952-6df94286da39",
      },
    },
    {
      __typename: "shopping_list_active_users",
      user: {
        __typename: "users",
        name: "Julian Sedillo",
        public_id: "33caacb2-275b-4e51-a952-6df94287da39",
      },
    },
  ],
};
export const actionsData = {
  onDelete: action("onDelete"),
  onUpdate: action("onUpdate"),
};

export const Default = () => (
  <ShoppingList shoppingList={taskData} {...actionsData} />
);
export const CantDelete = () => (
  <ShoppingList shoppingList={taskData} canDelete={false} {...actionsData} />
);
