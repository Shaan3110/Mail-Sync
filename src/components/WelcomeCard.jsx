import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import CelebrationImage from "../assets/img/celebration.png";
import { tokens } from "../theme";
import LaunchIcon from "@mui/icons-material/Launch";

const WelcomeCard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display={"flex"}
      width="100%"
      height="30vh"
      sx={{
        padding: "20px 20px",
        boxShadow: "0px 2px 6px 0px rgb(67 89 113 / 12%)",
        background: `${colors.primary[400]}`,
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        minWidth="35vw"
        alignItems={"flex-start"}
        justifyContent={"center"}
      >
        <Typography
          color={"#696cff"}
          fontWeight="bold"
          variant="h4"
          sx={{
            width: "100%",
          }}
        >
          Congratulations {localStorage.getItem("username").split(" ")[0]}! 🎉
        </Typography>
        <Typography
          color={colors.grey[100]}
          variant="h6"
          sx={{
            margin: "10px 0px",
          }}
        >
          Welcome to Molecule ,a platform for you to connect with your
          organisation seemlessly.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            fontWeight: "bolder",
            textTransform: "none",
            fontSize: "13px",
            marginTop: "10px",
          }}
          endIcon={<LaunchIcon />}
        >
          Share a feedback
        </Button>
      </Box>
      <img
        src={CelebrationImage}
        alt="Celebration Image"
        style={{
          width: "14vw",
          height: "24vh",
        }}
      />
    </Box>
  );
};

export default WelcomeCard;
