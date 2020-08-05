import React from "react";
import { parseFirstName } from "../Avatar";
import { Tooltip } from "react-tippy";
import CurrentUser from "./CurrentUser";
import { CurrentUserProps } from "./CurrentUser";

export type ShoppingListsHeaderProps = {
  currentUser: CurrentUserProps["currentUser"];
  onLogout: any;
};
const ShoppingListsHeader = ({
  currentUser,
  onLogout,
}: ShoppingListsHeaderProps) => {
  return (
    <header>
      <nav className="flex items-center justify-center">
        <div className="flex items-center justify-start flex-1 w-0 mr-auto">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8">
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold ">{`${parseFirstName(
          currentUser.name
        )}'s Lists`}</h1>
        <div className="flex items-center justify-end flex-1 w-0 ml-auto">
          <Tooltip
            html={
              <button
                onClick={() =>
                  onLogout({
                    returnTo: window.location.origin,
                  })
                }
                className="px-4 py-2 text-sm"
              >
                Sign Out
              </button>
            }
            arrow
            theme="light"
            position="bottom"
            trigger="click"
            interactive
          >
            <CurrentUser currentUser={currentUser} />
          </Tooltip>
        </div>
      </nav>
    </header>
  );
};

export default ShoppingListsHeader;
