import React from "react";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
