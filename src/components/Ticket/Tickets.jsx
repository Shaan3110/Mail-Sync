import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import {
  Alert,
  Autocomplete,
  Button,
  ButtonGroup,
  IconButton,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import PestControlIcon from "@mui/icons-material/PestControl";
import TicketSearch from "./TicketSearch";

const ticket_columns = [
  { id: "status", label: "Status", maxWidth: 20 },
  { id: "subject", label: "Subject", maxWidth: 20 },
  { id: "body", label: "Body", minWidth: 150, align: "center" },
  { id: "recipient", label: "Recipient", minWidth: 10, align: "center" },
  { id: "sender", label: "Sender", minWidth: 50, align: "center" },
  { id: "date_time", label: "Date", minWidth: 50, align: "center" },
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

function Tickets() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setloading] = React.useState(false);
  const [data, setdata] = React.useState([
    {
      id:"63e7cdd1b8af1921c49dfad8",
      status:"failure",
      subject:"Hey",
      body:"<h1>Hi</h1>",
      sender:"community@inccrew.com",
      recipient:"hitarasigan0987654321@gmail.com",
      date_time:"2023-12-11T17:18:00.000Z"
    },
    {
      id:"63e7cdd1b8af1921c49dfad8",
      status:"failure",
      subject:"Hey",
      body:"<h1>Hi</h1>",
      sender:"community@inccrew.com",
      recipient:"hitarasigan0987654321@gmail.com",
      date_time:"2023-12-11T17:18:00.000Z"
    },
    {
      id:"63e7cdd1b8af1921c49dfad8",
      status:"success",
      subject:"Hey",
      body:"<h1>Hi</h1>",
      sender:"community@inccrew.com",
      recipient:"hitarasigan0987654321@gmail.com",
      date_time:"2023-12-11T17:18:00.000Z"
    },
    {
      id:"63e7cdd1b8af1921c49dfad8",
      status:"success",
      subject:"Hey",
      body:"<h1>Hi</h1>",
      sender:"community@inccrew.com",
      recipient:"hitarasigan0987654321@gmail.com",
      date_time:"2023-12-11T17:18:00.000Z"
    },
    {
      id:"63e7cdd1b8af1921c49dfad8",
      status:"success",
      subject:"Hey",
      body:"<h1>Hi</h1>",
      sender:"community@inccrew.com",
      recipient:"hitarasigan0987654321@gmail.com",
      date_time:"2023-12-11T17:18:00.000Z"
    },
    {
      id:"63e7cdd1b8af1921c49dfad8",
      status:"success",
      subject:"Hey",
      body:"<h1>Hi</h1>",
      sender:"community@inccrew.com",
      recipient:"hitarasigan0987654321@gmail.com",
      date_time:"2023-12-11T17:18:00.000Z"
    },
    {
      id:"63e7cdd1b8af1921c49dfad8",
      status:"success",
      subject:"Hey",
      body:"<h1>Hi</h1>",
      sender:"community@inccrew.com",
      recipient:"hitarasigan0987654321@gmail.com",
      date_time:"2023-12-11T17:18:00.000Z"
    },
    
  ]);
  const [toggle_data, settoggle_data] = React.useState(false);
  const [status, setstatus] = React.useState("");
  const [error, seterror] = React.useState(false);
  const [showmessage, setshowmessage] = React.useState("");
  const [show, setshow] = React.useState(false);
  const [showimage, setshowimage] = React.useState("");
  const [errormessage, seterrormessage] = React.useState("");
  const [success, setsuccess] = React.useState(false);
  const [successmessage, setsuccessmessage] = React.useState("");

  // useEffect(() => {
  //   ticket_data(status).then((res) => {
  //     console.log(res.data);
  //     // 200 for success of the call
  //     if (res?.status === 200) {
  //       setshow(false);
  //       if (res.data.data.length < 1) {
  //         setshow(true);
  //         // setshowimage(SadImage);
  //         setshowmessage("You don't have any tickets currently");
  //       } else {
  //         setdata(res.data.data);
  //       }
  //     }

  //     // 401 if the user already exist on the database
  //     else if (res?.status === 401) {
  //       setshow(true);
  //       // setshowimage(Unauthorized);
  //       setshowmessage("Sorry you are not authorized to view this !");
  //     }

  //     // 500 if the user already made a request earlier
  //     else if (res?.status === 500) {
  //       if (
  //         res.data.errors[0].msg === "Sorry something went wrong, token expired"
  //       ) {
  //         //refreshToken();
  //       }
  //       setshow(true);
  //       // setshowimage(Unauthorized);
  //       setshowmessage(
  //         "Some internal server error occurred . Please try again later !"
  //       );
  //     }
  //     setloading(false);
  //   });
  // }, [toggle_data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateFilter = (type, value) => {
    console.log("type", type, value);
    if (type === "status") {
      setstatus(value);
    }
  };

  const applyFilter = () => {
    toggle_data ? settoggle_data(false) : settoggle_data(true);
  };

  return show && !loading ? (
    <>
      <TicketSearch
        status={status}
        updateFilter={updateFilter}
        applyFilter={applyFilter}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#f4f4f4",
          borderRadius: "5px",
        }}
      >
        <img
          src={showimage}
          alt="Error"
          style={{ width: "fit-content", height: "40vh", padding: "50px 0px" }}
        />
        <Typography
          sx={{
            margin: "0px 0px 10px 0px",
            border: "2px solid #03045e",
            padding: "10px 40px",
            color: "#03045e",
            borderRadius: "5px",
          }}
        >
          {showmessage}
        </Typography>
      </Box>
    </>
  ) : (
    <>
      <TicketSearch
        status={status}
        updateFilter={updateFilter}
        applyFilter={applyFilter}
      />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {success && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            message={successmessage}
          />
        )}
        {error && (
          <Alert
            variant="filled"
            severity="error"
            onClose={() => {
              seterror(false);
            }}
          >
            {errormessage}
          </Alert>
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
                data.length >= 1 &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {ticket_columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                            >
                              {column.id === "status" ? (
                                <Box
                                  sx={{
                                    width: "100px",
                                    margin:"10px 5px",
                                    padding:"5px 5px",
                                    display:"flex",
                                    alignItems:"center",
                                    justifyContent:"center",
                                    color: value === "success" ? "#71dd37": "#ff3e1d",
                                    border: value === "success" ? "1.5px solid #71dd37": "1.5px solid #ff3e1d",
                                    borderRadius:"5px"
                                  }}
                                >
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                                </Box>
                              ) : (
                                // <Box
                                //   sx={{
                                //     width: "100%",
                                //     fontWeight: "bolder",
                                //     backgroundColor: "#d1d2ff",
                                //     color: "#696cff",
                                //     borderRadius: "2px",
                                //     padding: "5px 0px",
                                //   }}
                                // >
                                  value
                                // </Box>
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
          rowsPerPageOptions={[5,100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default Tickets;
