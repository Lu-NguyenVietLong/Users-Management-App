import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import ModalAddNew from "./components/ModalAddNew";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { UserContext } from "./context/userContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const context = useContext(UserContext);
  console.log(context);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedToken = localStorage.getItem("token");

    if (storedToken && storedEmail) {
      context.login(storedEmail, storedToken);
    }
  }, []);

  return (
    <>
      <div className="App">
        <Container>
          <Header />
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
