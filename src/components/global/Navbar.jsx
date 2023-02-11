import React, { useState } from "react";
import { Box, Grow, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import ManImage from "../../assets/img/man.png";
import WomanImage from "../../assets/img/woman.png";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
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

export const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [openSubMenu, setopenSubMenu] = useState(false);
  const navigate = useNavigate();
  const [log_out_user, setlog_out_user] = useState(false);
  const [log_out_toggle, setlog_out_toggle] = useState(true);

  React.useEffect(() => {
    if (log_out_user) {
      localStorage.setItem("token",null);
      localStorage.setItem("username",null);
    }
  }, [log_out_toggle]);

  const logOutUser = async () => {
    debugger;
    localStorage.setItem("token", null);
    localStorage.setItem("username", null);
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          sx={{ margin: "0px 20px" }}
        >
          <Avatar
            alt="Remy Sharp"
            src={ManImage}
            style={{ cursor: "pointer" }}
            onClick={() => {
              openSubMenu ? setopenSubMenu(false) : setopenSubMenu(true);
            }}
          />
          <Grow
            in={openSubMenu}
            style={{ transformOrigin: "0 0 0" }}
            {...(openSubMenu ? { timeout: 300 } : { timeout: 300 })}
          >
            <Box
              display={"flex"}
              flexDirection="column"
              sx={{
                position: "absolute",
                background: colors.primary[400],
                borderRadius: "5px",
                width: "13vw",
                padding: "10px 20px",
                top: "50px",
                zIndex: 3,
                right: "-21px",
                opacity: "0.9",
                borderTop: "2px solid #696cff",
                cursor: "pointer",
              }}
            >
              {/* Conditionally applies the timeout prop to change the entry speed. */}

              <Typography
                fontWeight="bold"
                sx={{
                  m: "5px 0px",
                  "&:hover": {
                    color: "#696cff",
                  },
                  display: "flex",
                }}
                color={colors.grey[100]}
                onClick={() => {
                  navigate("/dashboard/profile");
                  setopenSubMenu(false);
                }}
              >
                <PersonOutlineOutlinedIcon sx={{ margin: "0px 5px" }} />
                Profile
              </Typography>
              <Typography
                fontWeight="bold"
                sx={{
                  m: "5px 0px",
                  "&:hover": {
                    color: "#696cff",
                  },
                  display: "flex",
                }}
                color={colors.grey[100]}
              >
                <KeyOutlinedIcon sx={{ margin: "0px 5px" }} />
                Change Number
              </Typography>
              <Typography
                fontWeight="bold"
                sx={{
                  m: "5px 0px",
                  "&:hover": {
                    color: "#696cff",
                  },
                  display: "flex",
                }}
                color={colors.grey[100]}
                onClick={() => {
                  setlog_out_user(true);
                  setlog_out_toggle
                    ? setlog_out_toggle(false)
                    : setlog_out_toggle(true);
                }}
              >
                <ExitToAppOutlinedIcon sx={{ margin: "0px 5px" }} />
                Logout
              </Typography>
            </Box>
          </Grow>
        </StyledBadge>
      </Box>
    </Box>
  );
};
