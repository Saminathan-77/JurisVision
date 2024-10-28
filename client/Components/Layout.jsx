import React, { useEffect } from "react";

const Layout = ({ children }) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#64748b"; // slate-500
    return () => {
      document.body.style.backgroundColor = ""; // Reset on unmount
    };
  }, []);

  return <div>{children}</div>;
};

export default Layout;
