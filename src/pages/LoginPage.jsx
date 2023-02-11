import { Box } from "@mui/system";
import React from "react";
import { HomePageNavbar } from "../components/global/HomePageNavbar";
import Login from "../components/Login";

const LoginPage = () => {

  return (
    <div className="app">
      <main
        className="content"
        style={{ maxHeight: "100vh", overflow: "auto" }}
      >
        <HomePageNavbar />
        <Box m="20px">
          <Login />
        </Box>
      </main>
    </div>
  );
};

export default LoginPage;
