import {
    Alert,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Skeleton,
  Snackbar,
  Typography,
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
import { useNavigate } from "react-router-dom";

const GroupManage = () => {
    const navigate = useNavigate();
  const [viewOn, setviewOn] = useState(false);
  const [curr_name, setcurr_name] = useState("");
  const [toggle_data, settoggle_data] = React.useState(false);
  const [error, seterror] = React.useState(false);
  const [errormessage, seterrormessage] = React.useState("");
  const [success, setsuccess] = React.useState(false);
  const [successmessage, setsuccessmessage] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setloading] = React.useState(false);

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


  const [group_data, setgroup_data] = React.useState([
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const [data, setdata] = useState([
    {
      name: "Group 1",
      description: "Group 1",
    },
    {
      name: "Group 2",
      description: "Group 2",
    },
    {
      name: "Group 3",
      description: "Group 3",
    },
    {
      name: "Group 4",
      description: "Group 4",
    },
  ]);

  return !viewOn ?
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
      >
        New
      </Button>
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
                backgroundColor: "#fff",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                borderRadius: "5px",
              }}
            >
              <Box display="flex" width="100%" justifyContent={"space-between"} sx={{
                marginBottom:"5px"
              }}>
                <Typography
                  variant="h3"
                  style={{ fontWeight: "bolder", marginBottom: "20px" }}
                >
                  {ele.name}
                </Typography>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  sx={{
                    boxShadow:"none !important"
                  }}
                >
                  <Button aria-label="view" variant="contained" sx={{
                    margin:"0px 5px"
                  }}
                  onClick={()=> {
                    setcurr_name(ele.name);
                    setviewOn(!viewOn)
                  }}>
                    View
                  </Button>
                  <Button aria-label="view" variant="contained" >
                    Delete
                  </Button>
                </ButtonGroup>
              </Box>
              <Typography
                variant="h5"
                style={{ fontWeight: "bolder", marginBottom: "20px" }}
              >
                {ele.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
      </Box>
    :
    <Box>
        <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  sx={{
                    boxShadow:"none !important",
                    width:"100%",
                    display:"flex",
                    justifyContent:"flex-end"
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
        onClick={()=> {
            setviewOn(!viewOn)
            navigate("/dashboard/group")
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
                group_data.length >= 1 &&
                group_data
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
      </Box>
    </Box>
};

export default GroupManage;
