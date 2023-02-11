import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { tokens } from "../theme";
import WelcomeCard from "../components/WelcomeCard";
import StatisticsCard from "../components/StatisticsCard";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Sidebar from "../components/global/Sidebar";
import { Navbar } from "../components/global/Navbar";
import DoughNutChart from "../components/DoughNutChart";
import Footer from "../components/global/Footer";
import {
  get_admin_reqs,
  get_user_reqs,
} from "../apis/Request/Request";
import { view_all } from "../apis/View/View";

const CrmDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [get_data, setget_data] = useState(true);
  const [loading, setloading] = useState(true);
  const [users, setusers] = useState([]);
  const [admins, setadmins] = useState([]);
  const [users_req, setusers_req] = useState([]);
  const [admin_req, setadmin_req] = useState([]);

  useEffect(() => {
    setloading(true)
      get_admin_reqs().then((res) => {
        console.log(res.data);
        // 200 for success of the call
        if (res?.status === 200) {
          setadmin_req(res.data.data)
        }

        // 401 if the user already exist on the database
        else if (res?.status === 401) {
          setadmin_req(null)
        }

        // 500 if the user already made a request earlier
        else if (res?.status === 500) {
          if (
            res.data.errors[0].msg ===
            "Sorry something went wrong, token expired"
          ) {
            //refreshToken();
          }
        }
      });
      get_user_reqs().then((res) => {
        console.log(res.data);
        // 200 for success of the call
        if (res?.status === 200) {
          setusers_req(res.data.data)
        }

        // 401 if the user already exist on the database
        else if (res?.status === 401) {
          setusers_req(null)
        }

        // 500 if the user already made a request earlier
        else if (res?.status === 500) {
          if (
            res.data.errors[0].msg ===
            "Sorry something went wrong, token expired"
          ) {
            //refreshToken();
            setget_data(!get_data)
          }
          setusers_req(null)
        }
      });
      view_all("user").then((res) => {
        console.log(res.data);
        // 200 for success of the call
        if (res?.status === 200) {
          setusers(res.data.data)
        }

        // 401 if the user already exist on the database
        else if (res?.status === 401) {
          setusers_req(null)
        }

        // 500 if the user already made a request earlier
        else if (res?.status === 500) {
          if (
            res.data.errors[0].msg ===
            "Sorry something went wrong, token expired"
          ) {
            //refreshToken();
            setget_data(!get_data)
          }
          setusers_req(null)
        }
      });
      view_all("admin").then((res) => {
        console.log(res.data);
        // 200 for success of the call
        if (res?.status === 200) {
          setadmins(res.data.data)
        }

        // 401 if the user already exist on the database
        else if (res?.status === 401) {
          setusers_req(null)
        }

        // 500 if the user already made a request earlier
        else if (res?.status === 500) {
          if (
            res.data.errors[0].msg ===
            "Sorry something went wrong, token expired"
          ) {
            //refreshToken();
            setget_data(!get_data)
          }
          setusers_req(null)
        }
      });
      setloading(false);
  }, [get_data]);
  

  return (
    <div className="app">
      <Sidebar />
      <main
        className="content"
        style={{ maxHeight: "100vh", overflow: "auto" }}
      >
        <Navbar />
        {
            loading ?
            <p> Loading...</p>:
        <Box display={"flex"} width="100%" padding="0px 20px">
          <Box display={"flex"} flexDirection="column" width="50vw">
            {/* Welcome Card*/}
            <WelcomeCard />
            <Box
              display={"flex"}
              width="100%"
              height="30vh"
              sx={{
                boxShadow: "0px 2px 6px 0px rgb(67 89 113 / 12%)",
                background: `${colors.primary[400]}`,
                marginTop: "2vh",
                borderRadius: "5px",
                display: "flex",
                padding: "10px 10px",
                height: "45vh",
              }}
            >
              <DoughNutChart
                labels={["Red", "Blue", "Yellow", "Green"]}
                chart_data={[12, 19, 3, 5]}
              />
            </Box>
          </Box>
            <Box display={"flex"} flexDirection="column" width="100%">
            <Box display={"flex"} width="100%">
              <StatisticsCard
                icon={
                  <PersonAddAltOutlinedIcon
                    sx={{
                      color: "#fff",
                      backgroundColor: "#696cff",
                      padding: "10px 10px",
                      fontSize: "45px",
                      borderRadius: "5px",
                    }}
                  />
                }
                title={"User Requests"}
                value={users_req?.length}
                loadTime={Date.now()}
              />
              <StatisticsCard
                icon={
                  <PersonAddAltOutlinedIcon
                    sx={{
                      color: "#fff",
                      backgroundColor: "#696cff",
                      padding: "10px 10px",
                      fontSize: "45px",
                      borderRadius: "5px",
                    }}
                  />
                }
                title={"Admin Requests"}
                value={admin_req?.length}
                loadTime={Date.now()}
              />
            </Box>
            <Box display={"flex"} width="100%">
              <StatisticsCard
                icon={
                  <PersonAddAltOutlinedIcon
                    sx={{
                      color: "#fff",
                      backgroundColor: "#696cff",
                      padding: "10px 10px",
                      fontSize: "45px",
                      borderRadius: "5px",
                    }}
                  />
                }
                title={"Active Users"}
                value={users?.length}
                loadTime={Date.now()}
              />
              <StatisticsCard
                icon={
                  <PersonAddAltOutlinedIcon
                    sx={{
                      color: "#fff",
                      backgroundColor: "#696cff",
                      padding: "10px 10px",
                      fontSize: "45px",
                      borderRadius: "5px",
                    }}
                  />
                }
                title={"Active Admins"}
                value={admins?.length}
                loadTime={Date.now()}
              />
            </Box>
            <Box
              display={"flex"}
              width="95%"
              backgroundColor={colors.primary[400]}
              flexDirection="column"
              sx={{
                margin: "10px 10px",
                padding: "20px 20px",
                borderRadius: "5px",
              }}
            >
              <Box display={"flex"} alignItems="center">
                <Typography
                  color={"#696cff"}
                  fontWeight="bolder"
                  fontSize={"20px"}
                >
                  Active Scrum
                </Typography>
                {5 > 0 ? (
                  <div
                    style={{
                      border:"0px",
                      width: "7px",
                      height: "7px",
                      borderRadius: "30px",
                      backgroundColor: "#696cff",
                      margin: "0px 15px",
                      animation: "ripple 1.3s infinite ease-in-out",
                      "@keyframes ripple": {
                        "0%": {
                          transform: "scale(.6)",
                          opacity: 1,
                        },
                        "100%": {
                          transform: "scale(1)",
                          opacity: 0,
                        },
                      },
                    }}
                  ></div>
                ) : null}
              </Box>
              <Typography
                  color={colors.grey[100]}
                  fontSize={"15px"}
                >
                  Coming soon
                </Typography>
            </Box>
          </Box>
        </Box>
        }
        <Footer />
      </main>
    </div>
  );
};

export default CrmDashboard;
