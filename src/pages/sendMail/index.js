import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftAlert from "components/SoftAlert";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import CoverLayout from "pages/sendMail/components/CoverLayout";


import typography from "assets/theme/base/typography";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

// Dashboard layout components
import Projects from "pages/mailView/components/Projects";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

function SendMail() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [start, setstart] = useState(false);
  const [new_bar, setnew_bar] = useState(false);
  const [multiple_send, setmultiple_send] = useState(true);
  const [submit_sign_in, setsubmit_sign_in] = useState(false);
  const [toggle_sign_in, settoggle_sign_in] = useState(false);
  const [error, seterror] = useState(false);
  const [errormessage, seterrormessage] = useState("");
  const [send_data, setsend_data] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if(submit_sign_in)
    {
        // sign_in(send_data).then((res) => {
        //   if (res.status === 200) {
        //     localStorage.setItem('token',res.data.jwt);
        //     navigate("/dashboard");
        //   }
        //   // 401 if the user already exist on the database
        //   else if (res?.status === 401) {
        //     seterror(true);
        //     seterrormessage("Unauthorized");
        //   }
        // })
        // .catch((err) => {
        //   console.error(err.message);
        //   seterror(true);
        //   seterrormessage("Internal Server Error");
        // });
    }
    
  }, [toggle_sign_in])

  const handleSubmitSignIn = (event) => {
    event.preventDefault();
    setsend_data([event.target[0].value,event.target[1].value]);
    setsubmit_sign_in(true);
    settoggle_sign_in(!toggle_sign_in);
  }

  const handleSetmultiple_send = () => setmultiple_send(!multiple_send)

  const handleNewBar = () => setnew_bar(!new_bar)


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's money" }}
                count="$53,000"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's users" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new clients" }}
                count="+3,462"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox p={3} display="flex" justifyContent="center" alignItems="flex-end" flexDirection="column">
        <SoftButton variant="gradient" color="dark" onClick={handleNewBar}>
          View&nbsp;
          <Icon sx={{ fontWeight: "bold" }}>search</Icon>
        </SoftButton>
        <br/>
        <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
      style={!new_bar ? {display:"none"}:{}}
    >
      <SoftBox component="form" role="form" onSubmit={handleSubmitSignIn}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" name="email"/>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" name="email"/>
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={multiple_send} onChange={handleSetmultiple_send} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetmultiple_send}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth type="submit">
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          {error && <SoftAlert color="dark">
            <Icon fontSize="small">error</Icon>&nbsp;
            {errormessage}</SoftAlert> }
        </SoftBox>
      </SoftBox>
    </CoverLayout>
        </SoftBox>
          <Grid item xs={12} md={6} lg={8}>
            { start && <Projects /> }
          </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SendMail;
