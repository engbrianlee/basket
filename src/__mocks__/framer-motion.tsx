// __mocks__/framer-motion.tsx
import React from "react";

export const AnimatePresence = ({ children }: { children: JSX.Element }) =>
  children;

export const motion = {
  div: ({ children, ...rest }: { children: JSX.Element }) => (
    <div {...rest}>{children}</div>
  ),
  span: ({ children, ...rest }: { children: JSX.Element }) => (
    <span {...rest}>{children}</span>
  ),
  article: ({ children, ...rest }: { children: JSX.Element }) => (
    <article {...rest}>{children}</article>
  ),
  img: (props: any) => <img {...props} />,
};
