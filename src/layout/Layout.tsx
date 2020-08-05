import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="h-screen px-3 pt-4 bg-gray-100 dark:text-white dark:bg-gray-900">
      {children}
    </main>
  );
};
export default Layout;
