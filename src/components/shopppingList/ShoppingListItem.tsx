import React, { useState, useEffect, useCallback, useRef } from "react";

import { formatDistanceToNow, differenceInSeconds } from "date-fns";
import classNames from "classnames";
import { motion, PanHandlers, PanInfo, AnimatePresence } from "framer-motion";
import { gql } from "@apollo/client";

import { HandlerFunction } from "@storybook/addon-actions";
import { usePrevious } from "../../hooks/utils";
import {
  ShoppingListItemDataFragment,
  DeleteShoppingListItemMutationFn,
  UpdateShoppingListItemMutationFn,
} from "../../generated/graphql";
import _ from "lodash";

const DEFAULT_NEW_LIST_ITEM_TITLE = "";

type ShoppingListItemProps = {
  shoppingListItem: ShoppingListItemDataFragment;
  onDelete: DeleteShoppingListItemMutationFn | HandlerFunction;
  onUpdate: UpdateShoppingListItemMutationFn | HandlerFunction;
};

const fragment = gql`
  fragment ShoppingListItemData on shopping_list_items {
    id
    created_at
    created_by_user {
      name
      public_id
    }
    is_completed
    title
    updated_at
    updated_by_user {
      name
      public_id
    }
  }
`;

// Kindy hacky, but works for now. We want to be able to determine if a shopping
// listitem has just been created so we can start in editing mode.
const newListItem = (
  shoppingListItem: ShoppingListItemProps["shoppingListItem"]
) =>
  differenceInSeconds(new Date(), new Date(shoppingListItem.created_at)) < 2 &&
  shoppingListItem.created_at === shoppingListItem.updated_at &&
  shoppingListItem.title === DEFAULT_NEW_LIST_ITEM_TITLE;

const ShoppingListItem = ({
  shoppingListItem,
  onDelete,
  onUpdate,
}: ShoppingListItemProps) => {
  const startInEditing = newListItem(shoppingListItem);
  const [showMenu, setShowMenu] = useState(startInEditing);
  const [showChat, setShowChat] = useState(false);
  const [isEditing, setIsEditing] = useState(startInEditing);
  const [editedTitle, setEditedTitle] = useState(
    startInEditing ? "" : shoppingListItem.title
  );
  const prevIsEditing = usePrevious(isEditing);

  // Use three boolean to determine if person is clicking and not panning
  const isMouseDown = useRef(false);
  const isPanning = useRef(false);
  const prevIsPanning = useRef(false);
  const setIsPanning = (value: typeof isPanning.current) => {
    prevIsPanning.current = isPanning.current;
    isPanning.current = value;
  };
  const didClick = () =>
    isMouseDown.current && !isPanning.current && !prevIsPanning.current;
  const onSubmit = useCallback(
    (set_input: {
      title?: typeof editedTitle;
      is_completed?: typeof shoppingListItem.is_completed;
    }) => {
      if (onDelete && startInEditing && !set_input.title) {
        onDelete({
          variables: { id: shoppingListItem.id },
          optimisticResponse: {
            delete_shopping_list_items_by_pk: { id: shoppingListItem.id },
          },
        });
      } else if (
        !_.isEmpty(set_input) &&
        !_.isMatch(shoppingListItem, set_input)
      )
        console.log({
          optimisticResponse: {
            update_shopping_list_items_by_pk: {
              ...shoppingListItem,
              ...set_input,
            },
          },
        });
      console.log({
        variables: {
          id: shoppingListItem.id,
          set_input,
        },
      });
      onUpdate({
        variables: {
          id: shoppingListItem.id,
          set_input,
        },
        optimisticResponse: {
          update_shopping_list_items_by_pk: {
            ...shoppingListItem,
            ...set_input,
          },
        },
      });
    },
    [editedTitle, onDelete, startInEditing, shoppingListItem, onUpdate]
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
      console.log(newListItem);

      onSubmit({ title: editedTitle });
      if (showMenu) {
        setShowMenu(false);
      }
    }
  }, [isEditing, showMenu, prevIsEditing, editedTitle, onSubmit]);

  return (
    <motion.article
      onPanStart={() => setIsPanning(true)}
      onPanEnd={onPanEnd}
      onMouseUp={() => {
        if (didClick()) {
          setShowChat(true);
        }
        setIsPanning(false);
        isMouseDown.current = false;
      }}
      onMouseDown={() => (isMouseDown.current = true)}
      className="flex items-center justify-between w-full h-16 px-3 overflow-hidden bg-gray-300 rounded-lg dark:text-gray-900"
    >
      <div className="w-full">
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
          <div className="flex items-center h-full space-x-4">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={shoppingListItem.is_completed}
              onChange={(e) => {
                const is_completed = e.target.checked;
                onSubmit({ is_completed });
              }}
            />

            <motion.div
              layout="position"
              onDoubleClick={() => setIsEditing(true)}
            >
              <h2 className="text-xl font-bold leading-none">
                {shoppingListItem.title}
              </h2>

              {!showMenu && (
                <motion.span
                  animate={{ opacity: 1 }}
                  className="text-sm font-light leading-none text-gray-600"
                >
                  modified{" "}
                  <time dateTime={shoppingListItem.updated_at}>
                    {formatDistanceToNow(
                      new Date(shoppingListItem.updated_at),
                      {
                        addSuffix: true,
                      }
                    )}
                  </time>
                </motion.span>
              )}
            </motion.div>
            <button
              className="flex-grow w-0 h-16"
              onClick={() => setShowChat(true)}
            />
          </div>
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
                {
                  <button
                    className="h-full"
                    onClick={() =>
                      onDelete({
                        variables: { id: shoppingListItem.id },
                        optimisticResponse: {
                          delete_shopping_list_items_by_pk: {
                            id: shoppingListItem.id,
                          },
                        },
                      })
                    }
                  >
                    <div className="flex items-center justify-center h-full px-2 font-semibold text-white bg-red-600 w-18">
                      Delete
                    </div>
                  </button>
                }
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
                chats
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
ShoppingListItem.fragment = fragment;

export { DEFAULT_NEW_LIST_ITEM_TITLE };
export default ShoppingListItem;
