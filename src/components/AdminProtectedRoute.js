import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminProtectedRoute = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const _loggedIn = localStorage.getItem("loggedIn");

    if ((_loggedIn && _loggedIn === "false") || _loggedIn === undefined)
      navigate("/admin");
  });

  return <Outlet />;
};

export default AdminProtectedRoute;
