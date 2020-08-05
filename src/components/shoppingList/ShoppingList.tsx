import React, { useState, useEffect, useCallback } from "react";
import {
  ShoppingListDataFragment,
  DeleteShoppingListMutationFn,
  UpdateShoppingListMutationFn,
} from "../../generated/graphql";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";
import classNames from "classnames";
import { motion, PanHandlers, PanInfo, AnimatePresence } from "framer-motion";
import { gql } from "@apollo/client";
import Creator from "./Creator";
import ActiveUser from "./ActiveUser";
import { HandlerFunction } from "@storybook/addon-actions";
import AvatarWithPlaceholderInitials, {
  parseInitials,
  AVATAR_COLORS,
  CURRENT_USER_AVATAR_COLOR,
} from "../Avatar";
import { usePrevious } from "../../hooks/utils";

const DEFAULT_NEW_LIST_TITLE = "";

type ShoppingListProps = {
  shoppingList: ShoppingListDataFragment;
  onDelete?: DeleteShoppingListMutationFn | HandlerFunction;
  onUpdate: UpdateShoppingListMutationFn | HandlerFunction;
} & typeof shoppingListDefaultProps;
const shoppingListDefaultProps = {
  canDelete: true,
};

const fragment = gql`
  fragment ShoppingListData on shopping_lists {
    id
    updated_at
    created_at
    title
    creator {
      ...CreatorData
    }
    active_users {
      ...ActiveUserData
    }
  }
  ${ActiveUser.fragment}
  ${Creator.fragment}
`;

// Kindy hacky, but works for now. We want to be able to determine if a shopping
// list has just been created so we can start in editing mode.
const newList = (shoppingList: ShoppingListProps["shoppingList"]) =>
  differenceInSeconds(new Date(), new Date(shoppingList.created_at)) < 2 &&
  shoppingList.created_at === shoppingList.updated_at &&
  shoppingList.title === DEFAULT_NEW_LIST_TITLE;

