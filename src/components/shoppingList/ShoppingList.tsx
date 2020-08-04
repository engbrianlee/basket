import React, { useState, useEffect, useCallback } from "react";
import {
  ShoppingListDataFragment,
  UpdateShoppingListMutationVariables,
  DeleteShoppingListMutationFn,
  UpdateShoppingListMutationFn,
} from "../../generated/graphql";
import { formatDistanceToNow } from "date-fns";
import classNames from "classnames";
import { motion, PanHandlers, PanInfo, AnimatePresence } from "framer-motion";
import { gql } from "@apollo/client";
import Creator from "./Creator";
import ActiveUser from "./ActiveUser";
import { useForm, SubmitHandler } from "react-hook-form";
import { HandlerFunction } from "@storybook/addon-actions";
import AvatarWithPlaceholderInitials, {
  parseInitials,
  AVATAR_COLORS,
} from "../Avatar";
import { usePrevious } from "../../hooks/utils";

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

type FormData = Omit<UpdateShoppingListMutationVariables, "id">;

const ShoppingList = ({
  shoppingList,
  canDelete,
  onDelete,
  onUpdate,
}: ShoppingListProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const prevIsEditing = usePrevious(isEditing);
  const { register, handleSubmit, watch, reset } = useForm<FormData>({
    defaultValues: {
      set_input: {
        title: shoppingList.title,
      },
    },
  });
  const onSubmit: SubmitHandler<FormData> = useCallback(
    ({ set_input }) => {
      if (set_input.title && set_input.title !== shoppingList.title)
        onUpdate({
          variables: { id: shoppingList.id, set_input },
          optimisticResponse: {
            update_shopping_lists_by_pk: {
              ...shoppingList,
              title: set_input.title,
            },
          },
        });
    },
    [onUpdate, shoppingList]
  );
  const title = watch("set_input.title");

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

  // Reset form input when we get new props
  useEffect(() => {
    reset({
      set_input: {
        title: shoppingList.title,
      },
    });
  }, [reset, shoppingList]);

  useEffect(() => {
    if (prevIsEditing && !isEditing) {
      handleSubmit(onSubmit)();
      if (showMenu) {
        setShowMenu(false);
      }
    }
  }, [isEditing, handleSubmit, onSubmit, showMenu, prevIsEditing]);

  return (
    <motion.article
      onPanEnd={onPanEnd}
      className="flex items-center justify-between w-full h-16 px-3 overflow-hidden bg-gray-300 rounded-lg"
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
              name="set_input.title"
              type="text"
              className="w-full text-xl font-bold leading-none form-input"
              ref={register({
                required: true,
              })}
            />
          </form>
        ) : (
          <>
            <h2 className="text-xl font-bold leading-none">
              {shoppingList.title}
            </h2>
            <span className="text-sm font-light text-gray-600">
              modified{" "}
              <time dateTime={shoppingList.updated_at}>
                {formatDistanceToNow(new Date(shoppingList.updated_at), {
                  addSuffix: true,
                })}
              </time>
            </span>
          </>
        )}
      </div>
      <div className="flex items-center h-full">
        <AnimatePresence exitBeforeEnter>
          {showMenu ? (
            <>
              <motion.div
                transition={{
                  type: "spring",
                  stiffness: 3000,
                  damping: 200,
                }}
                key="chevron"
                layout
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
              </motion.div>
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
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
                        { "opacity-50 cursor-not-allowed": !title },
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
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: "tween", duration: 0.1 }}
                className="flex items-center -space-x-2"
              >
                {shoppingList.active_users.map((activeUser, i) => (
                  <AvatarWithPlaceholderInitials
                    key={activeUser.user.public_id}
                    initials={parseInitials(activeUser.user.name)}
                    className={classNames(
                      AVATAR_COLORS[i % AVATAR_COLORS.length],
                      "text-lg text-white w-9 h-9"
                    )}
                  />
                ))}
              </motion.div>

              <motion.div
                layout
                transition={{
                  type: "spring",
                  stiffness: 3000,
                  damping: 200,
                }}
                key="chevron"
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
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};
ShoppingList.defaultProps = shoppingListDefaultProps;
ShoppingList.fragment = fragment;

export default ShoppingList;
