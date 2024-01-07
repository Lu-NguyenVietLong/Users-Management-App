import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import TableUsers from "../components/TableUsers";
import Login from "../components/Login";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "./NotFound";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoutes>
              <TableUsers />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