const ShoppingList = ({
  shoppingList,
  canDelete,
  onDelete,
  onUpdate,
}: ShoppingListProps) => {
  const startInEditing = newList(shoppingList);
  const [showMenu, setShowMenu] = useState(startInEditing);
  const [isEditing, setIsEditing] = useState(startInEditing);
  const [editedTitle, setEditedTitle] = useState(
    startInEditing ? "" : shoppingList.title
  );
  const prevIsEditing = usePrevious(isEditing);
  const onSubmit = useCallback(
    (title: typeof editedTitle) => {
      if (onDelete && startInEditing && !title) {
        onDelete({
          variables: { id: shoppingList.id },
          optimisticResponse: {
            delete_shopping_lists_by_pk: { id: shoppingList.id },
          },
        });
      } else if (title && title !== shoppingList.title)
        onUpdate({
          variables: {
            id: shoppingList.id,
            set_input: { title: title },
          },
          optimisticResponse: {
            update_shopping_lists_by_pk: {
              ...shoppingList,
              title: title,
            },
          },
        });
    },
    [editedTitle, onDelete, startInEditing, shoppingList, onUpdate]
  );

  const onPanEnd: PanHandlers["onPanEnd"] = (_event, info) => {
    /**
     * Experimenting with distilling swipe offset and velocity into a single variable, so the
     * less distance a user has swiped, the more velocity they need to register as a swipe.
     * Should accomodate longer swipes and short flicks without having binary checks on
     * just distance thresholds and velocity > 0.
     * Source: https://www.framer.com/api/motion/examples/#viewport-scroll
     */
    const SWIPE_CONFIDENCE_THRESHOLD = 10000;
    const swipePower = (offset: number, velocity: number) => {
      return Math.abs(offset) * velocity;
    };
    const didSwipeLeft = (info: PanInfo) => {
      return (
        swipePower(info.offset.x, info.velocity.x) < -SWIPE_CONFIDENCE_THRESHOLD
      );
    };
    const didSwipeRight = (info: PanInfo) => {
      return (
        swipePower(info.offset.x, info.velocity.x) > SWIPE_CONFIDENCE_THRESHOLD
      );
    };

    if (didSwipeLeft(info)) {
      setShowMenu(true);
    } else if (didSwipeRight(info)) {
      setShowMenu(false);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (prevIsEditing && !isEditing) {
      console.log(newList);

      onSubmit(editedTitle);
      if (showMenu) {
        setShowMenu(false);
      }
    }
  }, [isEditing, onSubmit, showMenu, prevIsEditing, editedTitle]);

  return (
    <motion.article
      onPanEnd={onPanEnd}
      className="flex items-center justify-between w-full h-16 px-3 overflow-hidden bg-gray-300 rounded-lg dark:text-gray-900"
    >
      <div>
        {isEditing ? (
          <form
            onBlur={(e) => {
              e.preventDefault();
              setIsEditing(false);
            }}
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditing(false);
            }}
          >
            <input
              autoFocus
              type="text"
              className="w-full text-xl font-bold leading-none form-input"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </form>
        ) : (
          <motion.div layout="position">
            <h2 className="text-xl font-bold leading-none">
              {shoppingList.title}
            </h2>

            {!showMenu && (
              <motion.span
                animate={{ opacity: 1 }}
                className="text-sm font-light leading-none text-gray-600"
              >
                modified{" "}
                <time dateTime={shoppingList.updated_at}>
                  {formatDistanceToNow(new Date(shoppingList.updated_at), {
                    addSuffix: true,
                  })}
                </time>
              </motion.span>
            )}
          </motion.div>
        )}
      </div>
      <div className="flex items-center h-full">
        <AnimatePresence initial={false}>
          {showMenu ? (
            <>
              <motion.button
                transition={{
                  type: "spring",
                  stiffness: 3000,
                  damping: 200,
                }}
                key="chevron"
                layout
                onClick={() => setShowMenu((showMenu) => !showMenu)}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </motion.button>
              <motion.div
                key="menu"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  x: { type: "spring", stiffness: 3000, damping: 200 },
                }}
                className="flex items-center h-full -mr-3"
              >
                {isEditing ? (
                  <button
                    className="h-full"
                    onClick={() => setIsEditing(false)}
                  >
                    <div
                      className={classNames(
                        { "opacity-50 cursor-not-allowed": !editedTitle },
                        "flex items-center justify-center h-full px-2 font-semibold text-white bg-gray-600 w-18"
                      )}
                    >
                      Save
                    </div>
                  </button>
                ) : (
                  <button className="h-full" onClick={() => setIsEditing(true)}>
                    <div className="flex items-center justify-center h-full px-2 font-semibold text-white bg-gray-600 w-18">
                      Edit
                    </div>
                  </button>
                )}
                {canDelete && onDelete && (
                  <button
                    className="h-full"
                    onClick={() =>
                      onDelete({
                        variables: { id: shoppingList.id },
                        optimisticResponse: {
                          delete_shopping_lists_by_pk: { id: shoppingList.id },
                        },
                      })
                    }
                  >
                    <div className="flex items-center justify-center h-full px-2 font-semibold text-white bg-red-600 w-18">
                      Delete
                    </div>
                  </button>
                )}
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                key="avatars"
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 3000,
                  damping: 200,
                }}
                className="flex items-center -space-x-2"
              >
                {shoppingList.active_users.map((activeUser, i) => (
                  <AvatarWithPlaceholderInitials
                    key={activeUser.user.public_id}
                    initials={parseInitials(activeUser.user.name)}
                    className={classNames(
                      activeUser.user.public_id ===
                        shoppingList.creator.public_id
                        ? CURRENT_USER_AVATAR_COLOR
                        : AVATAR_COLORS[i % AVATAR_COLORS.length],
                      "text-lg text-white w-9 h-9 shadow-solid"
                    )}
                  />
                ))}
              </motion.div>
              <motion.button
                layout
                transition={{
                  type: "spring",
                  stiffness: 3000,
                  damping: 200,
                }}
                key="chevron"
                onClick={() => setShowMenu((showMenu) => !showMenu)}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};
ShoppingList.defaultProps = shoppingListDefaultProps;
ShoppingList.fragment = fragment;

export { DEFAULT_NEW_LIST_TITLE };
export default ShoppingList;
