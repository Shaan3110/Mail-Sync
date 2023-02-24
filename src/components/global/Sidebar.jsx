import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import RuleIcon from "@mui/icons-material/Rule";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Sidebar = () => {
  const [isCollapsed, setisCollapsed] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const MenuItem = ({ show_title,title, to, icon }) => {
    return (
      <Tooltip title={show_title} TransitionComponent={Zoom} placement="right" arrow>
        <div
          id={to === window.location.pathname ? "nav-active" : ""}
          onClick={() => {
            navigate(to);
          }}
          style={{
            display: "flex",
            width: "fit-content",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            minWidth: isCollapsed ? "15vw" : "5vw",
            alignItems: "center",
            minHeight: "7vh",
            borderRadius: "5px",
            justifyContent: isCollapsed ? "" : "center",
            color: colors.grey[100],
            margin: "10px 0px",
            padding: isCollapsed ? "0px 20px" : "0px",
            cursor: "pointer",
          }}
        >
          {icon}
          {isCollapsed ? (
            <Typography
              fontWeight={"bolder"}
              sx={{
                marginLeft: "10px",
              }}
            >
              {show_title}
            </Typography>
          ) : null}
        </div>
      </Tooltip>
    );
  };

  const SubItem = ({ show_title,title, icon, items }) => {
    return (
      <Accordion
        sx={{
          background: `${colors.primary[400]}`,
          width: isCollapsed ? "100%" : "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: isCollapsed ? "flex-start" : "",
          width: isCollapsed ? "17vw" : "5vw",
          boxShadow:"none"
        }}
      >
        <AccordionSummary
          style={{
            color: colors.grey[100],
            padding: isCollapsed ? "0px 35px" : "0px 10px",
            display: "flex",
            justifyContent: isCollapsed ? "space-evenly" : "center",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {icon}
          {isCollapsed ? (
            <Typography
              fontWeight={"bolder"}
              sx={{
                marginLeft: isCollapsed ? "10px" : "0px",
              }}
            >
              {show_title}
            </Typography>
          ) : null}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: isCollapsed ? null : "0px",
          }}
        >
          {items.map((ele) => {
            return (
              <MenuItem
                show_title={ele.show_title}
                title={ele.title}
                to={ele.to}
                icon={ele.icon}
                key={ele.title}
              />
            );
          })}
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box
      height="100vh"
      sx={{
        overflowY: "auto",
        background: `${colors.primary[400]}`,
        padding: isCollapsed ? "10px 10px" : "10px 0px",
        width: isCollapsed ? "20vw" : "9vw",
        transition: "width 0.4s ease-in-out !important",
      }}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box
        width={"100%"}
        display="flex"
        justifyContent={"space-between"}
        sx={{
          padding: "10px 10px",
        }}
      >
        <Typography
          style={{
            fontFamily: "'Roboto Slab', serif",
            backgroundColor: "#696cff",
            color: "#fff",
            fontSize: "30px",
            fontWeight: "bolder",
            padding: "5px 20px",
            borderRadius: "5px",
            textAlign: "center",
            marginLeft: "17px",
          }}
        >
          M
        </Typography>
        <IconButton
          onClick={() => setisCollapsed(!isCollapsed)}
          sx={{
            position: "absolute",
            left: isCollapsed ? "15vw" : "7vw",
          }}
        >
          {isCollapsed ? (
            <ArrowBackIosNewIcon
              style={{
                backgroundColor: "#696cff",
                color: "#ffffff",
                padding: "8px 8px",
                fontSize: "33px",
                fontWeight: "bolder",
                borderRadius: "50px",
              }}
            />
          ) : (
            <ArrowForwardIosIcon
              style={{
                backgroundColor: "#696cff",
                color: "#ffffff",
                padding: "8px 8px",
                fontSize: "33px",
                fontWeight: "bolder",
                borderRadius: "50px",
              }}
            />
          )}
        </IconButton>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        sx={{
          padding: "10px 0px",
        }}
      >
        <MenuItem
          show_title={"Dashboard"}
          title="Dashboard"
          to="/dashboard"
          icon={<DashboardOutlinedIcon />}
        />
        {/* <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{
            textAlign: isCollapsed ? "flex-start" : "center",
            width: "90%",
          }}
        >
          Manage
        </Typography>
        <MenuItem
          show_title={"Tickets"}
          title="Tickets"
          to="/dashboard/tickets"
          icon={<AssignmentTurnedInIcon />}
        />
        <SubItem
          show_title={"Requests"}
          title="Requests"
          icon={<RuleIcon />}
          items={[
            {
              show_title:"User Requests",
              title: "UserRequests",
              to: "/contacts",
              icon: <PersonAddAltOutlinedIcon />,
            },
            {
              show_title:"Admin Requests",
              title: "AdminRequests",
              to: "/contacts",
              icon: <GroupAddOutlinedIcon />,
            },
          ]}
        /> */}

        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{
            textAlign: isCollapsed ? "flex-start" : "center",
            width: "90%",
          }}
        >
          Tools
        </Typography>
        <MenuItem
          show_title="Generate Mail"
          title="GenerateMail"
          to="/dashboard/generate"
          icon={<AccountTreeOutlinedIcon />}
        />
        <MenuItem
          show_title="View Mail"
          title="ViewMail"
          to="/dashboard/view/mails"
          icon={<AccountTreeOutlinedIcon />}
        />
        <MenuItem
          show_title={"Group Management"}
          title="GroupManagement"
          to="/dashboard/group"
          icon={<CalendarTodayOutlinedIcon />}
        />
        {/* 
        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{
            textAlign: isCollapsed ? "flex-start" : "center",
            width: "90%",
          }}
        >
          Misc
        </Typography>
        <MenuItem
          show_title={"Faq"}
          title="Faq"
          to="/dashboard/faq"
          icon={<HelpOutlineOutlinedIcon />}
        />
        <MenuItem
          show_title={"Pie Chart"}
          title="PieChart"
          to="/pie"
          icon={<PieChartOutlineOutlinedIcon />}
        />
        <MenuItem
          show_title={"Line Chart"}
          title="LineChart"
          to="/line"
          icon={<TimelineOutlinedIcon />}
        /> */}
      </Box>
    </Box>
  );
};

export default Sidebar;
