import { Box } from "@mui/system";
import React from "react";
import BetaTester from "../components/BetaTester";
import { HomePageNavbar } from "../components/global/HomePageNavbar";

const BetaTesterPage = () => {

  return (
    <div className="app">
      <main
        className="content"
        style={{ maxHeight: "100vh", overflow: "auto" }}
      >
        <HomePageNavbar />
        <Box m="20px">
          <BetaTester />
        </Box>
      </main>
    </div>
  );
};

export default BetaTesterPage;
