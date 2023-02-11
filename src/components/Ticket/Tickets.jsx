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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import SadImage from "../../assets/images/SadImage.gif";
// import Unauthorized from "../../assets/images/NotAuthorized.gif";
import { delete_ticket, ticket_data } from "../../apis/Ticket/Ticket";
import { get_all_stages } from "../../apis/Config/Config";
import { get_all_projects } from "../../apis/Lead/Lead";
import { view_all } from "../../apis/View/View";
import TicketSearch from "./TicketSearch";

const ticket_columns = [
  { id: "type", label: "Type", maxWidth: 20 },
  { id: "code", label: "Code", maxWidth: 20 },
  { id: "summary", label: "Summary", minWidth: 150, align: "center" },
  { id: "status", label: "Status", minWidth: 10, align: "center" },
  { id: "assignee_name", label: "Assignee", minWidth: 50, align: "center" },
  { id: "reporter_name", label: "Reporter", minWidth: 50, align: "center" },
  { id: "actions", label: "Actions", minWidth: 50, align: "center" },
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
  const [curr_id, setcurr_id] = React.useState(null);
  const [curr_status, setcurr_status] = React.useState("");
  const [loading, setloading] = React.useState(true);
  const [data, setdata] = React.useState([]);
  const [toggle_data, settoggle_data] = React.useState(false);
  const [load_data, setload_data] = React.useState(false);
  const [toggle_delete, settoggle_delete] = React.useState(false);
  const [submit_delete, setsubmit_delete] = React.useState(false);
  const [code, setcode] = React.useState("");
  const [toggle_edit, settoggle_edit] = React.useState(false);
  const [submit_edit, setsubmit_edit] = React.useState(false);
  const [users, setusers] = React.useState([]);
  const [stages, setstages] = React.useState([]);
  const [projects, setprojects] = React.useState([]);
  const [project, setproject] = React.useState("");
  const [assignee, setassignee] = React.useState("");
  const [reporter, setreporter] = React.useState("");
  const [status, setstatus] = React.useState("");
  const [error, seterror] = React.useState(false);
  const [showmessage, setshowmessage] = React.useState("");
  const [show, setshow] = React.useState(false);
  const [showimage, setshowimage] = React.useState("");
  const [errormessage, seterrormessage] = React.useState("");
  const [success, setsuccess] = React.useState(false);
  const [successmessage, setsuccessmessage] = React.useState("");

  useEffect(() => {
    ticket_data(project, assignee, reporter, status).then((res) => {
      console.log(res.data);
      // 200 for success of the call
      if (res?.status === 200) {
        setshow(false);
        if (res.data.data.length < 1) {
          setshow(true);
          // setshowimage(SadImage);
          setshowmessage("You don't have any tickets currently");
        } else {
          setdata(res.data.data);
        }
      }

      // 401 if the user already exist on the database
      else if (res?.status === 401) {
        setshow(true);
        // setshowimage(Unauthorized);
        setshowmessage("Sorry you are not authorized to view this !");
      }

      // 500 if the user already made a request earlier
      else if (res?.status === 500) {
        if (
          res.data.errors[0].msg === "Sorry something went wrong, token expired"
        ) {
          //refreshToken();
        }
        setshow(true);
        // setshowimage(Unauthorized);
        setshowmessage(
          "Some internal server error occurred . Please try again later !"
        );
      }
      setloading(false);
    });
  }, [toggle_data]);

  useEffect(() => {
    view_all("user").then((res) => {
      console.log(res.data);
      // 200 for success of the call
      if (res?.status === 200) {
        if (res.data.data.length < 1) {
          console.log("No users present");
        } else {
          setusers(res.data.data);
        }
      }

      // 500 if the user already made a request earlier
      else if (res?.status === 500) {
        if (
          res.data.errors[0].msg === "Sorry something went wrong, token expired"
        ) {
          //refreshToken();
        }
      }
    });

    get_all_projects(localStorage.getItem("type")).then((res) => {
      console.log(res.data);
      // 200 for success of the call
      if (res?.status === 200) {
        if (res.data.data.length < 1) {
          console.log("No projects present");
        } else {
          setprojects(res.data.data);
        }
      }

      // 500 if the user already made a request earlier
      else if (res?.status === 500) {
        if (
          res.data.errors[0].msg === "Sorry something went wrong, token expired"
        ) {
          // //refreshToken();
        }
        alert("Please check your internet connection.");
      }
    });

    get_all_stages().then((res) => {
      console.log(res.data);
      // 200 for success of the call
      if (res?.status === 200) {
        if (res.data.data.length < 1) {
          console.log("No projects present");
        } else {
          setstages(res.data.data);
        }
      }

      // 500 if the user already made a request earlier
      else if (res?.status === 500) {
        if (
          res.data.errors[0].msg === "Sorry something went wrong, token expired"
        ) {
          //refreshToken();
        }
        alert("Please check your internet connection.");
      }
    });
  }, [load_data]);

  useEffect(() => {
    if(submit_delete)
    {
    delete_ticket(code).then((res) => {
      // 200 for success of the call
      if (res?.status === 200) {
        let new_data = data;
        for(let i=0;i<data.length;i++)
        {
          if(new_data[i].code === code)
          {
            new_data.splice(i, 1);
          }
        }
        setdata(new_data);
        setsuccessmessage("Ticket deleted successfully!");
        setsuccess(true);
      }
      // 401 for unauthorized of the call
      if (res?.status === 401) {
        console.log("Unauthorized access");
      }

      // 500 if the user already made a request earlier
      else if (res?.status === 500) {
        if (
          res.data.errors[0].msg === "Sorry something went wrong, token expired"
        ) {
          // //refreshToken();
        }
      }
    });
  }
  }, [toggle_delete]);

  const handleTicketAction = (action, code) => {
    setcode(code);
    if (action === "edit") {
      setsubmit_edit(true);
      toggle_edit ? settoggle_edit(false) : settoggle_edit(true);
    } else {
      setsubmit_delete(true);
      toggle_delete ? settoggle_delete(false) : settoggle_delete(true);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateFilter = (type, value) => {
    console.log("type", type, value);
    if (type === "assignee") {
      setassignee(value);
    }
    if (type === "reporter") {
      setreporter(value);
    }
    if (type === "project") {
      setproject(value);
    }
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
        users={users}
        projects={projects}
        stages={stages}
        project={project}
        status={status}
        assignee={assignee}
        reporter={reporter}
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
        users={users}
        projects={projects}
        stages={stages}
        project={project}
        status={status}
        assignee={assignee}
        reporter={reporter}
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
                        key={row.code}
                      >
                        {ticket_columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                            >
                              {column.id !== "status" &&
                              column.id !== "type" &&
                              column.id !== "actions" ? (
                                value.charAt(0).toUpperCase() + value.slice(1)
                              ) : column.id === "type" ? (
                                value === "story" ? (
                                  <AssignmentTurnedInIcon />
                                ) : value === "task" ? (
                                  <TaskAltIcon />
                                ) : value === "bug" ? (
                                  <PestControlIcon />
                                ) : null
                              ) : column.id === "actions" ? (
                                <ButtonGroup>
                                  <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="label"
                                    onClick={() => {
                                      handleTicketAction("edit", row.code);
                                    }}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    color="primary"
                                    aria-label="delete"
                                    component="label"
                                    onClick={() => {
                                      handleTicketAction("delete", row.code);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </ButtonGroup>
                              ) : (
                                <Box
                                  sx={{
                                    width: "100%",
                                    fontWeight: "bolder",
                                    backgroundColor: "#d1d2ff",
                                    color: "#696cff",
                                    borderRadius: "2px",
                                    padding: "5px 0px",
                                  }}
                                >
                                  {value.charAt(0).toUpperCase() +
                                    value.slice(1)}
                                </Box>
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
          rowsPerPageOptions={[10, 25, 100]}
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
