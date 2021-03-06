import React from "react";
import classNames from "classnames";

type AvatarWithPlaceholderInitialsProps = {
  initials: string;
  className?: string;
};
const AvatarWithPlaceholderInitials = ({
  initials,
  className,
}: AvatarWithPlaceholderInitialsProps) => (
  <div
    className={classNames(
      className,
      "rounded-full flex items-center justify-center font-medium tracking-wide"
    )}
  >
    <span>{initials}</span>
  </div>
);
const parseFirstName = (name: string) => name.split(" ")[0];
const parseInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

const CURRENT_USER_AVATAR_COLOR = "bg-blue-500";
const AVATAR_COLORS = [
  "bg-green-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-pink-500",
];

export default AvatarWithPlaceholderInitials;
export {
  parseInitials,
  AVATAR_COLORS,
  CURRENT_USER_AVATAR_COLOR,
  parseFirstName,
};
