

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";

// @mui material components
import Icon from "@mui/material/Icon";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { sign_in } from "apis/Authentication";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [submit_sign_in, setsubmit_sign_in] = useState(false);
  const [toggle_sign_in, settoggle_sign_in] = useState(false);
  const [error, seterror] = useState(false);
  const [errormessage, seterrormessage] = useState("");
  const [send_data, setsend_data] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(submit_sign_in)
    {
        sign_in(send_data).then((res) => {
          if (res.status === 200) {
            localStorage.setItem('token',res.data.jwt);
            navigate("/dashboard");
          }
          // 401 if the user already exist on the database
          else if (res?.status === 401) {
            seterror(true);
            seterrormessage("Unauthorized");
          }
        })
        .catch((err) => {
          console.error(err.message);
          seterror(true);
          seterrormessage("Internal Server Error");
        });
    }
    
  }, [toggle_sign_in])
  

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmitSignIn = (event) => {
    event.preventDefault();
    setsend_data([event.target[0].value,event.target[1].value]);
    setsubmit_sign_in(true);
    settoggle_sign_in(!toggle_sign_in);
  }

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
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
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
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
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
          {error && <SoftAlert color="dark">
            <Icon fontSize="small">error</Icon>&nbsp;
            {errormessage}</SoftAlert> }
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
