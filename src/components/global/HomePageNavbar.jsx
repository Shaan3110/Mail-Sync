import React, { useState } from "react";
import { Box, Button, Grow, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const HomePageNavbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="space-between" sx={{
        padding:"10px 60px"
    }}>
      {/* ICONS */}
      <span style={{
                  fontFamily: "'Brush Script MT', cursive",
                  color:"#696cff",
                  fontSize:"40px",
                  fontWeight:"bolder"
                }}> Molecule</span>

      <Box display="flex" height="fit-content" justifyContent={"center"}>
        <IconButton onClick={colorMode.toggleColorMode} sx={{
            marginRight:"30px"
        }}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <Button
          variant="contained"
          size="large"
          sx={{
            fontWeight: "bolder",
            textTransform: "none",
            fontSize: "13px",
          }}
          endIcon={<LaunchIcon/>}
          onClick={()=>{
            navigate("/beta/tester")
          }}
        >
            Beta Tester
        </Button>
      </Box>
    </Box>
  );
};
