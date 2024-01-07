import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/userContext";

type RouteType = {
  children: React.ReactNode;
};

const PrivateRoutes = (props: RouteType) => {
  const context = useContext(UserContext);

  if (context.user && !context.user.auth) {
    return (
      <div className="text-3xl text-[#d32a2add]">
        You don't have permission to access this page
      </div>
    );
  }

  return <>{props.children}</>;
};

export default PrivateRoutes;
