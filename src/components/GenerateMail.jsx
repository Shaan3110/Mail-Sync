import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";
import { sign_in, verify_token } from "../apis/Authenticate";
import moment from "moment";
import { send_mail } from "../apis/Mail";
import { convertToHTML } from 'draft-convert';
import { get_all_groups } from "../apis/Group";

const GenerateMail = () => {
  const [error, seterror] = useState(false);
  const [errormessage, seterrormessage] = useState("");
  const [submit_generate, setsubmit_generate] = useState(false);
  const [toggle_generate, settoggle_generate] = useState(false);
  const [loading, setloading] = useState(false);
  const [send_data, setsend_data] = useState({});
  const [toggle_group, settoggle_group] = useState(false);
  const [groupGenerate, setgroupGenerate] = useState(false);
  const [group, setGroup] = useState([]);
  const [group_options, setgroup_options] = useState([]);
  const [groupLoading, setgroupLoading] = useState(false);
  const [preview, setpreview] = useState(false);
  const [date, setdate] = useState("2017-05-24T10:30");
  const navigate = useNavigate();

  const handleGroupGenerate = () => setgroupGenerate(!groupGenerate);
  const handleDateChange = (event) => setdate(event.target.value);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const send_generate_mail = async () => {
    console.log(send_data);
    seterror(false);
    try {
      let response = await send_mail(
        send_data.recipient,
        send_data.sender,
        send_data.subject,
        send_data.group,
        send_data.body,
        send_data.date
      );
      console.log(response);
      if (response.data.status === "Success") {
        // localStorage.setItem("token", response.data.jwt);
        // navigate("/dashboard");
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

  React.useEffect(() => {
    // get all groups
    get_all_groups()
      .then((res) => {
        if (res.data.status === "Success") {
          setgroup_options(res.data.groups);
        } else if (res.data.status === "Fail") {
          seterror(true);
          seterrormessage(res.data.message);
        }
      })
      .catch((err) => {
        seterror(true);
        seterrormessage("Internal Server Error");
      });
  }, [toggle_group]);

  useEffect(() => {
    // verify token each time
    verify_token()
      .then((res) => {
        if (res.data.status === "Fail") {
          navigate("/auth/login");
        }
      })
      .catch((err) => {
        navigate("/auth/login");
      });

    // submit generate mail request
    if (submit_generate) {
      send_generate_mail();
    }
  }, [toggle_generate]);

  const handleSubmit = (values) => {
    console.log(group);
    setsend_data({
      recipient: values.recipient,
      sender: values.sender,
      subject: values.subject,
      group: group,
      body: convertToHTML(editorState.getCurrentContent()),
      date: date,
    });
    setsubmit_generate(true);
    settoggle_generate(!toggle_generate);
    // console.log(values);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const checkoutSchema = yup.object().shape({
    recipient: yup.string().required("required"),
    sender: yup.string(),
    subject: yup.string().required("required"),
  });
  const initialValues = {
    recipient: "",
    sender: "",
    subject: "",
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
      <Box
        width={"100%"}
        maxWidth="80vw"
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
                Generate Mail 👋
              </Typography>
              <Typography
                variant="h5"
                style={{ fontWeight: "bolder", marginBottom: "20px" }}
              >
                Please use it carefully before generating group mail !
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
                  sx={{ gridColumn: "span 4" }}
                  direction="row"
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="email"
                    label="Recipient"
                    disabled={preview}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.recipient}
                    name="recipient"
                    error={!!touched.recipient && !!errors.recipient}
                    helperText={touched.recipient && errors.recipient}
                    sx={{ width: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="sender"
                    label="Sender"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.sender}
                    disabled={preview}
                    name="sender"
                    error={!!touched.sender && !!errors.sender}
                    helperText={touched.sender && errors.sender}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Stack>
                {groupGenerate && (
                  <Autocomplete
                    value={group}
                    onChange={(event, newValue) => {
                      setGroup(newValue);
                    }}
                    multiple
                    id="tags-filled"
                    options={group_options.map((option)=> option.identifier)}
                    freeSolo
                    sx={{ gridColumn: "span 4" }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Users"
                        placeholder="Search"
                      />
                    )}
                  />
                )}
                <TextField
                  fullWidth
                  variant="outlined"
                  type="subject"
                  placeholder="Subject"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.subject}
                  name="subject"
                  disabled={preview}
                  error={!!touched.subject && !!errors.subject}
                  helperText={touched.subject && errors.subject}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  id="datetime-local"
                  label="Scheduled Date"
                  type="datetime-local"
                  sx={{ gridColumn: "span 4" }}
                  onChange={handleDateChange}
                  value={date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Stack
                  spacing={1}
                  sx={{ gridColumn: "span 4",height:"50vh" }}
                  direction="row"
                >
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    wrapperClassName="wrapper-light-class"
                    editorClassName="editor-light-class"
                    toolbarClassName="toolbar-light-class"
                    
                  />
                </Stack>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Generate for group"
                  onChange={handleGroupGenerate}
                  value={groupGenerate}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <ButtonGroup
                  sx={{
                    width: "fit-content",
                  }}
                >
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
                    Generate Mail
                  </LoadingButton>
                  <Button
                    color="primary"
                    variant="text"
                    sx={{
                      fontWeight: "bolder",
                      textTransform: "none !important",
                      marginBottom: "5px",
                      marginLeft: "10px",
                      width: "143px",
                    }}
                    size="large"
                    onClick={() => setpreview(!preview)}
                  >
                    Preview
                  </Button>
                </ButtonGroup>
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
                  View mail status ?
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
                  View
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

export default GenerateMail;
