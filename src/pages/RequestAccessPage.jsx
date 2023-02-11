import { Box } from "@mui/system";
import React from "react";
import { HomePageNavbar } from "../components/global/HomePageNavbar";
import RequestAccess from "../components/RequestAccess";

const RequestAccessPage = () => {

  return (
    <div className="app">
      <main
        className="content"
        style={{ maxHeight: "100vh", overflow: "auto" }}
      >
        <HomePageNavbar />
        <Box m="20px">
          <RequestAccess />
        </Box>
      </main>
    </div>
  );
};

export default RequestAccessPage;
