import { Box } from "@mui/system";
import React from "react";
import Faq from "../components/Faq";
import { Navbar } from "../components/global/Navbar";
import Sidebar from "../components/global/Sidebar";

const FaqPage = () => {

  return (
    <div className="app">
      <Sidebar />
      <main
        className="content"
        style={{ maxHeight: "100vh", overflow: "auto" }}
      >
        <Navbar />
        <Box m="20px">
          <Faq />
        </Box>
      </main>
    </div>
  );
};

export default FaqPage;
