import React from "react";
import useAuth from "../hooks/useAuth";
import NotFoundPage from "../pages/NotFoundPage";

function RoleAuth({ requiredRoles, children }) {
  const { user } = useAuth();

  if (requiredRoles.includes(user.role.name)) {
    return children;
  } else {
    return <NotFoundPage />;
  }
}

export default RoleAuth;
