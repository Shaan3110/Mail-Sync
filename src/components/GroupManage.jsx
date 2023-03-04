import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  Skeleton,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import UploadIcon from "@mui/icons-material/Upload";
import { tokens } from "../theme";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import readXlsxFile from "read-excel-file";
import { verify_token } from "../apis/Authenticate";
import {
  add_group,
  delete_group,
  get_all_groups,
  update_group,
} from "../apis/Group";

const GroupManage = () => {
  const navigate = useNavigate();
  const [viewOn, setviewOn] = useState(false);
  const [showNew, setshowNew] = useState(false);
  const [updateOpen, setupdateOpen] = useState(false);
  const [fileParse, setfileParse] = useState(null);
  const [emails, setemails] = useState([]);
  const [data, setdata] = useState([]);
  const [curr_name, setcurr_name] = useState("");
  const [curr_ele, setcurr_ele] = useState({});
  const [submit_group_data, setsubmit_group_data] = useState(false);
  const [toggle_send_group_data, settoggle_send_group_data] = useState(false);
  const [add_group_data, setadd_group_data] = useState({});
  const [update_group_data, setupdate_group_data] = useState({});
  const [send_group_data, setsend_group_data] = useState(false);
  const [toggle_delete_group, settoggle_delete_group] = useState(false);
  const [send_delete_group, setsend_delete_group] = useState(false);
  const [toggle_group, settoggle_group] = React.useState(false);
  const [toggle_authentication, settoggle_authentication] =
    React.useState(false);
  const [error, seterror] = React.useState(false);
  const [errormessage, seterrormessage] = React.useState("");
  const [success, setsuccess] = React.useState(false);
  const [successmessage, setsuccessmessage] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setloading] = React.useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const ticket_columns = [
    { id: "sno", label: "S No", maxWidth: 20 },
    { id: "email", label: "Email", maxWidth: 20 },
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: "#ffffff",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  React.useEffect(() => {
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
  }, [toggle_group]);

  React.useEffect(() => {
    // get all groups
    if (send_delete_group) {
      delete_group(curr_name)
        .then((res) => {
          if (res.data.status === "Success") {
            settoggle_authentication(!toggle_authentication);
          } else if (res.data.status === "Fail") {
            seterror(true);
            seterrormessage(res.data.message);
          }
        })
        .catch((err) => {
          seterror(true);
          seterrormessage("Internal Server Error");
        });
    }
  }, [toggle_delete_group]);

  React.useEffect(() => {
    // get all groups
    get_all_groups()
      .then((res) => {
        if (res.data.status === "Success") {
          setdata(res.data.groups);
        } else if (res.data.status === "Fail") {
          seterror(true);
          seterrormessage(res.data.message);
        }
      })
      .catch((err) => {
        seterror(true);
        seterrormessage("Internal Server Error");
      });
  }, [toggle_authentication]);

  React.useEffect(() => {
    if (submit_group_data) {
      debugger;
      !viewOn
        ? add_group(
            add_group_data.name,
            add_group_data.description,
            add_group_data.emails
          )
            .then((res) => {
              if (res.data.status === "Success") {
                console.log(data);
                let newData = data;
                newData.push({
                  identifier: add_group_data.name,
                  meta: {
                    description: add_group_data.description,
                    users: add_group_data.emails,
                  },
                });
                setdata(newData);
              } else if (res.data.status === "Fail") {
                seterror(true);
                seterrormessage(res.data.message);
              }
            })
            .catch((err) => {
              seterror(true);
              seterrormessage("Internal Server Error");
            })
        : update_group(
            curr_name,
            update_group_data.name,
            update_group_data.description,
            update_group_data.emails
          )
            .then((res) => {
              if (res.data.status === "Success") {
                setviewOn(false);
                settoggle_authentication(!toggle_authentication);
              } else if (res.data.status === "Fail") {
                seterror(true);
                seterrormessage(res.data.message);
              }
            })
            .catch((err) => {
              seterror(true);
              seterrormessage("Internal Server Error");
            });
    }
    // get all groups
  }, [toggle_send_group_data]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleDeleteGroup = (name) => {
    setcurr_name(name);
    setsend_delete_group(true);
    settoggle_delete_group(!toggle_delete_group);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = (values) => {
    debugger;
    setemails([]);
    readXlsxFile(fileParse).then((rows) => {
      for (const key in rows) {
        console.log(rows[key]);
        let newArray = rows[key].filter((ele) => {
          return ele.includes("@");
        });
        console.log(newArray);
        console.log(emails);
        if (emails.length !== undefined) {
          let filterArray = emails.push(...newArray);
          setemails(filterArray);
        }
        console.log(emails);
      }
      !viewOn
        ? setadd_group_data({
            name: values.group_name,
            description: values.group_description,
            emails: emails,
          })
        : setupdate_group_data({
            name: values.group_name,
            description: values.group_description,
            emails: emails,
          });

      setsubmit_group_data(true);
      settoggle_send_group_data(!toggle_send_group_data);
    });
    console.log(emails);
    console.log(values);

    // setsend_data(values);
    // setsubmit_login(true);
    // setlogin_toggle(!login_toggle);
  };

  const checkoutSchema = yup.object().shape({
    group_name: yup.string().required("required"),
    group_description: yup.string().required("required"),
  });
  const initialValues = {
    group_name: viewOn? curr_name:"",
    group_description: viewOn? curr_ele.meta.description:"",
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    padding: "50px 50px",
    background: `${colors.primary[400]}`,
    width: "40vw",
    borderRadius: "5px",
  };

  return !viewOn ? (
    <Box
      display="flex"
      width="100%"
      alignItems={"flex-end"}
      flexDirection="column"
      sx={{
        padding: "5px 40px",
      }}
    >
      <Button
        type="submit"
        color="primary"
        variant="contained"
        sx={{
          fontWeight: "bolder",
          textTransform: "none !important",
          marginBottom: "5px",
          padding: "10px 40px",
        }}
        size="large"
        onClick={() => {
          setshowNew(!showNew);
        }}
      >
        New
      </Button>
      <Modal
        open={showNew}
        onClose={() => {
          setshowNew(!showNew);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                  Let's add a Group !
                </Typography>
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bolder", marginBottom: "20px" }}
                >
                  Please fill the group name and upload xml file for the same
                </Typography>
                <Box
                  display={"flex"}
                  flexDirection="column"
                  width="30vw"
                  alignSelf={"center"}
                  justifySelf="center"
                >
                  <Stack spacing={1} sx={{ width: "100%" }} direction="row">
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Group Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.group_name}
                      name="group_name"
                      error={!!touched.group_name && !!errors.group_name}
                      helperText={touched.group_name && errors.group_name}
                      sx={{ width: "100%" }}
                    />
                  </Stack>
                  <Stack
                    spacing={1}
                    sx={{ width: "100%", marginTop: "10px" }}
                    direction="row"
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Group Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.group_description}
                      name="group_description"
                      error={
                        !!touched.group_description &&
                        !!errors.group_description
                      }
                      helperText={
                        touched.group_description && errors.group_description
                      }
                      sx={{ width: "100%" }}
                    />
                  </Stack>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: "bolder", margin: "20px 0px" }}
                  >
                    Upload emails
                  </Typography>
                  <Stack
                    spacing={1}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      border: `2px solid ${colors.grey[100]}`,
                      margin: "10px 0px",
                      padding: "10px 0px",
                      borderStyle: "dashed",
                    }}
                    direction="row"
                  >
                    <Button
                      variant="contained"
                      component="label"
                      error={!!touched.parseFile && !!errors.parseFile}
                      sx={{
                        fontWeight: "bolder",
                        textTransform: "none !important",
                        width: "143px",
                        padding: "10px 20px",
                      }}
                      endIcon={<UploadIcon />}
                    >
                      {fileParse === null ? "Upload Xml" : fileParse?.name}
                      <input
                        hidden
                        accept=".xlsx"
                        type="file"
                        name="parseFile"
                        onChange={(event) => {
                          setfileParse(event.target.files[0]);
                        }}
                      />
                    </Button>
                  </Stack>
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
                    Submit
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
                    Don't have an XML ?
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
                    Please ask admin
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
      </Modal>
      <Box
        display="flex"
        width="80vw"
        justifyContent={"space-evenly"}
        flexWrap={"wrap"}
        sx={{
          padding: "5px 40px",
        }}
      >
        {data.map((ele) => {
          return (
            <Box
              display="flex"
              width="fit-content"
              minWidth={"20vw"}
              flexDirection="column"
              sx={{
                margin: "20px 0px",
                padding: "20px 20px",
                background: `${colors.primary[400]}`,
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                borderRadius: "5px",
              }}
            >
              <Box
                display="flex"
                width="100%"
                justifyContent={"space-between"}
                sx={{
                  marginBottom: "5px",
                }}
              >
                <Typography
                  variant="h4"
                  style={{ fontWeight: "bolder", marginBottom: "20px" }}
                >
                  {ele.identifier}
                </Typography>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  sx={{
                    boxShadow: "none !important",
                  }}
                >
                  <Button
                    aria-label="view"
                    variant="contained"
                    sx={{
                      margin: "0px 5px",
                    }}
                    onClick={() => {
                      setcurr_name(ele.identifier);
                      setcurr_ele(ele);
                      seterror(false);
                      setviewOn(true);
                      setupdateOpen(false);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    aria-label="view"
                    variant="contained"
                    onClick={() => {
                      return handleDeleteGroup(ele.identifier);
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Box>
              <Typography variant="h5" style={{ marginBottom: "20px" }}>
                {ele.meta.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  ) : (
    <Box>
      <Modal
        open={updateOpen}
        onClose={() => {
          setupdateOpen(!updateOpen);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                  Let's add a Group !
                </Typography>
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bolder", marginBottom: "20px" }}
                >
                  Please fill the group name and upload xml file for the same
                </Typography>
                <Box
                  display={"flex"}
                  flexDirection="column"
                  width="30vw"
                  alignSelf={"center"}
                  justifySelf="center"
                >
                  <Stack spacing={1} sx={{ width: "100%" }} direction="row">
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Group name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.group_name}
                      name="group_name"
                      error={!!touched.group_name && !!errors.group_name}
                      helperText={touched.group_name && errors.group_name}
                      sx={{ width: "100%" }}
                    />
                  </Stack>
                  <Stack
                    spacing={1}
                    sx={{ width: "100%", marginTop: "10px" }}
                    direction="row"
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Group Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.group_description}
                      name="group_description"
                      error={
                        !!touched.group_description &&
                        !!errors.group_description
                      }
                      helperText={
                        touched.group_description && errors.group_description
                      }
                      sx={{ width: "100%" }}
                    />
                  </Stack>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: "bolder", margin: "20px 0px" }}
                  >
                    Upload emails
                  </Typography>
                  <Stack
                    spacing={1}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      border: `2px solid ${colors.grey[100]}`,
                      margin: "10px 0px",
                      padding: "10px 0px",
                      borderStyle: "dashed",
                    }}
                    direction="row"
                  >
                    <Button
                      variant="contained"
                      component="label"
                      error={!!touched.parseFile && !!errors.parseFile}
                      sx={{
                        fontWeight: "bolder",
                        textTransform: "none !important",
                        width: "143px",
                        padding: "10px 20px",
                      }}
                      endIcon={<UploadIcon />}
                    >
                      {fileParse === null ? "Upload Xml" : fileParse?.name}
                      <input
                        hidden
                        accept=".xlsx"
                        type="file"
                        name="parseFile"
                        onChange={(event) => {
                          setfileParse(event.target.files[0]);
                        }}
                      />
                    </Button>
                  </Stack>
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
                    Update
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
                    Don't have an XML ?
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
                    Please ask admin
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
      </Modal>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{
          boxShadow: "none !important",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          sx={{
            fontWeight: "bolder",
            textTransform: "none !important",
            marginBottom: "5px",
            padding: "10px 40px",
            marginRight: "10px",
          }}
          size="large"
          onClick={() => {
            setupdateOpen(true);
          }}
        >
          Update
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{
            fontWeight: "bolder",
            textTransform: "none !important",
            marginBottom: "5px",
            padding: "10px 40px",
          }}
          size="large"
          onClick={() => {
            setviewOn(!viewOn);
            seterror(false);
            navigate("/dashboard/group");
          }}
        >
          Back
        </Button>
      </ButtonGroup>
      <Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          {success && (
            <Snackbar
              open={true}
              autoHideDuration={6000}
              message={successmessage}
            />
          )}
          <Snackbar
            open={true}
            autoHideDuration={6000}
            key={"bottom" + "right"}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert severity="success" sx={{ width: "100%" }} variant="filled">
              This is a success message!
            </Alert>
          </Snackbar>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{ backgroundColor: "#000000" }}>
                <TableRow>
                  {ticket_columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <StyledTableRow hover role="checkbox" tabIndex={-1}>
                    {ticket_columns.map((column) => {
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {ticket_columns.map((column) => {
                            return (
                              <Skeleton
                                animation="wave"
                                sx={{ width: "100%", height: "53px" }}
                              />
                            );
                          })}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                ) : null}
                {!loading &&
                  curr_ele.meta.users.length >= 1 &&
                  curr_ele.meta.users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row,index) => {
                      return (
                        <StyledTableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row}
                        >
                          {
                            console.log(row)
                            
                          }
                          {ticket_columns.map((column) => {
                            return (
                              <StyledTableCell
                                key={index}
                                align={column.align}
                              >
                                {column.id === "sno" ? (
                                  
                                    index+1

                                ) : (
                                  row
                                )}
                              </StyledTableCell>
                            );
                          })}
                        </StyledTableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default GroupManage;
