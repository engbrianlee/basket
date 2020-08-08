import React from "react";
import { ShoppingListDataFragment } from "../../generated/graphql";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import copy from "copy-to-clipboard";

export type ShoppingListHeaderProps = {
  title: ShoppingListDataFragment["title"];
  updated_at: ShoppingListDataFragment["updated_at"];
};
const ShoppingListHeader = ({ title, updated_at }: ShoppingListHeaderProps) => {
  return (
    <header>
      <nav className="flex items-center justify-center space-x-4">
        <div className="flex items-center justify-start flex-1 mr-auto">
          <Link to="/">
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8">
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="truncate">
          <h1 className="text-3xl font-bold leading-none text-center truncate">
            {title}
          </h1>
          <p className="text-sm font-light leading-none text-center text-gray-300 truncate">
            modified{" "}
            <time dateTime={updated_at}>
              {formatDistanceToNow(new Date(updated_at), {
                addSuffix: true,
              })}
            </time>
          </p>
        </div>
        <button
          onClick={() => {
            copy(window.location.href);
          }}
          className="flex items-center justify-end flex-1 ml-auto"
        >
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default ShoppingListHeader;
