import React from "react";
import CurrentUser, { CurrentUserProps } from "./CurrentUser";

export default {
  component: CurrentUser,
  title: "CurrentUser",
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};
export const currentUserData: CurrentUserProps["currentUser"] = {
  name: "Brian Lee",
  public_id: "",
};

export const Default = () => <CurrentUser currentUser={currentUserData} />;
