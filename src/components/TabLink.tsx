import React from "react";
import { LinkProps, useRouteMatch, Link } from "react-router-dom";
import classNames from "classnames";

type TabLinkProps = {
  children: React.ReactNode;
  to: string;
  activeOnlyWhenExact?: boolean;
  className?: string;
  activeClassName?: string;
  inActiveClassName?: string;
} & LinkProps &
  typeof TabLinkDefaultProps;
const TabLinkDefaultProps = {
  activeOnlyWhenExact: false,
};
const TabLink = ({
  children,
  to,
  activeOnlyWhenExact,
  className,
  activeClassName,
  inActiveClassName,
  ...props
}: TabLinkProps) => {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <Link
      to={to}
      className={classNames(
        className,
        match ? activeClassName : inActiveClassName
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
TabLink.defaultProps = TabLinkDefaultProps;
export default TabLink;
