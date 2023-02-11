import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginPageImage from "../assets/img/LoginPageImage.png";
import {
  Alert,
  AlertTitle,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";
import { sign_in } from "../apis/Authenticate";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [error, seterror] = useState(false);
  const [errormessage, seterrormessage] = useState("");
  const [submit_login, setsubmit_login] = useState(false);
  const [login_toggle, setlogin_toggle] = useState(false);
  const [loading, setloading] = useState(false);
  const [send_data, setsend_data] = useState({});
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  const send_login_details = async () => {
    seterror(false);
    try {
      let response = await sign_in(send_data.email, send_data.password);
      console.log(response);
      if (response.data.status === "Success") {
        localStorage.setItem("token", response.data.jwt);
        navigate("/dashboard");
      } else if (response.data.message === "Invalid username or password!") {
        seterror(true);
        seterrormessage(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      seterror(true);
      seterrormessage("Internal Server Error");
    }
  };

  useEffect(() => {
    if (submit_login) {
      send_login_details();
    }
  }, [login_toggle]);

  const handleSubmit = (values) => {
    setsend_data(values);
    setsubmit_login(true);
    setlogin_toggle(!login_toggle);
    console.log(values);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const checkoutSchema = yup.object().shape({
    email: yup.string().required("required"),
    password: yup.string().required("required"),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent={"space-evenly"}
      sx={{
        padding: "5px 40px",
      }}
    >
      <img
        src={LoginPageImage}
        alt=""
        style={{
          width: "40vw",
          height: "80vh",
        }}
      />
      <Box
        width={"100%"}
        maxWidth="50vw"
        sx={{
          padding: "10px 30px",
        }}
      >
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              {error ? (
                <Alert
                  severity="error"
                  sx={{
                    marginBottom: "5vh",
                  }}
                >
                  <AlertTitle
                    sx={{
                      fontWeight: "bolder",
                    }}
                  >
                    Error
                  </AlertTitle>
                  This is an error alert — <strong>{errormessage}</strong>
                </Alert>
              ) : null}
              <Typography
                variant="h3"
                style={{ fontWeight: "bolder", marginBottom: "20px" }}
              >
                Welcome to Mail Sync 👋
              </Typography>
              <Typography
                variant="h5"
                style={{ fontWeight: "bolder", marginBottom: "20px" }}
              >
                Please sign-in to your account and let us help you !
              </Typography>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                }}
              >
                <Stack
                  spacing={1}
                  sx={{ maxWidth: "46vw", width: 750 }}
                  direction="row"
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="email"
                    label="Email id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ width: "span 2" }}
                  />
                </Stack>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                  endIcon={showPassword ? <VisibilityOff/> : <Visibility/>}
                />
                <FormControlLabel control={<Checkbox />} label="Show Password" onChange={() => setshowPassword(!showPassword)} value={showPassword}/>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <LoadingButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  loading={loading}
                  loadingPosition="end"
                  sx={{
                    fontWeight: "bolder",
                    textTransform: "none !important",
                    marginBottom: "5px",
                    width: "143px",
                  }}
                  size="large"
                >
                  Login
                </LoadingButton>
              </Box>
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
                margin={"5vh 0vh"}
              >
                <Typography
                  variant="h5"
                  sx={{
                    padding: "0px 5px",
                  }}
                >
                  Don't have credentials ?
                </Typography>
                <Typography
                  fontWeight="bolder"
                  variant="h5"
                  color={"#696cff"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Ask your admin
                  <LaunchIcon
                    sx={{
                      margin: "0px 5px",
                    }}
                  />
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
