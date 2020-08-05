import React from "react";
import { action } from "@storybook/addon-actions";
import ShoppingListsHeader from "./ShoppingListsHeader";
import { currentUserData } from "./CurrentUser.stories";

export default {
  component: ShoppingListsHeader,
  title: "ShoppingListsHeader",
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};
export const actionsData = {
  onLogout: action("onLogout"),
};

export const Default = () => (
  <ShoppingListsHeader currentUser={currentUserData} {...actionsData} />
);
