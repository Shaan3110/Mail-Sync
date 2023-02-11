import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import RegisterPageImage from "../assets/img/RegisterPageImage.png";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  Grow,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LaunchIcon from "@mui/icons-material/Launch";
import { countrycodes } from "../assets/data/countrycodes";
import {
  get_dropdown,
  send_req,
  send_admin_req,
} from "../apis/Request/Request";
import { useNavigate } from "react-router-dom";

const RequestAccess = () => {
  const [getDropdown, setgetDropdown] = useState(true);
  const [error, seterror] = useState(false);
  const [errormessage, seterrormessage] = useState("");
  const [already_account, setalready_account] = useState(false);
  const [already_request, setalready_request] = useState(false);
  const [success, setsuccess] = useState(false);
  const [send_request, setsend_request] = useState(false);
  const [submit_request, setsubmit_request] = useState(false);
  const [dropdownOptions, setdropdownOptions] = useState([]);
  const [department, setdepartment] = useState("");
  const [type, settype] = useState("User");
  const [formvalues, setformvalues] = useState({});
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (getDropdown) {
      get_department_dropdown();
    }
    setgetDropdown(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDropdown]);

  useEffect(() => {
    if (send_request) {
      let data = {
        name: formvalues.user_name,
        phone: formvalues.code + formvalues.phone,
      };
      if (type === "Admin") {
        send_admin_request_details(data);
      } else {
        data.department = department.toLowerCase();
        send_user_request_details(data);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit_request]);

  const send_admin_request_details = async (data) => {
    send_admin_req(data).then((res) => {
      // 200 for success of the call
      if (res?.status === 200) {
        setsuccess(true);
      }

      // 401 if the user already exist on the database
      else if (res?.status === 401) {
        setalready_account(true);
      }

      // 500 if the user already made a request earlier
      else if (res?.status === 500) {
        setalready_request(true);
      }
      setloading(false);
    });
  };
  const send_user_request_details = async (data) => {
    send_req(data).then((res) => {
      // 200 for success of the call
      if (res?.status === 200) {
        setsuccess(true);
      }

      // 401 if the user already exist on the database
      else if (res?.status === 401) {
        setalready_account(true);
      }
      // 500 if the user already made a request earlier
      else if (res?.status === 500) {
        setalready_request(true);
      }
      setloading(false);
    });
  };

  const login = () => {
    navigate("/auth/login");
  };

  const handleSubmit = (values) => {
    debugger;
    setloading(true);
    setformvalues(values);
    request_access_submit();
  };

  const get_department_dropdown = async () => {
    const response = await get_dropdown();
    console.log(response);
    setdropdownOptions(response.data.data);
  };

  const request_access_submit = async () => {
    seterror(false);
    setsuccess(false);
    setsend_request(true);
    setalready_account(false);
    setalready_request(false);
    submit_request ? setsubmit_request(false) : setsubmit_request(true);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const phoneRegExp = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;

  const checkoutSchema = yup.object().shape({
    code: yup.string().required("required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    user_name: yup.string().required("required"),
  });
  const initialValues = {
    code: "+91",
    phone: "",
    user_name: "",
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
        src={RegisterPageImage}
        alt=""
        style={{
          width: "35vw",
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
              {success ? (
                <Alert
                  severity="success"
                  sx={{
                    marginBottom: "5vh",
                  }}
                >
                  <AlertTitle
                    sx={{
                      fontWeight: "bolder",
                    }}
                  >
                    Success
                  </AlertTitle>
                  Hurray! You request have been made successfully <strong>Please wait till it's approved by your lead</strong>
                </Alert>
              ) : null}
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
              {already_account ? (
                <Alert
                  severity="info"
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
                  You already have a active account with us <strong>Login Now!</strong>
                </Alert>
              ) : null}
              {already_request ? (
                <Alert
                  severity="info"
                  sx={{
                    marginBottom: "5vh",
                  }}
                >
                  <AlertTitle
                    sx={{
                      fontWeight: "bolder",
                    }}
                  >
                    Note
                  </AlertTitle>
                  You already have made a request for access <strong>Please wait till it's approved</strong>
                </Alert>
              ) : null}
              <Typography
                variant="h3"
                style={{ fontWeight: "bolder", marginBottom: "20px" }}
              >
                Let's start the Adventure 🚀
              </Typography>
              <Typography
                variant="h5"
                style={{ fontWeight: "bolder", marginBottom: "20px" }}
              >
                Please request access to admin or lead, to start the adventure
              </Typography>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                }}
              >
                <Autocomplete
                  options={["User", "Admin"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Type" name="type" />
                  )}
                  value={type}
                  sx={{ gridColumn: "span 4" }}
                  onInputChange={(event, value) => settype(value)}
                />
                <Stack
                  spacing={1}
                  sx={{ maxWidth: "46vw", width: 750 }}
                  direction="row"
                >
                  <Autocomplete
                    options={countrycodes().map((option) => option.dial_code)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Code"
                        name="code"
                        error={!!touched.code && !!errors.code}
                        helperText={touched.code && errors.code}
                      />
                    )}
                    value={values.code}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    name="phone"
                    error={!!touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                    sx={{ width: "span 2" }}
                  />
                </Stack>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.user_name}
                  name="user_name"
                  error={!!touched.user_name && !!errors.user_name}
                  helperText={touched.user_name && errors.user_name}
                  sx={{ gridColumn: "span 4" }}
                />
                {type === "User" ? (
                  <Grow
                    in={type}
                    style={{ transformOrigin: "0 0 0" }}
                    {...(type ? { timeout: 1000 } : { timeout: 1000 })}
                  >
                    <Autocomplete
                      options={dropdownOptions.map(
                        (option) =>
                          option.name.charAt(0).toUpperCase() +
                          option.name.slice(1)
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Your Department" />
                      )}
                      onInputChange={(event, value) => setdepartment(value)}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Grow>
                ) : null}
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
                    width: "170px",
                  }}
                  size="large"
                >
                  Send Request
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
                  Already part of us ?
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
                  onClick={login}
                >
                  Login
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

export default RequestAccess;
